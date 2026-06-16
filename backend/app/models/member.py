from sqlalchemy import Column, Integer, String, Date, DateTime
from sqlalchemy.sql import func
from app.database import Base

class Member(Base):
    # This tells SQLAlchemy which table this class maps to
    __tablename__ = "members"

    id                = Column(Integer, primary_key=True, index=True)
    full_name         = Column(String(100), nullable=False)
    email             = Column(String(150), unique=True, nullable=False)
    phone             = Column(String(20), nullable=True)
    membership_type   = Column(String(50), nullable=False)  # 'monthly' or 'annual'
    status            = Column(String(20), nullable=False, default="active")
    join_date         = Column(Date, nullable=False)
    expiry_date       = Column(Date, nullable=True)         # only set when inactive
    last_payment_date = Column(Date, nullable=True)
    created_at        = Column(DateTime, server_default=func.now())
    updated_at        = Column(DateTime, server_default=func.now(), onupdate=func.now())