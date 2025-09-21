
import React from 'react';
import { useTheme } from '../../contexts/ThemeProvider';
import { IconSun, IconMoon } from '../../constants';

const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  const isDark = theme.includes('dark');
  const Icon = isDark ? IconMoon : IconSun;
  const nextThemeName = theme.startsWith('teal') ? 'Indigo' : 'Teal';
  
  return (
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full text-neutral-dark dark:text-neutral-d-dark hover:bg-secondary dark:hover:bg-neutral-d-extralight transition-colors"
        aria-label={`Switch theme. Current is ${theme}.`}
        title={`Switch to ${nextThemeName} theme`}
      >
        <Icon className="w-5 h-5" />
      </button>
  );
};

export default ThemeSwitcher;
