import React, { useState } from 'react';
import { IconLayoutDashboard, IconTicket, IconDollarSign, IconBuildingStorefront, IconPlus, IconMessageDots, IconUsers, IconClipboardList, IconTrash } from '../constants';
import { useAuth } from '../contexts/AuthContext';
import { useListings } from '../contexts/ListingsProvider';
import EditListingModal from '../components/dashboard/EditListingModal';
import { ListingItem } from '../types';
import { useCurrency } from '../contexts/CurrencyProvider';

const mockBookings = [
  { id: 'booking-1', listingName: 'Everest Base Camp Trek', customer: 'Alex Ray', date: '2024-10-15', revenue: 1500, status: 'Confirmed' },
  { id: 'booking-2', listingName: 'Gokarna Forest Resort, Kathmandu', customer: 'Bethany C', date: '2024-11-20', revenue: 5000, status: 'Confirmed' },
  { id: 'booking-3', listingName: 'Everest Base Camp Trek', customer: 'Charles D', date: '2024-10-22', revenue: 1500, status: 'Pending' },
  { id: 'booking-4', listingName: 'Modern Apartment in Patan', customer: 'Diana E', date: '2024-09-28', revenue: 80, status: 'Cancelled' },
];

const mockMessages = [
    { id: 'msg-1', customer: 'Alex Ray', listing: 'Everest Base Camp Trek', snippet: 'Hi, can you confirm the pickup time...?'},
    { id: 'msg-2', customer: 'Frank G', listing: 'Modern Apartment in Patan', snippet: 'Is early check-in possible?'},
];

const mockRevenueData = [
  { month: 'Jan', revenue: 4000 }, { month: 'Feb', revenue: 3000 }, { month: 'Mar', revenue: 5000 },
  { month: 'Apr', revenue: 4500 }, { month: 'May', revenue: 6000 }, { month: 'Jun', revenue: 8000 },
];

interface DashboardCardProps {
  title: string;
  value: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

interface Task {
    id: number;
    text: string;
    completed: boolean;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon: Icon }) => (
  <div className="bg-white dark:bg-neutral-d-light/50 p-6 rounded-xl shadow-lg border border-neutral-extralight/60 dark:border-neutral-d-extralight/60 flex items-center space-x-4">
    <div className="bg-primary/10 dark:bg-accent/10 p-3 rounded-full">
      <Icon className="w-6 h-6 text-primary dark:text-accent" />
    </div>
    <div>
      <p className="text-sm text-neutral-DEFAULT dark:text-neutral-d-DEFAULT">{title}</p>
      <p className="text-2xl font-bold text-neutral-dark dark:text-neutral-d-dark">{value}</p>
    </div>
  </div>
);

const RevenueChart: React.FC<{ data: { month: string, revenue: number }[] }> = ({ data }) => {
    const maxRevenue = Math.max(...data.map(d => d.revenue));
    return (
        <div className="w-full h-64 bg-secondary-extralight/50 dark:bg-neutral-d-extralight/30 rounded-lg p-4 flex items-end space-x-2">
            {data.map(d => (
                <div key={d.month} className="flex-1 flex flex-col items-center justify-end group">
                    <div className="w-full bg-primary/20 dark:bg-accent/20 group-hover:bg-primary/40 dark:group-hover:bg-accent/40 rounded-t-md transition-all relative">
                         <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-neutral-dark text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            ${d.revenue.toLocaleString()}
                         </div>
                         <div style={{ height: `${(d.revenue / maxRevenue) * 100}%` }} className="bg-primary dark:bg-accent rounded-t-md w-full"></div>
                    </div>
                    <p className="text-xs text-neutral-DEFAULT dark:text-neutral-d-DEFAULT mt-1">{d.month}</p>
                </div>
            ))}
        </div>
    );
};

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { listings } = useListings();
  const { formatPrice } = useCurrency();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState<ListingItem | null>(null);
  const [tasks, setTasks] = useState<Task[]>([
      { id: 1, text: 'Confirm booking #booking-3', completed: false },
      { id: 2, text: 'Reply to Frank G\'s message', completed: true },
      { id: 3, text: 'Update pricing for Everest Trek', completed: false },
  ]);
  const [newTask, setNewTask] = useState('');
  
  const hostListings = listings.slice(0, 4);

  const handleEditClick = (listing: ListingItem) => {
    setSelectedListing(listing);
    setIsEditModalOpen(true);
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'bg-success/20 text-green-700 dark:text-green-300';
      case 'Pending': return 'bg-amber-500/20 text-amber-700 dark:text-amber-400';
      case 'Cancelled': return 'bg-danger/20 text-red-700 dark:text-red-400';
      default: return 'bg-secondary dark:bg-neutral-d-extralight text-neutral-dark dark:text-neutral-d-dark';
    }
  };

  const handleAddTask = (e: React.FormEvent) => {
      e.preventDefault();
      if (newTask.trim() === '') return;
      setTasks([...tasks, { id: Date.now(), text: newTask.trim(), completed: false }]);
      setNewTask('');
  };

  const handleToggleTask = (id: number) => {
      setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };
  
  const handleDeleteTask = (id: number) => {
      setTasks(tasks.filter(task => task.id !== id));
  }
  
  return (
    <>
      {isEditModalOpen && selectedListing && (
        <EditListingModal 
          listing={selectedListing}
          onClose={() => setIsEditModalOpen(false)}
          onSave={(updatedListing) => {
            console.log("Saving (mock):", updatedListing);
            setIsEditModalOpen(false);
          }}
        />
      )}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <header className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-dark dark:text-neutral-d-dark">Host Dashboard</h1>
          <p className="text-neutral-DEFAULT dark:text-neutral-d-DEFAULT mt-1">Welcome back, <span className="font-semibold text-primary dark:text-accent-light">{user?.name || 'Host'}</span>! Manage your listings and bookings here.</p>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard title="Total Listings" value={hostListings.length.toString()} icon={IconBuildingStorefront} />
          <DashboardCard title="Active Bookings" value={mockBookings.filter(b => b.status === 'Confirmed').length.toString()} icon={IconTicket} />
          <DashboardCard title="Total Guests (Mo)" value="124" icon={IconUsers} />
          <DashboardCard title="Total Revenue (Mo)" value="$8,000" icon={IconDollarSign} />
        </section>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white dark:bg-neutral-d-light/50 p-6 rounded-xl shadow-xl border border-neutral-extralight/60 dark:border-neutral-d-extralight/60">
              <h2 className="text-xl font-semibold text-neutral-dark dark:text-neutral-d-dark mb-4">Revenue Analytics (YTD)</h2>
              <RevenueChart data={mockRevenueData} />
            </section>
            
            <section className="bg-white dark:bg-neutral-d-light/50 p-6 rounded-xl shadow-xl border border-neutral-extralight/60 dark:border-neutral-d-extralight/60">
              <h2 className="text-xl font-semibold text-neutral-dark dark:text-neutral-d-dark mb-4">Recent Bookings</h2>
              <div className="overflow-x-auto">
                 <table className="min-w-full text-sm">
                      <thead className="text-left text-neutral-DEFAULT dark:text-neutral-d-DEFAULT font-medium border-b border-neutral-extralight dark:border-neutral-d-extralight">
                          <tr>
                              <th className="p-2">Listing</th><th className="p-2">Customer</th><th className="p-2">Date</th>
                              <th className="p-2 text-right">Revenue</th><th className="p-2 text-center">Status</th>
                          </tr>
                      </thead>
                      <tbody>
                        {mockBookings.map(b => (
                            <tr key={b.id} className="border-b border-neutral-extralight dark:border-neutral-d-extralight last:border-0">
                                <td className="p-2 font-medium text-neutral-dark dark:text-neutral-d-dark">{b.listingName}</td>
                                <td className="p-2">{b.customer}</td><td className="p-2">{b.date}</td>
                                <td className="p-2 text-right">{formatPrice(b.revenue, 'USD')}</td>
                                <td className="p-2 text-center">
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(b.status)}`}>{b.status}</span>
                                </td>
                            </tr>
                        ))}
                      </tbody>
                 </table>
              </div>
            </section>
          </div>

          <aside className="lg:col-span-1 space-y-8">
               <section className="bg-white dark:bg-neutral-d-light/50 p-6 rounded-xl shadow-xl border border-neutral-extralight/60 dark:border-neutral-d-extralight/60">
                  <h2 className="text-xl font-semibold text-neutral-dark dark:text-neutral-d-dark mb-4 flex items-center"><IconClipboardList className="w-6 h-6 mr-2 text-accent"/>Task Reminders</h2>
                  <form onSubmit={handleAddTask} className="flex gap-2 mb-4">
                      <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Add a new task..." className="flex-grow p-2 text-sm border border-neutral-extralight dark:border-neutral-d-extralight rounded-md"/>
                      <button type="submit" className="p-2 bg-primary dark:bg-accent text-white rounded-md"><IconPlus className="w-5 h-5"/></button>
                  </form>
                  <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
                      {tasks.map(task => (
                          <div key={task.id} className="flex items-center text-sm group">
                              <input type="checkbox" checked={task.completed} onChange={() => handleToggleTask(task.id)} className="w-4 h-4 text-primary rounded mr-2"/>
                              <span className={`flex-grow ${task.completed ? 'line-through text-neutral-DEFAULT' : 'text-neutral-dark dark:text-neutral-d-dark'}`}>{task.text}</span>
                              <button onClick={() => handleDeleteTask(task.id)} className="ml-2 text-danger opacity-0 group-hover:opacity-100 transition-opacity"><IconTrash className="w-4 h-4"/></button>
                          </div>
                      ))}
                  </div>
              </section>

               <section className="bg-white dark:bg-neutral-d-light/50 p-6 rounded-xl shadow-xl border border-neutral-extralight/60 dark:border-neutral-d-extralight/60">
                  <h2 className="text-xl font-semibold text-neutral-dark dark:text-neutral-d-dark mb-4">My Listings</h2>
                  <div className="space-y-3">
                     {hostListings.map(listing => (
                         <div key={listing.id} className="flex justify-between items-center text-sm">
                             <span className="font-medium text-neutral-dark dark:text-neutral-d-dark truncate pr-2">{listing.name}</span>
                             <button onClick={() => handleEditClick(listing)} className="text-primary dark:text-accent-light hover:underline text-xs font-semibold flex-shrink-0">Edit</button>
                         </div>
                     ))}
                     <button className="w-full mt-3 bg-accent/10 dark:bg-accent/20 text-accent dark:text-accent-light font-medium py-2 px-4 rounded-lg shadow-sm transition-colors flex items-center justify-center text-sm">
                          <IconPlus className="w-4 h-4 mr-1.5"/> Add New Listing
                     </button>
                  </div>
              </section>

              <section className="bg-white dark:bg-neutral-d-light/50 p-6 rounded-xl shadow-xl border border-neutral-extralight/60 dark:border-neutral-d-extralight/60">
                  <h2 className="text-xl font-semibold text-neutral-dark dark:text-neutral-d-dark mb-4">Guest Messages</h2>
                  <div className="space-y-4">
                      {mockMessages.map(msg => (
                          <div key={msg.id} className="text-sm">
                            <p className="font-semibold text-neutral-dark dark:text-neutral-d-dark">{msg.customer} <span className="font-normal text-neutral-DEFAULT">re: {msg.listing}</span></p>
                            <p className="text-neutral-DEFAULT dark:text-neutral-d-DEFAULT truncate italic">"{msg.snippet}"</p>
                          </div>
                      ))}
                      <button className="text-sm text-primary dark:text-accent-light hover:underline w-full text-left pt-2">View all messages</button>
                  </div>
              </section>
          </aside>
        </main>
      </div>
    </>
  );
};

export default DashboardPage;