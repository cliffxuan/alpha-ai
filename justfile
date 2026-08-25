# AlphaAI Developer Recipes

# Install all dependencies (Python uv + Frontend bun)
install:
    uv sync
    cd frontend && bun install

# Start development servers (Backend + Frontend)
dev:
    uv run uvicorn main:app --reload --port 8000 &
    cd frontend && bun run dev

# Build frontend for production
build:
    cd frontend && bun run build

# Typecheck frontend
typecheck:
    cd frontend && bun run tsc -b

# Serve production build locally
serve: build
    uv run uvicorn main:app --port 8000

# Git status check
status:
    git status
