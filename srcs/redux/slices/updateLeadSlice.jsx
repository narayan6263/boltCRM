// src/slices/updateLeadSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateLeadApi } from '../../api/updateLeadApi'; // Adjusted path and import name

// Debug import
console.log('updateLeadSlice: Imported updateLeadApi', updateLeadApi);

export const updateLeadAsync = createAsyncThunk(
  'lead/updateLead',
  async ({ leadId, leadData, postUpdatedLead }, { rejectWithValue }) => {
    try {
      console.log(`updateLeadSlice: Updating lead for leadId ${leadId}`, leadData, `postUpdatedLead: ${postUpdatedLead}`);
      if (!updateLeadApi) {
        throw new Error('updateLeadApi is not defined');
      }
      const updatedLead = await updateLeadApi(leadId, leadData, postUpdatedLead);
      console.log(`updateLeadSlice: Update response for leadId ${leadId}`, updatedLead);
      return updatedLead;
    } catch (error) {
      console.error(`updateLeadSlice: Error updating lead for leadId ${leadId}:`, error);
      return rejectWithValue(error.message || 'Failed to update lead');
    }
  }
);

const updateLeadSlice = createSlice({
  name: 'lead/updateLead',
  initialState: {
    lead: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateLeadAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log('updateLeadSlice: Pending update for lead');
      })
      .addCase(updateLeadAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.lead = action.payload;
        console.log('updateLeadSlice: Lead updated successfully', action.payload);
      })
      .addCase(updateLeadAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update lead';
        console.error('updateLeadSlice: Update failed:', action.payload);
      });
  },
});

export default updateLeadSlice.reducer;