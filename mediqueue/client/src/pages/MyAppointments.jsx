import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import {
    getMyAppointments,
    cancelAppointment,
} from "../api/appointmentApi";

import "./MyAppointments.css";


function MyAppointments() {

    const [
        appointments,
        setAppointments,
    ] = useState([]);


    const [
        loading,
        setLoading,
    ] = useState(true);


    const [
        error,
        setError,
    ] = useState("");


    const [
        activeFilter,
        setActiveFilter,
    ] = useState("all");


    const [
        cancellingId,
        setCancellingId,
    ] = useState(null);


    /*
    =========================================
    LOAD APPOINTMENTS
    =========================================
    */

    const loadAppointments = async () => {

        try {

            setLoading(true);

            setError("");


            const result =
                await getMyAppointments();


            setAppointments(
                result?.data?.appointments || []
            );


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
    FORMAT DATE
    =========================================
    */

    const formatDate = (date) => {

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
                weekday: "short",
                day: "numeric",
                month: "short",
                year: "numeric",
            }
        );

    };


    /*
    =========================================
    FILTER
    =========================================
    */

    const filteredAppointments =
        appointments.filter(
            (appointment) => {

                if (
                    activeFilter === "all"
                ) {

                    return true;

                }


                if (
                    activeFilter === "upcoming"
                ) {

                    return [
                        "booked",
                        "checked-in",
                        "consulting",
                    ].includes(
                        appointment.status
                    );

                }


                if (
                    activeFilter === "completed"
                ) {

                    return (
                        appointment.status ===
                        "completed"
                    );

                }


                if (
                    activeFilter === "cancelled"
                ) {

                    return (
                        appointment.status ===
                        "cancelled"
                    );

                }


                return true;

            }
        );


    /*
    =========================================
    CANCEL
    =========================================
    */

    const handleCancel =
        async (appointmentId) => {

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
    STATUS CLASS
    =========================================
    */

    const getStatusClass =
        (status) => {

            return `appointment-status ${status}`;

        };


    /*
    =========================================
    RENDER
    =========================================
    */

    return (

        <main className="my-appointments-page">

            <div className="my-appointments-container">


                {/* =================================
                    HEADER
                ================================= */}

                <section className="appointments-page-header">

                    <div>

                        <span className="appointments-eyebrow">
                            PATIENT PORTAL
                        </span>


                        <h1>
                            My appointments
                        </h1>


                        <p>
                            View and manage all your
                            hospital appointments.
                        </p>

                    </div>


                    <Link
                        to="/doctors"
                        className="appointments-book-btn"
                    >
                        + Book appointment
                    </Link>

                </section>


                {/* =================================
                    FILTERS
                ================================= */}

                <div className="appointment-filters">

                    <button
                        type="button"
                        className={
                            activeFilter === "all"
                                ? "filter-btn active"
                                : "filter-btn"
                        }
                        onClick={() =>
                            setActiveFilter("all")
                        }
                    >
                        All
                    </button>


                    <button
                        type="button"
                        className={
                            activeFilter === "upcoming"
                                ? "filter-btn active"
                                : "filter-btn"
                        }
                        onClick={() =>
                            setActiveFilter("upcoming")
                        }
                    >
                        Upcoming
                    </button>


                    <button
                        type="button"
                        className={
                            activeFilter === "completed"
                                ? "filter-btn active"
                                : "filter-btn"
                        }
                        onClick={() =>
                            setActiveFilter("completed")
                        }
                    >
                        Completed
                    </button>


                    <button
                        type="button"
                        className={
                            activeFilter === "cancelled"
                                ? "filter-btn active"
                                : "filter-btn"
                        }
                        onClick={() =>
                            setActiveFilter("cancelled")
                        }
                    >
                        Cancelled
                    </button>

                </div>


                {/* =================================
                    ERROR
                ================================= */}

                {error && (

                    <div className="appointments-error">

                        <span>!</span>

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
                    LOADING
                ================================= */}

                {loading ? (

                    <div className="appointments-page-loading">

                        <div className="appointments-spinner" />

                        <p>
                            Loading appointments...
                        </p>

                    </div>

                ) : filteredAppointments.length === 0 ? (

                    /* =================================
                       EMPTY
                    ================================= */

                    <div className="appointments-empty">

                        <div className="appointments-empty-icon">
                            📅
                        </div>


                        <h2>
                            No appointments found
                        </h2>


                        <p>

                            {activeFilter === "all"
                                ? "You haven't booked any appointments yet."
                                : `You don't have any ${activeFilter} appointments.`}

                        </p>


                        <Link
                            to="/doctors"
                            className="appointments-empty-btn"
                        >
                            Find a doctor
                        </Link>

                    </div>

                ) : (

                    /* =================================
                       APPOINTMENTS
                    ================================= */

                    <div className="my-appointments-list">

                        {filteredAppointments.map(
                            (appointment) => {

                                const doctorName =
                                    appointment
                                        ?.doctor
                                        ?.name ||
                                    "Doctor";


                                const specialty =
                                    appointment
                                        ?.doctor
                                        ?.specialty ||
                                    "Medical Specialist";


                                return (

                                    <article
                                        key={
                                            appointment._id
                                        }
                                        className="my-appointment-card"
                                    >


                                        {/* TOP */}

                                        <div className="my-appointment-top">

                                            <div className="my-doctor">

                                                <div className="my-doctor-avatar">

                                                    {doctorName
                                                        .charAt(0)
                                                        .toUpperCase()}

                                                </div>


                                                <div>

                                                    <h2>
                                                        {doctorName}
                                                    </h2>


                                                    <p>
                                                        {specialty}
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

                                        <div className="my-appointment-details">


                                            <div>

                                                <span>
                                                    DATE
                                                </span>

                                                <strong>
                                                    {formatDate(
                                                        appointment.date
                                                    )}
                                                </strong>

                                            </div>


                                            <div>

                                                <span>
                                                    TIME
                                                </span>

                                                <strong>
                                                    {appointment.startTime}
                                                    {" — "}
                                                    {appointment.endTime}
                                                </strong>

                                            </div>


                                            <div>

                                                <span>
                                                    TICKET
                                                </span>

                                                <strong className="my-ticket">
                                                    {
                                                        appointment.ticketNumber
                                                    }
                                                </strong>

                                            </div>

                                        </div>


                                        {/* FOOTER */}

                                        <div className="my-appointment-footer">

                                            <div className="my-appointment-reason">

                                                <span>
                                                    REASON
                                                </span>

                                                <p>
                                                    {appointment.reason ||
                                                        "General consultation"}
                                                </p>

                                            </div>


                                            <div className="my-appointment-actions">

                                                <Link
                                                    to={`/appointment-confirmation?ticket=${encodeURIComponent(
                                                        appointment.ticketNumber
                                                    )}`}
                                                    className="my-view-ticket"
                                                >
                                                    View ticket
                                                </Link>


                                                {appointment.status ===
                                                    "booked" && (

                                                    <button
                                                        type="button"
                                                        className="my-cancel-btn"
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

                                );

                            }
                        )}

                    </div>

                )}

            </div>

        </main>

    );

}


export default MyAppointments;