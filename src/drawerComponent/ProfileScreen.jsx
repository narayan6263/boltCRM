import React, { useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, ScrollView, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployeeById, clearEmployee } from '../redux/slices/getEmployeeByIdSlice';
import { uploadEmployeeImageThunk } from '../redux/slices/employeeImageSlice';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary } from 'react-native-image-picker';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { employee, loading, error } = useSelector((state) => state.employee);
  const { photoUrl, uploading, error: uploadError } = useSelector((state) => state.employeeImage);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const empIdStored = await AsyncStorage.getItem('empId');
        console.log('🆔 Employee ID:', empIdStored);
        if (empIdStored) {
          dispatch(fetchEmployeeById(empIdStored));
        } else {
          dispatch({
            type: 'employee/fetchEmployeeById/rejected',
            payload: 'No employee ID found. Please log in again.',
          });
        }
      } catch (error) {
        console.error('Error retrieving empId:', error);
        dispatch({
          type: 'employee/fetchEmployeeById/rejected',
          payload: 'Failed to retrieve employee ID.',
        });
      }
    };

    fetchProfile();

    return () => {
      dispatch(clearEmployee());
    };
  }, [dispatch]);

  const handleImageUpload = async () => {
    try {
      const empIdStored = await AsyncStorage.getItem('empId');
      if (!empIdStored) {
        Alert.alert('Error', 'No employee ID found. Please log in again.');
        return;
      }

      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
        maxWidth: 1024,
        maxHeight: 1024,
      });

      if (result.didCancel) {
        console.log('User cancelled image picker');
        return;
      }

      if (result.errorCode) {
        Alert.alert('Error', `Image picker error: ${result.errorMessage}`);
        return;
      }

      const image = result.assets[0];
      console.log('📸 Selected image:', image);
      dispatch(uploadEmployeeImageThunk({ employeeId: empIdStored, image, fieldName: 'file' }));
    } catch (error) {
      console.error('Error selecting image:', error);
      Alert.alert('Error', 'Failed to select image.');
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#007AFF" className="mt-24" />;
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-[#E2E4F6] justify-center">
        <Text className="text-red-500 text-center text-base">{error}</Text>
      </SafeAreaView>
    );
  }

  if (!employee) {
    return (
      <SafeAreaView className="flex-1 bg-[#E2E4F6] justify-center">
        <Text className="text-red-500 text-center text-base">No profile data available.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#E2E4F6]">
      <ScrollView contentContainerStyle={{ padding: 0 }}>
        {/* Profile Header */}
        <LinearGradient
          colors={['#8290EA', '#3F4CA0']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          className="rounded-b-2xl shadow-lg px-6 py-8 items-center mb-6"
        >
          <View className="relative">
            <Image
              source={
                photoUrl || employee.photoUrl
                  ? { uri: photoUrl || employee.photoUrl }
                  : require('../assets/profileIcon.jpeg')
              }
              className="w-28 h-28 rounded-full mb-4"
            />
            <TouchableOpacity
              onPress={handleImageUpload}
              className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow"
              disabled={uploading}
            >
              <Ionicons
                name="cloud-upload-outline"
                size={20}
                color={uploading ? '#ccc' : '#007AFF'}
              />
            </TouchableOpacity>
          </View>
          {uploading && <ActivityIndicator size="small" color="#fff" className="mb-2" />}
          {uploadError && (
            <Text className="text-red-300 text-xs mb-2 text-center">
              {uploadError.includes('500') ? 'Server error. Please try again later.' : uploadError}
            </Text>
          )}
          <Text className="text-xl font-bold text-white">
            {employee.salutation || ''} {employee.firstName} {employee.lastName || 'N/A'}
          </Text>
          <Text className="text-sm text-white">{employee.jobTitle || 'N/A'}</Text>
          <Text className="text-xs text-white mt-1">[{employee.categoryName || 'N/A'}]</Text>
        </LinearGradient>

        {/* Personal Details */}
        <View className="bg-white rounded-2xl shadow p-6 mb-4">
          <Text className="text-lg font-semibold text-[#007AFF] mb-4">Personal Details</Text>
          <View className="space-y-4">
            <View className="flex-row items-center space-x-3">
              <Ionicons name="person" size={20} color="#555" />
              <Text className="text-gray-800 font-medium">
                {employee.salutation || ''} {employee.firstName} {employee.lastName || 'N/A'}
              </Text>
            </View>
            <View className="flex-row items-center space-x-3">
              <Ionicons name="mail" size={20} color="#555" />
              <Text className="text-gray-800 font-medium">{employee.email || 'N/A'}</Text>
            </View>
            <View className="flex-row items-center space-x-3">
              <Ionicons name="calendar" size={20} color="#555" />
              <Text className="text-gray-800 font-medium">{employee.demographics?.dob || 'N/A'}</Text>
            </View>
            <View className="flex-row items-center space-x-3">
              <Ionicons name="call" size={20} color="#555" />
              <Text className="text-gray-800 font-medium">{employee.mobile || 'N/A'}</Text>
            </View>
            <View className="flex-row items-center space-x-3">
              <Ionicons name="business" size={20} color="#555" />
              <Text className="text-gray-800 font-medium">{employee.organizationId?.organizationName || 'N/A'}</Text>
            </View>
            <View className="flex-row items-center space-x-3">
              <Ionicons name="male-female" size={20} color="#555" />
              <Text className="text-gray-800 font-medium">{employee.demographics?.gender || 'N/A'}</Text>
            </View>
          </View>
        </View>

        {/* Present Address */}
        <View className="bg-white rounded-2xl shadow p-6 mb-4">
          <Text className="text-lg font-semibold text-[#007AFF] mb-4">Present Address</Text>
          <View className="space-y-4">
            <View className="flex-row items-center space-x-3">
              <Ionicons name="location" size={20} color="#555" />
              <Text className="text-gray-800 font-medium">
                {employee.presentAddress?.address || employee.presentAddress?.street || 'N/A'}
              </Text>
            </View>
            <View className="flex-row items-center space-x-3">
              <Ionicons name="map" size={20} color="#555" />
              <Text className="text-gray-800 font-medium">{employee.presentAddress?.city || 'N/A'}</Text>
            </View>
            <View className="flex-row items-center space-x-3">
              <Ionicons name="flag" size={20} color="#555" />
              <Text className="text-gray-800 font-medium">{employee.presentAddress?.state || 'N/A'}</Text>
            </View>
            <View className="flex-row items-center space-x-3">
              <Ionicons name="globe" size={20} color="#555" />
              <Text className="text-gray-800 font-medium">{employee.presentAddress?.country || 'N/A'}</Text>
            </View>
          </View>
        </View>

        {/* Emergency Contact */}
        <View className="bg-white rounded-2xl shadow p-6 mb-4">
          <Text className="text-lg font-semibold text-[#007AFF] mb-4">Emergency Contact</Text>
          <View className="space-y-4">
            <View className="flex-row items-center space-x-3">
              <Ionicons name="person-outline" size={20} color="#555" />
              <Text className="text-gray-800 font-medium">{employee.emergencyContact?.name || 'N/A'}</Text>
            </View>
            <View className="flex-row items-center space-x-3">
              <Ionicons name="call" size={20} color="#555" />
              <Text className="text-gray-800 font-medium">
                {employee.emergencyContact?.mobilePhone || 'N/A'} (Mobile)
              </Text>
            </View>
            <View className="flex-row items-center space-x-3">
              <Ionicons name="home" size={20} color="#555" />
              <Text className="text-gray-800 font-medium">
                {employee.emergencyContact?.homePhone || 'N/A'} (Home)
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;