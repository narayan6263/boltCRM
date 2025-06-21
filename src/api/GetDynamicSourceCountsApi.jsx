import apiClient from './apiClient';

export const getDynamicSourceCounts = async () => {
  try {
    const response = await apiClient.get('dashBoard/getDynamicSourceCounts');
    console.log('✅ Fetched Dynamic Source Counts:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching dynamic source counts:', error.response?.data || error.message);
    throw error.response?.data?.message || 'Failed to fetch dynamic source counts';
  }
};