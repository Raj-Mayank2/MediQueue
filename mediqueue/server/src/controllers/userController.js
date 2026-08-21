import User from "../models/User.js";


/*
=========================================
GET CURRENT USER PROFILE
=========================================

GET /api/users/profile

Authentication required.
=========================================
*/

export const getProfile =
  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.user.id
        );


      if (!user) {

        return res.status(404).json({

          success: false,

          message:
            "User profile not found.",

        });

      }


      return res.status(200).json({

        success: true,

        data: {

          user: {

            id:
              user._id,

            name:
              user.name,

            email:
              user.email,

            phone:
              user.phone,

            age:
              user.age,

            gender:
              user.gender,

            role:
              user.role,

          },

        },

      });


    } catch (error) {

      console.error(
        "Get profile error:",
        error
      );


      return res.status(500).json({

        success: false,

        message:
          "Failed to fetch profile.",

      });

    }

  };


/*
=========================================
UPDATE CURRENT USER PROFILE
=========================================

PATCH /api/users/profile

Authentication required.
=========================================
*/

export const updateProfile =
  async (req, res) => {

    try {

      const {
        name,
        phone,
        age,
        gender,
      } = req.body;


      /*
      =====================================
      FIND USER
      =====================================
      */

      const user =
        await User.findById(
          req.user.id
        );


      if (!user) {

        return res.status(404).json({

          success: false,

          message:
            "User profile not found.",

        });

      }


      /*
      =====================================
      NAME
      =====================================
      */

      if (
        name !== undefined
      ) {

        const cleanName =
          name.trim();


        if (
          cleanName.length < 2
        ) {

          return res.status(400).json({

            success: false,

            message:
              "Name must contain at least 2 characters.",

          });

        }


        user.name =
          cleanName;

      }


      /*
      =====================================
      PHONE
      =====================================
      */

      if (
        phone !== undefined
      ) {

        const cleanPhone =
          phone.trim();


        if (
          cleanPhone &&
          !/^[0-9]{10}$/.test(
            cleanPhone
          )
        ) {

          return res.status(400).json({

            success: false,

            message:
              "Please provide a valid 10-digit phone number.",

          });

        }


        user.phone =
          cleanPhone;

      }


      /*
      =====================================
      AGE
      =====================================
      */

      if (
        age !== undefined
      ) {

        if (
          age === null ||
          age === ""
        ) {

          user.age = null;

        } else {

          const numericAge =
            Number(age);


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
                "Please provide a valid age.",

            });

          }


          user.age =
            numericAge;

        }

      }


      /*
      =====================================
      GENDER
      =====================================
      */

      if (
        gender !== undefined
      ) {

        if (
          ![
            "",
            "Male",
            "Female",
            "Other",
          ].includes(
            gender
          )
        ) {

          return res.status(400).json({

            success: false,

            message:
              "Please provide a valid gender.",

          });

        }


        user.gender =
          gender;

      }


      /*
      =====================================
      SAVE
      =====================================
      */

      await user.save();


      /*
      =====================================
      RESPONSE
      =====================================
      */

      return res.status(200).json({

        success: true,

        message:
          "Profile updated successfully.",

        data: {

          user: {

            id:
              user._id,

            name:
              user.name,

            email:
              user.email,

            phone:
              user.phone,

            age:
              user.age,

            gender:
              user.gender,

            role:
              user.role,

          },

        },

      });


    } catch (error) {

      console.error(
        "Update profile error:",
        error
      );


      return res.status(500).json({

        success: false,

        message:
          "Failed to update profile.",

      });

    }

  };