import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addLead as addLeadAPI } from '../../api/AddLead';

export const addLead = createAsyncThunk(
  'addLead/createLead',
  async (formData, { rejectWithValue }) => {
    try {
      const data = await addLeadAPI(formData);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const addLeadSlice = createSlice({
  name: 'addLead',
  initialState: {
    loading: false,
    success: false,
    error: null,
    lead: null,
  },
  reducers: {
    resetAddLeadState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.lead = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addLead.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(addLead.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.lead = action.payload;
      })
      .addCase(addLead.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { resetAddLeadState } = addLeadSlice.actions;
export default addLeadSlice.reducer;