require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const stateNetworkRoutes = require("./routes/stateNetwork.routes");
const enquiryRoutes = require("./routes/enquiry.routes");
const contactRoutes = require("./routes/contactSubmission.routes");
const productContentRoutes = require("./routes/productContent.routes");
const installationContentRoutes = require("./routes/installationContent.routes");
const campaignContentRoutes = require("./routes/campaignContent.routes");
const homeContentRoutes = require("./routes/homeContent.routes");
const adminAuthRoutes = require("./routes/adminAuth.routes");
const { validateAdminAuthConfig } = require("./utils/adminAuth");

const app = express();
const PORT = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === "production";
const frontendOrigins = String(process.env.FRONTEND_URL || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

if (isProduction && frontendOrigins.length === 0) {
  throw new Error("FRONTEND_URL is required in production environment.");
}

validateAdminAuthConfig();

app.set("trust proxy", 1);

app.use(
  cors({
    origin(origin, callback) {
      // Allow non-browser and same-origin requests without an Origin header.
      if (!origin) {
        callback(null, true);
        return;
      }

      if (!isProduction && frontendOrigins.length === 0) {
        callback(null, true);
        return;
      }

      if (frontendOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Origin not allowed by CORS."));
    },
  })
);
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "Backend is running." });
});

app.use("/api/network", stateNetworkRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/product-content", productContentRoutes);
app.use("/api/installation-content", installationContentRoutes);
app.use("/api/campaign-content", campaignContentRoutes);
app.use("/api/home-content", homeContentRoutes);
app.use("/api/admin-auth", adminAuthRoutes);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
