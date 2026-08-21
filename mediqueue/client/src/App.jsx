import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import TicketLookup from "./pages/TicketLookup";
import About from "./pages/About";
import Navbar from "./components/Navbar";

import Booking from "./pages/Booking";

import Home from "./pages/Home";
import Departments from "./pages/Departments";
import ProtectedRoute from "./components/ProtectedRoute";

import PatientDashboard from "./pages/PatientDashboard";

import Login from "./pages/Login";

import Register from "./pages/Register";
import Contact from "./pages/Contact";
import Doctors from "./pages/Doctors";

import DoctorDetails from "./pages/DoctorDetails";

import Profile from "./pages/Profile";
import DoctorDashboard from "./pages/DoctorDashboard";
import MyAppointments from "./pages/MyAppointments";

import AppointmentConfirmation from "./pages/AppointmentConfirmation";


function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>


        {/* =================================
            HOME
        ================================= */}

        <Route
          path="/"
          element={<Home />}
        />


        {/* =================================
            DOCTORS
        ================================= */}

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/doctors"
          element={<Doctors />}
        />
        <Route
          path="/about"
          element={<About />}
        />

        {/* =================================
            DOCTOR DETAILS
        ================================= */}

        <Route
          path="/doctors/:doctorId"
          element={<DoctorDetails />}
        />


        {/* =================================
            BOOKING
        ================================= */}

        <Route
          path="/doctors/:doctorId/book"
          element={<Booking />}
        />


        {/* =================================
            TICKET LOOKUP
        ================================= */}

        <Route
          path="/ticket"
          element={<TicketLookup />}
        />

        <Route
          path="/departments"
          element={<Departments />}
        />

        {/* =================================
            APPOINTMENT CONFIRMATION
        ================================= */}

        <Route
          path="/appointment-confirmation"
          element={
            <AppointmentConfirmation />
          }
        />


        {/* =================================
            LOGIN
        ================================= */}

        <Route
          path="/login"
          element={<Login />}
        />


        {/* =================================
            REGISTER
        ================================= */}

        <Route
          path="/register"
          element={<Register />}
        />


        {/* =================================
            PROTECTED ROUTES
        ================================= */}

        <Route
          element={
            <ProtectedRoute />
          }
        >

          {/* ===============================
              DASHBOARD
          =============================== */}

          <Route
            path="/dashboard"
            element={
              <PatientDashboard />
            }
          />


          {/* ===============================
              PROFILE
          =============================== */}

          <Route
            path="/profile"
            element={
              <Profile />
            }
          />

          <Route
            path="/doctor-dashboard"
            element={<DoctorDashboard />}
          />



          {/* ===============================
              APPOINTMENTS
          =============================== */}

          <Route
            path="/appointments"
            element={
              <MyAppointments />
            }
          />


        </Route>

      </Routes>

    </BrowserRouter>

  );

}


export default App;