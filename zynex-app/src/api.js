const API_BASE = "https://vertex-backend-p2h3.onrender.com";

export async function fetchTeam() {
  const res = await fetch(`${API_BASE}/team/`);
  if (!res.ok) throw new Error("Failed to fetch team");
  return res.json();
}

export async function submitContact(data) {
  const res = await fetch(`${API_BASE}/contact/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to send message");
  return res.json();
}

export async function fetchEvents() {
  const res = await fetch(`${API_BASE}/events/`);
  if (!res.ok) throw new Error("Failed to fetch events");
  return res.json();
}

export async function fetchInternships() {
  const res = await fetch(`${API_BASE}/internships/`);
  if (!res.ok) throw new Error("Failed to fetch internships");
  return res.json();
}

export async function fetchNotifications() {
  const res = await fetch(`${API_BASE}/notifications/`);
  if (!res.ok) throw new Error("Failed to fetch notifications");
  return res.json();
}

export async function fetchTeamCount() {
  const data = await fetchTeam();
  return data.length;
}

export async function fetchEventsCount() {
  const data = await fetchEvents();
  return data.length;
}

export async function fetchInternshipsCount() {
  const data = await fetchInternships();
  return data.length;
}
export async function fetchProfilesCount() {
  const res = await fetch(`${API_BASE}/profiles/count`);
  if (!res.ok) throw new Error("Failed to fetch profiles count");
  return res.json();
}