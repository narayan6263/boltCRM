import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getActiveStatuses } from '../../api/getActiveStatusesApi';

export const fetchActiveStatuses = createAsyncThunk(
  'activeStatuses/fetchAll',
  async (_, thunkAPI) => {
    try {
      console.log('Fetching active statuses...');
      const statuses = await getActiveStatuses();
      console.log('Active statuses fetched:', statuses);
      return statuses;
    } catch (error) {
      console.error('Error fetching active statuses:', {
        message: error.message,
        stack: error.stack,
      });
      return thunkAPI.rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

const getActiveStatusSlice = createSlice({
  name: 'activeStatuses',
  initialState: {
    statuses: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActiveStatuses.pending, (state) => {
        console.log('fetchActiveStatuses pending');
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActiveStatuses.fulfilled, (state, action) => {
        console.log('fetchActiveStatuses fulfilled:', action.payload);
        state.loading = false;
        state.statuses = action.payload;
      })
      .addCase(fetchActiveStatuses.rejected, (state, action) => {
        console.log('fetchActiveStatuses rejected:', action.payload);
        state.loading = false;
        state.error = action.payload || 'Failed to fetch statuses';
      });
  },
});

export default getActiveStatusSlice.reducer;