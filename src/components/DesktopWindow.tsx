"use client";
import { useRef, useState, useEffect, useId } from "react";
import type { ReactNode, MouseEvent, PointerEvent } from "react";

interface DesktopWindowProps {
  title: string;
  children: ReactNode;
  initialPosition?: { x: number; y: number };
  width?: number | string;
  height?: number | string;
  iconSrc?: string;
  windowKey?: string; // used for magnetic alignment query
  zIndex?: number;
  onClick?: () => void;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onLayoutChange?: (layout: {
    x: number;
    y: number;
    width: number;
    height: number;
  }) => void;
  minimized?: boolean;
  maximized?: boolean;
  autoDock?: boolean;
}

export function DesktopWindow({
  title,
  children,
  initialPosition = { x: 100, y: 100 },
  width = 420,
  height = 320,
  iconSrc = "/images/folder.webp",
  windowKey,
  zIndex = 10,
  onClick,
  onClose,
  onMinimize,
  onMaximize,
  onLayoutChange,
  minimized = false,
  maximized = false,
  autoDock = false,
}: DesktopWindowProps) {
  const [pos, setPos] = useState(initialPosition);
  const [dragging, setDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const [resizing, setResizing] = useState(false);
  const resizeRef = useRef({
    startX: 0,
    startY: 0,
    startW: 0,
    startH: 0,
    startLeft: 0,
    startTop: 0,
    dir: "se" as "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw",
  });
  const [size, setSize] = useState({
    width: typeof width === "number" ? width : 420,
    height: typeof height === "number" ? height : 320,
  });
  // Parent controls min/max state; this component only reports actions
  const [currentZIndex, setCurrentZIndex] = useState(zIndex);
  const windowRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const [appearing, setAppearing] = useState(true);
  const [closing, setClosing] = useState(false);
  const GRID = 16;
  const MAGNET_THRESHOLD = 12;
  const TASKBAR_HEIGHT = 54; // keep room for taskbar when maximized

  // Handle window focus (bring to front)
  const handleWindowClick = () => {
    const newZIndex = Date.now(); // Use timestamp for unique z-index
    setCurrentZIndex(newZIndex);
    if (onClick) onClick();
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (maximized) return; // Don't allow dragging when maximized
    e.preventDefault();
    setDragging(true);
    dragOffset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    handleWindowClick(); // Bring to front when starting drag
  };

  const handleMouseMove = (_e: MouseEvent<HTMLDivElement>) => {
    // Movement handled by global listeners while dragging/resizing
  };

  const clampToViewport = (next: { x: number; y: number }) => {
    const el = windowRef.current;
    if (!el) return next;
    const rect = el.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const maxX = Math.max(0, vw - rect.width);
    const maxY = Math.max(0, vh - TASKBAR_HEIGHT - rect.height);
    return {
      x: Math.min(Math.max(0, next.x), maxX),
      y: Math.min(Math.max(0, next.y), maxY),
    };
  };

  const handleMouseUp = () => {
    if (dragging) setPos((p) => clampToViewport(p));
    setDragging(false);
  };

  const handleMinimize = () => {
    if (onMinimize) onMinimize();
  };

  const handleMaximize = () => {
    if (onMaximize) onMaximize();
  };

  const handleClose = () => {
    // run close animation before unmounting
    setClosing(true);
    setTimeout(() => onClose && onClose(), 180);
  };

  // Reset position when un-maximizing
  useEffect(() => {
    // When a window is restored from maximized state, reset to initial position
    if (!maximized) {
      setPos(initialPosition);
    }
  }, [maximized, initialPosition]);

  useEffect(() => {
    // end appear animation shortly after mount
    const t = setTimeout(() => setAppearing(false), 180);
    // focus window for accessibility
    windowRef.current?.focus();
    return () => clearTimeout(t);
  }, []);

  // Global listeners for dragging
  useEffect(() => {
    if (!dragging || maximized) return;
    const onMove = (e: globalThis.MouseEvent) => {
      const nx = e.clientX - dragOffset.current.x;
      const ny = e.clientY - dragOffset.current.y;
      // live snap to grid while dragging
      setPos({
        x: Math.round(nx / GRID) * GRID,
        y: Math.round(ny / GRID) * GRID,
      });
    };
    const onUp = () => {
      setDragging(false);
      setPos((p) => {
        const snapped = {
          x: Math.round(p.x / GRID) * GRID,
          y: Math.round(p.y / GRID) * GRID,
        };
        // magnetic align to other windows and viewport edges
        const finalPos = applyMagnet(snapped);
        if (onLayoutChange) {
          onLayoutChange({
            x: finalPos.x,
            y: finalPos.y,
            width: size.width as number,
            height: size.height as number,
          });
        }
        return finalPos;
      });
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [dragging, maximized]);

  // Auto-dock on outside click (for chat-like windows)
  useEffect(() => {
    if (!autoDock || !onMinimize) return;
    const handler = (e: globalThis.MouseEvent) => {
      const el = windowRef.current;
      if (!el) return;
      const target = e.target as HTMLElement | null;
      const inTaskbar = !!target?.closest('[data-role="taskbar"]');
      if (!inTaskbar && !el.contains(target as Node)) {
        onMinimize();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [autoDock, onMinimize]);

  // Global listeners for resizing
  useEffect(() => {
    if (!resizing || maximized) return;
    const onMove = (e: globalThis.MouseEvent) => {
      const { dir, startX, startY, startW, startH, startLeft, startTop } =
        resizeRef.current;
      let newW = startW;
      let newH = startH;
      let newLeft = startLeft;
      let newTop = startTop;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      if (dir.includes("e")) newW = Math.max(280, startW + dx);
      if (dir.includes("s")) newH = Math.max(120, startH + dy);
      if (dir.includes("w")) {
        newW = Math.max(280, startW - dx);
        newLeft = startLeft + dx;
      }
      if (dir.includes("n")) {
        newH = Math.max(120, startH - dy);
        newTop = startTop + dy;
      }
      setSize({ width: newW, height: newH });
      setPos(clampToViewport({ x: newLeft, y: newTop }));
    };
    const onUp = () => {
      setResizing(false);
      if (onLayoutChange) {
        onLayoutChange({
          x: pos.x,
          y: pos.y,
          width: size.width as number,
          height: size.height as number,
        });
      }
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [resizing, maximized]);

  // Magnetic alignment helper: snaps to viewport edges and other windows
  const applyMagnet = (next: { x: number; y: number }) => {
    const el = windowRef.current;
    if (!el) return clampToViewport(next);
    const rect = el.getBoundingClientRect();
    let { x, y } = next;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    // edges
    if (Math.abs(x - 0) < MAGNET_THRESHOLD) x = 0;
    if (Math.abs(x + rect.width - vw) < MAGNET_THRESHOLD) x = vw - rect.width;
    if (Math.abs(y - 0) < MAGNET_THRESHOLD) y = 0;
    if (Math.abs(y + rect.height - (vh - TASKBAR_HEIGHT)) < MAGNET_THRESHOLD)
      y = vh - TASKBAR_HEIGHT - rect.height;

    // other windows
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>(".desktop-window")
    );
    for (const node of nodes) {
      if (node === el) continue;
      const r = node.getBoundingClientRect();
      // current edges relative to viewport
      const left = x;
      const right = x + rect.width;
      const top = y;
      const bottom = y + rect.height;
      // snap horizontally (our left to their right, our right to their left)
      if (
        Math.abs(left - r.right) < MAGNET_THRESHOLD &&
        overlapsVert(top, bottom, r.top, r.bottom)
      )
        x = r.right;
      if (
        Math.abs(right - r.left) < MAGNET_THRESHOLD &&
        overlapsVert(top, bottom, r.top, r.bottom)
      )
        x = r.left - rect.width;
      // snap vertically (our top to their bottom, our bottom to their top)
      if (
        Math.abs(top - r.bottom) < MAGNET_THRESHOLD &&
        overlapsHoriz(left, right, r.left, r.right)
      )
        y = r.bottom;
      if (
        Math.abs(bottom - r.top) < MAGNET_THRESHOLD &&
        overlapsHoriz(left, right, r.left, r.right)
      )
        y = r.top - rect.height;
    }
    return clampToViewport({ x, y });
  };

  const overlapsHoriz = (l1: number, r1: number, l2: number, r2: number) =>
    Math.min(r1, r2) - Math.max(l1, l2) > 0;
  const overlapsVert = (t1: number, b1: number, t2: number, b2: number) =>
    Math.min(b1, b2) - Math.max(t1, t2) > 0;

  if (minimized) {
    return null; // Don't render when minimized
  }

  return (
    <div
      ref={windowRef}
      className={`desktop-window fixed select-none border border-[#1b3a73] bg-[#f2f4fb] overflow-hidden shadow-[0_0_0_2px_#2b5fb8,6px_6px_0_#0b2a5e] transition-transform transition-opacity duration-150 ${
        appearing
          ? "scale-95 opacity-0"
          : closing
          ? "scale-95 opacity-0"
          : "scale-100 opacity-100"
      }`}
      style={{
        left: maximized ? 0 : pos.x,
        top: maximized ? 0 : pos.y,
        width: maximized ? "100vw" : size.width,
        height: maximized ? `calc(100vh - ${TASKBAR_HEIGHT}px)` : size.height,
        zIndex: currentZIndex,
        minWidth: 280,
        maxWidth: maximized ? "100vw" : "90vw",
        minHeight: 120,
        boxShadow: dragging
          ? "0 0 0 2px rgba(59,130,246,0.6), 0 14px 40px rgba(0,0,0,0.35)"
          : `var(--win-shadow-2), var(--win-shadow-1)`,
        transition: dragging ? "none" : "box-shadow 0.2s",
        cursor: dragging ? "grabbing" : "default",
        borderRadius: 0,
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={handleWindowClick}
      data-window={windowKey || title}
      role="dialog"
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      {/* Title bar */}
      <div
        className="flex items-center px-2 py-1 cursor-grab relative select-none bg-gradient-to-br from-indigo-800/30 to-purple-600/30 border-b border-white/20 backdrop-blur-sm text-white"
        style={{
          height: 30,
          boxShadow: "inset 0 -2px 0 rgba(0,0,0,0.12)",
        }}
        onMouseDown={handleMouseDown}
        onDoubleClick={(e) => {
          e.stopPropagation();
          handleMaximize();
        }}
      >
        {/* System icon */}
        <img
          src={iconSrc}
          alt="icon"
          className="w-5 h-5 mr-2"
          style={{ imageRendering: "pixelated" }}
        />
        <span
          className="font-bold text-white text-xs tracking-wide drop-shadow-sm"
          style={{
            fontFamily: "Tahoma, Geneva, Verdana, sans-serif",
            textShadow: "1px 1px 0 #000",
          }}
          id={titleId}
        >
          {title}
        </span>
        {/* Window controls */}
        <div className="ml-auto flex gap-1">
          <button
            className="w-6 h-6 bg-[#efeff5] border border-[#1b3a73] flex items-center justify-center hover:bg-white active:bg-gray-200 transition-colors"
            style={{ boxShadow: "inset 1px 1px 0 #fff" }}
            title="Minimize"
            onClick={(e) => {
              e.stopPropagation();
              handleMinimize();
            }}
          >
            {/* minimize icon */}
            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0"
                y="3"
                width="10"
                height="1.5"
                fill="#1f2937"
                rx="0.5"
              />
            </svg>
          </button>
          <button
            className="w-6 h-6 bg-[#efeff5] border border-[#1b3a73] flex items-center justify-center hover:bg-white active:bg-gray-200 transition-colors"
            style={{ boxShadow: "inset 1px 1px 0 #fff" }}
            title={maximized ? "Restore" : "Maximize"}
            onClick={(e) => {
              e.stopPropagation();
              handleMaximize();
            }}
          >
            {/* maximize icon */}
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="1.5"
                y="1.5"
                width="7"
                height="7"
                stroke="#1f2937"
                strokeWidth="1.2"
                fill="none"
                rx="1"
              />
            </svg>
          </button>
          <button
            className="w-6 h-6 bg-[#ffdad6] border border-[#1b3a73] flex items-center justify-center hover:bg-[#ffc7c0] active:bg-[#ffb2a8] transition-colors"
            style={{ boxShadow: "inset 1px 1px 0 #fff" }}
            title="Close"
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
          >
            {/* close icon */}
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1 L9 9 M9 1 L1 9"
                stroke="#2b2b2b"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
      {/* Content */}
      <div
        className="p-3 overflow-auto bg-white"
        style={{
          maxHeight: maximized
            ? "calc(100vh - 40px)"
            : typeof size.height === "number"
            ? (size.height as number) - 40
            : "60vh",
        }}
      >
        {children}
      </div>

      {/* Resize handles */}
      {!maximized && (
        <>
          {(
            [
              [
                "n",
                "top-0 left-1/2 -translate-x-1/2 h-1 w-full cursor-n-resize",
              ],
              [
                "s",
                "bottom-0 left-1/2 -translate-x-1/2 h-1 w-full cursor-s-resize",
              ],
              [
                "e",
                "right-0 top-1/2 -translate-y-1/2 w-1 h-full cursor-e-resize",
              ],
              [
                "w",
                "left-0 top-1/2 -translate-y-1/2 w-1 h-full cursor-w-resize",
              ],
              ["ne", "right-0 top-0 w-3 h-3 cursor-ne-resize"],
              ["nw", "left-0 top-0 w-3 h-3 cursor-nw-resize"],
              ["se", "right-0 bottom-0 w-3 h-3 cursor-se-resize"],
              ["sw", "left-0 bottom-0 w-3 h-3 cursor-sw-resize"],
            ] as const
          ).map(([dir, cls]) => (
            <div
              key={dir}
              className={`absolute ${cls}`}
              style={{ background: "transparent" }}
              onMouseDown={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleWindowClick();
                resizeRef.current = {
                  startX: e.clientX,
                  startY: e.clientY,
                  startW: typeof size.width === "number" ? size.width : 420,
                  startH: typeof size.height === "number" ? size.height : 320,
                  startLeft: pos.x,
                  startTop: pos.y,
                  dir: dir as typeof resizeRef.current.dir,
                };
                setResizing(true);
              }}
            />
          ))}
        </>
      )}
    </div>
  );
}
