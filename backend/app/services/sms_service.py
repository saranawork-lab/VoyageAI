# FILE: app/services/sms_service.py
from twilio.rest import Client
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)

client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)

def send_sms(to_phone: str, body: str):
    try:
        message = client.messages.create(
            body=body,
            from_=settings.TWILIO_PHONE_NUMBER,
            to=to_phone
        )
        return message.sid
    except Exception as e:
        logger.error(f"Failed to send SMS to {to_phone}: {e}")
        return None
