// import React, { useEffect, useState } from 'react';
// import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const AuthLoadingScreen = ({ navigation }) => {
//     const [status, setStatus] = useState('Checking authentication...');

//     const checkAuthStatus = async () => {
//         try {
//             const token = await AsyncStorage.getItem('authToken');
//             const expiresAt = await AsyncStorage.getItem('tokenExpiresAt');
//             const hasSeenWelcome = await AsyncStorage.getItem('hasSeenWelcome');
//             const hasLoggedIn = await AsyncStorage.getItem('hasLoggedIn');

//             console.log('Auth check:', { 
//                 token: token ? 'exists' : 'not found', 
//                 expiresAt,
//                 hasSeenWelcome,
//                 hasLoggedIn 
//             });

//             if (token && expiresAt) {
//                 const currentTime = Date.now();
//                 const expirationTime = parseInt(expiresAt, 10);

//                 if (currentTime < expirationTime) {
//                     setStatus('Authentication valid');
//                     navigation.replace('HomeScreen');
//                 } else {
//                     console.log('Token expired');
//                     setStatus('Token expired');
//                     await clearAuthData();
//                     // Check if user has seen welcome screen
//                     if (hasSeenWelcome === 'true') {
//                         navigation.replace('LoginScreen');
//                     } else {
//                         navigation.replace('WelcomeScreen');
//                     }
//                 }
//             } else {
//                 console.log('No valid token found');
//                 setStatus('No authentication found');
//                 await clearAuthData();
                
//                 // Check if user has seen welcome screen
//                 if (hasSeenWelcome === 'true') {
//                     navigation.replace('LoginScreen');
//                 } else {
//                     navigation.replace('WelcomeScreen');
//                 }
//             }
//         } catch (error) {
//             console.error('Auth check error:', error);
//             setStatus('Authentication error');
//             await clearAuthData();
//             navigation.replace('LoginScreen');
//         }
//     };

//     const clearAuthData = async () => {
//         try {
//             await AsyncStorage.multiRemove([
//                 'authToken',
//                 'tokenExpiresAt',
//                 'permissionList',
//                 'categoryId',
//                 'orgId',
//                 'organizationName',
//                 'systemUserId',
//                 'empId',
//             ]);
//         } catch (err) {
//             console.error('Error clearing auth data:', err);
//         }
//     };

//     useEffect(() => {
//         checkAuthStatus();
//     }, [navigation]);

//     return (
//         <View style={styles.container}>
//             <ActivityIndicator size="large" color="#0056b3" />
//             <Text style={styles.statusText}>{status}</Text>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#FFFFFF',
//         padding: 20,
//     },
//     statusText: {
//         marginTop: 20,
//         fontSize: 16,
//         color: '#333',
//     },
// });

// export default AuthLoadingScreen;


import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthLoadingScreen = ({ navigation }) => {
  const [status, setStatus] = useState('Checking authentication...');

  const checkAuthStatus = async () => {
    try {
      const [token, expiresAt, orgId, systemUserId] = await AsyncStorage.multiGet([
        'authToken',
        'tokenExpiresAt',
        'orgId',
        'systemUserId',
      ]);

      console.log('Auth check:', {
        token: token[1] ? 'exists' : 'not found',
        expiresAt: expiresAt[1],
        orgId: orgId[1] ? 'exists' : 'not found',
        systemUserId: systemUserId[1] ? 'exists' : 'not found',
      });

      const hasSeenWelcome = await AsyncStorage.getItem('hasSeenWelcome');

      if (token[1] && expiresAt[1] && orgId[1] && systemUserId[1]) {
        const currentTime = Date.now();
        const expirationTime = parseInt(expiresAt[1], 10);

        if (currentTime < expirationTime) {
          setStatus('Authentication valid');
          navigation.replace('HomeScreen');
        } else {
          console.log('Token expired');
          setStatus('Token expired');
          await clearAuthData();
          navigation.replace(hasSeenWelcome === 'true' ? 'LoginScreen' : 'WelcomeScreen');
        }
      } else {
        console.log('Missing required authentication data');
        setStatus('No authentication found');
        await clearAuthData();
        navigation.replace(hasSeenWelcome === 'true' ? 'LoginScreen' : 'WelcomeScreen');
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setStatus('Authentication error');
      await clearAuthData();
      navigation.replace('LoginScreen');
    }
  };

  const clearAuthData = async () => {
    try {
      await AsyncStorage.multiRemove([
        'authToken',
        'tokenExpiresAt',
        'permissionList',
        'categoryId',
        'orgId',
        'organizationName',
        'systemUserId',
        'empId',
      ]);
      console.log('🧹 AsyncStorage cleared');
    } catch (err) {
      console.error('Error clearing auth data:', err);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0056b3" />
      <Text style={styles.statusText}>{status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  statusText: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
  },
});

export default AuthLoadingScreen;