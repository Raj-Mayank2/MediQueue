import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/db.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";

import userRoutes from "./routes/userRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";
import scheduleRoutes from "./routes/scheduleRoutes.js";
import availabilityRoutes from "./routes/availabilityRoutes.js";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;


/* =========================
   DATABASE
========================= */

connectDB();


/* =========================
   MIDDLEWARE
========================= */

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);


app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());


/* =========================
   HEALTH CHECK
========================= */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "MediQueue API is running 🚀",
  });
});


/* =========================
   API ROUTES
========================= */

app.use(
  "/api/doctors",
  doctorRoutes
);

app.use(
  "/api/departments",
  departmentRoutes
);

app.use(
  "/api/schedules",
  scheduleRoutes
);

app.use(
  "/api/doctors",
  availabilityRoutes
);

app.use(
  "/api/appointments",
  appointmentRoutes
);
app.use(
  "/api/users",
  userRoutes
);
app.use(
  "/api/auth",
  authRoutes
);
/* =========================
   SERVER
========================= */

app.listen(PORT, () => {
  console.log(
    `MediQueue API running on port ${PORT}`
  );
});