import React from 'react';

interface SkeletonLoaderProps {
  type: 'card' | 'text' | 'title' | 'avatar' | 'detail-image' | 'detail-form';
  className?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ type, className }) => {
  const baseClass = 'animate-pulse bg-neutral-extralight/80 dark:bg-neutral-d-extralight/50 rounded-md';

  switch (type) {
    case 'card':
      return (
        <div className={`space-y-3 p-3 border border-neutral-extralight/50 dark:border-neutral-d-extralight/50 rounded-lg ${className}`}>
          <div className={`${baseClass} h-40 w-full rounded-md`}></div>
          <div className="space-y-2">
            <div className={`${baseClass} h-5 w-3/4`}></div>
            <div className={`${baseClass} h-4 w-1/2`}></div>
            <div className={`${baseClass} h-12 w-full mt-2`}></div>
            <div className="flex justify-between items-center pt-2">
                <div className={`${baseClass} h-6 w-1/3`}></div>
                <div className={`${baseClass} h-8 w-1/4 rounded-md`}></div>
            </div>
          </div>
        </div>
      );
    case 'text':
      return <div className={`${baseClass} h-4 ${className || 'w-full'}`}></div>;
    case 'title':
      return <div className={`${baseClass} h-8 ${className || 'w-1/2'}`}></div>;
    case 'avatar':
      return <div className={`${baseClass} rounded-full ${className || 'w-16 h-16'}`}></div>;
    case 'detail-image':
        return <div className={`${baseClass} aspect-[4/3] lg:aspect-auto lg:h-full ${className || ''}`}></div>
    case 'detail-form':
        return (
            <div className={`space-y-6 p-6 ${className || ''}`}>
                <div className={`${baseClass} h-8 w-3/4 mx-auto`}></div>
                <div className="grid grid-cols-2 gap-4">
                    <div className={`${baseClass} h-10 w-full`}></div>
                    <div className={`${baseClass} h-10 w-full`}></div>
                </div>
                 <div className={`${baseClass} h-10 w-full`}></div>
                 <div className={`${baseClass} h-20 w-full`}></div>
                 <div className="flex justify-between pt-4">
                    <div className={`${baseClass} h-8 w-1/4`}></div>
                    <div className={`${baseClass} h-8 w-1/3`}></div>
                 </div>
                 <div className={`${baseClass} h-12 w-full`}></div>
            </div>
        )
    default:
      return <div className={`${baseClass} ${className || 'w-full h-10'}`}></div>;
  }
};

export default SkeletonLoader;