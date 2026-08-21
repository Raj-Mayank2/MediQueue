import mongoose from "mongoose";


const appointmentSchema =
  new mongoose.Schema(
    {

      /*
      =========================================
      PATIENT ACCOUNT
      =========================================
      */

      patient: {
        type: mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,
      },


      /*
      =========================================
      DOCTOR
      =========================================
      */

      doctor: {
        type: mongoose.Schema.Types.ObjectId,

        ref: "Doctor",

        required: true,
      },


      /*
      =========================================
      PATIENT INFORMATION
      =========================================
      */

      patientName: {
        type: String,

        required: true,

        trim: true,

        maxlength: 100,
      },


      patientAge: {
        type: Number,

        required: true,

        min: 0,

        max: 120,
      },


      patientGender: {
        type: String,

        enum: [
          "Male",
          "Female",
          "Other",
        ],

        required: true,
      },


      patientPhone: {
        type: String,

        required: true,

        trim: true,
      },


      patientEmail: {
        type: String,

        required: true,

        trim: true,

        lowercase: true,
      },


      /*
      =========================================
      APPOINTMENT DATE
      =========================================
      */

      date: {
        type: String,

        required: true,

        match:
          /^\d{4}-\d{2}-\d{2}$/,
      },


      /*
      =========================================
      APPOINTMENT TIME
      =========================================
      */

      startTime: {
        type: String,

        required: true,

        match:
          /^\d{2}:\d{2}$/,
      },


      endTime: {
        type: String,

        required: true,

        match:
          /^\d{2}:\d{2}$/,
      },


      /*
      =========================================
      REASON FOR VISIT
      =========================================
      */

      reason: {
        type: String,

        trim: true,

        maxlength: 500,

        default: "",
      },


      /*
      =========================================
      UNIQUE TICKET
      =========================================
      */

      ticketNumber: {
        type: String,

        required: true,

        unique: true,

        trim: true,

        uppercase: true,
      },


      /*
      =========================================
      APPOINTMENT STATUS
      =========================================
      */

      status: {
        type: String,

        enum: [
          "booked",
          "checked-in",
          "consulting",
          "completed",
          "cancelled",
          "no-show",
        ],

        default: "booked",
      },

    },

    {
      timestamps: true,
    }
  );


/*
=========================================
DOUBLE-BOOKING PROTECTION
=========================================

A doctor cannot have two active
appointments at the same date/time.

Cancelled, completed and no-show
appointments don't occupy the slot.
=========================================
*/

appointmentSchema.index(
  {
    doctor: 1,

    date: 1,

    startTime: 1,
  },

  {
    unique: true,

    partialFilterExpression: {
      status: {
        $in: [
          "booked",
          "checked-in",
          "consulting",
        ],
      },
    },
  }
);


/*
=========================================
PATIENT APPOINTMENT LOOKUPS
=========================================
*/

appointmentSchema.index({
  patient: 1,

  date: -1,
});


/*
=========================================
DOCTOR APPOINTMENT LOOKUPS
=========================================
*/

appointmentSchema.index({
  doctor: 1,

  date: 1,
});


/*
=========================================
MODEL
=========================================
*/

const Appointment =
  mongoose.model(
    "Appointment",
    appointmentSchema
  );


export default Appointment;