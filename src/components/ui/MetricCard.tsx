"use client";

import { motion } from "framer-motion";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: { value: number; positive: boolean };
  color?: string;
  glowColor?: string;
}

export default function MetricCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  color = "#3b82f6",
}: MetricCardProps) {
  return (
    <motion.div
      className="glass-card p-5 group relative overflow-hidden"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
            style={{
              background: `rgba(255, 255, 255, 0.04)`,
              border: `1px solid rgba(255, 255, 255, 0.08)`,
              color: color,
            }}
          >
            {icon}
          </div>
          <p className="text-text-muted text-xs font-mono uppercase tracking-wider">
            {title}
          </p>
        </div>
        {trend && (
          <div
            className={`flex items-center gap-1 text-[11px] font-mono font-bold px-2 py-0.5 rounded-full ${
              trend.positive
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
            }`}
          >
            <span>{trend.positive ? "↑" : "↓"}</span>
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
      <div>
        <p className="text-2xl font-extrabold tracking-tight text-text-primary mb-0.5">
          {value}
        </p>
        {subtitle && (
          <p className="text-text-muted text-[11px]">{subtitle}</p>
        )}
      </div>
    </motion.div>
  );
}

