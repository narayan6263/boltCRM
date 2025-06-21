
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from './apiClient';

// Helper function to validate MongoDB ObjectID
const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

export const addLead = async (formData) => {
  console.log('addLead called with formData:', formData);
  try {
    const orgIdStored = await AsyncStorage.getItem('orgId');
    console.log('Stored orgId:', orgIdStored);

    // Validate inputs
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

    // Base payload with common fields
    const leadPayload = {
      branch: formData.branch || '',
      source: formData.source || '',
      priority: formData.priority || '',
      reference: formData.reference || '',
      description: formData.description || '', // Main description
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

    // Only include status and statusData if formData.status is a valid ObjectId
    if (formData.status && isValidObjectId(formData.status)) {
      console.log('Including status and statusData:', { status: formData.status, statusData: formData.statusData });
      leadPayload.status = formData.status;
      leadPayload.statusData = {
        contactDate: formData.statusData?.contactDate || '',
        nextFollowUpDate: formData.statusData?.nextFollowUpDate || '',
        nextFollowUpTime: formData.statusData?.nextFollowUpTime || '',
        estimationDate: formData.statusData?.estimationDate || '',
        estimationBudget: formData.statusData?.estimationBudget || 0,
        description: formData.statusData?.description || '', // Meeting description
        status: formData.status,
      };
      // Only include priority in statusData if a valid value is provided
      if (formData.statusData?.priority || formData.priority) {
        leadPayload.statusData.priority = formData.statusData?.priority || formData.priority;
      }
    } else {
      console.log('Excluding status and statusData');
    }

    console.log('Submitting leadPayload:', leadPayload);
    const response = await apiClient.post('/lead/addLead', leadPayload);
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
};
