"use client";

export function TopBar() {
  const handleHelpClick = () => {
    const event = new CustomEvent("openFAQWindow");
    window.dispatchEvent(event);
  };

  return (
    <div
      className="fixed top-0 left-0 w-full z-[100] h-10 flex items-center bg-gradient-to-r from-[#1976d2] to-[#63a4ff] border-b-2 border-[#0d47a1] shadow-md select-none"
      style={{
        fontFamily: "Tahoma, Geneva, Verdana, sans-serif",
        fontWeight: 700,
        fontSize: 16,
        color: "#fff",
        textShadow: "1px 1px 0 #000",
      }}
    >
      <span className="ml-4 mr-8 tracking-wider">The Agency OS™</span>
      <span className="mr-6 cursor-pointer hover:underline">File</span>
      <span className="mr-6 cursor-pointer hover:underline">Edit</span>
      <span
        className="mr-6 cursor-pointer hover:underline"
        onClick={handleHelpClick}
      >
        Help
      </span>
    </div>
  );
}
