"use client";

import React, { useEffect, useRef, useState } from "react";
import type { WindowKey } from "./StartMenu";

type IconItem = {
  key: WindowKey;
  label: string;
  iconSrc: string;
  x: number;
  y: number;
};

interface DesktopIconsProps {
  onOpen: (key: WindowKey) => void;
}

export function DesktopIcons({ onOpen }: DesktopIconsProps) {
  const initialIcons: IconItem[] = [
    { key: "aol", label: "Messenger", iconSrc: "/images/folder.webp", x: 24, y: 90 },
    { key: "mash", label: "Fate Machine", iconSrc: "/images/folder.webp", x: 24, y: 170 },
    { key: "about", label: "About", iconSrc: "/images/folder.webp", x: 24, y: 250 },
    { key: "faq", label: "Help & Tips", iconSrc: "/images/folder.webp", x: 24, y: 330 },
    { key: "notes", label: "Sticky Notes", iconSrc: "/images/folder.webp", x: 120, y: 90 },
    { key: "clippy", label: "Assistant", iconSrc: "/images/folder.webp", x: 120, y: 170 },
    { key: "virus", label: "Promos/Alerts", iconSrc: "/images/folder.webp", x: 120, y: 250 },
    { key: "newsletter", label: "Newsletter", iconSrc: "/images/folder.webp", x: 216, y: 90 },
    { key: "mysteryClub", label: "Mystery Club", iconSrc: "/images/folder.webp", x: 216, y: 170 },
    { key: "coffeeClub", label: "Coffee Club", iconSrc: "/images/folder.webp", x: 216, y: 250 },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const GRID = 16;
  const ICON_W = 80; // approx button width
  const ICON_H = 80; // approx button height

  const [items, setItems] = useState<IconItem[]>(() => {
    try {
      const raw = localStorage.getItem("desktop_icons_v1");
      if (raw) return JSON.parse(raw) as IconItem[];
    } catch {}
    return initialIcons;
  });

  // Optional runtime override from /desktop-icons.json
  useEffect(() => {
    let cancelled = false;
    fetch("/desktop-icons.json")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data || cancelled) return;
        // Validate and merge: only known keys
        const byKey = new Map<WindowKey, IconItem>();
        (items.length ? items : initialIcons).forEach((i) => byKey.set(i.key, i));
        (data as Partial<IconItem>[]).forEach((d) => {
          const key = d.key as WindowKey | undefined;
          if (!key || !byKey.has(key)) return;
          const base = byKey.get(key)!;
          byKey.set(key, {
            ...base,
            label: d.label ?? base.label,
            iconSrc: d.iconSrc ?? base.iconSrc,
            x: typeof d.x === "number" ? d.x : base.x,
            y: typeof d.y === "number" ? d.y : base.y,
          });
        });
        setItems(Array.from(byKey.values()));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  // Keep simple local positions; no need for an index map yet.

  const clamp = (x: number, y: number) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const nx = Math.min(Math.max(8, x), vw - ICON_W - 8);
    const ny = Math.min(Math.max(64, y), vh - ICON_H - 64);
    return { x: nx, y: ny };
  };

  useEffect(() => {
    // keyboard accessibility: Enter/Space triggers open
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const key = target?.dataset?.winKey as WindowKey | undefined;
      if (!key) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onOpen(key);
      }
    };
    const el = containerRef.current;
    el?.addEventListener("keydown", onKeyDown);
    return () => el?.removeEventListener("keydown", onKeyDown);
  }, [onOpen]);

  // persist items when they change
  useEffect(() => {
    try {
      localStorage.setItem("desktop_icons_v1", JSON.stringify(items));
    } catch {}
  }, [items]);

  const startDrag = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    key: WindowKey
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const idx = items.findIndex((it) => it.key === key);
    const p0 = { x: items[idx].x, y: items[idx].y };
    const onMove = (ev: MouseEvent) => {
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;
      const raw = { x: p0.x + dx, y: p0.y + dy };
      const clamped = clamp(raw.x, raw.y);
      setItems((prev) => {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], x: clamped.x, y: clamped.y };
        return copy;
      });
    };
    const onUp = () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      // snap to grid on release
      setItems((prev) => {
        const copy = [...prev];
        const p = copy[idx];
        copy[idx] = {
          ...p,
          x: Math.round(p.x / GRID) * GRID,
          y: Math.round(p.y / GRID) * GRID,
        };
        return copy;
      });
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

  // context menu state
  const [menu, setMenu] = useState<
    | { open: true; x: number; y: number; key: WindowKey }
    | { open: false }
  >({ open: false });

  useEffect(() => {
    const close = () => setMenu({ open: false });
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  const onContext = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    key: WindowKey
  ) => {
    e.preventDefault();
    setMenu({ open: true, x: e.clientX, y: e.clientY, key });
  };

  const renameItem = (key: WindowKey) => {
    const idx = items.findIndex((it) => it.key === key);
    if (idx < 0) return;
    const current = items[idx].label;
    const next = prompt("Rename", current);
    if (next && next.trim()) {
      setItems((prev) => {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], label: next.trim() };
        return copy;
      });
    }
  };

  const deleteItem = (key: WindowKey) => {
    if (!confirm("Remove icon?")) return;
    setItems((prev) => prev.filter((it) => it.key !== key));
  };

  return (
    <div
      ref={containerRef}
      aria-label="Desktop Icons"
      className="pointer-events-none select-none"
      style={{ position: "relative", width: "100%", height: 0 }}
    >
      {items.map((item) => {
        const pos = { x: item.x, y: item.y };
        return (
          <button
            key={item.key}
            data-win-key={item.key}
            onClick={() => onOpen(item.key)}
            onMouseDown={(e) => startDrag(e, item.key)}
            onContextMenu={(e) => onContext(e, item.key)}
            className="group flex flex-col items-center w-20 focus:outline-none"
            style={{
              position: "absolute",
              left: pos.x,
              top: pos.y,
              pointerEvents: "auto",
            }}
            aria-label={item.label}
            title={item.label}
          >
            <div
              className="w-12 h-12 rounded-lg bg-white/15 border border-white/20 backdrop-blur-sm flex items-center justify-center shadow-md group-hover:bg-white/25 transition-colors"
              style={{ imageRendering: "pixelated" }}
            >
              <img src={item.iconSrc} alt="" className="w-7 h-7" />
            </div>
            <span className="mt-1 text-[11px] leading-tight text-white/90 text-center drop-shadow">
              {item.label}
            </span>
          </button>
        );
      })}

      {menu.open && "x" in menu && (
        <div
          className="fixed z-[3000] bg-black/80 text-white text-sm rounded-md border border-white/10"
          style={{ left: menu.x, top: menu.y, minWidth: 140 }}
        >
          <button
            className="block w-full text-left px-3 py-2 hover:bg-white/10"
            onClick={() => {
              renameItem(menu.key);
              setMenu({ open: false });
            }}
          >
            Rename
          </button>
          <button
            className="block w-full text-left px-3 py-2 hover:bg-white/10"
            onClick={() => {
              deleteItem(menu.key);
              setMenu({ open: false });
            }}
          >
            Delete
          </button>
          <button
            className="block w-full text-left px-3 py-2 hover:bg-white/10"
            onClick={() => setMenu({ open: false })}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
