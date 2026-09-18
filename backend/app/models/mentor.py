# FILE: app/models/mentor.py
from pydantic import BaseModel, Field
from typing import List
from datetime import datetime
from app.models.common import PyObjectId

class MentorDB(BaseModel):
    id: PyObjectId = Field(default=None, alias="_id")
    name: str
    specialisation: str
    experience: int
    bio: str

class MentorSlotDB(BaseModel):
    id: PyObjectId = Field(default=None, alias="_id")
    mentorId: PyObjectId
    startTime: datetime
    endTime: datetime
    isBooked: bool = False

class MentorBookingDB(BaseModel):
    id: PyObjectId = Field(default=None, alias="_id")
    mentorId: PyObjectId
    userId: PyObjectId
    slotId: PyObjectId
    status: str = "confirmed"
    createdAt: datetime = Field(default_factory=datetime.utcnow)
