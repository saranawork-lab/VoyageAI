# FILE: scripts/seed_scholarships.py
import asyncio
from app.core.database import connect_db, close_db, db
from app.utils.constants import COLLECTION_SCHOLARSHIPS

async def seed():
    await connect_db()
    scholarships = [
        {"title": "Tech Innovators Scholarship", "field": "Computer Science", "amount": 5000},
        {"title": "Future Founders Grant", "field": "Business", "amount": 10000}
    ]
    await db[COLLECTION_SCHOLARSHIPS].insert_many(scholarships)
    print("Seeded scholarships.")
    await close_db()

if __name__ == "__main__":
    asyncio.run(seed())
