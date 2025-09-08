"use client";
import { AQIDisplay } from "@/components/air-quality/AirQualityIndexDisplay";
import { ErrorDisplay } from "@/components/air-quality/ErrorDisplay";
import { LoadingDisplay } from "@/components/air-quality/LoadingDisplay";
import { SearchForm } from "@/components/air-quality/SearchForm";
import { AppState } from "@/types/AppState";
import { AirQualityData, GeocodeResponse } from "@/types/openweather";
import { useState } from "react";

export default function Home() {

  const [state, setState] = useState<AppState>("search");
  const [error, setError] = useState<string>('');

  const [airQualityData, setAirQualityData] = useState<{
    airQuality: { main: { aqi: number }; 
    components: AirQualityData['components'] };
    location: GeocodeResponse;
  } | null>(null);

  const handleSearch = async (cityName: string) => {
    // setState('loading');
    setError('');
    
    try {
      //TODO: CALL API TO GET DATA
      setState('display');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      setState('error');
    }
  };

  const handleNewSearch = () => {
    setState('search');
    //reset data and error message
    setAirQualityData(null);
    setError('');
  };

  const handleRetry = () => {
    setState('search');
    // setError('');
  };


  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        
        {state === 'search' && (
          <SearchForm onSearch={handleSearch} isLoading={false} />
        )}

        {state === 'loading' && (
          <LoadingDisplay />
        )}

         {state === 'error' && (
          <ErrorDisplay 
            error={error}
            onRetry={handleRetry}
          />
        )}

        {state === 'display' && (
          <AQIDisplay 
          //TODO: PASS DATA HERE AFTER SEARCH FORM
            // airQuality
            // location={airQualityData.location}
            onNewSearch={handleNewSearch}
          />
        )}

      </div>
    </div>
  );
}
