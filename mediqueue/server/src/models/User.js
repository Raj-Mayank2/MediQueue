import mongoose from "mongoose";


const userSchema =
  new mongoose.Schema(
    {

      /*
      =====================================
      BASIC INFORMATION
      =====================================
      */

      name: {
        type: String,

        required: true,

        trim: true,

        minlength: 2,

        maxlength: 100,
      },


      email: {
        type: String,

        required: true,

        unique: true,

        lowercase: true,

        trim: true,
      },


      phone: {
        type: String,

        trim: true,

        default: "",
      },


      /*
      =====================================
      PATIENT INFORMATION
      =====================================
      */

      age: {
        type: Number,

        min: 0,

        max: 120,

        default: null,
      },


      gender: {
        type: String,

        enum: [
          "Male",
          "Female",
          "Other",
          "",
        ],

        default: "",
      },


      /*
      =====================================
      AUTHENTICATION
      =====================================
      */

      password: {
        type: String,

        required: true,

        minlength: 6,

        select: false,
      },


      /*
      =====================================
      ROLE
      =====================================
      */

      role: {
        type: String,

        enum: [
          "patient",
          "doctor",
          "receptionist",
          "admin",
        ],

        default: "patient",
      },


      /*
      =====================================
      ACCOUNT STATUS
      =====================================
      */

      isActive: {
        type: Boolean,

        default: true,
      },

    },

    {
      timestamps: true,
    }
  );


/*
=========================================
EMAIL INDEX
=========================================
*/

userSchema.index(
  {
    email: 1,
  },
  {
    unique: true,
  }
);


const User =
  mongoose.model(
    "User",
    userSchema
  );


export default User;