# FILE: app/routers/abroad.py
from fastapi import APIRouter

router = APIRouter(prefix="/abroad", tags=["Study Abroad"])

@router.get("/countries")
async def get_countries():
    return [{"id": "us", "name": "United States"}, {"id": "uk", "name": "United Kingdom"}]
