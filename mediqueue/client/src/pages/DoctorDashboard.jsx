import {
  useEffect,
  useState,
} from "react";

import {
  useAuth,
} from "../context/AuthContext";

import {
  getDoctorDashboard,
} from "../api/doctorApi";

import {
  checkInAppointment,
  startConsultation,
  completeAppointment,
  markNoShow,
} from "../api/appointmentApi";

import "./DoctorDashboard.css";


function DoctorDashboard() {

  const {
    user,
  } = useAuth();


  const [
    dashboard,
    setDashboard,
  ] = useState(null);


  const [
    loading,
    setLoading,
  ] = useState(true);


  const [
    error,
    setError,
  ] = useState("");


  const [
    actionLoading,
    setActionLoading,
  ] = useState(null);


  /*
  =========================================
  LOAD DASHBOARD
  =========================================
  */

  const loadDashboard =
    async () => {

      try {

        setLoading(true);

        setError("");


        const result =
          await getDoctorDashboard();


        setDashboard(
          result
        );


      } catch (error) {

        console.error(
          "Doctor dashboard error:",
          error
        );


        setError(
          error.message ||
          "Failed to load dashboard."
        );


      } finally {

        setLoading(false);

      }

    };


  /*
  =========================================
  INITIAL LOAD
  =========================================
  */

  useEffect(() => {

    loadDashboard();

  }, []);


  /*
  =========================================
  APPOINTMENT ACTION
  =========================================
  */

  const handleAppointmentAction =
    async (
      action,
      appointmentId
    ) => {

      try {

        setActionLoading(
          appointmentId
        );

        setError("");


        if (
          action ===
          "check-in"
        ) {

          await checkInAppointment(
            appointmentId
          );

        }


        if (
          action ===
          "start"
        ) {

          await startConsultation(
            appointmentId
          );

        }


        if (
          action ===
          "complete"
        ) {

          await completeAppointment(
            appointmentId
          );

        }


        if (
          action ===
          "no-show"
        ) {

          const confirmed =
            window.confirm(
              "Are you sure you want to mark this patient as no-show?"
            );


          if (!confirmed) {

            return;

          }


          await markNoShow(
            appointmentId
          );

        }


        /*
        =====================================
        REFRESH DASHBOARD
        =====================================
        */

        await loadDashboard();


      } catch (error) {

        console.error(
          "Appointment action error:",
          error
        );


        setError(
          error.message ||
          "Failed to update appointment."
        );


      } finally {

        setActionLoading(
          null
        );

      }

    };


  /*
  =========================================
  LOADING
  =========================================
  */

  if (loading) {

    return (

      <main className="doctor-dashboard">

        <div className="doctor-dashboard-container">

          <div className="doctor-loading">

            Loading doctor dashboard...

          </div>

        </div>

      </main>

    );

  }


  /*
  =========================================
  ERROR
  =========================================
  */

  if (error && !dashboard) {

    return (

      <main className="doctor-dashboard">

        <div className="doctor-dashboard-container">

          <div className="doctor-error">

            <h2>
              Unable to load dashboard
            </h2>

            <p>
              {error}
            </p>


            <button
              type="button"
              onClick={
                loadDashboard
              }
            >
              Try again
            </button>

          </div>

        </div>

      </main>

    );

  }


  /*
  =========================================
  DASHBOARD DATA
  =========================================
  */

  const doctor =
    dashboard?.doctor;


  const stats =
    dashboard?.stats || {};


  const appointments =
    dashboard?.appointments || [];


  /*
  =========================================
  STATUS LABEL
  =========================================
  */

  const getStatusLabel =
    (status) => {

      switch (status) {

        case "booked":
          return "Booked";

        case "checked-in":
          return "Checked In";

        case "consulting":
          return "Consulting";

        case "completed":
          return "Completed";

        case "cancelled":
          return "Cancelled";

        case "no-show":
          return "No Show";

        default:
          return status;

      }

    };


  /*
  =========================================
  STATUS CLASS
  =========================================
  */

  const getStatusClass =
    (status) => {

      return `doctor-status doctor-status-${status}`;

    };


  /*
  =========================================
  RENDER
  =========================================
  */

  return (

    <main className="doctor-dashboard">

      <div className="doctor-dashboard-container">


        {/* =================================
            HEADER
        ================================= */}

        <section className="doctor-dashboard-header">

          <div>

            <span className="doctor-dashboard-eyebrow">
              DOCTOR PORTAL
            </span>


            <h1>

              Welcome back,

              {" "}

              <span>

                {doctor?.name ||
                  user?.name ||
                  "Doctor"}

              </span>

            </h1>


            <p>

              Manage your appointments,
              patients and consultation queue
              from one place.

            </p>

          </div>


          <div className="doctor-profile-badge">

            <div className="doctor-avatar">

              {doctor?.initials ||

                user?.name
                  ?.charAt(0)
                  ?.toUpperCase() ||

                "D"}

            </div>


            <div>

              <strong>

                {doctor?.name ||
                  user?.name ||
                  "Doctor"}

              </strong>


              <span>

                {doctor?.specialty ||
                  "Doctor"}

              </span>

            </div>

          </div>

        </section>


        {/* =================================
            ERROR MESSAGE
        ================================= */}

        {error && (

          <div className="doctor-action-error">

            {error}

          </div>

        )}


        {/* =================================
            STATISTICS
        ================================= */}

        <section className="doctor-dashboard-stats">


          {/* TOTAL */}

          <div className="doctor-stat-card">

            <span className="doctor-stat-icon">
              📅
            </span>


            <div>

              <span>
                Today's Appointments
              </span>


              <strong>
                {stats.total || 0}
              </strong>

            </div>

          </div>


          {/* WAITING */}

          <div className="doctor-stat-card">

            <span className="doctor-stat-icon">
              ⏳
            </span>


            <div>

              <span>
                Waiting
              </span>


              <strong>
                {stats.checkedIn || 0}
              </strong>

            </div>

          </div>


          {/* CONSULTING */}

          <div className="doctor-stat-card">

            <span className="doctor-stat-icon">
              🩺
            </span>


            <div>

              <span>
                Consulting
              </span>


              <strong>
                {stats.consulting || 0}
              </strong>

            </div>

          </div>


          {/* COMPLETED */}

          <div className="doctor-stat-card">

            <span className="doctor-stat-icon">
              ✓
            </span>


            <div>

              <span>
                Completed
              </span>


              <strong>
                {stats.completed || 0}
              </strong>

            </div>

          </div>


        </section>


        {/* =================================
            APPOINTMENT QUEUE
        ================================= */}

        <section className="doctor-dashboard-section">

          <div className="doctor-section-header">

            <div>

              <span>
                TODAY
              </span>


              <h2>
                Appointment Queue
              </h2>

            </div>


            <button
              type="button"
              className="doctor-refresh-btn"
              onClick={
                loadDashboard
              }
            >
              Refresh
            </button>

          </div>


          {appointments.length === 0 ? (

            <div className="doctor-empty-state">

              <div className="doctor-empty-icon">
                📋
              </div>


              <h3>
                No appointments today
              </h3>


              <p>
                Your patient appointments
                will appear here.
              </p>

            </div>

          ) : (

            <div className="doctor-appointments">

              {appointments.map(
                (appointment) => {

                  const isLoading =
                    actionLoading ===
                    appointment._id;


                  return (

                    <div
                      key={
                        appointment._id
                      }
                      className="doctor-appointment-card"
                    >


                      {/* =========================
                          PATIENT INFORMATION
                      ========================= */}

                      <div className="doctor-appointment-main">

                        <div className="doctor-patient-avatar">

                          {(
                            appointment.patientName ||
                            appointment.patient?.name ||
                            "P"
                          )
                            .charAt(0)
                            .toUpperCase()}

                        </div>


                        <div>

                          <strong>

                            {appointment.patientName ||
                              appointment.patient?.name ||
                              "Patient"}

                          </strong>


                          <span>

                            {appointment.patientGender ||
                              "Patient"}

                            {" • "}

                            {appointment.patientAge ??
                              "—"}{" "}
                            years

                          </span>

                        </div>

                      </div>


                      {/* =========================
                          APPOINTMENT DETAILS
                      ========================= */}

                      <div className="doctor-appointment-details">

                        <span>

                          🕐{" "}

                          {appointment.startTime}

                          {" - "}

                          {appointment.endTime}

                        </span>


                        <span>

                          🎫{" "}

                          {appointment.ticketNumber}

                        </span>


                        {appointment.reason && (

                          <span>

                            📝{" "}

                            {appointment.reason}

                          </span>

                        )}

                      </div>


                      {/* =========================
                          STATUS
                      ========================= */}

                      <div className="doctor-appointment-status">

                        <span
                          className={
                            getStatusClass(
                              appointment.status
                            )
                          }
                        >

                          {getStatusLabel(
                            appointment.status
                          )}

                        </span>

                      </div>


                      {/* =========================
                          ACTIONS
                      ========================= */}

                      <div className="doctor-appointment-actions">


                        {appointment.status ===
                          "booked" && (

                          <>

                            <button
                              type="button"
                              className="doctor-action-btn doctor-checkin-btn"
                              disabled={
                                isLoading
                              }
                              onClick={() =>
                                handleAppointmentAction(
                                  "check-in",
                                  appointment._id
                                )
                              }
                            >

                              {isLoading
                                ? "Updating..."
                                : "Check In"}

                            </button>


                            <button
                              type="button"
                              className="doctor-action-btn doctor-noshow-btn"
                              disabled={
                                isLoading
                              }
                              onClick={() =>
                                handleAppointmentAction(
                                  "no-show",
                                  appointment._id
                                )
                              }
                            >

                              No Show

                            </button>

                          </>

                        )}


                        {appointment.status ===
                          "checked-in" && (

                          <button
                            type="button"
                            className="doctor-action-btn doctor-start-btn"
                            disabled={
                              isLoading
                            }
                            onClick={() =>
                              handleAppointmentAction(
                                "start",
                                appointment._id
                              )
                            }
                          >

                            {isLoading
                              ? "Starting..."
                              : "Start Consultation"}

                          </button>

                        )}


                        {appointment.status ===
                          "consulting" && (

                          <button
                            type="button"
                            className="doctor-action-btn doctor-complete-btn"
                            disabled={
                              isLoading
                            }
                            onClick={() =>
                              handleAppointmentAction(
                                "complete",
                                appointment._id
                              )
                            }
                          >

                            {isLoading
                              ? "Completing..."
                              : "Complete"}

                          </button>

                        )}


                        {appointment.status ===
                          "completed" && (

                          <span className="doctor-completed-label">

                            Consultation completed

                          </span>

                        )}


                        {appointment.status ===
                          "cancelled" && (

                          <span className="doctor-cancelled-label">

                            Appointment cancelled

                          </span>

                        )}


                        {appointment.status ===
                          "no-show" && (

                          <span className="doctor-noshow-label">

                            Patient marked as no-show

                          </span>

                        )}

                      </div>

                    </div>

                  );

                }

              )}

            </div>

          )}

        </section>


      </div>

    </main>

  );

}


export default DoctorDashboard;