import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    startTime: {
      type: String,
      required: true,
      match: /^([01]\d|2[0-3]):([0-5]\d)$/,
    },

    endTime: {
      type: String,
      required: true,
      match: /^([01]\d|2[0-3]):([0-5]\d)$/,
    },
  },
  {
    _id: false,
  }
);


const scheduleSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    date: {
      type: String,
      required: true,
      match: /^\d{4}-\d{2}-\d{2}$/,
    },

    sessions: {
      type: [sessionSchema],
      default: [],
    },

    slotDuration: {
      type: Number,
      default: 20,
      min: 5,
    },

    status: {
      type: String,
      enum: [
        "active",
        "cancelled",
        "completed",
      ],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);


scheduleSchema.index(
  {
    doctor: 1,
    date: 1,
  },
  {
    unique: true,
  }
);


const Schedule = mongoose.model(
  "Schedule",
  scheduleSchema
);


export default Schedule;