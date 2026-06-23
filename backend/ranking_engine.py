import json

from backend.jd_parser import parse_jd

from backend.semantic_retriever import (
    retrieve_candidates
)

from backend.capability_matcher import (
    get_required_capabilities,
    calculate_capability_match
)

from backend.intelligence.ai_potential import (
    calculate_ai_potential
)

from backend.intelligence.skill_credibility import (
    calculate_skill_credibility
)

from backend.intelligence.hiring_readiness import (
    calculate_hiring_readiness
)

from backend.explanation_engine import (
    generate_explanation
)


def calculate_average_credibility(candidate):

    skills = candidate["skills"]

    if not skills:
        return 0

    scores = []

    for skill in skills:

        credibility = (
            calculate_skill_credibility(
                skill,
                candidate
            )
        )

        scores.append(
            credibility
        )

    return round(
        sum(scores) / len(scores),
        2
    )


def calculate_final_score(
    candidate,
    required_capabilities
):

    capability_match = (
        calculate_capability_match(
            candidate,
            required_capabilities
        )
    )

    ai_potential, _ = (
        calculate_ai_potential(
            candidate
        )
    )

    skill_credibility = (
        calculate_average_credibility(
            candidate
        )
    )

    hiring_readiness, _ = (
        calculate_hiring_readiness(
            candidate
        )
    )

    # Base Score
    final_score = (

        capability_match * 0.40 +

        ai_potential * 0.25 +

        hiring_readiness * 0.15 +

        skill_credibility * 0.10

    )

    explanation = generate_explanation(

        {

            "capability_match":
                round(capability_match, 2),

            "ai_potential":
                round(ai_potential, 2),

            "skill_credibility":
                round(skill_credibility, 2),

            "hiring_readiness":
                round(hiring_readiness, 2),

            "final_score":
                round(final_score, 2)

        }

    )

    return {

        "candidate":
            candidate["profile"][
                "anonymized_name"
            ],

        "capability_match":
            round(capability_match, 2),

        "ai_potential":
            round(ai_potential, 2),

        "skill_credibility":
            round(skill_credibility, 2),

        "hiring_readiness":
            round(hiring_readiness, 2),

        "final_score":
            round(final_score, 2),

        "recommendation":
            explanation["recommendation"],

        "strengths":
            explanation["strengths"]

    }

    

def get_candidate_by_name(candidate_name):

    with open(
        "data/candidates.jsonl",
        "r",
        encoding="utf-8"
    ) as f:

        for line in f:

            candidate = json.loads(
                line
            )

            if (
                candidate["profile"][
                    "anonymized_name"
                ]
                ==
                candidate_name
            ):

                return candidate

    return None

def get_top_candidates():

    sample_jd = """
    Senior GenAI Engineer

    Required Skills:

    Python
    RAG
    LangChain
    Vector Search
    Prompt Engineering
    LLMs
    Machine Learning

    Responsibilities:

    Build GenAI applications using
    Retrieval Augmented Generation,
    Vector Databases,
    Prompt Engineering,
    and Large Language Models.

    Experience:
    5+ years
    """

    results = rank_candidates_for_jd(
        sample_jd
    )

    return results[:10]


def rank_candidates_for_jd(job_description):

    parsed_jd = parse_jd(
        job_description
    )

    required_capabilities = (
        get_required_capabilities(
            parsed_jd["skills"]
        )
    )

    semantic_candidates = (
        retrieve_candidates(
            job_description,
            top_k=50
        )
    )

    results = []

    for item in semantic_candidates:

        candidate = get_candidate_by_name(
            item["name"]
        )

        if candidate is None:
            continue

        result = calculate_final_score(
            candidate,
            required_capabilities
        )

        result["semantic_similarity"] = (
            item["semantic_similarity"]
        )

        result["final_score"] = round(

            result["capability_match"] * 0.40 +

            result["ai_potential"] * 0.25 +

            result["hiring_readiness"] * 0.15 +

            result["skill_credibility"] * 0.10 +

            (result["semantic_similarity"] * 100) * 0.10,

            2

        )

        results.append(
            result
        )

    results = sorted(

        results,

        key=lambda x:
        x["final_score"],

        reverse=True

    )

    return results

if __name__ == "__main__":

    results = get_top_candidates()

    print("\nTOP CANDIDATES\n")

    for candidate in results:

        print("=" * 80)

        print(
            candidate["candidate"]
        )

        print(
            f"Final Score: {candidate['final_score']}"
        )

        print(
            f"Capability Match: {candidate['capability_match']}"
        )

        print(
            f"AI Potential: {candidate['ai_potential']}"
        )

        print(
            f"Skill Credibility: {candidate['skill_credibility']}"
        )

        print(
            f"Hiring Readiness: {candidate['hiring_readiness']}"
        )