const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";


export const apiRequest =
  async (
    endpoint,
    options = {}
  ) => {

    const token =
      localStorage.getItem(
        "mediqueue_token"
      );


    const headers = {

      "Content-Type":
        "application/json",

      ...(options.headers || {}),

    };


    /*
    =====================================
    ADD JWT
    =====================================
    */

    if (token) {

      headers.Authorization =
        `Bearer ${token}`;

    }


    const response =
      await fetch(
        `${API_URL}${endpoint}`,
        {
          ...options,

          headers,
        }
      );


    const data =
      await response.json();


    /*
    =====================================
    HANDLE AUTH FAILURE
    =====================================
    */

    if (
      response.status === 401
    ) {

      localStorage.removeItem(
        "mediqueue_token"
      );

      localStorage.removeItem(
        "mediqueue_user"
      );

    }


    if (!response.ok) {

      const error =
        new Error(
          data.message ||
            "Something went wrong."
        );

      error.status =
        response.status;

      error.data =
        data;

      throw error;

    }


    return data;

  };