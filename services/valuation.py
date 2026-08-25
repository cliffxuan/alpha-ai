from __future__ import annotations

import json
from pathlib import Path
from typing import Any

ROOT = Path(__file__).parent.parent
COMPANIES_DATA = json.loads((ROOT / "data" / "companies.json").read_text())["companies"]


def get_valuation_summary() -> dict[str, Any]:
    public_comps = [c for c in COMPANIES_DATA if c["type"] == "public"]
    private_comps = [c for c in COMPANIES_DATA if c["type"] == "private"]

    # Public Averages
    avg_pe = sum(c["pe_ratio"] for c in public_comps) / len(public_comps)
    avg_ev_sales = sum(c["ev_sales"] for c in public_comps) / len(public_comps)
    avg_growth = sum(c["revenue_growth_yoy"] for c in public_comps) / len(public_comps)

    # Private Averages
    avg_arr_mult = sum(c["arr_multiple"] for c in private_comps) / len(private_comps)
    total_private_val = sum(c["valuation_billions"] for c in private_comps)

    return {
        "public": {
            "count": len(public_comps),
            "average_pe_ratio": round(avg_pe, 1),
            "average_ev_sales": round(avg_ev_sales, 1),
            "average_growth_yoy": round(avg_growth, 1),
            "companies": public_comps,
        },
        "private": {
            "count": len(private_comps),
            "average_arr_multiple": round(avg_arr_mult, 1),
            "total_private_valuation_billions": round(total_private_val, 1),
            "companies": private_comps,
        }
    }
