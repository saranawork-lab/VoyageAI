# FILE: app/routers/onboarding.py
from fastapi import APIRouter, Depends
from app.core.dependencies import get_current_user
from app.core.database import get_db
from app.utils.constants import COLLECTION_ONBOARDING, COLLECTION_USERS
from bson import ObjectId
from pydantic import BaseModel

router = APIRouter(prefix="/onboarding", tags=["Onboarding"])

class OnboardingStep(BaseModel):
    step: int
    data: dict

@router.post("/step")
async def save_step(data: OnboardingStep, current_user: dict = Depends(get_current_user)):
    db = get_db()
    await db[COLLECTION_ONBOARDING].update_one(
        {"userId": str(current_user["_id"]), "step": data.step},
        {"$set": {"data": data.data}},
        upsert=True
    )
    return {"step": data.step, "saved": True}

@router.put("/complete")
async def complete_onboarding(current_user: dict = Depends(get_current_user)):
    db = get_db()
    await db[COLLECTION_USERS].update_one(
        {"_id": current_user["_id"]},
        {"$set": {"isOnboarded": True}}
    )
    return {"detail": "Onboarding complete"}

@router.get("/status")
async def get_status(current_user: dict = Depends(get_current_user)):
    db = get_db()
    steps = await db[COLLECTION_ONBOARDING].find({"userId": str(current_user["_id"])}).to_list(length=100)
    completed_steps = [s["step"] for s in steps]
    return {
        "isOnboarded": current_user.get("isOnboarded", False),
        "completedSteps": completed_steps,
        "role": current_user.get("role")
    }
