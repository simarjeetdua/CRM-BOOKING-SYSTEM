// routes/briefingRoutes.js

import express from "express";
import {
  createBriefing,
  getBriefings,
  updateBriefing,
} from "../controllers/briefingController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createBriefing);
router.get("/", protect, getBriefings);
router.put("/:id", protect, updateBriefing);

export default router;