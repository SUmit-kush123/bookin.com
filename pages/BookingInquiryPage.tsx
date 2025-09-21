import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IconMessageCircle, IconEnvelope, IconUser, IconTicket, IconChevronRight } from '../constants'; // Changed IconChatBubbleLeftRight to IconMessageCircle
import { useAuth } from '../contexts/AuthContext'; 

const BookingInquiryPage: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [listingContext, setListingContext] = useState('');
  const [inquiryCategory, setInquiryCategory] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const listingNameParam = queryParams.get('listingName');
    const categoryContextParam = queryParams.get('categoryContext');
    
    let contextString = '';
    if (listingNameParam) {
      contextString += listingNameParam;
    }
    if (categoryContextParam) {
      contextString += (contextString ? ` (Category: ${categoryContextParam})` : `Category: ${categoryContextParam}`);
    }
    setListingContext(contextString);

    if(categoryContextParam) {
        // Attempt to pre-select category based on context
        const categoryMap: { [key: string]: string } = {
            'hotels': 'Hotel Details',
            'flights': 'Flight Information',
            'adventures': 'Adventure Specifics',
            'vehicle-rentals': 'Vehicle Rental Questions',
            'event-spaces': 'Event Space Queries',
            'real-estate': 'Real Estate Information'
        };
        const mappedCategory = categoryMap[categoryContextParam.toLowerCase()];
        if (mappedCategory) {
            setInquiryCategory(mappedCategory);
        }
    }


  }, [location.search]);
  
  const inputBaseClasses = "w-full p-3 pl-10 border border-neutral-extralight dark:border-neutral-d-extralight rounded-md focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all duration-150 shadow-sm text-neutral-dark dark:text-neutral-d-dark bg-white dark:bg-neutral-d-light/50 placeholder-neutral-DEFAULT dark:placeholder-neutral-d-DEFAULT";
  const iconBaseClasses = "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-DEFAULT/70 dark:text-neutral-d-DEFAULT/70";

  const inquiryCategories = [
    "General Question",
    "Hotel Details",
    "Flight Information",
    "Adventure Specifics",
    "Vehicle Rental Questions",
    "Event Space Queries",
    "Real Estate Information",
    "Booking Modification",
    "Cancellation Request",
    "Payment Issue",
    "Technical Support",
    "Other",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!name.trim() || !email.trim() || !inquiryCategory || !description.trim()) {
      setError('Please fill in all required fields: Name, Email, Inquiry Category, and Question.');
      setIsLoading(false);
      return;
    }
     if (!/^\S+@\S+\.\S+$/.test(email)) {
        setError('Please enter a valid email address.');
        setIsLoading(false);
        return;
    }

    // Simulate API call
    console.log("Submitting inquiry:", { name, email, listingContext, inquiryCategory, description });
    await new Promise(resolve => setTimeout(resolve, 1500)); 
    
    setIsLoading(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 py-12 md:py-16 text-center">
        <IconMessageCircle className="w-16 h-16 text-success mx-auto mb-6" /> {/* Changed IconChatBubbleLeftRight to IconMessageCircle */}
        <h1 className="text-3xl font-bold text-neutral-dark dark:text-neutral-d-dark mb-4">Inquiry Submitted</h1>
        <p className="text-neutral-DEFAULT dark:text-neutral-d-DEFAULT mb-8 max-w-md mx-auto">
          Thank you for your inquiry about "{listingContext || 'your selected topic'}". Our team will review it and get back to you shortly (this is a demo, so no real action will be taken).
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link
              to="/"
              className="bg-primary hover:bg-primary-dark text-white font-semibold py-2.5 px-6 rounded-lg transition-colors text-sm shadow-md hover:shadow-lg"
            >
              Back to Homepage
            </Link>
            <Link
              to="/support"
              className="bg-secondary dark:bg-neutral-d-extralight hover:bg-secondary-dark dark:hover:bg-neutral-d-extralight/70 text-neutral-dark dark:text-neutral-d-dark font-semibold py-2.5 px-6 rounded-lg transition-colors text-sm shadow-sm hover:shadow-md"
            >
              Visit Support Center
            </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex items-center mb-8 md:mb-12">
        <IconMessageCircle className="w-10 h-10 text-primary dark:text-accent-light mr-3" /> {/* Changed IconChatBubbleLeftRight to IconMessageCircle */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-dark dark:text-neutral-d-dark">Submit an Inquiry</h1>
      </div>

      <div className="bg-white dark:bg-neutral-d-light/50 rounded-xl shadow-xl p-6 md:p-10 border border-neutral-extralight/60 dark:border-neutral-d-extralight/60 max-w-2xl mx-auto">
        <p className="text-neutral-DEFAULT dark:text-neutral-d-DEFAULT mb-6 text-sm">
          Have questions about a specific listing, booking, or our services? Fill out the form below and we'll get back to you.
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
           {error && <p className="text-sm text-center text-red-600 bg-red-100 p-3 rounded-md border border-red-200">{error}</p>}
          <div>
            <label htmlFor="inquiry-name" className="block text-sm font-medium text-neutral-dark dark:text-neutral-d-dark mb-1">Your Name *</label>
             <div className="relative">
                <IconUser className={iconBaseClasses} />
                <input type="text" id="inquiry-name" value={name} onChange={e => setName(e.target.value)} required className={inputBaseClasses} placeholder="Enter your full name"/>
             </div>
          </div>
          <div>
            <label htmlFor="inquiry-email" className="block text-sm font-medium text-neutral-dark dark:text-neutral-d-dark mb-1">Your Email *</label>
            <div className="relative">
                <IconEnvelope className={iconBaseClasses} />
                <input type="email" id="inquiry-email" value={email} onChange={e => setEmail(e.target.value)} required className={inputBaseClasses} placeholder="Enter your email address"/>
            </div>
          </div>
          <div>
            <label htmlFor="inquiry-listing-context" className="block text-sm font-medium text-neutral-dark dark:text-neutral-d-dark mb-1">Regarding (Booking ID / Listing Name)</label>
            <div className="relative">
                <IconTicket className={iconBaseClasses} />
                <input type="text" id="inquiry-listing-context" value={listingContext} onChange={e => setListingContext(e.target.value)} className={inputBaseClasses} placeholder="e.g., Grand City Hotel or booking-xyz"/>
            </div>
             <p className="text-xs text-neutral-DEFAULT dark:text-neutral-d-DEFAULT mt-1">If coming from an item page, this may be pre-filled.</p>
          </div>
          <div>
            <label htmlFor="inquiry-category" className="block text-sm font-medium text-neutral-dark dark:text-neutral-d-dark mb-1">Inquiry Category *</label>
            <select 
                id="inquiry-category" 
                value={inquiryCategory} 
                onChange={e => setInquiryCategory(e.target.value)} 
                required 
                className={`${inputBaseClasses} pl-3 pr-10 appearance-none bg-white dark:bg-neutral-d-light/50`}
            >
                <option value="" disabled>Select a category...</option>
                {inquiryCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
            </select>
          </div>
          <div>
            <label htmlFor="inquiry-description" className="block text-sm font-medium text-neutral-dark dark:text-neutral-d-dark mb-1">Your Question(s) *</label>
            <textarea 
                id="inquiry-description" 
                value={description} 
                onChange={e => setDescription(e.target.value)} 
                required 
                rows={5} 
                className={`${inputBaseClasses} pl-3 min-h-[120px]`} 
                placeholder="Please provide details about your inquiry. For example, if asking about a hotel, mention facilities, room types, star rating, menu, children's amenities etc. The more details, the better we can assist!"
            ></textarea>
          </div>
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-interactive transition-all duration-150 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting Inquiry...
                </>
              ) : 'Submit Inquiry'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default BookingInquiryPage;