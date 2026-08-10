import React from 'react';
import { MessageSquare, Users, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function CommunitySection() {
  return (
    <section id="community" className="py-24 px-4 relative z-10 max-w-7xl mx-auto">
      <div className="glass-card rounded-3xl border border-cyan-500/40 p-8 sm:p-12 bg-gradient-to-r from-slate-950 via-[#0b1026] to-slate-950 relative overflow-hidden shadow-[0_0_40px_rgba(0,240,255,0.2)]">
        {/* Neon Ambient Background */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider mb-6">
            <Users className="w-4 h-4 text-cyan-400" />
            <span>JOIN OUR COMMUNITY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-100 uppercase tracking-tight mb-6">
            GIA NHẬP CỘNG ĐỒNG <span className="glow-text-cyan">AETHERMINE</span> NGAY
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-10">
            Cập nhật tin tức sự kiện mới nhất, tham gia giao lưu thảo luận Bang Hội, nhận Giftcode tân thủ và nhận sự hỗ trợ 24/7 từ Đội ngũ Quản trị viên nhiệt tình.
          </p>

          {/* Social Links */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={siteConfig.social.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(79,70,229,0.5)] hover:shadow-[0_0_35px_rgba(79,70,229,0.8)] hover:scale-105 transition-all"
            >
              <MessageSquare className="w-5 h-5" />
              <span>DISCORD SEVER</span>
              <ArrowUpRight className="w-4 h-4 opacity-70" />
            </a>

            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(37,99,235,0.5)] hover:shadow-[0_0_35px_rgba(37,99,235,0.8)] hover:scale-105 transition-all"
            >
              {/* Custom Facebook SVG Icon */}
              <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>FANPAGE FACEBOOK</span>
              <ArrowUpRight className="w-4 h-4 opacity-70" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
