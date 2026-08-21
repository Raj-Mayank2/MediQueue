import { Link } from "react-router-dom";
import "./HowItWorks.css";

const steps = [
  {
    number: "01",
    title: "Find your doctor",
    description:
      "Choose a department and find a specialist based on your needs.",
  },
  {
    number: "02",
    title: "Choose your slot",
    description:
      "Select a convenient date and available appointment time.",
  },
  {
    number: "03",
    title: "Get your ticket",
    description:
      "Receive a unique digital ticket instantly after booking.",
  },
  {
    number: "04",
    title: "Track your queue",
    description:
      "Know exactly where you are in the queue and when to arrive.",
  },
];

function HowItWorks() {
  return (
    <section className="how-it-works">

      <div className="how-container">

        {/* Section heading */}

        <div className="how-heading">

          <div>
            <span className="section-label">
              HOW IT WORKS
            </span>

            <h2>
              From booking to
              <span> consultation.</span>
            </h2>
          </div>

          <p>
            A simpler way to manage your hospital visit.
            Book ahead, get your ticket and spend less time
            waiting.
          </p>

        </div>


        {/* Steps */}

        <div className="steps-grid">

          {steps.map((step) => (
            <div
              className="step-card"
              key={step.number}
            >

              <span className="step-number">
                {step.number}
              </span>

              <div className="step-line"></div>

              <h3>{step.title}</h3>

              <p>{step.description}</p>

            </div>
          ))}

        </div>


        {/* Queue feature */}

        <div className="queue-section">

          <div className="queue-content">

            <span className="section-label">
              SMART QUEUE
            </span>

            <h2>
              Know when it's
              <span> your turn.</span>
            </h2>

            <p>
              No more sitting in the waiting room wondering
              when you'll be called. Track your position and
              estimated waiting time in real time.
            </p>

            <Link
              to="/register"
              className="queue-cta"
            >
              Start your journey
              <span>→</span>
            </Link>

          </div>


          {/* Queue UI */}

          <div className="queue-dashboard">

            <div className="queue-dashboard-header">

              <div>
                <span>LIVE QUEUE</span>
                <strong>Cardiology · Room 204</strong>
              </div>

              <div className="queue-live">
                <span></span>
                LIVE
              </div>

            </div>


            <div className="queue-main">

              <div className="current-patient">

                <span>NOW SERVING</span>

                <strong>A-024</strong>

                <small>
                  Dr. Rahul Sharma
                </small>

              </div>


              <div className="queue-divider"></div>


              <div className="your-patient">

                <span>YOUR TICKET</span>

                <strong>A-027</strong>

                <div className="queue-progress">

                  <div className="progress-track">
                    <div className="progress-fill"></div>
                  </div>

                  <span>
                    2 patients ahead
                  </span>

                </div>

              </div>

            </div>


            <div className="queue-estimate">

              <div>
                <span>ESTIMATED WAIT</span>
                <strong>~20 minutes</strong>
              </div>

              <div className="queue-arrival">
                <span>ARRIVE BY</span>
                <strong>10:35 AM</strong>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default HowItWorks;