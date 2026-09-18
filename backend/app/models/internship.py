# FILE: app/models/internship.py
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from app.models.common import PyObjectId

class InternshipListingBase(BaseModel):
    title: str
    description: str
    mode: str
    minStipend: float
    duration: str
    skills: List[str]

class InternshipListingDB(InternshipListingBase):
    id: PyObjectId = Field(default=None, alias="_id")
    founderId: PyObjectId
    isActive: bool = True
    createdAt: datetime = Field(default_factory=datetime.utcnow)

class InternshipApplicationDB(BaseModel):
    id: PyObjectId = Field(default=None, alias="_id")
    listingId: PyObjectId
    studentId: PyObjectId
    status: str = "pending" # pending, under_review, accepted, rejected
    createdAt: datetime = Field(default_factory=datetime.utcnow)
