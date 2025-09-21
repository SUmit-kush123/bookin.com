import React, { useState } from 'react';
import { IconWandSparkles, IconSearch } from '../constants';

interface SearchBarProps {
  onAiSearch: (query: string) => Promise<void>;
  isAiSearching: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onAiSearch, isAiSearching }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onAiSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full bg-white/40 dark:bg-neutral-d-light/30 backdrop-blur-md p-3 rounded-xl shadow-2xl border border-white/30 dark:border-neutral-d-extralight/30">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <IconWandSparkles className="w-5 h-5 text-primary dark:text-accent-light" />
        </div>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isAiSearching}
          className="block w-full p-4 pl-12 text-md text-neutral-dark dark:text-neutral-d-dark border border-transparent rounded-lg bg-white/80 dark:bg-neutral-d-light/60 focus:ring-2 focus:ring-primary dark:focus:ring-accent focus:border-transparent outline-none transition-all duration-150 shadow-sm placeholder-neutral-DEFAULT dark:placeholder-neutral-d-DEFAULT disabled:opacity-70"
          placeholder="Describe your perfect trip... e.g., 'a quiet cabin in Pokhara with a fireplace for 3 days'"
        />
        <button
          type="submit"
          disabled={isAiSearching}
          className="text-white absolute right-2.5 bottom-2.5 bg-primary hover:bg-primary-dark dark:bg-accent dark:hover:bg-accent-dark font-medium rounded-lg text-sm px-5 py-2.5 transition-colors shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-wait"
        >
          {isAiSearching ? 'Thinking...' : 'Search'}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;