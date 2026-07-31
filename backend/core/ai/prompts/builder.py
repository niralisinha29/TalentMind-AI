from backend.agents.chief_recruiter.prompt import (
    CHIEF_RECRUITER_SYSTEM_PROMPT
)


class PromptBuilder:

    @staticmethod
    def build(
        hiring_goal,
        plan,
        reasoning
    ):

        return f"""
{CHIEF_RECRUITER_SYSTEM_PROMPT}

Recruiter's Hiring Goal:
{hiring_goal}

Execution Plan:
{plan.model_dump_json(indent=2)}

Reasoning:
{reasoning}

Explain this execution plan in a professional way so that the recruiter
understands what the AI is about to do.

Keep it concise.
"""