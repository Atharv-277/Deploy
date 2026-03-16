const mongoose = require("mongoose");

const installationItemSchema = new mongoose.Schema(
  {
    clientName: { type: String, default: "" },
    opted: { type: String, default: "" },
    quantity: { type: String, default: "" },
    reviews: { type: [String], default: [] },
  },
  { _id: false }
);

const installationContentSchema = new mongoose.Schema(
  {
    category: { type: String, required: true, trim: true, unique: true },
    clientName: { type: String, default: "" },
    opted: { type: String, default: "" },
    quantity: { type: String, default: "" },
    reviews: { type: [String], default: [] },
    clientInstallations: { type: [installationItemSchema], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("InstallationContent", installationContentSchema);
