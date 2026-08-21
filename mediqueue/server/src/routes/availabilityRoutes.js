import express from "express";

import {
  getDoctorAvailability,
} from "../controllers/scheduleController.js";


const router = express.Router();


router.get(
  "/:doctorId/availability",
  getDoctorAvailability
);


export default router;