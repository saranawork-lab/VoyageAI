# FILE: app/routers/payment.py
from fastapi import APIRouter, Depends, Request
from app.core.dependencies import get_current_user
from app.services.payment_service import create_order, verify_webhook_signature
from app.core.config import settings
from pydantic import BaseModel
import json
from app.core.database import get_db
from app.utils.constants import COLLECTION_USERS, TIER_PRO
from bson import ObjectId
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/payments", tags=["Payments"])

class OrderRequest(BaseModel):
    amount: int
    receipt: str

@router.post("/create-order")
async def create_payment_order(req: OrderRequest, current_user: dict = Depends(get_current_user)):
    user_id = str(current_user["_id"])
    order = create_order(req.amount, req.receipt, notes={"userId": user_id})
    if not order:
        return {"error": "Failed to create order"}
    return {"orderId": order["id"], "amount": req.amount, "currency": "INR", "keyId": settings.RAZORPAY_KEY_ID}

@router.post("/webhook")
async def razorpay_webhook(request: Request):
    body = await request.body()
    signature = request.headers.get("X-Razorpay-Signature")
    
    if not signature:
        return {"status": "ignored"}
        
    try:
        body_str = body.decode('utf-8')
        if verify_webhook_signature(body_str, signature):
            payload = json.loads(body_str)
            
            if payload.get("event") == "payment.captured":
                payment_entity = payload.get("payload", {}).get("payment", {}).get("entity", {})
                notes = payment_entity.get("notes", {})
                user_id = notes.get("userId")
                
                if user_id:
                    db = get_db()
                    await db[COLLECTION_USERS].update_one(
                        {"_id": ObjectId(user_id)},
                        {"$set": {"tier": TIER_PRO}}
                    )
                    logger.info(f"Upgraded user {user_id} to PRO tier.")
                else:
                    logger.warning("Payment captured but no userId found in notes.")
            
        return {"status": "ok"}
    except Exception as e:
        logger.error(f"Webhook processing error: {e}")
        return {"status": "error"}
