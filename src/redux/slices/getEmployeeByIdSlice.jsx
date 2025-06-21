import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getEmployeeById } from '../../api/getEmployeeByIdApi';

const initialState = {
  employee: null,
  loading: false,
  error: null,
};

export const fetchEmployeeById = createAsyncThunk(
  'employee/fetchEmployeeById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await getEmployeeById(id);
      return response; // Now receives only the employee data
    } catch (error) {
      return rejectWithValue(error || 'Failed to fetch employee'); // Use thrown error
    }
  }
);

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    clearEmployee: (state) => {
      state.employee = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployeeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployeeById.fulfilled, (state, action) => {
        state.loading = false;
        state.employee = action.payload;
      })
      .addCase(fetchEmployeeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;