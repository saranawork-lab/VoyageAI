# FILE: app/routers/market.py
from fastapi import APIRouter
from app.services.job_market_service import fetch_job_demand_from_jsearch

router = APIRouter(prefix="/market", tags=["Market Intelligence"])

@router.get("/job-demand")
async def get_job_demand(role: str):
    demand = await fetch_job_demand_from_jsearch(role)
    return demand
