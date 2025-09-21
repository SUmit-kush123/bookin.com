import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookingCategorySlug } from '../types';
import { APP_NAME, IconChevronRight } from '../constants';


const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative text-white py-24 sm:py-32 px-4 rounded-xl shadow-2xl overflow-hidden mb-12 md:mb-16">
      <div className="absolute inset-0">
        <img 
          src="https://picsum.photos/seed/bookinhero2/1600/900" 
          alt={`Scenic background for ${APP_NAME} bookings`} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-primary/60 to-transparent"></div>
      </div>
      <div className="container mx-auto text-center relative z-10">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 drop-shadow-lg">
          Book Anything, Anytime, Anywhere
        </h1>
        <p className="text-lg sm:text-xl mb-10 max-w-2xl mx-auto drop-shadow-sm opacity-90">
          From luxury hotels and exotic flights to thrilling adventures and essential services, {APP_NAME} has you covered.
        </p>
        <button
          onClick={() => navigate(`/listings/${BookingCategorySlug.Hotels}`)}
          className="bg-accent hover:bg-accent-dark text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 ease-in-out shadow-lg hover:shadow-interactive dark:hover:shadow-dark-interactive focus:outline-none focus:ring-2 focus:ring-accent-light focus:ring-offset-2 focus:ring-offset-primary-dark transform hover:scale-105 inline-flex items-center group"
        >
          Find Your Next Stay
          <IconChevronRight className="w-5 h-5 ml-2 transition-transform duration-150 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};

export default HeroSection;