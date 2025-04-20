import { useState, useCallback } from 'react';
import { handleApiError } from '@/utils/errorHandling';
import { ApiError } from '@/utils/errorHandling';

interface UseApiRequestOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: ApiError) => void;
  loadingMessage?: string;
}

export function useApiRequest<T>(
  apiFunction: (...args: any[]) => Promise<T>,
  options: UseApiRequestOptions = {}
) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const execute = useCallback(
    async (...args: any[]) => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await apiFunction(...args);
        setData(result);
        options.onSuccess?.(result);
        return result;
      } catch (err) {
        const apiError = handleApiError(err);
        setError(apiError);
        options.onError?.(apiError);
        throw apiError;
      } finally {
        setIsLoading(false);
      }
    },
    [apiFunction, options]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    execute,
    reset,
    data,
    isLoading,
    error,
  };
}