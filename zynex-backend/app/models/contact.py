from pydantic import BaseModel, EmailStr
from typing import Optional

class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    subject: Optional[str] = None
    details: Optional[str] = None