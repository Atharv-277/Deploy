require("dotenv").config();

const mongoose = require("mongoose");

const testConnection = async () => {
  const { MONGO_URI } = process.env;

  if (!MONGO_URI) {
    console.error("MONGO_URI is missing in .env");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connection test passed.");
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("MongoDB connection test failed:", error.message);
    process.exit(1);
  }
};

testConnection();
