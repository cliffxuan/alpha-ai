/**
 * Utility functions for generating TradingView URLs.
 */

const KNOWN_PRIVATE_COMPANIES = new Set([
  'OPENAI',
  'ANTHROPIC',
  'SCALE AI',
  'DATABRICKS',
  'CURSOR',
  'ANYSPHERE',
  'MISTRAL',
  'DEEPSEEK',
  'MOONSHOT',
  'XAI',
  'GROK',
  'WORLD LABS',
  'AMI LABS',
  'RUNWAY',
  'DECART',
  'ODYSSEY',
  'WAYVE',
  'PRIVATE',
  'N/A',
  'NONE',
]);

const CORPORATE_SUFFIXES = new Set([
  'INC',
  'INC.',
  'CORP',
  'CORP.',
  'LTD',
  'LTD.',
  'LLC',
  'LLC.',
  'CO',
  'CO.',
  'SA',
  'AG',
  'GMBH',
]);

/**
 * Extracts a normalized uppercase ticker symbol from strings like:
 * "ETN (Eaton)" -> "ETN"
 * "SK Hynix (000660.KS)" -> "000660.KS"
 * "CEG" -> "CEG"
 * "Acme (Inc.)" -> null
 * "OpenAI" -> null
 */
export function extractTicker(rawTicker?: string | null): string | null {
  if (!rawTicker) return null;
  const clean = rawTicker.trim();
  const upper = clean.toUpperCase();
  if (!clean || KNOWN_PRIVATE_COMPANIES.has(upper)) {
    return null;
  }

  // Check parenthetical ticker e.g. "SK Hynix (000660.KS)", "ETN (Eaton)"
  const parenMatch = clean.match(/\(([^)]+)\)/);
  if (parenMatch) {
    const inside = parenMatch[1].trim();
    const insideUpper = inside.toUpperCase();
    const before = clean.split('(')[0].trim();
    const beforeUpper = before.toUpperCase();

    // If inside matches an exchange-qualified ticker (e.g. 000660.KS, 2513.HK)
    if (/^[A-Z0-9]{1,8}\.[A-Z]{2,4}$/.test(insideUpper)) {
      return insideUpper;
    }

    // If before is an uppercase ticker like ETN in "ETN (Eaton)"
    if (
      before === beforeUpper &&
      /^[A-Z0-9]{1,8}$/.test(beforeUpper) &&
      !CORPORATE_SUFFIXES.has(beforeUpper) &&
      !KNOWN_PRIVATE_COMPANIES.has(beforeUpper)
    ) {
      return beforeUpper;
    }

    // If inside is an explicit uppercase ticker like (NVDA)
    if (
      inside === insideUpper &&
      /^[A-Z0-9]{1,8}$/.test(insideUpper) &&
      !CORPORATE_SUFFIXES.has(insideUpper) &&
      !KNOWN_PRIVATE_COMPANIES.has(insideUpper)
    ) {
      return insideUpper;
    }

    return null;
  }

  if (upper === 'AMKOR') {
    return 'AMKR';
  }

  // Single word / symbol (e.g. "NVDA", "000660.KS")
  if (/^[A-Z0-9]{1,8}(\.[A-Z]{2,4})?$/.test(upper) && !CORPORATE_SUFFIXES.has(upper)) {
    return upper;
  }

  return null;
}

export function getTradingViewUrl(
  rawTicker?: string | null,
  customUrl?: string | null,
  type?: string
): string | null {
  // Check private company type and private ticker markers before honoring custom overrides
  if (type === 'private') {
    return null;
  }

  if (rawTicker && KNOWN_PRIVATE_COMPANIES.has(rawTicker.trim().toUpperCase())) {
    return null;
  }

  if (customUrl && customUrl.trim()) {
    return customUrl.trim();
  }

  if (!rawTicker) {
    return null;
  }

  const clean = rawTicker.trim();
  if (clean.startsWith('http://') || clean.startsWith('https://')) {
    return clean;
  }

  const ticker = extractTicker(clean);
  if (!ticker) {
    return null;
  }

  const upperTicker = ticker.toUpperCase();

  // South Korea exchange: 000660.KS -> KRX-000660
  if (upperTicker.endsWith('.KS')) {
    return `https://www.tradingview.com/symbols/KRX-${upperTicker.slice(0, -3)}/`;
  }

  // Hong Kong exchange: 2513.HK -> HKEX-2513, 0100.HK -> HKEX-100
  if (upperTicker.endsWith('.HK')) {
    const code = upperTicker.slice(0, -3).replace(/^0+/, '') || '0';
    return `https://www.tradingview.com/symbols/HKEX-${code}/`;
  }

  return `https://www.tradingview.com/symbols/${encodeURIComponent(upperTicker)}/`;
}
