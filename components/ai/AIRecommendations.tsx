import React, { useEffect, useState } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { useListings } from '../../contexts/ListingsProvider';
import { useRecentlyViewed } from '../../contexts/RecentlyViewedProvider';
import { ListingItem, BookingCategorySlug } from '../../types';
import { bookingCategoriesData } from '../../data/mockData';
import ListingCard from '../ListingCard';
import Carousel from '../ui/Carousel';
import SkeletonLoader from '../ui/SkeletonLoader';
import { IconSparkles, IconWandSparkles } from '../../constants';

const AIRecommendations: React.FC = () => {
  const { listings, isLoading: isLoadingListings } = useListings();
  const { recentlyViewed } = useRecentlyViewed();
  
  const [recommendations, setRecommendations] = useState<ListingItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (recentlyViewed.length === 0 || listings.length === 0) {
        setRecommendations([]);
        return;
      }

      setIsLoading(true);
      setError('');

      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

        const recentlyViewedItems = recentlyViewed
          .map(id => listings.find(item => item.id === id))
          .filter(Boolean) as ListingItem[];

        const masterList = listings.map(({ id, name, description, propertyType, location }) => ({ id, name, description, propertyType, location }));
        const viewedList = recentlyViewedItems.map(({ id, name, description, propertyType, location }) => ({ id, name, description, propertyType, location }));

        const prompt = `Based on the user's recently viewed items, recommend 4 similar items from the master list.
        - The recommended items MUST NOT be in the recently viewed list.
        - Prioritize items that are similar in type (e.g., hotel, villa) and location.
        
        Master List: ${JSON.stringify(masterList)}
        Recently Viewed: ${JSON.stringify(viewedList)}
        
        Return a JSON object with a single key "recommended_ids" containing an array of 4 unique string IDs from the master list.`;

        const responseSchema = {
          type: Type.OBJECT,
          properties: {
            recommended_ids: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: ["recommended_ids"],
        };

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });

        const result = JSON.parse(response.text.trim());
        const recommendedIds = result.recommended_ids || [];
        
        const recommendedListings = recommendedIds
            .map((id: string) => listings.find(item => item.id === id))
            .filter((item: ListingItem | undefined): item is ListingItem => !!item);

        setRecommendations(recommendedListings);

      } catch (err) {
        console.error("AI Recommendation Error:", err);
        setError("Couldn't fetch AI recommendations at this time.");
      } finally {
        setIsLoading(false);
      }
    };

    // Only run if not loading listings and there are recently viewed items
    if (!isLoadingListings && recentlyViewed.length > 0) {
        fetchRecommendations();
    } else {
        setRecommendations([]);
    }

  }, [recentlyViewed, listings, isLoadingListings]);

  const getCategorySlug = (categoryId: string) => {
    return bookingCategoriesData.find(c => c.id === categoryId)?.slug || BookingCategorySlug.Hotels;
  };

  if (recentlyViewed.length === 0) {
    return null; // Don't show the component if there's no history
  }

  return (
    <section>
      <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-dark dark:text-neutral-d-dark mb-8 flex items-center">
        <IconWandSparkles className="w-8 h-8 mr-3 text-accent" />
        AI Recommendations For You
      </h2>
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[...Array(4)].map((_, i) => <SkeletonLoader key={i} type="card" />)}
        </div>
      ) : error ? (
        <p className="text-center text-neutral-DEFAULT dark:text-neutral-d-DEFAULT bg-secondary dark:bg-neutral-d-extralight/50 p-4 rounded-lg">{error}</p>
      ) : recommendations.length > 0 ? (
        <Carousel>
          {recommendations.map(item => (
            <div key={`rec-${item.id}`} className="flex-shrink-0 w-80 snap-start">
              <ListingCard item={item} categorySlug={getCategorySlug(item.categoryId)} />
            </div>
          ))}
        </Carousel>
      ) : null}
    </section>
  );
};

export default AIRecommendations;