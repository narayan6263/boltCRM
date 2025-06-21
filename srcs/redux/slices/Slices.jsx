// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { addLeadDial } from '../../api/addLeadDial'; // Changed from `addLead as addLeadAPI`

// export const createDialLead = createAsyncThunk(
//   'dialLead/createLead',
//   async (formData, { rejectWithValue }) => {
//     try {
//       const data = await addLeadDial(formData); // Use addLeadDial directly
//       return data;
//     } catch (error) {
//       const errorMessage = error.response?.status === 409
//         ? 'Contact with this email or phone already exists.'
//         : error.response?.data?.message || error.message || 'Failed to add dial lead';
//       return rejectWithValue(errorMessage);
//     }
//   }
// );

// // Rest of the slice remains unchanged
// const dialLeadSlice = createSlice({
//   name: 'dialLead',
//   initialState: {
//     loading: false,
//     success: false,
//     error: null,
//     lead: null,
//     callStatus: null,
//     callLogId: null,
//   },
//   reducers: {
//     resetDialLeadState: (state) => {
//       state.loading = false;
//       state.success = false;
//       state.error = null;
//       state.lead = null;
//       state.callStatus = null;
//       state.callLogId = null;
//     },
//     setCallStatus: (state, action) => {
//       state.callStatus = action.payload;
//     },
//     setCallLogId: (state, action) => {
//       state.callLogId = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(createDialLead.pending, (state) => {
//         state.loading = true;
//         state.success = false;
//         state.error = null;
//         state.callStatus = 'Initiating';
//       })
//       .addCase(createDialLead.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;
//         state.lead = action.payload;
//         state.callStatus = action.payload?.dialUpMethod?.callStatus || 'Completed';
//         state.callLogId = action.payload?.dialUpMethod?.callSid || null;
//       })
//       .addCase(createDialLead.rejected, (state, action) => {
//         state.loading = false;
//         state.success = false;
//         state.error = action.payload;
//         state.callStatus = 'Failed';
//         state.callLogId = null;
//       });
//   },
// });

// export const { resetDialLeadState, setCallStatus, setCallLogId } = dialLeadSlice.actions;
// export default dialLeadSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { addLead as addLeadAPI } from '../../api/AddLead';

// export const addLead = createAsyncThunk(
//   'addLead/createLead',
//   async (formData, { rejectWithValue }) => {
//     try {
//       const data = await addLeadAPI(formData);
//       return data;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// const addLeadSlice = createSlice({
//   name: 'addLead',
//   initialState: {
//     loading: false,
//     success: false,
//     error: null,
//     lead: null,
//   },
//   reducers: {
//     resetAddLeadState: (state) => {
//       state.loading = false;
//       state.success = false;
//       state.error = null;
//       state.lead = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(addLead.pending, (state) => {
//         state.loading = true;
//         state.success = false;
//         state.error = null;
//       })
//       .addCase(addLead.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;
//         state.lead = action.payload;
//       })
//       .addCase(addLead.rejected, (state, action) => {
//         state.loading = false;
//         state.success = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { resetAddLeadState } = addLeadSlice.actions;
// export default addLeadSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { bulkAssignLeads } from '../../api/BulkAssignLeadsApi';

// export const assignLeads = createAsyncThunk(
//   'bulkAssignLeads/assign',
//   async (payload, thunkAPI) => {
//     try {
//       console.log('Assigning leads with payload:', payload);
//       const response = await bulkAssignLeads(payload);
//       console.log('Leads assigned successfully:', response);
//       return response;
//     } catch (error) {
//       console.error('Error assigning leads:', {
//         message: error.message,
//         stack: error.stack,
//       });
//       return thunkAPI.rejectWithValue(error.message || 'Something went wrong');
//     }
//   }
// );

// const bulkAssignLeadsSlice = createSlice({
//   name: 'bulkAssignLeads',
//   initialState: {
//     assignedLeads: null,
//     loading: false,
//     error: null,
//     success: false,
//   },
//   reducers: {
//     resetAssignState: (state) => {
//       state.assignedLeads = null;
//       state.loading = false;
//       state.error = null;
//       state.success = false;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(assignLeads.pending, (state) => {
//         console.log('assignLeads pending');
//         state.loading = true;
//         state.error = null;
//         state.success = false;
//       })
//       .addCase(assignLeads.fulfilled, (state, action) => {
//         console.log('assignLeads fulfilled:', action.payload);
//         state.loading = false;
//         state.assignedLeads = action.payload;
//         state.success = true;
//       })
//       .addCase(assignLeads.rejected, (state, action) => {
//         console.log('assignLeads rejected:', action.payload);
//         state.loading = false;
//         state.error = action.payload || 'Failed to assign leads';
//         state.success = false;
//       });
//   },
// });

// export const { resetAssignState } = bulkAssignLeadsSlice.actions;
// export default bulkAssignLeadsSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { uploadEmployeeImage } from '../../api/EmployeeImageUpload';

// // Thunk to handle asynchronous image upload
// export const uploadEmployeeImageThunk = createAsyncThunk(
//   'employeeImage/upload',
//   async ({ employeeId, image, fieldName }, thunkAPI) => {
//     try {
//       const data = await uploadEmployeeImage(employeeId, image, fieldName);
//       console.log('✅ Thunk Received Image Upload Data:', data);
//       return data;
//     } catch (error) {
//       console.error('❌ Thunk Image Upload Error:', {
//         message: error.message,
//         employeeId,
//       });
//       return thunkAPI.rejectWithValue(error.message || 'Failed to upload employee image');
//     }
//   }
// );

// const employeeImageSlice = createSlice({
//   name: 'employeeImage',
//   initialState: {
//     photoUrl: null,
//     uploading: false,
//     error: null,
//   },
//   reducers: {
//     // Clear image state if needed (e.g., on logout)
//     clearImageState: (state) => {
//       state.photoUrl = null;
//       state.uploading = false;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(uploadEmployeeImageThunk.pending, (state) => {
//         state.uploading = true;
//         state.error = null;
//       })
//       .addCase(uploadEmployeeImageThunk.fulfilled, (state, action) => {
//         state.uploading = false;
//         state.photoUrl = action.payload.photoUrl || null; // Use photoUrl from normalized response
//       })
//       .addCase(uploadEmployeeImageThunk.rejected, (state, action) => {
//         state.uploading = false;
//         state.error = action.payload || 'Failed to upload employee image';
//       });
//   },
// });

// export const { clearImageState } = employeeImageSlice.actions;
// export default employeeImageSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getActiveBranches } from '../../api/getActiveBranchesApi';

// export const fetchAllBranches = createAsyncThunk(
//   'activeBranches/fetchAll',
//   async (_, thunkAPI) => {
//     try {
//       console.log('Fetching active branches...');
//       const branches = await getActiveBranches();
//       console.log('Active branches fetched:', branches);
//       return branches;
//     } catch (error) {
//       console.error('Error fetching active branches:', {
//         message: error.message,
//         stack: error.stack,
//       });
//       return thunkAPI.rejectWithValue(error.message || 'Something went wrong');
//     }
//   }
// );

// const getActiveBranchesSlice = createSlice({
//   name: 'activeBranches',
//   initialState: {
//     activeBranches: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAllBranches.pending, (state) => {
//         console.log('fetchAllBranches pending');
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchAllBranches.fulfilled, (state, action) => {
//         console.log('fetchAllBranches fulfilled:', action.payload);
//         state.loading = false;
//         state.activeBranches = action.payload;
//       })
//       .addCase(fetchAllBranches.rejected, (state, action) => {
//         console.log('fetchAllBranches rejected:', action.payload);
//         state.loading = false;
//         state.error = action.payload || 'Failed to fetch branches';
//       });
//   },
// });

// export default getActiveBranchesSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getActiveBranches } from '../../api/getActiveBranchesApi';

// export const fetchAllBranches = createAsyncThunk(
//   'activeBranches/fetchAll',
//   async (_, thunkAPI) => {
//     try {
//       console.log('Fetching active branches...');
//       const branches = await getActiveBranches();
//       console.log('Active branches fetched:', branches);
//       return branches;
//     } catch (error) {
//       console.error('Error fetching active branches:', {
//         message: error.message,
//         stack: error.stack,
//       });
//       return thunkAPI.rejectWithValue(error.message || 'Something went wrong');
//     }
//   }
// );

// const getActiveBranchesSlice = createSlice({
//   name: 'activeBranches',
//   initialState: {
//     activeBranches: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAllBranches.pending, (state) => {
//         console.log('fetchAllBranches pending');
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchAllBranches.fulfilled, (state, action) => {
//         console.log('fetchAllBranches fulfilled:', action.payload);
//         state.loading = false;
//         state.activeBranches = action.payload;
//       })
//       .addCase(fetchAllBranches.rejected, (state, action) => {
//         console.log('fetchAllBranches rejected:', action.payload);
//         state.loading = false;
//         state.error = action.payload || 'Failed to fetch branches';
//       });
//   },
// });

// export default getActiveBranchesSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getActiveEmployees } from '../../api/getActiveEmployeesApi';

// export const fetchAllEmployees = createAsyncThunk(
//   'activeEmployees/fetchAll',
//   async (_, thunkAPI) => {
//     try {
//       console.log('Fetching active employees...');
//       const employees = await getActiveEmployees();
//       console.log('Active employees fetchedaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:', employees);
//       return employees;
//     } catch (error) {
//       console.error('Error fetching active employees:', {
//         message: error.message,
//         stack: error.stack,
//       });
//       return thunkAPI.rejectWithValue(error.message || 'Something went wrong');
//     }
//   }
// );

// const getActiveEmployeesSlice = createSlice({
//   name: 'activeEmployees',
//   initialState: {
//     activeEmployees: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAllEmployees.pending, (state) => {
//         console.log('fetchAllEmployees pending');
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchAllEmployees.fulfilled, (state, action) => {
//         console.log('fetchAllEmployees fulfilled:', action.payload);
//         state.loading = false;
//         state.activeEmployees = action.payload;
//       })
//       .addCase(fetchAllEmployees.rejected, (state, action) => {
//         console.log('fetchAllEmployees rejected:', action.payload);
//         state.loading = false;
//         state.error = action.payload || 'Failed to fetch employees';
//       });
//   },
// });

// export default getActiveEmployeesSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getActiveSources } from '../../api/GetActiveSourceApi';

// export const fetchAllSources = createAsyncThunk(
//   'activeSource/fetchAll',
//   async (_, thunkAPI) => {
//     try {
//       console.log('Fetching active sources...');
//       const sources = await getActiveSources();
//       console.log('Active sources fetched:', sources);
//       return sources;
//     } catch (error) {
//       console.error('Error fetching active sources:', {
//         message: error.message,
//         stack: error.stack,
//       });
//       return thunkAPI.rejectWithValue(error.message || 'Something went wrong');
//     }
//   }
// );

// const getActiveSourceSlice = createSlice({
//   name: 'activeSource',
//   initialState: {
//     activeSource: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAllSources.pending, (state) => {
//         console.log('fetchAllSources pending');
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchAllSources.fulfilled, (state, action) => {
//         console.log('fetchAllSources fulfilled:', action.payload);
//         state.loading = false;
//         state.activeSource = action.payload;
//       })
//       .addCase(fetchAllSources.rejected, (state, action) => {
//         console.log('fetchAllSources rejected:', action.payload);
//         state.loading = false;
//         state.error = action.payload || 'Failed to fetch sources';
//       });
//   },
// });

// export default getActiveSourceSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getActiveSources } from '../../api/GetActiveSourceApi';

// export const fetchAllSources = createAsyncThunk(
//   'activeSource/fetchAll',
//   async (_, thunkAPI) => {
//     try {
//       console.log('Fetching active sources...');
//       const sources = await getActiveSources();
//       console.log('Active sources fetched:', sources);
//       return sources;
//     } catch (error) {
//       console.error('Error fetching active sources:', {
//         message: error.message,
//         stack: error.stack,
//       });
//       return thunkAPI.rejectWithValue(error.message || 'Something went wrong');
//     }
//   }
// );

// const getActiveSourceSlice = createSlice({
//   name: 'activeSource',
//   initialState: {
//     activeSource: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAllSources.pending, (state) => {
//         console.log('fetchAllSources pending');
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchAllSources.fulfilled, (state, action) => {
//         console.log('fetchAllSources fulfilled:', action.payload);
//         state.loading = false;
//         state.activeSource = action.payload;
//       })
//       .addCase(fetchAllSources.rejected, (state, action) => {
//         console.log('fetchAllSources rejected:', action.payload);
//         state.loading = false;
//         state.error = action.payload || 'Failed to fetch sources';
//       });
//   },
// });

// export default getActiveSourceSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getActiveStatuses } from '../../api/getActiveStatusesApi';

// export const fetchActiveStatuses = createAsyncThunk(
//   'activeStatuses/fetchAll',
//   async (_, thunkAPI) => {
//     try {
//       console.log('Fetching active statuses...');
//       const statuses = await getActiveStatuses();
//       console.log('Active statuses fetched:', statuses);
//       return statuses;
//     } catch (error) {
//       console.error('Error fetching active statuses:', {
//         message: error.message,
//         stack: error.stack,
//       });
//       return thunkAPI.rejectWithValue(error.message || 'Something went wrong');
//     }
//   }
// );

// const getActiveStatusSlice = createSlice({
//   name: 'activeStatuses',
//   initialState: {
//     statuses: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchActiveStatuses.pending, (state) => {
//         console.log('fetchActiveStatuses pending');
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchActiveStatuses.fulfilled, (state, action) => {
//         console.log('fetchActiveStatuses fulfilled:', action.payload);
//         state.loading = false;
//         state.statuses = action.payload;
//       })
//       .addCase(fetchActiveStatuses.rejected, (state, action) => {
//         console.log('fetchActiveStatuses rejected:', action.payload);
//         state.loading = false;
//         state.error = action.payload || 'Failed to fetch statuses';
//       });
//   },
// });

// export default getActiveStatusSlice.reducer;

// // src/redux/slices/getAllBranchSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getAllBranch } from '../../api/GetAllBranchApi';

// export const fetchAllBranches = createAsyncThunk(
//   'branches/fetchAll',
//   async (_, thunkAPI) => {
//     try {
//       const branches = await getAllBranch(); // API now returns branches directly
//       return branches;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message || 'Something went wrong');
//     }
//   }
// );

// const getAllBranchSlice = createSlice({
//   name: 'branches',
//   initialState: {
//     branches: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAllBranches.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchAllBranches.fulfilled, (state, action) => {
//         state.loading = false;
//         state.branches = action.payload; // already the array of branches
//       })
//       .addCase(fetchAllBranches.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || 'Failed to fetch branches';
//       });
//   },
// });

// export default getAllBranchSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getAllContacts } from '../../api/GetAllContactApi';

// export const fetchAllContacts = createAsyncThunk(
//   'contact/fetchAllContacts',
//   async (_, { rejectWithValue }) => {
//     try {
//       const data = await getAllContacts();
//       return data;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// const getAllContactSlice = createSlice({
//   name: 'contact',
//   initialState: {
//     contacts: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAllContacts.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchAllContacts.fulfilled, (state, action) => {
//         state.loading = false;
//         state.contacts = action.payload;
//       })
//       .addCase(fetchAllContacts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || 'Failed to load contacts';
//       });
//   },
// });

// export default getAllContactSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getAllEmployees } from '../../api/GetAllEmployeeApi';

// export const fetchAllEmployees = createAsyncThunk(
//   'employees/fetchAll',
//   async (_, { rejectWithValue }) => {
//     try {
//       const data = await getAllEmployees();
//       console.log('fetchAllEmployees payload:', data);
//       return data;
//     } catch (error) {
//       console.log('fetchAllEmployees error:', error);
//       return rejectWithValue(error);
//     }
//   }
// );

// const getAllEmployeesSlice = createSlice({
//   name: 'employees',  
//   initialState: {
//     data: null, // Changed from [] to null for clarity
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAllEmployees.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchAllEmployees.fulfilled, (state, action) => {
//         state.loading = false;
//         state.data = action.payload;
//       })
//       .addCase(fetchAllEmployees.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || 'Something went wrong';
//       });
//   },
// });

// export default getAllEmployeesSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getAllLeads } from '../../api/GetAllLeadApi';

// export const fetchAllLeads = createAsyncThunk(
//   'leads/fetchAll',
//   async ({ filters = {}, page = 1, refresh = false, limit = 50 }, thunkAPI) => {
//     try {
//       const response = await getAllLeads(filters, page, limit);
//       return { ...response.data, refresh };
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error || 'Failed to fetch leads');
//     }
//   }
// );

// const getAllLeadsSlice = createSlice({
//   name: 'leads',
//   initialState: {
//     formattedLeads: [],
//     totalPages: 1,
//     currentPage: 1,
//     totalLeads: 0,
//     hasMore: false,
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     resetLeadsState: (state) => {
//       state.formattedLeads = [];
//       state.totalPages = 1;
//       state.currentPage = 1;
//       state.totalLeads = 0;
//       state.hasMore = false;
//       state.loading = false;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAllLeads.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchAllLeads.fulfilled, (state, action) => {
//         state.loading = false;
//         state.totalPages = action.payload.totalPages;
//         state.currentPage = action.payload.currentPage;
//         state.totalLeads = action.payload.totalLeads;
//         state.hasMore = action.payload.hasMore;
//         if (action.payload.refresh) {
//           state.formattedLeads = action.payload.formattedLeads;
//         } else {
//           state.formattedLeads = [
//             ...state.formattedLeads,
//             ...action.payload.formattedLeads,
//           ];
//         }
//       })
//       .addCase(fetchAllLeads.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || 'Failed to fetch leads';
//       });
//   },
// });

// export const { resetLeadsState } = getAllLeadsSlice.actions;
// export default getAllLeadsSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getAllStatus } from '../../api/GetAllLeadStatusApi';

// export const fetchAllLeadStatuses = createAsyncThunk(
//   'leadStatus/fetchAll',
//   async (_, { rejectWithValue }) => {
//     try {
//       const data = await getAllStatus();
//       return data; // { status: 'success', message: '...', data: { leadStatuses: [...] } }
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// const getAllStatusSlice = createSlice({
//   name: 'leadStatus',
//   initialState: {
//     leadStatuses: [], // Changed from `data` to `leadStatuses` for clarity
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAllLeadStatuses.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchAllLeadStatuses.fulfilled, (state, action) => {
//         state.loading = false;
//         state.leadStatuses = action.payload.data.leadStatuses || []; // Extract leadStatuses
//       })
//       .addCase(fetchAllLeadStatuses.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || 'Something went wrong';
//       });
//   },
// });

// export default getAllStatusSlice.reducer;


// // src/redux/slices/searchContactSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getAllSearchContact } from '../../api/GetAllSearchContact'; // Adjust path

// export const fetchSearchContacts = createAsyncThunk(
//   'searchContact/fetchSearchContacts',
//   async (searchTerm, { rejectWithValue }) => {
//     try {
//       const data = await getAllSearchContact(searchTerm);
//       console.log('Thunk received data:', data); // Debug
//       return data.data.contacts; // Extract contacts array
//     } catch (error) {
//       console.error('Thunk error:', error); // Debug
//       return rejectWithValue(error.message || 'Failed to fetch search contacts');
//     }
//   }
// );

// const searchContactSlice = createSlice({
//   name: 'searchContact',
//   initialState: {
//     searchContacts: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     clearSearchContacts: (state) => {
//       state.searchContacts = [];
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchSearchContacts.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchSearchContacts.fulfilled, (state, action) => {
//         state.loading = false;
//         state.searchContacts = action.payload || [];
//       })
//       .addCase(fetchSearchContacts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || 'Failed to load search contacts';
//       });
//   },
// });

// export const { clearSearchContacts } = searchContactSlice.actions;
// export default searchContactSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getCallHistory } from '../../api/getCallHistoryApi';

// export const fetchCallHistory = createAsyncThunk(
//   'callHistory/fetch',
//   async ({ employeeId, page = 1, limit = 10 }, thunkAPI) => {
//     try {
//       const data = await getCallHistory(employeeId, page, limit);
//       console.log('✅ Thunk Received Call History Data:', data);
//       if (!Array.isArray(data.data)) {
//         console.warn('⚠️ Thunk: Expected data.data to be an array, got:', data.data);
//         throw new Error('Invalid API response: data is not an array');
//       }
//       return data;
//     } catch (error) {
//       console.error('❌ Thunk Error:', error);
//       return thunkAPI.rejectWithValue(error.message || 'Failed to fetch call history');
//     }
//   }
// );

// const callHistorySlice = createSlice({
//   name: 'callHistory',
//   initialState: {
//     callHistory: [],
//     currentPage: 1,
//     totalPages: 1,
//     totalRecords: 0,
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     resetCallHistory: (state) => {
//       state.callHistory = [];
//       state.currentPage = 1;
//       state.totalPages = 1;
//       state.totalRecords = 0;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCallHistory.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchCallHistory.fulfilled, (state, action) => {
//         state.loading = false;
//         state.callHistory = action.payload.data;
//         state.currentPage = action.payload.currentPage;
//         state.totalPages = action.payload.totalPages;
//         state.totalRecords = action.payload.totalRecords;
//       })
//       .addCase(fetchCallHistory.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || 'Failed to fetch call history';
//       });
//   },
// });

// export const { resetCallHistory } = callHistorySlice.actions;
// export default callHistorySlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getAllContacts } from '../../api/GetAllContactApi';

// export const fetchAllContacts = createAsyncThunk(
//   'contact/fetchAllContacts',
//   async (_, { rejectWithValue }) => {
//     try {
//       console.log('Fetching all contacts...');
//       const response = await getAllContacts();
//       console.log('✅ Contacts API Response:', response);
//       return response; // Assuming response is { data: { formattedcontacts: [...] } }
//     } catch (error) {
//       console.error('❌ Error fetching contacts:', error.response?.data || error.message);
//       return rejectWithValue(error.response?.data?.message || 'Failed to fetch contacts');
//     }
//   }
// );

// const getAllContactSlice = createSlice({
//   name: 'contact',
//   initialState: {
//     contacts: { data: { formattedcontacts: [] } },
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     addContactToStore: (state, action) => {
//       state.contacts.data.formattedcontacts.push(action.payload);
//       console.log('New contact added to store:', action.payload);
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAllContacts.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         console.log('Pending: Fetching contacts...');
//       })
//       .addCase(fetchAllContacts.fulfilled, (state, action) => {
//         state.loading = false;
//         state.contacts = action.payload;
//         console.log('Fulfilled: Contacts fetched:', action.payload.data.formattedcontacts);
//       })
//       .addCase(fetchAllContacts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || 'Failed to load contacts';
//         console.error('Rejected: Error fetching contacts:', action.payload);
//       });
//   },
// });

// export const { addContactToStore } = getAllContactSlice.actions;
// export default getAllContactSlice.reducer;



// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getDialReport } from '../../api/GetDialReportApi';

// export const fetchDialReport = createAsyncThunk(
//   'dialReport/fetch',
//   async (payload, thunkAPI) => {
//     try {
//       console.log('Fetching dial report with payload:', payload);
//       const response = await getDialReport(payload);
//       console.log('Dial report fetched successfully:', response);
//       return response;
//     } catch (error) {
//       console.error('Error fetching dial report:', {
//         message: error.message,
//         stack: error.stack,
//       });
//       return thunkAPI.rejectWithValue(error.message || 'Something went wrong');
//     }
//   }
// );

// const dialReportSlice = createSlice({
//   name: 'dialReport',
//   initialState: {
//     cardData: null,
//     tableData: [],
//     loading: false,
//     error: null,
//     success: false,
//   },
//   reducers: {
//     resetDialReportState: (state) => {
//       state.cardData = null;
//       state.tableData = [];
//       state.loading = false;
//       state.error = null;
//       state.success = false;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchDialReport.pending, (state) => {
//         console.log('fetchDialReport pending');
//         state.loading = true;
//         state.error = null;
//         state.success = false;
//       })
//       .addCase(fetchDialReport.fulfilled, (state, action) => {
//         console.log('fetchDialReport fulfilled:', action.payload);
//         state.loading = false;
//         state.cardData = action.payload.cardData;
//         state.tableData = action.payload.tableData;
//         state.success = true;
//       })
//       .addCase(fetchDialReport.rejected, (state, action) => {
//         console.log('fetchDialReport rejected:', action.payload);
//         state.loading = false;
//         state.error = action.payload || 'Failed to fetch dial report';
//         state.success = false;
//       });
//   },
// });

// export const { resetDialReportState } = dialReportSlice.actions;
// export default dialReportSlice.reducer;


// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getDynamicSourceCounts } from '../../api/GetDynamicSourceCountsApi';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export const fetchDynamicSourceCounts = createAsyncThunk(
//   'dynamicSourceCounts/fetchDynamicSourceCounts',
//   async (_, { rejectWithValue }) => {
//     try {
//       const orgId = await AsyncStorage.getItem('orgId');
//       if (!orgId) {
//         return rejectWithValue('Organization UUID not found in storage');
//       }

//       const data = await getDynamicSourceCounts();
//       if (data.error) {
//         return rejectWithValue(data.error);
//       }
//       return data.data.sourceDetails; // Extract the 'sourceDetails' array from the response
//     } catch (error) {
//       console.error('❌ Error in fetchDynamicSourceCounts:', error);
//       return rejectWithValue(error.message || 'Failed to load dynamic source counts');
//     }
//   }
// );

// const getDynamicSourceCountsSlice = createSlice({
//   name: 'dynamicSourceCounts',
//   initialState: {
//     sourceDetails: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchDynamicSourceCounts.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchDynamicSourceCounts.fulfilled, (state, action) => {
//         state.loading = false;
//         state.sourceDetails = action.payload;
//       })
//       .addCase(fetchDynamicSourceCounts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default getDynamicSourceCountsSlice.reducer;


// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getDynamicStatusCounts } from '../../api/GetDynamicStatusCounts';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export const fetchDynamicStatusCounts = createAsyncThunk(
//   'dynamicStatus/fetchDynamicStatusCounts',
//   async (_, { rejectWithValue }) => {
//     try {
//       const orgId = await AsyncStorage.getItem('orgId');
//       if (!orgId) {
//         return rejectWithValue('Organization UUID not found in storage');
//       }

//       const data = await getDynamicStatusCounts();
//       if (data.error) {
//         return rejectWithValue(data.error);
//       }
//       return data.data.statusDetails; // Extract the 'statusDetails' array from the response
//     } catch (error) {
//       console.error('❌ Error in fetchDynamicStatusCounts:', error);
//       return rejectWithValue(error.message || 'Failed to load dynamic status counts');
//     }
//   }
// );

// const getDynamicStatusCountsSlice = createSlice({
//   name: 'dynamicStatus',
//   initialState: {
//     statusCounts: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchDynamicStatusCounts.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchDynamicStatusCounts.fulfilled, (state, action) => {
//         state.loading = false;
//         state.statusCounts = action.payload;
//       })
//       .addCase(fetchDynamicStatusCounts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default getDynamicStatusCountsSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getEmployeeById } from '../../api/getEmployeeByIdApi';

// const initialState = {
//   employee: null,
//   loading: false,
//   error: null,
// };

// export const fetchEmployeeById = createAsyncThunk(
//   'employee/fetchEmployeeById',
//   async (id, { rejectWithValue }) => {
//     try {
//       const response = await getEmployeeById(id);
//       return response; // Now receives only the employee data
//     } catch (error) {
//       return rejectWithValue(error || 'Failed to fetch employee'); // Use thrown error
//     }
//   }
// );

// const employeeSlice = createSlice({
//   name: 'employee',
//   initialState,
//   reducers: {
//     clearEmployee: (state) => {
//       state.employee = null;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchEmployeeById.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchEmployeeById.fulfilled, (state, action) => {
//         state.loading = false;
//         state.employee = action.payload;
//       })
//       .addCase(fetchEmployeeById.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { clearEmployee } = employeeSlice.actions;
// export default employeeSlice.reducer;


// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getLeadActivity } from '../../api/GetLeadActivityApi';

// export const fetchLeadActivity = createAsyncThunk(
//   'leadActivity/fetch',
//   async (leadId, thunkAPI) => {
//     try {
//       // Pass the dynamic leadId to getLeadActivity
//       const data = await getLeadActivity(leadId);
//       console.log('✅ Thunk Received Data:', data);

//       if (!Array.isArray(data)) {
//         throw new Error('Expected an array of lead activity data');
//       }

//       return data;
//     } catch (error) {
//       console.error('❌ Thunk Error:', error);
//       return thunkAPI.rejectWithValue(error.message || 'Failed to fetch lead activity');
//     }
//   }
// );

// const leadActivitySlice = createSlice({
//   name: 'leadActivity',
//   initialState: {
//     leadActivities: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchLeadActivity.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchLeadActivity.fulfilled, (state, action) => {
//         state.loading = false;
//         state.leadActivities = action.payload;
//       })
//       .addCase(fetchLeadActivity.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || 'Failed to fetch lead activity';
//       });
//   },
// });

// export default leadActivitySlice.reducer;


// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getLeadById } from '../../api/GetLeadByIdApi';

// export const fetchLeadById = createAsyncThunk(
//   'lead/fetchLeadById',
//   async (leadId, { rejectWithValue }, options = {}) => {
//     try {
//       if (!leadId || !/^[0-9a-fA-F]{24}$/.test(leadId)) {
//         throw new Error('Invalid or missing leadId');
//       }
//       console.log(`Fetching lead for leadId: ${leadId} with options:`, JSON.stringify(options, null, 2));
//       const response = await getLeadById(leadId, options);
//       console.log('✅ Full Lead API Response:', JSON.stringify(response, null, 2));
//       return response; // Return the full response
//     } catch (error) {
//       console.error('❌ Error fetching lead:', JSON.stringify(error, null, 2));
//       const errorPayload = {
//         message: error.message || 'Failed to fetch lead',
//         status: error.response?.status || 'error',
//         data: error.response?.data || {},
//       };
//       return rejectWithValue(errorPayload);
//     }
//   }
// );

// const getLeadByIdSlice = createSlice({
//   name: 'getLeadById',
//   initialState: {
//     lead: null,
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     resetLeadByIdState: (state) => {
//       state.lead = null;
//       state.loading = false;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchLeadById.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.lead = null;
//         console.log('Pending: Fetching lead...');
//       })
//       .addCase(fetchLeadById.fulfilled, (state, action) => {
//         state.loading = false;
//         state.lead = action.payload;
//         if (!action.payload?.data?.status) {
//           console.warn('Lead status missing, setting default');
//           state.lead.data = { ...action.payload.data, status: 'unknown' };
//         }
//         console.log('Fulfilled: Lead fetched:', JSON.stringify(action.payload, null, 2));
//       })
//       .addCase(fetchLeadById.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         console.error('Rejected: Error fetching lead:', JSON.stringify(action.payload, null, 2));
//       });
//   },
// });

// export const { resetLeadByIdState } = getLeadByIdSlice.actions;
// export default getLeadByIdSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { getLeadFollowUps } from '../../api/GetLeadFollowUps';

// export const fetchLeadFollowUps = createAsyncThunk(
//   'followUps/fetchAll',
//   async (leadId, { rejectWithValue }) => {
//     try {
//       console.log(`getLeadFollowUpsSlice: Fetching follow ups for leadId ${leadId}`);
//       const response = await getLeadFollowUps(leadId);
//       if (!response.data) {
//         throw new Error('Invalid API response: Missing data');
//       }
//       const { followUps, totalFollowUps } = response.data;
//       if (!Array.isArray(followUps)) {
//         throw new Error('Invalid API response: followUps is not an array');
//       }
//       return {
//         followUps,
//         totalFollowUps: Number(totalFollowUps) || 0,
//       };
//     } catch (error) {
//       console.error(`getLeadFollowUpsSlice: API Error for leadId ${leadId}:`, error);
//       return rejectWithValue(error.message || 'Failed to fetch follow ups');
//     }
//   }
// );

// const getLeadFollowUpsSlice = createSlice({
//   name: 'followUps',
//   initialState: {
//     followUps: [],
//     totalFollowUps: 0,
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     resetFollowUpsState: (state) => {
//       state.followUps = [];
//       state.totalFollowUps = 0;
//       state.loading = false;
//       state.error = null;
//       AsyncStorage.removeItem('cachedFollowUps').catch((err) =>
//         console.error('getLeadFollowUpsSlice: Error clearing cached follow ups:', err)
//       );
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchLeadFollowUps.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         console.log('getLeadFollowUpsSlice: Pending fetch for leadId');
//       })
//       .addCase(fetchLeadFollowUps.fulfilled, (state, action) => {
//         state.loading = false;
//         state.followUps = action.payload.followUps;
//         state.totalFollowUps = action.payload.totalFollowUps;
//         AsyncStorage.setItem('cachedFollowUps', JSON.stringify(state.followUps)).catch((err) =>
//           console.error('getLeadFollowUpsSlice: Error caching follow ups:', err)
//         );
//         console.log('getLeadFollowUpsSlice: Follow ups fetched', {
//           totalFollowUps: state.totalFollowUps,
//           followUpsCount: state.followUps.length,
//         });
//       })
//       .addCase(fetchLeadFollowUps.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || 'Something went wrong';
//         console.error('getLeadFollowUpsSlice: Fetch failed:', {
//           error: action.payload,
//           state: state,
//         });
//       });
//   },
// });

// export const { resetFollowUpsState } = getLeadFollowUpsSlice.actions;
// export default getLeadFollowUpsSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getLeadStatusById } from '../../api/GetLeadStatusByIdApi';

// const log = process.env.NODE_ENV === 'development' ? console.log : () => {};

// export const fetchLeadStatusById = createAsyncThunk(
//   'leadStatusById/fetch',
//   async (id, { rejectWithValue }) => {
//     try {
//       log('Fetching lead status for ID:', id);
//       if (typeof id !== 'string' || !id) {
//         throw new Error('ID must be a non-empty string');
//       }
//       const response = await getLeadStatusById(id);
//       log('API Response:', response);
//       if (!response || typeof response !== 'object' || !response.data) {
//         throw new Error('Invalid API response');
//       }
//       return response; // Return the full response
//     } catch (error) {
//       console.error('API Error:', error.message || error);
//       return rejectWithValue(error.message || 'Failed to fetch lead status');
//     }
//   }
// );

// const getLeadStatusByIdSlice = createSlice({
//   name: 'leadStatusById',
//   initialState: {
//     data: null,
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     resetLeadStatusById: (state) => {
//       state.data = null;
//       state.loading = false;
//       state.error = null;
//       log('Reset: Lead status by ID state cleared');
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchLeadStatusById.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         log('Pending: Fetching lead status...');
//       })
//       .addCase(fetchLeadStatusById.fulfilled, (state, action) => {
//         state.loading = false;
//         state.data = action.payload; // Store the full API response
//         log('Fulfilled: Lead status fetched:', action.payload.data?.isPriority);
//       })
//       .addCase(fetchLeadStatusById.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || 'Failed to fetch status by ID';
//         log('Rejected: Error fetching lead status:', action.payload);
//       });
//   },
// });

// export const { resetLeadStatusById } = getLeadStatusByIdSlice.actions;
// export default getLeadStatusByIdSlice.reducer;


// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getMainDashboard } from '../../api/GetMainDashboardApi';

// export const fetchMainDashboardCards = createAsyncThunk(
//   'dashboard/fetchMainDashboardCards',
//   async (_, { rejectWithValue }) => {
//     try {
//       const data = await getMainDashboard();
//       return data.data; // Extract the 'data' object from the response
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// const getMainDashboardSlice = createSlice({
//   name: 'dashboard',
//   initialState: {
//     dashboardData: {
//       todayFollowups: 0,
//       tomorrowFollowups: 0,
//       pendingFollowups: 0,
//       totalLeads: 0,
//       thisMonthLeads: 0,
//       totalFreshLeads: 0,
//       thisMonthFreshLeads: 0,
//       expectedIncome: { count: 0, totalBudget: 0 },
//       totalAbm: 0,
//       thisMonthAbm: 0,
//       totalAbe: 0,
//       thisMonthAbe: 0,
//       totalDialUp: 0,
//       thisMonthtotalDialUp: 0,
//     },
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchMainDashboardCards.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchMainDashboardCards.fulfilled, (state, action) => {
//         state.loading = false;
//         state.dashboardData = action.payload;
//       })
//       .addCase(fetchMainDashboardCards.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || 'Failed to load dashboard data';
//       });
//   },
// });

// export default getMainDashboardSlice.reducer;


// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getPerformanceReport } from '../../api/GetPerformanceReportApi';

// export const fetchPerformanceReport = createAsyncThunk(
//   'performanceReport/fetch',
//   async ({ search, dateFilter, startDate, endDate } = {}, thunkAPI) => {
//     try {
//       const data = await getPerformanceReport({ search, dateFilter, startDate, endDate });
//       console.log('✅ Thunk Received Data:', data);

//       if (!Array.isArray(data)) {
//         throw new Error('Expected an array of performance data');
//       }

//       return data;
//     } catch (error) {
//       console.error('❌ Thunk Error:', error);
//       return thunkAPI.rejectWithValue(error.message || 'Failed to fetch performance report');
//     }
//   }
// );

// const performanceReportSlice = createSlice({
//   name: 'performanceReport',
//   initialState: {
//     performanceReport: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchPerformanceReport.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchPerformanceReport.fulfilled, (state, action) => {
//         state.loading = false;
//         state.performanceReport = action.payload;
//       })
//       .addCase(fetchPerformanceReport.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || 'Failed to fetch performance report';
//       });
//   },
// });

// export default performanceReportSlice.reducer;

// // // import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// // // import { logInUser } from "../../api/LogInApi";
// // // import AsyncStorage from "@react-native-async-storage/async-storage";

// // // export const userLogin = createAsyncThunk(
// // //   "auth/login",
// // //   async ({ email, password }, { rejectWithValue }) => {
// // //     try {
// // //       return await logInUser(email, password);
// // //     } catch (error) {
// // //       return rejectWithValue(error);
// // //     }
// // //   }
// // // );

// // // const logInSlice = createSlice({
// // //   name: "auth",
// // //   initialState: {
// // //     user: null,
// // //     token: null,
// // //     loading: false,
// // //     error: null,
// // //   },
// // //   extraReducers: (builder) => {
// // //     builder
// // //       .addCase(userLogin.pending, (state) => {
// // //         state.loading = true;
// // //         state.error = null;
// // //       })
// // //       .addCase(userLogin.fulfilled, (state, action) => {
// // //         state.loading = false;
// // //         state.user = action.payload.data;
// // //         state.token = action.payload.token;

// // //         const storeUserData = async () => {
// // //           try {
// // //             const {
// // //               token,
// // //               permissions,
// // //               data: {
// // //                 categoryId,
// // //                 _id: systemUserId,
// // //                 linkSystemUser
// // //               }
// // //             } = action.payload;

// // //             // optional chaining for safety
// // //             const orgId = linkSystemUser?.[0]?.organizationId || null;
// // //             const organizationName = linkSystemUser?.[0]?.organizationName || null;

// // //             // ✅ Console logs for API response
// // //             console.log("✅ API Login Response:");
// // //             console.log("authToken:", token);
// // //             console.log("permissionList:", permissions);
// // //             console.log("categoryId:", categoryId);
// // //             console.log("orgId:", orgId);
// // //             console.log("organizationName:", organizationName);
// // //             console.log("systemUserId:", systemUserId);

// // //             // ✅ Save to AsyncStorage
// // //             await AsyncStorage.setItem("authToken", token);
// // //             await AsyncStorage.setItem("permissionList", JSON.stringify(permissions));
// // //             await AsyncStorage.setItem("categoryId", categoryId);
// // //             await AsyncStorage.setItem("orgId", orgId);
// // //             await AsyncStorage.setItem("organizationName", organizationName);
// // //             await AsyncStorage.setItem("systemUserId", systemUserId);
// // //             // await AsyncStorage.setItem("LeadToEdit", LeadToEdit);
// // //             // await AsyncStorage.setItem("bookList", bookList);
           



// // //             await AsyncStorage.setItem("empId",action.payload.data.linkSystemUser[0].employeeId);


// // //             // ✅ Read back to confirm (optional)
// // //             const authToken = await AsyncStorage.getItem("authToken");
// // //             const permissionList = await AsyncStorage.getItem("permissionList");
// // //             const categoryIdStored = await AsyncStorage.getItem("categoryId");
// // //             const orgIdStored = await AsyncStorage.getItem("orgId");
// // //             const orgNameStored = await AsyncStorage.getItem("organizationName");
// // //             const systemUserIdStored = await AsyncStorage.getItem("systemUserId");
// // //             const empIdStored = await AsyncStorage.getItem("empId");
// // //             // const LeadToEditStored = await AsyncStorage.getItem("LeadToEdit");
// // //             // const bookListStored = await AsyncStorage.getItem("bookList");

// // //             console.log("📦 Stored in AsyncStorage:");
// // //             console.log("authToken: heee", authToken);
// // //             console.log("permissionList:heee", JSON.parse(permissionList));
// // //             console.log("categoryId:heee", categoryIdStored);
// // //             console.log("orgId:heee", orgIdStored);
// // //             console.log("organizationName:heee", orgNameStored);
// // //             console.log("systemUserId:heee", systemUserIdStored);
// // //             console.log("empIdStored:heeerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr", empIdStored);
// // //             // console.log("LeadToEditStored:heeeo", LeadToEditStored);
// // //             // console.log("bookListStored:heeeo", bookListStored);
// // //           } catch (error) {
// // //             console.error("❌ Error saving to AsyncStorage:", error);
// // //           }
// // //         };

// // //         storeUserData();
// // //       })
// // //       .addCase(userLogin.rejected, (state, action) => {
// // //         state.loading = false;
// // //         state.error = action.payload;
// // //       });
// // //   },
// // // });

// // // export default logInSlice.reducer;

// // import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// // import { logInUser } from "../../api/LogInApi";
// // import AsyncStorage from "@react-native-async-storage/async-storage";
// // import { persistReducer } from 'redux-persist'; // Import persistReducer

// // export const userLogin = createAsyncThunk(
// //   "auth/login",
// //   async ({ email, password }, { rejectWithValue }) => {
// //     try {
// //       const response = await logInUser(email, password);
// //       const {
// //         token,
// //         permissions,
// //         data: { categoryId, _id: systemUserId, linkSystemUser },
// //       } = response;

// //       // Extract orgId and organizationName with safety checks
// //       const orgId = linkSystemUser?.[0]?.organizationId || null;
// //       const organizationName = linkSystemUser?.[0]?.organizationName || null;
// //       const empId = linkSystemUser?.[0]?.employeeId || null;

// //       if (!orgId) {
// //         throw new Error("Organization UUID not found in API response");
// //       }

// //       // Log API response
// //       console.log("✅ API Login Response:");
// //       console.log("authToken:", token);
// //       console.log("permissionList:", permissions);
// //       console.log("categoryId:", categoryId);
// //       console.log("orgId:", orgId);
// //       console.log("organizationName:", organizationName);
// //       console.log("systemUserId:", systemUserId);
// //       console.log("empId:", empId);

// //       // Store data in AsyncStorage
// //       await AsyncStorage.setItem("authToken", token);
// //       await AsyncStorage.setItem("permissionList", JSON.stringify(permissions));
// //       await AsyncStorage.setItem("categoryId", categoryId);
// //       await AsyncStorage.setItem("orgId", orgId);
// //       await AsyncStorage.setItem("organizationName", organizationName);
// //       await AsyncStorage.setItem("systemUserId", systemUserId);
// //       await AsyncStorage.setItem("empId", empId);

// //       // Verify storage
// //       const storedOrgId = await AsyncStorage.getItem("orgId");
// //       if (!storedOrgId) {
// //         throw new Error("Failed to store orgId in AsyncStorage");
// //       }

// //       // Log stored data
// //       console.log("📦 Stored in AsyncStorage:");
// //       console.log("authToken:", await AsyncStorage.getItem("authToken"));
// //       console.log("permissionList:", JSON.parse(await AsyncStorage.getItem("permissionList")));
// //       console.log("categoryId:", await AsyncStorage.getItem("categoryId"));
// //       console.log("orgId:", storedOrgId);
// //       console.log("organizationName:", await AsyncStorage.getItem("organizationName"));
// //       console.log("systemUserId:", await AsyncStorage.getItem("systemUserId"));
// //       console.log("empId:", await AsyncStorage.getItem("empId"));

// //       return response;
// //     } catch (error) {
// //       console.error("❌ Error in userLogin:", error.message);
// //       return rejectWithValue(error.message || "Login failed");
// //     }
// //   }
// // );

// // const logInSlice = createSlice({
// //   name: "auth",
// //   initialState: {
// //     user: null,
// //     token: null,
// //     orgId: null,
// //     loading: false,
// //     error: null,
// //   },
// //   extraReducers: (builder) => {
// //     builder
// //       .addCase(userLogin.pending, (state) => {
// //         state.loading = true;
// //         state.error = null;
// //       })
// //       .addCase(userLogin.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.user = action.payload.data;
// //         state.token = action.payload.token;
// //         state.orgId = action.payload.data.linkSystemUser?.[0]?.organizationId || null;
// //       })
// //       .addCase(userLogin.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload;
// //       });
// //   },
// // });

// // // Persist configuration
// // const persistConfig = {
// //   key: 'auth',
// //   storage: AsyncStorage,
// //   whitelist: ['token', 'orgId', 'user'], // Persist only these fields
// // };

// // // Export the persisted reducer
// // export default persistReducer(persistConfig, logInSlice.reducer);
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { logInUser } from "../../api/LogInApi";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { persistReducer } from 'redux-persist';
// export const userLogin = createAsyncThunk(
//     "auth/login",
//     async ({ email, password }, { rejectWithValue }) => {
//         try {
//             const response = await logInUser(email, password);
//             const {
//                 token,
//                 permissions,
//                 data: { categoryId, _id: systemUserId, linkSystemUser },
//             } = response;

//             const orgId = linkSystemUser?.[0]?.organizationId || null;
//             const organizationName = linkSystemUser?.[0]?.organizationName || null;
//             const empId = linkSystemUser?.[0]?.employeeId || null;

//             if (!orgId) {
//                 throw new Error("Organization UUID not found in API response");
//             }

//             // Calculate token expiration (default to 24 hours if not provided)
//             const expiresAt = response.expiresAt || Date.now() + (response.expiresIn ? response.expiresIn * 1000 : 24 * 60 * 60 * 1000);

//             // Store data in AsyncStorage
//             await AsyncStorage.setItem("authToken", token);
//             await AsyncStorage.setItem("tokenExpiresAt", expiresAt.toString());
//             await AsyncStorage.setItem("permissionList", JSON.stringify(permissions));
//             await AsyncStorage.setItem("categoryId", categoryId);
//             await AsyncStorage.setItem("orgId", orgId);
//             await AsyncStorage.setItem("organizationName", organizationName);
//             await AsyncStorage.setItem("systemUserId", systemUserId);
//             await AsyncStorage.setItem("empId", empId);

//             console.log("📦 Stored in AsyncStorage:", {
//                 authToken: await AsyncStorage.getItem("authToken"),
//                 tokenExpiresAt: await AsyncStorage.getItem("tokenExpiresAt"),
//                 orgId: await AsyncStorage.getItem("orgId"),
//             });

//             return { ...response, expiresAt };
//         } catch (error) {
//             console.error("❌ Error in userLogin:", error.message);
//             return rejectWithValue(error.message || "Login failed");
//         }
//     }
// );

// const logInSlice = createSlice({
//     name: "auth",
//     initialState: {
//         user: null,
//         token: null,
//         orgId: null,
//         expiresAt: null,
//         loading: false,
//         error: null,
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(userLogin.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(userLogin.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.user = action.payload.data;
//                 state.token = action.payload.token;
//                 state.orgId = action.payload.data.linkSystemUser?.[0]?.organizationId || null;
//                 state.expiresAt = action.payload.expiresAt;
//             })
//             .addCase(userLogin.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             });
//     },
// });

// const persistConfig = {
//     key: 'auth',
//     storage: AsyncStorage,
//     whitelist: ['token', 'orgId', 'user', 'expiresAt'],
// };

// export default persistReducer(persistConfig, logInSlice.reducer);


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

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { searchLeadsByFollowUpDate } from '../../api/SearchLeadsByFollowUpDateApi';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export const fetchLeadsByFollowUpDate = createAsyncThunk(
//   'searchLeadsByFollowUpDate/fetchAll',
//   async ({ queryType, page = 1, pageSize = 10, isLoadMore = false }, { rejectWithValue, getState }) => {
//     try {
//       console.log(`SearchLeadsByFollowUpDateSlice: Fetching leads for queryType ${queryType}, page ${page}`);
//       const response = await searchLeadsByFollowUpDate(queryType, page, pageSize);
//       if (!response.data) {   
//         throw new Error('Invalid API response: Missing data');
//       }
//       const { leads, totalLeads, currentPage, totalPages } = response.data;
//       if (!Array.isArray(leads)) {
//         throw new Error('Invalid API response: leads is not an array');
//       }

//       // Use current date for filtering
//       const today = new Date().toISOString().split('T')[0];
//       const tomorrow = new Date();
//       tomorrow.setDate(tomorrow.getDate() + 1);
//       const tomorrowISO = tomorrow.toISOString().split('T')[0];

//       let filteredLeads = leads;
//       if (queryType === 'today') {
//         filteredLeads = leads.filter(lead => lead.nextFollowUpDate?.split('T')[0] === today);
//       } else if (queryType === 'tomorrow') {
//         filteredLeads = leads.filter(lead => lead.nextFollowUpDate?.split('T')[0] === tomorrowISO);
//       } else if (queryType === 'pending') {
//         filteredLeads = leads.filter(
//           lead => !lead.nextFollowUpDate || 
//             (lead.nextFollowUpDate?.split('T')[0] !== today && lead.nextFollowUpDate?.split('T')[0] !== tomorrowISO)
//         );
//       }

//       const existingLeads = isLoadMore ? getState().searchLeadsByFollowUpDate.leads : [];
//       return {
//         leads: isLoadMore ? [...existingLeads, ...filteredLeads] : filteredLeads,
//         totalLeads,
//         currentPage,
//         totalPages,
//       };
//     } catch (error) {
//       console.error(`SearchLeadsByFollowUpDateSlice: API Error for queryType ${queryType}:`, error);
//       return rejectWithValue(error.message || 'Failed to fetch leads by follow-up date');
//     }
//   }
// );

// const searchLeadsByFollowUpDateSlice = createSlice({
//   name: 'searchLeadsByFollowUpDate',
//   initialState: {
//     leads: [],
//     totalLeads: 0,
//     currentPage: 1,
//     totalPages: 1,
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     resetSearchLeadsState: (state) => {
//       state.leads = [];
//       state.totalLeads = 0;
//       state.currentPage = 1;
//       state.totalPages = 1;
//       state.loading = false;
//       state.error = null;
//       AsyncStorage.removeItem('cachedSearchLeads').catch((err) =>
//         console.error('SearchLeadsByFollowUpDateSlice: Error clearing cached leads:', err)
//       );
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchLeadsByFollowUpDate.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         console.log('SearchLeadsByFollowUpDateSlice: Pending fetch for queryType');
//       })
//       .addCase(fetchLeadsByFollowUpDate.fulfilled, (state, action) => {
//         state.loading = false;
//         state.leads = action.payload.leads;
//         state.totalLeads = action.payload.totalLeads;
//         state.currentPage = action.payload.currentPage;
//         state.totalPages = action.payload.totalPages;
//         AsyncStorage.setItem('cachedSearchLeads', JSON.stringify(state.leads)).catch((err) =>
//           console.error('SearchLeadsByFollowUpDateSlice: Error caching leads:', err)
//         );
//         console.log('SearchLeadsByFollowUpDateSlice: Leads fetched', {
//           totalLeads: state.totalLeads,
//           leadsCount: state.leads.length,
//         });
//       })
//       .addCase(fetchLeadsByFollowUpDate.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || 'Something went wrong';
//         console.error('SearchLeadsByFollowUpDateSlice: Fetch failed:', {
//           error: action.payload,
//           state: state,
//         });
//       });
//   },
// });

// export const { resetSearchLeadsState } = searchLeadsByFollowUpDateSlice.actions;
// export default searchLeadsByFollowUpDateSlice.reducer;

// // src/slices/updateContactSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { updateContactApi } from '../../api/UpdateContactApi'; // Adjusted path from '../../api/UpdateContactApi'

// // Debug import
// console.log('updateContactSlice: Imported updateContactApi', updateContactApi);

// export const updateContact = createAsyncThunk(
//   'updateContact/update',
//   async ({ contactId, contactData }, { rejectWithValue }) => {
//     try {
//       console.log(`updateContactSlice: Updating contact for contactId ${contactId}`, contactData);
//       if (!updateContactApi) {
//         throw new Error('updateContactApi is not defined');
//       }
//       const response = await updateContactApi(contactId, contactData);
//       console.log(`updateContactSlice: Update response for contactId ${contactId}`, response);
//       return response;
//     } catch (error) {
//       console.error(`updateContactSlice: Error updating contact for contactId ${contactId}:`, error);
//       return rejectWithValue(error.message || 'Failed to update contact');
//     }
//   }
// );

// const updateContactSlice = createSlice({
//   name: 'updateContact',
//   initialState: {
//     data: null,
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     resetUpdateContactState: (state) => {
//       state.data = null;
//       state.loading = false;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(updateContact.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.data = null;
//         console.log('updateContactSlice: Pending update for contact');
//       })
//       .addCase(updateContact.fulfilled, (state, action) => {
//         state.loading = false;
//         state.data = action.payload;
//         console.log('updateContactSlice: Contact updated successfully', action.payload);
//       })
//       .addCase(updateContact.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || 'Failed to update contact';
//         console.error('updateContactSlice: Update failed:', action.payload);
//       });
//   },
// });

// export const { resetUpdateContactState } = updateContactSlice.actions;
// export default updateContactSlice.reducer;


// // src/slices/updateLeadSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { updateLeadApi } from '../../api/updateLeadApi'; // Adjusted path and import name

// // Debug import
// console.log('updateLeadSlice: Imported updateLeadApi', updateLeadApi);

// export const updateLeadAsync = createAsyncThunk(
//   'lead/updateLead',
//   async ({ leadId, leadData, postUpdatedLead }, { rejectWithValue }) => {
//     try {
//       console.log(`updateLeadSlice: Updating lead for leadId ${leadId}`, leadData, `postUpdatedLead: ${postUpdatedLead}`);
//       if (!updateLeadApi) {
//         throw new Error('updateLeadApi is not defined');
//       }
//       const updatedLead = await updateLeadApi(leadId, leadData, postUpdatedLead);
//       console.log(`updateLeadSlice: Update response for leadId ${leadId}`, updatedLead);
//       return updatedLead;
//     } catch (error) {
//       console.error(`updateLeadSlice: Error updating lead for leadId ${leadId}:`, error);
//       return rejectWithValue(error.message || 'Failed to update lead');
//     }
//   }
// );

// const updateLeadSlice = createSlice({
//   name: 'lead',
//   initialState: {
//     lead: null,
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(updateLeadAsync.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         console.log('updateLeadSlice: Pending update for lead');
//       })
//       .addCase(updateLeadAsync.fulfilled, (state, action) => {
//         state.loading = false;
//         state.lead = action.payload;
//         console.log('updateLeadSlice: Lead updated successfully', action.payload);
//       })
//       .addCase(updateLeadAsync.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || 'Failed to update lead';
//         console.error('updateLeadSlice: Update failed:', action.payload);
//       });
//   },
// });

// export default updateLeadSlice.reducer;

// src/redux/slices/combinedSlices.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';
import { addLeadDial } from '../../api/addLeadDial';
import { addLead as addLeadAPI } from '../../api/AddLead';
import { bulkAssignLeads } from '../../api/BulkAssignLeadsApi';
import { uploadEmployeeImage } from '../../api/EmployeeImageUpload';
import { getActiveBranches } from '../../api/getActiveBranchesApi';
import { getActiveEmployees } from '../../api/getActiveEmployeesApi';
import { getActiveSources } from '../../api/GetActiveSourceApi';
import { getActiveStatuses } from '../../api/getActiveStatusesApi';
import { getAllBranch } from '../../api/GetAllBranchApi';
import { getAllContacts } from '../../api/GetAllContactApi';
import { getAllEmployees } from '../../api/GetAllEmployeeApi';
import { getAllLeads } from '../../api/GetAllLeadApi';
import { getAllStatus } from '../../api/GetAllLeadStatusApi';
import { getAllSearchContact } from '../../api/GetAllSearchContact';
import { getCallHistory } from '../../api/getCallHistoryApi';
import { getDialReport } from '../../api/GetDialReportApi';
import { getDynamicSourceCounts } from '../../api/GetDynamicSourceCountsApi';
import { getDynamicStatusCounts } from '../../api/GetDynamicStatusCounts';
import { getEmployeeById } from '../../api/getEmployeeByIdApi';
import { getLeadActivity } from '../../api/GetLeadActivityApi';
import { getLeadById } from '../../api/GetLeadByIdApi';
import { getLeadFollowUps } from '../../api/GetLeadFollowUps';
import { getLeadStatusById } from '../../api/GetLeadStatusByIdApi';
import { getMainDashboard } from '../../api/GetMainDashboardApi';
import { getPerformanceReport } from '../../api/GetPerformanceReportApi';
import { logInUser } from '../../api/LogInApi';
import { postFeedbackApi } from '../../api/PostFeedbackApi';
import { searchLeadsByFollowUpDate } from '../../api/SearchLeadsByFollowUpDateApi';
import { updateContactApi } from '../../api/UpdateContactApi';
import { updateLeadApi } from '../../api/updateLeadApi';

// --- Dial Lead Slice ---
export const createDialLead = createAsyncThunk(
  'dialLead/createLead',
  async (formData, { rejectWithValue }) => {
    try {
      const data = await addLeadDial(formData);
      return data;
    } catch (error) {
      const errorMessage = error.response?.status === 409
        ? 'Contact with this email or phone already exists.'
        : error.response?.data?.message || error.message || 'Failed to add dial lead';
      return rejectWithValue(errorMessage);
    }
  }
);

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

export const { resetDialLeadState, setCallStatus, setCallLogId } = dialLeadSlice.actions;

// --- Add Lead Slice ---
export const addLead = createAsyncThunk(
  'addLead/createLead',
  async (formData, { rejectWithValue }) => {
    try {
      const data = await addLeadAPI(formData);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const addLeadSlice = createSlice({
  name: 'addLead',
  initialState: {
    loading: false,
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
        state.success = false;
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

export const { resetAddLeadState } = addLeadSlice.actions;

// --- Bulk Assign Leads Slice ---
export const assignLeads = createAsyncThunk(
  'bulkAssignLeads/assign',
  async (payload, thunkAPI) => {
    try {
      console.log('Assigning leads with payload:', payload);
      const response = await bulkAssignLeads(payload);
      console.log('Leads assigned successfully:', response);
      return response;
    } catch (error) {
      console.error('Error assigning leads:', {
        message: error.message,
        stack: error.stack,
      });
      return thunkAPI.rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

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
        console.log('assignLeads pending');
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(assignLeads.fulfilled, (state, action) => {
        console.log('assignLeads fulfilled:', action.payload);
        state.loading = false;
        state.assignedLeads = action.payload;
        state.success = true;
      })
      .addCase(assignLeads.rejected, (state, action) => {
        console.log('assignLeads rejected:', action.payload);
        state.loading = false;
        state.error = action.payload || 'Failed to assign leads';
        state.success = false;
      });
  },
});

export const { resetAssignState } = bulkAssignLeadsSlice.actions;

// --- Employee Image Slice ---
export const uploadEmployeeImageThunk = createAsyncThunk(
  'employeeImage/upload',
  async ({ employeeId, image, fieldName }, thunkAPI) => {
    try {
      const data = await uploadEmployeeImage(employeeId, image, fieldName);
      console.log('✅ Thunk Received Image Upload Data:', data);
      return data;
    } catch (error) {
      console.error('❌ Thunk Image Upload Error:', {
        message: error.message,
        employeeId,
      });
      return thunkAPI.rejectWithValue(error.message || 'Failed to upload employee image');
    }
  }
);

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

export const { clearImageState } = employeeImageSlice.actions;

// --- Active Branches Slice ---
export const fetchAllBranches = createAsyncThunk(
  'activeBranches/fetchAll',
  async (_, thunkAPI) => {
    try {
      console.log('Fetching active branches...');
      const branches = await getActiveBranches();
      console.log('Active branches fetched:', branches);
      return branches;
    } catch (error) {
      console.error('Error fetching active branches:', {
        message: error.message,
        stack: error.stack,
      });
      return thunkAPI.rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

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
        console.log('fetchAllBranches pending');
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBranches.fulfilled, (state, action) => {
        console.log('fetchAllBranches fulfilled:', action.payload);
        state.loading = false;
        state.activeBranches = action.payload;
      })
      .addCase(fetchAllBranches.rejected, (state, action) => {
        console.log('fetchAllBranches rejected:', action.payload);
        state.loading = false;
        state.error = action.payload || 'Failed to fetch branches';
      });
  },
});

// --- Active Employees Slice ---
export const fetchAllEmployees = createAsyncThunk(
  'activeEmployees/fetchAll',
  async (_, thunkAPI) => {
    try {
      console.log('Fetching active employees...');
      const employees = await getActiveEmployees();
      console.log('Active employees fetched:', employees);
      return employees;
    } catch (error) {
      console.error('Error fetching active employees:', {
        message: error.message,
        stack: error.stack,
      });
      return thunkAPI.rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

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
        console.log('fetchAllEmployees pending');
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllEmployees.fulfilled, (state, action) => {
        console.log('fetchAllEmployees fulfilled:', action.payload);
        state.loading = false;
        state.activeEmployees = action.payload;
      })
      .addCase(fetchAllEmployees.rejected, (state, action) => {
        console.log('fetchAllEmployees rejected:', action.payload);
        state.loading = false;
        state.error = action.payload || 'Failed to fetch employees';
      });
  },
});

// --- Active Sources Slice ---
export const fetchAllSources = createAsyncThunk(
  'activeSource/fetchAll',
  async (_, thunkAPI) => {
    try {
      console.log('Fetching active sources...');
      const sources = await getActiveSources();
      console.log('Active sources fetched:', sources);
      return sources;
    } catch (error) {
      console.error('Error fetching active sources:', {
        message: error.message,
        stack: error.stack,
      });
      return thunkAPI.rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

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
        console.log('fetchAllSources pending');
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSources.fulfilled, (state, action) => {
        console.log('fetchAllSources fulfilled:', action.payload);
        state.loading = false;
        state.activeSource = action.payload;
      })
      .addCase(fetchAllSources.rejected, (state, action) => {
        console.log('fetchAllSources rejected:', action.payload);
        state.loading = false;
        state.error = action.payload || 'Failed to fetch sources';
      });
  },
});

// --- Active Statuses Slice ---
export const fetchActiveStatuses = createAsyncThunk(
  'activeStatuses/fetchAll',
  async (_, thunkAPI) => {
    try {
      console.log('Fetching active statuses...');
      const statuses = await getActiveStatuses();
      console.log('Active statuses fetched:', statuses);
      return statuses;
    } catch (error) {
      console.error('Error fetching active statuses:', {
        message: error.message,
        stack: error.stack,
      });
      return thunkAPI.rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

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
        console.log('fetchActiveStatuses pending');
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActiveStatuses.fulfilled, (state, action) => {
        console.log('fetchActiveStatuses fulfilled:', action.payload);
        state.loading = false;
        state.statuses = action.payload;
      })
      .addCase(fetchActiveStatuses.rejected, (state, action) => {
        console.log('fetchActiveStatuses rejected:', action.payload);
        state.loading = false;
        state.error = action.payload || 'Failed to fetch statuses';
      });
  },
});

// --- All Branches Slice ---
export const fetchAllBranchesAll = createAsyncThunk(
  'branches/fetchAll',
  async (_, thunkAPI) => {
    try {
      const branches = await getAllBranch();
      return branches;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

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

// --- All Contacts Slice ---
export const fetchAllContacts = createAsyncThunk(
  'contact/fetchAllContacts',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Fetching all contacts...');
      const response = await getAllContacts();
      console.log('✅ Contacts API Response:', response);
      return response;
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

// --- All Employees Slice ---
export const fetchAllEmployeesAll = createAsyncThunk(
  'employees/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllEmployees();
      console.log('fetchAllEmployees payload:', data);
      return data;
    } catch (error) {
      console.log('fetchAllEmployees error:', error);
      return rejectWithValue(error);
    }
  }
);

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

// --- All Leads Slice ---
export const fetchAllLeads = createAsyncThunk(
  'leads/fetchAll',
  async ({ filters = {}, page = 1, refresh = false, limit = 50 }, thunkAPI) => {
    try {
      const response = await getAllLeads(filters, page, limit);
      return { ...response.data, refresh };
    } catch (error) {
      return thunkAPI.rejectWithValue(error || 'Failed to fetch leads');
    }
  }
);

const getAllLeadsSlice = createSlice({
  name: 'leads',
  initialState: {
    formattedLeads: [],
    totalPages: 1,
    currentPage: 1,
    totalLeads: 0,
    hasMore: false,
    loading: false,
    error: null,
  },
  reducers: {
    resetLeadsState: (state) => {
      state.formattedLeads = [];
      state.totalPages = 1;
      state.currentPage = 1;
      state.totalLeads = 0;
      state.hasMore = false;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllLeads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllLeads.fulfilled, (state, action) => {
        state.loading = false;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.totalLeads = action.payload.totalLeads;
        state.hasMore = action.payload.hasMore;
        if (action.payload.refresh) {
          state.formattedLeads = action.payload.formattedLeads;
        } else {
          state.formattedLeads = [
            ...state.formattedLeads,
            ...action.payload.formattedLeads,
          ];
        }
      })
      .addCase(fetchAllLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch leads';
      });
  },
});

export const { resetLeadsState } = getAllLeadsSlice.actions;

// --- All Lead Statuses Slice ---
export const fetchAllLeadStatuses = createAsyncThunk(
  'leadStatus/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllStatus();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

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

// --- Search Contacts Slice ---
export const fetchSearchContacts = createAsyncThunk(
  'searchContact/fetchSearchContacts',
  async (searchTerm, { rejectWithValue }) => {
    try {
      const data = await getAllSearchContact(searchTerm);
      console.log('Thunk received data:', data);
      return data.data.contacts;
    } catch (error) {
      console.error('Thunk error:', error);
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

// --- Call History Slice ---
export const fetchCallHistory = createAsyncThunk(
  'callHistory/fetch',
  async ({ employeeId, page = 1, limit = 10 }, thunkAPI) => {
    try {
      const data = await getCallHistory(employeeId, page, limit);
      console.log('✅ Thunk Received Call History Data:', data);
      if (!Array.isArray(data.data)) {
        console.warn('⚠️ Thunk: Expected data.data to be an array, got:', data.data);
        throw new Error('Invalid API response: data is not an array');
      }
      return data;
    } catch (error) {
      console.error('❌ Thunk Error:', error);
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch call history');
    }
  }
);

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

export const { resetCallHistory } = callHistorySlice.actions;

// --- Dial Report Slice ---
export const fetchDialReport = createAsyncThunk(
  'dialReport/fetch',
  async (payload, thunkAPI) => {
    try {
      console.log('Fetching dial report with payload:', payload);
      const response = await getDialReport(payload);
      console.log('Dial report fetched successfully:', response);
      return response;
    } catch (error) {
      console.error('Error fetching dial report:', {
        message: error.message,
        stack: error.stack,
      });
      return thunkAPI.rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

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
        console.log('fetchDialReport pending');
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchDialReport.fulfilled, (state, action) => {
        console.log('fetchDialReport fulfilled:', action.payload);
        state.loading = false;
        state.cardData = action.payload.cardData;
        state.tableData = action.payload.tableData;
        state.success = true;
      })
      .addCase(fetchDialReport.rejected, (state, action) => {
        console.log('fetchDialReport rejected:', action.payload);
        state.loading = false;
        state.error = action.payload || 'Failed to fetch dial report';
        state.success = false;
      });
  },
});

export const { resetDialReportState } = dialReportSlice.actions;

// --- Dynamic Source Counts Slice ---
export const fetchDynamicSourceCounts = createAsyncThunk(
  'dynamicSourceCounts/fetchDynamicSourceCounts',
  async (_, { rejectWithValue }) => {
    try {
      const orgId = await AsyncStorage.getItem('orgId');
      if (!orgId) {
        return rejectWithValue('Organization UUID not found in storage');
      }
      const data = await getDynamicSourceCounts();
      if (data.error) {
        return rejectWithValue(data.error);
      }
      return data.data.sourceDetails;
    } catch (error) {
      console.error('❌ Error in fetchDynamicSourceCounts:', error);
      return rejectWithValue(error.message || 'Failed to load dynamic source counts');
    }
  }
);

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

// --- Dynamic Status Counts Slice ---
export const fetchDynamicStatusCounts = createAsyncThunk(
  'dynamicStatus/fetchDynamicStatusCounts',
  async (_, { rejectWithValue }) => {
    try {
      const orgId = await AsyncStorage.getItem('orgId');
      if (!orgId) {
        return rejectWithValue('Organization UUID not found in storage');
      }
      const data = await getDynamicStatusCounts();
      if (data.error) {
        return rejectWithValue(data.error);
      }
      return data.data.statusDetails;
    } catch (error) {
      console.error('❌ Error in fetchDynamicStatusCounts:', error);
      return rejectWithValue(error.message || 'Failed to load dynamic status counts');
    }
  }
);

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

// --- Employee By ID Slice ---
export const fetchEmployeeById = createAsyncThunk(
  'employee/fetchEmployeeById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await getEmployeeById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error || 'Failed to fetch employee');
    }
  }
);

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

export const { clearEmployee } = employeeSlice.actions;

// --- Lead Activity Slice ---
export const fetchLeadActivity = createAsyncThunk(
  'leadActivity/fetch',
  async (leadId, thunkAPI) => {
    try {
      const data = await getLeadActivity(leadId);
      console.log('✅ Thunk Received Data:', data);
      if (!Array.isArray(data)) {
        throw new Error('Expected an array of lead activity data');
      }
      return data;
    } catch (error) {
      console.error('❌ Thunk Error:', error);
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch lead activity');
    }
  }
);

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

// --- Lead By ID Slice ---
export const fetchLeadById = createAsyncThunk(
  'lead/fetchLeadById',
  async (leadId, { rejectWithValue }, options = {}) => {
    try {
      if (!leadId || !/^[0-9a-fA-F]{24}$/.test(leadId)) {
        throw new Error('Invalid or missing leadId');
      }
      console.log(`Fetching lead for leadId: ${leadId} with options:`, JSON.stringify(options, null, 2));
      const response = await getLeadById(leadId, options);
      console.log('✅ Full Lead API Response:', JSON.stringify(response, null, 2));
      return response;
    } catch (error) {
      console.error('❌ Error fetching lead:', JSON.stringify(error, null, 2));
      const errorPayload = {
        message: error.message || 'Failed to fetch lead',
        status: error.response?.status || 'error',
        data: error.response?.data || {},
      };
      return rejectWithValue(errorPayload);
    }
  }
);

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
        console.log('Pending: Fetching lead...');
      })
      .addCase(fetchLeadById.fulfilled, (state, action) => {
        state.loading = false;
        state.lead = action.payload;
        if (!action.payload?.data?.status) {
          console.warn('Lead status missing, setting default');
          state.lead.data = { ...action.payload.data, status: 'unknown' };
        }
        console.log('Fulfilled: Lead fetched:', JSON.stringify(action.payload, null, 2));
      })
      .addCase(fetchLeadById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error('Rejected: Error fetching lead:', JSON.stringify(action.payload, null, 2));
      });
  },
});

export const { resetLeadByIdState } = getLeadByIdSlice.actions;

// --- Lead Follow Ups Slice ---
export const fetchLeadFollowUps = createAsyncThunk(
  'followUps/fetchAll',
  async (leadId, { rejectWithValue }) => {
    try {
      console.log(`getLeadFollowUpsSlice: Fetching follow ups for leadId ${leadId}`);
      const response = await getLeadFollowUps(leadId);
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
      console.error(`getLeadFollowUpsSlice: API Error for leadId ${leadId}:`, error);
      return rejectWithValue(error.message || 'Failed to fetch follow ups');
    }
  }
);

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
      AsyncStorage.removeItem('cachedFollowUps').catch((err) =>
        console.error('getLeadFollowUpsSlice: Error clearing cached follow ups:', err)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeadFollowUps.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log('getLeadFollowUpsSlice: Pending fetch for leadId');
      })
      .addCase(fetchLeadFollowUps.fulfilled, (state, action) => {
        state.loading = false;
        state.followUps = action.payload.followUps;
        state.totalFollowUps = action.payload.totalFollowUps;
        AsyncStorage.setItem('cachedFollowUps', JSON.stringify(state.followUps)).catch((err) =>
          console.error('getLeadFollowUpsSlice: Error caching follow ups:', err)
        );
        console.log('getLeadFollowUpsSlice: Follow ups fetched', {
          totalFollowUps: state.totalFollowUps,
          followUpsCount: state.followUps.length,
        });
      })
      .addCase(fetchLeadFollowUps.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
        console.error('getLeadFollowUpsSlice: Fetch failed:', {
          error: action.payload,
          state: state,
        });
      });
  },
});

export const { resetFollowUpsState } = getLeadFollowUpsSlice.actions;

// --- Lead Status By ID Slice ---
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
      return response;
    } catch (error) {
      console.error('API Error:', error.message || error);
      return rejectWithValue(error.message || 'Failed to fetch lead status');
    }
  }
);

const log = process.env.NODE_ENV === 'development' ? console.log : () => {};

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
        state.data = action.payload;
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

// --- Main Dashboard Slice ---
export const fetchMainDashboardCards = createAsyncThunk(
  'dashboard/fetchMainDashboardCards',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getMainDashboard();
      return data.data;
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

// --- Performance Report Slice ---
export const fetchPerformanceReport = createAsyncThunk(
  'performanceReport/fetch',
  async ({ search, dateFilter, startDate, endDate } = {}, thunkAPI) => {
    try {
      const data = await getPerformanceReport({ search, dateFilter, startDate, endDate });
      console.log('✅ Thunk Received Data:', data);
      if (!Array.isArray(data)) {
        throw new Error('Expected an array of performance data');
      }
      return data;
    } catch (error) {
      console.error('❌ Thunk Error:', error);
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch performance report');
    }
  }
);

const performanceReportSlice = createSlice({
  name: 'performanceReport',
  initialState: {
    performanceReport: [],
    loading: false,
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

// --- Login Slice ---
export const userLogin = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await logInUser(email, password);
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
      const expiresAt = response.expiresAt || Date.now() + (response.expiresIn ? response.expiresIn * 1000 : 24 * 60 * 60 * 1000);
      await AsyncStorage.setItem('authToken', token);
      await AsyncStorage.setItem('tokenExpiresAt', expiresAt.toString());
      await AsyncStorage.setItem('permissionList', JSON.stringify(permissions));
      await AsyncStorage.setItem('categoryId', categoryId);
      await AsyncStorage.setItem('orgId', orgId);
      await AsyncStorage.setItem('organizationName', organizationName);
      await AsyncStorage.setItem('systemUserId', systemUserId);
      await AsyncStorage.setItem('empId', empId);
      console.log('📦 Stored in AsyncStorage:', {
        authToken: await AsyncStorage.getItem('authToken'),
        tokenExpiresAt: await AsyncStorage.getItem('tokenExpiresAt'),
        orgId: await AsyncStorage.getItem('orgId'),
      });
      return { ...response, expiresAt };
    } catch (error) {
      console.error('❌ Error in userLogin:', error.message);
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

const logInSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    orgId: null,
    expiresAt: null,
    loading: false,
    error: null,
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
      });
  },
});

const persistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['token', 'orgId', 'user', 'expiresAt'],
};

// --- Post Feedback Slice ---
export const postFeedback = createAsyncThunk(
  'feedback/postFeedback',
  async (feedbackData, { rejectWithValue }) => {
    console.log('Dispatching postFeedback with:', JSON.stringify(feedbackData, null, 2));
    try {
      return await postFeedbackApi(feedbackData);
    } catch (error) {
      console.error('postFeedback error:', JSON.stringify(error, null, 2));
      return rejectWithValue(error || 'Something went wrong');
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
        state.loading = true;
        state.error = null;
      })
      .addCase(postFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(postFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export const { resetFeedbackState } = postFeedbackSlice.actions;

// --- Search Leads By Follow Up Date Slice ---
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

// --- Update Contact Slice ---
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

// --- Update Lead Slice ---
export const updateLeadAsync = createAsyncThunk(
  'lead/updateLead',
  async ({ leadId, leadData, postUpdatedLead }, { rejectWithValue }) => {
    try {
      console.log(`updateLeadSlice: Updating lead for leadId ${leadId}`, leadData, `postUpdatedLead: ${postUpdatedLead}`);
      if (!updateLeadApi) {
        throw new Error('updateLeadApi is not defined');
      }
      const updatedLead = await updateLeadApi(leadId, leadData, postUpdatedLead);
      console.log(`updateLeadSlice: Update response for leadId ${leadId}`, updatedLead);
      return updatedLead;
    } catch (error) {
      console.error(`updateLeadSlice: Error updating lead for leadId ${leadId}:`, error);
      return rejectWithValue(error.message || 'Failed to update lead');
    }
  }
);

const updateLeadSlice = createSlice({
  name: 'lead',
  initialState: {
    lead: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateLeadAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log('updateLeadSlice: Pending update for lead');
      })
      .addCase(updateLeadAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.lead = action.payload;
        console.log('updateLeadSlice: Lead updated successfully', action.payload);
      })
      .addCase(updateLeadAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update lead';
        console.error('updateLeadSlice: Update failed:', action.payload);
      });
  },
});

// Export all reducers
export const persistedAuthReducer = persistReducer(persistConfig, logInSlice.reducer);
export const dialLeadReducer = dialLeadSlice.reducer;
export const addLeadReducer = addLeadSlice.reducer;
export const bulkAssignLeadsReducer = bulkAssignLeadsSlice.reducer;
export const employeeImageReducer = employeeImageSlice.reducer;
export const activeBranchesReducer = getActiveBranchesSlice.reducer;
export const activeEmployeesReducer = getActiveEmployeesSlice.reducer;
export const activeSourceReducer = getActiveSourceSlice.reducer;
export const activeStatusReducer = getActiveStatusSlice.reducer;
export const allBranchesReducer = getAllBranchSlice.reducer;
export const allContactsReducer = getAllContactSlice.reducer;
export const allEmployeesReducer = getAllEmployeesSlice.reducer;
export const allLeadsReducer = getAllLeadsSlice.reducer;
export const allLeadStatusesReducer = getAllStatusSlice.reducer;
export const searchContactReducer = searchContactSlice.reducer;
export const callHistoryReducer = callHistorySlice.reducer;
export const dialReportReducer = dialReportSlice.reducer;
export const dynamicSourceCountsReducer = getDynamicSourceCountsSlice.reducer;
export const dynamicStatusCountsReducer = getDynamicStatusCountsSlice.reducer;
export const employeeByIdReducer = employeeSlice.reducer;
export const leadActivityReducer = leadActivitySlice.reducer;
export const leadByIdReducer = getLeadByIdSlice.reducer;
export const leadFollowUpsReducer = getLeadFollowUpsSlice.reducer;
export const leadStatusByIdReducer = getLeadStatusByIdSlice.reducer;
export const mainDashboardReducer = getMainDashboardSlice.reducer;
export const performanceReportReducer = performanceReportSlice.reducer;
export const postFeedbackReducer = postFeedbackSlice.reducer;
export const searchLeadsByFollowUpDateReducer = searchLeadsByFollowUpDateSlice.reducer;
export const updateContactReducer = updateContactSlice.reducer;
export const updateLeadReducer = updateLeadSlice.reducer;