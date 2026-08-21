const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";


/*
=========================================
GET AUTH TOKEN
=========================================
*/

const getToken = () => {

  return localStorage.getItem(
    "mediqueue_token"
  );

};


/*
=========================================
CREATE APPOINTMENT
=========================================

POST /api/appointments
=========================================
*/

export const createAppointment =
  async (appointmentData) => {

    const token =
      getToken();


    if (!token) {

      const error =
        new Error(
          "Please login before booking an appointment."
        );

      error.status = 401;

      throw error;

    }


    const response =
      await fetch(
        `${API_URL}/appointments`,
        {
          method: "POST",

          headers: {

            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,

          },

          body: JSON.stringify(
            appointmentData
          ),

        }
      );


    const result =
      await response.json();


    if (!response.ok) {

      const error =
        new Error(
          result.message ||
          "Failed to create appointment"
        );


      error.status =
        response.status;


      throw error;

    }


    return result;

  };


/*
=========================================
GET APPOINTMENT BY TICKET
=========================================

GET /api/appointments/ticket/:ticketNumber

Public endpoint.
=========================================
*/

export const getAppointmentByTicket =
  async (ticketNumber) => {

    const response =
      await fetch(
        `${API_URL}/appointments/ticket/${encodeURIComponent(
          ticketNumber
        )}`
      );


    const result =
      await response.json();


    if (!response.ok) {

      const error =
        new Error(
          result.message ||
          "Appointment not found"
        );


      error.status =
        response.status;


      throw error;

    }


    return result;

  };


/*
=========================================
GET MY APPOINTMENTS
=========================================

GET /api/appointments/my

Authentication required.
=========================================
*/

export const getMyAppointments =
  async () => {

    const token =
      getToken();


    if (!token) {

      const error =
        new Error(
          "Please login to view your appointments."
        );

      error.status = 401;

      throw error;

    }


    const response =
      await fetch(
        `${API_URL}/appointments/my`,
        {
          method: "GET",

          headers: {

            "Content-Type":
              "application/json",

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
          "Failed to fetch appointments"
        );


      error.status =
        response.status;


      throw error;

    }


    return result;

  };


/*
=========================================
CANCEL APPOINTMENT
=========================================

PATCH /api/appointments/:id/cancel

Authentication required.
=========================================
*/

export const cancelAppointment =
  async (appointmentId) => {

    const token =
      getToken();


    if (!token) {

      const error =
        new Error(
          "Please login to cancel an appointment."
        );

      error.status = 401;

      throw error;

    }


    const response =
      await fetch(
        `${API_URL}/appointments/${appointmentId}/cancel`,
        {
          method: "PATCH",

          headers: {

            "Content-Type":
              "application/json",

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
          "Failed to cancel appointment"
        );


      error.status =
        response.status;


      throw error;

    }


    return result;

  };


/*
=========================================
CHECK IN APPOINTMENT
=========================================

PATCH /api/appointments/:id/check-in

Doctor only.

BOOKED → CHECKED-IN
=========================================
*/

export const checkInAppointment =
  async (appointmentId) => {

    const token =
      getToken();


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
        `${API_URL}/appointments/${appointmentId}/check-in`,
        {
          method: "PATCH",

          headers: {

            "Content-Type":
              "application/json",

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
          "Failed to check in patient."
        );


      error.status =
        response.status;


      throw error;

    }


    return result;

  };


/*
=========================================
START CONSULTATION
=========================================

PATCH /api/appointments/:id/start

Doctor only.

CHECKED-IN → CONSULTING
=========================================
*/

export const startConsultation =
  async (appointmentId) => {

    const token =
      getToken();


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
        `${API_URL}/appointments/${appointmentId}/start`,
        {
          method: "PATCH",

          headers: {

            "Content-Type":
              "application/json",

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
          "Failed to start consultation."
        );


      error.status =
        response.status;


      throw error;

    }


    return result;

  };


/*
=========================================
COMPLETE APPOINTMENT
=========================================

PATCH /api/appointments/:id/complete

Doctor only.

CONSULTING → COMPLETED
=========================================
*/

export const completeAppointment =
  async (appointmentId) => {

    const token =
      getToken();


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
        `${API_URL}/appointments/${appointmentId}/complete`,
        {
          method: "PATCH",

          headers: {

            "Content-Type":
              "application/json",

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
          "Failed to complete appointment."
        );


      error.status =
        response.status;


      throw error;

    }


    return result;

  };


/*
=========================================
MARK NO-SHOW
=========================================

PATCH /api/appointments/:id/no-show

Doctor only.

BOOKED → NO-SHOW
=========================================
*/

export const markNoShow =
  async (appointmentId) => {

    const token =
      getToken();


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
        `${API_URL}/appointments/${appointmentId}/no-show`,
        {
          method: "PATCH",

          headers: {

            "Content-Type":
              "application/json",

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
          "Failed to mark appointment as no-show."
        );


      error.status =
        response.status;


      throw error;

    }


    return result;

  };