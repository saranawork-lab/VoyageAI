# FILE: app/models/career.py
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from app.models.common import PyObjectId

class Milestone(BaseModel):
    title: str
    description: str
    status: str = "pending"

class CareerPlanDB(BaseModel):
    id: PyObjectId = Field(default=None, alias="_id")
    userId: PyObjectId
    roadmap: List[Milestone]
    createdAt: datetime = Field(default_factory=datetime.utcnow)

class CareerPlanResponse(CareerPlanDB):
    pass
