
import React, { useMemo } from 'react';
import { IconFilter, IconStar, IconDollarSign, IconSortAscending, PROPERTY_TYPE_ICONS, IconSearch } from '../../constants';
import { PropertyType, Currency } from '../../types';
import AdPlaceholder from '../ui/AdPlaceholder';

interface FilterSidebarProps {
  priceRange: { min: number; max: number };
  setPriceRange: (value: { min: number; max: number }) => void;
  selectedRatings: number[];
  setSelectedRatings: (ratings: number[]) => void;
  selectedPropertyTypes: PropertyType[];
  setSelectedPropertyTypes: (types: PropertyType[]) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  allAmenities: string[];
  selectedAmenities: string[];
  setSelectedAmenities: (amenities: string[]) => void;
  amenitySearchTerm: string;
  setAmenitySearchTerm: (term: string) => void;
  formatPrice: (amount: number, fromCurrency: Currency) => string;
  onReset: () => void;
}

const propertyTypes: PropertyType[] = ['hotel', 'apartment', 'resort', 'villa', 'guesthouse', 'b&b'];

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  priceRange, setPriceRange, selectedRatings, setSelectedRatings, selectedPropertyTypes, setSelectedPropertyTypes, sortBy, setSortBy, allAmenities, selectedAmenities, setSelectedAmenities, amenitySearchTerm, setAmenitySearchTerm, formatPrice, onReset
}) => {

  const handleRatingChange = (rating: number) => {
    setSelectedRatings(
      selectedRatings.includes(rating)
        ? selectedRatings.filter(r => r !== rating)
        : [...selectedRatings, rating]
    );
  };
  
  const handlePropertyTypeChange = (type: PropertyType) => {
    setSelectedPropertyTypes(
      selectedPropertyTypes.includes(type)
        ? selectedPropertyTypes.filter(t => t !== type)
        : [...selectedPropertyTypes, type]
    );
  };
  
  const handleAmenityChange = (amenity: string) => {
    setSelectedAmenities(
        selectedAmenities.includes(amenity)
        ? selectedAmenities.filter(a => a !== amenity)
        : [...selectedAmenities, amenity]
    );
  };
  
  const filteredAmenities = useMemo(() => {
    return allAmenities.filter(amenity => 
      amenity.toLowerCase().includes(amenitySearchTerm.toLowerCase())
    );
  }, [allAmenities, amenitySearchTerm]);

  return (
    <aside className="lg:col-span-1 bg-white dark:bg-neutral-d-light/50 p-6 rounded-xl shadow-lg border border-neutral-extralight/60 dark:border-neutral-d-extralight/60 self-start sticky top-24">
        <div>
            <h2 className="text-xl font-bold text-neutral-dark dark:text-neutral-d-dark mb-4 flex items-center">
                <IconFilter className="w-6 h-6 mr-2 text-primary dark:text-accent" />
                Filter & Sort
            </h2>

            {/* Sort By */}
            <div className="mb-6">
                <label htmlFor="sort-by" className="block text-sm font-semibold text-neutral-dark dark:text-neutral-d-dark mb-2">Sort by</label>
                <div className="relative">
                    <IconSortAscending className="w-4 h-4 absolute top-1/2 left-3 -translate-y-1/2 text-neutral-DEFAULT dark:text-neutral-d-DEFAULT pointer-events-none" />
                    <select
                        id="sort-by"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 border border-neutral-extralight dark:border-neutral-d-extralight rounded-md focus:ring-2 focus:ring-primary dark:focus:ring-accent outline-none text-sm bg-white dark:bg-neutral-d-light/50 appearance-none"
                    >
                        <option value="rating_desc">Top Rated</option>
                        <option value="price_asc">Price (low to high)</option>
                        <option value="price_desc">Price (high to low)</option>
                    </select>
                </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
                <label htmlFor="price-range" className="block text-sm font-semibold text-neutral-dark dark:text-neutral-d-dark mb-2">
                    Max Price: <span className="font-bold text-primary dark:text-accent-light">{formatPrice(priceRange.max, 'USD')}</span>
                </label>
                <input
                    type="range"
                    id="price-range"
                    min="50"
                    max="2000"
                    step="10"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value, 10) })}
                    className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer dark:bg-neutral-d-extralight"
                />
            </div>

            {/* Star Rating */}
            <div className="mb-6">
                <h3 className="block text-sm font-semibold text-neutral-dark dark:text-neutral-d-dark mb-2">Star rating</h3>
                <div className="space-y-2">
                {[5, 4, 3, 2, 1].map(rating => (
                    <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={selectedRatings.includes(rating)}
                        onChange={() => handleRatingChange(rating)}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="flex items-center text-sm">
                        {[...Array(rating)].map((_, i) => <IconStar key={i} className="w-4 h-4 text-amber-400" />)}
                    </span>
                    </label>
                ))}
                </div>
            </div>
            
            {/* Property Type */}
            <div className="mb-6">
                <h3 className="block text-sm font-semibold text-neutral-dark dark:text-neutral-d-dark mb-2">Property type</h3>
                <div className="space-y-2">
                {propertyTypes.map(type => {
                    const Icon = PROPERTY_TYPE_ICONS[type];
                    return (
                        <label key={type} className="flex items-center space-x-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={selectedPropertyTypes.includes(type)}
                            onChange={() => handlePropertyTypeChange(type)}
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <Icon className="w-4 h-4 text-neutral-DEFAULT dark:text-neutral-d-DEFAULT" />
                        <span className="text-sm capitalize">{type}</span>
                        </label>
                    )
                })}
                </div>
            </div>

            {/* Amenities */}
            {allAmenities.length > 0 && (
                 <div>
                    <h3 className="block text-sm font-semibold text-neutral-dark dark:text-neutral-d-dark mb-2">Amenities</h3>
                    <div className="relative mb-2">
                        <IconSearch className="w-4 h-4 absolute top-1/2 left-3 -translate-y-1/2 text-neutral-DEFAULT pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Search amenities..."
                            value={amenitySearchTerm}
                            onChange={(e) => setAmenitySearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-1.5 border border-neutral-extralight dark:border-neutral-d-extralight rounded-md focus:ring-2 focus:ring-primary dark:focus:ring-accent outline-none text-sm bg-white dark:bg-neutral-d-light/50"
                        />
                    </div>
                    <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar pr-2">
                    {filteredAmenities.map(amenity => (
                        <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={selectedAmenities.includes(amenity)}
                            onChange={() => handleAmenityChange(amenity)}
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <span className="text-sm">{amenity}</span>
                        </label>
                    ))}
                    </div>
                </div>
            )}
        </div>
        
        {/* Ad Placeholder and Reset */}
        <div className="mt-8 pt-6 border-t border-dashed border-neutral-extralight/70 dark:border-neutral-d-extralight/70 space-y-6">
             <button
                onClick={onReset}
                className="w-full text-center bg-secondary dark:bg-neutral-d-extralight hover:bg-secondary-dark dark:hover:bg-neutral-d-extralight/70 text-neutral-dark dark:text-neutral-d-dark font-medium py-2 px-4 rounded-lg transition-colors text-sm"
            >
                Reset Filters
            </button>
            <AdPlaceholder type="sidebar-skyscraper" />
        </div>
    </aside>
  );
};

export default FilterSidebar;