import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import briefingRoutes from "./routes/briefingRoutes.js";
import offerRoutes from "./routes/offerRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import supportRoutes from "./routes/supportRoutes.js";

dotenv.config();

// Connect Database FIRST
await connectDB();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://crm-booking-system.vercel.app"
    ],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "🚀 BookFlow CRM Backend Running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/briefings", briefingRoutes);
app.use("/api/offers", offerRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/support", supportRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});