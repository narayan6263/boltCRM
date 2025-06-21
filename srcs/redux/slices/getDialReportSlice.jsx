

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDialReport } from '../../api/GetDialReportApi';

export const fetchDialReport = createAsyncThunk(
  'dialReport/fetch',
  async (payload, thunkAPI) => {
    try {
      console.log('Fetching dial report with payload:', payload);
      const response = await getDialReport(payload);
      console.log('Dial report fetched successfully:', response);
      return response;
    } catch (error) {
      console.error('Error fetching dial report:', {
        message: error.message,
        stack: error.stack,
      });
      return thunkAPI.rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

const dialReportSlice = createSlice({
  name: 'dialReport',
  initialState: {
    cardData: null,
    tableData: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetDialReportState: (state) => {
      state.cardData = null;
      state.tableData = [];
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDialReport.pending, (state) => {
        console.log('fetchDialReport pending');
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchDialReport.fulfilled, (state, action) => {
        console.log('fetchDialReport fulfilled:', action.payload);
        state.loading = false;
        state.cardData = action.payload.cardData;
        state.tableData = action.payload.tableData;
        state.success = true;
      })
      .addCase(fetchDialReport.rejected, (state, action) => {
        console.log('fetchDialReport rejected:', action.payload);
        state.loading = false;
        state.error = action.payload || 'Failed to fetch dial report';
        state.success = false;
      });
  },
});

export const { resetDialReportState } = dialReportSlice.actions;
export default dialReportSlice.reducer;