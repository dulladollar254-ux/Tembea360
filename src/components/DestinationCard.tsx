import React, { useState } from 'react';
import { Destination } from '../types';
import { useApp } from '../context/AppContext';
import { Heart, Star, MapPin, Clock, Users, ArrowUpRight, Check } from 'lucide-react';

interface DestinationCardProps {
  destination: Destination;
  onSelect: (dest: Destination) => void;
  isBusinessOwnerView?: boolean;
  onDelete?: (id: string) => void;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  onSelect,
  isBusinessOwnerView,
  onDelete
}) => {
  const { addToCart, formatPrice, isSaved, toggleSaveDestination } = useApp();
  const [imageError, setImageError] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const saved = isSaved(destination.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(destination.id);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1400);
  };

  const handleToggleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSaveDestination(destination.id);
  };

  return (
    <article 
      onClick={() => onSelect(destination)}
      className="group bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col cursor-pointer"
    >
      {/* Imagery with Resilient Fallback */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
        {!imageError ? (
          <img
            src={destination.image}
            alt={destination.name}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#103C2A]/10 to-[#16834A]/20 p-4 text-center">
            <MapPin className="w-8 h-8 text-[#16834A] mb-1" />
            <span className="text-xs font-semibold text-stone-700">{destination.location}</span>
          </div>
        )}

        {/* Wishlist Button */}
        {!isBusinessOwnerView && (
          <button
            onClick={handleToggleSave}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-rose-600 backdrop-blur-xs transition-colors shadow-xs cursor-pointer"
            aria-label={saved ? "Remove from wishlist" : "Save destination"}
          >
            <Heart 
              className={`w-4 h-4 ${saved ? "fill-rose-500 text-rose-500" : ""}`} 
            />
          </button>
        )}
      </div>

      {/* Body Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Clean Unboxed Metadata with Typographic Separator (Zero-Pill Rule) */}
          <div className="flex items-center gap-2 text-xs font-medium text-stone-500 mb-1.5 flex-wrap">
            <span className="text-[#16834A] font-semibold">{destination.location}</span>
            <span aria-hidden="true">·</span>
            <span>{destination.duration}</span>
            <span aria-hidden="true">·</span>
            <span>{destination.category}</span>
          </div>

          <h3 className="text-base font-bold text-stone-900 group-hover:text-[#103C2A] line-clamp-1 transition-colors">
            {destination.name}
          </h3>

          <p className="mt-1 text-xs text-stone-600 line-clamp-2 leading-relaxed">
            {destination.description}
          </p>

          <div className="mt-2.5 text-[11px] text-stone-500">
            Provided by <span className="font-medium text-stone-700">{destination.owner}</span>
          </div>
        </div>

        {/* Pricing & Actions */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
          <div>
            <div className="text-xs text-stone-500">Indicative Price</div>
            <div className="text-base font-extrabold text-[#103C2A] tabular-nums">
              {formatPrice(destination.price)}
              <span className="text-[11px] font-normal text-stone-500 ml-1">/ person</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isBusinessOwnerView ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (onDelete && confirm(`Delete "${destination.name}"?`)) {
                    onDelete(destination.id);
                  }
                }}
                className="px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors cursor-pointer"
              >
                Delete
              </button>
            ) : (
              <button
                onClick={handleAddToCart}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0 ${
                  addedAnimation 
                    ? 'bg-[#103C2A] text-white' 
                    : 'bg-[#16834A] hover:bg-[#126b3c] text-white active:scale-95'
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Added</span>
                  </>
                ) : (
                  <>
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

      </div>
    </article>
  );
};
