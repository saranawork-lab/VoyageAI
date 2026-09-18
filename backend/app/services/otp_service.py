# FILE: app/services/otp_service.py
from app.core.redis_client import get_redis
from app.utils.constants import OTP_TTL_SECONDS
from app.core.security import generate_otp
from app.services.sms_service import send_sms

def send_and_store_otp(user_id: str, phone: str):
    redis = get_redis()
    if redis.exists(f"otp_lock:{user_id}"):
        return False
        
    otp = generate_otp()
    redis.set(f"otp:{user_id}", otp, ex=OTP_TTL_SECONDS)
    send_sms(phone, f"Your PathwAI OTP is {otp}. Valid for 10 minutes.")
    return True

def verify_otp(user_id: str, otp: str) -> bool:
    redis = get_redis()
    stored_otp = redis.get(f"otp:{user_id}")
    
    if not stored_otp:
        return False
        
    if stored_otp.decode('utf-8') == otp:
        redis.delete(f"otp:{user_id}")
        return True
        
    attempts = redis.incr(f"otp_attempts:{user_id}")
    if attempts >= 5:
        redis.set(f"otp_lock:{user_id}", "locked", ex=3600)
        redis.delete(f"otp_attempts:{user_id}")
        redis.delete(f"otp:{user_id}")
    
    return False
