import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import SplashScreen from '../auth/SplashScreen';
import LoginScreen from '../auth/LoginScreen';
import DrawerNavigator from './drawer/DrawerNavigator';
// import EditTaskFormScreen from '../dashboard/drawerComponent/EditTaskFormScreen';
import CallScreen from '../drawerComponent/phone/CallScreen';
import FeedbackScreen from '../drawerComponent/phone/FeedbackScreen';
import LeadDetailsScreen from '../drawerComponent/LeadDetailsScreen';
import AddLeadForm from '../drawerComponent/AddLeadForm';
import EditLeadsDetails from '../drawerComponent/EditLeadsDetails';
import PendingFollowUps from '../dashboard/PendingFollowUps';
import TodayFollowUps from '../dashboard/TodayFollowUps';
import TomorrowFollowUps from '../dashboard/TomorrowFollowUps';
import SearchFilterForm from '../dashboard/SearchFilterForm';
import ProfileScreen from '../drawerComponent/ProfileScreen';
import BulkAssignLeads from '../drawerComponent/BulkAssignLeads';
import DialerScreen from '../drawerComponent/DialerScreen';
import AddLeadDetail from '../drawerComponent/AddLeadDetail';
import ContactFeedbackForm from '../drawerComponent/ContactFeedbackForm';
import WelcomeScreen from '../auth/WelcomeScreen';
import AuthLoadingScreen from '../auth/AuthLoadingScreen';
import DetailsTab from '../drawerComponent/DetailsTab';
import HistoryTab from '../drawerComponent/HistoryTab';
import MapScreen from '../drawerComponent/MapScreen';
import HomeScreen from '../dashboard/HomeScreen';
// import LeadsScreen from '../drawerComponent/LeadScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="AuthLoadingScreen"
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.FadeFromBottomAndroid, // Default transition for non-modal screens
      }}
    >
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="AuthLoadingScreen" component={AuthLoadingScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="HomeScreen" component={DrawerNavigator} />
      {/* <Stack.Screen name="EditTaskForm" component={EditTaskFormScreen} /> */}
      <Stack.Screen name="CallScreen" component={CallScreen} />
      <Stack.Screen name="FeedbackScreen" component={FeedbackScreen} />
      <Stack.Screen name="LeadDetailsScreen" component={LeadDetailsScreen} />
      <Stack.Screen name="DetailTab" component={DetailsTab} />
      <Stack.Screen name="AddLeadForm" component={AddLeadForm} />
      <Stack.Screen name="EditLeadsDetails" component={EditLeadsDetails} />
      <Stack.Screen name="PendingFollowUps" component={PendingFollowUps} />
      <Stack.Screen name="TodayFollowUps" component={TodayFollowUps} />
      <Stack.Screen name="TomorrowFollowUps" component={TomorrowFollowUps} />
      {/* <Stack.Screen name="home" component={HomeScreen} /> */}

      <Stack.Screen
        name="AddLeadDetail"
        component={AddLeadDetail}
        options={{
          presentation: 'transparentModal', // Render as a modal
          cardStyle: { backgroundColor: 'transparent' }, // Transparent background
          headerShown: false, // Hide default header
          cardOverlayEnabled: true, // Enable overlay effect
          gestureEnabled: true, // Allow swipe-to-dismiss (optional)
        }}
      />
      <Stack.Screen name="SearchFilterForm" component={SearchFilterForm} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="BulkAssignLeads" component={BulkAssignLeads} />
      {/* <Stack.Screen name="DialerScreen" component={DialerScreen} /> */}
      <Stack.Screen name="ContactFeedbackForm" component={ContactFeedbackForm} />
      {/* <Stack.Screen name="LeadsScreen" component={LeadsScreen} /> */}
      <Stack.Screen name="MapScreen" component={MapScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;


// import React, { Suspense } from 'react';
// import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
// import { View } from 'react-native';
// import { ActivityIndicator } from 'react-native';
// import LeadTabs from '../drawerComponent/LeadTabs';

// // Lazy load all screen components
// const SplashScreen = React.lazy(() => import('../auth/SplashScreen'));
// const LoginScreen = React.lazy(() => import('../auth/LoginScreen'));
// const DrawerNavigator = React.lazy(() => import('./drawer/DrawerNavigator'));
// const CallScreen = React.lazy(() => import('../drawerComponent/phone/CallScreen'));
// const FeedbackScreen = React.lazy(() => import('../drawerComponent/phone/FeedbackScreen'));
// const LeadDetailsScreen = React.lazy(() => import('../drawerComponent/LeadDetailsScreen'));
// const AddLeadForm = React.lazy(() => import('../drawerComponent/AddLeadDetail'));
// const EditLeadsDetails = React.lazy(() => import('../drawerComponent/EditLeadsDetails'));
// const PendingFollowUps = React.lazy(() => import('../dashboard/PendingFollowUps'));
// const TodayFollowUps = React.lazy(() => import('../dashboard/TodayFollowUps'));
// const TomorrowFollowUps = React.lazy(() => import('../dashboard/TomorrowFollowUps'));
// const SearchFilterForm = React.lazy(() => import('../dashboard/SearchFilterForm'));
// const ProfileScreen = React.lazy(() => import('../drawerComponent/ProfileScreen'));
// const BulkAssignLeads = React.lazy(() => import('../drawerComponent/BulkAssignLeads'));
// const DialerScreen = React.lazy(() => import('../drawerComponent/DialerScreen'));
// const AddLeadDetail = React.lazy(() => import('../drawerComponent/AddLeadDetail'));
// const ContactFeedbackForm = React.lazy(() => import('../drawerComponent/ContactFeedbackForm'));
// const WelcomeScreen = React.lazy(() => import('../auth/WelcomeScreen'));
// const AuthLoadingScreen = React.lazy(() => import('../auth/AuthLoadingScreen'));
// const DetailsTab = React.lazy(() => import('../drawerComponent/DetailsTab'));
// const HistoryTab = React.lazy(() => import('../drawerComponent/HistoryTab'));
// const MapScreen = React.lazy(() => import('../drawerComponent/MapScreen'));
// const HomeScreen = React.lazy(() => import('../dashboard/HomeScreen'));
// const LeadsScreen = React.lazy(() => import('../drawerComponent/LeadScreen'));

// const Stack = createStackNavigator();

// const StackNavigator = () => {
//   return (
//     <Suspense
//       fallback={
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
//           <ActivityIndicator size="large" color="#1976D2" />
//         </View>
//       }
//     >
//       <Stack.Navigator
//         initialRouteName="AuthLoadingScreen"
//         screenOptions={{
//           headerShown: false,
//           ...TransitionPresets.FadeFromBottomAndroid,
//         }}
//       >
//         <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
//         <Stack.Screen name="AuthLoadingScreen" component={AuthLoadingScreen} />
//         <Stack.Screen name="LoginScreen" component={LoginScreen} />
//         <Stack.Screen name="HomeScreen" component={DrawerNavigator} />
//         <Stack.Screen name="CallScreen" component={CallScreen} />
//         <Stack.Screen name="FeedbackScreen" component={FeedbackScreen} />
//         <Stack.Screen name="LeadDetailsScreen" component={LeadDetailsScreen} />
//         <Stack.Screen name="DetailTab" component={DetailsTab} />
//         <Stack.Screen name="AddLeadForm" component={AddLeadForm} />
//         <Stack.Screen name="EditLeadsDetails" component={EditLeadsDetails} />
//         <Stack.Screen name="PendingFollowUps" component={PendingFollowUps} />
//         <Stack.Screen name="TodayFollowUps" component={TodayFollowUps} />
//         <Stack.Screen name="TomorrowFollowUps" component={TomorrowFollowUps} />
//         <Stack.Screen
//           name="AddLeadDetail"
//           component={AddLeadDetail}
//           options={{
//             presentation: 'transparentModal',
//             cardStyle: { backgroundColor: 'transparent' },
//             headerShown: false,
//             cardOverlayEnabled: true,
//             gestureEnabled: true,
//           }}
//         />
//         <Stack.Screen name="SearchFilterForm" component={SearchFilterForm} />
//         <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
//         <Stack.Screen name="BulkAssignLeads" component={BulkAssignLeads} />
//         <Stack.Screen name="DialerScreen" component={DialerScreen} />
//         <Stack.Screen name="ContactFeedbackForm" component={ContactFeedbackForm} />
//         <Stack.Screen name="LeadsScreen" component={LeadsScreen} />
//         <Stack.Screen name="LeadTabs" component={LeadTabs} />
//         <Stack.Screen name="MapScreen" component={MapScreen} />
//         {/* <Stack.Screen name="LeadTabs" component={LeadTabs} /> */}
//       </Stack.Navigator>
//     </Suspense>
//   );
// };

// export default StackNavigator;