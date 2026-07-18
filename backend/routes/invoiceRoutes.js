import express from "express";
import {
  getInvoices,
  downloadInvoice,
} from "../controllers/invoiceController.js";

import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getInvoices);

router.get("/download/:id", protect, downloadInvoice);

export default router;