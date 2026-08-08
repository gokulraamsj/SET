import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FiBell, FiMenu, FiX } from "react-icons/fi";
import { useAuth } from "../AuthContext";
import { fetchNotifications } from "../api";
import "./Navbar.css";
import logo from "../assets/vertex-logo.jpeg";

const navLinks = ["Home", "About", "Team", "Events", "Internships", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [seenCount, setSeenCount] = useState(0);
  const { user } = useAuth();
  const navigate = useNavigate();
  const notifRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetchNotifications()
      .then((data) => setNotifications(data))
      .catch(() => {});

    const stored = localStorage.getItem("vertex_seen_notif_count");
    if (stored) setSeenCount(parseInt(stored, 10));
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = Math.max(notifications.length - seenCount, 0);

  const toggleNotifications = () => {
    setNotifOpen((open) => !open);
    if (!notifOpen) {
      setSeenCount(notifications.length);
      localStorage.setItem("vertex_seen_notif_count", notifications.length);
    }
  };

  const scrollToSection = (id) => {
  const targetId = id.toLowerCase();

  const tryScroll = (attempts = 0) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else if (attempts < 20) {
      setTimeout(() => tryScroll(attempts + 1), 100);
    }
  };

  if (window.location.pathname !== "/") {
    navigate("/");
    setTimeout(() => tryScroll(), 150);
  } else {
    tryScroll();
  }
  setMenuOpen(false);
};

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
  <span className="navbar__logo-text">VERTEX</span>
</div>

      <ul className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}>
        {navLinks.map((link) => (
          <li key={link} onClick={() => scrollToSection(link)}>
            {link}
          </li>
        ))}
      </ul>

      <div className="navbar__actions">
        <div className="navbar__notif" ref={notifRef}>
          <div className="navbar__icon-wrap" onClick={toggleNotifications}>
            <FiBell className="navbar__icon" />
            {unreadCount > 0 && <span className="navbar__badge">{unreadCount}</span>}
          </div>

          {notifOpen && (
            <div className="navbar__notif-dropdown">
              <p className="navbar__notif-title">Notifications</p>
              {notifications.length === 0 ? (
                <p className="navbar__notif-empty">No notifications yet.</p>
              ) : (
                notifications.map((n) => (
                  <div className="navbar__notif-item" key={n.id}>
                    <span className="navbar__notif-item-title">{n.title}</span>
                    {n.message && <span className="navbar__notif-item-msg">{n.message}</span>}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {user ? (
  <button className="btn btn--filled" onClick={() => navigate("/dashboard")}>
    Profile
  </button>
) : (
  <button className="btn btn--filled" onClick={() => navigate("/auth")}>
    Login
  </button>
)}
        <div className="navbar__burger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </div>
      </div>
    </nav>
  );
}