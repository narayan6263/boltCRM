// src/api/UpdateContactApi.js
import apiClient from './apiClient';

const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

export const updateContactApi = async (contactId, contactData) => {
  console.log('updateContactApi called with:', { contactId, contactData });

  // Validate contactId
  if (!contactId || !isValidObjectId(contactId)) {
    console.error('Validation error: Invalid or missing contactId', { contactId });
    throw new Error('Invalid or missing contactId');
  }

  // Validate required fields
  if (!contactData?.name) {
    console.error('Validation error: Name is required', { contactData });
    throw new Error('Name is required');
  }
  if (!contactData?.phone || !/^\+?\d{10,15}$/.test(contactData.phone)) {
    console.error('Validation error: Invalid or missing phone', { phone: contactData?.phone });
    throw new Error('Invalid or missing phone number');
  }

  // Construct payload
  const payload = {
    name: contactData.name,
    email: contactData.email || '',
    phone: contactData.phone,
    address: contactData.address || '',
  };

  console.log('Constructed payload:', JSON.stringify(payload, null, 2));

  try {
    const response = await apiClient.put(`lead/updateContact/${contactId}`, payload); // Updated endpoint
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
};