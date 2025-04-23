# app/services/llm.py
from abc import ABC, abstractmethod
import asyncio
from app.config import settings
import httpx
import json

class LLMService(ABC):
    @abstractmethod
    async def generate_response(self, query: str) -> str:
        pass

class AnthropicService(LLMService):
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.api_url = "https://api.anthropic.com/v1/messages"

    async def generate_response(self, query: str) -> str:
        """Generate a response using Claude API"""
        if not self.api_key:
            raise ValueError("Anthropic API key not provided")

        # Craft system prompt for better responses
        system_prompt = """
        You are a helpful assistant providing accurate and detailed information.
        Your answers should be well-structured and formatted for readability.
        For travel document questions, include visa requirements, passport information,
        additional necessary documents, and any relevant travel advisories.
        """

        async with httpx.AsyncClient(timeout=30.0) as client:
            headers = {
                "Content-Type": "application/json",
                "x-api-key": self.api_key,
                "anthropic-version": "2023-06-01"
            }

            data = {
                "model": "claude-3-haiku-20240307",  # Updated to use Claude 3 Haiku
                "max_tokens": 1000,
                "messages": [
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": query}
                ]
            }

            response = await client.post(
                self.api_url,
                headers=headers,
                json=data
            )

            if response.status_code != 200:
                raise Exception(f"API Error: {response.status_code}, {response.text}")

            result = response.json()
            return result["content"][0]["text"]

class OpenAIService(LLMService):
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.api_url = "https://api.openai.com/v1/chat/completions"

    async def generate_response(self, query: str) -> str:
        """Generate a response using OpenAI API"""
        if not self.api_key:
            raise ValueError("OpenAI API key not provided")

        # System prompt for better responses
        system_prompt = """
        You are a helpful assistant providing accurate and detailed information.
        Your answers should be well-structured and formatted for readability.
        For travel document questions, include visa requirements, passport information,
        additional necessary documents, and any relevant travel advisories.
        """

        async with httpx.AsyncClient(timeout=30.0) as client:
            headers = {
                "Content-Type": "application/json",
                "Authorization": f"Bearer {self.api_key}"
            }

            data = {
                "model": "gpt-3.5-turbo",
                "messages": [
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": query}
                ],
                "max_tokens": 1000
            }

            response = await client.post(
                self.api_url,
                headers=headers,
                json=data
            )

            if response.status_code != 200:
                raise Exception(f"API Error: {response.status_code}, {response.text}")

            result = response.json()
            return result["choices"][0]["message"]["content"]

class GeminiService(LLMService):
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.api_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"

    async def generate_response(self, query: str) -> str:
        """Generate a response using Google Gemini API"""
        if not self.api_key:
            raise ValueError("Google API key not provided")

        # Building the prompt for better responses
        system_prompt = """
        You are a helpful assistant providing accurate and detailed information.
        Your answers should be well-structured and formatted for readability.
        For travel document questions, include visa requirements, passport information,
        additional necessary documents, and any relevant travel advisories.
        """

        # For Gemini, we'll combine system prompt with user query
        full_prompt = f"{system_prompt}\n\nUser query: {query}"

        async with httpx.AsyncClient(timeout=30.0) as client:
            # Adding API key to URL as query parameter
            request_url = f"{self.api_url}?key={self.api_key}"

            data = {
                "contents": [
                    {
                        "role": "user",
                        "parts": [
                            {
                                "text": full_prompt
                            }
                        ]
                    }
                ],
                "generationConfig": {
                    "temperature": 0.7,
                    "maxOutputTokens": 1000,
                    "topP": 0.95,
                    "topK": 40
                }
            }

            response = await client.post(
                request_url,
                json=data
            )

            if response.status_code != 200:
                raise Exception(f"API Error: {response.status_code}, {response.text}")

            result = response.json()

            # Extract the response text from Gemini's response structure
            try:
                return result["candidates"][0]["content"]["parts"][0]["text"]
            except (KeyError, IndexError) as e:
                raise Exception(f"Error parsing Gemini response: {str(e)}, Response: {json.dumps(result)}")

class DeepSeekService(LLMService):
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.api_url = "https://api.deepseek.com/v1/chat/completions"

    async def generate_response(self, query: str) -> str:
        """Generate a response using DeepSeek API"""
        if not self.api_key:
            raise ValueError("DeepSeek API key not provided")

        # System prompt for better responses
        system_prompt = """
        You are a helpful assistant providing accurate and detailed information.
        Your answers should be well-structured and formatted for readability.
        For travel document questions, include visa requirements, passport information,
        additional necessary documents, and any relevant travel advisories.
        """

        async with httpx.AsyncClient(timeout=30.0) as client:
            headers = {
                "Content-Type": "application/json",
                "Authorization": f"Bearer {self.api_key}"
            }

            data = {
                "model": "deepseek-chat",
                "messages": [
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": query}
                ],
                "max_tokens": 1000
            }

            response = await client.post(
                self.api_url,
                headers=headers,
                json=data
            )

            if response.status_code != 200:
                raise Exception(f"API Error: {response.status_code}, {response.text}")

            result = response.json()
            return result["choices"][0]["message"]["content"]

# Factory function to get the right LLM service
def get_llm_service() -> LLMService:
    """Return the appropriate LLM service based on config"""
    llm_provider = settings.LLM_PROVIDER.lower()

    if llm_provider == "anthropic":
        return AnthropicService(settings.ANTHROPIC_API_KEY)
    elif llm_provider == "openai":
        return OpenAIService(settings.OPENAI_API_KEY)
    elif llm_provider == "google" or llm_provider == "gemini":
        return GeminiService(settings.GOOGLE_API_KEY)
    elif llm_provider == "deepseek":
        return DeepSeekService(settings.DEEPSEEK_API_KEY)
    else:
        raise ValueError(f"Unsupported LLM provider: {llm_provider}")
