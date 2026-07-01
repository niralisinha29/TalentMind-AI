def generate_interview_questions(candidate, required_capabilities):

    profile = candidate.get("profile", {})

    skills = [
        skill.get("name", "")
        for skill in candidate.get("skills", [])
]

    experience = profile.get("years_of_experience", 0)

    technical = []

    resume_based = []

    scenario = []

    behavioral = []

    advanced = []

    # -----------------------
    # Technical Questions
    # -----------------------

    question_bank = {

        "Python":
            "Explain decorators and generators in Python.",

        "RAG":
            "Explain how Retrieval-Augmented Generation works and how you would improve retrieval quality.",

        "LangChain":
            "How does LangChain help in building LLM-powered applications?",

        "Prompt Engineering":
            "What techniques do you follow to write effective prompts for LLMs?",

        "FAISS":
            "Explain how FAISS performs vector similarity search.",

        "Pinecone":
            "Why would you choose Pinecone over FAISS in a production system?",

        "SQL":
            "Explain query optimization and indexing in SQL.",

        "AWS":
            "How would you deploy an AI application on AWS?",

        "Docker":
            "Explain how Docker helps in deploying AI applications.",

        "Kubernetes":
            "How would you deploy an AI microservice using Kubernetes?",

        "Machine Learning":
            "Explain the difference between supervised and unsupervised learning.",

        "Deep Learning":
            "What are vanishing gradients and how can they be solved?",

        "LLMs":
            "Explain the architecture of a Large Language Model.",

        "TensorFlow":
            "How does TensorFlow manage computational graphs?",

        "FastAPI":
            "Why is FastAPI a good choice for AI APIs?"

    }

    for skill in skills:

        if skill in question_bank:

            technical.append(
                question_bank[skill]
            )

    # -----------------------
    # Resume Based
    # -----------------------

    resume_based.append(
        f"You have worked as a {profile.get('current_title','Professional')}. Can you describe your key responsibilities and biggest achievements in this role?"
    )

    resume_based.append(
        f"Your profile mentions experience in the {profile.get('current_industry','technology')} industry. What was the most challenging project you worked on?"
    )

    if experience >= 5:
        resume_based.append(
            "How has your technical decision-making evolved as you've gained more experience?"
        )
    else:
        resume_based.append(
            "Which project helped you learn the most during your early career?"
        )

    # -----------------------
    # Scenario
    # -----------------------

    missing_skills = []

    
    required_skill_names = required_capabilities
    print(required_capabilities)
    print(type(required_capabilities))


    for skill in required_skill_names:

        if skill not in skills:

            missing_skills.append(skill)

    scenario.append(
        "Suppose your AI model starts producing hallucinated answers. How would you improve its accuracy?"
    )

    if missing_skills:

        scenario.append(
            f"You don't have demonstrated experience with {missing_skills[0]}. How would you learn and apply it in your first month?"
        )
    else:

        scenario.append(
            "How would you optimize an AI hiring pipeline for production use?"
        )

    # -----------------------
    # Behavioral
    # -----------------------

    behavioral.append(
        "Tell me about a challenging project where you had to solve an unexpected problem."
    )

    behavioral.append(
        "Describe a situation where you collaborated with cross-functional teams to achieve a common goal."
    )

    behavioral.append(
        "How do you keep yourself updated with emerging AI technologies?"
    )

    # -----------------------
    # Advanced
    # -----------------------

    if experience >= 8:

        advanced.append(
            "Design an enterprise-scale AI hiring platform capable of processing one million resumes with low latency."
        )

    elif experience >= 5:

        advanced.append(
             "Design a scalable Retrieval-Augmented Generation architecture capable of handling one million documents."
        )

    else:

        advanced.append(
              "Explain the end-to-end lifecycle of deploying a Generative AI application."
        )

    return {

        "technical": technical,

        "resume_based": resume_based,

        "scenario": scenario,

        "behavioral": behavioral,

        "advanced": advanced

    }