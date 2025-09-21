



const express = require('express');
const cors = require('cors');
const { bookingCategoriesData, listingItemsData, BookingCategorySlug } = require('./data');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json()); // For parsing application/json

// In-memory store for bookings
let bookings = [];

// API Endpoints

// GET all categories
app.get('/api/categories', (req, res) => {
  res.json(bookingCategoriesData);
});

// GET listings by category slug
app.get('/api/listings/:categorySlug', (req, res) => {
  const { categorySlug } = req.params;
  const category = bookingCategoriesData.find(cat => cat.slug === categorySlug);
  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }
  const items = listingItemsData.filter(item => item.categoryId === category.id);
  res.json(items);
});

// GET a specific hospital item by item ID
app.get('/api/hospital/:itemId', (req, res) => {
    const { itemId } = req.params;
    const hospitalCategory = bookingCategoriesData.find(cat => cat.slug === BookingCategorySlug.Hospitals);
    if (!hospitalCategory) {
        return res.status(404).json({ message: 'Hospital category not found in data configuration.' });
    }
    const item = listingItemsData.find(it => it.categoryId === hospitalCategory.id && it.id === itemId);
    if (!item) {
        return res.status(404).json({ message: 'Hospital not found' });
    }
    res.json(item);
});

// GET a specific wedding item by item ID
app.get('/api/wedding/:itemId', (req, res) => {
    const { itemId } = req.params;
    const weddingCategory = bookingCategoriesData.find(cat => cat.slug === BookingCategorySlug.WeddingsEvents);
    if (!weddingCategory) {
        return res.status(404).json({ message: 'Wedding category not found in data configuration.' });
    }
    const item = listingItemsData.find(it => it.categoryId === weddingCategory.id && it.id === itemId);
    if (!item) {
        return res.status(404).json({ message: 'Wedding venue not found' });
    }
    res.json(item);
});


// GET a specific item by category slug and item ID
app.get('/api/item/:categorySlug/:itemId', (req, res) => {
  const { categorySlug, itemId } = req.params;
  
  if (categorySlug === BookingCategorySlug.Hospitals || categorySlug === BookingCategorySlug.WeddingsEvents) {
    return res.status(400).json({ message: `Items for '${categorySlug}' should be fetched from their dedicated API endpoint.` });
  }

  const category = bookingCategoriesData.find(cat => cat.slug === categorySlug);
  if (!category) {
    return res.status(404).json({ message: 'Category not found for this item' });
  }
  const item = listingItemsData.find(it => it.categoryId === category.id && it.id === itemId);
  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }
  res.json(item);
});

// POST a new booking
app.post('/api/bookings', (req, res) => {
  const newBookingData = req.body;
  // Basic validation (in a real app, this would be more extensive)
  if (!newBookingData.itemId || !newBookingData.userName || !newBookingData.userEmail) {
    return res.status(400).json({ message: 'Missing required booking information.' });
  }
  const newBooking = {
    ...newBookingData,
    id: `booking-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    bookingDate: new Date().toISOString(),
    status: 'pending_payment', // Set default status
  };
  bookings.push(newBooking);
  console.log('Booking added (pending payment):', newBooking);
  res.status(201).json(newBooking);
});

// GET all bookings
app.get('/api/bookings', (req, res) => {
  // In a real app, you'd filter by user, etc.
  res.json(bookings);
});

// GET a specific booking by ID
app.get('/api/bookings/:bookingId', (req, res) => {
  const { bookingId } = req.params;
  const booking = bookings.find(b => b.id === bookingId);
  if (!booking) {
    return res.status(404).json({ message: 'Booking not found' });
  }
  res.json(booking);
});

// PATCH a booking to confirm payment
app.patch('/api/bookings/:bookingId/confirm', (req, res) => {
  const { bookingId } = req.params;
  const bookingIndex = bookings.findIndex(b => b.id === bookingId);
  if (bookingIndex === -1) {
    return res.status(404).json({ message: 'Booking not found' });
  }
  bookings[bookingIndex].status = 'confirmed';
  console.log(`Booking ${bookingId} confirmed.`);
  res.status(200).json(bookings[bookingIndex]);
});


app.listen(PORT, () => {
  console.log(`Bookin backend server running on http://localhost:${PORT}`);
});