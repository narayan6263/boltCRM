import apiClient from './apiClient';

export const getEmployeeById = async (id) => {
  try {
    console.log('Fetching employee for ID:', id);
    if (!id) {
      throw new Error('Employee ID is required');
    }
    const response = await apiClient.get(`/employee/getEmployeeById/${id}`);
    console.log('✅ Fetched Employee:', response.data.data);
    return response.data.data; // Return only the employee data
  } catch (error) {
    console.error('❌ Error fetching employee:', error.response?.data || error.message);
    throw error.response?.data?.message || 'Failed to fetch employee';
  }
};