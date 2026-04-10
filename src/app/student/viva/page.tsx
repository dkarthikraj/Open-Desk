"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const vivaQuestions = [
  { q: "Explain the time complexity of BST insertion in the worst case.", difficulty: "Medium", topic: "BST" },
  { q: "What is the difference between a BST and a balanced BST?", difficulty: "Easy", topic: "Trees" },
  { q: "How would you convert a BST to a sorted doubly linked list?", difficulty: "Hard", topic: "BST" },
  { q: "Explain inorder traversal without recursion.", difficulty: "Medium", topic: "Traversal" },
];

export default function VivaPage() {
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answer, setAnswer] = useState("");
  const [confidence, setConfidence] = useState(72);

  if (!started) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center min-h-[70vh]">
        <div className="text-center max-w-lg">
          <motion.div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg>
          </motion.div>
          <h1 className="text-3xl font-extrabold mb-3 text-white">AI Viva Simulation</h1>
          <p className="text-text-secondary text-xs mb-2">Prepare for your practical viva with our AI interviewer</p>
          <p className="text-text-muted text-xs mb-8">Personalized questions based on your lab work and learning patterns</p>
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[{ l: "Questions", v: "4" }, { l: "Duration", v: "~15 min" }, { l: "Difficulty", v: "Adaptive" }].map((m, i) => (
              <div key={i} className="glass-card-sm p-3">
                <p className="text-base font-extrabold text-white">{m.v}</p>
                <p className="text-[10px] text-text-muted">{m.l}</p>
              </div>
            ))}
          </div>
          <button onClick={() => setStarted(true)} className="px-7 py-3 rounded-lg bg-white text-black font-semibold text-xs hover:bg-gray-100 transition-all shadow-sm">
            Begin Viva Session
          </button>
        </div>
      </motion.div>
    );
  }

  const q = vivaQuestions[currentQ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">AI Viva Session</h1>
          <p className="text-xs text-text-muted">Question {currentQ + 1} of {vivaQuestions.length}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="relative w-12 h-12">
              <svg className="w-12 h-12 -rotate-90">
                <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
                <motion.circle cx="24" cy="24" r="20" fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round"
                  strokeDasharray={130} initial={{ strokeDashoffset: 130 }} animate={{ strokeDashoffset: 130 - (confidence / 100) * 130 }}
                  transition={{ duration: 1 }} />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-mono font-bold text-white">{confidence}%</span>
            </div>
            <p className="text-[9px] text-text-muted mt-1 font-mono">Confidence</p>
          </div>
          <div className="glass-card-sm px-3 py-1.5 rounded-full border-white/10">
            <span className="text-xs text-emerald-400 font-mono">● Recording</span>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="flex gap-2">
        {vivaQuestions.map((_, i) => (
          <div key={i} className="flex-1 h-1 rounded-full overflow-hidden bg-white/10">
            <motion.div className="h-full rounded-full" style={{ background: i <= currentQ ? "#ffffff" : "transparent" }}
              initial={{ width: 0 }} animate={{ width: i <= currentQ ? "100%" : "0%" }} transition={{ duration: 0.5 }} />
          </div>
        ))}
      </div>

      {/* Question Card */}
      <motion.div key={currentQ} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-8 relative overflow-hidden border-white/[0.08]">
        <div className="flex items-center gap-3 mb-6">
          <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold ${
            q.difficulty === "Easy" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
            q.difficulty === "Medium" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" :
            "bg-rose-500/10 text-rose-400 border border-rose-500/20"
          }`}>{q.difficulty}</span>
          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-white/10 text-white font-mono">{q.topic}</span>
        </div>
        <div className="flex items-start gap-4 mb-6">
          <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-white shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/></svg>
          </div>
          <p className="text-base font-medium leading-relaxed text-white">{q.q}</p>
        </div>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer here..."
          className="w-full h-32 bg-white/[0.03] border border-white/10 rounded-xl p-4 text-xs text-white placeholder:text-text-muted outline-none focus:border-white/20 resize-none"
        />
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <button className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-text-secondary hover:text-white transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg>
            </button>
            <span className="text-[10px] text-text-muted font-mono">Voice answer</span>
          </div>
          <button
            onClick={() => { setCurrentQ(Math.min(currentQ + 1, vivaQuestions.length - 1)); setAnswer(""); setConfidence(Math.min(confidence + 5, 100)); }}
            className="px-5 py-2.5 rounded-lg bg-white text-black text-xs font-semibold hover:bg-gray-100 transition-all shadow-sm"
          >
            {currentQ < vivaQuestions.length - 1 ? "Next Question →" : "Finish Viva"}
          </button>
        </div>
      </motion.div>


      {/* Live Analysis */}
      <div className="grid grid-cols-3 gap-4">
        {[{ l: "Response Quality", v: "Good", c: "#10b981" }, { l: "Depth Score", v: "7/10", c: "#4f8fff" }, { l: "Hesitation", v: "Low", c: "#8b5cf6" }].map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }}
            className="glass-card-sm p-3 text-center">
            <p className="text-sm font-bold" style={{ color: m.c }}>{m.v}</p>
            <p className="text-[10px] text-text-muted">{m.l}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
