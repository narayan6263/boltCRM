// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getDynamicStatusCounts } from '../../api/GetDynamicStatusCounts';

// export const fetchDynamicStatusCounts = createAsyncThunk(
//   'dynamicStatus/fetchDynamicStatusCounts',
//   async (_, { rejectWithValue }) => {
//     try {
//       const data = await getDynamicStatusCounts();
//       return data.data.statusDetails; // Extract the 'statusDetails' array from the response
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// const getDynamicStatusCountsSlice = createSlice({
//   name: 'dynamicStatus',
//   initialState: {
//     statusCounts: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchDynamicStatusCounts.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchDynamicStatusCounts.fulfilled, (state, action) => {
//         state.loading = false;
//         state.statusCounts = action.payload;
//       })
//       .addCase(fetchDynamicStatusCounts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || 'Failed to load dynamic status counts';
//       });
//   },
// });

// export default getDynamicStatusCountsSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDynamicStatusCounts } from '../../api/GetDynamicStatusCounts';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchDynamicStatusCounts = createAsyncThunk(
  'dynamicStatus/fetchDynamicStatusCounts',
  async (_, { rejectWithValue }) => {
    try {
      const orgId = await AsyncStorage.getItem('orgId');
      if (!orgId) {
        return rejectWithValue('Organization UUID not found in storage');
      }

      const data = await getDynamicStatusCounts();
      if (data.error) {
        return rejectWithValue(data.error);
      }
      return data.data.statusDetails; // Extract the 'statusDetails' array from the response
    } catch (error) {
      console.error('❌ Error in fetchDynamicStatusCounts:', error);
      return rejectWithValue(error.message || 'Failed to load dynamic status counts');
    }
  }
);

const getDynamicStatusCountsSlice = createSlice({
  name: 'dynamicStatus',
  initialState: {
    statusCounts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDynamicStatusCounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDynamicStatusCounts.fulfilled, (state, action) => {
        state.loading = false;
        state.statusCounts = action.payload;
      })
      .addCase(fetchDynamicStatusCounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default getDynamicStatusCountsSlice.reducer;