from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Grab the database URL we set in .env
DATABASE_URL = os.getenv("DATABASE_URL")

# The engine is the core connection to PostgreSQL
# It's created once and reused across the app
engine = create_engine(DATABASE_URL)

# Each request gets its own session — opened and closed per request
# autocommit=False means we control when data is saved
# autoflush=False means SQLAlchemy won't auto-sync until we say so
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base is what our models will inherit from
# It's how SQLAlchemy knows which classes map to which tables
Base = declarative_base()

# This is a dependency — FastAPI will call this for every request
# It opens a session, yields it to the route, then closes it when done
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()