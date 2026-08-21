import express from "express";

import {
  createSchedule,
  getDoctorSchedules,
} from "../controllers/scheduleController.js";


const router = express.Router();


router.post(
  "/",
  createSchedule
);


router.get(
  "/:doctorId",
  getDoctorSchedules
);


export default router;