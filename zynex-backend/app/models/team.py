from pydantic import BaseModel
from typing import Optional

class TeamMemberCreate(BaseModel):
    name: str
    role: str
    photo_url: Optional[str] = None
    linkedin: Optional[str] = None
    phone: Optional[str] = None

class TeamMemberUpdate(BaseModel):
    name: Optional[str] = None
    role: Optional[str] = None
    photo_url: Optional[str] = None
    linkedin: Optional[str] = None
    phone: Optional[str] = None