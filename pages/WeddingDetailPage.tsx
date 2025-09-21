import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactDOMServer from 'react-dom/server';
import { IconChevronLeft, IconMapPin, IconXCircle, IconCheck, IconHeart, IconPhoto, IconChevronRight } from '../constants';
import { ListingItem, WeddingService, WeddingPackage } from '../types';
import StarRating from '../components/StarRating';
import MapComponent from '../components/MapComponent';
import WeddingInquiryForm from '../components/WeddingInquiryForm';
import { useListings } from '../contexts/ListingsProvider';
import { useCurrency } from '../contexts/CurrencyProvider';
import GalleryModal from '../components/ui/GalleryModal';
import SkeletonLoader from '../components/ui/SkeletonLoader';
import { useRecentlyViewed } from '../contexts/RecentlyViewedProvider';
import AIReviewSummary from '../components/ai/AIReviewSummary';

const WeddingDetailPage: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const { getListingById, isLoading: isLoadingListings } = useListings();
  const { addRecentlyViewed } = useRecentlyViewed();
  const [venue, setVenue] = useState<ListingItem | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { formatPrice } = useCurrency();
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  useEffect(() => {
    if (!itemId) {
      setError("Missing venue ID.");
      return;
    }
    if (!isLoadingListings) {
        const venueData = getListingById(itemId);
        if (venueData && venueData.categoryId === 'cat-weddings') {
            setVenue(venueData);
            addRecentlyViewed(itemId);
        } else {
            setError(`Wedding venue with ID "${itemId}" not found.`);
        }
    }
  }, [itemId, getListingById, isLoadingListings, addRecentlyViewed]);
  
  const nextImage = () => venue && setCurrentImageIndex((prev) => (prev + 1) % venue.images.length);
  const prevImage = () => venue && setCurrentImageIndex((prev) => (prev - 1 + venue.images.length) % venue.images.length);


  if (isLoadingListings) {
    return (
        <div className="container mx-auto px-4 py-8">
            <SkeletonLoader type="text" className="w-1/4 h-6 mb-8" />
             <div className="space-y-8">
                <SkeletonLoader type="card" className="h-96"/>
                <SkeletonLoader type="card" className="h-64"/>
             </div>
        </div>
    );
  }

  if (error || !venue) {
    return (
      <div className="text-center py-20">
        <IconXCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-semibold text-red-600 mb-2">Error Loading Venue</h1>
        <p className="text-neutral-DEFAULT dark:text-neutral-d-DEFAULT max-w-md mx-auto">{error || 'Venue data could not be loaded.'}</p>
        <Link to="/listings/weddings-events" className="text-primary hover:underline mt-6 inline-block bg-primary/10 px-4 py-2 rounded-md">Back to Venues</Link>
      </div>
    );
  }

  return (
    <>
    {isGalleryOpen && venue && (
        <GalleryModal 
            images={venue.images}
            videoUrl={venue.videoUrl}
            initialIndex={currentImageIndex}
            onClose={() => setIsGalleryOpen(false)}
        />
    )}
    <div className="pb-8 md:pb-12">
      <div className="container mx-auto px-4">
        <div className="my-6 md:my-8">
            <Link 
            to="/listings/weddings-events" 
            className="inline-flex items-center text-primary dark:text-accent-light hover:text-primary-dark dark:hover:text-accent transition-colors group text-sm"
            >
            <IconChevronLeft className="w-4 h-4 mr-1 transition-transform duration-150 group-hover:-translate-x-0.5" />
            Back to Weddings & Events
            </Link>
        </div>

        <header className="mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-dark dark:text-neutral-d-dark mb-2">{venue.name}</h1>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-neutral-DEFAULT dark:text-neutral-d-DEFAULT">
            {venue.rating > 0 && <div className="flex items-center"><StarRating rating={venue.rating} size="md" /><span className="ml-2">({venue.rating.toFixed(1)} rating, {venue.reviews.length} reviews)</span></div>}
            {venue.location && <div className="flex items-center"><IconMapPin className="w-4 h-4 mr-1.5 text-accent"/>{venue.location}</div>}
          </div>
        </header>

        <div className="relative aspect-video lg:aspect-[2.5/1] group bg-secondary dark:bg-neutral-d-extralight rounded-xl shadow-xl overflow-hidden mb-8 md:mb-12 cursor-pointer" onClick={() => setIsGalleryOpen(true)}>
            <img src={venue.images[currentImageIndex]} alt={`${venue.name} - view ${currentImageIndex + 1}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
            {venue.images.length > 1 && (
                <>
                    <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/40 text-white p-2.5 rounded-full hover:bg-black/70 transition-colors opacity-0 group-hover:opacity-100"><IconChevronLeft className="w-6 h-6" /></button>
                    <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/40 text-white p-2.5 rounded-full hover:bg-black/70 transition-colors opacity-0 group-hover:opacity-100"><IconChevronRight className="w-6 h-6" /></button>
                </>
            )}
            <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded-md pointer-events-none">Click to view gallery</div>
        </div>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            <div className="lg:col-span-2 space-y-8 md:space-y-12">
                <section>
                    <h2 className="text-2xl font-bold text-neutral-dark dark:text-neutral-d-dark mb-4">About {venue.name}</h2>
                    <p className="prose prose-sm dark:prose-invert max-w-none text-neutral-dark dark:text-neutral-d-dark leading-relaxed">{venue.description}</p>
                </section>
                
                {venue.weddingServices && venue.weddingServices.length > 0 && (
                  <section>
                    <h2 className="text-2xl font-bold text-neutral-dark dark:text-neutral-d-dark mb-6 flex items-center"><IconHeart className="w-7 h-7 mr-3 text-accent"/>Services Included</h2>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                      {venue.weddingServices.map((service) => (
                        <div key={service.id} className="flex items-center text-neutral-dark dark:text-neutral-d-dark">
                          <IconCheck className="w-6 h-6 mr-3 text-primary dark:text-accent-light flex-shrink-0" />
                          <span>{service.name}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {venue.packages && venue.packages.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-bold text-neutral-dark dark:text-neutral-d-dark mb-6 flex items-center"><IconPhoto className="w-7 h-7 mr-3 text-accent"/>Wedding Packages</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {venue.packages.map(pkg => (
                                <div key={pkg.id} className="bg-white dark:bg-neutral-d-light/50 border border-primary/20 dark:border-primary/30 rounded-lg shadow-lg p-6 flex flex-col hover:border-primary dark:hover:border-accent transition-all">
                                    <h3 className="text-xl font-semibold text-primary dark:text-accent-light mb-2">{pkg.name}</h3>
                                    <p className="font-bold text-2xl text-neutral-dark dark:text-neutral-d-dark mb-4">{formatPrice(pkg.price, venue.currency)}</p>
                                    <ul className="space-y-2 text-sm text-neutral-DEFAULT dark:text-neutral-d-DEFAULT flex-grow">
                                        {pkg.features.map((feat, i) => <li key={i} className="flex items-start"><IconCheck className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0"/>{feat}</li>)}
                                    </ul>
                                    <button onClick={() => document.getElementById('inquiry-form')?.scrollIntoView({behavior: 'smooth'})} className="mt-6 w-full bg-accent hover:bg-accent-dark text-white font-medium py-2 rounded-md transition-colors">Inquire about this Package</button>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
                
                {venue.reviews.length > 0 && (
                     <section className="bg-white dark:bg-neutral-d-light/50 rounded-xl shadow-xl p-6 md:p-8 border border-neutral-extralight/60 dark:border-neutral-d-extralight/60">
                        <AIReviewSummary reviews={venue.reviews} />
                     </section>
                )}
            </div>

            <aside className="lg:col-span-1 space-y-8 sticky top-24 self-start">
                <div id="inquiry-form" className="bg-white dark:bg-neutral-d-light/50 rounded-xl shadow-2xl p-6 border border-neutral-extralight/60 dark:border-neutral-d-extralight/60 scroll-mt-24">
                   <h2 className="text-xl font-bold text-neutral-dark dark:text-neutral-d-dark mb-4 text-center">Plan Your Perfect Day</h2>
                   <WeddingInquiryForm venueName={venue.name} packages={venue.packages || []} />
                </div>

                 {venue.coordinates && (
                    <div className="bg-white dark:bg-neutral-d-light/50 rounded-xl shadow-xl p-4 border border-neutral-extralight/60 dark:border-neutral-d-extralight/60">
                         <h3 className="text-lg font-bold text-neutral-dark dark:text-neutral-d-dark mb-3 text-center">Location</h3>
                        <div className="h-64 w-full rounded-lg overflow-hidden shadow-md border border-neutral-extralight dark:border-neutral-d-extralight">
                            <MapComponent 
                                center={[venue.coordinates.lat, venue.coordinates.lng]} 
                                zoom={14} 
                                markers={[{
                                    position: [venue.coordinates.lat, venue.coordinates.lng],
                                    popupContent: ReactDOMServer.renderToString(<span className="font-semibold">{venue.name}</span>)
                                }]}
                            />
                        </div>
                    </div>
                )}
            </aside>
        </main>
      </div>
    </div>
    </>
  );
};

export default WeddingDetailPage;