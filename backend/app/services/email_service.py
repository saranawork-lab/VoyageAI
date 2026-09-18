# FILE: app/services/email_service.py
import resend
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)
resend.api_key = settings.RESEND_API_KEY

async def send_email(to_email: str, subject: str, html_content: str):
    try:
        r = resend.Emails.send({
            "from": settings.RESEND_FROM_EMAIL,
            "to": to_email,
            "subject": subject,
            "html": html_content
        })
        return r
    except Exception as e:
        logger.error(f"Failed to send email to {to_email}: {e}")
        return None
