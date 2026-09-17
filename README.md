# AlphaAI · The 5-Layer Cake Framework for AI Investment Intelligence

An institutional market intelligence and investment platform tracking the AI economy across NVIDIA's 5 structural layers: from **Energy & Grid Infrastructure** up to **Vertical Applications & Agentic AI**.

Comps and CapEx figures are a **static research snapshot** (not a live market data feed). See `as_of` / `source` fields in `data/companies.json`.

## The 5 Layers (NVIDIA AI Architecture)
1. **Layer 1: Energy & Grid Infrastructure** (CEG, VST, TLN, GEV, SBGSY, Vertiv, SMRs, Liquid Cooling)
2. **Layer 2: Chips & Semiconductor Fabrication** (NVDA, TSMC, ASML, Broadcom, MU, AMD, AMAT, LRCX, CDNS, HBM, CoWoS)
3. **Layer 3: Cloud Infrastructure & AI Factories** (Azure, AWS, GCP, OCI, CoreWeave/CRWV, Arista 800G, Equinix, Coherent)
4. **Layer 4: Foundation Models & Frontier Labs** (OpenAI, Anthropic, Meta Llama, xAI, Scale AI, RLVR)
5. **Layer 5: Applications & Agentic AI** (Palantir, ServiceNow, Salesforce, Snowflake, Adobe, Cursor, Databricks)

## Features
- **Layer-by-Layer Moat Matrix:** Deep margin profiles, risk factors, and value capture analysis.
- **Valuation Radar:** Public multiples (P/E, EV/Sales, CapEx %) and private unicorn funding rounds (snapshot).
- **~$730B CapEx Flow Simulator:** Tracking Big-4 2026E hyperscaler capital flows (~$720–745B guidance band) across 5 layers.
- **Supply Chain Bottleneck Monitor:** Research snapshot of lead times (transformers 36mo, CoWoS, HBM).
- **Portfolio Allocator & Scenario Engine:** Custom 5-layer weighting and 5-year compounding simulations.

## Tech Stack
- **Backend:** Python 3.14 + FastAPI + `uv`
- **Frontend:** React 19 + TypeScript + Vite + Bun + Tailwind CSS v4 + Recharts
