# FILE: app/routers/notification.py
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from app.core.dependencies import get_current_user

router = APIRouter(prefix="/notification", tags=["Notifications"])

class DeviceTokenReq(BaseModel):
    token: str
    platform: str

@router.post("/device-token")
async def register_device_token(req: DeviceTokenReq, current_user: dict = Depends(get_current_user)):
    # Upsert token to user doc
    return {"status": "registered"}
