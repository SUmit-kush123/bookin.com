import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListingItem, BookingCategorySlug, BookingDetails, Vehicle } from '../types';
import { useBookings } from '../contexts/BookingContext';
import { useCurrency } from '../contexts/CurrencyProvider';
import { useAuth } from '../contexts/AuthContext';
import { IconCalendar, IconUsers, IconPlane, IconMountain, IconBed, IconCar, IconBuildingStorefront } from '../constants';
import { vehiclesData } from '../data/mockData';
import Calendar from './ui/Calendar';

interface BookingFormProps {
  item: ListingItem;
  categorySlug: BookingCategorySlug;
}

const BookingForm: React.FC<BookingFormProps> = ({ item, categorySlug }) => {
  const navigate = useNavigate();
  const { addBooking } = useBookings(); 
  const { user } = useAuth();
  const { formatPrice } = useCurrency();
  
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [startDate, setStartDate] = useState<string | null>(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [participants, setParticipants] = useState(1);
  const [notes, setNotes] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const inputBaseClasses = "w-full p-3 border border-neutral-extralight dark:border-neutral-d-extralight rounded-md focus:ring-2 focus:ring-primary dark:focus:ring-accent focus:border-transparent outline-none transition-all duration-150 shadow-sm text-neutral-dark dark:text-neutral-d-dark bg-white dark:bg-neutral-d-light/50 placeholder-neutral-DEFAULT dark:placeholder-neutral-d-DEFAULT";
  const iconBaseClasses = "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-DEFAULT/70 dark:text-neutral-d-DEFAULT/70";

  useEffect(() => {
    let price = 0;
    const numParticipants = Math.max(1, participants);
    
    if (categorySlug === BookingCategorySlug.Hotels && item.pricePerNight != null) {
      const nights = endDate && startDate && new Date(endDate) > new Date(startDate) 
        ? Math.max(1, (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 3600 * 24)) 
        : 1;
      price = item.pricePerNight * nights;
    } else if (item.pricePerPerson != null) {
      price = item.pricePerPerson * numParticipants;
    } else if (item.price != null) {
      price = item.price * (categorySlug === BookingCategorySlug.Flights ? numParticipants : 1);
    }
    setTotalPrice(price);
  }, [item, categorySlug, startDate, endDate, participants]);

  const handleDateSelect = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    if (!startDate || (startDate && endDate)) {
      setStartDate(dateString);
      setEndDate(null);
    } else if (new Date(dateString) < new Date(startDate)) {
      setStartDate(dateString);
    } else {
      setEndDate(dateString);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!item || !item.id) {
        setError("Item ID is missing. Cannot proceed with booking.");
        return;
    }
    if (!userName.trim() || !userEmail.trim()) {
      setError('Full Name and Email Address are required.');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(userEmail)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (categorySlug === BookingCategorySlug.Hotels && !endDate) {
      setError('Check-out date is required for hotel bookings.');
      return;
    }
    const today = new Date();
    today.setHours(0,0,0,0);
    if (startDate && new Date(startDate) < today) {
        setError('Start date cannot be in the past.');
        return;
    }
    if (endDate && startDate && new Date(endDate) < new Date(startDate)) {
      setError('End date cannot be before start date.');
      return;
    }
    if (participants < 1) {
        setError('Number of guests/participants must be at least 1.');
        return;
    }

    setIsLoading(true);

    let assignedVehicle: Vehicle | undefined;
    if (categorySlug === BookingCategorySlug.RidesAndRentals) {
        assignedVehicle = vehiclesData.length > 0 ? vehiclesData[0] : undefined;
    }

    const bookingDataToSubmit: Omit<BookingDetails, 'id' | 'bookingDate' | 'status'> = {
      itemId: item.id,
      categorySlug,
      itemName: item.name,
      userName: userName.trim(),
      userId: user?.id || 'guest-user',
      userEmail: userEmail.trim(),
      startDate: startDate || undefined,
      endDate: (categorySlug === BookingCategorySlug.Hotels && endDate) ? endDate : undefined,
      participants,
      notes: notes.trim(),
      totalPrice,
      currency: item.currency,
      messages: [],
      ...(assignedVehicle && { 
        driver: assignedVehicle.driver, 
        vehicle: {
            id: assignedVehicle.id,
            type: assignedVehicle.type,
            make: assignedVehicle.make,
            model: assignedVehicle.model,
            plateNumber: assignedVehicle.plateNumber
        } 
      })
    };

    try {
      const newBooking = await addBooking(bookingDataToSubmit);
      setIsLoading(false);
      
      if (categorySlug === BookingCategorySlug.RidesAndRentals) {
        navigate(`/live-ride/${newBooking.id}`);
      } else {
        navigate(`/payment/${newBooking.id}`); 
      }
    } catch (apiError) {
      setIsLoading(false);
      setError(apiError instanceof Error ? apiError.message : 'Failed to create booking. Please try again.');
      console.error("Booking submission error:", apiError);
    }
  };
  
  const renderCategorySpecificFields = () => {
    switch (categorySlug) {
      case BookingCategorySlug.Hotels:
        return (
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-neutral-dark dark:text-neutral-d-dark mb-2">Select Check-in & Check-out Dates</label>
            <Calendar
              selectedStartDate={startDate}
              selectedEndDate={endDate}
              onDateSelect={handleDateSelect}
              blockedDates={item.blockedDates || []}
            />
          </div>
        );
      default: 
        let dateLabel = 'Start Date';
        if (categorySlug === BookingCategorySlug.Flights) dateLabel = 'Departure Date';
        if (categorySlug === BookingCategorySlug.Adventures) dateLabel = 'Activity Date';
        if (categorySlug === BookingCategorySlug.RidesAndRentals) dateLabel = 'Rental Start Date';
        if (categorySlug === BookingCategorySlug.EventSpaces) dateLabel = 'Event Date';

        return (
          <div className="col-span-1 md:col-span-2">
            <label htmlFor="booking-start-date" className="block text-sm font-medium text-neutral-dark dark:text-neutral-d-dark mb-1">{dateLabel}</label>
            <div className="relative">
              <IconCalendar className={iconBaseClasses} />
              <input type="date" id="booking-start-date" value={startDate || ''} onChange={e => setStartDate(e.target.value)} required min={new Date().toISOString().split('T')[0]}
                className={`${inputBaseClasses} pl-10`}/>
            </div>
          </div>
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-neutral-d-light/50 p-6 rounded-xl shadow-lg border border-neutral-extralight/70 dark:border-neutral-d-extralight/70">
      <h3 className="text-xl font-semibold text-neutral-dark dark:text-neutral-d-dark text-center">Book Your Stay/Activity</h3>
      {error && <p className="text-red-600 bg-red-100 p-3 rounded-md my-2 text-sm border border-red-200">{error}</p>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4">
        <div>
          <label htmlFor="user-name" className="block text-sm font-medium text-neutral-dark dark:text-neutral-d-dark mb-1">Full Name</label>
          <input type="text" id="user-name" value={userName} onChange={e => setUserName(e.target.value)} required 
            className={`${inputBaseClasses}`}/>
        </div>
        <div>
          <label htmlFor="user-email" className="block text-sm font-medium text-neutral-dark dark:text-neutral-d-dark mb-1">Email Address</label>
          <input type="email" id="user-email" value={userEmail} onChange={e => setUserEmail(e.target.value)} required 
            className={`${inputBaseClasses}`}/>
        </div>
        
        {renderCategorySpecificFields()}

        <div className="col-span-1 md:col-span-2">
            <label htmlFor="participants" className="block text-sm font-medium text-neutral-dark dark:text-neutral-d-dark mb-1">
                {categorySlug === BookingCategorySlug.Hotels ? 'Guests' : 'Participants / Tickets'}
            </label>
            <div className="relative">
                 <IconUsers className={iconBaseClasses} />
                <input type="number" id="participants" value={participants} onChange={e => setParticipants(Math.max(1, parseInt(e.target.value, 10)))} min="1" required 
                className={`${inputBaseClasses} pl-10`}/>
            </div>
        </div>

        <div className="col-span-1 md:col-span-2">
          <label htmlFor="notes" className="block text-sm font-medium text-neutral-dark dark:text-neutral-d-dark mb-1">Additional Notes (Optional)</label>
          <textarea id="notes" value={notes} onChange={e => setNotes(e.target.value)} rows={3}
            className={`${inputBaseClasses} min-h-[80px] pl-3`} placeholder="Any special requests or information..."></textarea>
        </div>
      </div>

      <div className="pt-5 border-t border-neutral-extralight/80 dark:border-neutral-d-extralight/80">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-medium text-neutral-dark dark:text-neutral-d-dark">Total Price:</span>
          <span className="text-2xl font-bold text-primary dark:text-accent-light">{formatPrice(totalPrice, item.currency)}</span>
        </div>
        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-interactive transition-all duration-150 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            categorySlug === BookingCategorySlug.RidesAndRentals ? 'Request Ride' : 'Proceed to Payment'
          )}
        </button>
      </div>
    </form>
  );
};

export default BookingForm;