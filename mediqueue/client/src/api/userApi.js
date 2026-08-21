const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";


/*
=========================================
GET TOKEN
=========================================
*/

const getToken = () => {

  return localStorage.getItem(
    "mediqueue_token"
  );

};


/*
=========================================
GET PROFILE
=========================================
*/

export const getProfile =
  async () => {

    const token =
      getToken();


    if (!token) {

      const error =
        new Error(
          "Please login to view your profile."
        );

      error.status = 401;

      throw error;

    }


    const response =
      await fetch(
        `${API_URL}/users/profile`,
        {
          method: "GET",

          headers: {

            Authorization:
              `Bearer ${token}`,

          },

        }
      );


    const result =
      await response.json();


    if (!response.ok) {

      const error =
        new Error(
          result.message ||
          "Failed to fetch profile."
        );

      error.status =
        response.status;

      throw error;

    }


    return result;

  };


/*
=========================================
UPDATE PROFILE
=========================================
*/

export const updateProfile =
  async (profileData) => {

    const token =
      getToken();


    if (!token) {

      const error =
        new Error(
          "Please login to update your profile."
        );

      error.status = 401;

      throw error;

    }


    const response =
      await fetch(
        `${API_URL}/users/profile`,
        {
          method: "PATCH",

          headers: {

            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,

          },

          body: JSON.stringify(
            profileData
          ),

        }
      );


    const result =
      await response.json();


    if (!response.ok) {

      const error =
        new Error(
          result.message ||
          "Failed to update profile."
        );

      error.status =
        response.status;

      throw error;

    }


    return result;

  };