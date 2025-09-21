
import React from 'react';
import { BookingDetails } from '../../types';
import { IconQrcode } from '../../constants';
import { useCurrency } from '../../contexts/CurrencyProvider';

interface QRCodePaymentProps {
    booking: BookingDetails;
    onSubmit: () => Promise<void>;
    isLoading: boolean;
}

const QRCodePayment: React.FC<QRCodePaymentProps> = ({ booking, onSubmit, isLoading }) => {
    const { formatPrice } = useCurrency();
    const mockUpiId = "bookin@okhdfcbank"; // Example UPI ID
    const mockQrData = `upi://pay?pa=${mockUpiId}&pn=Bookin.com&am=${booking.totalPrice}&cu=${booking.currency}&tn=BookingID-${booking.id.slice(-6)}`;

    return (
        <div className="bg-white dark:bg-neutral-d-light/50 p-6 md:p-8 rounded-xl shadow-xl border border-neutral-extralight/60 dark:border-neutral-d-extralight/60">
            <h2 className="text-2xl font-semibold text-neutral-dark dark:text-neutral-d-dark mb-4 text-center">Scan to Pay</h2>
            <div className="flex flex-col items-center">
                <div className="bg-white p-4 rounded-lg shadow-inner border border-neutral-extralight">
                    {/* Placeholder for a real QR code library */}
                    <div className="w-48 h-48 bg-gray-200 flex items-center justify-center">
                        <IconQrcode className="w-32 h-32 text-gray-400" />
                    </div>
                </div>
                <p className="mt-4 text-sm text-neutral-DEFAULT dark:text-neutral-d-DEFAULT">Or pay using UPI ID:</p>
                <p className="font-mono text-lg font-semibold text-primary dark:text-accent-light bg-primary/10 dark:bg-accent/10 px-4 py-2 rounded-lg my-2">{mockUpiId}</p>
                
                <div className="text-center my-4 p-4 bg-amber-100/50 dark:bg-amber-800/20 rounded-lg border border-amber-200/80 dark:border-amber-700/50">
                    <p className="text-sm text-amber-800 dark:text-amber-300">
                        Scan the QR code with any UPI app (like Google Pay, PhonePe, Paytm) or enter the UPI ID to complete your payment of <strong className="font-bold">{formatPrice(booking.totalPrice, booking.currency)}</strong>.
                    </p>
                </div>
                
                <p className="text-xs text-neutral-DEFAULT dark:text-neutral-d-DEFAULT text-center mt-2">
                    This is a mock payment screen. No real transaction will occur.
                </p>

                <div className="w-full mt-6">
                    <button
                        onClick={onSubmit}
                        disabled={isLoading}
                        className="w-full bg-accent hover:bg-accent-dark text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-interactive transition-all duration-150 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                         {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Confirming...
                            </>
                        ) : 'I have completed the payment'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QRCodePayment;
