"use client";
import { useState } from "react";

export function StickyNotesWindow() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Welcome to The Agency OS™!",
      content:
        "Thanks for checking out our retro desktop experience. Feel free to explore all the windows and features!",
      color: "#ffcc00",
      position: { x: 20, y: 20 },
    },
    {
      id: 2,
      title: "Creative Ideas",
      content:
        "• Brand identity refresh\n• Social media campaign\n• Website redesign\n• Photography session\n• Video production",
      color: "#ff6b35",
      position: { x: 250, y: 20 },
    },
    {
      id: 3,
      title: "Contact Info",
      content:
        "📧 hello@meettheagency.com\n📱 Let's chat!\n🌐 meettheagency.com\n📍 Mountain-based agency",
      color: "#4ecdc4",
      position: { x: 20, y: 200 },
    },
  ]);

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
      {/* Window Title Bar */}
      <div
        style={{
          padding: "6px 10px",
          background: "linear-gradient(#5f88d8, #3c67c2)",
          color: "#fff",
          fontWeight: "700",
          borderBottom: "1px solid #254e9a",
          textShadow: "0 1px 0 rgba(0,0,0,.25)",
        }}
      >
        Sticky Notes - Digital Notepad
      </div>

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
          {notes.length} notes • Drag notes to move them around
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
