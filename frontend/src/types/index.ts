export type TabId = 
  | 'overview' 
  | 'layers' 
  | 'valuations' 
  | 'capex' 
  | 'bottlenecks' 
  | 'portfolio';

export interface Layer {
  id: number;
  slug: string;
  name: string;
  subtitle: string;
  tagline: string;
  color: string;
  accent_hex: string;
  moat_rating: string;
  margin_profile: string;
  market_size_2030: string;
  cagr: string;
  thesis: string;
  key_bottlenecks: string[];
  value_capture_drivers: string[];
}

export interface Company {
  id: string;
  name: string;
  ticker: string;
  type: 'public' | 'private';
  layer_id: number;
  layer_name: string;
  market_cap_billions?: number;
  bull_case_market_cap_billions?: number;
  bull_case_target?: string;
  stock_price?: number;
  pe_ratio?: number;
  ev_sales?: number;
  ev_ebitda?: number;
  revenue_growth_yoy?: number;
  gross_margin?: number;
  capex_pct_revenue?: number;
  valuation_billions?: number;
  latest_round?: string;
  lead_investors?: string[];
  estimated_arr_millions?: number;
  arr_multiple?: number;
  moat: string;
  risk: string;
  investment_verdict: string;
}

export interface CapExFlow {
  from: string;
  to: string;
  amount_billions: number;
  percentage: number;
  description: string;
}

export interface CapExData {
  total_hyperscaler_capex_2025_billions: number;
  total_hyperscaler_capex_2026_billions: number;
  flows: CapExFlow[];
}

export interface Bottleneck {
  id: string;
  name: string;
  layer: string;
  lead_time: string;
  severity: string;
  impact: string;
  beneficiary_tickers: string[];
}

export interface PortfolioAllocation {
  layer_id: number;
  layer_name: string;
  weight_pct: number;
  allocated_capital_usd: number;
  ev_sales_multiple: number;
  pe_multiple: number;
  projected_cagr: number;
  sample_holdings: string[];
}

export interface PortfolioTimelinePoint {
  year: string;
  base_value: number;
  bull_value: number;
  bear_value: number;
}

export interface PresetTemplate {
  id: string;
  name: string;
  description: string;
  weights: {
    layer_1_energy: number;
    layer_2_silicon: number;
    layer_3_cloud: number;
    layer_4_models: number;
    layer_5_tooling: number;
    layer_6_apps: number;
  };
  target_profile: string;
}

export interface PortfolioResult {
  summary: {
    total_capital_usd: number;
    weighted_ev_sales: number;
    weighted_pe_ratio: number;
    weighted_gross_margin_pct: number;
    projected_3yr_cagr_pct: number;
    portfolio_risk_score_10: number;
    risk_rating: string;
  };
  allocations: PortfolioAllocation[];
  timeline: PortfolioTimelinePoint[];
  presets: PresetTemplate[];
}
