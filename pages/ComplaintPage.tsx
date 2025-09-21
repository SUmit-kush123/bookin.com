import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconExclamationTriangle, IconEnvelope, IconUser, IconTicket } from '../constants';
import { useAuth } from '../contexts/AuthContext'; // To prefill user data if logged in

const ComplaintPage: React.FC = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [bookingId, setBookingId] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const inputBaseClasses = "w-full p-3 pl-10 border border-neutral-extralight dark:border-neutral-d-extralight rounded-md focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all duration-150 shadow-sm text-neutral-dark dark:text-neutral-d-dark bg-white dark:bg-neutral-d-light/50 placeholder-neutral-DEFAULT dark:placeholder-neutral-d-DEFAULT";
  const iconBaseClasses = "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-DEFAULT/70 dark:text-neutral-d-DEFAULT/70";


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!name.trim() || !email.trim() || !subject.trim() || !description.trim()) {
      setError('Please fill in all required fields: Name, Email, Subject, and Description.');
      setIsLoading(false);
      return;
    }
     if (!/^\S+@\S+\.\S+$/.test(email)) {
        setError('Please enter a valid email address.');
        setIsLoading(false);
        return;
    }

    // Simulate API call
    console.log("Submitting complaint:", { name, email, bookingId, subject, description });
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
    
    setIsLoading(false);
    setIsSubmitted(true);
    // In a real app, you would handle success/error from the API.
  };

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 py-12 md:py-16 text-center">
        <IconExclamationTriangle className="w-16 h-16 text-success mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-neutral-dark dark:text-neutral-d-dark mb-4">Complaint Submitted</h1>
        <p className="text-neutral-DEFAULT dark:text-neutral-d-DEFAULT mb-8 max-w-md mx-auto">
          Thank you for reaching out. Your complaint has been (mock) submitted. Our team will review it and get back to you shortly (this is a demo, so no real action will be taken).
        </p>
        <Link
          to="/"
          className="bg-primary hover:bg-primary-dark text-white font-semibold py-2.5 px-6 rounded-lg transition-colors"
        >
          Back to Homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex items-center mb-8 md:mb-12">
        <IconExclamationTriangle className="w-10 h-10 text-primary dark:text-accent-light mr-3" />
        <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-dark dark:text-neutral-d-dark">Submit a Complaint</h1>
      </div>

      <div className="bg-white dark:bg-neutral-d-light/50 rounded-xl shadow-xl p-6 md:p-10 border border-neutral-extralight/60 dark:border-neutral-d-extralight/60 max-w-2xl mx-auto">
        <p className="text-neutral-DEFAULT dark:text-neutral-d-DEFAULT mb-6 text-sm">
          We're sorry to hear you've had an issue. Please provide as much detail as possible so we can assist you effectively.
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
           {error && <p className="text-sm text-center text-red-600 bg-red-100 p-3 rounded-md border border-red-200">{error}</p>}
          <div>
            <label htmlFor="complaint-name" className="block text-sm font-medium text-neutral-dark dark:text-neutral-d-dark mb-1">Your Name *</label>
             <div className="relative">
                <IconUser className={iconBaseClasses} />
                <input type="text" id="complaint-name" value={name} onChange={e => setName(e.target.value)} required className={inputBaseClasses} placeholder="Enter your full name"/>
             </div>
          </div>
          <div>
            <label htmlFor="complaint-email" className="block text-sm font-medium text-neutral-dark dark:text-neutral-d-dark mb-1">Your Email *</label>
            <div className="relative">
                <IconEnvelope className={iconBaseClasses} />
                <input type="email" id="complaint-email" value={email} onChange={e => setEmail(e.target.value)} required className={inputBaseClasses} placeholder="Enter your email address"/>
            </div>
          </div>
          <div>
            <label htmlFor="complaint-booking-id" className="block text-sm font-medium text-neutral-dark dark:text-neutral-d-dark mb-1">Booking ID (Optional)</label>
            <div className="relative">
                <IconTicket className={iconBaseClasses} />
                <input type="text" id="complaint-booking-id" value={bookingId} onChange={e => setBookingId(e.target.value)} className={inputBaseClasses} placeholder="e.g., booking-12345abc"/>
            </div>
          </div>
          <div>
            <label htmlFor="complaint-subject" className="block text-sm font-medium text-neutral-dark dark:text-neutral-d-dark mb-1">Subject *</label>
            <input type="text" id="complaint-subject" value={subject} onChange={e => setSubject(e.target.value)} required className={`${inputBaseClasses} pl-3`} placeholder="Briefly describe the issue"/>
          </div>
          <div>
            <label htmlFor="complaint-description" className="block text-sm font-medium text-neutral-dark dark:text-neutral-d-dark mb-1">Detailed Description *</label>
            <textarea id="complaint-description" value={description} onChange={e => setDescription(e.target.value)} required rows={5} className={`${inputBaseClasses} pl-3 min-h-[120px]`} placeholder="Please provide all relevant details..."></textarea>
          </div>
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
                  Submitting...
                </>
              ) : 'Submit Complaint'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComplaintPage;