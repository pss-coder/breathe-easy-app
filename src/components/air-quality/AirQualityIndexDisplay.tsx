import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Wind } from 'lucide-react';
import { AirQualityData, GeocodeResponse } from '@/types/openweather';
import { dummyAirQualityResponse, dummyGeocodeResponse, formatLocation, getAQICategory, getPollutants } from '@/lib/air-quality-display-helper';
import { Button } from '../ui/button';

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
    <div className="w-full max-w-lg mx-auto">
  <div className="flex flex-col md:flex-row gap-6">
    {/* Left column */}
    <div className="flex flex-col gap-6 flex-1">
      {/* Location */}
      <Card aria-labelledby="location-heading" className="aqi-card p-6">
        <div className="flex items-center gap-2 text-center justify-center">
          <MapPin className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
          <h2 id="location-heading" className="text-xl font-semibold">
            {locationText}
          </h2>
        </div>
      </Card>

      {/* AQI */}
      <Card aria-labelledby="air quality heading" className="aqi-card p-8 text-center">
        <div className="space-y-4">
          <div>
            <p
              id="aqi-heading"
              className="text-sm text-muted-foreground uppercase tracking-wide mb-2"
            >
              Air Quality Index
            </p>
            <div className="text-2xl font-bold">
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
            <p className="text-muted-foreground">{aqiCategory.description}</p>
          </div>
        </div>
      </Card>
    </div>

    {/* Right column: Pollutants */}
    <div className="flex flex-col gap-6 flex-1 justify-stretch">
      <Card aria-labelledby="pollutants heading" className="aqi-card p-6 h-full">
        <div>
          <h3 id="pollutants-heading" className="text-sm text-muted-foreground mb-2">
            Pollutants
          </h3>
          <ul className="space-y-2">
            {pollutants.map((pollutant, idx) => (
              <li
                key={pollutant.name + idx}
                className="flex items-center justify-between gap-2 py-1"
              >
                <span className="flex items-center gap-2">
                  <Wind className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                  <span className="font-semibold">{pollutant.name}</span>
                </span>
                <span className="text-muted-foreground text-right min-w-[70px]">
                  {pollutant.value} {pollutant.unit}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  </div>

  {/* Health Recommendation */}
  <Card
    aria-labelledby="health-recommendation-heading"
    className="aqi-card p-6 mt-6"
  >
    <div className="space-y-2">
      <h3 id="health-recommendation-heading" className="font-semibold">
        Health Recommendation
      </h3>
      <p className="text-muted-foreground leading-relaxed">
        {aqiCategory.recommendation}
      </p>
    </div>
  </Card>

  {/* Search Again */}
  <Card className="aqi-card p-4 mt-6">
    <Button
      onClick={onNewSearch}
      variant="ghost"
      className="w-full text-primary hover:text-primary/80 font-medium transition-colors"
      aria-label="Search for another city"
    >
      Search Another City
    </Button>
  </Card>
</div>
  );
};