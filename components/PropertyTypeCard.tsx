import React from 'react';
import { Link } from 'react-router-dom';
import { PropertyType } from '../types';
import { PROPERTY_TYPE_ICONS, IconBuilding } from '../constants';

interface PropertyTypeCardProps {
  property: {
    name: string;
    image: string;
    type: PropertyType;
  };
}

const PropertyTypeCard: React.FC<PropertyTypeCardProps> = ({ property }) => {
  const IconComponent = PROPERTY_TYPE_ICONS[property.type] || IconBuilding;

  return (
    <Link 
      to={`/listings/hotels?propertyType=${property.type}`}
      className="block group rounded-xl shadow-lg hover:shadow-card-hover dark:hover:shadow-dark-interactive transition-all duration-300 ease-in-out overflow-hidden transform hover:-translate-y-1.5 focus-visible:shadow-interactive bg-white dark:bg-neutral-d-light/50 border border-neutral-extralight/60 dark:border-neutral-d-extralight/60"
      aria-label={`Explore ${property.name}`}
    >
      <div className="relative aspect-video">
        <img 
          src={property.image} 
          alt={`Image of ${property.name}`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
      </div>
      <div className="p-4 flex items-center">
         <div className="p-2 bg-primary/10 dark:bg-accent/10 rounded-full mr-3">
            <IconComponent className="w-5 h-5 text-primary dark:text-accent" />
         </div>
        <div>
            <h3 className="font-bold text-neutral-dark dark:text-neutral-d-dark group-hover:text-primary dark:group-hover:text-accent-light transition-colors">{property.name}</h3>
        </div>
      </div>
    </Link>
  );
};

export default PropertyTypeCard;
