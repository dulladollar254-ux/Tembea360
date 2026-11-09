import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, UserCheck, Building2, Lock, Mail, User as UserIcon, Phone, MapPin, Sparkles } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'signup' | 'business';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultMode = 'login'
}) => {
  const { loginUser, registerUser, showToast, switchDemoUser, setActivePage } = useApp();

  const [mode, setMode] = useState<'login' | 'signup' | 'business'>(defaultMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('Mombasa');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'login') {
      const success = loginUser(email, password);
      if (success) {
        onClose();
      } else {
        showToast('Account not found with this email. Try 1-Click Demo Fill below.');
      }
      return;
    }

    if (!fullName.trim() || !email.trim()) {
      showToast('Please provide your name and email');
      return;
    }

    if (mode === 'business' && !businessName.trim()) {
      showToast('Please provide your business name');
      return;
    }

    registerUser({
      name: fullName.trim(),
      email: email.trim().toLowerCase(),
      type: mode === 'business' ? 'business' : 'tourist',
      businessName: mode === 'business' ? businessName.trim() : undefined,
      phone: phone.trim() || '+254 700 000 000',
      location: location,
      bio: mode === 'business' ? `Licensed local operator in ${location}` : 'Traveler exploring Kenya'
    });

    onClose();
    if (mode === 'business') {
      setActivePage('business');
    }
  };

  const handleDemoFill = (type: 'tourist' | 'business') => {
    switchDemoUser(type);
    onClose();
    if (type === 'business') {
      setActivePage('business');
    } else {
      setActivePage('profile');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <span className="text-2xl font-black text-[#103C2A]">
            Tembea<span className="text-[#16834A]">360</span>
          </span>
          <h2 className="text-lg font-extrabold text-stone-900 mt-2">
            {mode === 'login' ? 'Welcome Back' : mode === 'business' ? 'Register Tourism Business' : 'Join as a Traveler'}
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            {mode === 'login' 
              ? 'Log in to manage bookings or business listings' 
              : 'Connect with authentic local coastal experiences'}
          </p>
        </div>

        {/* 1-Click Fast Persona Switcher for Evaluation */}
        <div className="mb-6 p-3 rounded-2xl bg-[#16834A]/5 border border-[#16834A]/20">
          <div className="text-[11px] font-bold text-[#103C2A] flex items-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#16834A]" />
            Instant 1-Click Demo Login
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleDemoFill('tourist')}
              className="px-2.5 py-1.5 bg-white hover:bg-stone-50 text-stone-800 text-[11px] font-semibold rounded-lg border border-stone-200 text-left transition-colors cursor-pointer"
            >
              Tourist: <strong>Amina M.</strong>
            </button>
            <button
              type="button"
              onClick={() => handleDemoFill('business')}
              className="px-2.5 py-1.5 bg-white hover:bg-stone-50 text-[#103C2A] text-[11px] font-semibold rounded-lg border border-stone-200 text-left transition-colors cursor-pointer"
            >
              Business: <strong>Capt. Hassan</strong>
            </button>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex p-1 bg-stone-100 rounded-xl mb-5 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
              mode === 'login' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
              mode === 'signup' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            Tourist
          </button>
          <button
            type="button"
            onClick={() => setMode('business')}
            className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
              mode === 'business' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            Business
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode !== 'login' && (
            <div>
              <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Bakari Juma"
                  className="w-full border border-stone-300 rounded-lg pl-9 pr-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#16834A]"
                />
              </div>
            </div>
          )}

          {mode === 'business' && (
            <div>
              <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                Business / Enterprise Name
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. Lamu Dhow Safari Masters"
                  className="w-full border border-stone-300 rounded-lg pl-9 pr-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#16834A]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-semibold text-stone-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full border border-stone-300 rounded-lg pl-9 pr-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#16834A]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-stone-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 4 characters"
                className="w-full border border-stone-300 rounded-lg pl-9 pr-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#16834A]"
              />
            </div>
          </div>

          {mode === 'business' && (
            <div>
              <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                Base Location
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 bg-white"
              >
                <option value="Mombasa">Mombasa</option>
                <option value="Diani">Diani</option>
                <option value="Watamu">Watamu</option>
                <option value="Lamu">Lamu</option>
                <option value="Malindi">Malindi</option>
                <option value="Wasini Island">Wasini Island</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#16834A] hover:bg-[#126b3c] text-white py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer mt-2"
          >
            {mode === 'login' ? 'Log In' : mode === 'business' ? 'Create Business Account' : 'Create Tourist Account'}
          </button>
        </form>

      </div>
    </div>
  );
};
