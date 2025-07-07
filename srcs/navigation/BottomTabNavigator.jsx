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

import React, { Suspense, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, View, StyleSheet, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import changeNavigationBarColor from 'react-native-navigation-bar-color'; // 🔸 Import added

import HomeScreen from '../dashboard/HomeScreen';
import ProfileScreen from '../drawerComponent/ProfileScreen';
import LeadsScreen from '../drawerComponent/LeadScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({ navigation }) => {
  // 🔸 Set nav bar background color on mount
  useEffect(() => {
    changeNavigationBarColor('#3F4CA0', false); // false = dark icons (white)
  }, []);

  return (
    <Suspense
      fallback={
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
          <ActivityIndicator size="large" color="#1976D2" />
        </View>
      }
    >
      <Tab.Navigator
        initialRouteName="Dashboard"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Dashboard') {
              iconName = focused ? 'grid' : 'grid-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'Leads') {
              iconName = focused ? 'document-text' : 'document-text-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#FFFFFF',
          tabBarInactiveTintColor: '#D1D5DB',
          tabBarStyle: {
            height: 70, // Increased height for bottom safe area
            paddingBottom: 20, // Add padding above nav bar
            paddingTop: 5,
            borderTopWidth: 0,
            elevation: 10,
            backgroundColor: 'transparent', // Required for gradient background
          },
          tabBarBackground: () => (
            <LinearGradient
              colors={['#8290EA', '#3F4CA0']}
              style={{ flex: 1 }}
            />
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
        })}
      >
        <Tab.Screen name="Leads" component={LeadsScreen} />
        <Tab.Screen
          name="Dashboard"
          component={HomeScreen}
          options={{
            tabBarButton: (props) => {
              const isFocused = props.accessibilityState?.selected;
              return (
                <View style={styles.middleButtonContainer}>
                  <TouchableOpacity {...props} style={styles.middleButton}>
                    <LinearGradient
                      colors={['#8290EA', '#3F4CA0']}
                      style={styles.middleButtonGradient}
                    >
                      <Ionicons
                        name={isFocused ? 'grid' : 'grid-outline'}
                        size={30}
                        color="#FFFFFF"
                      />
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              );
            },
          }}
        />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </Suspense>
  );
};

const styles = StyleSheet.create({
  middleButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleButton: {
    top: -20,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    backgroundColor: '#FFFFFF',
  },
  middleButtonGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
});

export default BottomTabNavigator;
