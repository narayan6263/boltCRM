import apiClient from './apiClient';

export const getActiveEmployees = async () => {
  try {
    const response = await apiClient.get('employee/getActiveEmployees');
    console.log('✅ Fetched Active Employees:', response.data);
    return response.data.data; // extract only the array of employees
  } catch (error) {
    console.error('❌ Error fetching active employees:', error.response?.data || error.message);
    throw error.response?.data?.message || 'Failed to fetch active employees';
  }
};