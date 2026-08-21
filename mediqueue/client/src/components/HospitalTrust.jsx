import "./HospitalTrust.css";

const stats = [
  {
    value: "50+",
    label: "Specialist doctors",
  },
  {
    value: "10+",
    label: "Medical departments",
  },
  {
    value: "25K+",
    label: "Patients served",
  },
  {
    value: "15+",
    label: "Years of care",
  },
];

const features = [
  {
    number: "01",
    title: "Experienced specialists",
    description:
      "Our medical team combines years of clinical experience with patient-focused care.",
  },
  {
    number: "02",
    title: "Modern facilities",
    description:
      "Advanced medical infrastructure designed to make diagnosis and treatment easier.",
  },
  {
    number: "03",
    title: "Patient-first approach",
    description:
      "From booking to consultation, every part of your hospital journey is designed around you.",
  },
];

function HospitalTrust() {
  return (
    <section className="hospital-trust">

      <div className="trust-container">

        <div className="trust-header">

          <div>
            <span className="section-label">
              WHY CHOOSE US
            </span>

            <h2>
              Healthcare you can
              <span> rely on.</span>
            </h2>
          </div>

          <p>
            We combine experienced medical professionals,
            modern facilities and a smarter appointment
            experience to make healthcare simpler.
          </p>

        </div>

        <div className="trust-stats">

          {stats.map((stat) => (
            <div className="trust-stat" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}

        </div>

        <div className="trust-features">

          {features.map((feature) => (
            <div
              className="trust-feature"
              key={feature.number}
            >

              <span className="feature-number">
                {feature.number}
              </span>

              <div>
                <h3>{feature.title}</h3>

                <p>{feature.description}</p>
              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default HospitalTrust;