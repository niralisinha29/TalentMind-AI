import json


def build_candidate_profile(candidate):

    profile = candidate["profile"]

    output = []

    # Basic Information
    output.append(f"Name: {profile.get('anonymized_name', '')}")
    output.append(f"Current Role: {profile.get('current_title', '')}")
    output.append(f"Current Company: {profile.get('current_company', '')}")
    output.append(
        f"Location: {profile.get('location', '')}, {profile.get('country', '')}"
    )
    output.append(
        f"Experience: {profile.get('years_of_experience', 0)} years"
    )
    output.append(f"Headline: {profile.get('headline', '')}")

    # Summary
    output.append("\nSummary:")
    output.append(profile.get("summary", ""))

    # Skills
    output.append("\nSkills:")

    for skill in candidate["skills"][:10]:
        output.append(
            f"{skill['name']} ({skill['proficiency']})"
        )

    # Career History
    output.append("\nCareer History:")

    for job in candidate["career_history"]:
        output.append(
            f"{job['title']} at {job['company']}"
        )

    # Education
    output.append("\nEducation:")

    for edu in candidate["education"]:
        output.append(
            f"{edu['degree']} in {edu['field_of_study']} - {edu['institution']}"
        )

    # Certifications
    output.append("\nCertifications:")

    if candidate["certifications"]:
        for cert in candidate["certifications"]:
            output.append(str(cert))
    else:
        output.append("No certifications")

    # Languages
    output.append("\nLanguages:")

    for lang in candidate["languages"]:
        output.append(
            f"{lang['language']} ({lang['proficiency']})"
        )

    # Candidate Signals
    signals = candidate["redrob_signals"]

    output.append("\nCandidate Signals:")

    output.append(
        f"GitHub Activity: {signals.get('github_activity_score')}"
    )

    output.append(
        f"Open To Work: {signals.get('open_to_work_flag')}"
    )

    output.append(
        f"Notice Period: {signals.get('notice_period_days')} days"
    )

    output.append(
        f"Profile Completeness: {signals.get('profile_completeness_score')}"
    )

    output.append(
        f"Recruiter Response Rate: {signals.get('recruiter_response_rate')}"
    )

    return "\n".join(output)


# Read first 3 candidates and print profiles

count = 0

with open("data/candidates.jsonl", "r", encoding="utf-8") as f:

    for line in f:

        candidate = json.loads(line)

        profile_text = build_candidate_profile(candidate)

        print("\n")
        print("=" * 80)
        print(profile_text)
        print("=" * 80)

        count += 1

        if count == 3:
            break

