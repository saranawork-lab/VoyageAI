# FILE: main.py
from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import logging

from app.core.config import settings
from app.core.database import connect_db, close_db
from app.core.redis_client import init_redis
from app.core.firebase_admin import init_firebase
from app.middleware.cors import get_cors_middleware
from app.middleware.rate_limit import limiter
from slowapi.middleware import SlowAPIMiddleware
from slowapi.errors import RateLimitExceeded
from slowapi import _rate_limit_exceeded_handler

# Import all routers (Will be implemented later)
from app.routers import health, auth, onboarding, career, startup, investor, parent, market, internship, abroad, mentor, payment, notification, user

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("Starting PathwAI backend...")
    await connect_db()
    init_redis()
    init_firebase()
    logger.info("PathwAI backend started.")
    yield
    # Shutdown
    logger.info("Shutting down PathwAI backend...")
    await close_db()
    logger.info("PathwAI backend stopped.")

app = FastAPI(
    title="PathwAI Backend",
    version="1.0.0",
    lifespan=lifespan
)

# Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.state.limiter = limiter
app.add_middleware(SlowAPIMiddleware)
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Global Exception Handlers
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    errors = []
    for error in exc.errors():
        loc = ".".join([str(l) for l in error.get("loc", [])])
        errors.append({"field": loc, "message": error.get("msg")})
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={"detail": errors},
    )

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled exception: {exc}", exc_info=True)
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": f"An unexpected error occurred: {str(exc)}"},
    )

# Routers
api_prefix = "/api/v1"
app.include_router(health.router, prefix=api_prefix)
app.include_router(auth.router, prefix=api_prefix)
app.include_router(onboarding.router, prefix=api_prefix)
app.include_router(career.router, prefix=api_prefix)
app.include_router(startup.router, prefix=api_prefix)
app.include_router(investor.router, prefix=api_prefix)
app.include_router(parent.router, prefix=api_prefix)
app.include_router(market.router, prefix=api_prefix)
app.include_router(internship.router, prefix=api_prefix)
app.include_router(abroad.router, prefix=api_prefix)
app.include_router(mentor.router, prefix=api_prefix)
app.include_router(payment.router, prefix=api_prefix)
app.include_router(notification.router, prefix=api_prefix)
app.include_router(user.router, prefix=api_prefix)

@app.get("/")
async def root():
    return {"service": "PathwAI Backend", "version": "1.0", "status": "running"}
