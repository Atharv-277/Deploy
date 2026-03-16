const StateNetwork = require("../models/stateNetwork.model");

const sortByScreensDesc = { screens: -1, name: 1 };

const getStates = async (req, res) => {
  try {
    const states = await StateNetwork.find().sort(sortByScreensDesc);
    return res.status(200).json(states);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch states", error: error.message });
  }
};

const createState = async (req, res) => {
  try {
    const { name, screens, areas } = req.body;

    if (!name || screens === undefined) {
      return res.status(400).json({ message: "name and screens are required" });
    }

    const existing = await StateNetwork.findOne({ name: name.trim() });
    if (existing) {
      return res.status(409).json({ message: "State already exists" });
    }

    const state = await StateNetwork.create({
      name: name.trim(),
      screens,
      areas: Array.isArray(areas) ? areas : [],
    });

    return res.status(201).json(state);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create state", error: error.message });
  }
};

const updateState = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, screens, areas } = req.body;

    const state = await StateNetwork.findById(id);
    if (!state) {
      return res.status(404).json({ message: "State not found" });
    }

    if (name !== undefined) {
      state.name = name.trim();
    }

    if (screens !== undefined) {
      state.screens = screens;
    }

    if (areas !== undefined) {
      state.areas = Array.isArray(areas) ? areas : [];
    }

    await state.save();
    return res.status(200).json(state);
  } catch (error) {
    return res.status(500).json({ message: "Failed to update state", error: error.message });
  }
};

const deleteState = async (req, res) => {
  try {
    const { id } = req.params;
    const state = await StateNetwork.findByIdAndDelete(id);

    if (!state) {
      return res.status(404).json({ message: "State not found" });
    }

    return res.status(200).json({ message: "State deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete state", error: error.message });
  }
};

module.exports = {
  getStates,
  createState,
  updateState,
  deleteState,
};
