import Payment from "../models/Payment.model.js";
import Booking from "../models/Booking.model.js";
import razorpay from "../config/razorpay.js";
import crypto from "crypto";

/* ==========================================
   CREATE RAZORPAY ORDER
========================================== */

export const createOrder = async (req, res) => {
  try {
    const { booking, amount } = req.body;

    if (!booking || !amount) {
      return res.status(400).json({
        success: false,
        message: "Booking and amount are required",
      });
    }

    const bookingData = await Booking.findById(booking);

    if (!bookingData) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    const options = {
      amount: Number(amount) * 100, // Convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    const payment = await Payment.create({
      booking,
      amount,
      orderId: order.id,
      status: "Pending",
    });

    return res.status(201).json({
      success: true,
      key: process.env.RAZORPAY_KEY_ID,
      order,
      payment,
    });

  } catch (error) {
    console.error("Create Order Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==========================================
   VERIFY PAYMENT
========================================== */

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }

    const payment = await Payment.findOne({
      orderId: razorpay_order_id,
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment record not found",
      });
    }

    payment.paymentId = razorpay_payment_id;
    payment.signature = razorpay_signature;
    payment.status = "Paid";
    payment.paymentDate = new Date();

    await payment.save();

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      payment,
    });

  } catch (error) {
    console.error("Verify Payment Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==========================================
   GET ALL PAYMENTS
========================================== */

export const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("booking")
      .sort({ createdAt: -1 });

    return res.status(200).json(payments);

  } catch (error) {
    console.error("Get Payments Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};