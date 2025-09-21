export enum BookingCategorySlug {
  Hotels = 'hotels',
  Flights = 'flights',
  Adventures = 'adventures',
  RealEstate = 'real-estate',
  RidesAndRentals = 'rides-and-rentals',
  EventSpaces = 'event-spaces',
  Hospitals = 'hospitals',
  WeddingsEvents = 'weddings-events',
  Restaurants = 'restaurants',
}

export type PropertyType = 'hotel' | 'apartment' | 'resort' | 'villa' | 'guesthouse' | 'b&b';
export type Currency = 'USD' | 'NPR' | 'INR';

export interface BookingCategory {
  id: string;
  name: string;
  slug: BookingCategorySlug;
  description: string;
  icon?: React.ReactNode; 
  imagePlaceholder: string; 
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
  availableSlots: string[];
}

export interface Department {
  id: string;
  name: string;
  doctors: Doctor[];
}

export interface Facility {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  availableSlots: string[];
}

export interface WeddingPackage {
  id: string;
  name: string;
  price: number;
  features: string[];
}

export interface WeddingService {
  id: string;
  name: string;
  description: string;
  icon?: React.ElementType;
}

export interface Driver {
    id: string;
    name: string;
    rating: number;
    image: string;
}

export interface Vehicle {
    id: string;
    type: 'car' | 'bike' | 'scooter' | 'bus';
    make: string;
    model: string;
    plateNumber: string;
    location: {
        lat: number;
        lng: number;
    };
    driver: Driver;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
  hostReply?: {
    text: string;
    date: string;
  };
}

export interface QandA {
    id: string;
    question: string;
    questionBy: string;
    questionUserId: string;
    answer?: string;
    answeredBy?: string;
    answeredByUserId?: string;
    date: string;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'host';
  timestamp: string;
  userId: string;
  userName: string;
  userAvatar: string;
}

export interface ListingItem {
  id: string;
  categoryId: string;
  name:string;
  description: string;
  location?: string;
  country?: string; 
  district?: string;
  videoUrl?: string; 
  coordinates?: {
    lat: number;
    lng: number;
  };
  pricePerNight?: number;
  pricePerPerson?: number;
  price?: number; 
  currency: Currency;
  rating: number; 
  images: string[]; 
  features?: string[];
  availability?: {
    startDate: string; 
    endDate: string;
  };
  propertyType?: PropertyType; 
  isUniqueStay?: boolean;
  isPromoted?: boolean;
  cuisine?: string;
  priceRange?: string;
  reviews: Review[];
  qanda: QandA[];
  blockedDates: string[]; // YYYY-MM-DD format

  // Category-specific fields
  origin?: string; 
  destination?: string; 
  departureTime?: string; 
  arrivalTime?: string; 
  adventureType?: string; 
  capacity?: number; 
  departments?: Department[];
  facilities?: Facility[];
  weddingServices?: WeddingService[];
  packages?: WeddingPackage[];
}

export interface BookingDetails {
  id: string;
  itemId: string;
  categorySlug: BookingCategorySlug;
  itemName: string;
  userName: string;
  userId: string;
  userEmail: string;
  bookingDate: string; 
  startDate?: string; 
  endDate?: string; 
  participants?: number;
  notes?: string;
  totalPrice: number;
  currency: Currency; 
  status: 'pending_payment' | 'confirmed' | 'cancelled';
  messages: Message[];
  doctor?: { name: string; specialty: string; departmentName: string };
  facility?: { name: string; price: number };
  appointmentTime?: string;
  couponCode?: string;
  package?: { name: string; price: number };
  driver?: Driver;
  vehicle?: Omit<Vehicle, 'driver' | 'location'>;
}

export interface SearchParams {
  query?: string;
  date?: string;
  guests?: number;
}

export interface FormattedBookingData {
  name: string;
  value: string | number;
}

export interface SearchHistoryItem {
  id: string;
  term: string;
  timestamp: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'customer' | 'host';
}

export interface WishlistItem {
  listingId: string;
  addedAt: string;
}