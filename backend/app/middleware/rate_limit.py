# FILE: app/middleware/rate_limit.py
from slowapi import Limiter
from slowapi.util import get_remote_address
from fastapi import Request

def get_user_or_ip(request: Request) -> str:
    # If user is authenticated, use their user_id, else fallback to IP
    auth_header = request.headers.get("Authorization")
    if auth_header and auth_header.startswith("Bearer "):
        # Ideally we decode JWT here, but for simplicity we hash the token or just use it as key
        # In a real setup, we would extract the sub field.
        return auth_header.split(" ")[1][:30] 
    return get_remote_address(request)

limiter = Limiter(key_func=get_user_or_ip)
