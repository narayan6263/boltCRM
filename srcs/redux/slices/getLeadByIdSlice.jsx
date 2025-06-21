import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getLeadById } from '../../api/GetLeadByIdApi';

export const fetchLeadById = createAsyncThunk(
  'lead/fetchLeadById',
  async (leadId, { rejectWithValue }, options = {}) => {
    try {
      if (!leadId || !/^[0-9a-fA-F]{24}$/.test(leadId)) {
        throw new Error('Invalid or missing leadId');
      }
      console.log(`Fetching lead for leadId: ${leadId} with options:`, JSON.stringify(options, null, 2));
      const response = await getLeadById(leadId, options);
      console.log('✅ Full Lead API  asdfsdfsadfasdfsdf:');
      return response; // Return the full response
    } catch (error) {
      console.error('❌ Error fetching lead:', JSON.stringify(error, null, 2));
      const errorPayload = {
        message: error.message || 'Failed to fetch lead',
        status: error.response?.status || 'error',
        data: error.response?.data || {},
      };
      return rejectWithValue(errorPayload);
    }
  }
);

const getLeadByIdSlice = createSlice({
  name: 'getLeadById',
  initialState: {
    lead: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetLeadByIdState: (state) => {
      state.lead = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeadById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.lead = null;
        console.log('Pending: Fetching lead...');
      })
      .addCase(fetchLeadById.fulfilled, (state, action) => {
        state.loading = false;
        state.lead = action.payload;
        if (!action.payload?.data?.status) {
          console.warn('Lead status missing, setting default');
          state.lead.data = { ...action.payload.data, status: 'unknown' };
        }
        console.log('Fulfilled: Lead fetched:', JSON.stringify(action.payload, null, 2));
      })
      .addCase(fetchLeadById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error('Rejected: Error fetching lead:', JSON.stringify(action.payload, null, 2));
      });
  },
});

export const { resetLeadByIdState } = getLeadByIdSlice.actions;
export default getLeadByIdSlice.reducer;