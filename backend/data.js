// Data adapted from frontend constants.tsx for backend use
const BookingCategorySlug = {
  Hotels: 'hotels',
  Flights: 'flights',
  Adventures: 'adventures',
  RealEstate: 'real-estate',
  RidesAndRentals: 'rides-and-rentals',
  EventSpaces: 'event-spaces',
  Hospitals: 'hospitals',
  WeddingsEvents: 'weddings-events',
};

const bookingCategoriesData = [
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
    id: 'cat-hospitals',
    name: 'Hospitals',
    slug: BookingCategorySlug.Hospitals,
    description: 'Book doctor appointments and diagnostic tests at leading hospitals in Nepal and beyond.',
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

const listingItemsData = [
  // Hospitals (Nepal Focus)
  {
    id: 'hospital-001', categoryId: 'cat-hospitals', name: 'Grande International Hospital, Nepal', description: 'A leading multi-specialty hospital in the heart of Kathmandu, offering world-class care and advanced diagnostics.',
    location: 'Dhapasi, Kathmandu, Nepal', coordinates: { lat: 27.7436, lng: 85.3216 }, rating: 4.8, images: ['https://picsum.photos/seed/grande-hospital1/800/600', 'https://picsum.photos/seed/grande-hospital2/800/600'],
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
      { id: 'fac-endoscopy', name: 'Endoscopy', description: 'Procedure to look inside your body.', price: 6000, image: 'https://picsum.photos/seed/endoscopy-proc/400/300', availableSlots: ["09:30", "10:30"] },
      { id: 'fac-dialysis', name: 'Dialysis', description: 'Renal dialysis services.', price: 4500, image: 'https://picsum.photos/seed/dialysis-unit/400/300', availableSlots: ["07:00", "11:00", "15:00"] },
    ]
  },
  // Hotels (International)
  {
    id: 'hotel-001', categoryId: 'cat-hotels', name: 'Hotel Annapurna, Kathmandu', description: 'A luxurious hotel in the heart of Kathmandu with stunning garden views.',
    location: 'Durbar Marg, Kathmandu, Nepal', coordinates: { lat: 27.7126, lng: 85.3182 }, pricePerNight: 150, rating: 4.7, images: ['https://picsum.photos/seed/annapurna1/800/600', 'https://picsum.photos/seed/annapurna2/800/600'],
    features: ['Swimming Pool', 'Casino', 'Multiple Restaurants', 'Free Wi-Fi'], availability: { startDate: '2024-01-01', endDate: '2025-12-31' }
  },
  {
    id: 'hotel-002', categoryId: 'cat-hotels', name: 'Taj Lake Palace, Udaipur', description: 'An ethereal and romantic hotel that appears to float in the middle of Lake Pichola.',
    location: 'Udaipur, India', coordinates: { lat: 24.5756, lng: 73.6802 }, pricePerNight: 450, rating: 4.9, images: ['https://picsum.photos/seed/taj-udaipur/800/600'],
    features: ['Floating Spa', 'Butler Service', 'Heritage Tours'], availability: { startDate: '2024-01-01', endDate: '2025-12-31' }
  },
  {
    id: 'hotel-003', categoryId: 'cat-hotels', name: 'Burj Al Arab Jumeirah, Dubai', description: 'The iconic sail-shaped silhouette of Dubai, a global icon of Arabian luxury.',
    location: 'Dubai, UAE', coordinates: { lat: 25.1412, lng: 55.1853 }, pricePerNight: 1500, rating: 5.0, images: ['https://picsum.photos/seed/burj-al-arab/800/600'],
    features: ['Underwater Restaurant', 'Private Beach', 'Rolls-Royce Chauffeur', 'Helipad'], availability: { startDate: '2024-01-01', endDate: '2025-12-31' }
  },
  {
    id: 'hotel-004', categoryId: 'cat-hotels', name: 'Amari Dhaka, Bangladesh', description: 'A modern city hotel offering vibrant spaces and warm hospitality.',
    location: 'Dhaka, Bangladesh', coordinates: { lat: 23.794, lng: 90.4042 }, pricePerNight: 120, rating: 4.5, images: ['https://picsum.photos/seed/amari-dhaka/800/600'],
    features: ['Rooftop Pool & Bar', 'Fitness Center', ' Amaya Food Gallery'], availability: { startDate: '2024-01-01', endDate: '2025-12-31' }
  },
  {
    id: 'hotel-005', categoryId: 'cat-hotels', name: 'Heritance Kandalama, Sri Lanka', description: 'An architectural masterpiece by Geoffrey Bawa, overlooking the Sigiriya rock fortress.',
    location: 'Dambulla, Sri Lanka', coordinates: { lat: 7.9319, lng: 80.7042 }, pricePerNight: 180, rating: 4.8, images: ['https://picsum.photos/seed/kandalama/800/600'],
    features: ['Infinity Pools', 'Eco-friendly Design', 'Cave Dining'], availability: { startDate: '2024-01-01', endDate: '2025-12-31' }
  },
  // Adventures (Nepal Focus)
  {
    id: 'adv-001', categoryId: 'cat-adventures', name: 'Everest Base Camp Trek', description: 'The world-famous trek to the base of Mount Everest, a journey of a lifetime.',
    location: 'Khumbu, Nepal', coordinates: { lat: 27.9881, lng: 86.9250 }, pricePerPerson: 1500, rating: 4.9, images: ['https://picsum.photos/seed/everest-trek/800/600'],
    features: ['Experienced Sherpa Guide', 'All Permits Included', 'Meals and Lodging'], adventureType: 'Trekking',
    videoUrl: 'https://example.com/mock-video.mp4',
  },
  {
    id: 'adv-002', categoryId: 'cat-adventures', name: 'Paragliding in Pokhara', description: 'Soar like a bird over the beautiful Phewa Lake with stunning Himalayan views.',
    location: 'Pokhara, Nepal', coordinates: { lat: 28.2096, lng: 83.9856 }, pricePerPerson: 90, rating: 4.8, images: ['https://picsum.photos/seed/pokhara-paraglide/800/600'],
    features: ['Tandem Flight with Pilot', 'GoPro Video Included', 'Hotel Pickup/Dropoff'], adventureType: 'Paragliding'
  },
  // Weddings & Events
  {
    id: 'wed-001', categoryId: 'cat-weddings', name: 'Gokarna Forest Resort, Kathmandu', description: 'A tranquil and majestic wedding venue nestled inside a serene forest.',
    location: 'Gokarna, Kathmandu, Nepal', coordinates: { lat: 27.7289, lng: 85.3948 }, rating: 4.9,
    images: ['https://picsum.photos/seed/gokarna-wedding1/800/600', 'https://picsum.photos/seed/gokarna-wedding2/800/600', 'https://picsum.photos/seed/gokarna-wedding3/800/600'],
    weddingServices: [
        { id: 'serv1', name: 'Venue Rental', description: 'Access to multiple indoor and outdoor spaces.' },
        { id: 'serv2', name: 'Gourmet Catering', description: 'Customizable menus from world-class chefs.' },
        { id: 'serv3', name: 'Decor & Floral', description: 'Bespoke decorations to match your theme.' },
        { id: 'serv4', name: 'Event Planning', description: 'Dedicated planner to coordinate your special day.' },
    ],
    packages: [
        { id: 'pkg1', name: 'Intimate Ceremony', price: 1500, features: ['Venue for 50 guests', 'Basic Decoration', 'Welcome Drinks'] },
        { id: 'pkg2', name: 'Grand Celebration', price: 5000, features: ['Venue for 200 guests', 'Full Floral Decor', '3-Course Dinner', 'Live Music'] },
        { id: 'pkg3', name: 'Royal Destination Wedding', price: 12000, features: ['Exclusive resort buyout', 'All-inclusive for 100 guests', 'Multi-day events', 'Premium services'] },
    ],
  },
  // Rides & Rentals
  {
    id: 'ride-001', categoryId: 'cat-rides-and-rentals', name: 'Pathao-like Bike Ride', description: 'Quick and affordable bike rides across the city, perfect for beating traffic.',
    location: 'Kathmandu, Nepal', coordinates: { lat: 27.7172, lng: 85.3240 }, price: 5, rating: 4.5, // Price is a base fare
    images: ['https://picsum.photos/seed/pathao-bike/800/600'], capacity: 1, features: ['On-demand booking', 'Helmet provided', 'Live tracking']
  },
  {
    id: 'ride-002', categoryId: 'cat-rides-and-rentals', name: 'inDrive-like Car Hire', description: 'Hire a private car with a driver. Negotiate your fare for city or out-of-town trips.',
    location: 'Pokhara, Nepal', coordinates: { lat: 28.2096, lng: 83.9856 }, price: 10, rating: 4.6, // Price is a base fare
    images: ['https://picsum.photos/seed/indrive-car/800/600'], capacity: 4, features: ['Fare negotiation', 'AC & Non-AC options', 'Professional drivers']
  },
  // Flights & Other categories can remain as they are or be expanded similarly
    {
    id: 'flight-001', categoryId: 'cat-flights', name: 'Kathmandu to Delhi', description: 'Direct flight, economy class.',
    price: 150, rating: 4.3, images: ['https://picsum.photos/seed/ktm-del/800/600'],
    origin: 'Kathmandu (KTM)', destination: 'Delhi (DEL)', departureTime: '2024-09-15T08:00:00Z', arrivalTime: '2024-09-15T09:30:00Z'
  },
    {
    id: 'es-001', categoryId: 'cat-events', name: 'Everest Party Palace', description: 'Spacious hall perfect for weddings, birthdays, and large functions.',
    location: 'Baneshwor, Kathmandu', coordinates: { lat: 27.6936, lng: 85.3338 }, price: 2000,
    rating: 4.7, images: ['https://picsum.photos/seed/party-palace-ktm/800/600'], capacity: 500, features: ['Full Catering Services', 'AV Equipment', 'Ample Parking']
  },
];

module.exports = {
  bookingCategoriesData,
  listingItemsData,
  BookingCategorySlug
};