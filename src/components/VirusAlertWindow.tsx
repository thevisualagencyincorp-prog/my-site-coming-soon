"use client";
import { useState, useEffect } from "react";

export function VirusAlertWindow() {
  const [alertLevel, setAlertLevel] = useState(1);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [threatsFound, setThreatsFound] = useState(0);

  const alerts = [
    {
      level: 1,
      title: "Suspicious Activity Detected",
      message: "Unknown process attempting to access system files",
      color: "#ffcc00",
      bgColor: "#fff3cd",
    },
    {
      level: 2,
      title: "VIRUS ALERT!",
      message: "Multiple threats detected in system memory",
      color: "#ff6b35",
      bgColor: "#ffe6e6",
    },
    {
      level: 3,
      title: "CRITICAL SECURITY BREACH!",
      message: "System integrity compromised - IMMEDIATE ACTION REQUIRED",
      color: "#dc3545",
      bgColor: "#f8d7da",
    },
  ];

  const funnyThreats = [
    "Cookie Monster Virus",
    "Dancing Banana Malware",
    "Rickroll Redirect",
    "Keyboard Cat Infection",
    "Doge Coin Miner",
    "404 Error Generator",
    "Infinite Loop Bug",
    "Emoji Overload Virus",
  ];

  useEffect(() => {
    if (isScanning) {
      const interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            setIsScanning(false);
            setThreatsFound(Math.floor(Math.random() * 8) + 1);
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 200);

      return () => clearInterval(interval);
    }
  }, [isScanning]);

  const startScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    setThreatsFound(0);
    setAlertLevel(1);
  };

  const escalateAlert = () => {
    if (alertLevel < 3) {
      setAlertLevel((prev) => prev + 1);
    }
  };

  const currentAlert = alerts[alertLevel - 1];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#f3f6ff",
        fontFamily: "Tahoma, Verdana, Segoe UI, Arial, sans-serif",
        fontSize: "14px",
        color: "#1e2a4a",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Title moved to window chrome */}

      {/* Alert Content */}
      <div style={{ flex: 1, overflow: "auto", padding: "15px" }}>
        {/* Main Alert Box */}
        <div
          style={{
            background: currentAlert.bgColor,
            border: `2px solid ${currentAlert.color}`,
            borderRadius: "8px",
            padding: "20px",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "48px",
              marginBottom: "15px",
              animation: "pulse 1s infinite",
            }}
          >
            {alertLevel === 1 ? "⚠️" : alertLevel === 2 ? "🚨" : "💀"}
          </div>
          <h2
            style={{
              margin: "0 0 10px 0",
              color: currentAlert.color,
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            {currentAlert.title}
          </h2>
          <p
            style={{
              margin: "0",
              color: "#6c7c9b",
              lineHeight: "1.5",
            }}
          >
            {currentAlert.message}
          </p>
        </div>

        {/* Scan Section */}
        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "8px",
            border: "1px solid #cbd5ea",
            marginBottom: "20px",
          }}
        >
          <h3
            style={{
              margin: "0 0 15px 0",
              color: "#1e2a4a",
              fontSize: "16px",
            }}
          >
            🔍 System Scan
          </h3>

          {!isScanning && scanProgress === 0 ? (
            <div style={{ textAlign: "center" }}>
              <p style={{ margin: "0 0 15px 0", color: "#6c7c9b" }}>
                Click &quot;Scan Now&quot; to check for threats
              </p>
              <button
                onClick={startScan}
                style={{
                  padding: "10px 20px",
                  background: "#28a745",
                  border: "1px solid #1e7e34",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#fff",
                }}
              >
                🔍 Scan Now
              </button>
            </div>
          ) : (
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <span style={{ fontSize: "13px", fontWeight: "600" }}>
                  Scanning system...
                </span>
                <span style={{ fontSize: "13px", color: "#6c7c9b" }}>
                  {Math.floor(scanProgress)}%
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "8px",
                  background: "#e6ebf7",
                  borderRadius: "4px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${scanProgress}%`,
                    height: "100%",
                    background: "#28a745",
                    borderRadius: "4px",
                    transition: "width 0.3s ease",
                  }}
                />
              </div>

              {threatsFound > 0 && (
                <div
                  style={{
                    marginTop: "15px",
                    padding: "10px",
                    background: "#f8d7da",
                    border: "1px solid #f5c6cb",
                    borderRadius: "4px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#721c24",
                      marginBottom: "5px",
                    }}
                  >
                    Threats Found: {threatsFound}
                  </div>
                  <div style={{ fontSize: "12px", color: "#721c24" }}>
                    {funnyThreats.slice(0, threatsFound).join(", ")}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <button
            onClick={escalateAlert}
            disabled={alertLevel >= 3}
            style={{
              flex: 1,
              padding: "10px",
              background: alertLevel >= 3 ? "#ccc" : "#dc3545",
              border: "1px solid #bd2130",
              borderRadius: "4px",
              cursor: alertLevel >= 3 ? "not-allowed" : "pointer",
              fontSize: "13px",
              fontWeight: "600",
              color: "#fff",
            }}
          >
            🚨 Escalate Alert
          </button>
          <button
            onClick={() =>
              window.dispatchEvent(new CustomEvent("openBSODWindow"))
            }
            style={{
              flex: 1,
              padding: "10px",
              background: "#6c757d",
              border: "1px solid #545b62",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: "600",
              color: "#fff",
            }}
          >
            💻 BSOD Mode
          </button>
        </div>

        {/* Fun Disclaimer */}
        <div
          style={{
            background: "#e6ebf7",
            padding: "12px",
            borderRadius: "6px",
            border: "1px solid #b8c6e3",
            fontSize: "12px",
            color: "#6c7c9b",
            textAlign: "center",
          }}
        >
          <strong>Disclaimer:</strong> This is just a fun Easter egg! No actual
          viruses were harmed in the making of this alert. Your system is
          perfectly safe. 🛡️
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
      `}</style>
    </div>
  );
}
