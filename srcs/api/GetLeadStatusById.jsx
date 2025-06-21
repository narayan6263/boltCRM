import apiClient from './apiClient';

export const getLeadStatusById = async (id) => {
  try {
    console.log('Fetching lead status for ID:', id);
    if (!id) {
      throw new Error('ID is required');
    }
    const response = await apiClient.get(`/lead/getLeadStatusById/${id}`);
    console.log('✅ Fetched Lead Status:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching lead status:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    throw error.response?.data?.message || 'Failed to fetch lead status';
  }
};