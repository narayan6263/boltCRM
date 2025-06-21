import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllContacts } from '../../api/GetAllContactApi';

export const fetchAllContacts = createAsyncThunk(
  'contact/fetchAllContacts',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Fetching all contacts...');
      const response = await getAllContacts();
      console.log('✅ Contacts API Response:', response);
      return response; // Assuming response is { data: { formattedcontacts: [...] } }
    } catch (error) {
      console.error('❌ Error fetching contacts:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch contacts');
    }
  }
);

const getAllContactSlice = createSlice({
  name: 'contact',
  initialState: {
    contacts: { data: { formattedcontacts: [] } },
    loading: false,
    error: null,
  },
  reducers: {
    addContactToStore: (state, action) => {
      state.contacts.data.formattedcontacts.push(action.payload);
      console.log('New contact added to store:', action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log('Pending: Fetching contacts...');
      })
      .addCase(fetchAllContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
        console.log('Fulfilled: Contacts fetched:', action.payload.data.formattedcontacts);
      })
      .addCase(fetchAllContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load contacts';
        console.error('Rejected: Error fetching contacts:', action.payload);
      });
  },
});

export const { addContactToStore } = getAllContactSlice.actions;
export default getAllContactSlice.reducer;