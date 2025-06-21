import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { uploadEmployeeImage } from '../../api/EmployeeImageUpload';

// Thunk to handle asynchronous image upload
export const uploadEmployeeImageThunk = createAsyncThunk(
  'employeeImage/upload',
  async ({ employeeId, image, fieldName }, thunkAPI) => {
    try {
      const data = await uploadEmployeeImage(employeeId, image, fieldName);
      console.log('✅ Thunk Received Image Upload Data:', data);
      return data;
    } catch (error) {
      console.error('❌ Thunk Image Upload Error:', {
        message: error.message,
        employeeId,
      });
      return thunkAPI.rejectWithValue(error.message || 'Failed to upload employee image');
    }
  }
);

const employeeImageSlice = createSlice({
  name: 'employeeImage',
  initialState: {
    photoUrl: null,
    uploading: false,
    error: null,
  },
  reducers: {
    // Clear image state if needed (e.g., on logout)
    clearImageState: (state) => {
      state.photoUrl = null;
      state.uploading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadEmployeeImageThunk.pending, (state) => {
        state.uploading = true;
        state.error = null;
      })
      .addCase(uploadEmployeeImageThunk.fulfilled, (state, action) => {
        state.uploading = false;
        state.photoUrl = action.payload.photoUrl || null; // Use photoUrl from normalized response
      })
      .addCase(uploadEmployeeImageThunk.rejected, (state, action) => {
        state.uploading = false;
        state.error = action.payload || 'Failed to upload employee image';
      });
  },
});

export const { clearImageState } = employeeImageSlice.actions;
export default employeeImageSlice.reducer;