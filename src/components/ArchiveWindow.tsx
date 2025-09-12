"use client";
import { useEffect, useState } from "react";

type IGPost = {
  id: string;
  image: string;
  caption: string;
  timestamp?: string;
  permalink?: string;
};

type NoteItem = { title: string; content: string; color?: string };

export function ArchiveWindow() {
  const [posts, setPosts] = useState<IGPost[]>([]);
  const [notes, setNotes] = useState<NoteItem[]>([]);
  useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        const res = await fetch("/api/instagram");
        if (!cancel && res.ok) {
          const arr = (await res.json()) as IGPost[];
          setPosts(Array.isArray(arr) ? arr.slice(0, 12) : []);
        }
      } catch {}
    })();
    // notes from localStorage (persisted daily)
    try {
      const raw = localStorage.getItem("notes_daily_data_v1") || "[]";
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) setNotes(parsed as NoteItem[]);
    } catch {}
    return () => {
      cancel = true;
    };
  }, []);

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
      <div
        style={{
          padding: "8px 12px",
          background: "#e6ebf7",
          borderBottom: "1px solid #cbd5ea",
          fontWeight: 700,
        }}
      >
        Trash — Instagram & Notes
      </div>
      <div style={{ padding: 12, overflow: "auto" }}>
        <h4 style={{ margin: "4px 0 8px" }}>Instagram Highlights</h4>
        {posts.length === 0 ? (
          <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 12 }}>
            No posts yet — connect your /api/instagram or try again.
          </div>
        ) : null}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 12,
            marginBottom: 16,
          }}
        >
          {posts.map((p) => (
            <a
              key={p.id}
              href={p.permalink || "https://instagram.com/"}
              target="_blank"
              rel="noreferrer"
              style={{
                background: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: 8,
                textDecoration: "none",
                color: "inherit",
                overflow: "hidden",
                display: "block",
              }}
            >
              <img src={p.image} alt="post" style={{ width: "100%", display: "block" }} />
              <div style={{ padding: 8, fontSize: 12 }}>
                {p.caption?.slice(0, 120) || "View post"}
              </div>
            </a>
          ))}
        </div>

        <h4 style={{ margin: "4px 0 8px" }}>Saved Notes</h4>
        {notes.length === 0 ? (
          <div style={{ fontSize: 12, color: "#6b7280" }}>
            No saved notes yet — open Notes for your daily boosts.
          </div>
        ) : null}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 12,
          }}
        >
          {notes.map((n, i) => (
            <div key={`n-${i}`} style={{ background: n.color || "#fff", padding: 10, borderRadius: 8 }}>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>{n.title}</div>
              <div style={{ whiteSpace: "pre-wrap", fontSize: 12 }}>{n.content}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
