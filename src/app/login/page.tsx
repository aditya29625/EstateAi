"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { BrainCircuit, Mail, Lock, ArrowRight, Layout } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAuthStore();
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate Login
    setTimeout(() => {
      setAuth({ 
        id: "1", 
        name: "Agent Smith", 
        email: email, 
        role: "agent" 
      }, "mock-jwt-token");
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen pt-32 flex flex-col items-center justify-center px-6">
      <div className="hero-glow opacity-50" />
      
      <div className="w-full max-w-md glass-morphism p-8 rounded-3xl">
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 rounded-2xl bg-purple-600/20 mb-4">
            <BrainCircuit className="w-10 h-10 text-purple-400" />
          </div>
          <h1 className="text-3xl font-outfit font-bold">Welcome Back</h1>
          <p className="text-muted-foreground text-sm">Enter your credentials to access EstateAI</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                placeholder="name@company.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-purple-500/20 flex items-center justify-center space-x-2"
          >
            <span>{loading ? "Authenticating..." : "Sign In"}</span>
            {!loading && <ArrowRight className="w-5 h-5" />}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-white/10 space-y-4">
          <button className="w-full flex items-center justify-center space-x-3 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-all">
            <Layout className="w-5 h-5" />
            <span className="text-sm font-medium">Continue with GitHub</span>
          </button>
          
          <p className="text-center text-sm text-muted-foreground">
            Don't have an account? <Link href="/register" className="text-purple-400 font-bold hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
