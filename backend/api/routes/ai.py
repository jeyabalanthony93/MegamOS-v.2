"""
AI service endpoints
"""
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import google.generativeai as genai
from .auth import get_current_user
from config import settings

router = APIRouter()

if settings.GEMINI_API_KEY:
    genai.configure(api_key=settings.GEMINI_API_KEY)

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[Message]
    model: str = "gemini-pro"
    temperature: float = 0.7
    max_tokens: Optional[int] = None

class ChatResponse(BaseModel):
    response: str
    model: str
    tokens_used: int

class TextGenerationRequest(BaseModel):
    prompt: str
    model: str = "gemini-pro"
    max_length: int = 500
    temperature: float = 0.7

@router.post("/ai/chat", response_model=ChatResponse)
async def chat(
    request: ChatRequest,
    current_user: dict = Depends(get_current_user)
):
    """Chat with AI assistant"""
    try:
        if not settings.GEMINI_API_KEY:
            raise HTTPException(status_code=400, detail="AI service not configured")
        
        model = genai.GenerativeModel(request.model)
        
        # Convert messages to format expected by Gemini
        chat_history = []
        for msg in request.messages:
            if msg.role == "user":
                chat_history.append({"role": "user", "parts": msg.content})
            elif msg.role == "assistant":
                chat_history.append({"role": "model", "parts": msg.content})
        
        chat = model.start_chat(history=chat_history[:-1])
        response = chat.send_message(
            chat_history[-1]["parts"],
            generation_config={
                "temperature": request.temperature,
                "max_output_tokens": request.max_tokens or 1000
            }
        )
        
        return {
            "response": response.text,
            "model": request.model,
            "tokens_used": 0  # Gemini doesn't expose token count yet
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/ai/generate")
async def generate_text(
    request: TextGenerationRequest,
    current_user: dict = Depends(get_current_user)
):
    """Generate text using AI"""
    try:
        if not settings.GEMINI_API_KEY:
            raise HTTPException(status_code=400, detail="AI service not configured")
        
        model = genai.GenerativeModel(request.model)
        response = model.generate_content(
            request.prompt,
            generation_config={
                "temperature": request.temperature,
                "max_output_tokens": request.max_length
            }
        )
        
        return {
            "generated_text": response.text,
            "model": request.model,
            "prompt_length": len(request.prompt)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/ai/models")
async def get_available_models():
    """Get available AI models"""
    try:
        models = genai.list_models()
        return {
            "models": [
                {
                    "name": m.name,
                    "display_name": m.display_name,
                    "description": m.description,
                    "version": m.version
                }
                for m in models
            ]
        }
    except Exception as e:
        return {
            "models": [
                {
                    "name": "gemini-pro",
                    "display_name": "Gemini Pro",
                    "description": "Most capable Gemini model",
                    "version": "1.0"
                }
            ]
        }

@router.post("/ai/agents/create")
async def create_agent(
    config: dict,
    current_user: dict = Depends(get_current_user)
):
    """Create a new AI agent"""
    return {
        "agent_id": "agent_" + __import__('uuid').uuid4().hex[:8],
        "name": config.get("name", "New Agent"),
        "model": config.get("model", "gemini-pro"),
        "status": "created"
    }

@router.get("/ai/agents")
async def list_agents(current_user: dict = Depends(get_current_user)):
    """List user's AI agents"""
    return {
        "agents": []
    }
