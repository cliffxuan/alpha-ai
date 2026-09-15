from __future__ import annotations

import json
from pathlib import Path
from typing import Any
from pydantic import BaseModel, Field, model_validator

ROOT = Path(__file__).parent.parent
COMPANIES_DATA = json.loads((ROOT / "data" / "companies.json").read_text())["companies"]
LAYERS_DATA = json.loads((ROOT / "data" / "layers.json").read_text())["layers"]


class PortfolioWeights(BaseModel):
    layer_1_energy: float = Field(default=20.0, ge=0.0, le=100.0)
    layer_2_chips: float = Field(default=30.0, ge=0.0, le=100.0)
    layer_3_infra: float = Field(default=20.0, ge=0.0, le=100.0)
    layer_4_models: float = Field(default=15.0, ge=0.0, le=100.0)
    layer_5_apps: float = Field(default=15.0, ge=0.0, le=100.0)
    total_capital_usd: float = Field(default=100000.0, ge=1000.0)

    @model_validator(mode="before")
    @classmethod
    def migrate_legacy_keys(cls, data: Any) -> Any:
        if isinstance(data, dict):
            # layer_2_silicon -> layer_2_chips
            if "layer_2_chips" not in data and "layer_2_silicon" in data:
                data["layer_2_chips"] = data["layer_2_silicon"]
            # layer_3_cloud -> layer_3_infra
            if "layer_3_infra" not in data and "layer_3_cloud" in data:
                data["layer_3_infra"] = data["layer_3_cloud"]
            # layer_5_apps fallback from legacy layer_6_apps + layer_5_tooling
            if "layer_5_apps" not in data:
                if "layer_6_apps" in data:
                    data["layer_5_apps"] = data["layer_6_apps"] + data.get("layer_5_tooling", 0.0)
        return data


PRESET_TEMPLATES = [
    {
        "id": "energy-pick-and-shovel",
        "name": "The Physical Bottleneck (Energy & Cooling Heavy)",
        "description": "Overweights the hardest physical constraints in AI (substation transformers, nuclear PPAs, liquid cooling) where pricing power is durable.",
        "weights": {
            "layer_1_energy": 45.0,
            "layer_2_chips": 30.0,
            "layer_3_infra": 15.0,
            "layer_4_models": 0.0,
            "layer_5_apps": 10.0,
        },
        "target_profile": "Lower multiple risk, strong dividend cash flows, structural supply bottleneck leverage."
    },
    {
        "id": "semiconductor-monopoly",
        "name": "The Silicon Monopoly (EUV, Foundries & GPUs)",
        "description": "Concentrates capital in high gross margin (60-75%) semiconductor tollbooths (NVIDIA, TSMC, ASML, Broadcom).",
        "weights": {
            "layer_1_energy": 10.0,
            "layer_2_chips": 60.0,
            "layer_3_infra": 15.0,
            "layer_4_models": 10.0,
            "layer_5_apps": 5.0,
        },
        "target_profile": "Highest operating margins, near-zero direct competitor substitution risk."
    },
    {
        "id": "pure-play-agents",
        "name": "The Vertical App & Agentic Supercycle",
        "description": "Bets on end-user revenue capture, autonomous software engineering (Cursor, Devin), and enterprise workflow systems of record.",
        "weights": {
            "layer_1_energy": 5.0,
            "layer_2_chips": 10.0,
            "layer_3_infra": 10.0,
            "layer_4_models": 25.0,
            "layer_5_apps": 50.0,
        },
        "target_profile": "Maximum revenue growth (40%+ CAGR), labor budget substitution, high LTV enterprise SaaS."
    },
    {
        "id": "balanced-all-weather",
        "name": "Balanced 5-Layer All-Weather Core",
        "description": "Diversified strategic weighting capturing NVIDIA's full 5-layer AI value chain from kilowatt to application.",
        "weights": {
            "layer_1_energy": 20.0,
            "layer_2_chips": 25.0,
            "layer_3_infra": 20.0,
            "layer_4_models": 15.0,
            "layer_5_apps": 20.0,
        },
        "target_profile": "Optimal risk-adjusted Sharpe ratio across all market cycles."
    }
]


def simulate_portfolio(weights: PortfolioWeights) -> dict[str, Any]:
    # Normalize weights to 100%
    raw_weights = [
        weights.layer_1_energy,
        weights.layer_2_chips,
        weights.layer_3_infra,
        weights.layer_4_models,
        weights.layer_5_apps,
    ]
    total_raw = sum(raw_weights)
    if total_raw == 0:
        norm_weights = [20.0] * 5
    else:
        norm_weights = [(w / total_raw) * 100.0 for w in raw_weights]

    layer_multipliers = {
        1: {"ev_sales": 4.5, "pe": 28.0, "gross_margin": 32.0, "cagr_3yr": 24.5, "risk_score": 3.2},
        2: {"ev_sales": 18.2, "pe": 34.0, "gross_margin": 68.5, "cagr_3yr": 31.0, "risk_score": 4.5},
        3: {"ev_sales": 14.5, "pe": 36.0, "gross_margin": 62.0, "cagr_3yr": 26.5, "risk_score": 4.0},
        4: {"ev_sales": 32.0, "pe": 65.0, "gross_margin": 48.0, "cagr_3yr": 37.5, "risk_score": 8.0},
        5: {"ev_sales": 22.5, "pe": 56.0, "gross_margin": 78.5, "cagr_3yr": 40.0, "risk_score": 6.5},
    }

    weighted_ev_sales = 0.0
    weighted_pe = 0.0
    weighted_margin = 0.0
    weighted_cagr = 0.0
    weighted_risk = 0.0

    allocations = []
    for idx, pct in enumerate(norm_weights, start=1):
        lm = layer_multipliers[idx]
        fraction = pct / 100.0
        weighted_ev_sales += lm["ev_sales"] * fraction
        weighted_pe += lm["pe"] * fraction
        weighted_margin += lm["gross_margin"] * fraction
        weighted_cagr += lm["cagr_3yr"] * fraction
        weighted_risk += lm["risk_score"] * fraction

        allocated_capital = weights.total_capital_usd * fraction
        matching_companies = [c for c in COMPANIES_DATA if c["layer_id"] == idx]

        allocations.append({
            "layer_id": idx,
            "layer_name": LAYERS_DATA[idx - 1]["name"],
            "weight_pct": round(pct, 1),
            "allocated_capital_usd": round(allocated_capital, 2),
            "ev_sales_multiple": lm["ev_sales"],
            "pe_multiple": lm["pe"],
            "projected_cagr": lm["cagr_3yr"],
            "sample_holdings": [c["name"] for c in matching_companies[:4]],
        })

    # Projected 5-Year Capital Compounding (Base, Bull, Bear)
    capital_growth_timeline = []
    base_cap = weights.total_capital_usd
    bull_cap = weights.total_capital_usd
    bear_cap = weights.total_capital_usd

    for yr in range(6):
        if yr == 0:
            capital_growth_timeline.append({
                "year": f"Year {yr}",
                "base_value": round(base_cap),
                "bull_value": round(bull_cap),
                "bear_value": round(bear_cap),
            })
            continue

        base_rate = weighted_cagr / 100.0
        bull_rate = (weighted_cagr * 1.35) / 100.0
        bear_rate = (weighted_cagr * 0.45) / 100.0

        base_cap *= (1.0 + base_rate)
        bull_cap *= (1.0 + bull_rate)
        bear_cap *= (1.0 + bear_rate)

        capital_growth_timeline.append({
            "year": f"Year {yr}",
            "base_value": round(base_cap),
            "bull_value": round(bull_cap),
            "bear_value": round(bear_cap),
        })

    return {
        "summary": {
            "total_capital_usd": weights.total_capital_usd,
            "weighted_ev_sales": round(weighted_ev_sales, 1),
            "weighted_pe_ratio": round(weighted_pe, 1),
            "weighted_gross_margin_pct": round(weighted_margin, 1),
            "projected_3yr_cagr_pct": round(weighted_cagr, 1),
            "portfolio_risk_score_10": round(weighted_risk, 1),
            "risk_rating": "Conservative / Moat Heavy" if weighted_risk < 4.5 else "Growth & Momentum" if weighted_risk < 6.5 else "Aggressive Frontier",
        },
        "allocations": allocations,
        "timeline": capital_growth_timeline,
        "presets": PRESET_TEMPLATES,
    }
