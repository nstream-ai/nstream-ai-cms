import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yourdomain.com"), // Replace with your actual domain
  title: {
    default: "Nstream AI Blog",
    template: "%s | Nstream AI",
  },
  description: "Insights and updates from Nstream AI",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website", // This is now a valid literal
    siteName: "Nstream AI Blog",
    title: "Nstream AI Blog",
    description: "Insights and updates from Nstream AI",
    images: [
      {
        url: "/og-image.jpg", // Create this image in your public folder
        width: 1200,
        height: 630,
        alt: "Nstream AI Blog",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nstream AI Blog",
    description: "Insights and updates from Nstream AI",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}