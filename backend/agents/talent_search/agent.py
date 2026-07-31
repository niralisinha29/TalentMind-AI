from backend.services.candidate_search_service import CandidateSearchService
from backend.core.ai.tasks.task import Task, TaskStatus


class TalentSearchAgent:
    """
    AI Employee responsible for finding
    the most relevant candidates.
    """

    def __init__(self):

        self.search_service = CandidateSearchService()

    def execute(self, task: Task):

        task.status = TaskStatus.RUNNING

        job_description = task.input_data["job_description"]

        candidates = self.search_service.search_candidates(
            job_description
        )

        task.status = TaskStatus.COMPLETED

        return {

            "task_id": task.task_id,

            "status": task.status,

            "total_candidates": len(candidates),

            "top_candidates": candidates[:10]

        }