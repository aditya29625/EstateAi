"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bed, Bath, Square, MapPin, Heart, Sparkles } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";

const MOCK_PROPERTIES = [
  {
    id: 1,
    title: "The Ethereal Penthouse",
    location: "Manhattan, NY",
    price: "$4,500,000",
    beds: 4,
    baths: 3,
    sqft: 3200,
    type: "Penthouse",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
    aiScore: 98
  },
  {
    id: 2,
    title: "Glass Lake Villa",
    location: "Lake Tahoe, CA",
    price: "$2,850,000",
    beds: 3,
    baths: 2,
    sqft: 2400,
    type: "Villa",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
    aiScore: 92
  },
  {
    id: 3,
    title: "Modernist Forest Retreat",
    location: "Aspen, CO",
    price: "$3,200,000",
    beds: 5,
    baths: 4,
    sqft: 4100,
    type: "Mansion",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&q=80&w=800",
    aiScore: 95
  }
];

export default function PropertiesPage() {
  const [filter, setFilter] = useState("All");
  const { favorites, toggleFavorite } = useAuthStore();

  const filteredProperties = filter === "All" 
    ? MOCK_PROPERTIES 
    : MOCK_PROPERTIES.filter(p => p.type === filter);

  return (
    <div className="pt-32 pb-20 container mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-outfit font-bold mb-4">Discover Properties</h1>
          <p className="text-muted-foreground">Browse our curated collection of AI-vetted luxury real estate.</p>
        </div>
        
        <div className="flex space-x-2 mt-6 md:mt-0">
          {["All", "Penthouse", "Villa", "Mansion", "Apartment"].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === t ? "bg-purple-600 text-white" : "bg-white/5 text-muted-foreground hover:bg-white/10"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProperties.map((property, idx) => (
          <motion.div
            key={property.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="group glass-morphism rounded-3xl overflow-hidden hover:border-purple-500/30 transition-all cursor-pointer"
          >
            <div className="relative h-64 overflow-hidden">
              <img 
                src={property.image} 
                alt={property.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-yellow-400" />
                <span className="text-[10px] font-bold text-white">AI MATCH {property.aiScore}%</span>
              </div>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  toggleFavorite(property.id);
                }}
                className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-md border border-white/20 transition-all ${
                  favorites.includes(property.id) ? "bg-red-500 border-red-500" : "bg-black/50 hover:bg-white/10"
                }`}
              >
                <Heart className={`w-4 h-4 ${favorites.includes(property.id) ? "fill-white text-white" : "text-white"}`} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold font-outfit">{property.title}</h3>
                <span className="text-purple-400 font-bold">{property.price}</span>
              </div>
              
              <div className="flex items-center text-muted-foreground text-sm mb-6">
                <MapPin className="w-3 h-3 mr-1" />
                {property.location}
              </div>
              
              <div className="grid grid-cols-3 gap-4 py-4 border-t border-white/10">
                <div className="flex flex-col items-center">
                  <Bed className="w-4 h-4 text-muted-foreground mb-1" />
                  <span className="text-xs font-bold">{property.beds} Beds</span>
                </div>
                <div className="flex flex-col items-center border-x border-white/10">
                  <Bath className="w-4 h-4 text-muted-foreground mb-1" />
                  <span className="text-xs font-bold">{property.baths} Baths</span>
                </div>
                <div className="flex flex-col items-center">
                  <Square className="w-4 h-4 text-muted-foreground mb-1" />
                  <span className="text-xs font-bold">{property.sqft} Sqft</span>
                </div>
              </div>

              <Link href={`/properties/${property.id}`}>
                <button className="w-full mt-4 py-3 rounded-xl bg-white/5 group-hover:bg-purple-600 transition-all text-sm font-bold">
                  View Details
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
