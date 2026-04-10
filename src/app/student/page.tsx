"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import MetricCard from "@/components/ui/MetricCard";
import GlowOrb from "@/components/ui/GlowOrb";
import SkillRadar from "@/components/ui/SkillRadar";
import ActivityHeatmap from "@/components/ui/ActivityHeatmap";
import { getGreeting, getRandomMotivation } from "@/lib/utils";
import { useToast, ToastContainer } from "@/components/ui/Toast";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar,
} from "recharts";

const focusData = [
  { time: "9AM", focus: 72, momentum: 65 },
  { time: "10AM", focus: 85, momentum: 78 },
  { time: "11AM", focus: 91, momentum: 88 },
  { time: "12PM", focus: 68, momentum: 60 },
  { time: "1PM", focus: 45, momentum: 42 },
  { time: "2PM", focus: 78, momentum: 72 },
  { time: "3PM", focus: 88, momentum: 85 },
  { time: "4PM", focus: 82, momentum: 79 },
];

const weeklyData = [
  { day: "Mon", score: 78 }, { day: "Tue", score: 85 },
  { day: "Wed", score: 72 }, { day: "Thu", score: 91 },
  { day: "Fri", score: 88 }, { day: "Sat", score: 65 },
  { day: "Sun", score: 45 },
];

const skills = [
  { name: "Problem Solving", value: 82, color: "#4f8fff" },
  { name: "Debugging", value: 75, color: "#8b5cf6" },
  { name: "Concept Clarity", value: 88, color: "#00d4ff" },
  { name: "Focus", value: 70, color: "#10b981" },
  { name: "AI Independence", value: 65, color: "#f59e0b" },
  { name: "Code Quality", value: 78, color: "#ec4899" },
];

const heatmapData = Array.from({ length: 7 }, () =>
  Array.from({ length: 20 }, () => Math.floor(Math.random() * 8))
);

const journeySteps = [
  { label: "Pre-Lab Quiz", status: "done", color: "#10b981" },
  { label: "Virtual Lab", status: "active", color: "#4f8fff" },
  { label: "AI Reflection", status: "pending", color: "#555577" },
  { label: "Assignment", status: "pending", color: "#555577" },
  { label: "AI Viva Voice Exam", status: "pending", color: "#a855f7" },
];

const aiMessages = [
  { text: "You struggled with recursion yesterday. Want a quick adaptive revision in the lab?", type: "insight" },
  { text: "Your debugging persistence rose 15% this week — great improvement!", type: "praise" },
  { text: "I noticed you paused on linked list traversal. I've prepared a visual memory breakdown.", type: "help" },
];

export default function StudentDashboard() {
  const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };
  const [mentorInput, setMentorInput] = useState("");
  const [chatMessages, setChatMessages] = useState(aiMessages);
  const { toasts, show } = useToast();

  const handleMentorSend = () => {
    if (!mentorInput.trim()) return;
    setChatMessages((prev) => [...prev, { text: mentorInput, type: "user" }]);
    setMentorInput("");
    show("Message sent to AI Mentor", "success");
    setTimeout(() => {
      setChatMessages((prev) => [...prev, { text: "Analyzed your code workspace. Focus on base cases for your recursive tree traversal before running tests.", type: "insight" }]);
    }, 1200);
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-[1400px]">
      {/* Welcome Banner */}
      <motion.div variants={item} className="glass-card p-6 md:p-8 relative overflow-hidden border-white/[0.08]">
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider">{getGreeting()}</span>
            </div>
            <h1 className="text-3xl font-extrabold mb-2 tracking-tight text-white">
              Welcome back, D Karthik Raj
            </h1>
            <p className="text-text-secondary text-xs md:text-sm max-w-lg leading-relaxed">{getRandomMotivation()}</p>
          </div>
          <div className="flex items-center gap-6 glass-card-sm p-4 border-white/[0.06]">
            <div className="text-center">
              <p className="text-2xl font-extrabold text-white font-mono">92%</p>
              <p className="text-[10px] text-text-muted uppercase font-mono tracking-wider">Focus Momentum</p>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center">
              <p className="text-2xl font-extrabold text-emerald-400 font-mono">A+</p>
              <p className="text-[10px] text-text-muted uppercase font-mono tracking-wider">Algorithm Mastery</p>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <GlowOrb state="flow" size={38} />
          </div>
        </div>
      </motion.div>

      {/* Quick Launch Cards */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/student/labs" className="glass-card p-5 hover:border-white/20 transition-all group flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-text-muted block mb-1 uppercase tracking-wider">VIRTUAL BATTLESTATION</span>
            <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">Monaco Cloud Labs →</h3>
            <p className="text-xs text-text-secondary mt-1">Binary Search Tree Implementation</p>
          </div>
          <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-white">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
          </div>
        </Link>
        <Link href="/student/viva" className="glass-card p-5 hover:border-white/20 transition-all group flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-text-muted block mb-1 uppercase tracking-wider">VOICE & TEXT AI EXAM</span>
            <h3 className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors">AI Viva Practice →</h3>
            <p className="text-xs text-text-secondary mt-1">Data Structures Examination</p>
          </div>
          <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-white">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg>
          </div>
        </Link>
        <Link href="/student/mentor" className="glass-card p-5 hover:border-white/20 transition-all group flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-text-muted block mb-1 uppercase tracking-wider">24/7 CONTEXT TUTOR</span>
            <h3 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">AI Academic Mentor →</h3>
            <p className="text-xs text-text-secondary mt-1">Code logic debugging & guidance</p>
          </div>
          <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-white">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/></svg>
          </div>
        </Link>
      </motion.div>

      {/* Today's Journey */}
      <motion.div variants={item} className="glass-card p-6 border-white/[0.06]">

        <h2 className="text-xs font-bold text-text-muted uppercase font-mono tracking-widest mb-4">Academic Learning Flow</h2>
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {journeySteps.map((step, i) => (
            <div key={i} className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => show(`${step.label}: ${step.status === "done" ? "Completed ✓" : step.status === "active" ? "In progress..." : "Next step"}`, step.status === "done" ? "success" : "info")}
                className={`flex items-center gap-2.5 px-4 py-2 rounded-lg border text-xs font-mono transition-all ${
                  step.status === "active"
                    ? "bg-white/10 text-white border-white/20 font-bold"
                    : step.status === "done"
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    : "bg-white/[0.02] text-text-muted border-white/[0.06]"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${
                  step.status === "active" ? "bg-blue-400 animate-pulse" : step.status === "done" ? "bg-emerald-400" : "bg-gray-600"
                }`} />
                <span>{step.label}</span>
              </button>
              {i < journeySteps.length - 1 && (
                <div className="w-6 h-px bg-white/10" />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Metric Cards */}
      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Focus Score" value="87%" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>} trend={{ value: 12, positive: true }} color="#3b82f6" />
        <MetricCard title="Confusion Index" value="23%" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>} trend={{ value: 8, positive: true }} color="#f59e0b" />
        <MetricCard title="Flow Streak" value="5 Days" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>} subtitle="Optimal pace" color="#10b981" />
        <MetricCard title="Confidence Level" value="84%" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>} trend={{ value: 7, positive: true }} color="#8b5cf6" />
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Focus Chart */}
        <motion.div variants={item} className="lg:col-span-2 glass-card p-6 border-white/[0.06]">
          <h3 className="text-xs font-bold text-text-muted uppercase font-mono tracking-wider mb-4">Focus & Cognitive Load Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={focusData}>
                <defs>
                  <linearGradient id="focusGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="time" stroke="#6b7280" fontSize={11} tickLine={false} />
                <YAxis stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "#08080f", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, fontSize: 12 }} />
                <Area type="monotone" dataKey="focus" stroke="#3b82f6" fill="url(#focusGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* AI Mentor Quick Panel */}
        <motion.div variants={item} className="glass-card p-6 flex flex-col border-white/[0.06]">
          <div className="flex items-center gap-3 mb-4 border-b border-white/[0.06] pb-3">
            <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-white">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/></svg>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">24/7 AI Mentor</h3>
              <p className="text-[10px] text-emerald-400 font-mono">● Active Context</p>
            </div>
          </div>

          <div className="flex-1 space-y-3 mb-4 max-h-48 overflow-y-auto pr-1">
            {chatMessages.map((msg, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: msg.type === "user" ? 10 : -10 }} animate={{ opacity: 1, x: 0 }}
                className={`p-3 rounded-lg text-xs leading-relaxed ${msg.type === "user" ? "bg-white/10 text-white ml-6 border border-white/15" : "glass-card-sm text-text-secondary border-white/5"}`}>
                {msg.text}
              </motion.div>

            ))}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={mentorInput}
              onChange={(e) => setMentorInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleMentorSend()}
              placeholder="Ask your AI mentor..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-text-primary placeholder:text-text-muted outline-none focus:border-accent-purple/50 transition-colors"
            />
            <button onClick={handleMentorSend} className="p-2.5 rounded-xl bg-accent-purple/20 text-accent-purple hover:bg-accent-purple/30 transition-colors border border-accent-purple/30">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Skill Radar */}
        <motion.div variants={item} className="glass-card p-6 flex flex-col items-center">
          <h3 className="text-xs font-bold text-text-muted uppercase font-mono tracking-wider mb-4 self-start">Learning DNA Profile</h3>
          <SkillRadar skills={skills} size={220} />
        </motion.div>

        {/* Weekly Performance */}
        <motion.div variants={item} className="glass-card p-6">
          <h3 className="text-xs font-bold text-text-muted uppercase font-mono tracking-wider mb-4">Weekly Lab Scores</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="day" stroke="#8888aa" fontSize={11} tickLine={false} />
                <YAxis stroke="#8888aa" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "#0a0a14", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12, fontSize: 12 }} />
                <Bar dataKey="score" fill="#4f8fff" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Activity Heatmap */}
        <motion.div variants={item} className="glass-card p-6">
          <h3 className="text-xs font-bold text-text-muted uppercase font-mono tracking-wider mb-4">Code & Lab Activity Grid</h3>
          <ActivityHeatmap data={heatmapData} label="Past 20 weeks" />
        </motion.div>
      </div>

      <ToastContainer toasts={toasts} />
    </motion.div>
  );
}

