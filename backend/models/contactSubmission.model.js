const mongoose = require("mongoose");

const contactSubmissionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["business", "consultation", "careers"],
      required: true,
    },
    fullName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    // business + consultation
    productOfInterest: { type: String, trim: true, default: "" },
    projectRequirements: { type: String, trim: true, default: "" },
    // careers
    portfolioUrl: { type: String, trim: true, default: "" },
    coverLetter: { type: String, trim: true, default: "" },
    status: {
      type: String,
      enum: ["new", "read", "replied"],
      default: "new",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ContactSubmission", contactSubmissionSchema);
