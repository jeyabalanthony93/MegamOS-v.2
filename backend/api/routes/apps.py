"""
App management endpoints
"""
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from .auth import get_current_user

router = APIRouter()

class App(BaseModel):
    id: str
    name: str
    description: str
    icon: str
    category: str
    version: str
    installed: bool
    enabled: bool

class AppConfig(BaseModel):
    id: str
    config: dict

@router.get("/apps", response_model=List[App])
async def list_apps(
    category: Optional[str] = None,
    current_user: dict = Depends(get_current_user)
):
    """List available apps"""
    apps = [
        {
            "id": "dashboard",
            "name": "Cloud Dashboard",
            "description": "System dashboard and monitoring",
            "icon": "LayoutDashboard",
            "category": "system",
            "version": "1.0.0",
            "installed": True,
            "enabled": True
        },
        {
            "id": "terminal",
            "name": "Terminal",
            "description": "Command line terminal",
            "icon": "Terminal",
            "category": "tools",
            "version": "1.0.0",
            "installed": True,
            "enabled": True
        },
        {
            "id": "ai_studio",
            "name": "AI Studio",
            "description": "AI-powered development studio",
            "icon": "Workflow",
            "category": "ai",
            "version": "2.0.0",
            "installed": True,
            "enabled": True
        },
        {
            "id": "browser",
            "name": "Browser",
            "description": "Web browser",
            "icon": "Globe",
            "category": "internet",
            "version": "1.0.0",
            "installed": True,
            "enabled": True
        }
    ]
    
    if category:
        apps = [app for app in apps if app["category"] == category]
    
    return apps

@router.get("/apps/{app_id}")
async def get_app(
    app_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Get app details"""
    return {
        "id": app_id,
        "name": "App Name",
        "description": "App description",
        "icon": "AppIcon",
        "category": "system",
        "version": "1.0.0",
        "installed": True,
        "enabled": True
    }

@router.post("/apps/{app_id}/install")
async def install_app(
    app_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Install an app"""
    return {
        "message": f"App {app_id} installed successfully",
        "app_id": app_id,
        "status": "installed"
    }

@router.post("/apps/{app_id}/uninstall")
async def uninstall_app(
    app_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Uninstall an app"""
    return {
        "message": f"App {app_id} uninstalled successfully",
        "app_id": app_id,
        "status": "uninstalled"
    }

@router.put("/apps/{app_id}/config")
async def update_app_config(
    app_id: str,
    config: AppConfig,
    current_user: dict = Depends(get_current_user)
):
    """Update app configuration"""
    return {
        "message": f"App {app_id} configuration updated",
        "app_id": app_id,
        "config": config.config
    }

@router.get("/apps/categories")
async def get_categories():
    """Get app categories"""
    return {
        "categories": [
            "system", "ai", "tools", "internet", 
            "development", "multimedia", "utilities"
        ]
    }
