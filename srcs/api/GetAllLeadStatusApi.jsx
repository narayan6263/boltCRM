import apiClient from './apiClient';

export const getAllStatus = async () => {
  try {
    const response = await apiClient.get('/lead/getAllLeadStatuses');
    console.log('✅ Fetched Lead Statusessssssssssssssssss:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching lead statuses:', error.response?.data || error.message);
    throw error.response?.data?.message || 'Failed to fetch lead statuses';
  }
};

