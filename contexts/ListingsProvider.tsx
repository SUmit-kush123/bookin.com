
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ListingItem, Review } from '../types';
import { listingItemsData } from '../data/mockData';
import { useAuth } from './AuthContext';

interface ListingsContextType {
  listings: ListingItem[];
  getListingById: (id: string) => ListingItem | undefined;
  addReviewToListing: (listingId: string, reviewData: { rating: number; comment: string }) => void;
  isLoading: boolean;
  error: string | null;
}

const ListingsContext = createContext<ListingsContextType | undefined>(undefined);

export const ListingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [listings, setListings] = useState<ListingItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth(); // Using auth context to get user info for reviews

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    // Simulate fetching data
    setTimeout(() => {
      try {
        setListings(listingItemsData);
        setIsLoading(false);
      } catch (e) {
        setError("Failed to load listings data.");
        setIsLoading(false);
        console.error(e);
      }
    }, 300); // Short delay to simulate network
  }, []);

  const getListingById = (id: string): ListingItem | undefined => {
    return listings.find(listing => listing.id === id);
  };

  const addReviewToListing = (listingId: string, reviewData: { rating: number; comment: string }) => {
    const newReview: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString(),
      userId: user?.id || 'guest-user-id',
      userName: user?.name || 'Guest User',
      userAvatar: user?.avatar || `https://picsum.photos/seed/guest/200/200`,
    };

    setListings(prevListings => {
      const updatedListings = prevListings.map(listing => {
        if (listing.id === listingId) {
          // Add the new review to the beginning of the array
          return {
            ...listing,
            reviews: [newReview, ...listing.reviews],
          };
        }
        return listing;
      });
      return updatedListings;
    });
  };


  return (
    <ListingsContext.Provider value={{ listings, getListingById, addReviewToListing, isLoading, error }}>
      {children}
    </ListingsContext.Provider>
  );
};

export const useListings = (): ListingsContextType => {
  const context = useContext(ListingsContext);
  if (context === undefined) {
    throw new Error('useListings must be used within a ListingsProvider');
  }
  return context;
};
