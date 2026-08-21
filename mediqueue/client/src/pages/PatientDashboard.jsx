import {
    Link,
} from "react-router-dom";

import {
    useAuth,
} from "../context/AuthContext";

import {
    useEffect,
    useState,
} from "react";

import {
    getMyAppointments,
    cancelAppointment,
} from "../api/appointmentApi";

import "./PatientDashboard.css";


function PatientDashboard() {

    const {
        user,
    } = useAuth();


    /*
    =========================================
    APPOINTMENTS
    =========================================
    */

    const [
        appointments,
        setAppointments,
    ] = useState([]);


    /*
    =========================================
    STATS
    =========================================
    */

    const [
        stats,
        setStats,
    ] = useState({

        upcoming: 0,

        active: 0,

        completed: 0,

    });


    /*
    =========================================
    LOADING
    =========================================
    */

    const [
        loading,
        setLoading,
    ] = useState(true);


    /*
    =========================================
    ERROR
    =========================================
    */

    const [
        error,
        setError,
    ] = useState("");


    /*
    =========================================
    CANCELLING
    =========================================
    */

    const [
        cancellingId,
        setCancellingId,
    ] = useState(null);


    /*
    =========================================
    LOAD APPOINTMENTS
    =========================================
    */

    const loadAppointments =
        async () => {

            try {

                setLoading(true);

                setError("");


                const result =
                    await getMyAppointments();


                const appointmentData =
                    result?.data?.appointments ||
                    [];


                const statsData =
                    result?.data?.stats ||
                    {};


                setAppointments(
                    appointmentData
                );


                setStats({

                    upcoming:
                        statsData.upcoming || 0,

                    active:
                        statsData.active || 0,

                    completed:
                        statsData.completed || 0,

                });


            } catch (error) {

                console.error(
                    "Failed to load appointments:",
                    error
                );


                setError(
                    error.message ||
                    "Unable to load appointments."
                );

            } finally {

                setLoading(false);

            }

        };


    /*
    =========================================
    LOAD ON PAGE OPEN
    =========================================
    */

    useEffect(() => {

        loadAppointments();

    }, []);


    /*
    =========================================
    CANCEL APPOINTMENT
    =========================================
    */

    const handleCancel =
        async (
            appointmentId
        ) => {

            const confirmed =
                window.confirm(
                    "Are you sure you want to cancel this appointment?"
                );


            if (!confirmed) {

                return;

            }


            try {

                setCancellingId(
                    appointmentId
                );


                await cancelAppointment(
                    appointmentId
                );


                await loadAppointments();


            } catch (error) {

                console.error(
                    "Cancel appointment error:",
                    error
                );


                window.alert(
                    error.message ||
                    "Failed to cancel appointment."
                );

            } finally {

                setCancellingId(null);

            }

        };


    /*
    =========================================
    FORMAT DATE
    =========================================
    */

    const formatDate =
        (date) => {

            if (!date) {

                return "";

            }


            const [
                year,
                month,
                day,
            ] = date.split("-");


            const parsedDate =
                new Date(
                    Number(year),
                    Number(month) - 1,
                    Number(day)
                );


            return parsedDate.toLocaleDateString(
                "en-IN",
                {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                }
            );

        };


    /*
    =========================================
    GET STATUS CLASS
    =========================================
    */

    const getStatusClass =
        (status) => {

            return `appointment-status ${status}`;

        };


    /*
    =========================================
    GET DOCTOR NAME
    =========================================
    */

    const getDoctorName =
        (appointment) => {

            return (
                appointment?.doctor?.name ||
                "Doctor"
            );

        };


    /*
    =========================================
    GET DOCTOR SPECIALTY
    =========================================
    */

    const getDoctorSpecialty =
        (appointment) => {

            return (
                appointment?.doctor?.specialty ||
                "Medical Specialist"
            );

        };


    /*
    =========================================
    RENDER
    =========================================
    */

    return (

        <main className="patient-dashboard">

            <div className="dashboard-container">


                {/* =================================
                    HEADER
                ================================= */}

                <section className="dashboard-header">

                    <div>

                        <span className="dashboard-eyebrow">
                            PATIENT PORTAL
                        </span>


                        <h1>

                            Welcome back,

                            {" "}

                            <span>
                                {user?.name || "Patient"}
                            </span>

                        </h1>


                        <p>
                            Manage your appointments
                            and hospital visits from
                            one place.
                        </p>

                    </div>


                    <Link
                        to="/doctors"
                        className="dashboard-book-btn"
                    >
                        Book appointment
                    </Link>

                </section>


                {/* =================================
                    ERROR
                ================================= */}

                {error && (

                    <div className="dashboard-error">

                        <span>
                            !
                        </span>

                        <p>
                            {error}
                        </p>

                        <button
                            type="button"
                            onClick={
                                loadAppointments
                            }
                        >
                            Retry
                        </button>

                    </div>

                )}


                {/* =================================
                    QUICK STATS
                ================================= */}

                <section className="dashboard-stats">


                    {/* UPCOMING */}

                    <div className="dashboard-stat-card">

                        <div className="stat-icon">
                            📅
                        </div>


                        <div>

                            <span>
                                Upcoming
                            </span>


                            <strong>

                                {loading
                                    ? "—"
                                    : stats.upcoming}

                            </strong>


                            <small>
                                appointments
                            </small>

                        </div>

                    </div>


                    {/* ACTIVE */}

                    <div className="dashboard-stat-card">

                        <div className="stat-icon">
                            🎫
                        </div>


                        <div>

                            <span>
                                Active
                            </span>


                            <strong>

                                {loading
                                    ? "—"
                                    : stats.active}

                            </strong>


                            <small>
                                tickets
                            </small>

                        </div>

                    </div>


                    {/* COMPLETED */}

                    <div className="dashboard-stat-card">

                        <div className="stat-icon">
                            ✓
                        </div>


                        <div>

                            <span>
                                Completed
                            </span>


                            <strong>

                                {loading
                                    ? "—"
                                    : stats.completed}

                            </strong>


                            <small>
                                visits
                            </small>

                        </div>

                    </div>


                </section>


                {/* =================================
                    APPOINTMENTS
                ================================= */}

                <section className="dashboard-section">

                    <div className="section-heading">

                        <div>

                            <span>
                                YOUR APPOINTMENTS
                            </span>


                            <h2>
                                Upcoming visits
                            </h2>

                        </div>

                    </div>


                    {/* LOADING */}

                    {loading ? (

                        <div className="appointments-loading">

                            <div className="dashboard-spinner" />

                            <p>
                                Loading your appointments...
                            </p>

                        </div>

                    ) : appointments.length === 0 ? (

                        /* EMPTY */

                        <div className="empty-appointments">

                            <div className="empty-icon">
                                📅
                            </div>


                            <h3>
                                No appointments yet
                            </h3>


                            <p>
                                Book an appointment with
                                one of our doctors to see
                                it here.
                            </p>


                            <Link
                                to="/doctors"
                                className="empty-book-btn"
                            >
                                Find a doctor
                            </Link>

                        </div>

                    ) : (

                        /* APPOINTMENT LIST */

                        <div className="appointments-list">

                            {appointments.map(
                                (appointment) => (

                                    <article
                                        key={
                                            appointment._id
                                        }
                                        className="appointment-card"
                                    >


                                        {/* TOP */}

                                        <div className="appointment-card-top">

                                            <div className="doctor-summary">

                                                <div className="doctor-avatar">

                                                    {getDoctorName(
                                                        appointment
                                                    )
                                                        ?.charAt(0)
                                                        ?.toUpperCase() || "D"}

                                                </div>


                                                <div>

                                                    <h3>

                                                        Dr.{" "}

                                                        {getDoctorName(
                                                            appointment
                                                        )
                                                            .replace(
                                                                /^Dr\.\s*/i,
                                                                ""
                                                            )}

                                                    </h3>


                                                    <p>
                                                        {getDoctorSpecialty(
                                                            appointment
                                                        )}
                                                    </p>

                                                </div>

                                            </div>


                                            <span
                                                className={
                                                    getStatusClass(
                                                        appointment.status
                                                    )
                                                }
                                            >
                                                {appointment.status}
                                            </span>

                                        </div>


                                        {/* DETAILS */}

                                        <div className="appointment-details">


                                            <div className="appointment-detail">

                                                <span className="detail-label">
                                                    DATE
                                                </span>


                                                <strong>
                                                    {formatDate(
                                                        appointment.date
                                                    )}
                                                </strong>

                                            </div>


                                            <div className="appointment-detail">

                                                <span className="detail-label">
                                                    TIME
                                                </span>


                                                <strong>

                                                    {appointment.startTime}

                                                    {" — "}

                                                    {appointment.endTime}

                                                </strong>

                                            </div>


                                            <div className="appointment-detail">

                                                <span className="detail-label">
                                                    TICKET
                                                </span>


                                                <strong className="ticket-number">
                                                    {appointment.ticketNumber}
                                                </strong>

                                            </div>

                                        </div>


                                        {/* FOOTER */}

                                        <div className="appointment-card-footer">


                                            <div className="appointment-reason">

                                                <span>
                                                    Reason
                                                </span>


                                                <p>
                                                    {appointment.reason ||
                                                        "General consultation"}
                                                </p>

                                            </div>


                                            <div className="appointment-actions">

                                                <Link
                                                    to={`/appointment-confirmation?ticket=${encodeURIComponent(
                                                        appointment.ticketNumber
                                                    )}`}
                                                    className="view-ticket-btn"
                                                >
                                                    View ticket
                                                </Link>


                                                {[
                                                    "booked",
                                                ].includes(
                                                    appointment.status
                                                ) && (

                                                    <button
                                                        type="button"
                                                        className="cancel-appointment-btn"
                                                        disabled={
                                                            cancellingId ===
                                                            appointment._id
                                                        }
                                                        onClick={() =>
                                                            handleCancel(
                                                                appointment._id
                                                            )
                                                        }
                                                    >

                                                        {cancellingId ===
                                                        appointment._id
                                                            ? "Cancelling..."
                                                            : "Cancel"}

                                                    </button>

                                                )}

                                            </div>

                                        </div>

                                    </article>

                                )
                            )}

                        </div>

                    )}

                </section>


                {/* =================================
                    QUICK ACTIONS
                ================================= */}

                <section className="dashboard-section">

                    <div className="section-heading">

                        <div>

                            <span>
                                QUICK ACTIONS
                            </span>


                            <h2>
                                What would you like to do?
                            </h2>

                        </div>

                    </div>


                    <div className="dashboard-actions">


                        {/* FIND DOCTOR */}

                        <Link
                            to="/doctors"
                            className="dashboard-action"
                        >

                            <div className="action-icon">
                                🩺
                            </div>


                            <div>

                                <h3>
                                    Find a doctor
                                </h3>


                                <p>
                                    Browse available doctors
                                    and their schedules.
                                </p>

                            </div>


                            <span className="action-arrow">
                                →
                            </span>

                        </Link>


                        {/* MY APPOINTMENTS */}

                        <Link
                            to="/appointments"
                            className="dashboard-action"
                        >

                            <div className="action-icon">
                                🎫
                            </div>


                            <div>

                                <h3>
                                    My appointments
                                </h3>


                                <p>
                                    View your bookings,
                                    tickets and visit history.
                                </p>

                            </div>


                            <span className="action-arrow">
                                →
                            </span>

                        </Link>


                    </div>

                </section>


            </div>

        </main>

    );

}


export default PatientDashboard;