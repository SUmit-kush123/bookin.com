import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBookings } from '../contexts/BookingContext';
import { BookingDetails } from '../types';
import { IconSparkles, IconXCircle, APP_NAME, IconLogo, IconPrinter } from '../constants';
import { useCurrency } from '../contexts/CurrencyProvider';

const InvoicePage: React.FC = () => {
    const { bookingId } = useParams<{ bookingId: string }>();
    const { getBookingById } = useBookings();
    const [booking, setBooking] = useState<BookingDetails | null>(null);
    const { formatPrice } = useCurrency();

    useEffect(() => {
        if (bookingId) {
            const foundBooking = getBookingById(bookingId);
            setBooking(foundBooking || null);
        }
    }, [bookingId, getBookingById]);
    
    const handlePrint = () => {
        window.print();
    };

    if (booking === undefined) {
        return (
          <div className="min-h-[60vh] flex flex-col items-center justify-center text-center py-12 px-4">
            <IconSparkles className="w-16 h-16 text-primary dark:text-accent-light animate-pulse mb-4" />
            <p className="text-neutral-DEFAULT dark:text-neutral-d-DEFAULT text-lg">Loading Invoice...</p>
          </div>
        );
    }

    if (booking === null) {
         return (
          <div className="min-h-[60vh] flex flex-col items-center justify-center text-center py-12 px-4">
            <IconXCircle className="w-16 h-16 text-danger mb-4" />
            <h1 className="text-2xl font-semibold text-danger mb-2">Invoice Not Found</h1>
            <p className="text-neutral-DEFAULT dark:text-neutral-d-DEFAULT max-w-md mx-auto">Could not find details for the requested booking invoice.</p>
            <Link to="/my-bookings" className="text-primary hover:underline dark:text-accent-light dark:hover:text-accent mt-6 inline-block bg-primary/10 dark:bg-primary/20 px-4 py-2 rounded-md">View All My Bookings</Link>
          </div>
        );
    }
    
    const lineItems = [
      { description: `Booking for "${booking.itemName}"`, quantity: 1, price: booking.totalPrice }
    ];
    // In a real app, you'd break down taxes, fees, etc.
    const subtotal = lineItems.reduce((acc, item) => acc + item.price, 0);
    const taxes = subtotal * 0.0; // Mock 0% tax
    const total = subtotal + taxes;


  return (
    <div className="bg-neutral-light dark:bg-neutral-d-light py-8 print:bg-white print:dark:bg-white">
        <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-white dark:bg-neutral-d-light/50 dark:print:bg-white p-8 md:p-12 rounded-xl shadow-2xl print:shadow-none border border-neutral-extralight dark:border-neutral-d-extralight">
                <header className="flex justify-between items-start pb-6 border-b border-neutral-extralight dark:border-neutral-d-extralight">
                    <div>
                        <Link to="/" className="flex items-center space-x-2 text-primary dark:text-accent-light">
                            <IconLogo className="w-8 h-8"/>
                            <span className="text-3xl font-bold">{APP_NAME}</span>
                        </Link>
                        <p className="text-xs text-neutral-DEFAULT dark:text-neutral-d-DEFAULT mt-1">123 Travel Lane, Kathmandu, Nepal</p>
                    </div>
                    <div className="text-right">
                        <h1 className="text-4xl font-extrabold uppercase text-neutral-dark dark:text-neutral-d-dark">Invoice</h1>
                        <p className="text-sm text-neutral-DEFAULT dark:text-neutral-d-DEFAULT mt-1"># {booking.id.slice(-10)}</p>
                        <p className="text-sm text-neutral-DEFAULT dark:text-neutral-d-DEFAULT">Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
                    </div>
                </header>
                
                <section className="grid grid-cols-2 gap-8 my-8 text-sm">
                    <div>
                        <h2 className="font-semibold text-neutral-dark dark:text-neutral-d-dark mb-1">Bill To:</h2>
                        <p className="font-medium text-primary dark:text-accent-light">{booking.userName}</p>
                        <p className="text-neutral-DEFAULT dark:text-neutral-d-DEFAULT">{booking.userEmail}</p>
                    </div>
                    <div className="text-right">
                        <h2 className="font-semibold text-neutral-dark dark:text-neutral-d-dark mb-1">Payment Status:</h2>
                        <p className={`font-bold ${booking.status === 'confirmed' ? 'text-success' : 'text-danger'}`}>
                            {booking.status === 'confirmed' ? 'Paid / Confirmed' : 'Payment Pending'}
                        </p>
                    </div>
                </section>

                <section>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead className="bg-secondary dark:bg-neutral-d-extralight/50">
                                <tr>
                                    <th className="text-left font-semibold text-neutral-dark dark:text-neutral-d-dark p-3">Description</th>
                                    <th className="text-center font-semibold text-neutral-dark dark:text-neutral-d-dark p-3">Quantity</th>
                                    <th className="text-right font-semibold text-neutral-dark dark:text-neutral-d-dark p-3">Unit Price</th>
                                    <th className="text-right font-semibold text-neutral-dark dark:text-neutral-d-dark p-3">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lineItems.map((item, i) => (
                                     <tr key={i} className="border-b border-neutral-extralight dark:border-neutral-d-extralight">
                                        <td className="p-3 text-neutral-dark dark:text-neutral-d-dark">{item.description}</td>
                                        <td className="p-3 text-center text-neutral-DEFAULT dark:text-neutral-d-DEFAULT">{item.quantity}</td>
                                        <td className="p-3 text-right text-neutral-DEFAULT dark:text-neutral-d-DEFAULT">{formatPrice(item.price, booking.currency)}</td>
                                        <td className="p-3 text-right font-medium text-neutral-dark dark:text-neutral-d-dark">{formatPrice(item.quantity * item.price, booking.currency)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="flex justify-end mt-8 text-sm">
                    <div className="w-full max-w-xs space-y-2">
                        <div className="flex justify-between">
                            <span className="text-neutral-DEFAULT dark:text-neutral-d-DEFAULT">Subtotal:</span>
                            <span className="font-medium text-neutral-dark dark:text-neutral-d-dark">{formatPrice(subtotal, booking.currency)}</span>
                        </div>
                         <div className="flex justify-between">
                            <span className="text-neutral-DEFAULT dark:text-neutral-d-DEFAULT">Taxes (0%):</span>
                            <span className="font-medium text-neutral-dark dark:text-neutral-d-dark">{formatPrice(taxes, booking.currency)}</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-neutral-extralight dark:border-neutral-d-extralight text-lg">
                            <span className="font-bold text-neutral-dark dark:text-neutral-d-dark">Total Due:</span>
                            <span className="font-bold text-primary dark:text-accent-light">{formatPrice(total, booking.currency)}</span>
                        </div>
                    </div>
                </section>
                
                <footer className="mt-12 pt-6 border-t border-neutral-extralight dark:border-neutral-d-extralight text-center text-xs text-neutral-DEFAULT dark:text-neutral-d-DEFAULT print:hidden">
                    <p>Thank you for booking with {APP_NAME}! If you have any questions, please contact our support team.</p>
                     <button
                        onClick={handlePrint}
                        className="mt-6 bg-primary hover:bg-primary-dark text-white font-semibold py-2.5 px-6 rounded-lg transition-colors duration-150 ease-in-out shadow-md hover:shadow-interactive flex items-center justify-center mx-auto"
                    >
                        <IconPrinter className="w-5 h-5 mr-2" />
                        Print Invoice
                    </button>
                </footer>

            </div>
        </div>
    </div>
  );
};

export default InvoicePage;