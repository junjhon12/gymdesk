from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.models import member
from app.routers import members

Base.metadata.create_all(bind=engine)

app = FastAPI(title="GymDesk API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(members.router)

@app.get("/")
def root():
    return {"message": "GymDesk API is running"}