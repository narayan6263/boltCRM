import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Alert,
  TextInput,
  TouchableOpacity,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllLeadStatuses } from '../redux/slices/getAllLeadStatusSlice';
import { fetchLeadStatusById, resetLeadStatusById } from '../redux/slices/getLeadStatusByIdSlice';
import { postFeedback, resetFeedbackState } from '../redux/slices/postFeedbackSlice';
import Dropdown from './phone/Dropdown';
import DynamicFields from './phone/DynamicFields';
import { styled } from 'nativewind';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFPercentage } from 'react-native-responsive-fontsize';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchable = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);

const AddLeadDetail = ({ route, navigation }) => {
  const { lead } = route.params || {};
  const dispatch = useDispatch();

  // Animation setup
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0.2,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
    });
  }, [slideAnim, fadeAnim]);

  // Handle close
  const handleClose = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: SCREEN_HEIGHT,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => navigation.goBack());
  };

  // Fallback UI for missing lead or leadId
  if (!lead || !lead.leadId || !lead.name) {
    console.error('AddLeadDetail: No lead or required fields provided', { lead });
    return (
      <StyledView className="flex-1 justify-center items-center" style={{ backgroundColor: 'transparent' }}>
        <StyledText className="text-red-500 text-center text-base">Error: Incomplete lead data</StyledText>
        <StyledTouchable
          className="bg-blue-600 p-2 rounded-md mt-4"
          onPress={() => navigation.goBack()}
          accessibilityLabel="Go back"
          accessibilityRole="button"
        >
          <StyledText className="text-white text-base">Go Back</StyledText>
        </StyledTouchable>
      </StyledView>
    );
  }

  const [selectedLeadStatus, setSelectedLeadStatus] = useState('');
  const [selectedStatusId, setSelectedStatusId] = useState('');
  const [leadStatusDropdownVisible, setLeadStatusDropdownVisible] = useState(false);
  const [contactDate, setContactDate] = useState(new Date());
  const [formData, setFormData] = useState({});

  // Date picker state
  const [pickerState, setPickerState] = useState({
    show: false,
    mode: 'date',
    value: new Date(),
  });

  const { leadStatuses = [], loading: statusesLoading, error: statusesError } = useSelector(
    (state) => state.leadStatus || {}
  );
  const { data: leadStatusDetail = {}, loading: statusLoading, error: statusError } = useSelector(
    (state) => state.leadStatusById || {}
  );
  const { loading: feedbackLoading, error: feedbackError } = useSelector(
    (state) => state.postFeedback || {}
  );

  const statusDetail = {
    ...leadStatusDetail?.data,
    meeting: leadStatusDetail?.data?.meeting || { required: false, dateLabel: '', timeLabel: '' },
    estimation: leadStatusDetail?.data?.estimation || { required: false },
    showDescription: leadStatusDetail?.data?.showDescription || false,
    isPriority: leadStatusDetail?.data?.isPriority ?? false,
  };

  const userData = {
    name: lead?.name || 'John Doe',
    mobile: lead?.mobile !== 'N/A' ? lead?.mobile : (lead?.phone ? `+91${lead.phone}` : '+919876543210'),
  };

  useEffect(() => {
    console.log('AddLeadDetail: Fetching all lead statuses');
    dispatch(fetchAllLeadStatuses())
      .unwrap()
      .catch((err) => console.error('AddLeadDetail: Error fetching lead statuses:', err));
  }, [dispatch]);

  useEffect(() => {
    if (selectedStatusId) {
      console.log('AddLeadDetail: Fetching status details for ID:', selectedStatusId);
      dispatch(fetchLeadStatusById(selectedStatusId))
        .unwrap()
        .catch((err) => console.error('AddLeadDetail: Error fetching status details:', err));
    }
  }, [dispatch, selectedStatusId]);

  useEffect(() => {
    return () => {
      console.log('AddLeadDetail: Cleaning up');
      dispatch(resetLeadStatusById());
      dispatch(resetFeedbackState());
    };
  }, [dispatch]);

  // Date picker handlers
  const handlePickerChange = (event, selectedValue) => {
    // Handle dismissal
    if (event.type === 'dismissed') {
      setPickerState({ show: false, mode: 'date', value: new Date() });
      return;
    }

    // Handle value selection
    if (selectedValue) {
      setContactDate(selectedValue);
    }

    // Close picker based on platform
    if (Platform.OS === 'ios') {
      // iOS: Close immediately after selection
      setPickerState({ show: false, mode: 'date', value: new Date() });
    } else {
      // Android: Close only if user confirms or dismisses
      if (event.type === 'set') {
        setPickerState({ show: false, mode: 'date', value: new Date() });
      }
      // If event.type is 'neutral', keep picker open (user is still selecting)
    }
  };

  const showDatePicker = () => {
    setPickerState({
      show: true,
      mode: 'date',
      value: contactDate,
    });
  };

  const handleDynamicFieldsSubmit = (data) => {
    console.log('AddLeadDetail: Received dynamic fields data', JSON.stringify(data, null, 2));
    setFormData(data);
  };

  const handleSubmit = async () => {
    console.log('AddLeadDetail: Submitting form data', {
      selectedLeadStatus,
      selectedStatusId,
      contactDate,
      formData,
    });

    // Validation
    if (!lead?.leadId || !/^[0-9a-fA-F]{24}$/.test(lead.leadId)) {
      console.error('AddLeadDetail: Invalid or missing leadId', lead?.leadId);
      Alert.alert('Error', 'Invalid or missing Lead ID.');
      return;
    }
    if (!selectedLeadStatus || !selectedStatusId) {
      Alert.alert('Error', 'Please select a status.');
      return;
    }
    if (!contactDate) {
      Alert.alert('Error', 'Please select a contact date.');
      return;
    }
    if (
      statusDetail.isPriority &&
      (!formData.priority || !['Important', 'High', 'Medium', 'Low'].includes(formData.priority))
    ) {
      Alert.alert('Error', 'Please select a valid priority.');
      return;
    }
    if (
      statusDetail.meeting?.required &&
      (!formData.nextFollowUpDate || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.*Z$/.test(formData.nextFollowUpDate))
    ) {
      Alert.alert('Error', 'Please provide a valid meeting date and 24-hour time (e.g., 14:14).');
      return;
    }
    if (
      statusDetail.estimation?.required &&
      (!formData.estimationBudget || isNaN(formData.estimationBudget) || Number(formData.estimationBudget) <= 0)
    ) {
      Alert.alert('Error', 'Please enter a valid estimation budget.');
      return;
    }
    if (
      statusDetail.estimation?.required &&
      (!formData.estimationDate || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.*Z$/.test(formData.estimationDate))
    ) {
      Alert.alert('Error', 'Please provide a valid estimation date.');
      return;
    }
    if (statusDetail.name === 'Active' && !formData.address?.trim()) {
      Alert.alert('Error', 'Please provide an address for Active status.');
      return;
    }
    if (statusDetail.name === 'Inactive' && !formData.reason?.trim()) {
      Alert.alert('Error', 'Please provide a reason for Inactive status.');
      return;
    }

    try {
      const contactDateTime = contactDate.toISOString();
      const payload = {
        leadId: lead.leadId,
        contactDateTime,
        status: selectedStatusId,
        method: 'Call',
        priority: formData.priority || 'Medium',
        nextFollowUpDate: formData.nextFollowUpDate || '',
        estimationDate: statusDetail.estimation?.required ? formData.estimationDate : '',
        estimationBudget: statusDetail.estimation?.required ? Number(formData.estimationBudget) : 0,
        description: statusDetail.showDescription ? formData.meetingDescription : '',
        address: statusDetail.name === 'Active' ? formData.address : '',
        reason: statusDetail.name === 'Inactive' ? formData.reason : '',
      };

      console.log('AddLeadDetail: Submitting payload', JSON.stringify(payload, null, 2));

      await dispatch(postFeedback(payload)).unwrap();
      console.log('AddLeadDetail: Feedback submitted successfully');
      Alert.alert('Success', 'Lead detail added successfully!');
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: SCREEN_HEIGHT,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => navigation.goBack());
    } catch (error) {
      console.error('AddLeadDetail: Submit error', JSON.stringify(error, null, 2));
      const errorMessage = error.message || feedbackError?.message || 'Failed to submit lead details.';
      Alert.alert('Error', errorMessage);
      dispatch(resetFeedbackState());
    }
  };

  const renderError = () => {
    if (feedbackError || statusesError || statusError) {
      const errorMessage =
        feedbackError?.message || statusesError || statusError || 'Failed to load statuses';
      return <StyledText className="text-red-500 text-base mb-2">{errorMessage}</StyledText>;
    }
    return null;
  };

  return (
    <StyledView className="flex-1" style={{ backgroundColor: 'transparent' }}>
      {/* Semi-transparent Backdrop */}
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          opacity: fadeAnim,
          zIndex: 1,
        }}
      >
        <TouchableWithoutFeedback onPress={handleClose}>
          <StyledView className="flex-1" />
        </TouchableWithoutFeedback>
      </Animated.View>

      {/* Bottom Sheet */}
      <Animated.View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: SCREEN_HEIGHT * 0.6,
          transform: [{ translateY: slideAnim }],
          backgroundColor: 'transparent',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.2,
          shadowRadius: 5,
          elevation: 5,
          zIndex: 2,
        }}
      >
        <StyledView className="flex-1 bg-white">
          {/* Header with Chevron-Down */}
          <StyledView className="items-center pt-2">
            <StyledTouchable
              onPress={handleClose}
              className="p-2"
              accessibilityLabel="Close modal"
              accessibilityRole="button"
              activeOpacity={0.8}
            >
              <Ionicons name="chevron-down" size={RFPercentage(3)} color="#000" />
            </StyledTouchable>
            <StyledText
              className="text-[#000000] font-semibold font-poppins text-center"
              style={{ fontSize: RFPercentage(2.5) }}
            >
              Add Lead Details
            </StyledText>
          </StyledView>

          <ScrollView
            className="flex-1 px-4"
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          >
            {/* Fixed User Info */}
            <StyledView className="mb-3">
              <StyledText
                className="text-black font-bold font-poppins"
                style={{ fontSize: RFPercentage(2.2) }}
              >
                {userData.name}
              </StyledText>
              <StyledText
                className="text-gray-500 font-poppins"
                style={{ fontSize: RFPercentage(1.8) }}
              >
                {userData.mobile}
              </StyledText>
            </StyledView>

            {/* Contact Date with Calendar Picker */}
            <StyledView className="mb-3">
              <StyledText
                className="text-gray-900 font-poppins text-sm font-semibold mb-1"
                style={{ fontSize: RFPercentage(2) }}
              >
                Contact Date
              </StyledText>
              <StyledTouchable
                className="border border-gray-300 p-2 rounded-md flex-row justify-between items-center"
                onPress={showDatePicker}
                activeOpacity={0.7}
              >
                <StyledText
                  className="text-base font-poppins text-black"
                  style={{ fontSize: RFPercentage(1.8) }}
                >
                  {format(contactDate, 'dd/MM/yyyy')}
                </StyledText>
                <Ionicons name="calendar-outline" size={20} color="#4B5563" />
              </StyledTouchable>
            </StyledView>

            {/* Status Dropdown and Errors */}
            {statusesLoading || statusLoading || feedbackLoading ? (
              <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
            ) : (
              <>
                {renderError()}
                <StyledText
                  className="text-base font-semibold text-gray-700 mb-1 font-poppins"
                  style={{ fontSize: RFPercentage(2) }}
                >
                  Select Status
                </StyledText>
                <Dropdown
                  visible={leadStatusDropdownVisible}
                  setVisible={setLeadStatusDropdownVisible}
                  selectedValue={selectedLeadStatus}
                  setSelectedValue={setSelectedLeadStatus}
                  options={leadStatuses}
                  placeholder="Select Status"
                  setSelectedId={setSelectedStatusId}
                />

                {/* Dynamic Fields */}
                {selectedStatusId && (
                  <StyledView className="mt-3">
                    <DynamicFields statusDetail={statusDetail} onSubmit={handleDynamicFieldsSubmit} />
                  </StyledView>
                )}

                {/* Submit Button */}
                {selectedStatusId && (
                  <LinearGradient
                    colors={['#8290EA', '#3F4CA0']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    className="rounded-md mt-4 mb-6"
                  >
                    <StyledTouchable
                      className="p-2 items-center"
                      onPress={handleSubmit}
                      accessibilityLabel="Submit lead details"
                      accessibilityRole="button"
                      activeOpacity={0.8}
                    >
                      <StyledText
                        className="text-white text-base font-bold font-poppins"
                        style={{ fontSize: RFPercentage(2) }}
                      >
                        Submit
                      </StyledText>
                    </StyledTouchable>
                  </LinearGradient>
                )}
              </>
            )}
          </ScrollView>
        </StyledView>
      </Animated.View>

      {/* Date Picker Modal */}
      {pickerState.show && (
        <DateTimePicker
          testID="contact-date-picker"
          value={pickerState.value}
          mode={pickerState.mode}
          is24Hour
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handlePickerChange}
        />
      )}
    </StyledView>
  );
};

export default AddLeadDetail;