import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Tag,
  Home,
  ChevronRight,
  Sparkles,
  Gamepad2,
} from 'lucide-react';
import { getPostBySlug, getAllPosts } from '@/lib/blogs';
import BlogCard from '@/components/blog/BlogCard';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { siteConfig } from '@/config/site';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    return {
      title: 'Bài viết không tồn tại | AetherMine',
    };
  }

  const postUrl = `${siteConfig.websiteUrl}/blog/${post.slug}`;

  return {
    title: `${post.title} | Blog AetherMine RPG`,
    description: post.excerpt,
    keywords: [
      post.title,
      post.category,
      ...post.tags,
      'AetherMine',
      'Minecraft RPG',
      'Server IP mc.aethermines.com',
    ],
    authors: [{ name: post.author }],
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      siteName: siteConfig.fullName,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

export default async function BlogPostDetailPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  const postUrl = `${siteConfig.websiteUrl}/blog/${post.slug}`;

  // JSON-LD Structured Data for BlogPosting
  const blogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: [post.coverImage],
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.websiteUrl}${siteConfig.logoUrl}`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    keywords: post.tags.join(', '),
  };

  // JSON-LD Structured Data for BreadcrumbList
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
        name: 'Blog',
        item: `${siteConfig.websiteUrl}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: postUrl,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 flex flex-col justify-between selection:bg-cyan-500 selection:text-slate-950">
      {/* Inject Structured Data Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Navbar />

      <main className="flex-1 pt-28 pb-20 relative">
        {/* Ambient Gradients */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Navigation & Breadcrumbs */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Link href="/" className="hover:text-cyan-400 flex items-center gap-1">
                <Home className="w-3.5 h-3.5" />
                Trang Chủ
              </Link>
              <ChevronRight className="w-3 h-3 text-slate-600" />
              <Link href="/blog" className="hover:text-cyan-400">
                Blog
              </Link>
              <ChevronRight className="w-3 h-3 text-slate-600" />
              <span className="text-cyan-400 font-bold truncate max-w-[200px]">
                {post.title}
              </span>
            </nav>

            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/60 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 text-xs font-medium transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Quay lại Blog</span>
            </Link>
          </div>

          {/* Post Header */}
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-extrabold text-xs uppercase tracking-wider border border-cyan-500/40">
                {post.category}
              </span>
              {post.featured && (
                <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 font-bold text-xs border border-pink-500/40">
                  Bài Nổi Bật
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight mb-4">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400 font-mono py-3 border-y border-slate-800/80">
              <span className="flex items-center gap-1.5 text-cyan-300 font-bold">
                <User className="w-4 h-4 text-cyan-400" />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <time dateTime={post.date}>{post.date}</time>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-pink-400" />
                {post.readTime}
              </span>
            </div>
          </header>

          {/* Cover Image Banner */}
          <div className="relative rounded-3xl overflow-hidden mb-10 border border-cyan-500/30 shadow-[0_0_35px_rgba(0,240,255,0.15)]">
            <img
              src={post.coverImage}
              alt={post.title}
              loading="eager"
              className="w-full h-[320px] sm:h-[420px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070913] via-transparent to-transparent opacity-60" />
          </div>

          {/* Markdown Content Article Body */}
          <article className="prose-custom max-w-none bg-slate-900/40 p-6 sm:p-10 rounded-3xl border border-slate-800/80 mb-12 backdrop-blur-md overflow-x-auto">
            {post.contentHtml && (
              <div
                dangerouslySetInnerHTML={{ __html: post.contentHtml }}
                className="text-slate-200 leading-relaxed font-sans space-y-6 [&>h1]:text-2xl [&>h1]:sm:text-3xl [&>h1]:font-black [&>h1]:text-cyan-300 [&>h1]:mt-8 [&>h1]:mb-4 [&>h2]:text-xl [&>h2]:sm:text-2xl [&>h2]:font-bold [&>h2]:text-white [&>h2]:mt-8 [&>h2]:mb-3 [&>h2]:border-b [&>h2]:border-slate-800 [&>h2]:pb-2 [&>h3]:text-lg [&>h3]:font-bold [&>h3]:text-cyan-400 [&>h3]:mt-6 [&>h3]:mb-2 [&>p]:text-slate-300 [&>p]:leading-7 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-2 [&>blockquote]:border-l-4 [&>blockquote]:border-cyan-500 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:bg-cyan-950/30 [&>blockquote]:py-3 [&>blockquote]:rounded-r-xl [&>code]:bg-slate-950 [&>code]:text-cyan-300 [&>code]:px-2 [&>code]:py-0.5 [&>code]:rounded [&>code]:font-mono [&>code]:text-sm [&_table]:w-full [&_table]:border-collapse [&_table]:my-6 [&_table]:text-sm [&_table]:rounded-xl [&_table]:overflow-hidden [&_th]:bg-slate-950 [&_th]:text-cyan-400 [&_th]:font-extrabold [&_th]:p-3 [&_th]:text-left [&_th]:border [&_th]:border-cyan-500/30 [&_td]:p-3 [&_td]:border [&_td]:border-slate-800 [&_tr:nth-child(even)]:bg-slate-950/40 [&_tr:hover]:bg-cyan-950/30 [&_hr]:border-slate-800 [&_hr]:my-8 [&_a]:text-cyan-400 [&_a]:underline hover:[&_a]:text-cyan-300"
              />
            )}
          </article>

          {/* Tags list */}
          {post.tags.length > 0 && (
            <div className="flex items-center gap-2 mb-10 flex-wrap">
              <span className="text-xs font-mono text-slate-400 mr-2 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-cyan-400" /> Thẻ tag:
              </span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Join Server CTA Box */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/40 shadow-[0_0_30px_rgba(0,240,255,0.2)] flex flex-col sm:flex-row items-center justify-between gap-6 mb-16">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center shrink-0">
                <Gamepad2 className="w-8 h-8 text-cyan-300" />
              </div>
              <div>
                <h4 className="text-lg font-extrabold text-white uppercase">
                  THAM GIA AETHERMINE NGAY HÔM NAY!
                </h4>
                <p className="text-xs text-slate-300 mt-1">
                  Kết nối máy chủ với IP: <strong className="text-cyan-300 font-mono">{siteConfig.serverIp}</strong>
                </p>
              </div>
            </div>

            <a
              href={siteConfig.social.discord}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.5)] hover:scale-105 transition-all shrink-0"
            >
              VÀO DISCORD SERVER
            </a>
          </div>

          {/* Related Posts Section */}
          {relatedPosts.length > 0 && (
            <section aria-labelledby="related-posts-heading">
              <h3 id="related-posts-heading" className="text-2xl font-black text-white uppercase tracking-tight mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                BÀI VIẾT LIÊN QUAN
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((rPost) => (
                  <BlogCard key={rPost.slug} post={rPost} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
