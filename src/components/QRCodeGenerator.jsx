import React, { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import axios from "axios";

const QRCodeGenerator = () => {
  const [stats, setStats] = useState(null);
  const [scanRecorded, setScanRecorded] = useState(false);

  const recordScan = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/scan");
      console.log("Scan recorded:", res.data);
      setScanRecorded(true);
      fetchStats(); // Fetch updated stats after recording
    } catch (error) {
      console.error("Error recording scan:", error);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/stats");
      setStats(res.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  // Optional: record scan when component mounts
  // useEffect(() => {
  //   recordScan();
  // }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <QRCodeCanvas value="https://your-ar-link.com" size={200} />
      {/* <button
        onClick={recordScan}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Simulate QR Scan (Send API)
      </button> */}

      {scanRecorded && stats && (
        <div className="mt-4 bg-white p-4 rounded shadow-md w-80 text-left">
          <h3 className="text-lg font-semibold mb-2">Live Stats</h3>
          <p>
            <strong>Total Scans:</strong> {stats.totalScans}
          </p>
          <p>
            <strong>Unique Users:</strong> {stats.uniqueUsers}
          </p>
          <p>
            <strong>Engagement:</strong>{" "}
            {stats.dummyCampaignPerformance.engagementRate}
          </p>
          <p>
            <strong>Avg Time Spent:</strong>{" "}
            {stats.dummyCampaignPerformance.avgTimeSpent}
          </p>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
