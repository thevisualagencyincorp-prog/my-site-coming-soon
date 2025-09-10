"use client";
import { useState } from "react";
import type { ReactNode } from "react";

interface StartMenuProps {
  open: boolean;
  onClose: () => void;
  onOpenWindow: (windowKey: string) => void;
}

const menuItems = [
  { key: "clock", label: "Digital Clock", icon: "🕒" },
  { key: "weather", label: "Weather", icon: "🌤️" },
  { key: "about", label: "About The Agency", icon: "💼" },
  { key: "services", label: "Our Services", icon: "🛠️" },
  { key: "contact", label: "Contact", icon: "✉️" },
];

export function StartMenu({ open, onClose, onOpenWindow }: StartMenuProps) {
  if (!open) return null;
  return (
    <div
      className="fixed left-4 bottom-16 z-[100] w-64 rounded-2xl bg-white/90 dark:bg-black/90 shadow-2xl border border-white/20 backdrop-blur-lg animate-fade-in"
      style={{ minHeight: 220 }}
      tabIndex={-1}
      onClick={onClose}
    >
      <div className="p-4">
        <div className="mb-4 text-lg font-bold text-black dark:text-white">Start Menu</div>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.key}>
              <button
                className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 text-black dark:text-white text-base font-medium transition"
                onClick={e => {
                  e.stopPropagation();
                  onOpenWindow(item.key);
                  onClose();
                }}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
