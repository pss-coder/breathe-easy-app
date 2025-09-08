
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Card } from '@/components/ui/card';

interface SearchFormProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

export const SearchForm = ({ onSearch, isLoading }: SearchFormProps) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <Card className="aqi-card p-6 w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2">Air Quality Check</h1>
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
            className="pl-10 h-12 text-lg"
            disabled={isLoading}
          />
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
    </Card>
  );
};