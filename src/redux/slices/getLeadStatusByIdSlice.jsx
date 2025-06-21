import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getLeadStatusById } from '../../api/GetLeadStatusByIdApi';

const log = process.env.NODE_ENV === 'development' ? console.log : () => {};

export const fetchLeadStatusById = createAsyncThunk(
  'leadStatusById/fetch',
  async (id, { rejectWithValue }) => {
    try {
      log('Fetching lead status for ID:', id);
      if (typeof id !== 'string' || !id) {
        throw new Error('ID must be a non-empty string');
      }
      const response = await getLeadStatusById(id);
      log('API Response:', response);
      if (!response || typeof response !== 'object' || !response.data) {
        throw new Error('Invalid API response');
      }
      return response; // Return the full response
    } catch (error) {
      console.error('API Error:', error.message || error);
      return rejectWithValue(error.message || 'Failed to fetch lead status');
    }
  }
);

const getLeadStatusByIdSlice = createSlice({
  name: 'leadStatusById',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetLeadStatusById: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
      log('Reset: Lead status by ID state cleared');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeadStatusById.pending, (state) => {
        state.loading = true;
        state.error = null;
        log('Pending: Fetching lead status...');
      })
      .addCase(fetchLeadStatusById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Store the full API response
        log('Fulfilled: Lead status fetched:', action.payload.data?.isPriority);
      })
      .addCase(fetchLeadStatusById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch status by ID';
        log('Rejected: Error fetching lead status:', action.payload);
      });
  },
});

export const { resetLeadStatusById } = getLeadStatusByIdSlice.actions;
export default getLeadStatusByIdSlice.reducer;
// import { getLeadStatusById } from '../../api/GetLeadStatusByIdApi';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // Helper function to validate MongoDB ObjectID
// const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

// export const postFeedbackApi = async (feedbackData, retries = 3) => {
//   console.log('postFeedbackApi called with:', feedbackData);

//   if (!feedbackData?.leadId || !isValidObjectId(feedbackData.leadId)) {
//     throw new Error('Invalid or missing leadId');
//   }
//   if (!feedbackData?.status || !isValidObjectId(feedbackData.status)) {
//     throw new Error('Invalid or missing status');
//   }

//   const payload = {
//     leadId: feedbackData.leadId,
//     contactDate: feedbackData.contactDate || '',
//     nextFollowUpDate: feedbackData.nextFollowUpDate || '',
//     estimationDate: feedbackData.estimationDate || '',
//     estimationBudget: feedbackData.estimationBudget || 0,
//     priority: feedbackData.priority || '',
//     method: feedbackData.method || '',
//     status: feedbackData.status,
//     description: feedbackData.description || '',
//     dialUpMethod: {
//       phoneNumber: feedbackData.dialUpMethod?.phoneNumber || '',
//       callType: feedbackData.dialUpMethod?.callType || '',
//       callDuration: feedbackData.dialUpMethod?.callDuration || 0,
//       callStatus: feedbackData.dialUpMethod?.callStatus || '',
//       recordedFile: feedbackData.dialUpMethod?.recordedFile || '',
//       callSid: feedbackData.dialUpMethod?.callSid || '',
//       callStartTime: feedbackData.dialUpMethod?.callStartTime || '',
//       callEndTime: feedbackData.dialUpMethod?.callEndTime || '',
//     },
//   };

//   for (let attempt = 1; attempt <= retries; attempt++) {
//     try {
//       console.log(`Posting feedback (Attempt ${attempt})`);
//       const response = await apiClient.post('/lead/addFollowUp', payload);
//       console.log('✅ Feedback posted:', response.data);
//       return response.data;
//     } catch (error) {
//       console.error(`❌ Attempt ${attempt} failed:`, {
//         message: error.message,
//         response: error.response?.data,
//         status: error.response?.status,
//       });
//       if (attempt === retries) {
//         throw error.response?.data?.message || error.message || 'Feedback post failed';
//       }
//       await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1s before retry
//     }
//   }
// };