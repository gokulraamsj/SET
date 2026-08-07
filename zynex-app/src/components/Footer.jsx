import { FiMail, FiInstagram, FiLinkedin } from "react-icons/fi";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <span className="footer__logo">VERTEX</span>
          <p>Department of MECHANICAL | AI &amp; DS | CSE | ECE | IT | PCT | EEE.</p>
          <div className="footer__socials">
            <FiInstagram />
            <FiLinkedin />
            <FiMail />
          </div>
        </div>

        <div className="footer__col">
          <h4>Quick Links</h4>
          <a href="#home">Home</a>
          <a href="#team">Team</a>
          <a href="#events">Events</a>
          <a href="#">Results</a>
        </div>

        <div className="footer__col">
          <h4>Legal &amp; Support</h4>
          <a href="#contact">Enquiry Desk</a>
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
        </div>

        <div className="footer__col">
          <h4>Headquarters</h4>
          <p>VERTEX - Room No. 400, RVS - COLLEGE  OF ENGINEERING. </p>
          <p>clubvertex029@gmail.com</p>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© 2026 VERTEX. All rights reserved.</p>
        <p>Built by Association of MECHANICAL | AI &amp; DS | CSE | ECE | IT | PCT | EEE.</p>
      </div>
    </footer>
  );
}