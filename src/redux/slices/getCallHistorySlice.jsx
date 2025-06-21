// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getCallHistory } from '../../api/getCallHistoryApi';

// export const fetchCallHistory = createAsyncThunk(
//   'callHistory/fetch',
//   async ({ employeeId, page = 1, limit = 10 }, thunkAPI) => {
//     try {
//       const data = await getCallHistory(employeeId, page, limit);
//       console.log('✅ Thunk Received Call History Data:', data);
//       return data;
//     } catch (error) {
//       console.error('❌ Thunk Error:', error);
//       return thunkAPI.rejectWithValue(error.message || 'Failed to fetch call history');
//     }
//   }
// );

// const callHistorySlice = createSlice({
//   name: 'callHistory',
//   initialState: {
//     callHistory: [],
//     currentPage: 1,
//     totalPages: 1,
//     totalRecords: 0,
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     resetCallHistory: (state) => {
//       state.callHistory = [];
//       state.currentPage = 1;
//       state.totalPages = 1;
//       state.totalRecords = 0;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCallHistory.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchCallHistory.fulfilled, (state, action) => {
//         state.loading = false;
//         state.callHistory = action.payload.data;
//         state.currentPage = action.payload.currentPage;
//         state.totalPages = action.payload.totalPages;
//         state.totalRecords = action.payload.totalRecords;
//       })
//       .addCase(fetchCallHistory.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || 'Failed to fetch call history';
//       });
//   },
// });

// export const { resetCallHistory } = callHistorySlice.actions;
// export default callHistorySlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCallHistory } from '../../api/getCallHistoryApi';

export const fetchCallHistory = createAsyncThunk(
  'callHistory/fetch',
  async ({ employeeId, page = 1, limit = 10 }, thunkAPI) => {
    try {
      const data = await getCallHistory(employeeId, page, limit);
      console.log('✅ Thunk Received Call History Data:', data);
      if (!Array.isArray(data.data)) {
        console.warn('⚠️ Thunk: Expected data.data to be an array, got:', data.data);
        throw new Error('Invalid API response: data is not an array');
      }
      return data;
    } catch (error) {
      console.error('❌ Thunk Error:', error);
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch call history');
    }
  }
);

const callHistorySlice = createSlice({
  name: 'callHistory',
  initialState: {
    callHistory: [],
    currentPage: 1,
    totalPages: 1,
    totalRecords: 0,
    loading: false,
    error: null,
  },
  reducers: {
    resetCallHistory: (state) => {
      state.callHistory = [];
      state.currentPage = 1;
      state.totalPages = 1;
      state.totalRecords = 0;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCallHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCallHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.callHistory = action.payload.data;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.totalRecords = action.payload.totalRecords;
      })
      .addCase(fetchCallHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch call history';
      });
  },
});

export const { resetCallHistory } = callHistorySlice.actions;
export default callHistorySlice.reducer;