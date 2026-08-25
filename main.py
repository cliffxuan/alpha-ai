from __future__ import annotations

import json
import logging
from pathlib import Path
from typing import Any

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles

from services.portfolio import PortfolioWeights, simulate_portfolio, PRESET_TEMPLATES
from services.valuation import get_valuation_summary

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("alpha-ai.api")

app = FastAPI(
    title="AlphaAI · The 6-Layer Cake Framework for AI Investing",
    description="Investment decision platform tracking valuations, supply chain moats, CapEx flows, and layer-by-layer value capture across the AI economy.",
    version="1.0.0",
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


@app.get("/api/layers")
def get_layers() -> JSONResponse:
    """Returns the 6-Layer Cake framework definitions, theses, and moats."""
    return JSONResponse({"layers": LAYERS_DATA})


@app.get("/api/companies")
def get_companies(layer_id: int | None = None, comp_type: str | None = None) -> JSONResponse:
    """Returns public equities and private unicorns with valuation multiples."""
    comps = COMPANIES_DATA
    if layer_id is not None:
        comps = [c for c in comps if c["layer_id"] == layer_id]
    if comp_type is not None:
        comps = [c for c in comps if c["type"] == comp_type]
    return JSONResponse({"companies": comps})


@app.get("/api/valuations")
def get_valuations() -> JSONResponse:
    """Returns market multiple benchmarks across public and private companies."""
    summary = get_valuation_summary()
    return JSONResponse(summary)


@app.get("/api/capex-flows")
def get_capex_flows() -> JSONResponse:
    """Returns the $300B+ annual hyperscaler CapEx value capture flows."""
    return JSONResponse(CAPEX_DATA)


@app.get("/api/bottlenecks")
def get_bottlenecks() -> JSONResponse:
    """Returns supply chain lead times, transformer delays, and CoWoS allocations."""
    return JSONResponse({"bottlenecks": BOTTLENECKS_DATA})


@app.get("/api/presets")
def get_presets() -> JSONResponse:
    """Returns pre-built institutional portfolio allocation templates."""
    return JSONResponse({"presets": PRESET_TEMPLATES})


@app.post("/api/portfolio/simulate")
def simulate_custom_portfolio(weights: PortfolioWeights) -> JSONResponse:
    """Simulates multi-layer portfolio returns, weighted valuations, and compounding."""
    result = simulate_portfolio(weights)
    return JSONResponse(result)


@app.get("/healthz")
def healthz() -> dict[str, str]:
    return {"status": "ok", "service": "alpha-ai-api"}


# ============================================================================
# Static Files & SPA Mounting
# ============================================================================

DIST = ROOT / "frontend" / "dist"
if DIST.is_dir():
    app.mount("/", StaticFiles(directory=DIST, html=True), name="spa")
