import { useState, useEffect } from 'react';
import { Key, Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '../ui/label';

interface SetupAPIKeyDisplayProps {
  onApiKeySet: (apiKey: string) => void;
}

export const SetupAPIKeyDisplay = ({ onApiKeySet }: SetupAPIKeyDisplayProps) => {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    const savedKey = localStorage.getItem('openweather_api_key');
    if (savedKey) {
      onApiKeySet(savedKey);
    }
  }, [onApiKeySet]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      localStorage.setItem('openweather_api_key', apiKey.trim());
      onApiKeySet(apiKey.trim());
    }
  };

  return (
    <Card className="aqi-card p-8 w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
            <Key className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">Setup Required</h2>
          <p className="text-muted-foreground">
            Enter your OpenWeatherMap API key to get started
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="apiKey">API Key</Label>
          <div className="relative">
            <Input
              id="apiKey"
              type={showKey ? 'text' : 'password'}
              placeholder="Enter your OpenWeatherMap API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={!apiKey.trim()}>
          Save API Key
        </Button>

        <div className="text-sm text-muted-foreground space-y-2">
          <p className="font-medium">Don't have an API key?</p>
          <ol className="list-decimal list-inside space-y-1 text-xs">
            <li>Visit <a href="https://openweathermap.org/api" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">OpenWeatherMap API</a></li>
            <li>Create a free account</li>
            <li>Copy your API key from the dashboard</li>
            <li>Paste it above</li>
          </ol>
          <p className="text-xs text-muted-foreground mt-3">
            Your API key is stored securely in your browser
          </p>
        </div>
      </form>
    </Card>
  );
};