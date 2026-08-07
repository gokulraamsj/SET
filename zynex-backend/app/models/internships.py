from pydantic import BaseModel
from typing import Optional
from datetime import date

class InternshipCreate(BaseModel):
    title: str
    company: str
    type: Optional[str] = None
    description: Optional[str] = None
    duration: Optional[str] = None
    location: Optional[str] = None
    stipend: Optional[str] = None
    deadline: Optional[date] = None

class InternshipUpdate(BaseModel):
    title: Optional[str] = None
    company: Optional[str] = None
    type: Optional[str] = None
    description: Optional[str] = None
    duration: Optional[str] = None
    location: Optional[str] = None
    stipend: Optional[str] = None
    deadline: Optional[date] = None