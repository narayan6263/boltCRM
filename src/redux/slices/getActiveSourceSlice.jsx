import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getActiveSources } from '../../api/GetActiveSourceApi';

export const fetchAllSources = createAsyncThunk(
  'activeSource/fetchAll',
  async (_, thunkAPI) => {
    try {
      console.log('Fetching active sources...');
      const sources = await getActiveSources();
      console.log('Active sources fetched:', sources);
      return sources;
    } catch (error) {
      console.error('Error fetching active sources:', {
        message: error.message,
        stack: error.stack,
      });
      return thunkAPI.rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

const getActiveSourceSlice = createSlice({
  name: 'activeSource',
  initialState: {
    activeSource: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSources.pending, (state) => {
        console.log('fetchAllSources pending');
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSources.fulfilled, (state, action) => {
        console.log('fetchAllSources fulfilled:', action.payload);
        state.loading = false;
        state.activeSource = action.payload;
      })
      .addCase(fetchAllSources.rejected, (state, action) => {
        console.log('fetchAllSources rejected:', action.payload);
        state.loading = false;
        state.error = action.payload || 'Failed to fetch sources';
      });
  },
});

export default getActiveSourceSlice.reducer;