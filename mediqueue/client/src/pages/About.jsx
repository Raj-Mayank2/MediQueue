import {
  Link,
} from "react-router-dom";

import "./About.css";


function About() {

  return (

    <main className="about-page">


      {/* =========================================
          HERO
      ========================================= */}

      <section className="about-hero">

        <div className="about-container">

          <div className="about-hero-content">

            <span className="about-eyebrow">
              ABOUT MEDIQUEUE
            </span>


            <h1>

              Healthcare should feel
              <span> simple.</span>

            </h1>


            <p>

              MediQueue is a smart hospital
              appointment platform designed to
              make booking, managing and
              attending healthcare appointments
              easier for everyone.

            </p>


            <div className="about-hero-actions">

              <Link
                to="/doctors"
                className="about-primary-btn"
              >
                Find a doctor
              </Link>


              <Link
                to="/contact"
                className="about-secondary-btn"
              >
                Talk to us
              </Link>

            </div>

          </div>


          {/* VISUAL */}

          <div className="about-hero-visual">

            <div className="about-orbit orbit-one" />
            <div className="about-orbit orbit-two" />


            <div className="about-medical-card">

              <div className="about-card-top">

                <div className="about-card-icon">
                  +
                </div>

                <span>
                  MediQueue
                </span>

              </div>


              <div className="about-card-body">

                <span>
                  TODAY'S QUEUE
                </span>

                <strong>
                  08
                </strong>

                <small>
                  patients waiting
                </small>

              </div>


              <div className="about-card-progress">

                <span />

              </div>


              <div className="about-card-footer">

                <span>
                  ● Queue active
                </span>

                <span>
                  Live
                </span>

              </div>

            </div>


            <div className="about-floating-card about-floating-top">

              <span className="floating-icon">
                ✓
              </span>

              <div>

                <strong>
                  Appointment confirmed
                </strong>

                <small>
                  Your visit is scheduled
                </small>

              </div>

            </div>


            <div className="about-floating-card about-floating-bottom">

              <span className="floating-icon clock">
                ◷
              </span>

              <div>

                <strong>
                  Less waiting
                </strong>

                <small>
                  Smarter queue management
                </small>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          TRUST STRIP
      ========================================= */}

      <section className="about-trust">

        <div className="about-container">

          <div className="about-trust-item">

            <strong>
              01
            </strong>

            <span>
              Simple booking
            </span>

          </div>


          <div className="about-trust-divider" />


          <div className="about-trust-item">

            <strong>
              02
            </strong>

            <span>
              Smart queue management
            </span>

          </div>


          <div className="about-trust-divider" />


          <div className="about-trust-item">

            <strong>
              03
            </strong>

            <span>
              Connected healthcare
            </span>

          </div>


          <div className="about-trust-divider" />


          <div className="about-trust-item">

            <strong>
              04
            </strong>

            <span>
              Better patient experience
            </span>

          </div>

        </div>

      </section>


      {/* =========================================
          MISSION
      ========================================= */}

      <section className="about-mission">

        <div className="about-container about-mission-grid">

          <div>

            <span className="about-section-eyebrow">
              OUR MISSION
            </span>


            <h2>

              Making every hospital
              visit more organized.

            </h2>

          </div>


          <div className="about-mission-text">

            <p>

              Healthcare appointments can often
              involve long waits, confusing schedules
              and disconnected information.

            </p>


            <p>

              MediQueue brings these experiences
              together in one simple platform —
              helping patients find doctors, book
              appointments and keep track of their
              hospital visits.

            </p>


            <p>

              At the same time, doctors get a clearer
              view of their daily appointment queue,
              helping them manage their time and
              patients more efficiently.

            </p>

          </div>

        </div>

      </section>


      {/* =========================================
          HOW IT WORKS
      ========================================= */}

      <section className="about-how">

        <div className="about-container">

          <div className="about-section-heading">

            <span className="about-section-eyebrow">
              HOW IT WORKS
            </span>


            <h2>
              From booking to consultation,
              <span> without the confusion.</span>
            </h2>


            <p>
              MediQueue keeps the entire
              appointment journey organized.
            </p>

          </div>


          <div className="about-steps">


            <div className="about-step">

              <div className="about-step-number">
                01
              </div>

              <div className="about-step-icon">
                ◉
              </div>

              <h3>
                Find your doctor
              </h3>

              <p>
                Browse doctors by specialty
                and discover the right healthcare
                professional for your needs.
              </p>

            </div>


            <div className="about-step-line" />


            <div className="about-step">

              <div className="about-step-number">
                02
              </div>

              <div className="about-step-icon">
                +
              </div>

              <h3>
                Book an appointment
              </h3>

              <p>
                Choose an available date and
                time and receive your appointment
                ticket instantly.
              </p>

            </div>


            <div className="about-step-line" />


            <div className="about-step">

              <div className="about-step-number">
                03
              </div>

              <div className="about-step-icon">
                ◷
              </div>

              <h3>
                Follow your queue
              </h3>

              <p>
                Keep your appointment details
                organized and know where you
                are in the hospital journey.
              </p>

            </div>


            <div className="about-step-line" />


            <div className="about-step">

              <div className="about-step-number">
                04
              </div>

              <div className="about-step-icon">
                ✓
              </div>

              <h3>
                Meet your doctor
              </h3>

              <p>
                Arrive prepared and let your
                doctor manage the consultation
                queue efficiently.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          FOR PATIENTS / DOCTORS
      ========================================= */}

      <section className="about-audience">

        <div className="about-container">

          <div className="about-audience-grid">


            {/* PATIENT */}

            <div className="about-audience-card">

              <div className="audience-card-icon">
                ♡
              </div>


              <span className="about-section-eyebrow">
                FOR PATIENTS
              </span>


              <h2>
                Healthcare on your terms.
              </h2>


              <p>
                Find trusted doctors, book visits
                and keep your appointment
                information organized in one place.
              </p>


              <ul>

                <li>
                  <span>✓</span>
                  Easy doctor discovery
                </li>

                <li>
                  <span>✓</span>
                  Simple appointment booking
                </li>

                <li>
                  <span>✓</span>
                  Digital appointment tickets
                </li>

                <li>
                  <span>✓</span>
                  Appointment history
                </li>

              </ul>

            </div>


            {/* DOCTOR */}

            <div className="about-audience-card doctor-card">

              <div className="audience-card-icon">
                +
              </div>


              <span className="about-section-eyebrow">
                FOR DOCTORS
              </span>


              <h2>
                A clearer view of your day.
              </h2>


              <p>
                Manage your daily queue and
                patient appointments from a
                dedicated doctor dashboard.
              </p>


              <ul>

                <li>
                  <span>✓</span>
                  Daily appointment queue
                </li>

                <li>
                  <span>✓</span>
                  Patient check-in management
                </li>

                <li>
                  <span>✓</span>
                  Consultation status tracking
                </li>

                <li>
                  <span>✓</span>
                  Completed visit tracking
                </li>

              </ul>

            </div>


          </div>

        </div>

      </section>


      {/* =========================================
          VALUES
      ========================================= */}

      <section className="about-values">

        <div className="about-container">

          <div className="about-section-heading centered">

            <span className="about-section-eyebrow">
              WHAT WE VALUE
            </span>


            <h2>
              Designed around people,
              <span> not paperwork.</span>
            </h2>

          </div>


          <div className="about-values-grid">


            <div className="about-value">

              <div>
                01
              </div>

              <h3>
                Simplicity
              </h3>

              <p>
                Healthcare technology should
                make things easier, not more
                complicated.
              </p>

            </div>


            <div className="about-value">

              <div>
                02
              </div>

              <h3>
                Transparency
              </h3>

              <p>
                Patients should always have a
                clear understanding of their
                appointments and visits.
              </p>

            </div>


            <div className="about-value">

              <div>
                03
              </div>

              <h3>
                Efficiency
              </h3>

              <p>
                Better organization helps
                healthcare professionals spend
                more time where it matters.
              </p>

            </div>


            <div className="about-value">

              <div>
                04
              </div>

              <h3>
                Trust
              </h3>

              <p>
                Every interaction should feel
                reliable, professional and secure.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          CTA
      ========================================= */}

      <section className="about-cta">

        <div className="about-container">

          <div className="about-cta-box">

            <div>

              <span className="about-section-eyebrow">
                GET STARTED
              </span>


              <h2>
                Ready to make your next
                hospital visit simpler?
              </h2>


              <p>
                Find a doctor and book your
                appointment with MediQueue.
              </p>

            </div>


            <Link
              to="/doctors"
              className="about-cta-btn"
            >
              Find a doctor
              <span>→</span>
            </Link>

          </div>

        </div>

      </section>

    </main>

  );

}


export default About;