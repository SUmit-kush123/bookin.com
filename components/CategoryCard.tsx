import React from 'react';
import { Link } from 'react-router-dom';
import { BookingCategory } from '../types';
import { CATEGORY_ICONS, IconTicket } from '../constants';

interface CategoryCardProps {
  category: BookingCategory;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const IconComponent = CATEGORY_ICONS[category.slug] || IconTicket;

  return (
    <Link 
      to={`/listings/${category.slug}`}
      className="block group rounded-xl shadow-lg hover:shadow-card-hover dark:hover:shadow-dark-interactive transition-all duration-300 ease-in-out overflow-hidden transform hover:-translate-y-1.5 focus-visible:shadow-interactive"
      aria-label={`Explore ${category.name}`}
    >
      <div className="relative">
        <img 
          src={category.imagePlaceholder || `https://picsum.photos/seed/${category.slug}/600/400`} 
          alt={`${category.name} category`}
          loading="lazy"
          className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-5">
          <div className="flex items-center mb-1 text-white opacity-90 group-hover:opacity-100 transition-opacity">
            <IconComponent className="w-6 h-6 text-white flex-shrink-0" />
            <h3 className="ml-2.5 text-xl lg:text-2xl font-bold text-white drop-shadow-md">{category.name}</h3>
          </div>
        </div>
      </div>
      <div className="p-5 bg-white dark:bg-neutral-d-light/50">
        <p className="text-neutral-DEFAULT dark:text-neutral-d-DEFAULT text-sm mb-3 h-10 line-clamp-2">{category.description}</p>
        <span className="inline-flex items-center font-semibold text-primary dark:text-accent-light group-hover:text-primary-dark dark:group-hover:text-accent transition-colors duration-150">
          Explore {category.name} 
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 ml-1 transition-transform duration-150 group-hover:translate-x-0.5">
            <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
          </svg>
        </span>
      </div>
    </Link>
  );
};

export default CategoryCard;