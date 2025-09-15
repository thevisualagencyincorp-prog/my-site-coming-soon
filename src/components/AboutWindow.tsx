"use client";
import { useState, useRef, useEffect } from "react";

export function AboutWindow({ onOpenContact }: { onOpenContact?: () => void }) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const windowRef = useRef<HTMLDivElement>(null);

  // Window dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const handleContactClick = () => {
    if (onOpenContact) {
      onOpenContact();
    }
  };

  return (
    <div
      ref={windowRef}
      className="window"
      style={{
        position: "absolute",
        top: position.y,
        left: position.x,
        width: 600,
        border: "2px solid #fff",
        background: "rgba(15,15,15,0.95)",
        color: "#f5f5f5",
        fontFamily: "'Courier New', monospace",
        boxShadow: "4px 4px 12px rgba(0,0,0,0.5)",
        resize: "both",
        overflow: "hidden",
        zIndex: 999,
        minWidth: 400,
        minHeight: 300,
      }}
    >
      {/* Window Header */}
      <div
        className="window-header"
        onMouseDown={handleMouseDown}
        style={{
          background: "linear-gradient(90deg, #222, #444)",
          color: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "6px 10px",
          cursor: "move",
          userSelect: "none",
        }}
      >
        <span className="title">📂 About Us – The Agency™</span>
        <div className="window-controls" style={{ display: "flex" }}>
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            style={{
              background: "#666",
              border: "none",
              color: "#fff",
              width: "22px",
              height: "22px",
              marginLeft: "4px",
              cursor: "pointer",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            –
          </button>
          <button
            onClick={() => {
              /* Close functionality would be handled by parent */
            }}
            style={{
              background: "#666",
              border: "none",
              color: "#fff",
              width: "22px",
              height: "22px",
              marginLeft: "4px",
              cursor: "pointer",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ×
          </button>
        </div>
      </div>

      {/* Window Content */}
      {!isMinimized && (
        <div
          className="window-content"
          style={{
            padding: "15px",
            maxHeight: "500px",
            overflowY: "auto",
            position: "relative",
          }}
        >
          <h2
            style={{
              marginBottom: "15px",
              color: "#fff",
              textAlign: "center",
              fontSize: "18px"
            }}
          >
            The Agency™ – Creative Besties Since Forever
          </h2>

          <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
            <div style={{ flex: 1 }}>
              <img
                src="/images/meet-us.jpg"
                alt="Ash & Britt – The Agency Founders"
                style={{
                  width: "100%",
                  maxWidth: "250px",
                  border: "2px solid #444",
                  borderRadius: "4px",
                  display: "block",
                  margin: "0 auto",
                }}
              />
            </div>

            <div style={{ flex: 2 }}>
              <p style={{ marginBottom: "10px", lineHeight: "1.6" }}>
                <strong>Mood:</strong> Caffeinated & plotting world domination ☕🍒🥤
              </p>
              <p style={{ marginBottom: "20px", lineHeight: "1.6" }}>
                <strong>Currently:</strong> Building brands, breaking algorithms, and probably dancing in the office.
              </p>
            </div>
          </div>

          <h3 style={{ color: "#fff", marginBottom: "10px" }}>Who We Are</h3>
          <p style={{ lineHeight: "1.6", marginBottom: "15px" }}>
            We're <strong>The Agency™</strong>, a sister-run creative studio based in California — female-owned, veteran-owned, community-driven. With 16+ years in branding, web design, app development, marketing, photography, and social media strategy, we turn businesses into brands people obsess over.
          </p>
          <p style={{ fontStyle: "italic", marginBottom: "20px" }}>
            Our world is fueled by retro Y2K vibes and bold design energy — but your brand? That's whatever you can dream up. We back it with smart strategy so the end result is both scroll-stopping and sales-driving.
          </p>

          <h3 style={{ color: "#fff", marginBottom: "10px" }}>What We Do</h3>
          <ul style={{ marginBottom: "15px", paddingLeft: "20px" }}>
            <li>Brand Strategy & Identity Design</li>
            <li>Web Design & Development (SEO-friendly, mobile-ready)</li>
            <li>App Development (custom tools & interfaces)</li>
            <li>Marketing & Social Media (content, captions, analytics)</li>
            <li>Photography & Videography (product, lifestyle, events)</li>
          </ul>
          <p style={{ marginBottom: "20px" }}>
            <strong>Need something super specific?</strong>{" "}
            <span
              style={{ color: "#1e90ff", cursor: "pointer", textDecoration: "underline" }}
              onClick={handleContactClick}
            >
              Just ask!
            </span>{" "}
            We create custom solutions & quotes for every project.
          </p>

          <h3 style={{ color: "#fff", marginBottom: "10px" }}>Mission</h3>
          <p style={{ marginBottom: "20px" }}>
            Helping local small businesses, women entrepreneurs, veterans, and creatives step into their spotlight with branding that feels thoughtful, bold, and unforgettable.
          </p>

          <h3 style={{ color: "#fff", marginBottom: "10px" }}>Connect</h3>
          <p>📍 Tehachapi • Bakersfield • Los Angeles • Nationwide</p>
          <p>✉️{" "}
            <span
              style={{ color: "#1e90ff", cursor: "pointer", textDecoration: "underline" }}
              onClick={handleContactClick}
            >
              hello@meettheagency.com
            </span>
          </p>
          <p>
            📱{" "}
            <a
              href="https://instagram.com/meet_the_agency"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#1e90ff" }}
            >
              @meet_the_agency
            </a>
          </p>
          <p>
            🌐{" "}
            <a
              href="https://meettheagency.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#1e90ff" }}
            >
              meettheagency.com
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
