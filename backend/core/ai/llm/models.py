from pydantic import BaseModel
from typing import Optional


class LLMRequest(BaseModel):
    prompt: str
    temperature: float = 0.3


class LLMResponse(BaseModel):
    success: bool
    content: str
    model: str
    error: Optional[str] = None