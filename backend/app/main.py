# Import FastAPI to create an instance of the application
from fastapi import FastAPI

# Import the API router from the api module
from app.api import api_router

# Import the CORS middleware setup function from the middlewares module
from app.middlewares.cors import add_cors_middleware

# Import database engine and Base for ORM setup from the core module
from app.core.database import engine, Base

# Create the database tables
Base.metadata.create_all(bind=engine)

# Initialize the FastAPI application
app = FastAPI()

# Add CORS middleware to the application
add_cors_middleware(app)

# Include the API router in the application
app.include_router(api_router)
