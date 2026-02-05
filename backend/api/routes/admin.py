"""
Admin endpoints
"""
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import List
from .auth import get_current_user

router = APIRouter()

class SystemStats(BaseModel):
    cpu_usage: float
    memory_usage: float
    disk_usage: float
    uptime_hours: int

class AdminUser(BaseModel):
    id: str
    email: str
    role: str
    created_at: str

class SystemConfig(BaseModel):
    maintenance_mode: bool
    debug_enabled: bool
    log_level: str
    rate_limit: int

async def verify_admin(current_user: dict = Depends(get_current_user)):
    """Verify admin access"""
    # In production, check user role from database
    if not current_user.get("is_admin"):
        raise HTTPException(status_code=403, detail="Admin access required")
    return current_user

@router.get("/admin/system/stats")
async def get_system_stats(admin_user: dict = Depends(verify_admin)):
    """Get system statistics"""
    return {
        "cpu_usage": 45.2,
        "memory_usage": 62.8,
        "disk_usage": 72.5,
        "uptime_hours": 720,
        "disk_free_gb": 50.3,
        "network_in_mbps": 125.5,
        "network_out_mbps": 89.3
    }

@router.get("/admin/users")
async def list_users(admin_user: dict = Depends(verify_admin)):
    """List all users"""
    return {
        "users": [
            {
                "id": "user_1",
                "email": "user1@example.com",
                "role": "user",
                "created_at": "2024-01-01T00:00:00Z",
                "last_login": "2024-01-10T15:30:00Z"
            }
        ],
        "total": 1,
        "page": 1,
        "per_page": 50
    }

@router.put("/admin/users/{user_id}/role")
async def update_user_role(
    user_id: str,
    role: str,
    admin_user: dict = Depends(verify_admin)
):
    """Update user role"""
    return {
        "message": f"User role updated to {role}",
        "user_id": user_id,
        "role": role
    }

@router.delete("/admin/users/{user_id}")
async def delete_user(
    user_id: str,
    admin_user: dict = Depends(verify_admin)
):
    """Delete user"""
    return {
        "message": f"User {user_id} deleted",
        "user_id": user_id
    }

@router.get("/admin/system/config")
async def get_system_config(admin_user: dict = Depends(verify_admin)):
    """Get system configuration"""
    return {
        "maintenance_mode": False,
        "debug_enabled": False,
        "log_level": "INFO",
        "rate_limit": 60,
        "max_upload_size_mb": 100,
        "session_timeout_minutes": 30
    }

@router.put("/admin/system/config")
async def update_system_config(
    config: dict,
    admin_user: dict = Depends(verify_admin)
):
    """Update system configuration"""
    return {
        "message": "System configuration updated",
        **config
    }

@router.get("/admin/logs")
async def get_logs(
    admin_user: dict = Depends(verify_admin),
    limit: int = 100,
    level: str = "INFO"
):
    """Get system logs"""
    return {
        "logs": [
            {
                "timestamp": "2024-01-10T15:30:00Z",
                "level": "INFO",
                "message": "User logged in",
                "source": "auth"
            }
        ],
        "total": 1,
        "limit": limit
    }

@router.get("/admin/api/usage")
async def get_api_usage(
    admin_user: dict = Depends(verify_admin),
    days: int = 7
):
    """Get API usage statistics"""
    return {
        "period_days": days,
        "total_requests": 50000,
        "unique_clients": 250,
        "requests_per_hour": 200,
        "top_endpoints": [
            {"path": "/api/v1/ai/chat", "requests": 5000},
            {"path": "/api/v1/apps", "requests": 4500},
            {"path": "/api/v1/users/profile", "requests": 4000}
        ],
        "average_response_time_ms": 150,
        "error_rate_percent": 0.5
    }

@router.get("/admin/backups")
async def list_backups(admin_user: dict = Depends(verify_admin)):
    """List system backups"""
    return {
        "backups": [
            {
                "id": "backup_1",
                "timestamp": "2024-01-10T00:00:00Z",
                "size_gb": 2.5,
                "type": "full",
                "status": "completed"
            }
        ]
    }

@router.post("/admin/backups/create")
async def create_backup(admin_user: dict = Depends(verify_admin)):
    """Create a new backup"""
    return {
        "message": "Backup creation started",
        "backup_id": "backup_" + __import__('uuid').uuid4().hex[:8],
        "status": "in_progress"
    }
