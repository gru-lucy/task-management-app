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
    tasks = get_tasks(db, reference_date)
    return tasks

@router.post("", response_model=Task)
def create_new_task(task: TaskCreate, db: Session = Depends(get_db)):
    return create_task(db=db, task=task)
