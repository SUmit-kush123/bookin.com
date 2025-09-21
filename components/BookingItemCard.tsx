import React from 'react';
import { BookingDetails, BookingCategorySlug } from '../types';
import { CATEGORY_ICONS, IconCalendar, IconUsers, IconTicket, IconPriceTag, IconChevronRight } from '../constants';
import { Link } from 'react-router-dom';
import { useCurrency } from '../contexts/CurrencyProvider';

interface BookingItemCardProps {
  booking: BookingDetails;
}

const BookingItemCard: React.FC<BookingItemCardProps> = ({ booking }) => {
  const { formatPrice } = useCurrency();

  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric', month: 'long', day: 'numeric',
    });
  };

  const CategoryIconComponent = CATEGORY_ICONS[booking.categorySlug] || IconTicket;

  const getStatusBadge = () => {
    switch (booking.status) {
      case 'confirmed':
        return <span className="text-xs font-medium px-2 py-0.5 bg-success/20 text-green-700 dark:text-green-300 dark:bg-green-500/10 rounded-full">Confirmed</span>;
      case 'pending_payment':
        return <span className="text-xs font-medium px-2 py-0.5 bg-amber-500/20 text-amber-700 dark:text-amber-400 dark:bg-amber-500/10 rounded-full">Pending Payment</span>;
      case 'cancelled':
        return <span className="text-xs font-medium px-2 py-0.5 bg-danger/20 text-red-700 dark:text-red-400 dark:bg-red-500/10 rounded-full">Cancelled</span>;
      default:
        return null;
    }
  };

  const renderBookingSpecificDetails = () => {
    const detailTextClass = "text-sm text-neutral-DEFAULT dark:text-neutral-d-DEFAULT";
    const strongTextClass = "font-medium text-neutral-dark dark:text-neutral-d-dark";

    if (booking.categorySlug === BookingCategorySlug.Hospitals) {
      return (
        <>
          {booking.doctor && (
            <>
              <p className={detailTextClass}><strong className={strongTextClass}>Doctor:</strong> {booking.doctor.name}</p>
              <p className={detailTextClass}><strong className={strongTextClass}>Department:</strong> {booking.doctor.departmentName}</p>
            </>
          )}
          {booking.facility && (
            <p className={detailTextClass}><strong className={strongTextClass}>Test/Facility:</strong> {booking.facility.name}</p>
          )}
          {booking.appointmentTime && (
            <p className={detailTextClass}><strong className={strongTextClass}>Appointment Time:</strong> {booking.appointmentTime}</p>
          )}
        </>
      );
    }
    
    if (booking.categorySlug === BookingCategorySlug.WeddingsEvents && booking.package) {
      return (
        <p className={detailTextClass}><strong className={strongTextClass}>Package Booked:</strong> {booking.package.name}</p>
      );
    }

    return (
      <>
        {booking.startDate && (
          <div className={`flex items-center ${detailTextClass}`}>
            <IconCalendar className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
            <span>
              {formatDate(booking.startDate)}
              {booking.endDate && ` - ${formatDate(booking.endDate)}`}
            </span>
          </div>
        )}
        {booking.participants && (
          <div className={`flex items-center mt-1 ${detailTextClass}`}>
            <IconUsers className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
            <span>{booking.participants} {booking.categorySlug === BookingCategorySlug.Hotels ? 'Guest(s)' : 'Participant(s)'}</span>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="bg-white dark:bg-neutral-d-light/50 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-card-hover dark:hover:shadow-dark-interactive flex flex-col group transform hover:-translate-y-1 focus-within:shadow-interactive dark:border dark:border-neutral-d-extralight/50">
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center text-primary dark:text-accent-light text-sm font-medium">
            <CategoryIconComponent className="w-4 h-4 mr-2" />
            <span>{booking.categorySlug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
          </div>
          {getStatusBadge()}
        </div>
        <h3 className="text-lg font-semibold text-neutral-dark dark:text-neutral-d-dark mb-2 transition-colors duration-150 group-hover:text-primary dark:group-hover:text-accent-light">{booking.itemName}</h3>
        
        <div className="space-y-1 mb-4 flex-grow">
          {renderBookingSpecificDetails()}
        </div>

        <div className="flex justify-between items-center mt-auto pt-3.5 border-t border-neutral-extralight/70 dark:border-neutral-d-extralight/70">
          <div className="flex items-center font-bold text-primary dark:text-accent-light">
            <IconPriceTag className="w-4 h-4 mr-1.5" />
            <span>{formatPrice(booking.totalPrice, booking.currency)}</span>
          </div>
          <Link
            to={booking.status === 'pending_payment' ? `/payment/${booking.id}` : `/confirmation/${booking.id}`}
            className="flex items-center text-sm font-medium text-accent hover:text-accent-dark dark:hover:text-amber-300 transition-colors"
          >
            {booking.status === 'pending_payment' ? 'Complete Payment' : 'View Details'}
            <IconChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingItemCard;