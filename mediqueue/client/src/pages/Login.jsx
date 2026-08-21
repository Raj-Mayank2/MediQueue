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


function Login() {

  const navigate =
    useNavigate();


  const {
    login,
  } = useAuth();


  const [
    formData,
    setFormData,
  ] = useState({

    email: "",

    password: "",

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
  LOGIN
  =========================================
  */

  const handleSubmit =
    async (event) => {

      event.preventDefault();


      setError("");

      setLoading(true);


      try {

        /*
        =====================================
        LOGIN USER
        =====================================
        */

        const result =
          await login(
            formData.email,
            formData.password
          );


        /*
        =====================================
        GET LOGGED-IN USER
        =====================================
        */

        const loggedInUser =
          result?.data?.user;


        /*
        =====================================
        ROLE-BASED REDIRECT
        =====================================
        */

        if (
          loggedInUser?.role ===
          "doctor"
        ) {

          navigate(
            "/doctor-dashboard",
            {
              replace: true,
            }
          );

        } else {

          navigate(
            "/dashboard",
            {
              replace: true,
            }
          );

        }


      } catch (error) {

        setError(
          error.message ||
            "Unable to login."
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
              YOUR HEALTH, SIMPLIFIED
            </span>


            <h1>

              Healthcare that

              <span>
                {" "}fits your schedule.
              </span>

            </h1>


            <p>

              Book appointments with
              trusted doctors, manage
              your visits and keep your
              hospital tickets in one place.

            </p>

          </div>


          <div className="auth-info-footer">

            <span>
              ✓ Trusted hospital
              appointment platform
            </span>

          </div>

        </section>


        {/* =================================
            LOGIN FORM
        ================================= */}

        <section className="auth-card">

          <div className="auth-card-header">

            <span className="auth-card-label">
              WELCOME BACK
            </span>


            <h2>
              Sign in to your account
            </h2>


            <p>
              Access your appointments
              and manage your visits.
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


            {/* PASSWORD */}

            <div className="form-field">

              <div className="field-label-row">

                <label htmlFor="password">
                  Password
                </label>

              </div>


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
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />

            </div>


            {/* SUBMIT */}

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >

              {loading
                ? "Signing in..."
                : "Sign in"}

            </button>

          </form>


          <div className="auth-divider">

            <span>
              Don't have an account?
            </span>

          </div>


          <Link
            to="/register"
            className="auth-secondary-btn"
          >
            Create patient account
          </Link>


        </section>

      </div>

    </main>

  );

}


export default Login;