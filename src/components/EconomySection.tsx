import React from 'react';
import { Coins, ShieldAlert, ArrowRight, TrendingUp, Users, User, Flame } from 'lucide-react';

export default function EconomySection() {
  const orePrices = [
    { name: 'STONE / COBBLESTONE', base: '10$ - 20$' },
    { name: 'THAN / COAL', base: '80$' },
    { name: 'SẮT / RAW IRON & INGOT', base: '100$ - 200$' },
    { name: 'VÀNG / RAW GOLD & INGOT', base: '200$ - 400$' },
    { name: 'ĐÁ ĐỎ / LAPIS LAZULI', base: '150$ - 80$' },
    { name: 'KIM CƯƠNG / DIAMOND', base: '1,000$' },
    { name: 'NGỌC LỤC BẢO / EMERALD', base: '1,500$' },
    { name: 'ANCIENT DEBRIS / NETHERITE', base: '2,000$' },
  ];

  return (
    <section id="economy" className="py-24 px-4 relative z-10 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-emerald-400 text-xs font-mono tracking-[0.3em] uppercase font-bold">
          [ UPDATED ECONOMY & GANG SYSTEM ]
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 uppercase mt-2 tracking-tight">
          HỆ THỐNG BÁN QUẶNG & <span className="glow-text-green">MULTIPLIER BANG HỘI</span>
        </h2>
        <p className="text-slate-400 mt-4 text-sm sm:text-base">
          Cơ chế kinh tế cập nhật chuẩn 2026: Bán Cá Nhân đồng bộ giá Base và Bán Bang Hội nhận Multiplier nhân tiền cực lớn!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* Personal Mining Card */}
        <div className="glass-card p-8 rounded-2xl border border-cyan-500/30 flex flex-col justify-between shadow-[0_0_20px_rgba(0,240,255,0.15)]">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/40 text-cyan-400">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-100 uppercase tracking-wider">
                  BÁN CÁ NHÂN (/SELLGUI)
                </h3>
                <span className="text-xs text-slate-400 font-mono">Tự do tích lũy tiền mặt cá nhân</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 mb-6 leading-relaxed">
              Mọi người chơi đều áp dụng bảng giá Base chuẩn đồng bộ qua giao diện <code>/sellgui</code>. Tiền bán được cộng trực tiếp vào tài khoản cá nhân.
            </p>

            <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-3">
              [ BẢNG GIÁ BASE QUẶNG CẬP NHẬT MỚI NHẤT ]
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              {orePrices.map((ore, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-300 truncate">{ore.name}</span>
                  <span className="text-emerald-400 font-bold ml-2">{ore.base}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-800 text-xs text-slate-400 flex items-center gap-2">
            <Coins className="w-4 h-4 text-cyan-400" />
            <span>Gõ <strong>/sellgui</strong> trong game để mở menu bán quặng.</span>
          </div>
        </div>

        {/* Gang Multiplier Card */}
        <div className="glass-card p-8 rounded-2xl border border-emerald-500/40 flex flex-col justify-between shadow-[0_0_30px_rgba(0,255,157,0.2)] bg-gradient-to-br from-emerald-950/20 via-slate-900/90 to-slate-950/90">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-400">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-100 uppercase tracking-wider">
                  BÁN BANG HỘI (/GANG VAULT)
                </h3>
                <span className="text-xs text-emerald-400 font-mono font-bold">HỆ SỐ NHÂN TIỀN BANG HỘI</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 mb-6 leading-relaxed">
              Gửi quặng vào Kho Bang <code>/gang vault</code> và dùng Sell All để nhận lợi nhuận nhân bản nhờ hệ thống nâng cấp Bang:
            </p>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-emerald-500/30 flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-emerald-300 font-bold block">UPGRADE SELL BANG (+10% / LEVEL)</strong>
                  <span className="text-slate-400">Nâng cấp tối đa 5 Cấp độ cho Bang để nhận bonus tới +50% giá trị bán quặng.</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-emerald-500/30 flex items-start gap-3">
                <Coins className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-300 font-bold block">BUFF SHOP 2X & PARAGON SELL</strong>
                  <span className="text-slate-400">Kích hoạt Buff Shop tạm thời và thưởng Paragon % khi Bang Level đạt tối đa.</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-emerald-500/30 flex items-start gap-3">
                <Flame className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-pink-300 font-bold block">KOTH MỎ VIP & THU THUẾ</strong>
                  <span className="text-slate-400">Bang Hội chiếm giữ KOTH Mỏ VIP sẽ nhận đặc quyền nhân đào quặng & thu thuế vào Bank Bang.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-800 text-xs text-emerald-300 font-mono font-semibold flex items-center justify-between">
            <span>Lệnh Kho Bang: /gang vault</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </section>
  );
}
