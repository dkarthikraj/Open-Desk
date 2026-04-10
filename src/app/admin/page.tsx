"use client";

import { motion } from "framer-motion";
import MetricCard from "@/components/ui/MetricCard";
import { useToast, ToastContainer } from "@/components/ui/Toast";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const departmentData = [
  { name: "CSE", health: 92, students: 840 },
  { name: "ISE", health: 88, students: 420 },
  { name: "ECE", health: 75, students: 600 },
  { name: "AIML", health: 95, students: 300 },
];

const adoptionData = [
  { month: "Jan", adoption: 30 },
  { month: "Feb", adoption: 45 },
  { month: "Mar", adoption: 65 },
  { month: "Apr", adoption: 82 },
  { month: "May", adoption: 91 },
];

export default function AdminDashboard() {
  const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };
  const { toasts, show } = useToast();

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-[1400px]">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-card p-6 border-white/10">
        <div>
          <span className="text-xs font-mono text-accent-amber uppercase tracking-widest block mb-1">INSTITUTIONAL GOVERNANCE</span>
          <h1 className="text-2xl font-extrabold mb-1 tracking-tight">Global Campus Intelligence & AI Risk Control</h1>
          <p className="text-sm text-text-secondary">VTU Autonomous Institution Platform • Real-time AI Compliance & Department Health.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="glass-card-sm px-4 py-2 flex items-center gap-2 border-white/10">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            <span className="text-xs font-bold text-text-primary">System Status: Optimal</span>
          </div>
          <button onClick={() => show("Generating institutional compliance audit report...", "success")} className="px-4 py-2.5 rounded-lg bg-white text-black text-xs font-semibold hover:bg-gray-100 transition-all shadow-sm">
            Compliance Report →
          </button>

        </div>
      </div>

      {/* High Level Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Institution Health" value="A+" icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"/></svg>} trend={{ value: 2, positive: true }} color="#f59e0b" subtitle="Top 5% regionally" />
        <MetricCard title="AI Adoption" value="91%" icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>} trend={{ value: 9, positive: true }} color="#06b6d4" />
        <MetricCard title="Active Labs" value="142" icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 2v7.5M14 2v7.5M8.5 2h7M14 9.5a5 5 0 1 1-4 0v-7.5"/></svg>} color="#8b5cf6" subtitle="Across 8 departments" />
        <MetricCard title="Risk Alerts" value="3" icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>} trend={{ value: 12, positive: false }} color="#ef4444" subtitle="Plagiarism & AI Dependency" />
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Health Chart */}
        <motion.div variants={item} className="glass-card p-6">
          <h3 className="text-xs font-bold text-text-muted uppercase font-mono tracking-wider mb-4">Department Health Scores</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="name" stroke="#8888aa" fontSize={11} tickLine={false} />
                <YAxis stroke="#8888aa" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{ background: "#0a0a14", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12, fontSize: 12 }} />
                <Bar dataKey="health" fill="#f59e0b" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Platform Adoption */}
        <motion.div variants={item} className="glass-card p-6">
          <h3 className="text-xs font-bold text-text-muted uppercase font-mono tracking-wider mb-4">Platform AI Adoption Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={adoptionData}>
                <defs>
                  <linearGradient id="adoptGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#00d4ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="month" stroke="#8888aa" fontSize={11} tickLine={false} />
                <YAxis stroke="#8888aa" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "#0a0a14", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12, fontSize: 12 }} />
                <Area type="monotone" dataKey="adoption" stroke="#00d4ff" fill="url(#adoptGrad)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* AI Governance & Risk Table */}
      <motion.div variants={item} className="glass-card p-6 border-white/10">
        <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
          <h3 className="text-xs font-bold text-text-muted uppercase font-mono tracking-wider">AI Governance & Compliance Incidents</h3>
          <span className="text-[10px] text-text-muted font-mono">Last 7 days</span>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-[10px] font-mono text-text-muted uppercase tracking-wider">
                <th className="pb-3 px-4 font-bold">Incident Type</th>
                <th className="pb-3 px-4 font-bold">Department</th>
                <th className="pb-3 px-4 font-bold">Severity</th>
                <th className="pb-3 px-4 font-bold">Status</th>
                <th className="pb-3 px-4 font-bold">Action Taken</th>
              </tr>
            </thead>
            <tbody className="text-xs text-text-secondary">
              {[
                { type: "High AI Dependency (>95%)", dept: "CSE", sev: "Medium", status: "Review", action: "Flagged to Mentor" },
                { type: "Copy/Paste Anomaly", dept: "ECE", sev: "High", status: "Resolved", action: "Submission Voided" },
                { type: "Inconsistent Code DNA", dept: "ISE", sev: "High", status: "Open", action: "Viva Triggered" },
              ].map((row, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-3.5 px-4 text-text-primary font-bold">{row.type}</td>
                  <td className="py-3.5 px-4 font-mono">{row.dept}</td>
                  <td className="py-3.5 px-4">
                    <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded ${
                      row.sev === 'High' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>{row.sev}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-[10px] text-text-muted font-mono">{row.status}</span>
                  </td>
                  <td className="py-3.5 px-4 text-[#60a5fa] font-semibold">{row.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <ToastContainer toasts={toasts} />
    </motion.div>
  );
}

