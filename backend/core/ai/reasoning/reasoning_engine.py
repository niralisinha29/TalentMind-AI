from typing import Dict, List


class ReasoningEngine:
    """
    Performs pre-execution reasoning before
    the workflow starts.
    """

    REQUIRED_FIELDS = [

        "experience",

        "location",

        "skills"

    ]

    def analyze_goal(self, hiring_goal: str) -> Dict:
        goal = hiring_goal.lower()

        missing: List[str] = []

        # Experience
        if (
            "experience" not in goal
            and re.search(r"\d+\+?\s*years?", goal) is None
        ):
            missing.append("experience")

        # Location
        location_keywords = [
            "pune",
            "mumbai",
            "bangalore",
            "bengaluru",
            "hyderabad",
            "chennai",
            "delhi",
            "gurgaon",
            "noida",
            "india",
            "remote",
            "onsite",
            "hybrid"
        ]

        if not any(keyword in goal for keyword in location_keywords):
            missing.append("location")

        # Primary technology
        tech_keywords = [
            "python",
            "java",
            "langchain",
            "langgraph",
            "azure openai",
            "rag",
            "fastapi"
        ]

        if not any(keyword in goal for keyword in tech_keywords):
            missing.append("primary technology")

        return {
            "can_execute": len(missing) == 0,
            "missing_information": missing
        }