import mongoose from "mongoose";

import Appointment from "../models/Appointment.js";
import User from "../models/User.js";
import Doctor from "../models/Doctor.js";

import {
  generateTicketNumber,
} from "../services/ticketService.js";


/*
=========================================
CREATE APPOINTMENT
=========================================

POST /api/appointments

Authentication required.

The patient is taken from req.user,
which is populated by authMiddleware.
=========================================
*/

export const createAppointment =
  async (req, res) => {

    try {

      const patientId =
        req.user?.id;


      if (!patientId) {

        return res.status(401).json({

          success: false,

          message:
            "Authentication required.",

        });

      }


      /*
      =====================================
      REQUEST DATA
      =====================================
      */

      const {
        doctor,
        patientAge,
        patientGender,
        date,
        startTime,
        endTime,
        reason,
      } = req.body;


      /*
      =====================================
      BASIC VALIDATION
      =====================================
      */

      if (
        !doctor ||
        patientAge === undefined ||
        !patientGender ||
        !date ||
        !startTime ||
        !endTime
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Doctor, age, gender, date, start time and end time are required.",

        });

      }


      /*
      =====================================
      VALIDATE DOCTOR ID
      =====================================
      */

      if (
        !mongoose.Types.ObjectId.isValid(
          doctor
        )
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Invalid doctor ID.",

        });

      }


      /*
      =====================================
      VALIDATE PATIENT ID
      =====================================
      */

      if (
        !mongoose.Types.ObjectId.isValid(
          patientId
        )
      ) {

        return res.status(401).json({

          success: false,

          message:
            "Invalid authenticated user.",

        });

      }


      /*
      =====================================
      FIND PATIENT
      =====================================
      */

      const patient =
        await User.findById(
          patientId
        );


      if (!patient) {

        return res.status(404).json({

          success: false,

          message:
            "Patient account not found.",

        });

      }


      /*
      =====================================
      CHECK PATIENT ACCOUNT
      =====================================
      */

      if (!patient.isActive) {

        return res.status(403).json({

          success: false,

          message:
            "Your account has been deactivated.",

        });

      }


      /*
      =====================================
      ONLY PATIENTS CAN BOOK
      =====================================
      */

      if (
        patient.role !== "patient"
      ) {

        return res.status(403).json({

          success: false,

          message:
            "Only patient accounts can book appointments.",

        });

      }


      /*
      =====================================
      VALIDATE AGE
      =====================================
      */

      const numericAge =
        Number(patientAge);


      if (
        !Number.isInteger(
          numericAge
        ) ||
        numericAge < 0 ||
        numericAge > 120
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Please provide a valid patient age.",

        });

      }


      /*
      =====================================
      VALIDATE GENDER
      =====================================
      */

      const validGenders = [
        "Male",
        "Female",
        "Other",
      ];


      if (
        !validGenders.includes(
          patientGender
        )
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Invalid patient gender.",

        });

      }


      /*
      =====================================
      VALIDATE DATE
      =====================================
      */

      const dateRegex =
        /^\d{4}-\d{2}-\d{2}$/;


      if (
        !dateRegex.test(date)
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Invalid appointment date.",

        });

      }


      /*
      =====================================
      VALIDATE TIME
      =====================================
      */

      const timeRegex =
        /^\d{2}:\d{2}$/;


      if (
        !timeRegex.test(startTime) ||
        !timeRegex.test(endTime)
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Invalid appointment time.",

        });

      }


      /*
      =====================================
      FIND DOCTOR
      =====================================
      */

      const doctorData =
        await Doctor.findById(
          doctor
        );


      if (!doctorData) {

        return res.status(404).json({

          success: false,

          message:
            "Doctor not found.",

        });

      }


      /*
      =====================================
      CHECK DOCTOR STATUS
      =====================================
      */

      if (
        doctorData.status === "inactive"
      ) {

        return res.status(400).json({

          success: false,

          message:
            "This doctor is currently unavailable.",

        });

      }


      /*
      =====================================
      CHECK WHETHER SLOT IS ALREADY BOOKED
      =====================================
      */

      const existingAppointment =
        await Appointment.findOne({

          doctor,

          date,

          startTime,

          status: {
            $in: [
              "booked",
              "checked-in",
              "consulting",
            ],
          },

        });


      if (
        existingAppointment
      ) {

        return res.status(409).json({

          success: false,

          message:
            "This appointment slot has already been booked.",

        });

      }


      /*
      =====================================
      GENERATE UNIQUE TICKET
      =====================================
      */

      const ticketNumber =
        await generateTicketNumber();


      /*
      =====================================
      CREATE APPOINTMENT
      =====================================
      */

      const appointment =
        await Appointment.create({

          patient:
            patient._id,

          doctor:
            doctorData._id,

          patientName:
            patient.name,

          patientAge:
            numericAge,

          patientGender,

          patientPhone:
            patient.phone,

          patientEmail:
            patient.email,

          date,

          startTime,

          endTime,

          reason:
            reason?.trim() || "",

          ticketNumber,

          status:
            "booked",

        });


      /*
      =====================================
      POPULATE RESPONSE
      =====================================
      */

      const populatedAppointment =
        await Appointment
          .findById(
            appointment._id
          )
          .populate(
            "patient",
            "name email phone role"
          )
          .populate(
            "doctor",
            "name specialty department consultationFee"
          );


      /*
      =====================================
      SUCCESS
      =====================================
      */

      return res.status(201).json({

        success: true,

        message:
          "Appointment booked successfully.",

        data:
          populatedAppointment,

      });


    } catch (error) {

      console.error(
        "Create appointment error:",
        error
      );


      if (
        error.code === 11000
      ) {

        return res.status(409).json({

          success: false,

          message:
            "This appointment slot has already been booked.",

        });

      }


      return res.status(500).json({

        success: false,

        message:
          "Failed to book appointment.",

      });

    }

  };


/*
=========================================
GET APPOINTMENT BY TICKET
=========================================

GET /api/appointments/ticket/:ticketNumber
=========================================
*/

export const getAppointmentByTicket =
  async (req, res) => {

    try {

      const {
        ticketNumber,
      } = req.params;


      if (!ticketNumber) {

        return res.status(400).json({

          success: false,

          message:
            "Ticket number is required.",

        });

      }


      const appointment =
        await Appointment
          .findOne({

            ticketNumber:
              ticketNumber
                .trim()
                .toUpperCase(),

          })
          .populate(
            "patient",
            "name email phone role"
          )
          .populate(
            "doctor",
            "name specialty department consultationFee"
          );


      if (!appointment) {

        return res.status(404).json({

          success: false,

          message:
            "Appointment not found.",

        });

      }


      return res.status(200).json({

        success: true,

        data:
          appointment,

      });


    } catch (error) {

      console.error(
        "Get appointment by ticket error:",
        error
      );


      return res.status(500).json({

        success: false,

        message:
          "Failed to find appointment.",

      });

    }

  };


/*
=========================================
CANCEL APPOINTMENT
=========================================

PATCH /api/appointments/:appointmentId/cancel

Authentication required.

A patient can only cancel their own
appointment.
=========================================
*/

export const cancelAppointment =
  async (req, res) => {

    try {

      const {
        appointmentId,
      } = req.params;


      const patientId =
        req.user?.id;


      if (!patientId) {

        return res.status(401).json({

          success: false,

          message:
            "Authentication required.",

        });

      }


      if (
        !mongoose.Types.ObjectId.isValid(
          appointmentId
        )
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Invalid appointment ID.",

        });

      }


      const appointment =
        await Appointment.findById(
          appointmentId
        );


      if (!appointment) {

        return res.status(404).json({

          success: false,

          message:
            "Appointment not found.",

        });

      }


      if (
        appointment.patient.toString() !==
        patientId.toString()
      ) {

        return res.status(403).json({

          success: false,

          message:
            "You are not authorized to cancel this appointment.",

        });

      }


      if (
        appointment.status ===
        "cancelled"
      ) {

        return res.status(400).json({

          success: false,

          message:
            "This appointment is already cancelled.",

        });

      }


      if (
        appointment.status ===
        "completed"
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Completed appointments cannot be cancelled.",

        });

      }


      if (
        appointment.status ===
        "checked-in"
      ) {

        return res.status(400).json({

          success: false,

          message:
            "A checked-in appointment cannot be cancelled.",

        });

      }


      if (
        appointment.status ===
        "consulting"
      ) {

        return res.status(400).json({

          success: false,

          message:
            "An appointment currently in consultation cannot be cancelled.",

        });

      }


      appointment.status =
        "cancelled";


      await appointment.save();


      const updatedAppointment =
        await Appointment
          .findById(
            appointment._id
          )
          .populate(
            "patient",
            "name email phone role"
          )
          .populate(
            "doctor",
            "name specialty department consultationFee"
          );


      return res.status(200).json({

        success: true,

        message:
          "Appointment cancelled successfully.",

        data:
          updatedAppointment,

      });


    } catch (error) {

      console.error(
        "Cancel appointment error:",
        error
      );


      return res.status(500).json({

        success: false,

        message:
          "Failed to cancel appointment.",

      });

    }

  };


/*
=========================================
DOCTOR HELPER
=========================================

Find the authenticated doctor's profile.
=========================================
*/

const getAuthenticatedDoctor =
  async (userId) => {

    if (!userId) {
      return null;
    }

    return await Doctor.findOne({

      user: userId,

      status: "active",

    });

  };


/*
=========================================
CHECK IN APPOINTMENT
=========================================

PATCH /api/appointments/:appointmentId/check-in

BOOKED → CHECKED-IN
=========================================
*/

export const checkInAppointment =
  async (req, res) => {

    try {

      const {
        appointmentId,
      } = req.params;


      const doctor =
        await getAuthenticatedDoctor(
          req.user?.id
        );


      if (!doctor) {

        return res.status(404).json({

          success: false,

          message:
            "Doctor profile not found.",

        });

      }


      if (
        !mongoose.Types.ObjectId.isValid(
          appointmentId
        )
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Invalid appointment ID.",

        });

      }


      const appointment =
        await Appointment.findById(
          appointmentId
        );


      if (!appointment) {

        return res.status(404).json({

          success: false,

          message:
            "Appointment not found.",

        });

      }


      if (
        appointment.doctor.toString() !==
        doctor._id.toString()
      ) {

        return res.status(403).json({

          success: false,

          message:
            "You are not authorized to manage this appointment.",

        });

      }


      if (
        appointment.status !==
        "booked"
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Only booked appointments can be checked in.",

        });

      }


      appointment.status =
        "checked-in";


      await appointment.save();


      const updatedAppointment =
        await Appointment
          .findById(
            appointment._id
          )
          .populate(
            "patient",
            "name email phone role"
          )
          .populate(
            "doctor",
            "name specialty department consultationFee"
          );


      return res.status(200).json({

        success: true,

        message:
          "Patient checked in successfully.",

        data:
          updatedAppointment,

      });


    } catch (error) {

      console.error(
        "Check in appointment error:",
        error
      );


      return res.status(500).json({

        success: false,

        message:
          "Failed to check in appointment.",

      });

    }

  };


/*
=========================================
START CONSULTATION
=========================================

PATCH /api/appointments/:appointmentId/start

CHECKED-IN → CONSULTING
=========================================
*/

export const startConsultation =
  async (req, res) => {

    try {

      const {
        appointmentId,
      } = req.params;


      const doctor =
        await getAuthenticatedDoctor(
          req.user?.id
        );


      if (!doctor) {

        return res.status(404).json({

          success: false,

          message:
            "Doctor profile not found.",

        });

      }


      if (
        !mongoose.Types.ObjectId.isValid(
          appointmentId
        )
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Invalid appointment ID.",

        });

      }


      const appointment =
        await Appointment.findById(
          appointmentId
        );


      if (!appointment) {

        return res.status(404).json({

          success: false,

          message:
            "Appointment not found.",

        });

      }


      if (
        appointment.doctor.toString() !==
        doctor._id.toString()
      ) {

        return res.status(403).json({

          success: false,

          message:
            "You are not authorized to manage this appointment.",

        });

      }


      if (
        appointment.status !==
        "checked-in"
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Only checked-in patients can start consultation.",

        });

      }


      appointment.status =
        "consulting";


      await appointment.save();


      const updatedAppointment =
        await Appointment
          .findById(
            appointment._id
          )
          .populate(
            "patient",
            "name email phone role"
          )
          .populate(
            "doctor",
            "name specialty department consultationFee"
          );


      return res.status(200).json({

        success: true,

        message:
          "Consultation started successfully.",

        data:
          updatedAppointment,

      });


    } catch (error) {

      console.error(
        "Start consultation error:",
        error
      );


      return res.status(500).json({

        success: false,

        message:
          "Failed to start consultation.",

      });

    }

  };


/*
=========================================
COMPLETE APPOINTMENT
=========================================

PATCH /api/appointments/:appointmentId/complete

CONSULTING → COMPLETED
=========================================
*/

export const completeAppointment =
  async (req, res) => {

    try {

      const {
        appointmentId,
      } = req.params;


      const doctor =
        await getAuthenticatedDoctor(
          req.user?.id
        );


      if (!doctor) {

        return res.status(404).json({

          success: false,

          message:
            "Doctor profile not found.",

        });

      }


      if (
        !mongoose.Types.ObjectId.isValid(
          appointmentId
        )
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Invalid appointment ID.",

        });

      }


      const appointment =
        await Appointment.findById(
          appointmentId
        );


      if (!appointment) {

        return res.status(404).json({

          success: false,

          message:
            "Appointment not found.",

        });

      }


      if (
        appointment.doctor.toString() !==
        doctor._id.toString()
      ) {

        return res.status(403).json({

          success: false,

          message:
            "You are not authorized to manage this appointment.",

        });

      }


      if (
        appointment.status !==
        "consulting"
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Only ongoing consultations can be completed.",

        });

      }


      appointment.status =
        "completed";


      await appointment.save();


      const updatedAppointment =
        await Appointment
          .findById(
            appointment._id
          )
          .populate(
            "patient",
            "name email phone role"
          )
          .populate(
            "doctor",
            "name specialty department consultationFee"
          );


      return res.status(200).json({

        success: true,

        message:
          "Appointment completed successfully.",

        data:
          updatedAppointment,

      });


    } catch (error) {

      console.error(
        "Complete appointment error:",
        error
      );


      return res.status(500).json({

        success: false,

        message:
          "Failed to complete appointment.",

      });

    }

  };


/*
=========================================
MARK APPOINTMENT AS NO-SHOW
=========================================

PATCH /api/appointments/:appointmentId/no-show

BOOKED → NO-SHOW
=========================================
*/

export const markNoShow =
  async (req, res) => {

    try {

      const {
        appointmentId,
      } = req.params;


      const doctor =
        await getAuthenticatedDoctor(
          req.user?.id
        );


      if (!doctor) {

        return res.status(404).json({

          success: false,

          message:
            "Doctor profile not found.",

        });

      }


      if (
        !mongoose.Types.ObjectId.isValid(
          appointmentId
        )
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Invalid appointment ID.",

        });

      }


      const appointment =
        await Appointment.findById(
          appointmentId
        );


      if (!appointment) {

        return res.status(404).json({

          success: false,

          message:
            "Appointment not found.",

        });

      }


      if (
        appointment.doctor.toString() !==
        doctor._id.toString()
      ) {

        return res.status(403).json({

          success: false,

          message:
            "You are not authorized to manage this appointment.",

        });

      }


      if (
        appointment.status !==
        "booked"
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Only booked appointments can be marked as no-show.",

        });

      }


      appointment.status =
        "no-show";


      await appointment.save();


      const updatedAppointment =
        await Appointment
          .findById(
            appointment._id
          )
          .populate(
            "patient",
            "name email phone role"
          )
          .populate(
            "doctor",
            "name specialty department consultationFee"
          );


      return res.status(200).json({

        success: true,

        message:
          "Appointment marked as no-show.",

        data:
          updatedAppointment,

      });


    } catch (error) {

      console.error(
        "Mark no-show error:",
        error
      );


      return res.status(500).json({

        success: false,

        message:
          "Failed to mark appointment as no-show.",

      });

    }

  };


/*
=========================================
GET MY APPOINTMENTS
=========================================

GET /api/appointments/my

Authentication required.

Returns only appointments belonging
to the currently authenticated patient.
=========================================
*/

export const getMyAppointments =
  async (req, res) => {

    try {

      const patientId =
        req.user?.id;


      if (!patientId) {

        return res.status(401).json({

          success: false,

          message:
            "Authentication required.",

        });

      }


      const appointments =
        await Appointment
          .find({
            patient: patientId,
          })
          .populate(
            "doctor",
            "name specialty department consultationFee"
          )
          .sort({
            date: 1,
            startTime: 1,
          });


      /*
      =====================================
      CALCULATE STATISTICS
      =====================================
      */

      const upcoming =
        appointments.filter(
          (appointment) => {

            return [
              "booked",
              "checked-in",
              "consulting",
            ].includes(
              appointment.status
            );

          }
        );


      const completed =
        appointments.filter(
          (appointment) =>
            appointment.status ===
            "completed"
        );


      const active =
        appointments.filter(
          (appointment) =>
            [
              "booked",
              "checked-in",
              "consulting",
            ].includes(
              appointment.status
            )
        );


      return res.status(200).json({

        success: true,

        data: {

          appointments,

          stats: {

            total:
              appointments.length,

            upcoming:
              upcoming.length,

            active:
              active.length,

            completed:
              completed.length,

          },

        },

      });


    } catch (error) {

      console.error(
        "Get my appointments error:",
        error
      );


      return res.status(500).json({

        success: false,

        message:
          "Failed to fetch appointments.",

      });

    }

  };