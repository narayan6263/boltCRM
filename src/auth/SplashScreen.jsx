// import React, { useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Loader from '../components/Loader'; 

// const SplashScreen = ({ navigation }) => {
//   useEffect(() => {
//     const checkAuthStatus = async () => {
//       try {
//         const token = await AsyncStorage.getItem('authToken');
//         const expiresAt = await AsyncStorage.getItem('tokenExpiresAt');
//         const hasLoggedIn = await AsyncStorage.getItem('hasLoggedIn');
//         const hasSeenWelcome = await AsyncStorage.getItem('hasSeenWelcome');

//         console.log('SplashScreen auth check:', {
//           token: token ? 'exists' : 'not found',
//           expiresAt,
//           hasLoggedIn,
//           hasSeenWelcome,
//         });

//         // Delay navigation to allow animation to complete
//         setTimeout(() => {
//           if (token && expiresAt && Date.now() < parseInt(expiresAt, 10)) {
//             // Valid token, go to HomeScreen
//             navigation.replace('HomeScreen');
//           } else if (hasLoggedIn || hasSeenWelcome === 'true') {
//             // Has logged in before or seen welcome screen, go to LoginScreen
//             navigation.replace('LoginScreen');
//           } else {
//             // New user (never logged in and never seen welcome), go to WelcomeScreen
//             navigation.replace('WelcomeScreen');
//           }
//         }, 1500); // Delay to match animation duration
//       } catch (error) {
//         console.error('SplashScreen auth check error:', error);
//         // Clear auth data on error
//         await clearAuthData();
//         // Navigate to WelcomeScreen for safety
//         setTimeout(() => navigation.replace('WelcomeScreen'), 1500);
//       }
//     };

//     const clearAuthData = async () => {
//       try {
//         await AsyncStorage.multiRemove([
//           'authToken',
//           'tokenExpiresAt',
//           'permissionList',
//           'categoryId',
//           'orgId',
//           'organizationName',
//           'systemUserId',
//           'empId',
//         ]);
//       } catch (err) {
//         console.error('Error clearing auth data:', err);
//       }
//     };

//     checkAuthStatus();
//   }, [navigation]);

//   return <Loader variant="default" size="large" color="#FFFFFF" />;
// };

// export default SplashScreen;