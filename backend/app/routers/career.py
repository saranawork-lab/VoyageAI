# FILE: app/routers/career.py
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from app.core.dependencies import get_current_user
from app.core.database import get_db
from app.core.redis_client import get_redis
from app.utils.constants import COLLECTION_CAREER_PLANS, TIER_FREE
from app.services.ai_service import call_rag_endpoint
from bson import ObjectId
import json
import asyncio
from datetime import datetime

router = APIRouter(prefix="/guidance", tags=["Career Guidance"])

@router.post("/career/generate")
async def generate_career_plan(current_user: dict = Depends(get_current_user)):
    user_id = str(current_user["_id"])
    redis = get_redis()
    
    if current_user.get("tier") == TIER_FREE:
        month = datetime.now().strftime("%Y-%m")
        key = f"career_queries:{user_id}:{month}"
        count = redis.get(key)
        if count and int(count) >= 3:
            raise HTTPException(status_code=429, detail={"detail": "monthly_limit_reached", "limit": 3, "tier": "free"})
        redis.incr(key)
        redis.expire(key, 31 * 24 * 60 * 60) # roughly end of month
        
    # Build payload
    payload = {"userId": user_id, "role": current_user.get("role")}
    
    # In a real streaming scenario, we would stream directly from httpx response.
    # Here we mock streaming since RAG implementation is external.
    async def fake_stream():
        yield "data: Generating your personalized career roadmap...\n\n"
        await asyncio.sleep(1)
        yield "data: Analyzing market trends...\n\n"
        await asyncio.sleep(1)
        plan = {"planId": "plan_123", "roadmap": [{"title": "Step 1", "description": "Do this", "status": "pending"}]}
        yield f"data: {json.dumps(plan)}\n\n"
        
    return StreamingResponse(fake_stream(), media_type="text/event-stream")

@router.get("/career/{userId}/roadmap")
async def get_roadmap(userId: str, current_user: dict = Depends(get_current_user)):
    db = get_db()
    plan = await db[COLLECTION_CAREER_PLANS].find_one({"userId": userId}, sort=[("createdAt", -1)])
    if plan:
        plan["_id"] = str(plan["_id"])
    return plan
