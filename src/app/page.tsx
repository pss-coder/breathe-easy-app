"use client";
import { ErrorDisplay } from "@/components/air-quality/ErrorDisplay";
import { SearchForm } from "@/components/air-quality/SearchForm";
import { AppState } from "@/types/AppState";
import Image from "next/image";
import { useState } from "react";

export default function Home() {

  const [state, setState] = useState<AppState>("search");
  const [error, setError] = useState<string>('');

  const handleSearch = async (cityName: string) => {
    setError("TEST ERROR MESSAGE");
    setState('error');
  };

  const handleNewSearch = () => {
    setState('search');
    // setAirQualityData(null);
    // setError('');
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

         {state === 'error' && (
          <ErrorDisplay 
            error={error}
            onRetry={handleRetry}
          />
        )}

      </div>
    </div>
  );
}
