# FILE: app/services/ai_service.py
import httpx
from fastapi import HTTPException
from app.core.config import settings

async def call_rag_endpoint(path: str, payload: dict) -> dict:
    url = f"{settings.RAG_ENDPOINT_URL.rstrip('/')}/{path.lstrip('/')}"
    headers = {"Authorization": f"Bearer {settings.RAG_API_KEY}"}
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(url, json=payload, headers=headers, timeout=30.0)
            if response.status_code != 200:
                raise HTTPException(status_code=503, detail="Guidance service temporarily unavailable")
            return response.json()
        except httpx.RequestError:
            raise HTTPException(status_code=503, detail="Guidance service temporarily unavailable")
