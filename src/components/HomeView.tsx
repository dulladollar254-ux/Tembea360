import React from 'react';
import { useApp } from '../context/AppContext';
import { HeroSection } from './HeroSection';
import { DestinationCard } from './DestinationCard';
import { ArrowRight, Compass, ShieldCheck, HeartHandshake, Sparkles, Building2 } from 'lucide-react';
import { LocationArea } from '../types';

interface HomeViewProps {
  onSearch: (query: string) => void;
  onSelectLocation: (loc: LocationArea) => void;
  onOpenBusinessSignup: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSearch,
  onSelectLocation,
  onOpenBusinessSignup
}) => {
  const { destinations, setActivePage, setSelectedDestination } = useApp();

  const featured = destinations.slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 pb-12 animate-fade-in">
      
      {/* Hero Section */}
      <HeroSection
        onSearch={onSearch}
        onSelectLocation={onSelectLocation}
        onOpenBusinessSignup={onOpenBusinessSignup}
      />

      {/* Featured Destinations */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-[#16834A] uppercase tracking-wider mb-1">
              Handpicked Coastal Experiences
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#103C2A] tracking-tight">
              Popular Along Kenya's Coast
            </h2>
            <p className="mt-1 text-xs text-stone-500">
              Start exploring Mombasa, Diani, Watamu, and Lamu with certified local hosts.
            </p>
          </div>

          <button
            onClick={() => setActivePage('explore')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#16834A] hover:text-[#103C2A] transition-colors cursor-pointer group whitespace-nowrap"
          >
            <span>View all destinations</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map(d => (
            <DestinationCard
              key={d.id}
              destination={d}
              onSelect={(dest) => setSelectedDestination(dest)}
            />
          ))}
        </div>
      </section>

      {/* Tourism Business CTA Panel */}
      <section className="bg-gradient-to-br from-[#103C2A] to-[#16834A] rounded-3xl p-8 sm:p-12 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-[#A3E6B8]">
            <Building2 className="w-6 h-6" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Are you a coastal tourism business?
          </h2>

          <p className="text-sm text-stone-200 leading-relaxed">
            Register your business profile to publish dhow excursions, walking tours, coral reef diving, or Swahili culinary classes. Receive direct traveler inquiries with zero middleman commissions.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenBusinessSignup}
              className="bg-white hover:bg-stone-100 text-[#103C2A] px-6 py-3 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer whitespace-nowrap active:scale-95"
            >
              Register Your Business Account
            </button>
            <button
              onClick={() => setActivePage('business')}
              className="bg-white/15 hover:bg-white/25 text-white px-5 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap"
            >
              Open Business Dashboard
            </button>
          </div>
        </div>
      </section>

      {/* Cultural Swahili Coastal Notes & Trust */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-stone-200/90 p-6 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-[#16834A]">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-stone-900">Tembea Kenya Ethos</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            "Tembea" means to walk, explore, and journey. We believe the best travels come from walking side-by-side with indigenous guides.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200/90 p-6 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-[#16834A]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-stone-900">Verified Marine & Land Hosts</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Every captain and guide adheres to KWS marine safety regulations, ethical dolphin viewing, and coral conservation.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200/90 p-6 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-[#16834A]">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-stone-900">Direct Local Empowerment</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            100% of your booking fee goes directly to local families, boatbuilders, and community tourism associations in the Coast region.
          </p>
        </div>
      </section>

    </div>
  );
};
