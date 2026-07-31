from backend.ranking_engine import rank_candidates_for_jd


class CandidateSearchService:
    """
    Responsible for retrieving ranked candidates
    using the existing TalentMind ranking engine.
    """

    def search_candidates(self, job_description: str):

        return rank_candidates_for_jd(job_description)