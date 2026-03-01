// routes/paymentRoutes.js

import express from "express";
import {
  generatePaymentLink,
  updatePaymentStatus,
  getPayments,
} from "../controllers/paymentController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/generate", protect, generatePaymentLink);
router.get("/", protect, getPayments);
router.put("/:id", protect, updatePaymentStatus);

export default router;