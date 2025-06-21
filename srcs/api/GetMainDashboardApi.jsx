import apiClient from './apiClient';

export const getMainDashboard = async () => {
  try {
    const response = await apiClient.get('dashBoard/mainDashBoardCards');
    console.log('✅ Fetched Main Dashboard Cards:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching main dashboard cards:', error.response?.data || error.message);
    throw error.response?.data?.message || 'Failed to fetch main dashboard cards';
  }
};