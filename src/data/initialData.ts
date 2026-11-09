import { Destination, User, BookingRequest } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_coastal_kenya_1794226779817.jpg';

export const STARTER_DESTINATIONS: Destination[] = [
  {
    id: 'dest_mombasa_1',
    name: 'Mombasa Old Town & Fort Jesus Heritage Walk',
    location: 'Mombasa',
    category: 'Heritage & Culture',
    price: 1800,
    duration: '3.5 hours',
    groupSize: 'Up to 10 guests',
    rating: 4.9,
    reviewCount: 68,
    image: '/src/assets/images/dest_mombasa_old_town_1794226780648.jpg',
    description: 'Immerse yourself in 800 years of Swahili history. Wander labyrinthine streets adorned with intricately hand-carved mahogany doors, explore UNESCO-listed Fort Jesus with an official local historian, and savor freshly ground Swahili spiced kahwa coffee.',
    highlights: [
      'UNESCO World Heritage Fort Jesus guided tour',
      'Ornate Swahili carved doors and historic architecture',
      'Spiced Swahili coffee & traditional Halwa tasting',
      'Mombasa spice market cultural walk'
    ],
    included: [
      'Licensed professional Swahili cultural guide',
      'Entry permit to Fort Jesus museum',
      'Traditional spiced coffee & Swahili snacks',
      'Bottled drinking water'
    ],
    meetingPoint: 'Fort Jesus Main Entrance, Nkrumah Rd, Mombasa',
    owner: 'Swahili Coast Heritage Guides',
    ownerEmail: 'heritage@swahilicoast.ke',
    ownerPhone: '+254 712 345 678',
    ownerBadge: 'Licensed National Heritage Guide',
    featured: true,
  },
  {
    id: 'dest_diani_1',
    name: 'Diani Beach Coral Lagoon & Sandbar Excursion',
    location: 'Diani',
    category: 'Beach & Watersports',
    price: 3200,
    duration: '4 hours',
    groupSize: 'Up to 8 guests',
    rating: 5.0,
    reviewCount: 94,
    image: '/src/assets/images/dest_diani_watersports_1794226781258.jpg',
    description: 'Sail across the renowned turquoise waters of Diani Beach on a handcrafted Swahili wooden outrigger. Snorkel vibrant coral gardens teeming with angelfish, starfish, and stingrays, followed by fresh coconut water on Robinson Island sandbar.',
    highlights: [
      'Traditional Swahili outrigger sailing experience',
      'Guided coral reef snorkeling with certified marine guide',
      'Robinson Island low-tide white sandbar visit',
      'Fresh madafu (young coconut) tasting on the ocean'
    ],
    included: [
      'Full sanitized snorkeling gear & life jackets',
      'Local Swahili boat captain and crew',
      'Marine conservation park fees',
      'Fresh local fruits & cold refreshments'
    ],
    meetingPoint: 'Diani Marine Beach Access, Galu Kinondo Road',
    owner: 'Captain Hassan & Diani Sea Explorers',
    ownerEmail: 'hassan@dianidhows.co.ke',
    ownerPhone: '+254 722 987 654',
    ownerBadge: 'Certified Marine Safari Captain',
    featured: true,
  },
  {
    id: 'dest_watamu_1',
    name: 'Watamu Marine Sanctuary & Turtle Sandbanks',
    location: 'Watamu',
    category: 'Marine Safari',
    price: 3800,
    duration: '5 hours',
    groupSize: 'Up to 12 guests',
    rating: 4.9,
    reviewCount: 52,
    image: '/src/assets/images/dest_watamu_marine_1794226782188.jpg',
    description: 'Discover Watamu’s protected marine biosphere, world-famous for its crystal clear inlets and green sea turtle foraging grounds. Cruise past coral islands to Sardenia Due sandbank for an unforgettable swim in surreal turquoise waters.',
    highlights: [
      'Green sea turtle spotting in natural coral habitat',
      'Visit Sardenia Due magical low-tide turquoise sandbanks',
      'Glass-bottom boat marine life observation',
      'Snorkeling over shallow, vibrant coral reefs'
    ],
    included: [
      'Kenya Wildlife Service (KWS) marine park ranger fee',
      'Snorkel mask, fins & safety floatation vests',
      'Tropical fruit platter & refreshments',
      'Hotel pickup in Watamu area'
    ],
    meetingPoint: 'Watamu Marine Association Center, Turtle Bay Rd',
    owner: 'Watamu Community Ocean Conservation',
    ownerEmail: 'tours@watamumarine.org',
    ownerPhone: '+254 733 456 789',
    ownerBadge: 'Eco-Tourism Kenya Gold Partner',
    featured: true,
  },
  {
    id: 'dest_lamu_1',
    name: 'Lamu Archipelago Sunset Dhow Sailing',
    location: 'Lamu',
    category: 'Heritage & Culture',
    price: 4500,
    duration: '2.5 hours',
    groupSize: 'Up to 6 guests',
    rating: 5.0,
    reviewCount: 41,
    image: '/src/assets/images/dest_lamu_dhow_sunset_1794226782378.jpg',
    description: 'Drift past ancient stone towns and mangrove channels aboard an authentic lateen-rigged wooden dhow as the equatorial sun dips into the Indian Ocean. Enjoy freshly made samosas, Swahili tea, and tranquil island rhythms.',
    highlights: [
      'Lateen sail dhow handling with Lamu master sailors',
      'Unobstructed sunset views over Shela channel and Manda Island',
      'Swahili cardamon tea & hot vegetable/meat samosas',
      'Acoustic Swahili coastal music & historic lore'
    ],
    included: [
      'Private dhow charter and experienced crew',
      'Gourmet Swahili sundowner snacks & spiced tea',
      'All harbour clearances',
      'Cushioned seating deck'
    ],
    meetingPoint: 'Shela Jetty or Lamu Town Main Waterfront',
    owner: 'Shela Dhow Masters Collective',
    ownerEmail: 'safari@sheladhows.ke',
    ownerPhone: '+254 721 112 233',
    ownerBadge: 'Master Traditional Boatbuilder',
    featured: true,
  },
  {
    id: 'dest_wasini_1',
    name: 'Wasini Island Dolphin Safari & Coral Gardens',
    location: 'Wasini Island',
    category: 'Marine Safari',
    price: 5200,
    duration: 'Full Day (7 hours)',
    groupSize: 'Up to 14 guests',
    rating: 4.8,
    reviewCount: 77,
    image: '/src/assets/images/dest_watamu_marine_1794226782188.jpg',
    description: 'Travel south to Shimoni and board a wooden dhow to Kisite-Mpunguti Marine Park. Watch playful bottle-nose dolphins leap alongside your boat, snorkel in crystal waters, and feast on a freshly cooked Swahili seafood banquet on Wasini Island.',
    highlights: [
      'High probability wild dolphin encounter cruising',
      'Kisite-Mpunguti marine reserve world-class snorkeling',
      'Traditional Swahili crab & coconut rice lunch',
      'Historic Shimoni slave caves cultural walk'
    ],
    included: [
      'Full round-trip boat transfer from Shimoni jetty',
      'Kisite KWS Marine Park entry permit',
      'Complete 3-course Swahili seafood lunch',
      'Snorkeling gear & local marine naturalist guide'
    ],
    meetingPoint: 'Shimoni Jetty, South Coast (Transfers available from Diani)',
    owner: 'Wasini Eco-Dhow Tours',
    ownerEmail: 'info@wasinidhows.co.ke',
    ownerPhone: '+254 720 334 455',
    ownerBadge: 'Community Eco-Enterprise',
    featured: false,
  },
  {
    id: 'dest_mombasa_2',
    name: 'Swahili Coastal Spice & Culinary Masterclass',
    location: 'Mombasa',
    category: 'Culinary & Dining',
    price: 2400,
    duration: '3 hours',
    groupSize: 'Up to 8 guests',
    rating: 4.9,
    reviewCount: 35,
    image: '/src/assets/images/dest_mombasa_old_town_1794226780648.jpg',
    description: 'Learn the secrets of authentic Swahili coastal cuisine. Tour the historic spice stalls of Mackinnon Market to select fresh cardamom, cinnamon, and cloves, then prepare traditional Biryani, coconut fish curry, and crisp mahamri in an authentic coastal courtyard.',
    highlights: [
      'Guided market tour through Old Mombasa spice alleys',
      'Hands-on preparation of Swahili coconut fish curry and Biryani',
      'Fried Mahamri and Cardamom Chai making',
      'Communal feast in an open-air Swahili courtyard'
    ],
    included: [
      'All cooking ingredients and recipe book to take home',
      'Generous sit-down feast of everything prepared',
      'Cold hibiscus (karkadeh) drink and spiced coffee',
      'Cooking apron and utensils'
    ],
    meetingPoint: 'Mackinnon Market Main Arch, Digo Road, Mombasa',
    owner: 'Mama Fatuma Swahili Kitchen',
    ownerEmail: 'fatuma@swahilicooking.ke',
    ownerPhone: '+254 728 556 677',
    ownerBadge: 'Artisanal Culinary Host',
    featured: false,
  },
  {
    id: 'dest_diani_2',
    name: 'Shimba Hills Rainforest & Sheldrick Falls Trek',
    location: 'Diani',
    category: 'Eco-Tours & Nature',
    price: 3600,
    duration: '6 hours',
    groupSize: 'Up to 10 guests',
    rating: 4.8,
    reviewCount: 46,
    image: '/src/assets/images/dest_diani_watersports_1794226781258.jpg',
    description: 'Venture just 45 minutes inland from Diani Beach into the lush tropical coastal rainforest of Shimba Hills National Reserve. Spot rare sable antelopes, forest elephants, and hike down to the natural pool of the 21-meter Sheldrick Falls for a refreshing dip.',
    highlights: [
      'Guided safari drive in Shimba Hills National Reserve',
      'Hike to scenic Sheldrick Falls with armed KWS ranger',
      'Swim under pristine cascading natural freshwater falls',
      'Panoramic ocean views from Elephant Hill viewpoint'
    ],
    included: [
      '4x4 safari cruiser transport with pop-up roof',
      'KWS park entrance fees & armed escort ranger',
      'Picnic lunch box & chilled bottled water',
      'Hotel pickup & drop-off in Diani area'
    ],
    meetingPoint: 'Pickup from any Diani Beach resort or Diani Shopping Center',
    owner: 'Coastal Ridge Eco-Safaris',
    ownerEmail: 'safari@coastalridge.ke',
    ownerPhone: '+254 722 889 900',
    ownerBadge: 'Licensed Safari Tour Operator',
    featured: false,
  },
  {
    id: 'dest_malindi_1',
    name: 'Malindi Golden Coast & Falconry Sanctuary',
    location: 'Malindi',
    category: 'Eco-Tours & Nature',
    price: 2900,
    duration: '4 hours',
    groupSize: 'Up to 12 guests',
    rating: 4.7,
    reviewCount: 29,
    image: '/src/assets/images/dest_watamu_marine_1794226782188.jpg',
    description: 'Explore the historic Portuguese Vasco da Gama pillar, the Malindi coastal dunes, and visit the Falconry of Kenya to see majestic African fish eagles, martial eagles, and rescued giant tortoises.',
    highlights: [
      '15th Century Vasco da Gama Pillar on the coral promontory',
      'Falconry bird of prey conservation showcase',
      'Silversands beach coastal walk',
      'Local Swahili wood carving workshop visit'
    ],
    included: [
      'All attraction admission fees',
      'Local Malindi historian guide',
      'Tropical fruit refreshments'
    ],
    meetingPoint: 'Vasco da Gama Pillar Car Park, Malindi',
    owner: 'Malindi Coastal Wanderers',
    ownerEmail: 'malindi@wanderers.ke',
    ownerPhone: '+254 734 778 899',
    ownerBadge: 'Local Tourism Association Member',
    featured: false,
  }
];

export const DEMO_USERS: User[] = [
  {
    id: 'user_tourist_1',
    name: 'Amina Mwangi',
    email: 'amina@tembea360.co.ke',
    password: 'demo',
    type: 'tourist',
    phone: '+254 712 900 123',
    location: 'Nairobi, Kenya',
    bio: 'Passionate about coastal Kenyan history, ocean conservation, and Swahili street food.'
  },
  {
    id: 'user_business_1',
    name: 'Captain Hassan Mwinyi',
    email: 'hassan@dianidhows.co.ke',
    password: 'demo',
    type: 'business',
    businessName: 'Captain Hassan & Diani Sea Explorers',
    phone: '+254 722 987 654',
    location: 'Diani Beach, Kwale County',
    bio: 'Third-generation coastal Swahili dhow captain providing ethical marine tours and coral reef snorkeling in Diani.'
  }
];

export const INITIAL_BOOKINGS: BookingRequest[] = [
  {
    id: 'book_1',
    bookingReference: 'T360-KE-1982',
    destinationId: 'dest_diani_1',
    destinationName: 'Diani Beach Coral Lagoon & Sandbar Excursion',
    location: 'Diani',
    businessName: 'Captain Hassan & Diani Sea Explorers',
    businessEmail: 'hassan@dianidhows.co.ke',
    customerName: 'Amina Mwangi',
    customerEmail: 'amina@tembea360.co.ke',
    customerPhone: '+254 712 900 123',
    date: '2026-11-15',
    guests: 2,
    totalPrice: 6400,
    currency: 'KSH',
    status: 'Confirmed',
    paymentMode: 'M-Pesa (Demo)',
    note: 'We are celebrating an anniversary! Looking forward to snorkeling.',
    createdAt: '2026-11-08'
  }
];
