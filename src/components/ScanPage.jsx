// src/pages/ScanPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const ScanPage = () => {
  const [scanComplete, setScanComplete] = useState(false);

  useEffect(() => {
    const recordScan = async () => {
      try {
        await axios.post("http://localhost:5000/api/scan");
        setScanComplete(true);
      } catch (error) {
        console.error("Failed to record scan", error);
      }
    };

    recordScan();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      {scanComplete ? (
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/I-LzAtjf1DA?autoplay=1"
          title="AR Video"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      ) : (
        <p className="text-white text-xl">Loading AR experience...</p>
      )}
    </div>
  );
};

export default ScanPage;
