const express = require("express");
const router = express.Router();
const {
  createSubmission,
  getSubmissions,
  updateSubmissionStatus,
  deleteSubmission,
} = require("../controllers/contactSubmission.controller");
const { requireAdminAuth } = require("../middleware/adminAuth.middleware");

router.get("/", requireAdminAuth, getSubmissions); // GET /api/contact?type=business|consultation|careers
router.post("/", createSubmission); // POST /api/contact
router.patch("/:id/status", requireAdminAuth, updateSubmissionStatus);
router.delete("/:id", requireAdminAuth, deleteSubmission);

module.exports = router;
