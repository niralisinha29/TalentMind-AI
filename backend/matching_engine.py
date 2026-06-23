import json

from backend.jd_parser import parse_jd


def calculate_match_score(
    candidate,
    parsed_jd
):

    candidate_skills = {
        skill["name"]
        for skill in candidate["skills"]
    }

    jd_skills = set(
        parsed_jd["skills"]
    )

    matched_skills = (
        candidate_skills.intersection(
            jd_skills
        )
    )

    missing_skills = (
        jd_skills - candidate_skills
    )

    if len(jd_skills) > 0:

        match_score = (
            len(matched_skills)
            / len(jd_skills)
        ) * 100

    else:

        match_score = 0

    return {
        "candidate":
            candidate["profile"][
                "anonymized_name"
            ],

        "match_score":
            round(match_score, 2),

        "matched_skills":
            list(matched_skills),

        "missing_skills":
            list(missing_skills)
    }


sample_jd = """
Senior GenAI Engineer

Required Skills:

Python
RAG
LangChain
Prompt Engineering
Vector Search

Experience:
5+ years
"""

parsed_jd = parse_jd(
    sample_jd
)

with open(
    "data/candidates.jsonl",
    "r",
    encoding="utf-8"
) as f:

    candidate = json.loads(
        next(f)
    )

    result = calculate_match_score(
        candidate,
        parsed_jd
    )

    print("\nResult:\n")

    print(result)