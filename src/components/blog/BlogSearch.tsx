'use client';

import React, { useState, useMemo } from 'react';
import { Search, Filter, Sparkles } from 'lucide-react';
import { BlogPost } from '@/lib/blogs';
import BlogCard from './BlogCard';

interface BlogSearchProps {
  posts: BlogPost[];
  categories: string[];
}

export default function BlogSearch({ posts, categories }: BlogSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');

  // Lọc bài viết theo danh mục & từ khóa tìm kiếm
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === 'Tất cả' || post.category === selectedCategory;

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        post.author.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [posts, searchQuery, selectedCategory]);

  return (
    <div className="space-y-8">
      {/* Search Bar & Category Filter Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/70 border border-cyan-500/20 backdrop-blur-md shadow-xl">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm bài viết, tag, hướng dẫn..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              Xóa
            </button>
          )}
        </div>

        {/* Categories Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          <Filter className="w-4 h-4 text-cyan-400 shrink-0 hidden sm:block mr-1" />
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.5)] scale-105'
                    : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-cyan-400 border border-slate-700/50'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Counter & Result Count */}
      <div className="flex items-center justify-between text-xs text-slate-400 font-mono px-2">
        <span className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          Hiển thị <span className="text-cyan-400 font-bold">{filteredPosts.length}</span> bài viết
        </span>
        {selectedCategory !== 'Tất cả' && (
          <span>Danh mục: <strong className="text-cyan-300">{selectedCategory}</strong></span>
        )}
      </div>

      {/* Blog Cards Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 rounded-2xl bg-slate-900/40 border border-slate-800">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cyan-950/60 flex items-center justify-center border border-cyan-500/30">
            <Search className="w-8 h-8 text-cyan-400" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Không tìm thấy bài viết nào</h3>
          <p className="text-slate-400 text-sm max-w-md mx-auto mb-4">
            Thử tìm kiếm với từ khóa khác hoặc chuyển sang danh mục bài viết khác.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('Tất cả');
            }}
            className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 text-xs font-bold border border-cyan-500/40 transition-colors"
          >
            Đặt lại bộ lọc
          </button>
        </div>
      )}
    </div>
  );
}
