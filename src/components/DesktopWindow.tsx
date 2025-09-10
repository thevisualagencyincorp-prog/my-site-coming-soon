"use client";
import { useRef, useState } from "react";
import type { ReactNode, MouseEvent } from "react";

interface DesktopWindowProps {
  title: string;
  children: ReactNode;
  initialPosition?: { x: number; y: number };
  width?: number | string;
  height?: number | string;
  zIndex?: number;
  onClick?: () => void;
}

export function DesktopWindow({
  title,
  children,
  initialPosition = { x: 100, y: 100 },
  width = 420,
  height = "auto",
  zIndex = 10,
  onClick,
}: DesktopWindowProps) {
  const [pos, setPos] = useState(initialPosition);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    setOffset({
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    });
    if (onClick) onClick();
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!dragging) return;
    setPos({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };

  const handleMouseUp = () => setDragging(false);

  return (
    <div
      ref={windowRef}
      className="fixed shadow-2xl rounded-2xl border border-white/20 bg-white/80 dark:bg-black/70 backdrop-blur-lg overflow-hidden select-none"
      style={{
        left: pos.x,
        top: pos.y,
        width,
        height,
        zIndex,
        minWidth: 280,
        maxWidth: "90vw",
        minHeight: 120,
        boxShadow: dragging
          ? "0 0 0 4px #6366f1, 0 8px 32px 0 rgba(0,0,0,0.25)"
          : "0 8px 32px 0 rgba(0,0,0,0.18)",
        transition: dragging ? "none" : "box-shadow 0.2s",
        cursor: dragging ? "grabbing" : "default",
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={onClick}
    >
      <div
        className="flex items-center gap-2 px-4 py-2 bg-white/30 dark:bg-black/40 border-b border-white/20 cursor-grab"
        onMouseDown={handleMouseDown}
      >
        <div className="w-2 h-2 rounded-full bg-red-400" />
        <div className="w-2 h-2 rounded-full bg-yellow-400" />
        <div className="w-2 h-2 rounded-full bg-green-400" />
        <span className="ml-4 font-semibold text-sm text-black/80 dark:text-white/80 truncate">
          {title}
        </span>
      </div>
      <div className="p-4 overflow-auto" style={{ maxHeight: typeof height === 'number' ? height - 40 : '60vh' }}>
        {children}
      </div>
    </div>
  );
}
