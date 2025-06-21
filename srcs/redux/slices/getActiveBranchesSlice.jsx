import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getActiveBranches } from '../../api/getActiveBranchesApi';

export const fetchAllBranches = createAsyncThunk(
  'activeBranches/fetchAll',
  async (_, thunkAPI) => {
    try {
      console.log('Fetching active branches...');
      const branches = await getActiveBranches();
      console.log('Active branches fetched:', branches);
      return branches;
    } catch (error) {
      console.error('Error fetching active branches:', {
        message: error.message,
        stack: error.stack,
      });
      return thunkAPI.rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

const getActiveBranchesSlice = createSlice({
  name: 'activeBranches',
  initialState: {
    activeBranches: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBranches.pending, (state) => {
        console.log('fetchAllBranches pending');
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBranches.fulfilled, (state, action) => {
        console.log('fetchAllBranches fulfilled:', action.payload);
        state.loading = false;
        state.activeBranches = action.payload;
      })
      .addCase(fetchAllBranches.rejected, (state, action) => {
        console.log('fetchAllBranches rejected:', action.payload);
        state.loading = false;
        state.error = action.payload || 'Failed to fetch branches';
      });
  },
});

export default getActiveBranchesSlice.reducer;