import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllEmployees } from '../../api/GetAllEmployeeApi';

export const fetchAllEmployees = createAsyncThunk(
  'employees/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllEmployees();
      console.log('fetchAllEmployees payload:', data);
      return data;
    } catch (error) {
      console.log('fetchAllEmployees error:', error);
      return rejectWithValue(error);
    }
  }
);

const getAllEmployeesSlice = createSlice({
  name: 'employees',  
  initialState: {
    data: null, // Changed from [] to null for clarity
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAllEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export default getAllEmployeesSlice.reducer;