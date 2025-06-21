import apiClient from './apiClient';

export const getActiveStatuses = async () => {
  try {
    const response = await apiClient.get('lead/getActiveLeadStatuses');
    console.log('✅ Fetched Active Statuses:', response.data);
    return response.data.data; // extract only the array of statuses
  } catch (error) {
    console.error('❌ Error fetching active statuses:', error.response?.data || error.message);
    throw error.response?.data?.message || 'Failed to fetch active statuses';
  }
};