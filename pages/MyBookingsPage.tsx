import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useBookings } from '../contexts/BookingContext';
import BookingItemCard from '../components/BookingItemCard';
import { IconCalendar, IconTicket, IconChevronRight, IconSparkles, IconXCircle, APP_NAME, IconSearch } from '../constants';
import { useTranslation } from '../contexts/LanguageProvider';

type StatusFilter = 'all' | 'confirmed' | 'pending_payment' | 'cancelled';

const MyBookingsPage: React.FC = () => {
  const { bookings, isLoading, error } = useBookings();
  const t = useTranslation();
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBookings = useMemo(() => {
    return bookings
      .filter(booking => {
        const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
        const matchesSearch = searchTerm.trim() === '' || booking.itemName.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
      })
      .sort((a,b) => new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime());
  }, [bookings, statusFilter, searchTerm]);


  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center py-12 px-4">
        <IconSparkles className="w-16 h-16 text-primary dark:text-accent-light animate-pulse mb-4" />
        <p className="text-neutral-DEFAULT dark:text-neutral-d-DEFAULT text-lg">{t('loading')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center py-12 px-4">
        <IconXCircle className="w-16 h-16 text-danger mb-4" />
        <h1 className="text-2xl font-semibold text-danger mb-2">Error Loading Bookings</h1>
        <p className="text-neutral-DEFAULT dark:text-neutral-d-DEFAULT max-w-md mx-auto">{error}</p>
      </div>
    );
  }

  const statusFilters: { label: string, value: StatusFilter }[] = [
      { label: 'All', value: 'all' },
      { label: 'Confirmed', value: 'confirmed' },
      { label: 'Pending', value: 'pending_payment' },
      { label: 'Cancelled', value: 'cancelled' },
  ];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-8 md:mb-12 pt-2">
          <IconTicket className="w-10 h-10 text-primary dark:text-accent-light mr-3" />
          <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-dark dark:text-neutral-d-dark">{t('my_bookings_title')}</h1>
        </div>

        {/* Filter and Search Controls */}
        <div className="mb-8 p-4 bg-white dark:bg-neutral-d-light/50 rounded-xl shadow-lg border border-neutral-extralight/60 dark:border-neutral-d-extralight/60">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-grow">
                    <label htmlFor="search-bookings" className="sr-only">Search Bookings</label>
                    <div className="relative">
                        <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-DEFAULT" />
                        <input
                            type="text"
                            id="search-bookings"
                            placeholder="Search by name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-neutral-extralight dark:border-neutral-d-extralight rounded-md focus:ring-2 focus:ring-primary dark:focus:ring-accent"
                        />
                    </div>
                </div>
                <div className="flex items-center space-x-2 bg-secondary dark:bg-neutral-d-extralight p-1 rounded-md">
                    {statusFilters.map(filter => (
                        <button
                            key={filter.value}
                            onClick={() => setStatusFilter(filter.value)}
                            className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-colors ${statusFilter === filter.value ? 'bg-white dark:bg-neutral-d-light shadow text-primary dark:text-accent-light' : 'text-neutral-dark dark:text-neutral-d-dark hover:bg-white/50'}`}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>


        {filteredBookings.length === 0 ? (
          <div className="text-center py-16 md:py-20 bg-white dark:bg-neutral-d-light/50 rounded-xl shadow-xl border border-neutral-extralight/60 dark:border-neutral-d-extralight/60">
            <IconCalendar className="w-20 h-20 md:w-24 md:h-24 text-neutral-DEFAULT opacity-50 dark:text-neutral-d-DEFAULT mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-neutral-dark dark:text-neutral-d-dark mb-4">{searchTerm || statusFilter !== 'all' ? 'No matching bookings found.' : t('no_bookings_title')}</h2>
            <p className="text-neutral-DEFAULT dark:text-neutral-d-DEFAULT mb-8 max-w-md mx-auto">
              {searchTerm || statusFilter !== 'all' ? 'Try adjusting your filters or search term.' : t('no_bookings_subtitle').replace('{appName}', APP_NAME)}
            </p>
            <Link
              to="/"
              className="bg-primary hover:bg-primary-dark dark:bg-accent dark:hover:bg-accent-dark text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-150 ease-in-out shadow-md hover:shadow-interactive inline-flex items-center group"
            >
              {t('explore_and_book_now')}
              <IconChevronRight className="w-5 h-5 ml-2 transition-transform duration-150 group-hover:translate-x-1" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredBookings.map((booking) => (
              <BookingItemCard key={booking.id} booking={booking} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;