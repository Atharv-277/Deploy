const fs = require("fs");
const path = require("path");
const CampaignContent = require("../models/campaignContent.model");

const localDataDir = path.join(__dirname, "..", "data");
const localDataPath = path.join(localDataDir, "campaign-content.json");
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
    console.error("loadLocalCampaignContent error:", error.message);
    return null;
  }
};

const saveLocalContent = (content) => {
  fs.writeFileSync(localDataPath, JSON.stringify(content, null, 2), "utf8");
};

const normalizeCompletedCampaigns = (items) =>
  Array.isArray(items)
    ? items
        .map((item) => ({
          company: String(item?.company || "").trim(),
          duration: String(item?.duration || "").trim(),
          locations: String(item?.locations || "").trim(),
          stat: String(item?.stat || "").trim(),
          statLabel: String(item?.statLabel || "").trim(),
          review: String(item?.review || "").trim(),
          gradient: String(item?.gradient || "from-cyan-500 to-blue-500").trim(),
        }))
        .filter(
          (item) =>
            item.company || item.duration || item.locations || item.stat || item.statLabel || item.review
        )
    : [];

const normalizeOngoingCampaigns = (items) =>
  Array.isArray(items)
    ? items
        .map((item) => ({
          company: String(item?.company || "").trim(),
          duration: String(item?.duration || "").trim(),
          locations: String(item?.locations || "").trim(),
          stat: String(item?.stat || "").trim(),
          statLabel: String(item?.statLabel || "").trim(),
          review: String(item?.review || "").trim(),
        }))
        .filter(
          (item) =>
            item.company || item.duration || item.locations || item.stat || item.statLabel || item.review
        )
    : [];

const getCampaignContent = async (req, res) => {
  try {
    const content = await CampaignContent.findOne({ key: "default" });
    if (!content) {
      return res.json({ completedCampaigns: [], ongoingCampaigns: [] });
    }
    return res.json(content);
  } catch (error) {
    console.error("getCampaignContent error:", error.message);
    if (isDatabaseUnavailable(error)) {
      const local = loadLocalContent();
      return res.json(local || { completedCampaigns: [], ongoingCampaigns: [] });
    }
    return res.status(500).json({ message: "Server error while fetching campaign content." });
  }
};

const upsertCampaignContent = async (req, res) => {
  try {
    const payload = {
      key: "default",
      completedCampaigns: normalizeCompletedCampaigns(req.body?.completedCampaigns),
      ongoingCampaigns: normalizeOngoingCampaigns(req.body?.ongoingCampaigns),
    };

    try {
      const updated = await CampaignContent.findOneAndUpdate({ key: "default" }, payload, {
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
        _id: existing._id || "local-default-campaign-content",
        ...payload,
        createdAt: existing.createdAt || now,
        updatedAt: now,
      };
      saveLocalContent(fallbackRecord);
      return res.json(fallbackRecord);
    }
  } catch (error) {
    console.error("upsertCampaignContent error:", error.message);
    return res.status(500).json({ message: "Server error while saving campaign content." });
  }
};

module.exports = {
  getCampaignContent,
  upsertCampaignContent,
};
