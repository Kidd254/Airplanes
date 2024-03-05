// aircraftsSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Aircraft {
  manufacturer: string;
  model: string;
  engine_type: string;
  min_speed: number;
  max_speed: number;
  min_range: number;
  max_range: number;
  min_length: number;
  max_length: number;
  min_height: number;
  max_height: number;
  min_wingspan: number;
  max_wingspan: number;
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
      model
    }: { api_key: string; manufacturer: string; model: string },
    thunkAPI
  ) => {
    try {
      const apiUrl = `https://api.api-ninjas.com/v1/aircraft?manufacturer=${manufacturer}&model=${model}`;
      const response = await axios.get(apiUrl, {
        headers: {
          'X-Api-Key': api_key
        }
      });
      return response.data;
    } catch (error) {
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
      .addCase(
        fetchAircrafts.fulfilled,
        (state, action: PayloadAction<Aircraft[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchAircrafts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      }
      );
  }
});

export default aircraftsSlice.reducer;
