import json


def calculate_hiring_readiness(candidate):

    signals = candidate["redrob_signals"]

    score = 0
    reasons = []

    # Open To Work (25)

    if signals.get("open_to_work_flag"):

        score += 25
        reasons.append(
            "Open to work"
        )

    # Notice Period (25)

    notice_period = signals.get(
        "notice_period_days",
        999
    )

    if notice_period <= 30:

        score += 25
        reasons.append(
            "Short notice period"
        )

    elif notice_period <= 60:

        score += 15
        reasons.append(
            "Moderate notice period"
        )

    elif notice_period <= 90:

        score += 8

    # Recruiter Response Rate (15)

    recruiter_rate = signals.get(
        "recruiter_response_rate",
        0
    )

    score += recruiter_rate * 15

    # Interview Completion Rate (15)

    interview_rate = signals.get(
        "interview_completion_rate",
        0
    )

    score += interview_rate * 15

    # Profile Completeness (10)

    profile_score = signals.get(
        "profile_completeness_score",
        0
    )

    score += (
        profile_score / 100
    ) * 10

    # Verification (10)

    if (
        signals.get("verified_email")
        and
        signals.get("verified_phone")
    ):

        score += 10
        reasons.append(
            "Verified profile"
        )

    return round(
        min(score, 100),
        2
    ), reasons


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
                calculate_hiring_readiness(
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
                f"Hiring Readiness: {score}"
            )

            print("Reasons:")

            for reason in reasons:

                print(
                    f"- {reason}"
                )

            count += 1

            if count == 5:
                break