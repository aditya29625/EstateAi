"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Bed, Bath, Square, MapPin, Sparkles, Phone, Mail, Calendar, Calculator } from "lucide-react";

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
    aiScore: 98,
    description: "Experience luxury living at its finest in this breathtaking penthouse overlooking the Manhattan skyline. Featuring floor-to-ceiling windows, a private elevator, and state-of-the-art smart home integration.",
    agent: { name: "Sarah Johnson", email: "sarah@estateai.com", phone: "+1 (555) 123-4567" }
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
    aiScore: 92,
    description: "A modern architectural masterpiece situated on the shores of Lake Tahoe. This glass-walled villa offers unparalleled views and seamless indoor-outdoor living.",
    agent: { name: "Michael Chen", email: "michael@estateai.com", phone: "+1 (555) 987-6543" }
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
    aiScore: 95,
    description: "Nestled deep within the Aspen forest, this modernist retreat combines raw concrete aesthetics with warm wood finishes. Perfect for those seeking privacy and inspiration.",
    agent: { name: "Emily White", email: "emily@estateai.com", phone: "+1 (555) 444-5555" }
  }
];

export default function PropertyDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const propertyId = parseInt(params.id as string);
  const property = MOCK_PROPERTIES.find(p => p.id === propertyId);

  if (!property) return <div className="pt-32 text-center">Property not found.</div>;

  return (
    <div className="pt-32 pb-20 container mx-auto px-6">
      <button 
        onClick={() => router.back()}
        className="flex items-center space-x-2 text-muted-foreground hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to listings</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left: Content */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl"
          >
            <img src={property.image} className="w-full h-full object-cover" alt={property.title} />
            <div className="absolute top-6 left-6 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="font-bold text-white uppercase text-xs tracking-widest">AI Recommendation Match {property.aiScore}%</span>
            </div>
          </motion.div>

          <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <h1 className="text-4xl font-outfit font-bold">{property.title}</h1>
              <span className="text-3xl font-bold text-purple-400 mt-2 md:mt-0">{property.price}</span>
            </div>
            
            <div className="flex items-center text-muted-foreground mb-8">
              <MapPin className="w-5 h-5 mr-2" />
              {property.location}
            </div>

            <div className="grid grid-cols-3 gap-8 p-8 glass-morphism rounded-3xl mb-12">
              <div className="flex flex-col items-center">
                <Bed className="w-6 h-6 text-purple-400 mb-2" />
                <span className="font-bold">{property.beds} Bedrooms</span>
              </div>
              <div className="flex flex-col items-center border-x border-white/10">
                <Bath className="w-6 h-6 text-purple-400 mb-2" />
                <span className="font-bold">{property.baths} Bathrooms</span>
              </div>
              <div className="flex flex-col items-center">
                <Square className="w-6 h-6 text-purple-400 mb-2" />
                <span className="font-bold">{property.sqft} Sq.Ft.</span>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold font-outfit">Description</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {property.description}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Sidebar */}
        <div className="space-y-8">
          <div className="glass-morphism p-8 rounded-3xl sticky top-32 border-purple-500/20">
            <div className="flex items-center space-x-4 mb-8 pb-8 border-b border-white/10">
              <div className="w-16 h-16 rounded-full bg-purple-600/20 flex items-center justify-center">
                <span className="text-xl font-bold">{property.agent.name[0]}</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">{property.agent.name}</h3>
                <p className="text-sm text-muted-foreground uppercase font-bold tracking-tighter">Verified Agent</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3 text-muted-foreground hover:text-white transition-colors cursor-pointer">
                <Phone className="w-4 h-4" />
                <span>{property.agent.phone}</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground hover:text-white transition-colors cursor-pointer">
                <Mail className="w-4 h-4" />
                <span>{property.agent.email}</span>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-700 font-bold transition-all shadow-lg shadow-purple-500/20">
                Schedule a Visit
              </button>
              <button className="w-full py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 font-bold transition-all">
                Send Inquiry
              </button>
            </div>

            {/* Mortgage Calculator */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <h3 className="font-bold mb-4 flex items-center space-x-2">
                <Calculator className="w-4 h-4 text-purple-400" />
                <span>Mortgage Calculator</span>
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-muted-foreground uppercase mb-1 block">Down Payment (%)</label>
                  <input type="range" min="5" max="50" className="w-full h-1 bg-purple-600/20 rounded-lg appearance-none cursor-pointer accent-purple-500" />
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Estimated Monthly:</span>
                  <span className="font-bold text-white">$14,250/mo</span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-center space-x-2 text-[10px] font-bold text-purple-400">
              <Calendar className="w-3 h-3" />
              <span>ESTIMATED ROI: 6.8% YEARLY</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
