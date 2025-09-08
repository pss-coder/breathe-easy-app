import { AlertCircle, RefreshCw } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ErrorDisplayProps {
  error: string;
  onRetry: () => void;
}

export const ErrorDisplay = ({ error, onRetry }: ErrorDisplayProps) => {
  const getErrorMessage = (error: string) => {
    if (error.includes('City not found')) {
      return {
        title: 'City Not Found',
        message: 'We couldn\'t find that city. Please check the spelling and try again.',
      };
    }
    if (error.includes('network') || error.includes('fetch')) {
      return {
        title: 'Connection Error',
        message: 'Unable to connect to the air quality service. Please check your internet connection.',
      };
    }
    return {
      title: 'Something Went Wrong',
      message: 'We encountered an issue while fetching air quality data. Please try again.',
    };
  };

  const { title, message } = getErrorMessage(error);

  return (
  <Card
    role="alert"
    aria-labelledby="error-title"
    className="aqi-card p-8 w-full max-w-md mx-auto text-center"
  >
    <div className="space-y-4">
      {/* Error icon */}
      <div
        className="w-16 h-16 mx-auto bg-destructive/10 rounded-full flex items-center justify-center"
        aria-hidden="true"
      >
        <AlertCircle className="w-8 h-8 text-destructive" />
      </div>

      {/* Error text */}
      <div className="space-y-2">
        <h3 id="error-title" className="text-xl font-semibold">
          {title}
        </h3>
        <p className="text-muted-foreground">{message}</p>
      </div>

      {/* Retry button */}
      <Button
        onClick={onRetry}
        variant="outline"
        className="gap-2"
        aria-label="Retry fetching air quality data"
      >
        <RefreshCw className="w-4 h-4" aria-hidden="true" />
        Try Again
      </Button>
    </div>
  </Card>
);
};