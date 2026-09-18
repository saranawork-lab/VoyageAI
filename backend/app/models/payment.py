# FILE: app/models/payment.py
from pydantic import BaseModel, Field
from datetime import datetime
from app.models.common import PyObjectId

class PaymentDB(BaseModel):
    id: PyObjectId = Field(default=None, alias="_id")
    userId: PyObjectId
    orderId: str
    paymentId: str
    amount: int
    currency: str
    status: str
    createdAt: datetime = Field(default_factory=datetime.utcnow)
