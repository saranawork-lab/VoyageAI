# FILE: app/routers/auth.py
from fastapi import APIRouter, Depends, HTTPException, status, Response, Request
from pydantic import BaseModel
from typing import Optional
from app.models.user import UserCreate, UserDB, UserResponse
from app.core.database import get_db
from app.core.security import get_password_hash, verify_password, create_access_token, create_refresh_token
from app.services.otp_service import send_and_store_otp, verify_otp
from app.utils.constants import COLLECTION_USERS
from bson import ObjectId
import httpx
from app.core.config import settings
from app.core.dependencies import get_current_user

router = APIRouter(prefix="/auth", tags=["Auth"])

class OTPVerify(BaseModel):
    userId: str
    otp: str

class LoginRequest(BaseModel):
    emailOrPhone: str
    password: str

class GoogleAuth(BaseModel):
    idToken: str
    role: str = "student"

@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(user: UserCreate):
    db = get_db()
    existing_user = await db[COLLECTION_USERS].find_one({"$or": [{"email": user.email}, {"phone": user.phone}]})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email or phone already registered")
        
    user_dict = user.model_dump()
    user_dict["password_hash"] = get_password_hash(user_dict.pop("password"))
    new_user = UserDB(**user_dict)
    
    result = await db[COLLECTION_USERS].insert_one(new_user.model_dump(by_alias=True, exclude={"id"}))
    user_id = str(result.inserted_id)
    
    if user.phone:
        send_and_store_otp(user_id, user.phone)
        
    return {"userId": user_id, "message": "Verify OTP to continue"}

@router.post("/verify-otp")
async def verify_user_otp(req: OTPVerify, response: Response):
    if not verify_otp(req.userId, req.otp):
        raise HTTPException(status_code=400, detail="Invalid or expired OTP")
        
    db = get_db()
    await db[COLLECTION_USERS].update_one(
        {"_id": ObjectId(req.userId)}, 
        {"$set": {"isPhoneVerified": True}}
    )
    
    access_token = create_access_token(req.userId)
    refresh_token = create_refresh_token(req.userId)
    
    response.set_cookie(
        key="pathwai_refresh",
        value=refresh_token,
        httponly=True,
        secure=True,
        samesite="strict"
    )
    
    user = await db[COLLECTION_USERS].find_one({"_id": ObjectId(req.userId)})
    return {"accessToken": access_token, "user": UserResponse(**user)}

@router.post("/login")
async def login(req: LoginRequest, response: Response):
    db = get_db()
    user = await db[COLLECTION_USERS].find_one({"$or": [{"email": req.emailOrPhone}, {"phone": req.emailOrPhone}]})
    
    if not user or not verify_password(req.password, user.get("password_hash")):
        raise HTTPException(status_code=401, detail="Invalid credentials")
        
    if not user.get("isPhoneVerified"):
        send_and_store_otp(str(user["_id"]), user.get("phone"))
        return JSONResponse(status_code=403, content={"detail": "phone_not_verified", "userId": str(user["_id"])})
        
    access_token = create_access_token(str(user["_id"]))
    refresh_token = create_refresh_token(str(user["_id"]))
    
    response.set_cookie(
        key="pathwai_refresh",
        value=refresh_token,
        httponly=True,
        secure=True,
        samesite="strict"
    )
    return {"accessToken": access_token, "user": UserResponse(**user)}

@router.get("/me", response_model=UserResponse)
async def get_me(current_user: dict = Depends(get_current_user)):
    return UserResponse(**current_user)

@router.post("/logout")
async def logout(response: Response):
    response.delete_cookie("pathwai_refresh")
    return {"detail": "Logged out"}
