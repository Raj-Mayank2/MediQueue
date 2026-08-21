/*
=========================================
ROLE AUTHORIZATION MIDDLEWARE
=========================================
*/

export const requireRole = (
  ...allowedRoles
) => {

  return (req, res, next) => {

    /*
    =====================================
    CHECK AUTHENTICATION
    =====================================
    */

    if (!req.user) {

      return res.status(401).json({

        success: false,

        message:
          "Authentication required.",

      });

    }


    /*
    =====================================
    CHECK ROLE
    =====================================
    */

    if (
      !allowedRoles.includes(
        req.user.role
      )
    ) {

      return res.status(403).json({

        success: false,

        message:
          "You are not authorized to access this resource.",

      });

    }


    /*
    =====================================
    CONTINUE
    =====================================
    */

    next();

  };

};