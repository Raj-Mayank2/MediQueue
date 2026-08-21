import jwt from "jsonwebtoken";

import User from "../models/User.js";


/*
=========================================
AUTHENTICATION MIDDLEWARE
=========================================
*/

export const protect =
  async (req, res, next) => {

    try {

      /*
      =====================================
      GET AUTHORIZATION HEADER
      =====================================
      */

      const authHeader =
        req.headers.authorization;


      if (!authHeader) {

        return res.status(401).json({

          success: false,

          message:
            "Authentication required.",

        });

      }


      /*
      =====================================
      CHECK BEARER FORMAT
      =====================================
      */

      if (
        !authHeader.startsWith(
          "Bearer "
        )
      ) {

        return res.status(401).json({

          success: false,

          message:
            "Invalid authorization format.",

        });

      }


      /*
      =====================================
      EXTRACT TOKEN
      =====================================
      */

      const token =
        authHeader.split(" ")[1];


      if (!token) {

        return res.status(401).json({

          success: false,

          message:
            "Authentication token is missing.",

        });

      }


      /*
      =====================================
      VERIFY TOKEN
      =====================================
      */

      const decoded =
        jwt.verify(
          token,
          process.env.JWT_SECRET
        );


      /*
      =====================================
      FIND USER
      =====================================
      */

      const user =
        await User.findById(
          decoded.userId
        );


      if (!user) {

        return res.status(401).json({

          success: false,

          message:
            "User account no longer exists.",

        });

      }


      /*
      =====================================
      CHECK ACTIVE STATUS
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
      ATTACH USER TO REQUEST
      =====================================
      */

      req.user = {

        id: user._id,

        name: user.name,

        email: user.email,

        phone: user.phone,

        role: user.role,

      };


      /*
      =====================================
      CONTINUE
      =====================================
      */

      next();


    } catch (error) {

      console.error(
        "Authentication error:",
        error
      );


      /*
      =====================================
      JWT ERRORS
      =====================================
      */

      if (
        error.name ===
        "TokenExpiredError"
      ) {

        return res.status(401).json({

          success: false,

          message:
            "Authentication token has expired.",

        });

      }


      if (
        error.name ===
        "JsonWebTokenError"
      ) {

        return res.status(401).json({

          success: false,

          message:
            "Invalid authentication token.",

        });

      }


      return res.status(500).json({

        success: false,

        message:
          "Authentication failed.",

      });

    }

  };