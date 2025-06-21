import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { logOutUser } from '../../api/logoutApi';

export const userLogout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    const response = await logOutUser();
    return response;
  } catch (error) {
    return rejectWithValue(error.message || 'Logout failed');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    orgId: null,
    expiresAt: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearAuthState: (state) => {
      state.user = null;
      state.token = null;
      state.orgId = null;
      state.expiresAt = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.orgId = null;
        state.expiresAt = null;
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Logout failed';
      });
  },
});

export const { clearAuthState } = authSlice.actions;
export default authSlice.reducer;