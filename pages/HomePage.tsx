import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from '../contexts/LanguageProvider';
import { popularCities, regions, placesOfInterest, propertyTypes, trendingDestinations } from '../data/mockData';
import { GENIUS_ICON, IconSparkles, IconWandSparkles, IconChevronRight } from '../constants';
import PropertyTypeCard from '../components/PropertyTypeCard';
import TabbedSection from '../components/TabbedSection';
import Carousel from '../components/ui/Carousel';
import CookieConsentBanner from '../components/security/CookieConsentBanner';
import AdPlaceholder from '../components/ui/AdPlaceholder';
import HeroSection from '../components/HeroSection';
import { useRecentlyViewed } from '../contexts/RecentlyViewedProvider';
import { useListings } from '../contexts/ListingsProvider';
import ListingCard from '../components/ListingCard';
import { bookingCategoriesData } from '../data/mockData';
import { BookingCategorySlug } from '../types';
import AIRecommendations from '../components/ai/AIRecommendations';
import SearchBar from '../components/SearchBar';
import { GoogleGenAI, Type } from '@google/genai';

const HomePage: React.FC = () => {
  const t = useTranslation();
  const navigate = useNavigate();
  const { recentlyViewed } = useRecentlyViewed();
  const { listings, isLoading } = useListings();

  const [isAiSearching, setIsAiSearching] = useState(false);
  const [aiSearchError, setAiSearchError] = useState('');
  
  const recentlyViewedItems = recentlyViewed
    .map(id => listings.find(item => item.id === id))
    .filter(Boolean);

  const getCategorySlug = (categoryId: string) => {
    return bookingCategoriesData.find(c => c.id === categoryId)?.slug || BookingCategorySlug.Hotels;
  };
  
  const handleAiSearch = async (query: string) => {
    setIsAiSearching(true);
    setAiSearchError('');
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const schema = {
            type: Type.OBJECT,
            properties: {
                location: { type: Type.STRING, description: 'The city, region, or general area the user wants to search in.'},
                startDate: { type: Type.STRING, description: "The check-in or start date in YYYY-MM-DD format. Infer from terms like 'tomorrow', 'next week', or specific dates." },
                endDate: { type: Type.STRING, description: "The check-out or end date in YYYY-MM-DD format. Infer from the start date and duration if mentioned (e.g., 'for 3 days')." },
                guests: { type: Type.INTEGER, description: "The number of guests, people, or family members." }
            }
        };
        const prompt = `Parse the following user travel query. Your main goal is to extract the primary location, start/end dates, and number of guests. Today's date is ${new Date().toISOString().split('T')[0]}.
        - Location: city, country, or famous landmark. E.g., from "beachfront villas in Bali", extract "Bali".
        - Dates: Infer from terms like "tomorrow", "next weekend", "for 3 days". Calculate the YYYY-MM-DD dates.
        - Guests: Infer from "2 people", "a couple", "family of 4".
        Query: "${query}"`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: { responseMimeType: 'application/json', responseSchema: schema },
        });

        const parsed = JSON.parse(response.text);
        const newParams = new URLSearchParams();
        if (parsed.location) {
          newParams.set('query', parsed.location);
        } else {
          // Fallback to the original query if AI fails to extract a location
          newParams.set('query', query);
        }
        if (parsed.startDate) newParams.set('startDate', parsed.startDate);
        if (parsed.endDate) newParams.set('endDate', parsed.endDate);
        if (parsed.guests) newParams.set('guests', parsed.guests.toString());
        
        navigate(`/listings/hotels?${newParams.toString()}`);

    } catch (err) {
        console.error("AI Search Error:", err);
        setAiSearchError("The AI couldn't process that request. Please try a simpler search term.");
        // As a fallback, navigate with the raw query
        navigate(`/listings/hotels?query=${encodeURIComponent(query)}`);
    } finally {
        setIsAiSearching(false);
    }
  };


  const tabs = [
    {
      title: 'Popular cities',
      content: (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {popularCities.map(item => (
            <Link to="#" key={item.name} className="group">
              <div className="relative aspect-square rounded-lg overflow-hidden shadow-md">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-3 left-3 text-white">
                  <h4 className="font-bold drop-shadow">{item.name}</h4>
                  <p className="text-xs drop-shadow">{item.country}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )
    },
    {
      title: 'Regions',
      content: (
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {regions.map(item => (
            <Link to="#" key={item.name} className="group">
              <div className="relative aspect-square rounded-lg overflow-hidden shadow-md">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-3 left-3 text-white">
                  <h4 className="font-bold drop-shadow">{item.name}</h4>
                  <p className="text-xs drop-shadow">{item.country}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )
    },
    {
      title: 'Places of interest',
      content: (
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {placesOfInterest.map(item => (
            <Link to="#" key={item.name} className="group">
              <div className="relative aspect-square rounded-lg overflow-hidden shadow-md">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <h4 className="absolute bottom-3 left-3 text-white font-bold drop-shadow">{item.name}</h4>
              </div>
            </Link>
          ))}
        </div>
      )
    },
  ];

  return (
    <>
    <div className="space-y-12 md:space-y-16 lg:space-y-20">
      
      <HeroSection />

      <section className="mt-[-4rem] relative z-10 px-4">
          <div className="max-w-3xl mx-auto">
               <SearchBar onAiSearch={handleAiSearch} isAiSearching={isAiSearching} />
               {aiSearchError && <p className="text-center text-sm text-red-600 mt-2">{aiSearchError}</p>}
          </div>
      </section>

      {/* Trending Destinations */}
      <section>
        <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-dark dark:text-neutral-d-dark mb-8">Trending destinations</h2>
        <Carousel>
          {trendingDestinations.map((dest) => (
            <Link key={dest.name} to={dest.link} className="flex-shrink-0 w-64 snap-start group">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-lg">
                <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-bold text-lg drop-shadow">{dest.name}</h4>
                  <p className="text-sm drop-shadow">{dest.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </Carousel>
      </section>
      
      {/* Recently Viewed */}
      {recentlyViewedItems.length > 0 && (
          <section>
            <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-dark dark:text-neutral-d-dark mb-8">Recently Viewed</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {recentlyViewedItems.map(item => (
                item && <ListingCard key={`recent-${item.id}`} item={item} categorySlug={getCategorySlug(item.categoryId)} />
              ))}
            </div>
          </section>
      )}

      {/* AI Recommendations */}
      <AIRecommendations />
      
      {/* AI Travel Planner CTA */}
      <section className="py-10 text-center bg-secondary-extralight dark:bg-neutral-d-extralight/30 rounded-xl">
        <IconWandSparkles className="w-12 h-12 text-accent mx-auto mb-4" />
        <h2 className="text-3xl font-extrabold text-neutral-dark dark:text-neutral-d-dark mb-4">
          Plan Your Perfect Trip with AI
        </h2>
        <p className="text-neutral-DEFAULT dark:text-neutral-d-DEFAULT max-w-xl mx-auto mb-6">
          Don't know where to start? Describe your dream vacation and let our AI assistant create a personalized day-by-day itinerary for you.
        </p>
        <Link
          to="/ai-planner"
          className="bg-accent hover:bg-accent-dark text-white font-bold py-3 px-6 rounded-lg transition-transform duration-200 transform hover:scale-105 inline-flex items-center group"
        >
          Try the AI Planner
          <IconChevronRight className="w-5 h-5 ml-2 transition-transform duration-150 group-hover:translate-x-1" />
        </Link>
      </section>

      {/* Offers & Promotions (Ad Placeholder) */}
      <section>
          <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-dark dark:text-neutral-d-dark mb-8">Offers & Promotions</h2>
          <AdPlaceholder type="horizontal-banner" />
      </section>

      {/* Browse by property type */}
      <section className="py-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-dark dark:text-neutral-d-dark mb-8">Browse by property type</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {propertyTypes.map((prop) => (
            <PropertyTypeCard key={prop.type} property={prop} />
          ))}
        </div>
      </section>
      
      {/* Genius Loyalty Banner */}
      <section className="bg-primary/10 dark:bg-primary/20 p-6 rounded-lg flex items-center justify-between gap-6">
        <div className="flex items-center">
            <GENIUS_ICON className="w-12 h-12 text-accent mr-4" />
            <div>
                <h3 className="font-bold text-xl text-neutral-dark dark:text-neutral-d-dark">Get instant discounts</h3>
                <p className="text-sm text-neutral-DEFAULT dark:text-neutral-d-DEFAULT">Just sign into your Bookin.com account and look for the blue Genius logo to save.</p>
            </div>
        </div>
        <div>
            <Link to="/signup" className="px-4 py-2 bg-primary text-white font-semibold rounded-md whitespace-nowrap shadow hover:bg-primary-dark transition-colors">Sign in / Register</Link>
        </div>
      </section>
      
       {/* Explore Destinations */}
      <section className="py-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-dark dark:text-neutral-d-dark mb-8">
          Explore Destinations
        </h2>
        <TabbedSection tabs={tabs} />
      </section>
    </div>
    <CookieConsentBanner />
    </>
  );
};

export default HomePage;