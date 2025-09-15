"use client";
import { useState } from "react";

export function MySpaceWindow() {
  const [activeTab, setActiveTab] = useState("fun");

  const tabs = [
    { key: "fun", label: "🎉 Fun Facts" },
    { key: "connect", label: "🤝 Connect" },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background:
          "linear-gradient(135deg, #ff69b4 0%, #ff1493 25%, #8a2be2 50%, #4b0082 75%, #000000 100%)",
        fontFamily: "'Comic Sans MS', cursive",
        fontSize: "14px",
        color: "#ffffff",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* MySpace-style header */}
      <div
        style={{
          background: "linear-gradient(90deg, #ff1493, #8a2be2)",
          padding: "15px",
          textAlign: "center",
          borderBottom: "3px solid #ffffff",
          boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
        }}
      >
        <h1
          style={{
            fontSize: "28px",
            margin: "0",
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            fontWeight: "bold",
          }}
        >
          🎨 The Agency's MySpace 🎨
        </h1>
        <p
          style={{
            margin: "5px 0 0 0",
            fontSize: "12px",
            opacity: "0.9",
          }}
        >
          "We have 7,492 friends! Add us as a friend!"
        </p>
      </div>

      {/* Tab navigation */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          padding: "12px",
          background: "rgba(0,0,0,0.3)",
          borderBottom: "2px solid #ff69b4",
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              cursor: "pointer",
              padding: "8px 16px",
              borderRadius: "20px",
              border: "2px solid #ffffff",
              background:
                activeTab === tab.key
                  ? "linear-gradient(45deg, #ff69b4, #ff1493)"
                  : "rgba(255,255,255,0.1)",
              color: "#ffffff",
              fontWeight: "bold",
              fontSize: "12px",
              textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
              transition: "all 0.3s ease",
              boxShadow:
                activeTab === tab.key
                  ? "0 0 15px rgba(255,105,180,0.5)"
                  : "none",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div
        style={{
          flex: 1,
          overflow: "auto",
          padding: "20px",
          background: "rgba(0,0,0,0.1)",
        }}
      >
        {activeTab === "fun" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: "30px" }}>
              <h2
                style={{
                  fontSize: "24px",
                  margin: "0 0 10px 0",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                  color: "#ffff00",
                }}
              >
                🎯 Why Choose The Agency OS™ 🎯
              </h2>
              <p
                style={{
                  fontSize: "14px",
                  margin: "0",
                  opacity: "0.9",
                }}
              >
                "We're not just an agency, we're your creative besties! 💖"
              </p>
            </div>

            <div style={{ display: "grid", gap: "15px" }}>
              <div
                style={{
                  background: "rgba(255,255,255,0.9)",
                  padding: "15px",
                  borderRadius: "15px",
                  border: "3px solid #ff69b4",
                  color: "#333",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-10px",
                    left: "15px",
                    background: "#ff69b4",
                    color: "white",
                    padding: "2px 8px",
                    borderRadius: "10px",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  🎨
                </div>
                <strong style={{ color: "#ff1493" }}>
                  Creative Excellence:
                </strong>{" "}
                Award-winning <strong>graphic design</strong> and{" "}
                <strong>brand identity</strong> specialists who make your brand
                POP! ✨
              </div>

              <div
                style={{
                  background: "rgba(255,255,255,0.9)",
                  padding: "15px",
                  borderRadius: "15px",
                  border: "3px solid #8a2be2",
                  color: "#333",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-10px",
                    left: "15px",
                    background: "#8a2be2",
                    color: "white",
                    padding: "2px 8px",
                    borderRadius: "10px",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  💻
                </div>
                <strong style={{ color: "#4b0082" }}>
                  Full-Service Agency:
                </strong>{" "}
                Complete <strong>web development</strong>, <strong>SEO</strong>,
                and <strong>digital marketing</strong> solutions that actually
                work! 🚀
              </div>

              <div
                style={{
                  background: "rgba(255,255,255,0.9)",
                  padding: "15px",
                  borderRadius: "15px",
                  border: "3px solid #00ff00",
                  color: "#333",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-10px",
                    left: "15px",
                    background: "#00ff00",
                    color: "black",
                    padding: "2px 8px",
                    borderRadius: "10px",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  📈
                </div>
                <strong style={{ color: "#008000" }}>Results-Driven:</strong>{" "}
                Data-backed strategies that deliver measurable{" "}
                <strong>ROI</strong> and business growth 📊
              </div>

              <div
                style={{
                  background: "rgba(255,255,255,0.9)",
                  padding: "15px",
                  borderRadius: "15px",
                  border: "3px solid #ffff00",
                  color: "#333",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-10px",
                    left: "15px",
                    background: "#ffff00",
                    color: "black",
                    padding: "2px 8px",
                    borderRadius: "10px",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  💡
                </div>
                <strong style={{ color: "#ff8c00" }}>
                  Innovative Solutions:
                </strong>{" "}
                Cutting-edge technology and creative approaches to complex
                challenges 🧠
              </div>

              <div
                style={{
                  background: "rgba(255,255,255,0.9)",
                  padding: "15px",
                  borderRadius: "15px",
                  border: "3px solid #ff4500",
                  color: "#333",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-10px",
                    left: "15px",
                    background: "#ff4500",
                    color: "white",
                    padding: "2px 8px",
                    borderRadius: "10px",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  📸
                </div>
                <strong style={{ color: "#dc143c" }}>Photo/Videography:</strong>{" "}
                Professional <strong>photography services</strong> and{" "}
                <strong>video production</strong> for brands and businesses 📷
              </div>

              <div
                style={{
                  background: "rgba(255,255,255,0.9)",
                  padding: "15px",
                  borderRadius: "15px",
                  border: "3px solid #00ced1",
                  color: "#333",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-10px",
                    left: "15px",
                    background: "#00ced1",
                    color: "white",
                    padding: "2px 8px",
                    borderRadius: "10px",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  📱
                </div>
                <strong style={{ color: "#008b8b" }}>App Development:</strong>{" "}
                Custom <strong>mobile app development</strong> and{" "}
                <strong>web applications</strong> that engage users 📲
              </div>

              <div
                style={{
                  background: "rgba(255,255,255,0.9)",
                  padding: "15px",
                  borderRadius: "15px",
                  border: "3px solid #ffd700",
                  color: "#333",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-10px",
                    left: "15px",
                    background: "#ffd700",
                    color: "black",
                    padding: "2px 8px",
                    borderRadius: "10px",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  ⚡
                </div>
                <strong style={{ color: "#daa520" }}>Fast Turnaround:</strong>{" "}
                Efficient processes without compromising quality or attention to
                detail 🏃‍♀️
              </div>

              <div
                style={{
                  background: "rgba(255,255,255,0.9)",
                  padding: "15px",
                  borderRadius: "15px",
                  border: "3px solid #32cd32",
                  color: "#333",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-10px",
                    left: "15px",
                    background: "#32cd32",
                    color: "white",
                    padding: "2px 8px",
                    borderRadius: "10px",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  ⛰️
                </div>
                <strong style={{ color: "#228b22" }}>Mountain Living:</strong>{" "}
                We live and work surrounded by nature in the beautiful
                mountains! 🏔️
              </div>
            </div>
          </div>
        )}

        {activeTab === "connect" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: "30px" }}>
              <h2
                style={{
                  fontSize: "24px",
                  margin: "0 0 10px 0",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                  color: "#00ffff",
                }}
              >
                🤝 Let's Connect! 🤝
              </h2>
              <p
                style={{
                  fontSize: "14px",
                  margin: "0",
                  opacity: "0.9",
                }}
              >
                "Add us to your top 8! 💕"
              </p>
            </div>

            <div style={{ display: "grid", gap: "15px" }}>
              <a
                href="https://meettheagency.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  background: "linear-gradient(45deg, #ff69b4, #ff1493)",
                  padding: "20px",
                  borderRadius: "15px",
                  border: "3px solid #ffffff",
                  textDecoration: "none",
                  color: "#ffffff",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <span style={{ fontSize: "30px" }}>🌐</span>
                <div>
                  <strong style={{ fontSize: "16px" }}>Website</strong>
                  <br />
                  <span style={{ fontSize: "12px", opacity: "0.9" }}>
                    meettheagency.com
                  </span>
                </div>
              </a>

              <a
                href="https://instagram.com/meet_the_agency"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  background: "linear-gradient(45deg, #8a2be2, #4b0082)",
                  padding: "20px",
                  borderRadius: "15px",
                  border: "3px solid #ffffff",
                  textDecoration: "none",
                  color: "#ffffff",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <span style={{ fontSize: "30px" }}>📸</span>
                <div>
                  <strong style={{ fontSize: "16px" }}>Instagram</strong>
                  <br />
                  <span style={{ fontSize: "12px", opacity: "0.9" }}>
                    @meet_the_agency
                  </span>
                </div>
              </a>

              <div
                style={{
                  background: "linear-gradient(45deg, #ff1493, #ff69b4)",
                  padding: "20px",
                  borderRadius: "15px",
                  border: "3px solid #ffffff",
                  marginTop: "10px",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                  textAlign: "center",
                }}
              >
                <strong style={{ fontSize: "18px" }}>
                  💌 Ready to Work Together?
                </strong>
                <br />
                <span
                  style={{
                    fontSize: "14px",
                    opacity: "0.9",
                    marginTop: "5px",
                    display: "block",
                  }}
                >
                  Send us a message through our Messenger or email us at
                  <br />
                  <strong>hello@meettheagency.com</strong>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MySpace-style footer */}
      <div
        style={{
          background: "rgba(0,0,0,0.5)",
          padding: "10px",
          textAlign: "center",
          borderTop: "2px solid #ff69b4",
        }}
      >
        <p
          style={{
            margin: "0",
            fontSize: "12px",
            opacity: "0.8",
          }}
        >
          🎵 Now Playing: "Our Creative Energy" by The Agency 🎵
        </p>
      </div>
    </div>
  );
}
