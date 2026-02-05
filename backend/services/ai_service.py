"""
AI Service Integration Module
"""
import google.generativeai as genai
from typing import List, Optional, AsyncGenerator
from config import settings

class AIService:
    """Enhanced AI service with streaming and agents"""
    
    def __init__(self, api_key: str = None):
        self.api_key = api_key or settings.GEMINI_API_KEY
        if self.api_key:
            genai.configure(api_key=self.api_key)
        self.model = genai.GenerativeModel('gemini-pro')
    
    async def chat(
        self,
        messages: List[dict],
        temperature: float = 0.7,
        max_tokens: int = 1000
    ) -> str:
        """Chat with AI model"""
        try:
            chat = self.model.start_chat(history=messages[:-1])
            response = chat.send_message(
                messages[-1]["content"],
                generation_config={
                    "temperature": temperature,
                    "max_output_tokens": max_tokens
                }
            )
            return response.text
        except Exception as e:
            raise Exception(f"AI chat error: {str(e)}")
    
    async def generate_text(
        self,
        prompt: str,
        temperature: float = 0.7,
        max_length: int = 500
    ) -> str:
        """Generate text from prompt"""
        try:
            response = self.model.generate_content(
                prompt,
                generation_config={
                    "temperature": temperature,
                    "max_output_tokens": max_length
                }
            )
            return response.text
        except Exception as e:
            raise Exception(f"Text generation error: {str(e)}")
    
    async def code_generation(self, description: str) -> str:
        """Generate code based on description"""
        prompt = f"""Generate production-ready code for: {description}
        
Include:
- Clear comments
- Error handling
- Type hints
- Best practices"""
        return await self.generate_text(prompt, max_length=2000)
    
    async def create_agent(
        self,
        name: str,
        system_prompt: str,
        tools: Optional[List[dict]] = None
    ) -> dict:
        """Create a specialized AI agent"""
        return {
            "agent_id": f"agent_{__import__('uuid').uuid4().hex[:8]}",
            "name": name,
            "system_prompt": system_prompt,
            "tools": tools or [],
            "model": "gemini-pro",
            "status": "active"
        }

ai_service = AIService()
