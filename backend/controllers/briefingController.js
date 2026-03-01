// controllers/briefingController.js

import Briefing from "../models/Briefing.model.js";

// Create Briefing
export const createBriefing = async (req, res) => {
  try {
    const briefing = await Briefing.create(req.body);
    res.status(201).json(briefing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Briefings
export const getBriefings = async (req, res) => {
  try {
    const briefings = await Briefing.find()
      .populate("booking")
      .populate("assignedTo", "name email");

    res.json(briefings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Briefing
export const updateBriefing = async (req, res) => {
  try {
    const briefing = await Briefing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(briefing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};