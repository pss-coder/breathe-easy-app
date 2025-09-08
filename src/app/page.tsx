"use client";
import { AQIDisplay } from "@/components/air-quality/AirQualityIndexDisplay";
import { ErrorDisplay } from "@/components/air-quality/ErrorDisplay";
import { LoadingDisplay } from "@/components/air-quality/LoadingDisplay";
import { SearchForm } from "@/components/air-quality/SearchForm";
import Footer from "@/components/elements/footer";
import { Header } from "@/components/elements/header";
import { AppState } from "@/types/AppState";
import { AirQualityData, GeocodeResponse } from "@/types/openweather";
import { useEffect, useState } from "react";

const SEARCH_HISTORY_KEY = 'breathe-easy-search-history';


export default function Home() {
  const [state, setState] = useState<AppState>("search");
  const [error, setError] = useState<string>('');

  const [airQualityData, setAirQualityData] = useState<{
    airQuality: { main: { aqi: number }; 
    components: AirQualityData['components'] };
    location: GeocodeResponse;
  } | null>(null);

  const [searchHistory, setSearchHistory] = useState<string[]>([]);


  // Load search history from localStorage on component mount
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem(SEARCH_HISTORY_KEY);
      if (savedHistory) {
        const parsedHistory = JSON.parse(savedHistory);
        if (Array.isArray(parsedHistory)) {
          setSearchHistory(parsedHistory);
        }
      }
    } catch (error) {
      console.error('Error loading search history from localStorage:', error);
      // If there's an error, start with empty history
      setSearchHistory([]);
    }
  }, []);

  // Save search history to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(searchHistory));
    } catch (error) {
      console.error('Error saving search history to localStorage:', error);
    }
  }, [searchHistory]);

  const handleSearch = async (cityName: string) => {
    setState('loading');
    setError('');
    
    try {
      // const data = await OpenWeatherAirQualityService.getAirQualityByCity(cityName);
      const response = await fetch(`/aqi?city=${cityName}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch air quality data');
      }
      const data = await response.json();
    setAirQualityData(data);
      setState('display');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      console.log(errorMessage)
      setError(errorMessage);
      setState('error');
    }
  };

  const handleAddToHistory = (cityName: string) => {
    setSearchHistory(prev => {
      // Remove if already exists to avoid duplicates
      const filtered = prev.filter(item => item.toLowerCase() !== cityName.toLowerCase());
      // Add to beginning and limit to 10 items
      return [cityName, ...filtered].slice(0, 10);
    });
  };

  const handleRemoveFromHistory = (cityToRemove: string) => {
    setSearchHistory(prev => prev.filter(item => item !== cityToRemove));
  };

  const handleClearHistory = () => {
    setSearchHistory([]);
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
    <>
    <Header onNewSearch={handleNewSearch} />
     <div className={`min-h-screen flex items-center justify-center p-4`}>
      <div className="w-full max-w-2xl">
        
        {state === 'search' && (
          <SearchForm 
            onSearch={handleSearch} 
            isLoading={false}
            searchHistory={searchHistory}
            onAddToHistory={handleAddToHistory}
            onRemoveFromHistory={handleRemoveFromHistory}
            onClearHistory={handleClearHistory}
          />
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

        {state === 'display' && airQualityData && (
          <AQIDisplay 
          //TODO: PASS DATA HERE AFTER SEARCH FORM
            airQuality={airQualityData.airQuality}
            location={airQualityData.location}
            onNewSearch={handleNewSearch}
          />
        )}
      </div>
    </div>
    <Footer />
    </>
  );
}