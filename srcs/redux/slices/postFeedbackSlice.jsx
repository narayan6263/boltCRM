// // import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// // import { postFeedbackApi } from '../../api/PostFeedbackApi';

// // export const postFeedback = createAsyncThunk(
// //   'feedback/postFeedback',
// //   async (feedbackData, { rejectWithValue }) => {
// //     try {
// //       return await postFeedbackApi(feedbackData);
// //     } catch (error) {
// //       // Ensure error message is passed to the state
// //       return rejectWithValue(error || 'Something went wrong');
// //     }
// //   }
// // );

// // const postFeedbackSlice = createSlice({
// //   name: 'postFeedback',
// //   initialState: {
// //     loading: false,
// //     data: null,
// //     error: null,
// //   },
// //   reducers: {
// //     resetFeedbackState: (state) => {
// //       state.loading = false;
// //       state.data = null;
// //       state.error = null;
// //     },
// //   },
// //   extraReducers: (builder) => {
// //     builder
// //       .addCase(postFeedback.pending, (state) => {
// //         state.loading = true;
// //         state.error = null;
// //       })
// //       .addCase(postFeedback.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.data = action.payload;
// //       })
// //       .addCase(postFeedback.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload || 'Something went wrong';
// //       });
// //   },
// // });

// // export const { resetFeedbackState } = postFeedbackSlice.actions;
// // export default postFeedbackSlice.reducer;

// // import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// // import { postFeedbackApi } from '../../api/PostFeedbackApi';

// // export const postFeedback = createAsyncThunk(
// //   'feedback/postFeedback',
// //   async (feedbackData, { rejectWithValue }) => {
// //     console.log('Dispatching postFeedback with:', JSON.stringify(feedbackData, null, 2));
// //     try {
// //       return await postFeedbackApi(feedbackData);
// //     } catch (error) {
// //       console.error('postFeedback error:', JSON.stringify(error, null, 2));
// //       return rejectWithValue(error || 'Something went wrong');
// //     }
// //   }
// // );

// // const postFeedbackSlice = createSlice({
// //   name: 'postFeedback',
// //   initialState: {
// //     loading: false,
// //     data: null,
// //     error: null,
// //   },
// //   reducers: {
// //     resetFeedbackState: (state) => {
// //       state.loading = false;
// //       state.data = null;
// //       state.error = null;
// //     },
// //   },
// //   extraReducers: (builder) => {
// //     builder
// //       .addCase(postFeedback.pending, (state) => {
// //         state.loading = true;
// //         state.error = null;
// //       })
// //       .addCase(postFeedback.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.data = action.payload;
// //       })
// //       .addCase(postFeedback.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload || 'Something went wrong';
// //       });
// //   },
// // });

// // export const { resetFeedbackState } = postFeedbackSlice.actions;
// // export default postFeedbackSlice.reducer;



// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { postFeedbackApi } from '../../api/PostFeedbackApi';

// export const postFeedback = createAsyncThunk(
//   'feedback/postFeedback',
//   async (feedbackData, { rejectWithValue }) => {
//     console.log('Dispatching postFeedback withokkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk:', JSON.stringify(feedbackData, null, 2));
//     try {
//       return await postFeedbackApi(feedbackData);
//     } catch (error) {
//       console.error('postFeedback error:', JSON.stringify(error, null, 2));
//       return rejectWithValue(error || 'Something went wrong');
//     }
//   }
// );

// const postFeedbackSlice = createSlice({
//   name: 'postFeedback',
//   initialState: {
//     loading: false,
//     data: null,
//     error: null,
//   },
//   reducers: {
//     resetFeedbackState: (state) => {
//       state.loading = false;
//       state.data = null;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(postFeedback.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(postFeedback.fulfilled, (state, action) => {
//         state.loading = false;
//         state.data = action.payload;
//       })
//       .addCase(postFeedback.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || 'Something went wrong';
//       });
//   },
// });

// export const { resetFeedbackState } = postFeedbackSlice.actions;
// export default postFeedbackSlice.reducer;


import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postFeedbackApi } from '../../api/PostFeedbackApi';

export const postFeedback = createAsyncThunk(
  'feedback/postFeedback',
  async (feedbackData, { rejectWithValue }) => {
    console.log('Dispatching postFeedback with:', JSON.stringify(feedbackData, null, 2));
    try {
      const response = await postFeedbackApi(feedbackData);
      console.log('postFeedback: Feedback submitted successfully', JSON.stringify(response, null, 2));
      return response;
    } catch (error) {
      console.error('postFeedback error:', JSON.stringify(error, null, 2));
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

const postFeedbackSlice = createSlice({
  name: 'postFeedback',
  initialState: {
    loading: false,
    data: null,
    error: null,
  },
  reducers: {
    resetFeedbackState: (state) => {
      state.loading = false;
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postFeedback.pending, (state) => {
        console.log('postFeedback: Pending');
        state.loading = true;
        state.error = null;
        state.data = null;
      })
      .addCase(postFeedback.fulfilled, (state, action) => {
        console.log('postFeedback: Fulfilled', action.payload);
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(postFeedback.rejected, (state, action) => {
        console.log('postFeedback: Rejected', action.payload);
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
        state.data = null;
      });
  },
});

export const { resetFeedbackState } = postFeedbackSlice.actions;
export default postFeedbackSlice.reducer;