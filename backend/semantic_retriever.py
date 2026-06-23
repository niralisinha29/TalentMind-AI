import chromadb

from sentence_transformers import SentenceTransformer

print("Loading model...")

model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)

print("Model loaded.")

client = chromadb.PersistentClient(
    path="vector_db"
)

collection = client.get_collection(
    name="candidates"
)


def retrieve_candidates(
    job_description,
    top_k=50
):

    embedding = model.encode(
        job_description
    ).tolist()

    results = collection.query(

        query_embeddings=[
            embedding
        ],

        n_results=top_k,

        include=[
            "metadatas",
            "distances"
        ]

    )

    candidates = []

    for i in range(

        len(results["metadatas"][0])

    ):

        candidates.append(

            {

                "name":

                results["metadatas"][0][i]["name"],

                "semantic_similarity":

                round(

                    1 -

                    results["distances"][0][i],

                    3

                )

            }

        )

    return candidates


if __name__ == "__main__":

    sample_jd = """

    GenAI Engineer

    RAG

    LangChain

    Prompt Engineering

    Vector Search

    """

    candidates = retrieve_candidates(

        sample_jd

    )

    print()

    for candidate in candidates:

        print(candidate)