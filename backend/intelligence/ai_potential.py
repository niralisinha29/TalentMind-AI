import json

FOUNDATION_SKILLS = {
    "Python",
    "SQL",
    "Spark",
    "Kafka",
    "Airflow",
    "Databricks",
    "Docker",
    "Kubernetes",
    "AWS",
    "Azure",
    "GCP",
    "Apache Beam"
}

AI_SKILLS = {
    "NLP",
    "Fine-tuning LLMs",
    "LoRA",
    "Speech Recognition",
    "Image Classification",
    "TTS",
    "Machine Learning",
    "Deep Learning",
    "TensorFlow",
    "PyTorch"
}

CAREER_ROLES = {
    "Data Engineer",
    "Analytics Engineer",
    "Backend Engineer",
    "Software Engineer",
    "ML Engineer",
    "Data Scientist"
}


def calculate_ai_potential(candidate):

    score = 0
    reasons = []

    # --------------------------------------------------
    # 1. Technical Foundation (Max 25)
    # --------------------------------------------------

    candidate_skills = {
        skill["name"]
        for skill in candidate["skills"]
    }

    foundation_matches = len(
        candidate_skills.intersection(
            FOUNDATION_SKILLS
        )
    )

    foundation_score = min(
        foundation_matches * 5,
        25
    )

    score += foundation_score

    if foundation_score > 0:
        reasons.append(
            f"Technical foundation ({foundation_matches} relevant skills)"
        )

    # --------------------------------------------------
    # 2. AI Exposure (Max 20)
    # --------------------------------------------------

    ai_matches = len(
        candidate_skills.intersection(
            AI_SKILLS
        )
    )

    ai_score = min(
        ai_matches * 4,
        20
    )

    score += ai_score

    if ai_score > 0:
        reasons.append(
            f"AI exposure ({ai_matches} AI-related skills)"
        )

    # --------------------------------------------------
    # 3. Career Alignment (Max 20)
    # --------------------------------------------------

    career_matches = 0

    for role in candidate["career_history"]:

        if role["title"] in CAREER_ROLES:
            career_matches += 1

    career_score = min(
        career_matches * 5,
        20
    )

    score += career_score

    if career_score > 0:
        reasons.append(
            f"Career alignment ({career_matches} relevant roles)"
        )

    # --------------------------------------------------
    # 4. Learning Mindset (Max 10)
    # --------------------------------------------------

    summary = candidate["profile"][
        "summary"
    ].lower()

    learning_keywords = [
        "learning",
        "transitioning",
        "projects",
        "kaggle",
        "ai",
        "ml",
        "machine learning",
        "deep learning",
        "fine-tuning",
        "llm"
    ]

    hits = sum(
        keyword in summary
        for keyword in learning_keywords
    )

    learning_score = min(
        hits * 2,
        10
    )

    score += learning_score

    if learning_score > 0:
        reasons.append(
            "Learning mindset detected"
        )

    # --------------------------------------------------
    # 5. Assessment Scores (Max 15)
    # --------------------------------------------------

    assessment_scores = (
        candidate["redrob_signals"]
        .get(
            "skill_assessment_scores",
            {}
        )
    )

    if assessment_scores:

        avg_score = (
            sum(
                assessment_scores.values()
            )
            / len(
                assessment_scores
            )
        )

        if avg_score >= 70:

            score += 15

            reasons.append(
                "Strong assessment performance"
            )

        elif avg_score >= 50:

            score += 10

            reasons.append(
                "Moderate assessment performance"
            )

        elif avg_score >= 30:

            score += 5

            reasons.append(
                "Basic assessment performance"
            )

    # --------------------------------------------------
    # 6. Certifications (Max 10)
    # --------------------------------------------------

    cert_count = len(
        candidate["certifications"]
    )

    cert_score = min(
        cert_count * 2,
        10
    )

    score += cert_score

    if cert_score > 0:
        reasons.append(
            f"{cert_count} certifications"
        )

    # --------------------------------------------------
    # 7. GitHub Activity (Max 10)
    # --------------------------------------------------

    github_score = (
        candidate["redrob_signals"]
        .get(
            "github_activity_score",
            0
        )
    )

    if github_score > 8:

        score += 10

        reasons.append(
            "High GitHub activity"
        )

    elif github_score > 5:

        score += 5

        reasons.append(
            "Moderate GitHub activity"
        )

    return min(score, 100), reasons


# --------------------------------------------------
# Testing
# --------------------------------------------------
if __name__ == "__main__":

    with open(
        "data/candidates.jsonl",
        "r",
        encoding="utf-8"
    ) as f:

        count = 0

        for line in f:

            candidate = json.loads(
                line
            )

            score, reasons = (
                calculate_ai_potential(
                    candidate
                )
            )

            print("\n")
            print("=" * 80)

            print(
                candidate["profile"][
                    "anonymized_name"
                ]
            )

            print(
                f"AI Potential Score: {score}"
            )

            print("\nReasons:")

            for reason in reasons:
                print(
                    f"- {reason}"
                )

            count += 1

            if count == 5:
                break