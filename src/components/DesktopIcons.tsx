"use client";

import React, { useEffect, useRef, useState } from "react";
import type { WindowKey } from "./StartMenu";
import { assetPath } from "@/lib/assetPath";

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
  const CURRENT_LAYOUT_VERSION = "2025-09-12-main-v2";
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const initialIcons: IconItem[] = [
    {
      key: "aol",
      label: "Messenger",
      iconSrc: "/images/icons/aol.svg",
      x: 24,
      y: 96,
    },
    {
      key: "mash",
      label: "MASH",
      iconSrc: "/images/icons/mash.svg",
      x: 24,
      y: 176,
    },
    {
      key: "cat",
      label: "Cats",
      iconSrc: "/images/icons/cat.svg",
      x: 24,
      y: 256,
    },
    {
      key: "about",
      label: "Meet Marketing Baddies in Your Area",
      iconSrc: "/images/icons/about.svg",
      x: 24,
      y: 336,
    },
    {
      key: "faq",
      label: "Help & Tips",
      iconSrc: "/images/icons/faq.svg",
      x: 24,
      y: 336,
    },
    {
      key: "notes",
      label: "Sticky Notes",
      iconSrc: "/images/icons/notes.svg",
      x: 120,
      y: 96,
    },
    {
      key: "mysteryClub",
      label: "Mystery Club",
      iconSrc: "/images/icons/mystery.svg",
      x: 120,
      y: 176,
    },
    {
      key: "coffeeClub",
      label: "Coffee Club",
      iconSrc: "/images/icons/coffee.svg",
      x: 120,
      y: 256,
    },
    {
      key: "portfolio",
      label: "Portfolio",
      iconSrc: "/globe.svg",
      x: 216,
      y: 96,
    },
    { key: "trash", label: "Trash", iconSrc: "/window.svg", x: 216, y: 176 },
    {
      key: "videoLibrary",
      label: "Video Library",
      iconSrc: "/images/icons/folder.svg",
      x: 216,
      y: 256,
    },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const GRID = 16;
  const ICON_W = 80; // approx button width
  const ICON_H = 80; // approx button height

  // Detect saved layout once, before state init
  let hadSavedInit = false;
  let initialState: IconItem[] = initialIcons;
  if (typeof window !== "undefined") {
    try {
      const savedVersion = window.localStorage.getItem("desktop_icons_version");
      const raw = window.localStorage.getItem("desktop_icons_v1");
      if (raw && savedVersion === CURRENT_LAYOUT_VERSION) {
        hadSavedInit = true;
        initialState = JSON.parse(raw) as IconItem[];
      } else {
        // Clear outdated layout to adopt the new default
        window.localStorage.removeItem("desktop_icons_v1");
      }
    } catch {}
  }
  const hadSavedRef = useRef<boolean>(hadSavedInit);
  const [items, setItems] = useState<IconItem[]>(initialState);

  // Optional runtime override from /desktop-icons.json (first-time only)
  useEffect(() => {
    let cancelled = false;
    fetch("/desktop-icons.json")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data || cancelled) return;
        // If the user (or a prior session) already has a saved layout, do not override it.
        if (hadSavedRef.current) return;
        // Validate and merge: only known keys
        const byKey = new Map<WindowKey, IconItem>();
        (items.length ? items : initialIcons).forEach((i) =>
          byKey.set(i.key, i)
        );
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
        const EXCLUDED: WindowKey[] = [
          "clippy",
          "ads",
          "instaAd",
          "newsletter",
          "virus",
        ];
        const merged = Array.from(byKey.values()).filter(
          (i) => !EXCLUDED.includes(i.key)
        );
        // One-time auto-arrange to set an initial tidy layout for first-time visitors only
        const arranged = autoArrange(merged);
        setItems(arranged);
        hadSavedRef.current = true;
        try {
          localStorage.setItem("desktop_icons_v1", JSON.stringify(arranged));
          localStorage.setItem("desktop_icons_version", CURRENT_LAYOUT_VERSION);
        } catch {}
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

  // Auto-arrange into neat columns with natural spacing
  const autoArrange = (list: IconItem[]) => {
    // Use natural left-to-right, top-to-bottom across stable list order (no alpha sort)
    const vw = typeof window !== "undefined" ? window.innerWidth : 1280;
    const TOP = 96;
    const V = 92; // vertical spacing that breathes
    const TASKBAR = 64;
    const vh = typeof window !== "undefined" ? window.innerHeight : 800;
    const COL_W = 100;
    const LEFT = 24;
    const maxCols = Math.max(
      2,
      Math.min(6, Math.floor((vw - LEFT * 2) / COL_W))
    );
    const COL_X = Array.from({ length: maxCols }, (_v, i) => LEFT + i * COL_W);
    const usableH = Math.max(200, vh - TASKBAR - TOP - 16);
    const rowsPerCol = Math.max(1, Math.floor(usableH / V));
    const others = list.filter((i) => i.key !== ("trash" as WindowKey));
    const trash = list.find((i) => i.key === ("trash" as WindowKey));
    const arranged: IconItem[] = [];
    for (let idx = 0; idx < others.length; idx++) {
      const col = Math.floor(idx / rowsPerCol);
      const row = idx % rowsPerCol;
      const x = COL_X[Math.min(col, COL_X.length - 1)];
      const y = TOP + row * V;
      arranged.push({ ...others[idx], x, y });
    }
    if (trash) {
      // Place Trash bottom-right above the taskbar (near the system tray)
      arranged.push({
        ...trash,
        x: COL_X[Math.max(0, COL_X.length - 1)],
        y: TOP + (rowsPerCol - 1) * V,
      });
    }
    return arranged;
  };

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

  // Note: right-click rename/delete disabled per request

  if (!mounted) {
    return (
      <div
        aria-label="Desktop Icons"
        className="pointer-events-none select-none"
        style={{ position: "relative", width: "100%", height: 0 }}
        suppressHydrationWarning
      />
    );
  }

  return (
    <div
      ref={containerRef}
      aria-label="Desktop Icons"
      className="pointer-events-none select-none"
      style={{ position: "relative", width: "100%", height: 0 }}
    >
      {/* Render all icons except special items (trash handled separately) */}
      {items
        .filter(
          (item) =>
            ![
              "clippy",
              "ads",
              "instaAd",
              "newsletter",
              "virus",
              "faq",
              "trash",
            ].includes(item.key)
        )
        .map((item) => {
          const pos = { x: item.x, y: item.y };
          return (
            <button
              key={item.key}
              data-win-key={item.key}
              onClick={() => onOpen(item.key)}
              onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) =>
                startDrag(e, item.key)
              }
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
                <TransparentIcon
                  keyId={item.key}
                  src={assetPath(item.iconSrc)}
                />
              </div>
              <span className="mt-1 text-[11px] leading-tight text-white/90 text-center drop-shadow">
                {item.label}
              </span>
            </button>
          );
        })}

      {/* Docked Trash - render fixed so it always stays bottom-right*/}
      {(() => {
        const trashItem = items.find((i) => i.key === ("trash" as WindowKey));
        if (!trashItem) return null;
        return (
          <button
            key={trashItem.key}
            data-win-key={trashItem.key}
            onClick={() => onOpen(trashItem.key)}
            onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) =>
              startDrag(e, trashItem.key)
            }
            className="group flex flex-col items-center w-20 focus:outline-none"
            style={{
              position: "fixed",
              right: 24,
              bottom: 96,
              pointerEvents: "auto",
              zIndex: 1000,
            }}
            aria-label={trashItem.label}
            title={trashItem.label}
          >
            <div
              className="w-12 h-12 rounded-lg bg-white/15 border border-white/20 backdrop-blur-sm flex items-center justify-center shadow-md group-hover:bg-white/25 transition-colors"
              style={{ imageRendering: "pixelated" }}
            >
              <TransparentIcon
                keyId={trashItem.key}
                src={assetPath(trashItem.iconSrc)}
              />
            </div>
            <span className="mt-1 text-[11px] leading-tight text-white/90 text-center drop-shadow">
              {trashItem.label}
            </span>
          </button>
        );
      })()}

      {/* Right-click menu intentionally removed */}
    </div>
  );
}

function TransparentIcon({ src, keyId }: { src: string; keyId: string }) {
  const [out, setOut] = useState<string | null>(null);
  useEffect(() => {
    // Only process if JPEG; otherwise use as-is
    const cacheKey = `<icon_transparent_1>Trash</icon_transparent_1>`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      setOut(cached);
      return;
    }
    // Prefer pre-cut PNG if available for Clippy (check multiple candidates)
    if (src.toLowerCase().includes("clippy") || keyId === "clippy") {
      const candidates = [
        "/images/clippy-1.png",
        "/images/clippy.png",
        "/brand/clippy.png",
        "/images/icons/clippy-1.png",
        "/images/icons/clippy.svg",
      ];
      const tryNext = (i: number) => {
        if (i >= candidates.length) return;
        const probe = new Image();
        probe.onload = () => {
          setOut(candidates[i]);
          try {
            localStorage.setItem(cacheKey, candidates[i]);
          } catch {}
        };
        probe.onerror = () => tryNext(i + 1);
        probe.src = candidates[i];
      };
      tryNext(0);
    }
    const isJpeg = /\.jpe?g($|\?)/i.test(src);
    if (!isJpeg) {
      setOut(src);
      return;
    }
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          setOut(src);
          return;
        }
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        const w = imageData.width;
        const h = imageData.height;
        const idx = (x: number, y: number) => (y * w + x) * 4;
        const clamp = (n: number, min: number, max: number) =>
          Math.max(min, Math.min(max, n));
        // corner samples
        const samples: number[][] = [];
        const patch = 4;
        const addPatch = (sx: number, sy: number) => {
          let rr = 0,
            gg = 0,
            bb = 0,
            count = 0;
          for (let y = sy; y < sy + patch; y++) {
            for (let x = sx; x < sx + patch; x++) {
              const p = idx(clamp(x, 0, w - 1), clamp(y, 0, h - 1));
              rr += data[p];
              gg += data[p + 1];
              bb += data[p + 2];
              count++;
            }
          }
          samples.push([rr / count, gg / count, bb / count]);
        };
        addPatch(0, 0);
        addPatch(w - patch, 0);
        addPatch(0, h - patch);
        addPatch(w - patch, h - patch);
        const dist2 = (c1: number[], c2: number[]) => {
          const dr = c1[0] - c2[0];
          const dg = c1[1] - c2[1];
          const db = c1[2] - c2[2];
          return dr * dr + dg * dg + db * db;
        };
        const tol = 95,
          tol2 = tol * tol; // good default for icons
        const isBg = (x: number, y: number) => {
          const p = idx(x, y);
          const c = [data[p], data[p + 1], data[p + 2]];
          for (const s of samples) if (dist2(c, s) <= tol2) return true;
          return false;
        };
        const visited = new Uint8Array(w * h);
        const q: number[] = [];
        const pushIf = (x: number, y: number) => {
          if (x < 0 || y < 0 || x >= w || y >= h) return;
          const id = y * w + x;
          if (visited[id]) return;
          if (!isBg(x, y)) return;
          visited[id] = 1;
          q.push(x, y);
        };
        for (let x = 0; x < w; x++) {
          pushIf(x, 0);
          pushIf(x, h - 1);
        }
        for (let y = 0; y < h; y++) {
          pushIf(0, y);
          pushIf(w - 1, y);
        }
        while (q.length) {
          const y = q.pop() as number;
          const x = q.pop() as number;
          const p = idx(x, y);
          data[p + 3] = 0;
          pushIf(x + 1, y);
          pushIf(x - 1, y);
          pushIf(x, y + 1);
          pushIf(x, y - 1);
        }
        ctx.putImageData(imageData, 0, 0);
        const url = canvas.toDataURL("image/png");
        try {
          localStorage.setItem(cacheKey, url);
        } catch {}
        setOut(url);
      } catch {
        setOut(src);
      }
    };
    img.onerror = () => setOut(src);
    img.src = src;
  }, [src, keyId]);

  return <img src={out ?? src} alt="" className="w-7 h-7" />;
}
