import {
    Link,
    useSearchParams,
} from "react-router-dom";

import {
    useEffect,
    useState,
} from "react";

import {
    QRCodeSVG,
} from "qrcode.react";

import {
    getAppointmentByTicket,
} from "../api/appointmentApi";

import "./AppointmentConfirmation.css";


function AppointmentConfirmation() {

    const [
        searchParams,
    ] = useSearchParams();


    const ticketNumber =
        searchParams.get(
            "ticket"
        );


    const [
        appointment,
        setAppointment,
    ] = useState(null);


    const [
        loading,
        setLoading,
    ] = useState(true);


    const [
        error,
        setError,
    ] = useState("");


    /*
    =========================================
    LOAD APPOINTMENT
    =========================================
    */

    useEffect(() => {

        const loadAppointment =
            async () => {

                if (!ticketNumber) {

                    setError(
                        "No ticket number was provided."
                    );

                    setLoading(false);

                    return;

                }


                try {

                    setLoading(true);

                    setError("");


                    const result =
                        await getAppointmentByTicket(
                            ticketNumber
                        );


                    setAppointment(
                        result?.data ||
                        result?.appointment ||
                        null
                    );


                } catch (error) {

                    console.error(
                        "Failed to load appointment:",
                        error
                    );


                    setError(
                        error.message ||
                        "Unable to load appointment."
                    );

                } finally {

                    setLoading(false);

                }

            };


        loadAppointment();

    }, [ticketNumber]);


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
    FORMAT STATUS
    =========================================
    */

    const formatStatus =
        (status) => {

            if (!status) {
                return "BOOKED";
            }


            return status
                .replace(
                    "-",
                    " "
                )
                .toUpperCase();

        };


    /*
    =========================================
    PRINT
    =========================================
    */

    const handlePrint =
        () => {

            window.print();

        };


    /*
    =========================================
    LOADING
    =========================================
    */

    if (loading) {

        return (

            <main className="confirmation-page">

                <div className="confirmation-loading">

                    <div className="confirmation-spinner" />

                    <p>
                        Loading your appointment...
                    </p>

                </div>

            </main>

        );

    }


    /*
    =========================================
    ERROR
    =========================================
    */

    if (error || !appointment) {

        return (

            <main className="confirmation-page">

                <div className="confirmation-error">

                    <div className="confirmation-error-icon">
                        !
                    </div>


                    <h1>
                        Appointment not found
                    </h1>


                    <p>
                        {error ||
                            "We couldn't find this appointment."}
                    </p>


                    <div className="confirmation-error-actions">

                        <Link
                            to="/appointments"
                            className="confirmation-primary-btn"
                        >
                            My appointments
                        </Link>


                        <Link
                            to="/doctors"
                            className="confirmation-secondary-btn"
                        >
                            Find a doctor
                        </Link>

                    </div>

                </div>

            </main>

        );

    }


    /*
    =========================================
    DOCTOR
    =========================================
    */

    const doctorName =
        appointment?.doctor?.name ||
        "Doctor";


    const doctorSpecialty =
        appointment?.doctor?.specialty ||
        "Medical Specialist";


    /*
    =========================================
    QR DATA
    =========================================
    */

    const qrValue =
        JSON.stringify({

            ticketNumber:
                appointment.ticketNumber,

            date:
                appointment.date,

            startTime:
                appointment.startTime,

            doctor:
                doctorName,

        });


    /*
    =========================================
    RENDER
    =========================================
    */

    return (

        <main className="confirmation-page">

            <div className="confirmation-container">


                {/* =================================
                    SUCCESS HEADER
                ================================= */}

                <div className="confirmation-success">

                    <div className="success-icon">
                        ✓
                    </div>


                    <span>
                        APPOINTMENT CONFIRMED
                    </span>


                    <h1>
                        Your appointment is booked
                    </h1>


                    <p>
                        Please keep your ticket number
                        safe for your hospital visit.
                    </p>

                </div>


                {/* =================================
                    TICKET
                ================================= */}

                <article
                    className="appointment-ticket"
                    id="appointment-ticket"
                >


                    {/* TICKET HEADER */}

                    <div className="ticket-header">

                        <div className="ticket-brand">

                            <div className="ticket-logo">

                                <span className="ticket-cross-horizontal" />

                                <span className="ticket-cross-vertical" />

                            </div>


                            <div>

                                <strong>
                                    MediQueue
                                </strong>

                                <span>
                                    SMART HOSPITAL CARE
                                </span>

                            </div>

                        </div>


                        <div className="ticket-status">

                            <span className="ticket-status-dot" />

                            {formatStatus(
                                appointment.status
                            )}

                        </div>

                    </div>


                    {/* TICKET NUMBER */}

                    <div className="ticket-number-section">

                        <span>
                            YOUR TICKET NUMBER
                        </span>


                        <strong>
                            {appointment.ticketNumber}
                        </strong>


                        <p>
                            Present this ticket at
                            the hospital reception.
                        </p>

                    </div>


                    <div className="ticket-divider" />


                    {/* DOCTOR */}

                    <div className="ticket-doctor">

                        <div className="ticket-doctor-avatar">

                            {doctorName
                                .charAt(0)
                                .toUpperCase()}

                        </div>


                        <div>

                            <span>
                                DOCTOR
                            </span>


                            <h2>
                                {doctorName}
                            </h2>


                            <p>
                                {doctorSpecialty}
                            </p>

                        </div>

                    </div>


                    {/* DETAILS */}

                    <div className="ticket-details">


                        <div className="ticket-detail">

                            <span>
                                DATE
                            </span>

                            <strong>
                                {formatDate(
                                    appointment.date
                                )}
                            </strong>

                        </div>


                        <div className="ticket-detail">

                            <span>
                                TIME
                            </span>

                            <strong>
                                {appointment.startTime}
                                {" — "}
                                {appointment.endTime}
                            </strong>

                        </div>


                        <div className="ticket-detail">

                            <span>
                                PATIENT
                            </span>

                            <strong>
                                {appointment.patientName}
                            </strong>

                        </div>


                        <div className="ticket-detail">

                            <span>
                                PHONE
                            </span>

                            <strong>
                                {appointment.patientPhone}
                            </strong>

                        </div>


                        <div className="ticket-detail ticket-detail-full">

                            <span>
                                REASON FOR VISIT
                            </span>

                            <strong>
                                {appointment.reason ||
                                    "General consultation"}
                            </strong>

                        </div>

                    </div>


                    <div className="ticket-divider" />


                    {/* QR */}

                    <div className="ticket-qr-section">

                        <div className="ticket-qr">

                            <QRCodeSVG
                                value={qrValue}
                                size={130}
                                level="M"
                            />

                        </div>


                        <div className="ticket-qr-text">

                            <strong>
                                Scan to verify
                            </strong>


                            <p>
                                Hospital staff can scan
                                this QR code to verify
                                your appointment.
                            </p>

                        </div>

                    </div>


                    {/* FOOTER */}

                    <div className="ticket-footer">

                        <span>
                            Please arrive 10–15 minutes
                            before your appointment.
                        </span>

                    </div>

                </article>


                {/* =================================
                    ACTIONS
                ================================= */}

                <div className="confirmation-actions">

                    <button
                        type="button"
                        className="print-ticket-btn"
                        onClick={handlePrint}
                    >
                        Print ticket
                    </button>


                    <Link
                        to="/appointments"
                        className="confirmation-secondary-btn"
                    >
                        My appointments
                    </Link>

                </div>


                <Link
                    to="/doctors"
                    className="confirmation-back"
                >
                    ← Book another appointment
                </Link>

            </div>

        </main>

    );

}


export default AppointmentConfirmation;