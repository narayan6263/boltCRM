

import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import LinearGradient from 'react-native-linear-gradient';
import { styled } from 'nativewind';
import CustomPoppinsFonts from '../../font/CustomPoppinsFonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployeeById, clearEmployee } from '../../redux/slices/getEmployeeByIdSlice';

// Styled components
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledView = styled(View);
const StyledText = styled(Text);

// Menu item configuration for reusability
const menuItems = [
  {
    name: 'Dashboard',
    iconActive: require('../../assets/dashboard-active.png'),
    iconInactive: require('../../assets/dashboardd.png'),
    route: 'Dashboard',
  },
  {
    name: 'Leads',
    iconActive: require('../../assets/leads-active.png'),
    iconInactive: require('../../assets/leads.png'),
    route: 'Leads',
  },
  {
    name: 'Performance Report',
    iconActive: require('../../assets/perfomance-report-active.png'),
    iconInactive: require('../../assets/perfomance-report.png'),
    route: 'PerformanceReport',
  },
  {
    name: 'DialUp Report',
    iconActive: require('../../assets/task-management-active.png'),
    iconInactive: require('../../assets/task-management.png'),
    route: 'DialReport',
  },
  {
    name: 'Call Logs',
    iconActive: require('../../assets/call-log-active.png'),
    iconInactive: require('../../assets/call-log.png'),
    route: 'CallLog',
  },
  {
    name: 'Log out',
    iconActive: require('../../assets/log-out-active.png'),
    iconInactive: require('../../assets/log-out.png'),
    route: 'Logout',
  }, 
];

// Full divider component
const FullDivider = () => (
  <StyledView className="w-full h-[1px] bg-white/50 my-1" /> // Changed my-3 to my-1
);

const CustomDrawerContent = ({ navigation, state }) => {
  const dispatch = useDispatch();
  const { employee, loading, error } = useSelector((state) => state.employee);
  const { photoUrl } = useSelector((state) => state.employeeImage);

  // Get current route, handling nested BottomTabNavigator
  const getCurrentRoute = () => {
    const currentRoute = state.routes[state.index];
    if (currentRoute.name === 'Main' && currentRoute.state) {
      return currentRoute.state.routes[currentRoute.state.index].name;
    }
    return currentRoute.name;
  };

  const currentRoute = getCurrentRoute();

  // Fetch employee data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const empId = await AsyncStorage.getItem('empId');
        console.log('🆔 Employee ID:', empId);
        if (empId) {
          dispatch(fetchEmployeeById(empId));
        } else {
          dispatch({
            type: 'employee/fetchEmployeeById/rejected',
            payload: 'No employee ID found. Please log in again.',
          });
        }
      } catch (err) {
        console.error('Error retrieving empId:', err);
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

  // Loading state
  if (loading) {
    return (
      <LinearGradient
        colors={['#B3A5F1', '#8BAAFC']}
        className="flex-1 justify-center items-center"
      >
        <ActivityIndicator size="large" color="#fff" />
      </LinearGradient>
    );
  }

  // Error state with retry option
  if (error) {
    return (
      <LinearGradient
        colors={['#B3A5F1', '#8BAAFC']}
        className="flex-1 justify-center items-center px-5"
      >
        <StyledText className="text-red-300 text-center text-base mb-4">
          {error}
        </StyledText>
        <StyledTouchableOpacity
          className="bg-white/20 px-4 py-2 rounded-lg"
          onPress={() => dispatch(fetchEmployeeById())}
        >
          <StyledText className="text-white text-base">Retry</StyledText>
        </StyledTouchableOpacity>
      </LinearGradient>
    );
  }

  // Render menu item
  const renderMenuItem = ({ name, iconActive, iconInactive, route }) => (
    <StyledTouchableOpacity
      key={name}
      className={`flex-row items-center py-3 px-5 rounded-xl ${
        currentRoute === route ? 'bg-[#E8EAF3]' : ''
      }`}
      onPress={() => navigation.navigate(route === 'Dashboard' || route === 'Leads' ? 'Main' : route, {
        screen: route === 'Dashboard' || route === 'Leads' ? route : undefined,
      })}
    >
      <Image
        source={currentRoute === route ? iconActive : iconInactive}
        className="w-6 h-6"
      />
      <CustomPoppinsFonts
        className={`text-[15px] font-normal ml-3 ${
          currentRoute === route ? 'text-[#707FDD]' : 'text-white'
        }`}
      >
        {name}
      </CustomPoppinsFonts>
    </StyledTouchableOpacity>
  );

  return (
    <LinearGradient colors={['#B3A5F1', '#8BAAFC']} className="flex-1">
      <StyledView className="h-8" />

      {/* Profile Section */}
      <StyledTouchableOpacity
        onPress={() => navigation.navigate('Main', { screen: 'Profile' })}
        className="items-center mb-0 px-5"
      >
        <Image
          source={
            photoUrl || employee?.photoUrl
              ? { uri: photoUrl || employee.photoUrl }
              : require('../../assets/profileIcon.jpeg')
          }
          className="w-20 h-20 rounded-full border-2 border-white/30"
        />
        <StyledText className="text-white text-lg font-bold mt-2 text-center">
          {employee
            ? `${employee.salutation || ''} ${employee.firstName} ${employee.lastName || ''}`
            : 'N/A'}
        </StyledText>
      </StyledTouchableOpacity>

      <FullDivider />

      {/* Menu Items */}
      <DrawerContentScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 0,
          paddingVertical: 5, // Reduced from 10 to 5
        }}
      >
        {menuItems.map(renderMenuItem)}
      </DrawerContentScrollView>
    </LinearGradient>
  );
};

export default CustomDrawerContent;