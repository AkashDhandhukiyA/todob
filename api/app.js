const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const todoRouter = require("../router/todorouter");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGO_URL);
    isConnected = true;
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Mongo error", err);
    throw err;
  }
}

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch {
    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

app.use("/api", todoRouter);

module.exports = app;
