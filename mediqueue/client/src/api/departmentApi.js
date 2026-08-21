const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";


/*
=========================================
GET ALL DEPARTMENTS
=========================================

GET /api/departments
*/

export const getDepartments =
  async () => {

    const response =
      await fetch(
        `${API_URL}/departments`
      );


    const result =
      await response.json();


    if (!response.ok) {

      throw new Error(
        result.message ||
        "Failed to fetch departments"
      );

    }


    return result.data;

  };