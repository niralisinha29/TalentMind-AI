import json

from backend.jd_parser import parse_jd


def build_candidate_text(candidate):

    text_parts = []

    profile = candidate["profile"]

    text_parts.append(
        profile.get("headline", "")
    )

    text_parts.append(
        profile.get("summary", "")
    )

    for skill in candidate["skills"]:

        text_parts.append(
            skill["name"]
        )

    for job in candidate["career_history"]:

        text_parts.append(
            job.get("title", "")
        )

        text_parts.append(
            job.get("description", "")
        )

    return " ".join(text_parts).lower()


def semantic_match_score(
    candidate_text,
    jd_skills
):

    semantic_groups = {

        "RAG": [
            "rag",
            "embeddings",
            "vector search",
            "faiss",
            "qdrant",
            "weaviate",
            "pinecone",
            "milvus",
            "langchain",
            "llamaindex"
        ],

        "Prompt Engineering": [
            "prompt",
            "llm",
            "fine-tuning",
            "lora",
            "qlora",
            "peft"
        ],

        "Machine Learning": [
            "machine learning",
            "deep learning",
            "tensorflow",
            "pytorch",
            "ml"
        ]
    }

    total_score = 0

    for jd_skill in jd_skills:

        if jd_skill in semantic_groups:

            keywords = semantic_groups[
                jd_skill
            ]

            hits = 0

            for keyword in keywords:

                if keyword.lower() in candidate_text:

                    hits += 1

            skill_score = (
                hits / len(keywords)
            ) * 100

            total_score += skill_score

    if len(jd_skills) == 0:

        return 0

    return round(
        total_score / len(jd_skills),
        2
    )


if __name__ == "__main__":

    sample_jd = """
    Senior GenAI Engineer

    Required Skills:

    RAG
    Prompt Engineering

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

        candidate_text = (
            build_candidate_text(
                candidate
            )
        )

        score = (
            semantic_match_score(
                candidate_text,
                parsed_jd["skills"]
            )
        )

        print("\nCandidate:")
        print(
            candidate["profile"][
                "anonymized_name"
            ]
        )

        print(
            f"\nSemantic Match Score: {score}"
        )