"use client";

import { motion } from "framer-motion";
import { 
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar 
} from "recharts";
import { TrendingUp, Users, Home, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react";

const DATA = [
  { name: "Jan", views: 4000, inquiries: 2400 },
  { name: "Feb", views: 3000, inquiries: 1398 },
  { name: "Mar", views: 2000, inquiries: 9800 },
  { name: "Apr", views: 2780, inquiries: 3908 },
  { name: "May", views: 1890, inquiries: 4800 },
  { name: "Jun", views: 2390, inquiries: 3800 },
];

const PROPERTY_STATS = [
  { name: "Luxury Villa", sales: 12 },
  { name: "Penthouse", sales: 8 },
  { name: "Mansion", sales: 15 },
  { name: "Apartment", sales: 25 },
];

export default function AnalyticsPage() {
  return (
    <div className="pt-32 pb-20 container mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-start mb-12">
        <div>
          <h1 className="text-4xl font-outfit font-bold mb-4">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Monitor platform performance and AI-driven market insights.</p>
        </div>
        <button className="mt-4 md:mt-0 px-6 py-3 rounded-xl bg-purple-600 font-bold hover:bg-purple-700 transition-all flex items-center space-x-2">
          <span>Export Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { label: "Total Revenue", value: "$12.4M", trend: "+14.2%", up: true, icon: DollarSign },
          { label: "Active Listings", value: "1,284", trend: "+5.1%", up: true, icon: Home },
          { label: "User Inquiries", value: "8,432", trend: "-2.4%", up: false, icon: Users },
          { label: "Conversion Rate", value: "4.8%", trend: "+1.2%", up: true, icon: TrendingUp },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-morphism p-6 rounded-2xl"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <stat.icon className="w-5 h-5 text-purple-400" />
              </div>
              <div className={`flex items-center text-xs font-bold ${stat.up ? "text-green-500" : "text-red-500"}`}>
                {stat.trend}
                {stat.up ? <ArrowUpRight className="w-3 h-3 ml-1" /> : <ArrowDownRight className="w-3 h-3 ml-1" />}
              </div>
            </div>
            <h3 className="text-muted-foreground text-sm font-medium mb-1">{stat.label}</h3>
            <p className="text-3xl font-outfit font-bold">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-morphism p-8 rounded-3xl"
        >
          <h2 className="text-xl font-bold mb-8">Traffic & Engagement</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={DATA}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#1e1b4b", border: "none", borderRadius: "12px", color: "#fff" }}
                  itemStyle={{ color: "#fff" }}
                />
                <Area type="monotone" dataKey="views" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorViews)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-morphism p-8 rounded-3xl"
        >
          <h2 className="text-xl font-bold mb-8">Property Type Distribution</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={PROPERTY_STATS}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#1e1b4b", border: "none", borderRadius: "12px", color: "#fff" }}
                  cursor={{ fill: '#ffffff05' }}
                />
                <Bar dataKey="sales" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
