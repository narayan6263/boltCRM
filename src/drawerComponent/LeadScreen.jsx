// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { View, Dimensions, ScrollView, Text, TouchableOpacity, Animated } from 'react-native';
// import { styled } from 'nativewind';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchAllLeads } from '../redux/slice/index';
// import AllLeadsTab from './AllLeadsTab';
// import MyLeadsTab from './MyLeadsTab';
// import Header from '../component/Header';
// import { RFPercentage } from 'react-native-responsive-fontsize';
// import { useFocusEffect } from '@react-navigation/native';

// const StyledView = styled(View);
// const StyledText = styled(Text);
// const StyledTouchable = styled(TouchableOpacity);

// const { width: screenWidth } = Dimensions.get('window');

// const LeadsScreen = ({ navigation }) => {
//   const dispatch = useDispatch();
//   const [empId, setEmpId] = useState(null);
//   const [activeTab, setActiveTab] = useState(0);
//   const [shouldRefresh, setShouldRefresh] = useState(true);
//   const scrollViewRef = useRef(null);
//   const translateX = useRef(new Animated.Value(0)).current;
//   const tabTextRefs = useRef([]);

//   // Fetch empId from AsyncStorage
//   useEffect(() => {
//     const fetchEmpId = async () => {
//       try {
//         const storedEmpId = await AsyncStorage.getItem('empId');
//         if (storedEmpId) {
//           setEmpId(storedEmpId);
//         } else {
//           console.warn('⚠️ No empId found in AsyncStorage');
//           navigation.replace('LoginScreen');
//         }
//       } catch (error) {
//         console.error('Error fetching empId from AsyncStorage:', error);
//         navigation.replace('LoginScreen');
//       }
//     };

//     fetchEmpId();
//   }, [navigation]);

//   // Fetch data for both tabs on initial mount
//   useEffect(() => {
//     if (!shouldRefresh || !empId) return;

//     const fetchInitialData = async () => {
//       try {
//         // Fetch All Leads
//         await dispatch(fetchAllLeads({ page: 1, refresh: true, limit: 10 })).unwrap();
//         // Fetch My Leads
//         await dispatch(fetchAllLeads({ filters: { assignedTo: empId }, page: 1, refresh: true, limit: 10 })).unwrap();
//         setShouldRefresh(false);
//       } catch (error) {
//         console.error('Error fetching initial leads:', error);
//       }
//     };

//     fetchInitialData();
//   }, [dispatch, empId, shouldRefresh]);

//   // Tab configuration
//   const tabs = [
//     { key: 'allLeads', title: 'All Leads', component: AllLeadsTab },
//     { key: 'myLeads', title: 'My Leads', component: MyLeadsTab },
//   ];

//   // Update tab colors
//   const updateTabColors = useCallback((activeIndex) => {
//     tabs.forEach((tab, index) => {
//       if (tabTextRefs.current[index]) {
//         const isActive = index === activeIndex;
//         tabTextRefs.current[index].setNativeProps({
//           style: {
//             color: isActive ? '#22C55E' : '#9CA3AF',
//             fontWeight: isActive ? '700' : '600',
//           },
//         });
//       }
//     });
//   }, [tabs]);

//   // Handle tab press with smooth animation
//   const handleTabPress = useCallback(
//     (index) => {
//       console.log(`Tab pressed: ${tabs[index].title} at index ${index}`);
//       setActiveTab(index);
//       updateTabColors(index);

//       if (scrollViewRef.current) {
//         scrollViewRef.current.scrollTo({
//           x: index * screenWidth,
//           animated: true,
//         });
//       }

//       Animated.spring(translateX, {
//         toValue: index * (screenWidth / tabs.length),
//         useNativeDriver: true,
//         tension: 100,
//         friction: 8,
//       }).start();
//     },
//     [tabs, translateX, updateTabColors]
//   );

//   // Handle scroll events
//   const handleScroll = useCallback(
//     (event) => {
//       const offsetX = event.nativeEvent.contentOffset.x;
//       const newIndex = Math.round(offsetX / screenWidth);

//       if (newIndex !== activeTab && newIndex >= 0 && newIndex < tabs.length) {
//         setActiveTab(newIndex);
//         updateTabColors(newIndex);
//       }

//       Animated.spring(translateX, {
//         toValue: (offsetX / screenWidth) * (screenWidth / tabs.length),
//         useNativeDriver: true,
//         tension: 100,
//         friction: 8,
//       }).start();
//     },
//     [tabs.length, activeTab, translateX, updateTabColors]
//   );

//   // Callback to trigger refresh after lead is added
//   const handleLeadAdded = useCallback(() => {
//     setShouldRefresh(true);
//   }, []);

//   // Render tab content
//   const renderTabContent = () => {
//     return (
//       <ScrollView
//         ref={scrollViewRef}
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         onScroll={handleScroll}
//         scrollEventThrottle={16}
//         contentContainerStyle={{ width: screenWidth * tabs.length }}
//         style={{ flex: 1 }}
//       >
//         {tabs.map((tab, index) => (
//           <StyledView key={tab.key} style={{ width: screenWidth }}>
//             {tab.key === 'allLeads' && (
//               <AllLeadsTab navigation={navigation} onLeadAdded={handleLeadAdded} />
//             )}
//             {tab.key === 'myLeads' && (
//               <MyLeadsTab navigation={navigation} empId={empId} onLeadAdded={handleLeadAdded} />
//             )}
//           </StyledView>
//         ))}
//       </ScrollView>
//     );
//   };

//   return (
//     <StyledView className="flex-1 bg-white">
//       <Header
//         title="Leads"
//         showSearchButton={false}
//         showMenuButton={true}
//         onMenuPress={() => navigation.openDrawer()}
//         titleFontWeight="400"
//         titleFontSize={RFPercentage(3)}
//         containerStyle={{ marginTop: 8, borderBottomWidth: 1, borderBottomColor: '#C5C5C5' }}
//         backScreenName="HomeScreen"
//       />
//       <StyledView className="bg-white border-b border-gray-200">
//         <StyledView className="flex-row relative">
//           {tabs.map((tab, index) => {
//             const isActive = activeTab === index;
//             return (
//               <StyledTouchable
//                 key={tab.key}
//                 className="flex-1 py-3 px-2"
//                 onPress={() => handleTabPress(index)}
//                 activeOpacity={0.7}
//               >
//                 <StyledView className="items-center">
//                   <StyledText
//                     ref={(ref) => {
//                       tabTextRefs.current[index] = ref;
//                     }}
//                     style={{
//                       color: isActive ? '#22C55E' : '#9CA3AF',
//                       fontSize: RFPercentage(2),
//                       fontFamily: 'poppins',
//                       fontWeight: isActive ? '700' : '600',
//                       textAlign: 'center',
//                     }}
//                   >
//                     {tab.title}
//                   </StyledText>
//                 </StyledView>
//                 {isActive && (
//                   <Animated.View
//                     style={{
//                       position: 'absolute',
//                       bottom: 0,
//                       left: 0,
//                       right: 0,
//                       height: 3,
//                       backgroundColor: '#22C35E',
//                       borderRadius: 2,
//                     }}
//                   />
//                 )}
//               </StyledTouchable>
//             );
//           })}
//         </StyledView>
//       </StyledView>
//       <StyledView className="flex-1">{renderTabContent()}</StyledView>
//     </StyledView>
//   );
// };

// export default LeadsScreen;

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Dimensions, ScrollView, Text, TouchableOpacity, Animated } from 'react-native';
import { styled } from 'nativewind';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { fetchAllLeads } from '../redux/slice/index';
import AllLeadsTab from './AllLeadsTab';
import MyLeadsTab from './MyLeadsTab';
import Header from '../component/Header';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useFocusEffect } from '@react-navigation/native';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchable = styled(TouchableOpacity);

const { width: screenWidth } = Dimensions.get('window');

const LeadsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [empId, setEmpId] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [shouldRefresh, setShouldRefresh] = useState(true);
  const scrollViewRef = useRef(null);
  const translateX = useRef(new Animated.Value(0)).current;
  const tabTextRefs = useRef([]);
  const tabWidths = useRef([]); // Store the width of each tab

  // Fetch empId from AsyncStorage
  useEffect(() => {
    const fetchEmpId = async () => {
      try {
        const storedEmpId = await AsyncStorage.getItem('empId');
        if (storedEmpId) {
          setEmpId(storedEmpId);
        } else {
          console.warn('⚠️ No empId found in AsyncStorage');
          navigation.replace('LoginScreen');
        }
      } catch (error) {
        console.error('Error fetching empId from AsyncStorage:', error);
        navigation.replace('LoginScreen');
      }
    };

    fetchEmpId();
  }, [navigation]);

  // Fetch data for both tabs on initial mount
  useEffect(() => {
    if (!shouldRefresh || !empId) return;

    const fetchInitialData = async () => {
      try {
        // Fetch All Leads
        console.log('Fetching all leads... 111111111');
        await dispatch(fetchAllLeads({ page: 1, refresh: true, limit: 10 })).unwrap();
        // Fetch My Leads
        await dispatch(fetchAllLeads({ filters: { assignedTo: empId }, page: 1, refresh: true, limit: 10 })).unwrap();
        setShouldRefresh(false);
      } catch (error) {
        console.error('Error fetching initial leads:', error);
      }
    };

    fetchInitialData();
  }, [dispatch, empId, shouldRefresh]);

  // Tab configuration
  const tabs = [
    { key: 'allLeads', title: 'All Leads', component: AllLeadsTab },
    { key: 'myLeads', title: 'My Leads', component: MyLeadsTab },
  ];

  // Update tab colors
  const updateTabColors = useCallback((activeIndex) => {
    tabs.forEach((tab, index) => {
      if (tabTextRefs.current[index]) {
        const isActive = index === activeIndex;
        tabTextRefs.current[index].setNativeProps({
          style: {
            color: isActive ? '#22C55E' : '#9CA3AF',
            fontWeight: isActive ? '700' : '600',
          },
        });
      }
    });
  }, [tabs]);

  // Measure tab widths
  const onTabLayout = (index, event) => {
    const { width } = event.nativeEvent.layout;
    tabWidths.current[index] = width;
  };

  // Handle tab press with smooth animation
  const handleTabPress = useCallback(
    (index) => {
      console.log(`Tab pressed: ${tabs[index].title} at index ${index}`);
      setActiveTab(index);
      updateTabColors(index);

      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          x: index * screenWidth,
          animated: true,
        });
      }

      // Calculate the translateX based on cumulative tab widths
      let translateXValue = 0;
      for (let i = 0; i < index; i++) {
        translateXValue += tabWidths.current[i] || screenWidth / tabs.length;
      }

      Animated.spring(translateX, {
        toValue: translateXValue,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    },
    [tabs, translateX, updateTabColors]
  );

  // Handle scroll events
  const handleScroll = useCallback(
    (event) => {
      const offsetX = event.nativeEvent.contentOffset.x;
      const newIndex = Math.round(offsetX / screenWidth);

      if (newIndex !== activeTab && newIndex >= 0 && newIndex < tabs.length) {
        setActiveTab(newIndex);
        updateTabColors(newIndex);

        // Calculate translateX based on tab widths
        let translateXValue = 0;
        for (let i = 0; i < newIndex; i++) {
          translateXValue += tabWidths.current[i] || screenWidth / tabs.length;
        }

        Animated.spring(translateX, {
          toValue: translateXValue,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }).start();
      }
    },
    [tabs.length, activeTab, translateX, updateTabColors]
  );

  // Callback to trigger refresh after lead is added
  const handleLeadAdded = useCallback(() => {
    setShouldRefresh(true);
  }, []);

  // Render tab content
  const renderTabContent = () => {
    return (
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ width: screenWidth * tabs.length }}
        style={{ flex: 1 }}
      >
        {tabs.map((tab, index) => (
          <StyledView key={tab.key} style={{ width: screenWidth }}>
            {tab.key === 'allLeads' && (
              <AllLeadsTab navigation={navigation} onLeadAdded={handleLeadAdded} />
            )}
            {tab.key === 'myLeads' && (
              <MyLeadsTab navigation={navigation} empId={empId} onLeadAdded={handleLeadAdded} />
            )}
          </StyledView>
        ))}
      </ScrollView>
    );
  };

  return (
    <StyledView className="flex-1 bg-white">
      <Header
        title="Leads"
        showSearchButton={false}
        showMenuButton={true}
        onMenuPress={() => navigation.openDrawer()}
        titleFontWeight="400"
        titleFontSize={RFPercentage(3)}
        containerStyle={{ marginTop: 8, borderBottomWidth: 1, borderBottomColor: '#C5C5C5' }}
        backScreenName="HomeScreen"
      />
      <StyledView className="bg-white border-b border-gray-200">
        <StyledView className="flex-row relative">
          {tabs.map((tab, index) => {
            const isActive = activeTab === index;
            return (
              <StyledTouchable
                key={tab.key}
                className="flex-1 py-3 px-2"
                onPress={() => handleTabPress(index)}
                activeOpacity={0.7}
                onLayout={(event) => onTabLayout(index, event)} // Measure tab width
              >
                <StyledView className="items-center">
                  <StyledText
                    ref={(ref) => {
                      tabTextRefs.current[index] = ref;
                    }}
                    style={{
                      color: isActive ? '#22C55E' : '#9CA3AF',
                      fontSize: RFPercentage(2),
                      fontFamily: 'poppins',
                      fontWeight: isActive ? '700' : '600',
                      textAlign: 'center',
                    }}
                  >
                    {tab.title}
                  </StyledText>
                </StyledView>
              </StyledTouchable>
            );
          })}
          <Animated.View
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              height: 3,
              backgroundColor: '#22C55E',
              borderRadius: 2,
              width: tabWidths.current[activeTab] || screenWidth / tabs.length, // Use measured tab width
              transform: [{ translateX }],
            }}
          />
        </StyledView>

      </StyledView>
      <StyledView className="flex-1">{renderTabContent()}</StyledView>
    </StyledView>
  );
};

export default LeadsScreen;
