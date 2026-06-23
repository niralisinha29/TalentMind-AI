import json

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

# Delete old collection if exists

try:
    client.delete_collection(
        name="candidates"
    )
except:
    pass


collection = client.get_or_create_collection(
    name="candidates"
)


def build_candidate_text(candidate):

    profile = candidate["profile"]

    text = f"""
    Headline: {profile.get('headline', '')}

    Summary: {profile.get('summary', '')}

    Skills:
    """

    for skill in candidate["skills"]:

        text += skill["name"] + " "

    return text


def create_embeddings():

    print("\nReading candidates...")

    candidate_ids = []

    candidate_names = []

    candidate_texts = []

    count = 0

    with open(
        "data/candidates.jsonl",
        "r",
        encoding="utf-8"
    ) as f:

        for line in f:

            candidate = json.loads(
                line
            )

            candidate_ids.append(
                candidate["candidate_id"]
            )

            candidate_names.append(
                candidate["profile"]["anonymized_name"]
            )

            candidate_texts.append(
                build_candidate_text(candidate)
            )

            count += 1

            # Development limit

            if count == 1000:
                break

    print(f"{count} candidates loaded.")

    print("\nGenerating embeddings...")

    embeddings = model.encode(

        candidate_texts,

        batch_size=64,

        show_progress_bar=True,

        convert_to_numpy=True

    )

    print("\nSaving to ChromaDB...")

    batch_size = 100

    for i in range(

        0,

        len(candidate_ids),

        batch_size

    ):

        collection.add(

            ids=candidate_ids[
                i:i + batch_size
            ],

            embeddings=embeddings[
                i:i + batch_size
            ].tolist(),

            metadatas=[

                {

                    "name": name

                }

                for name in candidate_names[
                    i:i + batch_size
                ]

            ]

        )

        print(

            f"Saved {min(i + batch_size, len(candidate_ids))} / {len(candidate_ids)}"

        )

    print("\n===================================")

    print("Vector Database Created Successfully")

    print(f"Total Indexed : {len(candidate_ids)}")

    print("===================================")


if __name__ == "__main__":

    create_embeddings()