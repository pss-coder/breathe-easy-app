import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AirQualityData, GeocodeResponse } from '@/types/openweather';
import build from 'next/dist/build';

// Our Data State
interface AirQualityState {
  state: 'search' | 'loading' | 'display' | 'error';
  error: string;
  airQualityData: {
    airQuality: { main: { aqi: number }; components: AirQualityData['components'] };
    location: GeocodeResponse;
  } | null;
  searchHistory: string[];
}

// itinal Data
const initialState: AirQualityState = {
  state: 'search',
  error: '',
  airQualityData: null,
  searchHistory: [],
};



// Our data and handlers
const airQualitySlice = createSlice({
  name: 'airQuality',
  initialState,
  reducers: {
    setState(state, action: PayloadAction<AirQualityState['state']>) {
      state.state = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    setAirQualityData(state, action: PayloadAction<AirQualityState['airQualityData']>) {
      state.airQualityData = action.payload;
    },
    setSearchHistory(state, action: PayloadAction<string[]>) {
      state.searchHistory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAirQuality.pending, (state) => {
        state.state = "loading";
        state.error = "";
      })
      .addCase(fetchAirQuality.fulfilled, (state, action) => {
        state.state = "display";
        state.airQualityData = action.payload;
      })
      .addCase(fetchAirQuality.rejected, (state, action) => {
        state.state = "error";
        state.error = (action.payload as string) || "Failed to fetch air quality";
      });
  }
});

export const fetchAirQuality = createAsyncThunk(
  "airQuality/fetchAirQuality",
  async (cityName: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/aqi?city=${encodeURIComponent(cityName)}`);
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.error || "Failed to fetch air quality data");
      }
      return await response.json();
    } catch (err) {
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

export const { setState, setError, setAirQualityData, setSearchHistory } = airQualitySlice.actions;
export default airQualitySlice.reducer;