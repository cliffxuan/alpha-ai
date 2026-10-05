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

/**
 * Extracts a ticker symbol from strings like:
 * "ETN (Eaton)" -> "ETN"
 * "SK Hynix (000660.KS)" -> "000660.KS"
 * "CEG" -> "CEG"
 * "OpenAI" -> null
 */
export function extractTicker(rawTicker?: string | null): string | null {
  if (!rawTicker) return null;
  const clean = rawTicker.trim();
  if (!clean || KNOWN_PRIVATE_COMPANIES.has(clean.toUpperCase())) {
    return null;
  }

  // Check parenthetical ticker e.g. "SK Hynix (000660.KS)"
  const parenMatch = clean.match(/\(([^)]+)\)/);
  if (parenMatch) {
    const inside = parenMatch[1].trim();
    const before = clean.split('(')[0].trim();

    // If inside contains a dot or is an explicit exchange ticker (e.g. 000660.KS, 2513.HK)
    if (inside.includes('.') || /^[0-9A-Z]+$/.test(inside)) {
      if (!/^[A-Z0-9]+$/.test(before)) {
        return inside;
      }
    }

    // If before is an uppercase ticker like ETN in "ETN (Eaton)"
    if (/^[A-Z0-9.]{1,12}$/i.test(before)) {
      return before;
    }
  }

  if (clean.toUpperCase() === 'AMKOR') {
    return 'AMKR';
  }

  // Single word / symbol
  if (/^[A-Z0-9.]{1,12}$/i.test(clean)) {
    return clean;
  }

  return null;
}

export function getTradingViewUrl(
  rawTicker?: string | null,
  customUrl?: string | null,
  type?: string
): string | null {
  if (customUrl && customUrl.trim()) {
    return customUrl.trim();
  }

  if (type === 'private') {
    return null;
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

  // South Korea exchange: 000660.KS -> KRX-000660
  if (ticker.endsWith('.KS')) {
    return `https://www.tradingview.com/symbols/KRX-${ticker.slice(0, -3)}/`;
  }

  // Hong Kong exchange: 2513.HK -> HKEX-2513, 0100.HK -> HKEX-100
  if (ticker.endsWith('.HK')) {
    const code = ticker.slice(0, -3).replace(/^0+/, '') || '0';
    return `https://www.tradingview.com/symbols/HKEX-${code}/`;
  }

  return `https://www.tradingview.com/symbols/${encodeURIComponent(ticker)}/`;
}
