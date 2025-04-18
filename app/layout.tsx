import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StructuredData from "./components/StructuredData";
import { siteConfig } from "@/config/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://blog.nstream.ai"),
  title: {
    default: "Nstream AI Blog - AI & Machine Learning Insights",
    template: "%s | Nstream AI",
  },
  description: "Explore the latest insights on AI, machine learning, and technology from Nstream AI. Stay updated with our expert analysis and industry trends.",
  applicationName: "Nstream AI Blog",
  authors: [{ name: "Nstream AI" }],
  generator: "Next.js",
  keywords: ["AI", "Machine Learning", "Technology", "Artificial Intelligence", "Tech Blog", "Nstream AI"],
  referrer: "origin-when-cross-origin",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    siteName: "Nstream AI Blog",
    title: "Nstream AI Blog - AI & Machine Learning Insights",
    description: "Explore the latest insights on AI, machine learning, and technology from Nstream AI. Stay updated with our expert analysis and industry trends.",
    images: [
      {
        url: "/images/nstream-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nstream AI Blog",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@NstreamAI",
    creator: "@NstreamAI",
    title: "Nstream AI Blog - AI & Machine Learning Insights",
    description: "Explore the latest insights on AI, machine learning, and technology from Nstream AI. Stay updated with our expert analysis and industry trends.",
    images: ["/images/nstream-og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationData = {
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.ogImage}`,
    sameAs: [
      siteConfig.links.twitter,
      siteConfig.links.linkedin,
      siteConfig.links.github,
    ].filter(Boolean),
  };

  return (
    <html lang="en">
      <head>
        <link rel="canonical" href={siteConfig.url} />
        <StructuredData type="Organization" data={organizationData} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}