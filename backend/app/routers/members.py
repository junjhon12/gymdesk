from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.member import Member
from app.schemas.member import MemberCreate, MemberUpdate, MemberRead

router = APIRouter(
    prefix="/members",
    tags=["members"]
)

# ---
# GET /members — fetch all members
# ---
@router.get("/", response_model=List[MemberRead])
def get_members(db: Session = Depends(get_db)):
    members = db.query(Member).all()
    return members


# ---
# GET /members/{id} — fetch a single member
# ---
@router.get("/{member_id}", response_model=MemberRead)
def get_member(member_id: int, db: Session = Depends(get_db)):
    member = db.query(Member).filter(Member.id == member_id).first()
    if not member:
        raise HTTPException(status_code=404, detail="Member not found")
    return member


# ---
# POST /members — create a new member
# ---
@router.post("/", response_model=MemberRead)
def create_member(member_data: MemberCreate, db: Session = Depends(get_db)):
    # Check if email already exists
    existing = db.query(Member).filter(Member.email == member_data.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    member = Member(**member_data.model_dump())
    db.add(member)
    db.commit()
    db.refresh(member)
    return member


# ---
# PUT /members/{id} — update a member
# ---
@router.put("/{member_id}", response_model=MemberRead)
def update_member(member_id: int, member_data: MemberUpdate, db: Session = Depends(get_db)):
    member = db.query(Member).filter(Member.id == member_id).first()
    if not member:
        raise HTTPException(status_code=404, detail="Member not found")

    # Only update fields that were actually sent
    update_data = member_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(member, field, value)

    db.commit()
    db.refresh(member)
    return member


# ---
# DELETE /members/{id} — deactivate a member (soft delete)
# ---
@router.delete("/{member_id}")
def deactivate_member(member_id: int, db: Session = Depends(get_db)):
    member = db.query(Member).filter(Member.id == member_id).first()
    if not member:
        raise HTTPException(status_code=404, detail="Member not found")

    member.status = "inactive"
    db.commit()
    return {"message": f"{member.full_name} has been deactivated"}