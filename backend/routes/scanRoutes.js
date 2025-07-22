// const express = require("express");
import express from "express";
const router = express.Router();
// const { recordScan, getStats } = require("../controllers/scanController");
import { recordScan, getStats } from "../controllers/scanController.js";

router.post("/scan", recordScan);
router.get("/stats", getStats);

// await axios.post("/api/scan",recordScan);
// await axios.get("/api/stats", getStats);
export default router;
