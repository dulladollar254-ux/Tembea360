import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Compass, ShoppingBag, UserCheck, CalendarCheck, ShieldCheck, ArrowRightLeft, LogOut, ChevronDown } from 'lucide-react';

interface NavbarProps {
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth }) => {
  const { 
    activePage, 
    setActivePage, 
    cart, 
    currentUser, 
    logoutUser, 
    currency, 
    setCurrency,
    switchDemoUser
  } = useApp();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-stone-200/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => setActivePage('home')}
              className="text-left group flex items-center gap-2 cursor-pointer transition-transform duration-150 active:scale-95"
            >
              <span className="text-2xl font-extrabold tracking-tight text-[#103C2A] group-hover:text-[#16834A] transition-colors whitespace-nowrap">
                Tembea<span className="text-[#16834A]">360</span>
              </span>
            </button>
          </div>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
            <button
              onClick={() => setActivePage('home')}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#16834A] cursor-pointer ${
                activePage === 'home' ? 'text-[#16834A] font-semibold' : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setActivePage('explore')}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#16834A] cursor-pointer ${
                activePage === 'explore' ? 'text-[#16834A] font-semibold' : ''
              }`}
            >
              Explore Destinations
            </button>
            <button
              onClick={() => setActivePage('cart')}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#16834A] cursor-pointer flex items-center gap-1.5 ${
                activePage === 'cart' ? 'text-[#16834A] font-semibold' : ''
              }`}
            >
              Cart
              <span className="text-xs font-semibold tabular-nums text-stone-500">
                ({cart.length})
              </span>
            </button>
            <button
              onClick={() => setActivePage('bookings')}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#16834A] cursor-pointer ${
                activePage === 'bookings' ? 'text-[#16834A] font-semibold' : ''
              }`}
            >
              My Bookings
            </button>
            <button
              onClick={() => setActivePage('business')}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#16834A] cursor-pointer flex items-center gap-1 ${
                activePage === 'business' ? 'text-[#16834A] font-semibold' : ''
              }`}
            >
              Business Portal
              {currentUser?.type === 'business' && (
                <span className="text-[10px] text-[#16834A] font-bold">Active</span>
              )}
            </button>
          </nav>

          {/* Zone 3: 1 primary action / Account Area */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Currency Switcher */}
            <button
              onClick={() => setCurrency(currency === 'KSH' ? 'USD' : 'KSH')}
              className="text-xs font-semibold text-stone-600 hover:text-stone-900 border border-stone-200 hover:border-stone-300 rounded px-2.5 py-1.5 transition-colors cursor-pointer"
              title="Toggle Currency (KSh / USD)"
            >
              {currency}
            </button>

            {/* User Account / Sign In */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 pl-3 pr-2.5 py-1.5 text-xs font-medium text-stone-800 bg-stone-100 hover:bg-stone-200/80 rounded-lg transition-colors cursor-pointer"
                >
                  <span className="truncate max-w-[130px] font-semibold">
                    {currentUser.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-500" />
                </button>

                {isUserMenuOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-64 bg-white border border-stone-200 rounded-xl shadow-lg py-2 z-50 text-xs"
                    onMouseLeave={() => setIsUserMenuOpen(false)}
                  >
                    <div className="px-3 py-2 border-b border-stone-100">
                      <p className="font-semibold text-stone-900 truncate">{currentUser.name}</p>
                      <p className="text-stone-500 truncate">{currentUser.email}</p>
                      <p className="text-[#16834A] font-medium mt-1">
                        {currentUser.type === 'business' ? `Business: ${currentUser.businessName || 'Operator'}` : 'Tourist Account'}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setActivePage('profile');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-stone-700 hover:bg-stone-50 flex items-center gap-2 cursor-pointer"
                    >
                      <UserCheck className="w-4 h-4 text-stone-500" />
                      View Profile & Saved
                    </button>

                    <button
                      onClick={() => {
                        setActivePage('bookings');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-stone-700 hover:bg-stone-50 flex items-center gap-2 cursor-pointer"
                    >
                      <CalendarCheck className="w-4 h-4 text-stone-500" />
                      My Booking Inquiries
                    </button>

                    {currentUser.type === 'business' && (
                      <button
                        onClick={() => {
                          setActivePage('business');
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-[#103C2A] font-medium hover:bg-stone-50 flex items-center gap-2 cursor-pointer"
                      >
                        <ShieldCheck className="w-4 h-4 text-[#16834A]" />
                        Business Dashboard
                      </button>
                    )}

                    <div className="border-t border-stone-100 my-1 pt-1">
                      <div className="px-3 py-1 text-[11px] font-semibold text-stone-400">
                        Quick Demo Switcher
                      </div>
                      <button
                        onClick={() => {
                          switchDemoUser(currentUser.type === 'business' ? 'tourist' : 'business');
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-1.5 text-stone-600 hover:bg-stone-50 flex items-center gap-2 cursor-pointer"
                      >
                        <ArrowRightLeft className="w-3.5 h-3.5 text-stone-400" />
                        Switch to {currentUser.type === 'business' ? 'Tourist (Amina)' : 'Business (Captain Hassan)'}
                      </button>
                      <button
                        onClick={() => {
                          logoutUser();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-1.5 text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5 text-rose-500" />
                        Log out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#16834A] hover:bg-[#126b3c] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Sign In / Join
              </button>
            )}

            {/* Mobile Nav toggle */}
            <div className="flex md:hidden items-center gap-1">
              <button
                onClick={() => setActivePage(activePage === 'explore' ? 'home' : 'explore')}
                className="p-2 text-stone-600 hover:text-stone-900"
                aria-label="Navigation"
              >
                <Compass className="w-5 h-5" />
              </button>
              <button
                onClick={() => setActivePage('cart')}
                className="p-2 text-stone-600 hover:text-stone-900 relative"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cart.length > 0 && (
                  <span className="absolute top-1 right-1 bg-[#16834A] text-white rounded-full text-[10px] w-4 h-4 flex items-center justify-center font-bold">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
