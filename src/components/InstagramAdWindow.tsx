"use client";
import React, { useEffect, useState } from "react";

type Post = {
  id: string;
  image: string;
  caption: string;
  timestamp: string;
  permalink?: string;
};

const mock: Post[] = [
  {
    id: "1",
    image: "/images/instagram-placeholder.svg",
    caption: "A cozy brand refresh with warmth + clarity.",
    timestamp: "3h",
  },
  {
    id: "2",
    image: "/images/instagram-placeholder.svg",
    caption: "Playful launch visuals that convert without shouting.",
    timestamp: "8h",
  },
  {
    id: "3",
    image: "/images/instagram-placeholder.svg",
    caption: "Case study: 300% engagement lift via gentle storytelling.",
    timestamp: "1d",
  },
];

export function Instagram_Ad() {
  const [post, setPost] = useState<Post | null>(null);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/instagram");
        if (res.ok) {
          const arr = (await res.json()) as Post[];
          if (!cancelled && arr?.length)
            setPost(arr[Math.floor(Math.random() * arr.length)]);
          else if (!cancelled)
            setPost(mock[Math.floor(Math.random() * mock.length)]);
        } else if (!cancelled)
          setPost(mock[Math.floor(Math.random() * mock.length)]);
      } catch {
        if (!cancelled) setPost(mock[Math.floor(Math.random() * mock.length)]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!post) return null;

  return (
    <div
      style={{
        background: "#fff",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Tahoma, Verdana, Segoe UI, Arial, sans-serif",
      }}
    >
      <div
        style={{
          padding: "8px 10px",
          background: "#f9fafb",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span style={{ fontSize: 14, fontWeight: 700 }}>INSTAGRAM FEATURE</span>
        <span style={{ marginLeft: "auto", fontSize: 11, color: "#6b7280" }}>
          {post.timestamp}
        </span>
      </div>
      <div style={{ padding: 10 }}>
        <img
          src={post.image}
          alt="post"
          style={{
            width: "100%",
            borderRadius: 8,
            border: "1px solid #e5e7eb",
          }}
        />
        <p
          style={{
            fontSize: 13,
            color: "#111827",
            lineHeight: 1.5,
            marginTop: 10,
          }}
        >
          {post.caption}
        </p>
      </div>
      <div style={{ padding: 10, marginTop: "auto", display: "flex", gap: 8 }}>
        <a
          href={post.permalink || "https://instagram.com/"}
          target="_blank"
          rel="noreferrer"
          style={{
            padding: "8px 12px",
            background: "#ffcc00",
            border: "1px solid #caa002",
            borderRadius: 6,
            color: "#111",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          Open Post
        </a>
        <button
          onClick={() => window.dispatchEvent(new CustomEvent("openAOLWindow"))}
          style={{
            padding: "8px 12px",
            background: "#2b5fb8",
            border: "1px solid #1b3a73",
            borderRadius: 6,
            color: "#fff",
            fontWeight: 700,
          }}
        >
          Let’s Collaborate
        </button>
      </div>
    </div>
  );
}
