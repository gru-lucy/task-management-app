# app/schemas/task.py
from pydantic import BaseModel, ConfigDict
from datetime import datetime

class TaskBase(BaseModel):
    task: str

class TaskCreate(TaskBase):
    pass

class Task(TaskBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
