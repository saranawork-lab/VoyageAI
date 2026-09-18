# FILE: app/models/user.py
from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime
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

class UserCreate(UserBase):
    password: str

class UserDB(UserBase):
    id: PyObjectId = Field(default=None, alias="_id")
    password_hash: Optional[str] = None
    createdAt: datetime = Field(default_factory=datetime.utcnow)

class UserResponse(UserBase):
    id: PyObjectId = Field(default=None, alias="_id")
    createdAt: datetime
