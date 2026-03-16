const express = require("express");
const {
  getStates,
  createState,
  updateState,
  deleteState,
} = require("../controllers/stateNetwork.controller");
const { requireAdminAuth } = require("../middleware/adminAuth.middleware");

const router = express.Router();

router.get("/states", getStates);
router.post("/states", requireAdminAuth, createState);
router.put("/states/:id", requireAdminAuth, updateState);
router.delete("/states/:id", requireAdminAuth, deleteState);

module.exports = router;
