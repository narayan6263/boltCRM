import apiClient from './apiClient';

export const bulkAssignLeads = async (payload) => {
  try {
    const response = await apiClient.post('lead/bulkAssignLeads', payload);
    console.log('✅ Bulk Assign Leads Success:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error assigning leads:', error.response?.data || error.message);
    throw error.response?.data?.message || 'Failed to assign leads';
  }
};