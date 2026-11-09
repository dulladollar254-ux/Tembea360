/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { ExploreView } from './components/ExploreView';
import { CartView } from './components/CartView';
import { BookingsHub } from './components/BookingsHub';
import { BusinessDashboard } from './components/BusinessDashboard';
import { UserProfile } from './components/UserProfile';
import { DestinationDetailModal } from './components/DestinationDetailModal';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { LocationArea } from './types';
import { Check, Info } from 'lucide-react';

const MainApp: React.FC = () => {
  const { 
    activePage, 
    setActivePage, 
    selectedDestination, 
    setSelectedDestination, 
    toastMessage 
  } = useApp();

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authDefaultMode, setAuthDefaultMode] = useState<'login' | 'signup' | 'business'>('login');
  
  // Navigation filters passed from Hero
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState<LocationArea>('All');

  const handleHeroSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleHeroLocation = (loc: LocationArea) => {
    setLocationFilter(loc);
  };

  const handleOpenBusinessSignup = () => {
    setAuthDefaultMode('business');
    setIsAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF8] text-[#1E2922]">
      
      {/* Top Navigation */}
      <Navbar onOpenAuth={() => {
        setAuthDefaultMode('login');
        setIsAuthModalOpen(true);
      }} />

      {/* Main Page Content */}
      <main className="flex-1">
        {activePage === 'home' && (
          <HomeView
            onSearch={handleHeroSearch}
            onSelectLocation={handleHeroLocation}
            onOpenBusinessSignup={handleOpenBusinessSignup}
          />
        )}

        {activePage === 'explore' && (
          <ExploreView
            initialLocation={locationFilter}
            initialSearch={searchQuery}
            onClearInitial={() => {
              setSearchQuery('');
              setLocationFilter('All');
            }}
          />
        )}

        {activePage === 'cart' && <CartView />}

        {activePage === 'bookings' && <BookingsHub />}

        {activePage === 'business' && (
          <BusinessDashboard onOpenSignup={handleOpenBusinessSignup} />
        )}

        {activePage === 'profile' && (
          <UserProfile onOpenAuth={() => {
            setAuthDefaultMode('login');
            setIsAuthModalOpen(true);
          }} />
        )}
      </main>

      {/* Destination Detail Modal */}
      {selectedDestination && (
        <DestinationDetailModal
          destination={selectedDestination}
          onClose={() => setSelectedDestination(null)}
        />
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultMode={authDefaultMode}
      />

      {/* Non-intrusive Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#103C2A] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-semibold animate-slide-up border border-[#16834A]/30">
          <Check className="w-4 h-4 text-[#A3E6B8] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
