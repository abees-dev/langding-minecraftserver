import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Be_Vietnam_Pro } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { JsonLd } from "@/components/layout";
import { siteConfig } from "@/config/site";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-be-vietnam",
});

export const viewport: Viewport = {
  themeColor: "#00f0ff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: `${siteConfig.name} | Top 1 Server Minecraft RPG Việt Nam 1.19+ (IP: ${siteConfig.serverIp})`,
  description:
    `Trải nghiệm máy chủ Minecraft RPG Việt Nam đỉnh cao (IP: ${siteConfig.serverIp}). Đào quặng Prison, săn Boss Dungeon RPG, tinh luyện trang bị Long Tộc, đại chiến Bang Hội KOTH Mỏ VIP & Chuyển Sinh thuộc tính!`,
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/logo.png", type: "image/png" },
    ],
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  keywords: [
    "minecraft rpg",
    "server minecraft rpg",
    "minecraft rpg viet nam",
    "server minecraft rpg viet nam",
    "top server minecraft rpg",
    "game minecraft rpg online",
    "server minecraft prison rpg",
    "minecraft rpg 1.19",
    "minecraft rpg 1.20",
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
  },
  openGraph: {
    title: `${siteConfig.name} | Top 1 Server Minecraft RPG Việt Nam 1.19+ (IP: ${siteConfig.serverIp})`,
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
  return (
    <html lang="vi" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body
        className={`${jakarta.variable} ${beVietnamPro.variable} bg-[#070913] text-slate-100 min-h-screen antialiased bg-cyber-grid font-sans tracking-wide scroll-smooth`}
      >
        <JsonLd />
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
