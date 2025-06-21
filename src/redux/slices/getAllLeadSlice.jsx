import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllLeads } from '../../api/GetAllLeadApi';

export const fetchAllLeads = createAsyncThunk(
  'leads/fetchAll',
  async ({ filters = {}, page = 1, refresh = false, limit = 50 }, thunkAPI) => {
    try {
      const response = await getAllLeads(filters, page, limit);
      return { ...response.data, refresh };
    } catch (error) {
      return thunkAPI.rejectWithValue(error || 'Failed to fetch leads');
    }
  }
);

const getAllLeadsSlice = createSlice({
  name: 'leads',
  initialState: {
    formattedLeads: [],
    totalPages: 1,
    currentPage: 1,
    totalLeads: 0,
    hasMore: false,
    loading: false,
    error: null,
  },
  reducers: {
    resetLeadsState: (state) => {
      state.formattedLeads = [];
      state.totalPages = 1;
      state.currentPage = 1;
      state.totalLeads = 0;
      state.hasMore = false;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllLeads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllLeads.fulfilled, (state, action) => {
        state.loading = false;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.totalLeads = action.payload.totalLeads;
        state.hasMore = action.payload.hasMore;
        if (action.payload.refresh) {
          state.formattedLeads = action.payload.formattedLeads;
        } else {
          state.formattedLeads = [
            ...state.formattedLeads,
            ...action.payload.formattedLeads,
          ];
        }
      })
      .addCase(fetchAllLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch leads';
      });
  },
});

export const { resetLeadsState } = getAllLeadsSlice.actions;
export default getAllLeadsSlice.reducer;