import { useEffect, useState } from "react";
import { FiCalendar, FiMapPin, FiBriefcase } from "react-icons/fi";
import { fetchInternships } from "../api";
import Modal from "./Modal";
import "./Internships.css";

export default function Internships() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchInternships()
      .then((data) => setInternships(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="internships" id="internships">
      <p className="internships__label">OPPORTUNITIES</p>
      <h2 className="internships__heading">INTERNSHIPS</h2>

      {loading && <p className="internships__status">Loading internships...</p>}
      {error && <p className="internships__status">Couldn't load internships: {error}</p>}
      {!loading && !error && internships.length === 0 && (
        <p className="internships__status">No internships posted yet.</p>
      )}

      <div className="internships__grid">
        {internships.map((item) => (
          <div className="internship-card" key={item.id}>
            <div className="internship-card__banner">
              <span>{item.company}</span>
            </div>
            <div className="internship-card__body">
              <h3>{item.title}</h3>
              <p className="internship-card__desc">{item.description}</p>

              <div className="internship-card__meta">
                <span><FiCalendar /> Deadline: {item.deadline}</span>
                <span><FiMapPin /> {item.location}</span>
              </div>
              <div className="internship-card__meta">
                <span><FiBriefcase /> {item.duration}</span>
                <span className="internship-card__stipend">{item.stipend}</span>
              </div>

              <button className="internship-card__btn" onClick={() => setSelected(item)}>
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <div className="internship-detail">
            <span className="internship-detail__type">{selected.type || "Internship"}</span>
            <h2 className="internship-detail__title">{selected.title}</h2>
            <p className="internship-detail__company">{selected.company}</p>
            <p className="internship-detail__desc">{selected.description}</p>

            <div className="internship-detail__grid">
              <div className="internship-detail__item">
                <span className="internship-detail__label">Deadline</span>
                <span className="internship-detail__value">{selected.deadline}</span>
              </div>
              <div className="internship-detail__item">
                <span className="internship-detail__label">Location</span>
                <span className="internship-detail__value">{selected.location}</span>
              </div>
              <div className="internship-detail__item">
                <span className="internship-detail__label">Duration</span>
                <span className="internship-detail__value">{selected.duration}</span>
              </div>
              <div className="internship-detail__item">
                <span className="internship-detail__label">Stipend</span>
                <span className="internship-detail__value">{selected.stipend || "—"}</span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}