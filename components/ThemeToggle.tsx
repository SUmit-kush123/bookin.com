import React from 'react';
import { useTheme } from '../contexts/ThemeProvider';
import { IconSun, IconMoon } from '../constants';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isLight = !theme.includes('dark');

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-neutral-dark dark:text-neutral-d-dark hover:bg-secondary dark:hover:bg-neutral-d-extralight transition-colors"
      aria-label={`Switch to ${isLight ? 'dark' : 'light'} mode`}
    >
      {isLight ? (
        <IconMoon className="w-5 h-5" />
      ) : (
        <IconSun className="w-5 h-5" />
      )}
    </button>
  );
};

export default ThemeToggle;
