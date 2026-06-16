from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date, datetime

# ---
# Base schema — shared fields between create and read
# ---
class MemberBase(BaseModel):
    full_name:         str
    email:             EmailStr        # Pydantic validates this is a real email format
    phone:             Optional[str]   = None
    membership_type:   str             # 'monthly' or 'annual'
    status:            str             = "active"
    join_date:         date
    expiry_date:       Optional[date]  = None
    last_payment_date: Optional[date]  = None


# ---
# Create schema — what we expect when creating a new member
# Inherits everything from MemberBase
# No id or timestamps — the DB generates those automatically
# ---
class MemberCreate(MemberBase):
    pass


# ---
# Update schema — all fields optional because staff might only update one field
# ---
class MemberUpdate(BaseModel):
    full_name:         Optional[str]  = None
    email:             Optional[str]  = None
    phone:             Optional[str]  = None
    membership_type:   Optional[str]  = None
    status:            Optional[str]  = None
    join_date:         Optional[date] = None
    expiry_date:       Optional[date] = None
    last_payment_date: Optional[date] = None


# ---
# Read schema — what we send BACK to the frontend
# Includes id and timestamps since they now exist in the DB
# ---
class MemberRead(MemberBase):
    id:         int
    created_at: datetime
    updated_at: datetime

    # This tells Pydantic to work with SQLAlchemy objects
    # Without this, Pydantic can't read SQLAlchemy model instances
    class Config:
        from_attributes = True