import React, { useState } from 'react';
import { BookingDetails } from '../types';
import { IconCreditCard, IconUser, IconCalendar, IconLockClosed } from '../constants';

interface PaymentFormProps {
    booking: BookingDetails;
    onSubmit: () => Promise<void>;
    isLoading: boolean;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ booking, onSubmit, isLoading }) => {
    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');
    const [error, setError] = useState('');

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!cardName.trim() || !cardNumber.trim() || !expiry.trim() || !cvc.trim()) {
            setError('Please fill in all card details.');
            return;
        }
        // Basic format validation (mock)
        if (!/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/.test(cardNumber)) {
             setError('Please enter a valid 16-digit card number (e.g., 1234 5678 1234 5678).');
             return;
        }
        if (!/^\d{2}\s\/\s\d{2}$/.test(expiry)) {
            setError('Please enter expiry in MM / YY format.');
            return;
        }
        if (!/^\d{3,4}$/.test(cvc)) {
            setError('Please enter a valid 3 or 4 digit CVC.');
            return;
        }
        
        onSubmit();
    };
    
    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
        if (value.length <= 19) {
            setCardNumber(value);
        }
    };
    
    const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\s\/\s/g, '').replace(/\D/g, '');
        if (value.length > 2) {
            value = value.slice(0, 2) + ' / ' + value.slice(2);
        }
        if (value.length <= 7) {
            setExpiry(value);
        }
    };

    const inputBaseClasses = "w-full p-3 pl-10 border border-neutral-extralight dark:border-neutral-d-extralight rounded-md focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all duration-150 shadow-sm text-neutral-dark dark:text-neutral-d-dark bg-white dark:bg-neutral-d-light/50 placeholder-neutral-DEFAULT dark:placeholder-neutral-d-DEFAULT";
    const iconBaseClasses = "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-DEFAULT/70 dark:text-neutral-d-DEFAULT/70";

    return (
        <div className="bg-white dark:bg-neutral-d-light/50 p-6 md:p-8 rounded-xl shadow-xl border border-neutral-extralight/60 dark:border-neutral-d-extralight/60">
            <h2 className="text-2xl font-semibold text-neutral-dark dark:text-neutral-d-dark mb-6">Enter Card Details</h2>
            <form onSubmit={handleFormSubmit} className="space-y-5">
                {error && <p className="text-sm text-center text-red-600 bg-red-100 p-3 rounded-md border border-red-200">{error}</p>}
                
                <div>
                    <label htmlFor="card-name" className="block text-sm font-medium text-neutral-dark dark:text-neutral-d-dark mb-1">Name on Card</label>
                    <div className="relative">
                        <IconUser className={iconBaseClasses} />
                        <input type="text" id="card-name" value={cardName} onChange={e => setCardName(e.target.value)} required className={inputBaseClasses} placeholder="John Doe" />
                    </div>
                </div>

                <div>
                    <label htmlFor="card-number" className="block text-sm font-medium text-neutral-dark dark:text-neutral-d-dark mb-1">Card Number</label>
                    <div className="relative">
                        <IconCreditCard className={iconBaseClasses} />
                        <input type="text" id="card-number" value={cardNumber} onChange={handleCardNumberChange} required inputMode="numeric" className={inputBaseClasses} placeholder="1234 5678 1234 5678" />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label htmlFor="expiry-date" className="block text-sm font-medium text-neutral-dark dark:text-neutral-d-dark mb-1">Expiry Date</label>
                        <div className="relative">
                            <IconCalendar className={iconBaseClasses} />
                            <input type="text" id="expiry-date" value={expiry} onChange={handleExpiryChange} required className={inputBaseClasses} placeholder="MM / YY" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="cvc" className="block text-sm font-medium text-neutral-dark dark:text-neutral-d-dark mb-1">CVC / CVV</label>
                        <div className="relative">
                            <IconLockClosed className={iconBaseClasses} />
                            <input type="text" id="cvc" value={cvc} onChange={e => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))} required inputMode="numeric" className={inputBaseClasses} placeholder="123" />
                        </div>
                    </div>
                </div>

                <p className="text-xs text-neutral-DEFAULT dark:text-neutral-d-DEFAULT text-center pt-2">
                    This is a mock payment form. No real card details are required or processed.
                </p>

                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-accent hover:bg-accent-dark text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-interactive transition-all duration-150 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                         {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing Payment...
                            </>
                        ) : `Pay $${booking.totalPrice.toFixed(2)} Securely`}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PaymentForm;