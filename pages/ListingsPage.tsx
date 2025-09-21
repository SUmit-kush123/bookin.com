import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import ListingCard from '../components/ListingCard';
import ListingRow from '../components/listings/ListingRow';
import { IconChevronLeft, CATEGORY_ICONS, IconTicket, IconXCircle, IconSearch, IconSparkles, IconLayoutDashboard, IconMap, IconWandSparkles } from '../constants';
import { BookingCategory, BookingCategorySlug, ListingItem, PropertyType } from '../types';
import { bookingCategoriesData } from '../data/mockData';
import { useListings } from '../contexts/ListingsProvider';
import FilterSidebar from '../components/listings/FilterSidebar';
import SkeletonLoader from '../components/ui/SkeletonLoader';
import MapComponent from '../components/MapComponent';
import ReactDOMServer from 'react-dom/server';
import MapPopupCard from '../components/listings/MapPopupCard';
import SearchBar from '../components/SearchBar';
import { GoogleGenAI, Type } from '@google/genai';
import { useHistory } from '../contexts/HistoryProvider';
import { useCurrency } from '../contexts/CurrencyProvider';

type LayoutView = 'grid' | 'list' | 'map';

const propertyTypesList: PropertyType[] = ['hotel', 'apartment', 'resort', 'villa', 'guesthouse', 'b&b'];

const ListingsPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: BookingCategorySlug }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { listings: allListings, isLoading: isLoadingListings, error: listingsError } = useListings();
  const { addSearchToHistory } = useHistory();
  const { formatPrice, convertToBase } = useCurrency();

  const [category, setCategory] = useState<Omit<BookingCategory, 'icon'> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [layout, setLayout] = useState<LayoutView>('grid');
  const [isAiSearching, setIsAiSearching] = useState(false);
  const [aiSearchError, setAiSearchError] = useState('');

  // Filter states initialized from URL parameters
  const [priceRange, setPriceRange] = useState({ min: 0, max: Number(searchParams.get('maxPrice')) || 2000 });
  const [selectedRatings, setSelectedRatings] = useState<number[]>(searchParams.getAll('rating').map(Number));
  const [amenitySearchTerm, setAmenitySearchTerm] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(searchParams.getAll('amenity'));
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<PropertyType[]>(searchParams.getAll('propertyType') as PropertyType[]);
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'rating_desc');
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const allAmenities = useMemo(() => {
    if (!category || !allListings) return [];
    const amenitiesSet = new Set<string>();
    allListings
      .filter(item => item.categoryId === category.id && item.features)
      .forEach(item => {
        item.features!.forEach(feature => amenitiesSet.add(feature));
      });
    return Array.from(amenitiesSet).sort();
  }, [allListings, category]);
  
  useEffect(() => {
    if (!categorySlug) {
      setError("Category not specified.");
      return;
    }
    const currentCategory = bookingCategoriesData.find(c => c.slug === categorySlug);
    if (!currentCategory) {
      setError(`Category "${categorySlug}" not found.`);
      setCategory(null);
    } else {
      setCategory(currentCategory);
    }
  }, [categorySlug]);

  // Sync all filter state changes back to URL params for shareability
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    
    newParams.delete('propertyType');
    selectedPropertyTypes.forEach(pt => newParams.append('propertyType', pt));
    
    newParams.delete('amenity');
    selectedAmenities.forEach(am => newParams.append('amenity', am));

    newParams.delete('rating');
    selectedRatings.forEach(r => newParams.append('rating', String(r)));
    
    if (sortBy !== 'rating_desc') newParams.set('sortBy', sortBy); else newParams.delete('sortBy');
    if (priceRange.max !== 2000) newParams.set('maxPrice', String(priceRange.max)); else newParams.delete('maxPrice');
    
    setSearchParams(newParams, { replace: true });
  }, [selectedPropertyTypes, selectedAmenities, selectedRatings, sortBy, priceRange, setSearchParams]);


  const filteredAndSortedItems = useMemo(() => {
    if (!category || !allListings) return [];

    let filtered = allListings.filter(item => {
      if(item.categoryId !== category.id) return false;
      
      const searchTerm = searchParams.get('query')?.toLowerCase() || '';
      
      const matchesSearch = !searchTerm ||
        item.name.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        (item.location && item.location.toLowerCase().includes(searchTerm));
      
      const matchesPropertyType = selectedPropertyTypes.length === 0 || (item.propertyType && selectedPropertyTypes.includes(item.propertyType));
      const matchesAmenities = selectedAmenities.length === 0 || (item.features && selectedAmenities.every(amenity => item.features!.includes(amenity)));
      const matchesRating = selectedRatings.length === 0 || selectedRatings.includes(Math.floor(item.rating));
      
      const priceInBase = convertToBase(item.pricePerNight ?? item.pricePerPerson ?? item.price ?? Infinity, item.currency);
      const matchesPrice = priceInBase <= priceRange.max;

      return matchesSearch && matchesPropertyType && matchesRating && matchesAmenities && matchesPrice;
    });

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
  }, [allListings, category, searchParams, selectedRatings, sortBy, priceRange, selectedPropertyTypes, selectedAmenities, convertToBase]);
  
  const mapMarkers = useMemo(() => {
      return filteredAndSortedItems
        .filter(item => item.coordinates)
        .map(item => ({
            position: [item.coordinates!.lat, item.coordinates!.lng] as [number, number],
            popupContent: ReactDOMServer.renderToString(
              <MapPopupCard item={item} categorySlug={categorySlug as BookingCategorySlug} />
            )
        }));
  }, [filteredAndSortedItems, categorySlug]);

  const handleAiSearch = async (query: string) => {
    addSearchToHistory(query);
    setIsAiSearching(true);
    setAiSearchError('');
    try {
        const schema = {
            type: Type.OBJECT,
            properties: {
                location: { type: Type.STRING, description: 'The city, region, or area to search in.'},
                propertyTypes: { type: Type.ARRAY, description: `Valid options: ${propertyTypesList.join(', ')}.`, items: { type: Type.STRING }},
                amenities: { type: Type.ARRAY, description: 'Specific features requested.', items: { type: Type.STRING }},
                startDate: { type: Type.STRING, description: "Start date in YYYY-MM-DD format." },
                endDate: { type: Type.STRING, description: "End date in YYYY-MM-DD format." },
                guests: { type: Type.INTEGER, description: "Number of guests." }
            }
        };
        const prompt = `Parse the user's travel query. Extract location, property types, amenities, dates, and guest count. Today is ${new Date().toISOString().split('T')[0]}. Query: "${query}"`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: { responseMimeType: 'application/json', responseSchema: schema },
        });

        const parsed = JSON.parse(response.text);
        const newParams = new URLSearchParams();
        if (parsed.location) newParams.set('query', parsed.location);
        if (parsed.startDate) newParams.set('startDate', parsed.startDate);
        if (parsed.endDate) newParams.set('endDate', parsed.endDate);
        if (parsed.guests) newParams.set('guests', parsed.guests.toString());
        if (parsed.propertyTypes) parsed.propertyTypes.forEach((pt: string) => newParams.append('propertyType', pt.toLowerCase()));
        if (parsed.amenities) parsed.amenities.forEach((am: string) => newParams.append('amenity', am));
        setSearchParams(newParams);

    } catch (err) {
        console.error("AI Search Error:", err);
        setAiSearchError("The AI couldn't process that request. Please try a simpler search term.");
    } finally {
        setIsAiSearching(false);
    }
  };
  
  const handleResetFilters = () => {
    setPriceRange({ min: 0, max: 2000 });
    setSelectedRatings([]);
    setSelectedPropertyTypes([]);
    setSelectedAmenities([]);
    setAmenitySearchTerm('');
    setSortBy('rating_desc');
  };

  const currentError = error || listingsError;
  
  if (currentError || !category && !isLoadingListings) {
     return (
      <div className="text-center py-20">
        <IconXCircle className="w-16 h-16 text-danger mx-auto mb-4" />
        <h1 className="text-2xl font-semibold text-red-600 mb-2">Error Loading Category</h1>
        <p className="text-neutral-DEFAULT dark:text-neutral-d-DEFAULT max-w-md mx-auto">{currentError || `The category "${categorySlug}" could not be found.`}</p>
        <Link to="/" className="text-primary hover:underline mt-6 inline-block bg-primary/10 px-4 py-2 rounded-md">Go to Homepage</Link>
      </div>
    );
  }
  
  const CategoryIconComponent = category ? CATEGORY_ICONS[category.slug] : IconTicket;
  
  const query = searchParams.get('query');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const guests = searchParams.get('guests');

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4">
        <div className="my-6 md:my-8">
          <Link to="/" className="inline-flex items-center text-primary dark:text-accent-light hover:text-primary-dark dark:hover:text-accent transition-colors group text-sm">
            <IconChevronLeft className="w-4 h-4 mr-1 transition-transform duration-150 group-hover:-translate-x-0.5" />
            Back to Homepage
          </Link>
        </div>

        <div className="mb-8">
          <SearchBar onAiSearch={handleAiSearch} isAiSearching={isAiSearching} />
          {aiSearchError && <p className="text-center text-sm text-red-600 mt-2">{aiSearchError}</p>}
        </div>
        
        {(query || startDate || guests) && (
            <div className="mb-6 p-4 bg-primary/10 dark:bg-accent/10 rounded-lg border border-primary/20 dark:border-accent/20 text-sm text-primary-dark dark:text-accent-light flex flex-wrap items-center justify-between gap-2">
                <p>
                    Showing results for:
                    {query && <strong className="mx-1.5">{query}</strong>}
                    {startDate && <>from <strong className="mx-1.5">{startDate}</strong></>}
                    {endDate && <>to <strong className="mx-1.5">{endDate}</strong></>}
                    {guests && <>for <strong className="mx-1.5">{guests} guest(s)</strong></>}
                </p>
                <button onClick={() => setSearchParams({})} className="font-bold underline text-xs">Clear Search</button>
            </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <FilterSidebar 
            priceRange={priceRange} setPriceRange={setPriceRange}
            selectedRatings={selectedRatings} setSelectedRatings={setSelectedRatings}
            selectedPropertyTypes={selectedPropertyTypes} setSelectedPropertyTypes={setSelectedPropertyTypes}
            sortBy={sortBy} setSortBy={setSortBy}
            allAmenities={allAmenities} selectedAmenities={selectedAmenities} setSelectedAmenities={setSelectedAmenities}
            amenitySearchTerm={amenitySearchTerm} setAmenitySearchTerm={setAmenitySearchTerm}
            formatPrice={formatPrice}
            onReset={handleResetFilters}
          />
          <main className="lg:col-span-3">
            <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-neutral-dark dark:text-neutral-d-dark flex items-center gap-3">
                  <CategoryIconComponent className="w-8 h-8 text-primary dark:text-accent-light" />
                  <span>{category?.name || 'Listings'}</span>
                </h1>
                <p className="text-neutral-DEFAULT dark:text-neutral-d-DEFAULT text-sm mt-1">
                  {isLoadingListings ? 'Searching...' : `${filteredAndSortedItems.length} results found`}
                </p>
              </div>
              <div className="flex items-center gap-2">
                   <div className="flex items-center bg-secondary dark:bg-neutral-d-extralight rounded-lg p-1">
                        <button onClick={() => setLayout('grid')} className={`p-1.5 rounded-md ${layout === 'grid' ? 'bg-white dark:bg-neutral-d-light shadow' : ''}`} aria-label="Grid View">
                            <IconLayoutDashboard className="w-5 h-5 text-neutral-dark dark:text-neutral-d-dark" />
                        </button>
                        <button onClick={() => setLayout('list')} className={`p-1.5 rounded-md ${layout === 'list' ? 'bg-white dark:bg-neutral-d-light shadow' : ''}`} aria-label="List View">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-neutral-dark dark:text-neutral-d-dark"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
                        </button>
                        <button onClick={() => setLayout('map')} className={`p-1.5 rounded-md ${layout === 'map' ? 'bg-white dark:bg-neutral-d-light shadow' : ''}`} aria-label="Map View">
                            <IconMap className="w-5 h-5 text-neutral-dark dark:text-neutral-d-dark" />
                        </button>
                   </div>
              </div>
            </header>
            
            {isLoadingListings ? (
               <div className={`grid gap-6 md:gap-8 ${layout === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                {[...Array(6)].map((_, i) => <SkeletonLoader key={i} type="card" />)}
               </div>
            ) : layout === 'map' ? (
                <div className="h-[60vh] w-full rounded-lg overflow-hidden shadow-lg border border-neutral-extralight dark:border-neutral-d-extralight">
                    <MapComponent center={mapMarkers[0]?.position || [27.7172, 85.3240]} zoom={12} markers={mapMarkers} />
                </div>
            ) : filteredAndSortedItems.length > 0 ? (
               <div className={`grid gap-6 md:gap-8 ${layout === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                {filteredAndSortedItems.map((item) => (
                  <div key={item.id}>
                    {layout === 'list' ? 
                        <ListingRow item={item} categorySlug={categorySlug as BookingCategorySlug} /> :
                        <ListingCard item={item} categorySlug={categorySlug as BookingCategorySlug} />
                    }
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 md:py-20 bg-white dark:bg-neutral-d-light/50 rounded-xl shadow-lg border border-neutral-extralight/60 dark:border-neutral-d-extralight/60">
                <IconSearch className="w-20 h-20 md:w-24 md:h-24 text-neutral-DEFAULT opacity-50 dark:text-neutral-d-DEFAULT mx-auto mb-6" />
                <h2 className="text-2xl font-semibold text-neutral-dark dark:text-neutral-d-dark mb-4">No listings match your criteria.</h2>
                <p className="text-neutral-DEFAULT dark:text-neutral-d-DEFAULT mb-8 max-w-md mx-auto">
                  Try adjusting your filters or search term to find what you're looking for.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ListingsPage;