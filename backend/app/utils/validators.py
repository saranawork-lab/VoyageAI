# FILE: app/utils/validators.py
import re
from fastapi import HTTPException

def validate_india_phone(phone: str) -> bool:
    """Validates Indian phone number format (e.g. +919876543210)"""
    pattern = re.compile(r"^\+91[6-9]\d{9}$")
    if not pattern.match(phone):
        raise ValueError("Invalid Indian phone number format. Must start with +91 followed by 10 digits.")
    return True

def validate_email_format(email: str) -> bool:
    """Basic email validation"""
    pattern = re.compile(r"^[\w\.-]+@[\w\.-]+\.\w+$")
    if not pattern.match(email):
        raise ValueError("Invalid email format.")
    return True
