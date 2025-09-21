import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useBookings } from '../contexts/BookingContext';
import { CATEGORY_ICONS, IconTicket, IconSparkles, IconXCircle, IconPrinter } from '../constants';
import { BookingCategorySlug, FormattedBookingData, BookingDetails } from '../types';
import { useCurrency } from '../contexts/CurrencyProvider';

const BookingConfirmationPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  const { getBookingById } = useBookings();
  const { formatPrice } = useCurrency();
  
  const [booking, setBooking] = useState<BookingDetails | null | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!bookingId) {
      setError("Invalid Booking ID provided in URL.");
      setIsLoading(false);
      return;
    }
    
    // Data is now loaded from context which uses localStorage, so it should be available.
    const foundBooking = getBookingById(bookingId);
    if (foundBooking) {
      setBooking(foundBooking);
    } else {
      setError(`We could not find details for booking ID: ${bookingId}.`);
    }
    setIsLoading(false);

  }, [bookingId, getBookingById]);

  if (isLoading || booking === undefined) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center py-12 px-4">
        <IconSparkles className="w-16 h-16 text-primary dark:text-accent-light animate-pulse mb-4" />
        <p className="text-neutral-DEFAULT dark:text-neutral-d-DEFAULT text-lg">Loading booking confirmation...</p>
      </div>
    );
  }

  if (error || booking === null) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center py-12 px-4">
        <IconXCircle className="w-16 h-16 text-danger mb-4" />
        <h1 className="text-2xl font-semibold text-danger mb-2">Error Loading Booking</h1>
        <p className="text-neutral-DEFAULT dark:text-neutral-d-DEFAULT max-w-md mx-auto">{error}</p>
        <Link to="/my-bookings" className="text-primary hover:underline dark:text-accent-light dark:hover:text-accent mt-6 inline-block bg-primary/10 dark:bg-primary/20 px-4 py-2 rounded-md">View All My Bookings</Link>
      </div>
    );
  }

  if (booking.status === 'pending_payment') {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center py-12 px-4">
            <IconXCircle className="w-16 h-16 text-amber-500 mb-4" />
            <h1 className="text-2xl font-semibold text-amber-600 dark:text-amber-400 mb-2">Payment Pending</h1>
            <p className="text-neutral-DEFAULT dark:text-neutral-d-DEFAULT max-w-md mx-auto mb-8">This booking is not yet confirmed. Please complete your payment to finalize it.</p>
            <Link to={`/payment/${bookingId}`} className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-colors">
                Proceed to Payment
            </Link>
        </div>
      );
    }

    const formatDate = (dateString?: string): string => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString(undefined, {
          year: 'numeric', month: 'long', day: 'numeric',
        });
    };
      
    const CategoryIconComponent = CATEGORY_ICONS[booking.categorySlug] || IconTicket;

    const bookingInfo: FormattedBookingData[] = [
        { name: 'Booking ID', value: booking.id },
        { name: 'Booking Date', value: new Date(booking.bookingDate).toLocaleString() },
        { name: 'Booked For', value: booking.userName },
        { name: 'Status', value: booking.status.charAt(0).toUpperCase() + booking.status.slice(1) },
    ];
    
    if (booking.startDate) bookingInfo.push({ name: 'Date', value: `${formatDate(booking.startDate)}${booking.endDate ? ` - ${formatDate(booking.endDate)}` : ''}` });
    if (booking.participants) bookingInfo.push({ name: 'Guests/Participants', value: booking.participants });
    if (booking.appointmentTime) bookingInfo.push({name: 'Appointment Time', value: booking.appointmentTime});
    if (booking.doctor) bookingInfo.push({ name: 'Doctor', value: `${booking.doctor.name} (${booking.doctor.departmentName})`});
    if (booking.facility) bookingInfo.push({ name: 'Facility/Test', value: booking.facility.name});
    if (booking.categorySlug === BookingCategorySlug.RidesAndRentals) {
        if (booking.driver) {
            bookingInfo.push({ name: 'Driver', value: `${booking.driver.name} (Rating: ${booking.driver.rating} ★)`});
        }
        if (booking.vehicle) {
            bookingInfo.push({ name: 'Vehicle', value: `${booking.vehicle.make} ${booking.vehicle.model}`});
            bookingInfo.push({ name: 'Plate Number', value: booking.vehicle.plateNumber });
        }
    }

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen py-8 print:py-0">
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto bg-white dark:bg-neutral-d-light/50 p-6 md:p-10 rounded-xl shadow-2xl border border-green-200 dark:border-green-800 print:shadow-none print:border-none">
                    <div className="text-center pb-6 border-b-2 border-dashed border-neutral-extralight dark:border-neutral-d-extralight">
                        <div className="w-20 h-20 bg-success/20 text-success rounded-full mx-auto flex items-center justify-center mb-4">
                            <IconSparkles className="w-12 h-12" />
                        </div>
                        <h1 className="text-3xl font-extrabold text-neutral-dark dark:text-neutral-d-dark">Booking Confirmed!</h1>
                        <p className="text-neutral-DEFAULT dark:text-neutral-d-DEFAULT mt-2">Thank you, {booking.userName}. Your booking is complete.</p>
                    </div>

                    <div className="py-6">
                        <div className="flex items-center mb-4">
                            <CategoryIconComponent className="w-8 h-8 text-primary dark:text-accent-light mr-3"/>
                            <h2 className="text-2xl font-bold text-neutral-dark dark:text-neutral-d-dark">{booking.itemName}</h2>
                        </div>
                        
                        <div className="space-y-3">
                            {bookingInfo.map((info, index) => (
                                <div key={index} className="flex justify-between items-center text-sm bg-secondary-extralight/50 dark:bg-neutral-d-extralight/50 p-3 rounded-md">
                                    <span className="font-medium text-neutral-DEFAULT dark:text-neutral-d-DEFAULT">{info.name}:</span>
                                    <span className="font-semibold text-neutral-dark dark:text-neutral-d-dark text-right">{info.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="py-6 border-t-2 border-dashed border-neutral-extralight dark:border-neutral-d-extralight">
                        <div className="flex justify-between items-baseline">
                            <span className="text-lg font-medium text-neutral-dark dark:text-neutral-d-dark">Total Paid:</span>
                            <span className="text-3xl font-bold text-primary dark:text-accent-light">{formatPrice(booking.totalPrice, booking.currency)}</span>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center print:hidden">
                        <Link to="/my-bookings" className="w-full sm:w-auto text-center bg-secondary dark:bg-neutral-d-extralight hover:bg-secondary-dark dark:hover:bg-neutral-d-extralight/70 text-neutral-dark dark:text-neutral-d-dark font-semibold py-2.5 px-6 rounded-lg transition-colors">
                            View All Bookings
                        </Link>
                         {booking.categorySlug === BookingCategorySlug.RidesAndRentals && (
                            <Link to={`/live-ride/${booking.id}`} className="w-full sm:w-auto text-center bg-accent hover:bg-accent-dark text-white font-semibold py-2.5 px-6 rounded-lg transition-colors">
                                Track Live Ride
                            </Link>
                        )}
                        <Link to={`/invoice/${booking.id}`} className="w-full sm:w-auto text-center bg-primary/10 dark:bg-primary/20 text-primary dark:text-accent-light font-semibold py-2.5 px-6 rounded-lg transition-colors hover:bg-primary/20 dark:hover:bg-primary/30">
                            View Invoice
                        </Link>
                         <button onClick={handlePrint} className="w-full sm:w-auto text-center bg-primary hover:bg-primary-dark text-white font-semibold py-2.5 px-6 rounded-lg transition-colors flex items-center justify-center">
                            <IconPrinter className="w-4 h-4 mr-2" />
                            Print
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingConfirmationPage;