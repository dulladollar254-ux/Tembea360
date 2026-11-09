import React, { useState } from 'react';
import { Destination } from '../types';
import { useApp } from '../context/AppContext';
import { X, MapPin, Clock, Users, Star, CheckCircle2, ShieldCheck, MessageCircle, Calendar, Plus, Minus, ArrowRight, Heart } from 'lucide-react';

interface DestinationDetailModalProps {
  destination: Destination | null;
  onClose: () => void;
}

export const DestinationDetailModal: React.FC<DestinationDetailModalProps> = ({
  destination,
  onClose
}) => {
  const { addToCart, formatPrice, isSaved, toggleSaveDestination, setActivePage } = useApp();
  
  if (!destination) return null;

  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });
  const [guests, setGuests] = useState(2);
  const [added, setAdded] = useState(false);

  const totalPrice = destination.price * guests;
  const saved = isSaved(destination.id);

  const handleAddToCart = () => {
    addToCart(destination.id, date, guests);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
      setActivePage('cart');
    }, 400);
  };

  const whatsappMessage = encodeURIComponent(
    `Jambo! I found "${destination.name}" on Tembea360 Kenya. I would like to inquire about booking for ${guests} guests around ${date}.`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-stone-200 relative max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Close & Wishlist */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Container */}
        <div className="overflow-y-auto flex-1">
          {/* Hero Image */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-stone-900">
            <img
              src={destination.image}
              alt={destination.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            
            <div className="absolute bottom-4 left-6 right-6 text-white">
              {/* Clean unboxed metadata */}
              <div className="flex items-center gap-2 text-xs text-stone-200 mb-1">
                <span className="font-semibold text-[#A3E6B8]">{destination.location}</span>
                <span aria-hidden="true">·</span>
                <span>{destination.category}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-semibold">{destination.rating.toFixed(1)}</span>
                  <span className="text-stone-300">({destination.reviewCount} reviews)</span>
                </span>
              </div>
              <h2 className="text-xl sm:text-3xl font-extrabold leading-tight">
                {destination.name}
              </h2>
            </div>
          </div>

          {/* Details Body */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-stone-50 border border-stone-200/80 text-xs">
              <div>
                <div className="text-stone-500 font-medium">Duration</div>
                <div className="font-semibold text-stone-900 mt-0.5">{destination.duration}</div>
              </div>
              <div>
                <div className="text-stone-500 font-medium">Group Size</div>
                <div className="font-semibold text-stone-900 mt-0.5">{destination.groupSize}</div>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <div className="text-stone-500 font-medium">Location</div>
                <div className="font-semibold text-stone-900 mt-0.5">{destination.location}, Kenya</div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-2">
                About this Experience
              </h3>
              <p className="text-sm text-stone-700 leading-relaxed">
                {destination.description}
              </p>
            </div>

            {/* Highlights */}
            {destination.highlights && destination.highlights.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-3">
                  Experience Highlights
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {destination.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-stone-700">
                      <CheckCircle2 className="w-4 h-4 text-[#16834A] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* What's Included */}
            {destination.included && destination.included.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-3">
                  What's Included
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600">
                  {destination.included.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#16834A] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Meeting Point & Host */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-3">
              <div>
                <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                  Meeting Point
                </span>
                <p className="text-xs font-medium text-stone-800 mt-1 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#16834A] shrink-0" />
                  {destination.meetingPoint}
                </p>
              </div>

              <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between flex-wrap gap-2 text-xs">
                <div>
                  <span className="text-stone-500">Local Operator: </span>
                  <span className="font-semibold text-stone-900">{destination.owner}</span>
                  {destination.ownerBadge && (
                    <span className="ml-2 text-[11px] text-[#16834A] font-medium">
                      ({destination.ownerBadge})
                    </span>
                  )}
                </div>
                {destination.ownerPhone && (
                  <a
                    href={`https://wa.me/${destination.ownerPhone.replace(/\D/g, '')}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#16834A] hover:text-[#103C2A] font-semibold text-xs transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    WhatsApp Operator
                  </a>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Sticky Purchase / Add to Cart Bar */}
        <div className="p-4 sm:p-6 bg-white border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
            {/* Date Input */}
            <div className="flex items-center gap-1.5 text-xs">
              <Calendar className="w-4 h-4 text-stone-500" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs text-stone-800 bg-white"
              />
            </div>

            {/* Guest Stepper */}
            <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden bg-white">
              <button
                type="button"
                onClick={() => setGuests(Math.max(1, guests - 1))}
                className="px-2.5 py-1.5 text-stone-600 hover:bg-stone-100 cursor-pointer"
                aria-label="Decrease guests"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="px-2 text-xs font-semibold tabular-nums text-stone-800">
                {guests} {guests === 1 ? 'guest' : 'guests'}
              </span>
              <button
                type="button"
                onClick={() => setGuests(guests + 1)}
                className="px-2.5 py-1.5 text-stone-600 hover:bg-stone-100 cursor-pointer"
                aria-label="Increase guests"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
            <div className="text-right">
              <div className="text-[11px] text-stone-500">Total Estimate</div>
              <div className="text-lg font-extrabold text-[#103C2A] tabular-nums">
                {formatPrice(totalPrice)}
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="bg-[#16834A] hover:bg-[#126b3c] text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>Book / Add to Cart</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
