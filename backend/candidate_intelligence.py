AI_SKILLS = {
    "NLP",
    "Fine-tuning LLMs",
    "LoRA",
    "Speech Recognition",
    "Image Classification",
    "TTS",
    "Machine Learning",
    "Deep Learning",
    "PyTorch",
    "TensorFlow",
    "LangChain",
    "RAG",
    "Vector Database",
    "Embeddings"
}


def calculate_ai_readiness(candidate):

    score = 0

    # AI Skills (40 points)

    skills = candidate["skills"]

    ai_skill_count = 0

    for skill in skills:

        if skill["name"] in AI_SKILLS:

            ai_skill_count += 1

    score += min(ai_skill_count * 5, 40)

    # AI Experience (25 points)

    summary = candidate["profile"]["summary"].lower()

    ai_keywords = [
        "machine learning",
        "ml",
        "ai",
        "llm",
        "deep learning",
        "kaggle",
        "fine-tuning"
    ]

    keyword_hits = 0

    for keyword in ai_keywords:

        if keyword in summary:
            keyword_hits += 1

    score += min(keyword_hits * 5, 25)

    # Learning Signals (15 points)

    if "learning" in summary:
        score += 5

    if "transitioning" in summary:
        score += 5

    if "projects" in summary:
        score += 5

    # GitHub Activity (10 points)

    github_score = candidate["redrob_signals"].get(
        "github_activity_score",
        0
    )

    if github_score > 8:
        score += 10

    elif github_score > 5:
        score += 5

    # Certifications (10 points)

    cert_count = len(candidate["certifications"])

    score += min(cert_count * 2, 10)

    return min(score, 100)
import json

count = 0

with open("data/candidates.jsonl", "r", encoding="utf-8") as f:

    for line in f:

        candidate = json.loads(line)

        score = calculate_ai_readiness(candidate)

        print(
            candidate["profile"]["anonymized_name"],
            "-> AI Readiness:",
            score
        )

        count += 1

        if count == 10:
            break
