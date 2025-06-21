import apiClient from './apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const getLeadById = async (leadId, options = {}) => {
    try {
      if (!/^[0-9a-fA-F]{24}$/.test(leadId)) {
        throw new Error('Invalid lead ID format');
      }
      const token = await AsyncStorage.getItem('token');
      const { fields } = options;
      const url = fields
        ? `lead/getLeadById/${leadId}?fields=${fields}`
        : `lead/getLeadById/${leadId}`;
      console.log('Fetching lead with URL:', url);
      const response = await apiClient.get(url);
      console.log('Raw API Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching lead by ID:', error.response?.data || error.message);
      throw error.response?.data?.message || error.message || 'Failed to fetch lead';
    }
  };