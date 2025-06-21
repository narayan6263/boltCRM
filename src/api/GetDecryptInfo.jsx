// src/api/getDecryptInfoApi.js
import apiClient from './apiClient'; // Adjust the path to your apiClient file

export const fetchDecryptInfo = async (contactId) => {
  try {
    // console.log('GetDecryptInfo: Making API call for contactId:', contactId);
    // console.log('GetDecryptInfo: Full URL will be:', `lead/getDecryptInfo/${contactId}`);
    const response = await apiClient.get(`lead/getDecryptInfo/${contactId}`);
    console.log('GetDecryptInfo: API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('GetDecryptInfo: Error fetching decrypt info:', error);
    console.error('GetDecryptInfo: Error response data:', error.response?.data);
    console.error('GetDecryptInfo: Error status:', error.response?.status);
    throw error;
  }
};