from fastapi import APIRouter
from app.database import supabase

router = APIRouter(prefix="/notifications", tags=["Notifications"])

@router.get("/")
def get_notifications():
    response = supabase.table("notifications").select("*").order("created_at", desc=True).limit(20).execute()
    return response.data