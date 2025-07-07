import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Image,
  Modal,
  TouchableOpacity,
  Alert,
  Text,
  Platform,
  ScrollView,
  Dimensions,
  PermissionsAndroid,
  Linking,
  AppState,
  ActivityIndicator,
} from 'react-native';
import { styled } from 'nativewind';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FontConfig } from '../components/fontSize';
import BulkAssignLeads from './BulkAssignLeads';
import { useDispatch, useSelector } from 'react-redux';
import { getDecryptInfo, resetDecryptInfo } from '../redux/slice/index';
import { debounce } from 'lodash';

const StyledView = styled(View);
const StyledTouchable = styled(TouchableOpacity);

const LeadCard = ({ lead, formattedDate, formattedFollowUpDate, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', content: '' });
  const [assignModalVisible, setAssignModalVisible] = useState(false);
  const [callInitiated, setCallInitiated] = useState(false);
  const [decryptedPhoneNumber, setDecryptedPhoneNumber] = useState(null);
  const [hasCallPermission, setHasCallPermission] = useState(Platform.OS !== 'android');
  const [isLoading, setIsLoading] = useState(false);
  const appState = useRef(AppState.currentState);
  const dispatch = useDispatch();
  const { data: decryptedData, status, error } = useSelector((state) => state.decryptInfo);

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

  // Pre-fetch call permission and decrypted phone number
  useEffect(() => {
    const checkCallPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CALL_PHONE);
        setHasCallPermission(granted);
        if (!granted) {
          const result = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CALL_PHONE,
            {
              title: 'Call Permission',
              message: 'This app needs permission to make calls.',
              buttonPositive: 'OK',
            }
          );
          setHasCallPermission(result === PermissionsAndroid.RESULTS.GRANTED);
        }
      }
    };

    checkCallPermission();
  }, []); // Depend only on initial render for permission

  const fetchDecryptedPhone = async () => {
    if (decryptedPhoneNumber) {
      console.log('LeadCard: Using cached decrypted phone number');
      return decryptedPhoneNumber;
    }

    if (!lead.contactId) {
      console.warn('LeadCard: No contactId provided. Available fields:', Object.keys(lead));
      Alert.alert('Error', 'No contact ID provided.');
      return null;
    }

    try {
      setIsLoading(true);
      console.log('LeadCard: Dispatching getDecryptInfo for contactId', lead.contactId);
      const result = await dispatch(getDecryptInfo(lead.contactId)).unwrap();
      const phone = result?.data?.phone || result?.phone;
      setDecryptedPhoneNumber(phone);
      return phone;
    } catch (err) {
      console.error('LeadCard: Error fetching decrypted phone', err);
      Alert.alert('Error', 'Failed to decrypt phone number.');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleCall = debounce(async () => {
    if (!hasCallPermission) {
      Alert.alert('Error', 'Call permission not granted.');
      return;
    }

    const decryptedPhone = await fetchDecryptedPhone();
    if (!decryptedPhone) return;

    const formattedPhone = decryptedPhone.startsWith('+') ? decryptedPhone : `+91${decryptedPhone}`;
    const telUrl = `tel:${formattedPhone}`;

    try {
      setCallInitiated(true);
      await Linking.openURL(telUrl);
    } catch (error) {
      console.error('LeadCard: Error initiating call', error);
      setCallInitiated(false);
      Alert.alert('Error', 'Failed to make call.');
    } finally {
      dispatch(resetDecryptInfo());
    }
  }, 500);

  const handleWhatsApp = debounce(async () => {
    const decryptedPhone = await fetchDecryptedPhone();
    if (!decryptedPhone) return;

    const formattedPhone = decryptedPhone.startsWith('+') ? decryptedPhone : `+91${decryptedPhone}`;
    const url = `https://wa.me/${formattedPhone}`;
    try {
      await Linking.openURL(url);
    } catch (err) {
      console.error('LeadCard: Error opening WhatsApp', err);
      Alert.alert('Error', 'Could not open WhatsApp.');
    } finally {
      dispatch(resetDecryptInfo());
    }
  }, 500);

  const handleSMS = debounce(async () => {
    const decryptedPhone = await fetchDecryptedPhone();
    if (!decryptedPhone) return;

    const formattedPhone = decryptedPhone.startsWith('+') ? decryptedPhone : `+91${decryptedPhone}`;
    const url = Platform.OS === 'ios' ? `sms://${formattedPhone}` : `sms:${formattedPhone}`;
    try {
      await Linking.openURL(url);
    } catch (err) {
      console.error('LeadCard: Error opening SMS', err);
      Alert.alert('Error', 'Could not open SMS app.');
    } finally {
      dispatch(resetDecryptInfo());
    }
  }, 500);

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      console.log('LeadCard: AppState changed to', nextAppState);
      if (
        callInitiated &&
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active' &&
        navigation.isFocused()
      ) {
        console.log('LeadCard: Navigating to FeedbackScreen', {
          phoneNumber: decryptedPhoneNumber || lead.phone,
          leadId: lead.leadId,
        });
        setCallInitiated(false);
        navigation.navigate('FeedbackScreen', {
          phoneNumber: decryptedPhoneNumber || lead.phone,
          leadId: lead.leadId,
        });
      }
      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => {
      console.log('LeadCard: Cleaning up AppState listener');
      subscription.remove();
    };
  }, [callInitiated, navigation, decryptedPhoneNumber, lead.phone, lead.leadId]);

  const handleAssignTo = () => {
    console.log('LeadCard: Opening BulkAssignLeads modal for lead', lead.leadId);
    setAssignModalVisible(true);
  };

  const handleLeadPress = () => {
    console.log('LeadCard: Navigating to LeadDetailsScreen for lead', lead.leadId);
    navigation.navigate('LeadDetailsScreen', { lead, formattedDate, formattedFollowUpDate, previousScreen: 'LeadsScreen' });
  };

  const screenWidth = Dimensions.get('window').width;
  const dropdownWidth = screenWidth * 0.9;

  return (
    <StyledView className="bg-white rounded-md shadow-sm mb-4">
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
        {/* Content Block (Rows 1-4) */}
        <StyledTouchable onPress={handleLeadPress}>
          <StyledView className="w-full space-y-2 ml-4 p-3">
            {/* Row 1 */}
            <View className="flex-row">
              <View className="w-[195] flex-row items-center gap-x-4">
                <Text className="text-subHeading font-familyFontLatoBold text-[#000]">
                  {lead.name || 'N/A'}
                </Text>
              </View>
              <View className="w-1/2 flex-row items-center gap-x-2">
                <Image
                  source={require('../assets/modal.png')}
                  className="w-[15px] h-[15px]"
                  resizeMode="contain"
                />
                <Text className="text-[#000] text-inputs font-familyFontInter">
                  {truncateText(lead.model).text}
                </Text>
                {truncateText(lead.model).hasMore && (
                  <StyledTouchable
                    onPress={(e) => {
                      e.stopPropagation();
                      openModal('Model Info', lead.model || 'N/A');
                    }}
                  >
                    <Text className="text-[#1E90FF] text-[12px]">...</Text>
                  </StyledTouchable>
                )}
              </View>
            </View>

            {/* Row 2 */}
            <View className="flex-row">
              <View className="w-[195] flex-row items-center gap-x-4">
                <Image
                  source={require('../assets/personLead.png')}
                  className="w-[15px] h-[15px]"
                  resizeMode="contain"
                />
                <Text className="text-[#000] text-inputs font-familyFontInter">
                  {lead.assignedTo || 'N/A'}
                </Text>
              </View>
              <View className="w-1/2 flex-row items-center gap-x-2">
                <Image
                  source={require('../assets/freshLead.png')}
                  className="w-[15px] h-[15px]"
                  resizeMode="contain"
                />
                <Text
                  className="text-inputs font-familyFontInter"
                  style={{ color: lead.statusColor || '#4DD041' }}
                >
                  {lead.status || 'N/A'}
                </Text>
              </View>
            </View>

            {/* Row 3 */}
            <View className="flex-row">
              <View className="w-[195] flex-row items-center gap-x-4">
                <Image
                  source={require('../assets/floorvisit.png')}
                  className="w-[15px] h-[15px]"
                  resizeMode="contain"
                />
                <Text className="text-[#000] text-inputs font-familyFontInter">
                  {truncateText(lead.source).text}
                </Text>
                {truncateText(lead.source).hasMore && (
                  <StyledTouchable
                    onPress={(e) => {
                      e.stopPropagation();
                      openModal('Source Info', lead.source || 'N/A');
                    }}
                  >
                    <Text className="text-[#1E90FF] text-[12px]">...</Text>
                  </StyledTouchable>
                )}
              </View>
              <View className="w-1/2 flex-row items-center gap-x-2">
                <Image
                  source={require('../assets/calender.png')}
                  className="w-[15px] h-[15px]"
                  resizeMode="contain"
                />
                <Text className="text-[#000] text-inputs font-familyFontInter">
                  {formattedFollowUpDate || 'N/A'}
                </Text>
              </View>
            </View>

            {/* Row 4 */}
            <View className="flex-row mb-2">
              <View className="w-[195] flex-row items-center gap-x-4">
                <Image
                  source={require('../assets/calender.png')}
                  className="w-[15px] h-[15px]"
                  resizeMode="contain"
                />
                <Text className="text-[#000] text-inputs font-familyFontInter">
                  {formattedDate || 'N/A'}
                </Text>
              </View>
              <View className="w-1/2 flex-row items-center gap-x-2">
                <Ionicons name="chatbubble-outline" size={16} color="#000" />
                <Text className="text-[#000] text-inputs font-familyFontInter">
                  {truncateText(lead.comment).text}
                </Text>
                {truncateText(lead.comment).hasMore && (
                  <StyledTouchable
                    onPress={(e) => {
                      e.stopPropagation();
                      openModal('Lead Description', lead.comment || 'N/A');
                    }}
                  >
                    <Text className="text-[#1E90FF] text-[12px]">...</Text>
                  </StyledTouchable>
                )}
              </View>
            </View>
          </StyledView>
        </StyledTouchable>

        {/* Action Buttons */}
        <StyledView className="flex-row justify-around bg-violet-100 py-3 rounded-b-md">
          {[
            { icon: require('../assets/call.png'), label: 'Call', onPress: handleCall },
            { icon: require('../assets/whatsapp.png'), label: 'Whatsapp', onPress: handleWhatsApp },
            { icon: require('../assets/sms.png'), label: 'SMS', onPress: handleSMS },
            { icon: require('../assets/assignTo.png'), label: 'Assign To', onPress: handleAssignTo },
            { label: 'Count', number: lead.followUpCount || 0 },
          ].map((action) => (
            <StyledTouchable
              key={action.label}
              className="flex-col items-center gap-y-1"
              onPress={(e) => {
                e.stopPropagation();
                console.log(`LeadCard: ${action.label} button pressed`);
                action.onPress && action.onPress();
              }}
              disabled={action.label === 'Count' || isLoading}
            >
              {action.label === 'Count' ? (
                <View className="w-[30px] h-[30px] rounded-full bg-blue-500 items-center justify-center">
                  <Text className="text-white text-inputs font-bold">{action.number}</Text>
                </View>
              ) : (
                <Image source={action.icon} className="w-[25px] h-[30px]" resizeMode="contain" />
              )}
              <Text className="text-[10px] font-familyFontInter">{action.label}</Text>
            </StyledTouchable>
          ))}
        </StyledView>
      </StyledView>

      {/* Loading Indicator */}
      {isLoading && (
        <Modal transparent visible={isLoading}>
          <View className="flex-1 justify-center items-center bg-opacity-50">
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        </Modal>
      )}

      {/* Unified Modal for Lead Details */}
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
              <Text className="text-lg font-bold text-black mb-4" style={{ fontFamily: FontConfig.bold }}>
                {modalContent.title}
              </Text>
              <Text className="text-base text-black mb-6" style={{ fontFamily: FontConfig.regular }}>
                {modalContent.content}
              </Text>
              <View className="flex-row justify-end">
                <StyledTouchable onPress={() => setModalVisible(false)} className="px-4 py-2">
                  <Text className="text-base text-blue-600 font-semibold" style={{ fontFamily: FontConfig.semibold }}>
                    OK
                  </Text>
                </StyledTouchable>
              </View>
            </StyledView>
          </TouchableOpacity>
        </StyledView>
      </Modal>

      {/* Modal for BulkAssignLeads */}
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
                  route={{ params: { leadIds: [lead.leadId] } }}
                  navigation={navigation}
                  onClose={() => setAssignModalVisible(false)}
                />
              </ScrollView>
            </StyledView>
          </TouchableOpacity>
        </StyledView>
      </Modal>
    </StyledView>
  );
};

export default LeadCard;