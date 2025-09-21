import React, { useState } from 'react';
import { useCurrency } from '../contexts/CurrencyProvider';
import { Currency } from '../types';
import { IconChevronDown } from '../constants';

const CurrencySwitcher: React.FC = () => {
  const { currency, setCurrency } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);

  const currencies: Currency[] = ['USD', 'NPR', 'INR'];

  const handleCurrencyChange = (curr: Currency) => {
    setCurrency(curr);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full text-neutral-dark dark:text-neutral-d-dark hover:bg-secondary dark:hover:bg-neutral-d-extralight transition-colors flex items-center"
        aria-label="Change currency"
      >
        <span className="text-sm font-semibold mr-1">{currency}</span>
        <IconChevronDown className="w-4 h-4" />
      </button>
      {isOpen && (
        <div 
            className="absolute right-0 mt-2 w-28 bg-white dark:bg-neutral-d-light rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 dark:ring-neutral-d-extralight z-50"
            onMouseLeave={() => setIsOpen(false)}
        >
          {currencies.map(curr => (
            <button
              key={curr}
              onClick={() => handleCurrencyChange(curr)}
              className={`block w-full text-left px-4 py-2 text-sm ${currency === curr ? 'font-bold text-primary dark:text-accent-light' : 'text-neutral-dark dark:text-neutral-d-dark'} hover:bg-secondary dark:hover:bg-neutral-d-extralight`}
            >
              {curr}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrencySwitcher;
