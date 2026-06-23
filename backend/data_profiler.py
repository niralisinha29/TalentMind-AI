import json

assessment_names = set()

with open("data/candidates.jsonl", "r", encoding="utf-8") as f:

    for line in f:

        candidate = json.loads(line)

        assessments = (
            candidate["redrob_signals"]
            .get("skill_assessment_scores", {})
        )

        for skill in assessments:
            assessment_names.add(skill)

print("\nUnique Assessment Types:\n")

for skill in sorted(assessment_names):
    print(skill)

print("\nTotal Assessment Types:",
      len(assessment_names))