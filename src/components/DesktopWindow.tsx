"use client";
import { useRef, useState, useEffect } from "react";
import type { ReactNode, MouseEvent } from "react";

interface DesktopWindowProps {
  title: string;
  children: ReactNode;
  initialPosition?: { x: number; y: number };
  width?: number | string;
  height?: number | string;
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
  height = "auto",
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
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isMaximized, setIsMaximized] = useState(maximized);
  const [isMinimized, setIsMinimized] = useState(minimized);
  const [currentZIndex, setCurrentZIndex] = useState(zIndex);
  const windowRef = useRef<HTMLDivElement>(null);

  // Handle window focus (bring to front)
  const handleWindowClick = () => {
    const newZIndex = Date.now(); // Use timestamp for unique z-index
    setCurrentZIndex(newZIndex);
    if (onClick) onClick();
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (isMaximized) return; // Don't allow dragging when maximized
    
    setDragging(true);
    setOffset({
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    });
    handleWindowClick(); // Bring to front when starting drag
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!dragging || isMaximized) return;
    setPos({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };

  const handleMouseUp = () => setDragging(false);

  const handleMinimize = () => {
    setIsMinimized(true);
    if (onMinimize) onMinimize();
  };

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
    if (onMaximize) onMaximize();
  };

  const handleClose = () => {
    if (onClose) onClose();
  };

  // Reset position when un-maximizing
  useEffect(() => {
    if (!isMaximized && maximized) {
      setPos(initialPosition);
    }
  }, [isMaximized, maximized, initialPosition]);

  if (isMinimized) {
    return null; // Don't render when minimized
  }

  return (
    <div
      ref={windowRef}
      className="fixed select-none border border-gray-700 bg-gray-100 overflow-hidden shadow-[4px_4px_0_#888,8px_8px_0_#ccc]"
      style={{
        left: isMaximized ? 0 : pos.x,
        top: isMaximized ? 0 : pos.y,
        width: isMaximized ? "100vw" : width,
        height: isMaximized ? "100vh" : height,
        zIndex: currentZIndex,
        minWidth: 280,
        maxWidth: isMaximized ? "100vw" : "90vw",
        minHeight: 120,
        boxShadow: dragging
          ? "0 0 0 3px #1976d2, 0 8px 32px 0 rgba(0,0,0,0.25)"
          : "4px 4px 0 #888, 8px 8px 0 #ccc",
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
        className="flex items-center px-2 py-1 bg-gradient-to-r from-[#1976d2] to-[#63a4ff] border-b-2 border-[#0d47a1] cursor-grab relative"
        style={{ height: 32 }}
        onMouseDown={handleMouseDown}
      >
        {/* System icon */}
        <img
          src="/images/ai.webp"
          alt="icon"
          className="w-5 h-5 mr-2"
          style={{ imageRendering: "pixelated" }}
        />
        <span
          className="font-bold text-white text-sm tracking-wide drop-shadow-sm"
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
            className="w-6 h-6 bg-gray-200 border border-gray-700 flex items-center justify-center hover:bg-gray-300 active:bg-gray-400 transition-colors"
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
            className="w-6 h-6 bg-gray-200 border border-gray-700 flex items-center justify-center hover:bg-gray-300 active:bg-gray-400 transition-colors"
            style={{ boxShadow: "inset 1px 1px 0 #fff" }}
            title={isMaximized ? "Restore" : "Maximize"}
            onClick={(e) => {
              e.stopPropagation();
              handleMaximize();
            }}
          >
            <span className="block w-3 h-3 border-2 border-gray-700 border-t-0 border-l-0 rotate-45" />
          </button>
          <button
            className="w-6 h-6 bg-gray-200 border border-gray-700 flex items-center justify-center hover:bg-red-300 active:bg-red-400 transition-colors"
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
          maxHeight: isMaximized 
            ? "calc(100vh - 40px)" 
            : typeof height === "number" ? height - 40 : "60vh" 
        }}
      >
        {children}
      </div>
    </div>
  );
}
