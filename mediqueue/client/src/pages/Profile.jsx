import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useAuth,
} from "../context/AuthContext";

import {
  getProfile,
  updateProfile,
} from "../api/userApi";

import "./Profile.css";


function Profile() {

  const {
    user,
    updateUser,
  } = useAuth();


  const navigate =
    useNavigate();


  /*
  =========================================
  FORM DATA
  =========================================
  */

  const [
    formData,
    setFormData,
  ] = useState({

    name: "",

    email: "",

    phone: "",

    age: "",

    gender: "",

  });


  /*
  =========================================
  LOADING
  =========================================
  */

  const [
    loading,
    setLoading,
  ] = useState(true);


  /*
  =========================================
  SAVING
  =========================================
  */

  const [
    saving,
    setSaving,
  ] = useState(false);


  /*
  =========================================
  SUCCESS MESSAGE
  =========================================
  */

  const [
    message,
    setMessage,
  ] = useState("");


  /*
  =========================================
  ERROR MESSAGE
  =========================================
  */

  const [
    error,
    setError,
  ] = useState("");


  /*
  =========================================
  LOAD PROFILE
  =========================================
  */

  useEffect(() => {

    const loadProfile =
      async () => {

        try {

          const result =
            await getProfile();


          const profile =
            result?.data?.user;


          if (!profile) {

            throw new Error(
              "Profile information could not be loaded."
            );

          }


          setFormData({

            name:
              profile.name || "",

            email:
              profile.email || "",

            phone:
              profile.phone || "",

            age:
              profile.age ?? "",

            gender:
              profile.gender || "",

          });

        } catch (error) {

          console.error(
            "Profile loading error:",
            error
          );


          if (
            error.status === 401
          ) {

            navigate(
              "/login"
            );

            return;

          }


          setError(
            error.message ||
            "Failed to load profile."
          );

        } finally {

          setLoading(false);

        }

      };


    loadProfile();

  }, [navigate]);


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

          [name]:
            value,

        })
      );


      setMessage("");

      setError("");

    };


  /*
  =========================================
  SAVE PROFILE
  =========================================
  */

  const handleSubmit =
    async (event) => {

      event.preventDefault();


      setSaving(true);

      setMessage("");

      setError("");


      try {

        const result =
          await updateProfile({

            name:
              formData.name,

            phone:
              formData.phone,

            age:
              formData.age,

            gender:
              formData.gender,

          });


        /*
        =====================================
        UPDATED USER
        =====================================
        */

        const updatedUser =
          result?.data?.user;


        /*
        =====================================
        UPDATE AUTH CONTEXT
        =====================================

        This is important.

        It updates the user stored inside
        AuthContext so the Navbar immediately
        displays the new name.

        It also updates localStorage through
        updateUser().
        =====================================
        */

        if (updatedUser) {

          updateUser(
            updatedUser
          );


          /*
          ===================================
          UPDATE FORM
          ===================================
          */

          setFormData({

            name:
              updatedUser.name || "",

            email:
              updatedUser.email || "",

            phone:
              updatedUser.phone || "",

            age:
              updatedUser.age ?? "",

            gender:
              updatedUser.gender || "",

          });

        }


        /*
        =====================================
        SUCCESS MESSAGE
        =====================================
        */

        setMessage(
          "Your profile has been updated successfully."
        );


      } catch (error) {

        console.error(
          "Profile update error:",
          error
        );


        if (
          error.status === 401
        ) {

          navigate(
            "/login"
          );

          return;

        }


        setError(
          error.message ||
          "Failed to update profile."
        );

      } finally {

        setSaving(false);

      }

    };


  /*
  =========================================
  LOADING
  =========================================
  */

  if (loading) {

    return (

      <main className="profile-page">

        <div className="profile-loading">

          <div className="profile-spinner" />

          <p>
            Loading your profile...
          </p>

        </div>

      </main>

    );

  }


  /*
  =========================================
  RENDER
  =========================================
  */

  return (

    <main className="profile-page">

      <div className="profile-container">


        {/* =================================
            HEADER
        ================================= */}

        <section className="profile-header">

          <div>

            <span className="profile-eyebrow">
              PATIENT PROFILE
            </span>


            <h1>
              Your profile
            </h1>


            <p>
              Keep your personal information
              up to date for faster appointments.
            </p>

          </div>


          <Link
            to="/dashboard"
            className="profile-back"
          >
            ← Dashboard
          </Link>

        </section>


        {/* =================================
            PROFILE CARD
        ================================= */}

        <section className="profile-card">


          {/* =================================
              PROFILE INTRO
          ================================= */}

          <div className="profile-intro">

            <div className="profile-avatar">

              {(
                formData.name ||
                user?.name ||
                "P"
              )
                .charAt(0)
                .toUpperCase()}

            </div>


            <div>

              <h2>

                {formData.name ||
                  "Patient"}

              </h2>


              <p>
                Patient account
              </p>

            </div>

          </div>


          {/* =================================
              FORM
          ================================= */}

          <form
            className="profile-form"
            onSubmit={
              handleSubmit
            }
          >

            <div className="profile-form-heading">

              <span>
                PERSONAL INFORMATION
              </span>

              <h3>
                Basic details
              </h3>

            </div>


            {/* =================================
                NAME
            ================================= */}

            <div className="profile-form-group">

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
                placeholder="Your full name"
                minLength="2"
                maxLength="100"
                required
              />

            </div>


            {/* =================================
                EMAIL
            ================================= */}

            <div className="profile-form-group">

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
                disabled
              />


              <small>
                Email is linked to your
                account and cannot be changed here.
              </small>

            </div>


            {/* =================================
                PHONE
            ================================= */}

            <div className="profile-form-group">

              <label htmlFor="phone">
                Phone number
              </label>


              <input
                id="phone"
                name="phone"
                type="tel"
                maxLength="10"
                value={
                  formData.phone
                }
                onChange={
                  handleChange
                }
                placeholder="10-digit mobile number"
              />

            </div>


            {/* =================================
                AGE + GENDER
            ================================= */}

            <div className="profile-form-row">


              <div className="profile-form-group">

                <label htmlFor="age">
                  Age
                </label>


                <input
                  id="age"
                  name="age"
                  type="number"
                  min="0"
                  max="120"
                  value={
                    formData.age
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Your age"
                />

              </div>


              <div className="profile-form-group">

                <label htmlFor="gender">
                  Gender
                </label>


                <select
                  id="gender"
                  name="gender"
                  value={
                    formData.gender
                  }
                  onChange={
                    handleChange
                  }
                >

                  <option value="">
                    Select gender
                  </option>

                  <option value="Male">
                    Male
                  </option>

                  <option value="Female">
                    Female
                  </option>

                  <option value="Other">
                    Other
                  </option>

                </select>

              </div>

            </div>


            {/* =================================
                ERROR
            ================================= */}

            {error && (

              <div className="profile-message error">

                <span>
                  !
                </span>

                {error}

              </div>

            )}


            {/* =================================
                SUCCESS
            ================================= */}

            {message && (

              <div className="profile-message success">

                <span>
                  ✓
                </span>

                {message}

              </div>

            )}


            {/* =================================
                ACTIONS
            ================================= */}

            <div className="profile-actions">

              <button
                type="submit"
                disabled={saving}
                className="profile-save-btn"
              >

                {saving
                  ? "Saving..."
                  : "Save changes"}

              </button>


              <Link
                to="/dashboard"
                className="profile-cancel-btn"
              >
                Cancel
              </Link>

            </div>

          </form>

        </section>

      </div>

    </main>

  );

}


export default Profile;