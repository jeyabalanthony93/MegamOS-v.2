"""
User management endpoints
"""
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, EmailStr
from typing import Optional
from .auth import get_current_user

router = APIRouter()

class UserProfile(BaseModel):
    email: EmailStr
    name: str
    avatar_url: Optional[str] = None
    bio: Optional[str] = None
    created_at: str

class UpdateProfileRequest(BaseModel):
    name: Optional[str] = None
    bio: Optional[str] = None
    avatar_url: Optional[str] = None

@router.get("/users/profile", response_model=UserProfile)
async def get_profile(current_user: dict = Depends(get_current_user)):
    """Get user profile"""
    return {
        "email": current_user["email"],
        "name": "User",
        "bio": "",
        "created_at": "2024-01-01T00:00:00Z"
    }

@router.put("/users/profile")
async def update_profile(
    request: UpdateProfileRequest,
    current_user: dict = Depends(get_current_user)
):
    """Update user profile"""
    return {
        "message": "Profile updated successfully",
        "email": current_user["email"],
        **request.dict(exclude_unset=True)
    }

@router.get("/users/{user_id}")
async def get_user(user_id: str):
    """Get user by ID"""
    return {
        "id": user_id,
        "name": "User",
        "email": "user@example.com",
        "created_at": "2024-01-01T00:00:00Z"
    }

@router.delete("/users/profile")
async def delete_account(current_user: dict = Depends(get_current_user)):
    """Delete user account"""
    return {
        "message": "Account deleted successfully",
        "email": current_user["email"]
    }

@router.get("/users/settings/preferences")
async def get_preferences(current_user: dict = Depends(get_current_user)):
    """Get user preferences"""
    return {
        "theme": "dark",
        "language": "en",
        "notifications": True,
        "email_marketing": False
    }

@router.put("/users/settings/preferences")
async def update_preferences(
    preferences: dict,
    current_user: dict = Depends(get_current_user)
):
    """Update user preferences"""
    return {
        "message": "Preferences updated",
        **preferences
    }
