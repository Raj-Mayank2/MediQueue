import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import connectDB from "./config/db.js";

import User from "./models/User.js";
import Department from "./models/Department.js";
import Doctor from "./models/Doctor.js";
import Schedule from "./models/Schedule.js";


dotenv.config();


/*
=========================================
HELPERS
=========================================
*/


const formatDate = (date) => {

  const year =
    date.getFullYear();


  const month =
    String(
      date.getMonth() + 1
    ).padStart(2, "0");


  const day =
    String(
      date.getDate()
    ).padStart(2, "0");


  return `${year}-${month}-${day}`;

};


const convertTo24Hour = (
  value
) => {

  const [
    time,
    period,
  ] =
    value
      .trim()
      .split(" ");


  let [
    hours,
    minutes,
  ] =
    time
      .split(":")
      .map(Number);


  if (
    period === "PM" &&
    hours !== 12
  ) {

    hours += 12;

  }


  if (
    period === "AM" &&
    hours === 12
  ) {

    hours = 0;

  }


  return `${String(hours).padStart(
    2,
    "0"
  )}:${String(minutes).padStart(
    2,
    "0"
  )}`;

};


const convertWorkingHoursToSessions = (
  workingHours
) => {

  const sessions = [];


  if (
    workingHours?.morning
  ) {

    const [
      morningStart,
      morningEnd,
    ] =
      workingHours.morning.split(
        " - "
      );


    sessions.push({

      startTime:
        convertTo24Hour(
          morningStart
        ),

      endTime:
        convertTo24Hour(
          morningEnd
        ),

    });

  }


  if (
    workingHours?.evening
  ) {

    const [
      eveningStart,
      eveningEnd,
    ] =
      workingHours.evening.split(
        " - "
      );


    sessions.push({

      startTime:
        convertTo24Hour(
          eveningStart
        ),

      endTime:
        convertTo24Hour(
          eveningEnd
        ),

    });

  }


  return sessions;

};


/*
=========================================
CREATE DOCTOR USER
=========================================
*/

const createDoctorUser = async ({
  name,
  email,
}) => {

  const password =
    "Doctor@123";


  const hashedPassword =
    await bcrypt.hash(
      password,
      10
    );


  return User.create({

    name,

    email,

    phone: "",

    password:
      hashedPassword,

    role: "doctor",

    isActive: true,

  });

};


/*
=========================================
SEED DATABASE
=========================================
*/

const seedDatabase =
  async () => {

    try {

      console.log(
        "\n🌱 Starting MediQueue database seed...\n"
      );


      /*
      =====================================
      CONNECT DATABASE
      =====================================
      */

      await connectDB();


      /*
      =====================================
      CLEAR EXISTING DATA
      =====================================
      */

      console.log(
        "🧹 Clearing existing data..."
      );


      /*
      IMPORTANT:
      Delete appointments first if
      they reference doctors/users.
      */

      const Appointment =
        (
          await import(
            "./models/Appointment.js"
          )
        ).default;


      await Appointment.deleteMany({});

      await Schedule.deleteMany({});

      await Doctor.deleteMany({});

      await User.deleteMany({

        role: {
          $in: [
            "doctor",
          ],
        },

      });

      await Department.deleteMany({});


      console.log(
        "✓ Existing doctor data cleared\n"
      );


      /*
      =====================================
      DEPARTMENTS
      =====================================
      */

      console.log(
        "🏥 Creating departments..."
      );


      const departments =
        await Department.insertMany([

          {

            name:
              "Cardiology",

            description:
              "Diagnosis and treatment of heart and cardiovascular conditions.",

            status:
              "active",

          },


          {

            name:
              "Dermatology",

            description:
              "Medical care for skin, hair and nail conditions.",

            status:
              "active",

          },


          {

            name:
              "Neurology",

            description:
              "Diagnosis and treatment of nervous system disorders.",

            status:
              "active",

          },


          {

            name:
              "Orthopedics",

            description:
              "Treatment of bones, joints, muscles and movement-related conditions.",

            status:
              "active",

          },

        ]);


      console.log(
        `✓ ${departments.length} departments created`
      );


      /*
      =====================================
      DEPARTMENT MAP
      =====================================
      */

      const departmentMap =
        Object.fromEntries(

          departments.map(
            (department) => [

              department.name,

              department._id,

            ]
          )

        );


      /*
      =====================================
      CREATE DOCTOR USERS
      =====================================
      */

      console.log(
        "\n👤 Creating doctor accounts..."
      );


      const doctorUsers =
        await Promise.all([

          createDoctorUser({

            name:
              "Dr. Rahul Sharma",

            email:
              "rahul@mediqueue.com",

          }),


          createDoctorUser({

            name:
              "Dr. Priya Singh",

            email:
              "priya@mediqueue.com",

          }),


          createDoctorUser({

            name:
              "Dr. Amit Kumar",

            email:
              "amit@mediqueue.com",

          }),


          createDoctorUser({

            name:
              "Dr. Neha Verma",

            email:
              "neha@mediqueue.com",

          }),

        ]);


      console.log(
        `✓ ${doctorUsers.length} doctor accounts created`
      );


      /*
      =====================================
      DOCTOR USER MAP
      =====================================
      */

      const doctorUserMap =
        Object.fromEntries(

          doctorUsers.map(
            (user) => [

              user.email,

              user._id,

            ]
          )

        );


      /*
      =====================================
      DOCTORS
      =====================================
      */

      console.log(
        "\n👨‍⚕️ Creating doctors..."
      );


      const doctors =
        await Doctor.insertMany([

          /*
          ===============================
          DR RAHUL
          ===============================
          */

          {

            user:
              doctorUserMap[
                "rahul@mediqueue.com"
              ],

            name:
              "Dr. Rahul Sharma",

            specialty:
              "Cardiologist",

            department:
              departmentMap.Cardiology,

            qualification:
              "MBBS, MD (Cardiology)",

            experience:
              12,

            rating:
              4.8,

            reviews:
              124,

            consultationFee:
              700,

            consultationDuration:
              20,

            initials:
              "RS",

            about:
              "Dr. Rahul Sharma is an experienced cardiologist specializing in preventive cardiology, heart disease management and cardiovascular health. He focuses on providing personalized treatment plans for every patient.",

            languages: [
              "English",
              "Hindi",
            ],

            workingDays: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],

            workingHours: {

              morning:
                "09:00 AM - 01:00 PM",

              evening:
                "04:00 PM - 08:00 PM",

            },

            status:
              "active",

          },


          /*
          ===============================
          DR PRIYA
          ===============================
          */

          {

            user:
              doctorUserMap[
                "priya@mediqueue.com"
              ],

            name:
              "Dr. Priya Singh",

            specialty:
              "Dermatologist",

            department:
              departmentMap.Dermatology,

            qualification:
              "MBBS, MD (Dermatology)",

            experience:
              9,

            rating:
              4.9,

            reviews:
              98,

            consultationFee:
              600,

            consultationDuration:
              20,

            initials:
              "PS",

            about:
              "Dr. Priya Singh specializes in clinical dermatology, skin conditions and cosmetic dermatological care. She believes in evidence-based treatment and personalized patient care.",

            languages: [
              "English",
              "Hindi",
            ],

            workingDays: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
            ],

            workingHours: {

              morning:
                "10:00 AM - 01:00 PM",

              evening:
                "04:00 PM - 07:00 PM",

            },

            status:
              "active",

          },


          /*
          ===============================
          DR AMIT
          ===============================
          */

          {

            user:
              doctorUserMap[
                "amit@mediqueue.com"
              ],

            name:
              "Dr. Amit Kumar",

            specialty:
              "Neurologist",

            department:
              departmentMap.Neurology,

            qualification:
              "MBBS, DM (Neurology)",

            experience:
              15,

            rating:
              4.7,

            reviews:
              156,

            consultationFee:
              800,

            consultationDuration:
              20,

            initials:
              "AK",

            about:
              "Dr. Amit Kumar provides comprehensive neurological care with a focus on headache disorders, stroke prevention and nervous system conditions.",

            languages: [
              "English",
              "Hindi",
            ],

            workingDays: [
              "Monday",
              "Wednesday",
              "Friday",
              "Saturday",
            ],

            workingHours: {

              morning:
                "09:00 AM - 01:00 PM",

              evening:
                "04:00 PM - 07:00 PM",

            },

            status:
              "active",

          },


          /*
          ===============================
          DR NEHA
          ===============================
          */

          {

            user:
              doctorUserMap[
                "neha@mediqueue.com"
              ],

            name:
              "Dr. Neha Verma",

            specialty:
              "Orthopedic Surgeon",

            department:
              departmentMap.Orthopedics,

            qualification:
              "MBBS, MS (Orthopedics)",

            experience:
              11,

            rating:
              4.8,

            reviews:
              87,

            consultationFee:
              750,

            consultationDuration:
              20,

            initials:
              "NV",

            about:
              "Dr. Neha Verma specializes in orthopedic conditions, joint health and musculoskeletal care. Her approach focuses on restoring mobility and improving quality of life.",

            languages: [
              "English",
              "Hindi",
            ],

            workingDays: [
              "Monday",
              "Tuesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],

            workingHours: {

              morning:
                "09:00 AM - 12:00 PM",

              evening:
                "04:00 PM - 08:00 PM",

            },

            status:
              "active",

          },

        ]);


      console.log(
        `✓ ${doctors.length} doctors created`
      );


      /*
      =====================================
      CREATE SCHEDULES
      =====================================
      */

      console.log(
        "\n📅 Creating doctor schedules..."
      );


      const schedules = [];


      const dayNames = [

        "Sunday",

        "Monday",

        "Tuesday",

        "Wednesday",

        "Thursday",

        "Friday",

        "Saturday",

      ];


      /*
      Generate schedules for
      the next 30 days.
      */

      for (
        let i = 0;

        i < 30;

        i++
      ) {

        const date =
          new Date();


        date.setHours(
          0,
          0,
          0,
          0
        );


        date.setDate(
          date.getDate() + i
        );


        const dateString =
          formatDate(
            date
          );


        const dayName =
          dayNames[
            date.getDay()
          ];


        /*
        ===================================
        CHECK EVERY DOCTOR
        ===================================
        */

        for (
          const doctor of doctors
        ) {

          /*
          =================================
          SKIP NON-WORKING DAYS
          =================================
          */

          if (
            !doctor.workingDays.includes(
              dayName
            )
          ) {

            continue;

          }


          /*
          =================================
          CONVERT WORKING HOURS
          =================================
          */

          const sessions =
            convertWorkingHoursToSessions(
              doctor.workingHours
            );


          if (
            sessions.length === 0
          ) {

            continue;

          }


          schedules.push({

            doctor:
              doctor._id,

            date:
              dateString,

            sessions,

            slotDuration:
              doctor.consultationDuration,

            status:
              "active",

          });

        }

      }


      if (
        schedules.length > 0
      ) {

        await Schedule.insertMany(
          schedules
        );

      }


      console.log(
        `✓ ${schedules.length} schedules created`
      );


      /*
      =====================================
      SUMMARY
      =====================================
      */

      console.log(
        "\n========================================"
      );


      console.log(
        "🎉 DATABASE SEED COMPLETED"
      );


      console.log(
        "========================================"
      );


      console.log(
        `Departments : ${departments.length}`
      );


      console.log(
        `Doctors     : ${doctors.length}`
      );


      console.log(
        `Schedules   : ${schedules.length}`
      );


      console.log(
        "\nDoctor Login Credentials:"
      );


      console.log(
        "Email: rahul@mediqueue.com"
      );

      console.log(
        "Email: priya@mediqueue.com"
      );

      console.log(
        "Email: amit@mediqueue.com"
      );

      console.log(
        "Email: neha@mediqueue.com"
      );


      console.log(
        "Password: Doctor@123"
      );


      console.log(
        "========================================\n"
      );


      process.exit(0);

    } catch (error) {

      console.error(
        "\n❌ Database seed failed:"
      );


      console.error(
        error
      );


      process.exit(1);

    }

  };


/*
=========================================
RUN
=========================================
*/

seedDatabase();