import apiClient from './apiClient';

export const getActiveSources = async () => {
  try {
    const response = await apiClient.get('lead/getActiveSources');
    console.log('✅ Fetched Active Sources:', response.data);
    return response.data.data; // extract only the array of sources
  } catch (error) {
    console.error('❌ Error fetching active sources:', error.response?.data || error.message);
    throw error.response?.data?.message || 'Failed to fetch active sources';
  }
};