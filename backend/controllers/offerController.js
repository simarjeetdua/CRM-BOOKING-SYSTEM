// controllers/offerController.js

import Offer from "../models/Offer.model.js";

// Create Offer
export const createOffer = async (req, res) => {
  try {
    const { items, discount = 0, tax = 0 } = req.body;

    const subtotal = items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );

    const totalAmount = subtotal - discount + tax;

    const offer = await Offer.create({
      ...req.body,
      subtotal,
      totalAmount,
    });

    res.status(201).json(offer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Offers
export const getOffers = async (req, res) => {
  try {
    const offers = await Offer.find().populate("client");
    res.json(offers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Offer Status
export const updateOffer = async (req, res) => {
  try {
    const offer = await Offer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(offer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};