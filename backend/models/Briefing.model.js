// models/Briefing.js

import mongoose from "mongoose";

const briefingSchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    attachments: [
      {
        fileName: String,
        fileUrl: String,
      },
    ],

    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Briefing = mongoose.model("Briefing", briefingSchema);

export default Briefing;