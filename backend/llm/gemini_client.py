import json
import os
import google.generativeai as genai
from dotenv import load_dotenv
from backend.llm.prompts import build_interview_prompt

from backend.intelligence.interview_question_generator import (
    generate_interview_questions
)

load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel("gemini-2.5-flash")




def generate_interview_questions_llm(
    candidate,
    job_description,
    required_capabilities
):

    try:

        prompt = build_interview_prompt(
            candidate,
            job_description
        )

        response = model.generate_content(prompt)

        response_text = response.text.strip()

        if response_text.startswith("```json"):

            response_text = response_text.replace(
                "```json",
                ""
            ).replace(
                "```",
                ""
            ).strip()

        elif response_text.startswith("```"):

            response_text = response_text.replace(
                "```",
                ""
            ).strip()

        return {

            "status": "success",

            "source": "Gemini",

            "interview_questions": json.loads(
                response_text
            )

        }

    except Exception as e:
        
        print("=" * 80)
        print("Gemini Error")
        print(type(e))
        print(e)
        print("=" * 80)
        
        fallback_questions = generate_interview_questions(candidate,required_capabilities)
        
        return {
            "status": "fallback",

            "source": "TalentMind AI",

            "message": "Gemini unavailable. Generated using TalentMind AI Interview Engine.",

            "interview_questions": fallback_questions

        }