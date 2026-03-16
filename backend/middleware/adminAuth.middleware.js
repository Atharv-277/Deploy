const { verifyAdminToken } = require("../utils/adminAuth");

const getBearerToken = (authHeader = "") => {
  if (!authHeader.startsWith("Bearer ")) {
    return null;
  }

  return authHeader.slice(7).trim() || null;
};

const requireAdminAuth = (req, res, next) => {
  const token = getBearerToken(req.headers.authorization);
  const payload = verifyAdminToken(token);

  if (!payload) {
    return res.status(401).json({ message: "Admin authentication required." });
  }

  req.adminAuth = payload;
  return next();
};

module.exports = {
  requireAdminAuth,
};