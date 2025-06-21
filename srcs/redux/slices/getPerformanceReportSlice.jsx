import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPerformanceReport } from '../../api/GetPerformanceReportApi';

export const fetchPerformanceReport = createAsyncThunk(
  'performanceReport/fetch',
  async ({ search, dateFilter, startDate, endDate } = {}, thunkAPI) => {
    try {
      const data = await getPerformanceReport({ search, dateFilter, startDate, endDate });
      console.log('✅ Thunk Received Data:', data);

      if (!Array.isArray(data)) {
        throw new Error('Expected an array of performance data');
      }

      return data;
    } catch (error) {
      console.error('❌ Thunk Error:', error);
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch performance report');
    }
  }
);

const performanceReportSlice = createSlice({
  name: 'performanceReport',
  initialState: {
    performanceReport: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPerformanceReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPerformanceReport.fulfilled, (state, action) => {
        state.loading = false;
        state.performanceReport = action.payload;
      })
      .addCase(fetchPerformanceReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch performance report';
      });
  },
});

export default performanceReportSlice.reducer;