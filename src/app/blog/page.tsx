import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Newspaper, Home, ChevronRight, BookOpen } from 'lucide-react';
import { getAllPosts, getBlogCategories } from '@/lib/blogs';
import BlogCard from '@/components/blog/BlogCard';
import BlogSearch from '@/components/blog/BlogSearch';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Blog & Tin Tức Server AetherMine | Hướng Dẫn Minecraft Prison RPG',
  description:
    'Tổng hợp bài viết thông tin máy chủ AetherMine, cẩm nang hướng dẫn tân thủ đào quặng, leo Rank Prison, nhật ký cập nhật Patch Notes v2.0 và sự kiện mới nhất.',
  keywords: [
    'Minecraft Blog',
    'AetherMine News',
    'Hướng dẫn Minecraft RPG',
    'Prison RPG Vietnam',
    'Rank Prison Minecraft',
    'Server IP mc.aethermines.com',
  ],
  alternates: {
    canonical: `${siteConfig.websiteUrl}/blog`,
  },
  openGraph: {
    title: 'Blog & Tin Tức Server AetherMine | Hướng Dẫn Minecraft Prison RPG',
    description:
      'Tổng hợp bài viết thông tin máy chủ AetherMine, cẩm nang hướng dẫn tân thủ đào quặng, leo Rank Prison, nhật ký cập nhật Patch Notes v2.0.',
    url: `${siteConfig.websiteUrl}/blog`,
    siteName: siteConfig.fullName,
    type: 'website',
    images: [
      {
        url: siteConfig.bannerUrl,
        width: 1200,
        height: 630,
        alt: 'AetherMine Blog Header Banner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog & Tin Tức Server AetherMine',
    description:
      'Tổng hợp bài viết thông tin máy chủ AetherMine, cẩm nang hướng dẫn tân thủ đào quặng, leo Rank Prison...',
    images: [siteConfig.bannerUrl],
  },
};

export default function BlogListingPage() {
  const posts = getAllPosts();
  const categories = getBlogCategories();

  const featuredPost = posts.find((p) => p.featured) || posts[0];

  // Schema structured data for SEO BreadcrumbList
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Trang Chủ',
        item: siteConfig.websiteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog & Tin Tức',
        item: `${siteConfig.websiteUrl}/blog`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 flex flex-col justify-between selection:bg-cyan-500 selection:text-slate-950">
      {/* Inject Breadcrumb JSON-LD structured data for Google Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Navbar />

      <main className="flex-1 pt-28 pb-20 relative">
        {/* Ambient Glow background */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-cyan-500/10 via-purple-500/5 to-transparent blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-6">
            <Link href="/" className="hover:text-cyan-400 flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              Trang Chủ
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <span className="text-cyan-400 font-bold">Blog & Tin Tức</span>
          </nav>

          {/* Hero Header */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-4">
              <Newspaper className="w-3.5 h-3.5" />
              <span>AETHERMINE CHÍNH THỨC</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase">
              TIN TỨC & <span className="glow-text-cyan">BLOG AETHERMINE</span>
            </h1>
            <p className="text-slate-300 text-base max-w-2xl mt-3 leading-relaxed">
              Khám phá các bài viết cập nhật tính năng mới, bài viết hướng dẫn bí kíp cày cuốc Minecraft RPG và toàn bộ thông tin máy chủ AetherMine.
            </p>
          </div>

          {/* Featured Post Card */}
          {featuredPost && (
            <div className="mb-14">
              <div className="flex items-center gap-2 mb-4 text-xs font-mono text-slate-400">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <span>BÀI VIẾT TẬP TRUNG / NỔI BẬT</span>
              </div>
              <BlogCard post={featuredPost} featured={true} />
            </div>
          )}

          {/* Interactive Search & Filter Section */}
          <BlogSearch posts={posts} categories={categories} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
