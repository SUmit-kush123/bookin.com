import React from 'react';
import { useWishlist } from '../contexts/WishlistProvider';
import { useListings } from '../contexts/ListingsProvider';
import { bookingCategoriesData } from '../data/mockData';
import ListingCard from '../components/ListingCard';
import { IconHeart, IconChevronRight, IconShare } from '../constants';
import { Link } from 'react-router-dom';
import { BookingCategorySlug, ListingItem } from '../types';
import { useToast } from '../contexts/ToastProvider';

const WishlistPage: React.FC = () => {
  const { wishlist, wishlistCount } = useWishlist();
  const { listings } = useListings();
  const { addToast } = useToast();
  
  const wishlistedItems = listings.filter(item => 
    wishlist.some(wItem => wItem.listingId === item.id)
  );

  const getCategorySlug = (item: ListingItem): BookingCategorySlug => {
      const category = bookingCategoriesData.find(cat => cat.id === item.categoryId);
      return category?.slug || BookingCategorySlug.Hotels;
  }

  const handleShare = () => {
    if (wishlistCount === 0) return;
    const itemIds = wishlist.map(item => item.listingId).join(',');
    const shareUrl = `${window.location.origin}${window.location.pathname}#/shared-wishlist?items=${itemIds}`;
    
    navigator.clipboard.writeText(shareUrl).then(() => {
        addToast('Share link copied to clipboard!', 'success');
    }, (err) => {
        addToast('Failed to copy link.', 'error');
        console.error('Could not copy text: ', err);
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="flex justify-between items-center mb-8 md:mb-12">
        <div className="flex items-center">
            <IconHeart className="w-10 h-10 text-primary dark:text-accent-light mr-3" />
            <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-dark dark:text-neutral-d-dark">My Wishlist</h1>
        </div>
        {wishlistedItems.length > 0 && (
            <button
                onClick={handleShare}
                className="flex items-center text-sm font-medium text-primary dark:text-accent-light bg-primary/10 hover:bg-primary/20 dark:bg-accent/10 dark:hover:bg-accent/20 px-4 py-2 rounded-lg transition-colors"
            >
                <IconShare className="w-4 h-4 mr-1.5" />
                Share Wishlist
            </button>
        )}
      </header>

      {wishlistedItems.length === 0 ? (
        <div className="text-center py-16 md:py-20 bg-white dark:bg-neutral-d-light/50 rounded-xl shadow-xl border border-neutral-extralight/60 dark:border-neutral-d-extralight/60">
          <IconHeart className="w-20 h-20 md:w-24 md:h-24 text-neutral-DEFAULT opacity-50 dark:text-neutral-d-DEFAULT mx-auto mb-6" />
          <h2 className="text-2xl font-semibold text-neutral-dark dark:text-neutral-d-dark mb-4">Your wishlist is empty.</h2>
          <p className="text-neutral-DEFAULT dark:text-neutral-d-DEFAULT mb-8 max-w-md mx-auto">
            Tap the heart icon on any listing to save it here for later.
          </p>
          <Link
            to="/"
            className="bg-primary hover:bg-primary-dark dark:bg-accent dark:hover:bg-accent-dark text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-150 ease-in-out shadow-md hover:shadow-lg inline-flex items-center group"
          >
            Explore Listings
            <IconChevronRight className="w-5 h-5 ml-2 transition-transform duration-150 group-hover:translate-x-1" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {wishlistedItems.map(item => (
            <ListingCard key={item.id} item={item} categorySlug={getCategorySlug(item)} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;