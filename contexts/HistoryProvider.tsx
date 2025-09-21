import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SearchHistoryItem } from '../types';

interface HistoryContextType {
  history: SearchHistoryItem[];
  addSearchToHistory: (term: string) => void;
  clearHistory: () => void;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

const HISTORY_STORAGE_KEY = 'bookin_search_history_v1';

export const HistoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);

  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (e) {
      console.error("Failed to parse search history:", e);
      setHistory([]);
    }
  }, []);

  const saveHistoryToStorage = (newHistory: SearchHistoryItem[]) => {
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(newHistory));
    } catch (e) {
      console.error("Failed to save search history:", e);
    }
  };

  const addSearchToHistory = (term: string) => {
    if (!term.trim()) return;

    setHistory(prevHistory => {
      const newItem: SearchHistoryItem = {
        id: `search-${Date.now()}`,
        term: term.trim(),
        timestamp: new Date().toISOString(),
      };

      // Remove existing entry of the same term before adding to the top
      const filteredHistory = prevHistory.filter(h => h.term.toLowerCase() !== term.toLowerCase());
      
      const updatedHistory = [newItem, ...filteredHistory].slice(0, 20); // Keep last 20 searches
      saveHistoryToStorage(updatedHistory);
      return updatedHistory;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    saveHistoryToStorage([]);
  };

  return (
    <HistoryContext.Provider value={{ history, addSearchToHistory, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = (): HistoryContextType => {
  const context = useContext(HistoryContext);
  if (context === undefined) {
    throw new Error('useHistory must be used within a HistoryProvider');
  }
  return context;
};