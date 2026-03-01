// controllers/supportController.js

import SupportTicket from "../models/SupportTicket.model.js";

// Create Ticket
export const createTicket = async (req, res) => {
  try {
    const ticket = await SupportTicket.create(req.body);
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Tickets
export const getTickets = async (req, res) => {
  try {
    const tickets = await SupportTicket.find()
      .populate("client")
      .populate("assignedTo", "name email");

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Ticket
export const updateTicket = async (req, res) => {
  try {
    const ticket = await SupportTicket.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};