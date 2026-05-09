"use client";

import { useAuthStore } from "@/store/authStore";
import { motion } from "framer-motion";
import { Heart, Home, ArrowRight } from "lucide-react";
import Link from "next/link";

const MOCK_PROPERTIES = [
  {
    id: 1,
    title: "The Ethereal Penthouse",
    location: "Manhattan, NY",
    price: "$4,500,000",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    title: "Glass Lake Villa",
    location: "Lake Tahoe, CA",
    price: "$2,850,000",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: "Modernist Forest Retreat",
    location: "Aspen, CO",
    price: "$3,200,000",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&q=80&w=800",
  }
];

export default function SavedPropertiesPage() {
  const { favorites, toggleFavorite } = useAuthStore();
  const savedList = MOCK_PROPERTIES.filter(p => favorites.includes(p.id));

  return (
    <div className="pt-32 pb-20 container mx-auto px-6 min-h-screen">
      <div className="flex flex-col items-center text-center mb-16">
        <div className="p-3 rounded-2xl bg-red-500/10 mb-4">
          <Heart className="w-8 h-8 text-red-500" />
        </div>
        <h1 className="text-4xl font-outfit font-bold">Saved Properties</h1>
        <p className="text-muted-foreground mt-2">Your personal collection of future homes and investments.</p>
      </div>

      {savedList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {savedList.map((property) => (
            <motion.div
              key={property.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-morphism rounded-3xl overflow-hidden"
            >
              <div className="relative h-48">
                <img src={property.image} className="w-full h-full object-cover" alt={property.title} />
                <button 
                  onClick={() => toggleFavorite(property.id)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-red-500 text-white"
                >
                  <Heart className="w-4 h-4 fill-white" />
                </button>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-1">{property.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{property.location}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-purple-400">{property.price}</span>
                  <Link href={`/properties/${property.id}`} className="text-sm font-bold flex items-center space-x-1 hover:text-purple-400 transition-colors">
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-6 pt-20">
          <div className="p-8 rounded-full bg-white/5 border border-white/10">
            <Home className="w-12 h-12 text-muted-foreground opacity-20" />
          </div>
          <p className="text-muted-foreground text-lg italic">No saved properties yet.</p>
          <Link href="/properties">
            <button className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-purple-500/20">
              Browse Properties
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
