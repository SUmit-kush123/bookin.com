import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Currency } from '../types';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (amount: number, fromCurrency: Currency) => string;
  convertToBase: (amount: number, fromCurrency: Currency) => number; // Base is USD
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Mock exchange rates relative to USD
const exchangeRates: Record<Currency, number> = {
  USD: 1,
  NPR: 133.5,
  INR: 83.4,
};

const currencySymbols: Record<Currency, string> = {
  USD: '$',
  NPR: 'Rs.',
  INR: '₹',
};

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<Currency>('USD');

  useEffect(() => {
    const savedCurrency = localStorage.getItem('bookin_currency') as Currency;
    if (savedCurrency && exchangeRates[savedCurrency]) {
      setCurrencyState(savedCurrency);
    }
  }, []);

  const setCurrency = (curr: Currency) => {
    setCurrencyState(curr);
    localStorage.setItem('bookin_currency', curr);
  };

  const convertToBase = (amount: number, fromCurrency: Currency): number => {
    if (amount == null || fromCurrency == null) return 0;
    // Base currency is USD
    return amount / exchangeRates[fromCurrency];
  };

  const formatPrice = (amount: number, fromCurrency: Currency): string => {
    if (amount == null || fromCurrency == null) {
      return 'N/A';
    }
    const amountInUSD = convertToBase(amount, fromCurrency);
    const convertedAmount = amountInUSD * exchangeRates[currency];
    const symbol = currencySymbols[currency];
    
    // For NPR and INR, don't show decimal points for cleaner display.
    const options = (currency === 'USD')
      ? { minimumFractionDigits: 2, maximumFractionDigits: 2 }
      : { minimumFractionDigits: 0, maximumFractionDigits: 0 };

    return `${symbol}${convertedAmount.toLocaleString(undefined, options)}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, convertToBase }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};