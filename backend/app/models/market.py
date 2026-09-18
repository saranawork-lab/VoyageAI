# FILE: app/models/market.py
from pydantic import BaseModel, Field
from typing import List
from datetime import datetime
from app.models.common import PyObjectId

class JobDemandDB(BaseModel):
    id: PyObjectId = Field(default=None, alias="_id")
    role: str
    totalResults: int
    topCompanies: List[str]
    topLocations: List[str]
    date: datetime = Field(default_factory=datetime.utcnow)

class TalentProfileDB(BaseModel):
    id: PyObjectId = Field(default=None, alias="_id")
    userId: PyObjectId
    skills: List[str]
    availability: str
    updatedAt: datetime = Field(default_factory=datetime.utcnow)
