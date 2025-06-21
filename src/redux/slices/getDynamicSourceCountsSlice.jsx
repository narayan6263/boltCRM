// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getDynamicSourceCounts } from '../../api/GetDynamicSourceCountsApi';

// export const fetchDynamicSourceCounts = createAsyncThunk(
//   'dynamicSourceCounts/fetchDynamicSourceCounts',
//   async (_, { rejectWithValue }) => {
//     try {
//       const data = await getDynamicSourceCounts();
//       return data.data.sourceDetails; // Extract the 'sourceDetails' array from the response
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// const getDynamicSourceCountsSlice = createSlice({
//   name: 'dynamicSourceCounts',
//   initialState: {
//     sourceDetails: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchDynamicSourceCounts.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchDynamicSourceCounts.fulfilled, (state, action) => {
//         state.loading = false;
//         state.sourceDetails = action.payload;
//       })
//       .addCase(fetchDynamicSourceCounts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || 'Failed to load dynamic source counts';
//       });
//   },
// });

// export default getDynamicSourceCountsSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDynamicSourceCounts } from '../../api/GetDynamicSourceCountsApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchDynamicSourceCounts = createAsyncThunk(
  'dynamicSourceCounts/fetchDynamicSourceCounts',
  async (_, { rejectWithValue }) => {
    try {
      const orgId = await AsyncStorage.getItem('orgId');
      if (!orgId) {
        return rejectWithValue('Organization UUID not found in storage');
      }

      const data = await getDynamicSourceCounts();
      if (data.error) {
        return rejectWithValue(data.error);
      }
      return data.data.sourceDetails; // Extract the 'sourceDetails' array from the response
    } catch (error) {
      console.error('❌ Error in fetchDynamicSourceCounts:', error);
      return rejectWithValue(error.message || 'Failed to load dynamic source counts');
    }
  }
);

const getDynamicSourceCountsSlice = createSlice({
  name: 'dynamicSourceCounts',
  initialState: {
    sourceDetails: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDynamicSourceCounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDynamicSourceCounts.fulfilled, (state, action) => {
        state.loading = false;
        state.sourceDetails = action.payload;
      })
      .addCase(fetchDynamicSourceCounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default getDynamicSourceCountsSlice.reducer;