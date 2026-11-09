import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DestinationCard } from './DestinationCard';
import { Destination, LocationArea, DestinationCategory } from '../types';
import { Plus, Building2, CalendarCheck, DollarSign, MapPin, CheckCircle, Clock, Trash2, Phone, Mail, MessageSquare, AlertCircle } from 'lucide-react';

interface BusinessDashboardProps {
  onOpenSignup: () => void;
}

export const BusinessDashboard: React.FC<BusinessDashboardProps> = ({ onOpenSignup }) => {
  const { 
    currentUser, 
    destinations, 
    bookings, 
    addDestination, 
    deleteDestination, 
    updateBookingStatus, 
    formatPrice, 
    switchDemoUser,
    showToast,
    setSelectedDestination
  } = useApp();

  const isBusiness = currentUser?.type === 'business';

  // Form State
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState<Exclude<LocationArea, 'All'>>('Diani');
  const [category, setCategory] = useState<Exclude<DestinationCategory, 'All'>>('Beach & Watersports');
  const [price, setPrice] = useState(2500);
  const [duration, setDuration] = useState('3 hours');
  const [groupSize, setGroupSize] = useState('Up to 8 guests');
  const [description, setDescription] = useState('');
  const [highlightsText, setHighlightsText] = useState('Guided local experience, Equipment included, Refreshments served');
  const [inclusionsText, setInclusionsText] = useState('Safety gear, Local licensed captain, Drinking water');
  const [meetingPoint, setMeetingPoint] = useState('Diani Beach beachfront access point');
  const [imageUrl, setImageUrl] = useState('/src/assets/images/dest_diani_watersports_1794226781258.jpg');

  const presetImages = [
    { label: 'Diani Beach Lagoon', url: '/src/assets/images/dest_diani_watersports_1794226781258.jpg' },
    { label: 'Mombasa Old Town Alleys', url: '/src/assets/images/dest_mombasa_old_town_1794226780648.jpg' },
    { label: 'Watamu Marine Biosphere', url: '/src/assets/images/dest_watamu_marine_1794226782188.jpg' },
    { label: 'Lamu Sunset Dhow', url: '/src/assets/images/dest_lamu_dhow_sunset_1794226782378.jpg' },
    { label: 'Coastal Diani Aerial', url: '/src/assets/images/hero_coastal_kenya_1794226779817.jpg' }
  ];

  // If not business user, render access gate
  if (!isBusiness) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4">
        <div className="bg-white rounded-3xl border border-stone-200/90 p-8 sm:p-12 text-center shadow-xs space-y-6">
          <div className="w-16 h-16 bg-[#16834A]/10 text-[#16834A] rounded-2xl flex items-center justify-center mx-auto">
            <Building2 className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-2xl font-extrabold text-[#103C2A]">
              Tourism Business Portal
            </h2>
            <p className="mt-2 text-sm text-stone-600 max-w-md mx-auto">
              Are you a local coastal tour guide, dhow captain, culinary host, or marine activity provider? Register your business to publish destinations and receive direct traveler bookings.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => switchDemoUser('business')}
              className="w-full sm:w-auto px-6 py-3 bg-[#103C2A] hover:bg-[#0c2e20] text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
            >
              Try Business Demo (Captain Hassan)
            </button>
            <button
              onClick={onOpenSignup}
              className="w-full sm:w-auto px-6 py-3 bg-[#16834A] hover:bg-[#126b3c] text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
            >
              Register Your Business
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Filter listings and bookings for current business
  const myDestinations = destinations.filter(d => 
    d.ownerEmail === currentUser.email || 
    (currentUser.businessName && d.owner.toLowerCase().includes(currentUser.businessName.toLowerCase()))
  );

  const myBookings = bookings.filter(b => 
    b.businessEmail === currentUser.email || 
    (currentUser.businessName && b.businessName.toLowerCase().includes(currentUser.businessName.toLowerCase()))
  );

  const grossInquiryValue = myBookings.reduce((sum, b) => sum + b.totalPrice, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) {
      showToast('Please fill out all required fields');
      return;
    }

    const highlights = highlightsText.split(',').map(s => s.trim()).filter(Boolean);
    const included = inclusionsText.split(',').map(s => s.trim()).filter(Boolean);

    addDestination({
      name: name.trim(),
      location,
      category,
      price: Number(price),
      duration,
      groupSize,
      image: imageUrl,
      description: description.trim(),
      highlights: highlights.length > 0 ? highlights : ['Authentic coastal experience'],
      included: included.length > 0 ? included : ['Professional guide', 'Park fees'],
      meetingPoint: meetingPoint.trim(),
      owner: currentUser.businessName || currentUser.name,
      ownerEmail: currentUser.email,
      ownerPhone: currentUser.phone || '+254 722 000 000',
      ownerBadge: 'Verified Coastal Operator'
    });

    // Reset Form
    setName('');
    setDescription('');
    setShowForm(false);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-8 animate-fade-in">
      
      {/* Top Welcome Strip */}
      <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="text-xs font-bold text-[#16834A] uppercase tracking-wider">
            Verified Tourism Operator
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#103C2A] mt-1">
            {currentUser.businessName || currentUser.name}
          </h1>
          <p className="text-xs text-stone-500 mt-1 flex items-center gap-2">
            <span>{currentUser.email}</span>
            <span aria-hidden="true">·</span>
            <span>{currentUser.location || 'Coast Region, Kenya'}</span>
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[#16834A] hover:bg-[#126b3c] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>{showForm ? 'Close Form' : 'Publish New Destination'}</span>
        </button>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-stone-200/90 p-5 shadow-xs">
          <div className="text-xs font-semibold text-stone-500">Published Listings</div>
          <div className="text-2xl font-extrabold text-[#103C2A] mt-1 tabular-nums">
            {myDestinations.length}
          </div>
          <div className="text-[11px] text-stone-400 mt-0.5">Active on marketplace</div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200/90 p-5 shadow-xs">
          <div className="text-xs font-semibold text-stone-500">Booking Inquiries</div>
          <div className="text-2xl font-extrabold text-[#103C2A] mt-1 tabular-nums">
            {myBookings.length}
          </div>
          <div className="text-[11px] text-stone-400 mt-0.5">From travelers worldwide</div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200/90 p-5 shadow-xs">
          <div className="text-xs font-semibold text-stone-500">Gross Booking Value</div>
          <div className="text-2xl font-extrabold text-[#16834A] mt-1 tabular-nums">
            {formatPrice(grossInquiryValue)}
          </div>
          <div className="text-[11px] text-stone-400 mt-0.5">Indicative booking total</div>
        </div>
      </div>

      {/* Add Destination Form (Collapsible) */}
      {showForm && (
        <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-stone-100 pb-4">
            <h2 className="text-lg font-bold text-[#103C2A]">
              Publish a New Destination / Experience
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Introduce your coastal tours, boat excursions, or cultural activities to travelers on Tembea360.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Destination / Experience Title
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Wasini Coral Reef Dhow & Seafood Safari"
                  className="w-full border border-stone-300 rounded-lg p-2.5 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#16834A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Coastal Location
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value as any)}
                  className="w-full border border-stone-300 rounded-lg p-2.5 text-xs text-stone-900 bg-white focus:outline-none focus:ring-1 focus:ring-[#16834A]"
                >
                  <option value="Mombasa">Mombasa</option>
                  <option value="Diani">Diani</option>
                  <option value="Watamu">Watamu</option>
                  <option value="Lamu">Lamu</option>
                  <option value="Malindi">Malindi</option>
                  <option value="Wasini Island">Wasini Island</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full border border-stone-300 rounded-lg p-2.5 text-xs text-stone-900 bg-white focus:outline-none focus:ring-1 focus:ring-[#16834A]"
                >
                  <option value="Heritage & Culture">Heritage & Culture</option>
                  <option value="Beach & Watersports">Beach & Watersports</option>
                  <option value="Marine Safari">Marine Safari</option>
                  <option value="Culinary & Dining">Culinary & Dining</option>
                  <option value="Eco-Tours & Nature">Eco-Tours & Nature</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Indicative Price per Person (KSh)
                </label>
                <input
                  type="number"
                  min="0"
                  step="100"
                  required
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full border border-stone-300 rounded-lg p-2.5 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#16834A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Duration & Group Capacity
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g. 4 hours"
                    className="border border-stone-300 rounded-lg p-2.5 text-xs text-stone-900"
                  />
                  <input
                    type="text"
                    value={groupSize}
                    onChange={(e) => setGroupSize(e.target.value)}
                    placeholder="e.g. Up to 10 guests"
                    className="border border-stone-300 rounded-lg p-2.5 text-xs text-stone-900"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Select Visual Photo
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-2">
                  {presetImages.map(img => (
                    <button
                      key={img.url}
                      type="button"
                      onClick={() => setImageUrl(img.url)}
                      className={`relative aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                        imageUrl === img.url ? 'border-[#16834A] ring-2 ring-[#16834A]/20' : 'border-stone-200'
                      }`}
                    >
                      <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-end p-1 text-[10px] text-white font-medium">
                        {img.label}
                      </div>
                    </button>
                  ))}
                </div>
                <input
                  type="url"
                  placeholder="Or enter custom image URL"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full border border-stone-300 rounded-lg p-2 text-xs text-stone-900"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Experience Description
                </label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the journey, what travelers will feel, see and learn..."
                  className="w-full border border-stone-300 rounded-lg p-2.5 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#16834A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Highlights (comma separated)
                </label>
                <input
                  type="text"
                  value={highlightsText}
                  onChange={(e) => setHighlightsText(e.target.value)}
                  placeholder="e.g. Dolphin sighting, Coral snorkeling, Seafood feast"
                  className="w-full border border-stone-300 rounded-lg p-2.5 text-xs text-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Meeting Point Address
                </label>
                <input
                  type="text"
                  value={meetingPoint}
                  onChange={(e) => setMeetingPoint(e.target.value)}
                  placeholder="e.g. Shimoni Jetty, South Coast"
                  className="w-full border border-stone-300 rounded-lg p-2.5 text-xs text-stone-900"
                />
              </div>

            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#16834A] hover:bg-[#126b3c] text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                Publish to Marketplace
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Incoming Traveler Bookings Table */}
      <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-[#103C2A]">
              Traveler Booking Inquiries
            </h2>
            <p className="text-xs text-stone-500">
              Direct booking requests submitted by tourists for your experiences.
            </p>
          </div>
          <span className="text-xs font-bold text-[#16834A] tabular-nums">
            {myBookings.length} {myBookings.length === 1 ? 'Inquiry' : 'Inquiries'}
          </span>
        </div>

        {myBookings.length === 0 ? (
          <div className="py-8 text-center text-xs text-stone-400 bg-stone-50 rounded-2xl border border-stone-100">
            No booking inquiries received yet. Published experiences will appear here.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-500 font-semibold border-y border-stone-200/80">
                <tr>
                  <th className="py-3 px-4">Ref</th>
                  <th className="py-3 px-4">Experience</th>
                  <th className="py-3 px-4">Traveler</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Guests</th>
                  <th className="py-3 px-4">Value</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {myBookings.map(b => (
                  <tr key={b.id} className="hover:bg-stone-50/50 transition-colors">
                    <td className="py-3 px-4 font-mono font-medium text-stone-600">{b.bookingReference}</td>
                    <td className="py-3 px-4 font-bold text-stone-900">{b.destinationName}</td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-stone-800">{b.customerName}</div>
                      <div className="text-[11px] text-stone-400">{b.customerPhone}</div>
                    </td>
                    <td className="py-3 px-4 text-stone-600 whitespace-nowrap">{b.date}</td>
                    <td className="py-3 px-4 text-stone-700 font-medium tabular-nums">{b.guests}</td>
                    <td className="py-3 px-4 font-extrabold text-[#103C2A] tabular-nums">{formatPrice(b.totalPrice)}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-block text-[11px] font-semibold ${
                        b.status === 'Confirmed' ? 'text-[#16834A]' : b.status === 'Cancelled' ? 'text-rose-600' : 'text-amber-700'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      {b.status === 'Confirmed' ? (
                        <button
                          onClick={() => updateBookingStatus(b.id, 'Completed')}
                          className="text-[11px] font-semibold text-stone-600 hover:text-stone-900 underline cursor-pointer"
                        >
                          Mark Completed
                        </button>
                      ) : (
                        <button
                          onClick={() => updateBookingStatus(b.id, 'Confirmed')}
                          className="px-2.5 py-1 text-[11px] font-bold text-white bg-[#16834A] hover:bg-[#126b3c] rounded-md transition-colors cursor-pointer"
                        >
                          Confirm
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Published Destinations Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-[#103C2A]">
              Your Published Destinations ({myDestinations.length})
            </h2>
            <p className="text-xs text-stone-500">
              Manage and edit listings visible to tourists on the Tembea360 map and catalog.
            </p>
          </div>
        </div>

        {myDestinations.length === 0 ? (
          <div className="p-8 text-center text-xs text-stone-500 bg-white rounded-2xl border border-stone-200">
            You haven't published any destinations yet. Click "Publish New Destination" to begin.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {myDestinations.map(d => (
              <DestinationCard
                key={d.id}
                destination={d}
                onSelect={(dest) => setSelectedDestination(dest)}
                isBusinessOwnerView={true}
                onDelete={(id) => deleteDestination(id)}
              />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
