import apiClient from './apiClient';

export const getAllBranch = async () => {
  try {
    const response = await apiClient.get('organization/getAllBranch');
    console.log('✅ Fetched Branches:', response.data);
  return response.data.data.branches; // extract only the array of branches
  } catch (error) {
    console.error('❌ Error fetching branches:', error.response?.data || error.message);
    throw error.response?.data?.message || 'Failed to fetch branches';
  }
};
