// src/redux/slices/getAllBranchSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllBranch } from '../../api/GetAllBranchApi';

export const fetchAllBranches = createAsyncThunk(
  'branches/fetchAll',
  async (_, thunkAPI) => {
    try {
      const branches = await getAllBranch(); // API now returns branches directly
      return branches;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

const getAllBranchSlice = createSlice({
  name: 'branches',
  initialState: {
    branches: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBranches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBranches.fulfilled, (state, action) => {
        state.loading = false;
        state.branches = action.payload; // already the array of branches
      })
      .addCase(fetchAllBranches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch branches';
      });
  },
});

export default getAllBranchSlice.reducer;
