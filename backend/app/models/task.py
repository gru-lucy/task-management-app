from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.orm import declarative_base
from app.core.database import Base
from datetime import datetime

Base = declarative_base()

class Task(Base):
    """
    Represents a task in the database.

    Attributes:
    - id (int): Unique identifier for the task (primary key).
    - task (str): Description or content of the task.
    - created_at (datetime): Timestamp of when the task was created (defaults to current UTC time).
    """
    
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    task = Column(String, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
