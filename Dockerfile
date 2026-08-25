# Stage 1: Build Frontend with Bun
FROM oven/bun:1-slim AS frontend-builder
WORKDIR /app/frontend

COPY frontend/package.json frontend/bun.lock* ./
RUN bun install

COPY frontend/ ./
RUN bun run build

# Stage 2: Setup Python FastAPI Runtime
FROM python:3.14-slim
WORKDIR /app

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

COPY --from=ghcr.io/astral-sh/uv:latest /uv /bin/uv

COPY pyproject.toml uv.lock ./
RUN uv sync --frozen --no-dev

ENV PATH="/app/.venv/bin:$PATH"

COPY main.py README.md ./
COPY data ./data
COPY services ./services
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

ENV PORT=80
EXPOSE $PORT

CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-80}"]
