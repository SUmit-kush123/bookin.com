import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useListings } from '../contexts/ListingsProvider';
import { bookingCategoriesData } from '../data/mockData';
import ListingCard from '../components/ListingCard';
import { IconHeart, APP_NAME } from '../constants';
import { BookingCategorySlug } from '../types';
import SkeletonLoader from '../components/ui/SkeletonLoader';

const SharedWishlistPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { listings, isLoading } = useListings();

  const itemIds = searchParams.get('items')?.split(',') || [];
  
  const wishlistedItems = listings.filter(item => itemIds.includes(item.id));

  const getCategorySlug = (categoryId: string): BookingCategorySlug => {
      const category = bookingCategoriesData.find(cat => cat.id === categoryId);
      return category?.slug || BookingCategorySlug.Hotels;
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="text-center mb-8 md:mb-12">
        <IconHeart className="w-12 h-12 text-primary dark:text-accent-light mx-auto mb-4" />
        <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-dark dark:text-neutral-d-dark">A Shared Wishlist from {APP_NAME}</h1>
        <p className="text-neutral-DEFAULT dark:text-neutral-d-DEFAULT mt-2">Explore these hand-picked places!</p>
      </header>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {[...Array(4)].map((_, i) => <SkeletonLoader key={i} type="card" />)}
        </div>
      ) : wishlistedItems.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold text-neutral-dark dark:text-neutral-d-dark mb-4">This wishlist is empty or the link is invalid.</h2>
          <Link to="/" className="text-primary hover:underline font-semibold">Explore {APP_NAME}</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {wishlistedItems.map(item => (
            <ListingCard key={item.id} item={item} categorySlug={getCategorySlug(item.categoryId)} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SharedWishlistPage;
