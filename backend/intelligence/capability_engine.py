import json

SKILL_TAXONOMY = {
    "GenAI": [
        "LLMs",
        "Fine-tuning LLMs",
        "Prompt Engineering",
        "LoRA",
        "QLoRA",
        "PEFT"
    ],

    "RAG": [
        "RAG",
        "Embeddings",
        "Vector Search",
        "FAISS",
        "Pinecone",
        "Qdrant",
        "Weaviate",
        "Milvus",
        "LlamaIndex",
        "LangChain",
        "Haystack",
        "Information Retrieval",
        "Semantic Search",
        "BM25"
    ],

    "Machine Learning": [
        "Machine Learning",
        "Deep Learning",
        "TensorFlow",
        "PyTorch",
        "scikit-learn",
        "Data Science",
        "Statistical Modeling",
        "Feature Engineering"
    ],

    "Computer Vision": [
        "YOLO",
        "CNN",
        "OpenCV",
        "Object Detection",
        "Image Classification"
    ],

    "MLOps": [
        "MLflow",
        "Kubeflow",
        "MLOps",
        "BentoML"
    ]
}


def calculate_capabilities(candidate):

    assessment_scores = (
        candidate["redrob_signals"]
        .get("skill_assessment_scores", {})
    )

    capabilities = {}

    for category, skills in SKILL_TAXONOMY.items():

        category_scores = []

        for skill in skills:

            if skill in assessment_scores:

                category_scores.append(
                    assessment_scores[skill]
                )

        if category_scores:

            capabilities[category] = round(
                sum(category_scores)
                / len(category_scores),
                2
            )

        else:

            capabilities[category] = 0

    return capabilities


# Test First 5 Candidates
if __name__ == "__main__":

    with open(
        "data/candidates.jsonl",
        "r",
        encoding="utf-8"
    ) as f:

        count = 0

        for line in f:

            candidate = json.loads(line)

            capabilities = calculate_capabilities(
                candidate
            )

            print("\n")
            print("=" * 80)

            print(
                candidate["profile"]["anonymized_name"]
            )

            print("\nCapability Profile:")

            for category, score in capabilities.items():

                print(
                    f"{category}: {score}"
                )

            count += 1

            if count == 5:
                break

'''
import json

with open("data/candidates.jsonl", "r", encoding="utf-8") as f:

    candidate = json.loads(next(f))

    print(
        candidate["redrob_signals"]["skill_assessment_scores"]
    )
    '''