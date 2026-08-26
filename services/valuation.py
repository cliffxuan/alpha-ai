from __future__ import annotations

import json
from pathlib import Path
from typing import Any

ROOT = Path(__file__).parent.parent
COMPANIES_DATA = json.loads((ROOT / "data" / "companies.json").read_text())["companies"]


def get_valuation_summary() -> dict[str, Any]:
    public_comps = [c for c in COMPANIES_DATA if c["type"] == "public"]
    private_comps = [c for c in COMPANIES_DATA if c["type"] == "private"]

    # Public Averages (safely filter non-None)
    pe_list = [c["pe_ratio"] for c in public_comps if c.get("pe_ratio") is not None]
    ev_sales_list = [c["ev_sales"] for c in public_comps if c.get("ev_sales") is not None]
    growth_list = [c["revenue_growth_yoy"] for c in public_comps if c.get("revenue_growth_yoy") is not None]

    avg_pe = sum(pe_list) / len(pe_list) if pe_list else 0.0
    avg_ev_sales = sum(ev_sales_list) / len(ev_sales_list) if ev_sales_list else 0.0
    avg_growth = sum(growth_list) / len(growth_list) if growth_list else 0.0

    # Private Averages
    arr_mult_list = [c["arr_multiple"] for c in private_comps if c.get("arr_multiple") is not None]
    avg_arr_mult = sum(arr_mult_list) / len(arr_mult_list) if arr_mult_list else 0.0
    total_private_val = sum(c.get("valuation_billions", 0.0) for c in private_comps)

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
