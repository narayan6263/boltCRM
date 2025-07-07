

// import React, { useState, useRef, useMemo } from 'react';
// import { View, Text, TouchableOpacity, ActivityIndicator, Animated, Dimensions } from 'react-native';
// import { FlatList } from 'react-native';
// import { styled } from 'nativewind';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { useDispatch, useSelector } from 'react-redux';
// import { format } from 'date-fns';
// import { debounce } from 'lodash';
// import { fetchActiveStatuses, fetchAllBranches, fetchAllEmployees, fetchAllSources, fetchAllLeads } from '../redux/slice/index';
// import AddLeadForm from './AddLeadForm';
// import LeadCard from './LeadCard';
// import SearchFilterForm from '../dashboard/SearchFilterForm';
// import DialerScreen from './DialerScreen';
// import { RFPercentage } from 'react-native-responsive-fontsize';
// import CustomButton from '../component/CustomButton';

// const StyledView = styled(View);
// const StyledText = styled(Text);
// const StyledTouchable = styled(TouchableOpacity);

// const AllLeadsTab = ({ navigation, onLeadAdded }) => {
//   const dispatch = useDispatch();
//   const {
//     formattedLeads = [],
//     loading,
//     error,
//     hasMore,
//     currentPage,
//     totalLeads,
//   } = useSelector((state) => state.leads.allLeads);

//   const [modalVisible, setModalVisible] = useState(false);
//   const [searchFormVisible, setSearchFormVisible] = useState(false);
//   const [dialerVisible, setDialerVisible] = useState(false);
//   const [activeFilters, setActiveFilters] = useState(null);
//   const slideAnim = useRef(new Animated.Value(0)).current;
//   const { height } = Dimensions.get('window');
//   const formHeight = height * 0.65;

//   const uniqueFormattedLeads = useMemo(() => {
//     const seenLeadIds = new Set();
//     return formattedLeads.filter((lead) => {
//       const isDuplicate = seenLeadIds.has(lead.leadId);
//       seenLeadIds.add(lead.leadId);
//       return !isDuplicate;
//     });
//   }, [formattedLeads]);

//   const openSearchForm = () => {
//     setSearchFormVisible(true);
//     dispatch(fetchAllSources());
//     dispatch(fetchAllEmployees());
//     dispatch(fetchAllBranches());
//     dispatch(fetchActiveStatuses());
//     Animated.timing(slideAnim, {
//       toValue: formHeight,
//       duration: 300,
//       useNativeDriver: true,
//     }).start();
//   };

//   const closeSearchForm = () => {
//     Animated.timing(slideAnim, {
//       toValue: 0,
//       duration: 300,
//       useNativeDriver: true,
//     }).start(() => {
//       setSearchFormVisible(false);
//       console.log('AllLeadsTab: SearchFilterForm closed');
//     });
//   };

//   const handleResetFilters = () => {
//     dispatch(fetchAllLeads({ page: 1, refresh: true, limit: 10 }));
//     setActiveFilters(null);
//     closeSearchForm();
//   };

//   const handleShowMore = () => {
//     if (hasMore && !loading) {
//       dispatch(fetchAllLeads({ filters: activeFilters, page: currentPage + 1, limit: 10 }));
//     }
//   };

//   const handleLeadAdded = () => {
//     dispatch(fetchAllLeads({ page: 1, refresh: true, limit: 10 }));
//     setActiveFilters(null);
//     onLeadAdded();
//   };

//   const handleLeadPress = (lead, formattedDate, formattedFollowUpDate) => {
//     navigation.navigate('LeadDetailsScreen', { lead, formattedDate, formattedFollowUpDate });
//   };

//   const handleSearchSubmitted = debounce((filters) => {
//     setActiveFilters(filters);
//     dispatch(fetchAllLeads({ filters, page: 1, refresh: true, limit: 10 }));
//     closeSearchForm();
//   }, 500);

//   const openDialer = () => {
//     setDialerVisible(true);
//     console.log('AllLeadsTab: Opening DialerScreen');
//   };

//   const handleCloseDialer = () => {
//     setDialerVisible(false);
//   };

//   const renderItem = ({ item }) => {
//     const formattedDate = item.dateOfAdded
//       ? format(new Date(item.dateOfAdded), 'dd MMM yyyy')
//       : 'N/A';
//     const formattedFollowUpDate = item.nextFollowUpDate
//       ? format(new Date(item.nextFollowUpDate), 'dd MMM yyyy')
//       : 'N/A';
//     return (
//       <TouchableOpacity
//         onPress={() => handleLeadPress(item, formattedDate, formattedFollowUpDate)}
//       >
//         <LeadCard
//           lead={item}
//           formattedDate={formattedDate}
//           formattedFollowUpDate={formattedFollowUpDate}
//           navigation={navigation}
//         />
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <StyledView className="flex-1 bg-white">
//       {searchFormVisible && (
//         <Animated.View
//           style={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             right: 0,
//             zIndex: 20,
//             transform: [{ translateY: slideAnim }],
//           }}
//         >
//           <SearchFilterForm
//             navigation={navigation}
//             onClose={closeSearchForm}
//             onSearchSubmitted={handleSearchSubmitted}
//           />
//         </Animated.View>
//       )}

//       <StyledView className="px-4 py-3 border-b border-[#A19696]">
//         <StyledView className="w-full flex-row justify-between items-center px-4 py-3">
//           <StyledTouchable
//             onPress={openSearchForm}
//             className="bg-gray-200 rounded-xl px-4 py-2"
//             accessibilityLabel="Open search filter"
//           >
//             <Ionicons name="search" size={20} color="#3F4CA0" />
//           </StyledTouchable>
//           {activeFilters && (
//             <StyledTouchable
//               className="bg-gray-200 rounded-xl px-4 py-2"
//               onPress={handleResetFilters}
//               accessibilityLabel="Reset to all leads"
//             >
//               <StyledText className="text-violet-500 text-base font-semibold font-poppins">
//                 Back to All Leads
//               </StyledText>
//             </StyledTouchable>
//           )}
//           <View>
//             <StyledText className="text-subHeading font-poppinsFont text-black">
//               Total Lead
//             </StyledText>
//             <StyledText className="text-[#003BFF] text-[15px]">
//               {totalLeads || 0}
//             </StyledText>
//           </View>
//         </StyledView>
//       </StyledView>

//       <FlatList
//         data={uniqueFormattedLeads}
//         keyExtractor={(item) => item.leadId.toString()}
//         renderItem={renderItem}
//         ListFooterComponent={
//           hasMore && uniqueFormattedLeads.length > 0 ? (
//             <CustomButton
//               buttonName={loading ? 'Loading...' : 'Show More'}
//               onPress={handleShowMore}
//               gradientColors={['#8290EA', '#3F4CA0']}
//               height={48}
//               width="100%"
//               accessibilityLabel="Load more leads"
//               containerStyle={{
//                 marginTop: 16,
//                 borderRadius: 8,
//               }}
//               paddingX={12}
//               fontSize={RFPercentage(2)}
//               fontFamily="poppins"
//               fontWeight="medium"
//               disabled={loading}
//             />
//           ) : null
//         }
//         ListEmptyComponent={
//           loading ? (
//             <ActivityIndicator size="large" color="#0000ff" />
//           ) : error ? (
//             <StyledText className="text-red-500 text-center">Error: {error}</StyledText>
//           ) : (
//             <StyledText className="text-gray-500 text-center">No leads found</StyledText>
//           )
//         }
//         contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
//         onEndReached={hasMore && !loading ? handleShowMore : null}
//         onEndReachedThreshold={0.5}
//       />

//       <CustomButton
//         buttonName=""
//         onPress={() => setModalVisible(true)}
//         gradientColors={['#8290EA', '#3F4CA0']}
//         height={54}
//         width={54}
//         accessibilityLabel="Add new lead"
//         containerStyle={{
//           position: 'absolute',
//           bottom: 41,
//           right: 20,
//           borderRadius: 27,
//           shadowColor: '#000',
//           shadowOffset: { width: 0, height: 2 },
//           shadowOpacity: 0.3,
//           shadowRadius: 4,
//           elevation: 5,
//         }}
//         component={<Ionicons name="add" size={RFPercentage(3)} color="white" />}
//         paddingX={0}
//       />

//       <StyledTouchable
//         className="absolute bottom-[46] left-5 bg-green-500 p-3 rounded-full"
//         onPress={openDialer}
//       >
//         <Ionicons name="call" size={24} color="#fff" />
//       </StyledTouchable>

//       <AddLeadForm
//         modalVisible={modalVisible}
//         setModalVisible={setModalVisible}
//         totalHeight={600}
//         onLeadAdded={handleLeadAdded}
//       />

//       <DialerScreen
//         visible={dialerVisible}
//         onClose={handleCloseDialer}
//         navigation={navigation}
//       />
//     </StyledView>
//   );
// };

// export default AllLeadsTab;


import React, { useState, useRef, useMemo } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Animated, Dimensions } from 'react-native';
import { FlatList } from 'react-native';
import { styled } from 'nativewind';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { debounce } from 'lodash';
import { fetchActiveStatuses, fetchAllBranches, fetchAllEmployees, fetchAllSources, fetchAllLeads } from '../redux/slice/index';
import AddLeadForm from './AddLeadForm';
import LeadCard from './LeadCard';
import SearchFilterForm from '../dashboard/SearchFilterForm';
import DialerScreen from './DialerScreen';
import { RFPercentage } from 'react-native-responsive-fontsize';
import CustomButton from '../component/CustomButton';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchable = styled(TouchableOpacity);

const AllLeadsTab = ({ navigation, onLeadAdded }) => {
  const dispatch = useDispatch();
  const {
    formattedLeads = [],
    loading,
    error,
    hasMore,
    currentPage,
    totalLeads,
  } = useSelector((state) => state.leads.allLeads);

  const [modalVisible, setModalVisible] = useState(false);
  const [searchFormVisible, setSearchFormVisible] = useState(false);
  const [dialerVisible, setDialerVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState(null);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const { height } = Dimensions.get('window');
  const formHeight = height * 0.65;

  const uniqueFormattedLeads = useMemo(() => {
    const seenLeadIds = new Set();
    return formattedLeads.filter((lead) => {
      const isDuplicate = seenLeadIds.has(lead.leadId);
      seenLeadIds.add(lead.leadId);
      return !isDuplicate;
    });
  }, [formattedLeads]);

  const openSearchForm = () => {
    setSearchFormVisible(true);
    dispatch(fetchAllSources());
    dispatch(fetchAllEmployees());
    dispatch(fetchAllBranches());
    dispatch(fetchActiveStatuses());
    Animated.timing(slideAnim, {
      toValue: formHeight,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeSearchForm = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setSearchFormVisible(false);
      console.log('AllLeadsTab: SearchFilterForm closed');
    });
  };

  const handleResetFilters = () => {
    dispatch(fetchAllLeads({ page: 1, refresh: true, limit: 10 }));
    setActiveFilters(null);
    closeSearchForm();
  };

  const handleShowMore = () => {
    if (hasMore && !loading) {
      dispatch(fetchAllLeads({ filters: activeFilters, page: currentPage + 1, limit: 10 }));
    }
  };

  const handleLeadAdded = () => {
    dispatch(fetchAllLeads({ page: 1, refresh: true, limit: 10 }));
    setActiveFilters(null);
    onLeadAdded();
  };

  const handleLeadPress = (lead, formattedDate, formattedFollowUpDate) => {
    navigation.navigate('LeadDetailsScreen', { lead, formattedDate, formattedFollowUpDate });
  };

  const handleSearchSubmitted = debounce((filters) => {
    setActiveFilters(filters);
    dispatch(fetchAllLeads({ filters, page: 1, refresh: true, limit: 10 }));
    closeSearchForm();
  }, 500);

  const openDialer = () => {
    setDialerVisible(true);
    console.log('AllLeadsTab: Opening DialerScreen');
  };

  const handleCloseDialer = () => {
    setDialerVisible(false);
  };

  const renderItem = ({ item }) => {
    const formattedDate = item.dateOfAdded
      ? format(new Date(item.dateOfAdded), 'dd MMM yyyy')
      : 'N/A';
    const formattedFollowUpDate = item.nextFollowUpDate
      ? format(new Date(item.nextFollowUpDate), 'dd MMM yyyy')
      : 'N/A';
    return (
      <TouchableOpacity
        onPress={() => handleLeadPress(item, formattedDate, formattedFollowUpDate)}
      >
        <LeadCard
          lead={item}
          formattedDate={formattedDate}
          formattedFollowUpDate={formattedFollowUpDate}
          navigation={navigation}
        />
      </TouchableOpacity>
    );
  };

  return (
    <StyledView className="flex-1 bg-white">
      {searchFormVisible && (
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 20,
            transform: [{ translateY: slideAnim }],
          }}
        >
          <SearchFilterForm
            navigation={navigation}
            onClose={closeSearchForm}
            onSearchSubmitted={handleSearchSubmitted}
          />
        </Animated.View>
      )}

      <StyledView className="px-4 py-3 border-b border-[#A19696]">
        <StyledView className="w-full flex-row justify-between items-center px-4 py-3">
          <StyledTouchable
            onPress={openSearchForm}
            className="bg-gray-200 rounded-xl px-4 py-2"
            accessibilityLabel="Open search filter"
          >
            <Ionicons name="search" size={20} color="#3F4CA0" />
          </StyledTouchable>
          {activeFilters && (
            <StyledTouchable
              className="bg-gray-200 rounded-xl px-4 py-2"
              onPress={handleResetFilters}
              accessibilityLabel="Reset to all leads"
            >
              <StyledText className="text-violet-500 text-base font-semibold font-poppins">
                Back to All Leads
              </StyledText>
            </StyledTouchable>
          )}
          <View>
            <StyledText className="text-subHeading font-poppinsFont text-black">
              Total Lead
            </StyledText>
            <StyledText className="text-[#003BFF] text-[15px]">
              {totalLeads || 0}
            </StyledText>
          </View>
        </StyledView>
      </StyledView>

      <FlatList
        data={uniqueFormattedLeads}
        keyExtractor={(item) => item.leadId.toString()}
        renderItem={renderItem}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={21}
        ListFooterComponent={
          hasMore && uniqueFormattedLeads.length > 0 ? (
            <CustomButton
              buttonName={loading ? 'Loading...' : 'Show More'}
              onPress={handleShowMore}
              gradientColors={['#8290EA', '#3F4CA0']}
              height={48}
              width="100%"
              accessibilityLabel="Load more leads"
              containerStyle={{ marginTop: 16, borderRadius: 8 }}
              paddingX={12}
              fontSize={RFPercentage(2)}
              fontFamily="poppins"
              fontWeight="medium"
              disabled={loading}
            />
          ) : null
        }
        ListEmptyComponent={
          loading && uniqueFormattedLeads.length === 0 ? (
            <StyledView className="flex-1 justify-center items-center py-10">
              <ActivityIndicator size="large" color="#0000ff" />
              <StyledText className="text-gray-500 mt-2">Loading leads...</StyledText>
            </StyledView>
          ) : error ? (
            <StyledText className="text-red-500 text-center">Error: {error}</StyledText>
          ) : uniqueFormattedLeads.length === 0 ? (
            <StyledText className="text-gray-500 text-center">No leads found</StyledText>
          ) : null
        }
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        onEndReached={hasMore && !loading ? handleShowMore : null}
        onEndReachedThreshold={0.5}
      />

      <CustomButton
        buttonName=""
        onPress={() => setModalVisible(true)}
        gradientColors={['#8290EA', '#3F4CA0']}
        height={54}
        width={54}
        accessibilityLabel="Add new lead"
        containerStyle={{
          position: 'absolute',
          bottom: 41,
          right: 20,
          borderRadius: 27,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 5,
        }}
        component={<Ionicons name="add" size={RFPercentage(3)} color="white" />}
        paddingX={0}
      />

      <StyledTouchable
        className="absolute bottom-[46] left-5 bg-green-500 p-3 rounded-full"
        onPress={openDialer}
      >
        <Ionicons name="call" size={24} color="#fff" />
      </StyledTouchable>

      <AddLeadForm
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        totalHeight={600}
        onLeadAdded={handleLeadAdded}
      />

      <DialerScreen
        visible={dialerVisible}
        onClose={handleCloseDialer}
        navigation={navigation}
      />
    </StyledView>
  );
};

export default AllLeadsTab;