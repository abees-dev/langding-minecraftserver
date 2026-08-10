import React from 'react';
import Link from 'next/link';
import { Newspaper, ArrowRight } from 'lucide-react';
import { getAllPosts } from '@/lib/blogs';
import BlogCard from '../blog/BlogCard';

export default function BlogSection() {
  const allPosts = getAllPosts();
  const recentPosts = allPosts.slice(0, 3);

  if (recentPosts.length === 0) return null;

  return (
    <section id="blog" className="py-24 relative overflow-hidden bg-[#050710]">
      {/* Background Neon Gradients */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-4">
              <Newspaper className="w-3.5 h-3.5" />
              <span>TIN TỨC & BÀI VIẾT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
              TIN TỨC & <span className="glow-text-cyan">HƯỚNG DẪN</span> MINECRAFT
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mt-2">
              Cập nhật thông tin mới nhất về server AetherMine, xem các cẩm nang hướng dẫn tân thủ và nhật ký patch notes v2.0.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-300 font-bold text-xs uppercase tracking-wider hover:bg-cyan-500 hover:text-slate-950 hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] transition-all self-start md:self-auto"
          >
            <span>XEM TẤT CẢ BÀI VIẾT</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
