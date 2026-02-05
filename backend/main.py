"""
MegamOS Backend - Production Ready API Server
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager
import logging
from pathlib import Path

from config import settings
from api.routes import (
    apps, users, auth, ai, monetization, 
    analytics, admin, health
)
from middleware.rate_limit import RateLimitMiddleware
from utils.logger import setup_logging

# Setup logging
setup_logging(settings.LOG_LEVEL)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown events"""
    logger.info("🚀 Starting MegamOS Backend")
    # Startup
    yield
    # Shutdown
    logger.info("🛑 Shutting down MegamOS Backend")

# Create FastAPI app
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    lifespan=lifespan,
    docs_url="/api/docs",
    openapi_url="/api/openapi.json",
)

# Middleware - Security
if settings.CORS_ENABLED:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.ALLOWED_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

app.add_middleware(
    TrustedHostMiddleware, 
    allowed_hosts=["localhost", "127.0.0.1", "*"]
)

if settings.RATE_LIMIT_ENABLED:
    app.add_middleware(RateLimitMiddleware)

# Include routers
app.include_router(health.router, prefix=settings.API_PREFIX, tags=["health"])
app.include_router(auth.router, prefix=settings.API_PREFIX, tags=["authentication"])
app.include_router(users.router, prefix=settings.API_PREFIX, tags=["users"])
app.include_router(apps.router, prefix=settings.API_PREFIX, tags=["apps"])
app.include_router(ai.router, prefix=settings.API_PREFIX, tags=["ai"])
app.include_router(monetization.router, prefix=settings.API_PREFIX, tags=["monetization"])
app.include_router(analytics.router, prefix=settings.API_PREFIX, tags=["analytics"])
app.include_router(admin.router, prefix=settings.API_PREFIX, tags=["admin"])

# Static files
static_path = Path(__file__).parent.parent / "dist"
if static_path.exists():
    app.mount("/", StaticFiles(directory=str(static_path), html=True), name="static")

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "name": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "status": "running",
        "docs": "/api/docs"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.DEBUG,
        log_level=settings.LOG_LEVEL.lower()
    )
