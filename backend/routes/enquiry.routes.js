const express = require("express");
const router = express.Router();
const {
  createEnquiry,
  getEnquiries,
  getEnquiriesByState,
  updateEnquiryStatus,
  deleteEnquiry,
} = require("../controllers/enquiry.controller");
const { requireAdminAuth } = require("../middleware/adminAuth.middleware");

router.get("/", requireAdminAuth, getEnquiries);
router.get("/state/:stateName", requireAdminAuth, getEnquiriesByState);
router.post("/", createEnquiry);
router.patch("/:id/status", requireAdminAuth, updateEnquiryStatus);
router.delete("/:id", requireAdminAuth, deleteEnquiry);

module.exports = router;
