const express = require("express");
const router = express.Router();
const {
  getHomeContent,
  upsertHomeContent,
} = require("../controllers/homeContent.controller");
const { requireAdminAuth } = require("../middleware/adminAuth.middleware");

router.get("/", getHomeContent);
router.put("/", requireAdminAuth, upsertHomeContent);

module.exports = router;
