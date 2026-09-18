# FILE: app/models/investor.py
from pydantic import BaseModel, Field
from typing import List
from datetime import datetime
from app.models.common import PyObjectId

class InvestorProfileBase(BaseModel):
    sectors: List[str]
    ticketRange: str
    thesis: str

class InvestorProfileDB(InvestorProfileBase):
    id: PyObjectId = Field(default=None, alias="_id")
    userId: PyObjectId
    createdAt: datetime = Field(default_factory=datetime.utcnow)
