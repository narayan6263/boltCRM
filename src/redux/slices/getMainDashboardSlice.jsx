import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMainDashboard } from '../../api/GetMainDashboardApi';

export const fetchMainDashboardCards = createAsyncThunk(
  'dashboard/fetchMainDashboardCards',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getMainDashboard();
      return data.data; // Extract the 'data' object from the response
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const getMainDashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    dashboardData: {
      todayFollowups: 0,
      tomorrowFollowups: 0,
      pendingFollowups: 0,
      totalLeads: 0,
      thisMonthLeads: 0,
      totalFreshLeads: 0,
      thisMonthFreshLeads: 0,
      expectedIncome: { count: 0, totalBudget: 0 },
      totalAbm: 0,
      thisMonthAbm: 0,
      totalAbe: 0,
      thisMonthAbe: 0,
      totalDialUp: 0,
      thisMonthtotalDialUp: 0,
    },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMainDashboardCards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMainDashboardCards.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboardData = action.payload;
      })
      .addCase(fetchMainDashboardCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load dashboard data';
      });
  },
});

export default getMainDashboardSlice.reducer;