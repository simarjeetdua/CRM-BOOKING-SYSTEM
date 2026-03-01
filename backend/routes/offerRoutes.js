// routes/offerRoutes.js

import express from "express";
import {
  createOffer,
  getOffers,
  updateOffer,
} from "../controllers/offerController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createOffer);
router.get("/", protect, getOffers);
router.put("/:id", protect, updateOffer);

export default router;