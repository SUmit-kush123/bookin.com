import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactDOMServer from 'react-dom/server';
import { IconChevronLeft, IconMapPin, IconXCircle, IconStethoscope, IconBuilding, IconChevronRight, IconCheck } from '../constants';
import { ListingItem, Department, Doctor, Facility } from '../types';
import StarRating from '../components/StarRating';
import MapComponent from '../components/MapComponent';
import AppointmentForm from '../components/AppointmentForm';
import { useListings } from '../contexts/ListingsProvider';
import { useCurrency } from '../contexts/CurrencyProvider';
import GalleryModal from '../components/ui/GalleryModal';
import SkeletonLoader from '../components/ui/SkeletonLoader';
import { useRecentlyViewed } from '../contexts/RecentlyViewedProvider';
import AIReviewSummary from '../components/ai/AIReviewSummary';

const AccordionItem: React.FC<{ title: string; children: React.ReactNode; defaultOpen?: boolean }> = ({ title, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div className="border-b border-neutral-extralight dark:border-neutral-d-extralight">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center py-4 px-2 text-left">
                <h3 className="text-lg font-semibold text-neutral-dark dark:text-neutral-d-dark">{title}</h3>
                <IconChevronLeft className={`w-5 h-5 transition-transform duration-200 ${isOpen ? '-rotate-90' : 'rotate-0'}`} />
            </button>
            {isOpen && <div className="p-4 bg-neutral-light/50 dark:bg-neutral-d-light/30 rounded-b-lg">{children}</div>}
        </div>
    );
};

const HospitalDetailPage: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const { getListingById, isLoading: isLoadingListings } = useListings();
  const { addRecentlyViewed } = useRecentlyViewed();
  const [hospital, setHospital] = useState<ListingItem | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [bookingTarget, setBookingTarget] = useState<{ type: 'doctor' | 'facility'; data: Doctor | Facility, department?: Department } | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { formatPrice } = useCurrency();
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  useEffect(() => {
    if (!itemId) {
      setError("Missing hospital ID.");
      return;
    }

    if (!isLoadingListings) {
      const hospitalData = getListingById(itemId);
      if (hospitalData && hospitalData.categoryId === 'cat-hospitals') {
        setHospital(hospitalData);
        addRecentlyViewed(itemId);
      } else {
        setError(`Hospital with ID "${itemId}" not found.`);
      }
    }
  }, [itemId, getListingById, isLoadingListings, addRecentlyViewed]);
  
  const nextImage = () => hospital && setCurrentImageIndex((prev) => (prev + 1) % hospital.images.length);
  const prevImage = () => hospital && setCurrentImageIndex((prev) => (prev - 1 + hospital.images.length) % hospital.images.length);


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

  if (error || !hospital) {
    return (
      <div className="text-center py-20">
        <IconXCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-semibold text-red-600 mb-2">Error Loading Hospital</h1>
        <p className="text-neutral-DEFAULT dark:text-neutral-d-DEFAULT max-w-md mx-auto">{error || 'Hospital data could not be loaded.'}</p>
        <Link to="/listings/hospitals" className="text-primary hover:underline mt-6 inline-block bg-primary/10 px-4 py-2 rounded-md">Back to Hospitals</Link>
      </div>
    );
  }

  const handleBookClick = (type: 'doctor' | 'facility', data: Doctor | Facility, department?: Department) => {
    setBookingTarget({ type, data, department });
    document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <>
    {isGalleryOpen && hospital && (
        <GalleryModal 
          images={hospital.images}
          videoUrl={hospital.videoUrl}
          initialIndex={currentImageIndex}
          onClose={() => setIsGalleryOpen(false)}
        />
    )}
    <div className="pb-8 md:pb-12">
      <div className="container mx-auto px-4">
        <div className="my-6 md:my-8">
            <Link 
            to="/listings/hospitals" 
            className="inline-flex items-center text-primary dark:text-accent-light hover:text-primary-dark dark:hover:text-accent transition-colors group text-sm"
            >
            <IconChevronLeft className="w-4 h-4 mr-1 transition-transform duration-150 group-hover:-translate-x-0.5" />
            Back to Hospitals
            </Link>
        </div>

        {/* --- Header & Image Gallery --- */}
        <header className="bg-white dark:bg-neutral-d-light/50 rounded-t-xl shadow-xl border border-b-0 border-neutral-extralight/60 dark:border-neutral-d-extralight/60 overflow-hidden">
             {/* Image Gallery */}
            <div className="relative aspect-video lg:aspect-[2.5/1] group bg-secondary dark:bg-neutral-d-extralight cursor-pointer" onClick={() => setIsGalleryOpen(true)}>
                  <img 
                    src={hospital.images[currentImageIndex]} 
                    alt={`${hospital.name} - view ${currentImageIndex + 1}`} 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
                  {hospital.images.length > 1 && (
                    <>
                      <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/40 text-white p-2.5 rounded-full hover:bg-black/70 transition-colors opacity-0 group-hover:opacity-100"><IconChevronLeft className="w-6 h-6" /></button>
                      <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/40 text-white p-2.5 rounded-full hover:bg-black/70 transition-colors opacity-0 group-hover:opacity-100"><IconChevronRight className="w-6 h-6" /></button>
                    </>
                  )}
                  <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded-md pointer-events-none">Click to view gallery</div>
            </div>
            {/* Title & Info */}
            <div className="p-6 md:p-8">
                <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-dark dark:text-neutral-d-dark mb-2">{hospital.name}</h1>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-neutral-DEFAULT dark:text-neutral-d-DEFAULT">
                    {hospital.rating > 0 && <div className="flex items-center"><StarRating rating={hospital.rating} size="md" /><span className="ml-2">({hospital.rating.toFixed(1)} rating, {hospital.reviews.length} reviews)</span></div>}
                    {hospital.location && <div className="flex items-center"><IconMapPin className="w-4 h-4 mr-1.5 text-accent"/>{hospital.location}</div>}
                </div>
            </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            {/* Left Column: Details & Services */}
            <div className="lg:col-span-2 space-y-8">
                {/* Description */}
                <div className="bg-white dark:bg-neutral-d-light/50 rounded-xl shadow-xl p-6 md:p-8 border border-neutral-extralight/60 dark:border-neutral-d-extralight/60">
                    <h2 className="text-2xl font-bold text-neutral-dark dark:text-neutral-d-dark mb-4">About {hospital.name}</h2>
                    <p className="prose prose-sm dark:prose-invert max-w-none text-neutral-dark dark:text-neutral-d-dark leading-relaxed">{hospital.description}</p>
                    {hospital.features && hospital.features.length > 0 && (
                        <div className="mt-6 pt-4 border-t border-neutral-extralight/80 dark:border-neutral-d-extralight/80">
                            <h3 className="font-semibold text-neutral-dark dark:text-neutral-d-dark mb-3">Key Features</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                            {hospital.features.map((feature, index) => (
                                <div key={index} className="flex items-center text-sm text-neutral-dark dark:text-neutral-d-dark"><IconCheck className="w-5 h-5 mr-2 text-primary dark:text-accent-light flex-shrink-0"/>{feature}</div>
                            ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Departments & Doctors */}
                <div className="bg-white dark:bg-neutral-d-light/50 rounded-xl shadow-xl p-6 md:p-8 border border-neutral-extralight/60 dark:border-neutral-d-extralight/60">
                    <h2 className="text-2xl font-bold text-neutral-dark dark:text-neutral-d-dark mb-4 flex items-center"><IconStethoscope className="w-7 h-7 mr-3 text-accent"/>Departments & Doctors</h2>
                    <div className="space-y-2">
                        {hospital.departments?.map((dept, index) => (
                            <AccordionItem key={dept.id} title={dept.name} defaultOpen={index === 0}>
                                <div className="space-y-4">
                                {dept.doctors.map(doc => (
                                    <div key={doc.id} className="flex items-center space-x-4 p-2 rounded-lg hover:bg-primary/5 dark:hover:bg-primary/10">
                                        <img src={doc.image} alt={doc.name} className="w-16 h-16 rounded-full object-cover shadow-sm"/>
                                        <div className="flex-grow">
                                            <p className="font-semibold text-neutral-dark dark:text-neutral-d-dark">{doc.name}</p>
                                            <p className="text-sm text-neutral-DEFAULT dark:text-neutral-d-DEFAULT">{doc.specialty}</p>
                                        </div>
                                        <button onClick={() => handleBookClick('doctor', doc, dept)} className="bg-primary hover:bg-primary-dark text-white font-medium text-sm py-2 px-4 rounded-lg shadow-sm transition-colors">Book</button>
                                    </div>
                                ))}
                                </div>
                            </AccordionItem>
                        ))}
                    </div>
                </div>

                {/* Facilities */}
                 <div className="bg-white dark:bg-neutral-d-light/50 rounded-xl shadow-xl p-6 md:p-8 border border-neutral-extralight/60 dark:border-neutral-d-extralight/60">
                    <h2 className="text-2xl font-bold text-neutral-dark dark:text-neutral-d-dark mb-4 flex items-center"><IconBuilding className="w-7 h-7 mr-3 text-accent"/>Diagnostics & Facilities</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {hospital.facilities?.map(fac => (
                            <div key={fac.id} className="border border-neutral-extralight dark:border-neutral-d-extralight rounded-lg p-4 flex flex-col">
                                <h3 className="font-semibold text-neutral-dark dark:text-neutral-d-dark">{fac.name}</h3>
                                <p className="text-xs text-neutral-DEFAULT dark:text-neutral-d-DEFAULT flex-grow mb-2">{fac.description}</p>
                                <div className="flex justify-between items-center mt-auto">
                                    <span className="font-bold text-primary dark:text-accent-light">{formatPrice(fac.price, hospital.currency)}</span>
                                    <button onClick={() => handleBookClick('facility', fac)} className="bg-accent hover:bg-accent-dark text-white font-medium text-sm py-1.5 px-3 rounded-md shadow-sm transition-colors">Book Test</button>
                                </div>
                            </div>
                        ))}
                    </div>
                 </div>
                 {hospital.reviews.length > 0 && (
                     <div className="bg-white dark:bg-neutral-d-light/50 rounded-xl shadow-xl p-6 md:p-8 border border-neutral-extralight/60 dark:border-neutral-d-extralight/60">
                        <AIReviewSummary reviews={hospital.reviews} />
                     </div>
                 )}
            </div>

            {/* Right Column: Map & Booking Form */}
            <aside className="lg:col-span-1 space-y-8 sticky top-24 self-start">
                 {/* Map */}
                 {hospital.coordinates && (
                    <div className="bg-white dark:bg-neutral-d-light/50 rounded-xl shadow-xl p-4 border border-neutral-extralight/60 dark:border-neutral-d-extralight/60">
                         <h2 className="text-lg font-bold text-neutral-dark dark:text-neutral-d-dark mb-3 text-center">Location</h2>
                        <div className="h-64 w-full rounded-lg overflow-hidden shadow-md border border-neutral-extralight dark:border-neutral-d-extralight">
                            <MapComponent 
                                center={[hospital.coordinates.lat, hospital.coordinates.lng]} 
                                zoom={14} 
                                markers={[{
                                    position: [hospital.coordinates.lat, hospital.coordinates.lng],
                                    popupContent: ReactDOMServer.renderToString(<span className="font-semibold">{hospital.name}</span>)
                                }]}
                            />
                        </div>
                    </div>
                )}
                
                {/* Booking Section */}
                <div id="booking-section" className="scroll-mt-24">
                    {bookingTarget ? (
                        <AppointmentForm 
                            hospital={hospital}
                            doctor={bookingTarget.type === 'doctor' ? bookingTarget.data as Doctor : undefined}
                            department={bookingTarget.department}
                            facility={bookingTarget.type === 'facility' ? bookingTarget.data as Facility : undefined}
                        />
                    ) : (
                        <div className="bg-white dark:bg-neutral-d-light/50 rounded-xl shadow-xl p-6 border border-neutral-extralight/60 dark:border-neutral-d-extralight/60 text-center">
                            <IconStethoscope className="w-12 h-12 mx-auto text-primary dark:text-accent-light opacity-60 mb-3" />
                            <h3 className="text-lg font-semibold text-neutral-dark dark:text-neutral-d-dark">Ready to Book?</h3>
                            <p className="text-sm text-neutral-DEFAULT dark:text-neutral-d-DEFAULT mt-1">Select a doctor or a facility test from the lists to begin your booking process.</p>
                        </div>
                    )}
                </div>
            </aside>
        </main>
      </div>
    </div>
    </>
  );
};

export default HospitalDetailPage;