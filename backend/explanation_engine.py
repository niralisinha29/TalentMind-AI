def generate_explanation(candidate_result):

    strengths = []
    weaknesses = []

    # -----------------------------
    # AI Potential
    # -----------------------------

    if candidate_result["ai_potential"] >= 60:
        strengths.append("High AI Potential")

    elif candidate_result["ai_potential"] >= 40:
        strengths.append("Good AI Growth Potential")

    else:
        weaknesses.append("AI learning potential needs improvement")

    # -----------------------------
    # Capability Match
    # -----------------------------

    if candidate_result["capability_match"] >= 30:
        strengths.append("Strong Capability Match")

    elif candidate_result["capability_match"] >= 15:
        strengths.append("Relevant Technical Background")

    else:
        weaknesses.append("Low capability match with job description")

    # -----------------------------
    # Skill Credibility
    # -----------------------------

    if candidate_result["skill_credibility"] >= 30:
        strengths.append("Credible Skill Profile")

    else:
        weaknesses.append("Skill profile needs improvement")

    # -----------------------------
    # Hiring Readiness
    # -----------------------------

    if candidate_result["hiring_readiness"] >= 70:
        strengths.append("Highly Available For Hiring")

    elif candidate_result["hiring_readiness"] >= 50:
        strengths.append("Good Hiring Readiness")

    else:
        weaknesses.append("Hiring readiness is moderate")

    # -----------------------------
    # Recommendation
    # -----------------------------

    if candidate_result["final_score"] >= 40:
        recommendation = "Strong Match"

    elif candidate_result["final_score"] >= 25:
        recommendation = "Moderate Match"

    else:
        recommendation = "Low Match"

    summary = (
        f"This candidate demonstrates a {recommendation.lower()} "
        f"based on AI capability analysis, semantic matching, "
        f"skill credibility and hiring readiness."
    )

    return {

        "recommendation": recommendation,

        "strengths": strengths,

        "weaknesses": weaknesses,

        "summary": summary

    }


if __name__ == "__main__":

    sample = {

        "candidate": "Ira Vora",

        "capability_match": 20.8,

        "ai_potential": 70,

        "skill_credibility": 36.86,

        "hiring_readiness": 74.44,

        "final_score": 46.82

    }

    print(generate_explanation(sample))