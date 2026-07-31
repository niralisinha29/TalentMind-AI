from backend.agents.ranking.agent import RankingAgent
from backend.agents.talent_search.agent import TalentSearchAgent

from backend.core.ai.tasks.task import (
    Task,
    TaskStatus
)


class HiringWorkflow:

    def __init__(self):

        self.talent_search = TalentSearchAgent()
        self.ranking_agent = RankingAgent()

    def execute(self, hiring_goal: str):

        workflow_result = {

            "workflow_status": "started",

            "steps": []

        }

        search_task = Task(

            task_id="TASK-001",

            assigned_agent="TalentSearchAgent",

            description="Search suitable candidates.",

            input_data={

                "job_description": hiring_goal

            }

        )

        candidate_results = self.talent_search.execute(
            search_task
        )

        ranking_task = Task(
            task_id="TASK-002",assigned_agent="RankingAgent",description="Rank retrieved candidates.",

            input_data={
                "job_description": hiring_goal,"candidates": candidate_results["top_candidates"]

            }

        )
        
        ranking_results = self.ranking_agent.execute(ranking_task)
        print(">>> Ranking Result:")
        print(ranking_results)

        workflow_result["steps"].append(

            {

                "task": search_task.model_dump(),

                "result": candidate_results

            }
        )

        workflow_result["steps"].append(
            {
                "task": ranking_task.model_dump(),
                "result": ranking_results
            }
        )

        workflow_result["workflow_status"] = "completed"
        print("Total workflow steps:", len(workflow_result["steps"]))
        print(workflow_result)

        return workflow_result