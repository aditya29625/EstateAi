"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles, BrainCircuit } from "lucide-react";

export default function ChatbotPage() {
  const [messages, setMessages] = useState([
    { id: 1, role: "bot", content: "Hello! I'm EstateAI, your personal real estate assistant. How can I help you find your dream home today?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = { id: Date.now(), role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        body: JSON.stringify({ message: input, history: messages }),
      });
      const data = await response.json();
      
      const botMsg = { 
        id: Date.now() + 1, 
        role: "bot", 
        content: data.response || "I'm sorry, I couldn't process that." 
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error("Chat Error:", error);
    }
  };

  return (
    <div className="pt-32 pb-20 container mx-auto px-6 max-w-4xl">
      <div className="glass-morphism rounded-3xl overflow-hidden flex flex-col h-[70vh]">
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-purple-600/20">
              <BrainCircuit className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h2 className="font-bold text-lg">AI Property Assistant</h2>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Online & Processing</span>
              </div>
            </div>
          </div>
          <Sparkles className="text-purple-400 w-5 h-5" />
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex items-start space-x-3 max-w-[80%] ${msg.role === "user" ? "flex-row-reverse space-x-reverse" : ""}`}>
                  <div className={`p-2 rounded-lg ${msg.role === "user" ? "bg-purple-600" : "bg-white/10"}`}>
                    {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`p-4 rounded-2xl ${msg.role === "user" ? "bg-purple-600 text-white rounded-tr-none" : "glass-morphism rounded-tl-none"}`}>
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="p-6 border-t border-white/10 bg-white/5">
          <div className="relative">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything about properties, mortgages, or market trends..."
              className="w-full bg-black/50 border border-white/10 rounded-xl py-4 pl-6 pr-14 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
            />
            <button 
              onClick={handleSend}
              className="absolute right-2 top-2 p-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
          <div className="mt-3 flex space-x-2">
            {["Budget advice", "Best areas", "ROI Calculator"].map((suggestion) => (
              <button 
                key={suggestion}
                className="text-[10px] font-bold text-muted-foreground border border-white/10 px-2 py-1 rounded-md hover:bg-white/5 transition-colors"
                onClick={() => setInput(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
