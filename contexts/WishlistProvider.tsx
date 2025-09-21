import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { WishlistItem } from '../types';
import { useAuth } from './AuthContext';

interface WishlistContextType {
  wishlist: WishlistItem[];
  addToWishlist: (listingId: string) => void;
  removeFromWishlist: (listingId: string) => void;
  isWishlisted: (listingId: string) => boolean;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const { user } = useAuth();
  
  const getStorageKey = useCallback(() => {
    return user ? `bookin_wishlist_${user.id}` : null;
  }, [user]);

  useEffect(() => {
    const storageKey = getStorageKey();
    if (!storageKey) {
        setWishlist([]); // Clear wishlist if user logs out
        return;
    };
    try {
      const savedWishlist = localStorage.getItem(storageKey);
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      } else {
        setWishlist([]);
      }
    } catch (e) {
      console.error("Failed to parse wishlist from localStorage:", e);
      setWishlist([]);
    }
  }, [user, getStorageKey]);

  const saveWishlistToStorage = (updatedWishlist: WishlistItem[]) => {
    const storageKey = getStorageKey();
    if (!storageKey) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(updatedWishlist));
      setWishlist(updatedWishlist);
    } catch (e) {
      console.error("Failed to save wishlist to localStorage:", e);
    }
  };

  const addToWishlist = (listingId: string) => {
    if (isWishlisted(listingId)) return;
    const newItem: WishlistItem = {
      listingId,
      addedAt: new Date().toISOString(),
    };
    const updatedWishlist = [...wishlist, newItem];
    saveWishlistToStorage(updatedWishlist);
  };

  const removeFromWishlist = (listingId: string) => {
    const updatedWishlist = wishlist.filter(item => item.listingId !== listingId);
    saveWishlistToStorage(updatedWishlist);
  };

  const isWishlisted = (listingId: string): boolean => {
    return wishlist.some(item => item.listingId === listingId);
  };

  return (
    <WishlistContext.Provider value={{
      wishlist,
      addToWishlist,
      removeFromWishlist,
      isWishlisted,
      wishlistCount: wishlist.length,
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};