# app/main.py
from fastapi import FastAPI

from app.api import api_router
from app.middlewares.cors import add_cors_middleware
from app.core.database import engine, Base

# Create the database tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Add CORS middleware
add_cors_middleware(app)

app.include_router(api_router)
