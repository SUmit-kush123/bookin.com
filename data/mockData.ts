import { BookingCategory, ListingItem, BookingCategorySlug, PropertyType, Vehicle } from '../types';

export const bookingCategoriesData: Omit<BookingCategory, 'icon'>[] = [
  {
    id: 'cat-hotels',
    name: 'Hotels & Stays',
    slug: BookingCategorySlug.Hotels,
    description: 'Find the perfect room, from cozy B&Bs in Nepal to luxury suites in Dubai.',
    imagePlaceholder: 'https://picsum.photos/seed/kathmandu-hotel/600/400',
  },
  {
    id: 'cat-adventures',
    name: 'Adventures',
    slug: BookingCategorySlug.Adventures,
    description: 'Explore thrilling activities like Himalayan treks, diving, and safaris.',
    imagePlaceholder: 'https://picsum.photos/seed/himalayas-trek/600/400',
  },
   {
    id: 'cat-restaurants',
    name: 'Restaurants',
    slug: BookingCategorySlug.Restaurants,
    description: 'Discover and book tables at top restaurants for any occasion.',
    imagePlaceholder: 'https://picsum.photos/seed/restaurants-cat/600/400',
  },
  {
    id: 'cat-hospitals',
    name: 'Hospitals',
    slug: BookingCategorySlug.Hospitals,
    description: 'Book doctor appointments and diagnostic tests at leading hospitals.',
    imagePlaceholder: 'https://picsum.photos/seed/nepal-hospital/600/400',
  },
  {
    id: 'cat-weddings',
    name: 'Weddings & Events',
    slug: BookingCategorySlug.WeddingsEvents,
    description: 'Plan your dream destination wedding, engagement, or special celebration.',
    imagePlaceholder: 'https://picsum.photos/seed/destination-wedding/600/400',
  },
  {
    id: 'cat-vehicles',
    name: 'Rides & Rentals',
    slug: BookingCategorySlug.RidesAndRentals,
    description: 'Rent cars or book on-demand rides, from city bikes to comfortable cars.',
    imagePlaceholder: 'https://picsum.photos/seed/kathmandu-ride/600/400',
  },
  {
    id: 'cat-flights',
    name: 'Flights',
    slug: BookingCategorySlug.Flights,
    description: 'Book your next journey with competitive flight deals across the globe.',
    imagePlaceholder: 'https://picsum.photos/seed/global-flights/600/400',
  },
  {
    id: 'cat-events',
    name: 'Event Spaces',
    slug: BookingCategorySlug.EventSpaces,
    description: 'Book venues for parties, and corporate events in various cities.',
    imagePlaceholder: 'https://picsum.photos/seed/party-palace/600/400',
  },
];

export const listingItemsData: ListingItem[] = [
  // Hospitals (Nepal Focus)
  {
    id: 'hospital-001', categoryId: 'cat-hospitals', name: 'Grande International Hospital, Nepal', description: 'A leading multi-specialty hospital in the heart of Kathmandu, offering world-class care and advanced diagnostics.',
    location: 'Dhapasi, Kathmandu, Nepal', country: 'Nepal', currency: 'NPR', coordinates: { lat: 27.7436, lng: 85.3216 }, rating: 4.8, images: ['https://picsum.photos/seed/grande-hospital1/800/600', 'https://picsum.photos/seed/grande-hospital2/800/600'],
    features: ['24/7 Emergency Room', 'In-house Pharmacy', 'Valet Parking', 'International Patient Wing'],
    departments: [
      { id: 'dept-cardio', name: 'Cardiology', doctors: [
        { id: 'doc-smith', name: 'Dr. Ram Shrestha', specialty: 'Cardiologist', image: 'https://picsum.photos/seed/docshrestha/200/200', availableSlots: ["09:00", "09:30", "11:00", "14:00"] },
        { id: 'doc-jones', name: 'Dr. Sita Gurung', specialty: 'Electrophysiologist', image: 'https://picsum.photos/seed/docgurung/200/200', availableSlots: ["10:00", "10:30", "12:00", "15:00"] },
      ]},
      { id: 'dept-derma', name: 'Dermatology', doctors: [
        { id: 'doc-chen', name: 'Dr. Anjali Maharjan', specialty: 'Dermatologist', image: 'https://picsum.photos/seed/docmaharjan/200/200', availableSlots: ["09:15", "11:45", "13:30", "16:00"] },
      ]},
    ],
    facilities: [
      { id: 'fac-ecg', name: 'ECG', description: 'Measures electrical activity of the heart.', price: 1500, image: 'https://picsum.photos/seed/ecg-scan/400/300', availableSlots: ["08:00", "08:15", "10:00"] },
      { id: 'fac-xray', name: 'X-Ray', description: 'Standard X-ray imaging for bones and tissues.', price: 2000, image: 'https://picsum.photos/seed/xray-scan/400/300', availableSlots: ["08:30", "08:45", "11:00"] },
      { id: 'fac-mri', name: 'MRI Scan', description: 'Magnetic Resonance Imaging for detailed internal views.', price: 8000, image: 'https://picsum.photos/seed/mri-machine/400/300', availableSlots: ["09:00", "10:00", "11:00"] },
    ],
    reviews: [], qanda: [], blockedDates: []
  },
  // Hotels
  {
    id: 'hotel-001', categoryId: 'cat-hotels', name: 'Hotel Annapurna, Kathmandu', description: 'A luxurious hotel in the heart of Kathmandu with stunning garden views.',
    location: 'Durbar Marg, Kathmandu', country: 'Nepal', currency: 'USD', pricePerNight: 150, rating: 4.7, images: ['https://picsum.photos/seed/annapurna1/800/600', 'https://picsum.photos/seed/annapurna2/800/600'],
    features: ['Swimming Pool', 'Casino', 'Multiple Restaurants', 'Free Wi-Fi'], propertyType: 'hotel', district: 'Kathmandu',
    reviews: [], qanda: [], blockedDates: []
  },
  {
    id: 'hotel-002', categoryId: 'cat-hotels', name: 'Taj Lake Palace, Udaipur', description: 'An ethereal and romantic hotel that appears to float in the middle of Lake Pichola.',
    location: 'Udaipur, Rajasthan', country: 'India', currency: 'INR', pricePerNight: 35000, rating: 4.9, images: ['https://picsum.photos/seed/taj-udaipur/800/600'],
    features: ['Floating Spa', 'Butler Service', 'Heritage Tours'], propertyType: 'resort',
    reviews: [], qanda: [], blockedDates: []
  },
  {
    id: 'hotel-003', categoryId: 'cat-hotels', name: 'Burj Al Arab Jumeirah, Dubai', description: 'The iconic sail-shaped silhouette of Dubai, a global icon of Arabian luxury.',
    location: 'Umm Suqeim 3, Dubai', country: 'UAE', currency: 'USD', pricePerNight: 1500, rating: 5.0, images: ['https://picsum.photos/seed/burj-al-arab/800/600'],
    features: ['Underwater Restaurant', 'Private Beach', 'Rolls-Royce Chauffeur', 'Helipad'], propertyType: 'hotel', isUniqueStay: true, isPromoted: true,
    reviews: [], qanda: [], blockedDates: []
  },
  {
    id: 'hotel-004', categoryId: 'cat-hotels', name: 'Amari Dhaka, Bangladesh', description: 'A modern city hotel offering vibrant spaces and warm hospitality.',
    location: 'Gulshan, Dhaka', country: 'Bangladesh', currency: 'USD', pricePerNight: 120, rating: 4.5, images: ['https://picsum.photos/seed/amari-dhaka/800/600'],
    features: ['Rooftop Pool & Bar', 'Fitness Center', 'Amaya Food Gallery'], propertyType: 'hotel',
    reviews: [], qanda: [], blockedDates: []
  },
  {
    id: 'hotel-005', categoryId: 'cat-hotels', name: 'Heritance Kandalama, Sri Lanka', description: 'An architectural masterpiece by Geoffrey Bawa, overlooking the Sigiriya rock fortress.',
    location: 'Dambulla', country: 'Sri Lanka', currency: 'USD', pricePerNight: 180, rating: 4.8, images: ['https://picsum.photos/seed/kandalama/800/600'],
    features: ['Infinity Pools', 'Eco-friendly Design', 'Cave Dining'], propertyType: 'resort', isUniqueStay: true,
    reviews: [], qanda: [], blockedDates: []
  },
  {
    id: 'villa-001', categoryId: 'cat-hotels', name: 'Lakeside Villa Pokhara', description: 'A private villa with stunning views of Phewa Lake and the Annapurnas.',
    location: 'Pokhara, Kaski', country: 'Nepal', currency: 'NPR', pricePerNight: 25000, rating: 4.9, images: ['https://picsum.photos/seed/pokhara-villa/800/600'],
    features: ['Private Pool', 'Full Kitchen', 'Garden', 'Lake View'], propertyType: 'villa', district: 'Kaski',
    reviews: [], qanda: [], blockedDates: []
  },
  {
    id: 'apt-001', categoryId: 'cat-hotels', name: 'Modern Apartment in Patan', description: 'A stylish, fully-furnished apartment in the historic city of Lalitpur.',
    location: 'Patan, Lalitpur', country: 'Nepal', currency: 'NPR', pricePerNight: 8000, rating: 4.7, images: ['https://picsum.photos/seed/patan-apt/800/600'],
    features: ['Rooftop Terrace', 'Kitchenette', 'High-speed Wifi', 'Serviced'], propertyType: 'apartment', district: 'Lalitpur',
    reviews: [], qanda: [], blockedDates: []
  },
  {
    id: 'hotel-006', categoryId: 'cat-hotels', name: 'The Peninsula, Hong Kong', description: 'The legendary "Grande Dame of the Far East" continues to set hotel standards worldwide.',
    location: 'Tsim Sha Tsui, Hong Kong', country: 'Hong Kong', currency: 'USD', pricePerNight: 700, rating: 4.9, images: ['https://picsum.photos/seed/peninsula-hk/800/600'],
    features: ['Rooftop Pool', 'Michelin-starred dining', 'Rolls-Royce fleet', 'Helicopter tours'], propertyType: 'hotel',
    reviews: [], qanda: [], blockedDates: []
  },
  {
    id: 'villa-002', categoryId: 'cat-hotels', name: 'Amankila, Bali', description: 'A cliffside beach resort overlooking the Lombok Strait in East Bali.',
    location: 'Manggis, Bali', country: 'Indonesia', currency: 'USD', pricePerNight: 950, rating: 4.9, images: ['https://picsum.photos/seed/amankila-bali/800/600'],
    features: ['Three-tiered infinity pool', 'Private beach club', 'Volcano views', 'Cultural excursions'], propertyType: 'villa', isUniqueStay: true,
    reviews: [], qanda: [], blockedDates: []
  },
  {
    id: 'hotel-007', categoryId: 'cat-hotels', name: 'Park Hyatt Tokyo', description: 'An elegant oasis of space and calm that offers breathtaking 360-degree views of the city.',
    location: 'Shinjuku, Tokyo', country: 'Japan', currency: 'USD', pricePerNight: 800, rating: 4.8, images: ['https://picsum.photos/seed/park-hyatt-tk/800/600'],
    features: ['New York Bar (Lost in Translation)', 'Indoor swimming pool with glass roof', 'Spa and Fitness Center', 'Gourmet dining'], propertyType: 'hotel',
    reviews: [], qanda: [], blockedDates: []
  },
  {
    id: 'apt-002', categoryId: 'cat-hotels', name: 'Chic Parisian Loft', description: 'A beautiful loft in the heart of Le Marais, with artistic decor and modern amenities.',
    location: 'Le Marais, Paris', country: 'France', currency: 'USD', pricePerNight: 350, rating: 4.8, images: ['https://picsum.photos/seed/paris-loft/800/600'],
    features: ['Exposed Beams', 'Designer Kitchen', 'Walk to museums', 'Artistic neighborhood'], propertyType: 'apartment',
    reviews: [], qanda: [], blockedDates: []
  },
  {
    id: 'resort-001', categoryId: 'cat-hotels', name: 'Four Seasons Resort Bora Bora', description: 'Overwater bungalows and underwater adventures in a tropical paradise.',
    location: 'Bora Bora', country: 'French Polynesia', currency: 'USD', pricePerNight: 1800, rating: 5.0, images: ['https://picsum.photos/seed/bora-bora/800/600'],
    features: ['Overwater Bungalows', 'Infinity Pool', 'Private Plunge Pools', 'Lagoon Sanctuary'], propertyType: 'resort', isUniqueStay: true,
    reviews: [], qanda: [], blockedDates: []
  },
  // Adventures
  {
    id: 'adv-001', categoryId: 'cat-adventures', name: 'Everest Base Camp Trek', description: 'The world-famous trek to the base of Mount Everest, a journey of a lifetime.',
    location: 'Khumbu, Solukhumbu', country: 'Nepal', currency: 'USD', pricePerPerson: 1500, rating: 4.9, images: ['https://picsum.photos/seed/everest-trek/800/600'],
    features: ['Experienced Sherpa Guide', 'All Permits Included', 'Meals and Lodging'], adventureType: 'Trekking', videoUrl: 'https://test-videos.co.uk/vids/sintel/mp4/360/Sintel_360_10s_30MB.mp4',
    reviews: [], qanda: [], blockedDates: []
  },
  {
    id: 'adv-002', categoryId: 'cat-adventures', name: 'Paragliding in Pokhara', description: 'Soar like a bird over the beautiful Phewa Lake with stunning Himalayan views.',
    location: 'Pokhara, Kaski', country: 'Nepal', currency: 'NPR', pricePerPerson: 9000, rating: 4.8, images: ['https://picsum.photos/seed/pokhara-paraglide/800/600'],
    features: ['Tandem Flight with Pilot', 'GoPro Video Included', 'Hotel Pickup/Dropoff'], adventureType: 'Paragliding',
    reviews: [], qanda: [], blockedDates: []
  },
  // Weddings & Events
  {
    id: 'wed-001', categoryId: 'cat-weddings', name: 'Gokarna Forest Resort, Kathmandu', description: 'A tranquil and majestic wedding venue nestled inside a serene forest.',
    location: 'Gokarna, Kathmandu', country: 'Nepal', currency: 'USD', rating: 4.9, images: ['https://picsum.photos/seed/gokarna-wedding1/800/600', 'https://picsum.photos/seed/gokarna-wedding2/800/600', 'https://picsum.photos/seed/gokarna-wedding3/800/600'],
    videoUrl: 'https://test-videos.co.uk/vids/sintel/mp4/360/Sintel_360_10s_30MB.mp4',
    weddingServices: [
        { id: 'serv1', name: 'Venue Rental', description: 'Access to multiple indoor and outdoor spaces.' },
        { id: 'serv2', name: 'Gourmet Catering', description: 'Customizable menus from world-class chefs.' },
        { id: 'serv3', name: 'Decor & Floral', description: 'Bespoke decorations to match your theme.' },
    ],
    packages: [
        { id: 'pkg1', name: 'Intimate Ceremony', price: 1500, features: ['Venue for 50 guests', 'Basic Decoration'] },
        { id: 'pkg2', name: 'Grand Celebration', price: 5000, features: ['Venue for 200 guests', 'Full Floral Decor', '3-Course Dinner'] },
    ],
    reviews: [], qanda: [], blockedDates: []
  },
  // Rides & Rentals
  {
    id: 'ride-001', categoryId: 'cat-rides-and-rentals', name: 'City Bike Ride', description: 'Quick and affordable bike rides across the city, perfect for beating traffic.',
    location: 'Kathmandu, Nepal', country: 'Nepal', currency: 'NPR', price: 150, rating: 4.5, // Price is an estimated base fare
    images: ['https://picsum.photos/seed/pathao-bike/800/600'], capacity: 1, features: ['On-demand booking', 'Helmet provided'],
    reviews: [], qanda: [], blockedDates: []
  },
  {
    id: 'ride-002', categoryId: 'cat-rides-and-rentals', name: 'Private Car Hire', description: 'Hire a private car with a driver for city or out-of-town trips.',
    location: 'Pokhara, Nepal', country: 'Nepal', currency: 'NPR', price: 2500, rating: 4.6, // Price per day
    images: ['https://picsum.photos/seed/indrive-car/800/600'], capacity: 4, features: ['AC & Non-AC options', 'Professional drivers'],
    reviews: [], qanda: [], blockedDates: []
  },
    // Restaurants
  {
    id: 'res-001', categoryId: 'cat-restaurants', name: 'The Old House', description: 'Authentic French dining experience in a classic setting.',
    location: 'Durbar Marg, Kathmandu', country: 'Nepal', currency: 'NPR', priceRange: 'Expensive', rating: 4.8, images: ['https://picsum.photos/seed/oldhouse/800/600'],
    features: ['Fine Dining', 'Wine Cellar', 'Private Rooms'], cuisine: 'French',
    reviews: [], qanda: [], blockedDates: []
  },
  {
    id: 'res-002', categoryId: 'cat-restaurants', name: 'Bawarchi', description: 'Serving flavorful and authentic North Indian cuisine.',
    location: 'Naxal, Kathmandu', country: 'Nepal', currency: 'NPR', priceRange: 'Mid-range', rating: 4.6, images: ['https://picsum.photos/seed/bawarchi/800/600'],
    features: ['Tandoori Specialties', 'Family Friendly', 'Vegetarian Options'], cuisine: 'Indian',
    reviews: [], qanda: [], blockedDates: []
  },
];

// Data for new homepage sections
export const propertyTypes = [
    { name: "Apartments", image: "https://picsum.photos/seed/apartments-prop/400/300", type: "apartment" as PropertyType },
    { name: "Resorts", image: "https://picsum.photos/seed/resorts-prop/400/300", type: "resort" as PropertyType },
    { name: "Villas", image: "https://picsum.photos/seed/villas-prop/400/300", type: "villa" as PropertyType },
    { name: "Guesthouses", image: "https://picsum.photos/seed/guesthouses-prop/400/300", type: "guesthouse" as PropertyType },
];

export const popularCities = [
    { name: "Kathmandu", country: "Nepal", image: "https://picsum.photos/seed/city-ktm/400/300" },
    { name: "Pokhara", country: "Nepal", image: "https://picsum.photos/seed/city-pokhara/400/300" },
    { name: "Dubai", country: "UAE", image: "https://picsum.photos/seed/city-dubai/400/300" },
    { name: "Tokyo", country: "Japan", image: "https://picsum.photos/seed/city-tokyo/400/300" },
];

export const regions = [
    { name: "Khumbu Region", country: "Nepal", image: "https://picsum.photos/seed/region-khumbu/400/300" },
    { name: "Bali", country: "Indonesia", image: "https://picsum.photos/seed/region-bali/400/300" },
    { name: "Rajasthan", country: "India", image: "https://picsum.photos/seed/region-rajasthan/400/300" },
    { name: "Tuscany", country: "Italy", image: "https://picsum.photos/seed/region-tuscany/400/300" },
];

export const placesOfInterest = [
    { name: "Swayambhunath Stupa", image: "https://picsum.photos/seed/poi-swayambhu/400/300" },
    { name: "Phewa Lake", image: "https://picsum.photos/seed/poi-phewa/400/300" },
    { name: "Burj Khalifa", image: "https://picsum.photos/seed/poi-burjkhalifa/400/300" },
    { name: "Colosseum, Rome", image: "https://picsum.photos/seed/poi-colosseum/400/300" },
];

export const trendingDestinations = [
    { name: "Pokhara, Nepal", description: "Lakeside serenity meets mountain majesty", image: "https://picsum.photos/seed/trend-pokhara/600/800", link: "/listings/hotels?query=pokhara" },
    { name: "Everest Region", description: "Trek among the world's highest peaks", image: "https://picsum.photos/seed/trend-everest/600/800", link: "/listings/adventures?query=everest" },
    { name: "Dubai, UAE", description: "Experience futuristic luxury", image: "https://picsum.photos/seed/trend-dubai/600/800", link: "/listings/hotels?query=dubai" },
    { name: "Udaipur, India", description: "The romantic city of lakes", image: "https://picsum.photos/seed/trend-udaipur/600/800", link: "/listings/hotels?query=udaipur" },
    { name: "Kyoto, Japan", description: "Ancient temples and serene gardens", image: "https://picsum.photos/seed/trend-kyoto/600/800", link: "#" },
    { name: "Rome, Italy", description: "Walk through millennia of history", image: "https://picsum.photos/seed/trend-rome/600/800", link: "#" },
];

export const vehiclesData: Vehicle[] = [
    { 
        id: 'v-car-01', type: 'car', make: 'Toyota', model: 'Corolla', plateNumber: 'BA 12 PA 3456',
        location: { lat: 27.7190, lng: 85.3210 }, 
        driver: { id: 'd-01', name: 'Ram K.', rating: 4.8, image: 'https://picsum.photos/seed/driverram/100/100' }
    },
    { 
        id: 'v-car-02', type: 'car', make: 'Suzuki', model: 'Swift', plateNumber: 'GA 5 PA 7890',
        location: { lat: 27.7155, lng: 85.3280 },
        driver: { id: 'd-02', name: 'Sita S.', rating: 4.9, image: 'https://picsum.photos/seed/driversita/100/100' }
    },
    { 
        id: 'v-bike-01', type: 'bike', make: 'Honda', model: 'Unicorn', plateNumber: 'BA 80 PA 1111',
        location: { lat: 27.7140, lng: 85.3200 },
        driver: { id: 'd-03', name: 'Hari B.', rating: 4.7, image: 'https://picsum.photos/seed/driverhari/100/100' }
    },
     { 
        id: 'v-bike-02', type: 'bike', make: 'Yamaha', model: 'FZ', plateNumber: 'GA 9 PA 2222',
        location: { lat: 27.7205, lng: 85.3255 },
        driver: { id: 'd-04', name: 'Gita M.', rating: 4.6, image: 'https://picsum.photos/seed/drivergita/100/100' }
    }
];
