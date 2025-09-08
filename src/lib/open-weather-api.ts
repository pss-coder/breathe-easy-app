import { AirQualityResponse, GeocodeResponse } from "@/types/openweather";

const BASE_URL = 'https://api.openweathermap.org';

let API_KEY = '';

export class OpenWeatherAirQualityService {
  static setApiKey(apiKey: string) {
    API_KEY = apiKey;
  }

  static getApiKey(): string {
    if (!API_KEY) {
      API_KEY = localStorage.getItem('openweather_api_key') || '';
    }
    return API_KEY;
  }
  static async geocodeCity(cityName: string): Promise<GeocodeResponse[]> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('API key not configured');
    }
    
    const response = await fetch(`${BASE_URL}/geo/1.0/direct?q=${encodeURIComponent(cityName)}&limit=1&appid=${apiKey}`);
    
    if (!response.ok) {
      throw new Error('Failed to find city coordinates');
    }
    
    const data = await response.json();
    
    if (!data || data.length === 0) {
      throw new Error('City not found');
    }
    
    return data;
  }

  static async getAirQuality(lat: number, lon: number): Promise<AirQualityResponse> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('API key not configured');
    }
    
    const response = await fetch(`${BASE_URL}/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch air quality data');
    }
    
    const data = await response.json();
    return data;
  }

  static async getAirQualityByCity(cityName: string) {
    try {
      const geocodeData = await this.geocodeCity(cityName);
      const { lat, lon } = geocodeData[0];
      const airQualityData = await this.getAirQuality(lat, lon);
      
      return {
        location: geocodeData[0],
        airQuality: airQualityData.list[0]
      };
    } catch (error) {
      console.error('Air quality service error:', error);
      throw error;
    }
  }
}