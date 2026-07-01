import json



def build_interview_prompt(candidate, job_description):

    profile = candidate.get("profile", {})

    skills = [

        skill.get("name", "")

        for skill in candidate.get("skills", [])

    ]

    prompt = f"""
You are an expert Senior Technical Interviewer working for a multinational technology company.

Your responsibility is to generate personalized interview questions for a candidate based on their profile and the provided Job Description.

=========================
CANDIDATE PROFILE
=========================

Name:
{profile.get("anonymized_name","")}

Current Role:
{profile.get("current_title","")}

Current Company:
{profile.get("current_company","")}

Industry:
{profile.get("current_industry","")}

Experience:
{profile.get("years_of_experience","")} years

Professional Summary:
{profile.get("summary","")}

Skills:
{", ".join(skills)}

=========================
JOB DESCRIPTION
=========================

{job_description}

=========================
TASK
=========================

You are acting as a Senior Technical Interviewer.

Generate a personalized interview kit for this candidate.

Adjust the question difficulty based on experience:

0-2 years → Easy

2-5 years → Medium

5+ years → Hard

Generate:

• 3 Technical Questions

• 2 Resume Based Questions

• 2 Scenario Based Questions

• 2 Behavioral Questions

• 1 Advanced Design Question

For every question provide:

1. Question
2. Difficulty (Easy/Medium/Hard)
3. Skills Being Evaluated
4. Expected Answer (3-5 key points)

Also estimate the total interview duration in minutes.

=========================
OUTPUT FORMAT
=========================

Return ONLY valid JSON.

{{
    "technical":[
        {{
            "question":"",
            "difficulty":"",
            "skills":[
            ],
            "expected_answer":[
            ]
        }}
    ],

    "resume_based":[
        {{
            "question":"",
            "difficulty":"",
            "skills":[
            ],
            "expected_answer":[
            ]
        }}
    ],

    "scenario":[
        {{
            "question":"",
            "difficulty":"",
            "skills":[
            ],
            "expected_answer":[
            ]
        }}
    ],

    "behavioral":[
        {{
            "question":"",
            "difficulty":"",
            "skills":[
            ],
            "expected_answer":[
            ]
        }}
    ],

    "advanced":[
        {{
            "question":"",
            "difficulty":"",
            "skills":[
            ],
            "expected_answer":[
            ]
        }}
    ],

    "estimated_time":""
}}
"""

    return prompt
