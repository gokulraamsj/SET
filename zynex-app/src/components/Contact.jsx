import { useState } from "react";
import { FiMail, FiMapPin, FiSend } from "react-icons/fi";
import { submitContact } from "../api";
import "./Contact.css";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", details: "" });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await submitContact(form);
      setStatus("success");
      setForm({ name: "", email: "", subject: "", details: "" });
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="contact__left">
        <h2>Let's Connect</h2>
        <p>
          Have a question about our events, club inductions, or just want to
          discuss the future of AI? Drop us a message.
        </p>

        <div className="contact__info">
          <FiMail />
          <div>
            <span className="contact__info-label">EMAIL US</span>
            <p>clubvertex029@gmail.com</p>
          </div>
        </div>

        <div className="contact__info">
          <FiMapPin />
          <div>
            <span className="contact__info-label">VISIT US</span>
            <p>VERTEX - Room No. 400, RVS COLLEGE OF ENGINEERING </p>
          </div>
        </div>
      </div>

      <form className="contact__form" onSubmit={handleSubmit}>
        <div className="contact__form-row">
          <div className="contact__field">
            <label>YOUR NAME</label>
            <input name="name" placeholder="e.g. John Doe" value={form.name} onChange={handleChange} required />
          </div>
          <div className="contact__field">
            <label>EMAIL ADDRESS</label>
            <input name="email" type="email" placeholder="e.g. name@email.com" value={form.email} onChange={handleChange} required />
          </div>
        </div>

        <div className="contact__field">
          <label>SUBJECT</label>
          <input name="subject" placeholder="e.g. Club Registration Inquiries" value={form.subject} onChange={handleChange} />
        </div>

        <div className="contact__field">
          <label>DETAILS</label>
          <textarea name="details" placeholder="Draft your query here..." rows={4} value={form.details} onChange={handleChange} />
        </div>

        <button type="submit" className="contact__submit" disabled={status === "sending"}>
          <FiSend /> {status === "sending" ? "Sending..." : "Dispatch Message"}
        </button>

        {status === "success" && <p className="contact__status contact__status--ok">Message sent successfully!</p>}
        {status === "error" && <p className="contact__status contact__status--err">Something went wrong. Try again.</p>}
      </form>
    </section>
  );
}