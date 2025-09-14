"use client";

import { useState, useEffect } from "react";

export type WindowKey =
  | "mash"
  | "aol"
  | "ads"
  | "contact"
  | "faq"
  | "about"
  | "creative"
  | "metrics"
  | "skeleton"
  | "cat"
  | "virus"
  | "bsod"
  | "notes"
  | "clippy"
  | "vibeCheck"
  | "newsletter"
  | "mysteryClub"
  | "coffeeClub"
  | "portfolio"
  | "trash"
  | "instaAd"
  | "mtv"
  | "adMaker"
  | "book"
  | "videoLibrary";

interface StartMenuProps {
  open: boolean;
  onClose: () => void;
  onOpenWindow: (windowKey: WindowKey) => void;
  onResetLayout?: () => void;
}

const menuItems: {
  key: WindowKey;
  label: string;
  icon: string;
  category?: string;
}[] = [
  { key: "mash", label: "Fate Machine", icon: "🎯", category: "Fun" },
  { key: "aol", label: "Retro Chat", icon: "💬", category: "Communication" },
  // Ads hidden from menu; still available for timed pop-ups
  {
    key: "contact",
    label: "Reach / Contact",
    icon: "✉️",
    category: "Communication",
  },
  { key: "faq", label: "Help & Tips", icon: "❓", category: "Support" },
  { key: "about", label: "Studio Info", icon: "👥", category: "About" },
  { key: "creative", label: "Creative Lab", icon: "🎨", category: "Tools" },
  { key: "metrics", label: "Studio Metrics", icon: "📊", category: "Studio" },
  { key: "skeleton", label: "Dance Off", icon: "💀", category: "Fun" },
  { key: "cat", label: "Curated Cats", icon: "🐱", category: "Fun" },
  { key: "virus", label: "Faux Pop-ups", icon: "🎭", category: "Fun" },
  { key: "bsod", label: "Blue Screen Prank", icon: "💻", category: "Fun" },
  { key: "notes", label: "Notes", icon: "📝", category: "Tools" },
  { key: "clippy", label: "Assistant", icon: "📎", category: "Tools" },
  // instagramPosts removed per request
  { key: "vibeCheck", label: "Vibe Check", icon: "✨", category: "Tools" },
  { key: "portfolio", label: "Portfolio", icon: "🌐", category: "Studio" },
  { key: "trash", label: "Trash", icon: "🗑️", category: "Studio" },
  {
    key: "adMaker",
    label: "Agency AI — Ad Maker",
    icon: "🖼️",
    category: "Tools",
  },
  {
    key: "book",
    label: "Get on our calendar",
    icon: "🗓️",
    category: "Communication",
  },
  { key: "mtv", label: "MTV 00s", icon: "📺", category: "Fun" },
  {
    key: "newsletter",
    label: "Mailing List",
    icon: "📧",
    category: "Communication",
  },
  { key: "mysteryClub", label: "Mystery Club", icon: "🕵️‍♀️", category: "Events" },
  { key: "coffeeClub", label: "Coffee Club", icon: "☕", category: "Events" },
  {
    key: "videoLibrary",
    label: "Video Library",
    icon: "🎬",
    category: "Studio",
  },
];

export function StartMenu({
  open,
  onClose,
  onOpenWindow,
  onResetLayout,
}: StartMenuProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!open) return null;

  // Group menu items by category
  const groupedItems = menuItems.reduce((acc, item) => {
    const category = item.category || "Other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, typeof menuItems>);

  return (
    <div
      className={`fixed z-[100] rounded-2xl bg-gradient-to-br from-indigo-800/30 to-purple-600/30 shadow-2xl border border-white/20 backdrop-blur-lg animate-fade-in overflow-hidden ${
        isMobile
          ? "left-2 right-2 bottom-12"
          : "left-4 right-auto bottom-16 w-80"
      }`}
      style={{
        minHeight: isMobile ? 250 : 300,
        maxHeight: isMobile ? "60vh" : "70vh",
        overflowY: "auto",
      }}
      tabIndex={-1}
      role="menu"
      aria-label="Start Menu"
      onClick={onClose}
    >
      {/* subtle glow overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-25 bg-[radial-gradient(60%_60%_at_20%_0%,rgba(255,255,255,0.35),transparent_60%)]" />
      <div
        className={`relative ${isMobile ? "p-3" : "p-4"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`mb-3 font-bold text-white dark:text-white ${
            isMobile ? "text-base" : "text-lg"
          }`}
          style={{ fontFamily: "Tahoma, Geneva, Verdana, sans-serif" }}
        >
          THE AGENCY OS™
        </div>

        {/* Quick search */}
        <input
          type="text"
          placeholder="Search apps..."
          className={`w-full mb-4 px-3 py-2 rounded-lg bg-black/5 dark:bg-white/10 text-sm outline-none ${
            isMobile ? "text-base py-3" : ""
          }`}
          onChange={(e) => {
            const q = e.currentTarget.value.toLowerCase();
            const el = e.currentTarget.closest('[role="menu"]');
            if (!el) return;
            // Show/hide items based on search
            el.querySelectorAll("[data-menu-item]")?.forEach((node) => {
              const label =
                (node as HTMLElement).dataset.label?.toLowerCase() || "";
              (node as HTMLElement).style.display = label.includes(q)
                ? ""
                : "none";
            });
          }}
          aria-label="Search applications"
        />

        {Object.entries(groupedItems).map(([category, items]) => (
          <div key={category} className={isMobile ? "mb-6" : "mb-4"}>
            <div className="text-sm font-semibold text-white mb-2 uppercase tracking-wide">
              {category}
            </div>
            <ul className={isMobile ? "space-y-2" : "space-y-1"}>
              {items.map((item) => (
                <li key={item.key} data-menu-item data-label={item.label}>
                  <button
                    role="menuitem"
                    className={`flex items-center gap-3 w-full rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium transition-transform duration-150 border border-white/10 hover:border-white/20 hover:scale-[1.01] active:scale-[0.99] ${
                      isMobile ? "px-4 py-3 text-base" : "px-3 py-2 text-sm"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenWindow(item.key);
                      onClose();
                    }}
                  >
                    <span className="text-lg" aria-hidden>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                    {(item.key === "mtv" || item.key === "book") && (
                      <span
                        className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded bg-pink-500/90 text-white animate-bounce-dino"
                        aria-label="New"
                      >
                        NEW
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {onResetLayout && (
          <div className="pt-2 mt-2 border-t border-black/10 dark:border-white/10">
            <button
              className="w-full px-3 py-2 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-black/10 text-sm"
              onClick={(e) => {
                e.stopPropagation();
                onResetLayout();
                onClose();
              }}
            >
              Reset Layout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
