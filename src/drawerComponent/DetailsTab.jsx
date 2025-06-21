
import React from 'react';
import { View, ScrollView, TouchableOpacity, useWindowDimensions, Text } from 'react-native';
import { styled } from 'nativewind';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FontConfig } from '../components/fontSize';

const StyledView = styled(View);
const StyledTouchable = styled(TouchableOpacity);

const DetailsTab = ({ lead, formattedDate, formattedFollowUpDate, navigation }) => {
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 360;

  // Use profile from API for avatar
  const profileInitials = lead?.profile || '?';

  // Convert address to string
  const getAddressString = (address) => {
    if (!address) return 'N/A';
    if (typeof address === 'string') return address;
    return [
      address.street,
      address.city,
      address.state,
      address.country,
    ]
      .filter(Boolean)
      .join(', ') || 'N/A';
  };

  // Utility to truncate text for display
  const truncateText = (text, maxLength) => {
    if (!text || typeof text !== 'string') return 'N/A';
    if (text.length <= maxLength) return text;
    console.log(`🔍 Truncating text: ${text} to ${maxLength} chars`);
    return `${text.substring(0, maxLength)}...`;
  };

  // Define fields for details section
  const detailFields = [
    { label: 'Branch Name', value: lead?.branchName || 'Default' },
    { label: 'Status', value: lead?.status || 'N/A' },
    { label: 'Reference', value: lead?.reference || 'N/A' },
    { label: 'Comment', value: lead?.comment || 'N/A' },
    {
      label: 'Contact Date',
      value: lead?.contactDate ? new Date(lead.contactDate).toLocaleDateString() : 'N/A',
    },
    { label: 'Next Follow-Up Date', value: formattedFollowUpDate || 'N/A' },
    { label: 'Model', value: lead?.model || 'N/A' },
    { label: 'Source', value: lead?.source || 'N/A' },
    { label: 'Priority', value: lead?.priority || 'N/A' },
    { label: 'Description', value: lead?.description || 'N/A' },
    { label: 'State', value: lead?.state || 'N/A' },
    { label: 'City', value: lead?.city || 'N/A' },
    { label: 'Country', value: lead?.country || 'N/A' },
    {
      label: 'Address',
      value: truncateText(getAddressString(lead?.address), isSmallScreen ? 50 : 100),
    },
  ];

  // Log lead data for debugging
  console.log('DetailsTab: lead', JSON.stringify(lead, null, 2));
  console.log('DetailsTab: addressString', getAddressString(lead?.address));

  return (
    <StyledView className="flex-1 bg-gray-100">
      <ScrollView className="p-4" contentContainerStyle={{ paddingBottom: 80 }}>
        <StyledView className="bg-white p-4 rounded-xl shadow-sm mb-4">
          <StyledView className="flex-row justify-between items-center mb-3">
            <StyledView className="flex-row items-center space-x-3">
              <StyledView className="w-10 h-10 bg-blue-500 rounded-full items-center justify-center">
                <Text className="text-white text-base font-semibold">
                  {profileInitials}
                </Text>
              </StyledView>
              <Text
                className="text-black text-lg font-familyFontLatoBold"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {lead?.name || 'Unknown Lead'}
              </Text>
            </StyledView>
            <StyledTouchable
              className="bg-blue-100 p-2 rounded-full"
              onPress={() => {
                console.log('DetailsTab: Navigating to EditLeadsDetails with lead:', JSON.stringify(lead, null, 2));
                navigation.navigate('EditLeadsDetails', {
                  leadId: lead?.id || lead?._id,
                  lead,
                });
              }}
            >
              <Ionicons name="pencil" size={18} color="#4A5BD4" />
            </StyledTouchable>
          </StyledView>

          {/* Summary Box */}
          <StyledView className="border border-gray-300 rounded-lg p-4">
            <StyledView className="flex-row justify-between mb-3 gap-x-2">
              <StyledView className="flex-row items-center space-x-2 w-1/2 pr-2">
                <Ionicons name="card-outline" size={16} color="gray" />
                <Text className="font-familyFontLatoBold text-sm">
                  Estimate Budget
                </Text>
              </StyledView>
              <StyledView className="flex-row items-center space-x-2 w-1/2 pl-2">
                <Ionicons name="calendar-outline" size={16} color="gray" />
                <Text className="font-familyFontLatoBold text-sm">
                  Estimate Date
                </Text>
              </StyledView>
            </StyledView>
            <StyledView className="flex-row justify-between mb-3 gap-x-2">
              <StyledView className="flex-row items-center space-x-2 w-1/2 pr-2">
                <Text className="font-familyFontLato text-sm ml-6">
                  {lead?.estimationBudget ? `₹ ${lead.estimationBudget}` : 'N/A'}
                </Text>
              </StyledView>
              <StyledView className="flex-row items-center space-x-2 w-1/2 pl-2">
                <Text className="font-familyFontLato text-sm ml-6">
                  {formattedFollowUpDate || 'N/A'}
                </Text>
              </StyledView>
            </StyledView>
            <StyledView className="flex-row justify-between mb-3 gap-x-2">
              <StyledView className="flex-row items-center space-x-2 w-1/2 pr-2">
                <Ionicons name="mail-outline" size={16} color="gray" />
                <Text
                  className={`text-black ${isSmallScreen ? 'text-xs' : 'text-sm'}`}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {lead?.email || 'N/A'}
                </Text>
              </StyledView>
              <StyledView className="flex-row items-center space-x-2 w-1/2 pl-2">
                <Ionicons name="call-outline" size={16} color="gray" />
                <Text
                  className={`text-black ${isSmallScreen ? 'text-xs' : 'text-sm'}`}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {lead?.phone || 'N/A'}
                </Text>
              </StyledView>
            </StyledView>
            <StyledView className="flex-row justify-between">
              <StyledView className="flex-row items-center space-x-2 w-1/2 pr-2">
                <Ionicons name="location-outline" size={16} color="gray" />
                <Text
                  className={`text-black ${isSmallScreen ? 'text-xs' : 'text-sm'}`}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {getAddressString(lead?.address)}
                </Text>
              </StyledView>
            </StyledView>
          </StyledView>
        </StyledView>

        {/* Detailed Information */}
        <StyledView className="bg-white border border-gray-200 rounded-xl overflow-hidden p-2">
          {detailFields.map((field, index) => (
            <DetailItem
              key={index}
              label={field.label}
              value={field.value}
              isLast={index === detailFields.length - 1}
              isSmallScreen={isSmallScreen}
            />
          ))}
        </StyledView>
      </ScrollView>
    </StyledView>
  );
};

const DetailItem = ({ label, value, isLast, isSmallScreen }) => (
  <StyledView
    className={`flex-row justify-between items-center px-4 py-3  ${!isLast ? 'border-b border-gray-200' : ''}`}
  >
    <Text
      className={`text-black font-familyFontLatoBold ${isSmallScreen ? 'text-xs' : 'text-sm'} w-1/3`}
      numberOfLines={2}
      ellipsizeMode="tail"
    >
      {label}
    </Text>
    <Text
      className={`text-black font-familyFontLato ${isSmallScreen ? 'text-xs' : 'text-sm'} w-2/3 text-right`}
      numberOfLines={label === 'Address' || label === 'Email' || label === 'Description' || label === 'Comment' ? 3 : 2}
      ellipsizeMode="tail"
    >
      {value}
    </Text>
  </StyledView>
);

export default DetailsTab;