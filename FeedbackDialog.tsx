import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Rating from './ui/Rating';
import { sessionService } from '@/services/sessionService';
import { toast } from '@/hooks/use-toast';

const feedbackSchema = z.object({
  rating: z.number().min(1).max(5),
  feedback: z.string().min(10, 'Feedback must be at least 10 characters').max(500, 'Feedback must not exceed 500 characters'),
});

type FeedbackFormData = z.infer<typeof feedbackSchema>;

interface FeedbackDialogProps {
  sessionId: string;
  userId: string;
  userRole: 'mentor' | 'mentee';
  onClose: () => void;
}

const FeedbackDialog: React.FC<FeedbackDialogProps> = ({
  sessionId,
  userId,
  userRole,
  onClose,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      rating: 0,
      feedback: '',
    },
  });

  const onSubmit = async (data: FeedbackFormData) => {
    try {
      await sessionService.submitFeedback({
        sessionId,
        userId,
        userRole,
        rating: data.rating,
        feedback: data.feedback,
      });
      toast({
        title: 'Feedback submitted',
        description: 'Thank you for your feedback!',
      });
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit feedback. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Session Feedback</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Rating</label>
            <Rating
              value={0}
              onChange={(value) => setValue('rating', value)}
              size="lg"
            />
            {errors.rating && (
              <p className="text-red-500 text-sm mt-1">Please provide a rating</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Feedback</label>
            <textarea
              {...register('feedback')}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
              placeholder="Share your experience and suggestions..."
            />
            {errors.feedback && (
              <p className="text-red-500 text-sm mt-1">{errors.feedback.message}</p>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackDialog;