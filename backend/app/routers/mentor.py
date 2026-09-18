# FILE: app/routers/mentor.py
from fastapi import APIRouter

router = APIRouter(prefix="/mentor", tags=["Mentorship"])

@router.get("/")
async def get_mentors():
    return []
