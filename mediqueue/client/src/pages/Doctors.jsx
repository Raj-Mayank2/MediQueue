import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getDoctors } from "../api/doctorApi";

import "./Doctors.css";


function Doctors() {

  const [doctors, setDoctors] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  useEffect(() => {

    const fetchDoctors = async () => {

      try {

        setLoading(true);

        const data =
          await getDoctors();

        setDoctors(data);

      } catch (error) {

        console.error(
          error
        );

        setError(
          "Unable to load doctors. Please try again."
        );

      } finally {

        setLoading(false);

      }

    };


    fetchDoctors();

  }, []);


  /* =========================
     LOADING
  ========================= */

  if (loading) {

    return (
      <main className="doctors-page">

        <div className="doctors-container">

          <div className="doctors-loading">

            <div className="loading-spinner"></div>

            <p>
              Loading doctors...
            </p>

          </div>

        </div>

      </main>
    );

  }


  /* =========================
     ERROR
  ========================= */

  if (error) {

    return (
      <main className="doctors-page">

        <div className="doctors-container">

          <div className="doctors-error">

            <div className="error-symbol">
              !
            </div>

            <h2>
              Something went wrong
            </h2>

            <p>
              {error}
            </p>

            <button
              onClick={() =>
                window.location.reload()
              }
            >
              Try again
            </button>

          </div>

        </div>

      </main>
    );

  }


  return (
    <main className="doctors-page">

      <div className="doctors-container">


        {/* =========================
            HEADER
        ========================= */}

        <section className="doctors-header">

          <div>

            <span className="section-label">
              OUR MEDICAL TEAM
            </span>

            <h1>
              Find the right
              <span> doctor.</span>
            </h1>

            <p>
              Meet our experienced specialists
              dedicated to providing exceptional
              patient care.
            </p>

          </div>


          <div className="doctor-count">

            <strong>
              {doctors.length}
            </strong>

            <span>
              Specialists
            </span>

          </div>

        </section>


        {/* =========================
            DOCTORS GRID
        ========================= */}

        {doctors.length === 0 ? (

          <div className="no-doctors">
            No doctors are currently available.
          </div>

        ) : (

          <section className="doctors-grid">

            {doctors.map((doctor) => (

              <article
                className="doctor-card"
                key={doctor._id}
              >

                {/* Avatar */}

                <div className="doctor-card-top">

                  <div className="doctor-avatar">

                    {doctor.initials}

                  </div>


                  <div className="doctor-status">

                    <span></span>

                    {doctor.status === "active"
                      ? "Available"
                      : "Unavailable"}

                  </div>

                </div>


                {/* Information */}

                <div className="doctor-card-content">

                  <span className="doctor-department">

                    {doctor.department?.name ||
                      doctor.specialty}

                  </span>


                  <h2>
                    {doctor.name}
                  </h2>


                  <p className="doctor-specialty">

                    {doctor.specialty}

                  </p>


                  <p className="doctor-qualification">

                    {doctor.qualification}

                  </p>


                  {/* Stats */}

                  <div className="doctor-card-stats">

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
                        {doctor.experience}
                      </strong>

                      <span>
                        Years Exp.
                      </span>

                    </div>


                    <div>

                      <strong>
                        ₹{doctor.consultationFee}
                      </strong>

                      <span>
                        Consultation
                      </span>

                    </div>

                  </div>


                  {/* Footer */}

                  <div className="doctor-card-footer">

                    <Link
                      to={`/doctors/${doctor._id}`}
                      className="view-doctor-btn"
                    >
                      View profile
                      <span>→</span>
                    </Link>

                  </div>

                </div>

              </article>

            ))}

          </section>

        )}

      </div>

    </main>
  );
}


export default Doctors;