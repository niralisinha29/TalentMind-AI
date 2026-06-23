from fastapi import FastAPI
from pydantic import BaseModel

from backend.ranking_engine import (
    get_top_candidates,
    rank_candidates_for_jd
)

app = FastAPI(
    title="TalentMind AI",
    version="1.0"
)
class JobRequest(BaseModel):

    job_description: str

@app.get("/")
def home():

    return {
        "message":
        "TalentMind AI API Running"
    }


@app.get("/health")
def health():

    return {
        "status": "healthy",
        "service": "TalentMind AI"
    }


@app.get("/top-candidates")
def top_candidates():

    return get_top_candidates()

@app.post("/rank-job")
def rank_job(
    request: JobRequest
):

    results = (
        rank_candidates_for_jd(
            request.job_description
        )
    )

    return {
        "results": results
    }