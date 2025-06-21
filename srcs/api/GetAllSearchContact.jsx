// src/api/SearchContactApi.js
import apiClient from './apiClient';

export const getAllSearchContact = async (searchTerm) => {
  try {
    const response = await apiClient.get(`lead/searchContacts?search=${encodeURIComponent(searchTerm)}`);
    console.log('✅ Fetched Search Contacts:', response.data); // Debug
    return response.data; // Return the full response object
  } catch (error) {
    console.error('❌ Error fetching search contacts:', error.response?.data || error.message);
    throw error.response?.data?.message || 'Failed to fetch search contacts';
  }
};