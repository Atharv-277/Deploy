const mongoose = require("mongoose");

const completedCampaignSchema = new mongoose.Schema(
  {
    company: { type: String, default: "" },
    duration: { type: String, default: "" },
    locations: { type: String, default: "" },
    stat: { type: String, default: "" },
    statLabel: { type: String, default: "" },
    review: { type: String, default: "" },
    gradient: { type: String, default: "from-cyan-500 to-blue-500" },
  },
  { _id: false }
);

const ongoingCampaignSchema = new mongoose.Schema(
  {
    company: { type: String, default: "" },
    duration: { type: String, default: "" },
    locations: { type: String, default: "" },
    stat: { type: String, default: "" },
    statLabel: { type: String, default: "" },
    review: { type: String, default: "" },
  },
  { _id: false }
);

const campaignContentSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, default: "default" },
    completedCampaigns: { type: [completedCampaignSchema], default: [] },
    ongoingCampaigns: { type: [ongoingCampaignSchema], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CampaignContent", campaignContentSchema);
