import React from 'react';
import { Star, StarHalf } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  readonly?: boolean;
  className?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({
  value,
  onChange,
  readonly = false,
  className,
}) => {
  const [hoverValue, setHoverValue] = React.useState<number | null>(null);

  const handleClick = (rating: number) => {
    if (!readonly && onChange) {
      onChange(rating);
    }
  };

  const handleMouseEnter = (rating: number) => {
    if (!readonly) {
      setHoverValue(rating);
    }
  };

  const handleMouseLeave = () => {
    setHoverValue(null);
  };

  const renderStar = (rating: number) => {
    const filled = (hoverValue || value) >= rating;
    return (
      <button
        key={rating}
        type="button"
        className={cn(
          'focus:outline-none transition-colors',
          filled ? 'text-yellow-400' : 'text-gray-300',
          !readonly && 'hover:text-yellow-400 cursor-pointer'
        )}
        onClick={() => handleClick(rating)}
        onMouseEnter={() => handleMouseEnter(rating)}
        onMouseLeave={handleMouseLeave}
        disabled={readonly}
      >
        <Star className="w-6 h-6" />
      </button>
    );
  };

  return (
    <div className={cn('flex gap-1', className)}>
      {[1, 2, 3, 4, 5].map((rating) => renderStar(rating))}
    </div>
  );
};