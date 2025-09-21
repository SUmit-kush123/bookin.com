import React, { useRef } from 'react';
import { IconChevronLeft, IconChevronRight } from '../../constants';

interface CarouselProps {
  children: React.ReactNode;
}

const Carousel: React.FC<CarouselProps> = ({ children }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.offsetWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative group">
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 dark:bg-neutral-d-light/80 rounded-full shadow-lg hover:bg-white dark:hover:bg-neutral-d-light transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0 -translate-x-1/2"
        aria-label="Scroll left"
      >
        <IconChevronLeft className="w-6 h-6 text-neutral-dark dark:text-neutral-d-dark" />
      </button>
      
      <div
        ref={scrollContainerRef}
        className="flex space-x-4 overflow-x-auto no-scrollbar py-2 -mx-4 px-4"
      >
        {children}
      </div>

      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 dark:bg-neutral-d-light/80 rounded-full shadow-lg hover:bg-white dark:hover:bg-neutral-d-light transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0 translate-x-1/2"
        aria-label="Scroll right"
      >
        <IconChevronRight className="w-6 h-6 text-neutral-dark dark:text-neutral-d-dark" />
      </button>
    </div>
  );
};

export default Carousel;