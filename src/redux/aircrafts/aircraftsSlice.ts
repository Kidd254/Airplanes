// aircraftsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Aircraft {
  manufacturer: string;
  model: string;
  engine_type: string;
  engine_thrust_lb_ft?: string; // Optional field
  max_speed_knots?: string; // Optional field
  cruise_speed_knots?: string; // Optional field
  ceiling_ft?: string; // Optional field
  rate_of_climb_ft_per_min?: string; // Optional field
  takeoff_ground_run_ft?: string; // Optional field
  landing_ground_roll_ft?: string; // Optional field
  gross_weight_lbs?: string; // Optional field
  empty_weight_lbs?: string; // Optional field
  length_ft?: string; // Optional field
  height_ft?: string; // Optional field
  wing_span_ft?: string; // Optional field
  range_nautical_miles?: string; // Optional field
}

interface AircraftsState {
  data: Aircraft[];
  loading: boolean;
  error: string | null;
}

const initialState: AircraftsState = {
  data: [],
  loading: false,
  error: null
};

export const fetchAircrafts = createAsyncThunk(
  'aircrafts/fetchAircrafts',
  async (
    {
      api_key,
      manufacturer,
      model,
    }: { api_key: string; manufacturer: string; model: string },
    thunkAPI
  ) => {
    try {
      const apiUrl = `https://api.api-ninjas.com/v1/aircraft?manufacturer=${manufacturer}&model=${model}`;
      const response = await axios.get(apiUrl, {
        headers: {
          'X-Api-Key': api_key,
        },
      });
      return response.data;
    } catch (error: any) {
      console.error('API request failed:', error);
      console.log('Request config:', error.config);
      console.log('Response data:', error.response?.data);
      throw error;
    }
  }
);



const aircraftsSlice = createSlice({
  name: 'aircrafts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAircrafts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAircrafts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAircrafts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      });
  }
});

export default aircraftsSlice.reducer;
