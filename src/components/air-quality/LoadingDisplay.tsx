import { Card } from '@/components/ui/card';

export const LoadingDisplay = () => {
  return (
    <Card
      aria-labelledby="loading-title"
      role="status"
      aria-busy="true"
      className="aqi-card p-8 w-full max-w-md mx-auto"
    >
      <div className="space-y-6 text-center">
        <div className="space-y-4">
          {/* Spinner */}
          <div
            className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center"
            aria-hidden="true"
          >
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>

          {/* Text */}
          <div className="space-y-2">
            <h3 id="loading-title" className="text-xl font-semibold">
              Checking Air Quality
            </h3>
            <p className="text-muted-foreground">
              Fetching the latest air quality data...
            </p>
          </div>
        </div>

        {/* Skeleton placeholders */}
        <div className="space-y-3" aria-hidden="true">
          <div className="h-4 bg-muted rounded loading-pulse" />
          <div className="h-4 bg-muted rounded loading-pulse w-3/4 mx-auto" />
          <div className="h-4 bg-muted rounded loading-pulse w-1/2 mx-auto" />
        </div>
      </div>
    </Card>
    );
};