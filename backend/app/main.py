from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.models import member
# This creates all tables in PostgreSQL based on our models
# If the table already exists it skips it — safe to run every time
Base.metadata.create_all(bind=engine)

app = FastAPI(title="GymDesk API", version="1.0.0")

# CORS — this allows our React frontend (localhost:5173)
# to talk to our FastAPI backend (localhost:8000)
# Without this the browser blocks cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "GymDesk API is running"}