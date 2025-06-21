// ../../api/GetPerformanceReportApi.js
import apiClient from './apiClient';

// import apiClient from './apiClient';

export const getPerformanceReport = async ({ employeeId, dateFilter, startDate, endDate } = {}) => {
  try {
    // Build query parameters dynamically
    const params = {};
    if (employeeId) params.employeeId = employeeId;
    if (dateFilter && dateFilter !== 'custom') params.dateFilter = dateFilter;
    if (dateFilter === 'custom' && startDate && endDate) {
      params.startDate = startDate;
      params.endDate = endDate;
    }

    const response = await apiClient.get('dashBoard/getPerformanceReport', { params });
    console.log('✅ Raw API Response:', response);
    console.log('✅ Response Data:', response.data);

    if (!response.data) {
      throw new Error('No data in API response');
    }

    let performanceData;
    if (Array.isArray(response.data)) {
      performanceData = response.data;
    } else if (response.data.data && Array.isArray(response.data.data)) {
      performanceData = response.data.data;
    } else if (response.data.results && Array.isArray(response.data.results)) {
      performanceData = response.data.results;
    } else {
      throw new Error('Unexpected API response structure');
    }

    console.log('✅ Extracted Performance Data:', performanceData);
    return performanceData;
  } catch (error) {
    console.error('❌ Error fetching performance report:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    throw new Error(error.response?.data?.message || 'Failed to fetch performance report');
  }
};