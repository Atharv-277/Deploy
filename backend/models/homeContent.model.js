const mongoose = require("mongoose");

const homeContentSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, default: "default" },
    newsItems: { type: [String], default: [] },
    heroTitlePrimary: { type: String, default: "" },
    heroTitleAccent: { type: String, default: "" },
    heroDescription: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("HomeContent", homeContentSchema);
