# FILE: app/routers/payment.py
from fastapi import APIRouter, Depends, Request
from app.core.dependencies import get_current_user
from app.services.payment_service import create_order, verify_webhook_signature
from app.core.config import settings
from pydantic import BaseModel

router = APIRouter(prefix="/payments", tags=["Payments"])

class OrderRequest(BaseModel):
    amount: int
    receipt: str

@router.post("/create-order")
async def create_payment_order(req: OrderRequest, current_user: dict = Depends(get_current_user)):
    order = create_order(req.amount, req.receipt)
    if not order:
        return {"error": "Failed to create order"}
    return {"orderId": order["id"], "amount": req.amount, "currency": "INR", "keyId": settings.RAZORPAY_KEY_ID}

@router.post("/webhook")
async def razorpay_webhook(request: Request):
    body = await request.body()
    signature = request.headers.get("X-Razorpay-Signature")
    if verify_webhook_signature(body.decode('utf-8'), signature):
        # Process webhook logic async
        pass
    return {"status": "ok"}
