import os

import google.generativeai as genai
from dotenv import load_dotenv

from .provider import LLMProvider
from .models import LLMRequest, LLMResponse

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")


class GeminiProvider(LLMProvider):

    def generate(self, request: LLMRequest) -> LLMResponse:

        try:

            response = model.generate_content(request.prompt)

            return LLMResponse(
                success=True,
                content=response.text,
                model="gemini-2.5-flash"
            )

        except Exception as e:

            return LLMResponse(
                success=False,
                content="",
                model="gemini-2.5-flash",
                error=str(e)
            )