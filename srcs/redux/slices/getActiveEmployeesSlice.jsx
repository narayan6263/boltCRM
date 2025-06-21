import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getActiveEmployees } from '../../api/getActiveEmployeesApi';

export const fetchAllEmployees = createAsyncThunk(
  'activeEmployees/fetchAll',
  async (_, thunkAPI) => {
    try {
      console.log('Fetching active employees...');
      const employees = await getActiveEmployees();
      console.log('Active employees fetchedaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:', employees);
      return employees;
    } catch (error) {
      console.error('Error fetching active employees:', {
        message: error.message,
        stack: error.stack,
      });
      return thunkAPI.rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

const getActiveEmployeesSlice = createSlice({
  name: 'activeEmployees',
  initialState: {
    activeEmployees: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllEmployees.pending, (state) => {
        console.log('fetchAllEmployees pending');
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllEmployees.fulfilled, (state, action) => {
        console.log('fetchAllEmployees fulfilled:', action.payload);
        state.loading = false;
        state.activeEmployees = action.payload;
      })
      .addCase(fetchAllEmployees.rejected, (state, action) => {
        console.log('fetchAllEmployees rejected:', action.payload);
        state.loading = false;
        state.error = action.payload || 'Failed to fetch employees';
      });
  },
});

export default getActiveEmployeesSlice.reducer;