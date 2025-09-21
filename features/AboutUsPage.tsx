import React from 'react';
import { APP_NAME, IconLogo, IconUsersGroup, IconGlobe, IconBriefcase } from '../constants';

const AboutUsPage: React.FC = () => {
  const teamMembers = [
    { name: 'Alice Wonderland', role: 'CEO & Founder', imageUrl: 'https://picsum.photos/seed/alice/200/200' },
    { name: 'Bob The Builder', role: 'Head of Technology', imageUrl: 'https://picsum.photos/seed/bob/200/200' },
    { name: 'Carol Danvers', role: 'Marketing Lead', imageUrl: 'https://picsum.photos/seed/carol/200/200' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="text-center mb-12 md:mb-16">
        <IconLogo className="w-16 h-16 text-primary dark:text-accent-light mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-dark dark:text-neutral-d-dark">About {APP_NAME}</h1>
        <p className="mt-4 text-lg text-neutral-DEFAULT dark:text-neutral-d-DEFAULT max-w-2xl mx-auto">
          Discover the story behind {APP_NAME} and our commitment to making booking simple and enjoyable for everyone.
        </p>
      </header>

      <section className="mb-12 md:mb-16 bg-white dark:bg-neutral-d-light/50 p-6 md:p-10 rounded-xl shadow-xl border border-neutral-extralight/60 dark:border-neutral-d-extralight/60">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-dark dark:text-neutral-d-dark mb-4 flex items-center">
              <IconGlobe className="w-8 h-8 mr-3 text-accent" /> Our Mission (Goodwill)
            </h2>
            <div className="prose prose-lg max-w-none text-neutral-DEFAULT dark:text-neutral-d-DEFAULT">
              <p>
                At {APP_NAME}, our mission is to connect people with unforgettable experiences and essential services through a seamless, trustworthy, and innovative booking platform. We believe that planning your next adventure, stay, or event should be exciting, not stressful.
              </p>
              <p>
                We strive to empower travelers and users by providing a comprehensive selection, transparent pricing, and user-friendly tools. Our goodwill extends to supporting local communities and promoting sustainable travel practices where possible.
              </p>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img src="https://picsum.photos/seed/mission/600/400" alt="Diverse group of people enjoying travel" className="w-full h-auto object-cover" />
          </div>
        </div>
      </section>

      <section className="mb-12 md:mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-dark dark:text-neutral-d-dark text-center mb-8 md:mb-10 flex items-center justify-center">
          <IconBriefcase className="w-8 h-8 mr-3 text-accent" /> Why Choose {APP_NAME}?
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[
            { title: 'Universal Access', description: 'One platform for all your booking needs – hotels, flights, adventures, and more.' },
            { title: 'User-Friendly Design', description: 'Intuitive interface making search, discovery, and booking effortless.' },
            { title: 'Trusted & Secure (Mock)', description: 'We prioritize your security (in a real app with real transactions).' },
            { title: 'Curated Selection', description: 'Handpicked options to ensure quality and value for our users.' },
            { title: 'Transparent Pricing', description: 'No hidden fees. What you see is what you pay (for mock data).' },
            { title: '24/7 Support (Conceptual)', description: 'Our dedicated team is here to help you around the clock.' },
          ].map((feature, index) => (
            <div key={index} className="bg-white dark:bg-neutral-d-light/50 p-6 rounded-lg shadow-lg border border-neutral-extralight/50 dark:border-neutral-d-extralight/50 hover:shadow-card-hover dark:hover:shadow-dark-interactive transition-shadow">
              <h3 className="text-xl font-semibold text-primary dark:text-accent-light mb-2">{feature.title}</h3>
              <p className="text-sm text-neutral-DEFAULT dark:text-neutral-d-DEFAULT">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary-extralight dark:bg-neutral-d-light/30 py-10 md:py-14 rounded-xl shadow">
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-dark dark:text-neutral-d-dark text-center mb-8 md:mb-10 flex items-center justify-center">
            <IconUsersGroup className="w-8 h-8 mr-3 text-accent" /> Our (Placeholder) Team
        </h2>
        <p className="text-center text-neutral-DEFAULT dark:text-neutral-d-DEFAULT mb-10 max-w-xl mx-auto">
          {APP_NAME} is powered by a passionate team dedicated to revolutionizing the booking experience. (These are placeholder profiles.)
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div key={member.name} className="bg-white dark:bg-neutral-d-light/50 p-6 rounded-lg shadow-lg text-center border border-neutral-extralight/50 dark:border-neutral-d-extralight/50 hover:shadow-card-hover dark:hover:shadow-dark-interactive transition-shadow transform hover:-translate-y-1">
              <img src={member.imageUrl} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4 shadow-md object-cover" />
              <h3 className="text-lg font-semibold text-neutral-dark dark:text-neutral-d-dark">{member.name}</h3>
              <p className="text-sm text-primary dark:text-accent-light">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;