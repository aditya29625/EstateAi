"use client";

import Link from "next/link";
import { Home, Search, BrainCircuit, BarChart3, MessageSquare, User, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useAuthStore } from "@/store/authStore";

const Navbar = () => {
  const { favorites, isAuthenticated, logout, user } = useAuthStore();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-morphism px-8 py-3 rounded-full flex items-center space-x-8"
      >
        <Link href="/" className="flex items-center space-x-2">
          <BrainCircuit className="w-6 h-6 text-purple-500" />
          <span className="font-outfit font-bold text-xl tracking-tight">EstateAI</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-muted-foreground">
          <Link href="/properties" className="hover:text-white transition-colors flex items-center space-x-1">
            <Search className="w-4 h-4" />
            <span>Search</span>
          </Link>
          <Link href="/analytics" className="hover:text-white transition-colors flex items-center space-x-1">
            <BarChart3 className="w-4 h-4" />
            <span>Analytics</span>
          </Link>
          <Link href="/chatbot" className="hover:text-white transition-colors flex items-center space-x-1">
            <MessageSquare className="w-4 h-4" />
            <span>AI Assistant</span>
          </Link>
        </div>

        <div className="flex items-center space-x-4 border-l border-white/10 pl-6">
          <Link href="/saved" className="relative p-2 rounded-full hover:bg-white/5 transition-colors">
            <Heart className={`w-5 h-5 ${favorites.length > 0 ? "text-red-500 fill-red-500" : "text-muted-foreground"}`} />
            {favorites.length > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-purple-500 rounded-full border border-black text-[10px] flex items-center justify-center font-bold">
                {favorites.length}
              </span>
            )}
          </Link>
          
          {isAuthenticated ? (
            <div className="flex items-center space-x-2">
              <Link href="/dashboard" className="p-2 rounded-full bg-purple-600/20 hover:bg-purple-600/40 transition-colors">
                <User className="w-5 h-5 text-purple-400" />
              </Link>
              <button 
                onClick={() => logout()}
                className="text-[10px] font-bold text-muted-foreground uppercase hover:text-white transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login">
              <button className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-4 py-2 rounded-full transition-all">
                Login
              </button>
            </Link>
          )}
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
