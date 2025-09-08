import type { NextRequest } from 'next/server'

const BASE_URL = 'https://api.openweathermap.org';
const API_KEY = process.env.OPENWEATHER_API_KEY;

export async function GET(req: NextRequest) {
  const city = req.nextUrl.searchParams.get('city');
  console.log(city);
  console.log("HELLO WORLD")

  if (!API_KEY) {
    return new Response(JSON.stringify({ error: 'API key not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  if (!city || typeof city !== 'string') {
    return new Response(JSON.stringify({ error: 'City is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    // Geocode
    const geoRes = await fetch(`${BASE_URL}/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${API_KEY}`);
    const geoData = await geoRes.json();
    if (!geoData || geoData.length === 0) {
      return new Response(JSON.stringify({ error: 'City not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { lat, lon } = geoData[0];

    // Air Quality
    const airRes = await fetch(`${BASE_URL}/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
    const airData = await airRes.json();

    return new Response(JSON.stringify({
      location: geoData[0],
      airQuality: airData.list[0]
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Failed to fetch air quality data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}


