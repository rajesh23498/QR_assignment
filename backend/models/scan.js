// const mongoose = require("mongoose");
import mongoose from "mongoose";

const scanSchema = new mongoose.Schema({
  ip: String,
  userAgent: String,
  timestamp: { type: Date, default: Date.now },
  duration: Number,
});

export const  Scan = mongoose.model("Scan", scanSchema);
