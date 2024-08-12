# tests/test_api.py
import pytest
from httpx import AsyncClient
from fastapi import FastAPI, status

@pytest.mark.asyncio
async def test_create_task(client):
    response = await client.post("/tasks", json={"task": "Example Task"})
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["task"] == "Example Task"

@pytest.mark.asyncio
async def test_read_tasks(client):
    await client.post("/tasks", json={"task": "Example Task"})
    response = await client.get("/tasks")
    assert response.status_code == status.HTTP_200_OK
    assert len(response.json()) > 0
    assert response.json()[0]["task"] == "Example Task"

@pytest.mark.asyncio
async def test_filter_tasks_by_date(client):
    # Post a task and then get it by querying with the date
    task_date = "2021-01-01T00:00:00"
    await client.post("/tasks", json={"task": "New Year Task", "created_at": task_date})
    response = await client.get(f"/tasks?reference_date={task_date}")
    assert response.status_code == status.HTTP_200_OK
    assert response.json()[0]["task"] == "New Year Task"
