export interface AirQualityData {
  aqi: number;
  components: {
    co: number;
    no: number;
    no2: number;
    o3: number;
    so2: number;
    pm2_5: number;
    pm10: number;
    nh3: number;
  };
}

export interface AirQualityResponse {
  coord: {
    lon: number;
    lat: number;
  };
  list: Array<{
    main: {
      aqi: number;
    };
    components: {
      co: number;
      no: number;
      no2: number;
      o3: number;
      so2: number;
      pm2_5: number;
      pm10: number;
      nh3: number;
    };
    dt: number;
  }>;
}

export interface GeocodeResponse {
  name: string;
  local_names?: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export interface AQICategory {
  level: string;
  color: string;
  description: string;
  recommendation: string;
}

export interface MainPollutant {
  name: string;
  value: number;
  unit: string;
}