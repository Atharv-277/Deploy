const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema(
  {
    stateName: { type: String, required: true, trim: true },
    cityName: { type: String, trim: true, default: "" },
    companyName: { type: String, required: true, trim: true },
    industry: { type: String, required: true, trim: true },
    contactPerson: { type: String, required: true, trim: true },
    designation: { type: String, trim: true, default: "" },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    screenType: { type: String, trim: true, default: "" },
    duration: { type: String, trim: true, default: "" },
    budget: { type: String, trim: true, default: "" },
    locations: { type: String, trim: true, default: "" },
    message: { type: String, trim: true, default: "" },
    status: {
      type: String,
      enum: ["new", "contacted", "closed"],
      default: "new",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Enquiry", enquirySchema);
