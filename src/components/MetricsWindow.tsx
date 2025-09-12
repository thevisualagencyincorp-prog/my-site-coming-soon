"use client";
import { useState, useEffect } from "react";

export function MetricsWindow() {
  const [animatedValues, setAnimatedValues] = useState({
    projects: 0,
    clients: 0,
    coffee: 0,
    pixels: 0,
  });

  const targetValues = {
    projects: 247,
    clients: 89,
    coffee: 1247,
    pixels: 2847391,
  };

  useEffect(() => {
    const animateValue = (key: keyof typeof targetValues, target: number) => {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setAnimatedValues((prev) => ({ ...prev, [key]: Math.floor(current) }));
      }, duration / steps);
    };

    // Start animations with slight delays
    setTimeout(() => animateValue("projects", targetValues.projects), 200);
    setTimeout(() => animateValue("clients", targetValues.clients), 400);
    setTimeout(() => animateValue("coffee", targetValues.coffee), 600);
    setTimeout(() => animateValue("pixels", targetValues.pixels), 800);
  }, []);

  const metrics = [
    {
      label: "Projects Completed",
      value: animatedValues.projects,
      icon: "🎨",
      description: "Creative projects brought to life",
      color: "#ff6b35",
    },
    {
      label: "Happy Clients",
      value: animatedValues.clients,
      icon: "😊",
      description: "Satisfied customers worldwide",
      color: "#4ecdc4",
    },
    {
      label: "Cups of Coffee",
      value: animatedValues.coffee,
      icon: "☕",
      description: "Fuel for our creativity",
      color: "#45b7d1",
    },
    {
      label: "Pixels Designed",
      value: animatedValues.pixels.toLocaleString(),
      icon: "📐",
      description: "Digital craftsmanship",
      color: "#96ceb4",
    },
  ];

  const recentAchievements = [
    { icon: "🏆", text: "Best Local Agency 2024", date: "March 2024" },
    { icon: "⭐", text: "5-Star Google Reviews", date: "Ongoing" },
    { icon: "🚀", text: "Launched 50+ Websites", date: "This Year" },
    { icon: "💡", text: "100+ Brand Identities", date: "Since 2020" },
    { icon: "📈", text: "300% Client Growth", date: "Last 2 Years" },
  ];

  const skills = [
    { name: "Brand Strategy", level: 95 },
    { name: "Digital Design", level: 98 },
    { name: "Web Development", level: 92 },
    { name: "Photography", level: 88 },
    { name: "Video Production", level: 85 },
    { name: "Social Media", level: 96 },
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

      {/* Content */}
      <div style={{ flex: 1, overflow: "auto", padding: "15px" }}>
        {/* Key Metrics Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "15px",
            marginBottom: "25px",
          }}
        >
          {metrics.map((metric, index) => (
            <div
              key={index}
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "8px",
                border: "1px solid #cbd5ea",
                textAlign: "center",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <div
                style={{
                  fontSize: "36px",
                  marginBottom: "10px",
                }}
              >
                {metric.icon}
              </div>
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: "bold",
                  color: metric.color,
                  marginBottom: "5px",
                }}
              >
                {typeof metric.value === "number"
                  ? metric.value.toLocaleString()
                  : metric.value}
              </div>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#1e2a4a",
                  marginBottom: "5px",
                }}
              >
                {metric.label}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "#6c7c9b",
                }}
              >
                {metric.description}
              </div>
            </div>
          ))}
        </div>

        {/* Skills Section */}
        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "8px",
            border: "1px solid #cbd5ea",
            marginBottom: "25px",
          }}
        >
          <h3
            style={{
              margin: "0 0 15px 0",
              color: "#1e2a4a",
              fontSize: "16px",
            }}
          >
            🎯 Core Competencies
          </h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {skills.map((skill, index) => (
              <div key={index}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "4px",
                  }}
                >
                  <span style={{ fontSize: "13px", fontWeight: "600" }}>
                    {skill.name}
                  </span>
                  <span style={{ fontSize: "12px", color: "#6c7c9b" }}>
                    {skill.level}%
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
                      width: `${skill.level}%`,
                      height: "100%",
                      background: "linear-gradient(90deg, #ffcc00, #ff6b35)",
                      borderRadius: "4px",
                      transition: "width 1s ease-out",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Achievements */}
        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "8px",
            border: "1px solid #cbd5ea",
            marginBottom: "25px",
          }}
        >
          <h3
            style={{
              margin: "0 0 15px 0",
              color: "#1e2a4a",
              fontSize: "16px",
            }}
          >
            🏆 Recent Achievements
          </h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {recentAchievements.map((achievement, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "8px",
                  background: "#f8f9fa",
                  borderRadius: "6px",
                  border: "1px solid #e6ebf7",
                }}
              >
                <span style={{ fontSize: "20px" }}>{achievement.icon}</span>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#1e2a4a",
                    }}
                  >
                    {achievement.text}
                  </div>
                  <div style={{ fontSize: "11px", color: "#6c7c9b" }}>
                    {achievement.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fun Stats */}
        <div
          style={{
            background: "#e6ebf7",
            padding: "20px",
            borderRadius: "8px",
            border: "1px solid #b8c6e3",
          }}
        >
          <h3
            style={{
              margin: "0 0 15px 0",
              color: "#1e2a4a",
              fontSize: "16px",
            }}
          >
            📊 Fun Agency Stats
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "15px",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "24px", marginBottom: "5px" }}>🌅</div>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#ff6b35",
                }}
              >
                6 AM
              </div>
              <div style={{ fontSize: "12px", color: "#6c7c9b" }}>
                Average start time
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "24px", marginBottom: "5px" }}>🎵</div>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#4ecdc4",
                }}
              >
                500+
              </div>
              <div style={{ fontSize: "12px", color: "#6c7c9b" }}>
                Songs in playlist
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "24px", marginBottom: "5px" }}>🐱</div>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#45b7d1",
                }}
              >
                3
              </div>
              <div style={{ fontSize: "12px", color: "#6c7c9b" }}>
                Office cats
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "24px", marginBottom: "5px" }}>🏔️</div>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#96ceb4",
                }}
              >
                8,000ft
              </div>
              <div style={{ fontSize: "12px", color: "#6c7c9b" }}>
                Elevation office
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
