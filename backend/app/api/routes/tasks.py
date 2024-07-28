# app/api/endpoints/tasks.py
from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime

from app.core.database import get_db
from app.schemas.task import Task, TaskCreate
from app.repository.task import get_tasks, create_task

router = APIRouter()

@router.get("", response_model=List[Task])
def read_tasks(
    db: Session = Depends(get_db),
    reference_date: Optional[datetime] = Query(None)
):
    """
    Retrieves a list of tasks based on an optional reference date.

    Parameters:
    - db (Session): The database session dependency.
    - reference_date (Optional[datetime]): The reference date to filter tasks. 
      If not provided, retrieves all tasks.

    Returns:
    - List[Task]: A list of Task objects matching the reference date.
    """
    tasks = get_tasks(db, reference_date)
    return tasks

@router.post("", response_model=Task)
def create_new_task(task: TaskCreate, db: Session = Depends(get_db)):
    """
    Creates a new task in the database.

    Parameters:
    - task (TaskCreate): The task data to create a new task.
    - db (Session): The database session dependency.

    Returns:
    - Task: The newly created Task object.
    """
    return create_task(db=db, task=task)
