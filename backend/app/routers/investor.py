# FILE: app/routers/investor.py
from fastapi import APIRouter, Depends
from app.core.dependencies import get_current_user, require_role
from app.utils.constants import ROLE_INVESTOR

router = APIRouter(prefix="/investor", tags=["Investor Match"])

@router.post("/profile")
async def create_profile(current_user: dict = Depends(require_role(ROLE_INVESTOR))):
    return {"status": "profile_created"}
