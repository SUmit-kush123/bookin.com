import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactDOMServer from 'react-dom/server';
import { IconChevronLeft, IconMapPin, IconChevronRight, IconTicket, IconCalendar, IconUsers, IconXCircle, IconMessageCircle, IconStar as IconStarConstant, IconSparkles, IconCheck, IconHeart, IconHeartFilled } from '../constants';
import { BookingCategory, BookingCategorySlug, ListingItem, Review } from '../types';
import BookingForm from '../components/BookingForm';
import StarRating from '../components/StarRating';
import { CATEGORY_ICONS } from '../constants';
import MapComponent from '../components/MapComponent';
import { useCurrency } from '../contexts/CurrencyProvider';
import { bookingCategoriesData } from '../data/mockData';
import { useListings } from '../contexts/ListingsProvider';
import SkeletonLoader from '../components/ui/SkeletonLoader';
import { useWishlist } from '../contexts/WishlistProvider';
import { useToast } from '../contexts/ToastProvider';
import GalleryModal from '../components/ui/GalleryModal';
import ReviewForm from '../components/ReviewForm';
import { useAuth } from '../contexts/AuthContext';
import { useRecentlyViewed } from '../contexts/RecentlyViewedProvider';
import AIReviewSummary from '../components/ai/AIReviewSummary';


const ItemDetailPage: React.FC = () => {
  const { categorySlug, itemId } = useParams<{ categorySlug: BookingCategorySlug; itemId: string }>();
  const { getListingById, addReviewToListing, isLoading: isLoadingListings } = useListings();
  const { addRecentlyViewed } = useRecentlyViewed();
  
  const [category, setCategory] = useState<Omit<BookingCategory, 'icon'> | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { formatPrice } = useCurrency();
  const { isWishlisted, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToast } = useToast();
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isReviewLoading, setIsReviewLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  
  const item = itemId ? getListingById(itemId) : null;

  useEffect(() => {
    if (categorySlug) {
      const currentCategory = bookingCategoriesData.find(c => c.slug === categorySlug);
      setCategory(currentCategory || null);
    }
    if(itemId) {
      addRecentlyViewed(itemId);
    }
  }, [categorySlug, itemId, addRecentlyViewed]);
  
  const handleWishlistClick = () => {
    if (!item) return;
    if (isWishlisted(item.id)) {
      removeFromWishlist(item.id);
      addToast('Removed from wishlist', 'info');
    } else {
      addToWishlist(item.id);
      addToast('Added to wishlist!', 'success');
    }
  };

  const handleReviewSubmit = async (rating: number, comment: string) => {
    if (!item) return;
    setIsReviewLoading(true);
    await new Promise(res => setTimeout(res, 500)); // Simulate API call
    addReviewToListing(item.id, { rating, comment });
    setIsReviewLoading(false);
    addToast('Thank you for your review!', 'success');
  };

  if (isLoadingListings) {
    return (
        <div className="container mx-auto px-4 py-8">
            <SkeletonLoader type="text" className="w-1/4 h-6 mb-8" />
            <div className="bg-white dark:bg-neutral-d-light/50 rounded-xl shadow-xl overflow-hidden border border-neutral-extralight/60 dark:border-neutral-d-extralight/60">
                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                    <div className="lg:col-span-7 xl:col-span-8">
                        <SkeletonLoader type="detail-image" />
                    </div>
                     <div className="lg:col-span-5 xl:col-span-4 p-6 md:p-8">
                        <SkeletonLoader type="detail-form" />
                    </div>
                 </div>
            </div>
        </div>
    );
  }

  if (!item || !category) {
    return (
      <div className="text-center py-20">
        <IconXCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-semibold text-red-600 mb-2">Item Not Found</h1>
        <p className="text-neutral-DEFAULT dark:text-neutral-d-DEFAULT max-w-md mx-auto">The requested item could not be found in this category.</p>
        <Link to="/" className="text-primary hover:underline mt-6 inline-block bg-primary/10 px-4 py-2 rounded-md">Go to Homepage</Link>
      </div>
    );
  }

  const nextImage = () => setCurrentImageIndex((prevIndex) => (prevIndex + 1) % (item.images?.length || 1)));
  const prevImage = () => setCurrentImageIndex((prevIndex) => (prevIndex - 1 + (item.images?.length || 1)) % (item.images?.length || 1)));

  const getPriceDisplay = (currentItem: ListingItem) => {
    if (currentItem.pricePerNight != null) return `${formatPrice(currentItem.pricePerNight, currentItem.currency)} / night`;
    if (currentItem.pricePerPerson != null) return `${formatPrice(currentItem.pricePerPerson, currentItem.currency)} / person`;
    if (currentItem.price != null) return formatPrice(currentItem.price, currentItem.currency);
    return 'Price upon request';
  };
  
  const CategoryIcon = CATEGORY_ICONS[category.slug] || IconTicket;

  return (
    <>
    {isGalleryOpen && item.images && (
        <GalleryModal 
          images={item.images}
          videoUrl={item.videoUrl}
          initialIndex={currentImageIndex}
          onClose={() => setIsGalleryOpen(false)}
        />
    )}
    <div className="pb-8 md:pb-12">
      <div className="container mx-auto px-4">
        <div className="my-6 md:my-8">
            <Link 
            to={`/listings/${categorySlug}`} 
            className="inline-flex items-center text-primary dark:text-accent-light hover:text-primary-dark dark:hover:text-accent transition-colors group text-sm"
            >
            <IconChevronLeft className="w-4 h-4 mr-1 transition-transform duration-150 group-hover:-translate-x-0.5" />
            Back to {category.name}
            </Link>
        </div>

        <div className="bg-white dark:bg-neutral-d-light/50 rounded-xl shadow-xl overflow-hidden border border-neutral-extralight/60 dark:border-neutral-d-extralight/60">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            <div className="lg:col-span-7 xl:col-span-8">
              {item.images && item.images.length > 0 ? (
                <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full group cursor-pointer" onClick={() => setIsGalleryOpen(true)}>
                  <img 
                    src={item.images[currentImageIndex]} 
                    alt={`${item.name} - view ${currentImageIndex + 1}`} 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                  {item.images.length > 1 && (
                    <>
                      <button 
                        onClick={(e) => { e.stopPropagation(); prevImage(); }}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/40 text-white p-2.5 rounded-full hover:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 opacity-0 group-hover:opacity-100"
                        aria-label="Previous image"
                      >
                        <IconChevronLeft className="w-6 h-6" />
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/40 text-white p-2.5 rounded-full hover:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 opacity-0 group-hover:opacity-100"
                        aria-label="Next image"
                      >
                        <IconChevronRight className="w-6 h-6" />
                      </button>
                    </>
                  )}
                   <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded-md pointer-events-none">Click to view gallery</div>
                </div>
              ) : (
                <div className="w-full aspect-[4/3] lg:h-full bg-secondary dark:bg-neutral-d-extralight flex items-center justify-center">
                   <CategoryIcon className="w-24 h-24 text-neutral-DEFAULT opacity-50" />
                </div>
              )}
            </div>

            <div className="lg:col-span-5 xl:col-span-4 p-6 md:p-8 flex flex-col bg-neutral-light/30 dark:bg-neutral-d-light/20 lg:bg-transparent">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-primary dark:text-accent-light mb-2">
                  <CategoryIcon className="w-5 h-5 mr-2" />
                  <span>{category.name}</span>
                </div>
                <button onClick={handleWishlistClick} className="flex items-center gap-2 text-sm font-medium text-neutral-DEFAULT hover:text-red-500 transition-colors" aria-label="Add to wishlist">
                  {isWishlisted(item.id) ? (
                     <>
                      <IconHeartFilled className="w-6 h-6 text-red-500" />
                      Saved
                    </>
                  ) : (
                    <>
                      <IconHeart className="w-6 h-6" />
                      Save
                    </>
                  )}
                </button>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-neutral-dark dark:text-neutral-d-dark mb-2">{item.name}</h1>
              
              <div className="flex items-center mb-4 space-x-3">
                {item.rating > 0 && <StarRating rating={item.rating} size="md" color="text-yellow-400"/>}
                {item.rating > 0 && <span className="text-neutral-DEFAULT dark:text-neutral-d-DEFAULT text-sm">({item.reviews.length} reviews)</span>}
              </div>

              {item.location && (
                <div className="flex items-center text-neutral-DEFAULT dark:text-neutral-d-DEFAULT mb-4 text-sm">
                  <IconMapPin className="w-4 h-4 mr-2 text-accent flex-shrink-0" />
                  <span>{item.location}</span>
                </div>
              )}
              
              <p className="text-xl font-semibold text-primary dark:text-accent-light mb-5">{getPriceDisplay(item)}</p>
              
              <div className="prose prose-sm dark:prose-invert max-w-none text-neutral-dark dark:text-neutral-d-dark mb-5 leading-relaxed">
                <p>{item.description}</p>
              </div>

                {categorySlug === BookingCategorySlug.Flights && item.origin && item.destination && (
                    <div className="mb-5 text-sm space-y-1">
                        <p><strong className="text-neutral-dark dark:text-neutral-d-dark">From:</strong> {item.origin}</p>
                        <p><strong className="text-neutral-dark dark:text-neutral-d-dark">To:</strong> {item.destination}</p>
                        {item.departureTime && <p><strong className="text-neutral-dark dark:text-neutral-d-dark">Departs:</strong> {new Date(item.departureTime).toLocaleString()}</p>}
                        {item.arrivalTime && <p><strong className="text-neutral-dark dark:text-neutral-d-dark">Arrives:</strong> {new Date(item.arrivalTime).toLocaleString()}</p>}
                    </div>
                )}
                 {item.capacity && (
                    <div className="flex items-center text-sm mb-5 text-neutral-DEFAULT dark:text-neutral-d-DEFAULT">
                        <IconUsers className="w-4 h-4 mr-2 text-accent" />
                        <strong className="text-neutral-dark dark:text-neutral-d-dark mr-1">Capacity:</strong> {item.capacity} people
                    </div>
                 )}


              <div className="mt-auto pt-6 border-t border-neutral-extralight dark:border-neutral-d-extralight">
                <BookingForm item={item} categorySlug={categorySlug} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 md:mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {item.features && item.features.length > 0 && (
              <div className="bg-white dark:bg-neutral-d-light/50 rounded-xl shadow-xl p-6 md:p-8 border border-neutral-extralight/60 dark:border-neutral-d-extralight/60">
                <h2 className="text-2xl font-bold text-neutral-dark dark:text-neutral-d-dark mb-6 flex items-center">
                  <IconSparkles className="w-7 h-7 mr-3 text-accent" />
                  What this place offers
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                  {item.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-neutral-dark dark:text-neutral-d-dark">
                      <IconCheck className="w-6 h-6 mr-3 text-primary dark:text-accent-light flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {item.coordinates && (
              <div className="bg-white dark:bg-neutral-d-light/50 rounded-xl shadow-xl p-6 md:p-8 border border-neutral-extralight/60 dark:border-neutral-d-extralight/60">
                <h2 className="text-2xl font-bold text-neutral-dark dark:text-neutral-d-dark mb-6 flex items-center">
                  <IconMapPin className="w-7 h-7 mr-3 text-accent" />
                  Location
                </h2>
                <div className="h-64 w-full rounded-lg overflow-hidden shadow-md border border-neutral-extralight dark:border-neutral-d-extralight">
                  <MapComponent 
                      center={[item.coordinates.lat, item.coordinates.lng]} 
                      zoom={13} 
                      markers={[{
                          position: [item.coordinates.lat, item.coordinates.lng],
                          popupContent: ReactDOMServer.renderToString(<span className="font-semibold">{item.name}</span>)
                      }]}
                  />
                </div>
              </div>
            )}
        </div>


        <div className="mt-10 md:mt-12 bg-white dark:bg-neutral-d-light/50 rounded-xl shadow-xl p-6 md:p-8 border border-neutral-extralight/60 dark:border-neutral-d-extralight/60">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold text-neutral-dark dark:text-neutral-d-dark flex items-center">
                <IconMessageCircle className="w-7 h-7 mr-3 text-accent" />
                Customer Reviews
            </h2>
            {item.reviews.length > 2 && <AIReviewSummary reviews={item.reviews} />}
          </div>
           {isAuthenticated && (
            <div className="mb-8 p-4 bg-secondary/50 dark:bg-neutral-d-extralight/40 rounded-lg">
                <h3 className="font-semibold text-neutral-dark dark:text-neutral-d-dark mb-2">Leave a Review</h3>
                <ReviewForm onSubmit={handleReviewSubmit} isLoading={isReviewLoading} />
            </div>
           )}
          {item.reviews.length > 0 ? (
            <div className="space-y-6">
              {item.reviews.map((review: Review) => (
                <div key={review.id} className="pb-4 border-b border-neutral-extralight/50 dark:border-neutral-d-extralight/50 last:border-b-0">
                  <div className="flex items-center mb-2">
                    <img src={review.userAvatar} alt={review.userName} className="w-10 h-10 rounded-full mr-3"/>
                    <div>
                        <span className="text-sm font-semibold text-neutral-dark dark:text-neutral-d-dark">{review.userName}</span>
                        <div className="flex items-center">
                             <StarRating rating={review.rating} size="sm" />
                             <span className="ml-auto text-xs text-neutral-DEFAULT dark:text-neutral-d-DEFAULT">{new Date(review.date).toLocaleDateString()}</span>
                        </div>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-DEFAULT dark:text-neutral-d-DEFAULT">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-neutral-DEFAULT dark:text-neutral-d-DEFAULT">No reviews yet for this item. Be the first to leave one!</p>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default ItemDetailPage;