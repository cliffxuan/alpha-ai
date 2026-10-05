import { describe, it, expect } from 'bun:test';
import { getTradingViewUrl, extractTicker } from './tradingview';

describe('extractTicker', () => {
  it('extracts ticker from standard strings', () => {
    expect(extractTicker('NVDA')).toBe('NVDA');
    expect(extractTicker('CEG')).toBe('CEG');
    expect(extractTicker('000660.KS')).toBe('000660.KS');
    expect(extractTicker('2513.HK')).toBe('2513.HK');
  });

  it('extracts ticker from parenthetical descriptions', () => {
    expect(extractTicker('ETN (Eaton)')).toBe('ETN');
    expect(extractTicker('SBGSY (Schneider)')).toBe('SBGSY');
    expect(extractTicker('CEG (Constellation Nuclear)')).toBe('CEG');
    expect(extractTicker('SK Hynix (000660.KS)')).toBe('000660.KS');
    expect(extractTicker('AMKOR')).toBe('AMKR');
  });

  it('returns null for known private companies', () => {
    expect(extractTicker('OpenAI')).toBeNull();
    expect(extractTicker('Anthropic')).toBeNull();
    expect(extractTicker('Scale AI')).toBeNull();
    expect(extractTicker('Databricks')).toBeNull();
    expect(extractTicker('PRIVATE')).toBeNull();
    expect(extractTicker('N/A')).toBeNull();
  });
});

describe('getTradingViewUrl', () => {
  it('returns custom URL if provided', () => {
    expect(getTradingViewUrl('CEG', 'https://custom.tradingview.com/sym/CEG')).toBe(
      'https://custom.tradingview.com/sym/CEG'
    );
  });

  it('returns null for private companies or PRIVATE tickers', () => {
    expect(getTradingViewUrl('PRIVATE')).toBeNull();
    expect(getTradingViewUrl('private')).toBeNull();
    expect(getTradingViewUrl('NVDA', undefined, 'private')).toBeNull();
    expect(getTradingViewUrl('', undefined, 'public')).toBeNull();
    expect(getTradingViewUrl(null, undefined, 'public')).toBeNull();
    expect(getTradingViewUrl('N/A')).toBeNull();
    expect(getTradingViewUrl('OpenAI')).toBeNull();
    expect(getTradingViewUrl('Anthropic')).toBeNull();
  });

  it('generates TradingView URLs for standard US tickers', () => {
    expect(getTradingViewUrl('CEG')).toBe('https://www.tradingview.com/symbols/CEG/');
    expect(getTradingViewUrl('NVDA')).toBe('https://www.tradingview.com/symbols/NVDA/');
    expect(getTradingViewUrl('ETN (Eaton)')).toBe('https://www.tradingview.com/symbols/ETN/');
  });

  it('handles international ticker suffixes like .KS and .HK', () => {
    expect(getTradingViewUrl('000660.KS')).toBe('https://www.tradingview.com/symbols/KRX-000660/');
    expect(getTradingViewUrl('SK Hynix (000660.KS)')).toBe('https://www.tradingview.com/symbols/KRX-000660/');
    expect(getTradingViewUrl('2513.HK')).toBe('https://www.tradingview.com/symbols/HKEX-2513/');
    expect(getTradingViewUrl('0100.HK')).toBe('https://www.tradingview.com/symbols/HKEX-100/');
  });
});
