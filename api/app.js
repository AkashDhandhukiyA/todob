const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const todoRouter = require("../router/todorouter");

const app = express();

// MongoDB URL
const url_path =
  "mongodb+srv://root:root@todoo.wb1jnon.mongodb.net/todo?appName=todoo";

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://todo-ten-sigma-34.vercel.app/"
    ],
    credentials: true,
  })
);

// MongoDB connection (prevent multiple connections)
let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(url_path);
  isConnected = true;
  console.log("MongoDB connected");
}

// Ensure DB connected before every request
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Routes
app.use("/api", todoRouter);

// ❌ NO app.listen()
// ✅ EXPORT APP
module.exports = app;
