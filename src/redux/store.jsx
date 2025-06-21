
import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './slices/logInSlice';
import logoutReducer from './slices/logoutSlice'; // Ensure correct path
import addLeadReducer from './slices/addLeadSlice';
import branchesReducer from './slices/getAllBranchSlice';
import contactsReducer from './slices/getAllContactSlice';
import activeSourceReducer from './slices/getActiveSourceSlice';
import employeesReducer from './slices/getAllEmployeeSlice';
import leadsReducer from './slices/getAllLeadSlice';
import leadStatusReducer from './slices/getAllLeadStatusSlice';
import leadStatusByIdReducer from './slices/getLeadStatusByIdSlice';
import contactByIdReducer from './slices/getContactByIdSlice';
import searchContactReducer from './slices/getAllSearchContact';
import postFeedbackReducer from './slices/postFeedbackSlice';
import getMainDashboardReducer from './slices/getMainDashboardSlice';
import getDynamicStatusCountsReducer from './slices/getDynamicStatusCountsSlice';
import dynamicSourceCountsReducer from './slices/getDynamicSourceCountsSlice';
import followUpsReducer from './slices/getLeadFollowUpsSlice';
import updateLeadReducer from './slices/updateLeadSlice';
import updateContactReducer from './slices/updateContactSlice';
import getLeadByIdReducer from './slices/getLeadByIdSlice';
import searchLeadsByFollowUpDateReducer from './slices/SearchLeadsByFollowUpDateSlice';
import activeEmployeesReducer from './slices/getActiveEmployeesSlice';
import activeBranchesReducer from './slices/getActiveBranchesSlice';
import activeStatusesReducer from './slices/getActiveStatusesSlice';
import employeeReducer from './slices/getEmployeeByIdSlice';
import performanceReportReducer from './slices/getPerformanceReportSlice';
import leadActivityReducer from './slices/getLeadActivitySlice';
import bulkAssignLeadsReducer from './slices/bulkAssignLeadsSlice';
import callHistoryReducer from './slices/getCallHistorySlice';
import dialReportReducer from './slices/getDialReportSlice';
import employeeImageReducer from './slices/employeeImageSlice';
import addLeadDialReducer from './slices/addLeadDialSlice';
import getDecryptInfoReducer from './slices/getDecryptInfoSlice'; // Adjust the path to your slice
const store = configureStore({
  reducer: {
    auth: loginReducer,
    auth: logoutReducer, // Single reducer for auth (logout and any future login) // Consider merging login and logout if appropriate
    // logout: logoutReducer, // Add this line
    addLead: addLeadReducer,
    branches: branchesReducer,
    contacts: contactsReducer,
    activeSource: activeSourceReducer,
    employees: employeesReducer,
    leads: leadsReducer,
    leadStatus: leadStatusReducer,
    leadStatusById: leadStatusByIdReducer,
    contactById: contactByIdReducer,
    searchContact: searchContactReducer,
    postFeedback: postFeedbackReducer,
    dashboard: getMainDashboardReducer,
    dynamicStatus: getDynamicStatusCountsReducer,
    dynamicSourceCounts: dynamicSourceCountsReducer,
    followUps: followUpsReducer,
    updateLead: updateLeadReducer,
    updateContact: updateContactReducer,
    getLeadById: getLeadByIdReducer,
    searchLeadsByFollowUpDate: searchLeadsByFollowUpDateReducer,
    activeEmployees: activeEmployeesReducer,
    activeBranches: activeBranchesReducer,
    activeStatuses: activeStatusesReducer,
    employee: employeeReducer,
    performanceReport: performanceReportReducer,
    leadActivity: leadActivityReducer,
    bulkAssignLeads: bulkAssignLeadsReducer,
    callHistory: callHistoryReducer,
    dialReport: dialReportReducer,
    employeeImage: employeeImageReducer,
    dialLead: addLeadDialReducer,
    decryptInfo: getDecryptInfoReducer,
  },
});

export default store;