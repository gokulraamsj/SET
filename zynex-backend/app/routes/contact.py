from app.auth import verify_admin
from fastapi import Depends
from fastapi import APIRouter, HTTPException
from app.database import supabase
from app.models.contact import ContactCreate

router = APIRouter(prefix="/contact", tags=["Contact"])

@router.get("/")
def get_messages(_: bool = Depends(verify_admin)):
    response = supabase.table("contact_messages").select("*").order("created_at", desc=True).execute()
    return response.data

@router.post("/")
def create_message(message: ContactCreate):
    response = supabase.table("contact_messages").insert(message.model_dump()).execute()
    return response.data[0]

@router.delete("/{message_id}")
def delete_message(message_id: str, _: bool = Depends(verify_admin)):
    response = supabase.table("contact_messages").delete().eq("id", message_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Message not found")
    return {"message": "Deleted successfully"}