import "./Home.css";
import DepartmentSection from "../components/DepartmentSection";
import DoctorSearch from "../components/DoctorSearch";
import FeaturedDoctors from "../components/FeaturedDoctors";
import HowItWorks from "../components/HowItWorks";
import HospitalTrust from "../components/HospitalTrust";
import BookingCTA from "../components/BookingCTA";
import Footer from "../components/Footer";
function Home() {
  return (
    <main className="home">

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">

          <div className="hero-content">

            <div className="hero-badge">
              <span className="status-dot"></span>
              Trusted healthcare, simplified
            </div>

            <h1>
              Quality healthcare
              <span> starts here.</span>
            </h1>

            <p className="hero-description">
              Book appointments with experienced doctors, choose a
              convenient time slot, and track your queue without
              waiting unnecessarily.
            </p>

            <div className="hero-actions">
              <button className="primary-hero-btn">
                Find a Doctor
                <span>→</span>
              </button>

              <button className="secondary-hero-btn">
                Explore Departments
              </button>
            </div>

            <div className="hero-trust">

              <div className="trust-item">
                <strong>50+</strong>
                <span>Specialist Doctors</span>
              </div>

              <div className="trust-divider"></div>

              <div className="trust-item">
                <strong>10+</strong>
                <span>Departments</span>
              </div>

              <div className="trust-divider"></div>

              <div className="trust-item">
                <strong>24/7</strong>
                <span>Emergency Care</span>
              </div>

            </div>

          </div>

          <div className="hero-visual">

            <div className="hero-glow"></div>

            <div className="hospital-card">

              <div className="hospital-card-header">
                <div>
                  <span className="card-label">
                    TODAY'S AVAILABILITY
                  </span>

                  <h3>Find your doctor</h3>
                </div>

                <div className="available-badge">
                  <span></span>
                  Live
                </div>
              </div>

              <div className="doctor-preview">

                <div className="doctor-avatar">
                  RS
                </div>

                <div className="doctor-info">
                  <h4>Dr. Rahul Sharma</h4>
                  <p>Cardiologist</p>

                  <div className="doctor-rating">
                    <span>★</span>
                    4.8
                    <small> · 12 years experience</small>
                  </div>
                </div>

              </div>

              <div className="availability">

                <div className="availability-header">
                  <span>Available today</span>
                  <span className="slots-count">
                    6 slots
                  </span>
                </div>

                <div className="time-slots">

                  <button>09:20</button>
                  <button>10:00</button>
                  <button className="selected">10:40</button>
                  <button>11:20</button>
                  <button>12:00</button>
                  <button>12:40</button>

                </div>

              </div>

              <button className="card-book-btn">
                Book this appointment
                <span>→</span>
              </button>

            </div>

            <div className="queue-floating-card">

              <div className="queue-icon">
                #
              </div>

              <div>
                <span>YOUR QUEUE</span>
                <strong>A-027</strong>
              </div>

              <div className="queue-status">
                <small>2 ahead</small>
                <span>~20 min</span>
              </div>

            </div>

          </div>

        </div>
      </section>
      <DoctorSearch/>
      <DepartmentSection/>
      <FeaturedDoctors/>
      <HowItWorks/>
      {/* Hospital trust */}
      <HospitalTrust />

      {/* Final CTA */}
      <BookingCTA />

      {/* Footer */}
      <Footer />

    </main>
  );
}

export default Home;