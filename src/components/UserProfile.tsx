import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DestinationCard } from './DestinationCard';
import { User, Heart, ShieldCheck, UserCheck, ArrowRightLeft, LogOut, MapPin, Phone, Mail, Building2 } from 'lucide-react';

interface UserProfileProps {
  onOpenAuth: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ onOpenAuth }) => {
  const { 
    currentUser, 
    destinations, 
    savedDestinations, 
    logoutUser, 
    switchDemoUser, 
    setSelectedDestination,
    setActivePage,
    setCurrentUser,
    showToast 
  } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [location, setLocation] = useState(currentUser?.location || '');
  const [bio, setBio] = useState(currentUser?.bio || '');

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto py-16 px-4 text-center">
        <div className="bg-white rounded-3xl border border-stone-200 p-8 shadow-xs space-y-4">
          <div className="w-14 h-14 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-400">
            <UserCheck className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-stone-900">Sign in to Tembea360</h2>
          <p className="text-xs text-stone-500">
            Log in to view your saved destinations, booking vouchers, or manage your tourism business dashboard.
          </p>
          <button
            onClick={onOpenAuth}
            className="w-full bg-[#16834A] hover:bg-[#126b3c] text-white py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
          >
            Sign In / Create Account
          </button>
        </div>
      </div>
    );
  }

  const savedList = destinations.filter(d => savedDestinations.includes(d.id));

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentUser({
      ...currentUser,
      phone,
      location,
      bio
    });
    setIsEditing(false);
    showToast('Profile updated');
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-8 animate-fade-in">
      
      {/* Profile Card */}
      <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#103C2A] to-[#16834A] text-white flex items-center justify-center text-xl font-black shrink-0 shadow-sm">
            {currentUser.name.charAt(0)}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#16834A]">
                {currentUser.type === 'business' ? 'Verified Tourism Operator' : 'Tourist / Traveler'}
              </span>
              {currentUser.type === 'business' && (
                <ShieldCheck className="w-3.5 h-3.5 text-[#16834A]" />
              )}
            </div>

            <h1 className="text-2xl font-extrabold text-[#103C2A]">
              {currentUser.name}
            </h1>

            {currentUser.type === 'business' && currentUser.businessName && (
              <p className="text-xs font-semibold text-stone-700">
                {currentUser.businessName}
              </p>
            )}

            <div className="flex items-center gap-3 text-xs text-stone-500 pt-1 flex-wrap">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-stone-400" />
                {currentUser.email}
              </span>
              {currentUser.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-stone-400" />
                  {currentUser.phone}
                </span>
              )}
              {currentUser.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" />
                  {currentUser.location}
                </span>
              )}
            </div>

            {currentUser.bio && (
              <p className="text-xs text-stone-600 italic pt-1 max-w-lg">
                "{currentUser.bio}"
              </p>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row md:flex-col gap-2 w-full md:w-auto">
          {currentUser.type === 'business' ? (
            <button
              onClick={() => setActivePage('business')}
              className="px-4 py-2 bg-[#16834A] hover:bg-[#126b3c] text-white text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap"
            >
              Open Business Dashboard
            </button>
          ) : (
            <button
              onClick={() => setActivePage('bookings')}
              className="px-4 py-2 bg-[#103C2A] hover:bg-[#0c2e20] text-white text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap"
            >
              View My Bookings
            </button>
          )}

          <button
            onClick={() => switchDemoUser(currentUser.type === 'business' ? 'tourist' : 'business')}
            className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-stone-500" />
            Switch to {currentUser.type === 'business' ? 'Tourist Demo' : 'Business Demo'}
          </button>

          <button
            onClick={logoutUser}
            className="px-4 py-2 border border-stone-200 text-rose-600 hover:bg-rose-50 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Wishlist / Saved Destinations */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-[#103C2A] flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              Saved Destinations & Wishlist ({savedList.length})
            </h2>
            <p className="text-xs text-stone-500">
              Experiences you have saved for upcoming trips along Kenya's coast.
            </p>
          </div>
        </div>

        {savedList.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center text-xs text-stone-400">
            No saved destinations. Click the heart icon on any destination card to bookmark it.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedList.map(dest => (
              <DestinationCard
                key={dest.id}
                destination={dest}
                onSelect={(d) => setSelectedDestination(d)}
              />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
