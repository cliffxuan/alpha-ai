from __future__ import annotations

import json
import logging
from pathlib import Path
from typing import Any

from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from scalar_fastapi import get_scalar_api_reference

from services.portfolio import PortfolioWeights, simulate_portfolio, PRESET_TEMPLATES
from services.valuation import get_valuation_summary

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("alpha-ai.api")

tags_metadata = [
    {
        "name": "6-Layer Cake Framework",
        "description": "Core structural layers of the AI economy, from base energy physics to agentic software applications.",
    },
    {
        "name": "Market Valuations & Comps",
        "description": "Public equity valuation multiples (P/E, EV/Sales, Margins) and private unicorn venture funding benchmarks.",
    },
    {
        "name": "CapEx Supercycle Flows",
        "description": "Hyperscaler annual capital expenditure distribution ($330B+) and enterprise ROI analysis.",
    },
    {
        "name": "Supply Chain Bottlenecks",
        "description": "Hardware lead times, CoWoS wafer allocations, HBM3e/4 yields, and utility interconnect study delays.",
    },
    {
        "name": "Portfolio Allocator & Simulator",
        "description": "Interactive multi-layer portfolio weighting, scenario modeling, and 5-year capital compounding engine.",
    },
    {
        "name": "System Health",
        "description": "Service health probes and runtime diagnostics.",
    },
]

app = FastAPI(
    title="AlphaAI API Reference",
    description="""
# 🍰 AlphaAI · The 6-Layer Cake Framework for AI Investing

Interactive institutional market intelligence and investment decision platform tracking capital flows, valuation multiples, supply chain moats, and margin structures across all 6 layers of the AI economy.

### The 6 Layers:
1. **Layer 1: Energy & Grid Infrastructure** (`CEG`, `VST`, `TLN`, `VRT`, `ETN`, SMRs, Liquid CDUs)
2. **Layer 2: Silicon & Semiconductor Fabrication** (`NVDA`, `TSM`, `ASML`, `AVGO`, `MU`, CoWoS, HBM)
3. **Layer 3: Cloud Infrastructure & Networking** (`MSFT`, `AMZN`, `GOOGL`, `ORCL`, `ANET`, CoreWeave, 800G Optics)
4. **Layer 4: Foundation Models & Frontier Labs** (`OpenAI`, `Anthropic`, `Meta Llama`, `xAI`, Reasoning RLVR)
5. **Layer 5: Developer Tooling, Data Infrastructure & MLOps** (`Databricks`, `Scale AI`, `Pinecone`, `vLLM`)
6. **Layer 6: Vertical Applications & Agentic AI** (`PLTR`, `NOW`, `Cursor`, `Devin`, `Harvey`)
    """,
    version="1.0.0",
    docs_url=None,
    redoc_url=None,
    openapi_tags=tags_metadata,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ROOT = Path(__file__).parent
DATA_DIR = ROOT / "data"

LAYERS_DATA = json.loads((DATA_DIR / "layers.json").read_text())["layers"]
COMPANIES_DATA = json.loads((DATA_DIR / "companies.json").read_text())["companies"]
CAPEX_DATA = json.loads((DATA_DIR / "capex_flows.json").read_text())
BOTTLENECKS_DATA = json.loads((DATA_DIR / "bottlenecks.json").read_text())["bottlenecks"]


# ============================================================================
# Scalar API Documentation Route
# ============================================================================

@app.get("/docs", include_in_schema=False)
@app.get("/scalar", include_in_schema=False)
def scalar_documentation():
    """Renders the modern, interactive Scalar API documentation."""
    return get_scalar_api_reference(
        openapi_url="/openapi.json",
        title="AlphaAI API Reference · Scalar",
    )


# ============================================================================
# REST API Endpoints
# ============================================================================

@app.get("/api/layers", tags=["6-Layer Cake Framework"], summary="Get All 6 Architectural Layers")
def get_layers() -> JSONResponse:
    """Returns the full 6-Layer Cake framework definitions, investment theses, 2030 TAM projections, and margin profiles."""
    return JSONResponse({"layers": LAYERS_DATA})


@app.get("/api/companies", tags=["Market Valuations & Comps"], summary="List Public & Private AI Companies")
def get_companies(
    layer_id: int | None = Query(default=None, ge=1, le=6, description="Filter by layer ID (1 to 6)"),
    comp_type: str | None = Query(default=None, description="Filter by company type: 'public' or 'private'"),
) -> JSONResponse:
    """Returns public equities (with live P/E, EV/Sales, gross margins) and private unicorns (with latest round valuations and ARR multiples)."""
    comps = COMPANIES_DATA
    if layer_id is not None:
        comps = [c for c in comps if c["layer_id"] == layer_id]
    if comp_type is not None:
        comps = [c for c in comps if c["type"] == comp_type]
    return JSONResponse({"companies": comps})


@app.get("/api/valuations", tags=["Market Valuations & Comps"], summary="Get Valuation Multiples & Comps Summary")
def get_valuations() -> JSONResponse:
    """Returns benchmark valuation multiples, cross-sectional statistics, and public/private multiple arbitrage metrics."""
    summary = get_valuation_summary()
    return JSONResponse(summary)


@app.get("/api/capex-flows", tags=["CapEx Supercycle Flows"], summary="Get $330B Hyperscaler CapEx Flows")
def get_capex_flows() -> JSONResponse:
    """Returns the granular allocation of the $330B+ annual hyperscaler AI CapEx supercycle across the 6 layers."""
    return JSONResponse(CAPEX_DATA)


@app.get("/api/bottlenecks", tags=["Supply Chain Bottlenecks"], summary="Get Critical Hardware & Power Bottlenecks")
def get_bottlenecks() -> JSONResponse:
    """Returns multi-year lead times (Transformers 36-42mo, CoWoS packaging, HBM4 yields) and beneficiary stock tickers."""
    return JSONResponse({"bottlenecks": BOTTLENECKS_DATA})


@app.get("/api/presets", tags=["Portfolio Allocator & Simulator"], summary="Get Institutional Strategy Presets")
def get_presets() -> JSONResponse:
    """Returns pre-built institutional portfolio allocation templates (The Physical Bottleneck, The Silicon Monopoly, The Agentic App Supercycle, Balanced All-Weather)."""
    return JSONResponse({"presets": PRESET_TEMPLATES})


@app.post("/api/portfolio/simulate", tags=["Portfolio Allocator & Simulator"], summary="Simulate 6-Layer Portfolio Allocation")
def simulate_custom_portfolio(weights: PortfolioWeights) -> JSONResponse:
    """Calculates weighted portfolio valuation multiples (EV/Sales, P/E, Margins), projected 3-Year CAGR, risk score, and models 5-year compounding returns (Base, Bull, Bear)."""
    result = simulate_portfolio(weights)
    return JSONResponse(result)


@app.get("/healthz", tags=["System Health"], summary="Health Probe Endpoint")
def healthz() -> dict[str, str]:
    """Health check probe returning service operational status."""
    return {"status": "ok", "service": "alpha-ai-api"}


# ============================================================================
# Static Files & SPA Mounting
# ============================================================================

DIST = ROOT / "frontend" / "dist"
if DIST.is_dir():
    if (DIST / "assets").is_dir():
        app.mount("/assets", StaticFiles(directory=DIST / "assets"), name="assets")

    @app.get("/{full_path:path}", include_in_schema=False)
    async def serve_spa(full_path: str):
        file_path = DIST / full_path
        if file_path.is_file():
            return FileResponse(file_path)
        return FileResponse(DIST / "index.html")
