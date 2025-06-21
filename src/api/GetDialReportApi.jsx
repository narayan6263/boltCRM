import apiClient from './apiClient';

export const getDialReport = async ({ search, dateFilter, startDate, endDate, page, limit }) => {
  try {
    const params = {
      search: search || undefined,
      dateFilter,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      page,
      limit,
    };
    const response = await apiClient.get('dashBoard/getDialUpReport', { params });
    console.log('✅ Dial Report Success:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching dial report:', error.response?.data || error.message);
    throw error.response?.data?.message || 'Failed to fetch dial report';
  }
};