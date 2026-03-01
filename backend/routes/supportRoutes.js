// routes/supportRoutes.js

import express from "express";
import {
  createTicket,
  getTickets,
  updateTicket,
} from "../controllers/supportController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createTicket);
router.get("/", protect, getTickets);
router.put("/:id", protect, updateTicket);

export default router;