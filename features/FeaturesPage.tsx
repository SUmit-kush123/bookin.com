import React from 'react';
import { Link } from 'react-router-dom'; // Added Link import
import { APP_NAME, IconLogo, IconSparkles, IconSearch, IconTicket, IconBuilding, IconPlane, IconMountain, IconCar, IconGlobe, IconLockClosed, IconBell } from '../constants'; // Added more relevant icons

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon: Icon }) => (
  <div className={`
        bg-white dark:bg-neutral-d-light/50 p-6 rounded-xl shadow-lg border border-neutral-extralight/60
        dark:border-neutral-d-extralight/60 hover:shadow-card-hover dark:hover:shadow-dark-interactive
        transition-all duration-300 transform hover:-translate-y-1
    `}>
    <div className="flex items-center text-primary dark:text-accent-light mb-3">
      <Icon className="w-8 h-8 mr-3" />
      <h3 className="text-xl font-semibold text-neutral-dark dark:text-neutral-d-dark">{title}</h3>
    </div>
    <p className="text-neutral-DEFAULT dark:text-neutral-d-DEFAULT text-sm leading-relaxed">{description}</p>
  </div>
);

const FeaturesPage: React.FC = () => {
  const features = [
    { 
      title: 'Universal Booking Platform', 
      description: `Discover and book a wide variety of services with ${APP_NAME}, from hotels and flights to unique adventures, vehicle rentals, event spaces, and real estate. All in one place.`, 
      icon: IconGlobe 
    },
    { 
      title: 'Intuitive Search & Filtering', 
      description: 'Easily find what you\'re looking for with our powerful search engine and smart filtering options. Pinpoint your perfect booking in minutes.', 
      icon: IconSearch
    },
    { 
      title: 'Seamless Booking Management', 
      description: 'Keep track of all your reservations in one convenient dashboard. View details, (mock) manage, and access your booking history anytime.', 
      icon: IconTicket
    },
    { 
      title: 'Detailed Listings', 
      description: 'Access comprehensive information for each listing, including high-quality images, features, pricing, and (mock) user reviews to help you decide.', 
      icon: IconBuilding // Generic, represents various listing types
    },
    { 
      title: 'Mock User Authentication', 
      description: 'Create an account, log in, and experience personalized features. (Note: This is a frontend mock, no real user data is stored securely on a backend).', 
      icon: IconLockClosed
    },
    { 
      title: 'Responsive Design', 
      description: `Enjoy a consistent and user-friendly experience whether you're on a desktop, tablet, or smartphone. ${APP_NAME} adapts to your device.`, 
      icon: IconSparkles 
    },
     { 
      title: 'Categorized Exploration', 
      description: 'Browse dedicated sections for Hotels, Flights, Adventures, Real Estate, Vehicle Rentals, and Event Spaces, each tailored with relevant information.', 
      icon: IconMountain // Represents variety
    },
    { 
      title: 'Notifications (Mock)', 
      description: `Stay updated with important alerts about your bookings and exclusive offers from ${APP_NAME}. (Notifications are currently placeholders).`, 
      icon: IconBell
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="text-center mb-12 md:mb-16">
        <IconLogo className="w-16 h-16 text-primary dark:text-accent-light mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-dark dark:text-neutral-d-dark">Features of {APP_NAME}</h1>
        <p className="mt-4 text-lg text-neutral-DEFAULT dark:text-neutral-d-DEFAULT max-w-2xl mx-auto">
          Explore the powerful and user-friendly features that make {APP_NAME} your go-to platform for all bookings.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {features.map((feature, index) => (
          <FeatureCard key={index} title={feature.title} description={feature.description} icon={feature.icon} />
        ))}
      </div>

      <section className="mt-16 md:mt-20 py-10 px-6 bg-gradient-primary-accent text-white rounded-xl shadow-xl text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Booking?</h2>
        <p className="mb-8 max-w-lg mx-auto">
          Join thousands of users who trust ${APP_NAME} for their travel and service bookings. 
          Your next great experience is just a few clicks away!
        </p>
        <div className="space-x-4">
            <Link to="/signup" className="bg-white text-primary font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-neutral-extralight transition-colors text-base">
                Sign Up Now
            </Link>
             <Link to="/" className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-white/10 transition-colors text-base">
                Explore Listings
            </Link>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;