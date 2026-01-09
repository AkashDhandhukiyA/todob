require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const todoRouter = require("../router/todorouter");

const app = express();

/* -------------------- MIDDLEWARE -------------------- */
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

/* -------------------- MONGODB CONNECTION (SERVERLESS SAFE) -------------------- */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGO_URL, {
        bufferCommands: false,
      })
      .then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

/* -------------------- DB CONNECT PER REQUEST -------------------- */
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    res.status(500).json({
      success: false,
      message: "Database connection failed",
      error: error.message,
    });
  }
});

/* -------------------- ROUTES -------------------- */
app.get("/", (req, res) => {
  res.json({ success: true, message: "Todo API running 🚀" });
});

app.use("/api", todoRouter);

/* -------------------- EXPORT (NO app.listen) -------------------- */
module.exports = app;
