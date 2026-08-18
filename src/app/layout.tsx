import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Be_Vietnam_Pro } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { siteConfig } from "@/config/site";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-be-vietnam",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#00f0ff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | Top 1 Server Minecraft RPG Việt Nam 1.20.4+ (IP: ${siteConfig.serverIp})`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    `Trải nghiệm máy chủ Minecraft RPG Việt Nam đỉnh cao (IP: ${siteConfig.serverIp}). Đào quặng Prison, săn Boss Dungeon RPG, tinh luyện trang bị Long Tộc, đại chiến Bang Hội KOTH Mỏ VIP & Chuyển Sinh thuộc tính!`,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-96.png", sizes: "96x96", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  keywords: [
    "minecraft rpg",
    "server minecraft rpg",
    "minecraft rpg viet nam",
    "server minecraft rpg viet nam",
    "top server minecraft rpg",
    "game minecraft rpg online",
    "server minecraft prison rpg",
    "minecraft rpg 1.20.4",
    "minecraft rpg 1.20.4+",
    "minecraft rpg 1.21",
    "aethermines.com",
    siteConfig.serverIp,
    "aethermine",
    "aethermines",
    "aethermine minecraft",
    "ip server minecraft",
    "ip server minecraft viet nam",
    "tim ip server minecraft",
    "server minecraft viet nam",
    "top server minecraft viet nam",
    "server minecraft hay nhat viet nam",
    "server minecraft online viet nam",
    "server minecraft choi pc",
    "ip minecraft viet nam",
    "server minecraft dao quang",
    "dao quang minecraft",
    "bang hoi minecraft viet nam",
    "koth minecraft viet nam",
    "trang bi long toc minecraft",
    "chuyen sinh minecraft",
    "boss dungeon minecraft",
    "tro choi minecraft tieng viet",
  ],
  authors: [{ name: siteConfig.author, url: siteConfig.websiteUrl }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  metadataBase: new URL(siteConfig.websiteUrl),
  alternates: {
    canonical: siteConfig.websiteUrl,
    languages: {
      "vi-VN": siteConfig.websiteUrl,
    },
    types: {
      "application/rss+xml": `${siteConfig.websiteUrl}/rss.xml`,
    },
  },
  openGraph: {
    title: `${siteConfig.name} | Top 1 Server Minecraft RPG Việt Nam 1.20.4+ (IP: ${siteConfig.serverIp})`,
    description:
      `Trải nghiệm máy chủ Minecraft RPG Việt Nam đỉnh cao (IP: ${siteConfig.serverIp}). Đào quặng Prison, săn Boss Dungeon RPG, tinh luyện trang bị Long Tộc & Bang Hội KOTH!`,
    url: siteConfig.websiteUrl,
    siteName: siteConfig.fullName,
    images: [
      {
        url: siteConfig.bannerUrl,
        width: 1200,
        height: 630,
        alt: `${siteConfig.fullName} Banner`,
      },
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.fullName} Banner`,
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Top 1 Server Minecraft RPG Việt Nam (IP: ${siteConfig.serverIp})`,
    description:
      `Máy chủ Minecraft RPG thế hệ mới tại Việt Nam (IP: ${siteConfig.serverIp}). Đào quặng, săn Boss Dungeon, chế đồ Long Tộc & Chuyển sinh!`,
    images: [siteConfig.bannerUrl],
  },
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
  category: "Gaming",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.fullName,
    alternateName: siteConfig.name,
    url: siteConfig.websiteUrl,
    inLanguage: "vi-VN",
  };

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.fullName,
    url: siteConfig.websiteUrl,
    logo: `${siteConfig.websiteUrl}${siteConfig.logoUrl}`,
    sameAs: [
      siteConfig.social.discord,
      siteConfig.social.facebook,
    ],
  };

  return (
    <html lang="vi" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body
        className={`${jakarta.variable} ${beVietnamPro.variable} bg-[#070913] text-slate-100 min-h-screen antialiased bg-cyber-grid font-sans tracking-wide scroll-smooth`}
      >
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
