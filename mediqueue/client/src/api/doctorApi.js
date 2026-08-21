const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";


/*
=========================================
GET DOCTORS
=========================================
*/

export const getDoctors =
  async () => {

    const response =
      await fetch(
        `${API_URL}/doctors`
      );


    if (!response.ok) {

      throw new Error(
        "Failed to fetch doctors"
      );

    }


    const result =
      await response.json();


    return result.data;

  };


/*
=========================================
GET DOCTOR BY ID
=========================================
*/

export const getDoctorById =
  async (id) => {

    const response =
      await fetch(
        `${API_URL}/doctors/${id}`
      );


    if (!response.ok) {

      throw new Error(
        "Failed to fetch doctor"
      );

    }


    const result =
      await response.json();


    return result.data;

  };


/*
=========================================
GET DOCTOR DASHBOARD
=========================================

GET /api/doctors/dashboard

Authentication required.
=========================================
*/

export const getDoctorDashboard =
  async () => {

    const token =
      localStorage.getItem(
        "mediqueue_token"
      );


    if (!token) {

      const error =
        new Error(
          "Please login as a doctor."
        );

      error.status = 401;

      throw error;

    }


    const response =
      await fetch(
        `${API_URL}/doctors/dashboard`,
        {

          method: "GET",

          headers: {

            Authorization:
              `Bearer ${token}`,

            "Content-Type":
              "application/json",

          },

        }
      );


    const result =
      await response.json();


    if (!response.ok) {

      const error =
        new Error(
          result.message ||
          "Failed to load doctor dashboard."
        );


      error.status =
        response.status;


      throw error;

    }


    return result;

  };