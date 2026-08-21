import express from "express";


import {
  createAppointment,
  getAppointmentByTicket,
  cancelAppointment,
  getMyAppointments,

  checkInAppointment,
  startConsultation,
  completeAppointment,
  markNoShow,
} from "../controllers/appointmentController.js";


import {
  protect,
} from "../middleware/authMiddleware.js";


import {
  requireRole,
} from "../middleware/roleMiddleware.js";


const router =
  express.Router();


/*
=========================================
CREATE APPOINTMENT
=========================================

POST /api/appointments

Patient authentication required.
=========================================
*/

router.post(
  "/",
  protect,
  createAppointment
);


/*
=========================================
GET APPOINTMENT BY TICKET
=========================================

GET /api/appointments/ticket/:ticketNumber

Currently public.
=========================================
*/

router.get(
  "/ticket/:ticketNumber",
  getAppointmentByTicket
);


/*
=========================================
GET MY APPOINTMENTS
=========================================

GET /api/appointments/my

Patient authentication required.
=========================================
*/

router.get(
  "/my",
  protect,
  getMyAppointments
);


/*
=========================================
CANCEL APPOINTMENT
=========================================

PATCH /api/appointments/:appointmentId/cancel

Patient authentication required.
=========================================
*/

router.patch(
  "/:appointmentId/cancel",
  protect,
  cancelAppointment
);


/*
=========================================
DOCTOR QUEUE MANAGEMENT
=========================================

The following routes are restricted
to authenticated doctors.
=========================================
*/


/*
=========================================
CHECK IN PATIENT
=========================================

PATCH /api/appointments/:appointmentId/check-in

BOOKED → CHECKED-IN
=========================================
*/

router.patch(
  "/:appointmentId/check-in",
  protect,
  requireRole("doctor"),
  checkInAppointment
);


/*
=========================================
START CONSULTATION
=========================================

PATCH /api/appointments/:appointmentId/start

CHECKED-IN → CONSULTING
=========================================
*/

router.patch(
  "/:appointmentId/start",
  protect,
  requireRole("doctor"),
  startConsultation
);


/*
=========================================
COMPLETE CONSULTATION
=========================================

PATCH /api/appointments/:appointmentId/complete

CONSULTING → COMPLETED
=========================================
*/

router.patch(
  "/:appointmentId/complete",
  protect,
  requireRole("doctor"),
  completeAppointment
);


/*
=========================================
MARK NO-SHOW
=========================================

PATCH /api/appointments/:appointmentId/no-show

BOOKED → NO-SHOW
=========================================
*/

router.patch(
  "/:appointmentId/no-show",
  protect,
  requireRole("doctor"),
  markNoShow
);


export default router;