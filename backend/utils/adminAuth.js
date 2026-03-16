const crypto = require("crypto");

const DEFAULT_ADMIN_PASSWORD = "101976";
const DEFAULT_TOKEN_TTL_MS = 8 * 60 * 60 * 1000;

const getAdminPassword = () => process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD;
const getAdminTokenSecret = () => process.env.ADMIN_TOKEN_SECRET || `${getAdminPassword()}-token-secret`;
const getTokenTtlMs = () => {
  const parsed = Number(process.env.ADMIN_TOKEN_TTL_MS);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_TOKEN_TTL_MS;
};

const safeCompare = (left, right) => {
  const leftBuffer = Buffer.from(String(left));
  const rightBuffer = Buffer.from(String(right));

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
};

const signPayload = (encodedPayload) =>
  crypto.createHmac("sha256", getAdminTokenSecret()).update(encodedPayload).digest("base64url");

const createAdminToken = () => {
  const payload = {
    role: "admin",
    exp: Date.now() + getTokenTtlMs(),
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = signPayload(encodedPayload);

  return `${encodedPayload}.${signature}`;
};

const verifyAdminToken = (token) => {
  if (!token || typeof token !== "string") {
    return null;
  }

  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = signPayload(encodedPayload);
  if (!safeCompare(signature, expectedSignature)) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8"));
    if (payload?.role !== "admin" || !payload?.exp || payload.exp < Date.now()) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
};

module.exports = {
  createAdminToken,
  getTokenTtlMs,
  getAdminPassword,
  safeCompare,
  verifyAdminToken,
};