// aircraftsSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { SerializedError } from '@reduxjs/toolkit';

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
  error: null,
};

export const fetchAircrafts = createAsyncThunk('aircrafts/fetchAircrafts', async (api_key: string, thunkAPI) => {
  try {
    const response = await axios.get('https://api.api-ninjas.com/v1/aircraft', {
      headers: {
        'X-Api-Key': api_key,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
});

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
            .addCase(fetchAircrafts.fulfilled, (state, action: PayloadAction<Aircraft[]>) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchAircrafts.rejected, (state, action: PayloadAction<unknown, string, { arg: string; requestId: string; requestStatus: "rejected"; aborted: boolean; condition: boolean; } & ({ rejectedWithValue: true; } | ({ rejectedWithValue: false; } & {})), SerializedError>) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default aircraftsSlice.reducer;
