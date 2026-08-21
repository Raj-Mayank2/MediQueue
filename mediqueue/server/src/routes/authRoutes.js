import express from "express";

import {
  registerUser,
  loginUser,
} from "../controllers/authController.js";

import {
  protect,
} from "../middleware/authMiddleware.js";


const router =
  express.Router();


/*
=========================================
REGISTER
=========================================
*/

router.post(
  "/register",
  registerUser
);


/*
=========================================
LOGIN
=========================================
*/

router.post(
  "/login",
  loginUser
);


/*
=========================================
CURRENT USER
=========================================
*/

router.get(
  "/me",
  protect,
  async (req, res) => {

    return res.status(200).json({

      success: true,

      data: {
        user: req.user,
      },

    });

  }
);


export default router;