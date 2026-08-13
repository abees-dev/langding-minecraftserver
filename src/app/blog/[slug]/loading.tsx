import React from 'react';

export default function BlogPostLoading() {
  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 flex flex-col justify-between pt-24 pb-14 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full animate-pulse">
      <div className="mb-6 space-y-3">
        <div className="w-24 h-4 rounded bg-slate-900" />
        <div className="w-full h-12 rounded-xl bg-slate-900 border border-slate-800" />
        <div className="w-48 h-4 rounded bg-slate-900/60" />
      </div>
      <div className="w-full h-72 rounded-3xl bg-slate-900 border border-slate-800 mb-8" />
      <div className="space-y-4">
        <div className="w-full h-6 rounded bg-slate-900/80" />
        <div className="w-5/6 h-6 rounded bg-slate-900/80" />
        <div className="w-4/6 h-6 rounded bg-slate-900/80" />
      </div>
    </div>
  );
}
