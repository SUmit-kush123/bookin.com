import React, { useState } from 'react';

interface Tab {
  title: string;
  content: React.ReactNode;
}

interface TabbedSectionProps {
  tabs: Tab[];
}

const TabbedSection: React.FC<TabbedSectionProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="border-b border-neutral-extralight dark:border-neutral-d-extralight mb-6 no-scrollbar overflow-x-auto">
        <nav className="flex space-x-4" aria-label="Tabs">
          {tabs.map((tab, index) => (
            <button
              key={tab.title}
              onClick={() => setActiveTab(index)}
              className={`
                px-4 py-2.5 text-sm font-semibold rounded-t-lg whitespace-nowrap
                transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-accent
                ${activeTab === index 
                  ? 'border-b-2 border-primary dark:border-accent-light text-primary dark:text-accent-light' 
                  : 'text-neutral-DEFAULT dark:text-neutral-d-DEFAULT hover:text-primary dark:hover:text-accent-light'
                }
              `}
              aria-current={activeTab === index ? 'page' : undefined}
            >
              {tab.title}
            </button>
          ))}
        </nav>
      </div>
      <div>
        {tabs[activeTab] && tabs[activeTab].content}
      </div>
    </div>
  );
};

export default TabbedSection;
