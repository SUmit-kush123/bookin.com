import React from 'react';
import { Link } from 'react-router-dom';
import { IconBell, IconSparkles } from '../constants'; // Reusing IconBell

const NotificationsPage: React.FC = () => {
  // Placeholder notifications
  const notifications = [
    { id: 1, title: 'Booking Confirmed!', message: 'Your booking for Grand City Hotel (ID: booking-12345) is confirmed.', date: '2 hours ago', read: false, type: 'success' },
    { id: 2, title: 'New Message', message: 'You have a new message regarding your upcoming flight to Horizon City.', date: '1 day ago', read: false, type: 'info' },
    { id: 3, title: 'Special Offer', message: 'Get 20% off on adventure bookings this weekend!', date: '3 days ago', read: true, type: 'promo' },
    { id: 4, title: 'Reminder: Check-in Tomorrow', message: 'Your check-in for Cozy Mountain Lodge is tomorrow.', date: '10 hours ago', read: false, type: 'reminder' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex items-center mb-8 md:mb-12">
        <IconBell className="w-10 h-10 text-primary dark:text-accent-light mr-3" />
        <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-dark dark:text-neutral-d-dark">Notifications</h1>
      </div>

      {notifications.length > 0 ? (
        <div className="bg-white dark:bg-neutral-d-light/50 rounded-xl shadow-xl p-0 md:p-2 border border-neutral-extralight/60 dark:border-neutral-d-extralight/60">
          <ul className="divide-y divide-neutral-extralight dark:divide-neutral-d-extralight">
            {notifications.map(notification => (
              <li key={notification.id} className={`p-4 md:p-5 hover:bg-secondary-extralight/50 dark:hover:bg-neutral-d-extralight/50 transition-colors duration-150 ${!notification.read ? 'bg-primary/5 dark:bg-primary/10' : ''}`}>
                <div className="flex items-start space-x-3">
                  <div className={`mt-1 flex-shrink-0 p-1.5 rounded-full ${
                    notification.type === 'success' ? 'bg-success/20 text-success' :
                    notification.type === 'info' ? 'bg-sky-500/20 text-sky-600' :
                    notification.type === 'promo' ? 'bg-purple-500/20 text-purple-600' :
                    notification.type === 'reminder' ? 'bg-amber-500/20 text-amber-600' :
                    'bg-neutral-DEFAULT/20 text-neutral-dark'
                  }`}>
                    <IconSparkles className="w-4 h-4" /> {/* Generic icon, could be type-specific */}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className={`text-sm font-semibold ${!notification.read ? 'text-neutral-dark dark:text-neutral-d-dark' : 'text-neutral-DEFAULT dark:text-neutral-d-DEFAULT'}`}>{notification.title}</h3>
                      <p className="text-xs text-neutral-DEFAULT dark:text-neutral-d-DEFAULT">{notification.date}</p>
                    </div>
                    <p className={`text-sm mt-0.5 ${!notification.read ? 'text-neutral-dark dark:text-neutral-d-dark' : 'text-neutral-DEFAULT dark:text-neutral-d-DEFAULT'}`}>{notification.message}</p>
                  </div>
                   {!notification.read && <span className="mt-1 w-2 h-2 bg-primary dark:bg-accent-light rounded-full flex-shrink-0" aria-label="Unread"></span>}
                </div>
              </li>
            ))}
          </ul>
           <p className="p-4 text-center text-xs text-neutral-DEFAULT dark:text-neutral-d-DEFAULT">(This is a placeholder page with mock notifications.)</p>
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-neutral-d-light/50 rounded-xl shadow-xl border border-neutral-extralight/60 dark:border-neutral-d-extralight/60">
          <IconBell className="w-20 h-20 text-neutral-DEFAULT opacity-50 dark:text-neutral-d-DEFAULT mx-auto mb-6" />
          <h2 className="text-2xl font-semibold text-neutral-dark dark:text-neutral-d-dark mb-3">No New Notifications</h2>
          <p className="text-neutral-DEFAULT dark:text-neutral-d-DEFAULT">You're all caught up!</p>
        </div>
      )}
       <div className="mt-8 text-center">
            <button className="text-sm text-primary dark:text-accent-light hover:underline">Mark all as read (placeholder)</button>
      </div>
    </div>
  );
};

export default NotificationsPage;