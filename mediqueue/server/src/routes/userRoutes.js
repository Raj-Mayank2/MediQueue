import express from "express";

import {
  getProfile,
  updateProfile,
} from "../controllers/userController.js";

import {
  protect,
} from "../middleware/authMiddleware.js";


const router =
  express.Router();


/*
=========================================
GET PROFILE
=========================================
*/

router.get(
  "/profile",
  protect,
  getProfile
);


/*
=========================================
UPDATE PROFILE
=========================================
*/

router.patch(
  "/profile",
  protect,
  updateProfile
);


export default router;