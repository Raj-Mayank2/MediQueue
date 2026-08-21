import { Link } from "react-router-dom";
import doctors from "../data/doctors";
import "./FeaturedDoctors.css";

function FeaturedDoctors() {
    return (
        <section className="featured-doctors">
            <div className="featured-doctors-container">

                <div className="doctors-heading">

                    <div>
                        <span className="section-label">
                            OUR MEDICAL TEAM
                        </span>

                        <h2>
                            Meet our
                            <span> specialists.</span>
                        </h2>
                    </div>

                    <Link
                        to="/doctors"
                        className="view-all-link"
                    >
                        View all doctors
                        <span>→</span>
                    </Link>

                </div>

                <div className="doctors-grid">

                    {doctors.map((doctor) => (
                        <article
                            className="doctor-card"
                            key={doctor.id}
                        >

                            <div className="doctor-card-top">

                                <div className="doctor-large-avatar">
                                    {doctor.initials}
                                </div>

                                <div className="doctor-rating-badge">
                                    <span>★</span>
                                    {doctor.rating}
                                </div>

                            </div>

                            <div className="doctor-card-info">

                                <h3>{doctor.name}</h3>

                                <p className="doctor-specialty">
                                    {doctor.specialty}
                                </p>

                                <div className="doctor-meta">
                                    <span>
                                        {doctor.experience} years experience
                                    </span>

                                    <span className="meta-dot">•</span>

                                    <span>
                                        {doctor.reviews} reviews
                                    </span>
                                </div>

                            </div>

                            <div className="doctor-availability">

                                <div>
                                    <span className="availability-label">
                                        {doctor.availability}
                                    </span>

                                    <strong>
                                        Next slot: {doctor.nextSlot}
                                    </strong>
                                </div>

                                <span className="doctor-fee">
                                    ₹{doctor.fee}
                                </span>

                            </div>

                            <div className="doctor-card-actions">

                                <Link
                                    to={`/doctors/${doctor.id}`}
                                    className="profile-btn"
                                >
                                    View Profile
                                </Link>

                                <Link
                                    to={`/doctors/${doctor.id}/book`}
                                    className="book-btn"
                                >
                                    Book
                                </Link>

                            </div>

                        </article>
                    ))}

                </div>

            </div>
        </section>
    );
}

export default FeaturedDoctors;