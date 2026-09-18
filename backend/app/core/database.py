# FILE: app/core/database.py
import logging
from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings
from pymongo.errors import ConnectionFailure

logger = logging.getLogger(__name__)

client: AsyncIOMotorClient = None
db = None

async def connect_db():
    global client, db
    logger.info("Connecting to MongoDB...")
    client = AsyncIOMotorClient(settings.MONGODB_URI)
    
    try:
        await client.admin.command("ping")
        # Log host safely without exposing credentials
        host = client.address[0] if client.address else "unknown"
        logger.info(f"MongoDB connected successfully to cluster: {host}")
    except ConnectionFailure:
        logger.error(f"MongoDB connection failed on host: {client.address[0] if client.address else 'unknown'}")
        raise RuntimeError("MongoDB connection failed - check MONGODB_URI")
    except Exception as e:
        logger.error(f"MongoDB ping failed: {e}")
        raise RuntimeError(f"MongoDB connection failed - check MONGODB_URI. Error: {e}")

    db = client[settings.MONGODB_DB_NAME]
    await _create_indexes()

async def close_db():
    global client
    if client:
        client.close()
        logger.info("MongoDB connection closed.")

def get_db():
    return db

async def _create_indexes():
    # Create required indexes
    await db["users"].create_index("email", unique=True, sparse=True)
    await db["users"].create_index("phone", unique=True, sparse=True)
    await db["career_plans"].create_index([("userId", 1), ("createdAt", -1)])
    await db["grade_logs"].create_index("userId")
    await db["internship_listings"].create_index("skills")
    await db["job_demand"].create_index([("role", 1), ("date", -1)])
    logger.info("MongoDB indexes verified/created.")
