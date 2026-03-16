const fs = require("fs");
const path = require("path");
const HomeContent = require("../models/homeContent.model");

const localDataDir = path.join(__dirname, "..", "data");
const localDataPath = path.join(localDataDir, "home-content.json");
if (!fs.existsSync(localDataDir)) {
  fs.mkdirSync(localDataDir, { recursive: true });
}

const isDatabaseUnavailable = (error) => {
  const message = String(error?.message || "").toLowerCase();
  return (
    message.includes("enotfound") ||
    message.includes("server selection") ||
    message.includes("econnrefused") ||
    message.includes("timed out") ||
    message.includes("failed to connect")
  );
};

const loadLocalContent = () => {
  try {
    if (!fs.existsSync(localDataPath)) {
      return null;
    }
    const raw = fs.readFileSync(localDataPath, "utf8");
    const data = JSON.parse(raw);
    return data && typeof data === "object" ? data : null;
  } catch (error) {
    console.error("loadLocalHomeContent error:", error.message);
    return null;
  }
};

const saveLocalContent = (content) => {
  fs.writeFileSync(localDataPath, JSON.stringify(content, null, 2), "utf8");
};

const normalizeNewsItems = (items) =>
  Array.isArray(items)
    ? items.map((item) => String(item || "").trim()).filter(Boolean)
    : [];

const getHomeContent = async (req, res) => {
  try {
    const content = await HomeContent.findOne({ key: "default" });
    if (!content) {
      return res.json({ newsItems: [] });
    }
    return res.json(content);
  } catch (error) {
    console.error("getHomeContent error:", error.message);
    if (isDatabaseUnavailable(error)) {
      const local = loadLocalContent();
      return res.json(local || { newsItems: [] });
    }
    return res.status(500).json({ message: "Server error while fetching home content." });
  }
};

const upsertHomeContent = async (req, res) => {
  try {
    const payload = {
      key: "default",
      newsItems: normalizeNewsItems(req.body?.newsItems),
      heroTitlePrimary: String(req.body?.heroTitlePrimary || "").trim(),
      heroTitleAccent: String(req.body?.heroTitleAccent || "").trim(),
      heroDescription: String(req.body?.heroDescription || "").trim(),
    };

    try {
      const updated = await HomeContent.findOneAndUpdate({ key: "default" }, payload, {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      });
      return res.json(updated);
    } catch (dbError) {
      if (!isDatabaseUnavailable(dbError)) {
        throw dbError;
      }

      const existing = loadLocalContent() || {};
      const now = new Date().toISOString();
      const fallbackRecord = {
        _id: existing._id || "local-default-home-content",
        ...payload,
        createdAt: existing.createdAt || now,
        updatedAt: now,
      };
      saveLocalContent(fallbackRecord);
      return res.json(fallbackRecord);
    }
  } catch (error) {
    console.error("upsertHomeContent error:", error.message);
    return res.status(500).json({ message: "Server error while saving home content." });
  }
};

module.exports = {
  getHomeContent,
  upsertHomeContent,
};
