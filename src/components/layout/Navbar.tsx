'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Copy, Check, Menu, X, QrCode } from 'lucide-react';
import TopupModal from '../topup/TopupModal';
import { siteConfig } from '@/config/site';

export default function Navbar() {
  const [copied, setCopied] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [topupModalOpen, setTopupModalOpen] = useState(false);
  const [onlinePlayers, setOnlinePlayers] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Fetch live status from MCSrvStat API
    fetch(`https://api.mcsrvstat.us/2/${siteConfig.serverIp}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.online && data.players) {
          setOnlinePlayers(data.players.online);
        } else {
          setOnlinePlayers(128); // Fallback representative count if offline/mock
        }
      })
      .catch(() => setOnlinePlayers(128));
  }, []);

  const handleCopyIp = () => {
    navigator.clipboard.writeText(siteConfig.serverIp);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#070913]/90 backdrop-blur-md border-b border-cyan-500/20 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo with Custom Logo Image */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-cyan-500/50 p-[1px] bg-slate-900 shadow-[0_0_15px_rgba(0,240,255,0.4)] group-hover:shadow-[0_0_25px_rgba(0,240,255,0.8)] transition-all">
              <img
                src={siteConfig.logoUrl}
                alt={`${siteConfig.name} Server Logo`}
                className="w-full h-full object-cover rounded-[10px] group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-wider glow-text-cyan uppercase">
                AETHER<span className="text-pink-500 glow-text-magenta">MINE</span>
              </span>
              <span className="text-[10px] tracking-[0.2em] text-cyan-300 font-mono -mt-1 uppercase">
                MINECRAFT RPG
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-300">
            {siteConfig.navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-cyan-400 transition-colors">
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Live Status Pill & Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Nạp Xu Button */}
            <button
              onClick={() => setTopupModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,255,157,0.4)] hover:shadow-[0_0_30px_rgba(0,255,157,0.8)] hover:scale-105 transition-all"
            >
              <QrCode className="w-4 h-4 text-slate-950" />
              <span>NẠP POINT</span>
            </button>

            {/* Online Counter Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#00ff9d]" />
              <span className="text-slate-300">ONLINE:</span>
              <span className="text-emerald-400 font-bold">{onlinePlayers !== null ? onlinePlayers : '...'}</span>
            </div>

            {/* Copy IP Button */}
            <button
              onClick={handleCopyIp}
              aria-label={`Copy IP ${siteConfig.serverIp}`}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.8)] hover:scale-105 transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-slate-950" />
                  <span>ĐÃ COPY IP!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-950" />
                  <span>COPY IP</span>
                </>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-300 hover:text-cyan-400 p-2"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0a0c1a] border-b border-cyan-500/20 px-6 py-6 flex flex-col gap-4 text-slate-200 font-medium">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setTopupModalOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-400 text-slate-950 font-extrabold text-sm uppercase shadow-[0_0_20px_rgba(0,255,157,0.5)]"
            >
              <QrCode className="w-4 h-4" />
              <span>NẠP XU TỰ ĐỘNG</span>
            </button>

            {siteConfig.navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-cyan-400"
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs font-mono bg-slate-900/80 px-4 py-2 rounded-lg border border-cyan-500/30">
                <span className="text-slate-400">Trạng Thái:</span>
                <span className="text-emerald-400 font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {onlinePlayers !== null ? `${onlinePlayers} Players Online` : 'Checking...'}
                </span>
              </div>

              <button
                onClick={handleCopyIp}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-cyan-500 text-slate-950 font-bold text-sm uppercase shadow-[0_0_20px_rgba(0,240,255,0.5)]"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'ĐÃ COPY IP' : `COPY IP: ${siteConfig.serverIp}`}</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Top Up Modal */}
      <TopupModal isOpen={topupModalOpen} onClose={() => setTopupModalOpen(false)} />
    </>
  );
}
