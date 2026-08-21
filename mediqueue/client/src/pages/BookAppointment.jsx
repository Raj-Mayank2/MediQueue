import { useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

import doctors from "../data/doctors";

import "./BookAppointment.css";

function BookAppointment() {
  const { doctorId } = useParams();

  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const doctor = doctors.find(
    (item) => item.id === Number(doctorId)
  );

  const selectedDate =
    searchParams.get("date");

  const selectedSlot =
    searchParams.get("slot");

  const [patient, setPatient] = useState({
    name: "",
    phone: "",
    email: "",
    reason: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setPatient((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !patient.name ||
      !patient.phone ||
      !patient.email
    ) {
      return;
    }

    const ticketNumber =
      `MED-${Date.now().toString().slice(-6)}`;

    navigate(
      `/appointment-confirmed/${ticketNumber}`,
      {
        state: {
          doctor,
          patient,
          selectedDate,
          selectedSlot,
        },
      }
    );
  };

  if (!doctor || !selectedDate || !selectedSlot) {
    return (
      <main className="booking-error">

        <h1>
          Booking information is incomplete
        </h1>

        <p>
          Please select a doctor, date and time slot
          before continuing.
        </p>

        <Link to="/doctors">
          Browse doctors
        </Link>

      </main>
    );
  }

  return (
    <main className="booking-page">

      <div className="booking-container">

        <div className="booking-header">

          <Link
            to={`/doctors/${doctor.id}`}
            className="back-link"
          >
            ← Back to doctor
          </Link>

          <span className="section-label">
            APPOINTMENT BOOKING
          </span>

          <h1>
            Complete your
            <span> appointment.</span>
          </h1>

          <p>
            Enter your details to confirm your
            appointment with {doctor.name}.
          </p>

        </div>


        <div className="booking-layout">

          {/* Patient Form */}

          <form
            className="patient-form"
            onSubmit={handleSubmit}
          >

            <div className="form-section-heading">

              <span>01</span>

              <div>

                <h2>
                  Patient details
                </h2>

                <p>
                  Please provide the patient's
                  contact information.
                </p>

              </div>

            </div>


            <div className="form-grid">

              <div className="form-group">

                <label>
                  Full name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter full name"
                  value={patient.name}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="form-group">

                <label>
                  Phone number
                </label>

                <input
                  type="tel"
                  name="phone"
                  placeholder="+91 XXXXX XXXXX"
                  value={patient.phone}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="form-group full-width">

                <label>
                  Email address
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={patient.email}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="form-group full-width">

                <label>
                  Reason for visit
                  <span>Optional</span>
                </label>

                <textarea
                  name="reason"
                  rows="4"
                  placeholder="Briefly describe the reason for your visit..."
                  value={patient.reason}
                  onChange={handleChange}
                />

              </div>

            </div>


            <div className="form-notice">

              <span>ⓘ</span>

              <p>
                Your information will only be used to
                manage this appointment.
              </p>

            </div>


            <button
              type="submit"
              className="confirm-booking-btn"
            >
              Confirm Appointment
              <span>→</span>
            </button>

          </form>


          {/* Appointment Summary */}

          <aside className="appointment-summary">

            <div className="summary-header">

              <span>
                APPOINTMENT SUMMARY
              </span>

              <strong>
                Review
              </strong>

            </div>


            <div className="summary-doctor">

              <div className="summary-avatar">
                {doctor.initials}
              </div>

              <div>

                <h3>
                  {doctor.name}
                </h3>

                <p>
                  {doctor.specialty}
                </p>

              </div>

            </div>


            <div className="summary-details">

              <div className="summary-item">

                <span>DATE</span>

                <strong>
                  {selectedDate}
                </strong>

              </div>

              <div className="summary-item">

                <span>TIME</span>

                <strong>
                  {selectedSlot}
                </strong>

              </div>

              <div className="summary-item">

                <span>DEPARTMENT</span>

                <strong>
                  {doctor.department}
                </strong>

              </div>

              <div className="summary-item">

                <span>
                  CONSULTATION FEE
                </span>

                <strong>
                  ₹{doctor.fee}
                </strong>

              </div>

            </div>


            <div className="summary-total">

              <span>
                Total
              </span>

              <strong>
                ₹{doctor.fee}
              </strong>

            </div>


            <div className="summary-ticket-note">

              <span>🎟</span>

              <p>
                A unique appointment ticket will
                be generated after confirmation.
              </p>

            </div>

          </aside>

        </div>

      </div>

    </main>
  );
}

export default BookAppointment;