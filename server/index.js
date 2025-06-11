import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./db.js";
import Birthday from "./models/Birthday.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Routes
app.get("/get-birthdays", async (req, res) => {
  try {
    const birthdays = await Birthday.find({});
    res.status(200).json(birthdays);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch birthdays" });
  }
});

app.post("/add-birthday", async (req, res) => {
  const { name, day, month } = req.body;
  if (!name || !day || !month) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const newBirthday = new Birthday({ name, day, month });
    await newBirthday.save();
    res.status(201).json({ message: "Birthday added", birthday: newBirthday });
  } catch (err) {
    res.status(500).json({ error: "Failed to add birthday" });
  }
});

// Connect to DB first, then start server
connectDB()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ Failed to connect to DB", err);
    process.exit(1); // Don't start server if DB fails
  });