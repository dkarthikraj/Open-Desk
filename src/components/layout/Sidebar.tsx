"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";

export interface SidebarItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
}

interface SidebarProps {
  items: SidebarItem[];
  title: string;
  subtitle: string;
  accentColor?: string;
  gradientFrom?: string;
  gradientTo?: string;
}

export default function Sidebar({
  items,
  title,
  subtitle,
  accentColor = "#4f8fff",
  gradientFrom = "from-accent-blue",
  gradientTo = "to-accent-purple",
}: SidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const nav = (
    <aside
      className="fixed top-0 left-0 h-full z-40 flex flex-col bg-[#0a0a14]/95 backdrop-blur-2xl border-r border-white/10 shadow-2xl"
      style={{ width: 260 }}
    >
      {/* Brand Header */}
      <div className="px-5 py-5 border-b border-white/10 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center shrink-0 text-white group-hover:bg-white/20 transition-colors">
              <span className="font-mono text-xs font-bold">OD</span>
            </div>

            <div className="min-w-0">
              <h2 className="text-sm font-extrabold text-text-primary truncate tracking-tight">{title}</h2>
              <p className="text-[10px] font-mono text-accent-cyan truncate">{subtitle}</p>
            </div>
          </Link>
        </div>

        {/* Back to Home Link */}
        <Link
          href="/"
          className="flex items-center gap-2 text-[11px] font-semibold text-text-muted hover:text-text-primary transition-colors px-2 py-1 rounded-lg bg-white/5 border border-white/5"
        >
          <span>← Back to Landing</span>
        </Link>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>
              <div className={`sidebar-item relative ${isActive ? "active" : ""}`}>
                {isActive && (
                  <motion.div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full"
                    style={{ background: accentColor }}
                    layoutId="sidebar-indicator"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="shrink-0">{item.icon}</span>
                <span className="truncate text-xs font-semibold">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full font-extrabold" style={{ background: accentColor + "25", color: accentColor, border: `1px solid ${accentColor}40` }}>
                    {item.badge}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* User Footer */}
      <div className="px-4 py-4 border-t border-white/10">
        <div className="glass-card-sm p-3 rounded-xl border border-white/10">
          <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-white text-xs font-mono font-bold">
                KR
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-[#030307]" />

            <div className="min-w-0">
              <p className="text-xs font-bold text-text-primary truncate">D Karthik Raj</p>
              <p className="text-[10px] text-text-muted truncate">dkarthikraj18@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );

  return (
    <>
      <div className="md:hidden fixed top-0 left-0 z-50 p-3">
        <button onClick={() => setMobileOpen(!mobileOpen)} className="glass-card-sm p-2.5 rounded-xl border border-white/10">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>
      <div className="hidden md:block">{nav}</div>
      {mobileOpen && (
        <>
          <div className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-md z-30" onClick={() => setMobileOpen(false)} />
          <div className="md:hidden">{nav}</div>
        </>
      )}
    </>
  );
}

