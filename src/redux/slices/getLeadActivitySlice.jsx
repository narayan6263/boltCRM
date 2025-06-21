// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getLeadActivity } from '../../api/GetLeadActivityApi';

// export const fetchLeadActivity = createAsyncThunk(
//   'leadActivity/fetch',
//   async (leadId, thunkAPI) => {
//     try {
//       const data = await getLeadActivity(leadId);
//       console.log('✅ Thunk Received Data:', data);

//       if (!Array.isArray(data)) {
//         throw new Error('Expected an array of lead activity data');
//       }

//       return data;
//     } catch (error) {
//       console.error('❌ Thunk Error:', error);
//       return thunkAPI.rejectWithValue(error.message || 'Failed to fetch lead activity');
//     }
//   }
// );

// const leadActivitySlice = createSlice({
//   name: 'leadActivity',
//   initialState: {
//     leadActivities: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchLeadActivity.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchLeadActivity.fulfilled, (state, action) => {
//         state.loading = false;
//         state.leadActivities = action.payload;
//       })
//       .addCase(fetchLeadActivity.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || 'Failed to fetch lead activity';
//       });
//   },
// });

// export default leadActivitySlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getLeadActivity } from '../../api/GetLeadActivityApi';

export const fetchLeadActivity = createAsyncThunk(
  'leadActivity/fetch',
  async (leadId, thunkAPI) => {
    try {
      // Pass the dynamic leadId to getLeadActivity
      const data = await getLeadActivity(leadId);
      console.log('✅ Thunk Received Data:', data);

      if (!Array.isArray(data)) {
        throw new Error('Expected an array of lead activity data');
      }

      return data;
    } catch (error) {
      console.error('❌ Thunk Error:', error);
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch lead activity');
    }
  }
);

const leadActivitySlice = createSlice({
  name: 'leadActivity',
  initialState: {
    leadActivities: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeadActivity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeadActivity.fulfilled, (state, action) => {
        state.loading = false;
        state.leadActivities = action.payload;
      })
      .addCase(fetchLeadActivity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch lead activity';
      });
  },
});

export default leadActivitySlice.reducer;