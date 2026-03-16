const ContactSubmission = require("../models/contactSubmission.model");

const createSubmission = async (req, res) => {
  try {
    const { type, fullName, phone, email, productOfInterest, projectRequirements, portfolioUrl, coverLetter } = req.body;

    if (!type || !fullName || !phone || !email) {
      return res.status(400).json({ message: "type, fullName, phone, and email are required." });
    }

    const allowed = ["business", "consultation", "careers"];
    if (!allowed.includes(type)) {
      return res.status(400).json({ message: "Invalid submission type." });
    }

    const submission = await ContactSubmission.create({
      type,
      fullName,
      phone,
      email,
      productOfInterest: productOfInterest || "",
      projectRequirements: projectRequirements || "",
      portfolioUrl: portfolioUrl || "",
      coverLetter: coverLetter || "",
    });

    return res.status(201).json(submission);
  } catch (error) {
    console.error("createSubmission error:", error.message);
    return res.status(500).json({ message: "Server error while saving submission." });
  }
};

const getSubmissions = async (req, res) => {
  try {
    const filter = {};
    if (req.query.type) filter.type = req.query.type;
    const submissions = await ContactSubmission.find(filter).sort({ createdAt: -1 });
    return res.json(submissions);
  } catch (error) {
    console.error("getSubmissions error:", error.message);
    return res.status(500).json({ message: "Server error while fetching submissions." });
  }
};

const updateSubmissionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const allowed = ["new", "read", "replied"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }
    const updated = await ContactSubmission.findByIdAndUpdate(id, { status }, { new: true });
    if (!updated) return res.status(404).json({ message: "Submission not found." });
    return res.json(updated);
  } catch (error) {
    console.error("updateSubmissionStatus error:", error.message);
    return res.status(500).json({ message: "Server error." });
  }
};

const deleteSubmission = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ContactSubmission.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Submission not found." });
    return res.json({ message: "Submission deleted." });
  } catch (error) {
    console.error("deleteSubmission error:", error.message);
    return res.status(500).json({ message: "Server error." });
  }
};

module.exports = { createSubmission, getSubmissions, updateSubmissionStatus, deleteSubmission };
