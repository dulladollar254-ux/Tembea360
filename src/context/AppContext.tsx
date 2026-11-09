import React, { createContext, useContext, useState, useEffect } from 'react';
import { Destination, User, CartItem, BookingRequest, LocationArea, DestinationCategory } from '../types';
import { STARTER_DESTINATIONS, DEMO_USERS, INITIAL_BOOKINGS } from '../data/initialData';

interface AppContextType {
  destinations: Destination[];
  users: User[];
  currentUser: User | null;
  cart: CartItem[];
  bookings: BookingRequest[];
  savedDestinations: string[];
  currency: 'KSH' | 'USD';
  exchangeRate: number; // KSh per USD (approx 130)
  activePage: 'home' | 'explore' | 'cart' | 'bookings' | 'business' | 'profile';
  selectedDestination: Destination | null;
  
  // Navigation
  setActivePage: (page: 'home' | 'explore' | 'cart' | 'bookings' | 'business' | 'profile') => void;
  setSelectedDestination: (dest: Destination | null) => void;
  setCurrency: (cur: 'KSH' | 'USD') => void;
  formatPrice: (amountInKsh: number) => string;
  
  // Cart Actions
  addToCart: (destinationId: string, date?: string, guests?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartItem: (cartItemId: string, updates: Partial<CartItem>) => void;
  clearCart: () => void;
  
  // Wishlist
  toggleSaveDestination: (id: string) => void;
  isSaved: (id: string) => boolean;
  
  // Auth & User
  setCurrentUser: (user: User | null) => void;
  loginUser: (email: string, password?: string) => boolean;
  registerUser: (userData: Omit<User, 'id'>) => User;
  logoutUser: () => void;
  switchDemoUser: (type: 'tourist' | 'business') => void;
  
  // Destination Management (Business)
  addDestination: (dest: Omit<Destination, 'id' | 'rating' | 'reviewCount'>) => void;
  updateDestination: (id: string, updates: Partial<Destination>) => void;
  deleteDestination: (id: string) => void;
  
  // Bookings
  createBooking: (bookingData: Omit<BookingRequest, 'id' | 'bookingReference' | 'createdAt'>) => BookingRequest;
  updateBookingStatus: (bookingId: string, status: BookingRequest['status']) => void;
  
  // Toast notifications
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const STORAGE_KEY_PREFIX = 'tembea360_v2_';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load state from localStorage with fallbacks
  const [destinations, setDestinations] = useState<Destination[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}destinations`);
      if (saved) return JSON.parse(saved);
    } catch {}
    return STARTER_DESTINATIONS;
  });

  const [users, setUsers] = useState<User[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}users`);
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEMO_USERS;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}current_user`);
      if (saved) return JSON.parse(saved);
    } catch {}
    // Default to Amina (tourist) for immediate interactive experience
    return DEMO_USERS[0];
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}cart`);
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 'cart_init_1',
        destinationId: 'dest_diani_1',
        date: '2026-11-20',
        guests: 2,
        specialRequests: 'Morning departure preferred'
      }
    ];
  });

  const [bookings, setBookings] = useState<BookingRequest[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}bookings`);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_BOOKINGS;
  });

  const [savedDestinations, setSavedDestinations] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}saved`);
      if (saved) return JSON.parse(saved);
    } catch {}
    return ['dest_lamu_1', 'dest_watamu_1'];
  });

  const [currency, setCurrency] = useState<'KSH' | 'USD'>('KSH');
  const exchangeRate = 130; // 1 USD = 130 KSh

  const [activePage, setActivePage] = useState<'home' | 'explore' | 'cart' | 'bookings' | 'business' | 'profile'>('home');
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}destinations`, JSON.stringify(destinations));
  }, [destinations]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}users`, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}current_user`, JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}cart`, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}bookings`, JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}saved`, JSON.stringify(savedDestinations));
  }, [savedDestinations]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => prev === msg ? null : prev);
    }, 3200);
  };

  const formatPrice = (amountInKsh: number) => {
    if (currency === 'USD') {
      const inUsd = Math.round(amountInKsh / exchangeRate);
      return `$${inUsd.toLocaleString()}`;
    }
    return `KSh ${amountInKsh.toLocaleString('en-KE')}`;
  };

  const addToCart = (destinationId: string, date?: string, guests = 1) => {
    const existingIndex = cart.findIndex(c => c.destinationId === destinationId);
    if (existingIndex > -1) {
      setCart(prev => prev.map((item, idx) => 
        idx === existingIndex ? { ...item, guests: item.guests + 1 } : item
      ));
      showToast('Updated destination guests count in cart');
    } else {
      const defaultDate = date || new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0];
      const newItem: CartItem = {
        id: `cart_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        destinationId,
        date: defaultDate,
        guests
      };
      setCart(prev => [...prev, newItem]);
      showToast('Added destination to your travel cart');
    }
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(c => c.id !== cartItemId));
    showToast('Removed from cart');
  };

  const updateCartItem = (cartItemId: string, updates: Partial<CartItem>) => {
    setCart(prev => prev.map(c => c.id === cartItemId ? { ...c, ...updates } : c));
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleSaveDestination = (id: string) => {
    setSavedDestinations(prev => {
      const exists = prev.includes(id);
      if (exists) {
        showToast('Removed from saved wishlist');
        return prev.filter(item => item !== id);
      } else {
        showToast('Saved to wishlist');
        return [...prev, id];
      }
    });
  };

  const isSaved = (id: string) => savedDestinations.includes(id);

  const loginUser = (email: string, password?: string) => {
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setCurrentUser(found);
      showToast(`Karibu sana, ${found.name}!`);
      return true;
    }
    return false;
  };

  const registerUser = (userData: Omit<User, 'id'>) => {
    const newUser: User = {
      ...userData,
      id: `user_${Date.now()}`
    };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    showToast(`Account created! Karibu Tembea360, ${newUser.name}`);
    return newUser;
  };

  const logoutUser = () => {
    setCurrentUser(null);
    showToast('Logged out successfully');
  };

  const switchDemoUser = (type: 'tourist' | 'business') => {
    if (type === 'tourist') {
      setCurrentUser(DEMO_USERS[0]);
      showToast(`Switched to Tourist demo: ${DEMO_USERS[0].name}`);
    } else {
      setCurrentUser(DEMO_USERS[1]);
      showToast(`Switched to Business demo: ${DEMO_USERS[1].businessName}`);
    }
  };

  const addDestination = (dest: Omit<Destination, 'id' | 'rating' | 'reviewCount'>) => {
    const newDest: Destination = {
      ...dest,
      id: `dest_${Date.now()}`,
      rating: 5.0,
      reviewCount: 1
    };
    setDestinations(prev => [newDest, ...prev]);
    showToast('New destination published to Tembea360!');
  };

  const updateDestination = (id: string, updates: Partial<Destination>) => {
    setDestinations(prev => prev.map(d => d.id === id ? { ...d, ...updates } : d));
    showToast('Destination updated');
  };

  const deleteDestination = (id: string) => {
    setDestinations(prev => prev.filter(d => d.id !== id));
    setCart(prev => prev.filter(c => c.destinationId !== id));
    showToast('Destination deleted from catalog');
  };

  const createBooking = (bookingData: Omit<BookingRequest, 'id' | 'bookingReference' | 'createdAt'>) => {
    const refNum = Math.floor(1000 + Math.random() * 9000);
    const newBooking: BookingRequest = {
      ...bookingData,
      id: `booking_${Date.now()}`,
      bookingReference: `T360-KE-${refNum}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setBookings(prev => [newBooking, ...prev]);
    return newBooking;
  };

  const updateBookingStatus = (bookingId: string, status: BookingRequest['status']) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status } : b));
    showToast(`Booking marked as ${status}`);
  };

  return (
    <AppContext.Provider
      value={{
        destinations,
        users,
        currentUser,
        cart,
        bookings,
        savedDestinations,
        currency,
        exchangeRate,
        activePage,
        selectedDestination,
        setActivePage,
        setSelectedDestination,
        setCurrency,
        formatPrice,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart,
        toggleSaveDestination,
        isSaved,
        setCurrentUser,
        loginUser,
        registerUser,
        logoutUser,
        switchDemoUser,
        addDestination,
        updateDestination,
        deleteDestination,
        createBooking,
        updateBookingStatus,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
