import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CalendarCheck, MapPin, Phone, Mail, Clock, Printer, CheckCircle2, AlertCircle, ArrowRight, Download, QrCode } from 'lucide-react';
import { BookingRequest } from '../types';

export const BookingsHub: React.FC = () => {
  const { bookings, currentUser, formatPrice, setActivePage } = useApp();
  const [selectedVoucher, setSelectedVoucher] = useState<BookingRequest | null>(null);

  // Filter bookings for current user
  const userBookings = currentUser 
    ? bookings.filter(b => b.customerEmail.toLowerCase() === currentUser.email.toLowerCase())
    : bookings;

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#103C2A]">
            My Coastal Bookings & Itinerary
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Confirmed reservations, meeting points, and vouchers for your Kenyan coastal experiences.
          </p>
        </div>

        <button
          onClick={() => setActivePage('explore')}
          className="bg-[#16834A] hover:bg-[#126b3c] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
        >
          <span>Find More Experiences</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {userBookings.length === 0 ? (
        <div className="bg-white rounded-3xl border border-stone-200 p-10 text-center shadow-xs">
          <div className="w-14 h-14 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4 text-stone-400">
            <CalendarCheck className="w-7 h-7" />
          </div>
          <h2 className="text-lg font-bold text-stone-900">No Booking Inquiries Yet</h2>
          <p className="text-xs text-stone-500 max-w-sm mx-auto mt-1">
            Explore Diani dhow safaris, Mombasa Old Town walks, or Watamu marine turtles and add them to your itinerary.
          </p>
          <button
            onClick={() => setActivePage('explore')}
            className="mt-6 px-6 py-2.5 bg-[#16834A] text-white text-xs font-bold rounded-xl hover:bg-[#126b3c] transition-all cursor-pointer"
          >
            Explore Destinations
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {userBookings.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-2xl border border-stone-200/90 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3 text-xs">
                  <span className="font-mono font-bold text-stone-700 bg-stone-100 px-2 py-0.5 rounded">
                    {b.bookingReference}
                  </span>
                  <span className="text-stone-400">·</span>
                  <span className="text-[#16834A] font-semibold">{b.location}</span>
                  <span className="text-stone-400">·</span>
                  <span className="text-stone-500">Reserved on {b.createdAt}</span>
                </div>

                <h3 className="text-base font-extrabold text-stone-900">
                  {b.destinationName}
                </h3>

                <div className="flex items-center gap-4 text-xs text-stone-600 flex-wrap">
                  <span className="flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    Visit Date: <strong className="text-stone-900">{b.date}</strong>
                  </span>
                  <span>
                    Guests: <strong className="text-stone-900">{b.guests}</strong>
                  </span>
                  <span>
                    Total: <strong className="text-[#103C2A] tabular-nums">{formatPrice(b.totalPrice)}</strong>
                  </span>
                  <span>
                    Host: <strong className="text-stone-800">{b.businessName}</strong>
                  </span>
                </div>

                {b.note && (
                  <p className="text-xs text-stone-500 italic bg-stone-50 p-2 rounded-lg border border-stone-100">
                    "{b.note}"
                  </p>
                )}
              </div>

              {/* Status and Actions */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between w-full md:w-auto gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-stone-100">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#16834A]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{b.status}</span>
                </div>

                <button
                  onClick={() => setSelectedVoucher(b)}
                  className="px-4 py-2 rounded-lg border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <Printer className="w-3.5 h-3.5 text-stone-500" />
                  <span>View Voucher</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Booking Voucher Modal */}
      {selectedVoucher && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 space-y-6 animate-scale-up relative">
            <button
              onClick={() => setSelectedVoucher(null)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 cursor-pointer"
            >
              ✕
            </button>

            {/* Voucher Header */}
            <div className="text-center border-b border-stone-200 pb-5">
              <span className="text-xl font-black tracking-tight text-[#103C2A]">
                Tembea<span className="text-[#16834A]">360</span>
              </span>
              <div className="text-xs font-bold text-stone-500 uppercase tracking-widest mt-1">
                Official Kenya Coastal Experience Voucher
              </div>
              <div className="mt-3 inline-block font-mono text-sm font-extrabold text-[#16834A] bg-[#16834A]/10 px-3 py-1 rounded-md">
                Ref: {selectedVoucher.bookingReference}
              </div>
            </div>

            {/* Details */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between border-b border-stone-100 pb-2">
                <span className="text-stone-500">Experience</span>
                <span className="font-bold text-stone-900 text-right max-w-[240px]">{selectedVoucher.destinationName}</span>
              </div>
              <div className="flex justify-between border-b border-stone-100 pb-2">
                <span className="text-stone-500">Destination</span>
                <span className="font-semibold text-stone-900">{selectedVoucher.location}, Kenya</span>
              </div>
              <div className="flex justify-between border-b border-stone-100 pb-2">
                <span className="text-stone-500">Travel Date</span>
                <span className="font-semibold text-stone-900">{selectedVoucher.date}</span>
              </div>
              <div className="flex justify-between border-b border-stone-100 pb-2">
                <span className="text-stone-500">Party Size</span>
                <span className="font-semibold text-stone-900">{selectedVoucher.guests} Guests</span>
              </div>
              <div className="flex justify-between border-b border-stone-100 pb-2">
                <span className="text-stone-500">Total Price</span>
                <span className="font-extrabold text-[#103C2A] text-sm tabular-nums">{formatPrice(selectedVoucher.totalPrice)}</span>
              </div>
              <div className="flex justify-between border-b border-stone-100 pb-2">
                <span className="text-stone-500">Primary Contact</span>
                <span className="font-semibold text-stone-900">{selectedVoucher.customerName} ({selectedVoucher.customerPhone})</span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="text-stone-500">Local Operator</span>
                <span className="font-semibold text-stone-900">{selectedVoucher.businessName}</span>
              </div>
            </div>

            {/* Fake QR & Notice */}
            <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/80 flex items-center gap-4">
              <div className="w-14 h-14 bg-white p-1 rounded-lg border border-stone-300 flex items-center justify-center shrink-0">
                <QrCode className="w-12 h-12 text-stone-800" />
              </div>
              <div className="text-[11px] text-stone-500 leading-tight">
                Present this voucher or quote booking reference <strong>{selectedVoucher.bookingReference}</strong> upon arrival to your host.
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 rounded-xl border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Voucher</span>
              </button>
              <button
                onClick={() => setSelectedVoucher(null)}
                className="px-5 py-2.5 rounded-xl bg-[#16834A] hover:bg-[#126b3c] text-white text-xs font-bold transition-all cursor-pointer"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
