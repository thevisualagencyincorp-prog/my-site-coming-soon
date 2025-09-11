"use client";

export function TopBar() {
  const handleHelpClick = () => {
    const event = new CustomEvent("openFAQWindow");
    window.dispatchEvent(event);
  };
  const handleFileClick = () => {
    window.dispatchEvent(new CustomEvent("openBSODWindow"));
  };
  const handleEditClick = () => {
    window.dispatchEvent(new CustomEvent("openSkeletonWindow"));
  };

  return (
    <div
      className="fixed top-0 left-0 w-full z-[100] h-10 flex items-center bg-gradient-to-br from-indigo-800/30 to-purple-600/30 border-b border-white/20 shadow-md select-none backdrop-blur-sm"
      style={{
        fontFamily: "Tahoma, Geneva, Verdana, sans-serif",
        fontWeight: 700,
        fontSize: 16,
        color: "#fff",
        textShadow: "1px 1px 0 #000",
      }}
    >
      <span className="ml-4 mr-8 tracking-wider">The Agency OS™</span>
      <span
        className="mr-6 cursor-pointer"
        role="button"
        tabIndex={0}
        onClick={handleFileClick}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleFileClick()}
        title="Open: Blue Screen Prank"
      >
        File
      </span>
      <span
        className="mr-6 cursor-pointer"
        role="button"
        tabIndex={0}
        onClick={handleEditClick}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleEditClick()}
        title="Open: Skeleton Dance Clip"
      >
        Edit
      </span>
      <span
        className="mr-6 cursor-pointer"
        role="button"
        tabIndex={0}
        onClick={handleHelpClick}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleHelpClick()}
        title="Open: FAQ"
      >
        Help
      </span>
    </div>
  );
}
