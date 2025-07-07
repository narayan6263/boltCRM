
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchAllLeadStatuses } from '../../redux/slices/getAllLeadStatusSlice';
import { fetchLeadStatusById, resetLeadStatusById ,fetchAllLeadStatuses,postFeedback, resetFeedbackState} from '../../redux/slice/index';
// import { postFeedback, resetFeedbackState } from '../../redux/slices/postFeedbackSlice';
import { getLatestCallLog } from '../phone/CallLogs';
import Dropdown from './Dropdown';
import DynamicFields from './DynamicFields';
import Header from '../../component/Header'; // Import the Header component
import CustomButton from '../../component/CustomButton'; // Import the CustomButton component
import Toast from 'react-native-toast-message'; // Import Toast for notifications
import { toastConfig } from '../../component/toastConfig'; // Import toastConfig
import { RFPercentage } from 'react-native-responsive-fontsize';

const localStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  contentContainer: { padding: 20 },
  callInfoText: { fontSize: 15, color: '#000000', marginBottom: 20 },
  errorText: { color: '#EF4444', fontSize: 15, marginBottom: 10 },
});

const FeedbackScreen = ({ route, navigation }) => {
  const { phoneNumber = 'N/A', leadId, isManual = false } = route.params || {};
  const dispatch = useDispatch();

  const [selectedLeadStatus, setSelectedLeadStatus] = useState('');
  const [selectedStatusId, setSelectedStatusId] = useState('');
  const [leadStatusDropdownVisible, setLeadStatusDropdownVisible] = useState(false);
  const [dialUpMethod, setDialUpMethod] = useState(null);
  const [formData, setFormData] = useState({});

  const { leadStatuses = [], loading: statusesLoading, error: statusesError } = useSelector(
    (state) => state.leadStatus || {}
  );
  const { data: leadStatusDetail = {}, loading: statusLoading, error: statusError } = useSelector(
    (state) => state.leadStatusById || {}
  );
  const { loading: feedbackLoading, error: feedbackError } = useSelector(
    (state) => state.postFeedback || {}
  );

  // Normalized statusDetail with dynamic label fallbacks
  const statusDetail = {
    ...leadStatusDetail?.data,
    meeting: {
      required: leadStatusDetail?.data?.meeting?.required || false,
      dateLabel: leadStatusDetail?.data?.meeting?.dateLable || 'Meeting Date',
      timeLabel: leadStatusDetail?.data?.meeting?.timeLable || 'Meeting Time',
    },
    estimation: {
      required: leadStatusDetail?.data?.estimation?.required || false,
      dateLabel: leadStatusDetail?.data?.estimation?.dateLable || 'Estimation Date',
      budgetLabel: leadStatusDetail?.data?.estimation?.timeLable || 'Estimation Budget',
    },
    showDescription: leadStatusDetail?.data?.showDescription || false,
    isPriority: leadStatusDetail?.data?.isPriority ?? false,
    descriptionLabel: leadStatusDetail?.data?.descriptionLable || 'Description',
    name: leadStatusDetail?.data?.name || '',
  };

  // Fetch call log only if not manual entry
  useEffect(() => {
    const fetchCallLog = async () => {
      if (isManual || !phoneNumber || phoneNumber === 'N/A') {
        //('FeedbackScreen: Manual entry or invalid phoneNumber, skipping call log');
        setDialUpMethod(null);
        return;
      }

      //('FeedbackScreen: Fetching call log for phoneNumber', phoneNumber);
      const callLog = await getLatestCallLog(phoneNumber);
      //('FeedbackScreen: Call log retrieved', JSON.stringify(callLog, null, 2));

      const defaultDialUpMethod = {
        phoneNumber: phoneNumber || '',
        callType: 'Outgoing',
        callDuration: '0.00',
        formattedDuration: '00:00',
        callStatus: 'Rejected',
        recordedFile: null,
        callSid: '',
        callStartTime: '',
        callEndTime: '',
      };

      setDialUpMethod(
        callLog
          ? {
              phoneNumber: callLog.phoneNumber || phoneNumber,
              callType: 'Outgoing',
              callDuration: callLog.callDuration,
              formattedDuration: callLog.formattedDuration,
              callStatus: callLog.callStatus,
              recordedFile: callLog.recordedFile || null,
              callSid: '',
              callStartTime: callLog.callStartTime || '',
              callEndTime: callLog.callEndTime || '',
            }
          : defaultDialUpMethod
      );
    };

    fetchCallLog();
  }, [phoneNumber, isManual]);

  // Fetch lead statuses
  useEffect(() => {
    //('FeedbackScreen: Fetching lead statuses');
    dispatch(fetchAllLeadStatuses())
      .unwrap()
      .catch((err) => console.error('FeedbackScreen: Error fetching lead statuses:', err));
  }, [dispatch]);

  // Fetch status details when status ID changes
  useEffect(() => {
    if (selectedStatusId) {
      //('FeedbackScreen: Fetching status details for ID:', selectedStatusId);
      dispatch(fetchLeadStatusById(selectedStatusId))
        .unwrap()
        .catch((err) => console.error('FeedbackScreen: Error fetching status details:', err));
    }
  }, [dispatch, selectedStatusId]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      //('FeedbackScreen: Cleaning up');
      dispatch(resetLeadStatusById());
      dispatch(resetFeedbackState());
    };
  }, [dispatch]);

  // Handle dynamic fields submission
  const handleDynamicFieldsSubmit = (data) => {
    //('FeedbackScreen: Received dynamic fields data', JSON.stringify(data, null, 2));
    setFormData(data);
  };

  // Handle form submission
  const handleSubmit = async () => {
    //('FeedbackScreen: Submitting feedback', { selectedLeadStatus, selectedStatusId, formData, dialUpMethod });

    // Validation
    if (!leadId || !/^[0-9a-fA-F]{24}$/.test(leadId)) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Invalid or missing Lead ID.',
      });
      return;
    }
    if (!selectedLeadStatus || !selectedStatusId) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please select a status.',
      });
      return;
    }
    if (
      statusDetail.isPriority &&
      (!formData.priority || !['Important', 'High', 'Medium', 'Low'].includes(formData.priority))
    ) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please select a valid priority.',
      });
      return;
    }
    if (
      statusDetail.meeting?.required &&
      (!formData.nextFollowUpDate || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.*Z$/.test(formData.nextFollowUpDate))
    ) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please provide a valid meeting date and time.',
      });
      return;
    }
    if (
      statusDetail.estimation?.required &&
      (!formData.estimationBudget || isNaN(formData.estimationBudget) || Number(formData.estimationBudget) <= 0)
    ) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter a valid estimation budget.',
      });
      return;
    }
    if (
      statusDetail.estimation?.required &&
      (!formData.estimationDate || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.*Z$/.test(formData.estimationDate))
    ) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please provide a valid estimation date.',
      });
      return;
    }
    if (statusDetail.name === 'Active' && !formData.address?.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please provide an address.',
      });
      return;
    }
    if (statusDetail.name === 'Inactive' && !formData.reason?.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please provide a reason for inactivity.',
      });
      return;
    }

    try {
      const contactDateTime = new Date().toISOString();
      let callStartDateTime = '';
      let callEndDateTime = '';

      if (dialUpMethod && !isManual) {
        const isCallConnected =
          dialUpMethod.callStatus === 'Connected' ||
          (dialUpMethod.callDuration && parseFloat(dialUpMethod.callDuration) > 0);

        if (isCallConnected && dialUpMethod.callStartTime) {
          const startTime = new Date(dialUpMethod.callStartTime);
          if (!isNaN(startTime)) callStartDateTime = startTime.toISOString();
        }
        if (isCallConnected && dialUpMethod.callEndTime) {
          const endTime = new Date(dialUpMethod.callEndTime);
          if (!isNaN(endTime)) callEndDateTime = endTime.toISOString();
        }
      }

      const payload = {
        leadId,
        contactDateTime,
        nextFollowUpDate: formData.nextFollowUpDate || '',
        estimationDate: statusDetail.estimation?.required ? formData.estimationDate : '',
        estimationBudget: statusDetail.estimation?.required ? Number(formData.estimationBudget) : 0,
        priority: formData.priority || 'Medium',
        method: isManual ? 'Manual' : 'Call',
        status: selectedStatusId,
        description: statusDetail.showDescription ? formData.meetingDescription : '',
        address: statusDetail.name === 'Active' ? formData.address : '',
        reason: statusDetail.name === 'Inactive' ? formData.reason : '',
        ...(dialUpMethod && !isManual
          ? {
              dialUpMethod: {
                phoneNumber: dialUpMethod.phoneNumber || '',
                callType: dialUpMethod.callType || 'Outgoing',
                callDuration: dialUpMethod.callDuration || '0.00',
                formattedDuration: dialUpMethod.formattedDuration || '00:00',
                callStatus: dialUpMethod.callStatus || 'Rejected',
                recordedFile: dialUpMethod.recordedFile || null,
                callSid: dialUpMethod.callSid || '',
                callStartDateTime,
                callEndDateTime,
              },
            }
          : {}),
      };

      //('FeedbackScreen: Submitting payload', JSON.stringify(payload, null, 2));
      await dispatch(postFeedback(payload)).unwrap();
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Feedback submitted successfully!',
      });
      navigation.navigate('LeadsScreen');
    } catch (error) {
      console.error('FeedbackScreen: Submit error', JSON.stringify(error, null, 2));
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message || feedbackError || 'Failed to submit feedback.',
      });
      dispatch(resetFeedbackState());
    }
  };

  return (
    <View style={localStyles.container}>
      {/* Header Component */}
      <Header
        title="Feedback"
        showBackButton={true}
        onBackPress={() => {
          // Navigate through HomeScreen to ensure bottom tabs are visible
          navigation.navigate('HomeScreen', {
            screen: 'Main',
            params: {
              screen: 'LeadsScreen',
              params: { shouldRefresh: true }
            }
          });
        }}
      />
      <View style={localStyles.contentContainer}>
        <Text style={localStyles.callInfoText}>
          {isManual ? 'Manual Feedback' : `Call to: ${phoneNumber} ${dialUpMethod?.formattedDuration ? `(${dialUpMethod.formattedDuration})` : ''}`}
        </Text>

        {statusesLoading || statusLoading || feedbackLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : statusesError || statusError || feedbackError ? (
          <View>
            <Text style={localStyles.errorText}>
              Error: {statusesError || statusError || feedbackError || 'Failed to load data'}
            </Text>
            <CustomButton
              buttonName="Retry"
              onPress={() => {
                dispatch(fetchAllLeadStatuses());
                if (selectedStatusId) dispatch(fetchLeadStatusById(selectedStatusId));
              }}
              gradientColors={['#8290EA', '#3F4CA0']}
              height={56}
              width="100%"
              fontSize={RFPercentage(2)}
              fontWeight="semibold"
              accessibilityLabel="Retry loading data"
            />
          </View>
        ) : (
          <>
            <Text className="text-gray-900 font-poppins text-sm">Select Status</Text>
            <Dropdown
              visible={leadStatusDropdownVisible}
              setVisible={setLeadStatusDropdownVisible}
              selectedValue={selectedLeadStatus}
              setSelectedValue={setSelectedLeadStatus}
              options={leadStatuses}
              placeholder="Select Status"
              setSelectedId={setSelectedStatusId}
            />
            <DynamicFields
              statusDetail={statusDetail}
              onSubmit={handleDynamicFieldsSubmit}
              initialData={formData}
            />
            <CustomButton
              buttonName={feedbackLoading ? 'Submitting...' : 'Submit'}
              onPress={handleSubmit}
              // gradientColors={['#3B82F6', '#1D4ED8']}
              height={56}
              width="60%"
               containerStyle={{
                marginTop: 16, // Matches mt-4 (1 unit ≈ 4px)
                borderRadius: 8, // Matches rounded-md
              }}
              // fontSize={RFPercentage(2)}
              // fontWeight="semibold"
              accessibilityLabel="Submit feedback"
              disabled={feedbackLoading}
            />
          </>
        )}
      </View>
      <Toast config={toastConfig} />
    </View>
  );
};

export default FeedbackScreen;