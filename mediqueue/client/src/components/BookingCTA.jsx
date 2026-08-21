import { Link } from "react-router-dom";
import "./BookingCTA.css";

function BookingCTA() {
  return (
    <section className="booking-cta">

      <div className="booking-cta-container">

        <div className="cta-content">

          <span className="section-label">
            READY TO GET STARTED?
          </span>

          <h2>
            Your next appointment
            <span> is just a few clicks away.</span>
          </h2>

          <p>
            Find a doctor, choose your preferred time and
            receive your digital appointment ticket instantly.
          </p>

          <div className="cta-actions">

            <Link
              to="/doctors"
              className="cta-primary"
            >
              Find a Doctor
              <span>→</span>
            </Link>

            <Link
              to="/register"
              className="cta-secondary"
            >
              Create an account
            </Link>

          </div>

        </div>

        <div className="cta-decoration">

          <div className="cta-circle circle-one"></div>
          <div className="cta-circle circle-two"></div>

          <div className="cta-card">

            <span>YOUR NEXT VISIT</span>

            <strong>A-027</strong>

            <small>
              Appointment ticket
            </small>

          </div>

        </div>

      </div>

    </section>
  );
}

export default BookingCTA;