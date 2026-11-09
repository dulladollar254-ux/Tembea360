import React from 'react';
import { useApp } from '../context/AppContext';
import { HERO_IMAGE } from '../data/initialData';
import { Search, MapPin, ArrowRight, Compass, Shield, Users } from 'lucide-react';
import { LocationArea } from '../types';

interface HeroSectionProps {
  onSearch: (query: string) => void;
  onSelectLocation: (loc: LocationArea) => void;
  onOpenBusinessSignup: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSearch,
  onSelectLocation,
  onOpenBusinessSignup
}) => {
  const { setActivePage } = useApp();
  const [query, setQuery] = React.useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
    setActivePage('explore');
  };

  const coastalHubs: LocationArea[] = ['Mombasa', 'Diani', 'Watamu', 'Lamu', 'Wasini Island'];

  return (
    <div className="relative overflow-hidden rounded-3xl my-6 bg-[#103C2A] text-white shadow-xl">
      {/* Background Image with Measured Contrast Scrim */}
      <div className="absolute inset-0 z-0">
        <img 
          src={HERO_IMAGE} 
          alt="Coastal Kenya Diani Beach Dhow" 
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        {/* Measured dark scrim for WCAG AA readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#103C2A]/95 via-[#103C2A]/85 to-[#103C2A]/40" />
      </div>

      <div className="relative z-10 max-w-5xl px-6 py-16 sm:px-12 sm:py-24">
        
        {/* Swahili kicker text */}
        <div className="text-xs font-semibold tracking-wider text-[#A3E6B8] uppercase mb-3">
          Karibu Pwani · Authentic Kenya Coast Travel
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] max-w-2xl text-balance">
          Discover Kenya, one journey at a time.
        </h1>

        <p className="mt-5 text-base sm:text-lg text-stone-200/90 max-w-xl leading-relaxed">
          Explore historic Swahili alleys, sail emerald dhow waters, and book directly with local coastal operators in Mombasa, Diani, Watamu, and Lamu.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="mt-8 max-w-xl">
          <div className="bg-white/95 backdrop-blur-md rounded-xl p-2 shadow-2xl flex flex-col sm:flex-row gap-2 border border-white/20">
            <div className="flex-1 flex items-center px-3 gap-2.5">
              <Search className="w-5 h-5 text-stone-400 shrink-0" />
              <input
                type="text"
                placeholder="Search dhow sailing, heritage walks, diving..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-stone-900 placeholder:text-stone-400 text-sm focus:outline-none py-2"
              />
            </div>
            <button
              type="submit"
              className="bg-[#16834A] hover:bg-[#126b3c] text-white px-6 py-3 rounded-lg text-sm font-semibold transition-all whitespace-nowrap shrink-0 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm active:scale-98"
            >
              Explore Now
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Fast Location Shortcuts */}
        <div className="mt-6 flex items-center gap-2 flex-wrap text-xs text-stone-200">
          <span className="text-stone-300 font-medium">Popular Coast Hubs:</span>
          {coastalHubs.map(hub => (
            <button
              key={hub}
              type="button"
              onClick={() => {
                onSelectLocation(hub);
                setActivePage('explore');
              }}
              className="hover:text-white transition-colors underline underline-offset-4 decoration-stone-400/60 hover:decoration-white font-medium cursor-pointer"
            >
              {hub}
            </button>
          ))}
        </div>

        {/* Adjacency Proof Strip */}
        <div className="mt-12 pt-8 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-[#A3E6B8] shrink-0" />
            <div>
              <div className="text-sm font-bold text-white">45+ Verified Guides</div>
              <div className="text-xs text-stone-300">Licensed KWS & local captains</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-[#A3E6B8] shrink-0" />
            <div>
              <div className="text-sm font-bold text-white">1,200+ Travelers</div>
              <div className="text-xs text-stone-300">Guided across Kenya's coast</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Compass className="w-5 h-5 text-[#A3E6B8] shrink-0" />
            <div>
              <div className="text-sm font-bold text-white">100% Direct Impact</div>
              <div className="text-xs text-stone-300">Earnings stay in coastal communities</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
