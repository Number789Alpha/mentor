import React from 'react';
import { Star, StarHalf } from 'lucide-react';

interface RatingProps {
  value: number;
  maxValue?: number;
  size?: 'sm' | 'md' | 'lg';
  onChange?: (value: number) => void;
  readonly?: boolean;
}

const Rating: React.FC<RatingProps> = ({
  value,
  maxValue = 5,
  size = 'md',
  onChange,
  readonly = false,
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= maxValue; i++) {
      const filled = i <= value;
      const halfFilled = i - 0.5 === value;
      
      stars.push(
        <button
          key={i}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(i)}
          className={`focus:outline-none ${readonly ? 'cursor-default' : 'cursor-pointer'}`}
        >
          {halfFilled ? (
            <StarHalf
              className={`${sizeClasses[size]} text-yellow-400`}
              fill="currentColor"
            />
          ) : (
            <Star
              className={`${sizeClasses[size]} ${filled ? 'text-yellow-400' : 'text-gray-300'}`}
              fill={filled ? 'currentColor' : 'none'}
            />
          )}
        </button>
      );
    }
    return stars;
  };

  return (
    <div className="flex items-center space-x-1" role="group" aria-label="Rating">
      {renderStars()}
    </div>
  );
};

export default Rating;