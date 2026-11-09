import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Trash2, Calendar, Users, ShieldCheck, ArrowRight, CheckCircle2, Smartphone, CreditCard, Clock, MapPin, Printer } from 'lucide-react';

export const CartView: React.FC = () => {
  const { 
    cart, 
    destinations, 
    removeFromCart, 
    updateCartItem, 
    clearCart, 
    formatPrice, 
    currentUser, 
    createBooking, 
    setActivePage,
    showToast
  } = useApp();

  const [travelerName, setTravelerName] = useState(currentUser?.name || '');
  const [travelerEmail, setTravelerEmail] = useState(currentUser?.email || '');
  const [travelerPhone, setTravelerPhone] = useState(currentUser?.phone || '+254 712 345 678');
  const [bookingNote, setBookingNote] = useState('');
  const [paymentMode, setPaymentMode] = useState<'M-Pesa (Demo)' | 'Card on Arrival' | 'Direct to Operator'>('M-Pesa (Demo)');
  const [mpesaNumber, setMpesaNumber] = useState('0712 345 678');
  
  // Interactive M-Pesa STK push simulation state
  const [isProcessingMpesa, setIsProcessingMpesa] = useState(false);
  const [mpesaStage, setMpesaStage] = useState<'idle' | 'prompt' | 'pin' | 'success'>('idle');
  const [completedBookings, setCompletedBookings] = useState<any[] | null>(null);

  // Map cart items with destination details
  const cartDetails = cart.map(item => {
    const dest = destinations.find(d => d.id === item.destinationId);
    return {
      ...item,
      destination: dest
    };
  }).filter(item => item.destination !== undefined);

  const totalAmountKsh = cartDetails.reduce((sum, item) => {
    return sum + (item.destination ? item.destination.price * item.guests : 0);
  }, 0);

  const handleStartCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!travelerName.trim() || !travelerEmail.trim()) {
      showToast('Please provide your name and email address');
      return;
    }

    if (cartDetails.length === 0) return;

    if (paymentMode === 'M-Pesa (Demo)') {
      setIsProcessingMpesa(true);
      setMpesaStage('prompt');
      
      // Simulate STK push after 1.5 seconds
      setTimeout(() => {
        setMpesaStage('pin');
      }, 1500);
    } else {
      finalizeBooking();
    }
  };

  const handleSimulatePin = () => {
    setMpesaStage('success');
    setTimeout(() => {
      setIsProcessingMpesa(false);
      finalizeBooking();
    }, 1200);
  };

  const finalizeBooking = () => {
    const created: any[] = [];
    cartDetails.forEach(item => {
      if (!item.destination) return;
      const b = createBooking({
        destinationId: item.destination.id,
        destinationName: item.destination.name,
        location: item.destination.location,
        businessName: item.destination.owner,
        businessEmail: item.destination.ownerEmail,
        customerName: travelerName,
        customerEmail: travelerEmail,
        customerPhone: travelerPhone,
        date: item.date,
        guests: item.guests,
        totalPrice: item.destination.price * item.guests,
        currency: 'KSH',
        status: 'Confirmed',
        paymentMode: paymentMode,
        note: bookingNote || item.specialRequests
      });
      created.push(b);
    });

    setCompletedBookings(created);
    clearCart();
    showToast('Safari njema! Booking request confirmed.');
  };

  if (completedBookings && completedBookings.length > 0) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 animate-fade-in">
        <div className="bg-white rounded-3xl border border-stone-200/90 p-8 sm:p-10 shadow-sm text-center">
          <div className="w-16 h-16 bg-[#16834A]/10 text-[#16834A] rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#103C2A]">
            Booking Request Confirmed!
          </h2>
          <p className="mt-2 text-sm text-stone-600 max-w-lg mx-auto">
            Asante sana! Your itinerary voucher has been generated and dispatched to the local tourism operators.
          </p>

          <div className="my-8 text-left bg-stone-50 rounded-2xl p-6 border border-stone-200/80 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <span className="text-xs font-semibold text-stone-500 uppercase">Booking Reference</span>
              <span className="text-sm font-mono font-bold text-[#103C2A]">{completedBookings[0].bookingReference}</span>
            </div>

            {completedBookings.map((b, idx) => (
              <div key={idx} className="space-y-1 py-2 border-b border-stone-200/60 last:border-0">
                <div className="font-bold text-stone-900 text-sm">{b.destinationName}</div>
                <div className="text-xs text-stone-600 flex items-center gap-3">
                  <span>Date: <strong>{b.date}</strong></span>
                  <span>Guests: <strong>{b.guests}</strong></span>
                  <span>Amount: <strong>{formatPrice(b.totalPrice)}</strong></span>
                </div>
                <div className="text-xs text-stone-500">Operator: {b.businessName}</div>
              </div>
            ))}

            <div className="pt-2 text-xs text-stone-500 flex items-center justify-between">
              <span>Payment Mode: <strong>{paymentMode}</strong></span>
              <span>Status: <strong className="text-[#16834A]">Confirmed</strong></span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => window.print()}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              Print / Save Voucher
            </button>
            <button
              onClick={() => setActivePage('bookings')}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#16834A] hover:bg-[#126b3c] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span>View All My Bookings</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (cartDetails.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center">
        <div className="bg-white rounded-3xl border border-stone-200 p-10 shadow-xs">
          <div className="w-14 h-14 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4 text-stone-400">
            <Calendar className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-stone-900">Your Travel Cart is Empty</h2>
          <p className="mt-2 text-xs text-stone-500 max-w-md mx-auto">
            You haven't added any coastal experiences yet. Discover dhow sailing, heritage walks, or marine safaris along Kenya's coast.
          </p>
          <button
            onClick={() => setActivePage('explore')}
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-[#16834A] hover:bg-[#126b3c] text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-sm"
          >
            Explore Coastal Destinations
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      
      {/* Title */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#103C2A]">
          Your Travel Cart & Itinerary
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Review selected coastal experiences before confirming with local operators.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Itemized Cart */}
        <div className="lg:col-span-7 space-y-4">
          {cartDetails.map(item => (
            <div 
              key={item.id}
              className="bg-white rounded-2xl border border-stone-200/90 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row gap-4 items-start"
            >
              <img
                src={item.destination?.image}
                alt={item.destination?.name}
                className="w-full sm:w-28 h-28 object-cover rounded-xl bg-stone-100 shrink-0"
                referrerPolicy="no-referrer"
              />

              <div className="flex-1 w-full space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-xs text-[#16834A] font-semibold">{item.destination?.location}</div>
                    <h3 className="text-sm font-bold text-stone-900 leading-snug">
                      {item.destination?.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1.5 text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-xs text-stone-500">
                  Host: <span className="text-stone-700 font-medium">{item.destination?.owner}</span>
                </div>

                {/* Date & Guests controls */}
                <div className="flex items-center gap-3 pt-2 border-t border-stone-100 flex-wrap">
                  <div className="flex items-center gap-1.5 text-xs text-stone-600">
                    <Calendar className="w-3.5 h-3.5 text-stone-400" />
                    <input
                      type="date"
                      value={item.date}
                      onChange={(e) => updateCartItem(item.id, { date: e.target.value })}
                      className="border border-stone-200 rounded px-2 py-1 text-xs text-stone-800 bg-stone-50"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-stone-600">
                    <Users className="w-3.5 h-3.5 text-stone-400" />
                    <select
                      value={item.guests}
                      onChange={(e) => updateCartItem(item.id, { guests: Number(e.target.value) })}
                      className="border border-stone-200 rounded px-2 py-1 text-xs text-stone-800 bg-stone-50"
                    >
                      {[1, 2, 3, 4, 5, 6, 8, 10, 12].map(num => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="ml-auto font-bold text-sm text-[#103C2A] tabular-nums">
                    {formatPrice((item.destination?.price || 0) * item.guests)}
                  </div>
                </div>

              </div>
            </div>
          ))}

          {/* Direct operator trust notice */}
          <div className="p-4 rounded-xl bg-stone-100/70 border border-stone-200 text-xs text-stone-600 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#16834A] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-stone-800">Direct Operator Guarantee: </span>
              Your booking is received directly by registered Kenyan guides and dhow captains. No hidden intermediary markup.
            </div>
          </div>
        </div>

        {/* Right Column: Checkout & Payment Request Form */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200/90 p-6 shadow-xs space-y-6">
          <h2 className="text-base font-bold text-[#103C2A] border-b border-stone-100 pb-3">
            Booking & Contact Details
          </h2>

          <form onSubmit={handleStartCheckout} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={travelerName}
                onChange={(e) => setTravelerName(e.target.value)}
                placeholder="e.g. Amina Mwangi"
                className="w-full border border-stone-300 rounded-lg p-2.5 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#16834A]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={travelerEmail}
                  onChange={(e) => setTravelerEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full border border-stone-300 rounded-lg p-2.5 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#16834A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Phone (WhatsApp)
                </label>
                <input
                  type="tel"
                  required
                  value={travelerPhone}
                  onChange={(e) => setTravelerPhone(e.target.value)}
                  placeholder="+254 712 345 678"
                  className="w-full border border-stone-300 rounded-lg p-2.5 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#16834A]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Special Requests or Dietary Needs (Optional)
              </label>
              <textarea
                value={bookingNote}
                onChange={(e) => setBookingNote(e.target.value)}
                placeholder="Mention hotel pickup location, vegetarian preference, children aboard..."
                rows={2}
                className="w-full border border-stone-300 rounded-lg p-2.5 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#16834A]"
              />
            </div>

            {/* Payment Mode Selector */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-2">
                Payment Option
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentMode('M-Pesa (Demo)')}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    paymentMode === 'M-Pesa (Demo)'
                      ? 'border-[#16834A] bg-[#16834A]/5 font-semibold text-[#103C2A]'
                      : 'border-stone-200 text-stone-600 hover:border-stone-300'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4 text-[#16834A]" />
                    M-Pesa (Demo)
                  </span>
                  <span className="text-[10px] text-stone-500 mt-1">Instant STK push</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMode('Card on Arrival')}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    paymentMode === 'Card on Arrival'
                      ? 'border-[#16834A] bg-[#16834A]/5 font-semibold text-[#103C2A]'
                      : 'border-stone-200 text-stone-600 hover:border-stone-300'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-stone-600" />
                    Pay on Arrival
                  </span>
                  <span className="text-[10px] text-stone-500 mt-1">Cash / Card with Host</span>
                </button>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="pt-4 border-t border-stone-100 space-y-2 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal ({cartDetails.length} items)</span>
                <span className="font-semibold tabular-nums">{formatPrice(totalAmountKsh)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Service & Conservation Booking Fee</span>
                <span className="text-[#16834A] font-semibold">Included (0 KSh)</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#103C2A] pt-2 border-t border-stone-100">
                <span>Total Amount</span>
                <span className="text-base tabular-nums">{formatPrice(totalAmountKsh)}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#16834A] hover:bg-[#126b3c] text-white py-3 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Confirm Demo Booking ({formatPrice(totalAmountKsh)})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>

      {/* M-PESA Interactive STK Push Modal */}
      {isProcessingMpesa && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl border border-stone-200 space-y-4 animate-scale-up">
            
            <div className="w-14 h-14 bg-emerald-50 text-[#16834A] rounded-2xl flex items-center justify-center mx-auto">
              <Smartphone className="w-7 h-7" />
            </div>

            <h3 className="text-lg font-extrabold text-stone-900">
              M-Pesa Demo STK Push
            </h3>

            {mpesaStage === 'prompt' && (
              <div className="space-y-3">
                <p className="text-xs text-stone-600">
                  Sending Safaricom Lipa na M-Pesa prompt to <strong>{mpesaNumber}</strong>...
                </p>
                <div className="w-6 h-6 border-2 border-[#16834A] border-t-transparent rounded-full animate-spin mx-auto" />
              </div>
            )}

            {mpesaStage === 'pin' && (
              <div className="space-y-3 bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs">
                <p className="text-stone-700 font-medium">
                  Prompt displayed on phone:
                </p>
                <div className="bg-emerald-950 text-emerald-200 p-3 rounded-lg font-mono text-[11px] text-left">
                  Do you want to pay {formatPrice(totalAmountKsh)} to TEMBEA360 EXPEDITIONS Account #T360?
                </div>
                <button
                  type="button"
                  onClick={handleSimulatePin}
                  className="w-full bg-[#16834A] hover:bg-[#126b3c] text-white py-2 rounded-lg font-bold text-xs transition-colors cursor-pointer"
                >
                  Authorize Payment (Enter PIN Demo)
                </button>
              </div>
            )}

            {mpesaStage === 'success' && (
              <div className="space-y-2 text-[#16834A]">
                <CheckCircle2 className="w-8 h-8 mx-auto" />
                <p className="text-xs font-bold">M-Pesa Payment Confirmed!</p>
                <p className="text-[10px] text-stone-500 font-mono">Ref: QDH{Math.floor(100000 + Math.random() * 900000)} Confirmed</p>
              </div>
            )}

            <button
              type="button"
              onClick={() => setIsProcessingMpesa(false)}
              className="text-stone-400 hover:text-stone-600 text-[11px] font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
