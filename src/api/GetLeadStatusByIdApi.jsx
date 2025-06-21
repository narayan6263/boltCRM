
import apiClient from './apiClient';

export const getLeadStatusById = async (id) => {
  try {
    console.log('Fetching lead status for ID:', id); // Debug
    if (!id) {
      throw new Error('ID is required');
    }
    const response = await apiClient.get(`/lead/getLeadStatusById/${id}`);
    console.log('✅ Fetched Lead Status:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching lead status:', error.response?.data || error.message);
    throw error.response?.data?.message || 'Failed to fetch lead status';
  }
};