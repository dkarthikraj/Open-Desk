"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import MetricCard from "@/components/ui/MetricCard";
import { useToast, ToastContainer } from "@/components/ui/Toast";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const classEngagementData = [
  { time: "10:00", active: 55, struggling: 5, idle: 2 },
  { time: "10:15", active: 60, struggling: 3, idle: 1 },
  { time: "10:30", active: 45, struggling: 12, idle: 5 },
  { time: "10:45", active: 50, struggling: 8, idle: 4 },
  { time: "11:00", active: 58, struggling: 4, idle: 2 },
];

const riskStudents = [
  { name: "John Doe", id: "CS21045", risk: "High", reason: "Persistent compilation errors (30+ mins)", lastActive: "2m ago" },
  { name: "Alice Smith", id: "CS21012", risk: "Medium", reason: "Frequent context switching", lastActive: "Just now" },
  { name: "Bob Wilson", id: "CS21088", risk: "Medium", reason: "High AI Dependency (90%)", lastActive: "5m ago" },
];

export default function FacultyDashboard() {
  const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };
  const { toasts, show } = useToast();
  const [broadcastSent, setBroadcastSent] = useState(false);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-[1400px]">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-card p-6 border-white/10">
        <div>
          <span className="text-xs font-mono text-accent-cyan uppercase tracking-widest block mb-1">FACULTY COMMAND CENTER</span>
          <h1 className="text-2xl font-extrabold mb-1 tracking-tight">Academic Intelligence & Live Monitoring</h1>
          <p className="text-sm text-text-secondary">Real-time anti-cheat tracking, AI auto-grading, and student struggle detection.</p>
        </div>
        <div className="flex gap-3 items-center">
          <div className="glass-card-sm px-4 py-2 flex items-center gap-2 border-white/10">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            <span className="text-xs font-bold text-text-primary">CS302 Data Structures Lab Active</span>
          </div>
          <button
            onClick={() => { setBroadcastSent(true); show("Hint broadcast sent to all 62 active lab students", "success"); setTimeout(() => setBroadcastSent(false), 2000); }}
            className="px-4 py-2.5 rounded-lg bg-white text-black text-xs font-semibold hover:bg-gray-100 transition-all shadow-sm flex items-center gap-1.5"
          >
            <span>{broadcastSent ? "✓" : "Broadcast"}</span>
            <span>{broadcastSent ? "Sent!" : "Hint"}</span>
          </button>

        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Class Engagement" value="85%" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>} trend={{ value: 5, positive: true }} color="#ec4899" />
        <MetricCard title="Struggling Students" value="3" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>} color="#f59e0b" subtitle="Intervention requested" />
        <MetricCard title="Lab Submissions" value="42 / 62" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>} color="#10b981" subtitle="Auto-graded 100%" />
        <MetricCard title="AI Interventions" value="3.2 / student" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/></svg>} color="#8b5cf6" subtitle="Optimal AI scaffolding" />
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Engagement Chart */}
        <motion.div variants={item} className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-text-muted uppercase font-mono tracking-wider">Live Class Flow State</h3>
            <div className="flex gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#10b981]"/> Active Flow</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#f59e0b]"/> Struggling</span>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={classEngagementData}>
                <defs>
                  <linearGradient id="activeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="strugGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="time" stroke="#8888aa" fontSize={11} tickLine={false} />
                <YAxis stroke="#8888aa" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "#0a0a14", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12, fontSize: 12 }} />
                <Area type="monotone" dataKey="active" stackId="1" stroke="#10b981" fill="url(#activeGrad)" strokeWidth={2.5} />
                <Area type="monotone" dataKey="struggling" stackId="2" stroke="#f59e0b" fill="url(#strugGrad)" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Risk Alerts */}
        <motion.div variants={item} className="glass-card p-6 flex flex-col border-accent-amber/20">
          <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
            <h3 className="text-xs font-bold text-text-muted uppercase font-mono tracking-wider flex items-center gap-2">
              <span className="text-accent-red">⚠️</span> Struggle Radar
            </h3>
            <span className="text-[10px] bg-red-500/20 text-red-400 font-extrabold px-2.5 py-1 rounded-full border border-red-500/30">3 Alerts</span>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto">
            {riskStudents.map((s, i) => (
              <div key={i} className="glass-card-sm p-3.5 border-white/5 space-y-1.5 hover:border-white/20 transition-all">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-text-primary">{s.name}</span>
                    <span className="text-[10px] text-text-muted font-mono">{s.id}</span>
                  </div>
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                    s.risk === "High" ? "bg-red-500/20 text-red-400 border border-red-500/30" : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                  }`}>{s.risk}</span>
                </div>
                <p className="text-xs text-text-secondary leading-tight">{s.reason}</p>
                <div className="flex justify-between items-center text-[10px] text-text-muted pt-1">
                  <span>{s.lastActive}</span>
                  <button onClick={() => show(`Help request sent to ${s.name}`, "info")} className="text-accent-blue hover:underline font-bold">Assist Student →</button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <ToastContainer toasts={toasts} />
    </motion.div>
  );
}
