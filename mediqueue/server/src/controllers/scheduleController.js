import mongoose from "mongoose";

import Schedule from "../models/Schedule.js";
import Doctor from "../models/Doctor.js";

import {
  generateSlots,
} from "../services/slotService.js";


/*
=========================================
GET SCHEDULE FOR A DOCTOR
=========================================
GET /api/schedules/:doctorId
=========================================
*/

export const getDoctorSchedules = async (
  req,
  res
) => {

  try {

    const { doctorId } = req.params;


    if (
      !mongoose.Types.ObjectId.isValid(
        doctorId
      )
    ) {

      return res.status(400).json({
        success: false,
        message: "Invalid doctor ID",
      });

    }


    const schedules =
      await Schedule.find({
        doctor: doctorId,
        status: "active",
      })
        .sort({
          date: 1,
        });


    res.status(200).json({
      success: true,

      count: schedules.length,

      data: schedules,
    });


  } catch (error) {

    console.error(
      "Get doctor schedules error:",
      error.message
    );


    res.status(500).json({
      success: false,
      message:
        "Failed to fetch doctor schedules",
    });

  }
};


/*
=========================================
GET AVAILABLE SLOTS
=========================================
GET /api/doctors/:doctorId/availability?date=YYYY-MM-DD
=========================================
*/

export const getDoctorAvailability = async (
  req,
  res
) => {

  try {

    const { doctorId } = req.params;

    const { date } = req.query;


    if (
      !mongoose.Types.ObjectId.isValid(
        doctorId
      )
    ) {

      return res.status(400).json({
        success: false,
        message: "Invalid doctor ID",
      });

    }


    if (!date) {

      return res.status(400).json({
        success: false,
        message:
          "Date is required",
      });

    }


    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(date)
    ) {

      return res.status(400).json({
        success: false,
        message:
          "Date must be in YYYY-MM-DD format",
      });

    }


    const doctor =
      await Doctor.findOne({
        _id: doctorId,
        status: "active",
      }).populate(
        "department",
        "name"
      );


    if (!doctor) {

      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });

    }


    const schedule =
      await Schedule.findOne({
        doctor: doctorId,
        date,
        status: "active",
      });


    if (!schedule) {

      return res.status(200).json({
        success: true,

        date,

        doctor: {
          id: doctor._id,
          name: doctor.name,
        },

        slots: [],
      });

    }


    const slots =
      generateSlots(
        schedule.sessions,
        schedule.slotDuration
      );


    res.status(200).json({
      success: true,

      date,

      doctor: {
        id: doctor._id,
        name: doctor.name,
        department:
          doctor.department?.name,
      },

      slotDuration:
        schedule.slotDuration,

      slots,
    });


  } catch (error) {

    console.error(
      "Get doctor availability error:",
      error.message
    );


    res.status(500).json({
      success: false,
      message:
        "Failed to fetch doctor availability",
    });

  }
};


/*
=========================================
CREATE SCHEDULE
=========================================
POST /api/schedules
=========================================
*/

export const createSchedule = async (
  req,
  res
) => {

  try {

    const {
      doctor,
      date,
      sessions,
      slotDuration,
    } = req.body;


    if (!doctor || !date) {

      return res.status(400).json({
        success: false,
        message:
          "Doctor and date are required",
      });

    }


    if (
      !mongoose.Types.ObjectId.isValid(
        doctor
      )
    ) {

      return res.status(400).json({
        success: false,
        message:
          "Invalid doctor ID",
      });

    }


    const doctorExists =
      await Doctor.findOne({
        _id: doctor,
        status: "active",
      });


    if (!doctorExists) {

      return res.status(404).json({
        success: false,
        message:
          "Doctor not found",
      });

    }


    const existingSchedule =
      await Schedule.findOne({
        doctor,
        date,
      });


    if (existingSchedule) {

      return res.status(409).json({
        success: false,
        message:
          "Schedule already exists for this date",
      });

    }


    const schedule =
      await Schedule.create({
        doctor,
        date,
        sessions:
          sessions || [],
        slotDuration:
          slotDuration ||
          doctorExists.consultationDuration ||
          20,
      });


    res.status(201).json({
      success: true,

      message:
        "Schedule created successfully",

      data: schedule,
    });


  } catch (error) {

    console.error(
      "Create schedule error:",
      error.message
    );


    res.status(500).json({
      success: false,
      message:
        "Failed to create schedule",
    });

  }
};