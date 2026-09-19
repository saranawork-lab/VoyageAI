# FILE: app/routers/auth.py
from fastapi import APIRouter, Depends, HTTPException, status, Response, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Optional
from datetime import datetime, timedelta
import uuid
import logging

from app.models.user import UserCreate, UserDB, UserResponse
from app.core.database import get_db
from app.core.security import get_password_hash, verify_password, create_access_token, create_refresh_token
from app.services.otp_service import send_and_store_otp, verify_otp
from app.utils.constants import COLLECTION_USERS
from bson import ObjectId
from bson.errors import InvalidId
from app.core.config import settings
from app.core.dependencies import get_current_user

logger = logging.getLogger("pathwai.auth")

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
    """Register a new user. Returns a temporary userId for OTP verification. Data is NOT saved to MongoDB yet."""
    db = get_db()

    # Check for duplicate email or phone
    query_conditions = [{"email": user.email}]
    if user.phone:
        query_conditions.append({"phone": user.phone})

    existing_user = await db[COLLECTION_USERS].find_one({"$or": query_conditions})
    if existing_user:
        if existing_user.get("email") == user.email:
            raise HTTPException(status_code=400, detail="This email address is already registered. Try logging in instead.")
        else:
            raise HTTPException(status_code=400, detail="This phone number is already registered. Try logging in instead.")

    # Create temporary user data dictionary
    user_dict = user.model_dump()
    user_dict["password_hash"] = get_password_hash(user_dict.pop("password"))
    user_dict["tier"] = "plus"
    
    # We serialize datetime to string for redis storage
    user_dict["trial_ends_at"] = (datetime.utcnow() + timedelta(days=2)).isoformat()
    
    # We use a temporary UUID for the Redis key since we don't have a MongoDB ObjectId yet
    temp_user_id = str(uuid.uuid4())

    if user.phone:
        try:
            # Store in Redis instead of MongoDB
            success = send_and_store_otp(temp_user_id, user.phone, temp_user_data=user_dict)
            if not success:
                raise HTTPException(status_code=429, detail="Please wait a moment before requesting another OTP.")
        except HTTPException as e:
            raise e
        except Exception as e:
            logger.error(f"OTP send failed for temp user {temp_user_id}: {e}")
            raise HTTPException(status_code=500, detail="Failed to send OTP. Please try again.")

    return {"userId": temp_user_id, "message": "Check your phone for the OTP."}


@router.post("/verify-otp")
async def verify_user_otp(req: OTPVerify, response: Response):
    """Verify the OTP. If successful, insert the temporary user data into MongoDB."""
    verification_result = verify_otp(req.userId, req.otp)
    
    if not verification_result.get("success"):
        raise HTTPException(status_code=400, detail="Invalid or expired OTP. Please request a new one.")
        
    temp_user_data = verification_result.get("temp_user_data")
    if not temp_user_data:
        raise HTTPException(status_code=400, detail="Registration session expired. Please register again.")

    # Convert the ISO string back to datetime
    if "trial_ends_at" in temp_user_data:
        temp_user_data["trial_ends_at"] = datetime.fromisoformat(temp_user_data["trial_ends_at"])
    
    # User is verified, so we can set these flags
    temp_user_data["isPhoneVerified"] = True
    
    new_user = UserDB(**temp_user_data)
    
    db = get_db()
    try:
        result = await db[COLLECTION_USERS].insert_one(new_user.model_dump(by_alias=True, exclude={"id"}))
    except Exception as e:
        logger.error(f"MongoDB insert failed during OTP verification: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to create account. Database error: {str(e)}")

    user_id = str(result.inserted_id)

    access_token = create_access_token(user_id)
    refresh_token = create_refresh_token(user_id)

    response.set_cookie(
        key="pathwai_refresh",
        value=refresh_token,
        httponly=True,
        secure=True,
        samesite="strict"
    )

    user = await db[COLLECTION_USERS].find_one({"_id": result.inserted_id})
    return {"accessToken": access_token, "user": UserResponse(**user)}


class ResendOTPRequest(BaseModel):
    userId: str

@router.post("/resend-otp")
async def resend_otp(req: ResendOTPRequest):
    """Resend the OTP to the user's pending phone number in Redis."""
    from app.core.redis_client import get_redis
    import json
    
    redis = get_redis()
    temp_user_json = redis.get(f"temp_user:{req.userId}")
    
    if not temp_user_json:
         raise HTTPException(status_code=404, detail="Registration session expired. Please register again.")
         
    temp_user_str = temp_user_json if isinstance(temp_user_json, str) else temp_user_json.decode('utf-8')
    temp_user_data = json.loads(temp_user_str)
    
    phone = temp_user_data.get("phone")
    if not phone:
        raise HTTPException(status_code=400, detail="No phone number associated with this session.")

    try:
        # We pass temp_user_data back in so it refreshes the TTL in Redis
        success = send_and_store_otp(req.userId, phone, temp_user_data=temp_user_data)
        if not success:
             raise HTTPException(status_code=429, detail="Please wait a moment before requesting another OTP.")
    except Exception as e:
        logger.error(f"OTP resend failed for temp user {req.userId}: {e}")
        raise HTTPException(status_code=500, detail="Failed to send OTP. Please try again later.")
        
    return {"message": "OTP sent successfully."}


@router.post("/login")
async def login(req: LoginRequest, response: Response):
    """Log in with email or phone + password."""
    db = get_db()

    if not req.emailOrPhone or not req.emailOrPhone.strip():
        raise HTTPException(status_code=400, detail="Email or phone number is required.")

    if not req.password:
        raise HTTPException(status_code=400, detail="Password is required.")

    user = await db[COLLECTION_USERS].find_one({
        "$or": [
            {"email": req.emailOrPhone.strip()},
            {"phone": req.emailOrPhone.strip()}
        ]
    })

    if not user:
        raise HTTPException(status_code=401, detail="No account found with this email or phone number.")

    if not user.get("password_hash"):
        raise HTTPException(status_code=401, detail="This account was created via Google Sign-In. Please use Google to log in.")

    if not verify_password(req.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Incorrect password. Please try again.")

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
    """Return the currently authenticated user's profile."""
    return UserResponse(**current_user)


@router.post("/logout")
async def logout(response: Response):
    """Log out by clearing the refresh token cookie."""
    response.delete_cookie("pathwai_refresh")
    return {"detail": "Logged out successfully."}
