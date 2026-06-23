import json
import re

#from backend.intelligence.skill_credibility import calculate_skill_credibility


def load_skills():

    with open(
        "config/skill_taxonomy.json",
        "r",
        encoding="utf-8"
    ) as f:

        taxonomy = json.load(f)

    skills = set()

    for category_skills in taxonomy.values():

        for skill in category_skills:

            skills.add(skill)

    return skills


def parse_jd(jd_text):

    result = {
        "skills": [],
        "experience": None
    }

    all_skills = load_skills()

    for skill in all_skills:

        if skill.lower() in jd_text.lower():

            result["skills"].append(skill)

    exp_match = re.search(
        r"(\d+)\+?\s*years",
        jd_text.lower()
    )

    if exp_match:

        result["experience"] = int(
            exp_match.group(1)
        )

    return result


if __name__ == "__main__":
    sample_jd = """
    Senior GenAI Engineer

    Required Skills:
    Python
    RAG
    LangChain
    Prompt Engineering
    Vector Search

    Experience:
    5+ years
    """

    parsed = parse_jd(sample_jd)

    print("\nParsed JD:\n")
    print(parsed)