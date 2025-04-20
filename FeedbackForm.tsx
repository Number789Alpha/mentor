import React from 'react';
import { useApiRequest } from '@/hooks/use-api-request';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { StarRating } from './ui/star-rating';

interface FeedbackFormProps {
  sessionId: string;
  userRole: 'mentor' | 'mentee';
  onSubmit?: () => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ sessionId, userRole, onSubmit }) => {
  const [rating, setRating] = React.useState<number>(0);
  const [feedback, setFeedback] = React.useState<string>('');

  const { execute: submitFeedback, isLoading } = useApiRequest(
    async (data: { rating: number; feedback: string }) => {
      const response = await fetch(`/api/sessions/${sessionId}/feedback`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
        body: JSON.stringify({ 
          ...data, 
          userRole,
          userId: localStorage.getItem('userId')
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit feedback');
      }
      
      return response.json();
    },
    {
      onSuccess: () => {
        toast({
          title: 'Success',
          description: 'Thank you for your feedback!',
          variant: 'default'
        });
        onSubmit?.();
      },
      onError: (error) => {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive'
        });
      }
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast({
        title: 'Error',
        description: 'Please provide a rating',
        variant: 'destructive',
      });
      return;
    }
    await submitFeedback({ rating, feedback });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Rating</label>
        <StarRating value={rating} onChange={setRating} />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="feedback" className="text-sm font-medium">
          Feedback
        </label>
        <Textarea
          id="feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Share your thoughts about the session..."
          className="min-h-[100px]"
        />
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Submitting...' : 'Submit Feedback'}
      </Button>
    </form>
  );
};

export default FeedbackForm;