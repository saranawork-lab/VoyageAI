# FILE: app/models/startup.py
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from app.models.common import PyObjectId

class StartupBase(BaseModel):
    idea: str
    sector: str
    budget: str
    teamSize: int

class StartupDB(StartupBase):
    id: PyObjectId = Field(default=None, alias="_id")
    userId: PyObjectId
    createdAt: datetime = Field(default_factory=datetime.utcnow)

class StartupPlanDB(BaseModel):
    id: PyObjectId = Field(default=None, alias="_id")
    startupId: PyObjectId
    milestones: List[dict]
    createdAt: datetime = Field(default_factory=datetime.utcnow)
