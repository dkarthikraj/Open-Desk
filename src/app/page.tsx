"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ParticleField from "@/components/ui/ParticleField";

const roleData = {
  student: {
    title: "Student Workspace",
    subtitle: "Behavior-Aware Virtual Labs & AI Mentorship",
    metrics: [
      { label: "Focus Momentum", val: "92%", color: "#10b981" },
      { label: "Active Lab", val: "Binary Search Trees", color: "#3b82f6" },
      { label: "AI Mentor Guidance", val: "Real-Time Contextual", color: "#a855f7" }
    ],
    features: ["Virtual Cloud Labs", "AI Viva Voice Exam", "24/7 Academic Mentor", "Learning DNA Profile"],
    href: "/student",
    cta: "Launch Student Hub"
  },
  faculty: {
    title: "Faculty Command Center",
    subtitle: "Real-Time Proctoring & AI Auto-Grading",
    metrics: [
      { label: "Class Flow State", val: "88%", color: "#06b6d4" },
      { label: "Risk Alerts", val: "0 Critical", color: "#10b981" },
      { label: "Auto-Graded Labs", val: "142 Submissions", color: "#f59e0b" }
    ],
    features: ["Live Anti-Cheat Camera Grid", "Automated Rubric Evaluator", "AI Viva Configurator", "Student Struggle Radar"],
    href: "/faculty",
    cta: "Launch Faculty Portal"
  },
  admin: {
    title: "Institutional Governance",
    subtitle: "Campus-Wide Intelligence & AI Risk Control",
    metrics: [
      { label: "Academic Integrity", val: "99.4%", color: "#10b981" },
      { label: "Dept Compliance", val: "100%", color: "#3b82f6" },
      { label: "System Health", val: "Optimal", color: "#a855f7" }
    ],
    features: ["Department Performance Risk", "AI Model Transparency", "Curriculum Optimization", "Campus Resource Analytics"],
    href: "/admin",
    cta: "Launch Admin Portal"
  }
};

export default function LandingPage() {
  const [activeRole, setActiveRole] = useState<"student" | "faculty" | "admin">("student");
  const [sandboxFocus, setSandboxFocus] = useState(85);
  const [sandboxStruggle, setSandboxStruggle] = useState(15);

  return (
    <div className="min-h-screen bg-[#030307] neural-grid relative overflow-hidden text-text-primary">
      <ParticleField count={60} />

      {/* Navigation */}
      <nav className="glass-nav sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 py-3.5 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center font-bold text-white text-xs">
            OD
          </div>
          <div>
            <span className="text-base font-bold tracking-tight text-white">OpenDesk</span>
            <span className="text-[10px] text-text-muted block font-mono">ACADEMIC OS</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-8 text-xs font-medium text-text-secondary">
          <a href="#features" className="hover:text-white transition-colors">Capabilities</a>
          <a href="#sandbox" className="hover:text-white transition-colors">AI Diagnostics</a>
          <a href="#dashboards" className="hover:text-white transition-colors">Portals</a>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/student" className="hidden sm:inline-flex text-xs font-medium text-text-secondary hover:text-white transition-colors px-3 py-1.5">
            Sign In
          </Link>
          <Link
            href="/student"
            className="text-xs font-semibold bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-100 transition-all shadow-sm"
          >
            Get Started →
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-20 pb-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 bg-white/[0.03] border border-white/[0.08] rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider">AI ACADEMIC INTELLIGENCE OS</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] mb-6 tracking-tight">
            <span>Behavior-Aware</span>
            <br />
            <span className="gradient-text">Practical Learning</span>
          </h1>

          <p className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Transform practical labs, assignments, and viva examinations into an adaptive intelligence network for students, faculty, and institutions.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/student" className="w-full sm:w-auto">
              <div className="bg-white text-black px-7 py-3 rounded-lg font-semibold text-xs hover:bg-gray-100 transition-all shadow-md flex items-center justify-center gap-2">
                <span>Launch Student Portal</span>
                <span>→</span>
              </div>
            </Link>
            <Link
              href="/faculty"
              className="glass-card-sm text-white px-7 py-3 rounded-lg font-semibold text-xs hover:border-white/20 transition-all border border-white/10 w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <span>Faculty Command</span>
              <span>→</span>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Role Switcher Preview Section */}
      <section id="dashboards" className="relative z-10 px-6 md:px-12 pb-24 max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 tracking-tight">
            <span>Tailored </span>
            <span className="gradient-text">Academic Workspaces</span>
          </h2>
          <p className="text-text-secondary text-xs md:text-sm max-w-lg mx-auto">
            Switch between workspaces to preview features designed for students, faculty, and administrators.
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="flex justify-center gap-1.5 mb-8 bg-white/[0.03] p-1.5 rounded-xl border border-white/[0.06] max-w-md mx-auto">
          {(["student", "faculty", "admin"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setActiveRole(r)}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all capitalize ${
                activeRole === r
                  ? "bg-white text-black font-bold shadow-sm"
                  : "text-text-secondary hover:text-white"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Dynamic Role Preview Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeRole}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="glass-card p-8 md:p-10 border-white/[0.08] relative overflow-hidden"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-white/[0.06] pb-6">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block mb-1">PORTAL PREVIEW</span>
                <h3 className="text-xl font-bold text-white">{roleData[activeRole].title}</h3>
                <p className="text-xs text-text-secondary">{roleData[activeRole].subtitle}</p>
              </div>
              <Link
                href={roleData[activeRole].href}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs px-5 py-2.5 rounded-lg border border-white/10 transition-all self-start md:self-auto"
              >
                <span>{roleData[activeRole].cta}</span>
                <span>→</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {roleData[activeRole].metrics.map((m, idx) => (
                <div key={idx} className="glass-card-sm p-4 border-white/[0.05]">
                  <p className="text-[11px] text-text-muted mb-1 font-mono uppercase">{m.label}</p>
                  <p className="text-xl font-extrabold" style={{ color: m.color }}>{m.val}</p>
                </div>
              ))}
            </div>

            <div>
              <p className="text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider mb-3">Core Capabilities</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                {roleData[activeRole].features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 glass-card-sm px-3.5 py-2.5 border-white/[0.05]">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span className="text-xs font-medium text-text-primary">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Interactive AI Engine Sandbox */}
      <section id="sandbox" className="relative z-10 px-6 md:px-12 pb-24 max-w-5xl mx-auto">
        <div className="glass-card p-8 md:p-10 relative overflow-hidden border-white/[0.08]">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-3 py-1 mb-4">
              <span className="text-[11px] font-mono text-purple-400">INTERACTIVE DIAGNOSTIC</span>
            </div>
            <h2 className="text-2xl font-bold mb-2 tracking-tight">AI Cognitive Engine</h2>
            <p className="text-text-secondary text-xs md:text-sm max-w-2xl mb-8">
              Adjust student behavior sliders to test real-time struggle pattern detection and AI mentoring responses.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div className="space-y-5 glass-card-sm p-5 border-white/[0.05]">
                <div>
                  <div className="flex justify-between text-xs font-mono font-bold mb-2">
                    <span>Student Focus Level</span>
                    <span className="text-cyan-400">{sandboxFocus}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={sandboxFocus}
                    onChange={(e) => setSandboxFocus(Number(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono font-bold mb-2">
                    <span>Concept Struggle Index</span>
                    <span className="text-rose-400">{sandboxStruggle}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sandboxStruggle}
                    onChange={(e) => setSandboxStruggle(Number(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-rose-400"
                  />
                </div>
              </div>

              <div className="glass-card-sm p-5 flex flex-col justify-between border-white/[0.05]">
                <div>
                  <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block mb-2">AI DIAGNOSTIC OUTPUT</span>
                  <div className="text-sm font-bold text-white mb-2">
                    {sandboxStruggle > 60
                      ? "⚠️ Struggle Detected: Initiating Micro-Scaffolding"
                      : sandboxFocus > 80
                      ? "⚡ High Flow State: Escalating Problem Complexity"
                      : "💬 Steady Momentum: Providing Context Hints"}
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {sandboxStruggle > 60
                      ? "AI detects hesitation patterns in recursion logic. Recommending visual memory diagram and 2-minute step-by-step walkthrough."
                      : sandboxFocus > 80
                      ? "Student is completing tasks 30% faster than baseline. Unlocking advanced algorithm optimization challenge."
                      : "Optimal learning pace detected. AI mentor is quietly monitoring without interrupting focus."}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
                  <span className="text-text-muted">Confidence</span>
                  <span className="font-bold text-emerald-400">98.4%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.06] px-8 py-6 glass-nav">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-6xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center text-white font-bold text-xs">
              OD
            </div>
            <span className="text-xs font-bold text-white">OpenDesk</span>
          </div>
          <p className="text-xs text-text-muted font-mono">
            Academic Intelligence Ecosystem
          </p>
        </div>
      </footer>
    </div>
  );
}


