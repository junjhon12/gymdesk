from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List
from app.database import get_db
from app.models.member import Member
from app.ai import get_ai_response

router = APIRouter(
    prefix="/chat",
    tags=["chat"]
)

# Shape of each message in the conversation history
class ChatMessage(BaseModel):
    role: str     # 'user' or 'assistant'
    content: str

# Shape of the incoming request
class ChatRequest(BaseModel):
    messages: List[ChatMessage]

@router.post("/")
async def chat(request: ChatRequest, db: Session = Depends(get_db)):
    # Fetch all members from the database
    members = db.query(Member).all()

    # Convert SQLAlchemy objects to plain dicts Claude can read
    members_data = [
        {
            "id":                 m.id,
            "full_name":          m.full_name,
            "email":              m.email,
            "phone":              m.phone,
            "membership_type":    m.membership_type,
            "status":             m.status,
            "join_date":          str(m.join_date),
            "expiry_date":        str(m.expiry_date) if m.expiry_date else None,
            "last_payment_date":  str(m.last_payment_date) if m.last_payment_date else None,
        }
        for m in members
    ]

    # Get AI response
    response = await get_ai_response(request.messages, members_data)
    return {"response": response}