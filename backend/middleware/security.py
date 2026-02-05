"""
Enhanced security middleware and utilities
"""
from fastapi import Request, HTTPException
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse
import secrets
import hashlib

class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    """Add security headers to responses"""
    
    async def dispatch(self, request: Request, call_next):
        response = await call_next(request)
        
        # Security headers
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
        response.headers["Content-Security-Policy"] = "default-src 'self'"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        
        return response

class CSRFProtectionMiddleware(BaseHTTPMiddleware):
    """CSRF token validation"""
    
    def __init__(self, app):
        super().__init__(app)
        self.safe_methods = {"GET", "HEAD", "OPTIONS"}
    
    async def dispatch(self, request: Request, call_next):
        if request.method not in self.safe_methods:
            csrf_token = request.headers.get("X-CSRF-Token")
            session_token = request.cookies.get("csrf_token")
            
            if not csrf_token or not session_token:
                return JSONResponse(
                    status_code=403,
                    content={"detail": "CSRF token missing"}
                )
        
        response = await call_next(request)
        return response

def generate_csrf_token() -> str:
    """Generate a CSRF token"""
    return secrets.token_urlsafe(32)
