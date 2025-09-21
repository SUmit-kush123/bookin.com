import React, { useState, useMemo } from 'react';
import { useListings } from '../contexts/ListingsProvider';
import { ListingItem, PropertyType, BookingCategorySlug } from '../types';
import MapComponent from '../components/MapComponent';
import FilterSidebar from '../components/listings/FilterSidebar';
import { useCurrency } from '../contexts/CurrencyProvider';
import L from 'leaflet';
import { Link } from 'react-router-dom';
import StarRating from '../components/StarRating';
import SkeletonLoader from '../components/ui/SkeletonLoader';
import { IconMap } from '../constants';
import { bookingCategoriesData } from '../data/mockData';

const MapSearchPage: React.FC = () => {
  const { listings, isLoading } = useListings();
  const { formatPrice, convertToBase } = useCurrency();
  const [hoveredListingId, setHoveredListingId] = useState<string | null>(null);
  
  // Filter states
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<PropertyType[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('rating_desc');
  const [amenitySearchTerm, setAmenitySearchTerm] = useState('');

  const allAmenities = useMemo(() => {
    const amenitiesSet = new Set<string>();
    listings
      .filter(item => item.features)
      .forEach(item => {
        item.features!.forEach(feature => amenitiesSet.add(feature));
      });
    return Array.from(amenitiesSet).sort();
  }, [listings]);
  
  const handleResetFilters = () => {
    setPriceRange({ min: 0, max: 2000 });
    setSelectedRatings([]);
    setSelectedPropertyTypes([]);
    setSelectedAmenities([]);
    setAmenitySearchTerm('');
    setSortBy('rating_desc');
  };

  const filteredItems = useMemo(() => {
    let filtered = listings.filter(item => item.coordinates && (
      (selectedPropertyTypes.length === 0 || (item.propertyType && selectedPropertyTypes.includes(item.propertyType))) &&
      (selectedRatings.length === 0 || selectedRatings.includes(Math.floor(item.rating))) &&
      (selectedAmenities.length === 0 || (item.features && selectedAmenities.every(a => item.features!.includes(a)))) &&
      (convertToBase(item.pricePerNight ?? item.price ?? 0, item.currency) <= priceRange.max)
    ));
    
    return filtered.sort((a, b) => {
        if (a.isPromoted && !b.isPromoted) return -1;
        if (!a.isPromoted && b.isPromoted) return 1;

        const priceA_base = convertToBase(a.pricePerNight ?? a.pricePerPerson ?? a.price ?? 0, a.currency);
        const priceB_base = convertToBase(b.pricePerNight ?? b.pricePerPerson ?? b.price ?? 0, b.currency);
        
        switch(sortBy) {
          case 'price_asc': return priceA_base - priceB_base;
          case 'price_desc': return priceB_base - priceA_base;
          case 'rating_desc':
          default:
            return b.rating - a.rating;
        }
    });
  }, [listings, selectedPropertyTypes, selectedRatings, selectedAmenities, priceRange, sortBy, convertToBase]);

  const mapMarkers = useMemo(() => {
    return filteredItems.map(item => {
      const isHovered = item.id === hoveredListingId;
      const price = item.pricePerNight ?? item.price ?? item.pricePerPerson ?? 0;
      const formattedPrice = formatPrice(price, item.currency).replace(/[.,]00$/, '');
      
      const markerHtml = `<div class="price-marker ${isHovered ? 'hovered' : ''}">${formattedPrice}</div>`;

      return {
        id: item.id,
        position: [item.coordinates!.lat, item.coordinates!.lng] as [number, number],
        popupContent: markerHtml, // Popup will now just be the price marker itself
        icon: L.divIcon({
          html: markerHtml,
          className: 'custom-div-icon', // This class is for structure, not styling
          iconSize: L.point(60, 30),
          iconAnchor: L.point(30, 15),
        })
      };
    });
  }, [filteredItems, hoveredListingId, formatPrice]);

  const getCategorySlug = (categoryId: string): BookingCategorySlug => {
      return bookingCategoriesData.find(c => c.id === categoryId)?.slug || BookingCategorySlug.Hotels;
  };

  const getLinkTo = (item: ListingItem) => {
    const categorySlug = getCategorySlug(item.categoryId);
    if (categorySlug === BookingCategorySlug.Hospitals) return `/hospital/${item.id}`;
    if (categorySlug === BookingCategorySlug.WeddingsEvents) return `/wedding/${item.id}`;
    return `/item/${categorySlug}/${item.id}`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[calc(100vh_-_8rem)] -my-6 -mx-4 p-4">
      <style>{`
        .price-marker {
          background-color: white;
          border: 1px solid #ddd;
          border-radius: 15px;
          padding: 4px 8px;
          font-size: 12px;
          font-weight: bold;
          text-align: center;
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
          transition: all 0.2s ease;
          color: #333;
        }
        .price-marker.hovered {
          background-color: hsl(var(--color-primary-DEFAULT));
          color: white;
          transform: scale(1.1);
          border-color: hsl(var(--color-primary-dark));
          z-index: 1000;
        }
      `}</style>

      {/* Filters Column */}
      <div className="lg:col-span-3 h-full overflow-y-auto custom-scrollbar">
        <FilterSidebar
            priceRange={priceRange} setPriceRange={setPriceRange}
            selectedRatings={selectedRatings} setSelectedRatings={setSelectedRatings}
            selectedPropertyTypes={selectedPropertyTypes} setSelectedPropertyTypes={setSelectedPropertyTypes}
            sortBy={sortBy} setSortBy={setSortBy}
            allAmenities={allAmenities} selectedAmenities={selectedAmenities} setSelectedAmenities={setSelectedAmenities}
            amenitySearchTerm={amenitySearchTerm} setAmenitySearchTerm={setAmenitySearchTerm}
            formatPrice={(amount) => formatPrice(amount, 'USD')} // Pass simplified formatPrice
            onReset={handleResetFilters}
          />
      </div>
      
      {/* Listings Column */}
      <div className="lg:col-span-5 h-full flex flex-col bg-white dark:bg-neutral-d-light/50 rounded-xl shadow-lg border border-neutral-extralight/60 dark:border-neutral-d-extralight/60">
        <div className="p-4 border-b border-neutral-extralight dark:border-neutral-d-extralight flex-shrink-0">
          <h1 className="text-xl font-bold flex items-center"><IconMap className="w-6 h-6 mr-2"/> {filteredItems.length} Results Found</h1>
        </div>
        
        <div className="flex-grow overflow-y-auto custom-scrollbar">
            {isLoading ? (
                <div className="p-4 space-y-4">
                    {[...Array(5)].map((_,i) => <SkeletonLoader key={i} type="card" />)}
                </div>
            ) : (
                <div className="divide-y divide-neutral-extralight dark:divide-neutral-d-extralight">
                    {filteredItems.map(item => (
                        <Link 
                            key={item.id}
                            to={getLinkTo(item)}
                            onMouseEnter={() => setHoveredListingId(item.id)}
                            onMouseLeave={() => setHoveredListingId(null)}
                            className={`block p-3 transition-colors ${hoveredListingId === item.id ? 'bg-primary/10 dark:bg-accent/10' : 'hover:bg-secondary/50 dark:hover:bg-neutral-d-extralight/50'}`}
                        >
                            <div className="flex gap-3">
                                <img src={item.images[0]} alt={item.name} className="w-24 h-24 object-cover rounded-md flex-shrink-0"/>
                                <div className="flex flex-col">
                                    <p className="text-xs text-neutral-DEFAULT dark:text-neutral-d-DEFAULT">{item.propertyType || 'Listing'}</p>
                                    <h3 className="font-semibold text-sm text-neutral-dark dark:text-neutral-d-dark leading-tight">{item.name}</h3>
                                    <div className="flex items-center mt-1">
                                      <StarRating rating={item.rating} size="sm"/>
                                      <span className="text-xs ml-1.5">({item.reviews.length})</span>
                                    </div>
                                    <p className="mt-auto text-sm font-bold text-primary dark:text-accent-light">
                                        {formatPrice(item.pricePerNight ?? item.price ?? 0, item.currency)}
                                        <span className="font-normal text-xs">{item.pricePerNight ? '/night' : ''}</span>
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
      </div>
      
      {/* Map Column */}
      <div className="lg:col-span-4 h-full rounded-xl shadow-lg overflow-hidden border border-neutral-extralight/60 dark:border-neutral-d-extralight/60">
        <MapComponent
          center={[27.7172, 85.3240]} // Default to Kathmandu
          zoom={12}
          markers={mapMarkers}
        />
      </div>
    </div>
  );
};

export default MapSearchPage;