# FILE: app/models/notification.py
from pydantic import BaseModel, Field
from datetime import datetime
from app.models.common import PyObjectId

class NotificationPreferencesDB(BaseModel):
    id: PyObjectId = Field(default=None, alias="_id")
    userId: PyObjectId
    emailEnabled: bool = True
    pushEnabled: bool = True
    whatsappEnabled: bool = False
    updatedAt: datetime = Field(default_factory=datetime.utcnow)
