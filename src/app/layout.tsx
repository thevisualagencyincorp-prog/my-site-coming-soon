import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agency OS - Pixel Perfect Digital Agency",
  description: "Immersive retro desktop experience showcasing our digital agency's portfolio and services. Built with Next.js and pixel art aesthetics.",
  keywords: ["digital agency", "pixel art", "retro design", "web development", "portfolio"],
  authors: [{ name: "Digital Agency" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#0078D4",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Agency OS - Pixel Perfect Digital Agency",
    description: "Experience our agency through an immersive retro desktop interface",
    type: "website",
    siteName: "Agency OS",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agency OS - Pixel Perfect Digital Agency", 
    description: "Experience our agency through an immersive retro desktop interface",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preload pixel fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-pixel antialiased">
        {children}
      </body>
    </html>
  );
}
