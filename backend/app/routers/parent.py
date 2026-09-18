# FILE: app/routers/parent.py
from fastapi import APIRouter, Depends
from app.core.dependencies import get_current_user, require_role
from app.utils.constants import ROLE_PARENT

router = APIRouter(prefix="/parent", tags=["Parent Dashboard"])

@router.post("/link-child")
async def link_child(current_user: dict = Depends(require_role(ROLE_PARENT))):
    return {"linkId": "mock_link_id", "pendingConsent": True}
