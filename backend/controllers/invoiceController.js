import Invoice from "../models/Invoice.js";
import Payment from "../models/Payment.model.js";
import Booking from "../models/Booking.model.js";
import generateInvoice from "../utils/generateInvoice.js";

// fetching All Invoices
export const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find()
      .populate("client")
      .populate("booking")
      .populate("payment")
      .sort({ createdAt: -1 });

    res.json(invoices);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Download Invoice PDF
export const downloadInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate("client")
      .populate("booking")
      .populate("payment");

    if (!invoice) {
      return res.status(404).json({
        message: "Invoice not found",
      });
    }

    generateInvoice(invoice, res);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Create Invoice (Used after successful payment)
export const createInvoice = async (paymentId) => {
  try {
    const payment = await Payment.findById(paymentId);

    if (!payment) {
      throw new Error("Payment not found");
    }

    const booking = await Booking.findById(payment.booking).populate("client");

    if (!booking) {
      throw new Error("Booking not found");
    }

    // Prevent duplicate invoice
    const existingInvoice = await Invoice.findOne({
      payment: payment._id,
    });

    if (existingInvoice) {
      return existingInvoice;
    }

    const invoice = await Invoice.create({
      invoiceNumber: `INV-${Date.now()}`,
      booking: booking._id,
      client: booking.client._id,
      payment: payment._id,
      amount: payment.amount,
      status: payment.status,
    });

    return invoice;
  } catch (error) {
    console.error("Invoice Error:", error.message);
    throw error;
  }
};