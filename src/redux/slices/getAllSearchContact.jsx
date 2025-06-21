// src/redux/slices/searchContactSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllSearchContact } from '../../api/GetAllSearchContact'; // Adjust path

export const fetchSearchContacts = createAsyncThunk(
  'searchContact/fetchSearchContacts',
  async (searchTerm, { rejectWithValue }) => {
    try {
      const data = await getAllSearchContact(searchTerm);
      console.log('Thunk received data:', data); // Debug
      return data.data.contacts; // Extract contacts array
    } catch (error) {
      console.error('Thunk error:', error); // Debug
      return rejectWithValue(error.message || 'Failed to fetch search contacts');
    }
  }
);

const searchContactSlice = createSlice({
  name: 'searchContact',
  initialState: {
    searchContacts: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearSearchContacts: (state) => {
      state.searchContacts = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.searchContacts = action.payload || [];
      })
      .addCase(fetchSearchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load search contacts';
      });
  },
});

export const { clearSearchContacts } = searchContactSlice.actions;
export default searchContactSlice.reducer;