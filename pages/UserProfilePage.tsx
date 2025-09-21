import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useBookings } from '../contexts/BookingContext';
import { useWishlist } from '../contexts/WishlistProvider';
import { useListings } from '../contexts/ListingsProvider';
import { IconUser, IconXCircle, IconTicket, IconHeart, IconPhoto } from '../constants';
import BookingItemCard from '../components/BookingItemCard';
import ListingCard from '../components/ListingCard';
import { bookingCategoriesData } from '../data/mockData';
import { BookingCategorySlug } from '../types';

const UserProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { user, isAuthenticated } = useAuth();
  const { bookings } = useBookings();
  const { wishlist } = useWishlist();
  const { listings } = useListings();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [name, setName] = useState(user?.name || '');

  if (!isAuthenticated || user?.id !== userId) {
    return (
      <div className="text-center py-20">
        <IconXCircle className="w-16 h-16 text-danger mx-auto mb-4" />
        <h1 className="text-2xl font-semibold text-danger mb-2">Access Denied</h1>
        <p className="text-neutral-DEFAULT dark:text-neutral-d-DEFAULT">You can only view your own profile.</p>
        <Link to="/" className="text-primary hover:underline mt-6 inline-block">Go Home</Link>
      </div>
    );
  }
  
  const recentBookings = bookings.slice(0, 3);
  const wishlistedItems = listings.filter(item => wishlist.some(w => w.listingId === item.id)).slice(0, 4);

  const getCategorySlug = (categoryId: string) => {
    return bookingCategoriesData.find(c => c.id === categoryId)?.slug || BookingCategorySlug.Hotels;
  };
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock update logic
    console.log("Updating name to:", name);
    // In a real app: await updateUser({ ...user, name });
    alert("Profile updated (mock)!");
    setIsEditModalOpen(false);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <header className="mb-10 md:mb-14">
          <div className="max-w-4xl mx-auto bg-white dark:bg-neutral-d-light/50 p-6 rounded-2xl shadow-xl border border-neutral-extralight/60 dark:border-neutral-d-extralight/60 flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
                <img src={user.avatar} alt={user.name} className="w-28 h-28 rounded-full object-cover shadow-lg border-4 border-white dark:border-neutral-d-light" />
                <button onClick={() => setIsEditModalOpen(true)} className="absolute bottom-1 right-1 bg-primary text-white p-1.5 rounded-full hover:bg-primary-dark transition-colors">
                    <IconPhoto className="w-4 h-4"/>
                </button>
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-extrabold text-neutral-dark dark:text-neutral-d-dark">{user.name}</h1>
              <p className="text-neutral-DEFAULT dark:text-neutral-d-DEFAULT mt-1">{user.email}</p>
              <p className="text-xs font-semibold uppercase text-accent dark:text-accent-light mt-2">{user.role}</p>
            </div>
             <button onClick={() => setIsEditModalOpen(true)} className="ml-auto bg-secondary dark:bg-neutral-d-extralight text-neutral-dark dark:text-neutral-d-dark px-4 py-2 rounded-lg text-sm font-medium hover:bg-secondary-dark transition-colors">
                Edit Profile
            </button>
          </div>
        </header>

        <main className="space-y-12">
          {/* Recent Bookings Section */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-neutral-dark dark:text-neutral-d-dark flex items-center"><IconTicket className="w-7 h-7 mr-3 text-accent"/> Recent Bookings</h2>
              <Link to="/my-bookings" className="text-sm font-medium text-primary hover:underline dark:text-accent-light">View All</Link>
            </div>
            {recentBookings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentBookings.map(booking => <BookingItemCard key={booking.id} booking={booking} />)}
              </div>
            ) : (
              <p className="text-center text-neutral-DEFAULT dark:text-neutral-d-DEFAULT bg-secondary/50 dark:bg-neutral-d-extralight/50 p-6 rounded-lg">No recent bookings found.</p>
            )}
          </section>

          {/* Wishlist Section */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-neutral-dark dark:text-neutral-d-dark flex items-center"><IconHeart className="w-7 h-7 mr-3 text-accent"/> My Wishlist</h2>
              <Link to="/wishlist" className="text-sm font-medium text-primary hover:underline dark:text-accent-light">View All</Link>
            </div>
            {wishlistedItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {wishlistedItems.map(item => <ListingCard key={item.id} item={item} categorySlug={getCategorySlug(item.categoryId)} />)}
              </div>
            ) : (
              <p className="text-center text-neutral-DEFAULT dark:text-neutral-d-DEFAULT bg-secondary/50 dark:bg-neutral-d-extralight/50 p-6 rounded-lg">Your wishlist is empty. Start exploring!</p>
            )}
          </section>
        </main>
      </div>
      
      {isEditModalOpen && (
         <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setIsEditModalOpen(false)}>
            <div className="bg-white dark:bg-neutral-d-light w-full max-w-md rounded-xl shadow-2xl" onClick={e => e.stopPropagation()}>
                <h3 className="p-4 text-lg font-semibold border-b border-neutral-extralight dark:border-neutral-d-extralight">Edit Profile</h3>
                <form onSubmit={handleProfileUpdate} className="p-6 space-y-4">
                     <div>
                        <label htmlFor="profile-name" className="block text-sm font-medium text-neutral-dark dark:text-neutral-d-dark mb-1">Full Name</label>
                        <input type="text" id="profile-name" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border border-neutral-extralight dark:border-neutral-d-extralight rounded-md"/>
                    </div>
                     <div>
                        <label htmlFor="profile-avatar" className="block text-sm font-medium text-neutral-dark dark:text-neutral-d-dark mb-1">Avatar (mock)</label>
                        <input type="file" id="profile-avatar" className="w-full text-sm"/>
                    </div>
                     <div className="flex justify-end gap-3 pt-4">
                        <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-sm bg-secondary dark:bg-neutral-d-extralight rounded-md hover:bg-secondary-dark">Cancel</button>
                        <button type="submit" className="px-4 py-2 text-sm bg-primary text-white rounded-md hover:bg-primary-dark">Save Changes</button>
                    </div>
                </form>
            </div>
         </div>
      )}
    </>
  );
};

export default UserProfilePage;
