import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, User, ArrowRight, Tag } from 'lucide-react';
import { BlogPost } from '@/lib/blogs';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  if (featured) {
    return (
      <div className="group relative rounded-3xl overflow-hidden bg-slate-900/80 border border-cyan-500/30 hover:border-cyan-400/60 shadow-[0_0_30px_rgba(0,240,255,0.15)] hover:shadow-[0_0_45px_rgba(0,240,255,0.3)] transition-all duration-500 grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Cover Image */}
        <div className="lg:col-span-7 relative h-64 lg:h-auto overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070913] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#070913]" />

          <div className="absolute top-4 left-4 flex gap-2">
            <span className="px-3 py-1 rounded-full bg-cyan-500/90 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-[0_0_12px_rgba(0,240,255,0.8)] backdrop-blur-md">
              NỔI BẬT
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-900/90 text-cyan-300 font-semibold text-xs border border-cyan-500/30 backdrop-blur-md">
              {post.category}
            </span>
          </div>
        </div>

        {/* Info Content */}
        <div className="lg:col-span-5 p-6 lg:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-4 text-xs text-slate-400 font-mono mb-3">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-pink-400" />
                {post.readTime}
              </span>
            </div>

            <h2 className="text-xl lg:text-2xl font-black text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug mb-3">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>

            <p className="text-slate-300 text-sm line-clamp-3 leading-relaxed mb-6 font-normal">
              {post.excerpt}
            </p>
          </div>

          <div>
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 rounded-md bg-slate-800/80 text-cyan-200 border border-slate-700/60"
                >
                  <Tag className="w-3 h-3 text-cyan-400" />
                  {tag}
                </span>
              ))}
            </div>

            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.8)] hover:scale-105 transition-all"
            >
              <span>ĐỌC BÀI VIẾT</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative flex flex-col rounded-2xl overflow-hidden bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 shadow-lg hover:shadow-[0_0_25px_rgba(0,240,255,0.2)] transition-all duration-300">
      {/* Cover Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 brightness-90 group-hover:brightness-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070913] via-transparent to-transparent opacity-80" />

        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-lg bg-cyan-950/80 text-cyan-300 font-semibold text-xs border border-cyan-500/40 backdrop-blur-md">
            {post.category}
          </span>
        </div>
      </div>

      {/* Info Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-2">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-cyan-400" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-pink-400" />
              {post.readTime}
            </span>
          </div>

          <h3 className="text-base font-extrabold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug mb-2">
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </h3>

          <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed mb-4">
            {post.excerpt}
          </p>
        </div>

        <div>
          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs text-slate-400">
              <User className="w-3.5 h-3.5 text-cyan-400" />
              {post.author}
            </span>

            <Link
              href={`/blog/${post.slug}`}
              className="flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 group-hover:translate-x-1 transition-transform"
            >
              <span>Xem chi tiết</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
