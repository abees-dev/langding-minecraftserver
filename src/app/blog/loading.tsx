import React from 'react';

export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 flex flex-col justify-between pt-24 pb-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full animate-pulse">
      {/* Header Skeleton */}
      <div className="mb-8 space-y-4">
        <div className="w-32 h-6 rounded-full bg-cyan-950/60 border border-cyan-500/20" />
        <div className="w-2/3 h-10 rounded-xl bg-slate-900 border border-slate-800" />
        <div className="w-1/2 h-5 rounded-lg bg-slate-900/60" />
      </div>

      {/* Featured Skeleton */}
      <div className="w-full h-80 rounded-3xl bg-slate-900/80 border border-slate-800 mb-10" />

      {/* Search & Grid Skeleton */}
      <div className="w-full h-14 rounded-2xl bg-slate-900/60 border border-slate-800 mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-80 rounded-2xl bg-slate-900/60 border border-slate-800" />
        ))}
      </div>
    </div>
  );
}
