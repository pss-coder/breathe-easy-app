import { AirQualityData, AirQualityResponse, AQICategory, GeocodeResponse } from "@/types/openweather";

// AI-Assisted: Create Dummy Data 
// Dummy AirQualityResponse
export const dummyAirQualityResponse: AirQualityResponse = {
  coord: { lon: 77.5946, lat: 12.9716 },
  list: [
    {
      main: { aqi: 1 },
      components: {
        co: 201.94,
        no: 0.02,
        no2: 0.77,
        o3: 68.23,
        so2: 0.64,
        pm2_5: 12.5,
        pm10: 20.1,
        nh3: 0.12,
      },
      dt: 1694188800, // Example timestamp
    },
  ],
};

// Dummy GeocodeResponse
export const dummyGeocodeResponse: GeocodeResponse = {
  name: "Bangalore",
  lat: 12.9716,
  lon: 77.5946,
  country: "IN",
  state: "Karnataka",
};

export const getAQICategory = (aqi: number): AQICategory => {
  if (aqi === 1) {
    return {
      level: 'Good 🌿',
      color: 'bg-green-500',
      description: 'Air quality is satisfactory',
      recommendation: 'Perfect day for outdoor activities! Enjoy the fresh air. 🌞'
    };
  } else if (aqi === 2) {
    return {
      level: 'Fair 🍃',
      color: 'bg-green-500',
      description: 'Air quality is acceptable',
      recommendation: 'Great for most outdoor activities. Sensitive individuals should consider limiting prolonged outdoor exertion. 🌤️'
    };
  } else if (aqi === 3) {
    return {
      level: 'Moderate 😷',
      color: 'bg-gray-500',
      description: 'Unhealthy for sensitive groups',
      recommendation: 'Sensitive individuals should reduce outdoor activities. Everyone else can enjoy normal activities. 🏃‍♂️'
    };
  } else if (aqi === 4) {
    return {
      level: 'Poor ⚠️',
      color: 'bg-yellow-500',
      description: 'Unhealthy for everyone',
      recommendation: 'Consider limiting outdoor activities. Wear a mask if you must go outside. 😷'
    };
  } else if (aqi === 5) {
    return {
      level: 'Very Poor 🔥',
      color: 'bg-red-500',
      description: 'Very unhealthy conditions',
      recommendation: 'Avoid outdoor activities. Stay indoors and keep windows closed. 🏠'
    };
  } else {
    return {
      level: 'Unknown ❓',
      color: 'aqi-moderate',
      description: 'Air quality data unavailable',
      recommendation: 'Unable to provide recommendations at this time. 🌫️'
    };
  }
};

export const getPollutants = (components: AirQualityData['components']): {
  name: string;
  value: number;
  unit: string;
  description: string,
}[] => {
  const pollutants = [
    { name: 'PM2.5', value: components.pm2_5, unit: 'μg/m³', description: "Сoncentration of PM2.5 (Fine particles matter)" },
    { name: 'PM10', value: components.pm10, unit: 'μg/m³', description: "Сoncentration of PM10 (Coarse particulate matter)" },
    { name: 'NO₂', value: components.no2, unit: 'μg/m³',description: "Сoncentration of NO₂ (Nitrogen dioxide)"},
    { name: 'NH₃', value: components.no2, unit: 'μg/m³',description: "Сoncentration of NH₃ (Ammonia)"},
    { name: 'SO₂', value: components.so2, unit: 'μg/m³', description: "Сoncentration of SO₂ (Sulphur dioxide)" },
    { name: 'O₃', value: components.o3, unit: 'μg/m³',description: "Сoncentration of O₃ (Ozone)" },
    { name: 'NO₂', value: components.no2, unit: 'μg/m³',description: "Сoncentration of NO (Nitrogen monoxide)"},
    { name: 'CO', value: components.co, unit: 'μg/m³', description: "Сoncentration of CO (Carbon monoxide)" }
  ];

  // Fids the pollutant with the highest concentration relative to typical safe levels
  // const highestPollutant = pollutants.reduce((max, current) => {
  //   return current.value > max.value ? current : max;
  // });
  // get the value with the highest on top
  return pollutants.sort((a,b) => b.value - a.value);
};

export const formatLocation = (cityName: string, country: string, state?: string): string => {
  if (state && country !== state) {
    return `${cityName}, ${state}, ${country}`;
  }
  return `${cityName}, ${country}`;
};