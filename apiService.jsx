// src/api/apiService.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';
import apiClient from './apiClient';
import apiAuth from './apiAuth';
import { ENDPOINTS } from './endpoints';

// Helper function to validate MongoDB ObjectID
const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

// Helper function to validate dialUpMethod
const isValidDialUpMethod = (dialUpMethod) => {
  if (!dialUpMethod) return false;
  return (
    typeof dialUpMethod.phoneNumber === 'string' &&
    typeof dialUpMethod.callType === 'string' &&
    typeof dialUpMethod.callDuration === 'string' &&
    typeof dialUpMethod.formattedDuration === 'string' &&
    typeof dialUpMethod.callStatus === 'string' &&
    (dialUpMethod.recordedFile === null || typeof dialUpMethod.recordedFile === 'string') &&
    typeof dialUpMethod.callSid === 'string' &&
    typeof dialUpMethod.callStartDateTime === 'string' &&
    typeof dialUpMethod.callEndDateTime === 'string'
  );
};

export const apiService = {
  // Auth
  logInUser: async (email, password) => {
    try {
      const response = await apiAuth.post(ENDPOINTS.AUTH.LOGIN, {
        systemUserEmail: email,
        systemUserPassword: password,
      });
      console.log('🌐 Raw API Response:', response.data);
      if (response.status === 200 && response.data.token) {
        console.log('ye response he', response);
        console.log('ye response.data he ', response.data);
        return response.data;
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.log('❌ API Error:', error.response?.data || error);
      throw error.response?.data?.message || 'Login failed';
    }
  },

  logOutUser: async () => {
    try {
      const systemUserId = await AsyncStorage.getItem('systemUserId');
      console.log('🆔 systemUserId:', systemUserId, typeof systemUserId);
      if (!systemUserId) {
        throw new Error('No systemUserId found. Please log in again.');
      }
      const tokenExpiresAt = await AsyncStorage.getItem('tokenExpiresAt');
      if (tokenExpiresAt && Date.now() > parseInt(tokenExpiresAt)) {
        throw new Error('Token expired. Please log in again.');
      }
      const response = await apiClient.post(
        ENDPOINTS.AUTH.LOGOUT,
        { userId: systemUserId },
        { headers: { userId: systemUserId } }
      );
      console.log('🌐 Logout API Response:', response.data);
      if (response.status === 200) {
        await Promise.all([
          AsyncStorage.removeItem('authToken'),
          AsyncStorage.removeItem('tokenExpiresAt'),
          AsyncStorage.removeItem('permissionList'),
          AsyncStorage.removeItem('categoryId'),
          AsyncStorage.removeItem('orgId'),
          AsyncStorage.removeItem('organizationName'),
          AsyncStorage.removeItem('empId'),
          AsyncStorage.removeItem('systemUserId'),
        ]);
        console.log('🧹 AsyncStorage cleared after logout');
        return response.data;
      } else {
        throw new Error(`Logout failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error('❌ Logout API Error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers,
      });
      throw new Error(
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Logout failed due to an unexpected error'
      );
    }
  },

  // Lead
  addLead: async (formData) => {
    console.log('addLead called with formData:', formData);
    try {
      const orgIdStored = await AsyncStorage.getItem('orgId');
      console.log('Stored orgId:', orgIdStored);
      if (formData.contactId && !isValidObjectId(formData.contactId)) {
        console.log('Invalid contactId:', formData.contactId);
        throw new Error('Invalid contactId: Must be a valid ObjectId');
      }
      if (!formData.contactId && !formData.name) {
        console.log('Missing name:', formData.name);
        throw new Error('A name is required when no contact is selected');
      }
      if (!formData.organizationId && !orgIdStored) {
        console.log('Missing organizationId');
        throw new Error('Organization ID is required');
      }
      if (!formData.assignedTo || !isValidObjectId(formData.assignedTo)) {
        console.log('Invalid or missing assignedTo:', formData.assignedTo);
        throw new Error('A valid employee ID is required for assignedTo');
      }
      const leadPayload = {
        branch: formData.branch || '',
        source: formData.source || '',
        priority: formData.priority || '',
        reference: formData.reference || '',
        description: formData.description || '',
        model: formData.model || '',
        assignedTo: formData.assignedTo || '',
        organizationId: formData.organizationId || orgIdStored || '',
        ...(formData.contactId
          ? { contactId: formData.contactId }
          : {
              name: formData.name || '',
              email: formData.email || '',
              phone: formData.phone || '',
            }),
      };
      if (formData.status && isValidObjectId(formData.status)) {
        console.log('Including status and statusData:', { status: formData.status, statusData: formData.statusData });
        leadPayload.status = formData.status;
        leadPayload.statusData = {
          contactDate: formData.statusData?.contactDate || '',
          nextFollowUpDate: formData.statusData?.nextFollowUpDate || '',
          nextFollowUpTime: formData.statusData?.nextFollowUpTime || '',
          estimationDate: formData.statusData?.estimationDate || '',
          estimationBudget: formData.statusData?.estimationBudget || 0,
          description: formData.statusData?.description || '',
          status: formData.status,
        };
        if (formData.statusData?.priority || formData.priority) {
          leadPayload.statusData.priority = formData.statusData?.priority || formData.priority;
        }
      } else {
        console.log('Excluding status and statusData');
      }
      console.log('Submitting leadPayload:', leadPayload);
      const response = await apiClient.post(ENDPOINTS.LEAD.ADD_LEAD, leadPayload);
      console.log('✅ Lead Added:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error adding lead:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      if (error.response?.status === 409) {
        throw new Error('Contact with this email or phone already exists. Please use an existing contact or a different email/phone.');
      }
      throw error.response?.data?.message || error.message || 'Lead add failed';
    }
  },

  addLeadDial: async (formData) => {
    console.log('addLead called with formData:', JSON.stringify(formData, null, 2));
    try {
      const orgIdStored = await AsyncStorage.getItem('orgId');
      console.log('Stored orgId:', orgIdStored);
      if (formData.contactId && !isValidObjectId(formData.contactId)) {
        console.log('Invalid contactId:', formData.contactId);
        throw new Error('Invalid contactId: Must be a valid ObjectId');
      }
      if (!formData.contactId && !formData.name) {
        console.log('Missing name:', formData.name);
        throw new Error('A name is required when no contact is selected');
      }
      if (!formData.organizationId && !orgIdStored) {
        console.log('Missing organizationId');
        throw new Error('Organization ID is required');
      }
      if (!formData.assignedTo || !isValidObjectId(formData.assignedTo)) {
        console.log('Invalid or missing assignedTo:', formData.assignedTo);
        throw new Error('A valid employee ID is required for assignedTo');
      }
      if (formData.dialUpMethod && !isValidDialUpMethod(formData.dialUpMethod)) {
        console.log('Invalid dialUpMethod:', formData.dialUpMethod);
        throw new Error('Invalid dialUpMethod: Must contain valid fields');
      }
      const leadPayload = {
        branch: formData.branch || '',
        source: formData.source || '',
        priority: formData.priority || '',
        reference: formData.reference || '',
        description: formData.description || '',
        model: formData.model || '',
        assignedTo: formData.assignedTo || '',
        organizationId: formData.organizationId || orgIdStored || '',
        ...(formData.contactId
          ? { contactId: formData.contactId }
          : {
              name: formData.name || '',
              email: formData.email || '',
              phone: formData.phone || '',
            }),
        ...(formData.dialUpMethod
          ? {
              dialUpMethod: {
                phoneNumber: formData.dialUpMethod.phoneNumber || '',
                callType: formData.dialUpMethod.callType || 'Outgoing',
                callDuration: formData.dialUpMethod.callDuration || '0.00',
                formattedDuration: formData.dialUpMethod.formattedDuration || '00:00',
                callStatus: formData.dialUpMethod.callStatus || 'Rejected',
                recordedFile: formData.dialUpMethod.recordedFile || null,
                callSid: formData.dialUpMethod.callSid || '',
                callStartDateTime: formData.dialUpMethod.callStartDateTime || '',
                callEndDateTime: formData.dialUpMethod.callEndDateTime || '',
              },
            }
          : {}),
      };
      if (formData.status && isValidObjectId(formData.status)) {
        console.log('Including status and statusData:', {
          status: formData.status,
          statusData: formData.statusData,
        });
        leadPayload.status = formData.status;
        leadPayload.statusData = {
          contactDate: formData.statusData?.contactDate || '',
          nextFollowUpDate: formData.statusData?.nextFollowUpDate || '',
          nextFollowUpTime: formData.statusData?.nextFollowUpTime || '',
          estimationDate: formData.statusData?.estimationDate || '',
          estimationBudget: formData.statusData?.estimationBudget || 0,
          description: formData.statusData?.description || '',
          status: formData.status,
        };
        if (formData.statusData?.priority || formData.priority) {
          leadPayload.statusData.priority = formData.statusData?.priority || formData.priority;
        }
      } else {
        console.log('Excluding status and statusData');
      }
      console.log('Submitting leadPayload:', JSON.stringify(leadPayload, null, 2));
      const response = await apiClient.post(ENDPOINTS.LEAD.ADD_LEAD, leadPayload);
      console.log('✅ Lead Added:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error adding lead:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      if (error.response?.status === 409) {
        throw new Error('Contact with this email or phone already exists. Please use an existing contact or a different email/phone.');
      }
      throw error.response?.data?.message || error.message || 'Lead add failed';
    }
  },

  bulkAssignLeads: async (payload) => {
    try {
      const response = await apiClient.post(ENDPOINTS.LEAD.BULK_ASSIGN_LEADS, payload);
      console.log('✅ Bulk Assign Leads Success:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error assigning leads:', error.response?.data || error.message);
      throw error.response?.data?.message || 'Failed to assign leads';
    }
  },

  postFeedbackApi: async (feedbackData) => {
    console.log('postFeedbackApi called with:', JSON.stringify(feedbackData, null, 2));
    if (!feedbackData?.leadId || !isValidObjectId(feedbackData.leadId)) {
      console.error('Validation error: Invalid or missing leadId', { leadId: feedbackData?.leadId });
      throw new Error('Invalid or missing leadId');
    }
    if (!feedbackData?.status || !isValidObjectId(feedbackData.status)) {
      console.error('Validation error: Invalid or missing status', { status: feedbackData?.status });
      throw new Error('Invalid or missing status');
    }
    let recordedFileUrl = '';
    if (feedbackData.dialUpMethod?.recordedFile) {
      const fileExists = await RNFS.exists(feedbackData.dialUpMethod.recordedFile);
      if (fileExists) {
        const formData = new FormData();
        formData.append('recordedFile', {
          uri: feedbackData.dialUpMethod.recordedFile,
          type: 'audio/mp3',
          name: feedbackData.dialUpMethod.recordedFile.split('/').pop(),
        });
        try {
          const uploadResponse = await apiClient.post(ENDPOINTS.LEAD.UPLOAD_RECORDING, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          recordedFileUrl = uploadResponse.data.fileUrl;
          console.log('postFeedbackApi: File uploaded:', recordedFileUrl);
        } catch (error) {
          console.error('postFeedbackApi: File upload failed:', error);
          throw error;
        }
      }
    }
    const payload = {
      leadId: feedbackData.leadId,
      contactDate: feedbackData.contactDateTime || '',
      nextFollowUpDate: feedbackData.nextFollowUpDate || '',
      estimationDate: feedbackData.estimationDate || '',
      estimationBudget: feedbackData.estimationBudget || 0,
      priority: feedbackData.priority || 'Medium',
      method: feedbackData.method || 'Call',
      status: feedbackData.status,
      description: feedbackData.description || '',
      address: feedbackData.address || '',
      reason: feedbackData.reason || '',
      ...(feedbackData.dialUpMethod
        ? {
            dialUpMethod: {
              ...feedbackData.dialUpMethod,
              recordedFile: recordedFileUrl,
            },
          }
        : {}),
    };
    console.log('Constructed payload:', JSON.stringify(payload, null, 2));
    try {
      const response = await apiClient.post(ENDPOINTS.LEAD.ADD_FOLLOW_UP, payload);
      console.log('✅ Feedback posted:', JSON.stringify(response.data, null, 2));
      return response.data;
    } catch (error) {
      console.error('❌ Error posting feedback:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        payload: JSON.stringify(payload, null, 2),
      });
      throw error.response?.data || { message: error.message || 'Feedback post failed' };
    }
  },

  updateLeadApi: async (leadId, leadData, postUpdatedLead = false) => {
    console.log('updateLeadApi called with:', { leadId, leadData, postUpdatedLead });
    if (!leadId || !isValidObjectId(leadId)) {
      console.error('Validation error: Invalid or missing leadId', { leadId });
      throw new Error('Invalid or missing leadId');
    }
    if (!leadData?.source) {
      console.error('Validation error: Source is required', { leadData });
      throw new Error('Source is required');
    }
    if (!leadData?.priority || !['low', 'medium', 'high', 'important'].includes(leadData.priority.toLowerCase())) {
      console.error('Validation error: Invalid or missing priority', { priority: leadData?.priority });
      throw new Error('Priority must be one of: low, medium, high, important');
    }
    if (leadData?.comment && (typeof leadData.comment !== 'string' || leadData.comment.length > 500)) {
      console.error('Validation error: Invalid comment', { comment: leadData.comment });
      throw new Error('Comment must be a string with a maximum of 500 characters');
    }
    const payload = {
      source: leadData.source,
      description: leadData.description || '',
      reference: leadData.reference || '',
      model: leadData.model || '',
      priority: leadData.priority.toLowerCase(),
      comment: leadData.comment || '',
      branch: leadData.branch || '',
    };
    console.log('Constructed payload:', JSON.stringify(payload, null, 2));
    try {
      const response = await apiClient.put(
        `${ENDPOINTS.LEAD.UPDATE_LEAD(leadId)}${postUpdatedLead ? '?postUpdatedLead=true' : ''}`,
        payload
      );
      console.log('✅ Lead updated:', JSON.stringify(response.data, null, 2));
      return response.data.data;
    } catch (error) {
      console.error('❌ Error updating lead:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        payload: JSON.stringify(payload, null, 2),
      });
      throw error.response?.data || { message: error.message || 'Failed to update lead' };
    }
  },

  updateContactApi: async (contactId, contactData) => {
    console.log('updateContactApi called with:', { contactId, contactData });
    if (!contactId || !isValidObjectId(contactId)) {
      console.error('Validation error: Invalid or missing contactId', { contactId });
      throw new Error('Invalid or missing contactId');
    }
    if (!contactData?.name) {
      console.error('Validation error: Name is required', { contactData });
      throw new Error('Name is required');
    }
    if (!contactData?.phone || !/^\+?\d{10,15}$/.test(contactData.phone)) {
      console.error('Validation error: Invalid or missing phone', { phone: contactData?.phone });
      throw new Error('Invalid or missing phone number');
    }
    const payload = {
      name: contactData.name,
      email: contactData.email || '',
      phone: contactData.phone,
      address: {
        street: contactData.address?.street || '',
        city: contactData.address?.city || '',
        state: contactData.address?.state || '',
        country: contactData.address?.country || '',
      },
    };
    console.log('Constructed payload:', JSON.stringify(payload, null, 2));
    try {
      const response = await apiClient.put(ENDPOINTS.LEAD.UPDATE_CONTACT(contactId), payload);
      console.log('✅ Contact updated:', JSON.stringify(response.data, null, 2));
      return response.data;
    } catch (error) {
      console.error('❌ Error updating contact:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        payload: JSON.stringify(payload, null, 2),
      });
      throw error.response?.data || { message: error.message || 'Failed to update contact' };
    }
  },

  getAllLeads: async (filters = {}, page = 1, limit = 50) => {
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });
      const safeFilters = filters || {};
      if (safeFilters.search) queryParams.append('search', safeFilters.search);
      if (safeFilters.assignedTo) queryParams.append('assignedTo', safeFilters.assignedTo);
      if (safeFilters.organizationId) queryParams.append('organizationId', safeFilters.organizationId);
      if (safeFilters.source) queryParams.append('source', safeFilters.source);
      if (safeFilters.status) queryParams.append('status', safeFilters.status);
      if (safeFilters.country) queryParams.append('country', safeFilters.country);
      if (safeFilters.state) queryParams.append('state', safeFilters.state);
      if (safeFilters.city) queryParams.append('city', safeFilters.city);
      if (safeFilters.dateSearch) queryParams.append('dateSearch', safeFilters.dateSearch);
      const response = await apiClient.get(`${ENDPOINTS.LEAD.GET_ALL_LEADS}?${queryParams.toString()}`);
      const data = response.data?.data || response.data;
      console.log('✅ Fetched All Leads:', JSON.stringify(data, null, 2));
      return {
        data: {
          formattedLeads: data.formattedLeads || [],
          totalPages: data.totalPages || 1,
          currentPage: data.currentPage || page,
          totalLeads: data.totalLeads || 0,
          hasMore: data.currentPage < data.totalPages,
        },
      };
    } catch (error) {
      console.error('❌ Error fetching leads:', error.response?.data || error.message);
      throw error.response?.data?.message || 'Failed to fetch leads';
    }
  },

  getLeadById: async (leadId, options = {}) => {
    try {
      if (!/^[0-9a-fA-F]{24}$/.test(leadId)) {
        throw new Error('Invalid lead ID format');
      }
      const { fields } = options;
      const url = fields
        ? `${ENDPOINTS.LEAD.GET_LEAD_BY_ID(leadId)}?fields=${fields}`
        : ENDPOINTS.LEAD.GET_LEAD_BY_ID(leadId);
      console.log('Fetching lead with URL:', url);
      const response = await apiClient.get(url);
      console.log('Raw API Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching lead by ID:', error.response?.data || error.message);
      throw error.response?.data?.message || error.message || 'Failed to fetch lead';
    }
  },

  getLeadFollowUps: async (id) => {
    try {
      const response = await apiClient.get(ENDPOINTS.LEAD.GET_FOLLOW_UPS(id));
      const data = response.data?.data || response.data || {};
      console.log('✅ Raw API Response:', JSON.stringify(response.data, null, 2));
      if (!data.followUps && !Array.isArray(data)) {
        throw new Error('API response missing followUps data or invalid format');
      }
      return {
        data: {
          followUps: Array.isArray(data) ? data : data.followUps || [],
          totalFollowUps: data.totalFollowUps || (Array.isArray(data) ? data.length : 0),
        },
      };
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || 'Unknown error';
      console.error('❌ Error fetching follow ups:', {
        errorMsg,
        status: error.response?.status,
        data: error.response?.data,
      });
      throw errorMsg;
    }
  },

  getLeadActivity: async (leadId) => {
    try {
      const response = await apiClient.get(ENDPOINTS.LEAD.GET_LEAD_ACTIVITIES(leadId));
      console.log('✅ Raw API Response:', response);
      console.log('✅ Response Data:', response.data);
      if (!response.data) {
        throw new Error('No data in API response');
      }
      let leadActivityData;
      if (Array.isArray(response.data)) {
        leadActivityData = response.data;
      } else if (response.data.data && Array.isArray(response.data.data)) {
        leadActivityData = response.data.data;
      } else if (response.data.results && Array.isArray(response.data.results)) {
        leadActivityData = response.data.results;
      } else {
        throw new Error('Unexpected API response structure');
      }
      console.log('✅ Extracted Lead Activity Data:', leadActivityData);
      return leadActivityData;
    } catch (error) {
      console.error('❌ Error fetching lead activity:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      throw new Error(error.response?.data?.message || 'Failed to fetch lead activity');
    }
  },

  getAllStatus: async () => {
    try {
      const response = await apiClient.get(ENDPOINTS.LEAD.GET_ALL_LEAD_STATUSES);
      console.log('✅ Fetched Lead Statuses:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching lead statuses:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to fetch lead statuses');
    }
  },

  getLeadStatusById: async (id) => {
    try {
      console.log('Fetching lead status for ID:', id);
      if (!id) {
        throw new Error('ID is required');
      }
      const response = await apiClient.get(ENDPOINTS.LEAD.GET_LEAD_STATUS_BY_ID(id));
      console.log('✅ Fetched Lead Status:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching lead status:', error.response?.data || error.message);
      throw error.response?.data?.message || 'Failed to fetch lead status';
    }
  },

  getAllSearchContact: async (searchTerm) => {
    try {
      const response = await apiClient.get(
        `${ENDPOINTS.LEAD.SEARCH_CONTACTS}?search=${encodeURIComponent(searchTerm)}`
      );
      console.log('✅ Fetched Search Contacts:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching search contacts:', error.response?.data || error.message);
      throw error.response?.data?.message || 'Failed to fetch search contacts';
    }
  },

  getAllContacts: async () => {
    try {
      const response = await apiClient.get(ENDPOINTS.LEAD.GET_ALL_CONTACTS);
      console.log('✅ Fetched Contacts:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching contacts:', error.response?.data || error.message);
      throw error.response?.data?.message || 'Failed to fetch contacts';
    }
  },

  getContactById: async (contactId) => {
    try {
      const response = await apiClient.get(ENDPOINTS.LEAD.GET_CONTACT_BY_ID(contactId));
      console.log('✅ Fetched Contact by ID:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching contact by ID:', error.response?.data || error.message);
      throw error.response?.data?.message || 'Failed to fetch contact';
    }
  },

  getActiveSources: async () => {
    try {
      const response = await apiClient.get(ENDPOINTS.LEAD.GET_ACTIVE_SOURCES);
      console.log('✅ Fetched Active Sources:', response.data);
      return response.data.data;
    } catch (error) {
      console.error('❌ Error fetching active sources:', error.response?.data || error.message);
      throw error.response?.data?.message || 'Failed to fetch active sources';
    }
  },

  getActiveStatuses: async () => {
    try {
      const response = await apiClient.get(ENDPOINTS.LEAD.GET_ACTIVE_LEAD_STATUSES);
      console.log('✅ Fetched Active Statuses:', response.data);
      return response.data.data;
    } catch (error) {
      console.error('❌ Error fetching active statuses:', error.response?.data || error.message);
      throw error.response?.data?.message || 'Failed to fetch active statuses';
    }
  },

  // Employee
  uploadEmployeeImage: async (employeeId, image, fieldName = 'file') => {
    try {
      if (!employeeId || typeof employeeId !== 'string') {
        throw new Error('Invalid or missing employeeId');
      }
      if (!image || !image.uri) {
        throw new Error('Invalid or missing image data');
      }
      console.log('📤 Preparing to upload image for employeeId:', employeeId);
      console.log('📤 Image details:', {
        uri: image.uri,
        type: image.type,
        name: image.fileName || `employee_${employeeId}.jpg`,
        fieldName,
      });
      const formData = new FormData();
      formData.append(fieldName, {
        uri: image.uri,
        type: image.type || 'image/jpeg',
        name: image.fileName || `employee_${employeeId}.jpg`,
      });
      console.log('📤 FormData prepared with field:', fieldName);
      const token = await AsyncStorage.getItem('authToken');
      const headers = {
        'Content-Type': 'multipart/form-data',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      console.log('📤 Request headers:', headers);
      const response = await apiClient.post(
        ENDPOINTS.EMPLOYEE.UPLOAD_EMPLOYEE_IMAGE(employeeId),
        formData,
        { headers }
      );
      console.log('✅ Image Upload Response:', response.data);
      if (!response.data || !response.data.data) {
        throw new Error('No image URL in API response');
      }
      return { photoUrl: response.data.data };
    } catch (error) {
      console.error('❌ Error uploading employee image:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        requestUrl: ENDPOINTS.EMPLOYEE.UPLOAD_EMPLOYEE_IMAGE(employeeId),
      });
      throw error.response?.data?.message || 'Failed to upload employee image';
    }
  },

  getActiveEmployees: async () => {
    try {
      const response = await apiClient.get(ENDPOINTS.EMPLOYEE.GET_ACTIVE_EMPLOYEES);
      console.log('✅ Fetched Active Employees:', response.data);
      return response.data.data;
    } catch (error) {
      console.error('❌ Error fetching active employees:', error.response?.data || error.message);
      throw error.response?.data?.message || 'Failed to fetch active employees';
    }
  },

  getAllEmployees: async () => {
    try {
      const response = await apiClient.get(ENDPOINTS.EMPLOYEE.GET_ALL_EMPLOYEES);
      console.log('✅ Fetched All Employees:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching all employees:', error.response?.data || error.message);
      throw error.response?.data?.message || 'Failed to fetch all employees';
    }
  },

  getEmployeeById: async (id) => {
    try {
      console.log('Fetching employee for ID:', id);
      if (!id) {
        throw new Error('Employee ID is required');
      }
      const response = await apiClient.get(ENDPOINTS.EMPLOYEE.GET_EMPLOYEE_BY_ID(id));
      console.log('✅ Fetched Employee:', response.data.data);
      return response.data.data;
    } catch (error) {
      console.error('❌ Error fetching employee:', error.response?.data || error.message);
      throw error.response?.data?.message || 'Failed to fetch employee';
    }
  },

  // Organization
  getActiveBranches: async () => {
    try {
      const response = await apiClient.get(ENDPOINTS.ORGANIZATION.GET_ACTIVE_BRANCHES);
      console.log('✅ Fetched Active Branches:', response.data);
      return response.data.data;
    } catch (error) {
      console.error('❌ Error fetching active branches:', error.response?.data || error.message);
      throw error.response?.data?.message || 'Failed to fetch active branches';
    }
  },

  getAllBranch: async () => {
    try {
      const response = await apiClient.get(ENDPOINTS.ORGANIZATION.GET_ALL_BRANCHES);
      console.log('✅ Fetched Branches:', response.data);
      return response.data.data.branches;
    } catch (error) {
      console.error('❌ Error fetching branches:', error.response?.data || error.message);
      throw error.response?.data?.message || 'Failed to fetch branches';
    }
  },

  // Dashboard
  getMainDashboard: async () => {
    try {
      const response = await apiClient.get(ENDPOINTS.DASHBOARD.GET_MAIN_DASHBOARD_CARDS);
      console.log('✅ Fetched Main Dashboard Cards:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching main dashboard cards:', error.response?.data || error.message);
      throw error.response?.data?.message || 'Failed to fetch main dashboard cards';
    }
  },

  getDynamicSourceCounts: async () => {
    try {
      const response = await apiClient.get(ENDPOINTS.DASHBOARD.GET_DYNAMIC_SOURCE_COUNTS);
      console.log('✅ Fetched Dynamic Source Counts:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching dynamic source counts:', error.response?.data || error.message);
      throw error.response?.data?.message || 'Failed to fetch dynamic source counts';
    }
  },

  getDynamicStatusCounts: async () => {
    try {
      const response = await apiClient.get(ENDPOINTS.DASHBOARD.GET_DYNAMIC_STATUS_COUNTS);
      console.debug('✅ Fetched Dynamic Status Counts:', response.data);
      return response.data;
    } catch (error) {
      const errMessage = error.response?.data?.message || error.message || 'Failed to fetch dynamic status counts';
      console.error('❌ Error fetching dynamic status counts:', errMessage);
      throw new Error(errMessage);
    }
  },

  getDialReport: async ({ search, dateFilter, startDate, endDate, page, limit }) => {
    try {
      const params = {
        search: search || undefined,
        dateFilter,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        page,
        limit,
      };
      const response = await apiClient.get(ENDPOINTS.DASHBOARD.GET_DIAL_UP_REPORT, { params });
      console.log('✅ Dial Report Success:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching dial report:', error.response?.data || error.message);
      throw error.response?.data?.message || 'Failed to fetch dial report';
    }
  },

  getCallHistory: async (employeeId, page = 1, limit = 10) => {
    console.log('🌐 getCallHistoryApi: Fetching for employeeId:', employeeId, 'Page:', page, 'Limit:', limit);
    try {
      const response = await apiClient.get(ENDPOINTS.DASHBOARD.GET_CALL_HISTORY, {
        params: {
          type: 'id',
          employeeId,
          page,
          limit,
        },
      });
      console.log('✅ Call History API Response:', {
        status: response.status,
        data: response.data,
        headers: response.headers,
      });
      if (!response.data || !Array.isArray(response.data.data)) {
        console.warn('⚠️ getCallHistoryApi: Expected response.data.data to be an array, got:', response.data);
        throw new Error('No call history data in API response');
      }
      const result = {
        data: response.data.data,
        currentPage: response.data.currentPage || 1,
        totalPages: response.data.totalPages || 1,
        totalRecords: response.data.totalRecords || 0,
      };
      console.log('✅ getCallHistoryApi: Returning mapped data:', result);
      return result;
    } catch (error) {
      console.error('❌ getCallHistoryApi: Error fetching call history:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        config: error.config,
      });
      throw new Error(error.response?.data?.message || 'Failed to fetch call history');
    }
  },

  getPerformanceReport: async ({ employeeId, dateFilter, startDate, endDate } = {}) => {
    try {
      const params = {};
      if (employeeId) params.employeeId = employeeId;
      if (dateFilter && dateFilter !== 'custom') params.dateFilter = dateFilter;
      if (dateFilter === 'custom' && startDate && endDate) {
        params.startDate = startDate;
        params.endDate = endDate;
      }
      const response = await apiClient.get(ENDPOINTS.DASHBOARD.GET_PERFORMANCE_REPORT, { params });
      console.log('✅ Raw API Response:', response);
      console.log('✅ Response Data:', response.data);
      if (!response.data) {
        throw new Error('No data in API response');
      }
      let performanceData;
      if (Array.isArray(response.data)) {
        performanceData = response.data;
      } else if (response.data.data && Array.isArray(response.data.data)) {
        performanceData = response.data.data;
      } else if (response.data.results && Array.isArray(response.data.results)) {
        performanceData = response.data.results;
      } else {
        throw new Error('Unexpected API response structure');
      }
      console.log('✅ Extracted Performance Data:', performanceData);
      return performanceData;
    } catch (error) {
      console.error('❌ Error fetching performance report:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      throw new Error(error.response?.data?.message || 'Failed to fetch performance report');
    }
  },

  searchLeadsByFollowUpDate: async (queryType, page = 1, pageSize = 10) => {
    try {
      const response = await apiClient.get(
        `${ENDPOINTS.DASHBOARD.SEARCH_LEADS_BY_FOLLOW_UP_DATE}?filterType=${queryType}&page=${page}&pageSize=${pageSize}`
      );
      const data = response.data?.data || response.data || {};
      console.log('✅ Raw API Response:', JSON.stringify(response.data, null, 2));
      if (!data.formattedLeads || !Array.isArray(data.formattedLeads)) {
        throw new Error('API response missing formattedLeads data or invalid format');
      }
      return {
        data: {
          leads: data.formattedLeads || [],
          totalLeads: data.totalRecords || data.formattedLeads.length || 0,
          currentPage: data.currentPage || 1,
          totalPages: data.totalPages || 1,
        },
      };
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || 'Unknown error';
      console.error('❌ Error searching leads by follow-up date:', {
        message: errorMsg,
        status: error.response?.status,
        data: error.response?.data,
      });
      throw errorMsg;
    }
  },
};

export default apiService;