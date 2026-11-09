export type LocationArea = 
  | 'All'
  | 'Mombasa' 
  | 'Diani' 
  | 'Watamu' 
  | 'Lamu' 
  | 'Malindi' 
  | 'Wasini Island';

export type DestinationCategory = 
  | 'All'
  | 'Heritage & Culture'
  | 'Beach & Watersports'
  | 'Marine Safari'
  | 'Culinary & Dining'
  | 'Eco-Tours & Nature';

export interface Destination {
  id: string;
  name: string;
  location: Exclude<LocationArea, 'All'>;
  category: Exclude<DestinationCategory, 'All'>;
  price: number; // In Kenyan Shillings (KSh)
  duration: string;
  groupSize: string;
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  highlights: string[];
  included: string[];
  meetingPoint: string;
  owner: string;
  ownerEmail: string;
  ownerPhone?: string;
  ownerBadge?: string;
  featured?: boolean;
}

export interface User {
  id: string | number;
  name: string;
  email: string;
  password?: string;
  type: 'tourist' | 'business';
  businessName?: string;
  phone?: string;
  bio?: string;
  location?: string;
}

export interface CartItem {
  id: string;
  destinationId: string;
  date: string;
  guests: number;
  specialRequests?: string;
}

export interface BookingRequest {
  id: string;
  bookingReference: string;
  destinationId: string;
  destinationName: string;
  location: string;
  businessName: string;
  businessEmail: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  guests: number;
  totalPrice: number;
  currency: 'KSH' | 'USD';
  status: 'Confirmed' | 'Pending Operator Review' | 'Completed' | 'Cancelled';
  paymentMode: 'M-Pesa (Demo)' | 'Card on Arrival' | 'Direct to Operator';
  note?: string;
  createdAt: string;
}
