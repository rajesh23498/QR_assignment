// const Scan = require("../models/scan");
import {Scan} from "../models/scan.js";
export const  recordScan = async (req, res) => {
  try {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const userAgent = req.get("User-Agent");

    const scan = new Scan({
      ip,
      userAgent,
      duration: Math.floor(Math.random() * 20) + 5 // dummy duration in seconds
    });

    await scan.save();
    res.status(201).json({ message: "Scan recorded", data: scan });
  } catch (error) {
    res.status(500).json({ message: "Failed to record scan", error });
  }
};

export const getStats = async (req, res) => {
  try {
    const totalScans = await Scan.countDocuments();
    const uniqueIPs = await Scan.distinct("ip");

    res.json({
      totalScans,
      uniqueUsers: uniqueIPs.length,
      dummyCampaignPerformance: {
        engagementRate: "75%",
        avgTimeSpent: "14.2s",
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching stats", error });
  }
};
