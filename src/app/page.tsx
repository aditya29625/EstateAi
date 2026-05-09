"use client";

import { motion } from "framer-motion";
import { Search, MapPin, Sparkles, TrendingUp, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="relative pt-32 pb-20 overflow-hidden">
      <div className="hero-glow" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-purple-400 mb-6"
          >
            <Sparkles className="w-3 h-3" />
            <span>Next-Generation Real Estate Intelligence</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-6xl md:text-8xl font-outfit font-bold tracking-tighter leading-tight mb-8"
          >
            Find Your Future Home <br />
            <span className="text-gradient">With AI Precision</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground mb-12 max-w-2xl"
          >
            EstateAI combines advanced machine learning with the power of headless WordPress to provide the most accurate property matches and price predictions in the market.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full max-w-3xl glass-morphism p-2 rounded-2xl flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4"
          >
            <div className="flex-1 flex items-center px-4 space-x-3 w-full">
              <Search className="text-muted-foreground w-5 h-5" />
              <input 
                type="text" 
                id="search-input"
                placeholder="Search by location, property type, or amenities..." 
                className="bg-transparent border-none focus:ring-0 text-white w-full py-4"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    window.location.href = `/search?q=${(e.target as HTMLInputElement).value}`;
                  }
                }}
              />
            </div>
            <div className="h-10 w-[1px] bg-white/10 hidden md:block" />
            <div className="flex items-center px-4 space-x-3 w-full md:w-auto">
              <MapPin className="text-muted-foreground w-5 h-5" />
              <select className="bg-transparent border-none focus:ring-0 text-white py-4 pr-10 appearance-none">
                <option>New York, NY</option>
                <option>Los Angeles, CA</option>
                <option>Miami, FL</option>
              </select>
            </div>
            <button 
              onClick={() => {
                const query = (document.getElementById('search-input') as HTMLInputElement).value;
                window.location.href = `/search?q=${query}`;
              }}
              className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg shadow-purple-500/20"
            >
              Search Now
            </button>
          </motion.div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {[
              { icon: TrendingUp, title: "Price Prediction", desc: "AI-driven market value estimation" },
              { icon: ShieldCheck, title: "Verified Listings", desc: "Blockchain-inspired property validation" },
              { icon: Sparkles, title: "Smart Matches", desc: "Personality-based home recommendations" }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                className="glass-morphism p-6 rounded-2xl text-left hover:border-purple-500/50 transition-colors group"
              >
                <feature.icon className="w-10 h-10 text-purple-500 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
