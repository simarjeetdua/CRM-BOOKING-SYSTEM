// controllers/paymentController.js

import Payment from "../models/Payment.model.js";
import crypto from "crypto";

// Generate Payment Link
export const generatePaymentLink = async (req, res) => {
  try {
    const { booking, amount } = req.body;

    const uniqueId = crypto.randomBytes(8).toString("hex");

    const paymentLink = `${process.env.BASE_URL}/pay/${uniqueId}`;

    const payment = await Payment.create({
      booking,
      amount,
      paymentLink,
    });

    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Payment Status
export const updatePaymentStatus = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Payments
export const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("booking");

    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};