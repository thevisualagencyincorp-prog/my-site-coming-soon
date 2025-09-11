"use client";
import { useState } from "react";

export function AboutWindow() {
  const [activeTab, setActiveTab] = useState("about");

  const tabs = [
    { key: "about", label: "About Us" },
    { key: "fun", label: "Fun Facts" },
    { key: "connect", label: "Connect" },
  ];

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

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          padding: "8px 10px",
          borderBottom: "1px solid #b8c6e3",
          background: "#e6ebf7",
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              cursor: "pointer",
              padding: "6px 10px",
              borderRadius: "6px",
              border: "1px solid #8aa1c5",
              background: activeTab === tab.key ? "#ffcc00" : "#fff",
              color: "#1e2a4a",
              borderColor: activeTab === tab.key ? "#caa002" : "#8aa1c5",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: "auto", padding: "10px" }}>
        {activeTab === "about" && (
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: "140px",
                height: "140px",
                borderRadius: "50%",
                background: "#ddd",
                margin: "0 auto 20px",
                overflow: "hidden",
                boxShadow: "0 6px 14px rgba(0,0,0,0.12)",
                border: "2px solid #cbd5ea",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src="/images/meet-us.jpg"
                alt="Meet The Agency"
                width={140}
                height={140}
                onError={(e) => {
                  (e.currentTarget.style.display = 'none');
                  const p = e.currentTarget.parentElement as HTMLElement;
                  if (p) p.textContent = '👭';
                }}
                style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <h2 style={{ margin: "0 0 10px 0", color: "#1e2a4a" }}>
              Meet The Agency
            </h2>
            <p style={{ margin: "0 0 10px 0", lineHeight: "1.6" }}>
              Your Business/Creative Besties™
              <br />
              We specialize in turning your vision into reality with creativity,
              strategy, and a whole lot of heart.
            </p>
            <div style={{ fontSize: "12px", color: "#6c7c9b", marginBottom: "20px" }}>
              Photo: a peek at our team energy and vibe.
            </div>
            <div
              style={{
                background: "#fff",
                padding: "15px",
                borderRadius: "8px",
                border: "1px solid #cbd5ea",
                margin: "20px 0",
              }}
            >
              <h3 style={{ margin: "0 0 10px 0", color: "#1e2a4a" }}>
                Our Mission
              </h3>
              <p style={{ margin: "0", lineHeight: "1.6" }}>
                To create meaningful connections between brands and their
                audiences through innovative design, compelling storytelling,
                and strategic digital solutions.
              </p>
            </div>
          </div>
        )}

        {activeTab === "fun" && (
          <div>
            <h3 style={{ margin: "0 0 15px 0", color: "#1e2a4a" }}>
              Fun Facts About Us
            </h3>
            <div style={{ display: "grid", gap: "12px" }}>
              <div
                style={{
                  background: "#fff",
                  padding: "12px",
                  borderRadius: "6px",
                  border: "1px solid #cbd5ea",
                }}
              >
                <span style={{ fontSize: "20px", marginRight: "8px" }}>🎨</span>
                <strong>Creative Sisters:</strong> Two sisters who love bringing
                ideas to life
              </div>
              <div
                style={{
                  background: "#fff",
                  padding: "12px",
                  borderRadius: "6px",
                  border: "1px solid #cbd5ea",
                }}
              >
                <span style={{ fontSize: "20px", marginRight: "8px" }}>🍂</span>
                <strong>Fall Obsessed:</strong> Pumpkin spice lattes are our
                fuel
              </div>
              <div
                style={{
                  background: "#fff",
                  padding: "12px",
                  borderRadius: "6px",
                  border: "1px solid #cbd5ea",
                }}
              >
                <span style={{ fontSize: "20px", marginRight: "8px" }}>☕</span>
                <strong>Coffee Lovers:</strong> Our office runs on caffeine and
                creativity
              </div>
              <div
                style={{
                  background: "#fff",
                  padding: "12px",
                  borderRadius: "6px",
                  border: "1px solid #cbd5ea",
                }}
              >
                <span style={{ fontSize: "20px", marginRight: "8px" }}>🕵️</span>
                <strong>Mystery + Aesthetics:</strong> We love the intrigue of
                great design
              </div>
              <div
                style={{
                  background: "#fff",
                  padding: "12px",
                  borderRadius: "6px",
                  border: "1px solid #cbd5ea",
                }}
              >
                <span style={{ fontSize: "20px", marginRight: "8px" }}>🐈</span>
                <strong>Cat People:</strong> Our feline friends inspire our
                creativity
              </div>
              <div
                style={{
                  background: "#fff",
                  padding: "12px",
                  borderRadius: "6px",
                  border: "1px solid #cbd5ea",
                }}
              >
                <span style={{ fontSize: "20px", marginRight: "8px" }}>🎶</span>
                <strong>Concert Goers:</strong> Music fuels our creative process
              </div>
              <div
                style={{
                  background: "#fff",
                  padding: "12px",
                  borderRadius: "6px",
                  border: "1px solid #cbd5ea",
                }}
              >
                <span style={{ fontSize: "20px", marginRight: "8px" }}>⛰️</span>
                <strong>Mountain Living:</strong> We live and work surrounded by
                nature
              </div>
            </div>
          </div>
        )}

        {activeTab === "connect" && (
          <div>
            <h3 style={{ margin: "0 0 15px 0", color: "#1e2a4a" }}>
              Let&apos;s Connect!
            </h3>
            <div style={{ display: "grid", gap: "12px" }}>
              <a
                href="https://meettheagency.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  background: "#fff",
                  padding: "12px",
                  borderRadius: "6px",
                  border: "1px solid #cbd5ea",
                  textDecoration: "none",
                  color: "#1e2a4a",
                }}
              >
                <span style={{ fontSize: "20px" }}>🌐</span>
                <div>
                  <strong>Website</strong>
                  <br />
                  <span style={{ fontSize: "12px", color: "#6c7c9b" }}>
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
                  gap: "10px",
                  background: "#fff",
                  padding: "12px",
                  borderRadius: "6px",
                  border: "1px solid #cbd5ea",
                  textDecoration: "none",
                  color: "#1e2a4a",
                }}
              >
                <span style={{ fontSize: "20px" }}>📸</span>
                <div>
                  <strong>Instagram</strong>
                  <br />
                  <span style={{ fontSize: "12px", color: "#6c7c9b" }}>
                    @meet_the_agency
                  </span>
                </div>
              </a>
              <div
                style={{
                  background: "#fff",
                  padding: "12px",
                  borderRadius: "6px",
                  border: "1px solid #cbd5ea",
                  marginTop: "10px",
                }}
              >
                <strong>💌 Ready to Work Together?</strong>
                <br />
                <span style={{ fontSize: "12px", color: "#6c7c9b" }}>
                  Send us a message through our Messenger or email us at
                  hello@meettheagency.com
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
