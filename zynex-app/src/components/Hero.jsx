import "./Hero.css";
import heroBg from "../assets/hero-bg.jpeg";

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero__glow" />
      <h1 className="hero__title">VERTEX</h1>

      <p className="hero__label">DEPARTMENT OF</p>
      <p className="hero__sublabel">MECHANICAL | AI &amp; DS | CSE | ECE | IT | PCT | EEE</p>

      <div className="hero__actions">
  <button
    className="btn btn--filled hero__btn"
    onClick={() => document.getElementById("events")?.scrollIntoView({ behavior: "smooth" })}
  >
    Explore Events
  </button>
</div>
    </section>
  );
}