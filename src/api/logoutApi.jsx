import apiClient from './apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const logOutUser = async () => {
  try {
    const systemUserId = await AsyncStorage.getItem('systemUserId');
    console.log('🆔 systemUserId:', systemUserId, typeof systemUserId); // Log for debugging
    if (!systemUserId) {
      throw new Error('No systemUserId found. Please log in again.');
    }

    const tokenExpiresAt = await AsyncStorage.getItem('tokenExpiresAt');
    if (tokenExpiresAt && Date.now() > parseInt(tokenExpiresAt)) {
      throw new Error('Token expired. Please log in again.');
    }

    const response = await apiClient.post(
      '/auth/logOut',
      { userId: systemUserId }, // Send userId in body
      {
        headers: {
          userId: systemUserId, // Keep in headers for compatibility
        },
      }
    );

    console.log('🌐 Logout API Response:', response.data);

    if (response.status === 200) {
      await Promise.all([
        AsyncStorage.removeItem('authToken'),
        AsyncStorage.removeItem('tokenExpiresAt'),
        AsyncStorage.removeItem('permissionList'),
        AsyncStorage.removeItem('categoryId'),
        AsyncStorage.removeItem('orgId'),
        AsyncStorage.removeItem('organizationName'),
        AsyncStorage.removeItem('empId'),
        AsyncStorage.removeItem('systemUserId'),
      ]);

      console.log('🧹 AsyncStorage cleared after logout');
      return response.data;
    } else {
      throw new Error(`Logout failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error('❌ Logout API Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers,
    });
    throw new Error(
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'Logout failed due to an unexpected error'
    );
  }
};