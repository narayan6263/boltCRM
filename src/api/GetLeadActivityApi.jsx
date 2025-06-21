
import apiClient from './apiClient';

export const getLeadActivity = async (leadId) => {
  try {
    // Use dynamic leadId in the API URL
    const response = await apiClient.get(`lead/getLeadActivities/${leadId}`);
    console.log('✅ Raw API Response:', response); // Log full response
    console.log('✅ Response Data:', response.data); // Log response.data

    // Check if response.data exists and is an object
    if (!response.data) {
      throw new Error('No data in API response');
    }

    // Handle different response structures
    let leadActivityData;
    if (Array.isArray(response.data)) {
      leadActivityData = response.data; // Direct array case
    } else if (response.data.data && Array.isArray(response.data.data)) {
      leadActivityData = response.data.data; // Nested data array case
    } else if (response.data.results && Array.isArray(response.data.results)) {
      leadActivityData = response.data.results; // Alternative results array case
    } else {
      throw new Error('Unexpected API response structure');
    }

    console.log('✅ Extracted Lead Activity Data:', leadActivityData);
    return leadActivityData; // Return the array of lead activity data
  } catch (error) {
    console.error('❌ Error fetching lead activity:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    throw new Error(error.response?.data?.message || 'Failed to fetch lead activity');
  }
};