# FILE: app/routers/startup.py
from fastapi import APIRouter, Depends
from app.core.dependencies import get_current_user, require_role
from app.utils.constants import ROLE_FOUNDER

router = APIRouter(prefix="/startup", tags=["Startup Advisor"])

@router.post("/onboard")
async def onboard_startup(current_user: dict = Depends(require_role(ROLE_FOUNDER))):
    return {"startupId": "mock_startup_id", "planId": "mock_plan_id"}
