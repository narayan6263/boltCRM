// src/slices/getDecryptInfoSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchDecryptInfo } from '../../api/GetDecryptInfo';
// Async thunk for fetching decrypt info
export const getDecryptInfo = createAsyncThunk(
  'decryptInfo/fetchDecryptInfo',
  async (contactId, { rejectWithValue }) => {
    try {
      console.log('lkjhgvf', contactId)
      const data = await fetchDecryptInfo(contactId);
      return data;
    } catch (error) {
       console.log('11111111111111111111')
      return rejectWithValue(error.response?.data || 'Failed to fetch decrypt info');
    }
  }
);

const getDecryptInfoSlice = createSlice({
  name: 'decryptInfo',
  initialState: {
    data: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    resetDecryptInfo: (state) => {
      state.data = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDecryptInfo.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getDecryptInfo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getDecryptInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { resetDecryptInfo } = getDecryptInfoSlice.actions;
export default getDecryptInfoSlice.reducer;