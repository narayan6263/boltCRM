
// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   Image,
//   StatusBar,
//   Linking,
//   StyleSheet,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { RFPercentage } from 'react-native-responsive-fontsize';
// import { useDispatch, useSelector } from 'react-redux';
// import LinearGradient from 'react-native-linear-gradient';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { fetchMainDashboardCards } from '../redux/slices/getMainDashboardSlice';
// import Header from '../component/Header';
// import textStyle from '../../style/textStyle';

// const HomeScreen = ({ navigation }) => {
//   const dispatch = useDispatch();
//   const { dashboardData = {}, loading: dashboardLoading, error: dashboardError } = useSelector((state) => state.dashboard || {});
//   const { orgId } = useSelector((state) => state.auth || {});

//   const [isCheckingAuth, setIsCheckingAuth] = useState(true);
//   const [authError, setAuthError] = useState(null);
//   const [isFabOpen, setIsFabOpen] = useState(false);

//   // Authentication check and data fetching
//   useEffect(() => {
//     const checkAuthAndFetchData = async () => {
//       try {
//         const token = await AsyncStorage.getItem('authToken');
//         const expiresAt = await AsyncStorage.getItem('tokenExpiresAt');
//         const storedOrgId = await AsyncStorage.getItem('orgId');

//         if (!token || !expiresAt || Date.now() >= parseInt(expiresAt, 10)) {
//           console.warn('⚠️ Invalid or expired token, redirecting to LoginScreen');
//           await AsyncStorage.multiRemove([
//             'authToken',
//             'tokenExpiresAt',
//             'permissionList',
//             'categoryId',
//             'orgId',
//             'organizationName',
//             'systemUserId',
//             'empId',
//           ]);
//           navigation.replace('LoginScreen');
//           return;
//         }

//         if (!orgId && !storedOrgId) {
//           console.warn('⚠️ No orgId found, redirecting to LoginScreen');
//           navigation.replace('LoginScreen');
//           return;
//         }

//         await dispatch(fetchMainDashboardCards()).unwrap();
//       } catch (error) {
//         console.error('Auth check or data fetch error:', error);
//         setAuthError('Failed to load data. Please log in again.');
//         navigation.replace('LoginScreen');
//       } finally {
//         setIsCheckingAuth(false);
//       }
//     };

//     checkAuthAndFetchData();
//   }, [orgId, dispatch, navigation]);

//   // Stats cards configuration
//   const statsCards = [
//     {
//       labelTop: 'Pending',
//       labelBottom: 'FollowUps',
//       bg: '#F3F3F3',
//       border: '#B3A5F1',
//       icon: require('../assets/clock.png'),
//       total: dashboardData.pendingFollowups || '0',
//       navigateTo: 'PendingFollowUps',
//     },
//     {
//       labelTop: 'Today',
//       labelBottom: 'FollowUps',
//       bg: '#F3F3F3',
//       border: '#B3A5F1',
//       icon: require('../assets/todayPro.png'),
//       total: dashboardData.todayFollowups || '0',
//       navigateTo: 'TodayFollowUps',
//     },
//     {
//       labelTop: 'Tomorrow',
//       labelBottom: 'FollowUps',
//       bg: '#F3F3F3',
//       border: '#B3A5F1',
//       icon: require('../assets/tomorrow.png'),
//       total: dashboardData.tomorrowFollowups || '0',
//       navigateTo: 'TomorrowFollowUps',
//     },
//     {
//       labelTop: 'Total',
//       labelBottom: 'Leads',
//       bg: '#F3F3F3',
//       border: '#B3A5F1',
//       icon: require('../assets/totalfollow.png'),
//       total: dashboardData.totalLeads || '0',
//       navigateTo: 'Leads',
//     },
//   ];

//   // Skeleton card for loading state
//   const renderSkeletonCard = () => (
//     <View
//       style={{
//         width: wp(42),
//         height: hp(18),
//         paddingTop: hp(1.5),
//         paddingHorizontal: wp(2.5),
//         borderRadius: wp(2.5),
//         borderTopWidth: 5,
//         borderTopColor: '#B3A5F1',
//         backgroundColor: '#F3F3F3',
//       }}
//     >
//       <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: hp(1) }}>
//         <View style={{ width: wp(6), height: wp(6), backgroundColor: '#E0E0E0', borderRadius: wp(3) }} />
//       </View>
//       <View style={{ alignItems: 'center', marginLeft: wp(2), paddingHorizontal: wp(2) }}>
//         <View style={{ width: wp(20), height: hp(3), backgroundColor: '#E0E0E0', borderRadius: wp(1), marginBottom: hp(1) }} />
//         <View style={{ width: wp(25), height: hp(2), backgroundColor: '#E0E0E0', borderRadius: wp(1), marginBottom: hp(0.5) }} />
//         <View style={{ width: wp(25), height: hp(2), backgroundColor: '#E0E0E0', borderRadius: wp(1) }} />
//       </View>
//     </View>
//   );

//   // Common Header Props
//   const headerProps = {
//     title: 'Dashboard',
//     showMenuButton: true,
//     showSearchButton: false,
//     showBackButton: false,
//     containerStyle: {
//       paddingHorizontal: wp(4),
//       paddingVertical: hp(2),
//       backgroundColor: '#FFFFFF',
//       borderBottomWidth: 1,
//       borderBottomColor: '#E0E0E0',
//     },
//   };

//   // Function to handle phone call
//   const handlePhoneCall = () => {
//     const phoneNumber = 'tel:+1234567890';
//     Linking.openURL(phoneNumber).catch((err) => console.error('Error opening phone:', err));
//   };

//   // Function to handle map navigation
//   const handleMap = () => {
//     navigation.navigate('MapScreen');
//   };

//   // Toggle FAB icons visibility
//   const toggleFab = () => {
//     setIsFabOpen((prev) => !prev);
//   };

//   // Loading state
//   if (isCheckingAuth || dashboardLoading) {
//     return (
//       <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
//         <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
//         <Header {...headerProps} />
//         <ScrollView contentContainerStyle={{ paddingBottom: hp(2) }}>
//           <LinearGradient colors={['#8290EA', '#3F4CA0']} style={{ width: '100%', borderBottomLeftRadius: wp(10), borderBottomRightRadius: wp(10) }}>
//             <View style={{ borderTopWidth: 2, borderTopColor: '#D5CBDB', paddingBottom: hp(4), paddingTop: hp(4) }}>
//               <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: wp(4), justifyContent: 'center' }}>
//                 {[...Array(4)].map((_, index) => (
//                   <View key={index}>{renderSkeletonCard()}</View>
//                 ))}
//               </View>
//             </View>
//           </LinearGradient>
//         </ScrollView>
//         <View
//           style={{
//             position: 'absolute',
//             right: wp(4),
//             bottom: hp(10),
//             alignItems: 'center',
//             zIndex: 999,
//           }}
//         >
//           {/* {isFabOpen && (
//             <>
//               <TouchableOpacity
//                 onPress={handlePhoneCall}
//                 style={{
//                   position: 'absolute',
//                   bottom: hp(8),
//                   backgroundColor: '#FFFFFF',
//                   borderRadius: wp(10),
//                   padding: wp(2),
//                   elevation: 5,
//                   shadowColor: '#000',
//                   shadowOffset: { width: 0, height: 2 },
//                   shadowOpacity: 0.3,
//                   shadowRadius: 3,
//                 }}
//               >
//                 <Ionicons name="call" size={RFPercentage(3)} color="#000000" />
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={handleMap}
//                 style={{
//                   position: 'absolute',
//                   bottom: hp(16),
//                   backgroundColor: '#FFFFFF',
//                   borderRadius: wp(10),
//                   padding: wp(2),
//                   elevation: 5,
//                   shadowColor: '#000',
//                   shadowOffset: { width: 0, height: 2 },
//                   shadowOpacity: 0.3,
//                   shadowRadius: 3,
//                 }}
//               >
//                 <Ionicons name="map" size={RFPercentage(3)} color="#000000" />
//               </TouchableOpacity>
//             </>
//           )}
//           <TouchableOpacity
//             onPress={toggleFab}
//             style={{
//               backgroundColor: '#8290EA',
//               borderRadius: wp(10),
//               width: wp(12),
//               height: wp(12),
//               justifyContent: 'center',
//               alignItems: 'center',
//               elevation: 5,
//               shadowColor: '#000',
//               shadowOffset: { width: 0, height: 2 },
//               shadowOpacity: 0.3,
//               shadowRadius: 3,
//             }}
//           >
//             <Ionicons
//               name={isFabOpen ? 'chevron-down' : 'chevron-up'}
//               size={RFPercentage(4)}
//               color="#FFFFFF"
//             />
//           </TouchableOpacity> */}
//         </View>
//       </View>
//     );
//   }

//   // Main render
//   return (
//     <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
//       <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
//       <Header {...headerProps} />
//       <ScrollView contentContainerStyle={{ paddingBottom: hp(2) }}>
//         <LinearGradient colors={['#8290EA', '#3F4CA0']} style={{ width: '100%', borderBottomLeftRadius: wp(10), borderBottomRightRadius: wp(10) }}>
//           <View style={{ borderTopWidth: 2, borderTopColor: '#D5CBDB', paddingBottom: hp(4), paddingTop: hp(4) }}>
//             {authError || dashboardError ? (
//               <Text style={{ fontSize: RFPercentage(2.2), color: '#FF0000', textAlign: 'center' }}>
//                 {authError || (dashboardError.includes('Organization UUID') ? 'Please log in again' : `Error: ${dashboardError}`)}
//               </Text>
//             ) : (
//               <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: wp(4), justifyContent: 'center' }}>
//                 {statsCards.map((item, index) => (
//                   <TouchableOpacity
//                     key={index}
//                     onPress={() => navigation.navigate(item.navigateTo)}
//                     style={{
//                       width: wp(40),
//                       height: hp(18),
//                       paddingTop: hp(1.5),
//                       paddingHorizontal: wp(2.5),
//                       borderRadius: wp(2.5),
//                       borderTopWidth: 5,
//                       borderTopColor: item.border,
//                       backgroundColor: item.bg,
//                     }}
//                   >
//                     <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: hp(1) }}>
//                       <Image source={item.icon} style={{ width: wp(6), height: wp(6) }} resizeMode="contain" />
//                     </View>
//                     <View style={{ alignItems: 'center', marginLeft: wp(2), paddingHorizontal: wp(2) }}>
//                       <Text style={{ fontSize: RFPercentage(2), fontWeight: '400', color: '#000000' }} className="font-familyFontLatoBold">{item.total}</Text>
//                       <Text style={{ fontSize: RFPercentage(2), fontWeight: '400', color: '#000000', marginTop: hp(0.5) }} className="font-familyFontLatoBold">{item.labelTop}</Text>
//                       <Text style={{ fontSize: RFPercentage(2), fontWeight: '400', color: '#000000', marginTop: hp(-0.5) }} className="font-familyFontLatoBold pt-1">{item.labelBottom}</Text>
//                     </View>
                     
//                   </TouchableOpacity>
//                 ))}
//               </View>
//             )}
//           </View>
//         </LinearGradient>
//       </ScrollView>
//       <View
//         style={{
//           position: 'absolute',
//           right: wp(4),
//           bottom: hp(10),
//           alignItems: 'center',
//           zIndex: 999,
//         }}
//       >
//         {isFabOpen && (
//           <>
//             {/* <TouchableOpacity
//               onPress={handlePhoneCall}
//               style={{
//                 position: 'absolute',
//                 bottom: hp(8),
//                 backgroundColor: '#FFFFFF',
//                 borderRadius: wp(10),
//                 padding: wp(2),
//                 elevation: 5,
//                 shadowColor: '#000',
//                 shadowOffset: { width: 0, height: 2 },
//                 shadowOpacity: 0.3,
//                 shadowRadius: 3,
//               }}
//             >
//               <Ionicons name="call" size={RFPercentage(3)} color="#000000" />
//             </TouchableOpacity> */}
//             <TouchableOpacity
//               onPress={handleMap}
//               style={{
//                 position: 'absolute',
//                 bottom: hp(16),
//                 backgroundColor: '#FFFFFF',
//                 borderRadius: wp(10),
//                 padding: wp(2),
//                 elevation: 5,
//                 shadowColor: '#000',
//                 shadowOffset: { width: 0, height: 2 },
//                 shadowOpacity: 0.3,
//                 shadowRadius: 3,
//               }}
//             >
//               <Ionicons name="map" size={RFPercentage(3)} color="#000000" />
//             </TouchableOpacity>
//           </>
//         )}
//         <TouchableOpacity
//           onPress={toggleFab}
//           style={{
//             backgroundColor: '#8290EA',
//             borderRadius: wp(10),
//             width: wp(12),
//             height: wp(12),
//             justifyContent: 'center',
//             alignItems: 'center',
//             elevation: 5,
//             shadowColor: '#000',
//             shadowOffset: { width: 0, height: 2 },
//             shadowOpacity: 0.3,
//             shadowRadius: 3,
//           }}
//         >
//           <Ionicons
//             name={isFabOpen ? 'chevron-down' : 'chevron-up'}
//             size={RFPercentage(4)}
//             color="#FFFFFF"
//           />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default HomeScreen;

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchMainDashboardCards } from '../redux/slices/getMainDashboardSlice';
import Header from '../component/Header';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { dashboardData = {}, loading: dashboardLoading, error: dashboardError } = useSelector((state) => state.dashboard || {});
  const { orgId } = useSelector((state) => state.auth || {});

  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [isFabOpen, setIsFabOpen] = useState(false);

  // Authentication check and data fetching
  useEffect(() => {
    const checkAuthAndFetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        const expiresAt = await AsyncStorage.getItem('tokenExpiresAt');
        const storedOrgId = await AsyncStorage.getItem('orgId');

        if (!token || !expiresAt || Date.now() >= parseInt(expiresAt, 10)) {
          console.warn('⚠️ Invalid or expired token, redirecting to LoginScreen');
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
          navigation.replace('LoginScreen');
          return;
        }

        if (!orgId && !storedOrgId) {
          console.warn('⚠️ No orgId found, redirecting to LoginScreen');
          navigation.replace('LoginScreen');
          return;
        }

        await dispatch(fetchMainDashboardCards()).unwrap();
      } catch (error) {
        console.error('Auth check or data fetch error:', error);
        setAuthError('Failed to load data. Please log in again.');
        navigation.replace('LoginScreen');
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuthAndFetchData();
  }, [orgId, dispatch, navigation]);

  // Stats cards configuration
  const statsCards = [
    {
      labelTop: 'Pending',
      labelBottom: 'FollowUps',
      bg: '#F3F3F3',
      border: '#B3A5F1',
      icon: require('../assets/clock.png'),
      total: dashboardData.pendingFollowups || '0',
      navigateTo: 'PendingFollowUps',
    },
    {
      labelTop: 'Today',
      labelBottom: 'FollowUps',
      bg: '#F3F3F3',
      border: '#B3A5F1',
      icon: require('../assets/todayPro.png'),
      total: dashboardData.todayFollowups || '0',
      navigateTo: 'TodayFollowUps',
    },
    {
      labelTop: 'Tomorrow',
      labelBottom: 'FollowUps',
      bg: '#F3F3F3',
      border: '#B3A5F1',
      icon: require('../assets/tomorrow.png'),
      total: dashboardData.tomorrowFollowups || '0',
      navigateTo: 'TomorrowFollowUps',
    },
    {
      labelTop: 'Total',
      labelBottom: 'Leads',
      bg: '#F3F3F3',
      border: '#B3A5F1',
      icon: require('../assets/totalfollow.png'),
      total: dashboardData.totalLeads || '0',
      navigateTo: 'Leads',
    },
  ];

  // Skeleton card for loading state
  const renderSkeletonCard = () => (
    <View
      style={{
        width: wp(42),
        height: hp(18),
        paddingTop: hp(1.5),
        paddingHorizontal: wp(2.5),
        borderRadius: wp(2.5),
        borderTopWidth: 5,
        borderTopColor: '#B3A5F1',
        backgroundColor: '#F3F3F3',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: hp(1) }}>
        <View style={{ width: wp(6), height: wp(6), backgroundColor: '#E0E0E0', borderRadius: wp(3) }} />
      </View>
      <View style={{ alignItems: 'center', marginLeft: wp(2), paddingHorizontal: wp(2) }}>
        <View style={{ width: wp(20), height: hp(3), backgroundColor: '#E0E0E0', borderRadius: wp(1), marginBottom: hp(1) }} />
        <View style={{ width: wp(25), height: hp(2), backgroundColor: '#E0E0E0', borderRadius: wp(1), marginBottom: hp(0.5) }} />
        <View style={{ width: wp(25), height: hp(2), backgroundColor: '#E0E0E0', borderRadius: wp(1) }} />
      </View>
    </View>
  );

  // Common Header Props
  const headerProps = {
    title: 'Dashboard',
    showMenuButton: true,
    showSearchButton: false,
    showBackButton: false,
    containerStyle: {
      paddingHorizontal: wp(4),
      paddingVertical: hp(2),
      backgroundColor: '#FFFFFF',
      borderBottomWidth: 1,
      borderBottomColor: '#E0E0E0',
    },
  };

  // Function to handle map navigation
  const handleMap = () => {
    navigation.navigate('MapScreen');
  };

  // Toggle FAB icons visibility
  const toggleFab = () => {
    setIsFabOpen((prev) => !prev);
  };

  // Loading state
  if (isCheckingAuth || dashboardLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
        <Header {...headerProps} />
        <ScrollView contentContainerStyle={{ paddingBottom: hp(2) }}>
          <LinearGradient colors={['#8290EA', '#3F4CA0']} style={{ width: '100%', borderBottomLeftRadius: wp(10), borderBottomRightRadius: wp(10) }}>
            <View style={{ borderTopWidth: 2, borderTopColor: '#D5CBDB', paddingBottom: hp(4), paddingTop: hp(4) }}>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: wp(4), justifyContent: 'center' }}>
                {[...Array(4)].map((_, index) => (
                  <View key={index}>{renderSkeletonCard()}</View>
                ))}
              </View>
            </View>
          </LinearGradient>
        </ScrollView>
        <View
          style={{
            position: 'absolute',
            right: wp(4),
            bottom: hp(10),
            alignItems: 'center',
            zIndex: 999,
          }}
        >
          {isFabOpen && (
            <TouchableOpacity
              onPress={handleMap}
              style={{
                position: 'absolute',
                bottom: hp(8), // Adjusted position since phone button is removed
                backgroundColor: '#FFFFFF',
                borderRadius: wp(10),
                padding: wp(2),
                elevation: 5,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 3,
              }}
            >
              <Ionicons name="map" size={RFPercentage(3)} color="#000000" />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={toggleFab}
            style={{
              backgroundColor: '#8290EA',
              borderRadius: wp(10),
              width: wp(12),
              height: wp(12),
              justifyContent: 'center',
              alignItems: 'center',
              elevation: 5,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 3,
            }}
          >
            <Ionicons
              name={isFabOpen ? 'chevron-down' : 'chevron-up'}
              size={RFPercentage(4)}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Main render
  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <Header {...headerProps} />
      <ScrollView contentContainerStyle={{ paddingBottom: hp(2) }}>
        <LinearGradient colors={['#8290EA', '#3F4CA0']} style={{ width: '100%', borderBottomLeftRadius: wp(10), borderBottomRightRadius: wp(10) }}>
          <View style={{ borderTopWidth: 2, borderTopColor: '#D5CBDB', paddingBottom: hp(4), paddingTop: hp(4) }}>
            {authError || dashboardError ? (
              <Text style={{ fontSize: RFPercentage(2.2), color: '#FF0000', textAlign: 'center' }}>
                {authError || (dashboardError.includes('Organization UUID') ? 'Please log in again' : `Error: ${dashboardError}`)}
              </Text>
            ) : (
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: wp(4), justifyContent: 'center' }}>
                {statsCards.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => navigation.navigate(item.navigateTo)}
                    style={{
                      width: wp(40),
                      height: hp(18),
                      paddingTop: hp(1.5),
                      paddingHorizontal: wp(2.5),
                      borderRadius: wp(2.5),
                      borderTopWidth: 5,
                      borderTopColor: item.border,
                      backgroundColor: item.bg,
                    }}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: hp(1) }}>
                      <Image source={item.icon} style={{ width: wp(6), height: wp(6) }} resizeMode="contain" />
                    </View>
                    <View style={{ alignItems: 'center', marginLeft: wp(2), paddingHorizontal: wp(2) }}>
                      <Text style={{ fontSize: RFPercentage(2), fontWeight: '400', color: '#000000' }} className="font-familyFontLatoBold">{item.total}</Text>
                      <Text style={{ fontSize: RFPercentage(2), fontWeight: '400', color: '#000000', marginTop: hp(0.5) }} className="font-familyFontLatoBold">{item.labelTop}</Text>
                      <Text style={{ fontSize: RFPercentage(2), fontWeight: '400', color: '#000000', marginTop: hp(-0.5) }} className="font-familyFontLatoBold pt-1">{item.labelBottom}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </LinearGradient>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          right: wp(4),
          bottom: hp(10),
          alignItems: 'center',
          zIndex: 999,
        }}
      >
        {isFabOpen && (
          <TouchableOpacity
            onPress={handleMap}
            style={{
              position: 'absolute',
              bottom: hp(8), // Adjusted position since phone button is removed
              backgroundColor: '#FFFFFF',
              borderRadius: wp(10),
              padding: wp(2),
              elevation: 5,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 3,
            }}
          >
            <Ionicons name="map" size={RFPercentage(3)} color="#000000" />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={toggleFab}
          style={{
            backgroundColor: '#8290EA',
            borderRadius: wp(10),
            width: wp(12),
            height: wp(12),
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 3,
          }}
        >
          <Ionicons
            name={isFabOpen ? 'chevron-down' : 'chevron-up'}
            size={RFPercentage(4)}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;