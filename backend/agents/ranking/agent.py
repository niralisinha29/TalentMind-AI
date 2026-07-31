import json

from backend.agents.ranking.prompt import RANKING_SYSTEM_PROMPT
from backend.core.ai.llm.llm_gateway import LLMGateway
from backend.core.ai.tasks.task import Task, TaskStatus
from backend.agents.ranking.schema import (
    RankedCandidate,
    RankingSummary,
    RankingResult,
)


class RankingAgent:

    def __init__(self):
        self.llm = LLMGateway()

    def build_prompt(self, job_description: str, candidate: dict):
        return f"""
{RANKING_SYSTEM_PROMPT}

Job Description:
{job_description}

Candidate Information

Name: {candidate.get("candidate", "")}
Experience: {candidate.get("experience", "")}

Final Score: {candidate.get("final_score", "")}
Capability Match: {candidate.get("capability_match", "")}
AI Potential: {candidate.get("ai_potential", "")}
Skill Credibility: {candidate.get("skill_credibility", "")}
Hiring Readiness: {candidate.get("hiring_readiness", "")}

Strengths:
{candidate.get("strengths", "")}

Weaknesses:
{candidate.get("weaknesses", "")}
"""

    def execute(self, task: Task):
        print(">>> Ranking Agent Started")

        task.status = TaskStatus.RUNNING

        candidates = task.input_data["candidates"]
        print(f">>> Received {len(candidates)} candidates")

        recommended_candidates = []

        summary = {
            "highly_recommended": 0,
            "recommended": 0,
            "hold": 0,
            "reject": 0,
        }

        for candidate in candidates:

            score = candidate["final_score"]

            prompt = self.build_prompt(
                task.input_data["job_description"],
                candidate,
            )

            print("\n>>> Sending candidate to Gemini...")
            print(candidate["candidate"])

            response = self.llm.generate(prompt)

            print(">>> Gemini Response")
            print(response)

            # Default fallback values
            recommendation = "Hold"
            confidence = 50
            reasoning = []

            # Check whether Gemini call succeeded
            if not response.success:

                print(">>> Gemini Error")
                print(response.error)

                reasoning = [response.error]

            else:

                try:

                    response_text = response.content
                    response_text = (
                        response_text
                        .replace("```json", "")
                        .replace("```", "")
                        .strip()
                    )

                    gemini_result = json.loads(response_text)

                    recommendation = gemini_result.get(
                        "recommendation", "Hold"
                    )
                    confidence = gemini_result.get(
                        "confidence", 50
                    )
                    reasoning = gemini_result.get(
                        "reasoning",
                        ["No reasoning returned by Gemini."]
                    )

                except Exception as e:

                    print(">>> JSON Parsing Error")
                    print(e)

                    recommendation = "Hold"
                    confidence = 50
                    reasoning = [f"JSON Parsing Error: {e}"]

            # Summary
            if recommendation == "Highly Recommended":
                summary["highly_recommended"] += 1

            elif recommendation == "Recommended":
                summary["recommended"] += 1

            elif recommendation == "Hold":
                summary["hold"] += 1

            else:
                summary["reject"] += 1

            recommended_candidates.append(
                RankedCandidate(
                    candidate=candidate["candidate"],
                    final_score=score,
                    recommendation=recommendation,
                    confidence=confidence,
                    reasoning=reasoning,
                )
            )

        task.status = TaskStatus.COMPLETED

        result = RankingResult(
            recommended_candidates=recommended_candidates,
            summary=RankingSummary(**summary),
        )

        print(">>> Ranking Agent Finished")
        print(">>> Ranking Summary")
        print(summary)

        return {
            "task_id": task.task_id,
            "status": task.status,
            "result": result.model_dump(),
        }