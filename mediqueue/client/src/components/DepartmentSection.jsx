import { Link } from "react-router-dom";
import "./DepartmentSection.css";

const departments = [
  {
    id: 1,
    name: "Cardiology",
    description: "Heart and cardiovascular care",
    doctors: 6,
    icon: "♥",
  },
  {
    id: 2,
    name: "Neurology",
    description: "Brain and nervous system care",
    doctors: 4,
    icon: "✦",
  },
  {
    id: 3,
    name: "Orthopedics",
    description: "Bones, joints and mobility",
    doctors: 5,
    icon: "◇",
  },
  {
    id: 4,
    name: "Dermatology",
    description: "Skin, hair and nail care",
    doctors: 4,
    icon: "◉",
  },
  {
    id: 5,
    name: "General Medicine",
    description: "Complete primary healthcare",
    doctors: 8,
    icon: "+",
  },
  {
    id: 6,
    name: "Ophthalmology",
    description: "Eye and vision care",
    doctors: 3,
    icon: "◌",
  },
];

function DepartmentSection() {
  return (
    <section className="department-section">
      <div className="department-container">

        <div className="department-heading">

          <div>
            <span className="section-label">
              OUR SPECIALITIES
            </span>

            <h2>
              Care for every
              <span> health need.</span>
            </h2>
          </div>

          <Link
            to="/departments"
            className="view-all-link"
          >
            View all departments
            <span>→</span>
          </Link>

        </div>

        <div className="department-grid">

          {departments.map((department) => (
            <Link
              to={`/departments/${department.id}`}
              className="department-card"
              key={department.id}
            >

              <div className="department-card-top">

                <div className="department-icon">
                  {department.icon}
                </div>

                <span className="department-arrow">
                  ↗
                </span>

              </div>

              <div className="department-card-content">

                <h3>{department.name}</h3>

                <p>{department.description}</p>

                <span className="doctor-count">
                  {department.doctors} specialists
                </span>

              </div>

            </Link>
          ))}

        </div>

      </div>
    </section>
  );
}

export default DepartmentSection;