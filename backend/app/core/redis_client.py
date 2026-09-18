# FILE: app/core/redis_client.py
from upstash_redis import Redis
from app.core.config import settings

redis_client = None

def init_redis():
    global redis_client
    redis_client = Redis(
        url=settings.UPSTASH_REDIS_REST_URL,
        token=settings.UPSTASH_REDIS_REST_TOKEN
    )

def get_redis() -> Redis:
    return redis_client
