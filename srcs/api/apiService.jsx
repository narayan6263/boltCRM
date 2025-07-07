
import apiClient from './apiClient';
import apiAuth from './apiAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';
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

// Handle API errors
const handleError = (error) => {
  if (error.response) {
    return {
      status: error.response.status,
      data: error.response.data,
      message: error.response.data.message || 'API request failed',
    };
  } else if (error.request) {
    return { message: 'No response from server' };
  } else {
    return { message: error.message || 'Request setup error' };
  }
};

// API Service Methods
const apiService = {
  // Authentication
  async logInUser(email, password) {
    try {
      const response = await apiAuth.post(ENDPOINTS.LOGIN, {
        systemUserEmail: email,
        systemUserPassword: password,
      });
      console.log('🌐 Login API Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Login API Error:', error.response?.data || error);
      throw handleError(error);
    }
  },

  async logOutUser() {
    try {
      const systemUserId = await AsyncStorage.getItem('systemUserId');
      if (!systemUserId) {
        throw new Error('No systemUserId found. Please log in again.');
      }
      const tokenExpiresAt = await AsyncStorage.getItem('tokenExpiresAt');
      if (tokenExpiresAt && Date.now() > parseInt(tokenExpiresAt)) {
        throw new Error('Token expired. Please log in again.');
      }
      const response = await apiClient.post(
        ENDPOINTS.LOGOUT,
        { userId: systemUserId },
        { headers: { userId: systemUserId } }
      );
      console.log('🌐 Logout API Response:', response.data);
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
    } catch (error) {
      console.error('❌ Logout API Error:', error.response?.data || error.message);
      throw handleError(error);
    }
  },

  // Lead Management
  async addLead(formData) {
    try {
      const orgIdStored = await AsyncStorage.getItem('orgId');
      console.log('Stored orgId:', orgIdStored);

      // Validate inputs
      if (formData.contactId && !isValidObjectId(formData.contactId)) {
        throw new Error('Invalid contactId: Must be a valid ObjectId');
      }
      if (!formData.contactId && !formData.name) {
        throw new Error('A name is required when no contact is selected');
      }
      if (!formData.organizationId && !orgIdStored) {
        throw new Error('Organization ID is required');
      }
      if (!formData.assignedTo || !isValidObjectId(formData.assignedTo)) {
        throw new Error('A valid employee ID is required for assignedTo');
      }

      // Base payload
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
        leadPayload.status = formData.status;
        leadPayload.statusData = {
          contactDate: formData.statusData?.contactDate || '',
          nextFollowUpDate: formData.statusData?.nextFollowUpDate || '',
          nextFollowUpTime: formData.statusData?.nextFollowUpTime || '',
          estimationDate: formData.statusData?.estimationDate || '',
          estimationBudget: formData.statusData?.estimationBudget || 0,
          description: formData.statusData?.description || '',
          status: formData.status,
          ...(formData.statusData?.priority || formData.priority
            ? { priority: formData.statusData?.priority || formData.priority }
            : {}),
        };
      }

      console.log('Submitting leadPayload:', JSON.stringify(leadPayload, null, 2));
      const response = await apiClient.post(ENDPOINTS.ADD_LEAD, leadPayload);
      console.log('✅ Lead Added:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error adding lead:', error.response?.data || error.message);
      if (error.response?.status === 409) {
        throw new Error('Contact with this email or phone already exists.');
      }
      throw handleError(error);
    }
  },

  async addLeadDial(formData) {
    try {
      const orgIdStored = await AsyncStorage.getItem('orgId');
      console.log('Stored orgId:', orgIdStored);

      // Validate inputs
      if (formData.contactId && !isValidObjectId(formData.contactId)) {
        throw new Error('Invalid contactId: Must be a valid ObjectId');
      }
      if (!formData.contactId && !formData.name) {
        throw new Error('A name is required when no contact is selected');
      }
      if (!formData.organizationId && !orgIdStored) {
        throw new Error('Organization ID is required');
      }
      if (!formData.assignedTo || !isValidObjectId(formData.assignedTo)) {
        throw new Error('A valid employee ID is required for assignedTo');
      }
      if (formData.dialUpMethod && !isValidDialUpMethod(formData.dialUpMethod)) {
        throw new Error('Invalid dialUpMethod: Must contain valid fields');
      }

      // Base payload
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
        leadPayload.status = formData.status;
        leadPayload.statusData = {
          contactDate: formData.statusData?.contactDate || '',
          nextFollowUpDate: formData.statusData?.nextFollowUpDate || '',
          nextFollowUpTime: formData.statusData?.nextFollowUpTime || '',
          estimationDate: formData.statusData?.estimationDate || '',
          estimationBudget: formData.statusData?.estimationBudget || 0,
          description: formData.statusData?.description || '',
          status: formData.status,
          ...(formData.statusData?.priority || formData.priority
            ? { priority: formData.statusData?.priority || formData.priority }
            : {}),
        };
      }

      console.log('Submitting leadPayload:', JSON.stringify(leadPayload, null, 2));
      const response = await apiClient.post(ENDPOINTS.ADD_LEAD_DIAL, leadPayload);
      console.log('✅ Lead Added:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error adding lead:', error.response?.data || error.message);
      if (error.response?.status === 409) {
        throw new Error('Contact with this email or phone already exists.');
      }
      throw handleError(error);
    }
  },

  async getAllLeads(filters = {}, page = 1, limit = 10) {
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

      const url = `${ENDPOINTS.GET_ALL_LEADS}?${queryParams.toString()}`;
      console.log('getAllLeads: Request URL:', `http://20.41.121.191:5151/Api/${url}`);
      const response = await apiClient.get(url);
      console.log('✅ Fetched All Leads:', JSON.stringify(response.data, null, 2));
      return {
        data: {
          formattedLeads: response.data.data?.formattedLeads || [],
          totalPages: response.data.data?.totalPages || 1,
          currentPage: response.data.data?.currentPage || page,
          totalLeads: response.data.data?.totalLeads || 0,
          hasMore: response.data.data?.currentPage < response.data.data?.totalPages,
        },
      };
    } catch (error) {
      console.error('❌ Error fetching leads:', error.response?.data || error.message);
      throw handleError(error);
    }
  },

  async updateLead(leadId, leadData, postUpdatedLead = false) {
    try {
      if (!leadId || !isValidObjectId(leadId)) {
        throw new Error('Invalid or missing leadId');
      }
      if (!leadData?.source) {
        throw new Error('Source is required');
      }
      if (!leadData?.priority || !['low', 'medium', 'high', 'important'].includes(leadData.priority.toLowerCase())) {
        throw new Error('Priority must be one of: low, medium, high, important');
      }
      if (leadData?.comment && (typeof leadData.comment !== 'string' || leadData.comment.length > 500)) {
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
      const response = await apiClient.put(
        `${ENDPOINTS.UPDATE_LEAD(leadId)}${postUpdatedLead ? '?postUpdatedLead=true' : ''}`,
        payload
      );
      console.log('✅ Lead updated:', JSON.stringify(response.data, null, 2));
      return response.data.data;
    } catch (error) {
      console.error('❌ Error updating lead:', error.response?.data || error.message);
      throw handleError(error);
    }
  },

  async bulkAssignLeads(payload) {
    try {
      const response = await apiClient.post(ENDPOINTS.BULK_ASSIGN_LEADS, payload);
      console.log('✅ Bulk Assign Leads Success:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error assigning leads:', error.response?.data || error.message);
      throw handleError(error);
    }
  },

  async getLeadActivity(leadId) {
    try {
      const response = await apiClient.get(ENDPOINTS.GET_LEAD_ACTIVITY(leadId));
      const data = Array.isArray(response.data)
        ? response.data
        : response.data.data || response.data.results || [];
      if (!Array.isArray(data)) {
        throw new Error('Unexpected API response structure');
      }
      console.log('✅ Extracted Lead Activity Data:', data);
      return data;
    } catch (error) {
      console.error('❌ Error fetching lead activity:', error.response?.data || error.message);
      throw handleError(error);
    }
  },

  async getLeadById(leadId, options = {}) {
    try {
      if (!isValidObjectId(leadId)) {
        throw new Error('Invalid lead ID format');
      }
      const url = options.fields
        ? `${ENDPOINTS.GET_LEAD_BY_ID(leadId)}?fields=${options.fields}`
        : ENDPOINTS.GET_LEAD_BY_ID(leadId);
      console.log('Fetching lead with URL:', url);
      const response = await apiClient.get(url);
      console.log('✅ Fetched Lead by ID:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching lead by ID:', error.response?.data || error.message);
      throw handleError(error);
    }
  },

  async getLeadFollowUps(leadId) {
    try {
      const response = await apiClient.get(ENDPOINTS.GET_LEAD_FOLLOW_UPS(leadId));
      const data = response.data?.data || response.data || {};
      if (!data.followUps && !Array.isArray(data)) {
        throw new Error('API response missing followUps data or invalid format');
      }
      console.log('✅ Fetched Lead Follow-Ups:', JSON.stringify(data, null, 2));
      return {
        data: {
          followUps: Array.isArray(data) ? data : data.followUps || [],
          totalFollowUps: data.totalFollowUps || (Array.isArray(data) ? data.length : 0),
        },
      };
    } catch (error) {
      console.error('❌ Error fetching follow ups:', error.response?.data || error.message);
      throw handleError(error);
    }
  },

  async getLeadStatusById(id) {
    try {
      if (!id) {
        throw new Error('ID is required');
      }
      const response = await apiClient.get(ENDPOINTS.GET_LEAD_STATUS_BY_ID(id));
      console.log('✅ Fetched Lead Status:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching lead status:', error.response?.data || error.message);
      throw handleError(error);
    }
  },

  async postFeedback(feedbackData) {
    try {
      if (!feedbackData?.leadId || !isValidObjectId(feedbackData.leadId)) {
        throw new Error('Invalid or missing leadId');
      }
      if (!feedbackData?.status || !isValidObjectId(feedbackData.status)) {
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
          const uploadResponse = await apiClient.post(ENDPOINTS.UPLOAD_RECORDING, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          recordedFileUrl = uploadResponse.data.fileUrl;
          console.log('postFeedbackApi: File uploaded:', recordedFileUrl);
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

      console.log('postFeedbackApi: Constructed payload:', JSON.stringify(payload, null, 2));
      const response = await apiClient.post(ENDPOINTS.ADD_FOLLOW_UP, payload);
      console.log('✅ Feedback posted:', JSON.stringify(response.data, null, 2));
      return response.data;
    } catch (error) {
      console.error('❌ Error posting feedback:', error.response?.data || error.message);
      throw handleError(error);
    }
  },

  async searchLeadsByFollowUpDate(queryType, page = 1, pageSize = 10) {
    try {
      const response = await apiClient.get(ENDPOINTS.SEARCH_LEADS_BY_FOLLOW_UP, {
        params: { filterType: queryType, page, pageSize },
      });
      const data = response.data?.data || response.data || {};
      if (!data.formattedLeads || !Array.isArray(data.formattedLeads)) {
        throw new Error('API response missing formattedLeads data or invalid format');
      }
      console.log('✅ Fetched Leads by Follow-Up Date:', JSON.stringify(data, null, 2));
      return {
        data: {
          leads: data.formattedLeads || [],
          totalLeads: data.totalRecords || data.formattedLeads.length || 0,
          currentPage: data.currentPage || 1,
          totalPages: data.totalPages || 1,
        },
      };
    } catch (error) {
      console.error('❌ Error searching leads by follow-up date:', error.response?.data || error.message);
      throw handleError(error);
    }
  },

  // Contact Management
  async getAllContacts() {
    try {
      const response = await apiClient.get(ENDPOINTS.GET_ALL_CONTACTS);
      console.log('✅ Fetched All Contacts:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching contacts:', error.response?.data || error.message);
      throw handleError(error);
    }
  },

  async getAllSearchContact(searchTerm) {
    try {
      const response = await apiClient.get(ENDPOINTS.SEARCH_CONTACTS, {
        params: { search: encodeURIComponent(searchTerm) },
      });
      console.log('✅ Fetched Search Contacts:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching search contacts:', error.response?.data || error.message);
      throw handleError(error);
    }
  },

  async getContactById(contactId) {
    try {
      const response = await apiClient.get(ENDPOINTS.GET_CONTACT_BY_ID(contactId));
      console.log('✅ Fetched Contact by ID:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching contact by ID:', error.response?.data || error.message);
      throw handleError(error);
    }
  },

  async updateContact(contactId, contactData) {
    try {
      if (!contactId || !isValidObjectId(contactId)) {
        throw new Error('Invalid or missing contactId');
      }
      if (!contactData?.name) {
        throw new Error('Name is required');
      }
      if (!contactData?.phone || !/^\+?\d{10,15}$/.test(contactData.phone)) {
        throw new Error('Invalid or missing phone number');
      }

      const payload = {
        name: contactData.name,
        email: contactData.email || '',
        phone: contactData.phone,
        address: contactData.address || '',
      };

      console.log('Constructed payload:', JSON.stringify(payload, null, 2));
      const response = await apiClient.put(ENDPOINTS.UPDATE_CONTACT(contactId), payload);
      console.log('✅ Contact updated:', JSON.stringify(response.data, null, 2));
      return response.data;
    } catch (error) {
      console.error('❌ Error updating contact:', error.response?.data || error.message);
      throw handleError(error);
    }
  },

  async fetchDecryptInfo(contactId) {
    try {
      const response = await apiClient.get(ENDPOINTS.DECRYPT_INFO(contactId));
      console.log('✅ Fetched Decrypt Info:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching decrypt info:', error.response?.data || error.message);
      throw handleError(error);
    }
  },

  // Employee Management
  async getActiveEmployees() {
    try {
      const response = await apiClient.get(ENDPOINTS.GET_ACTIVE_EMPLOYEES);
      console.log('✅ Fetched Active Employees:', response.data);
      return response.data.data;
    } catch (error) {
      console.error('❌ Error fetching active employees:', error.response?.data || error.message);
      throw handleError(error);
    }
  },

  async getAllEmployees() {
    try {
      const response = await apiClient.get(ENDPOINTS.GET_ALL_EMPLOYEES);
      console.log('✅ Fetched All Employees:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching all employees:', error.response?.data || error.message);
      throw handleError(error);
    }
  },

  async getEmployeeById(id) {
    try {
      if (!id) {
        throw new Error('Employee ID is required');
      }
      const response = await apiClient.get(ENDPOINTS.GET_EMPLOYEE_BY_ID(id));
      console.log('✅ Fetched Employee:', response.data.data);
      return response.data.data;
    } catch (error) {
      console.error('❌ Error fetching employee:', error.response?.data || error.message);
      throw handleError(error);
    }
  },

  async uploadEmployeeImage(employeeId, image, fieldName = 'file') {
    try {
      if (!employeeId || typeof employeeId !== 'string') {
        throw new Error('Invalid or missing employeeId');
      }
      if (!image || !image.uri) {
        throw new Error('Invalid or missing image data');
      }

      const formData = new FormData();
      formData.append(fieldName, {
        uri: image.uri,
        type: image.type || 'image/jpeg',
        name: image.fileName || `employee_${employeeId}.jpg`,
      });

      const token = await AsyncStorage.getItem('authToken');
      const headers = {
        'Content-Type': 'multipart/form-data',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };

      console.log('📤 Uploading image for employeeId:', employeeId);
      const response = await apiClient.post(ENDPOINTS.UPLOAD_EMPLOYEE_IMAGE(employeeId), formData, {
        headers,
      });
      console.log('✅ Image Upload Response:', response.data);
      if (!response.data || !response.data.data) {
        throw new Error('No image URL in API response');
      }
      return { photoUrl: response.data.data };
    } catch (error) {
      console.error('❌ Error uploading employee image:', error.response?.data || error.message);
      throw handleError(error);
    }
  },

  // Branch Management
  async getActiveBranches() {
    try {
      const response = await apiClient.get(ENDPOINTS.GET_ACTIVE_BRANCHES);
      console.log('✅ Fetched Active Branches:', response.data);
      return response.data.data;
    } catch (error) {
      console.error('❌ Error fetching active branches:', error.response?.data || error.message);
      throw handleError(error);
    }
  },

  async getAllBranch() {
    try {
      const response = await apiClient.get(ENDPOINTS.GET_ALL_BRANCHES);
      console.log('✅ Fetched All Branches:', response.data);
      return response.data.data.branches;
    } catch (error) {
      console.error('❌ Error fetching branches:', error.response?.data || error.message);
      throw handleError(error);
    }
  },

  // Source and Status
  async getActiveSources() {
    try {
      const response = await apiClient.get(ENDPOINTS.GET_ACTIVE_SOURCES);
      console.log('✅ Fetched Active Sources:', response.data);
      return response.data.data;
    } catch (error) {
      console.error('❌ Error fetching active sources:', error.response?.data || error.message);
      throw handleError(error);
    }
  },

  async getActiveStatuses() {
    try {
      const response = await apiClient.get(ENDPOINTS.GET_ACTIVE_STATUSES);
      console.log('✅ Fetched Active Statuses:', response.data);
      return response.data.data;
    } catch (error) {
      console.error('❌ Error fetching active statuses:', error.response?.data || error.message);
      throw handleError(error);
    }
  },

  async getAllStatus() {
    try {
      const response = await apiClient.get(ENDPOINTS.GET_ALL_STATUSES);
      console.log('✅ Fetched All Statuses:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching all statuses:', error.response?.data || error.message);
      throw handleError(error);
    }
  },

  async getDynamicSourceCounts() {
    try {
      const response = await apiClient.get(ENDPOINTS.GET_DYNAMIC_SOURCE_COUNTS);
      console.log('✅ Fetched Dynamic Source Counts:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching dynamic source counts:', error.response?.data || error.message);
      throw handleError(error);
    }
  },

  async getDynamicStatusCounts() {
    try {
      const response = await apiClient.get(ENDPOINTS.GET_DYNAMIC_STATUS_COUNTS);
      console.log('✅ Fetched Dynamic Status Counts:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching dynamic status counts:', error.response?.data || error.message);
      throw handleError(error);
    }
  },

  // Call History
  async getCallHistory(employeeId, page = 1, limit = 10) {
    try {
      const response = await apiClient.get(ENDPOINTS.GET_CALL_HISTORY, {
        params: { type: 'id', employeeId, page, limit },
      });
      console.log('✅ Call History API Response:', response.data);
      if (!response.data || !Array.isArray(response.data.data)) {
        throw new Error('No call history data in API response');
      }
      return {
        data: response.data.data,
        currentPage: response.data.currentPage || 1,
        totalPages: response.data.totalPages || 1,
        totalRecords: response.data.totalRecords || 0,
      };
    } catch (error) {
      console.error('❌ Error fetching call history:', error.response?.data || error.message);
      throw handleError(error);
    }
  },

  // Reports
  async getDialReport({ search, dateFilter, startDate, endDate, page, limit }) {
    try {
      const params = {
        search: search || undefined,
        dateFilter,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        page,
        limit,
      };
      const response = await apiClient.get(ENDPOINTS.GET_DIAL_REPORT, { params });
      console.log('✅ Dial Report Success:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching dial report:', error.response?.data || error.message);
      throw handleError(error);
    }
  },

  async getPerformanceReport({ employeeId, dateFilter, startDate, endDate } = {}) {
    try {
      const params = {};
      if (employeeId) params.employeeId = employeeId;
      if (dateFilter && dateFilter !== 'custom') params.dateFilter = dateFilter;
      if (dateFilter === 'custom' && startDate && endDate) {
        params.startDate = startDate;
        params.endDate = endDate;
      }
      const response = await apiClient.get(ENDPOINTS.GET_PERFORMANCE_REPORT, { params });
      console.log('✅ Performance Report Response:', response.data);
      const performanceData = Array.isArray(response.data)
        ? response.data
        : response.data.data || response.data.results || [];
      if (!Array.isArray(performanceData)) {
        throw new Error('Unexpected API response structure');
      }
      return performanceData;
    } catch (error) {
      console.error('❌ Error fetching performance report:', error.response?.data || error.message);
      throw handleError(error);
    }
  },

  // Dashboard
  async getMainDashboard() {
    try {
      const response = await apiClient.get(ENDPOINTS.GET_MAIN_DASHBOARD);
      console.log('✅ Fetched Main Dashboard Cards:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching main dashboard cards:', error.response?.data || error.message);
      throw handleError(error);
    }
  },
};

export default apiService;