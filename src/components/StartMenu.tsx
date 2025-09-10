"use client";

export type WindowKey =
  | "mash"
  | "aol"
  | "instagram"
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
  | "instagramPosts"
  | "vibeCheck"
  | "newsletter"
  | "mysteryClub"
  | "coffeeClub";

interface StartMenuProps {
  open: boolean;
  onClose: () => void;
  onOpenWindow: (windowKey: WindowKey) => void;
}

const menuItems: {
  key: WindowKey;
  label: string;
  icon: string;
  category?: string;
}[] = [
  { key: "mash", label: "MASH Game", icon: "🎯", category: "Fun" },
  { key: "aol", label: "AOL Messenger", icon: "💬", category: "Communication" },
  { key: "instagram", label: "Instagram", icon: "📸", category: "Social" },
  { key: "ads", label: "Ads", icon: "📢", category: "Business" },
  { key: "contact", label: "Contact", icon: "📧", category: "Communication" },
  { key: "faq", label: "Help & FAQ", icon: "❓", category: "Support" },
  { key: "about", label: "About Us", icon: "👥", category: "About" },
  { key: "creative", label: "Creative Wizard", icon: "🎨", category: "Tools" },
  { key: "metrics", label: "Agency Metrics", icon: "📊", category: "Business" },
  { key: "skeleton", label: "Skeleton Dance", icon: "💀", category: "Fun" },
  { key: "cat", label: "Funny Cats", icon: "🐱", category: "Fun" },
  { key: "virus", label: "Virus Alert", icon: "⚠️", category: "Fun" },
  { key: "bsod", label: "BSOD", icon: "💻", category: "Fun" },
  { key: "notes", label: "Sticky Notes", icon: "📝", category: "Tools" },
  { key: "clippy", label: "Clippy Assistant", icon: "📎", category: "Fun" },
  {
    key: "instagramPosts",
    label: "Instagram Posts",
    icon: "📸",
    category: "Social",
  },
  { key: "vibeCheck", label: "Vibe Check", icon: "✨", category: "Tools" },
  {
    key: "newsletter",
    label: "Newsletter",
    icon: "📧",
    category: "Communication",
  },
  { key: "mysteryClub", label: "Mystery Club", icon: "🕵️‍♀️", category: "Events" },
  { key: "coffeeClub", label: "Coffee Club", icon: "☕", category: "Events" },
];

export function StartMenu({ open, onClose, onOpenWindow }: StartMenuProps) {
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
      className="fixed left-4 bottom-16 z-[100] w-80 rounded-2xl bg-white/95 dark:bg-black/95 shadow-2xl border border-white/20 backdrop-blur-lg animate-fade-in"
      style={{ minHeight: 300, maxHeight: "70vh", overflowY: "auto" }}
      tabIndex={-1}
      onClick={onClose}
    >
      <div className="p-4">
        <div className="mb-4 text-lg font-bold text-black dark:text-white">
          The Agency OS™
        </div>

        {Object.entries(groupedItems).map(([category, items]) => (
          <div key={category} className="mb-4">
            <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wide">
              {category}
            </div>
            <ul className="space-y-1">
              {items.map((item) => (
                <li key={item.key}>
                  <button
                    className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 text-black dark:text-white text-sm font-medium transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenWindow(item.key);
                      onClose();
                    }}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
