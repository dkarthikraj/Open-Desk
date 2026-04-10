"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

function SetupBanner() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 mb-6 border border-amber-500/20">
      <div className="flex items-start gap-3">
        <span className="text-2xl">⚠️</span>
        <div>
          <h3 className="text-sm font-semibold text-amber-400 mb-1">Supabase Not Connected</h3>
          <p className="text-xs text-text-secondary leading-relaxed">
            The authentication backend isn&apos;t configured yet. To enable login & signup:
          </p>
          <ol className="text-xs text-text-muted mt-2 space-y-1 list-decimal list-inside">
            <li>Create a project at <span className="text-accent-blue">supabase.com</span></li>
            <li>Run <code className="text-accent-purple bg-bg-hover px-1.5 py-0.5 rounded">supabase/schema.sql</code> in the SQL Editor</li>
            <li>Copy your URL & anon key to <code className="text-accent-purple bg-bg-hover px-1.5 py-0.5 rounded">.env.local</code></li>
            <li>Restart the dev server</li>
          </ol>
        </div>
      </div>
    </motion.div>
  );
}

export default function SignUpPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const configured = isSupabaseConfigured();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!configured) {
      setError("Supabase is not configured. Please add your credentials to .env.local");
      return;
    }

    setLoading(true);
    const supabase = createClient()!;

    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, role },
      },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-bg-primary neural-grid flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-8 max-w-md text-center">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-xl font-bold gradient-text mb-2">Account Created!</h2>
          <p className="text-sm text-text-secondary mb-6">Check your email for a confirmation link to access the platform.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary neural-grid flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center mx-auto mb-4 text-white font-mono font-bold text-sm">
            OD
          </div>
          <h1 className="text-2xl font-extrabold text-white">Create Account</h1>
          <p className="text-xs text-text-muted mt-1">Join the OpenDesk platform</p>
        </div>

        {!configured && <SetupBanner />}

        <form onSubmit={handleSignUp} className="glass-card p-8 space-y-5 border-white/[0.08]">
          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">{error}</div>
          )}

          <div>
            <label className="text-xs text-text-secondary font-medium mb-1.5 block">Full Name</label>
            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Your full name" required
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder:text-text-muted outline-none focus:border-white/20 transition-colors" />
          </div>

          <div>
            <label className="text-xs text-text-secondary font-medium mb-1.5 block">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@institution.edu" required
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder:text-text-muted outline-none focus:border-white/20 transition-colors" />
          </div>

          <div>
            <label className="text-xs text-text-secondary font-medium mb-1.5 block">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min 6 characters" required minLength={6}
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder:text-text-muted outline-none focus:border-white/20 transition-colors" />
          </div>

          <div>
            <label className="text-xs text-text-secondary font-medium mb-1.5 block">Role</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: "student", label: "Student" },
                { value: "faculty", label: "Faculty" },
                { value: "admin", label: "Admin" },
              ].map((r) => (
                <button key={r.value} type="button" onClick={() => setRole(r.value)}
                  className={`py-2.5 px-3 rounded-lg border text-center transition-all ${role === r.value ? "border-white/30 bg-white/10 text-white font-bold" : "border-white/10 text-text-muted hover:border-white/20"}`}>
                  <span className="text-xs font-mono">{r.label}</span>
                </button>
              ))}
            </div>
          </div>


          <button type="submit" disabled={loading}
            className="w-full py-3 rounded-lg bg-white text-black font-semibold text-xs hover:bg-gray-100 transition-all shadow-sm disabled:opacity-50">
            {loading ? "Creating Account..." : "Create Account"}
          </button>


          {/* Login link removed */}
        </form>
      </motion.div>
    </div>
  );
}
