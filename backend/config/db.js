const mongoose = require("mongoose");

const connectDB = async () => {
  const { MONGO_URI } = process.env;

  if (!MONGO_URI) {
    throw new Error("MONGO_URI is missing in environment variables.");
  }

  await mongoose.connect(MONGO_URI);
  console.log("MongoDB connected successfully.");
};

module.exports = connectDB;
