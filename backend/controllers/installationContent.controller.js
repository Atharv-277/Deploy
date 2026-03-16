const fs = require("fs");
const path = require("path");
const InstallationContent = require("../models/installationContent.model");

const localDataDir = path.join(__dirname, "..", "data");
const localDataPath = path.join(localDataDir, "installation-content.json");
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
      return [];
    }
    const raw = fs.readFileSync(localDataPath, "utf8");
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("loadLocalInstallationContent error:", error.message);
    return [];
  }
};

const saveLocalContent = (items) => {
  fs.writeFileSync(localDataPath, JSON.stringify(items, null, 2), "utf8");
};

const getInstallationContent = async (req, res) => {
  try {
    const items = await InstallationContent.find().sort({ category: 1 });
    return res.json(items);
  } catch (error) {
    console.error("getInstallationContent error:", error.message);
    if (isDatabaseUnavailable(error)) {
      const items = loadLocalContent().sort((a, b) =>
        String(a.category || "").localeCompare(String(b.category || ""))
      );
      return res.json(items);
    }
    return res.status(500).json({ message: "Server error while fetching installation content." });
  }
};

const upsertInstallationContent = async (req, res) => {
  try {
    const { category, clientName, opted, quantity, reviews, clientInstallations } = req.body;

    if (!category) {
      return res.status(400).json({ message: "category is required." });
    }

    const normalizedInstallations = Array.isArray(clientInstallations)
      ? clientInstallations
          .map((item) => ({
            clientName: String(item?.clientName || "").trim(),
            opted: String(item?.opted || "").trim(),
            quantity: String(item?.quantity || "").trim(),
            reviews: Array.isArray(item?.reviews)
              ? item.reviews.map((review) => String(review || "").trim()).filter(Boolean)
              : [],
          }))
          .filter((item) => item.clientName || item.opted || item.quantity || item.reviews.length > 0)
      : [];

    const fallbackSingleInstallation = {
      clientName: String(clientName || "").trim(),
      opted: String(opted || "").trim(),
      quantity: String(quantity || "").trim(),
      reviews: Array.isArray(reviews)
        ? reviews.map((review) => String(review || "").trim()).filter(Boolean)
        : [],
    };

    const finalInstallations =
      normalizedInstallations.length > 0
        ? normalizedInstallations
        : fallbackSingleInstallation.clientName ||
            fallbackSingleInstallation.opted ||
            fallbackSingleInstallation.quantity ||
            fallbackSingleInstallation.reviews.length > 0
          ? [fallbackSingleInstallation]
          : [];

    const primaryInstallation =
      finalInstallations[0] || {
        clientName: "",
        opted: "",
        quantity: "",
        reviews: [],
      };

    const payload = {
      category: String(category).trim(),
      clientName: primaryInstallation.clientName,
      opted: primaryInstallation.opted,
      quantity: primaryInstallation.quantity,
      reviews: primaryInstallation.reviews,
      clientInstallations: finalInstallations,
    };

    try {
      const updated = await InstallationContent.findOneAndUpdate(
        { category: payload.category },
        payload,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      return res.json(updated);
    } catch (dbError) {
      if (!isDatabaseUnavailable(dbError)) {
        throw dbError;
      }

      const existing = loadLocalContent();
      const index = existing.findIndex((item) => item.category === payload.category);
      const now = new Date().toISOString();
      const fallbackRecord = {
        _id:
          index >= 0
            ? existing[index]._id || `local-${payload.category}`
            : `local-${payload.category}`,
        ...payload,
        createdAt: index >= 0 ? existing[index].createdAt || now : now,
        updatedAt: now,
      };

      if (index >= 0) {
        existing[index] = fallbackRecord;
      } else {
        existing.push(fallbackRecord);
      }

      saveLocalContent(existing);
      return res.json(fallbackRecord);
    }
  } catch (error) {
    console.error("upsertInstallationContent error:", error.message);
    return res.status(500).json({ message: "Server error while saving installation content." });
  }
};

module.exports = {
  getInstallationContent,
  upsertInstallationContent,
};
