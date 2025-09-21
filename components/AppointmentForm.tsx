import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListingItem, Doctor, Facility, Department, BookingDetails, BookingCategorySlug, Currency } from '../types';
import { useBookings } from '../contexts/BookingContext';
import { useAuth } from '../contexts/AuthContext';
import { IconCalendar, IconUser, IconEnvelope, IconCoupon, IconClock } from '../constants';
import { useCurrency } from '../contexts/CurrencyProvider';

interface AppointmentFormProps {
  hospital: ListingItem;
  doctor?: Doctor;
  department?: Department;
  facility?: Facility;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ hospital, doctor, department, facility }) => {
  const navigate = useNavigate();
  const { addBooking, confirmBookingPayment } = useBookings();
  const { user } = useAuth();
  const { formatPrice } = useCurrency();
  
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [bookingDate, setBookingDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [notes, setNotes] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const inputBaseClasses = "w-full p-3 border border-neutral-extralight dark:border-neutral-d-extralight rounded-md focus:ring-2 focus:ring-primary dark:focus:ring-accent focus:border-transparent outline-none transition-all duration-150 shadow-sm text-neutral-dark dark:text-neutral-d-dark bg-white dark:bg-neutral-d-light/50 placeholder-neutral-DEFAULT dark:placeholder-neutral-d-DEFAULT";
  const iconBaseClasses = "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-DEFAULT/70 dark:text-neutral-d-DEFAULT/70";

  const availableSlots = doctor?.availableSlots || facility?.availableSlots || [];
  const formTitle = doctor ? `Book Appointment with ${doctor.name}` : `Book Test: ${facility?.name}`;
  const price = facility?.price || 0;

  useEffect(() => {
    let finalPrice = price;
    if (couponCode.toUpperCase() === 'SAVE10' && finalPrice > 0) {
      finalPrice *= 0.9; // 10% discount
    }
    setTotalPrice(finalPrice);
  }, [price, couponCode]);

  useEffect(() => {
    if (availableSlots.length > 0) {
      setSelectedSlot(availableSlots[0]);
    } else {
      setSelectedSlot('');
    }
  }, [availableSlots]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!userName.trim() || !userEmail.trim() || !bookingDate || !selectedSlot) {
      setError('Please fill in all required fields: Name, Email, Date, and Time Slot.');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(userEmail)) {
      setError('Please enter a valid email address.');
      return;
    }
    
    setIsLoading(true);

    const bookingDataToSubmit: Omit<BookingDetails, 'id' | 'bookingDate' | 'status'> = {
      itemId: hospital.id,
      categorySlug: BookingCategorySlug.Hospitals,
      itemName: hospital.name,
      userName: userName.trim(),
      userId: user?.id || 'guest-user',
      userEmail: userEmail.trim(),
      startDate: bookingDate,
      appointmentTime: selectedSlot,
      notes: notes.trim(),
      totalPrice,
      currency: hospital.currency, // Ensure currency is passed
      messages: [],
      ...(doctor && department && { doctor: { name: doctor.name, specialty: doctor.specialty, departmentName: department.name } }),
      ...(facility && { facility: { name: facility.name, price: facility.price } }),
      ...(couponCode && { couponCode }),
    };

    try {
      const newBooking = await addBooking(bookingDataToSubmit);
      setIsLoading(false);
      
      if (newBooking.totalPrice > 0) {
        navigate(`/payment/${newBooking.id}`);
      } else {
        // For free doctor consultations, go straight to confirmation
        const confirmedBooking = await confirmBookingPayment(newBooking.id);
        navigate(`/confirmation/${confirmedBooking.id}`);
      }
    } catch (apiError) {
      setIsLoading(false);
      setError(apiError instanceof Error ? apiError.message : 'Failed to create booking. Please try again.');
      console.error("Booking submission error:", apiError);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-neutral-d-light/50 p-6 rounded-xl shadow-lg border border-neutral-extralight/70 dark:border-neutral-d-extralight/70 mt-6">
      <h3 className="text-xl font-semibold text-neutral-dark dark:text-neutral-d-dark text-center">{formTitle}</h3>
      {error && <p className="text-red-600 bg-red-100 p-3 rounded-md my-2 text-sm border border-red-200">{error}</p>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4">
        <div>
          <label htmlFor="user-name" className="block text-sm font-medium text-neutral-dark dark:text-neutral-d-dark mb-1">Patient Name *</label>
          <div className="relative">
            <IconUser className={iconBaseClasses} />
            <input type="text" id="user-name" value={userName} onChange={e => setUserName(e.target.value)} required className={`${inputBaseClasses} pl-10`} />
          </div>
        </div>
        <div>
          <label htmlFor="user-email" className="block text-sm font-medium text-neutral-dark dark:text-neutral-d-dark mb-1">Contact Email *</label>
          <div className="relative">
            <IconEnvelope className={iconBaseClasses} />
            <input type="email" id="user-email" value={userEmail} onChange={e => setUserEmail(e.target.value)} required className={`${inputBaseClasses} pl-10`} />
          </div>
        </div>

        <div className="col-span-1">
          <label htmlFor="booking-date" className="block text-sm font-medium text-neutral-dark dark:text-neutral-d-dark mb-1">Select Date *</label>
          <div className="relative">
            <IconCalendar className={iconBaseClasses} />
            <input type="date" id="booking-date" value={bookingDate} onChange={e => setBookingDate(e.target.value)} required min={new Date().toISOString().split('T')[0]} className={`${inputBaseClasses} pl-10`} />
          </div>
        </div>

        <div className="col-span-1">
          <label htmlFor="time-slot" className="block text-sm font-medium text-neutral-dark dark:text-neutral-d-dark mb-1">Available Slots *</label>
          <div className="relative">
            <IconClock className={`${iconBaseClasses} w-4 h-4`} />
            <select id="time-slot" value={selectedSlot} onChange={e => setSelectedSlot(e.target.value)} required className={`${inputBaseClasses} pl-10 appearance-none`}>
              <option value="" disabled>Select a time</option>
              {availableSlots.length > 0 ? (
                availableSlots.map(slot => <option key={slot} value={slot}>{slot}</option>)
              ) : (
                <option value="" disabled>No slots available</option>
              )}
            </select>
          </div>
        </div>

        <div className="col-span-1 md:col-span-2">
          <label htmlFor="notes" className="block text-sm font-medium text-neutral-dark dark:text-neutral-d-dark mb-1">Additional Notes (Optional)</label>
          <textarea id="notes" value={notes} onChange={e => setNotes(e.target.value)} rows={3} className={`${inputBaseClasses} min-h-[80px] pl-3`} placeholder="Any specific symptoms or information..."></textarea>
        </div>

        {price > 0 && (
           <div className="col-span-1 md:col-span-2">
             <label htmlFor="coupon-code" className="block text-sm font-medium text-neutral-dark dark:text-neutral-d-dark mb-1">Coupon Code (Optional)</label>
             <div className="relative">
                <IconCoupon className={iconBaseClasses} />
                <input type="text" id="coupon-code" value={couponCode} onChange={e => setCouponCode(e.target.value)} className={`${inputBaseClasses} pl-10`} placeholder="e.g., SAVE10"/>
             </div>
           </div>
        )}
      </div>

      <div className="pt-5 border-t border-neutral-extralight/80 dark:border-neutral-d-extralight/80">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-medium text-neutral-dark dark:text-neutral-d-dark">Total Price:</span>
          <span className="text-2xl font-bold text-primary dark:text-accent-light">{formatPrice(totalPrice, hospital.currency)}</span>
        </div>
        <button type="submit" disabled={isLoading || availableSlots.length === 0} className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-interactive transition-all duration-150 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2">
          {isLoading ? 'Processing...' : (totalPrice > 0 ? 'Proceed to Payment' : 'Confirm Booking')}
        </button>
      </div>
    </form>
  );
};

export default AppointmentForm;
