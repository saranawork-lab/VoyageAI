# FILE: app/services/otp_service.py
from app.core.redis_client import get_redis
from app.utils.constants import OTP_TTL_SECONDS
from app.core.security import generate_otp
from app.services.sms_service import send_sms
import json

def send_and_store_otp(user_id: str, phone: str, temp_user_data: dict = None):
    redis = get_redis()
    if redis.exists(f"otp_lock:{user_id}"):
        return False
        
    otp = generate_otp()
    redis.set(f"otp:{user_id}", otp, ex=OTP_TTL_SECONDS)
    
    if temp_user_data:
        # Store pending registration data temporarily
        redis.set(f"temp_user:{user_id}", json.dumps(temp_user_data), ex=OTP_TTL_SECONDS)
        
    send_sms(phone, f"Your PathwAI OTP is {otp}. Valid for 10 minutes.")
    return True

def verify_otp(user_id: str, otp: str) -> dict:
    """Verifies OTP and returns the temp user data if it was a pending registration, else True/False"""
    redis = get_redis()
    stored_otp = redis.get(f"otp:{user_id}")
    
    if not stored_otp:
        return {"success": False, "reason": "expired"}
        
    # Check if stored_otp is already a string (depending on decode_responses=True)
    stored_otp_str = stored_otp if isinstance(stored_otp, str) else stored_otp.decode('utf-8')
    
    if stored_otp_str == otp:
        redis.delete(f"otp:{user_id}")
        
        # Check if we have temporary user data to return
        temp_user = redis.get(f"temp_user:{user_id}")
        temp_data = None
        if temp_user:
            temp_user_str = temp_user if isinstance(temp_user, str) else temp_user.decode('utf-8')
            temp_data = json.loads(temp_user_str)
            redis.delete(f"temp_user:{user_id}")
            
        return {"success": True, "temp_user_data": temp_data}
        
    attempts = redis.incr(f"otp_attempts:{user_id}")
    if attempts >= 5:
        redis.set(f"otp_lock:{user_id}", "locked", ex=3600)
        redis.delete(f"otp_attempts:{user_id}")
        redis.delete(f"otp:{user_id}")
    
    return {"success": False, "reason": "invalid"}
