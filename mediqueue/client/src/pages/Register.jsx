import {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useAuth,
} from "../context/AuthContext";

import "./Auth.css";


function Register() {

  const navigate =
    useNavigate();


  const {
    register,
  } = useAuth();


  const [
    formData,
    setFormData,
  ] = useState({

    name: "",

    email: "",

    phone: "",

    password: "",

    confirmPassword: "",

  });


  const [
    error,
    setError,
  ] = useState("");


  const [
    loading,
    setLoading,
  ] = useState(false);


  /*
  =========================================
  HANDLE INPUT
  =========================================
  */

  const handleChange =
    (event) => {

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


      setError("");

    };


  /*
  =========================================
  REGISTER
  =========================================
  */

  const handleSubmit =
    async (event) => {

      event.preventDefault();


      setError("");


      if (
        formData.password !==
        formData.confirmPassword
      ) {

        setError(
          "Passwords do not match."
        );

        return;

      }


      setLoading(true);


      try {

        await register(
          formData
        );


        navigate(
          "/dashboard",
          {
            replace: true,
          }
        );


      } catch (error) {

        setError(
          error.message ||
            "Unable to create account."
        );

      } finally {

        setLoading(false);

      }

    };


  return (

    <main className="auth-page">

      <div className="auth-container">


        {/* =================================
            LEFT SIDE
        ================================= */}

        <section className="auth-info">

          <div className="auth-brand">

            <div className="auth-logo">
              M
            </div>

            <span>
              MediQueue
            </span>

          </div>


          <div className="auth-info-content">

            <span className="auth-eyebrow">
              JOIN MEDIQUEUE
            </span>


            <h1>
              Your healthcare,
              <span>
                {" "}all in one place.
              </span>
            </h1>


            <p>

              Create your patient account
              to book appointments,
              manage tickets and keep
              track of your hospital visits.

            </p>

          </div>


          <div className="auth-info-footer">

            <span>
              ✓ Simple · Secure · Convenient
            </span>

          </div>

        </section>


        {/* =================================
            REGISTER FORM
        ================================= */}

        <section className="auth-card">

          <div className="auth-card-header">

            <span className="auth-card-label">
              PATIENT REGISTRATION
            </span>


            <h2>
              Create your account
            </h2>


            <p>
              It only takes a minute to
              get started.
            </p>

          </div>


          {error && (

            <div className="auth-error">

              <span>!</span>

              <p>
                {error}
              </p>

            </div>

          )}


          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >


            {/* NAME */}

            <div className="form-field">

              <label htmlFor="name">
                Full name
              </label>


              <input
                id="name"
                name="name"
                type="text"
                value={
                  formData.name
                }
                onChange={
                  handleChange
                }
                placeholder="Enter your full name"
                autoComplete="name"
                required
              />

            </div>


            {/* EMAIL */}

            <div className="form-field">

              <label htmlFor="email">
                Email address
              </label>


              <input
                id="email"
                name="email"
                type="email"
                value={
                  formData.email
                }
                onChange={
                  handleChange
                }
                placeholder="you@example.com"
                autoComplete="email"
                required
              />

            </div>


            {/* PHONE */}

            <div className="form-field">

              <label htmlFor="phone">
                Phone number
              </label>


              <input
                id="phone"
                name="phone"
                type="tel"
                value={
                  formData.phone
                }
                onChange={
                  handleChange
                }
                placeholder="9876543210"
                autoComplete="tel"
                required
              />

            </div>


            {/* PASSWORD ROW */}

            <div className="auth-form-grid">


              <div className="form-field">

                <label htmlFor="password">
                  Password
                </label>


                <input
                  id="password"
                  name="password"
                  type="password"
                  value={
                    formData.password
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Minimum 6 characters"
                  autoComplete="new-password"
                  required
                />

              </div>


              <div className="form-field">

                <label htmlFor="confirmPassword">
                  Confirm password
                </label>


                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={
                    formData.confirmPassword
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Repeat password"
                  autoComplete="new-password"
                  required
                />

              </div>


            </div>


            {/* SUBMIT */}

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >

              {loading
                ? "Creating account..."
                : "Create account"}

            </button>

          </form>


          <div className="auth-divider">

            <span>
              Already have an account?
            </span>

          </div>


          <Link
            to="/login"
            className="auth-secondary-btn"
          >
            Sign in instead
          </Link>


        </section>

      </div>

    </main>

  );

}


export default Register;