
import React from 'react';
import { Link } from 'react-router-dom';
import { IconSearch } from '../constants'; // Using IconSearch as a generic 'lost' icon

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center py-12 px-4">
        <IconSearch className="w-24 h-24 md:w-32 md:h-32 text-primary opacity-50 mb-8" />
      <h1 className="text-5xl md:text-7xl font-extrabold text-primary mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-neutral-dark mb-6">Oops! Page Not Found.</h2>
      <p className="text-neutral-DEFAULT mb-10 max-w-md">
        The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-150 ease-in-out shadow-md hover:shadow-lg"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;
