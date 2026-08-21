import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { getDoctorById } from "../api/doctorApi";
import { getDoctorAvailability } from "../api/scheduleApi";

import "./DoctorDetails.css";


function DoctorDetails() {

  const { doctorId } = useParams();

  const navigate = useNavigate();


  /* =========================================
     DOCTOR STATE
  ========================================= */

  const [doctor, setDoctor] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  /* =========================================
     APPOINTMENT STATE
  ========================================= */

  const [selectedDate, setSelectedDate] =
    useState("");

  const [selectedSlot, setSelectedSlot] =
    useState(null);

  const [slots, setSlots] =
    useState([]);

  const [slotsLoading, setSlotsLoading] =
    useState(false);

  const [slotsError, setSlotsError] =
    useState("");


  /* =========================================
     DATE HELPERS
  ========================================= */

  const formatDate = (date) => {

    const year =
      date.getFullYear();

    const month =
      String(
        date.getMonth() + 1
      ).padStart(2, "0");

    const day =
      String(
        date.getDate()
      ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };


  const getDateLabel = (date) => {

    const today = new Date();

    today.setHours(
      0,
      0,
      0,
      0
    );


    const tomorrow =
      new Date(today);

    tomorrow.setDate(
      tomorrow.getDate() + 1
    );


    const dateOnly =
      new Date(date);

    dateOnly.setHours(
      0,
      0,
      0,
      0
    );


    if (
      dateOnly.getTime() ===
      today.getTime()
    ) {
      return "TODAY";
    }


    if (
      dateOnly.getTime() ===
      tomorrow.getTime()
    ) {
      return "TOMORROW";
    }


    return dateOnly
      .toLocaleDateString(
        "en-US",
        {
          weekday: "short",
        }
      )
      .toUpperCase();
  };


  const getMonthName = (date) => {

    return date.toLocaleDateString(
      "en-US",
      {
        month: "short",
      }
    );
  };


  /*
    Generate the next 7 calendar days.
  */

  const generateDates = () => {

    const dates = [];

    const today =
      new Date();

    today.setHours(
      0,
      0,
      0,
      0
    );


    for (
      let i = 0;
      i < 7;
      i++
    ) {

      const date =
        new Date(today);

      date.setDate(
        today.getDate() + i
      );


      dates.push({
        value: formatDate(date),

        label: getDateLabel(date),

        day: date.getDate(),

        month: getMonthName(date),
      });

    }


    return dates;
  };


  const availableDates =
    generateDates();


  /* =========================================
     FETCH DOCTOR
  ========================================= */

  useEffect(() => {

    const fetchDoctor = async () => {

      try {

        setLoading(true);

        setError("");


        const data =
          await getDoctorById(
            doctorId
          );


        setDoctor(data);


      } catch (error) {

        console.error(
          "Failed to fetch doctor:",
          error
        );


        setError(
          "Unable to load doctor information."
        );


      } finally {

        setLoading(false);

      }

    };


    fetchDoctor();

  }, [doctorId]);


  /* =========================================
     SET INITIAL DATE
  ========================================= */

  useEffect(() => {

    if (
      availableDates.length > 0 &&
      !selectedDate
    ) {

      setSelectedDate(
        availableDates[0].value
      );

    }

  }, [selectedDate, availableDates]);


  /* =========================================
     FETCH AVAILABILITY
  ========================================= */

  useEffect(() => {

    if (
      !doctorId ||
      !selectedDate
    ) {
      return;
    }


    const fetchAvailability =
      async () => {

        try {

          setSlotsLoading(true);

          setSlotsError("");

          setSelectedSlot(null);

          setSlots([]);


          const result =
            await getDoctorAvailability(
              doctorId,
              selectedDate
            );


          setSlots(
            result.slots || []
          );


        } catch (error) {

          console.error(
            "Availability error:",
            error
          );


          setSlotsError(
            "Unable to load available slots."
          );


          setSlots([]);

        } finally {

          setSlotsLoading(false);

        }

      };


    fetchAvailability();

  }, [
    doctorId,
    selectedDate,
  ]);


  /* =========================================
     LOADING
  ========================================= */

  if (loading) {

    return (
      <main className="doctor-details-page">

        <div className="doctor-details-container">

          <div className="doctors-loading">

            <div className="loading-spinner"></div>

            <p>
              Loading doctor...
            </p>

          </div>

        </div>

      </main>
    );

  }


  /* =========================================
     ERROR / NOT FOUND
  ========================================= */

  if (
    error ||
    !doctor
  ) {

    return (
      <main className="doctor-not-found">

        <div>

          <h1>
            Doctor not found
          </h1>

          <p>
            {error ||
              "The requested doctor could not be found."}
          </p>

          <Link to="/doctors">
            ← Back to doctors
          </Link>

        </div>

      </main>
    );

  }


  /* =========================================
     DOCTOR DATA
  ========================================= */

  const departmentName =
    doctor.department?.name ||
    doctor.specialty;


  /* =========================================
     HANDLE DATE
  ========================================= */

  const handleDateChange =
    (date) => {

      setSelectedDate(
        date
      );

      setSelectedSlot(
        null
      );

    };


  /* =========================================
     HANDLE SLOT
  ========================================= */

  const handleSlotSelect =
    (slot) => {

      if (
        slot.status !==
        "available"
      ) {
        return;
      }


      setSelectedSlot(
        slot
      );

    };


  /* =========================================
     CONTINUE BOOKING
  ========================================= */

  const handleContinueBooking =
    () => {

      if (
        !selectedSlot
      ) {
        return;
      }


      navigate(
        `/doctors/${doctor._id}/book`,
        {
          state: {
            doctor,

            selectedDate,

            selectedSlot,
          },
        }
      );

    };


  /* =========================================
     RENDER
  ========================================= */

  return (

    <main className="doctor-details-page">

      <div className="doctor-details-container">


        {/* =====================================
            BREADCRUMB
        ===================================== */}

        <div className="doctor-breadcrumb">

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
            {doctor.name}
          </strong>

        </div>


        {/* =====================================
            PROFILE
        ===================================== */}

        <section className="doctor-profile">

          <div className="doctor-profile-main">


            {/* Avatar */}

            <div className="doctor-profile-avatar">

              {doctor.initials}

            </div>


            {/* Information */}

            <div className="doctor-profile-info">

              <span className="doctor-profile-department">

                {departmentName}

              </span>


              <h1>
                {doctor.name}
              </h1>


              <p className="doctor-profile-specialty">

                {doctor.specialty}

              </p>


              <p className="doctor-qualification">

                {doctor.qualification}

              </p>


              {/* Stats */}

              <div className="doctor-profile-stats">

                <div>

                  <strong>
                    {doctor.rating}
                  </strong>

                  <span>
                    ★ Rating
                  </span>

                </div>


                <div>

                  <strong>
                    {doctor.reviews}
                  </strong>

                  <span>
                    Reviews
                  </span>

                </div>


                <div>

                  <strong>
                    {doctor.experience}
                  </strong>

                  <span>
                    Years experience
                  </span>

                </div>

              </div>

            </div>

          </div>


          {/* Consultation */}

          <div className="profile-book-box">

            <span>
              CONSULTATION FEE
            </span>

            <strong>
              ₹{doctor.consultationFee}
            </strong>

            <small>
              {doctor.consultationDuration}
              -minute consultation
            </small>


            <a
              href="#availability"
              className="profile-book-btn"
            >
              Check availability

              <span>
                →
              </span>

            </a>

          </div>

        </section>


        {/* =====================================
            INFORMATION
        ===================================== */}

        <section className="doctor-information">


          {/* About */}

          <div className="doctor-about">

            <span className="section-label">
              ABOUT THE DOCTOR
            </span>


            <h2>

              Professional care,
              <span>
                {" "}personalized for you.
              </span>

            </h2>


            <p>
              {doctor.about}
            </p>

          </div>


          {/* Details */}

          <div className="doctor-details-list">


            <div className="detail-item">

              <span>
                Languages
              </span>

              <strong>
                {doctor.languages?.join(
                  ", "
                ) || "English, Hindi"}
              </strong>

            </div>


            <div className="detail-item">

              <span>
                Department
              </span>

              <strong>
                {departmentName}
              </strong>

            </div>


            <div className="detail-item">

              <span>
                Consultation
              </span>

              <strong>
                {doctor.consultationDuration}
                {" "}minutes
              </strong>

            </div>


            <div className="detail-item">

              <span>
                Status
              </span>

              <strong
                className="doctor-status-text"
              >

                {doctor.status ===
                "active"
                  ? "Available"
                  : "Currently unavailable"}

              </strong>

            </div>

          </div>

        </section>


        {/* =====================================
            WORKING SCHEDULE
        ===================================== */}

        <section className="doctor-working-section">

          <div className="availability-heading">

            <div>

              <span className="section-label">
                WORKING SCHEDULE
              </span>


              <h2>

                Doctor's
                <span>
                  {" "}regular hours.
                </span>

              </h2>

            </div>


            <p>
              Regular consultation hours
              for this doctor.
            </p>

          </div>


          <div className="working-schedule-card">


            {/* Working Days */}

            <div className="working-schedule-row">

              <div>

                <span>
                  WORKING DAYS
                </span>

                <strong>

                  {doctor.workingDays?.length
                    ? doctor.workingDays.join(
                        " · "
                      )
                    : "Schedule unavailable"}

                </strong>

              </div>

            </div>


            {/* Morning */}

            {doctor.workingHours?.morning && (

              <div className="working-schedule-row">

                <div>

                  <span>
                    MORNING SESSION
                  </span>

                  <strong>
                    {doctor.workingHours.morning}
                  </strong>

                </div>

              </div>

            )}


            {/* Evening */}

            {doctor.workingHours?.evening && (

              <div className="working-schedule-row">

                <div>

                  <span>
                    EVENING SESSION
                  </span>

                  <strong>
                    {doctor.workingHours.evening}
                  </strong>

                </div>

              </div>

            )}

          </div>

        </section>


        {/* =====================================
            APPOINTMENT
        ===================================== */}

        <section
          className="doctor-availability-section"
          id="availability"
        >

          <div className="availability-heading">

            <div>

              <span className="section-label">
                APPOINTMENT
              </span>


              <h2>

                Choose your
                <span>
                  {" "}preferred slot.
                </span>

              </h2>

            </div>


            <p>
              Select a date to see real-time
              appointment availability.
            </p>

          </div>


          <div className="booking-layout">


            {/* =================================
                DATE SELECTION
            ================================= */}

            <div className="date-selection">

              <h3>
                Select date
              </h3>


              <div className="date-options">

                {availableDates.map(
                  (date) => (

                    <button
                      key={date.value}
                      type="button"
                      className={
                        selectedDate ===
                        date.value
                          ? "date-option active"
                          : "date-option"
                      }
                      onClick={() =>
                        handleDateChange(
                          date.value
                        )
                      }
                    >

                      <span>
                        {date.label}
                      </span>


                      <strong>
                        {date.day}
                      </strong>


                      <small>
                        {date.month}
                      </small>

                    </button>

                  )
                )}

              </div>

            </div>


            {/* =================================
                TIME SLOTS
            ================================= */}

            <div className="slot-selection">

              <div className="slot-heading">

                <h3>
                  Available time
                </h3>


                <span>
                  {slots.length > 0
                    ? `${slots.length} slots`
                    : "No slots"}
                </span>

              </div>


              {/* Loading */}

              {slotsLoading && (

                <div className="slot-empty-state">

                  <div className="loading-spinner"></div>

                  <h4>
                    Loading availability
                  </h4>

                  <p>
                    Checking the hospital
                    schedule...
                  </p>

                </div>

              )}


              {/* Error */}

              {!slotsLoading &&
                slotsError && (

                  <div className="slot-empty-state">

                    <div className="slot-empty-icon">
                      !
                    </div>

                    <h4>
                      Unable to load slots
                    </h4>

                    <p>
                      {slotsError}
                    </p>

                  </div>

                )}


              {/* No slots */}

              {!slotsLoading &&
                !slotsError &&
                slots.length === 0 && (

                  <div className="slot-empty-state">

                    <div className="slot-empty-icon">
                      ◷
                    </div>

                    <h4>
                      No slots available
                    </h4>

                    <p>
                      This doctor does not have
                      an available schedule on
                      the selected date.
                    </p>

                  </div>

                )}


              {/* Slots */}

              {!slotsLoading &&
                !slotsError &&
                slots.length > 0 && (

                  <div className="slot-grid">

                    {slots.map(
                      (slot) => (

                        <button
                          key={
                            slot.startTime
                          }
                          type="button"
                          disabled={
                            slot.status !==
                            "available"
                          }
                          className={
                            selectedSlot?.startTime ===
                            slot.startTime
                              ? "time-slot selected"
                              : "time-slot"
                          }
                          onClick={() =>
                            handleSlotSelect(
                              slot
                            )
                          }
                        >

                          {slot.time}

                        </button>

                      )
                    )}

                  </div>

                )}

            </div>

          </div>

        </section>


        {/* =====================================
            BOOKING BAR
        ===================================== */}

        <section className="doctor-booking-bar">

          <div>

            <span>
              APPOINTMENT
            </span>


            <strong>

              {selectedSlot
                ? `${selectedDate} • ${selectedSlot.time}`
                : "Select an available slot"}

            </strong>

          </div>


          <button
            type="button"
            className={
              selectedSlot
                ? "doctor-book-now"
                : "doctor-book-now disabled"
            }
            disabled={
              !selectedSlot
            }
            onClick={
              handleContinueBooking
            }
          >

            {selectedSlot
              ? "Continue booking"
              : "Select a time slot"}


            <span>
              →
            </span>

          </button>

        </section>


      </div>

    </main>
  );
}


export default DoctorDetails;