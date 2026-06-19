'''import json

file_path = "data/candidates.jsonl"

count = 0

with open(file_path, "r", encoding="utf-8") as f:
    for line in f:
        candidate = json.loads(line)

        print("\nCandidate", count + 1)
        print("=" * 50)

        print("Keys Available:")
        print(candidate.keys())

        count += 1

        if count == 1:
            break
'''

import json
from pprint import pprint

with open("data/candidates.jsonl", "r", encoding="utf-8") as f:
    candidate = json.loads(next(f))

print("\nPROFILE")
pprint(candidate["profile"])

print("\nCAREER HISTORY")
pprint(candidate["career_history"])

print("\nEDUCATION")
pprint(candidate["education"])

print("\nSKILLS")
pprint(candidate["skills"][:3])

print("\nCERTIFICATIONS")
pprint(candidate["certifications"])

print("\nLANGUAGES")
pprint(candidate["languages"])

print("\nREDROB SIGNALS")
pprint(candidate["redrob_signals"])
        