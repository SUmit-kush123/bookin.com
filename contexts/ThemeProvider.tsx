import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = string; // e.g., "teal-light", "indigo-dark"

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  // Kept for backward compatibility with simple toggle, but now cycles themes
  toggleTheme: () => void; 
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const availableThemes: Theme[] = ['teal-light', 'teal-dark', 'indigo-light', 'indigo-dark'];

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(availableThemes[0]);

  useEffect(() => {
    // This script runs only once on initial load to prevent flicker
    const savedTheme = localStorage.getItem('bookin_theme_v2') as Theme;
    if (savedTheme && availableThemes.includes(savedTheme)) {
      setThemeState(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      document.documentElement.setAttribute('data-theme', availableThemes[0]);
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    if (!availableThemes.includes(newTheme)) {
        console.warn(`Theme ${newTheme} is not a valid theme.`);
        return;
    }
    try {
      localStorage.setItem('bookin_theme_v2', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
      setThemeState(newTheme);
    } catch (e) {
      console.error('Failed to set theme:', e);
    }
  };

  const toggleTheme = () => {
    // This simple toggle now cycles through the available themes
    const currentIndex = availableThemes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % availableThemes.length;
    setTheme(availableThemes[nextIndex]);
  };


  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};