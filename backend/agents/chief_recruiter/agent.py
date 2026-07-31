from .planner import HiringPlanner

from backend.core.ai.llm.llm_gateway import LLMGateway
from backend.workflows.hiring_workflow import HiringWorkflow
from backend.core.ai.reasoning.reasoning_engine import ReasoningEngine
from backend.core.ai.prompts.builder import PromptBuilder


class ChiefRecruiterAgent:

    def __init__(self):

        self.planner = HiringPlanner()
        self.llm = LLMGateway()
        self.reasoning = ReasoningEngine()
        self.workflow = HiringWorkflow()

    def plan(self, hiring_goal: str):

        # Step 1: Create execution plan
        plan = self.planner.create_plan(hiring_goal)

        # Step 2: Analyze whether enough information exists
        reasoning = self.reasoning.analyze_goal(hiring_goal)

        # Step 3: Execute workflow only if enough information is available
        if reasoning["can_execute"]:

            workflow = self.workflow.execute(
                hiring_goal
            )

        else:

            workflow = {
                "workflow_status": "waiting_for_user_input",
                "reason": "Additional hiring information required."
            }

        # Step 4: Build prompt
        prompt = PromptBuilder.build(
            hiring_goal=hiring_goal,
            plan=plan,
            reasoning=reasoning
        )

        # Step 5: Generate AI explanation
        llm_response = self.llm.generate(prompt)

        if llm_response.success:

            ai_summary = llm_response.content

        else:

            ai_summary = (
                "Execution plan created successfully. "
                "AI explanation is currently unavailable."
            )

        # Step 6: Return final response
        return {

            "status": "success",

            "planner": plan,

            "reasoning": reasoning,

            "workflow": workflow,

            "ai_summary": ai_summary

        }