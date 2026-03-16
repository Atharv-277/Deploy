const Enquiry = require("../models/enquiry.model");

const createEnquiry = async (req, res) => {
  try {
    const {
      stateName,
      cityName,
      companyName,
      industry,
      contactPerson,
      designation,
      email,
      phone,
      screenType,
      duration,
      budget,
      locations,
      message,
    } = req.body;

    const required = { stateName, companyName, industry, contactPerson, email, phone };
    const missing = Object.entries(required)
      .filter(([, v]) => !v || String(v).trim() === "")
      .map(([k]) => k);

    if (missing.length > 0) {
      return res.status(400).json({ message: `Missing required fields: ${missing.join(", ")}` });
    }

    const enquiry = await Enquiry.create({
      stateName,
      cityName: cityName || "",
      companyName,
      industry,
      contactPerson,
      designation,
      email,
      phone,
      screenType,
      duration,
      budget,
      locations,
      message,
    });

    return res.status(201).json(enquiry);
  } catch (error) {
    console.error("createEnquiry error:", error.message);
    return res.status(500).json({ message: "Server error while saving enquiry." });
  }
};

const getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ stateName: 1, cityName: 1, createdAt: -1 });
    return res.json(enquiries);
  } catch (error) {
    console.error("getEnquiries error:", error.message);
    return res.status(500).json({ message: "Server error while fetching enquiries." });
  }
};

const getEnquiriesByState = async (req, res) => {
  try {
    const { stateName } = req.params;
    const enquiries = await Enquiry.find({ stateName: decodeURIComponent(stateName) }).sort({ createdAt: -1 });
    return res.json(enquiries);
  } catch (error) {
    console.error("getEnquiriesByState error:", error.message);
    return res.status(500).json({ message: "Server error while fetching enquiries." });
  }
};

const updateEnquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const allowed = ["new", "contacted", "closed"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }
    const updated = await Enquiry.findByIdAndUpdate(id, { status }, { new: true });
    if (!updated) return res.status(404).json({ message: "Enquiry not found." });
    return res.json(updated);
  } catch (error) {
    console.error("updateEnquiryStatus error:", error.message);
    return res.status(500).json({ message: "Server error." });
  }
};

const deleteEnquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Enquiry.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Enquiry not found." });
    return res.json({ message: "Enquiry deleted." });
  } catch (error) {
    console.error("deleteEnquiry error:", error.message);
    return res.status(500).json({ message: "Server error." });
  }
};

module.exports = { createEnquiry, getEnquiries, getEnquiriesByState, updateEnquiryStatus, deleteEnquiry };
