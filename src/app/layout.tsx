import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://the-agency-os.example.com"),
  title: {
    default: "The Agency OS™ — Digital Agency, Web Dev, Branding",
    template: "%s | The Agency OS™",
  },
  description:
    "Retro desktop experience for a modern digital agency. Web development, branding, creative, marketing, SEO, social, contact.",
  keywords: [
    "digital agency",
    "web development",
    "website design",
    "branding",
    "creative agency",
    "marketing",
    "SEO",
    "social media",
    "AOL messenger",
    "retro website",
    "Windows 98",
    "coming soon",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "The Agency OS™ — Digital Agency, Web Dev, Branding",
    description:
      "Retro desktop experience for a modern digital agency. Explore apps, chat, and learn about our services.",
    url: "/",
    siteName: "The Agency OS™",
    images: [
      { url: "/images/og.jpg", width: 1200, height: 630, alt: "The Agency OS — #theagencyMASH" },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Agency OS™ — Digital Agency, Web Dev, Branding",
    description:
      "Retro desktop experience for a modern digital agency. Explore apps, chat, and learn about our services.",
    images: ["/images/og.jpg"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0b2a5e",
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
