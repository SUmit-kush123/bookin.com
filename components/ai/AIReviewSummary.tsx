import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Review } from '../../types';
import { IconSparkles } from '../../constants';

interface AIReviewSummaryProps {
  reviews: Review[];
}

const AIReviewSummary: React.FC<AIReviewSummaryProps> = ({ reviews }) => {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const generateSummary = async () => {
    setIsLoading(true);
    setError('');
    setSummary(null);

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const reviewText = reviews.map(r => r.comment).join('\n---\n');
    const prompt = `Summarize the following user reviews for a rental property or service. Focus on the main pros and cons mentioned by the reviewers. Present the summary as a short paragraph followed by bullet points under "Pros" and "Cons" headings. The tone should be helpful and neutral. Reviews:\n\n${reviewText}`;
    
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      setSummary(response.text);
    } catch (err) {
      console.error("AI Summary Error:", err);
      setError("Sorry, I couldn't generate a summary right now. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={generateSummary}
        disabled={isLoading}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-primary to-accent hover:opacity-90 disabled:opacity-50 transition-opacity"
      >
        <IconSparkles className="w-5 h-5 mr-2" />
        {isLoading ? 'Generating Summary...' : 'AI Summary of Reviews'}
      </button>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      {summary && (
        <div className="mt-4 p-4 bg-secondary/50 dark:bg-neutral-d-extralight/40 rounded-lg prose prose-sm dark:prose-invert max-w-none">
          <h4 className="font-semibold !mt-0">AI-Generated Summary</h4>
          {summary.split('\n').map((line, index) => {
             if (line.toLowerCase().includes('**pros:**') || line.toLowerCase().includes('**cons:**') || line.startsWith('* ')) {
                return <p key={index} dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />;
             }
             return <p key={index}>{line}</p>;
          })}
        </div>
      )}
    </div>
  );
};

export default AIReviewSummary;