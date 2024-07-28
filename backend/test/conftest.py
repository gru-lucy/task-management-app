# conftest.py
import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

from app.models.task import Task

Base = declarative_base()

@pytest.fixture(scope='module')
def test_db():
    # Set up the in-memory SQLite database
    engine = create_engine('postgresql://postgres:postgres@localhost:5432/test_db')
    TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()

    yield db  # provide the fixture value

    db.close()
    Base.metadata.drop_all(bind=engine)
