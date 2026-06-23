import json


TECH_ROLES = {
    "Backend Engineer",
    "Software Engineer",
    "Data Engineer",
    "Analytics Engineer",
    "ML Engineer",
    "Data Scientist"
}


def calculate_skill_credibility(skill, candidate):

    score = 0

    # Duration (40)

    duration = skill.get(
        "duration_months",
        0
    )

    score += min(
        duration / 2,
        40
    )

    # Endorsements (20)

    endorsements = skill.get(
        "endorsements",
        0
    )

    score += min(
        endorsements,
        20
    )

    # Assessment Score (30)

    assessments = (
        candidate["redrob_signals"]
        .get(
            "skill_assessment_scores",
            {}
        )
    )

    assessment_score = (
        assessments.get(
            skill["name"],
            0
        )
    )

    score += (
        assessment_score * 0.3
    )

    # Career Alignment (10)

    for role in candidate[
        "career_history"
    ]:

        if role["title"] in TECH_ROLES:

            score += 10
            break

    return round(
        min(score, 100),
        2
    )

if __name__ == "__main__":


    with open(
        "data/candidates.jsonl",
        "r",
        encoding="utf-8"
    ) as f:

        candidate = json.loads(
            next(f)
        )

        print(
            candidate["profile"][
                "anonymized_name"
            ]
        )

        print("\nSkill Credibility:\n")

        for skill in candidate[
            "skills"
        ][:10]:

            credibility = (
                calculate_skill_credibility(
                    skill,
                    candidate
                )
            )

            print(
                f"{skill['name']} -> {credibility}"
            )