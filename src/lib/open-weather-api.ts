import { AirQualityResponse, GeocodeResponse } from "@/types/openweather";


const BASE_URL = 'https://api.openweathermap.org';

let API_KEY = process.env.NEXT_PUBLIC_API_KEY

export class OpenWeatherAirQualityService {
  
  static async geocodeCity(cityName: string): Promise<GeocodeResponse[]> {
    if (!API_KEY) {
      throw new Error('API key not configured');
    }
    
    const response = await fetch(`${BASE_URL}/geo/1.0/direct?q=${encodeURIComponent(cityName)}&limit=1&appid=${API_KEY}`);
    
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
    if (!API_KEY) {
      throw new Error('API key not configured');
    }
    
    const response = await fetch(`${BASE_URL}/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
    
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