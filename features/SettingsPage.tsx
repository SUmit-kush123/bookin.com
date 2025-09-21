import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { APP_NAME, IconCog, IconUser, IconEnvelope, IconLockClosed, IconBell, IconPhoto } from '../constants';

const SettingsPage: React.FC = () => {
  const { user, logout } = useAuth(); // Assuming logout might be here

  // Mock form state
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  // Add more states for other settings like password change, preferences, etc.
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [profileVisibility, setProfileVisibility] = useState('public');

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock update logic
    console.log('Updating profile:', { name, email });
    alert('Profile updated (mock)!');
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock password change logic
    alert('Password change initiated (mock)!');
  };
  
  const inputBaseClasses = "w-full p-3 pl-10 border border-neutral-extralight dark:border-neutral-d-extralight rounded-md focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all duration-150 shadow-sm text-neutral-dark dark:text-neutral-d-dark bg-white dark:bg-neutral-d-light/50 placeholder-neutral-DEFAULT dark:placeholder-neutral-d-DEFAULT disabled:bg-secondary dark:disabled:bg-neutral-d-extralight/50";
  const iconBaseClasses = "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-DEFAULT/70 dark:text-neutral-d-DEFAULT/70";


  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p>Please log in to access settings.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="flex items-center mb-8 md:mb-12">
        <IconCog className="w-10 h-10 text-primary dark:text-accent-light mr-3 flex-shrink-0" />
        <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-dark dark:text-neutral-d-dark">Account Settings</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Sidebar or Main Settings Area */}
        <div className="md:col-span-2 space-y-8">
          {/* Profile Information */}
          <section className="bg-white dark:bg-neutral-d-light/50 p-6 rounded-xl shadow-xl border border-neutral-extralight/60 dark:border-neutral-d-extralight/60">
            <h2 className="text-xl font-semibold text-neutral-dark dark:text-neutral-d-dark mb-5 flex items-center">
                <IconUser className="w-6 h-6 mr-2.5 text-accent"/> Profile Information
            </h2>
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div>
                <label htmlFor="settings-name" className="block text-sm font-medium text-neutral-dark dark:text-neutral-d-dark mb-1">Full Name</label>
                <div className="relative">
                    <IconUser className={iconBaseClasses} />
                    <input type="text" id="settings-name" value={name} onChange={e => setName(e.target.value)} className={inputBaseClasses} />
                </div>
              </div>
              <div>
                <label htmlFor="settings-email" className="block text-sm font-medium text-neutral-dark dark:text-neutral-d-dark mb-1">Email Address</label>
                 <div className="relative">
                    <IconEnvelope className={iconBaseClasses} />
                    <input type="email" id="settings-email" value={email} onChange={e => setEmail(e.target.value)} className={inputBaseClasses} />
                 </div>
              </div>
               <div>
                <label htmlFor="settings-avatar" className="block text-sm font-medium text-neutral-dark dark:text-neutral-d-dark mb-1">Profile Picture (Mock)</label>
                <div className="flex items-center space-x-3">
                    <img src={`https://picsum.photos/seed/${user.id}/80/80`} alt="User avatar" className="w-16 h-16 rounded-full object-cover shadow-sm"/>
                    <div className="relative flex-grow">
                        <IconPhoto className={iconBaseClasses} />
                        <input type="file" id="settings-avatar" className={`${inputBaseClasses} pt-3 leading-tight`} />
                    </div>
                </div>
              </div>
              <button type="submit" className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-5 rounded-lg shadow-sm hover:shadow-md transition-colors text-sm">Save Profile</button>
            </form>
          </section>

          {/* Password Settings */}
          <section className="bg-white dark:bg-neutral-d-light/50 p-6 rounded-xl shadow-xl border border-neutral-extralight/60 dark:border-neutral-d-extralight/60">
            <h2 className="text-xl font-semibold text-neutral-dark dark:text-neutral-d-dark mb-5 flex items-center">
                <IconLockClosed className="w-6 h-6 mr-2.5 text-accent"/> Change Password
            </h2>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label htmlFor="current-password" className="block text-sm font-medium text-neutral-dark dark:text-neutral-d-dark mb-1">Current Password</label>
                <div className="relative">
                     <IconLockClosed className={iconBaseClasses} />
                    <input type="password" id="current-password" className={inputBaseClasses} placeholder="Enter current password"/>
                </div>
              </div>
              <div>
                <label htmlFor="new-password" className="block text-sm font-medium text-neutral-dark dark:text-neutral-d-dark mb-1">New Password</label>
                 <div className="relative">
                    <IconLockClosed className={iconBaseClasses} />
                    <input type="password" id="new-password" className={inputBaseClasses} placeholder="Enter new password"/>
                 </div>
              </div>
              <div>
                <label htmlFor="confirm-new-password" className="block text-sm font-medium text-neutral-dark dark:text-neutral-d-dark mb-1">Confirm New Password</label>
                <div className="relative">
                    <IconLockClosed className={iconBaseClasses} />
                    <input type="password" id="confirm-new-password" className={inputBaseClasses} placeholder="Confirm new password"/>
                </div>
              </div>
              <button type="submit" className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-5 rounded-lg shadow-sm hover:shadow-md transition-colors text-sm">Update Password</button>
            </form>
          </section>
        </div>

        {/* Right Sidebar for Preferences/Other Settings */}
        <aside className="md:col-span-1 space-y-8">
          <section className="bg-white dark:bg-neutral-d-light/50 p-6 rounded-xl shadow-xl border border-neutral-extralight/60 dark:border-neutral-d-extralight/60">
            <h2 className="text-xl font-semibold text-neutral-dark dark:text-neutral-d-dark mb-5 flex items-center">
                <IconBell className="w-6 h-6 mr-2.5 text-accent"/> Notification Preferences
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <label htmlFor="email-notifications" className="text-neutral-dark dark:text-neutral-d-dark">Email Notifications</label>
                <input type="checkbox" id="email-notifications" checked={notificationsEnabled} onChange={() => setNotificationsEnabled(!notificationsEnabled)} className="form-checkbox h-5 w-5 text-primary rounded focus:ring-accent" />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="sms-notifications" className="text-neutral-dark dark:text-neutral-d-dark">SMS Alerts (Mock)</label>
                <input type="checkbox" id="sms-notifications" className="form-checkbox h-5 w-5 text-primary rounded focus:ring-accent" />
              </div>
               <p className="text-xs text-neutral-DEFAULT dark:text-neutral-d-DEFAULT pt-2">Manage how {APP_NAME} communicates with you.</p>
            </div>
          </section>

          <section className="bg-white dark:bg-neutral-d-light/50 p-6 rounded-xl shadow-xl border border-neutral-extralight/60 dark:border-neutral-d-extralight/60">
            <h2 className="text-xl font-semibold text-neutral-dark dark:text-neutral-d-dark mb-5 flex items-center">
                <IconCog className="w-6 h-6 mr-2.5 text-accent"/> Account Actions
            </h2>
            <div className="space-y-3">
                 <button 
                    onClick={() => alert('Profile visibility settings coming soon!')}
                    className="w-full text-left text-sm text-neutral-dark dark:text-neutral-d-dark hover:bg-secondary-extralight dark:hover:bg-neutral-d-extralight/50 p-2 rounded-md transition-colors"
                >
                    Profile Visibility: <span className="font-medium text-primary dark:text-accent-light">{profileVisibility.charAt(0).toUpperCase() + profileVisibility.slice(1)}</span>
                </button>
                <button 
                    onClick={() => { if(window.confirm('Are you sure you want to log out?')) logout(); }}
                    className="w-full text-left text-sm text-danger hover:bg-danger/10 p-2 rounded-md transition-colors"
                >
                    Log Out
                </button>
                <button 
                    onClick={() => alert('Account deactivation is a mock feature.')}
                    className="w-full text-left text-sm text-danger/70 hover:bg-danger/10 p-2 rounded-md transition-colors"
                >
                    Deactivate Account (Mock)
                </button>
            </div>
          </section>
        </aside>
      </div>
       <p className="text-center text-xs text-neutral-DEFAULT dark:text-neutral-d-DEFAULT mt-10">(This settings page is a placeholder with mock functionality.)</p>
    </div>
  );
};

export default SettingsPage;