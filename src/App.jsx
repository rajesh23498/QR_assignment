import React, { useState } from "react";
import QRCodeGenerator from "./components/QRCodeGenerator";
import ARPlaceholder from "./components/ARPlaceholder";
import CTAButton from "./components/CTAButton";
import Analytics from "./components/Analytics";
import axios from "axios";
import ScanPage from "./components/ScanPage";

function App() {
  const [scanned, setScanned] = useState(false);
  const [scanCount, setScanCount] = useState(0);
  const [data, setData] = useState({});

  const recordScan = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/scan");
      console.log("Scan recorded:", res.data);
      setScanned(true);
      setData(res.data);
    } catch (error) {
      console.error("Error recording scan:", error);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100 text-center">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">
        Experience Print Come to Life
      </h1>

      {!scanned ? (
        <>
          <QRCodeGenerator />
          <button
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={recordScan}
          >
            Simulate QR Scan
          </button>
        </>
      ) : (
        <>
          <ARPlaceholder />
          <CTAButton />
          <Analytics scanCount={scanCount} data={data} avgTime="12s" />
          <ScanPage />
        </>
      )}
    </div>
  );
}

export default App;
