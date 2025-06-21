import React, { useState, useEffect, useRef, memo } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Animated, Dimensions } from 'react-native';
import { FlatList } from 'react-native';
import { styled } from 'nativewind';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { shallowEqual } from 'react-redux';
import { format } from 'date-fns';
import { debounce } from 'lodash';
import { fetchAllLeads, resetLeadsState } from '../redux/slices/getAllLeadSlice';
import { fetchAllSources } from '../redux/slices/getActiveSourceSlice';
import { fetchAllEmployees } from '../redux/slices/getActiveEmployeesSlice';
import { fetchAllBranches } from '../redux/slices/getActiveBranchesSlice';
import { fetchActiveStatuses } from '../redux/slices/getActiveStatusesSlice';
import AddLeadForm from './AddLeadForm';
import LeadCard from './LeadCard';
import SearchFilterForm from '../dashboard/SearchFilterForm';
import DialerScreen from './DialerScreen';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useFocusEffect } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../component/Header';
import CustomButton from '../component/CustomButton';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchable = styled(TouchableOpacity);

const LeadsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const {
    formattedLeads = [],
    loading,
    error,
    hasMore,
    currentPage,
    totalLeads,
  } = useSelector(
    (state) => ({
      formattedLeads: state.leads?.formattedLeads || [],
      loading: state.leads?.loading,
      error: state.leads?.error,
      hasMore: state.leads?.hasMore,
      currentPage: state.leads?.currentPage,
      totalLeads: state.leads?.totalLeads,
    }),
    shallowEqual
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [searchFormVisible, setSearchFormVisible] = useState(false);
  const [dialerVisible, setDialerVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState(null);
  const slideAnim = useRef(new Animated.Value(0)).current; // For content slide
  const formSlideAnim = useRef(new Animated.Value(-Dimensions.get('window').height * 0.65)).current; // For form slide
  const { height } = Dimensions.get('window');
  const formHeight = height * 0.65;

  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchAllLeads({ page: 1, refresh: true }));
      setActiveFilters(null);
      setSearchFormVisible(false);
      slideAnim.setValue(0);
      formSlideAnim.setValue(-formHeight);
      return () => {};
    }, [dispatch, slideAnim, formSlideAnim])
  );

  const openSearchForm = () => {
    setSearchFormVisible(true);
    dispatch(fetchAllSources());
    dispatch(fetchAllEmployees());
    dispatch(fetchAllBranches());
    dispatch(fetchActiveStatuses());
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: formHeight,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(formSlideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeSearchForm = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(formSlideAnim, {
        toValue: -formHeight,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setSearchFormVisible(false);
      console.log('LeadsScreen: SearchFilterForm closed');
    });
  };

  const handleResetFilters = () => {
    dispatch(resetLeadsState());
    dispatch(fetchAllLeads({ page: 1, refresh: true }));
    setActiveFilters(null);
    closeSearchForm();
  };

  const handleShowMore = () => {
    if (hasMore && !loading) {
      dispatch(fetchAllLeads({ filters: activeFilters, page: currentPage + 1 }));
    }
  };

  const handleLeadAdded = () => {
    dispatch(resetLeadsState());
    dispatch(fetchAllLeads({ page: 1, refresh: true }));
    setActiveFilters(null);
  };

  const handleLeadPress = (lead, formattedDate, formattedFollowUpDate) => {
    navigation.navigate('LeadDetailsScreen', { lead, formattedDate, formattedFollowUpDate });
  };

  const handleSearchSubmitted = debounce((filters) => {
    setActiveFilters(filters);
    dispatch(fetchAllLeads({ filters, page: 1, refresh: true }));
    closeSearchForm();
  }, 500);

  const openDialer = () => {
    setDialerVisible(true);
    console.log('LeadsScreen: Opening DialerScreen');
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
      {/* Header */}
      <Header
        title="Lead"
        showSearchButton={true}
        showMenuButton={true}
        onSearchPress={openSearchForm}
        onMenuPress={() => navigation.openDrawer()}
        titleFontWeight="400"
        titleFontSize={RFPercentage(3)}
        containerStyle={{ marginTop: 8, borderBottomWidth: 1, borderBottomColor: '#C5C5C5' }}
        backScreenName="HomeScreen"
      />

      {/* Search Filter Form (Sliding from Top) */}
      {searchFormVisible && (
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 20,
            transform: [{ translateY: formSlideAnim }],
          }}
        >
          <SearchFilterForm
            navigation={navigation}
            onClose={closeSearchForm}
            onSearchSubmitted={handleSearchSubmitted}
          />
        </Animated.View>
      )}

      {/* Animated Content (Total Lead + FlatList) */}
      <Animated.View
        style={{
          transform: [{ translateY: slideAnim }],
          flex: 1,
        }}
      >
        {/* Total Lead Section */}
        <StyledView className="px-4 py-3 border-b border-[#A19696] flex-row justify-between items-center">
          <StyledView className="w-full flex-row justify-between items-center px-4 py-3">
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

        {/* Leads List */}
        <FlatList
          data={formattedLeads}
          keyExtractor={(item) => item.leadId.toString()}
          renderItem={renderItem}
          ListFooterComponent={
            hasMore && formattedLeads.length > 0 ? (
              <CustomButton
                buttonName={loading ? 'Loading...' : 'Show More'}
                onPress={handleShowMore}
                gradientColors={['#8290EA', '#3F4CA0']}
                height={48}
                width="100%"
                accessibilityLabel="Load more leads"
                containerStyle={{
                  marginTop: 16,
                  borderRadius: 8,
                }}
                paddingX={12}
                fontSize={RFPercentage(2)}
                fontFamily="poppins"
                fontWeight="medium"
                disabled={loading}
              />
            ) : null
          }
          ListEmptyComponent={
            loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : error ? (
              <StyledText className="text-red-500 text-center">Error: {error}</StyledText>
            ) : (
              <StyledText className="text-gray-500 text-center">No leads found</StyledText>
            )
          }
          contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
          onEndReached={hasMore && !loading ? handleShowMore : null}
          onEndReachedThreshold={0.5}
        />
      </Animated.View>

      {/* Floating Buttons */}
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

      {/* Modals */}
      <AddLeadForm
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        totalHeight={600}
        onLeadAdded={handleLeadAdded}
      />

      <DialerScreen
        visible={dialerVisible}
        onClose={() => setDialerVisible(false)}
        navigation={navigation}
      />
    </StyledView>
  );
};

export default LeadsScreen;