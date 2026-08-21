import mongoose from "mongoose";


const doctorSchema =
  new mongoose.Schema(
    {

      /*
      =========================================
      AUTHENTICATED USER
      =========================================
      */

      user: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,

        unique: true,
      },


      /*
      =========================================
      BASIC INFORMATION
      =========================================
      */

      name: {
        type: String,

        required: true,

        trim: true,
      },


      specialty: {
        type: String,

        required: true,

        trim: true,
      },


      /*
      =========================================
      DEPARTMENT
      =========================================
      */

      department: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "Department",

        required: true,
      },


      /*
      =========================================
      QUALIFICATION
      =========================================
      */

      qualification: {
        type: String,

        required: true,

        trim: true,
      },


      /*
      =========================================
      EXPERIENCE
      =========================================
      */

      experience: {
        type: Number,

        required: true,

        min: 0,
      },


      /*
      =========================================
      RATING
      =========================================
      */

      rating: {
        type: Number,

        default: 0,

        min: 0,

        max: 5,
      },


      /*
      =========================================
      REVIEWS
      =========================================
      */

      reviews: {
        type: Number,

        default: 0,

        min: 0,
      },


      /*
      =========================================
      CONSULTATION FEE
      =========================================
      */

      consultationFee: {
        type: Number,

        required: true,

        min: 0,
      },


      /*
      =========================================
      CONSULTATION DURATION
      =========================================
      */

      consultationDuration: {
        type: Number,

        default: 20,

        min: 5,
      },


      /*
      =========================================
      INITIALS
      =========================================
      */

      initials: {
        type: String,

        required: true,

        trim: true,

        uppercase: true,
      },


      /*
      =========================================
      ABOUT
      =========================================
      */

      about: {
        type: String,

        default: "",

        trim: true,
      },


      /*
      =========================================
      LANGUAGES
      =========================================
      */

      languages: {
        type: [String],

        default: [
          "English",
          "Hindi",
        ],
      },


      /*
      =========================================
      WORKING DAYS
      =========================================
      */

      workingDays: {
        type: [String],

        default: [],
      },


      /*
      =========================================
      WORKING HOURS
      =========================================
      */

      workingHours: {

        morning: {
          type: String,

          default: "",
        },


        evening: {
          type: String,

          default: "",
        },

      },


      /*
      =========================================
      STATUS
      =========================================
      */

      status: {
        type: String,

        enum: [
          "active",
          "inactive",
        ],

        default: "active",
      },

    },

    {
      timestamps: true,
    }

  );


/*
=========================================
MODEL
=========================================
*/

const Doctor =
  mongoose.model(
    "Doctor",
    doctorSchema
  );


export default Doctor;