import os
from dotenv import load_dotenv
from pydantic_settings import BaseSettings  # Changed import from pydantic to pydantic_settings

# Load environment variables from .env file
load_dotenv()

class Settings(BaseSettings):
    # API configuration
    API_V1_STR: str = "/api/v1"

    # LLM Configuration
    LLM_PROVIDER: str = os.getenv("LLM_PROVIDER", "openai")  # Options: openai, anthropic, google, deepseek

    # API Keys
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    ANTHROPIC_API_KEY: str = os.getenv("ANTHROPIC_API_KEY", "")
    GOOGLE_API_KEY: str = os.getenv("GOOGLE_API_KEY", "")
    DEEPSEEK_API_KEY: str = os.getenv("DEEPSEEK_API_KEY", "")

    # CORS
    CORS_ORIGINS: list = ["*"]

    class Config:
        case_sensitive = True

settings = Settings()
