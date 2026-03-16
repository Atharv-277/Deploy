const express = require("express");

const { loginAdmin, verifyAdminSession } = require("../controllers/adminAuth.controller");
const { requireAdminAuth } = require("../middleware/adminAuth.middleware");

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/verify", requireAdminAuth, verifyAdminSession);

module.exports = router;