# FILE: app/models/parent.py
from pydantic import BaseModel, Field
from datetime import datetime
from app.models.common import PyObjectId

class ParentChildLinkDB(BaseModel):
    id: PyObjectId = Field(default=None, alias="_id")
    parentId: PyObjectId
    childId: Optional[PyObjectId] = None
    childPhone: str
    status: str = "pending" # pending, active, rejected
    createdAt: datetime = Field(default_factory=datetime.utcnow)

class GradeLogDB(BaseModel):
    id: PyObjectId = Field(default=None, alias="_id")
    userId: PyObjectId
    subject: str
    score: float
    examType: str
    date: datetime
