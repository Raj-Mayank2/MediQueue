const doctors = [
  {
    id: 1,
    name: "Dr. Rahul Sharma",
    specialty: "Cardiologist",
    department: "Cardiology",
    qualification: "MBBS, MD (Cardiology)",
    experience: 12,
    rating: 4.8,
    reviews: 124,
    fee: 700,
    availability: "Available today",
    nextSlot: "10:40 AM",
    initials: "RS",

    about:
      "Dr. Rahul Sharma is an experienced cardiologist specializing in preventive cardiology, heart disease management and cardiovascular health. He focuses on providing personalized treatment plans for every patient.",

    languages: [
      "English",
      "Hindi",
    ],

    consultationDuration: 20,

    workingDays: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],

    workingHours: {
      morning: "09:00 AM - 01:00 PM",
      evening: "04:00 PM - 08:00 PM",
    },

    slots: [
      "09:00 AM",
      "09:20 AM",
      "09:40 AM",
      "10:00 AM",
      "10:20 AM",
      "10:40 AM",
      "11:00 AM",
      "11:20 AM",
      "11:40 AM",
    ],
  },

  {
    id: 2,
    name: "Dr. Priya Singh",
    specialty: "Dermatologist",
    department: "Dermatology",
    qualification: "MBBS, MD (Dermatology)",
    experience: 9,
    rating: 4.9,
    reviews: 98,
    fee: 600,
    availability: "Available today",
    nextSlot: "11:20 AM",
    initials: "PS",

    about:
      "Dr. Priya Singh specializes in clinical dermatology, skin conditions and cosmetic dermatological care. She believes in evidence-based treatment and personalized patient care.",

    languages: [
      "English",
      "Hindi",
    ],

    consultationDuration: 20,

    workingDays: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
    ],

    workingHours: {
      morning: "10:00 AM - 01:00 PM",
      evening: "04:00 PM - 07:00 PM",
    },

    slots: [
      "10:00 AM",
      "10:20 AM",
      "10:40 AM",
      "11:00 AM",
      "11:20 AM",
      "11:40 AM",
    ],
  },

  {
    id: 3,
    name: "Dr. Amit Kumar",
    specialty: "Neurologist",
    department: "Neurology",
    qualification: "MBBS, DM (Neurology)",
    experience: 15,
    rating: 4.7,
    reviews: 156,
    fee: 800,
    availability: "Available tomorrow",
    nextSlot: "09:40 AM",
    initials: "AK",

    about:
      "Dr. Amit Kumar provides comprehensive neurological care with a focus on headache disorders, stroke prevention and nervous system conditions.",

    languages: [
      "English",
      "Hindi",
    ],

    consultationDuration: 20,

    workingDays: [
      "Monday",
      "Wednesday",
      "Friday",
      "Saturday",
    ],

    workingHours: {
      morning: "09:00 AM - 01:00 PM",
      evening: "04:00 PM - 07:00 PM",
    },

    slots: [
      "09:00 AM",
      "09:20 AM",
      "09:40 AM",
      "10:00 AM",
      "10:20 AM",
      "10:40 AM",
    ],
  },

  {
    id: 4,
    name: "Dr. Neha Verma",
    specialty: "Orthopedic Surgeon",
    department: "Orthopedics",
    qualification: "MBBS, MS (Orthopedics)",
    experience: 11,
    rating: 4.8,
    reviews: 87,
    fee: 750,
    availability: "Available today",
    nextSlot: "04:20 PM",
    initials: "NV",

    about:
      "Dr. Neha Verma specializes in orthopedic conditions, joint health and musculoskeletal care. Her approach focuses on restoring mobility and improving quality of life.",

    languages: [
      "English",
      "Hindi",
    ],

    consultationDuration: 20,

    workingDays: [
      "Monday",
      "Tuesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],

    workingHours: {
      morning: "09:00 AM - 12:00 PM",
      evening: "04:00 PM - 08:00 PM",
    },

    slots: [
      "04:00 PM",
      "04:20 PM",
      "04:40 PM",
      "05:00 PM",
      "05:20 PM",
      "05:40 PM",
    ],
  },
];

export default doctors;