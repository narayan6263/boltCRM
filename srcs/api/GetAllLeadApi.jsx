
import apiClient from './apiClient';

export const getAllLeads = async (filters = {}, page = 1, limit = 50) => {
  try {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    // Use null-coalescing to ensure filters is an object
    const safeFilters = filters || {};

    if (safeFilters.search) queryParams.append('search', safeFilters.search);
    if (safeFilters.assignedTo) queryParams.append('assignedTo', safeFilters.assignedTo);
    if (safeFilters.organizationId) queryParams.append('organizationId', safeFilters.organizationId);
    if (safeFilters.source) queryParams.append('source', safeFilters.source);
    if (safeFilters.status) queryParams.append('status', safeFilters.status);
    if (safeFilters.country) queryParams.append('country', safeFilters.country);
    if (safeFilters.state) queryParams.append('state', safeFilters.state);
    if (safeFilters.city) queryParams.append('city', safeFilters.city);
    if (safeFilters.dateSearch) queryParams.append('dateSearch', safeFilters.dateSearch);

    const response = await apiClient.get(`lead/getAllLeads?${queryParams.toString()}`);
    const data = response.data?.data || response.data;
    console.log('✅ Fetched All Leads:', JSON.stringify(data, null, 2));
    return {
      data: {
        formattedLeads: data.formattedLeads || [],
        totalPages: data.totalPages || 1,
        currentPage: data.currentPage || page,
        totalLeads: data.totalLeads || 0,
        hasMore: data.currentPage < data.totalPages,
      },
    };
  } catch (error) {
    console.error('❌ Error fetching leads:', error.response?.data || error.message);
    throw error.response?.data?.message || 'Failed to fetch leads';
  }
};