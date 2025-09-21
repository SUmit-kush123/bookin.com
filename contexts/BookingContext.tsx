import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BookingDetails, Currency } from '../types';
import { listingItemsData } from '../data/mockData';

interface BookingContextType {
  bookings: BookingDetails[];
  addBooking: (booking: Omit<BookingDetails, 'id' | 'bookingDate' | 'status'>) => Promise<BookingDetails>;
  confirmBookingPayment: (bookingId: string) => Promise<BookingDetails>;
  getBookingById: (id: string) => BookingDetails | undefined;
  isLoading: boolean;
  error: string | null;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const BOOKINGS_STORAGE_KEY = 'bookin_bookings';

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<BookingDetails[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load bookings from localStorage on initial render
    try {
      const savedBookings = localStorage.getItem(BOOKINGS_STORAGE_KEY);
      if (savedBookings) {
        setBookings(JSON.parse(savedBookings));
      }
    } catch (e) {
      console.error("Failed to parse bookings from localStorage:", e);
      setBookings([]);
    }
    setIsLoading(false);
  }, []);

  const saveBookingsToStorage = (updatedBookings: BookingDetails[]) => {
    try {
      localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(updatedBookings));
      setBookings(updatedBookings);
    } catch (e) {
      console.error("Failed to save bookings to localStorage:", e);
    }
  };

  const addBooking = async (bookingData: Omit<BookingDetails, 'id' | 'bookingDate' | 'status'>): Promise<BookingDetails> => {
    setIsLoading(true);
    setError(null);
    return new Promise((resolve, reject) => {
      setTimeout(() => { // Simulate network delay
        try {
          const itemDetails = listingItemsData.find(item => item.id === bookingData.itemId);
          if (!itemDetails) {
            throw new Error("Cannot find item details for this booking.");
          }

          const newBooking: BookingDetails = {
            ...bookingData,
            id: `booking-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            bookingDate: new Date().toISOString(),
            status: 'pending_payment',
            currency: itemDetails.currency,
          };
          
          const updatedBookings = [...bookings, newBooking];
          saveBookingsToStorage(updatedBookings);
          
          setIsLoading(false);
          resolve(newBooking);
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
          setError(errorMessage);
          setIsLoading(false);
          reject(new Error(errorMessage));
        }
      }, 500);
    });
  };

  const confirmBookingPayment = async (bookingId: string): Promise<BookingDetails> => {
    setIsLoading(true);
    setError(null);
    return new Promise((resolve, reject) => {
        setTimeout(() => { // Simulate network delay
            const bookingIndex = bookings.findIndex(b => b.id === bookingId);
            if (bookingIndex === -1) {
                const errorMsg = 'Booking not found to confirm payment.';
                setError(errorMsg);
                setIsLoading(false);
                return reject(new Error(errorMsg));
            }
            
            const updatedBookings = [...bookings];
            const updatedBooking = { ...updatedBookings[bookingIndex], status: 'confirmed' as const };
            updatedBookings[bookingIndex] = updatedBooking;

            saveBookingsToStorage(updatedBookings);
            
            setIsLoading(false);
            resolve(updatedBooking);
        }, 500);
    });
  };

  const getBookingById = (id: string): BookingDetails | undefined => {
    return bookings.find(booking => booking.id === id);
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking, getBookingById, confirmBookingPayment, isLoading, error }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBookings = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBookings must be used within a BookingProvider');
  }
  return context;
};
