import type { Metadata, Viewport } from "next";
import { Rajdhani, Inter } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rajdhani",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const viewport: Viewport = {
  themeColor: "#00f0ff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "AetherMine | Top 1 Server Minecraft RPG Việt Nam 1.19+ (IP: mc.aethermines.com)",
  description:
    "Trải nghiệm máy chủ Minecraft RPG Việt Nam đỉnh cao (IP: mc.aethermines.com). Đào quặng Prison, săn Boss Dungeon RPG, tinh luyện MMOItems Long Tộc & Bang Hội KOTH!",
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/logo.png", type: "image/png" },
    ],
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  keywords: [
    // Minecraft RPG Focus Keywords
    "minecraft rpg",
    "server minecraft rpg",
    "minecraft rpg viet nam",
    "server minecraft rpg viet nam",
    "game minecraft rpg",
    "top server minecraft rpg",
    "minecraft rpg 1.19",
    "minecraft prison rpg",
    
    // Brand & IP Keywords
    "aethermines.com",
    "mc.aethermines.com",
    "aethermine",
    "aethermines",
    "aethermine minecraft",
    "ip server minecraft",
    "ip server minecraft viet nam",
    
    // Core Server Keywords
    "server minecraft viet nam",
    "top server minecraft viet nam",
    "server minecraft hay nhat",
    "server minecraft online viet nam",
    "server minecraft 1.19",
    "server minecraft 1.20",
    "server minecraft 1.21",

    // Gameplay Keywords
    "server minecraft dao quang",
    "dao quang minecraft",
    "bang hoi minecraft",
    "koth minecraft viet nam",
    "mmoitems minecraft",
    "chuyen sinh minecraft",
    "trang bi long toc minecraft",
    "boss dungeon minecraft",
    "tro choi minecraft tieng viet",
  ],
  authors: [{ name: "AetherMine Studio", url: "https://aethermines.com" }],
  creator: "AetherMine Studio",
  publisher: "AetherMine Studio",
  metadataBase: new URL("https://aethermines.com"),
  alternates: {
    canonical: "https://aethermines.com",
    languages: {
      "vi-VN": "https://aethermines.com",
    },
  },
  openGraph: {
    title: "AetherMine | Top 1 Server Minecraft RPG Việt Nam 1.19+ (IP: mc.aethermines.com)",
    description:
      "Trải nghiệm máy chủ Minecraft RPG Việt Nam đỉnh cao (IP: mc.aethermines.com). Đào quặng Prison, săn Boss Dungeon RPG, tinh luyện MMOItems Long Tộc & Bang Hội KOTH!",
    url: "https://aethermines.com",
    siteName: "AetherMine Minecraft RPG Server",
    images: [
      {
        url: "https://aethermines.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "AetherMine Minecraft RPG Server Banner",
      },
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AetherMine Minecraft RPG Server Banner",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AetherMine | Top 1 Server Minecraft RPG Việt Nam (IP: mc.aethermines.com)",
    description:
      "Máy chủ Minecraft RPG thế hệ mới tại Việt Nam (IP: mc.aethermines.com). Đào quặng, săn Boss Dungeon, chế đồ MMOItems & Chuyển sinh!",
    images: ["https://aethermines.com/og-image.png"],
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
    <html lang="vi" className={`${rajdhani.variable} ${inter.variable} scroll-smooth`}>
      <body className="bg-[#070913] text-slate-100 min-h-screen antialiased bg-cyber-grid">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
