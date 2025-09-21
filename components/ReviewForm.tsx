
import React, { useState } from 'react';
import StarRating from './StarRating';

interface ReviewFormProps {
  onSubmit: (rating: number, comment: string) => void;
  isLoading: boolean;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit, isLoading }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (rating === 0) {
      setError('Please select a star rating.');
      return;
    }
    if (!comment.trim()) {
      setError('Please write a comment.');
      return;
    }
    onSubmit(rating, comment);
    setRating(0);
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div>
        <label className="block text-sm font-medium text-neutral-dark dark:text-neutral-d-dark mb-1">Your Rating</label>
        <StarRating rating={rating} onRatingChange={setRating} interactive size="md" />
      </div>
      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-neutral-dark dark:text-neutral-d-dark mb-1">Your Review</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="w-full p-2 border border-neutral-extralight dark:border-neutral-d-extralight rounded-md bg-white dark:bg-neutral-d-light/50 focus:ring-2 focus:ring-primary dark:focus:ring-accent outline-none"
          placeholder="Share your experience..."
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="px-4 py-2 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg shadow-sm transition-colors disabled:opacity-50"
      >
        {isLoading ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
};

export default ReviewForm;
