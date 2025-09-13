import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://the-agency-os.example.com"),
  title: {
    default:
      "Creative Digital Agency | Custom Web Development & App Development Experts",
    template: "%s | The Agency OS™",
  },
  description:
    "Award-winning creative digital agency in Kern County, CA specializing in custom web development, mobile app development, brand identity design, and professional photo/videography services. Serving Tehachapi, Lancaster, Bakersfield, Edwards AFB, California City, Bear Valley Springs, Stallion Springs, Sand Canyon, LA County, and beyond. Get a free quote for your next project.",
  keywords: [
    "creative digital agency",
    "web development agency",
    "custom web development",
    "app development company",
    "mobile app development",
    "brand identity design",
    "logo design agency",
    "website design company",
    "e-commerce development",
    "SEO agency",
    "digital marketing agency",
    "photo videography services",
    "professional photography",
    "video production company",
    "graphic design agency",
    "UI/UX design",
    "web design company",
    "branding agency",
    "digital advertising agency",
    "social media marketing",
    "content creation agency",
    "web development services",
    "app development services",
    "photography services",
    "video production services",
    "brand strategy",
    "digital strategy",
    "marketing strategy",
    "Kern County digital agency",
    "Tehachapi web development",
    "Lancaster web design",
    "Bakersfield app development",
    "Edwards AFB digital marketing",
    "California City branding",
    "LA County creative agency",
    "Kern County web development",
    "Tehachapi digital agency",
    "Lancaster app development",
    "Bakersfield web design",
    "Edwards AFB branding",
    "California City photography",
    "LA County photo videography",
    "Bear Valley Springs web development",
    "Stallion Springs digital agency",
    "Sand Canyon creative agency",
    "Bear Valley Springs app development",
    "Stallion Springs web design",
    "Sand Canyon branding",
    "Bear Valley Springs photography",
    "Stallion Springs photo videography",
    "Sand Canyon digital marketing",
    "Southern California digital agency",
    "Central Valley web development",
    "Mojave Desert creative agency",
    "Antelope Valley digital marketing",
    "web development company",
    "app development agency",
    "custom website development",
    "mobile application development",
    "brand design agency",
    "digital agency services",
    "creative agency near me",
    "web design agency",
    "coming soon page",
    "interactive website",
    "retro design",
    "Windows 98 aesthetic",
    "AOL messenger",
    "desktop experience",
  ],
  authors: [{ name: "The Agency OS™" }],
  creator: "The Agency OS™",
  publisher: "The Agency OS™",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "Creative Digital Agency | Custom Web Development & App Development Experts",
    description:
      "Award-winning creative digital agency in Kern County, CA specializing in custom web development, mobile app development, brand identity design, and professional photo/videography services. Serving Tehachapi, Lancaster, Bakersfield, Edwards AFB, California City, Bear Valley Springs, Stallion Springs, Sand Canyon, LA County, and beyond. Get a free quote for your next project.",
    url: "/",
    siteName: "The Agency OS™",
    images: [
      {
        url: "/images/og.jpg",
        width: 1200,
        height: 630,
        alt: "The Agency OS — Creative Digital Agency #theagencyMASH",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Creative Digital Agency | Custom Web Development & App Development Experts",
    description:
      "Award-winning creative digital agency in Kern County, CA specializing in custom web development, mobile app development, brand identity design, and professional photo/videography services. Serving Tehachapi, Lancaster, Bakersfield, Edwards AFB, California City, Bear Valley Springs, Stallion Springs, Sand Canyon, LA County, and beyond.",
    images: ["/images/og.jpg"],
  },
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification-code",
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
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "The Agency OS™",
    alternateName: "Creative Digital Agency",
    url: "https://the-agency-os.example.com",
    logo: "https://the-agency-os.example.com/images/fcon.webp",
    description:
      "Award-winning creative digital agency specializing in custom web development, mobile app development, brand identity design, and professional photo/videography services.",
    foundingDate: "2024",
    areaServed: [
      {
        "@type": "City",
        name: "Tehachapi",
        addressRegion: "CA",
        addressCountry: "US",
      },
      {
        "@type": "City",
        name: "Lancaster",
        addressRegion: "CA",
        addressCountry: "US",
      },
      {
        "@type": "City",
        name: "Bakersfield",
        addressRegion: "CA",
        addressCountry: "US",
      },
      {
        "@type": "City",
        name: "California City",
        addressRegion: "CA",
        addressCountry: "US",
      },
      {
        "@type": "City",
        name: "Bear Valley Springs",
        addressRegion: "CA",
        addressCountry: "US",
      },
      {
        "@type": "City",
        name: "Sand Canyon",
        addressRegion: "CA",
        addressCountry: "US",
      },
      {
        "@type": "City",
        name: "Stallion Springs",
        addressRegion: "CA",
        addressCountry: "US",
      },
      {
        "@type": "AdministrativeArea",
        name: "Kern County",
        addressRegion: "CA",
        addressCountry: "US",
      },
      {
        "@type": "AdministrativeArea",
        name: "Los Angeles County",
        addressRegion: "CA",
        addressCountry: "US",
      },
      {
        "@type": "AdministrativeArea",
        name: "Edwards Air Force Base",
        addressRegion: "CA",
        addressCountry: "US",
      },
      {
        "@type": "State",
        name: "California",
        addressCountry: "US",
      },
    ],
    sameAs: [
      "https://twitter.com/theagencyos",
      "https://www.instagram.com/theagencyos",
      "https://www.linkedin.com/company/theagencyos",
      "https://meettheagency.com",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-555-123-4567",
      contactType: "customer service",
      email: "hello@theagencyos.com",
      availableLanguage: "English",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
      addressRegion: "CA", // California
      addressLocality: "Tehachapi",
      addressCounty: "Kern County",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital Agency Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Custom Web Development",
            description:
              "Custom website development, responsive design, e-commerce solutions, and web applications using modern technologies",
            serviceType: "Web Development",
            provider: {
              "@type": "Organization",
              name: "The Agency OS™",
            },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mobile App Development",
            description:
              "iOS and Android app development, cross-platform solutions, and progressive web apps",
            serviceType: "App Development",
            provider: {
              "@type": "Organization",
              name: "The Agency OS™",
            },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Brand Identity Design",
            description:
              "Logo design, brand strategy, visual identity systems, and brand guidelines",
            serviceType: "Branding",
            provider: {
              "@type": "Organization",
              name: "The Agency OS™",
            },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Digital Marketing",
            description:
              "SEO services, social media marketing, content creation, and digital advertising campaigns",
            serviceType: "Digital Marketing",
            provider: {
              "@type": "Organization",
              name: "The Agency OS™",
            },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Photo Videography Services",
            description:
              "Professional photography, video production, product photography, and corporate headshots",
            serviceType: "Photo/Videography",
            provider: {
              "@type": "Organization",
              name: "The Agency OS™",
            },
          },
        },
      ],
    },
    knowsAbout: [
      "Web Development",
      "App Development",
      "Brand Identity Design",
      "Digital Marketing",
      "SEO Services",
      "Photo Videography",
      "Graphic Design",
      "UI/UX Design",
      "E-commerce Development",
      "Social Media Marketing",
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className="antialiased font-sans">{children}</body>
    </html>
  );
}
