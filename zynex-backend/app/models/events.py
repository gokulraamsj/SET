from pydantic import BaseModel
from typing import Optional
from datetime import date

class EventCreate(BaseModel):
    title: str
    category: str
    description: Optional[str] = None
    event_date: Optional[date] = None
    venue: Optional[str] = None
    organizer: Optional[str] = None
    sponsor: Optional[str] = None

class EventUpdate(BaseModel):
    title: Optional[str] = None
    category: Optional[str] = None
    description: Optional[str] = None
    event_date: Optional[date] = None
    venue: Optional[str] = None
    organizer: Optional[str] = None
    sponsor: Optional[str] = None