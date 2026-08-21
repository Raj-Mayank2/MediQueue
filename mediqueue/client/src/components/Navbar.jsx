import {
  Link,
  NavLink,
} from "react-router-dom";

import {
  useState,
} from "react";

import {
  useAuth,
} from "../context/AuthContext";

import "./Navbar.css";


function Navbar() {

  const {
    user,
    isAuthenticated,
    logout,
  } = useAuth();


  const [
    mobileMenuOpen,
    setMobileMenuOpen,
  ] = useState(false);


  /*
  =========================================
  CLOSE MOBILE MENU
  =========================================
  */

  const closeMobileMenu = () => {

    setMobileMenuOpen(false);

  };


  /*
  =========================================
  LOGOUT
  =========================================
  */

  const handleLogout = () => {

    logout();

    closeMobileMenu();

  };


  /*
  =========================================
  NAV LINK CLASS
  =========================================
  */

  const getNavLinkClass = ({
    isActive,
  }) => {

    return isActive
      ? "navbar-link active"
      : "navbar-link";

  };


  /*
  =========================================
  USER INITIAL
  =========================================
  */

  const userInitial =
    user?.name
      ?.charAt(0)
      ?.toUpperCase() ||
    "P";


  return (

    <header className="navbar">

      <div className="navbar-container">


        {/* =================================
            LOGO
        ================================= */}

        <Link
          to="/"
          className="navbar-logo"
          onClick={closeMobileMenu}
        >

          <div className="navbar-logo-mark">

            <span className="logo-cross-horizontal" />

            <span className="logo-cross-vertical" />

          </div>


          <div className="navbar-logo-text">

            <span className="navbar-logo-name">
              MediQueue
            </span>

            <span className="navbar-logo-tagline">
              SMART HOSPITAL CARE
            </span>

          </div>

        </Link>


        {/* =================================
            DESKTOP NAVIGATION
        ================================= */}

        <nav className="navbar-navigation">

          <NavLink
            to="/"
            className={getNavLinkClass}
          >
            Home
          </NavLink>


          <NavLink
            to="/doctors"
            className={getNavLinkClass}
          >
            Doctors
          </NavLink>


          <NavLink
            to="/about"
            className={getNavLinkClass}
          >
            About
          </NavLink>


          <NavLink
            to="/contact"
            className={getNavLinkClass}
          >
            Contact
          </NavLink>

        </nav>


        {/* =================================
            DESKTOP RIGHT SIDE
        ================================= */}

        <div className="navbar-actions">

          {isAuthenticated ? (

            <>

              {/* =============================
                  DASHBOARD
              ============================= */}

              <Link
                to="/dashboard"
                className="navbar-dashboard-link"
              >
                Dashboard
              </Link>


              {/* =============================
                  PROFILE
              ============================= */}

              <Link
                to="/profile"
                className="navbar-profile"
                aria-label="Open patient profile"
              >

                <div className="navbar-avatar">

                  {userInitial}

                </div>


                <div className="navbar-user-info">

                  <span className="navbar-user-name">

                    {user?.name ||
                      "Patient"}

                  </span>


                  <span className="navbar-user-role">

                    Patient

                  </span>

                </div>

              </Link>


              {/* =============================
                  LOGOUT
              ============================= */}

              <button
                type="button"
                className="navbar-logout"
                onClick={handleLogout}
              >
                Logout
              </button>

            </>

          ) : (

            <>

              <Link
                to="/login"
                className="navbar-login"
              >
                Login
              </Link>


              <Link
                to="/register"
                className="navbar-register"
              >
                Register
              </Link>

            </>

          )}

        </div>


        {/* =================================
            MOBILE MENU BUTTON
        ================================= */}

        <button
          type="button"
          className={
            mobileMenuOpen
              ? "navbar-menu-button open"
              : "navbar-menu-button"
          }
          onClick={() =>
            setMobileMenuOpen(
              !mobileMenuOpen
            )
          }
          aria-label="Toggle navigation"
          aria-expanded={
            mobileMenuOpen
          }
        >

          <span />
          <span />
          <span />

        </button>

      </div>


      {/* =================================
          MOBILE NAVIGATION
      ================================= */}

      <div
        className={
          mobileMenuOpen
            ? "navbar-mobile-menu open"
            : "navbar-mobile-menu"
        }
      >

        <nav className="mobile-navigation">


          {/* =============================
              MAIN LINKS
          ============================= */}

          <NavLink
            to="/"
            className={getNavLinkClass}
            onClick={closeMobileMenu}
          >
            Home
          </NavLink>


          <NavLink
            to="/doctors"
            className={getNavLinkClass}
            onClick={closeMobileMenu}
          >
            Doctors
          </NavLink>


          <NavLink
            to="/about"
            className={getNavLinkClass}
            onClick={closeMobileMenu}
          >
            About
          </NavLink>


          <NavLink
            to="/contact"
            className={getNavLinkClass}
            onClick={closeMobileMenu}
          >
            Contact
          </NavLink>


          <div className="mobile-divider" />


          {/* =============================
              AUTHENTICATED MOBILE
          ============================= */}

          {isAuthenticated ? (

            <>

              {/* PROFILE */}

              <Link
                to="/profile"
                className="mobile-user"
                onClick={closeMobileMenu}
              >

                <div className="navbar-avatar">

                  {userInitial}

                </div>


                <div>

                  <strong>

                    {user?.name ||
                      "Patient"}

                  </strong>


                  <span>
                    View patient profile
                  </span>

                </div>

              </Link>


              {/* DASHBOARD */}

              <Link
                to="/dashboard"
                className="mobile-dashboard"
                onClick={closeMobileMenu}
              >
                Dashboard
              </Link>


              {/* MY APPOINTMENTS */}

              <Link
                to="/appointments"
                className="mobile-dashboard"
                onClick={closeMobileMenu}
              >
                My appointments
              </Link>


              {/* LOGOUT */}

              <button
                type="button"
                className="mobile-logout"
                onClick={handleLogout}
              >
                Logout
              </button>

            </>

          ) : (

            /* ============================
               GUEST MOBILE
            ============================ */

            <>

              <Link
                to="/login"
                className="mobile-login"
                onClick={closeMobileMenu}
              >
                Login
              </Link>


              <Link
                to="/register"
                className="mobile-register"
                onClick={closeMobileMenu}
              >
                Create account
              </Link>

            </>

          )}

        </nav>

      </div>

    </header>

  );

}


export default Navbar;