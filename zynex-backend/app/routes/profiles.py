from fastapi import APIRouter
from app.database import supabase

router = APIRouter(prefix="/profiles", tags=["Profiles"])

@router.get("/count")
def get_profiles_count():
    response = supabase.table("profiles").select("id", count="exact").execute()
    return {"count": response.count}