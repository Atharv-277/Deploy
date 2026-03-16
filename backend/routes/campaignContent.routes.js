const express = require("express");
const router = express.Router();
const {
  getCampaignContent,
  upsertCampaignContent,
} = require("../controllers/campaignContent.controller");
const { requireAdminAuth } = require("../middleware/adminAuth.middleware");

router.get("/", getCampaignContent);
router.put("/", requireAdminAuth, upsertCampaignContent);

module.exports = router;
