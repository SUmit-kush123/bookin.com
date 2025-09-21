import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface RecentlyViewedContextType {
  recentlyViewed: string[]; // Array of listing IDs
  addRecentlyViewed: (listingId: string) => void;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined);

const RECENTLY_VIEWED_KEY = 'bookin_recently_viewed';
const MAX_RECENT_ITEMS = 8;

export const RecentlyViewedProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);

  useEffect(() => {
    try {
      const savedItems = localStorage.getItem(RECENTLY_VIEWED_KEY);
      if (savedItems) {
        setRecentlyViewed(JSON.parse(savedItems));
      }
    } catch (e) {
      console.error("Failed to parse recently viewed items from localStorage:", e);
      setRecentlyViewed([]);
    }
  }, []);

  const addRecentlyViewed = (listingId: string) => {
    setRecentlyViewed(prevItems => {
      // Remove the item if it already exists to move it to the front
      const filteredItems = prevItems.filter(id => id !== listingId);
      // Add the new item to the front
      const newItems = [listingId, ...filteredItems];
      // Limit the number of items
      const finalItems = newItems.slice(0, MAX_RECENT_ITEMS);

      try {
        localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(finalItems));
      } catch (e) {
        console.error("Failed to save recently viewed items to localStorage:", e);
      }
      
      return finalItems;
    });
  };

  return (
    <RecentlyViewedContext.Provider value={{ recentlyViewed, addRecentlyViewed }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
};

export const useRecentlyViewed = (): RecentlyViewedContextType => {
  const context = useContext(RecentlyViewedContext);
  if (context === undefined) {
    throw new Error('useRecentlyViewed must be used within a RecentlyViewedProvider');
  }
  return context;
};