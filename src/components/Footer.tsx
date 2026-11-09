import React from 'react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setActivePage } = useApp();

  return (
    <footer className="bg-[#103C2A] text-stone-300 py-12 border-t border-[#16834A]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <span className="text-2xl font-extrabold text-white tracking-tight">
              Tembea<span className="text-[#A3E6B8]">360</span>
            </span>
            <p className="text-xs text-stone-400 mt-1 max-w-sm">
              Discover more. Travel local. Experience Kenya's coastal heritage, dhow safaris, and marine reserves.
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs text-stone-300 flex-wrap">
            <button
              onClick={() => setActivePage('home')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => setActivePage('explore')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Destinations
            </button>
            <button
              onClick={() => setActivePage('business')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              For Tourism Businesses
            </button>
            <button
              onClick={() => setActivePage('bookings')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Itinerary & Bookings
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-400">
          <div>
            © {new Date().getFullYear()} Tembea360 Kenya. Karibu Pwani. All rights reserved.
          </div>
          <div className="text-[11px] text-stone-500">
            Mombasa · Diani · Watamu · Lamu · Wasini Island · Malindi
          </div>
        </div>

      </div>
    </footer>
  );
};
