const mongoose = require("mongoose");

const areaSchema = new mongoose.Schema(
  {
    city: {
      type: String,
      required: true,
      trim: true,
    },
    screens: {
      type: Number,
      required: true,
      min: 0,
    },
    locations: {
      type: [String],
      default: [],
    },
  },
  { _id: false }
);

const stateNetworkSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    screens: {
      type: Number,
      required: true,
      min: 0,
    },
    areas: {
      type: [areaSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("StateNetwork", stateNetworkSchema);
