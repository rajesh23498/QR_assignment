import { Rect, useEffect, useState } from "react";
import axios from "axios";

const Analytics = ({ scanCount, avgTime, data }) => {
  const [datas, setDatas] = useState({});
  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/stats");
      console.log("ajksldfjlk", res.data);
      setDatas(res.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };
  useEffect(() => {
    fetchStats();
  }, []);
  return (
    <div className="mt-6 bg-white p-4 rounded shadow-md w-80 mx-auto">
      <h2 className="text-xl font-semibold mb-2">Campaign Analytics</h2>
      <p>
        <strong>Scans:</strong> {datas.totalScans}
      </p>
      <p>
        <strong>Avg. Time Spent:</strong> {data.data.duration}
      </p>
      <p>
        <strong>Location:</strong> {data.data.ip}
      </p>
      <p>
        <strong>User-agent:</strong> {data.data.userAgent}
      </p>
    </div>
  );
};

export default Analytics;
