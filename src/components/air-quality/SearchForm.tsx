import { useState } from 'react';
import { Search, Clock, X } from 'lucide-react';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface SearchFormProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
  searchHistory: string[];
  onAddToHistory: (city: string) => void;
  onRemoveFromHistory: (city: string) => void;
  onClearHistory: () => void;
}

export const SearchForm = ({ 
  onSearch, 
  isLoading, 
  searchHistory, 
  onAddToHistory, 
  onRemoveFromHistory, 
  onClearHistory 
}: SearchFormProps) => {
  const [city, setCity] = useState('');
  const [showHistory, setShowHistory] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedCity = city.trim();
    if (trimmedCity) {
      onSearch(trimmedCity);
      onAddToHistory(trimmedCity);
      setCity('');
      setShowHistory(false);
    }
  };

  const searchFromHistory = (historyCity: string) => {
    setCity(historyCity);
    onSearch(historyCity);
    onAddToHistory(historyCity); // Move to top of history
    setShowHistory(false);
  };

  const handleClearAll = () => {
    onClearHistory();
    setShowHistory(false);
  };

  return (
    <Card className="aqi-card p-6 w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2">Breathe Easy</h1>
          <p className="text-muted-foreground">
            Get real-time air quality information for any city
          </p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onFocus={() => searchHistory.length > 0 && setShowHistory(true)}
            className="pl-10 h-12 text-lg"
            disabled={isLoading}
          />
          
          {/* Search History Dropdown */}
          {showHistory && searchHistory.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
              <div className="flex items-center justify-between p-3 border-b border-border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  Recent searches
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleClearAll}
                  className="text-xs h-6 px-2"
                >
                  Clear all
                </Button>
              </div>
              
              {searchHistory.map((historyCity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 hover:bg-muted cursor-pointer group"
                >
                  <span
                    onClick={() => searchFromHistory(historyCity)}
                    className="flex-1 text-sm py-1 px-1"
                  >
                    {historyCity}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveFromHistory(historyCity);
                    }}
                    className="opacity-0 group-hover:opacity-100 w-6 h-6 p-0 hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <Button 
          type="submit" 
          className="w-full h-12 text-lg"
          disabled={isLoading || !city.trim()}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              Checking...
            </div>
          ) : (
            'Check Air Quality'
          )}
        </Button>
      </form>
      
      {/* Click outside to close history */}
      {showHistory && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setShowHistory(false)}
        />
      )}
    </Card>
  );
};