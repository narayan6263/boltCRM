import apiClient from './apiClient';

export const getContactById = async (contactId) => {
  try {
    const response = await apiClient.get(`lead/getContactById/${contactId}`);
    console.log('✅ Fetched Contact by ID:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching contact by ID:', error.response?.data || error.message);
    throw error.response?.data?.message || 'Failed to fetch contact';
  }
};