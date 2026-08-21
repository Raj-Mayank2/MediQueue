# 🏥 MediQueue

> **Smart Hospital Appointment & Queue Management Platform**

MediQueue is a full-stack healthcare appointment and queue management platform designed to simplify doctor discovery, appointment booking, patient visits, and doctor queue management.

---

## 🌐 Live Demo

**Webiste Link:** https://medi-queue-livid.vercel.app





---




## ✨ Features

### 👤 Patient Features

- Patient registration and login
- JWT-based authentication
- Protected patient routes
- Patient profile management
- Update patient information
- Browse available doctors
- View detailed doctor profiles
- Browse hospital departments
- Book doctor appointments
- Select appointment date and time
- Enter reason for visit
- Generate unique appointment ticket
- View appointment confirmation
- Search appointments using ticket number
- View personal appointments
- Cancel appointments
- Appointment status tracking
- Responsive patient experience

### 👨‍⚕️ Doctor Features

- Dedicated doctor authentication
- Doctor role-based authorization
- Doctor profile connected to authenticated user
- Doctor dashboard
- Today's appointment statistics
- Appointment queue
- Patient information
- Appointment ticket information
- Appointment status tracking
- Check-in patient
- Start consultation
- Complete consultation
- Mark patient as no-show
- Doctor-specific appointment filtering

### 🏥 Department Features

- Department listing
- Active department filtering
- Department information
- Doctor-to-department relationship
- Department-based doctor discovery

### 📅 Appointment Management

Appointment lifecycle:

```text
BOOKED
   ↓
CHECKED-IN
   ↓
CONSULTING
   ↓
COMPLETED
```

Additional states:

```text
BOOKED → CANCELLED
BOOKED → NO-SHOW
```

The backend includes protection against active double-booking for the same doctor, date, and time slot.

### 🎫 Queue & Ticket Management

- Unique appointment ticket numbers
- Public ticket lookup
- Doctor queue management
- Appointment status tracking

---

## 🔐 Authentication & Authorization

- JWT authentication
- Password-protected accounts
- Protected API routes
- Protected frontend routes
- Role-based authorization
- Patient role
- Doctor role
- Receptionist role support
- Admin role support
- Active/inactive account handling

---

## 🧩 Technology Stack

### Frontend

- React
- Vite
- React Router
- JavaScript
- CSS
- Context API
- Fetch API

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- CORS
- dotenv

### Deployment

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

---

## 🏗️ Architecture

```text
                    ┌──────────────────────┐
                    │      MediQueue       │
                    │     React / Vite     │
                    └──────────┬───────────┘
                               │
                               │ REST API
                               ▼
                    ┌──────────────────────┐
                    │   Express / Node.js  │
                    │      Backend API      │
                    └──────────┬───────────┘
                               │
                               │ Mongoose
                               ▼
                    ┌──────────────────────┐
                    │    MongoDB Atlas      │
                    │      Database         │
                    └──────────────────────┘
```

---

## 🔌 Main API Routes

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

### Doctors

```text
GET /api/doctors
GET /api/doctors/:id
GET /api/doctors/dashboard
```

### Departments

```text
GET /api/departments
```

### Appointments

```text
POST /api/appointments
GET /api/appointments/my
GET /api/appointments/ticket/:ticketNumber
PATCH /api/appointments/:appointmentId/cancel
PATCH /api/appointments/:appointmentId/check-in
PATCH /api/appointments/:appointmentId/start
PATCH /api/appointments/:appointmentId/complete
PATCH /api/appointments/:appointmentId/no-show
```

---

## 📊 Appointment Statuses

| Status | Meaning |
|---|---|
| `booked` | Appointment has been booked |
| `checked-in` | Patient has checked in |
| `consulting` | Doctor is consulting the patient |
| `completed` | Consultation completed |
| `cancelled` | Appointment cancelled |
| `no-show` | Patient did not attend |

---

## 🛡️ Security

- JWT-based authentication
- Protected backend routes
- Role-based authorization
- Password hashing
- Environment-based secrets
- Production CORS configuration
- Protected doctor dashboard
- Authenticated appointment operations

> **Never commit `.env` files, database credentials, or JWT secrets to GitHub.**

---

## 📱 Responsive Design

MediQueue is designed for:

- Desktop
- Laptop
- Tablet
- Mobile

---

## 🚀 Deployment

### Frontend

Deployed on Vercel:

**https://medi-queue-livid.vercel.app**

### Backend

Deployed on Render:

**https://mediqueue-soaz.onrender.com**

### Database

MongoDB Atlas is used for cloud database storage.

---

## ⚙️ Local Development

### Clone

```bash
git clone https://github.com/Raj-Mayank2/MediQueue.git
cd MediQueue
```

### Backend

```bash
cd mediqueue/server
npm install
```

Create `.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
```

Run:

```bash
npm run dev
```

### Frontend

Navigate to your frontend directory:

```bash
npm install
```

Create `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Run:

```bash
npm run dev
```

---

## 🔄 Core User Workflow

### Patient

```text
Register
   ↓
Login
   ↓
Browse Doctors
   ↓
View Doctor
   ↓
Select Appointment
   ↓
Book Appointment
   ↓
Receive Ticket
   ↓
Track Appointment
```

### Doctor

```text
Login
   ↓
Doctor Dashboard
   ↓
View Today's Queue
   ↓
Check In Patient
   ↓
Start Consultation
   ↓
Complete Consultation
```

---

## 🗂️ Project Structure

```text
MediQueue/
│
└── mediqueue/
    │
    ├── server/
    │   ├── config/
    │   ├── controllers/
    │   ├── middleware/
    │   ├── models/
    │   ├── routes/
    │   ├── package.json
    │   └── server.js
    │
    └── client/
        ├── src/
        │   ├── api/
        │   ├── components/
        │   ├── context/
        │   ├── pages/
        │   └── ...
        ├── package.json
        └── vite.config.js
```

---

## 🔮 Future Improvements

- Advanced doctor scheduling
- Real-time queue updates
- Enhanced patient dashboard
- Appointment history
- Estimated waiting time
- Admin dashboard
- Receptionist dashboard
- Notifications and reminders
- Email/SMS appointment notifications
- Advanced analytics
- Automated testing
- Further production security hardening

---

## 🎯 Project Goal

MediQueue aims to provide a simple and scalable digital platform for hospital appointment and queue management.

It focuses on reducing appointment friction for patients while giving doctors a centralized interface for managing their daily consultation queue.

---

## 👨‍💻 Developer

**Mayank Raj**

**GitHub:** https://github.com/Raj-Mayank2/MediQueue

**Portfolio:** https://mayankraj12.netlify.app/

---

⭐ If you find MediQueue useful, consider starring the repository!
