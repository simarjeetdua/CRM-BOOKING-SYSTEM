// models/Booking.js

import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },

    serviceTitle: {
      type: String,
      required: true,
    },

    bookingDate: {
      type: Date,
      required: true,
    },

    eventDate: {
      type: Date,
    },

    status: {
      type: String,
      enum: ["Inquiry", "Confirmed", "Completed", "Cancelled"],
      default: "Inquiry",
    },

    totalAmount: {
      type: Number,
      default: 0,
    },

    notes: {
      type: String,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;