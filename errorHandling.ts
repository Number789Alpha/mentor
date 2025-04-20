import { toast } from '@/components/ui/use-toast';
import { useState } from 'react';

export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}

export const handleApiError = (error: any): ApiError => {
  let errorMessage = 'An unexpected error occurred';
  let errorCode = 'UNKNOWN_ERROR';
  let errorDetails = null;

  if (error.response) {
    // Server responded with error
    errorMessage = error.response.data?.message || error.response.statusText;
    errorCode = error.response.status;
    errorDetails = error.response.data;
  } else if (error.request) {
    // Request made but no response
    errorMessage = 'Unable to connect to server. Please check your internet connection and try again.';
    errorCode = 'NETWORK_ERROR';
    errorDetails = error.request;
  } else {
    // Request setup error
    errorMessage = error.message;
    errorCode = 'REQUEST_ERROR';
  }

  // Show error toast
  toast({
    title: 'Error',
    description: errorMessage,
    variant: 'destructive',
  });

  return {
    message: errorMessage,
    code: errorCode,
    details: errorDetails,
  };
};

export const handleLoadingStates = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);
  const setErrorState = (error: ApiError) => setError(error);
  const clearError = () => setError(null);

  return {
    isLoading,
    error,
    startLoading,
    stopLoading,
    setErrorState,
    clearError,
  };
};