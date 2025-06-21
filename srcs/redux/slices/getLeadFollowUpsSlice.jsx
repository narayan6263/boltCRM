import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLeadFollowUps } from '../../api/GetLeadFollowUps';

export const fetchLeadFollowUps = createAsyncThunk(
  'followUps/fetchAll',
  async (leadId, { rejectWithValue }) => {
    try {
      console.log(`getLeadFollowUpsSlice: Fetching follow ups for leadId ${leadId}`);
      const response = await getLeadFollowUps(leadId);
      if (!response.data) {
        throw new Error('Invalid API response: Missing data');
      }
      const { followUps, totalFollowUps } = response.data;
      if (!Array.isArray(followUps)) {
        throw new Error('Invalid API response: followUps is not an array');
      }
      return {
        followUps,
        totalFollowUps: Number(totalFollowUps) || 0,
      };
    } catch (error) {
      console.error(`getLeadFollowUpsSlice: API Error for leadId ${leadId}:`, error);
      return rejectWithValue(error.message || 'Failed to fetch follow ups');
    }
  }
);

const getLeadFollowUpsSlice = createSlice({
  name: 'followUps',
  initialState: {
    followUps: [],
    totalFollowUps: 0,
    loading: false,
    error: null,
  },
  reducers: {
    resetFollowUpsState: (state) => {
      state.followUps = [];
      state.totalFollowUps = 0;
      state.loading = false;
      state.error = null;
      AsyncStorage.removeItem('cachedFollowUps').catch((err) =>
        console.error('getLeadFollowUpsSlice: Error clearing cached follow ups:', err)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeadFollowUps.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log('getLeadFollowUpsSlice: Pending fetch for leadId');
      })
      .addCase(fetchLeadFollowUps.fulfilled, (state, action) => {
        state.loading = false;
        state.followUps = action.payload.followUps;
        state.totalFollowUps = action.payload.totalFollowUps;
        AsyncStorage.setItem('cachedFollowUps', JSON.stringify(state.followUps)).catch((err) =>
          console.error('getLeadFollowUpsSlice: Error caching follow ups:', err)
        );
        console.log('getLeadFollowUpsSlice: Follow ups fetched', {
          totalFollowUps: state.totalFollowUps,
          followUpsCount: state.followUps.length,
        });
      })
      .addCase(fetchLeadFollowUps.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
        console.error('getLeadFollowUpsSlice: Fetch failed:', {
          error: action.payload,
          state: state,
        });
      });
  },
});

export const { resetFollowUpsState } = getLeadFollowUpsSlice.actions;
export default getLeadFollowUpsSlice.reducer;