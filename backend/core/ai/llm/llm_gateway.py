from .gemini_provider import GeminiProvider
from .models import LLMRequest

provider = GeminiProvider()


class LLMGateway:

    def generate(self, prompt: str):

        request = LLMRequest(
            prompt=prompt
        )

        return provider.generate(request)