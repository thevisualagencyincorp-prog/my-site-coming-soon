"use client";
import { useRef, useState, useEffect } from "react";
import type { ReactNode, MouseEvent } from "react";

interface DesktopWindowProps {
  title: string;
  children: ReactNode;
  initialPosition?: { x: number; y: number };
  width?: number | string;
  height?: number | string;
  iconSrc?: string;
  zIndex?: number;
  onClick?: () => void;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  minimized?: boolean;
  maximized?: boolean;
}

export function DesktopWindow({
  title,
  children,
  initialPosition = { x: 100, y: 100 },
  width = 420,
  height = 320,
  iconSrc = "/images/folder.webp",
  zIndex = 10,
  onClick,
  onClose,
  onMinimize,
  onMaximize,
  minimized = false,
  maximized = false,
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
    const maxY = Math.max(0, vh - rect.height);
    return { x: Math.min(Math.max(0, next.x), maxX), y: Math.min(Math.max(0, next.y), maxY) };
  };

  const handleMouseUp = () => {
    if (dragging) {
      setPos((p) => clampToViewport(p));
    }
    setDragging(false);
  };

  const handleMinimize = () => {
    if (onMinimize) onMinimize();
  };

  const handleMaximize = () => {
    if (onMaximize) onMaximize();
  };

  const handleClose = () => {
    if (onClose) onClose();
  };

  // Reset position when un-maximizing
  useEffect(() => {
    // When a window is restored from maximized state, reset to initial position
    if (!maximized) {
      setPos(initialPosition);
    }
  }, [maximized, initialPosition]);

  if (minimized) {
    return null; // Don't render when minimized
  }

  return (
    <div
      ref={windowRef}
      className="fixed select-none border border-[#1b3a73] bg-[#f2f4fb] overflow-hidden shadow-[0_0_0_2px_#2b5fb8,6px_6px_0_#0b2a5e]"
      style={{
        left: maximized ? 0 : pos.x,
        top: maximized ? 0 : pos.y,
        width: maximized ? "100vw" : width,
        height: maximized ? "100vh" : height,
        zIndex: currentZIndex,
        minWidth: 280,
        maxWidth: maximized ? "100vw" : "90vw",
        minHeight: 120,
        boxShadow: dragging
          ? "0 0 0 2px #3b82f6, 0 10px 30px rgba(0,0,0,0.35)"
          : "0 0 0 2px #2b5fb8, 6px 6px 0 #0b2a5e",
        transition: dragging ? "none" : "box-shadow 0.2s",
        cursor: dragging ? "grabbing" : "default",
        borderRadius: 0,
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={handleWindowClick}
    >
      {/* Title bar */}
      <div
        className="flex items-center px-2 py-1 cursor-grab relative select-none"
        style={{
          height: 30,
          background: "linear-gradient(180deg, var(--win-title-start), var(--win-title-end))",
          borderBottom: "2px solid var(--win-border)",
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
            <span className="block w-3 h-0.5 bg-gray-700" />
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
            <span className="block w-3 h-3 border-2 border-gray-700 border-t-0 border-l-0 rotate-45" />
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
            <span className="block w-3 h-3 border-2 border-gray-700 border-t-0 border-l-0 rotate-45" />
          </button>
        </div>
      </div>
      {/* Content */}
      <div
        className="p-3 overflow-auto bg-white"
        style={{
          maxHeight: maximized
            ? "calc(100vh - 40px)"
            : typeof height === "number"
            ? height - 40
            : "60vh",
        }}
      >
        {children}
      </div>
    </div>
  );
}
