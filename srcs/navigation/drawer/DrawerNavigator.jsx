
// // import React from 'react';
// // import { createDrawerNavigator } from '@react-navigation/drawer';
// // import CustomDrawerContent from './CustomDrawerContent';
// // import BottomTabNavigator from '../BottomTabNavigator';

// // import CallLog from '../../drawerComponent/CallLog';

// // import PerformanceReport from '../../drawerComponent/performance/PerformanceReport';
// // import DialReport from '../../drawerComponent/performance/DialReport';
// // import Logout from '../../drawerComponent/Logout';

// // const Drawer = createDrawerNavigator();

// // export default function DrawerNavigator() {
// //   return (
// //     <Drawer.Navigator
// //       drawerContent={(props) => <CustomDrawerContent {...props} />}
// //       screenOptions={{
// //         drawerPosition: 'left',
// //         headerShown: false,
// //         gestureEnabled: false, // Disable swipe gestures for all screens
// //         drawerStyle: {
// //           width: 255,
// //           // marginTop: 50.2,
// //           borderTopLeftRadius: 20,
// //           borderTopRightRadius: 20,
// //         },
// //         overlayColor: 'rgba(0,0,0,0)',
// //       }}
// //     >
// //       <Drawer.Screen name="Main" component={BottomTabNavigator} />
// //       <Drawer.Screen name="CallLog" component={CallLog} />
// //       <Drawer.Screen name="PerformanceReport" component={PerformanceReport} />
// //       <Drawer.Screen name="DialReport" component={DialReport} />
// //       <Drawer.Screen name="Logout" component={Logout} />
// //     </Drawer.Navigator>
// //   );
// // }


// import React, { Suspense } from 'react';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import CustomDrawerContent from './CustomDrawerContent';
// import BottomTabNavigator from '../BottomTabNavigator';
// import CallLog from '../../drawerComponent/CallLog';
// import PerformanceReport from '../../drawerComponent/performance/PerformanceReport';
// import DialReport from '../../drawerComponent/performance/DialReport';
// import Logout from '../../drawerComponent/Logout';
// import { View } from 'react-native';
// import { ActivityIndicator } from 'react-native';

// const Drawer = createDrawerNavigator();

// export default function DrawerNavigator() {
//   return (
//     <Suspense
//       fallback={
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
//           <ActivityIndicator size="large" color="#1976D2" />
//         </View>
//       }
//     >
//       <Drawer.Navigator
//         drawerContent={(props) => <CustomDrawerContent {...props} />}
//         screenOptions={{
//           drawerPosition: 'left',
//           headerShown: false,
//           gestureEnabled: false,
//           drawerStyle: {
//             width: 255,
//             borderTopLeftRadius: 20,
//             borderTopRightRadius: 20,
//           },
//           overlayColor: 'rgba(0,0,0,0)',
//         }}
//       >
//         <Drawer.Screen name="Main" component={BottomTabNavigator} />
//         <Drawer.Screen name="CallLog" component={CallLog} />
//         <Drawer.Screen name="PerformanceReport" component={PerformanceReport} />
//         <Drawer.Screen name="DialReport" component={DialReport} />
//         <Drawer.Screen name="Logout" component={Logout} />
//       </Drawer.Navigator>
//     </Suspense>
//   );
// }


import React, { Suspense } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ActivityIndicator, View } from 'react-native';
import { useTheme } from '../../component/ThemeToggle';
import BottomTabNavigator from '../BottomTabNavigator';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const { theme } = useTheme();

  return (
    <Suspense
      fallback={
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.background }}>
          <ActivityIndicator size="large" color={theme.button} />
        </View>
      }
    >
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            backgroundColor: theme.background,
          },
          drawerActiveTintColor: theme.button,
          drawerInactiveTintColor: theme.text,
        }}
      >
        <Drawer.Screen
          name="Home"
          component={BottomTabNavigator}
          options={{
            drawerLabel: 'Home',
          }}
        />
        <Drawer.Screen
          name="SettingsScreen"
          component={React.lazy(() => import('../../drawerComponent/SettingsScreen'))}
          options={{
            drawerLabel: 'Settings',
          }}
        />
      </Drawer.Navigator>
    </Suspense>
  );
};

export default DrawerNavigator;