"use client";

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
  | "coffeeClub";

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
  // visuals removed per request
  { key: "ads", label: "Promos & Press", icon: "�", category: "Studio" },
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
  { key: "notes", label: "Sticky Notes", icon: "📝", category: "Tools" },
  { key: "clippy", label: "Assistant", icon: "📎", category: "Tools" },
  // instagramPosts removed per request
  { key: "vibeCheck", label: "Vibe Check", icon: "✨", category: "Tools" },
  {
    key: "newsletter",
    label: "Mailing List",
    icon: "📧",
    category: "Communication",
  },
  { key: "mysteryClub", label: "Mystery Club", icon: "🕵️‍♀️", category: "Events" },
  { key: "coffeeClub", label: "Coffee Club", icon: "☕", category: "Events" },
];

export function StartMenu({
  open,
  onClose,
  onOpenWindow,
  onResetLayout,
}: StartMenuProps) {
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
      className="fixed z-[100] left-2 right-2 sm:left-4 sm:right-auto bottom-16 sm:bottom-16 w-auto sm:w-80 rounded-2xl bg-white/95 dark:bg-black/95 shadow-2xl border border-white/20 backdrop-blur-lg animate-fade-in"
      style={{ minHeight: 300, maxHeight: "70vh", overflowY: "auto" }}
      tabIndex={-1}
      role="menu"
      aria-label="Start Menu"
      onClick={onClose}
    >
      <div className="p-4" onClick={(e) => e.stopPropagation()}>
        <div
          className="mb-3 text-lg font-bold text-black dark:text-white"
          style={{ fontFamily: "Tahoma, Geneva, Verdana, sans-serif" }}
        >
          THE AGENCY OS™
        </div>

        {/* Quick search */}
        <input
          type="text"
          placeholder="Search apps..."
          className="w-full mb-4 px-3 py-2 rounded-lg bg-black/5 dark:bg-white/10 text-sm outline-none"
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
          <div key={category} className="mb-4">
            <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wide">
              {category}
            </div>
            <ul className="space-y-1">
              {items.map((item) => (
                <li key={item.key} data-menu-item data-label={item.label}>
                  <button
                    role="menuitem"
                    className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 text-black dark:text-white text-sm font-medium transition"
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
