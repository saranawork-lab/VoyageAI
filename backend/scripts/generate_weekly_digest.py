# FILE: scripts/generate_weekly_digest.py
import asyncio
import logging
from app.core.database import connect_db, close_db
from app.core.config import settings

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

async def run_digest():
    await connect_db()
    logger.info("Generating weekly digests...")
    # Fetch parent-child links, fetch grades, call RAG, send emails...
    logger.info("Weekly digests complete.")
    await close_db()

if __name__ == "__main__":
    asyncio.run(run_digest())
