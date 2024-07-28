# conftest.py
import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

from app.models.task import Task

Base = declarative_base()

@pytest.fixture(scope='module')
def test_db():
    """
    Sets up an in-memory SQLite database for testing purposes.

    This fixture creates a database engine, sets up a session maker, and
    initializes the database schema before tests are run. After the tests
    complete, the fixture tears down the database by closing the session
    and dropping the schema.

    Yields:
    - db: A SQLAlchemy SessionLocal instance connected to the in-memory database.

    Usage:
    - This fixture can be used in tests to interact with a temporary database.
    """
    engine = create_engine('postgresql://postgres:postgres@localhost:5432/test_db')
    TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()

    yield db  # provide the fixture value

    db.close()
    Base.metadata.drop_all(bind=engine)
