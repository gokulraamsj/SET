import { useEffect, useState } from "react";
import { FiPhone, FiLinkedin } from "react-icons/fi";
import { fetchTeam } from "../api";
import "./Team.css";

function TeamGroup({ title, members }) {
  if (members.length === 0) return null;

  return (
    <div className="team-group">
      <h3 className="team-group__title">{title}</h3>
      <div className="team__grid">
        {members.map((member) => (
          <div className="team-card" key={member.id}>
            <div className="team-card__avatar">
  {member.photo_url ? (
    <img src={member.photo_url} alt={member.name} className="team-card__photo" />
  ) : (
    member.name.split(" ").map((w) => w[0]).slice(0, 2).join("")
  )}
</div>
            <h3 className="team-card__name">{member.name}</h3>
            <span className="team-card__role">{member.role}</span>
            <div className="team-card__icons">
              {member.linkedin && (
                <a href={member.linkedin} target="_blank" rel="noreferrer">
                  <FiLinkedin />
                </a>
              )}
              {member.phone && <FiPhone />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Team() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeam()
      .then((data) => setMembers(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const faculty = members.filter((m) => m.member_type === "faculty");
  const students = members.filter((m) => m.member_type !== "faculty");

  return (
    <section className="team" id="team">
      <p className="team__label">MEET THE PEOPLE</p>
      <h2 className="team__heading">Behind VERTEX</h2>

      {loading && <p className="team__status">Loading team...</p>}
      {error && <p className="team__status">Couldn't load team: {error}</p>}
      {!loading && !error && members.length === 0 && (
        <p className="team__status">No team members yet.</p>
      )}

      <TeamGroup title="Faculty" members={faculty} />
      <TeamGroup title="Student Team" members={students} />
    </section>
  );
}