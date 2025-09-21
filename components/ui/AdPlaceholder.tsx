
import React from 'react';
import { APP_NAME } from '../../constants';

interface AdPlaceholderProps {
  type: 'sidebar-skyscraper' | 'horizontal-banner';
}

const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ type }) => {
  const containerClasses = {
    'sidebar-skyscraper': 'w-full h-64 md:h-96',
    'horizontal-banner': 'w-full h-24 md:h-32',
  };

  return (
    <div
      className={`
        ${containerClasses[type]}
        flex items-center justify-center 
        bg-secondary-extralight/80 dark:bg-neutral-d-extralight/40 
        rounded-lg border-2 border-dashed border-neutral-extralight dark:border-neutral-d-extralight
        text-center p-4
      `}
    >
      <div className="text-neutral-DEFAULT dark:text-neutral-d-DEFAULT opacity-70">
        <p className="text-sm font-semibold">Advertisement</p>
        <p className="text-xs mt-1">
          Your ad could be here! Contact sales@{APP_NAME.toLowerCase()}.example
        </p>
      </div>
    </div>
  );
};

export default AdPlaceholder;
