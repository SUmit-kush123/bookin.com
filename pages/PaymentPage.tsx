
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useBookings } from '../contexts/BookingContext';
import { BookingDetails } from '../types';
import { useCurrency } from '../contexts/CurrencyProvider';
import PaymentForm from '../components/PaymentForm';
import { 
    IconCreditCard, IconSparkles, IconXCircle,
    IconGPay, IconKhalti, IconEsewa, IconVisa, IconMastercard, IconQrcode 
} from '../constants';
import QRCodePayment from '../components/ui/QRCodePayment';
import { useNotifications } from '../contexts/NotificationProvider';


const PaymentPage: React.FC = () => {
    const { bookingId } = useParams<{ bookingId: string }>();
    const navigate = useNavigate();
    const { getBookingById, confirmBookingPayment, isLoading: isContextLoading } = useBookings();
    const { formatPrice } = useCurrency();
    const { sendNotification } = useNotifications();

    const [booking, setBooking] = useState<BookingDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<'qr' | 'upi' | 'wallet' | 'card' | 'banking' | null>('card');

    useEffect(() => {
        if (!bookingId) {
            setError("No booking ID provided.");
            setIsLoading(false);
            return;
        }
        
        const bookingFromContext = getBookingById(bookingId);
        if (bookingFromContext) {
            if(bookingFromContext.status === 'confirmed') {
                navigate(`/confirmation/${bookingId}`, { replace: true });
            } else {
                 setBooking(bookingFromContext);
            }
        } else {
            setError("Booking details not found. Please go back to 'My Bookings'.");
        }
        setIsLoading(false);
    }, [bookingId, getBookingById, navigate]);

    const handlePaymentSubmit = async () => {
        if (!booking) return;

        try {
            await confirmBookingPayment(booking.id);
            sendNotification('Booking Confirmed!', {
                body: `Your booking for "${booking.itemName}" is now confirmed.`,
            });
            navigate(`/confirmation/${booking.id}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred during payment confirmation.');
        }
    };
    
    const paymentOptions = [
        { id: 'card', name: 'Cards (Credit/Debit)', methods: [{name: 'Visa', icon: IconVisa}, {name: 'Mastercard', icon: IconMastercard}]},
        { id: 'qr', name: 'Scan & Pay (QR)', methods: [{name: 'QR', icon: IconQrcode}]},
        { id: 'wallet', name: 'Wallets', methods: [{name: 'Khalti', icon: IconKhalti}, {name: 'eSewa', icon: IconEsewa}]},
        { id: 'upi', name: 'UPI', methods: [{name: 'Google Pay', icon: IconGPay}, {name: 'PhonePe', icon: IconGPay}, {name: 'Paytm', icon: IconGPay}]},
    ];

    if (isLoading || (isContextLoading && !booking)) {
        return (
          <div className="min-h-[60vh] flex flex-col items-center justify-center text-center py-12 px-4">
            <IconSparkles className="w-16 h-16 text-primary dark:text-accent-light animate-pulse mb-4" />
            <p className="text-neutral-DEFAULT dark:text-neutral-d-DEFAULT text-lg">Loading Payment Details...</p>
          </div>
        );
    }

    if (error || !booking) {
         return (
          <div className="min-h-[60vh] flex flex-col items-center justify-center text-center py-12 px-4">
            <IconXCircle className="w-16 h-16 text-danger mb-4" />
            <h1 className="text-2xl font-semibold text-danger mb-2">Error Loading Payment Page</h1>
            <p className="text-neutral-DEFAULT dark:text-neutral-d-DEFAULT max-w-md mx-auto">{error || "Could not find booking details."}</p>
            <Link to="/my-bookings" className="text-primary hover:underline mt-6 inline-block bg-primary/10 px-4 py-2 rounded-md">View All My Bookings</Link>
          </div>
        );
    }

    const renderPaymentContent = () => {
        switch(selectedCategory) {
            case 'card':
                return <PaymentForm booking={booking} onSubmit={handlePaymentSubmit} isLoading={isContextLoading} />;
            case 'qr':
                return <QRCodePayment booking={booking} onSubmit={handlePaymentSubmit} isLoading={isContextLoading} />;
            case 'upi':
            case 'wallet':
            case 'banking':
                return (
                    <div className="bg-white dark:bg-neutral-d-light/50 p-6 md:p-8 rounded-xl shadow-xl border border-neutral-extralight/60 dark:border-neutral-d-extralight/60 text-center">
                        <h2 className="text-2xl font-semibold text-neutral-dark dark:text-neutral-d-dark mb-4">Feature Coming Soon</h2>
                        <p className="text-neutral-DEFAULT dark:text-neutral-d-DEFAULT">
                            This payment method is not yet implemented in this demo. Please select 'Cards' or 'Scan & Pay' to proceed.
                        </p>
                    </div>
                );
            default:
                return null;
        }
    }

    return (
        <div className="min-h-screen py-8 bg-secondary-extralight/50 dark:bg-neutral-d-extralight/20">
            <div className="container mx-auto px-4">
                <header className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold text-neutral-dark dark:text-neutral-d-dark">Secure Payment</h1>
                    <p className="text-neutral-DEFAULT dark:text-neutral-d-DEFAULT mt-1">You are paying for: <strong className="text-neutral-dark dark:text-neutral-d-dark">{booking.itemName}</strong></p>
                    <p className="text-2xl font-bold text-primary dark:text-accent-light mt-2">{formatPrice(booking.totalPrice, booking.currency)}</p>
                </header>

                <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <aside className="lg:col-span-1">
                        <div className="bg-white dark:bg-neutral-d-light/50 p-4 rounded-xl shadow-lg border border-neutral-extralight/60 dark:border-neutral-d-extralight/60">
                            <h3 className="font-semibold text-neutral-dark dark:text-neutral-d-dark mb-3 px-2">Payment Methods</h3>
                            <ul className="space-y-1">
                                {paymentOptions.map(cat => (
                                    <li key={cat.id}>
                                        <button 
                                            onClick={() => setSelectedCategory(cat.id as any)}
                                            className={`w-full flex items-center justify-between text-left p-3 rounded-lg text-sm transition-colors ${selectedCategory === cat.id ? 'bg-primary/10 dark:bg-accent/10 text-primary dark:text-accent-light font-semibold' : 'hover:bg-secondary/70 dark:hover:bg-neutral-d-extralight/70'}`}
                                        >
                                            <span className="capitalize">{cat.name}</span>
                                            <div className="flex items-center space-x-1.5">
                                                {cat.methods.slice(0, 3).map((method, i) => (
                                                    <method.icon key={i} className="h-4 w-auto" />
                                                ))}
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                    <main className="lg:col-span-3">
                        {renderPaymentContent()}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;