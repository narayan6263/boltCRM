import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, ActivityIndicator, Text, TouchableOpacity, ScrollView, PanGestureHandler, Animated, Dimensions } from 'react-native';
import { styled } from 'nativewind';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeadById, resetLeadByIdState } from '../redux/slices/getLeadByIdSlice';
import { format } from 'date-fns';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Header from '../component/Header';
import DetailsTab from './DetailsTab';
import HistoryTab from './HistoryTab';
// import TaskTab from './TaskTab';
import LeadActivity from './LeadActivity';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchable = styled(TouchableOpacity);

const { width: screenWidth } = Dimensions.get('window');

const LeadDetailsScreen = ({ navigation, route }) => {
  const { lead } = route.params || {};
  const dispatch = useDispatch();
  const { lead: leadData, loading, error } = useSelector((state) => state.getLeadById || {});
  
  // Use only refs for immediate access
  const currentTabRef = useRef(0);
  const scrollViewRef = useRef(null);
  const translateX = useRef(new Animated.Value(0)).current;
  const tabTextRefs = useRef([]);
  const [renderCount, setRenderCount] = useState(0);
  
  // Tab configuration
  const tabs = [
    { key: 'details', title: 'Details', component: DetailsTab },
    { key: 'history', title: 'History', component: HistoryTab },
    { key: 'leadActivity', title: 'Lead Activity', component: LeadActivity }
  ];

  // Fetch lead details only
  const leadId = lead.leadId;
  useEffect(() => {
    if (leadId) {
      console.log(`LeadDetailsScreen: Fetching details for leadId ${leadId}`);
      dispatch(fetchLeadById(leadId));
    }
    return () => {
      console.log('LeadDetailsScreen: Resetting lead state');
      dispatch(resetLeadByIdState());
    };
  }, [dispatch, leadId]);

  // Format dates
  const formattedDate = leadData?.data?.dateOfAdded
    ? format(new Date(leadData.data.dateOfAdded), 'dd MMM yyyy')
    : lead?.dateOfAdded
    ? format(new Date(lead.dateOfAdded), 'dd MMM yyyy')
    : 'N/A';
  const formattedFollowUpDate = leadData?.data?.nextFollowUpDate
    ? format(new Date(leadData.data.nextFollowUpDate), 'dd MMM yyyy')
    : lead?.nextFollowUpDate
    ? format(new Date(lead.nextFollowUpDate), 'dd MMM yyyy')
    : 'N/A';

  // Use fetched data or fallback to route.params.lead
  const displayLead = {
    _id: leadData?.data?._id || leadId || lead?._id,
    leadId: leadData?.data?._id || leadId || lead?._id,
    name: leadData?.data?.name || lead?.name || 'N/A',
    mobile: leadData?.data?.mobile || lead?.mobile || 'N/A',
    ...leadData?.data,
    ...lead,
  };
  console.log('LeadDetailsScreen: Passing lead', JSON.stringify(displayLead, null, 2));

  // Memoized navigation object to prevent unnecessary re-renders
  const memoizedNavigation = useCallback(() => navigation, [navigation]);

  // Force re-render
  const forceReRender = useCallback(() => {
    setRenderCount(prev => prev + 1);
  }, []);

  // Update tab colors directly
  const updateTabColors = useCallback((activeIndex) => {
    tabs.forEach((tab, index) => {
      if (tabTextRefs.current[index]) {
        const isActive = index === activeIndex;
        tabTextRefs.current[index].setNativeProps({
          style: {
            color: isActive ? '#22C55E' : '#9CA3AF',
            fontWeight: isActive ? '700' : '600'
          }
        });
      }
    });
  }, [tabs]);

  // Handle tab press with smooth animation
  const handleTabPress = useCallback((index) => {
    console.log(`Tab pressed: ${tabs[index].title} at index ${index}`);
    currentTabRef.current = index;
    updateTabColors(index);
    forceReRender();
    
    // Animate scroll to the selected tab
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: index * screenWidth,
        animated: true
      });
    }
    
    // Animate indicator
    Animated.spring(translateX, {
      toValue: index * (screenWidth / tabs.length),
      useNativeDriver: true,
      tension: 100,
      friction: 8
    }).start();
  }, [tabs, translateX, updateTabColors, forceReRender]);

  // Handle scroll events to update active tab immediately
  const handleScroll = useCallback((event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / screenWidth);
    
    // Update current tab immediately
    if (newIndex !== currentTabRef.current && newIndex >= 0 && newIndex < tabs.length) {
      currentTabRef.current = newIndex;
      // Update colors immediately using setNativeProps
      updateTabColors(newIndex);
    }
    
    // Animate indicator smoothly
    Animated.spring(translateX, {
      toValue: (offsetX / screenWidth) * (screenWidth / tabs.length),
      useNativeDriver: true,
      tension: 100,
      friction: 8
    }).start();
  }, [tabs.length, translateX, updateTabColors]);

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
            {tab.key === 'details' && (
              <DetailsTab
                lead={displayLead}
                formattedDate={formattedDate}
                formattedFollowUpDate={formattedFollowUpDate}
                navigation={memoizedNavigation()}
              />
            )}
            {tab.key === 'history' && (
              <HistoryTab
                lead={displayLead}
                formattedDate={formattedDate}
                formattedFollowUpDate={formattedFollowUpDate}
                navigation={memoizedNavigation()}
              />
            )}
            {tab.key === 'leadActivity' && (
              <LeadActivity
                lead={displayLead}
                navigation={memoizedNavigation()}
              />
            )}
          </StyledView>
        ))}
      </ScrollView>
    );
  };

  if (!displayLead._id) {
    console.error('LeadDetailsScreen: No valid leadId found', { leadId, lead, leadData });
    return (
      <StyledView className="flex-1 justify-center items-center">
        <StyledText className="text-red-500 text-center">Error: No valid lead ID provided</StyledText>
      </StyledView>
    );
  }

  return (
    <StyledView className="flex-1 bg-white">
      {/* Header */}
      <Header
        title="Lead Details"
        showBackButton={true}
        titleFontWeight="600"
        titleFontSize={RFPercentage(2.5)}
        containerStyle={{ borderBottomColor: '#C5C5C5' }}
        onBackPress={() => {
          // Navigate through HomeScreen to ensure bottom tabs are visible
          navigation.navigate('HomeScreen', {
            screen: 'Main',
            params: {
              screen: 'LeadsScreen'
            }
          });
        }}
      />

      {/* Loading State */}
      {loading && (
        <StyledView className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#0000ff" />
        </StyledView>
      )}

      {/* Error State */}
      {error && (
        <StyledView className="flex-1 justify-center items-center">
          <StyledText className="text-red-500 text-center">
            Error: {error.message || 'Failed to fetch lead details'}
          </StyledText>
          <StyledTouchable
            className="bg-blue-500 p-2 rounded-md mt-4"
            onPress={() => dispatch(fetchLeadById(leadId))}
          >
            <StyledText className="text-white">Retry</StyledText>
          </StyledTouchable>
        </StyledView>
      )}

      {/* Data Loaded */}
      {!loading && !error && (
        <StyledView className="flex-1">
          {/* Custom Tab Bar */}
          <StyledView className="bg-white border-b border-gray-200">
            <StyledView className="flex-row relative">
              {tabs.map((tab, index) => {
                const isActive = currentTabRef.current === index;
                return (
                  <StyledTouchable
                    key={`${tab.key}-${renderCount}`}
                    className="flex-1 py-3 px-2"
                    onPress={() => handleTabPress(index)}
                    activeOpacity={0.7}
                  >
                    <StyledView className="items-center">
                      <StyledText
                        ref={ref => {
                          tabTextRefs.current[index] = ref;
                        }}
                        style={{
                          color: isActive ? '#22C55E' : '#9CA3AF',
                          fontSize: 14,
                          fontFamily: 'Poppins-SemiBold',
                          fontWeight: isActive ? '700' : '600',
                          textAlign: 'center'
                        }}
                      >
                        {tab.title}
                      </StyledText>
                    </StyledView>
                  </StyledTouchable>
                );
              })}
              
              {/* Animated Indicator */}
              <Animated.View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: screenWidth / tabs.length,
                  height: 3,
                  backgroundColor: '#22C55E',
                  borderRadius: 2,
                  transform: [{ translateX }]
                }}
              />
            </StyledView>
          </StyledView>

          {/* Tab Content with Swipe */}
          <StyledView className="flex-1">
            {renderTabContent()}
          </StyledView>
        </StyledView>
      )}
    </StyledView>
  );
};

export default LeadDetailsScreen;