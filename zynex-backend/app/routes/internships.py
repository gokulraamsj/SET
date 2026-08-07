from app.auth import verify_admin
from fastapi import Depends
from fastapi import APIRouter, HTTPException
from app.database import supabase
from app.models.internships import InternshipCreate, InternshipUpdate

router = APIRouter(prefix="/internships", tags=["Internships"])

@router.get("/")
def get_internships():
    response = supabase.table("internships").select("*").order("deadline").execute()
    return response.data

@router.get("/{internship_id}")
def get_internship(internship_id: str):
    response = supabase.table("internships").select("*").eq("id", internship_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Internship not found")
    return response.data[0]

@router.post("/")
def create_internship(internship: InternshipCreate, _: bool = Depends(verify_admin)):
    payload = internship.model_dump()
    if payload.get("deadline"):
        payload["deadline"] = payload["deadline"].isoformat()
    response = supabase.table("internships").insert(payload).execute()
    return response.data[0]

@router.put("/{internship_id}")
def update_internship(internship_id: str, internship: InternshipUpdate, _: bool = Depends(verify_admin)):
    update_data = {k: v for k, v in internship.model_dump().items() if v is not None}
    if update_data.get("deadline"):
        update_data["deadline"] = update_data["deadline"].isoformat()
    response = supabase.table("internships").update(update_data).eq("id", internship_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Internship not found")
    return response.data[0]

@router.delete("/{internship_id}")
def delete_internship(internship_id: str, _: bool = Depends(verify_admin)):
    response = supabase.table("internships").delete().eq("id", internship_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Internship not found")
    return {"message": "Deleted successfully"}