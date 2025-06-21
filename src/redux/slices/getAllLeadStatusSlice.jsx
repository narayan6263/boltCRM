// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getAllLeadStatuses } from '../../api/GetLeadStatusById'; // ✅ External API function

// export const fetchLeadStatuses = createAsyncThunk(
//   'leadStatus/fetchLeadStatuses',
//   async (_, thunkAPI) => {
//     try {
//       const data = await getAllLeadStatuses();
//       console.log("✅ Thunk Received Data:", data);
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error?.response?.data?.message || error?.message || 'Something went wrong'
//       );
//     }
//   }
// );

// const getAllLeadStatusSlice = createSlice({
//   name: 'leadStatus',
//   initialState: {
//     statuses: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchLeadStatuses.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchLeadStatuses.fulfilled, (state, action) => {
//         state.statuses = action.payload;
//         state.loading = false;
//       })
//       .addCase(fetchLeadStatuses.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default getAllLeadStatusSlice.reducer;
// redux/slices/getAllStatusSlice.js
// slices/getAllLeadStatusSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllStatus } from '../../api/GetAllLeadStatusApi';

export const fetchAllLeadStatuses = createAsyncThunk(
  'leadStatus/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllStatus();
      return data; // { status: 'success', message: '...', data: { leadStatuses: [...] } }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const getAllStatusSlice = createSlice({
  name: 'leadStatus',
  initialState: {
    leadStatuses: [], // Changed from `data` to `leadStatuses` for clarity
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllLeadStatuses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllLeadStatuses.fulfilled, (state, action) => {
        state.loading = false;
        state.leadStatuses = action.payload.data.leadStatuses || []; // Extract leadStatuses
      })
      .addCase(fetchAllLeadStatuses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export default getAllStatusSlice.reducer;


