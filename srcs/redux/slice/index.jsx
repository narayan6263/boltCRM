import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';

// Import API service (assuming it consolidates all API calls)
import apiService from '../../api/apiService';

// Thunks for API interactions
export const createDialLead = createAsyncThunk(
  'dialLead/createLead',
  async (formData, { rejectWithValue }) => {
    try {
      const data = await apiService.addLeadDial(formData);
      return data;
    } catch (error) {
      const errorMessage =
        error.response?.status === 409
          ? 'Contact with this email or phone already exists.'
          : error.response?.data?.message || error.message || 'Failed to add dial lead';
      return rejectWithValue(errorMessage);
    }
  }
);

export const addLead = createAsyncThunk(
  'addLead/createLead',
  async (formData, { rejectWithValue }) => {
    try {
      const data = await apiService.addLead(formData);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const assignLeads = createAsyncThunk(
  'bulkAssignLeads/assign',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await apiService.bulkAssignLeads(payload);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

export const uploadEmployeeImageThunk = createAsyncThunk(
  'employeeImage/upload',
  async ({ employeeId, image, fieldName }, { rejectWithValue }) => {
    try {
      const data = await apiService.uploadEmployeeImage(employeeId, image, fieldName);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to upload employee image');
    }
  }
);

export const fetchAllBranches = createAsyncThunk(
  'activeBranches/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const branches = await apiService.getActiveBranches();
      return branches;
    } catch (error) {
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

export const fetchAllEmployees = createAsyncThunk(
  'activeEmployees/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const employees = await apiService.getActiveEmployees();
      return employees;
    } catch (error) {
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

export const fetchAllSources = createAsyncThunk(
  'activeSource/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const sources = await apiService.getActiveSources();
      return sources;
    } catch (error) {
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

export const fetchActiveStatuses = createAsyncThunk(
  'activeStatuses/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const statuses = await apiService.getActiveStatuses();
      return statuses;
    } catch (error) {
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

export const fetchAllBranchesAll = createAsyncThunk(
  'branches/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const branches = await apiService.getAllBranch();
      return branches;
    } catch (error) {
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

export const fetchAllContacts = createAsyncThunk(
  'contact/fetchAllContacts',
  async (_, { rejectWithValue }) => {
    try {
      const data = await apiService.getAllContacts();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchAllEmployeesAll = createAsyncThunk(
  'employees/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await apiService.getAllEmployees();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchAllLeads = createAsyncThunk(
  'leads/fetchAll',
  async ({ filters = {}, page = 1, refresh = false, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await apiService.getAllLeads(filters, page, limit);
      return { ...response.data, refresh };
    } catch (error) {
      return rejectWithValue(error || 'Failed to fetch leads');
    }
  }
);

export const fetchAllLeadStatuses = createAsyncThunk(
  'leadStatus/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await apiService.getAllStatus();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchSearchContacts = createAsyncThunk(
  'searchContact/fetchSearchContacts',
  async (searchTerm, { rejectWithValue }) => {
    try {
      const data = await apiService.getAllSearchContact(searchTerm);
      return data.data.contacts;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch search contacts');
    }
  }
);

export const fetchCallHistory = createAsyncThunk(
  'callHistory/fetch',
  async ({ employeeId, page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const data = await apiService.getCallHistory(employeeId, page, limit);
      if (!Array.isArray(data.data)) {
        throw new Error('Invalid API response: data is not an array');
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch call history');
    }
  }
);

export const getDecryptInfo = createAsyncThunk(
  'decryptInfo/fetchDecryptInfo',
  async (contactId, { rejectWithValue }) => {
    try {
      const data = await apiService.fetchDecryptInfo(contactId);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch decrypt info');
    }
  }
);

export const fetchDialReport = createAsyncThunk(
  'dialReport/fetch',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await apiService.getDialReport(payload);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

export const fetchDynamicSourceCounts = createAsyncThunk(
  'dynamicSourceCounts/fetchDynamicSourceCounts',
  async (_, { rejectWithValue }) => {
    try {
      const orgId = await AsyncStorage.getItem('orgId');
      if (!orgId) {
        return rejectWithValue('Organization UUID not found in storage');
      }
      const data = await apiService.getDynamicSourceCounts();
      if (data.error) {
        return rejectWithValue(data.error);
      }
      return data.data.sourceDetails;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to load dynamic source counts');
    }
  }
);

export const fetchDynamicStatusCounts = createAsyncThunk(
  'dynamicStatus/fetchDynamicStatusCounts',
  async (_, { rejectWithValue }) => {
    try {
      const orgId = await AsyncStorage.getItem('orgId');
      if (!orgId) {
        return rejectWithValue('Organization UUID not found in storage');
      }
      const data = await apiService.getDynamicStatusCounts();
      if (data.error) {
        return rejectWithValue(data.error);
      }
      return data.data.statusDetails;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to load dynamic status counts');
    }
  }
);

export const fetchEmployeeById = createAsyncThunk(
  'employee/fetchEmployeeById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiService.getEmployeeById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error || 'Failed to fetch employee');
    }
  }
);

export const fetchLeadActivity = createAsyncThunk(
  'leadActivity/fetch',
  async (leadId, { rejectWithValue }) => {
    try {
      const data = await apiService.getLeadActivity(leadId);
      if (!Array.isArray(data)) {
        throw new Error('Expected an array of lead activity data');
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch lead activity');
    }
  }
);

export const fetchLeadById = createAsyncThunk(
  'lead/fetchLeadById',
  async (leadId, { rejectWithValue }, options = {}) => {
    try {
      if (!leadId || !/^[0-9a-fA-F]{24}$/.test(leadId)) {
        throw new Error('Invalid or missing leadId');
      }
      const response = await apiService.getLeadById(leadId, options);
      return response;
    } catch (error) {
      const errorPayload = {
        message: error.message || 'Failed to fetch lead',
        status: error.response?.status || 'error',
        data: error.response?.data || {},
      };
      return rejectWithValue(errorPayload);
    }
  }
);

export const fetchLeadFollowUps = createAsyncThunk(
  'followUps/fetchAll',
  async (leadId, { rejectWithValue }) => {
    try {
      const response = await apiService.getLeadFollowUps(leadId);
      if (!response.data) {
        throw new Error('Invalid API response: Missing data');
      }
      const { followUps, totalFollowUps } = response.data;
      if (!Array.isArray(followUps)) {
        throw new Error('Invalid API response: followUps is not an array');
      }
      return {
        followUps,
        totalFollowUps: Number(totalFollowUps) || 0,
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch follow ups');
    }
  }
);

export const fetchLeadStatusById = createAsyncThunk(
  'leadStatusById/fetch',
  async (id, { rejectWithValue }) => {
    try {
      if (typeof id !== 'string' || !id) {
        throw new Error('ID must be a non-empty string');
      }
      const response = await apiService.getLeadStatusById(id);
      if (!response || typeof response !== 'object' || !response.data) {
        throw new Error('Invalid API response');
      }
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch lead status');
    }
  }
);

export const fetchMainDashboardCards = createAsyncThunk(
  'dashboard/fetchMainDashboardCards',
  async (_, { rejectWithValue }) => {
    try {
      const data = await apiService.getMainDashboard();
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchPerformanceReport = createAsyncThunk(
  'performanceReport/fetch',
  async ({ search, dateFilter, startDate, endDate } = {}, { rejectWithValue }) => {
    try {
      const data = await apiService.getPerformanceReport({ search, dateFilter, startDate, endDate });
      if (!Array.isArray(data)) {
        throw new Error('Expected an array of performance data');
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch performance report');
    }
  }
);

export const userLogin = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await apiService.logInUser(email, password);
      const { 
        token,
        permissions,
        data: { categoryId, _id: systemUserId, linkSystemUser },
      } = response;

      const orgId = linkSystemUser?.[0]?.organizationId || null;
      const organizationName = linkSystemUser?.[0]?.organizationName || null;
      const empId = linkSystemUser?.[0]?.employeeId || null;

      if (!orgId) {
        throw new Error('Organization UUID not found in API response');
      }

      const expiresAt =
        response.expiresAt || Date.now() + (response.expiresIn ? response.expiresIn * 1000 : 24 * 60 * 60 * 1000);

      await AsyncStorage.setItem('authToken', token);
      await AsyncStorage.setItem('tokenExpiresAt', expiresAt.toString());
      await AsyncStorage.setItem('permissionList', JSON.stringify(permissions));
      await AsyncStorage.setItem('categoryId', categoryId);
      await AsyncStorage.setItem('orgId', orgId);
      await AsyncStorage.setItem('organizationName', organizationName);
      await AsyncStorage.setItem('systemUserId', systemUserId);
      await AsyncStorage.setItem('empId', empId);

      return { ...response, expiresAt };
    } catch (error) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

export const userLogout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.logOutUser();
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Logout failed');
    }
  }
);

export const postFeedback = createAsyncThunk(
  'feedback/postFeedback',
  async (feedbackData, { rejectWithValue }) => {
    try {
      const response = await apiService.postFeedback(feedbackData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

export const updateContact = createAsyncThunk(
  'updateContact/update',
  async ({ contactId, contactData }, { rejectWithValue }) => {
    try {
      const response = await apiService.updateContact(contactId, contactData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update contact');
    }
  }
);

export const updateLeadAsync = createAsyncThunk(
  'lead/updateLead',
  async ({ leadId, leadData, postUpdatedLead }, { rejectWithValue }) => {
    try {
      const updatedLead = await apiService.updateLead(leadId, leadData, postUpdatedLead);
      return updatedLead;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update lead');
    }
  }
);

export const fetchLeadsByFollowUpDate = createAsyncThunk(
  'searchLeadsByFollowUpDate/fetchAll',
  async ({ queryType, page = 1, pageSize = 10, isLoadMore = false }, { rejectWithValue, getState }) => {
    try {
      const response = await apiService.searchLeadsByFollowUpDate(queryType, page, pageSize);
      if (!response.data) {
        throw new Error('Invalid API response: Missing data');
      }
      const { leads, totalLeads, currentPage, totalPages } = response.data;
      if (!Array.isArray(leads)) {
        throw new Error('Invalid API response: leads is not an array');
      }

      const today = new Date().toISOString().split('T')[0];
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowISO = tomorrow.toISOString().split('T')[0];

      let filteredLeads = leads;
      if (queryType === 'today') {
        filteredLeads = leads.filter((lead) => lead.nextFollowUpDate?.split('T')[0] === today);
      } else if (queryType === 'tomorrow') {
        filteredLeads = leads.filter((lead) => lead.nextFollowUpDate?.split('T')[0] === tomorrowISO);
      } else if (queryType === 'pending') {
        filteredLeads = leads.filter(
          (lead) =>
            !lead.nextFollowUpDate ||
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
      return rejectWithValue(error.message || 'Failed to fetch leads by follow-up date');
    }
  }
);

export const fetchContactById = createAsyncThunk(
  'contactById/fetchContactById',
  async (contactId, { rejectWithValue }) => {
    try {
      if (!contactId || typeof contactId !== 'string') {
        throw new Error('Invalid or missing contactId');
      }
      const response = await apiService.getContactById(contactId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch contact');
    }
  }
);

// Slices
const dialLeadSlice = createSlice({
  name: 'dialLead',
  initialState: {
    loading: false,
    success: false,
    error: null,
    lead: null,
    callStatus: null,
    callLogId: null,
  },
  reducers: {
    resetDialLeadState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.lead = null;
      state.callStatus = null;
      state.callLogId = null;
    },
    setCallStatus: (state, action) => {
      state.callStatus = action.payload;
    },
    setCallLogId: (state, action) => {
      state.callLogId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDialLead.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.callStatus = 'Initiating';
      })
      .addCase(createDialLead.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.lead = action.payload;
        state.callStatus = action.payload?.dialUpMethod?.callStatus || 'Completed';
        state.callLogId = action.payload?.dialUpMethod?.callSid || null;
      })
      .addCase(createDialLead.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.callStatus = 'Failed';
        state.callLogId = null;
      });
  },
});

const addLeadSlice = createSlice({
  name: 'addLead',
  initialState: {
    loading: false, // Fixed typo from 'addLead'
    success: false,
    error: null,
    lead: null,
  },
  reducers: {
    resetAddLeadState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.lead = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addLead.pending, (state) => {
        state.loading = true;
        state.success = false; // Fixed typo
        state.error = null;
      })
      .addCase(addLead.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.lead = action.payload;
      })
      .addCase(addLead.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

const bulkAssignLeadsSlice = createSlice({
  name: 'bulkAssignLeads',
  initialState: {
    assignedLeads: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetAssignState: (state) => {
      state.assignedLeads = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(assignLeads.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(assignLeads.fulfilled, (state, action) => {
        state.loading = false;
        state.assignedLeads = action.payload;
        state.success = true;
      })
      .addCase(assignLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to assign leads';
        state.success = false;
      });
  },
});

const employeeImageSlice = createSlice({
  name: 'employeeImage',
  initialState: {
    photoUrl: null,
    uploading: false,
    error: null,
  },
  reducers: {
    clearImageState: (state) => {
      state.photoUrl = null;
      state.uploading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadEmployeeImageThunk.pending, (state) => {
        state.uploading = true;
        state.error = null;
      })
      .addCase(uploadEmployeeImageThunk.fulfilled, (state, action) => {
        state.uploading = false;
        state.photoUrl = action.payload.photoUrl || null;
      })
      .addCase(uploadEmployeeImageThunk.rejected, (state, action) => {
        state.uploading = false;
        state.error = action.payload || 'Failed to upload employee image';
      });
  },
});

const getActiveBranchesSlice = createSlice({
  name: 'activeBranches',
  initialState: {
    activeBranches: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBranches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBranches.fulfilled, (state, action) => {
        state.loading = false;
        state.activeBranches = action.payload;
      })
      .addCase(fetchAllBranches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch branches';
      });
  },
});

const getActiveEmployeesSlice = createSlice({
  name: 'activeEmployees',
  initialState: {
    activeEmployees: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.activeEmployees = action.payload;
      })
      .addCase(fetchAllEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch employees';
      });
  },
});

const getActiveSourceSlice = createSlice({
  name: 'activeSource',
  initialState: {
    activeSource: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSources.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSources.fulfilled, (state, action) => {
        state.loading = false;
        state.activeSource = action.payload;
      })
      .addCase(fetchAllSources.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch sources';
      });
  },
});

const getActiveStatusSlice = createSlice({
  name: 'activeStatuses',
  initialState: {
    statuses: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActiveStatuses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActiveStatuses.fulfilled, (state, action) => {
        state.loading = false;
        state.statuses = action.payload;
      })
      .addCase(fetchActiveStatuses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch statuses';
      });
  },
});

const getAllBranchSlice = createSlice({
  name: 'branches',
  initialState: {
    branches: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBranchesAll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBranchesAll.fulfilled, (state, action) => {
        state.loading = false;
        state.branches = action.payload;
      })
      .addCase(fetchAllBranchesAll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch branches';
      });
  },
});

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
    },
  },
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

const getAllEmployeesSlice = createSlice({
  name: 'employees',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllEmployeesAll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllEmployeesAll.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAllEmployeesAll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

const getAllLeadsSlice = createSlice({
  name: 'leads',
  initialState: {
    allLeads: {
      formattedLeads: [],
      totalPages: 1,
      currentPage: 1,
      totalLeads: 0,
      hasMore: false,
      loading: false,
      error: null,
    },
    myLeads: {
      formattedLeads: [],
      totalPages: 1,
      currentPage: 1,
      totalLeads: 0,
      hasMore: false,
      loading: false,
      error: null,
    },
  },
  reducers: {
    resetLeadsState: (state) => {
      state.allLeads = {
        formattedLeads: [],
        totalPages: 1,
        currentPage: 1,
        totalLeads: 0,
        hasMore: false,
        loading: false,
        error: null,
      };
      state.myLeads = {
        formattedLeads: [],
        totalPages: 1,
        currentPage: 1,
        totalLeads: 0,
        hasMore: false,
        loading: false,
        error: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllLeads.pending, (state, action) => {
        const isMyLeads = action.meta.arg.filters?.assignedTo;
        const target = isMyLeads ? state.myLeads : state.allLeads;
        target.loading = true;
        target.error = null;
      })
      .addCase(fetchAllLeads.fulfilled, (state, action) => {
        const isMyLeads = action.meta.arg.filters?.assignedTo;
        const target = isMyLeads ? state.myLeads : state.allLeads;
        target.loading = false;
        target.totalPages = action.payload.totalPages;
        target.currentPage = action.payload.currentPage;
        target.totalLeads = action.payload.totalLeads;
        target.hasMore = action.payload.hasMore;
        if (action.payload.refresh) {
          target.formattedLeads = action.payload.formattedLeads;
        } else {
          target.formattedLeads = [...target.formattedLeads, ...action.payload.formattedLeads];
        }
      })
      .addCase(fetchAllLeads.rejected, (state, action) => {
        const isMyLeads = action.meta.arg.filters?.assignedTo;
        const target = isMyLeads ? state.myLeads : state.allLeads;
        target.loading = false;
        target.error = action.payload || 'Failed to fetch leads';
      });
  },
});

const getAllStatusSlice = createSlice({
  name: 'leadStatus',
  initialState: {
    leadStatuses: [],
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
        state.leadStatuses = action.payload.data.leadStatuses || [];
      })
      .addCase(fetchAllLeadStatuses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

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

const callHistorySlice = createSlice({
  name: 'callHistory',
  initialState: {
    callHistory: [],
    currentPage: 1,
    totalPages: 1,
    totalRecords: 0,
    loading: false,
    error: null,
  },
  reducers: {
    resetCallHistory: (state) => {
      state.callHistory = [];
      state.currentPage = 1;
      state.totalPages = 1;
      state.totalRecords = 0;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCallHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCallHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.callHistory = action.payload.data;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.totalRecords = action.payload.totalRecords;
      })
      .addCase(fetchCallHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch call history';
      });
  },
});

const getDecryptInfoSlice = createSlice({
  name: 'decryptInfo',
  initialState: {
    data: null,
    status: 'idle',
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

const dialReportSlice = createSlice({
  name: 'dialReport',
  initialState: {
    cardData: null,
    tableData: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetDialReportState: (state) => {
      state.cardData = null;
      state.tableData = [];
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDialReport.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchDialReport.fulfilled, (state, action) => {
        state.loading = false;
        state.cardData = action.payload.cardData;
        state.tableData = action.payload.tableData;
        state.success = true;
      })
      .addCase(fetchDialReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch dial report';
        state.success = false;
      });
  },
});

const getDynamicSourceCountsSlice = createSlice({
  name: 'dynamicSourceCounts',
  initialState: {
    sourceDetails: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDynamicSourceCounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDynamicSourceCounts.fulfilled, (state, action) => {
        state.loading = false;
        state.sourceDetails = action.payload;
      })
      .addCase(fetchDynamicSourceCounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const getDynamicStatusCountsSlice = createSlice({
  name: 'dynamicStatus',
  initialState: {
    statusCounts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDynamicStatusCounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDynamicStatusCounts.fulfilled, (state, action) => {
        state.loading = false;
        state.statusCounts = action.payload;
      })
      .addCase(fetchDynamicStatusCounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    employee: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearEmployee: (state) => {
      state.employee = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployeeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployeeById.fulfilled, (state, action) => {
        state.loading = false;
        state.employee = action.payload;
      })
      .addCase(fetchEmployeeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const leadActivitySlice = createSlice({
  name: 'leadActivity',
  initialState: {
    leadActivities: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeadActivity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeadActivity.fulfilled, (state, action) => {
        state.loading = false;
        state.leadActivities = action.payload;
      })
      .addCase(fetchLeadActivity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch lead activity';
      });
  },
});

const getLeadByIdSlice = createSlice({
  name: 'getLeadById',
  initialState: {
    lead: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetLeadByIdState: (state) => {
      state.lead = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeadById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.lead = null;
      })
      .addCase(fetchLeadById.fulfilled, (state, action) => {
        state.loading = false;
        state.lead = action.payload;
        if (!action.payload?.data?.status) {
          state.lead.data = { ...action.payload.data, status: 'unknown' };
        }
      })
      .addCase(fetchLeadById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const getLeadFollowUpsSlice = createSlice({
  name: 'followUps',
  initialState: {
    followUps: [],
    totalFollowUps: 0,
    loading: false,
    error: null,
  },
  reducers: {
    resetFollowUpsState: (state) => {
      state.followUps = [];
      state.totalFollowUps = 0;
      state.loading = false;
      state.error = null;
      AsyncStorage.removeItem('cachedFollowUps').catch(() => {});
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeadFollowUps.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeadFollowUps.fulfilled, (state, action) => {
        state.loading = false;
        state.followUps = action.payload.followUps;
        state.totalFollowUps = action.payload.totalFollowUps;
        AsyncStorage.setItem('cachedFollowUps', JSON.stringify(state.followUps)).catch(() => {});
      })
      .addCase(fetchLeadFollowUps.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeadStatusById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeadStatusById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchLeadStatusById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch status by ID';
      });
  },
});

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
      thisMonthTotalDialUp: 0,
    },
    loading: false,
    error: null,
    dataLoaded: false,
  },
  reducers: {
    resetDashboardDataLoaded: (state) => {
      state.dataLoaded = false;
      state.dashboardData = getMainDashboardSlice.getInitialState().dashboardData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMainDashboardCards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMainDashboardCards.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboardData = action.payload;
        state.dataLoaded = true;
      })
      .addCase(fetchMainDashboardCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load dashboard data';
        state.dataLoaded = false;
      });
  },
});

const performanceReportSlice = createSlice({
  name: 'performanceReport',
  initialState: {
    performanceReport: [],
    loading: false, // Fixed from null
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPerformanceReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPerformanceReport.fulfilled, (state, action) => {
        state.loading = false;
        state.performanceReport = action.payload;
      })
      .addCase(fetchPerformanceReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch performance report';
      });
  },
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    orgId: null,
    expiresAt: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearAuthState: (state) => {
      state.user = null;
      state.token = null;
      state.orgId = null;
      state.expiresAt = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.token = action.payload.token;
        state.orgId = action.payload.data.linkSystemUser?.[0]?.organizationId || null;
        state.expiresAt = action.payload.expiresAt;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(userLogout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.orgId = null;
        state.expiresAt = null;
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Logout failed';
      });
  },
});

// Persist configuration for auth slice
const persistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['token', 'orgId', 'user', 'expiresAt'],
};

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
        state.loading = true;
        state.error = null;
        state.data = null;
      })
      .addCase(postFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(postFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
        state.data = null;
      });
  },
});

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
      AsyncStorage.removeItem('cachedSearchLeads').catch(() => {});
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeadsByFollowUpDate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeadsByFollowUpDate.fulfilled, (state, action) => {
        state.loading = false;
        state.leads = action.payload.leads;
        state.totalLeads = action.payload.totalLeads;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        AsyncStorage.setItem('cachedSearchLeads', JSON.stringify(state.leads)).catch(() => {});
      })
      .addCase(fetchLeadsByFollowUpDate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

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
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update contact';
      });
  },
});

const updateLeadSlice = createSlice({
  name: 'lead/updateLead',
  initialState: {
    lead: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetUpdateLeadState: (state) => {
      state.lead = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateLeadAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateLeadAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.lead = action.payload;
      })
      .addCase(updateLeadAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update lead';
      });
  },
});

const contactByIdSlice = createSlice({
  name: 'contactById',
  initialState: {
    contact: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetContactByIdState: (state) => {
      state.contact = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContactById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.contact = null;
      })
      .addCase(fetchContactById.fulfilled, (state, action) => {
        state.loading = false;
        state.contact = action.payload;
      })
      .addCase(fetchContactById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const { resetDialLeadState, setCallStatus, setCallLogId } = dialLeadSlice.actions;
export const { resetAddLeadState } = addLeadSlice.actions;
export const { resetAssignState } = bulkAssignLeadsSlice.actions;
export const { clearImageState } = employeeImageSlice.actions;
export const { addContactToStore } = getAllContactSlice.actions;
export const { resetLeadsState } = getAllLeadsSlice.actions;
export const { clearSearchContacts } = searchContactSlice.actions;
export const { resetCallHistory } = callHistorySlice.actions;
export const { resetDecryptInfo } = getDecryptInfoSlice.actions;
export const { resetDialReportState } = dialReportSlice.actions;
export const { clearEmployee } = employeeSlice.actions;
export const { resetLeadByIdState } = getLeadByIdSlice.actions;
export const { resetFollowUpsState } = getLeadFollowUpsSlice.actions;
export const { resetLeadStatusById } = getLeadStatusByIdSlice.actions;
export const { clearAuthState } = authSlice.actions;
export const { resetFeedbackState } = postFeedbackSlice.actions;
export const { resetSearchLeadsState } = searchLeadsByFollowUpDateSlice.actions;
export const { resetUpdateContactState } = updateContactSlice.actions;
export const { resetUpdateLeadState } = updateLeadSlice.actions;
export const { resetContactByIdState } = contactByIdSlice.actions;
export const { resetDashboardDataLoaded } = getMainDashboardSlice.actions;

// Export reducers
export const reducers = {
  dialLead: dialLeadSlice.reducer,
  addLead: addLeadSlice.reducer,
  bulkAssignLeads: bulkAssignLeadsSlice.reducer,
  employeeImage: employeeImageSlice.reducer,
  activeBranches: getActiveBranchesSlice.reducer,
  activeEmployees: getActiveEmployeesSlice.reducer,
  activeSource: getActiveSourceSlice.reducer,
  activeStatuses: getActiveStatusSlice.reducer,
  branches: getAllBranchSlice.reducer,
  contact: getAllContactSlice.reducer,
  employees: getAllEmployeesSlice.reducer,
  leads: getAllLeadsSlice.reducer,
  leadStatus: getAllStatusSlice.reducer,
  searchContact: searchContactSlice.reducer,
  callHistory: callHistorySlice.reducer,
  decryptInfo: getDecryptInfoSlice.reducer,
  dialReport: dialReportSlice.reducer,
  dynamicSourceCounts: getDynamicSourceCountsSlice.reducer,
  dynamicStatus: getDynamicStatusCountsSlice.reducer,
  employee: employeeSlice.reducer,
  leadActivity: leadActivitySlice.reducer,
  getLeadById: getLeadByIdSlice.reducer,
  followUps: getLeadFollowUpsSlice.reducer,
  leadStatusById: getLeadStatusByIdSlice.reducer,
  dashboard: getMainDashboardSlice.reducer,
  performanceReport: performanceReportSlice.reducer,
  auth: persistReducer(persistConfig, authSlice.reducer),
  postFeedback: postFeedbackSlice.reducer,
  searchLeadsByFollowUpDate: searchLeadsByFollowUpDateSlice.reducer,
  updateContact: updateContactSlice.reducer,
  updateLead: updateLeadSlice.reducer,
  contactById: contactByIdSlice.reducer,
};