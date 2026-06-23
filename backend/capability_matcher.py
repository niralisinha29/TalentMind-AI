import json

from backend.jd_parser import parse_jd
from backend.intelligence.capability_engine import calculate_capabilities


def load_taxonomy():

    with open(
        "config/skill_taxonomy.json",
        "r",
        encoding="utf-8"
    ) as f:

        return json.load(f)


def get_required_capabilities(jd_skills):

    taxonomy = load_taxonomy()

    required_capabilities = set()

    for category, skills in taxonomy.items():

        for jd_skill in jd_skills:

            if jd_skill in skills:

                required_capabilities.add(category)

    return list(required_capabilities)


def calculate_capability_match(
    candidate,
    required_capabilities
):

    candidate_capabilities = (
        calculate_capabilities(candidate)
    )

    scores = []

    for capability in required_capabilities:

        if capability in candidate_capabilities:

            scores.append(
                candidate_capabilities[
                    capability
                ]
            )

    if not scores:

        return 0

    return round(
        sum(scores) / len(scores),
        2
    )


if __name__ == "__main__":

    sample_jd = """
    Senior GenAI Engineer

    Required Skills:

    RAG
    LangChain
    Vector Search
    Prompt Engineering

    Experience:
    5+ years
    """

    parsed_jd = parse_jd(
        sample_jd
    )

    required_capabilities = (
        get_required_capabilities(
            parsed_jd["skills"]
        )
    )

    print("\nRequired Capabilities:")
    print(required_capabilities)

    with open(
        "data/candidates.jsonl",
        "r",
        encoding="utf-8"
    ) as f:

        candidate = json.loads(
            next(f)
        )

        match_score = (
            calculate_capability_match(
                candidate,
                required_capabilities
            )
        )

        print("\nCandidate:")
        print(
            candidate["profile"][
                "anonymized_name"
            ]
        )

        print(
            f"\nCapability Match Score: {match_score}"
        )