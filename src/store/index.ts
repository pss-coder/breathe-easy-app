import { configureStore } from '@reduxjs/toolkit';
import airQualitySlice from './slices/airQualitySlice';

export const store = configureStore({
  reducer: {
    airQuality: airQualitySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;