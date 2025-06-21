import apiClient from './apiClient';

export const getActiveBranches = async () => {
  try {
    const response = await apiClient.get('organization/getActiveBranchs');
    console.log('✅ Fetched Active Branches:', response.data);
    return response.data.data; // extract only the array of branches
  } catch (error) {
    console.error('❌ Error fetching active branches:', error.response?.data || error.message);
    throw error.response?.data?.message || 'Failed to fetch active branches';
  }
};