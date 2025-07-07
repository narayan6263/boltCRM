
// import { configureStore } from '@reduxjs/toolkit';
// import loginReducer from './slices/logInSlice';
// import logoutReducer from './slices/logoutSlice'; // Ensure correct path
// import addLeadReducer from './slices/addLeadSlice';
// import branchesReducer from './slices/getAllBranchSlice';
// import contactsReducer from './slices/getAllContactSlice';
// import activeSourceReducer from './slices/getActiveSourceSlice';
// import employeesReducer from './slices/getAllEmployeeSlice';
// import leadsReducer from './slices/getAllLeadSlice';
// import leadStatusReducer from './slices/getAllLeadStatusSlice';
// import leadStatusByIdReducer from './slices/getLeadStatusByIdSlice';
// import contactByIdReducer from './slices/getContactByIdSlice';
// import searchContactReducer from './slices/getAllSearchContact';
// import postFeedbackReducer from './slices/postFeedbackSlice';
// import getMainDashboardReducer from './slices/getMainDashboardSlice';
// import getDynamicStatusCountsReducer from './slices/getDynamicStatusCountsSlice';
// import dynamicSourceCountsReducer from './slices/getDynamicSourceCountsSlice';
// import followUpsReducer from './slices/getLeadFollowUpsSlice';
// import updateLeadReducer from './slices/updateLeadSlice';
// import updateContactReducer from './slices/updateContactSlice';
// import getLeadByIdReducer from './slices/getLeadByIdSlice';
// import searchLeadsByFollowUpDateReducer from './slices/SearchLeadsByFollowUpDateSlice';
// import activeEmployeesReducer from './slices/getActiveEmployeesSlice';
// import activeBranchesReducer from './slices/getActiveBranchesSlice';
// import activeStatusesReducer from './slices/getActiveStatusesSlice';
// import employeeReducer from './slices/getEmployeeByIdSlice';
// import performanceReportReducer from './slices/getPerformanceReportSlice';
// import leadActivityReducer from './slices/getLeadActivitySlice';
// import bulkAssignLeadsReducer from './slices/bulkAssignLeadsSlice';
// import callHistoryReducer from './slices/getCallHistorySlice';
// import dialReportReducer from './slices/getDialReportSlice';
// import employeeImageReducer from './slices/employeeImageSlice';
// import addLeadDialReducer from './slices/addLeadDialSlice';
// import getDecryptInfoReducer from './slices/getDecryptInfoSlice';
//  // Adjust the path to your slice
//  import { reducers } from './slices/index'; // Adjust path to your common slice file

// const store = configureStore({
//   reducer: {
//     // auth: loginReducer,
//         auth: reducers.auth,
    
//     // auth: logoutReducer, // Single reducer for auth (logout and any future login) // Consider merging login and logout if appropriate
//     // logout: logoutReducer, // Add this line
//     addLead: addLeadReducer,
//     branches: branchesReducer,
//     contacts: contactsReducer,
//     activeSource: activeSourceReducer,
//     employees: employeesReducer,
//     leads: leadsReducer,
//     leadStatus: leadStatusReducer,
//     leadStatusById: leadStatusByIdReducer,
//     contactById: contactByIdReducer,
//     searchContact: searchContactReducer,
//     postFeedback: postFeedbackReducer,
//     dashboard: reducers.dashboard,
//     dynamicStatus: getDynamicStatusCountsReducer,
//     dynamicSourceCounts: dynamicSourceCountsReducer,
//     followUps: followUpsReducer,
//     updateLead: updateLeadReducer,
//     updateContact: updateContactReducer,
//     getLeadById: getLeadByIdReducer,
//     searchLeadsByFollowUpDate: searchLeadsByFollowUpDateReducer,
//     activeEmployees: activeEmployeesReducer,
//     activeBranches: activeBranchesReducer,
//     activeStatuses: activeStatusesReducer,
//     employee: employeeReducer,
//     performanceReport: performanceReportReducer,
//     leadActivity: leadActivityReducer,
//     bulkAssignLeads: bulkAssignLeadsReducer,
//     callHistory: callHistoryReducer,
//     dialReport: dialReportReducer,
//     employeeImage: employeeImageReducer,
//     dialLead: addLeadDialReducer,
//     decryptInfo: getDecryptInfoReducer,
//   },
// });

// export default store;

// import { configureStore } from '@reduxjs/toolkit';
// import { reducers } from './index'; // Adjust path to your common slice file

// const store = configureStore({
//   reducer: {
//     auth: reducers.auth,
//     addLead: reducers.addLead,
//     branches: reducers.branches,
//     contacts: reducers.contact,
//     activeSource: reducers.activeSource,
//     employees: reducers.employees,
//     leads: reducers.leads,
//     leadStatus: reducers.leadStatus,
//     leadStatusById: reducers.leadStatusById,
//     contactById: reducers.contactById,
//     searchContact: reducers.searchContact,
//     postFeedback: reducers.postFeedback,
//     dashboard: reducers.dashboard,
//     dynamicStatus: reducers.dynamicStatus,
//     dynamicSourceCounts: reducers.dynamicSourceCounts,
//     followUps: reducers.followUps,
//     updateLead: reducers.updateLead,
//     updateContact: reducers.updateContact,
//     getLeadById: reducers.getLeadById,
//     searchLeadsByFollowUpDate: reducers.searchLeadsByFollowUp,
//     activeEmployees: reducers.activeEmployees,
//     activeBranches: reducers.activeBranches,
//     activeStatuses: reducers.activeStatuses,
//     employee: reducers.employee,
//     performanceReport: reducers.performanceReport,
//     leadActivity: reducers.leadActivity,
//     bulkAssignLeads: reducers.bulkAssignLeads,
//     callHistory: reducers.callHistory,
//     dialReport: reducers.dialReport,
//     employeeImage: reducers.employeeImage,
//     dialLead: reducers.dialLead,
//     decryptInfo: reducers.decryptInfo,
//   },
// });

// export default store;
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { reducers } from './index'; // Adjust path to your common slice file

// Persist configuration is already applied in index.js for auth slice, but we need to set up persistor
const store = configureStore({
  reducer: {
    auth: reducers.auth, // Persisted reducer
    addLead: reducers.addLead,
    branches: reducers.branches,
    contacts: reducers.contact, // Note: 'contacts' key maps to 'contact' reducer
    activeSource: reducers.activeSource,
    employees: reducers.employees,
    leads: reducers.leads,
    leadStatus: reducers.leadStatus,
    leadStatusById: reducers.leadStatusById,
    contactById: reducers.contactById,
    searchContact: reducers.searchContact,
    postFeedback: reducers.postFeedback,
    dashboard: reducers.dashboard,
    dynamicStatus: reducers.dynamicStatus,
    dynamicSourceCounts: reducers.dynamicSourceCounts,
    followUps: reducers.followUps,
    updateLead: reducers.updateLead,
    updateContact: reducers.updateContact,
    getLeadById: reducers.getLeadById,
    searchLeadsByFollowUpDate: reducers.searchLeadsByFollowUpDate, // Corrected from searchLeadsByFollowUp
    activeEmployees: reducers.activeEmployees,
    activeBranches: reducers.activeBranches,
    activeStatuses: reducers.activeStatuses,
    employee: reducers.employee,
    performanceReport: reducers.performanceReport,
    leadActivity: reducers.leadActivity,
    bulkAssignLeads: reducers.bulkAssignLeads,
    callHistory: reducers.callHistory,
    dialReport: reducers.dialReport,
    employeeImage: reducers.employeeImage,
    
    dialLead: reducers.dialLead,
    decryptInfo: reducers.decryptInfo,
  },
 
});



export default store;