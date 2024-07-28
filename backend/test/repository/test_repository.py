# test_task.py
from datetime import datetime, timedelta

from app.schemas.task import TaskCreate
from app.models.task import Task
from app.repository.task import get_tasks, create_task  # Adjust the import according to your structure

def test_create_task(test_db):
    # Remove all tasks in the db
    test_db.query(Task).delete()
    test_db.commit()
    
    # Create a new task
    task_data = TaskCreate(task="Test task")
    db_task = create_task(test_db, task_data)

    assert db_task.task == "Test task"
    assert db_task.id is not None  # Assuming Task has an auto-incrementing primary key

def test_get_tasks_no_reference_date(test_db):
    # Remove all tasks in the db
    test_db.query(Task).delete()
    test_db.commit()

    # Create a task for today
    task_data = TaskCreate(task="Task today")
    create_task(test_db, task_data)

    tasks = get_tasks(test_db, None)

    assert len(tasks) == 1
    assert tasks[0].task == "Task today"

def test_get_tasks_with_reference_date(test_db):
    # Clear the database
    test_db.query(Task).delete()
    test_db.commit()

    # Create tasks with different dates
    today = datetime.today()
    yesterday = today - timedelta(days=1)

    task_today = Task(task="Task today", created_at=today)
    task_yesterday = Task(task="Task yesterday", created_at=yesterday)

    test_db.add(task_today)
    test_db.add(task_yesterday)
    test_db.commit()

    # Test with a reference date of today
    tasks = get_tasks(test_db, today)
    assert len(tasks) == 1
    assert tasks[0].task == "Task yesterday"

    # Test with a reference date of tomorrow (should return today's task)
    tasks = get_tasks(test_db, today + timedelta(days=1))
    assert len(tasks) == 1
    assert tasks[0].task == "Task today"

    # Test with a reference date of two days ago (should return yesterday's task)
    tasks = get_tasks(test_db, yesterday - timedelta(days=1))
    assert len(tasks) == 0

def test_get_tasks_no_tasks(test_db):
    # Clear the database
    test_db.query(Task).delete()
    test_db.commit()

    tasks = get_tasks(test_db, None)

    assert len(tasks) == 0
