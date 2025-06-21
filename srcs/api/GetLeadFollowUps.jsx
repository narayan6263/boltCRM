import apiClient from './apiClient';

export const getLeadFollowUps = async (id) => {
  try {
    const response = await apiClient.get(`lead/getFollowUps/${id}`);
    const data = response.data?.data || response.data || {};
    console.log('✅ Raw API Response:', JSON.stringify(response.data, null, 2)); // Log raw response
    if (!data.followUps && !Array.isArray(data)) {
      throw new Error('API response missing followUps data or invalid format');
    }
    return {
      data: {
        followUps: Array.isArray(data) ? data : data.followUps || [],
        totalFollowUps: data.totalFollowUps || (Array.isArray(data) ? data.length : 0),
      },
    };
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message || 'Unknown error';
    console.error('❌ Error fetching follow ups:', {
      message: errorMsg,
      status: error.response?.status,
      data: error.response?.data,
    });
    throw errorMsg;
  }
};