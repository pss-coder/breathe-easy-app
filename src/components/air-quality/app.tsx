"use client";
import { AQIDisplay } from "@/components/air-quality/AirQualityIndexDisplay";
import { ErrorDisplay } from "@/components/air-quality/ErrorDisplay";
import { LoadingDisplay } from "@/components/air-quality/LoadingDisplay";
import { SearchForm } from "@/components/air-quality/SearchForm";
import Footer from "@/components/elements/footer";
import { Header } from "@/components/elements/header";
import { AppDispatch, RootState } from "@/store";
import { setAirQualityData, setError, setSearchHistory, setState } from "@/store/slices/airQualitySlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const SEARCH_HISTORY_KEY = 'breathe-easy-search-history';
export default function AirQualityApp() {

  const dispatch = useDispatch<AppDispatch>();
  const { state, error, airQualityData, searchHistory } = useSelector((state: RootState) => state.airQuality);

  // Load search history from localStorage on component mount
 useEffect(() => {
  if (typeof window !== 'undefined') { // to avoid hydration misatch , since local storage doesn exisit on server
    try {
      const savedHistory = localStorage.getItem(SEARCH_HISTORY_KEY);
      if (savedHistory) {
        const parsedHistory = JSON.parse(savedHistory);
        if (Array.isArray(parsedHistory)) {
          dispatch(setSearchHistory(parsedHistory));
        }
      }
    } catch (error) {
      console.error('Error loading search history:', error);
      dispatch(setSearchHistory([]));
    }
  }
}, [dispatch]);

  // Save search history to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(searchHistory));
    } catch (error) {
      console.error('Error saving search history to localStorage:', error);
    }
  }, [searchHistory]);

  const handleSearch = async (cityName: string) => {
    // setState('loading');
    dispatch(setState('loading'));
    dispatch(setError(''))
    
    try {
      // const data = await OpenWeatherAirQualityService.getAirQualityByCity(cityName);
      const response = await fetch(`/aqi?city=${cityName}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch air quality data');
      }
      const data = await response.json();
      dispatch(setAirQualityData(data));
      dispatch(setState('display'));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      console.log(errorMessage)

      dispatch(setError(errorMessage));
      dispatch(setState('error'));
    }
  };

  const handleAddToHistory = (cityName: string) => {
    // remove if already exists
    const filtered = searchHistory.filter(item => item.toLowerCase() !== cityName.toLowerCase());
    dispatch(setSearchHistory(
      // place ontop and only show recent 10
      [cityName, ...filtered].slice(0, 10)
    ));
  };

  const handleRemoveFromHistory = (cityToRemove: string) => {
    dispatch(setSearchHistory(searchHistory.filter(item => item !== cityToRemove)))
  };

  const handleClearHistory = () => {
    // setSearchHistory([]);
    dispatch(setSearchHistory([]));
  };

  const handleNewSearch = () => {
    dispatch(setState('search')); // change to search vie 
    //reset data and error message
    dispatch(setAirQualityData(null));
    dispatch(setError(''))
  };

  const handleRetry = () => {
    dispatch(setState('search')); // change to search vie 
  };

  return (
    <>
    <Header onNewSearch={handleNewSearch} />
     <div className={`min-h-screen flex items-center justify-center p-4`}>
      <div className="w-full max-w-2xl">
        
        {state === 'search' && (
          <SearchForm 
            // onSearch={handleSearch} 
            // isLoading={false}
            // searchHistory={searchHistory}
            // onAddToHistory={handleAddToHistory}
            // onRemoveFromHistory={handleRemoveFromHistory}
            // onClearHistory={handleClearHistory}
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