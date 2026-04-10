"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const chatHistory = [
  { role: "ai", text: "Welcome back! I noticed you spent some time reviewing Graph Traversals yesterday. Are you ready to tackle the related assignment, or do you need a quick concept refresh?", time: "09:00 AM" },
  { role: "user", text: "I'm a bit stuck on the difference between BFS and DFS implementation.", time: "09:02 AM" },
  { role: "ai", text: "Great question! \n\nThe core difference lies in the data structure used to track the next nodes to visit:\n\n• **BFS uses a Queue** (FIFO). It visits all neighbors of a node before going deeper.\n• **DFS uses a Stack** (LIFO, or recursion which implicitly uses the call stack). It goes as deep as possible down one path before backtracking.\n\nShould we write out a quick pseudo-code comparison?", time: "09:02 AM" },
];

export default function MentorPage() {
  const [input, setInput] = useState("");

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex h-[calc(100vh-6rem)] gap-6 max-w-[1400px]">
      
      {/* Main Chat Area */}
      <div className="flex-1 glass-card flex flex-col overflow-hidden relative border-white/[0.08]">
        
        {/* Chat Header */}
        <div className="p-4 border-b border-white/[0.06] flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-white">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/></svg>
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Athena - AI Academic Mentor</h2>
              <p className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Active Context
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 rounded-lg bg-white/5 text-xs font-mono text-text-secondary hover:text-white transition-colors border border-white/10">
              Clear Context
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {chatHistory.map((msg, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: i * 0.1 }}
              className={`flex gap-4 max-w-[85%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : ""}`}
            >
              <div className="shrink-0 mt-1">
                {msg.role === "ai" ? (
                  <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center text-white border border-white/10">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/></svg>
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-xs text-white border border-white/15 font-mono font-bold">U</div>
                )}
              </div>

              <div className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
                <div className={`p-4 rounded-xl whitespace-pre-wrap text-xs leading-relaxed shadow-sm ${
                  msg.role === "user" 
                    ? "bg-white text-black font-medium rounded-tr-none" 
                    : "glass-card-sm border-white/[0.06] rounded-tl-none text-text-secondary"
                }`}>
                  {msg.text}
                </div>
                <span className="text-[10px] text-text-muted mt-1 px-1 font-mono">{msg.time}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="p-4 bg-white/[0.02] border-t border-white/[0.06]">
          <div className="relative flex items-center">
            <button className="absolute left-3 text-text-muted hover:text-white transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
            </button>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Athena to explain a concept, debug your code, or review a past lab..." 
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-10 pr-12 py-3 text-xs text-white placeholder:text-text-muted outline-none focus:border-white/20 transition-all"
            />
            <button className="absolute right-2 p-2 rounded-lg bg-white text-black hover:bg-gray-100 transition-all shadow-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </div>
        </div>
      </div>


      {/* Right Sidebar - Behavioral Context */}
      <div className="w-80 hidden xl:flex flex-col gap-4">
        <div className="glass-card p-5">
          <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse"/> Active Context
          </h3>
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-bg-hover border border-border-default">
              <p className="text-[10px] text-text-muted mb-1">Current Focus Topic</p>
              <p className="text-xs font-medium text-accent-cyan">Graph Theory & Traversals</p>
            </div>
            <div className="p-3 rounded-lg bg-bg-hover border border-border-default">
              <p className="text-[10px] text-text-muted mb-1">Detected Emotion/State</p>
              <p className="text-xs font-medium text-text-primary flex items-center gap-1">🤔 Slightly Confused (Code Pauses)</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-5 flex-1">
          <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-4">Suggested Actions</h3>
          <div className="space-y-2">
            {[
              "Generate visual tree trace",
              "Review yesterday's mistake",
              "Give me a related mini-quiz",
              "Explain like I'm 5"
            ].map((action, i) => (
              <button key={i} className="w-full text-left p-3 rounded-lg bg-bg-hover border border-border-default hover:border-accent-blue/40 hover:bg-accent-blue/5 transition-colors text-xs text-text-secondary hover:text-accent-blue">
                → {action}
              </button>
            ))}
          </div>
        </div>
      </div>

    </motion.div>
  );
}
