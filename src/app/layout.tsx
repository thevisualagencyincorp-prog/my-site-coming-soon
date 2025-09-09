import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Agency Coming Soon",
  description: "A beautiful coming soon page with live weather and time",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
