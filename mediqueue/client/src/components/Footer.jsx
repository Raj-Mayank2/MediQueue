import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-main">

          <div className="footer-brand">

            <Link to="/" className="footer-logo">

              <div className="footer-logo-mark">
                <span></span>
              </div>

              <span>MediQueue</span>

            </Link>

            <p>
              Making hospital appointments simpler,
              faster and more predictable.
            </p>

            <div className="footer-emergency">

              <span>Emergency</span>

              <strong>+91 1800 123 4567</strong>

            </div>

          </div>


          <div className="footer-column">

            <h4>Hospital</h4>

            <Link to="/doctors">
              Find a Doctor
            </Link>

            <Link to="/departments">
              Departments
            </Link>

            <a href="#about">
              About Us
            </a>

            <a href="#contact">
              Contact
            </a>

          </div>


          <div className="footer-column">

            <h4>Patients</h4>

            <Link to="/register">
              Create Account
            </Link>

            <Link to="/login">
              Sign In
            </Link>

            <a href="#appointments">
              Appointments
            </a>

            <a href="#queue">
              Track Queue
            </a>

          </div>


          <div className="footer-column">

            <h4>Contact</h4>

            <span>
              123 Healthcare Avenue
            </span>

            <span>
              Patna, Bihar
            </span>

            <span>
              support@mediqueue.com
            </span>

            <span>
              Mon - Sat · 8:00 AM - 8:00 PM
            </span>

          </div>

        </div>


        <div className="footer-bottom">

          <span>
            © 2026 MediQueue. All rights reserved.
          </span>

          <div>
            <a href="#privacy">
              Privacy Policy
            </a>

            <a href="#terms">
              Terms of Service
            </a>
          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;