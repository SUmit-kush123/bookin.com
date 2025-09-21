import React from 'react';
import { Link } from 'react-router-dom';
import { IconQuestionMarkCircle, IconChevronRight, IconMessageCircle, IconPhone, IconEnvelope } from '../constants'; // Added IconEnvelope

interface FAQItemProps {
  question: string;
  answer: React.ReactNode; // Allow JSX in answers
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="border-b border-neutral-extralight/70 dark:border-neutral-d-extralight/70 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-5 text-left text-neutral-dark dark:text-neutral-d-dark hover:text-primary dark:hover:text-accent-light transition-colors focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-base">{question}</span>
        <IconChevronRight className={`w-5 h-5 transform transition-transform duration-200 ${isOpen ? 'rotate-90 text-primary dark:text-accent-light' : 'text-neutral-DEFAULT dark:text-neutral-d-DEFAULT'}`} />
      </button>
      {isOpen && (
        <div className="pb-5 pr-2 sm:pr-5 text-neutral-DEFAULT dark:text-neutral-d-DEFAULT text-sm prose prose-sm dark:prose-invert max-w-none">
          {answer}
        </div>
      )}
    </div>
  );
};

const CustomerSupportPage: React.FC = () => {
  const faqs = [
    {
      question: "How do I make a booking on Bookin?",
      answer: <p>To make a booking, simply browse our categories or use the search bar. Once you find an item you like, click for details and use the booking form on that page. You'll provide basic info and (in a real app) payment details.</p>
    },
    {
      question: "How can I view my existing bookings?",
      answer: <p>If you're logged in, go to the <Link to="/my-bookings" className="text-primary hover:underline font-medium">My Bookings</Link> page, accessible from the header menu, to see all your past and current reservations.</p>
    },
    {
      question: "What is Bookin's cancellation policy?",
      answer: <p>Cancellation policies vary by the specific item or service booked. Details are typically provided during booking. For this demo application, real cancellation functionality isn't implemented.</p>
    },
    {
      question: "I have an issue with my booking. What should I do?",
      answer: <p>We're here to help! Please use the <Link to="/complaints" className="text-primary hover:underline font-medium">Submit a Complaint</Link> page or our <Link to="/inquiry" className="text-primary hover:underline font-medium">Booking Inquiry</Link> page. Alternatively, for urgent matters, you can (mock) call our helpline or email us.</p>
    },
    {
      question: "Is my payment information secure with Bookin?",
      answer: <p>Absolutely. In a real application, Bookin would use industry-standard encryption and trusted payment processors. This demo does not handle real payments.</p>
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex items-center mb-8 md:mb-12">
        <IconQuestionMarkCircle className="w-10 h-10 text-primary dark:text-accent-light mr-3 flex-shrink-0" />
        <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-dark dark:text-neutral-d-dark">Customer Support</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
        <div className="lg:col-span-2 bg-white dark:bg-neutral-d-light/50 rounded-xl shadow-xl p-6 md:p-8 border border-neutral-extralight/60 dark:border-neutral-d-extralight/60">
          <h2 className="text-2xl font-semibold text-neutral-dark dark:text-neutral-d-dark mb-6">Frequently Asked Questions</h2>
          <div className="space-y-1">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>

        <aside className="lg:col-span-1 space-y-8">
          <div className="bg-white dark:bg-neutral-d-light/50 rounded-xl shadow-xl p-6 border border-neutral-extralight/60 dark:border-neutral-d-extralight/60">
            <h3 className="text-xl font-semibold text-neutral-dark dark:text-neutral-d-dark mb-4 flex items-center">
              <IconMessageCircle className="w-6 h-6 mr-2.5 text-accent flex-shrink-0" />
              Contact Us
            </h3>
            <p className="text-neutral-DEFAULT dark:text-neutral-d-DEFAULT text-sm mb-3">
              Can't find what you're looking for? Our team is ready to assist.
            </p>
            <div className="space-y-3">
               <Link
                to="/inquiry" 
                className="w-full text-center block bg-primary hover:bg-primary-dark text-white font-medium py-2.5 px-5 rounded-lg transition-colors duration-150 ease-in-out shadow-md hover:shadow-interactive text-sm"
              >
                Ask a Detailed Question
              </Link>
              <Link
                to="/complaints" 
                className="w-full text-center block bg-secondary dark:bg-neutral-d-extralight hover:bg-secondary-dark dark:hover:bg-neutral-d-extralight/70 text-neutral-dark dark:text-neutral-d-dark font-medium py-2.5 px-5 rounded-lg transition-colors duration-150 ease-in-out shadow-sm hover:shadow-md text-sm"
              >
                Submit a Complaint
              </Link>
              <div className="text-sm text-neutral-DEFAULT dark:text-neutral-d-DEFAULT pt-2">
                <p className="flex items-center mt-3">
                  <IconEnvelope className="w-4 h-4 mr-2 text-primary/80 dark:text-accent-light/80 flex-shrink-0"/> 
                  Email: <a href="mailto:support@bookin.com" className="ml-1 text-primary dark:text-accent-light hover:underline">support@bookin.com</a>
                </p>
                <p className="flex items-center mt-1.5">
                  <IconPhone className="w-4 h-4 mr-2 text-primary/80 dark:text-accent-light/80 flex-shrink-0"/> 
                  Helpline: <span className="ml-1 text-primary dark:text-accent-light">(+1) 555-BOOKIN (mock)</span>
                </p>
              </div>
            </div>
          </div>
          <div className="bg-primary-extralight dark:bg-accent/10 text-primary-dark dark:text-accent-light rounded-xl shadow-lg p-6 border border-primary/20 dark:border-accent/20">
            <h3 className="text-xl font-semibold mb-3">Service Hours (Mock)</h3>
            <p className="text-sm">Monday - Friday: 9 AM - 6 PM</p>
            <p className="text-sm">Saturday: 10 AM - 4 PM</p>
            <p className="text-sm">Sunday: Closed</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CustomerSupportPage;