import { useState } from "react";
import "./DoctorSearch.css";

const departments = [
  "All Departments",
  "Cardiology",
  "Dermatology",
  "Neurology",
  "Orthopedics",
  "General Medicine",
  "Ophthalmology",
];

const doctors = [
  {
    id: 1,
    name: "Dr. Rahul Sharma",
    department: "Cardiology",
  },
  {
    id: 2,
    name: "Dr. Priya Singh",
    department: "Dermatology",
  },
  {
    id: 3,
    name: "Dr. Amit Kumar",
    department: "Neurology",
  },
  {
    id: 4,
    name: "Dr. Neha Verma",
    department: "Orthopedics",
  },
];

function DoctorSearch() {
  const [department, setDepartment] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");

  const filteredDoctors = doctors.filter((item) => {
    if (!department || department === "All Departments") {
      return true;
    }

    return item.department === department;
  });

  const handleSearch = (event) => {
    event.preventDefault();

    console.log({
      department,
      doctor,
      date,
    });
  };

  return (
    <section className="doctor-search-section">
      <div className="doctor-search-container">

        <div className="search-heading">
          <div>
            <span className="section-label">
              FIND YOUR CARE
            </span>

            <h2>
              Find the right doctor
              <span> for you.</span>
            </h2>
          </div>

          <p>
            Choose a department, doctor and preferred date
            to find available appointment slots.
          </p>
        </div>

        <form
          className="doctor-search-card"
          onSubmit={handleSearch}
        >

          {/* Department */}

          <div className="search-field">

            <label htmlFor="department">
              Department
            </label>

            <div className="select-wrapper">
              <span className="field-icon">⌘</span>

              <select
                id="department"
                value={department}
                onChange={(event) => {
                  setDepartment(event.target.value);
                  setDoctor("");
                }}
              >
                <option value="">
                  Select department
                </option>

                {departments.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <span className="select-arrow">
                ▾
              </span>
            </div>

          </div>

          <div className="field-divider"></div>

          {/* Doctor */}

          <div className="search-field">

            <label htmlFor="doctor">
              Doctor
            </label>

            <div className="select-wrapper">
              <span className="field-icon">
                ♙
              </span>

              <select
                id="doctor"
                value={doctor}
                onChange={(event) =>
                  setDoctor(event.target.value)
                }
                disabled={!department}
              >
                <option value="">
                  {department
                    ? "Select doctor"
                    : "Choose department first"}
                </option>

                {filteredDoctors.map((item) => (
                  <option
                    key={item.id}
                    value={item.id}
                  >
                    {item.name}
                  </option>
                ))}
              </select>

              <span className="select-arrow">
                ▾
              </span>
            </div>

          </div>

          <div className="field-divider"></div>

          {/* Date */}

          <div className="search-field">

            <label htmlFor="date">
              Appointment date
            </label>

            <div className="select-wrapper">

              <span className="field-icon">
                ▣
              </span>

              <input
                id="date"
                type="date"
                value={date}
                onChange={(event) =>
                  setDate(event.target.value)
                }
              />

            </div>

          </div>

          <button
            type="submit"
            className="search-doctor-btn"
          >
            Find Slots
            <span>→</span>
          </button>

        </form>

        <div className="search-info">

          <div className="info-item">
            <span className="info-check">✓</span>
            Real-time availability
          </div>

          <div className="info-item">
            <span className="info-check">✓</span>
            Instant appointment confirmation
          </div>

          <div className="info-item">
            <span className="info-check">✓</span>
            Digital queue ticket
          </div>

        </div>

      </div>
    </section>
  );
}

export default DoctorSearch;