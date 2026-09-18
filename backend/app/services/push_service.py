# FILE: app/services/push_service.py
from firebase_admin import messaging
import logging

logger = logging.getLogger(__name__)

def send_push_notification(token: str, title: str, body: str, data: dict = None):
    try:
        message = messaging.Message(
            notification=messaging.Notification(title=title, body=body),
            data=data if data else {},
            token=token,
        )
        response = messaging.send(message)
        return response
    except Exception as e:
        logger.error(f"Failed to send push notification: {e}")
        return None
