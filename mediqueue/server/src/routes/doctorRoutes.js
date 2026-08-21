import express from "express";


import {
  getDoctors,
  getDoctorById,
  getDoctorDashboard,
} from "../controllers/doctorController.js";


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
PUBLIC DOCTOR LIST
=========================================

GET /api/doctors
=========================================
*/

router.get(
  "/",
  getDoctors
);


/*
=========================================
DOCTOR DASHBOARD
=========================================

GET /api/doctors/dashboard

Authentication:
- Required
- Doctor role required
=========================================
*/

router.get(
  "/dashboard",
  protect,
  requireRole("doctor"),
  getDoctorDashboard
);


/*
=========================================
PUBLIC DOCTOR DETAILS
=========================================

GET /api/doctors/:id
=========================================
*/

router.get(
  "/:id",
  getDoctorById
);


export default router;