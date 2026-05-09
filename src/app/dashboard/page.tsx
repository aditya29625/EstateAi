"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Image as ImageIcon, LayoutDashboard, Building2, MessageCircle, BarChart, Settings, LogOut, Sparkles } from "lucide-react";

export default function AgentDashboard() {
  const [activeTab, setActiveTab] = useState("listings");
  const [showUpload, setShowUpload] = useState(false);
  const [description, setDescription] = useState("");

  return (
    <div className="pt-24 min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <div className="w-64 border-r border-white/10 p-6 hidden lg:flex flex-col space-y-8">
        <div className="flex items-center space-x-2 px-2">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <Building2 className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl">AgentHub</span>
        </div>

        <nav className="flex-1 space-y-2">
          {[
            { id: "listings", label: "My Listings", icon: LayoutDashboard },
            { id: "inquiries", label: "Inquiries", icon: MessageCircle },
            { id: "performance", label: "Performance", icon: BarChart },
            { id: "settings", label: "Settings", icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id ? "bg-purple-600 text-white" : "text-muted-foreground hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <button className="flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-xl transition-all">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-outfit font-bold">Welcome back, Agent Smith</h1>
            <p className="text-muted-foreground">Manage your properties and review AI performance scores.</p>
          </div>
          <button 
            onClick={() => setShowUpload(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-bold flex items-center space-x-2 shadow-lg shadow-purple-500/20"
          >
            <Plus className="w-5 h-5" />
            <span>New Property</span>
          </button>
        </div>

        {activeTab === "listings" && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-morphism rounded-2xl overflow-hidden group border-white/5">
                <div className="relative h-48">
                  <img 
                    src={`https://images.unsplash.com/photo-1600${585154340 + i}-be6161a56a0c?auto=format&fit=crop&q=80&w=800`} 
                    className="w-full h-full object-cover" 
                    alt="Property" 
                  />
                  <div className="absolute top-3 left-3 px-2 py-1 bg-green-500/90 rounded text-[10px] font-bold">ACTIVE</div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold mb-1">Luxury Villa {i}</h3>
                  <p className="text-sm text-muted-foreground mb-4">New York, NY</p>
                  <div className="flex justify-between items-center pt-4 border-t border-white/5">
                    <div className="flex items-center space-x-1 text-purple-400">
                      <Sparkles className="w-3 h-3" />
                      <span className="text-xs font-bold">AI Score: 9{i}</span>
                    </div>
                    <button className="text-xs font-bold text-white hover:text-purple-400">Edit Details</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Modal Overlay */}
      {showUpload && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#121212] border border-white/10 rounded-3xl w-full max-w-2xl p-8 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold font-outfit">Create New Listing</h2>
              <button onClick={() => setShowUpload(false)} className="text-muted-foreground hover:text-white">✕</button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase">Property Title</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-purple-500" placeholder="e.g. Modern Sunset Villa" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase">Price ($)</label>
                  <input type="number" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-purple-500" placeholder="0.00" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase">Description</label>
                <div className="relative">
                  <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-purple-500 h-32" 
                    placeholder="Describe the property..." 
                  />
                  <button 
                    onClick={async () => {
                      if (!description) return;
                      const res = await fetch("/api/ai/enhance", {
                        method: "POST",
                        body: JSON.stringify({ description }),
                      });
                      const data = await res.json();
                      if (data.enhanced) setDescription(data.enhanced);
                    }}
                    className="absolute bottom-3 right-3 flex items-center space-x-1 text-[10px] font-bold text-purple-400 bg-purple-400/10 px-2 py-1 rounded border border-purple-400/20 hover:bg-purple-400/20 transition-colors"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>AI IMPROVE</span>
                  </button>
                </div>
              </div>

              <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 text-center flex flex-col items-center justify-center space-y-3 hover:border-purple-500/50 transition-colors cursor-pointer">
                <ImageIcon className="w-10 h-10 text-muted-foreground" />
                <span className="text-sm font-medium">Click to upload property images</span>
                <span className="text-xs text-muted-foreground">Max file size 5MB. Support: JPG, PNG, WEBP</span>
              </div>

              <button className="w-full bg-purple-600 hover:bg-purple-700 py-4 rounded-xl font-bold transition-all shadow-lg shadow-purple-500/20">
                Publish Listing
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
