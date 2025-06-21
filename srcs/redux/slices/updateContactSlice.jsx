// src/slices/updateContactSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateContactApi } from '../../api/UpdateContactApi'; // Adjusted path from '../../api/UpdateContactApi'

// Debug import
console.log('updateContactSlice: Imported updateContactApi', updateContactApi);

export const updateContact = createAsyncThunk(
  'updateContact/update',
  async ({ contactId, contactData }, { rejectWithValue }) => {
    try {
      console.log(`updateContactSlice: Updating contact for contactId ${contactId}`, contactData);
      if (!updateContactApi) {
        throw new Error('updateContactApi is not defined');
      }
      const response = await updateContactApi(contactId, contactData);
      console.log(`updateContactSlice: Update response for contactId ${contactId}`, response);
      return response;
    } catch (error) {
      console.error(`updateContactSlice: Error updating contact for contactId ${contactId}:`, error);
      return rejectWithValue(error.message || 'Failed to update contact');
    }
  }
);

const updateContactSlice = createSlice({
  name: 'updateContact',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetUpdateContactState: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateContact.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.data = null;
        console.log('updateContactSlice: Pending update for contact');
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        console.log('updateContactSlice: Contact updated successfully', action.payload);
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update contact';
        console.error('updateContactSlice: Update failed:', action.payload);
      });
  },
});

export const { resetUpdateContactState } = updateContactSlice.actions;
export default updateContactSlice.reducer;