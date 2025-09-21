import React from 'react';
import { useHistory } from '../contexts/HistoryProvider';
import { IconSearch, IconTrash, IconChevronRight } from '../constants';
import { Link } from 'react-router-dom';

const HistoryPage: React.FC = () => {
  const { history, clearHistory } = useHistory();

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear your entire search history? This action cannot be undone.')) {
      clearHistory();
    }
  };
  
  const formatTimestamp = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="flex justify-between items-center mb-8 md:mb-12">
        <div className="flex items-center">
          <IconSearch className="w-10 h-10 text-primary dark:text-accent-light mr-3" />
          <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-dark dark:text-neutral-d-dark">Search History</h1>
        </div>
        {history.length > 0 && (
          <button
            onClick={handleClearHistory}
            className="flex items-center text-sm font-medium text-danger hover:text-red-700 dark:hover:text-red-400 bg-danger/10 hover:bg-danger/20 px-4 py-2 rounded-lg transition-colors"
          >
            <IconTrash className="w-4 h-4 mr-1.5" />
            Clear History
          </button>
        )}
      </header>

      {history.length === 0 ? (
        <div className="text-center py-16 md:py-20 bg-white dark:bg-neutral-d-light/50 rounded-xl shadow-xl border border-neutral-extralight/60 dark:border-neutral-d-extralight/60">
          <IconSearch className="w-20 h-20 md:w-24 md:h-24 text-neutral-DEFAULT opacity-50 dark:text-neutral-d-DEFAULT mx-auto mb-6" />
          <h2 className="text-2xl font-semibold text-neutral-dark dark:text-neutral-d-dark mb-4">Your search history is empty.</h2>
          <p className="text-neutral-DEFAULT dark:text-neutral-d-DEFAULT mb-8 max-w-md mx-auto">
            Searches you make on the homepage will appear here for easy access.
          </p>
          <Link
            to="/"
            className="bg-primary hover:bg-primary-dark dark:bg-accent dark:hover:bg-accent-dark text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-150 ease-in-out shadow-md hover:shadow-lg inline-flex items-center group"
          >
            Start Searching
            <IconChevronRight className="w-5 h-5 ml-2 transition-transform duration-150 group-hover:translate-x-1" />
          </Link>
        </div>
      ) : (
        <div className="bg-white dark:bg-neutral-d-light/50 rounded-xl shadow-xl p-0 md:p-2 border border-neutral-extralight/60 dark:border-neutral-d-extralight/60">
          <ul className="divide-y divide-neutral-extralight dark:divide-neutral-d-extralight">
            {history.map(item => (
              <li key={item.id} className="p-4 md:p-5">
                <div className="flex justify-between items-center">
                  <div>
                    <Link 
                        to={`/listings/hotels?query=${encodeURIComponent(item.term)}`}
                        className="font-semibold text-primary dark:text-accent-light hover:underline"
                    >
                        {item.term}
                    </Link>
                    <p className="text-xs text-neutral-DEFAULT dark:text-neutral-d-DEFAULT mt-1">
                      Searched on: {formatTimestamp(item.timestamp)}
                    </p>
                  </div>
                  <Link 
                      to={`/listings/hotels?query=${encodeURIComponent(item.term)}`}
                      className="text-sm font-medium text-accent hover:text-accent-dark transition-colors"
                  >
                    <IconChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;