# FILE: app/routers/internship.py
from fastapi import APIRouter, Depends
from app.core.dependencies import require_role
from app.utils.constants import ROLE_FOUNDER, ROLE_STUDENT

router = APIRouter(prefix="/internship", tags=["Internships"])

@router.post("/listing")
async def create_listing(current_user: dict = Depends(require_role(ROLE_FOUNDER))):
    return {"listingId": "mock_listing_id"}
