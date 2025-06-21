// // import React from 'react';
// // import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// // import { TouchableOpacity, View, StyleSheet } from 'react-native';
// // import Ionicons from 'react-native-vector-icons/Ionicons';
// // import LinearGradient from 'react-native-linear-gradient';
// // import { useIsFocused } from '@react-navigation/native';
// // import HomeScreen from '../dashboard/HomeScreen';
// // import ProfileScreen from '../drawerComponent/ProfileScreen';
// // import LeadsScreen from '../drawerComponent/LeadScreen';

// // const Tab = createBottomTabNavigator();

// // const BottomTabNavigator = ({ navigation }) => {
// //   return (
// //     <Tab.Navigator
// //       initialRouteName="Dashboard"
// //       screenOptions={({ route }) => ({
// //         headerShown: false,
// //         tabBarIcon: ({ focused, color, size }) => {
// //           let iconName;
// //           if (route.name === 'Dashboard') {
// //             iconName = focused ? 'grid' : 'grid-outline';
// //           } else if (route.name === 'Profile') {
// //             iconName = focused ? 'person' : 'person-outline';
// //           } else if (route.name === 'Leads') {
// //             iconName = focused ? 'document-text' : 'document-text-outline';
// //           }
// //           return <Ionicons name={iconName} size={size} color={color} />;
// //         },
// //         tabBarActiveTintColor: '#FFFFFF',
// //         tabBarInactiveTintColor: '#D1D5DB',
// //         tabBarStyle: {
// //           height: 60,
// //           paddingBottom: 5,
// //           paddingTop: 5,
// //           borderTopWidth: 0,
// //           elevation: 10,
// //         },
// //         tabBarBackground: () => (
// //           <LinearGradient
// //             colors={['#8290EA', '#3F4CA0']}
// //             style={{ flex: 1 }}
// //           />
// //         ),
// //         tabBarLabelStyle: {
// //           fontSize: 12,
// //           fontWeight: '600',
// //         },
// //       })}
// //     >
// //       <Tab.Screen name="Leads" component={LeadsScreen} />
// //       <Tab.Screen
// //         name="Dashboard"
// //         component={HomeScreen}
// //         options={{
// //           tabBarButton: (props) => {
// //             const isFocused = props.accessibilityState?.selected;

// //             return (
// //               <View style={styles.middleButtonContainer}>
// //                 <TouchableOpacity
// //                   {...props}
// //                   style={styles.middleButton}
// //                 >
// //                   <LinearGradient
// //                     colors={['#8290EA', '#3F4CA0']}
// //                     style={styles.middleButtonGradient}
// //                   >
// //                     <Ionicons
// //                       name={isFocused ? 'grid' : 'grid-outline'}
// //                       size={30}
// //                       color="#FFFFFF"
// //                     />
// //                   </LinearGradient>
// //                 </TouchableOpacity>
// //               </View>
// //             );
// //           },
// //         }}
// //       />
// //       <Tab.Screen name="Profile" component={ProfileScreen} />
// //     </Tab.Navigator>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   middleButtonContainer: {
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// //   middleButton: {
// //     top: -20,
// //     width: 60,
// //     height: 60,
// //     borderRadius: 30,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     elevation: 10,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 2, height: 4 },
// //     shadowOpacity: 0.4,
// //     shadowRadius: 6,
// //     backgroundColor: '#FFFFFF',
// //   },
// //   middleButtonGradient: {
// //     width: 60,
// //     height: 60,
// //     borderRadius: 30,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     borderWidth: 2,
// //     borderColor: 'rgba(255, 255, 255, 0.3)',
// //   },
// // });

// // export default BottomTabNavigator;

// import React, { Suspense } from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { TouchableOpacity, View, StyleSheet, ActivityIndicator } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import LinearGradient from 'react-native-linear-gradient';
// import HomeScreen from '../dashboard/HomeScreen';
// import ProfileScreen from '../drawerComponent/ProfileScreen';
// import LeadsScreen from '../drawerComponent/LeadScreen';

// const Tab = createBottomTabNavigator();

// const BottomTabNavigator = ({ navigation }) => {
//   return (
//     <Suspense
//       fallback={
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
//           <ActivityIndicator size="large" color="#1976D2" />
//         </View>
//       }
//     >
//       <Tab.Navigator
//         initialRouteName="Dashboard"
//         screenOptions={({ route }) => ({
//           headerShown: false,
//           tabBarIcon: ({ focused, color, size }) => {
//             let iconName;
//             if (route.name === 'Dashboard') {
//               iconName = focused ? 'grid' : 'grid-outline';
//             } else if (route.name === 'Profile') {
//               iconName = focused ? 'person' : 'person-outline';
//             } else if (route.name === 'Leads') {
//               iconName = focused ? 'document-text' : 'document-text-outline';
//             }
//             return <Ionicons name={iconName} size={size} color={color} />;
//           },
//           tabBarActiveTintColor: '#FFFFFF',
//           tabBarInactiveTintColor: '#D1D5DB',
//           tabBarStyle: {
//             height: 60,
//             paddingBottom: 5,
//             paddingTop: 5,
//             borderTopWidth: 0,
//             elevation: 10,
//           },
//           tabBarBackground: () => (
//             <LinearGradient
//               colors={['#8290EA', '#3F4CA0']}
//               style={{ flex: 1 }}
//             />
//           ),
//           tabBarLabelStyle: {
//             fontSize: 12,
//             fontWeight: '600',
//           },
//         })}
//       >
//         <Tab.Screen name="Leads" component={LeadsScreen} />
//         <Tab.Screen
//           name="Dashboard"
//           component={HomeScreen}
//           options={{
//             tabBarButton: (props) => {
//               const isFocused = props.accessibilityState?.selected;
//               return (
//                 <View style={styles.middleButtonContainer}>
//                   <TouchableOpacity {...props} style={styles.middleButton}>
//                     <LinearGradient
//                       colors={['#8290EA', '#3F4CA0']}
//                       style={styles.middleButtonGradient}
//                     >
//                       <Ionicons
//                         name={isFocused ? 'grid' : 'grid-outline'}
//                         size={30}
//                         color="#FFFFFF"
//                       />
//                     </LinearGradient>
//                   </TouchableOpacity>
//                 </View>
//               );
//             },
//           }}
//         />
//         <Tab.Screen name="Profile" component={ProfileScreen} />
//       </Tab.Navigator>
//     </Suspense>
//   );
// };

// const styles = StyleSheet.create({
//   middleButtonContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   middleButton: {
//     top: -20,
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.4,
//     shadowRadius: 3,
//     backgroundColor: '#FFFFFF',
//   },
//   middleButtonGradient: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 2,
//     borderColor: 'rgba(255, 255, 255, 0.3)',
//   },
// });

// export default BottomTabNavigator;


import React, { Suspense } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ActivityIndicator, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../component/ThemeToggle';
import { RFPercentage } from 'react-native-responsive-fontsize';

// Lazy load screens
const WelcomeScreen = React.lazy(() => import('../auth/WelcomeScreen'));
const LoginScreen = React.lazy(() => import('../auth/LoginScreen'));
const SettingsScreen = React.lazy(() => import('../drawerComponent/SettingsScreen'));

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { theme } = useTheme();

  return (
    <Suspense
      fallback={
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.background }}>
          <ActivityIndicator size="large" color={theme.button} />
        </View>
      }
    >
      <Tab.Navigator
        initialRouteName="WelcomeScreen"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: theme.button,
          tabBarInactiveTintColor: theme.text,
          tabBarStyle: {
            backgroundColor: theme.background,
            borderTopColor: theme.border,
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'WelcomeScreen') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'LoginScreen') {
              iconName = focused ? 'log-in' : 'log-in-outline';
            } else if (route.name === 'SettingsScreen') {
              iconName = focused ? 'settings' : 'settings-outline';
            }
            return <Ionicons name={iconName} size={RFPercentage(3)} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{ tabBarLabel: 'Welcome' }}
        />
        <Tab.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ tabBarLabel: 'Login' }}
        />
        <Tab.Screen
          name="SettingsScreen"
          component={SettingsScreen}
          options={{ tabBarLabel: 'Settings' }}
        />
      </Tab.Navigator>
    </Suspense>
  );
};

export default BottomTabNavigator;