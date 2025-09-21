import React from 'react';
import { Link } from 'react-router-dom';
import { ListingItem, BookingCategorySlug } from '../../types';
import StarRating from '../StarRating';
import { IconMapPin, IconHeart, IconHeartFilled, IconCheck, IconSparkles } from '../../constants';
import { useCurrency } from '../../contexts/CurrencyProvider';
import { useWishlist } from '../../contexts/WishlistProvider';
import { useToast } from '../../contexts/ToastProvider';

interface ListingRowProps {
  item: ListingItem;
  categorySlug: BookingCategorySlug;
}

const ListingRow: React.FC<ListingRowProps> = ({ item, categorySlug }) => {
  const { formatPrice } = useCurrency();
  const { isWishlisted, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToast } = useToast();

  const isItemWishlisted = isWishlisted(item.id);

  const getPriceDisplay = () => {
    if (item.pricePerNight != null) return { price: formatPrice(item.pricePerNight, item.currency), unit: '/night' };
    if (item.price != null) return { price: formatPrice(item.price, item.currency), unit: '' };
    return { price: 'N/A', unit: '' };
  };

  const getLinkTo = () => {
    if (categorySlug === BookingCategorySlug.Hospitals) return `/hospital/${item.id}`;
    if (categorySlug === BookingCategorySlug.WeddingsEvents) return `/wedding/${item.id}`;
    return `/item/${categorySlug}/${item.id}`;
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isItemWishlisted) {
      removeFromWishlist(item.id);
      addToast('Removed from wishlist', 'info');
    } else {
      addToWishlist(item.id);
      addToast('Added to wishlist!', 'success');
    }
  };

  const { price, unit } = getPriceDisplay();

  return (
    <div className="bg-white dark:bg-neutral-d-light/50 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-card-hover dark:hover:shadow-dark-interactive flex flex-col sm:flex-row group transform hover:-translate-y-1 focus-within:shadow-interactive dark:border dark:border-neutral-d-extralight/50 relative">
      {item.isPromoted && (
        <div className="absolute top-3 left-3 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full z-10 flex items-center shadow-md">
          <IconSparkles className="w-3 h-3 mr-1.5" />
          PROMOTED
        </div>
      )}
      <Link to={getLinkTo()} className="sm:w-1/3 flex-shrink-0">
        <div className="relative aspect-video sm:aspect-square h-full">
          <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
        </div>
      </Link>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start">
          <div>
            <Link to={getLinkTo()}>
              <h3 className="text-xl font-bold text-neutral-dark dark:text-neutral-d-dark group-hover:text-primary dark:group-hover:text-accent-light transition-colors">{item.name}</h3>
            </Link>
            {item.location && (
              <div className="flex items-center text-xs text-neutral-DEFAULT dark:text-neutral-d-DEFAULT mt-1">
                <IconMapPin className="w-3.5 h-3.5 mr-1.5" />
                <span>{item.location}</span>
              </div>
            )}
          </div>
          <button onClick={handleWishlistClick} className="p-1.5 rounded-full text-neutral-DEFAULT/70 hover:text-red-500 transition-colors z-10" aria-label="Add to wishlist">
            {isItemWishlisted ? <IconHeartFilled className="w-6 h-6 text-red-500" /> : <IconHeart className="w-6 h-6" />}
          </button>
        </div>
        <div className="flex items-center my-2">
            <StarRating rating={item.rating} />
            <span className="text-sm text-neutral-DEFAULT dark:text-neutral-d-DEFAULT ml-2">({item.rating.toFixed(1)})</span>
        </div>
        <p className="text-sm text-neutral-DEFAULT dark:text-neutral-d-DEFAULT my-3 line-clamp-2 flex-grow">{item.description}</p>
        
        {item.features && item.features.length > 0 && (
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs my-2">
                {item.features.slice(0, 3).map(feature => (
                    <span key={feature} className="flex items-center"><IconCheck className="w-3.5 h-3.5 mr-1 text-green-500" /> {feature}</span>
                ))}
            </div>
        )}

        <div className="flex justify-between items-end mt-auto pt-4 border-t border-neutral-extralight/70 dark:border-neutral-d-extralight/70">
          <div>
            <p className="text-2xl font-bold text-primary dark:text-accent-light">{price}</p>
            <p className="text-xs text-neutral-DEFAULT dark:text-neutral-d-DEFAULT">{unit}</p>
          </div>
          <Link to={getLinkTo()} className="bg-accent hover:bg-accent-dark text-white font-semibold py-2 px-5 rounded-md transition-colors">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListingRow;