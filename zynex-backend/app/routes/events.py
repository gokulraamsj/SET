from app.auth import verify_admin
from fastapi import Depends
from fastapi import APIRouter, HTTPException
from app.database import supabase
from app.models.events import EventCreate, EventUpdate

router = APIRouter(prefix="/events", tags=["Events"])

@router.get("/")
def get_events():
    response = supabase.table("events").select("*").order("event_date").execute()
    return response.data

@router.get("/{event_id}")
def get_event(event_id: str):
    response = supabase.table("events").select("*").eq("id", event_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Event not found")
    return response.data[0]

@router.post("/")
def create_event(event: EventCreate, _: bool = Depends(verify_admin)):
    payload = event.model_dump()
    if payload.get("event_date"):
        payload["event_date"] = payload["event_date"].isoformat()
    response = supabase.table("events").insert(payload).execute()
    return response.data[0]

@router.put("/{event_id}")
def update_event(event_id: str, event: EventUpdate, _: bool = Depends(verify_admin)):
    update_data = {k: v for k, v in event.model_dump().items() if v is not None}
    if update_data.get("event_date"):
        update_data["event_date"] = update_data["event_date"].isoformat()
    response = supabase.table("events").update(update_data).eq("id", event_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Event not found")
    return response.data[0]

@router.delete("/{event_id}")
def delete_event(event_id: str, _: bool = Depends(verify_admin)):
    response = supabase.table("events").delete().eq("id", event_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Event not found")
    return {"message": "Deleted successfully"}