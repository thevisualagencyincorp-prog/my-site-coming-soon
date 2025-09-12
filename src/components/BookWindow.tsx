"use client";
import { useState } from "react";

export function BookWindow() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#f3f6ff",
        fontFamily: "Tahoma, Verdana, Segoe UI, Arial, sans-serif",
        color: "#1e2a4a",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ padding: 12, background: "#e6ebf7", borderBottom: "1px solid #cbd5ea" }}>
        <strong>Get on our calendar — free 15‑min consult</strong>
      </div>
      <div style={{ padding: 16 }}>
        {!submitted ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            style={{ maxWidth: 520 }}
          >
            <label style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: 6 }}>Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ width: "100%", padding: 10, border: "2px solid #cbd5ea", borderRadius: 6, marginBottom: 12 }}
            />
            <label style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: 6 }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: "100%", padding: 10, border: "2px solid #cbd5ea", borderRadius: 6, marginBottom: 12 }}
            />
            <label style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: 6 }}>Notes (optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              style={{ width: "100%", padding: 10, border: "2px solid #cbd5ea", borderRadius: 6, marginBottom: 12 }}
            />
            <div style={{ display: "flex", gap: 8 }}>
              <button type="submit" style={{ padding: "10px 14px", background: "#ffcc00", border: "1px solid #caa002", borderRadius: 6, fontWeight: 700, cursor: "pointer" }}>
                Request 15‑min call
              </button>
              <a href="https://calendly.com/" target="_blank" rel="noreferrer" style={{ padding: "10px 14px", background: "#fff", border: "1px solid #cbd5ea", borderRadius: 6, fontWeight: 700, textDecoration: "none", color: "#1e2a4a" }}>
                Open scheduling page
              </a>
            </div>
          </form>
        ) : (
          <div>
            <h3 style={{ margin: 0 }}>Thanks — you’re on our list!</h3>
            <p style={{ color: "#6b7280" }}>
              We’ll email you within a business day to confirm a 15‑minute phone or video consult.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

