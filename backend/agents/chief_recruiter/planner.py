from typing import List

from .schema import (
    RecruiterPlan,
    ExecutionStep
)


class HiringPlanner:
    """
    Responsible for creating the hiring workflow.

    NOTE:
    Version 1 uses rule-based planning.

    Later this planner will be replaced by
    LangGraph + LLM reasoning.
    """

    def create_plan(self, hiring_goal: str) -> RecruiterPlan:

        execution_steps: List[ExecutionStep] = [

            ExecutionStep(
                step_number=1,
                title="Understand Hiring Requirements",
                description="Analyze recruiter intent and identify required skills."
            ),

            ExecutionStep(
                step_number=2,
                title="Search Candidate Database",
                description="Retrieve matching candidates using semantic search."
            ),

            ExecutionStep(
                step_number=3,
                title="Analyze Candidate Profiles",
                description="Evaluate resumes, skills and experience."
            ),

            ExecutionStep(
                step_number=4,
                title="Rank Candidates",
                description="Generate explainable hiring recommendations."
            ),

            ExecutionStep(
                step_number=5,
                title="Prepare Interview Kit",
                description="Generate personalized interview questions."
            )

        ]

        clarification_questions = []

        goal = hiring_goal.lower()

        if "experience" not in goal:
            clarification_questions.append(
                "How many years of experience are required?"
            )

        if "location" not in goal:
            clarification_questions.append(
                "Is there a preferred work location?"
            )

        return RecruiterPlan(

            hiring_goal=hiring_goal,

            summary="Created an execution plan for the hiring request.",

            execution_plan=execution_steps,

            clarification_questions=clarification_questions,

            requires_human_approval=True
        )