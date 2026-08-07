import { useEffect, useState } from "react";
import { FiSearch, FiCalendar, FiMapPin, FiUser } from "react-icons/fi";
import { fetchEvents } from "../api";
import Modal from "./Modal";
import "./Events.css";

const filters = ["All", "Technical Event", "Non Technical Events"];

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchEvents()
      .then((data) => setEvents(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = events.filter((e) => {
    const matchesFilter = activeFilter === "All" || e.category === activeFilter;
    const matchesSearch = e.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section className="events" id="events">
      <p className="events__label">EVENTS</p>
      <h2 className="events__heading">EVENTS</h2>

      <div className="events__bar">
        <div className="events__tabs">
          {filters.map((f) => (
            <button
              key={f}
              className={`events__tab ${activeFilter === f ? "events__tab--active" : ""}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="events__search">
          <FiSearch />
          <input
            type="text"
            placeholder="Search event name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading && <p className="events__status">Loading events...</p>}
      {error && <p className="events__status">Couldn't load events: {error}</p>}
      {!loading && !error && filtered.length === 0 && (
        <p className="events__status">No events found.</p>
      )}

      <div className="events__grid">
        {filtered.map((event) => (
          <div className="event-card" key={event.id}>
            <div className="event-card__banner">
              <span>{event.title}</span>
            </div>
            <div className="event-card__body">
              <h3>{event.title}</h3>
              <p className="event-card__desc">{event.description}</p>
              <div className="event-card__meta">
                <span><FiCalendar /> {event.event_date}</span>
                <span><FiMapPin /> {event.venue}</span>
              </div>
              <div className="event-card__meta">
                <span><FiUser /> {event.organizer}</span>
                <span className="event-card__sponsor">{event.sponsor}</span>
              </div>
              <button className="event-card__btn" onClick={() => setSelectedEvent(event)}>
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={!!selectedEvent} onClose={() => setSelectedEvent(null)}>
        {selectedEvent && (
          <div className="event-detail">
            <span className="event-detail__category">{selectedEvent.category}</span>
            <h2 className="event-detail__title">{selectedEvent.title}</h2>
            <p className="event-detail__desc">{selectedEvent.description}</p>

            <div className="event-detail__grid">
              <div className="event-detail__item">
                <span className="event-detail__label">Date</span>
                <span className="event-detail__value">{selectedEvent.event_date}</span>
              </div>
              <div className="event-detail__item">
                <span className="event-detail__label">Venue</span>
                <span className="event-detail__value">{selectedEvent.venue}</span>
              </div>
              <div className="event-detail__item">
                <span className="event-detail__label">Organizer</span>
                <span className="event-detail__value">{selectedEvent.organizer}</span>
              </div>
              <div className="event-detail__item">
                <span className="event-detail__label">Sponsor</span>
                <span className="event-detail__value">{selectedEvent.sponsor || "—"}</span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}