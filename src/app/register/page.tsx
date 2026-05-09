"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { BrainCircuit, Mail, Lock, ArrowRight, User, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAuthStore();
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate Registration
    setTimeout(() => {
      setAuth({ 
        id: "2", 
        name: name, 
        email: email, 
        role: "buyer" 
      }, "mock-jwt-token");
      router.push("/properties");
    }, 1000);
  };

  return (
    <div className="min-h-screen pt-32 flex flex-col items-center justify-center px-6">
      <div className="hero-glow opacity-50" />
      
      <div className="w-full max-w-md glass-morphism p-8 rounded-3xl">
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 rounded-2xl bg-purple-600/20 mb-4">
            <ShieldCheck className="w-10 h-10 text-purple-400" />
          </div>
          <h1 className="text-3xl font-outfit font-bold">Create Account</h1>
          <p className="text-muted-foreground text-sm">Join the next-gen AI real estate platform</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                placeholder="John Doe"
              />
            </div>
          </div>

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
            <span>{loading ? "Creating Account..." : "Sign Up"}</span>
            {!loading && <ArrowRight className="w-5 h-5" />}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-white/10">
          <p className="text-center text-sm text-muted-foreground">
            Already have an account? <Link href="/login" className="text-purple-400 font-bold hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
