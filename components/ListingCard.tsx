import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ListingItem, BookingCategorySlug } from '../types';
import StarRating from './StarRating';
import { IconMapPin, CATEGORY_ICONS, IconTicket, IconHeart, IconHeartFilled, IconSparkles } from '../constants';
import { useCurrency } from '../contexts/CurrencyProvider';
import { useWishlist } from '../contexts/WishlistProvider';
import { useToast } from '../contexts/ToastProvider';

interface ListingCardProps {
  item: ListingItem;
  categorySlug: BookingCategorySlug;
}

const ListingCard: React.FC<ListingCardProps> = ({ item, categorySlug }) => {
  const { formatPrice } = useCurrency();
  const { isWishlisted, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToast } = useToast();
  const [isPopping, setIsPopping] = useState(false);
  
  const isItemWishlisted = isWishlisted(item.id);

  const getPriceDisplay = () => {
    if (categorySlug === BookingCategorySlug.Hospitals) return 'Appointments Available';
    if (categorySlug === BookingCategorySlug.WeddingsEvents && item.packages && item.packages.length > 0) {
      const minPrice = Math.min(...item.packages.map(p => p.price));
      return `From ${formatPrice(minPrice, item.currency)}`;
    }
    if (item.pricePerNight != null) return `${formatPrice(item.pricePerNight, item.currency)}/night`;
    if (item.pricePerPerson != null) return `${formatPrice(item.pricePerPerson, item.currency)}/person`;
    if (item.price != null) return formatPrice(item.price, item.currency);
    return 'Price N/A';
  };
  
  const getButtonText = () => {
    if (categorySlug === BookingCategorySlug.Hospitals) return 'View Services';
    if (categorySlug === BookingCategorySlug.WeddingsEvents) return 'View Packages';
    return 'View Details';
  };

  const getLinkTo = () => {
    if (categorySlug === BookingCategorySlug.Hospitals) return `/hospital/${item.id}`;
    if (categorySlug === BookingCategorySlug.WeddingsEvents) return `/wedding/${item.id}`;
    return `/item/${categorySlug}/${item.id}`;
  };
  
  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if(isItemWishlisted) {
      removeFromWishlist(item.id);
      addToast('Removed from wishlist', 'info');
    } else {
      addToWishlist(item.id);
      addToast('Added to wishlist!', 'success');
      setIsPopping(true);
      setTimeout(() => setIsPopping(false), 300); // Duration of the pop animation
    }
  }

  const CategoryIconComponent = CATEGORY_ICONS[categorySlug] || IconTicket;
  const hasImage = item.images && item.images.length > 0 && item.images[0];
  const linkTo = getLinkTo();

  return (
    <div className="bg-white dark:bg-neutral-d-light/50 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-card-hover dark:hover:shadow-dark-interactive flex flex-col group transform hover:-translate-y-1 focus-within:shadow-interactive dark:border dark:border-neutral-d-extralight/50 relative">
      {item.isPromoted && (
        <div className="absolute top-3 left-3 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full z-10 flex items-center shadow-md">
          <IconSparkles className="w-3 h-3 mr-1.5" />
          PROMOTED
        </div>
      )}
      <div className="relative aspect-video">
        <Link to={linkTo} aria-label={`View details for ${item.name}`}>
          {hasImage ? (
            <img 
              src={item.images[0]} 
              alt={item.name} 
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-secondary dark:bg-neutral-d-extralight/50 flex items-center justify-center">
              <CategoryIconComponent className="w-16 h-16 text-neutral-DEFAULT opacity-50" />
            </div>
          )}
        </Link>
        <button onClick={handleWishlistClick} className={`absolute top-3 right-3 bg-black/30 backdrop-blur-sm p-1.5 rounded-full text-white hover:text-red-500 hover:bg-white/30 transition-all duration-150 z-10 ${isPopping ? 'wishlist-pop' : ''}`} aria-label="Add to wishlist">
          {isItemWishlisted ? (
             <IconHeartFilled className="w-5 h-5 text-red-500" />
          ) : (
             <IconHeart className="w-5 h-5" />
          )}
        </button>
        {item.rating > 0 && (
          <div className="absolute bottom-3 right-3 bg-primary/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-md text-xs font-semibold flex items-center space-x-1 shadow">
            <StarRating rating={item.rating} size="sm" color="text-yellow-300" />
            <span>({item.rating.toFixed(1)})</span>
          </div>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <Link to={linkTo} className="block">
          <h3 className="text-lg font-semibold text-neutral-dark dark:text-neutral-d-dark mb-1.5 truncate transition-colors duration-150 group-hover:text-primary dark:group-hover:text-accent-light" title={item.name}>{item.name}</h3>
        </Link>
        
        {item.location && (
          <div className="flex items-center text-xs text-neutral-DEFAULT dark:text-neutral-d-DEFAULT mb-2.5">
            <IconMapPin className="w-3.5 h-3.5 mr-1.5 text-neutral-DEFAULT/80" />
            <span>{item.location}</span>
          </div>
        )}

        <p className="text-sm text-neutral-DEFAULT dark:text-neutral-d-DEFAULT mb-4 line-clamp-3 flex-grow min-h-[60px]">{item.description}</p>
        
        <div className="flex justify-between items-center mt-auto pt-3.5 border-t border-neutral-extralight/70 dark:border-neutral-d-extralight/70">
          <span className="text-base font-bold text-primary dark:text-accent-light">{getPriceDisplay()}</span>
          <Link
            to={linkTo}
            className="bg-accent hover:bg-accent-dark text-white text-sm font-medium py-2 px-4 rounded-md transition-all duration-150 ease-in-out shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1"
          >
            {getButtonText()}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;