const mongoose = require("mongoose");

const productContentSchema = new mongoose.Schema(
  {
    section: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    cardImage: { type: String, default: "" },
    heroImage: { type: String, default: "" },
    lineupItems: {
      type: [
        {
          title: { type: String, default: "" },
          subtitle: { type: String, default: "" },
          image: { type: String, default: "" },
        },
      ],
      default: [],
    },
    features: { type: [String], default: [] },
    description: { type: String, default: "" },
    brochureUrl: { type: String, default: "" },
    youtubeUrl: { type: String, default: "" },
    benefitsHeading: { type: String, default: "" },
    benefits: {
      type: [
        {
          title: { type: String, default: "" },
          description: { type: String, default: "" },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

productContentSchema.index({ section: 1, name: 1 }, { unique: true });

module.exports = mongoose.model("ProductContent", productContentSchema);
