import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    """
    Configuration settings for the application.

    Attributes:
    - DATABASE_URL (str): URL of the database to connect to. Defaults to 
      "postgresql://postgres:postgres@localhost:5432/task_management" if not set in environment variables.
    """
    
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/task_management")

settings = Settings()
