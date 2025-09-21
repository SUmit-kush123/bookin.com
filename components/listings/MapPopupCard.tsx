import React from 'react';
import { Link } from 'react-router-dom';
import { ListingItem, BookingCategorySlug } from '../../types';
import { useCurrency } from '../../contexts/CurrencyProvider';

interface MapPopupCardProps {
  item: ListingItem;
  categorySlug: BookingCategorySlug;
}

const MapPopupCard: React.FC<MapPopupCardProps> = ({ item, categorySlug }) => {
  const { formatPrice } = useCurrency();

  const getPriceDisplay = () => {
    if (item.pricePerNight != null) return `${formatPrice(item.pricePerNight, item.currency)}/night`;
    if (item.price != null) return formatPrice(item.price, item.currency);
    return 'N/A';
  };

  const linkTo = `/item/${categorySlug}/${item.id}`;

  return (
    <div className="w-48">
      <Link to={linkTo} target="_blank" rel="noopener noreferrer">
        <img src={item.images[0]} alt={item.name} className="w-full h-24 object-cover rounded-t-md" />
      </Link>
      <div className="p-2">
        <Link to={linkTo} target="_blank" rel="noopener noreferrer">
          <h4 className="font-bold text-sm truncate text-neutral-dark hover:text-primary">{item.name}</h4>
        </Link>
        <div className="flex justify-between items-center mt-1">
          <p className="text-xs font-semibold text-primary">{getPriceDisplay()}</p>
          <Link to={linkTo} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-accent hover:underline">
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MapPopupCard;