from typing import List
from pydantic import BaseModel


class RankedCandidate(BaseModel):

    candidate: str

    final_score: float

    recommendation: str

    confidence: int

    reasoning: List[str]


class RankingSummary(BaseModel):

    highly_recommended: int

    recommended: int

    hold: int

    reject: int


class RankingResult(BaseModel):

    recommended_candidates: List[RankedCandidate]

    summary: RankingSummary