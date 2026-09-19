# FILE: app/models/user.py
from pydantic import BaseModel, EmailStr, Field, field_validator
from typing import Optional, List
from datetime import datetime
import re
from app.models.common import PyObjectId

class UserBase(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    role: str
    tier: str = "free"
    isOnboarded: bool = False
    isPhoneVerified: bool = False
    isEmailVerified: bool = False
    avatarUrl: Optional[str] = None
    location: Optional[str] = None
    language: Optional[str] = None
    deviceTokens: List[str] = []

    @field_validator('phone')
    @classmethod
    def validate_phone(cls, v):
        if v is not None:
            # Simple E.164-ish validation: + followed by 10 to 15 digits
            if not re.match(r'^\+?[1-9]\d{9,14}$', v):
                raise ValueError('Invalid phone number format')
        return v

class UserCreate(UserBase):
    password: str

    @field_validator('password')
    @classmethod
    def validate_password(cls, v):
        if len(v) < 8:
            raise ValueError('Password must be at least 8 characters long')
        if not re.search(r'[A-Z]', v):
            raise ValueError('Password must contain at least one uppercase letter')
        if not re.search(r'[a-z]', v):
            raise ValueError('Password must contain at least one lowercase letter')
        if not re.search(r'[0-9]', v):
            raise ValueError('Password must contain at least one number')
        if not re.search(r'[!@#$%^&*(),.?":{}|<>]', v):
            raise ValueError('Password must contain at least one special character')
        return v

class UserDB(UserBase):
    id: PyObjectId = Field(default=None, alias="_id")
    password_hash: Optional[str] = None
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    trial_ends_at: Optional[datetime] = None

class UserResponse(UserBase):
    id: PyObjectId = Field(default=None, alias="_id")
    createdAt: datetime
    trial_ends_at: Optional[datetime] = None
