
import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { APP_NAME, IconLogo, IconTicket, IconBell, IconLogout, IconLogin, IconUserPlus, IconLayoutDashboard, IconQuestionMarkCircle, IconStar, IconBriefcase, IconChevronDown, IconHeart, IconUser, IconCog, IconClock, CATEGORY_ICONS, IconGlobe } from '../constants';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from '../contexts/LanguageProvider';
import ThemeSwitcher from './ui/ThemeSwitcher';
import LanguageSwitcher from './LanguageSwitcher';
import CurrencySwitcher from './CurrencySwitcher';
import Clock from './ui/Clock';
import { bookingCategoriesData } from '../data/mockData';

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const t = useTranslation();
  const [isMoreMenuOpen, setMoreMenuOpen] = useState(false);
  const [isCategoriesMenuOpen, setCategoriesMenuOpen] = useState(false);
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const moreMenuRef = useRef<HTMLDivElement>(null);
  const categoriesMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) setUserMenuOpen(false);
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) setMoreMenuOpen(false);
      if (categoriesMenuRef.current && !categoriesMenuRef.current.contains(event.target as Node)) setCategoriesMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/');
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-all duration-150 ease-in-out hover:bg-primary/10 dark:hover:bg-primary/20 ${
      isActive ? 'text-primary font-semibold dark:text-accent-light' : 'text-neutral-dark hover:text-primary-dark dark:text-neutral-d-dark dark:hover:text-accent-light'
    }`;
  
  const buttonBaseClass = "px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ease-in-out shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1";

  const moreMenuItems = [
    { name: "Genius Loyalty Programme", to: "/info/genius-loyalty", icon: IconStar },
    { name: "Travel Articles", to: "/info/travel-articles", icon: IconBriefcase },
    { name: "About Us", to: "/info/about", icon: IconGlobe },
    { name: "Careers", to: "/info/careers", icon: IconBriefcase },
    { name: "Customer Service", to: "/support", icon: IconQuestionMarkCircle },
  ];

  return (
    <header className="bg-white/80 dark:bg-neutral-d-light/80 backdrop-blur-lg shadow-md sticky top-0 z-50 border-b border-neutral-extralight/70 dark:border-neutral-d-extralight/70">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-gradient-primary-accent hover:opacity-80 transition-opacity">
            <IconLogo className="w-7 h-7 text-primary" />
            <span>{APP_NAME}</span>
          </Link>
          <nav className="flex items-center space-x-1 sm:space-x-2">
            <NavLink to="/" className={navLinkClass}>{t('home')}</NavLink>
            <NavLink to="/map-search" className={navLinkClass}>Map Search</NavLink>
            
            <div className="relative" ref={categoriesMenuRef}>
              <button
                onClick={() => setCategoriesMenuOpen(prev => !prev)}
                className="px-3 py-2 rounded-md text-sm font-medium text-neutral-dark hover:text-primary-dark dark:text-neutral-d-dark hover:bg-primary/10 dark:hover:bg-primary/20 dark:hover:text-accent-light transition-all flex items-center"
              >
                Categories <IconChevronDown className={`w-4 h-4 ml-1 transition-transform ${isCategoriesMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              {isCategoriesMenuOpen && (
                <div
                  className="absolute left-0 mt-1 w-64 bg-white dark:bg-neutral-d-light rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 dark:ring-neutral-d-extralight z-50"
                >
                  {bookingCategoriesData.map(category => {
                      const Icon = CATEGORY_ICONS[category.slug];
                      return (
                          <Link
                              key={category.id}
                              to={`/listings/${category.slug}`}
                              onClick={() => setCategoriesMenuOpen(false)}
                              className="flex items-center w-full text-left px-4 py-2 text-sm text-neutral-dark dark:text-neutral-d-dark hover:bg-secondary dark:hover:bg-neutral-d-extralight"
                          >
                              {Icon && <Icon className="w-4 h-4 mr-2" />}
                              {category.name}
                          </Link>
                      );
                  })}
                </div>
              )}
            </div>
            
            <div className="relative" ref={moreMenuRef}>
              <button 
                onClick={() => setMoreMenuOpen(prev => !prev)}
                className="px-3 py-2 rounded-md text-sm font-medium text-neutral-dark hover:text-primary-dark dark:text-neutral-d-dark hover:bg-primary/10 dark:hover:bg-primary/20 dark:hover:text-accent-light transition-all flex items-center"
              >
                Support & More <IconChevronDown className={`w-4 h-4 ml-1 transition-transform ${isMoreMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              {isMoreMenuOpen && (
                <div 
                  className="absolute left-0 mt-1 w-56 bg-white dark:bg-neutral-d-light rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 dark:ring-neutral-d-extralight z-50"
                >
                  {moreMenuItems.map(item => (
                    <Link key={item.name} to={item.to} onClick={() => setMoreMenuOpen(false)} className="flex items-center w-full text-left px-4 py-2 text-sm text-neutral-dark dark:text-neutral-d-dark hover:bg-secondary dark:hover:bg-neutral-d-extralight">
                      <item.icon className="w-4 h-4 mr-2" />
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
                to="/inquiry"
                className={`${buttonBaseClass} bg-primary hover:bg-primary-dark text-white flex items-center`}
            >
                <IconTicket className="w-4 h-4 mr-0 sm:mr-1.5" />
                <span className="hidden sm:inline">Book Now</span>
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Link to="/notifications" className="p-2 text-neutral-dark dark:text-neutral-d-dark hover:text-primary dark:hover:text-accent-light transition-colors rounded-full hover:bg-primary/10 dark:hover:bg-primary/20" title="Notifications">
                  <IconBell className="w-5 h-5" />
                  <span className="sr-only">{t('notifications')}</span>
                </Link>
                <div className="relative" ref={userMenuRef}>
                  <button onClick={() => setUserMenuOpen(!isUserMenuOpen)} className="w-9 h-9 rounded-full overflow-hidden border-2 border-primary/20 hover:border-primary transition-all">
                    <img src={user?.avatar} alt={user?.name} className="w-full h-full object-cover" />
                  </button>
                  {isUserMenuOpen && (
                     <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-neutral-d-light rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 dark:ring-neutral-d-extralight z-50">
                        <div className="px-4 py-2 border-b border-neutral-extralight dark:border-neutral-d-extralight">
                            <p className="text-sm font-semibold text-neutral-dark dark:text-neutral-d-dark">{user?.name}</p>
                            <p className="text-xs text-neutral-DEFAULT dark:text-neutral-d-DEFAULT truncate">{user?.email}</p>
                        </div>
                        <NavLink to={`/profile/${user?.id}`} onClick={() => setUserMenuOpen(false)} className={({isActive}) => `flex items-center w-full px-4 py-2 text-sm text-neutral-dark dark:text-neutral-d-dark hover:bg-secondary dark:hover:bg-neutral-d-extralight ${isActive ? 'bg-secondary dark:bg-neutral-d-extralight' : ''}`}>
                            <IconUser className="w-4 h-4 mr-2" /> Profile
                        </NavLink>
                        {user?.role === 'host' && (
                            <NavLink to="/dashboard" onClick={() => setUserMenuOpen(false)} className={({isActive}) => `flex items-center w-full px-4 py-2 text-sm text-neutral-dark dark:text-neutral-d-dark hover:bg-secondary dark:hover:bg-neutral-d-extralight ${isActive ? 'bg-secondary dark:bg-neutral-d-extralight' : ''}`}>
                                <IconLayoutDashboard className="w-4 h-4 mr-2" /> Dashboard
                            </NavLink>
                        )}
                        <div className="my-1 border-t border-neutral-extralight dark:border-neutral-d-extralight"></div>
                        <NavLink to="/my-bookings" onClick={() => setUserMenuOpen(false)} className={({isActive}) => `flex items-center w-full px-4 py-2 text-sm text-neutral-dark dark:text-neutral-d-dark hover:bg-secondary dark:hover:bg-neutral-d-extralight ${isActive ? 'bg-secondary dark:bg-neutral-d-extralight' : ''}`}>
                            <IconTicket className="w-4 h-4 mr-2" /> My Bookings
                        </NavLink>
                         <NavLink to="/wishlist" onClick={() => setUserMenuOpen(false)} className={({isActive}) => `flex items-center w-full px-4 py-2 text-sm text-neutral-dark dark:text-neutral-d-dark hover:bg-secondary dark:hover:bg-neutral-d-extralight ${isActive ? 'bg-secondary dark:bg-neutral-d-extralight' : ''}`}>
                            <IconHeart className="w-4 h-4 mr-2" /> Wishlist
                        </NavLink>
                        <NavLink to="/history" onClick={() => setUserMenuOpen(false)} className={({isActive}) => `flex items-center w-full px-4 py-2 text-sm text-neutral-dark dark:text-neutral-d-dark hover:bg-secondary dark:hover:bg-neutral-d-extralight ${isActive ? 'bg-secondary dark:bg-neutral-d-extralight' : ''}`}>
                            <IconClock className="w-4 h-4 mr-2" /> Search History
                        </NavLink>
                        <div className="my-1 border-t border-neutral-extralight dark:border-neutral-d-extralight"></div>
                        <NavLink to="/settings" onClick={() => setUserMenuOpen(false)} className={({isActive}) => `flex items-center w-full px-4 py-2 text-sm text-neutral-dark dark:text-neutral-d-dark hover:bg-secondary dark:hover:bg-neutral-d-extralight ${isActive ? 'bg-secondary dark:bg-neutral-d-extralight' : ''}`}>
                            <IconCog className="w-4 h-4 mr-2" /> Settings
                        </NavLink>
                        <button onClick={handleLogout} className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/10">
                           <IconLogout className="w-4 h-4 mr-2" /> {t('logout')}
                        </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <>
                <NavLink to="/login" className={`${buttonBaseClass} bg-primary/10 dark:bg-primary/20 hover:bg-primary/20 dark:hover:bg-primary/30 text-primary dark:text-accent-light flex items-center`}>
                   <IconLogin className="w-4 h-4 mr-0 sm:mr-1.5" />
                   <span className="hidden sm:inline">{t('login')}</span>
                </NavLink>
                <NavLink to="/signup" className={`${buttonBaseClass} bg-accent hover:bg-accent-dark text-white flex items-center`}>
                  <IconUserPlus className="w-4 h-4 mr-0 sm:mr-1.5" />
                  <span className="hidden sm:inline">{t('signup')}</span>
                </NavLink>
              </>
            )}
            <div className="border-l border-neutral-extralight dark:border-neutral-d-extralight h-6 mx-1"></div>
            <Clock />
            <div className="border-l border-neutral-extralight dark:border-neutral-d-extralight h-6 mx-1"></div>
            <CurrencySwitcher />
            <LanguageSwitcher />
            <ThemeSwitcher />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
