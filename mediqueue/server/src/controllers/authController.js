import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";


/*
=========================================
GENERATE JWT
=========================================
*/

const generateToken = (user) => {

  return jwt.sign(
    {
      userId: user._id,
      role: user.role,
    },

    process.env.JWT_SECRET,

    {
      expiresIn: "7d",
    }
  );

};


/*
=========================================
REGISTER USER
=========================================
POST /api/auth/register
=========================================
*/

export const registerUser =
  async (req, res) => {

    try {

      const {
        name,
        email,
        phone,
        password,
        confirmPassword,
      } = req.body;


      /*
      =====================================
      VALIDATION
      =====================================
      */

      if (
        !name ||
        !email ||
        !password ||
        !confirmPassword
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Name, email, password and confirm password are required.",

        });

      }


      /*
      =====================================
      TRIM INPUT
      =====================================
      */

      const cleanName =
        name.trim();


      const cleanEmail =
        email
          .trim()
          .toLowerCase();


      const cleanPhone =
        phone?.trim() || "";


      /*
      =====================================
      PASSWORD MATCH
      =====================================
      */

      if (
        password !==
        confirmPassword
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Passwords do not match.",

        });

      }


      /*
      =====================================
      PASSWORD LENGTH
      =====================================
      */

      if (
        password.length < 6
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Password must be at least 6 characters long.",

        });

      }


      /*
      =====================================
      NAME VALIDATION
      =====================================
      */

      if (
        cleanName.length < 2
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Name must contain at least 2 characters.",

        });

      }


      /*
      =====================================
      EMAIL FORMAT
      =====================================
      */

      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


      if (
        !emailRegex.test(
          cleanEmail
        )
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Please provide a valid email address.",

        });

      }


      /*
      =====================================
      CHECK EXISTING USER
      =====================================
      */

      const existingUser =
        await User.findOne({
          email: cleanEmail,
        });


      if (existingUser) {

        return res.status(409).json({

          success: false,

          message:
            "An account with this email already exists.",

        });

      }


      /*
      =====================================
      HASH PASSWORD
      =====================================
      */

      const salt =
        await bcrypt.genSalt(10);


      const hashedPassword =
        await bcrypt.hash(
          password,
          salt
        );


      /*
      =====================================
      CREATE USER
      =====================================
      */

      const user =
        await User.create({

          name: cleanName,

          email: cleanEmail,

          phone: cleanPhone,

          password: hashedPassword,

          role: "patient",

          isActive: true,

        });


      /*
      =====================================
      CREATE JWT
      =====================================
      */

      const token =
        generateToken(
          user
        );


      /*
      =====================================
      RESPONSE
      =====================================
      */

      return res.status(201).json({

        success: true,

        message:
          "Account created successfully.",

        data: {

          user: {

            id: user._id,

            name: user.name,

            email: user.email,

            phone: user.phone,

            role: user.role,

          },

          token,

        },

      });


    } catch (error) {

      console.error(
        "Register user error:",
        error
      );


      /*
      =====================================
      DUPLICATE EMAIL RACE CONDITION
      =====================================
      */

      if (
        error.code === 11000
      ) {

        return res.status(409).json({

          success: false,

          message:
            "An account with this email already exists.",

        });

      }


      return res.status(500).json({

        success: false,

        message:
          "Failed to create account.",

      });

    }

  };


  /*
=========================================
LOGIN USER
=========================================
POST /api/auth/login
=========================================
*/

export const loginUser =
  async (req, res) => {

    try {

      const {
        email,
        password,
      } = req.body;


      /*
      =====================================
      VALIDATION
      =====================================
      */

      if (!email || !password) {

        return res.status(400).json({

          success: false,

          message:
            "Email and password are required.",

        });

      }


      const cleanEmail =
        email
          .trim()
          .toLowerCase();


      /*
      =====================================
      FIND USER
      =====================================
      
      Password has select:false,
      so explicitly request it.
      */

      const user =
        await User
          .findOne({
            email: cleanEmail,
          })
          .select("+password");


      /*
      =====================================
      INVALID CREDENTIALS
      =====================================
      */

      if (!user) {

        return res.status(401).json({

          success: false,

          message:
            "Invalid email or password.",

        });

      }


      /*
      =====================================
      CHECK ACCOUNT STATUS
      =====================================
      */

      if (!user.isActive) {

        return res.status(403).json({

          success: false,

          message:
            "Your account has been deactivated.",

        });

      }


      /*
      =====================================
      COMPARE PASSWORD
      =====================================
      */

      const isPasswordValid =
        await bcrypt.compare(
          password,
          user.password
        );


      if (!isPasswordValid) {

        return res.status(401).json({

          success: false,

          message:
            "Invalid email or password.",

        });

      }


      /*
      =====================================
      GENERATE JWT
      =====================================
      */

      const token =
        generateToken(user);


      /*
      =====================================
      RESPONSE
      =====================================
      */

      return res.status(200).json({

        success: true,

        message:
          "Login successful.",

        data: {

          user: {

            id: user._id,

            name: user.name,

            email: user.email,

            phone: user.phone,

            role: user.role,

          },

          token,

        },

      });


    } catch (error) {

      console.error(
        "Login user error:",
        error
      );


      return res.status(500).json({

        success: false,

        message:
          "Failed to login.",

      });

    }

  };