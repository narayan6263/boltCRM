import apiClient from './apiClient';

export const getCallHistory = async (employeeId, page = 1, limit = 10) => {
  console.log('🌐 getCallHistoryApi: Fetching for employeeId:', employeeId, 'Page:', page, 'Limit:', limit);
  try {
    const response = await apiClient.get('dashBoard/getCallHistory', {
      params: {
        type: 'id',
        employeeId,
        page,
        limit,
      },
    });
    console.log('✅ Call History API Response:', {
      status: response.status,
      data: response.data,
      headers: response.headers,
    });

    if (!response.data || !Array.isArray(response.data.data)) {
      console.warn('⚠️ getCallHistoryApi: Expected response.data.data to be an array, got:', response.data);
      throw new Error('No call history data in API response');
    }

    const result = {
      data: response.data.data,
      currentPage: response.data.currentPage || 1,
      totalPages: response.data.totalPages || 1,
      totalRecords: response.data.totalRecords || 0,
    };
    console.log('✅ getCallHistoryApi: Returning mapped data:', result);
    return result;
  } catch (error) {
    console.error('❌ getCallHistoryApi: Error fetching call history:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      config: error.config,
    });
    throw new Error(error.response?.data?.message || 'Failed to fetch call history');
  }
};