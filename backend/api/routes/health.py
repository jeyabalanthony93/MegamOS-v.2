"""
Health check endpoints
"""
from fastapi import APIRouter, HTTPException
import psutil
import os

router = APIRouter()

@router.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "MegamOS Backend",
        "timestamp": __import__('datetime').datetime.utcnow().isoformat()
    }

@router.get("/health/deep")
async def deep_health_check():
    """Deep health check with system stats"""
    try:
        cpu_percent = psutil.cpu_percent(interval=1)
        memory = psutil.virtual_memory()
        disk = psutil.disk_usage('/')
        
        return {
            "status": "healthy",
            "system": {
                "cpu_percent": cpu_percent,
                "memory_percent": memory.percent,
                "disk_percent": disk.percent,
                "available_memory_mb": memory.available // (1024 * 1024)
            },
            "timestamp": __import__('datetime').datetime.utcnow().isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/ping")
async def ping():
    """Simple ping endpoint"""
    return {"message": "pong"}
