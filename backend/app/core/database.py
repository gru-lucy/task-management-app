from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

engine = create_engine(settings.DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    """
    Provides a database session for use in FastAPI dependency injection.

    Yields:
    - db: A SQLAlchemy SessionLocal instance.

    Usage:
    - This function should be used as a dependency in FastAPI route handlers 
      to provide a database session that is automatically managed (opened and closed).
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
