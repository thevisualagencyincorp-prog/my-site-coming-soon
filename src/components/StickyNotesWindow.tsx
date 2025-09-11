"use client";
import { useState, useEffect } from "react";

export function StickyNotesWindow() {
  const pool = [
    {
      title: "Quick reset",
      content: "Take 3 slow breaths. Shoulders down. Jaw unclench. You’re okay.",
      color: "#ffcc00",
    },
    {
      title: "Friendly nudge",
      content: "Post the thing. It doesn’t need to be perfect to help someone.",
      color: "#ff6b35",
    },
    {
      title: "Founder mantra",
      content: "Consistent > intense. One tiny action today beats a perfect plan.",
      color: "#4ecdc4",
    },
    {
      title: "Artist reminder",
      content: "Your taste is valid. Your pace is valid. Keep going.",
      color: "#45b7d1",
    },
    {
      title: "Money mindset",
      content: "People love paying for clarity. Make it easy to hire you.",
      color: "#9b59b6",
    },
    {
      title: "Offer tip",
      content: "Name the outcome. ‘Brand that books clients’ > ‘Logo package’.",
      color: "#e91e63",
    },
    {
      title: "Self love",
      content: "You’re not behind. You’re building. The internet’s timeline is fake.",
      color: "#96ceb4",
    },
    {
      title: "Relax",
      content: "5-minute walk. No phone. Notice 5 pretty things. Come back fresh.",
      color: "#ffd93d",
    },
  ];

  const initial = Array.from({ length: 6 }).map((_, i) => {
    const pick = pool[Math.floor(Math.random() * pool.length)];
    return {
      id: i + 1,
      title: pick.title,
      content: pick.content,
      color: pick.color,
      position: { x: 20 + (i % 3) * 230, y: 20 + Math.floor(i / 3) * 180 },
    };
  });

  const [notes, setNotes] = useState(initial);

  const [nextId, setNextId] = useState(4);
  const [draggedNote, setDraggedNote] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const colors = [
    { name: "Yellow", value: "#ffcc00" },
    { name: "Orange", value: "#ff6b35" },
    { name: "Green", value: "#4ecdc4" },
    { name: "Blue", value: "#45b7d1" },
    { name: "Purple", value: "#9b59b6" },
    { name: "Pink", value: "#e91e63" },
  ];

  const addNote = () => {
    const newNote = {
      id: nextId,
      title: "New Note",
      content: "Click to edit this note...",
      color: colors[Math.floor(Math.random() * colors.length)].value,
      position: {
        x: Math.random() * 200 + 20,
        y: Math.random() * 150 + 20,
      },
    };
    setNotes([...notes, newNote]);
    setNextId(nextId + 1);
  };

  // Persist notes daily
  useEffect(() => {
    try {
      const today = new Date();
      const key = today.toISOString().slice(0, 10);
      const savedKey = localStorage.getItem("notes_daily_key_v1");
      if (savedKey === key) {
        const raw = localStorage.getItem("notes_daily_data_v1");
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            // Only adopt if shapes match
            setNotes(parsed);
            return;
          }
        }
      }
      // save current as today's
      localStorage.setItem("notes_daily_key_v1", key);
      localStorage.setItem("notes_daily_data_v1", JSON.stringify(notes));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      const key = new Date().toISOString().slice(0, 10);
      localStorage.setItem("notes_daily_key_v1", key);
      localStorage.setItem("notes_daily_data_v1", JSON.stringify(notes));
    } catch {}
  }, [notes]);

  const updateNote = (id: number, field: string, value: string) => {
    setNotes(
      notes.map((note) => (note.id === id ? { ...note, [field]: value } : note))
    );
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleMouseDown = (e: React.MouseEvent, noteId: number) => {
    const note = notes.find((n) => n.id === noteId);
    if (!note) return;

    setDraggedNote(noteId);
    setDragOffset({
      x: e.clientX - note.position.x,
      y: e.clientY - note.position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggedNote === null) return;

    const newPosition = {
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y,
    };

    setNotes(
      notes.map((note) =>
        note.id === draggedNote ? { ...note, position: newPosition } : note
      )
    );
  };

  const handleMouseUp = () => {
    setDraggedNote(null);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#f3f6ff",
        fontFamily: "Tahoma, Verdana, Segoe UI, Arial, sans-serif",
        fontSize: "14px",
        color: "#1e2a4a",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Title moved to window chrome */}

      {/* Toolbar */}
      <div
        style={{
          padding: "10px",
          background: "#e6ebf7",
          borderBottom: "1px solid #b8c6e3",
          display: "flex",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <button
          onClick={addNote}
          style={{
            padding: "6px 12px",
            background: "#28a745",
            border: "1px solid #1e7e34",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: "600",
            color: "#fff",
          }}
        >
          ➕ New Note
        </button>
        <span style={{ fontSize: "12px", color: "#6c7c9b" }}>
          {notes.length} notes • Drag to rearrange — tiny mindset boosts for founders + artists
        </span>
      </div>

      {/* Notes Canvas */}
      <div
        style={{
          flex: 1,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {notes.map((note) => (
          <div
            key={note.id}
            style={{
              position: "absolute",
              left: note.position.x,
              top: note.position.y,
              width: "200px",
              minHeight: "150px",
              background: note.color,
              borderRadius: "4px",
              boxShadow:
                draggedNote === note.id
                  ? "0 8px 16px rgba(0,0,0,0.3)"
                  : "0 4px 8px rgba(0,0,0,0.2)",
              cursor: draggedNote === note.id ? "grabbing" : "grab",
              zIndex: draggedNote === note.id ? 1000 : 1,
              transform:
                draggedNote === note.id ? "rotate(5deg)" : "rotate(0deg)",
              transition: draggedNote === note.id ? "none" : "transform 0.2s",
            }}
            onMouseDown={(e) => handleMouseDown(e, note.id)}
          >
            {/* Note Header */}
            <div
              style={{
                padding: "8px 10px",
                background: "rgba(255,255,255,0.2)",
                borderBottom: "1px solid rgba(0,0,0,0.1)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <input
                type="text"
                value={note.title}
                onChange={(e) => updateNote(note.id, "title", e.target.value)}
                style={{
                  background: "transparent",
                  border: "none",
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#1e2a4a",
                  width: "140px",
                }}
              />
              <button
                onClick={() => deleteNote(note.id)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "12px",
                  color: "#666",
                  padding: "2px",
                }}
              >
                ✕
              </button>
            </div>

            {/* Note Content */}
            <textarea
              value={note.content}
              onChange={(e) => updateNote(note.id, "content", e.target.value)}
              style={{
                width: "100%",
                height: "110px",
                background: "transparent",
                border: "none",
                resize: "none",
                fontSize: "12px",
                lineHeight: "1.4",
                color: "#1e2a4a",
                padding: "8px 10px",
                fontFamily: "inherit",
              }}
              placeholder="Write your note here..."
            />
          </div>
        ))}
      </div>

      {/* Instructions */}
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "10px",
          background: "rgba(0,0,0,0.7)",
          color: "#fff",
          padding: "8px 12px",
          borderRadius: "4px",
          fontSize: "11px",
          maxWidth: "250px",
        }}
      >
        💡 <strong>Pro Tips:</strong>
        <br />
        • Drag notes to rearrange them
        <br />
        • Double-click titles to edit
        <br />
        • Use different colors for organization
        <br />• Notes auto-save (in this demo)
      </div>
    </div>
  );
}
