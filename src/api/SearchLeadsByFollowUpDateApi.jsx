// api/SearchLeadsByFollowUpDateApi.js
import apiClient from './apiClient';

export const searchLeadsByFollowUpDate = async (queryType, page = 1, pageSize = 10) => {
  try {
    const response = await apiClient.get(
      `dashBoard/searchLeadsByFollowUpDate?filterType=${queryType}&page=${page}&pageSize=${pageSize}`
    );
    const data = response.data?.data || response.data || {};
    console.log('✅ Raw API Response:', JSON.stringify(response.data, null, 2));
    if (!data.formattedLeads || !Array.isArray(data.formattedLeads)) {
      throw new Error('API response missing formattedLeads data or invalid format');
    }
    return {
      data: {
        leads: data.formattedLeads || [],
        totalLeads: data.totalRecords || data.formattedLeads.length || 0,
        currentPage: data.currentPage || 1,
        totalPages: data.totalPages || 1,
      },
    };
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message || 'Unknown error';
    console.error('❌ Error searching leads by follow-up date:', {
      message: errorMsg,
      status: error.response?.status,
      data: error.response?.data,
    });
    throw errorMsg;
  }
};