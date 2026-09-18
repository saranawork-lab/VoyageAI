# FILE: app/core/firebase_admin.py
import json
import firebase_admin
from firebase_admin import credentials
from app.core.config import settings

def init_firebase():
    if not firebase_admin._apps:
        try:
            cert_dict = json.loads(settings.FIREBASE_SERVICE_ACCOUNT_JSON)
            cred = credentials.Certificate(cert_dict)
            firebase_admin.initialize_app(cred)
        except Exception as e:
            # Note: In production, failing firebase init might be tolerable if pushes aren't critical to startup
            raise RuntimeError(f"Failed to initialize Firebase Admin SDK: {e}")
