# FILE: app/services/payment_service.py
import razorpay
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)

def get_razorpay_client():
    return razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))

def create_order(amount_paise: int, receipt: str):
    client = get_razorpay_client()
    try:
        order = client.order.create({
            "amount": amount_paise,
            "currency": "INR",
            "receipt": receipt
        })
        return order
    except Exception as e:
        logger.error(f"Failed to create Razorpay order: {e}")
        return None

def verify_webhook_signature(body: str, signature: str) -> bool:
    client = get_razorpay_client()
    try:
        client.utility.verify_webhook_signature(body, signature, settings.RAZORPAY_WEBHOOK_SECRET)
        return True
    except razorpay.errors.SignatureVerificationError:
        return False
