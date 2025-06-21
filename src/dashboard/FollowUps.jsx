import React, { useEffect, useCallback, useState } from 'react';
import { View, Text, FlatList, SafeAreaView, ActivityIndicator, Alert, ScrollView, Pressable, Image, Modal, TouchableOpacity, Dimensions, Platform, Linking, PermissionsAndroid } from 'react-native';
import { styled } from 'nativewind';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLeadsByFollowUpDate, resetSearchLeadsState } from '../redux/slices/SearchLeadsByFollowUpDateSlice';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Header from '../component/Header';
import BulkAssignLeads from '../drawerComponent/BulkAssignLeads';
import { FontConfig } from '../components/fontSize';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchable = styled(Pressable);

const FollowUps = ({ route }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { leads = [], loading, error, totalLeads, currentPage, totalPages } = useSelector(
    (state) => state.searchLeadsByFollowUpDate || {}
  );
  const { queryType = 'pending' } = route.params || {};

  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', content: '' });
  const [assignModalVisible, setAssignModalVisible] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState(null);

  useEffect(() => {
    dispatch(resetSearchLeadsState());
    dispatch(fetchLeadsByFollowUpDate({ queryType, page: 1, pageSize: 10 }));
  }, [dispatch, queryType]);

  const handleLoadMore = useCallback(() => {
    if (!loading && currentPage < totalPages) {
      dispatch(
        fetchLeadsByFollowUpDate({
          queryType,
          page: currentPage + 1,
          pageSize: 10,
          isLoadMore: true,
        })
      );
    }
  }, [dispatch, queryType, currentPage, totalPages, loading]);

  const truncateText = (text) => {
    if (!text || typeof text !== 'string') {
      return { text: 'N/A', hasMore: false };
    }
    const words = text.trim().split(' ');
    return words.length > 1
      ? { text: words[0], hasMore: true }
      : { text: words[0] || 'N/A', hasMore: false };
  };

  const openModal = (title, content) => {
    setModalContent({ title, content });
    setModalVisible(true);
  };

  const requestCallPermission = async () => {
    if (Platform.OS !== 'android') return true;
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CALL_PHONE,
        {
          title: 'Call Permission',
          message: 'This app needs permission to make calls.',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (error) {
      Alert.alert('Error', 'Failed to request call permission.');
      return false;
    }
  };

  const handleCall = async (phone, leadId) => {
    const formattedPhone = phone.startsWith('+') ? phone : `+91${phone.replace(/[\s\-\(\)]/g, '')}`;
    const telUrl = `tel:${formattedPhone}`;
    if (!phone.trim()) {
      Alert.alert('Error', 'Please provide a valid phone number.');
      return;
    }
    const hasPermission = await requestCallPermission();
    if (!hasPermission) {
      Alert.alert('Error', 'Call permission denied.');
      return;
    }
    try {
      await Linking.openURL(telUrl);
      const sourceScreen = queryType === 'today' ? 'TodayFollowUps' : 
                          queryType === 'tomorrow' ? 'TomorrowFollowUps' : 
                          'PendingFollowUps';
      navigation.navigate('FeedbackScreen', { 
        phoneNumber: phone, 
        leadId,
        sourceScreen: sourceScreen,
        queryType: queryType
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to make call.');
    }
  };

  const handleWhatsApp = async (phone) => {
    const formattedPhone = phone.startsWith('+') ? phone : `+91${phone.replace(/[\s\-\(\)]/g, '')}`;
    const url = `https://wa.me/${formattedPhone}`;
    try {
      await Linking.openURL(url);
    } catch (err) {
      Alert.alert('Error', 'Could not open WhatsApp.');
    }
  };

  const handleSMS = async (phone) => {
    const formattedPhone = phone.startsWith('+') ? phone : `+91${phone.replace(/[\s\-\(\)]/g, '')}`;
    const url = Platform.OS === 'ios' ? `sms://${formattedPhone}` : `sms:${formattedPhone}`;
    try {
      await Linking.openURL(url);
    } catch (err) {
      Alert.alert('Error', 'Could not open SMS app.');
    }
  };

  const handleAssignTo = (leadId) => {
    setSelectedLeadId(leadId);
    setAssignModalVisible(true);
  };

  const handleLeadPress = (lead) => {
    if (!lead.leadId || !lead.name || !lead.phone) {
      console.error('Invalid lead data for navigation:', lead);
      Alert.alert('Error', 'Incomplete lead data. Please try again.');
      return;
    }
    console.log('Navigating to LeadDetailsScreen with lead:', JSON.stringify(lead, null, 2));
    try {
      navigation.navigate('LeadDetailsScreen', { lead });
    } catch (error) {
      console.error('Navigation error:', error);
      Alert.alert('Error', 'Failed to navigate to lead details. Please try again.');
    }
  };

  const screenWidth = Dimensions.get('window').width;
  const dropdownWidth = screenWidth * 0.9;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleLeadPress(item)}>
      <StyledView className="bg-white rounded-md shadow-sm mb-4 mx-4">
        <StyledView
          className="bg-white border border-[#C8C8C8] rounded-md"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 5,
          }}
        >
          <StyledView className="w-full space-y-2 ml-4 p-3">
            <View className="flex-row">
              <View className="w-[195] flex-row items-center gap-x-6">
                <StyledText className="text-subHeading font-familyFontLatoBold text-[#000]">
                  {item.name || 'N/A'}
                </StyledText>
              </View>
              <View className="w-1/2 flex-row items-center gap-x-2">
                <Image
                  source={require('../assets/modal.png')}
                  className="w-[15px] h-[15px]"
                  resizeMode="contain"
                />
                <StyledText className="text-[#000] text-inputs font-familyFontInter">
                  {truncateText(item.model).text}
                </StyledText>
                {truncateText(item.model).hasMore && (
                  <StyledTouchable onPress={() => openModal('Model Info', item.model || 'N/A')}>
                    <StyledText className="text-[#1E90FF] text-[12px]">See...</StyledText>
                  </StyledTouchable>
                )}
              </View>
            </View>
            <View className="flex-row">
              <View className="w-[195] flex-row items-center gap-x-6">
                <Image
                  source={require('../assets/personLead.png')}
                  className="w-[15px] h-[15px]"
                  resizeMode="contain"
                />
                <StyledText className="text-[#000] text-inputs font-familyFontInter">
                  {item.assignedTo || 'N/A'}
                </StyledText>
              </View>
              <View className="w-1/2 flex-row items-center gap-x-2">
                <Image
                  source={require('../assets/freshLead.png')}
                  className="w-[15px] h-[15px]"
                  resizeMode="contain"
                />
                <StyledText
                  className="text-inputs font-familyFontInter"
                  style={{ color: item.statusColor || '#4DD041' }}
                >
                  {item.status || 'N/A'}
                </StyledText>
              </View>
            </View>
            <View className="flex-row">
              <View className="w-[195] flex-row items-center gap-x-6">
                <Image
                  source={require('../assets/floorvisit.png')}
                  className="w-[15px] h-[15px]"
                  resizeMode="contain"
                />
                <StyledText className="text-[#000] text-inputs font-familyFontInter">
                  {truncateText(item.source).text}
                </StyledText>
                {truncateText(item.source).hasMore && (
                  <StyledTouchable onPress={() => openModal('Source Info', item.source || 'N/A')}>
                    <StyledText className="text-[#1E90FF] text-[12px]">See...</StyledText>
                  </StyledTouchable>
                )}
              </View>
              <View className="w-1/2 flex-row items-center gap-x-2">
                <Image
                  source={require('../assets/calender.png')}
                  className="w-[15px] h-[15px]"
                  resizeMode="contain"
                />
                <StyledText className="text-[#000] text-inputs font-familyFontInter">
                  {formatDate(item.nextFollowUpDate)}
                </StyledText>
              </View>
            </View>
            <View className="flex-row mb-2">
              <View className="w-[195] flex-row items-center gap-x-6">
                <Image
                  source={require('../assets/calender.png')}
                  className="w-[15px] h-[15px]"
                  resizeMode="contain"
                />
                <StyledText className="text-[#000] text-inputs font-familyFontInter">
                  {formatDate(item.createdAt)}
                </StyledText>
              </View>
              <View className="w-1/2 flex-row items-center gap-x-2">
                <Ionicons name="chatbubble-outline" size={16} color="#000" />
                <StyledText className="text-[#000] text-inputs font-familyFontInter">
                  {truncateText(item.comment).text}
                </StyledText>
                {truncateText(item.comment).hasMore && (
                  <StyledTouchable onPress={() => openModal('Lead Description', item.comment || 'N/A')}>
                    <StyledText className="text-[#1E90FF] text-[12px]">See...</StyledText>
                  </StyledTouchable>
                )}
              </View>
            </View>
          </StyledView>
          <StyledView className="flex-row justify-around bg-violet-100 py-3 rounded-b-md">
            {[
              { icon: require('../assets/call.png'), label: 'Call', onPress: () => handleCall(item.phone, item.leadId) },
              { icon: require('../assets/whatsapp.png'), label: 'Whatsapp', onPress: () => handleWhatsApp(item.phone) },
              { icon: require('../assets/sms.png'), label: 'SMS', onPress: () => handleSMS(item.phone) },
              { icon: require('../assets/assignTo.png'), label: 'Assign To', onPress: () => handleAssignTo(item.leadId) },
              { label: 'Count', number: item.followUpCount || 0 },
            ].map((action) => (
              <StyledTouchable
                key={action.label}
                className="flex-col items-center gap-y-1"
                onPress={action.onPress}
                disabled={action.label === 'Count'}
              >
                {action.label === 'Count' ? (
                  <View className="w-[30px] h-[30px] rounded-full bg-blue-500 items-center justify-center">
                    <StyledText className="text-white text-inputs font-bold">{action.number}</StyledText>
                  </View>
                ) : (
                  <Image source={action.icon} className="w-[25px] h-[30px]" resizeMode="contain" />
                )}
                <StyledText className="text-[10px] font-familyFontInter">{action.label}</StyledText>
              </StyledTouchable>
            ))}
          </StyledView>
        </StyledView>
      </StyledView>
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (loading && currentPage > 1) {
      return (
        <StyledView className="py-4 items-center">
          <ActivityIndicator size="large" color="#1976D2" />
        </StyledView>
      );
    }
    if (currentPage < totalPages) {
      return (
        <LinearGradient
          colors={['#8290EA', '#3F4CA0']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="py-3 rounded-lg my-3 mx-4 justify-center items-center"
        >
          <StyledTouchable onPress={handleLoadMore}>
            <StyledText className="text-white text-base font-semibold">Show More</StyledText>
          </StyledTouchable>
        </LinearGradient>
      );
    }
    return null;
  };

  const getHeaderTitle = () => {
    switch (queryType) {
      case 'today':
        return 'Today FollowUps Detail';
      case 'tomorrow':
        return 'Tomorrow FollowUps Detail';
      case 'pending':
      default:
        return 'Pending FollowUps Detail';
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header
        title={getHeaderTitle()}
        showBackButton={true}
        backScreenName="HomeScreen"
        titleFontSize={RFPercentage(2.5)}
        titleFontWeight="400"
      />
      <StyledView className="flex-1 bg-white">
        <StyledView className="p-3 bg-white">
          <StyledText className="text-black text-subHeading font-familyFontLatoBold">
            Total FollowUps - {totalLeads || 0}
          </StyledText>
        </StyledView>
        {loading && currentPage === 1 ? (
          <StyledText className="text-black text-center mt-5">Loading...</StyledText>
        ) : error ? (
          <StyledText className="text-red-500 text-center mt-5">Error: {error}</StyledText>
        ) : (
          <FlatList
            data={leads}
            renderItem={renderItem}
            keyExtractor={(item) => item.leadId}
            contentContainerStyle={{ padding: 12 }}
            ListFooterComponent={renderFooter}
          />
        )}
        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <StyledView className="flex-1 justify-center items-center bg-opacity-50">
            <TouchableOpacity
              className="flex-1 w-full justify-center items-center"
              activeOpacity={1}
              onPress={() => setModalVisible(false)}
            >
              <StyledView className="bg-[#F5F5F5] rounded-lg p-6 w-[90%] max-w-[350px] shadow-lg border border-[#C8C8C8]">
                <StyledText className="text-lg font-bold text-black mb-4" style={{ fontFamily: FontConfig.bold }}>
                  {modalContent.title}
                </StyledText>
                <StyledText className="text-base text-black mb-6" style={{ fontFamily: FontConfig.regular }}>
                  {modalContent.content}
                </StyledText>
                <View className="flex-row justify-end">
                  <StyledTouchable onPress={() => setModalVisible(false)} className="px-4 py-2">
                    <StyledText className="text-base text-blue-600 font-semibold" style={{ fontFamily: FontConfig.semibold }}>
                      OK
                    </StyledText>
                  </StyledTouchable>
                </View>
              </StyledView>
            </TouchableOpacity>
          </StyledView>
        </Modal>
        <Modal
          transparent
          visible={assignModalVisible}
          animationType="slide"
          onRequestClose={() => setAssignModalVisible(false)}
        >
          <StyledView className="flex-1 justify-center items-center bg-opacity-50">
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setAssignModalVisible(false)}
              className="flex-1 w-full justify-center items-center"
            >
              <StyledView className="bg-white rounded-lg shadow-lg" style={{ width: dropdownWidth, height: '25%' }}>
                <ScrollView>
                  <BulkAssignLeads
                    route={{ params: { leadIds: [selectedLeadId] } }}
                    navigation={navigation}
                    onClose={() => setAssignModalVisible(false)}
                  />
                </ScrollView>
              </StyledView>
            </TouchableOpacity>
          </StyledView>
        </Modal>
      </StyledView>
    </SafeAreaView>
  );
};

export default FollowUps;