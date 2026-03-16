const fs = require("fs");
const path = require("path");
const multer = require("multer");
const ProductContent = require("../models/productContent.model");

const uploadsDir = path.join(__dirname, "..", "uploads", "product-assets");
const localDataDir = path.join(__dirname, "..", "data");
const localDataPath = path.join(localDataDir, "product-content.json");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
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
    console.error("loadLocalContent error:", error.message);
    return [];
  }
};

const saveLocalContent = (items) => {
  fs.writeFileSync(localDataPath, JSON.stringify(items, null, 2), "utf8");
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname || "").toLowerCase();
    const base = path
      .basename(file.originalname || "file", ext)
      .replace(/[^a-zA-Z0-9-_]/g, "-")
      .slice(0, 60);
    cb(null, `${Date.now()}-${base}${ext}`);
  },
});

const imageUpload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed."));
    }
    cb(null, true);
  },
});

const brochureUpload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed."));
    }
    cb(null, true);
  },
});

const buildPublicUrl = (req, fileName) =>
  `${req.protocol}://${req.get("host")}/uploads/product-assets/${fileName}`;

const getAllProductContent = async (req, res) => {
  try {
    const items = await ProductContent.find().sort({ section: 1, name: 1 });
    return res.json(items);
  } catch (error) {
    console.error("getAllProductContent error:", error.message);
    if (isDatabaseUnavailable(error)) {
      const items = loadLocalContent().sort((a, b) =>
        `${a.section}|${a.name}`.localeCompare(`${b.section}|${b.name}`)
      );
      return res.json(items);
    }
    return res.status(500).json({ message: "Server error while fetching product content." });
  }
};

const upsertProductContent = async (req, res) => {
  try {
    const {
      section,
      name,
      cardImage,
      heroImage,
      lineupItems,
      features,
      description,
      brochureUrl,
      youtubeUrl,
      benefitsHeading,
      benefits,
    } = req.body;

    if (!section || !name) {
      return res.status(400).json({ message: "section and name are required." });
    }

    const payload = {
      section: String(section).trim(),
      name: String(name).trim(),
      cardImage: cardImage || "",
      heroImage: heroImage || "",
      lineupItems: Array.isArray(lineupItems)
        ? lineupItems.map((item) => ({
            title: String(item?.title || "").trim(),
            subtitle: String(item?.subtitle || "").trim(),
            image: String(item?.image || "").trim(),
          }))
        : [],
      features: Array.isArray(features)
        ? features.map((f) => String(f).trim()).filter(Boolean)
        : [],
      description: description || "",
      brochureUrl: brochureUrl || "",
      youtubeUrl: youtubeUrl || "",
      benefitsHeading: String(benefitsHeading || "").trim(),
      benefits: Array.isArray(benefits)
        ? benefits.map((item) => ({
            title: String(item?.title || "").trim(),
            description: String(item?.description || "").trim(),
          }))
        : [],
    };

    try {
      const updated = await ProductContent.findOneAndUpdate(
        { section: payload.section, name: payload.name },
        payload,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      return res.json(updated);
    } catch (dbError) {
      if (!isDatabaseUnavailable(dbError)) {
        throw dbError;
      }

      const existing = loadLocalContent();
      const index = existing.findIndex(
        (item) => item.section === payload.section && item.name === payload.name
      );

      const now = new Date().toISOString();
      const fallbackRecord = {
        _id:
          index >= 0
            ? existing[index]._id || `local-${payload.section}-${payload.name}`
            : `local-${payload.section}-${payload.name}`,
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
    console.error("upsertProductContent error:", error.message);
    return res.status(500).json({ message: "Server error while saving product content." });
  }
};

const uploadImage = [
  imageUpload.single("file"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No image file uploaded." });
      }
      return res.json({ url: buildPublicUrl(req, req.file.filename) });
    } catch (error) {
      console.error("uploadImage error:", error.message);
      return res.status(500).json({ message: "Server error while uploading image." });
    }
  },
];

const uploadBrochure = [
  brochureUpload.single("file"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No brochure file uploaded." });
      }
      return res.json({ url: buildPublicUrl(req, req.file.filename) });
    } catch (error) {
      console.error("uploadBrochure error:", error.message);
      return res.status(500).json({ message: "Server error while uploading brochure." });
    }
  },
];

module.exports = {
  getAllProductContent,
  upsertProductContent,
  uploadImage,
  uploadBrochure,
};
