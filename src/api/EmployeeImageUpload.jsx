import apiClient from './apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Uploads an employee image to the API endpoint
export const uploadEmployeeImage = async (employeeId, image, fieldName = 'file') => {
  try {
    // Validate inputs
    if (!employeeId || typeof employeeId !== 'string') {
      throw new Error('Invalid or missing employeeId');
    }
    if (!image || !image.uri) {
      throw new Error('Invalid or missing image data');
    }

    console.log('📤 Preparing to upload image for employeeId:', employeeId);
    console.log('📤 Image details:', {
      uri: image.uri,
      type: image.type,
      name: image.fileName || `employee_${employeeId}.jpg`,
      fieldName,
    });

    // Create FormData
    const formData = new FormData();
    formData.append(fieldName, {
      uri: image.uri,
      type: image.type || 'image/jpeg',
      name: image.fileName || `employee_${employeeId}.jpg`,
    });

    // Log FormData (limited in React Native, but useful for debugging)
    console.log('📤 FormData prepared with field:', fieldName);

    // Retrieve token from AsyncStorage (if required)
    const token = await AsyncStorage.getItem('authToken');
    const headers = {
      'Content-Type': 'multipart/form-data',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    console.log('📤 Request headers:', headers);

    // Make API request
    const response = await apiClient.post(`/employee/employeeImg/${employeeId}`, formData, {
      headers,
    });

    console.log('✅ Image Upload Response:', response.data);

    if (!response.data || !response.data.data) {
      throw new Error('No image URL in API response');
    }

    return { photoUrl: response.data.data }; // Return normalized response
  } catch (error) {
    console.error('❌ Error uploading employee image:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      requestUrl: `/employee/employeeImg/${employeeId}`,
      employeeId,
    });
    throw new Error(error.response?.data?.message || 'Failed to upload employee image');
  }
};