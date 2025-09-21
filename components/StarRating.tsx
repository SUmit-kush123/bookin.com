
import React, { useState } from 'react';
import { IconStar } from '../constants';

interface StarRatingProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, size = 'md', color = 'text-yellow-400', interactive = false, onRatingChange }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const starSizeClass = { sm: 'w-4 h-4', md: 'w-5 h-5', lg: 'w-6 h-6' }[size];

  const handleClick = (index: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(index);
    }
  };
  
  const handleMouseEnter = (index: number) => {
    if (interactive) setHoverRating(index);
  };
  
  const handleMouseLeave = () => {
    if (interactive) setHoverRating(0);
  };
  
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const displayRating = hoverRating || rating;
    const isFilled = i <= displayRating;
    const isHalf = !Number.isInteger(displayRating) && i === Math.ceil(displayRating);

    stars.push(
      <div 
        key={i}
        className={`relative ${interactive ? 'cursor-pointer' : ''}`}
        onClick={() => handleClick(i)}
        onMouseEnter={() => handleMouseEnter(i)}
        onMouseLeave={handleMouseLeave}
        aria-label={interactive ? `Rate ${i} stars` : `${rating} out of 5 stars`}
      >
        <IconStar className={`${starSizeClass} ${isFilled ? color : 'text-gray-300'}`} />
        {isHalf && (
           <div className="absolute top-0 left-0 overflow-hidden w-1/2">
            <IconStar className={`${starSizeClass} ${color}`} />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center">
      {stars}
    </div>
  );
};

export default StarRating;
