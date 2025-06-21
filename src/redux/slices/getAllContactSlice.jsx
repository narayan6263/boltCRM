import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllContacts } from '../../api/GetAllContactApi';

export const fetchAllContacts = createAsyncThunk(
  'contact/fetchAllContacts',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllContacts();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const getAllContactSlice = createSlice({
  name: 'contact',
  initialState: {
    contacts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(fetchAllContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load contacts';
      });
  },
});

export default getAllContactSlice.reducer;
