import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { bulkAssignLeads } from '../../api/BulkAssignLeadsApi';

export const assignLeads = createAsyncThunk(
  'bulkAssignLeads/assign',
  async (payload, thunkAPI) => {
    try {
      console.log('Assigning leads with payload:', payload);
      const response = await bulkAssignLeads(payload);
      console.log('Leads assigned successfully:', response);
      return response;
    } catch (error) {
      console.error('Error assigning leads:', {
        message: error.message,
        stack: error.stack,
      });
      return thunkAPI.rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

const bulkAssignLeadsSlice = createSlice({
  name: 'bulkAssignLeads',
  initialState: {
    assignedLeads: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetAssignState: (state) => {
      state.assignedLeads = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(assignLeads.pending, (state) => {
        console.log('assignLeads pending');
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(assignLeads.fulfilled, (state, action) => {
        console.log('assignLeads fulfilled:', action.payload);
        state.loading = false;
        state.assignedLeads = action.payload;
        state.success = true;
      })
      .addCase(assignLeads.rejected, (state, action) => {
        console.log('assignLeads rejected:', action.payload);
        state.loading = false;
        state.error = action.payload || 'Failed to assign leads';
        state.success = false;
      });
  },
});

export const { resetAssignState } = bulkAssignLeadsSlice.actions;
export default bulkAssignLeadsSlice.reducer;