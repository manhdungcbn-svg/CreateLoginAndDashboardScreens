import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type Page = "login" | "dashboard" | "phieu" | "khachhang" | "sanpham" | "baocao" | "ai";

// ─── Icons ───────────────────────────────────────────────────────────────────
const Icon = {
  grid: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
    </svg>
  ),
  ticket: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" />
    </svg>
  ),
  users: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  box: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    </svg>
  ),
  chart: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" /><line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  ),
  ai: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2a10 10 0 1 0 10 10" /><path d="M12 8v4l3 3" />
      <path d="M20 2l-4 4 4 4" />
    </svg>
  ),
  settings: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  send: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  ),
  eye: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
    </svg>
  ),
  edit: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  ),
  print: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="6 9 6 2 18 2 18 9" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="8" />
    </svg>
  ),
  menu: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  ),
  layout: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" />
    </svg>
  ),
  plus: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  arrow: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  spark: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  check: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  alert: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  clock: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  x: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
};

// ─── 3D Bar Chart (CSS-based, isometric style) ────────────────────────────────
const weekData = [
  { day: "T2", received: 18, done: 14 },
  { day: "T3", received: 22, done: 18 },
  { day: "T4", received: 11, done: 9 },
  { day: "T5", received: 24, done: 20 },
  { day: "T6", received: 19, done: 15 },
  { day: "T7", received: 16, done: 13 },
  { day: "CN", received: 8, done: 7 },
];

function Bar3D({ value, maxVal, color, depth }: { value: number; maxVal: number; color: string; depth?: boolean }) {
  const pct = (value / maxVal) * 100;
  const h = Math.max(pct * 1.4, 4);
  const top = depth ? "#b45309" : "#1d4ed8";
  const side = depth ? "#78350f" : "#1e3a8a";
  const front = color;
  return (
    <div className="relative flex flex-col items-center justify-end" style={{ height: 140, width: 28 }}>
      <div className="relative" style={{ height: h, width: 28 }}>
        {/* front face */}
        <div className="absolute inset-0" style={{ background: front, borderRadius: "2px 2px 0 0" }} />
        {/* top face */}
        <div className="absolute" style={{
          top: -6, left: 4, right: -4, height: 10,
          background: top,
          transform: "skewX(-45deg)",
          transformOrigin: "bottom left",
          opacity: 0.9,
        }} />
        {/* right side */}
        <div className="absolute" style={{
          top: -6, right: -8, width: 8, height: h + 6,
          background: side,
          transform: "skewY(45deg)",
          transformOrigin: "top left",
          opacity: 0.8,
        }} />
      </div>
    </div>
  );
}

function Chart3D() {
  const max = Math.max(...weekData.map(d => d.received));
  return (
    <div className="relative">
      <div className="flex items-end gap-3 px-4 pb-2 pt-8">
        {weekData.map((d, i) => (
          <div key={i} className="flex flex-col items-center gap-0.5">
            <div className="flex items-end gap-1">
              <Bar3D value={d.received} maxVal={max} color="#f97316" depth={false} />
              <Bar3D value={d.done} maxVal={max} color="#22c55e" depth={true} />
            </div>
            <span className="text-[10px] text-zinc-500 mt-1">{d.day}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-4 px-4 mt-2">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm" style={{ background: "#f97316" }} />
          <span className="text-[11px] text-zinc-400">Đã tiếp nhận</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm" style={{ background: "#22c55e" }} />
          <span className="text-[11px] text-zinc-400">Đã hoàn tất</span>
        </div>
      </div>
    </div>
  );
}

// ─── Login Page ───────────────────────────────────────────────────────────────
function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); }, 1200);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={{ background: "radial-gradient(ellipse 80% 60% at 50% -10%, #1a0a00 0%, #0a0a0b 60%)" }}>
      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #f97316, transparent)" }} />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-8 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #ea580c, transparent)" }} />

      {/* Floating stat cards */}
      <div className="absolute left-12 top-1/3 hidden lg:block animate-float"
        style={{ animationDelay: "0s" }}>
        <div className="rounded-2xl p-4 w-52" style={{ background: "rgba(17,17,20,0.9)", border: "1px solid rgba(249,115,22,0.2)", backdropFilter: "blur(12px)" }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-medium tracking-widest text-zinc-400 uppercase">Phiếu BH</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full text-orange-400" style={{ background: "rgba(249,115,22,0.15)" }}>● Live</span>
          </div>
          <div className="text-3xl font-black text-white">+248</div>
          <div className="text-[11px] text-zinc-500 mt-1">Tổng phiếu trong tháng</div>
          <div className="mt-3 h-1 rounded-full" style={{ background: "rgba(249,115,22,0.2)" }}>
            <div className="h-full w-3/4 rounded-full" style={{ background: "linear-gradient(90deg, #f97316, #fb923c)" }} />
          </div>
        </div>
      </div>

      <div className="absolute right-12 top-1/3 hidden lg:block animate-float"
        style={{ animationDelay: "1.5s" }}>
        <div className="rounded-2xl p-4 w-52" style={{ background: "rgba(17,17,20,0.9)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(12px)" }}>
          <div className="text-[10px] font-medium tracking-widest text-zinc-400 uppercase mb-2">Thời gian xử lý TB</div>
          <div className="text-3xl font-black text-white">2.4<span className="text-lg font-semibold text-zinc-300">ngày</span></div>
          <div className="text-[11px] text-emerald-400 mt-1">↓ Giảm 38% so với quý trước</div>
          <div className="flex items-end gap-1 mt-3 h-8">
            {[3,5,4,6,4,5,7,6,8].map((v,i) => (
              <div key={i} className="flex-1 rounded-sm" style={{ height: `${v * 10}%`, background: i === 8 ? "#f97316" : "rgba(249,115,22,0.3)" }} />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute left-12 bottom-1/3 hidden lg:block animate-float"
        style={{ animationDelay: "0.8s" }}>
        <div className="rounded-2xl p-3.5 w-52" style={{ background: "rgba(17,17,20,0.9)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(12px)" }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-medium tracking-widest text-zinc-400 uppercase">Phân tích AI</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full text-purple-400" style={{ background: "rgba(167,139,250,0.15)" }}>New</span>
          </div>
          <div className="text-[12px] text-zinc-300 leading-5">Lỗi <strong className="text-white">màn hình</strong> chiếm 34% — đề xuất tăng ca sáng cho kỹ thuật viên.</div>
          <div className="mt-2 h-1 rounded-full" style={{ background: "rgba(249,115,22,0.2)" }}>
            <div className="h-full w-1/3 rounded-full" style={{ background: "#a78bfa" }} />
          </div>
        </div>
      </div>

      <div className="absolute right-12 bottom-1/3 hidden lg:block animate-float"
        style={{ animationDelay: "2s" }}>
        <div className="rounded-2xl p-4 w-52" style={{ background: "rgba(17,17,20,0.9)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(12px)" }}>
          <div className="text-[10px] font-medium tracking-widest text-zinc-400 uppercase mb-2">Hoàn tất đúng hạn</div>
          <div className="text-3xl font-black text-white">92<span className="text-lg text-zinc-300">%</span></div>
          <div className="text-[11px] text-zinc-500 mt-1">Đạt KPI tháng 8</div>
          <div className="flex items-end gap-1 mt-3 h-8">
            {[5,4,6,5,7,6,8,7,9].map((v,i) => (
              <div key={i} className="flex-1 rounded-sm" style={{ height: `${v * 10}%`, background: i === 8 ? "#f97316" : "rgba(249,115,22,0.3)" }} />
            ))}
          </div>
        </div>
      </div>

      {/* Login card */}
      <div className="relative z-10 w-full max-w-md mx-4 animate-fade-in">
        <div className="rounded-3xl p-8" style={{
          background: "rgba(17,17,20,0.95)",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 0 80px rgba(249,115,22,0.1), 0 32px 64px rgba(0,0,0,0.5)"
        }}>
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center animate-pulse-glow"
              style={{ background: "linear-gradient(135deg, #f97316, #ea580c)" }}>
              <span className="text-white font-black text-base">W</span>
            </div>
            <div>
              <div className="text-white font-bold text-lg leading-tight">WarrantyHub</div>
              <div className="text-[11px] text-zinc-500">Quản lý bảo hành</div>
            </div>
          </div>

          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white">Đăng nhập</h1>
            <p className="text-zinc-400 text-sm mt-1">Chào mừng bạn trở lại 👋</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-zinc-400 mb-1.5 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@warrantyhub.vn"
                className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-zinc-600 outline-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
                onFocus={e => e.target.style.borderColor = "rgba(249,115,22,0.6)"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-zinc-400 mb-1.5 block">Mật khẩu</label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-zinc-600 outline-none transition-all"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  onFocus={e => e.target.style.borderColor = "rgba(249,115,22,0.6)"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors">
                  <Icon.eye />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <div className="w-4 h-4 rounded border flex items-center justify-center" style={{ borderColor: "rgba(249,115,22,0.5)", background: "rgba(249,115,22,0.1)" }}>
                  <Icon.check />
                </div>
                <span className="text-xs text-zinc-400">Ghi nhớ đăng nhập</span>
              </label>
              <button type="button" className="text-xs text-orange-400 hover:text-orange-300 transition-colors">Quên mật khẩu?</button>
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2"
              style={{
                background: loading ? "rgba(249,115,22,0.5)" : "linear-gradient(135deg, #f97316, #ea580c)",
                color: "#fff",
                boxShadow: loading ? "none" : "0 8px 24px rgba(249,115,22,0.35)"
              }}>
              {loading ? (
                <><div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />Đang đăng nhập...</>
              ) : "Đăng nhập →"}
            </button>
          </form>

          <div className="mt-6 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "rgba(249,115,22,0.06)", border: "1px solid rgba(249,115,22,0.1)" }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(249,115,22,0.2)" }}>
                <Icon.spark />
              </div>
              <div>
                <div className="text-xs font-medium text-zinc-300">Demo: admin@warrantyhub.vn</div>
                <div className="text-[11px] text-zinc-500">Mật khẩu bất kỳ để đăng nhập</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
const navItems = [
  { id: "dashboard" as Page, label: "Tổng quan", icon: Icon.grid },
  { id: "phieu" as Page, label: "Phiếu bảo hành", icon: Icon.ticket, badge: 12 },
  { id: "khachhang" as Page, label: "Khách hàng", icon: Icon.users },
  { id: "sanpham" as Page, label: "Sản phẩm", icon: Icon.box },
  { id: "baocao" as Page, label: "Báo cáo", icon: Icon.chart },
  { id: "ai" as Page, label: "AI Assistant", icon: Icon.ai, isNew: true },
];

function Sidebar({ page, setPage, collapsed, setCollapsed }: {
  page: Page; setPage: (p: Page) => void;
  collapsed: boolean; setCollapsed: (v: boolean) => void;
}) {
  return (
    <div className="flex flex-col h-full transition-all duration-300"
      style={{
        width: collapsed ? 64 : 180,
        background: "#0d0d10",
        borderRight: "1px solid rgba(255,255,255,0.06)",
      }}>
      {/* Header */}
      <div className="flex items-center gap-2.5 px-3 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #f97316, #ea580c)" }}>
          <span className="text-white font-black text-sm">W</span>
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <div className="text-white font-bold text-sm leading-tight truncate">WarrantyHub</div>
            <div className="text-[10px] text-zinc-500">Quản lý bảo hành</div>
          </div>
        )}
        <button onClick={() => setCollapsed(!collapsed)}
          className="ml-auto text-zinc-500 hover:text-zinc-300 transition-colors flex-shrink-0">
          <Icon.x />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
        {navItems.map(item => {
          const active = page === item.id;
          return (
            <button key={item.id} onClick={() => setPage(item.id)}
              className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-all duration-150 group"
              style={{
                background: active ? "rgba(249,115,22,0.15)" : "transparent",
                color: active ? "#f97316" : "#71717a",
              }}
              onMouseEnter={e => !active && ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)")}
              onMouseLeave={e => !active && ((e.currentTarget as HTMLElement).style.background = "transparent")}>
              <item.icon />
              {!collapsed && (
                <>
                  <span className="text-sm font-medium flex-1 truncate">{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold"
                      style={{ background: "#f97316", color: "#000" }}>{item.badge}</span>
                  )}
                  {item.isNew && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold"
                      style={{ background: "rgba(167,139,250,0.2)", color: "#a78bfa" }}>New</span>
                  )}
                </>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-2" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <button className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-colors text-zinc-500 hover:text-zinc-300"
          style={{ background: "transparent" }}>
          <Icon.settings />
          {!collapsed && <span className="text-xs">Cài đặt</span>}
        </button>
        <div className="flex items-center gap-2 px-2.5 py-2 mt-1">
          <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[9px] font-bold text-white"
            style={{ background: "linear-gradient(135deg, #f97316, #ea580c)" }}>MD</div>
          {!collapsed && (
            <div className="overflow-hidden">
              <div className="text-xs text-white font-medium truncate">Mạnh Dũng</div>
              <div className="text-[10px] text-zinc-500 truncate">Quản trị viên</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Top bar ──────────────────────────────────────────────────────────────────
function TopBar({ breadcrumb, collapsed, setCollapsed }: {
  breadcrumb: string; collapsed: boolean; setCollapsed: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-3 px-6 py-3.5 flex-shrink-0"
      style={{ background: "#0d0d10", borderBottom: "1px solid rgba(255,255,255,0.06)", height: 52 }}>
      <button onClick={() => setCollapsed(!collapsed)}
        className="text-zinc-500 hover:text-zinc-200 transition-colors">
        <Icon.menu />
      </button>
      <button className="text-zinc-500 hover:text-zinc-200 transition-colors">
        <Icon.layout />
      </button>
      <span className="text-zinc-500 text-sm">Trang chủ / <span className="text-zinc-300">{breadcrumb}</span></span>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
const recentTickets = [
  { id: "BH-2026-0024", name: "Trần Minh Long", initials: "TL", color: "#f97316", product: "iPhone 15 Pro", issue: "vỡ màn hình", date: "20/08/2026", status: "Đang kiểm tra", statusColor: "#f97316" },
  { id: "BH-2026-0023", name: "Nguyễn Hà", initials: "NH", color: "#3b82f6", product: "MacBook Air M2", issue: "Lỗi bàn phím", date: "20/08/2026", status: "Đang sửa", statusColor: "#a78bfa" },
  { id: "BH-2026-0022", name: "Phạm Văn Việt", initials: "PV", color: "#22c55e", product: "Samsung Galaxy S24", issue: "Thay pin", date: "19/08/2026", status: "Hoàn tất", statusColor: "#22c55e" },
  { id: "BH-2026-0021", name: "Lê Thị Mai", initials: "LM", color: "#ef4444", product: "iPad Pro 12.9", issue: "Vào nước", date: "19/08/2026", status: "Từ chối", statusColor: "#ef4444" },
];

function DashboardPage() {
  const [chartRange, setChartRange] = useState<"7" | "30" | "90">("7");
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 animate-fade-in">
      {/* Hero banner */}
      <div className="relative rounded-2xl overflow-hidden" style={{
        background: "linear-gradient(135deg, #1a0a00 0%, #0f0f14 60%, #0a0a0b 100%)",
        border: "1px solid rgba(249,115,22,0.2)",
        minHeight: 120,
      }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 w-96 h-40 rounded-full opacity-20 blur-3xl -translate-x-1/2"
            style={{ background: "radial-gradient(circle, #f97316, transparent)" }} />
        </div>
        <div className="relative z-10 flex items-center justify-between px-8 py-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-widest uppercase mb-3"
              style={{ background: "rgba(34,197,94,0.15)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.2)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
              Hệ thống hoạt động bình thường
            </div>
            <h1 className="text-2xl font-black text-white">Xin chào, Nguyễn An ✨</h1>
            <p className="text-zinc-400 text-sm mt-1">Đây là tình hình hoạt động bảo hành của bạn hôm nay.</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-zinc-300 hover:text-white transition-colors"
            style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <Icon.chart />
            Xem báo cáo
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Tổng phiếu", value: "248", change: "+12.5%", tag: "Tháng này", icon: "🎫", color: "#f97316" },
          { label: "Đang xử lý", value: "42", change: "+8.7%", tag: "Realtime", icon: "⚙️", color: "#3b82f6" },
          { label: "Đã hoàn tất", value: "186", change: "+18.4%", tag: "Tháng này", icon: "✅", color: "#22c55e" },
          { label: "Từ chối", value: "20", change: "-5.7%", tag: "Tháng này", icon: "🚫", color: "#ef4444" },
        ].map((kpi, i) => (
          <div key={i} className="rounded-2xl p-5 transition-all hover:scale-[1.02]" style={{
            background: "#111114",
            border: `1px solid ${kpi.color}22`,
            boxShadow: `0 4px 24px ${kpi.color}11`
          }}>
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                style={{ background: `${kpi.color}22` }}>{kpi.icon}</div>
              <span className="text-[10px] text-zinc-500 font-medium">{kpi.tag}</span>
            </div>
            <div className="text-3xl font-black text-white">{kpi.value}</div>
            <div className="text-xs text-zinc-400 mt-0.5">{kpi.label}</div>
            <div className="text-[11px] mt-2 font-medium"
              style={{ color: kpi.change.startsWith("+") ? "#22c55e" : "#ef4444" }}>
              {kpi.change} so với tháng trước
            </div>
          </div>
        ))}
      </div>

      {/* Chart + AI panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* 3D Chart */}
        <div className="lg:col-span-2 rounded-2xl p-5" style={{
          background: "#111114",
          border: "1px solid rgba(255,255,255,0.06)",
        }}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "rgba(249,115,22,0.15)" }}>
                  <Icon.chart />
                </div>
                <h2 className="text-sm font-bold text-white">Phiếu bảo hành</h2>
              </div>
              <p className="text-[11px] text-zinc-500 mt-1 ml-8">So sánh tiếp nhận và hoàn tất theo ngày</p>
            </div>
            <div className="flex items-center gap-1 rounded-lg p-1" style={{ background: "rgba(255,255,255,0.05)" }}>
              {(["7", "30", "90"] as const).map(r => (
                <button key={r} onClick={() => setChartRange(r)}
                  className="px-3 py-1 rounded-md text-[11px] font-medium transition-all"
                  style={{
                    background: chartRange === r ? "#f97316" : "transparent",
                    color: chartRange === r ? "#fff" : "#71717a"
                  }}>{r} ngày</button>
              ))}
            </div>
          </div>
          <Chart3D />
        </div>

        {/* AI panel */}
        <div className="rounded-2xl p-5" style={{
          background: "#111114",
          border: "1px solid rgba(167,139,250,0.2)",
        }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base"
              style={{ background: "rgba(167,139,250,0.15)" }}>🤖</div>
            <div>
              <div className="text-sm font-bold text-white">Trợ lý AI</div>
              <div className="text-[10px] text-zinc-500">Phân tích thông minh</div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="p-3 rounded-xl" style={{ background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.15)" }}>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-orange-400 text-xs">⚡</span>
                <span className="text-[11px] font-semibold text-orange-300">Lỗi phổ biến nhất</span>
              </div>
              <p className="text-[11px] text-zinc-300 leading-4">Lỗi màn hình chiếm <strong className="text-white">34%</strong> tổng số phiếu tháng này. Đề xuất tăng cường kỹ thuật viên cho ca sáng.</p>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {[
                { icon: "⏱️", label: "Thời gian xử lý TB", val: "2.4 ngày" },
                { icon: "✅", label: "Hoàn tất đúng hạn", val: "92%" },
                { icon: "⚡", label: "Hiệu suất kỹ thuật", val: "78%" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2" style={{ borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                  <span className="text-[11px] text-zinc-400">{item.icon} {item.label}</span>
                  <span className="text-[11px] font-bold text-orange-400">{item.val}</span>
                </div>
              ))}
            </div>
            <button className="w-full py-2 rounded-xl text-[11px] font-semibold text-orange-400 flex items-center justify-center gap-1.5 transition-colors hover:text-orange-300"
              style={{ background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.15)" }}>
              Xem báo cáo AI đầy đủ <Icon.arrow />
            </button>
          </div>
        </div>
      </div>

      {/* Recent tickets + AI chat */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Table */}
        <div className="lg:col-span-2 rounded-2xl" style={{ background: "#111114", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div>
              <div className="flex items-center gap-2">
                <Icon.clock />
                <span className="text-sm font-bold text-white">Phiếu bảo hành gần đây</span>
              </div>
              <p className="text-[11px] text-zinc-500 mt-0.5 ml-5">Cập nhật dữ liệu mới nhất</p>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium text-orange-400 hover:text-orange-300 transition-colors"
              style={{ background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.15)" }}>
              Xem tất cả <Icon.arrow />
            </button>
          </div>
          <div className="px-5">
            <div className="grid grid-cols-5 py-2.5 text-[10px] font-semibold tracking-wider text-zinc-500 uppercase"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <span>Mã phiếu</span><span>Khách hàng</span><span>Sản phẩm</span><span>Ngày</span><span>Trạng thái</span>
            </div>
            {recentTickets.map((t, i) => (
              <div key={i} className="grid grid-cols-5 items-center py-3 transition-colors hover:bg-white/[0.02]"
                style={{ borderBottom: i < recentTickets.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                <span className="text-[11px] font-mono font-bold" style={{ color: "#f97316" }}>{t.id}</span>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0"
                    style={{ background: t.color }}>{t.initials}</div>
                  <span className="text-[11px] text-zinc-300 truncate">{t.name}</span>
                </div>
                <div>
                  <div className="text-[11px] text-zinc-300 truncate">{t.product}</div>
                  <div className="text-[10px] text-zinc-500 truncate">{t.issue}</div>
                </div>
                <span className="text-[11px] text-zinc-400">{t.date}</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full w-fit"
                  style={{ background: `${t.statusColor}22`, color: t.statusColor }}>{t.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Chat */}
        <div className="rounded-2xl flex flex-col" style={{
          background: "#111114",
          border: "1px solid rgba(249,115,22,0.15)",
          minHeight: 280,
        }}>
          <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-2">
              <div className="text-lg">💬</div>
              <div>
                <div className="text-xs font-bold text-white">Trợ lý AI</div>
                <div className="text-[10px] text-zinc-500">Hỗ trợ tra cứu & phân loại lỗi</div>
              </div>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
              style={{ background: "rgba(34,197,94,0.15)", color: "#22c55e" }}>● Online</span>
          </div>
          <div className="flex gap-2 flex-wrap px-4 pt-3">
            {["Tra cứu phiếu", "Phân loại lỗi", "Tạo phiếu mới"].map((t, i) => (
              <button key={i} className="px-2.5 py-1 rounded-lg text-[10px] font-medium transition-colors hover:text-orange-300"
                style={{ background: "rgba(255,255,255,0.06)", color: "#a1a1aa", border: "1px solid rgba(255,255,255,0.08)" }}>
                {i === 0 ? "🔍 " : i === 1 ? "⚡ " : "📝 "}{t}
              </button>
            ))}
          </div>
          <div className="flex-1 px-4 py-3">
            <div className="flex gap-2">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm flex-shrink-0"
                style={{ background: "rgba(249,115,22,0.15)" }}>🤖</div>
              <div className="flex-1 p-3 rounded-xl rounded-tl-none text-[11px] text-zinc-300 leading-4"
                style={{ background: "rgba(255,255,255,0.06)" }}>
                Xin chào! 👋 Tôi có thể giúp bạn tra cứu phiếu, phân tích lỗi, hoặc tạo báo cáo nhanh.
                <div className="text-[9px] text-zinc-600 mt-1">10:58</div>
              </div>
            </div>
          </div>
          <div className="px-3 pb-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <input className="flex-1 bg-transparent text-xs text-zinc-300 placeholder-zinc-600 outline-none" placeholder="Hỏi AI về dữ liệu..." />
              <button className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "#f97316" }}>
                <Icon.send />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Phiếu bảo hành ───────────────────────────────────────────────────────────
const allTickets = [
  { id: "BH-2026-0024", name: "Trần Minh Long", product: "iPhone 15 Pro", date: "20/08/2026", status: "Đang kiểm tra", sc: "#f97316" },
  { id: "BH-2026-0023", name: "Nguyễn Hà", product: "MacBook Air M2", date: "20/08/2026", status: "Đang sửa", sc: "#a78bfa" },
  { id: "BH-2026-0022", name: "Phạm Văn Việt", product: "Samsung Galaxy S24", date: "19/08/2026", status: "Hoàn tất", sc: "#22c55e" },
  { id: "BH-2026-0021", name: "Lê Thị Hoa", product: "Xiaomi 13 Pro", date: "18/08/2026", status: "Từ chối", sc: "#ef4444" },
  { id: "BH-2026-0020", name: "Hoàng Nam", product: "Dell XPS 13", date: "17/08/2026", status: "Đang sửa", sc: "#a78bfa" },
  { id: "BH-2026-0019", name: "Vũ Lan", product: "iPad Air 5", date: "16/08/2026", status: "Đang kiểm tra", sc: "#f97316" },
];

function PhieuPage() {
  return (
    <div className="flex-1 overflow-y-auto p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold mb-1">Quản lý</div>
          <h1 className="text-2xl font-black text-white">Phiếu bảo hành</h1>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.02]"
          style={{ background: "linear-gradient(135deg, #f97316, #ea580c)", boxShadow: "0 4px 16px rgba(249,115,22,0.3)" }}>
          <Icon.plus /> Tạo phiếu mới
        </button>
      </div>
      <div className="rounded-2xl overflow-hidden" style={{ background: "#111114", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-3 px-5 py-3.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-2 flex-1 px-3 py-2 rounded-xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <span className="text-zinc-500 text-xs">🔍</span>
            <input className="bg-transparent text-xs text-zinc-300 placeholder-zinc-600 outline-none flex-1" placeholder="Tìm kiếm phiếu..." />
          </div>
          <select className="px-3 py-2 rounded-xl text-xs text-zinc-300 outline-none" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <option>Tất cả trạng thái</option>
            <option>Đang kiểm tra</option>
            <option>Đang sửa</option>
            <option>Hoàn tất</option>
            <option>Từ chối</option>
          </select>
        </div>
        <div className="px-5">
          <div className="grid py-2.5 text-[10px] font-semibold tracking-wider text-zinc-500 uppercase"
            style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <span>Mã phiếu</span><span>Khách hàng</span><span>Sản phẩm</span><span>Ngày tiếp nhận</span><span>Trạng thái</span><span>Thao tác</span>
          </div>
          {allTickets.map((t, i) => (
            <div key={i} className="grid items-center py-3.5 transition-colors hover:bg-white/[0.02]"
              style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr", borderBottom: i < allTickets.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
              <span className="text-[11px] font-mono font-bold" style={{ color: "#f97316" }}>{t.id}</span>
              <span className="text-[11px] text-zinc-300">{t.name}</span>
              <span className="text-[11px] text-zinc-300">{t.product}</span>
              <span className="text-[11px] text-zinc-400">{t.date}</span>
              <span className="text-[10px] font-semibold px-2 py-1 rounded-full w-fit"
                style={{ background: `${t.sc}22`, color: t.sc }}>{t.status}</span>
              <div className="flex gap-1.5">
                {["Xem", "Sửa", "In tem"].map((a, j) => (
                  <button key={j} className="px-2.5 py-1 rounded-lg text-[10px] font-medium transition-colors hover:text-white"
                    style={{ background: "rgba(255,255,255,0.07)", color: "#a1a1aa", border: "1px solid rgba(255,255,255,0.08)" }}>
                    {a}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-end gap-2 px-5 py-3.5" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <button className="px-3 py-1.5 rounded-lg text-xs text-zinc-400 transition-colors hover:text-white" style={{ background: "rgba(255,255,255,0.06)" }}>Trước</button>
          <span className="text-xs text-zinc-400 px-2">1 / 3</span>
          <button className="px-3 py-1.5 rounded-lg text-xs text-zinc-400 transition-colors hover:text-white" style={{ background: "rgba(255,255,255,0.06)" }}>Sau</button>
        </div>
      </div>
    </div>
  );
}

// ─── Khách hàng ───────────────────────────────────────────────────────────────
const customers = [
  { name: "Trần Minh Long", initials: "ML", color: "#f97316", phone: "0912 345 678", tickets: 3 },
  { name: "Nguyễn Hà", initials: "NH", color: "#3b82f6", phone: "0988 543 210", tickets: 2 },
  { name: "Phạm Văn Việt", initials: "VV", color: "#22c55e", phone: "0903 456 700", tickets: 1 },
  { name: "Lê Thị Hoa", initials: "TH", color: "#a78bfa", phone: "0936 712 410", tickets: 4 },
];

function KhachHangPage() {
  const [selected, setSelected] = useState(0);
  const c = customers[selected];
  return (
    <div className="flex-1 overflow-y-auto p-6 animate-fade-in">
      <div className="mb-6">
        <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold mb-1">Danh sách</div>
        <h1 className="text-2xl font-black text-white">Khách hàng</h1>
      </div>
      <div className="rounded-2xl overflow-hidden" style={{ background: "#111114", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="grid" style={{ gridTemplateColumns: "280px 1fr" }}>
          <div style={{ borderRight: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="p-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="text-sm font-bold text-white mb-1">Khách hàng</div>
              <div className="text-[11px] text-zinc-500">{customers.length} khách · {customers.reduce((a, c) => a + c.tickets, 0)} phiếu</div>
            </div>
            <div className="p-2 space-y-1">
              {customers.map((cu, i) => (
                <button key={i} onClick={() => setSelected(i)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all"
                  style={{ background: selected === i ? "rgba(249,115,22,0.1)" : "transparent", border: selected === i ? "1px solid rgba(249,115,22,0.2)" : "1px solid transparent" }}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                    style={{ background: cu.color }}>{cu.initials}</div>
                  <div className="flex-1 overflow-hidden">
                    <div className="text-sm font-medium text-white truncate">{cu.name}</div>
                    <div className="text-[11px] text-zinc-500">{cu.phone}</div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{ background: "rgba(249,115,22,0.15)", color: "#f97316" }}>{cu.tickets} phiếu</span>
                </button>
              ))}
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-black text-white"
                style={{ background: c.color }}>{c.initials}</div>
              <div>
                <h2 className="text-lg font-black text-white">{c.name}</h2>
                <div className="text-sm text-zinc-400">{c.phone}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[["Tổng phiếu", c.tickets.toString()], ["Đang xử lý", "1"], ["Đã hoàn tất", (c.tickets - 1).toString()], ["Tỷ lệ hài lòng", "98%"]].map(([k, v], i) => (
                <div key={i} className="p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="text-xs text-zinc-500 mb-1">{k}</div>
                  <div className="text-2xl font-black text-white">{v}</div>
                </div>
              ))}
            </div>
            <div>
              <div className="text-sm font-bold text-white mb-3">Lịch sử bảo hành</div>
              <div className="space-y-2">
                {allTickets.slice(0, c.tickets).map((t, i) => (
                  <div key={i} className="flex items-center justify-between py-2.5 px-4 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <div>
                      <div className="text-[11px] font-mono font-bold" style={{ color: "#f97316" }}>{t.id}</div>
                      <div className="text-[11px] text-zinc-400">{t.product}</div>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-1 rounded-full" style={{ background: `${t.sc}22`, color: t.sc }}>{t.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Sản phẩm ─────────────────────────────────────────────────────────────────
const products = [
  { id: "SP-IP15P", name: "iPhone 15 Pro", cat: "Điện thoại", warranty: "12 tháng", errorRate: "4.3%", status: "Đang bán", sc: "#22c55e" },
  { id: "SP-MBA-M2", name: "MacBook Air M2", cat: "Laptop", warranty: "12 tháng", errorRate: "2.1%", status: "Đang bán", sc: "#22c55e" },
  { id: "SP-SAM-S24", name: "Samsung Galaxy S24", cat: "Điện thoại", warranty: "12 tháng", errorRate: "3.8%", status: "Cần kiểm tra", sc: "#f97316" },
  { id: "SP-XIA-13P", name: "Xiaomi 13 Pro", cat: "Điện thoại", warranty: "12 tháng", errorRate: "5.1%", status: "Hot", sc: "#ef4444" },
];

function SanPhamPage() {
  return (
    <div className="flex-1 overflow-y-auto p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold mb-1">Kho</div>
          <h1 className="text-2xl font-black text-white">Sản phẩm</h1>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
          style={{ background: "linear-gradient(135deg, #f97316, #ea580c)", boxShadow: "0 4px 16px rgba(249,115,22,0.3)" }}>
          <Icon.plus /> Thêm sản phẩm mới
        </button>
      </div>
      <div className="rounded-2xl overflow-hidden" style={{ background: "#111114", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="px-5">
          <div className="grid py-3 text-[10px] font-semibold tracking-wider text-zinc-500 uppercase"
            style={{ gridTemplateColumns: "120px 1fr 1fr 1fr 1fr 1fr", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <span>Mã SP</span><span>Tên sản phẩm</span><span>Danh mục</span><span>Thời hạn BH</span><span>Tỷ lệ lỗi</span><span>Trạng thái</span>
          </div>
          {products.map((p, i) => (
            <div key={i} className="grid items-center py-4 transition-colors hover:bg-white/[0.02]"
              style={{ gridTemplateColumns: "120px 1fr 1fr 1fr 1fr 1fr", borderBottom: i < products.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
              <span className="text-[11px] font-mono text-zinc-400">{p.id}</span>
              <span className="text-sm font-semibold text-white">{p.name}</span>
              <span className="text-[11px] text-zinc-400">{p.cat}</span>
              <span className="text-[11px] text-zinc-400">{p.warranty}</span>
              <span className="text-[11px] font-bold" style={{ color: parseFloat(p.errorRate) > 4 ? "#ef4444" : "#22c55e" }}>{p.errorRate}</span>
              <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full w-fit" style={{ background: `${p.sc}22`, color: p.sc }}>{p.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Báo cáo ──────────────────────────────────────────────────────────────────
const revenueData = [
  { week: "Tuần 1", revenue: 12000, cost: 3500 },
  { week: "Tuần 2", revenue: 18000, cost: 5000 },
  { week: "Tuần 3", revenue: 16000, cost: 4800 },
  { week: "Tuần 4", revenue: 22000, cost: 6200 },
];

function BaoCaoPage() {
  return (
    <div className="flex-1 overflow-y-auto p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold mb-1">Phân tích</div>
          <h1 className="text-2xl font-black text-white">Báo cáo</h1>
        </div>
        <button className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.02]"
          style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}>
          Xuất báo cáo PDF/Excel
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Tổng phiếu", value: "248", sub: "+12.8% so với tháng trước", sc: "#f97316" },
          { label: "Đang chờ xử lý", value: "42", sub: "Cần ưu tiên trong 24h", sc: "#a78bfa" },
          { label: "Đã hoàn tất", value: "186", sub: "Tỷ lệ hoàn tất 92%", sc: "#22c55e" },
        ].map((s, i) => (
          <div key={i} className="p-5 rounded-2xl" style={{ background: "#111114", border: `1px solid ${s.sc}22` }}>
            <div className="text-xs text-zinc-500 mb-2">{s.label}</div>
            <div className="text-3xl font-black" style={{ color: s.sc }}>{s.value}</div>
            <div className="text-[11px] text-zinc-500 mt-1">{s.sub}</div>
          </div>
        ))}
      </div>
      <div className="rounded-2xl p-5" style={{ background: "#111114", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-white">Doanh thu & chi phí bảo hành</h2>
          <button className="px-3 py-1.5 rounded-lg text-xs text-zinc-300" style={{ background: "rgba(255,255,255,0.06)" }}>Xuất báo cáo PDF/Excel</button>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={revenueData} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="week" tick={{ fill: "#71717a", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#71717a", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: "#18181b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 12, color: "#e4e4e7" }}
              cursor={{ fill: "rgba(255,255,255,0.03)" }}
            />
            <Legend wrapperStyle={{ fontSize: 11, color: "#71717a" }} />
            <Bar dataKey="revenue" name="Doanh thu" fill="#f97316" radius={[4,4,0,0]} />
            <Bar dataKey="cost" name="Chi phí" fill="#3f3f46" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ─── AI Assistant ─────────────────────────────────────────────────────────────
function AIPage() {
  const [msg, setMsg] = useState("");
  const [msgs, setMsgs] = useState([
    { role: "ai", text: "Xin chào! 👋 Tôi là AI Assistant của WarrantyHub. Tôi có thể giúp bạn phân tích dữ liệu, dự đoán xu hướng và đưa ra đề xuất tối ưu. Bạn cần hỗ trợ gì?" }
  ]);

  const send = () => {
    if (!msg.trim()) return;
    setMsgs(m => [...m, { role: "user", text: msg }, { role: "ai", text: "Đang phân tích... Tôi sẽ phản hồi sau giây lát. 🤖" }]);
    setMsg("");
  };

  return (
    <div className="flex-1 overflow-hidden p-6 animate-fade-in flex flex-col gap-6">
      <div>
        <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold mb-1">Trí tuệ nhân tạo</div>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-black text-white">AI Assistant</h1>
          <span className="text-[11px] px-3 py-1 rounded-full font-semibold" style={{ background: "rgba(34,197,94,0.15)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.2)" }}>● AI Online</span>
        </div>
      </div>
      <div className="flex gap-4 flex-1 min-h-0">
        {/* Analytics panel */}
        <div className="w-64 flex-shrink-0 space-y-3">
          <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Phân tích dữ liệu</div>
          {[
            { icon: "🎯", label: "Tỷ lệ hoàn tất", val: "92%", progress: 92, color: "#22c55e" },
            { icon: "⏱️", label: "Thời gian TB", val: "2.4 ngày", progress: 60, color: "#3b82f6" },
            { icon: "👥", label: "Khách hàng mới", val: "24", progress: 75, color: "#a78bfa" },
            { icon: "🚨", label: "Cảnh báo", val: "3", progress: 30, color: "#ef4444" },
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-xl" style={{ background: "#111114", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0"
                  style={{ background: `${item.color}22` }}>{item.icon}</div>
                <div>
                  <div className="text-[10px] text-zinc-500">{item.label}</div>
                  <div className="text-sm font-black text-white">{item.val}</div>
                </div>
              </div>
              <div className="h-1 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
                <div className="h-full rounded-full transition-all" style={{ width: `${item.progress}%`, background: item.color }} />
              </div>
            </div>
          ))}
          <div className="p-4 rounded-xl" style={{ background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.2)" }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">💡</span>
              <span className="text-xs font-bold text-orange-300">Đề xuất từ AI</span>
            </div>
            <p className="text-[11px] text-zinc-300 leading-4">Lỗi màn hình chiếm 34% tổng phiếu. Đề xuất: Chuẩn bị thêm linh kiện thay thế cho dòng iPhone 15.</p>
          </div>
        </div>

        {/* Chat */}
        <div className="flex-1 flex flex-col rounded-2xl overflow-hidden" style={{ background: "#111114", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="px-4 py-3 text-xs font-semibold text-zinc-400" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            Hỏi đáp về dữ liệu bảo hành
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {msgs.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm flex-shrink-0"
                  style={{ background: m.role === "ai" ? "rgba(249,115,22,0.15)" : "rgba(167,139,250,0.2)" }}>
                  {m.role === "ai" ? "🤖" : "👤"}
                </div>
                <div className="max-w-[80%] p-3 rounded-2xl text-[12px] text-zinc-200 leading-5"
                  style={{
                    background: m.role === "ai" ? "rgba(255,255,255,0.05)" : "rgba(249,115,22,0.12)",
                    border: m.role === "ai" ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(249,115,22,0.2)",
                    borderRadius: m.role === "ai" ? "0 16px 16px 16px" : "16px 0 16px 16px"
                  }}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <input
                className="flex-1 bg-transparent text-sm text-zinc-200 placeholder-zinc-600 outline-none"
                placeholder="Hỏi AI về dữ liệu bảo hành..."
                value={msg}
                onChange={e => setMsg(e.target.value)}
                onKeyDown={e => e.key === "Enter" && send()}
              />
              <button onClick={send} className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                style={{ background: "linear-gradient(135deg, #f97316, #ea580c)" }}>
                <Icon.send />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Dashboard layout ─────────────────────────────────────────────────────────
const pageTitles: Record<Page, string> = {
  login: "",
  dashboard: "Tổng quan",
  phieu: "Phiếu bảo hành",
  khachhang: "Khách hàng",
  sanpham: "Sản phẩm",
  baocao: "Báo cáo",
  ai: "AI Assistant",
};

function DashboardLayout({ page, setPage }: { page: Page; setPage: (p: Page) => void }) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="flex h-full" style={{ background: "#0a0a0b" }}>
      <Sidebar page={page} setPage={setPage} collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="flex flex-col flex-1 min-w-0">
        <TopBar breadcrumb={pageTitles[page]} collapsed={collapsed} setCollapsed={setCollapsed} />
        {page === "dashboard" && <DashboardPage />}
        {page === "phieu" && <PhieuPage />}
        {page === "khachhang" && <KhachHangPage />}
        {page === "sanpham" && <SanPhamPage />}
        {page === "baocao" && <BaoCaoPage />}
        {page === "ai" && <AIPage />}
      </div>
    </div>
  );
}

// ─── Root ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<Page>("login");

  if (page === "login") {
    return <LoginPage onLogin={() => setPage("dashboard")} />;
  }
  return <DashboardLayout page={page} setPage={setPage} />;
}
