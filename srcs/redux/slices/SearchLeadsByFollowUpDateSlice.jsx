import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchLeadsByFollowUpDate } from '../../api/SearchLeadsByFollowUpDateApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchLeadsByFollowUpDate = createAsyncThunk(
  'searchLeadsByFollowUpDate/fetchAll',
  async ({ queryType, page = 1, pageSize = 10, isLoadMore = false }, { rejectWithValue, getState }) => {
    try {
      console.log(`SearchLeadsByFollowUpDateSlice: Fetching leads for queryType ${queryType}, page ${page}`);
      const response = await searchLeadsByFollowUpDate(queryType, page, pageSize);
      if (!response.data) {   
        throw new Error('Invalid API response: Missing data');
      }
      const { leads, totalLeads, currentPage, totalPages } = response.data;
      if (!Array.isArray(leads)) {
        throw new Error('Invalid API response: leads is not an array');
      }

      // Use current date for filtering
      const today = new Date().toISOString().split('T')[0];
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowISO = tomorrow.toISOString().split('T')[0];

      let filteredLeads = leads;
      if (queryType === 'today') {
        filteredLeads = leads.filter(lead => lead.nextFollowUpDate?.split('T')[0] === today);
      } else if (queryType === 'tomorrow') {
        filteredLeads = leads.filter(lead => lead.nextFollowUpDate?.split('T')[0] === tomorrowISO);
      } else if (queryType === 'pending') {
        filteredLeads = leads.filter(
          lead => !lead.nextFollowUpDate || 
            (lead.nextFollowUpDate?.split('T')[0] !== today && lead.nextFollowUpDate?.split('T')[0] !== tomorrowISO)
        );
      }

      const existingLeads = isLoadMore ? getState().searchLeadsByFollowUpDate.leads : [];
      return {
        leads: isLoadMore ? [...existingLeads, ...filteredLeads] : filteredLeads,
        totalLeads,
        currentPage,
        totalPages,
      };
    } catch (error) {
      console.error(`SearchLeadsByFollowUpDateSlice: API Error for queryType ${queryType}:`, error);
      return rejectWithValue(error.message || 'Failed to fetch leads by follow-up date');
    }
  }
);

const searchLeadsByFollowUpDateSlice = createSlice({
  name: 'searchLeadsByFollowUpDate',
  initialState: {
    leads: [],
    totalLeads: 0,
    currentPage: 1,
    totalPages: 1,
    loading: false,
    error: null,
  },
  reducers: {
    resetSearchLeadsState: (state) => {
      state.leads = [];
      state.totalLeads = 0;
      state.currentPage = 1;
      state.totalPages = 1;
      state.loading = false;
      state.error = null;
      AsyncStorage.removeItem('cachedSearchLeads').catch((err) =>
        console.error('SearchLeadsByFollowUpDateSlice: Error clearing cached leads:', err)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeadsByFollowUpDate.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log('SearchLeadsByFollowUpDateSlice: Pending fetch for queryType');
      })
      .addCase(fetchLeadsByFollowUpDate.fulfilled, (state, action) => {
        state.loading = false;
        state.leads = action.payload.leads;
        state.totalLeads = action.payload.totalLeads;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        AsyncStorage.setItem('cachedSearchLeads', JSON.stringify(state.leads)).catch((err) =>
          console.error('SearchLeadsByFollowUpDateSlice: Error caching leads:', err)
        );
        console.log('SearchLeadsByFollowUpDateSlice: Leads fetched', {
          totalLeads: state.totalLeads,
          leadsCount: state.leads.length,
        });
      })
      .addCase(fetchLeadsByFollowUpDate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
        console.error('SearchLeadsByFollowUpDateSlice: Fetch failed:', {
          error: action.payload,
          state: state,
        });
      });
  },
});

export const { resetSearchLeadsState } = searchLeadsByFollowUpDateSlice.actions;
export default searchLeadsByFollowUpDateSlice.reducer;