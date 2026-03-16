const express = require("express");
const router = express.Router();
const {
  getInstallationContent,
  upsertInstallationContent,
} = require("../controllers/installationContent.controller");
const { requireAdminAuth } = require("../middleware/adminAuth.middleware");

router.get("/", getInstallationContent);
router.put("/", requireAdminAuth, upsertInstallationContent);

module.exports = router;
