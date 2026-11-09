import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { DestinationCard } from './DestinationCard';
import { LocationArea, DestinationCategory, Destination } from '../types';
import { Search, SlidersHorizontal, ArrowUpDown, X, Compass, Filter } from 'lucide-react';

interface ExploreViewProps {
  initialLocation?: LocationArea;
  initialSearch?: string;
  onClearInitial?: () => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  initialLocation = 'All',
  initialSearch = '',
  onClearInitial
}) => {
  const { destinations, setSelectedDestination } = useApp();

  const [search, setSearch] = useState(initialSearch);
  const [selectedLocation, setSelectedLocation] = useState<LocationArea>(initialLocation);
  const [selectedCategory, setSelectedCategory] = useState<DestinationCategory>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const locations: LocationArea[] = ['All', 'Mombasa', 'Diani', 'Watamu', 'Lamu', 'Malindi', 'Wasini Island'];
  const categories: DestinationCategory[] = [
    'All',
    'Heritage & Culture',
    'Beach & Watersports',
    'Marine Safari',
    'Culinary & Dining',
    'Eco-Tours & Nature'
  ];

  const filteredDestinations = useMemo(() => {
    return destinations.filter(dest => {
      const matchLoc = selectedLocation === 'All' || dest.location === selectedLocation;
      const matchCat = selectedCategory === 'All' || dest.category === selectedCategory;
      const q = search.trim().toLowerCase();
      const matchSearch = !q || 
        dest.name.toLowerCase().includes(q) ||
        dest.location.toLowerCase().includes(q) ||
        dest.description.toLowerCase().includes(q) ||
        dest.owner.toLowerCase().includes(q) ||
        dest.highlights.some(h => h.toLowerCase().includes(q));

      return matchLoc && matchCat && matchSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [destinations, selectedLocation, selectedCategory, search, sortBy]);

  const handleResetFilters = () => {
    setSearch('');
    setSelectedLocation('All');
    setSelectedCategory('All');
    setSortBy('featured');
    if (onClearInitial) onClearInitial();
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 space-y-8 animate-fade-in">
      
      {/* Title & Introduction */}
      <div>
        <div className="text-xs font-bold text-[#16834A] uppercase tracking-wider mb-1">
          Explore Kenya's Coastline
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#103C2A] tracking-tight">
          Destinations & Curated Experiences
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-stone-500 max-w-2xl">
          Discover traditional Swahili sailing, coral gardens, UNESCO world heritage walks, and coastal safari day trips.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl border border-stone-200/90 p-4 sm:p-5 shadow-xs space-y-4">
        
        {/* Row 1: Search & Sort */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search experiences, dhows, locations, guides..."
              className="w-full pl-10 pr-9 py-2 border border-stone-200 rounded-xl text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-[#16834A] bg-stone-50/50"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            <span className="text-xs text-stone-500 font-medium whitespace-nowrap">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 bg-white focus:outline-none focus:ring-1 focus:ring-[#16834A]"
            >
              <option value="featured">Recommended</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Row 2: Location Segmented Filter (Button Tabs) */}
        <div>
          <div className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-2">
            Location
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {locations.map((loc) => (
              <button
                key={loc}
                onClick={() => setSelectedLocation(loc)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  selectedLocation === loc
                    ? 'bg-[#103C2A] text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200/70 hover:text-stone-900'
                }`}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>

        {/* Row 3: Category Filter */}
        <div>
          <div className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-2">
            Experience Category
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#16834A] text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200/70 hover:text-stone-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-stone-500">
        <div>
          Showing <strong className="text-stone-900 tabular-nums">{filteredDestinations.length}</strong> {filteredDestinations.length === 1 ? 'experience' : 'experiences'}
          {selectedLocation !== 'All' && <span> in <strong>{selectedLocation}</strong></span>}
          {selectedCategory !== 'All' && <span> under <strong>{selectedCategory}</strong></span>}
        </div>

        {(selectedLocation !== 'All' || selectedCategory !== 'All' || search) && (
          <button
            onClick={handleResetFilters}
            className="text-[#16834A] hover:underline font-semibold cursor-pointer"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Grid of Destination Cards */}
      {filteredDestinations.length === 0 ? (
        <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center shadow-xs space-y-4">
          <div className="w-14 h-14 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-400">
            <Compass className="w-7 h-7" />
          </div>
          <h2 className="text-lg font-bold text-stone-900">No Experiences Found</h2>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Try adjusting your search keywords or switching location filters.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-5 py-2 bg-[#16834A] text-white text-xs font-bold rounded-xl hover:bg-[#126b3c] transition-all cursor-pointer"
          >
            Show All Destinations
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDestinations.map(d => (
            <DestinationCard
              key={d.id}
              destination={d}
              onSelect={(dest) => setSelectedDestination(dest)}
            />
          ))}
        </div>
      )}

    </div>
  );
};
