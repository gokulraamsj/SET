import { useEffect, useState } from "react";
import { fetchProfilesCount, fetchEvents, fetchInternships } from "../api";
import "./About.css";

export default function About() {
  const [counts, setCounts] = useState({
    members: null,
    events: null,
    internships: null,
  });

  useEffect(() => {
    Promise.all([fetchProfilesCount(), fetchEvents(), fetchInternships()])
      .then(([profileData, events, internships]) => {
        setCounts({
          members: profileData.count,
          events: events.length,
          internships: internships.length,
        });
      })
      .catch(() => {});
  }, []);

  const stats = [
    { value: counts.members !== null ? `${counts.members}+` : "—", label: "Active Members" },
    { value: counts.events !== null ? `${counts.events}+` : "—", label: "Events Listed" },
    { value: counts.internships !== null ? `${counts.internships}+` : "—", label: "Internships Listed" },
  ];

  return (
    <section className="about" id="about">
      <div className="about__text">
        <p className="about__label">WHO WE ARE</p>
        <h2 className="about__heading">About VERTEX</h2>
        <p className="about__desc">
          VERTEX is the student-driven tech community of the Department of
          MECHANICAL | AI & DS | CSE |ECE | IT | PCT | EEE , built to bring
          together curious minds who want to learn, build, and ship real
          projects together. From hackathons to prompt engineering
          challenges, we create spaces where ideas turn into skills.
        </p>
        <p className="about__desc">
          Beyond events, we connect students with internship opportunities,
          mentorship, and a community that keeps pushing each other forward.
        </p>
      </div>

      <div className="about__stats">
        {stats.map((s) => (
          <div className="about-stat" key={s.label}>
            <span className="about-stat__value">{s.value}</span>
            <span className="about-stat__label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}