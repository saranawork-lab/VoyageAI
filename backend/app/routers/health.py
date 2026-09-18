# FILE: app/routers/health.py
from fastapi import APIRouter, status, Response
from app.core.database import get_db
from app.core.redis_client import get_redis
import logging

router = APIRouter(tags=["Health"])
logger = logging.getLogger(__name__)

@router.get("/health")
async def health_check(response: Response):
    db = get_db()
    redis = get_redis()
    status_dict = {"status": "ok", "mongodb": "disconnected", "redis": "disconnected"}
    
    try:
        await db.command("ping")
        status_dict["mongodb"] = "connected"
    except Exception as e:
        logger.error(f"Healthcheck: MongoDB ping failed - {e}")
        status_dict["status"] = "error"
        
    try:
        redis.ping()
        status_dict["redis"] = "connected"
    except Exception as e:
        logger.error(f"Healthcheck: Redis ping failed - {e}")
        status_dict["status"] = "error"

    if status_dict["status"] == "error":
        response.status_code = status.HTTP_503_SERVICE_UNAVAILABLE
        if status_dict["mongodb"] == "disconnected":
            return {"detail": "MongoDB"}
        return {"detail": "Redis"}

    return status_dict
