import apiClient from './apiClient';

export const getDynamicStatusCounts = async () => {
  try {
    const response = await apiClient.get('dashBoard/getDynamicStatusCounts');
    console.debug('✅ Fetched Dynamic Status Counts:', response.data); // Use debug for production
    return response.data;
  } catch (error) {
    const errMessage = error.response?.data?.message || error.message || 'Failed to fetch dynamic status counts';
    console.error('❌ Error fetching dynamic status counts:', errMessage);
    throw new Error(errMessage);
  }
};