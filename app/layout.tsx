import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StructuredData from "./components/StructuredData";
import { siteConfig } from "@/config/site";
import Script from 'next/script';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const GTM_ID = 'GTM-MDZV9X5K';

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
    default: "Nstream AI Blog - Solving realtime problems with Generative AI",
    template: "%s | Nstream AI",
  },
  description: "Explore the latest usecases of realtime transactions, data analysis, mcp tool actions, and more.",
  applicationName: "Nstream AI Blog",
  authors: [{ name: "Nstream AI" }],
  generator: "Next.js",
  keywords: ["Nstream AI", "Generative AI", "Real-time", "Data Analysis", "realtime agents", "RAG for realtime data", "Nstream AI Blog"],
  referrer: "origin-when-cross-origin",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    siteName: "Nstream AI Blog",
    title: "Nstream AI Blog - Solving realtime problems with Generative AI",
    description: "Explore the latest usecases of realtime transactions, data analysis, mcp tool actions, and more.",
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
    title: "Nstream AI Blog - Solving realtime problems with Generative AI",
    description: "Explore the latest usecases of realtime transactions, data analysis, mcp tool actions, and more.",
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
        {/* Google Analytics gtag */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
window.gtag = function(){window.dataLayer.push(arguments);};
gtag('js', new Date());
gtag('config', '${GA_ID}', { page_path: window.location.pathname });`}
            </Script>
          </>
        )}
        {/* Preconnect for analytics & fonts */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        {/* Google Tag Manager */}
        <Script
          id="gtm-head"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
        {/* End Google Tag Manager */}
        <link rel="canonical" href={siteConfig.url} />
        <StructuredData type="Organization" data={organizationData} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
      </body>
    </html>
  );
}