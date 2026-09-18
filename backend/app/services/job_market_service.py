# FILE: app/services/job_market_service.py
import httpx
from app.core.config import settings

async def fetch_job_demand_from_jsearch(role: str) -> dict:
    url = f"https://jsearch.p.rapidapi.com/search?query={role}&num_pages=1"
    headers = {
        "X-RapidAPI-Key": settings.JSEARCH_API_KEY,
        "X-RapidAPI-Host": "jsearch.p.rapidapi.com"
    }
    
    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers)
        if response.status_code == 200:
            data = response.json().get("data", [])
            companies = list(set([job.get("employer_name") for job in data if job.get("employer_name")]))[:5]
            locations = list(set([job.get("job_city") for job in data if job.get("job_city")]))[:5]
            return {
                "totalResults": len(data),
                "topCompanies": companies,
                "topLocations": locations
            }
        return {"totalResults": 0, "topCompanies": [], "topLocations": []}
