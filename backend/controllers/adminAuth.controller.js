const {
  createAdminToken,
  getAdminPassword,
  getTokenTtlMs,
  safeCompare,
} = require("../utils/adminAuth");

const loginAdmin = (req, res) => {
  const submittedPassword = String(req.body?.password || "");

  if (!submittedPassword) {
    return res.status(400).json({ message: "Password is required." });
  }

  if (!safeCompare(submittedPassword, getAdminPassword())) {
    return res.status(401).json({ message: "Incorrect password." });
  }

  const ttlMs = getTokenTtlMs();
  const token = createAdminToken();

  return res.status(200).json({
    token,
    expiresAt: new Date(Date.now() + ttlMs).toISOString(),
  });
};

const verifyAdminSession = (req, res) =>
  res.status(200).json({
    authenticated: true,
    expiresAt: new Date(req.adminAuth.exp).toISOString(),
  });

module.exports = {
  loginAdmin,
  verifyAdminSession,
};