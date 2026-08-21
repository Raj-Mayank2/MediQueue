import {
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import "./Contact.css";


function Contact() {

  const [
    formData,
    setFormData,
  ] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });


  const [
    submitted,
    setSubmitted,
  ] = useState(false);


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

    setSubmitted(false);

  };


  const handleSubmit = (event) => {

    event.preventDefault();

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

  };


  return (

    <main className="contact-page">


      {/* =========================================
          HERO
      ========================================= */}

      <section className="contact-hero">

        <div className="contact-container">

          <div className="contact-hero-content">

            <span className="contact-eyebrow">
              CONTACT MEDIQUEUE
            </span>


            <h1>

              We're here to
              <span> help.</span>

            </h1>


            <p>

              Have a question about appointments,
              your account or MediQueue? Send us a
              message and our team will get back to
              you.

            </p>


            <div className="contact-quick-links">

              <a
                href="mailto:support@mediqueue.com"
                className="contact-quick-link"
              >

                <span className="contact-quick-icon">
                  @
                </span>

                <div>

                  <small>
                    EMAIL US
                  </small>

                  <strong>
                    support@mediqueue.com
                  </strong>

                </div>

              </a>


              <div className="contact-quick-link">

                <span className="contact-quick-icon">
                  ◷
                </span>

                <div>

                  <small>
                    SUPPORT HOURS
                  </small>

                  <strong>
                    Mon — Fri · 9 AM — 6 PM
                  </strong>

                </div>

              </div>

            </div>

          </div>


          {/* HERO VISUAL */}

          <div className="contact-hero-visual">

            <div className="contact-circle circle-one" />

            <div className="contact-circle circle-two" />


            <div className="contact-message-card">

              <div className="contact-message-header">

                <div className="contact-message-avatar">
                  M
                </div>

                <div>

                  <strong>
                    MediQueue Support
                  </strong>

                  <span>
                    Usually replies quickly
                  </span>

                </div>

                <span className="contact-online-dot" />

              </div>


              <div className="contact-chat">

                <div className="contact-bubble received">

                  Hi! How can we help you today?

                </div>


                <div className="contact-bubble sent">

                  I need help with my appointment.

                </div>


                <div className="contact-bubble received">

                  Of course. We're happy to help.

                </div>

              </div>


              <div className="contact-message-input">

                <span>
                  Write a message...
                </span>

                <button type="button">
                  →
                </button>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          CONTACT OPTIONS
      ========================================= */}

      <section className="contact-options">

        <div className="contact-container">

          <div className="contact-section-heading">

            <span className="contact-section-eyebrow">
              GET IN TOUCH
            </span>

            <h2>
              Choose the way that works
              <span> for you.</span>
            </h2>

          </div>


          <div className="contact-options-grid">


            <div className="contact-option-card">

              <div className="contact-option-icon">
                @
              </div>

              <span>
                EMAIL
              </span>

              <h3>
                Send us an email
              </h3>

              <p>
                For general questions, account
                support and appointment assistance.
              </p>

              <a href="mailto:support@mediqueue.com">
                support@mediqueue.com
                <span>→</span>
              </a>

            </div>


            <div className="contact-option-card">

              <div className="contact-option-icon">
                ?
              </div>

              <span>
                SUPPORT
              </span>

              <h3>
                Need assistance?
              </h3>

              <p>
                Tell us what you're experiencing
                and we'll help you find a solution.
              </p>

              <a href="#contact-form">
                Contact support
                <span>→</span>
              </a>

            </div>


            <div className="contact-option-card">

              <div className="contact-option-icon">
                +
              </div>

              <span>
                APPOINTMENTS
              </span>

              <h3>
                Looking for a doctor?
              </h3>

              <p>
                Browse available doctors and
                book your next appointment.
              </p>

              <Link to="/doctors">
                Find a doctor
                <span>→</span>
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          CONTACT FORM
      ========================================= */}

      <section
        className="contact-form-section"
        id="contact-form"
      >

        <div className="contact-container">

          <div className="contact-form-layout">


            {/* FORM INTRO */}

            <div className="contact-form-intro">

              <span className="contact-section-eyebrow">
                SEND A MESSAGE
              </span>


              <h2>
                Tell us
                <span> what's on your mind.</span>
              </h2>


              <p>
                Fill out the form and provide as
                much detail as possible. This helps
                our team understand your request
                and respond faster.
              </p>


              <div className="contact-form-note">

                <span>
                  ✓
                </span>

                <div>

                  <strong>
                    Your message matters
                  </strong>

                  <p>
                    We aim to respond to support
                    requests as quickly as possible.
                  </p>

                </div>

              </div>

            </div>


            {/* FORM */}

            <div className="contact-form-card">

              {submitted && (

                <div className="contact-success">

                  <div className="contact-success-icon">
                    ✓
                  </div>

                  <div>

                    <strong>
                      Message received
                    </strong>

                    <p>
                      Thanks for reaching out.
                      We'll get back to you soon.
                    </p>

                  </div>

                </div>

              )}


              <form
                onSubmit={handleSubmit}
                className="contact-form"
              >


                <div className="contact-form-row">

                  <div className="contact-field">

                    <label htmlFor="contact-name">
                      Full name
                    </label>

                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      autoComplete="name"
                      required
                    />

                  </div>


                  <div className="contact-field">

                    <label htmlFor="contact-email">
                      Email address
                    </label>

                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                    />

                  </div>

                </div>


                <div className="contact-field">

                  <label htmlFor="contact-subject">
                    Subject
                  </label>

                  <select
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >

                    <option value="">
                      Select a topic
                    </option>

                    <option value="appointment">
                      Appointment help
                    </option>

                    <option value="account">
                      Account support
                    </option>

                    <option value="doctor">
                      Doctor related question
                    </option>

                    <option value="technical">
                      Technical issue
                    </option>

                    <option value="feedback">
                      Feedback
                    </option>

                    <option value="other">
                      Other
                    </option>

                  </select>

                </div>


                <div className="contact-field">

                  <label htmlFor="contact-message">
                    Message
                  </label>

                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help..."
                    rows="6"
                    required
                  />

                </div>


                <button
                  type="submit"
                  className="contact-submit"
                >

                  Send message

                  <span>
                    →
                  </span>

                </button>


                <p className="contact-form-disclaimer">
                  Please don't include sensitive
                  medical information in this form.
                </p>

              </form>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          FAQ
      ========================================= */}

      <section className="contact-faq">

        <div className="contact-container">

          <div className="contact-section-heading centered">

            <span className="contact-section-eyebrow">
              QUICK ANSWERS
            </span>

            <h2>
              Frequently asked
              <span> questions.</span>
            </h2>

          </div>


          <div className="contact-faq-grid">


            <div className="contact-faq-item">

              <div>
                01
              </div>

              <h3>
                How do I book an appointment?
              </h3>

              <p>
                Go to the Doctors page, choose a
                doctor and select an available
                appointment slot.
              </p>

            </div>


            <div className="contact-faq-item">

              <div>
                02
              </div>

              <h3>
                Can I cancel my appointment?
              </h3>

              <p>
                Yes. Your appointments can be
                managed from your patient dashboard.
              </p>

            </div>


            <div className="contact-faq-item">

              <div>
                03
              </div>

              <h3>
                Where can I find my ticket?
              </h3>

              <p>
                After booking, your appointment
                ticket is available in your
                appointment details.
              </p>

            </div>


            <div className="contact-faq-item">

              <div>
                04
              </div>

              <h3>
                How can I contact support?
              </h3>

              <p>
                Use the contact form above or email
                our support team directly.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          FINAL CTA
      ========================================= */}

      <section className="contact-cta">

        <div className="contact-container">

          <div className="contact-cta-box">

            <div>

              <span className="contact-section-eyebrow">
                NEED A DOCTOR?
              </span>

              <h2>
                Your next appointment
                is just a few clicks away.
              </h2>

            </div>


            <Link
              to="/doctors"
              className="contact-cta-button"
            >
              Browse doctors
              <span>→</span>
            </Link>

          </div>

        </div>

      </section>

    </main>

  );

}


export default Contact;