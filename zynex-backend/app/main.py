from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import team, events, internships, contact, notifications, profiles

app = FastAPI(title="Vertex Backend API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(team.router)
app.include_router(events.router)
app.include_router(internships.router)
app.include_router(contact.router)
app.include_router(notifications.router)
app.include_router(profiles.router)

@app.get("/")
def root():
    return {"message": "Vertex API is running"}