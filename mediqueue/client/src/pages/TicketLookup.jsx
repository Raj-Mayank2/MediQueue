import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  getAppointmentByTicket,
} from "../api/appointmentApi";

import "./TicketLookup.css";


function TicketLookup() {

  const navigate =
    useNavigate();


  const [
    ticketNumber,
    setTicketNumber,
  ] = useState("");


  const [
    loading,
    setLoading,
  ] = useState(false);


  const [
    error,
    setError,
  ] = useState("");


  const handleSubmit =
    async (event) => {

      event.preventDefault();

      setError("");


      const ticket =
        ticketNumber
          .trim()
          .toUpperCase();


      if (!ticket) {

        setError(
          "Please enter your ticket number."
        );

        return;

      }


      try {

        setLoading(true);


        const result =
          await getAppointmentByTicket(
            ticket
          );


        navigate(
          "/appointment-confirmation",
          {
            state: {
              appointment:
                result.data,
            },
          }
        );


      } catch (error) {

        console.error(
          "Ticket lookup error:",
          error
        );


        setError(
          error.message ||
            "Unable to find appointment."
        );


      } finally {

        setLoading(false);

      }

    };


  return (

    <main className="ticket-lookup-page">

      <div className="ticket-lookup-container">


        {/* Header */}

        <section className="ticket-lookup-header">

          <div className="ticket-search-icon">
            ✓
          </div>


          <span className="section-label">
            APPOINTMENT LOOKUP
          </span>


          <h1>

            Find your
            <span>
              {" "}appointment.
            </span>

          </h1>


          <p>

            Enter the unique ticket number
            you received after booking your
            appointment.

          </p>

        </section>


        {/* Form */}

        <section className="ticket-lookup-card">

          <form
            onSubmit={
              handleSubmit
            }
          >

            <label htmlFor="ticketNumber">

              Ticket number

            </label>


            <input
              id="ticketNumber"
              type="text"
              placeholder="MQ-20260820-4798C1"
              value={
                ticketNumber
              }
              onChange={(event) =>
                setTicketNumber(
                  event.target.value
                    .toUpperCase()
                )
              }
              autoComplete="off"
              spellCheck="false"
            />


            {error && (

              <div className="ticket-lookup-error">

                <span>
                  !
                </span>

                <p>
                  {error}
                </p>

              </div>

            )}


            <button
              type="submit"
              disabled={loading}
            >

              {loading
                ? "Finding appointment..."
                : "Find appointment"}

              {!loading && (
                <span>
                  →
                </span>
              )}

            </button>

          </form>


          <div className="ticket-lookup-help">

            <strong>
              Where can I find my ticket number?
            </strong>

            <p>

              Your ticket number is shown on
              the appointment confirmation
              page after a successful booking.

            </p>

          </div>

        </section>


        {/* Back */}

        <Link
          to="/doctors"
          className="ticket-back-link"
        >

          ← Book a new appointment

        </Link>


      </div>

    </main>

  );

}


export default TicketLookup;