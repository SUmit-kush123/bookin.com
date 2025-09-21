import React, { useState } from 'react';
import { WeddingPackage } from '../types';
import { IconUser, IconEnvelope, IconCalendar, IconUsers, IconHeart } from '../constants';

interface WeddingInquiryFormProps {
  venueName: string;
  packages: WeddingPackage[];
}

const WeddingInquiryForm: React.FC<WeddingInquiryFormProps> = ({ venueName, packages }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [guestCount, setGuestCount] = useState<number | ''>('');
  const [selectedPackage, setSelectedPackage] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const inputBaseClasses = "w-full p-3 border border-neutral-extralight rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-150 shadow-sm text-neutral-dark placeholder-neutral-DEFAULT";
  const iconBaseClasses = "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-DEFAULT/70";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim() || !email.trim() || !eventDate || !guestCount || !message.trim()) {
      setError('Please fill in all required fields.');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    
    setIsLoading(true);
    // Mock API call
    console.log("Submitting Wedding Inquiry:", { venueName, name, email, eventDate, guestCount, selectedPackage, message });
    await new Promise(res => setTimeout(res, 1500));
    setIsLoading(false);
    setIsSubmitted(true);
  };
  
  if (isSubmitted) {
    return (
        <div className="text-center p-4">
            <IconHeart className="w-12 h-12 text-success mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-neutral-dark">Thank You!</h3>
            <p className="text-sm text-neutral-DEFAULT mt-2">
                Your inquiry for {venueName} has been sent. Our event planner will contact you shortly. (This is a mock submission).
            </p>
        </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-600 bg-red-100 p-3 rounded-md my-2 text-sm border border-red-200">{error}</p>}
      
      <div>
        <label htmlFor="inquiry-name" className="sr-only">Your Name</label>
        <div className="relative">
          <IconUser className={iconBaseClasses} />
          <input type="text" id="inquiry-name" value={name} onChange={e => setName(e.target.value)} required placeholder="Your Name *" className={`${inputBaseClasses} pl-10`} />
        </div>
      </div>
      <div>
        <label htmlFor="inquiry-email" className="sr-only">Your Email</label>
        <div className="relative">
          <IconEnvelope className={iconBaseClasses} />
          <input type="email" id="inquiry-email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="Your Email *" className={`${inputBaseClasses} pl-10`} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
            <label htmlFor="inquiry-date" className="sr-only">Event Date</label>
            <div className="relative">
                <IconCalendar className={iconBaseClasses} />
                <input type="date" id="inquiry-date" value={eventDate} onChange={e => setEventDate(e.target.value)} required min={new Date().toISOString().split('T')[0]} className={`${inputBaseClasses} pl-10`} title="Event Date"/>
            </div>
        </div>
        <div>
            <label htmlFor="inquiry-guests" className="sr-only">Number of Guests</label>
            <div className="relative">
                <IconUsers className={iconBaseClasses} />
                <input type="number" id="inquiry-guests" value={guestCount} onChange={e => setGuestCount(e.target.value === '' ? '' : parseInt(e.target.value, 10))} min="1" required placeholder="Guests *" className={`${inputBaseClasses} pl-10`} />
            </div>
        </div>
      </div>

       <div>
        <label htmlFor="inquiry-package" className="sr-only">Preferred Package</label>
        <div className="relative">
          <IconHeart className={iconBaseClasses} />
          <select id="inquiry-package" value={selectedPackage} onChange={e => setSelectedPackage(e.target.value)} className={`${inputBaseClasses} pl-10 pr-10 appearance-none bg-white`}>
            <option value="">Select a package (optional)</option>
            {packages.map(pkg => (
              <option key={pkg.id} value={pkg.name}>{pkg.name} - ${pkg.price.toLocaleString()}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="inquiry-message" className="sr-only">Your Message</label>
        <textarea id="inquiry-message" value={message} onChange={e => setMessage(e.target.value)} required rows={4} className={`${inputBaseClasses} min-h-[100px] pl-3`} placeholder="Tell us more about your event... *"></textarea>
      </div>

      <div className="pt-2">
        <button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-interactive transition-all duration-150 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center">
          {isLoading ? 'Sending Inquiry...' : 'Send Inquiry'}
        </button>
      </div>
    </form>
  );
};

export default WeddingInquiryForm;
