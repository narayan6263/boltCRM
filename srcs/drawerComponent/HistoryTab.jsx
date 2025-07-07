import React, { useEffect, useRef } from 'react';
import { View, ScrollView, Text, Alert } from 'react-native';
import { styled } from 'nativewind';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeadFollowUps } from '../redux/slice/index';
import { RFPercentage } from 'react-native-responsive-fontsize';
import CustomButton from '../component/CustomButton';

const StyledView = styled(View);
const StyledText = styled(Text);

const HistoryTab = ({ lead, navigation }) => {
  const dispatch = useDispatch();
  const { followUps = [], loading, error } = useSelector((state) => state.followUps || {});
  const hasFetched = useRef({}); // Use a ref to store fetched state for each leadId

  useEffect(() => {
    if (!lead?.leadId) {
      console.error('HistoryTab: No lead.leadId provided', { lead });
      return;
    }

    // Only fetch if data hasn't been fetched for this leadId yet
    if (!hasFetched.current[lead.leadId]) {
      dispatch(fetchLeadFollowUps(lead.leadId))
        .then(() => {
          hasFetched.current[lead.leadId] = true; // Mark as fetched on success
        })
        .catch((err) =>
          console.error('HistoryTab: Dispatch error:', err)
        );
    } else {
      console.log(`HistoryTab: Data for leadId ${lead.leadId} already fetched, skipping.`);
    }
  }, [dispatch, lead?.leadId]);

  // Handle Add button press
  const handleAddPress = () => {
    if (!lead?.leadId) {
      console.error('HistoryTab: Cannot navigate to AddLeadDetail, missing leadId', { lead });
      Alert.alert('Error', 'Lead data is missing. Please try again.');
      return;
    }
    if (!navigation) {
      console.error('HistoryTab: Navigation object is undefined');
      Alert.alert('Error', 'Navigation is not available. Please try again.');
      return;
    }
    navigation.navigate('AddLeadDetail', { lead });
  };

  if (loading) {
    return (
      <StyledView className="flex-1 justify-center items-center">
        <StyledText style={{ fontSize: RFPercentage(2) }}>Loading...</StyledText>
      </StyledView>
    );
  }

  if (error || !lead?.leadId) {
    console.error('HistoryTab: Error or Missing ID:', error || 'No lead ID', 'Lead object:', lead);
    return (
      <StyledView className="flex-1 justify-center items-center">
        <StyledText style={{ fontSize: RFPercentage(2) }}>
          Error: {error || 'Lead ID is required'}
        </StyledText>
      </StyledView>
    );
  }

  return (
    <StyledView className="flex-1 bg-gray-100 p-4">
      {/* Lead Name */}
      <StyledView className="bg-white p-4 rounded-xl shadow-sm mb-4">
        <StyledView className="flex-row items-center space-x-2 mb-3">
          <Ionicons name="person" size={RFPercentage(2)} color="black" />
          <StyledText
            className="text-black font-familyFontLatoBold"
            style={{ fontSize: RFPercentage(2.2) }}
          >
            {lead?.name || 'N/A'}
          </StyledText>
        </StyledView>
      </StyledView>

      {/* History List */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <StyledView className="bg-white border border-gray-200 rounded-xl p-2">
          {followUps.map((item, index) => {
            const date = new Date(item.contactDate).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: '2-digit',
            });
            const time = new Date(item.contactDate).toLocaleTimeString('en-GB', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            });
            const nextSchedule = new Date(item.nextScheduleDate).toLocaleString('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            });

            return (
              <StyledView key={index} className="flex-row mb-6">
                {/* Timeline Circle with Status Color */}
                <StyledView className="items-center">
                  <StyledView
                    className="w-4 h-4 rounded-full mt-1"
                    style={{ backgroundColor: item.statusColor || '#4DB6AC' }}
                  />
                  {index !== followUps.length - 1 && (
                    <StyledView className="w-0.5 bg-gray-300 flex-1" />
                  )}
                </StyledView>

                {/* Content */}
                <StyledView className="ml-4 mb-2">
                  <StyledText
                    className="text-black font-familyFontInter"
                    style={{ fontSize: RFPercentage(1.8) }}
                  >
                    {date} {time}
                  </StyledText>
                  <StyledText
                    className="mt-1 text-black font-familyFontInter"
                    style={{ fontSize: RFPercentage(1.8) }}
                  >
                    <Text className="font-familyFontLatoBold">User:</Text> {item.processedBy}
                  </StyledText>
                  <StyledText
                    className="mt-1 text-black font-familyFontInter"
                    style={{ fontSize: RFPercentage(1.8) }}
                  >
                    <Text className="font-familyFontLatoBold">Status:</Text>{' '}
                    <Text style={{ color: item.statusColor || '#03A9F4' }}>{item.status}</Text>
                  </StyledText>
                  <StyledText
                    className="mt-1 text-black font-familyFontInter"
                    style={{ fontSize: RFPercentage(1.8) }}
                  >
                    <Text className="font-familyFontLatoBold">Next Schedule:</Text> {nextSchedule}
                  </StyledText>
                  <StyledText
                    className="mt-1 text-black font-familyFontInter"
                    style={{ fontSize: RFPercentage(1.8) }}
                  >
                    <Text className="font-familyFontLatoBold">Description:</Text> {item.description}
                  </StyledText>
                </StyledView>
              </StyledView>
            );
          })}
        </StyledView>
      </ScrollView>

      {/* Floating Add Button */}
      <CustomButton
        buttonName=""
        onPress={handleAddPress}
        gradientColors={['#8290EA', '#3F4CA0']}
        height={56}
        width={56}
        accessibilityLabel="Add new lead detail"
        containerStyle={{
          position: 'absolute',
          bottom: 24,
          right: 24, // Adjusted from 10 to 24 to match original right-6
          borderRadius: 28,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 5,
        }}
        component={<Ionicons name="add" size={RFPercentage(4)} color="white" />}
        paddingX={0}
      />
    </StyledView>
  );
};

export default HistoryTab;