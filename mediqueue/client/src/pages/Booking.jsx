import {
  useState,
} from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  createAppointment,
} from "../api/appointmentApi";

import "./Booking.css";


function Booking() {

  const location =
    useLocation();

  const navigate =
    useNavigate();


  /* =========================================
     BOOKING DATA FROM DOCTOR DETAILS
  ========================================= */

  const {
    doctor,
    selectedDate,
    selectedSlot,
  } = location.state || {};


  /* =========================================
     FORM STATE
  ========================================= */

  const [
    formData,
    setFormData,
  ] = useState({

    patientName: "",

    patientAge: "",

    patientGender: "",

    patientPhone: "",

    patientEmail: "",

    reason: "",

  });


  /* =========================================
     UI STATE
  ========================================= */

  const [
    submitting,
    setSubmitting,
  ] = useState(false);


  const [
    error,
    setError,
  ] = useState("");


  /* =========================================
     HANDLE INPUT
  ========================================= */

  const handleChange = (event) => {

    const {
      name,
      value,
    } = event.target;


    setFormData(
      (previous) => ({
        ...previous,

        [name]: value,
      })
    );


    setError("");

  };


  /* =========================================
     HANDLE SUBMIT
  ========================================= */

  const handleSubmit = async (
    event
  ) => {

    event.preventDefault();


    setError("");


    /* ================================
       BASIC VALIDATION
    ================================= */

    if (
      !formData.patientName.trim()
    ) {

      setError(
        "Please enter the patient's name."
      );

      return;

    }


    if (
      !formData.patientAge
    ) {

      setError(
        "Please enter the patient's age."
      );

      return;

    }


    const age =
      Number(
        formData.patientAge
      );


    if (
      age < 0 ||
      age > 120
    ) {

      setError(
        "Please enter a valid age."
      );

      return;

    }


    if (
      !formData.patientGender
    ) {

      setError(
        "Please select the patient's gender."
      );

      return;

    }


    if (
      !formData.patientPhone.trim()
    ) {

      setError(
        "Please enter a phone number."
      );

      return;

    }


    if (
      !/^[0-9]{10}$/.test(
        formData.patientPhone
      )
    ) {

      setError(
        "Please enter a valid 10-digit phone number."
      );

      return;

    }


    /* ================================
       CHECK BOOKING DATA
    ================================= */

    if (
      !doctor ||
      !selectedDate ||
      !selectedSlot
    ) {

      setError(
        "Booking information is missing. Please select the doctor, date and time slot again."
      );

      return;

    }


    /* ================================
       SUBMIT
    ================================= */

    try {

      setSubmitting(true);


      const payload = {

        doctor:
          doctor._id,

        patientName:
          formData.patientName.trim(),

        patientAge:
          age,

        patientGender:
          formData.patientGender,

        patientPhone:
          formData.patientPhone.trim(),

        patientEmail:
          formData.patientEmail.trim(),

        date:
          selectedDate,

        startTime:
          selectedSlot.startTime,

        endTime:
          selectedSlot.endTime,

        reason:
          formData.reason.trim(),

      };


      /*
      =========================================
      CREATE APPOINTMENT
      =========================================
      */

      const result =
        await createAppointment(
          payload
        );


      /*
      =========================================
      GET GENERATED TICKET NUMBER
      =========================================

      Backend response:

      {
        success: true,
        data: {
          ticketNumber: "MQ-..."
        }
      }
      */

      const ticketNumber =
        result?.data?.ticketNumber;


      /*
      =========================================
      SAFETY CHECK
      =========================================
      */

      if (!ticketNumber) {

        console.error(
          "Appointment created but ticket number is missing:",
          result
        );


        setError(
          "Appointment was booked, but the ticket number could not be generated. Please check My Appointments."
        );

        return;

      }


      /*
      =========================================
      GO TO CONFIRMATION
      =========================================

      IMPORTANT:

      We now put the ticket number into
      the URL.

      Example:

      /appointment-confirmation?ticket=MQ-20260820-4798C1
      */

      navigate(
        `/appointment-confirmation?ticket=${encodeURIComponent(
          ticketNumber
        )}`
      );


    } catch (error) {

      console.error(
        "Booking error:",
        error
      );


      if (
        error.status === 409
      ) {

        setError(
          "This slot has just been booked by another patient. Please go back and choose another slot."
        );

      } else {

        setError(
          error.message ||
          "Unable to book appointment. Please try again."
        );

      }

    } finally {

      setSubmitting(false);

    }

  };


  /* =========================================
     MISSING BOOKING DATA
  ========================================= */

  if (
    !doctor ||
    !selectedDate ||
    !selectedSlot
  ) {

    return (

      <main className="booking-page">

        <div className="booking-container">

          <div className="booking-invalid">

            <div className="booking-invalid-icon">
              !
            </div>


            <h1>
              Booking information missing
            </h1>


            <p>
              Please select a doctor, date,
              and available time slot first.
            </p>


            <Link to="/doctors">
              ← Back to doctors
            </Link>

          </div>

        </div>

      </main>

    );

  }


  /* =========================================
     DATE DISPLAY
  ========================================= */

  const displayDate =
    new Date(
      `${selectedDate}T00:00:00`
    ).toLocaleDateString(
      "en-IN",
      {
        weekday: "long",

        day: "numeric",

        month: "long",

        year: "numeric",
      }
    );


  /* =========================================
     RENDER
  ========================================= */

  return (

    <main className="booking-page">

      <div className="booking-container">


        {/* =====================================
            BREADCRUMB
        ===================================== */}

        <div className="booking-breadcrumb">

          <Link to="/">
            Home
          </Link>

          <span>
            /
          </span>

          <Link to="/doctors">
            Doctors
          </Link>

          <span>
            /
          </span>

          <strong>
            Booking
          </strong>

        </div>


        {/* =====================================
            HEADER
        ===================================== */}

        <section className="booking-header">

          <div>

            <span className="section-label">
              APPOINTMENT
            </span>


            <h1>

              Complete your

              <span>
                {" "}booking.
              </span>

            </h1>


            <p>
              Enter the patient's information
              to confirm the appointment.
            </p>

          </div>

        </section>


        {/* =====================================
            BOOKING LAYOUT
        ===================================== */}

        <div className="booking-content">


          {/* ===================================
              LEFT — APPOINTMENT SUMMARY
          =================================== */}

          <aside className="booking-summary">

            <div className="summary-label">
              YOUR APPOINTMENT
            </div>


            {/* Doctor */}

            <div className="summary-doctor">

              <div className="summary-avatar">
                {doctor.initials}
              </div>


              <div>

                <h2>
                  {doctor.name}
                </h2>

                <p>
                  {doctor.specialty}
                </p>

              </div>

            </div>


            {/* Appointment Details */}

            <div className="summary-details">

              <div className="summary-detail">

                <span>
                  DATE
                </span>

                <strong>
                  {displayDate}
                </strong>

              </div>


              <div className="summary-detail">

                <span>
                  TIME
                </span>

                <strong>
                  {selectedSlot.time}
                </strong>

              </div>


              <div className="summary-detail">

                <span>
                  DURATION
                </span>

                <strong>
                  {doctor.consultationDuration}
                  {" "}minutes
                </strong>

              </div>


              <div className="summary-detail">

                <span>
                  CONSULTATION FEE
                </span>

                <strong>
                  ₹{doctor.consultationFee}
                </strong>

              </div>

            </div>


            {/* Notice */}

            <div className="summary-notice">

              <span>
                ✓
              </span>

              <p>
                Your selected slot will be
                reserved only after the
                appointment is successfully
                confirmed.
              </p>

            </div>

          </aside>


          {/* ===================================
              RIGHT — PATIENT FORM
          =================================== */}

          <section className="booking-form-card">

            <div className="booking-form-header">

              <span className="section-label">
                PATIENT DETAILS
              </span>

              <h2>
                Who is this appointment for?
              </h2>

              <p>
                Please provide accurate information
                for the hospital records.
              </p>

            </div>


            <form
              onSubmit={
                handleSubmit
              }
            >


              {/* ================================
                  NAME
              ================================= */}

              <div className="form-group">

                <label htmlFor="patientName">
                  Full name

                  <span>
                    *
                  </span>

                </label>


                <input
                  id="patientName"
                  name="patientName"
                  type="text"
                  placeholder="Enter patient's full name"
                  value={
                    formData.patientName
                  }
                  onChange={
                    handleChange
                  }
                  autoComplete="name"
                />

              </div>


              {/* ================================
                  AGE + GENDER
              ================================= */}

              <div className="form-row">

                <div className="form-group">

                  <label htmlFor="patientAge">

                    Age

                    <span>
                      *
                    </span>

                  </label>


                  <input
                    id="patientAge"
                    name="patientAge"
                    type="number"
                    min="0"
                    max="120"
                    placeholder="Age"
                    value={
                      formData.patientAge
                    }
                    onChange={
                      handleChange
                    }
                  />

                </div>


                <div className="form-group">

                  <label htmlFor="patientGender">

                    Gender

                    <span>
                      *
                    </span>

                  </label>


                  <select
                    id="patientGender"
                    name="patientGender"
                    value={
                      formData.patientGender
                    }
                    onChange={
                      handleChange
                    }
                  >

                    <option value="">
                      Select gender
                    </option>

                    <option value="Male">
                      Male
                    </option>

                    <option value="Female">
                      Female
                    </option>

                    <option value="Other">
                      Other
                    </option>

                  </select>

                </div>

              </div>


              {/* ================================
                  PHONE
              ================================= */}

              <div className="form-group">

                <label htmlFor="patientPhone">

                  Phone number

                  <span>
                    *
                  </span>

                </label>


                <input
                  id="patientPhone"
                  name="patientPhone"
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={
                    formData.patientPhone
                  }
                  onChange={
                    handleChange
                  }
                  maxLength="10"
                  autoComplete="tel"
                />

              </div>


              {/* ================================
                  EMAIL
              ================================= */}

              <div className="form-group">

                <label htmlFor="patientEmail">

                  Email address

                  <small>
                    Optional
                  </small>

                </label>


                <input
                  id="patientEmail"
                  name="patientEmail"
                  type="email"
                  placeholder="patient@example.com"
                  value={
                    formData.patientEmail
                  }
                  onChange={
                    handleChange
                  }
                  autoComplete="email"
                />

              </div>


              {/* ================================
                  REASON
              ================================= */}

              <div className="form-group">

                <label htmlFor="reason">

                  Reason for visit

                  <small>
                    Optional
                  </small>

                </label>


                <textarea
                  id="reason"
                  name="reason"
                  rows="4"
                  placeholder="Briefly describe the reason for your visit..."
                  value={
                    formData.reason
                  }
                  onChange={
                    handleChange
                  }
                  maxLength="500"
                />

              </div>


              {/* ================================
                  ERROR
              ================================= */}

              {error && (

                <div className="booking-error">

                  <div>
                    !
                  </div>

                  <p>
                    {error}
                  </p>

                </div>

              )}


              {/* ================================
                  SUBMIT
              ================================= */}

              <button
                type="submit"
                className="confirm-booking-btn"
                disabled={
                  submitting
                }
              >

                {submitting
                  ? "Confirming appointment..."
                  : "Confirm appointment"}


                {!submitting && (

                  <span>
                    →
                  </span>

                )}

              </button>


              <p className="booking-terms">

                By confirming this appointment,
                you agree that the information
                provided is accurate.

              </p>

            </form>

          </section>

        </div>

      </div>

    </main>

  );

}


export default Booking;