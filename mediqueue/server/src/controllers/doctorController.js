import Doctor from "../models/Doctor.js";
import Appointment from "../models/Appointment.js";


/*
=========================================
GET /api/doctors
=========================================
*/

export const getDoctors =
  async (req, res) => {

    try {

      const doctors =
        await Doctor.find({
          status: "active",
        })
          .populate(
            "department",
            "name"
          )
          .sort({
            name: 1,
          });


      res.status(200).json({

        success: true,

        count:
          doctors.length,

        data:
          doctors,

      });

    } catch (error) {

      console.error(
        "Get doctors error:",
        error.message
      );


      res.status(500).json({

        success: false,

        message:
          "Failed to fetch doctors",

      });

    }

  };


/*
=========================================
GET /api/doctors/:id
=========================================
*/

export const getDoctorById =
  async (req, res) => {

    try {

      const doctor =
        await Doctor.findOne({

          _id:
            req.params.id,

          status:
            "active",

        })
          .populate(
            "department",
            "name description"
          );


      if (!doctor) {

        return res.status(404).json({

          success: false,

          message:
            "Doctor not found",

        });

      }


      res.status(200).json({

        success: true,

        data:
          doctor,

      });

    } catch (error) {

      console.error(
        "Get doctor error:",
        error.message
      );


      res.status(500).json({

        success: false,

        message:
          "Failed to fetch doctor",

      });

    }

  };


/*
=========================================
GET /api/doctor/dashboard
=========================================

Authentication:
- Required
- Doctor role required

Returns:
- Doctor information
- Today's appointments
- Queue statistics
- Current patient
- Next patient
=========================================
*/

export const getDoctorDashboard =
  async (req, res) => {

    try {

      /*
      =====================================
      AUTHENTICATED USER
      =====================================
      */

      const userId =
        req.user.id;


      /*
      =====================================
      FIND DOCTOR PROFILE
      =====================================
      */

      const doctor =
        await Doctor.findOne({
          user: userId,
        })
          .populate(
            "department",
            "name"
          );


      if (!doctor) {

        return res.status(404).json({

          success: false,

          message:
            "Doctor profile not found.",

        });

      }


      /*
      =====================================
      TODAY'S DATE
      =====================================
      */

      const today =
        new Date()
          .toISOString()
          .split("T")[0];


      /*
      =====================================
      TODAY'S APPOINTMENTS
      =====================================
      */

      const appointments =
        await Appointment.find({

          doctor:
            doctor._id,

          date:
            today,

        })
          .populate(
            "patient",
            "name email phone"
          )
          .sort({
            startTime: 1,
          });


      /*
      =====================================
      QUEUE STATISTICS
      =====================================
      */

      const total =
        appointments.length;


      const booked =
        appointments.filter(
          (appointment) =>
            appointment.status ===
            "booked"
        ).length;


      const checkedIn =
        appointments.filter(
          (appointment) =>
            appointment.status ===
            "checked-in"
        ).length;


      const consulting =
        appointments.filter(
          (appointment) =>
            appointment.status ===
            "consulting"
        ).length;


      const completed =
        appointments.filter(
          (appointment) =>
            appointment.status ===
            "completed"
        ).length;


      const cancelled =
        appointments.filter(
          (appointment) =>
            appointment.status ===
            "cancelled"
        ).length;


      const noShow =
        appointments.filter(
          (appointment) =>
            appointment.status ===
            "no-show"
        ).length;


      /*
      =====================================
      CURRENT PATIENT
      =====================================
      */

      const currentPatient =
        appointments.find(
          (appointment) =>
            appointment.status ===
            "consulting"
        ) || null;


      /*
      =====================================
      NEXT PATIENT
      =====================================
      */

      const nextPatient =
        appointments.find(
          (appointment) =>
            appointment.status ===
            "checked-in"
        ) || null;


      /*
      =====================================
      RESPONSE
      =====================================
      */

      return res.status(200).json({

        success: true,

        date:
          today,

        doctor: {

          id:
            doctor._id,

          name:
            doctor.name,

          specialty:
            doctor.specialty,

          department:
            doctor.department,

          qualification:
            doctor.qualification,

          experience:
            doctor.experience,

          consultationFee:
            doctor.consultationFee,

          consultationDuration:
            doctor.consultationDuration,

          initials:
            doctor.initials,

        },

        stats: {

          total,

          booked,

          checkedIn,

          consulting,

          completed,

          cancelled,

          noShow,

        },

        currentPatient,

        nextPatient,

        appointments,

      });

    } catch (error) {

      console.error(
        "Get doctor dashboard error:",
        error
      );


      return res.status(500).json({

        success: false,

        message:
          "Failed to load doctor dashboard.",

      });

    }

  };