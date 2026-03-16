const express = require("express");
const router = express.Router();
const {
  getAllProductContent,
  upsertProductContent,
  uploadImage,
  uploadBrochure,
} = require("../controllers/productContent.controller");
const { requireAdminAuth } = require("../middleware/adminAuth.middleware");

router.get("/", getAllProductContent);
router.put("/", requireAdminAuth, upsertProductContent);
router.post("/upload-image", requireAdminAuth, ...uploadImage);
router.post("/upload-brochure", requireAdminAuth, ...uploadBrochure);

module.exports = router;
