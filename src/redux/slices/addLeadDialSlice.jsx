import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addLeadDial } from '../../api/addLeadDial'; // Changed from `addLead as addLeadAPI`

export const createDialLead = createAsyncThunk(
  'dialLead/createLead',
  async (formData, { rejectWithValue }) => {
    try {
      const data = await addLeadDial(formData); // Use addLeadDial directly
      return data;
    } catch (error) {
      const errorMessage = error.response?.status === 409
        ? 'Contact with this email or phone already exists.'
        : error.response?.data?.message || error.message || 'Failed to add dial lead';
      return rejectWithValue(errorMessage);
    }
  }
);

// Rest of the slice remains unchanged
const dialLeadSlice = createSlice({
  name: 'dialLead',
  initialState: {
    loading: false,
    success: false,
    error: null,
    lead: null,
    callStatus: null,
    callLogId: null,
  },
  reducers: {
    resetDialLeadState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.lead = null;
      state.callStatus = null;
      state.callLogId = null;
    },
    setCallStatus: (state, action) => {
      state.callStatus = action.payload;
    },
    setCallLogId: (state, action) => {
      state.callLogId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDialLead.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.callStatus = 'Initiating';
      })
      .addCase(createDialLead.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.lead = action.payload;
        state.callStatus = action.payload?.dialUpMethod?.callStatus || 'Completed';
        state.callLogId = action.payload?.dialUpMethod?.callSid || null;
      })
      .addCase(createDialLead.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.callStatus = 'Failed';
        state.callLogId = null;
      });
  },
});

export const { resetDialLeadState, setCallStatus, setCallLogId } = dialLeadSlice.actions;
export default dialLeadSlice.reducer;