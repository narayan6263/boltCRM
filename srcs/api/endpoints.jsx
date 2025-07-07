// src/api/endpoints.js
export const ENDPOINTS = {
  // Authentication
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logOut',

  // Lead Management
  ADD_LEAD: '/lead/addLead',
  ADD_LEAD_DIAL: '/lead/addLead', // Same endpoint as addLead
  BULK_ASSIGN_LEADS: '/lead/bulkAssignLeads',
  GET_ALL_LEADS: '/lead/getAllLeads',
  GET_LEAD_BY_ID: (leadId) => `/lead/getLeadById/${leadId}`,
  UPDATE_LEAD: (leadId) => `/lead/updateLead/${leadId}`,
  GET_LEAD_ACTIVITY: (leadId) => `/lead/getLeadActivities/${leadId}`,
  GET_LEAD_FOLLOW_UPS: (leadId) => `/lead/getFollowUps/${leadId}`,
  GET_LEAD_STATUS_BY_ID: (id) => `/lead/getLeadStatusById/${id}`,
  ADD_FOLLOW_UP: '/lead/addFollowUp',
  UPLOAD_RECORDING: '/lead/uploadRecording',
  SEARCH_LEADS_BY_FOLLOW_UP: '/dashBoard/searchLeadsByFollowUpDate',

  // Contact Management
  GET_ALL_CONTACTS: '/lead/getAllContacts',
  SEARCH_CONTACTS: '/lead/searchContacts',
  GET_CONTACT_BY_ID: (contactId) => `/lead/getContactById/${contactId}`,
  UPDATE_CONTACT: (contactId) => `/lead/updateContact/${contactId}`,
  DECRYPT_INFO: (contactId) => `/lead/getDecryptInfo/${contactId}`,

  // Employee Management
  GET_ACTIVE_EMPLOYEES: '/employee/getActiveEmployees',
  GET_ALL_EMPLOYEES: '/employee/getAllEmployees',
  GET_EMPLOYEE_BY_ID: (id) => `/employee/getEmployeeById/${id}`,
  UPLOAD_EMPLOYEE_IMAGE: (employeeId) => `/employee/employeeImg/${employeeId}`,

  // Branch Management
  GET_ACTIVE_BRANCHES: '/organization/getActiveBranchs',
  GET_ALL_BRANCHES: '/organization/getAllBranch',

  // Source and Status
  GET_ACTIVE_SOURCES: '/lead/getActiveSources',
  GET_ACTIVE_STATUSES: '/lead/getActiveLeadStatuses',
  GET_ALL_STATUSES: '/lead/getAllLeadStatuses',
  GET_DYNAMIC_SOURCE_COUNTS: '/dashBoard/getDynamicSourceCounts',
  GET_DYNAMIC_STATUS_COUNTS: '/dashBoard/getDynamicStatusCounts',

  // Call History
  GET_CALL_HISTORY: '/dashBoard/getCallHistory',

  // Reports
  GET_DIAL_REPORT: '/dashBoard/getDialUpReport',
  GET_PERFORMANCE_REPORT: '/dashBoard/getPerformanceReport',

  // Dashboard
  GET_MAIN_DASHBOARD: '/dashBoard/mainDashBoardCards',
};