# Import necessary classes and modules
from pydantic import BaseModel, ConfigDict
from datetime import datetime

# Base model for task-related schemas
class TaskBase(BaseModel):
    task: str

# Schema for creating a new task
class TaskCreate(TaskBase):
    pass

# Schema for representing a task with additional attributes
class Task(TaskBase):
    id: int
    created_at: datetime

    # Configure model to use attributes from input data
    model_config = ConfigDict(from_attributes=True)
