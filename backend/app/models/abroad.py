# FILE: app/models/abroad.py
from pydantic import BaseModel, Field
from typing import List
from datetime import datetime
from app.models.common import PyObjectId

class ChecklistItem(BaseModel):
    taskId: str
    title: str
    completed: bool = False

class AbroadPathwayDB(BaseModel):
    id: PyObjectId = Field(default=None, alias="_id")
    userId: PyObjectId
    country: str
    field: str
    budget: str
    timeline: str
    checklist: List[ChecklistItem]
    createdAt: datetime = Field(default_factory=datetime.utcnow)
