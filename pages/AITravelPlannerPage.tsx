
import React, { useState } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { IconWandSparkles, IconCompass, IconCalendar, IconSparkles, IconDollarSign } from '../constants';

interface Itinerary {
  tripTitle: string;
  destination: string;
  duration: number;
  dailyPlan: {
    day: number;
    title: string;
    activities: string[];
    dining: string[];
  }[];
  accommodationSuggestion: string;
  budgetNotes: string;
}

const AITravelPlannerPage: React.FC = () => {
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState(7);
  const [interests, setInterests] = useState('culture, history, and food');
  const [budget, setBudget] = useState('Mid-range');
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const inputBaseClasses = "w-full p-3 border border-neutral-extralight dark:border-neutral-d-extralight rounded-md focus:ring-2 focus:ring-primary dark:focus:ring-accent focus:border-transparent outline-none transition-all duration-150 shadow-sm text-neutral-dark dark:text-neutral-d-dark bg-white dark:bg-neutral-d-light/50 placeholder-neutral-DEFAULT dark:placeholder-neutral-d-DEFAULT";
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
        tripTitle: { type: Type.STRING, description: "A catchy title for the trip." },
        destination: { type: Type.STRING },
        duration: { type: Type.INTEGER },
        dailyPlan: {
            type: Type.ARRAY,
            description: "A day-by-day plan for the trip.",
            items: {
                type: Type.OBJECT,
                properties: {
                    day: { type: Type.INTEGER },
                    title: { type: Type.STRING, description: "A short, catchy title for the day's plan." },
                    activities: { type: Type.ARRAY, description: "List of activities for the day.", items: { type: Type.STRING } },
                    dining: { type: Type.ARRAY, description: "Dining suggestions for the day (e.g., breakfast, lunch, dinner).", items: { type: Type.STRING } },
                },
                required: ["day", "title", "activities", "dining"],
            }
        },
        accommodationSuggestion: { type: Type.STRING, description: "Suggestions for types of accommodation (e.g., hotels, hostels, apartments)." },
        budgetNotes: { type: Type.STRING, description: "General notes about the budget and potential costs." },
    },
    required: ["tripTitle", "destination", "duration", "dailyPlan", "accommodationSuggestion", "budgetNotes"],
  };

  const generatePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setItinerary(null);
    setIsLoading(true);

    try {
        const prompt = `Create a detailed travel itinerary for a trip to ${destination} for ${duration} days. The traveler is interested in ${interests} and has a ${budget} budget. Provide day-by-day suggestions for activities, places to visit, and dining options. Suggest types of accommodation.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });
        
        const jsonText = response.text.trim();
        const parsedItinerary = JSON.parse(jsonText);
        setItinerary(parsedItinerary);

    } catch (err) {
      console.error("AI Planner Error:", err);
      setError(err instanceof Error ? err.message : 'An error occurred while generating the plan. The model may have generated an invalid response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="text-center mb-10">
        <IconWandSparkles className="w-16 h-16 text-primary dark:text-accent-light mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-dark dark:text-neutral-d-dark">AI Travel Planner</h1>
        <p className="mt-4 text-lg text-neutral-DEFAULT dark:text-neutral-d-DEFAULT max-w-2xl mx-auto">
          Let our AI craft the perfect, personalized itinerary for your next adventure. Just tell us your preferences!
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Section */}
        <aside className="lg:col-span-4">
          <form onSubmit={generatePlan} className="bg-white dark:bg-neutral-d-light/50 p-6 rounded-xl shadow-xl border border-neutral-extralight/60 dark:border-neutral-d-extralight/60 space-y-5 sticky top-24">
            <h2 className="text-xl font-semibold text-neutral-dark dark:text-neutral-d-dark">Plan Your Trip</h2>
            <div>
              <label htmlFor="destination" className="block text-sm font-medium text-neutral-dark dark:text-neutral-d-dark mb-1">Destination</label>
              <input type="text" id="destination" value={destination} onChange={e => setDestination(e.target.value)} required placeholder="e.g., Paris, France" className={inputBaseClasses} />
            </div>
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-neutral-dark dark:text-neutral-d-dark mb-1">Duration (days)</label>
              <input type="number" id="duration" value={duration} onChange={e => setDuration(parseInt(e.target.value))} required min="1" max="30" className={inputBaseClasses} />
            </div>
            <div>
              <label htmlFor="interests" className="block text-sm font-medium text-neutral-dark dark:text-neutral-d-dark mb-1">Interests</label>
              <textarea id="interests" value={interests} onChange={e => setInterests(e.target.value)} required rows={3} placeholder="e.g., hiking, museums, nightlife" className={inputBaseClasses}></textarea>
            </div>
            <div>
                <label className="block text-sm font-medium text-neutral-dark dark:text-neutral-d-dark mb-2">Budget</label>
                <div className="flex space-x-2">
                    {['Budget', 'Mid-range', 'Luxury'].map(b => (
                        <button key={b} type="button" onClick={() => setBudget(b)} className={`flex-1 px-4 py-2 text-sm font-medium rounded-md border-2 transition-colors ${budget === b ? 'bg-primary border-primary text-white dark:bg-accent dark:border-accent' : 'bg-white dark:bg-transparent border-neutral-extralight dark:border-neutral-d-extralight hover:bg-secondary dark:hover:bg-neutral-d-extralight'}`}>
                            {b}
                        </button>
                    ))}
                </div>
            </div>
            <button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent-dark text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-interactive transition-all duration-150 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center">
              {isLoading ? (
                  <><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Generating Plan...</>
              ) : 'Generate Plan'}
            </button>
          </form>
        </aside>

        {/* Results Section */}
        <main className="lg:col-span-8">
          <div className="bg-white dark:bg-neutral-d-light/50 p-6 rounded-xl shadow-xl border border-neutral-extralight/60 dark:border-neutral-d-extralight/60 min-h-[500px]">
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <IconSparkles className="w-16 h-16 text-primary dark:text-accent-light animate-pulse mb-4" />
                <p className="text-neutral-DEFAULT dark:text-neutral-d-DEFAULT text-lg">Our AI is crafting your perfect trip...</p>
              </div>
            )}
            {error && (
              <div className="flex flex-col items-center justify-center h-full text-center text-danger p-4">
                <p className="font-semibold mb-2">Something went wrong!</p>
                <p className="text-sm">{error}</p>
              </div>
            )}
            {!isLoading && !itinerary && !error && (
                <div className="flex flex-col items-center justify-center h-full text-center">
                    <IconCompass className="w-16 h-16 text-neutral-DEFAULT opacity-50 dark:text-neutral-d-DEFAULT mb-4" />
                    <p className="text-neutral-DEFAULT dark:text-neutral-d-DEFAULT text-lg">Your personalized itinerary will appear here.</p>
                </div>
            )}
            {itinerary && (
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <h2 className="text-3xl font-bold !mb-2">{itinerary.tripTitle}</h2>
                <p className="!mt-0 text-lg text-neutral-DEFAULT">{itinerary.destination} - {itinerary.duration} Days</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                    <div className="bg-secondary/50 dark:bg-neutral-d-extralight/50 p-4 rounded-lg">
                        <h4 className="font-semibold flex items-center"><IconSparkles className="w-4 h-4 mr-2" /> Accommodation</h4>
                        <p>{itinerary.accommodationSuggestion}</p>
                    </div>
                    <div className="bg-secondary/50 dark:bg-neutral-d-extralight/50 p-4 rounded-lg">
                        <h4 className="font-semibold flex items-center"><IconDollarSign className="w-4 h-4 mr-2" /> Budget Notes</h4>
                        <p>{itinerary.budgetNotes}</p>
                    </div>
                </div>

                <div className="space-y-6">
                    {itinerary.dailyPlan.map(day => (
                        <div key={day.day} className="p-4 border-l-4 border-primary dark:border-accent bg-secondary/30 dark:bg-neutral-d-extralight/30 rounded-r-lg">
                            <h3 className="flex items-center !mt-0 !mb-3"><IconCalendar className="w-5 h-5 mr-2" /> Day {day.day}: {day.title}</h3>
                            <h4 className="font-semibold">Activities:</h4>
                            <ul>{day.activities.map((act, i) => <li key={i}>{act}</li>)}</ul>
                            <h4 className="font-semibold mt-2">Dining:</h4>
                            <ul>{day.dining.map((din, i) => <li key={i}>{din}</li>)}</ul>
                        </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AITravelPlannerPage;