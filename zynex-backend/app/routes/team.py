from app.auth import verify_admin
from fastapi import Depends
from fastapi import APIRouter, HTTPException
from app.database import supabase
from app.models.team import TeamMemberCreate, TeamMemberUpdate

router = APIRouter(prefix="/team", tags=["Team"])

@router.get("/")
def get_team():
    response = supabase.table("team_members").select("*").order("created_at").execute()
    return response.data

@router.get("/{member_id}")
def get_team_member(member_id: str):
    response = supabase.table("team_members").select("*").eq("id", member_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Team member not found")
    return response.data[0]

@router.post("/")
def create_team_member(member: TeamMemberCreate, _: bool = Depends(verify_admin)):
    response = supabase.table("team_members").insert(member.model_dump()).execute()
    return response.data[0]

@router.put("/{member_id}")
def update_team_member(member_id: str, member: TeamMemberUpdate, _: bool = Depends(verify_admin)):
    update_data = {k: v for k, v in member.model_dump().items() if v is not None}
    response = supabase.table("team_members").update(update_data).eq("id", member_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Team member not found")
    return response.data[0]

@router.delete("/{member_id}")
def delete_team_member(member_id: str, _: bool = Depends(verify_admin)):
    response = supabase.table("team_members").delete().eq("id", member_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Team member not found")
    return {"message": "Deleted successfully"}