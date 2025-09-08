
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Wind } from 'lucide-react';
import { AirQualityData, GeocodeResponse } from '@/types/openweather';
import { dummyAirQualityResponse, dummyGeocodeResponse, formatLocation, getAQICategory, getPollutants } from '@/lib/air-quality-display-helper';

interface AQIDisplayProps {
  airQuality: {
    main: { aqi: number };
    components: AirQualityData['components'];
  };
  location: GeocodeResponse;
  onNewSearch: () => void;
}

export const AQIDisplay = ({ airQuality, location, onNewSearch }: AQIDisplayProps) => {
  // const aqiCategory = getAQICategory(dummyAirQualityResponse.list[0].main.aqi);
  // const mainPollutant = getMainPollutant(dummyAirQualityResponse.list[0].components);
  // const locationText = formatLocation(dummyGeocodeResponse.name, dummyGeocodeResponse.country, dummyGeocodeResponse.state);

   const aqiCategory = getAQICategory(airQuality.main.aqi);
  const pollutants = getPollutants(airQuality.components);
  const locationText = formatLocation(location.name, location.country, location.state);

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      {/* Location Header */}
      <Card className="aqi-card p-6">
        <div className="flex items-center gap-2 text-center justify-center">
          <MapPin className="w-5 h-5 text-muted-foreground" />
          <h2 className="text-xl font-semibold">{locationText}</h2>
        </div>
      </Card>

      {/* Main AQI Display */}
      <Card className="aqi-card p-8 text-center">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
              Air Quality Index
            </p>
            <div className={`text-2xl font-bold`}>
              {dummyAirQualityResponse.list[0].main.aqi}
            </div>
          </div>
          
          <div className="space-y-2">
            <Badge 
              variant="default" 
              className={`${aqiCategory.color} text-white px-4 py-2 text-lg font-semibold`}
            >
              {aqiCategory.level}
            </Badge>
            <p className="text-muted-foreground">
              {aqiCategory.description}
            </p>
          </div>
        </div>
      </Card>

      {/* Main Pollutant */}
      {/* <Card className="aqi-card p-6">
        <div className="flex items-center gap-3">
          <Wind className="w-5 h-5 text-muted-foreground" />
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Pollutants</p>
            <p className="font-semibold">
              {pollutants[0].name}: {pollutants[0].value.toFixed(1)} {pollutants[0].unit}
            </p>
          </div>
        </div>
      </Card> */}

      <Card className="aqi-card p-6">
        <div className="flex items-center gap-3">
          <Wind className="w-5 h-5 text-muted-foreground" />
          <p className="text-sm text-muted-foreground mb-2">Pollutants</p>
          <ul className="space-y-1">
            {pollutants.map((pollutant, idx) => (
              <li key={pollutant.name + idx} className="flex items-center gap-2">
                <span className="font-semibold">{pollutant.name}: </span>
                <span className="text-muted-foreground">{pollutant.value} {pollutant.unit}</span>
              </li>
            ))}
          </ul>
        </div>
      </Card>

      {/* Health Recommendation */}
      <Card className="aqi-card p-6">
        <div className="space-y-2">
          <h3 className="font-semibold">Health Recommendation</h3>
          <p className="text-muted-foreground leading-relaxed">
            {aqiCategory.recommendation}
          </p>
        </div>
      </Card>

      {/* New Search Button */}
      <Card className="aqi-card p-4">
        <button
          onClick={onNewSearch}
          className="w-full text-primary hover:text-primary/80 font-medium transition-colors"
        >
          Search Another City
        </button>
      </Card>
    </div>
  );
};