from sqlalchemy.orm import Session
from sqlalchemy import func, desc
from datetime import datetime
from typing import Optional

from app.models.task import Task
from app.schemas.task import TaskCreate

def get_tasks(db: Session, reference_date: Optional[datetime]):
    # Get distinct task creation dates in descending order
    distinct_dates = db.query(func.date(Task.created_at)).distinct().order_by(desc(func.date(Task.created_at))).all()
    
    if not distinct_dates:
        return []

    # Convert distinct_dates to a list of dates
    distinct_dates = [date[0] for date in distinct_dates]
    
    if reference_date:
        # Find the latest date before the reference_date
        target_date = None
        for date in distinct_dates:
            if date < reference_date.date():
                target_date = date
                break
        if not target_date:
            return []  # No earlier date exists
    else:
        # Set the most recent date as today
        target_date = datetime.today().date()  # Get only the date part
    
    # Fetch tasks created on the target date (comparing only date parts)
    tasks = db.query(Task).filter(func.date(Task.created_at) == target_date).all()
    
    return tasks

def create_task(db: Session, task: TaskCreate):
    db_task = Task(task=task.task)
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task