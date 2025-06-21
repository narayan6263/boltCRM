// // // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // // import { View, Text, TouchableOpacity, Alert, ActivityIndicator, StyleSheet } from 'react-native';
// // // // // // // // import { useDispatch, useSelector } from 'react-redux';
// // // // // // // // import { fetchAllLeadStatuses } from '../../redux/slices/getAllLeadStatusSlice';
// // // // // // // // import { fetchLeadStatusById, resetLeadStatusById } from '../../redux/slices/getLeadStatusByIdSlice';
// // // // // // // // import { postFeedback, resetFeedbackState } from '../../redux/slices/postFeedbackSlice';
// // // // // // // // import { getLatestCallLog } from '../phone/CallLogs';
// // // // // // // // import Dropdown from './Dropdown';
// // // // // // // // import DynamicFields from './DynamicFields';
// // // // // // // // import Header from '../../component/Header';
// // // // // // // // import CustomButton from '../../component/CustomButton';
// // // // // // // // import Toast from 'react-native-toast-message';
// // // // // // // // import { toastConfig } from '../../component/toastConfig';
// // // // // // // // import { RFPercentage } from 'react-native-responsive-fontsize';

// // // // // // // // const localStyles = StyleSheet.create({
// // // // // // // //   container: { flex: 1, backgroundColor: '#FFFFFF' },
// // // // // // // //   contentContainer: { padding: 20 },
// // // // // // // //   callInfoText: { fontSize: 15, color: '#000000', marginBottom: 20 },
// // // // // // // //   errorText: { color: '#EF4444', fontSize: 15, marginBottom: 10 },
// // // // // // // // });

// // // // // // // // const FeedbackScreen = ({ route, navigation }) => {
// // // // // // // //   const { phoneNumber = 'N/A', leadId, isManual = false, sourceScreen, queryType } = route.params || {};
// // // // // // // //   const dispatch = useDispatch();

// // // // // // // //   const [selectedLeadStatus, setSelectedLeadStatus] = useState('');
// // // // // // // //   const [selectedStatusId, setSelectedStatusId] = useState('');
// // // // // // // //   const [leadStatusDropdownVisible, setLeadStatusDropdownVisible] = useState(false);
// // // // // // // //   const [dialUpMethod, setDialUpMethod] = useState(null);
// // // // // // // //   const [formData, setFormData] = useState({});

// // // // // // // //   const { leadStatuses = [], loading: statusesLoading, error: statusesError } = useSelector(
// // // // // // // //     (state) => state.leadStatus || {}
// // // // // // // //   );
// // // // // // // //   const { data: leadStatusDetail = {}, loading: statusLoading, error: statusError } = useSelector(
// // // // // // // //     (state) => state.leadStatusById || {}
// // // // // // // //   );
// // // // // // // //   const { loading: feedbackLoading, error: feedbackError } = useSelector(
// // // // // // // //     (state) => state.postFeedback || {}
// // // // // // // //   );

// // // // // // // //   const statusDetail = {
// // // // // // // //     ...leadStatusDetail?.data,
// // // // // // // //     meeting: {
// // // // // // // //       required: leadStatusDetail?.data?.meeting?.required || false,
// // // // // // // //       dateLabel: leadStatusDetail?.data?.meeting?.dateLable || 'Meeting Date',
// // // // // // // //       timeLabel: leadStatusDetail?.data?.meeting?.timeLable || 'Meeting Time',
// // // // // // // //     },
// // // // // // // //     estimation: {
// // // // // // // //       required: leadStatusDetail?.data?.estimation?.required || false,
// // // // // // // //       dateLabel: leadStatusDetail?.data?.estimation?.dateLable || 'Estimation Date',
// // // // // // // //       budgetLabel: leadStatusDetail?.data?.estimation?.timeLable || 'Estimation Budget',
// // // // // // // //     },
// // // // // // // //     showDescription: leadStatusDetail?.data?.showDescription || false,
// // // // // // // //     isPriority: leadStatusDetail?.data?.isPriority ?? false,
// // // // // // // //     descriptionLabel: leadStatusDetail?.data?.descriptionLable || 'Description',
// // // // // // // //     name: leadStatusDetail?.data?.name || '',
// // // // // // // //   };

// // // // // // // //   useEffect(() => {
// // // // // // // //     const fetchCallLog = async () => {
// // // // // // // //       if (isManual || !phoneNumber || phoneNumber === 'N/A') {
// // // // // // // //         //('FeedbackScreen: Manual entry or invalid phoneNumber, skipping call log');
// // // // // // // //         setDialUpMethod(null);
// // // // // // // //         return;
// // // // // // // //       }

// // // // // // // //       //('FeedbackScreen: Fetching call log for phoneNumber', phoneNumber);
// // // // // // // //       const callLog = await getLatestCallLog(phoneNumber);
// // // // // // // //       //('FeedbackScreen: Call log retrieved', JSON.stringify(callLog, null, 2));

// // // // // // // //       const defaultDialUpMethod = {
// // // // // // // //         phoneNumber: phoneNumber || '',
// // // // // // // //         callType: 'Outgoing',
// // // // // // // //         callDuration: '0.00',
// // // // // // // //         formattedDuration: '00:00',
// // // // // // // //         callStatus: 'Rejected',
// // // // // // // //         recordedFile: '',
// // // // // // // //         callSid: '',
// // // // // // // //         callStartTime: '',
// // // // // // // //         callEndTime: '',
// // // // // // // //       };

// // // // // // // //       setDialUpMethod(
// // // // // // // //         callLog
// // // // // // // //           ? {
// // // // // // // //               phoneNumber: callLog.phoneNumber || phoneNumber,
// // // // // // // //               callType: 'Outgoing',
// // // // // // // //               callDuration: callLog.callDuration,
// // // // // // // //               formattedDuration: callLog.formattedDuration,
// // // // // // // //               callStatus: callLog.callStatus,
// // // // // // // //               recordedFile: callLog.recordedFile || '',
// // // // // // // //               callSid: '',
// // // // // // // //               callStartTime: callLog.callStartTime || '',
// // // // // // // //               callEndTime: callLog.callEndTime || '',
// // // // // // // //             }
// // // // // // // //           : defaultDialUpMethod
// // // // // // // //       );
// // // // // // // //     };

// // // // // // // //     fetchCallLog();
// // // // // // // //   }, [phoneNumber, isManual]);

// // // // // // // //   useEffect(() => {
// // // // // // // //     //('FeedbackScreen: Fetching lead statuses');
// // // // // // // //     dispatch(fetchAllLeadStatuses())
// // // // // // // //       .unwrap()
// // // // // // // //       .catch((err) => console.error('FeedbackScreen: Error fetching lead statuses:', err));
// // // // // // // //   }, [dispatch]);

// // // // // // // //   useEffect(() => {
// // // // // // // //     if (selectedStatusId) {
// // // // // // // //       //('FeedbackScreen: Fetching status details for ID:', selectedStatusId);
// // // // // // // //       dispatch(fetchLeadStatusById(selectedStatusId))
// // // // // // // //         .unwrap()
// // // // // // // //         .catch((err) => console.error('FeedbackScreen: Error fetching status details:', err));
// // // // // // // //     }
// // // // // // // //   }, [dispatch, selectedStatusId]);

// // // // // // // //   useEffect(() => {
// // // // // // // //     return () => {
// // // // // // // //       //('FeedbackScreen: Cleaning up');
// // // // // // // //       dispatch(resetLeadStatusById());
// // // // // // // //       dispatch(resetFeedbackState());
// // // // // // // //     };
// // // // // // // //   }, [dispatch]);

// // // // // // // //   const handleDynamicFieldsSubmit = (data) => {
// // // // // // // //     //('FeedbackScreen: Received dynamic fields data', JSON.stringify(data, null, 2));
// // // // // // // //     setFormData(data);
// // // // // // // //   };

// // // // // // // //   const handleSubmit = async () => {
// // // // // // // //     //('FeedbackScreen: Submitting feedback', { selectedLeadStatus, selectedStatusId, formData, dialUpMethod });

// // // // // // // //     if (!leadId || !/^[0-9a-fA-F]{24}$/.test(leadId)) {
// // // // // // // //       Toast.show({
// // // // // // // //         type: 'error',
// // // // // // // //         text1: 'Error',
// // // // // // // //         text2: 'Invalid or missing Lead ID.',
// // // // // // // //       });
// // // // // // // //       return;
// // // // // // // //     }
// // // // // // // //     if (!selectedLeadStatus || !selectedStatusId) {
// // // // // // // //       Toast.show({
// // // // // // // //         type: 'error',
// // // // // // // //         text1: 'Error',
// // // // // // // //         text2: 'Please select a status.',
// // // // // // // //       });
// // // // // // // //       return;
// // // // // // // //     }
// // // // // // // //     if (
// // // // // // // //       statusDetail.isPriority &&
// // // // // // // //       (!formData.priority || !['Important', 'High', 'Medium', 'Low'].includes(formData.priority))
// // // // // // // //     ) {
// // // // // // // //       Toast.show({
// // // // // // // //         type: 'error',
// // // // // // // //         text1: 'Error',
// // // // // // // //         text2: 'Please select a valid priority.',
// // // // // // // //       });
// // // // // // // //       return;
// // // // // // // //     }
// // // // // // // //     if (
// // // // // // // //       statusDetail.meeting?.required &&
// // // // // // // //       (!formData.nextFollowUpDate || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.*Z$/.test(formData.nextFollowUpDate))
// // // // // // // //     ) {
// // // // // // // //       Toast.show({
// // // // // // // //         type: 'error',
// // // // // // // //         text1: 'Error',
// // // // // // // //         text2: 'Please provide a valid meeting date and time.',
// // // // // // // //       });
// // // // // // // //       return;
// // // // // // // //     }
// // // // // // // //     if (
// // // // // // // //       statusDetail.estimation?.required &&
// // // // // // // //       (!formData.estimationBudget || isNaN(formData.estimationBudget) || Number(formData.estimationBudget) <= 0)
// // // // // // // //     ) {
// // // // // // // //       Toast.show({
// // // // // // // //         type: 'error',
// // // // // // // //         text1: 'Error',
// // // // // // // //         text2: 'Please enter a valid estimation budget.',
// // // // // // // //       });
// // // // // // // //       return;
// // // // // // // //     }
// // // // // // // //     if (
// // // // // // // //       statusDetail.estimation?.required &&
// // // // // // // //       (!formData.estimationDate || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.*Z$/.test(formData.estimationDate))
// // // // // // // //     ) {
// // // // // // // //       Toast.show({
// // // // // // // //         type: 'error',
// // // // // // // //         text1: 'Error',
// // // // // // // //         text2: 'Please provide a valid estimation date.',
// // // // // // // //       });
// // // // // // // //       return;
// // // // // // // //     }
// // // // // // // //     if (statusDetail.name === 'Active' && !formData.address?.trim()) {
// // // // // // // //       Toast.show({
// // // // // // // //         type: 'error',
// // // // // // // //         text1: 'Error',
// // // // // // // //         text2: 'Please provide an address.',
// // // // // // // //       });
// // // // // // // //       return;
// // // // // // // //     }
// // // // // // // //     if (statusDetail.name === 'Inactive' && !formData.reason?.trim()) {
// // // // // // // //       Toast.show({
// // // // // // // //         type: 'error',
// // // // // // // //         text1: 'Error',
// // // // // // // //         text2: 'Please provide a reason for inactivity.',
// // // // // // // //       });
// // // // // // // //       return;
// // // // // // // //     }
// // // // // // // //     if (!isManual && dialUpMethod?.recordedFile && !(await RNFS.exists(dialUpMethod.recordedFile))) {
// // // // // // // //       Toast.show({
// // // // // // // //         type: 'error',
// // // // // // // //         text1: 'Error',
// // // // // // // //         text2: 'Call recording file not found.',
// // // // // // // //       });
// // // // // // // //       return;
// // // // // // // //     }

// // // // // // // //     try {
// // // // // // // //       const contactDateTime = new Date().toISOString();
// // // // // // // //       let callStartDateTime = '';
// // // // // // // //       let callEndDateTime = '';

// // // // // // // //       if (dialUpMethod && !isManual) {
// // // // // // // //         const isCallConnected =
// // // // // // // //           dialUpMethod.callStatus === 'Connected' ||
// // // // // // // //           (dialUpMethod.callDuration && parseFloat(dialUpMethod.callDuration) > 0);

// // // // // // // //         if (isCallConnected && dialUpMethod.callStartTime) {
// // // // // // // //           const startTime = new Date(dialUpMethod.callStartTime);
// // // // // // // //           if (!isNaN(startTime)) callStartDateTime = startTime.toISOString();
// // // // // // // //         }
// // // // // // // //         if (isCallConnected && dialUpMethod.callEndTime) {
// // // // // // // //           const endTime = new Date(dialUpMethod.callEndTime);
// // // // // // // //           if (!isNaN(endTime)) callEndDateTime = endTime.toISOString();
// // // // // // // //         }
// // // // // // // //       }

// // // // // // // //       const payload = {
// // // // // // // //         leadId,
// // // // // // // //         contactDateTime,
// // // // // // // //         nextFollowUpDate: formData.nextFollowUpDate || '',
// // // // // // // //         estimationDate: statusDetail.estimation?.required ? formData.estimationDate : '',
// // // // // // // //         estimationBudget: statusDetail.estimation?.required ? Number(formData.estimationBudget) : 0,
// // // // // // // //         priority: formData.priority || 'Medium',
// // // // // // // //         method: isManual ? 'Manual' : 'Call',
// // // // // // // //         status: selectedStatusId,
// // // // // // // //         description: statusDetail.showDescription ? formData.meetingDescription : '',
// // // // // // // //         address: statusDetail.name === 'Active' ? formData.address : '',
// // // // // // // //         reason: statusDetail.name === 'Inactive' ? formData.reason : '',
// // // // // // // //         ...(dialUpMethod && !isManual
// // // // // // // //           ? {
// // // // // // // //               dialUpMethod: {
// // // // // // // //                 phoneNumber: dialUpMethod.phoneNumber || '',
// // // // // // // //                 callType: dialUpMethod.callType || 'Outgoing',
// // // // // // // //                 callDuration: dialUpMethod.callDuration || '0.00',
// // // // // // // //                 formattedDuration: dialUpMethod.formattedDuration || '00:00',
// // // // // // // //                 callStatus: dialUpMethod.callStatus || 'Rejected',
// // // // // // // //                 recordedFile: dialUpMethod.recordedFile || '',
// // // // // // // //                 callSid: dialUpMethod.callSid || '',
// // // // // // // //                 callStartDateTime,
// // // // // // // //                 callEndDateTime,
// // // // // // // //               },
// // // // // // // //             }
// // // // // // // //           : {}),
// // // // // // // //       };

// // // // // // // //       //('FeedbackScreen: Submitting payload', JSON.stringify(payload, null, 2));
// // // // // // // //       await dispatch(postFeedback(payload)).unwrap();
// // // // // // // //       Toast.show({
// // // // // // // //         type: 'success',
// // // // // // // //         text1: 'Success',
// // // // // // // //         text2: 'Feedback submitted successfully!',
// // // // // // // //       });
      
// // // // // // // //       // Navigate back to the source screen if provided, otherwise use default navigation
// // // // // // // //       if (sourceScreen) {
// // // // // // // //         //('FeedbackScreen: Navigating back to source screen:', sourceScreen);
// // // // // // // //         navigation.navigate(sourceScreen, { queryType });
// // // // // // // //       } else {
// // // // // // // //         // Default navigation to Main screen (which contains BottomTabNavigator) and then to LeadsScreen tab
// // // // // // // //         navigation.navigate('HomeScreen', {
// // // // // // // //           screen: 'Main',
// // // // // // // //           params: {
// // // // // // // //             screen: 'LeadsScreen'
// // // // // // // //           }
// // // // // // // //         });
// // // // // // // //       }
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error('FeedbackScreen: Submit error', JSON.stringify(error, null, 2));
// // // // // // // //       Toast.show({
// // // // // // // //         type: 'error',
// // // // // // // //         text1: 'Error',
// // // // // // // //         text2: error.message || feedbackError || 'Failed to submit feedback.',
// // // // // // // //       });
// // // // // // // //       dispatch(resetFeedbackState());
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <View style={localStyles.container}>
// // // // // // // //       <Header
// // // // // // // //         title="Feedback"
// // // // // // // //         showBackButton={true}
// // // // // // // //         onBackPress={() => {
// // // // // // // //           // Use goBack() instead of navigate to avoid navigation loops
// // // // // // // //           navigation.goBack();
// // // // // // // //         }}
// // // // // // // //       />
// // // // // // // //       <View style={localStyles.contentContainer}>
// // // // // // // //         <Text style={localStyles.callInfoText}>
// // // // // // // //           {isManual ? 'Manual Feedback' : `Call to: ${phoneNumber} ${dialUpMethod?.formattedDuration ? `(${dialUpMethod.formattedDuration})` : ''}`}
// // // // // // // //         </Text>
// // // // // // // //         {dialUpMethod?.recordedFile ? (
// // // // // // // //           <Text style={localStyles.callInfoText}>
// // // // // // // //             Recording: {dialUpMethod.recordedFile.split('/').pop()}
// // // // // // // //           </Text>
// // // // // // // //         ) : (
// // // // // // // //           !isManual && <Text style={localStyles.callInfoText}>No recording available (optional)</Text>
// // // // // // // //         )}

// // // // // // // //         {statusesLoading || statusLoading || feedbackLoading ? (
// // // // // // // //           <ActivityIndicator size="large" color="#0000ff" />
// // // // // // // //         ) : statusesError || statusError || feedbackError ? (
// // // // // // // //           <View>
// // // // // // // //             <Text style={localStyles.errorText}>
// // // // // // // //               Error: {statusesError || statusError || feedbackError || 'Failed to load data'}
// // // // // // // //             </Text>
// // // // // // // //             <CustomButton
// // // // // // // //               buttonName="Retry"
// // // // // // // //               onPress={() => {
// // // // // // // //                 dispatch(fetchAllLeadStatuses());
// // // // // // // //                 if (selectedStatusId) dispatch(fetchLeadStatusById(selectedStatusId));
// // // // // // // //               }}
// // // // // // // //               gradientColors={['#8290EA', '#3F4CA0']}
// // // // // // // //               height={56}
// // // // // // // //               width="100%"
// // // // // // // //               fontSize={RFPercentage(2)}
// // // // // // // //               fontWeight="semibold"
// // // // // // // //               accessibilityLabel="Retry loading data"
// // // // // // // //             />
// // // // // // // //           </View>
// // // // // // // //         ) : (
// // // // // // // //           <>
// // // // // // // //             <Text className="text-gray-900 font-poppins text-sm">Select Status</Text>
// // // // // // // //             <Dropdown
// // // // // // // //               visible={leadStatusDropdownVisible}
// // // // // // // //               setVisible={setLeadStatusDropdownVisible}
// // // // // // // //               selectedValue={selectedLeadStatus}
// // // // // // // //               setSelectedValue={setSelectedLeadStatus}
// // // // // // // //               options={leadStatuses}
// // // // // // // //               placeholder="Select Status"
// // // // // // // //               setSelectedId={setSelectedStatusId}
// // // // // // // //             />
// // // // // // // //             <DynamicFields
// // // // // // // //               statusDetail={statusDetail}
// // // // // // // //               onSubmit={handleDynamicFieldsSubmit}
// // // // // // // //               initialData={formData}
// // // // // // // //             />
// // // // // // // //             <CustomButton
// // // // // // // //               buttonName={feedbackLoading ? 'Submitting...' : 'Submit'}
// // // // // // // //               onPress={handleSubmit}
// // // // // // // //               height={56}
// // // // // // // //               width="60%"
// // // // // // // //               containerStyle={{
// // // // // // // //                 marginTop: 16,
// // // // // // // //                 borderRadius: 8,
// // // // // // // //               }}
// // // // // // // //               accessibilityLabel="Submit feedback"
// // // // // // // //               disabled={feedbackLoading}
// // // // // // // //             />
// // // // // // // //           </>
// // // // // // // //         )}
// // // // // // // //       </View>
// // // // // // // //       <Toast config={toastConfig} />
// // // // // // // //     </View>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default FeedbackScreen;

// // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // import { View, Text, TouchableOpacity, Alert, ActivityIndicator, StyleSheet, Platform } from 'react-native';
// // // // // // // import { useDispatch, useSelector } from 'react-redux';
// // // // // // // import DocumentPicker from 'react-native-document-picker';
// // // // // // // import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
// // // // // // // import { fetchAllLeadStatuses } from '../../redux/slices/getAllLeadStatusSlice';
// // // // // // // import { fetchLeadStatusById, resetLeadStatusById } from '../../redux/slices/getLeadStatusByIdSlice';
// // // // // // // import { postFeedback, resetFeedbackState } from '../../redux/slices/postFeedbackSlice';
// // // // // // // import { getLatestCallLog } from '../phone/CallLogs';
// // // // // // // import Dropdown from './Dropdown';
// // // // // // // import DynamicFields from './DynamicFields';
// // // // // // // import Header from '../../component/Header';
// // // // // // // import CustomButton from '../../component/CustomButton';
// // // // // // // import Toast from 'react-native-toast-message';
// // // // // // // import { toastConfig } from '../../component/toastConfig';
// // // // // // // import { RFPercentage } from 'react-native-responsive-fontsize';
// // // // // // // import RNFS from 'react-native-fs';

// // // // // // // const localStyles = StyleSheet.create({
// // // // // // //   container: { flex: 1, backgroundColor: '#FFFFFF' },
// // // // // // //   contentContainer: { padding: 20 },
// // // // // // //   callInfoText: { fontSize: 15, color: '#000000', marginBottom: 20 },
// // // // // // //   errorText: { color: '#EF4444', fontSize: 15, marginBottom: 10 },
// // // // // // //   uploadButton: {
// // // // // // //     borderWidth: 1,
// // // // // // //     borderColor: '#8290EA',
// // // // // // //     borderRadius: 8,
// // // // // // //     padding: 10,
// // // // // // //     marginTop: 10,
// // // // // // //     alignItems: 'center',
// // // // // // //   },
// // // // // // //   uploadButtonText: {
// // // // // // //     color: '#3F4CA0',
// // // // // // //     fontSize: RFPercentage(2),
// // // // // // //   },
// // // // // // //   uploadedFileText: {
// // // // // // //     fontSize: RFPercentage(1.8),
// // // // // // //     color: '#000000',
// // // // // // //     marginTop: 5,
// // // // // // //   },
// // // // // // // });

// // // // // // // const FeedbackScreen = ({ route, navigation }) => {
// // // // // // //   const { phoneNumber = 'N/A', leadId, isManual = false, sourceScreen, queryType } = route.params || {};
// // // // // // //   const dispatch = useDispatch();

// // // // // // //   const [selectedLeadStatus, setSelectedLeadStatus] = useState('');
// // // // // // //   const [selectedStatusId, setSelectedStatusId] = useState('');
// // // // // // //   const [leadStatusDropdownVisible, setLeadStatusDropdownVisible] = useState(false);
// // // // // // //   const [dialUpMethod, setDialUpMethod] = useState(null);
// // // // // // //   const [formData, setFormData] = useState({});
// // // // // // //   const [recordingFile, setRecordingFile] = useState(null);

// // // // // // //   const { leadStatuses = [], loading: statusesLoading, error: statusesError } = useSelector(
// // // // // // //     (state) => state.leadStatus || {}
// // // // // // //   );
// // // // // // //   const { data: leadStatusDetail = {}, loading: statusLoading, error: statusError } = useSelector(
// // // // // // //     (state) => state.leadStatusById || {}
// // // // // // //   );
// // // // // // //   const { loading: feedbackLoading, error: feedbackError } = useSelector(
// // // // // // //     (state) => state.postFeedback || {}
// // // // // // //   );

// // // // // // //   const statusDetail = {
// // // // // // //     ...leadStatusDetail?.data,
// // // // // // //     meeting: {
// // // // // // //       required: leadStatusDetail?.data?.meeting?.required || false,
// // // // // // //       dateLabel: leadStatusDetail?.data?.meeting?.dateLable || 'Meeting Date',
// // // // // // //       timeLabel: leadStatusDetail?.data?.meeting?.timeLable || 'Meeting Time',
// // // // // // //     },
// // // // // // //     estimation: {
// // // // // // //       required: leadStatusDetail?.data?.estimation?.required || false,
// // // // // // //       dateLabel: leadStatusDetail?.data?.estimation?.dateLable || 'Estimation Date',
// // // // // // //       budgetLabel: leadStatusDetail?.data?.estimation?.timeLable || 'Estimation Budget',
// // // // // // //     },
// // // // // // //     showDescription: leadStatusDetail?.data?.showDescription || false,
// // // // // // //     isPriority: leadStatusDetail?.data?.isPriority ?? false,
// // // // // // //     descriptionLabel: leadStatusDetail?.data?.descriptionLable || 'Description',
// // // // // // //     name: leadStatusDetail?.data?.name || '',
// // // // // // //   };

// // // // // // //   useEffect(() => {
// // // // // // //     const fetchCallLog = async () => {
// // // // // // //       if (isManual || !phoneNumber || phoneNumber === 'N/A') {
// // // // // // //         //('FeedbackScreen: Manual entry or invalid phoneNumber, skipping call log');
// // // // // // //         setDialUpMethod(null);
// // // // // // //         return;
// // // // // // //       }

// // // // // // //       //('FeedbackScreen: Fetching call log for phoneNumber', phoneNumber);
// // // // // // //       const callLog = await getLatestCallLog(phoneNumber);
// // // // // // //       //('FeedbackScreen: Call log retrieved', JSON.stringify(callLog, null, 2));

// // // // // // //       const defaultDialUpMethod = {
// // // // // // //         phoneNumber: phoneNumber || '',
// // // // // // //         callType: 'Outgoing',
// // // // // // //         callDuration: '0.00',
// // // // // // //         formattedDuration: '00:00',
// // // // // // //         callStatus: 'Rejected',
// // // // // // //         recordedFile: '',
// // // // // // //         callSid: '',
// // // // // // //         callStartTime: '',
// // // // // // //         callEndTime: '',
// // // // // // //       };

// // // // // // //       setDialUpMethod(
// // // // // // //         callLog
// // // // // // //           ? {
// // // // // // //               phoneNumber: callLog.phoneNumber || phoneNumber,
// // // // // // //               callType: 'Outgoing',
// // // // // // //               callDuration: callLog.callDuration,
// // // // // // //               formattedDuration: callLog.formattedDuration,
// // // // // // //               callStatus: callLog.callStatus,
// // // // // // //               recordedFile: callLog.recordedFile || '',
// // // // // // //               callSid: '',
// // // // // // //               callStartTime: callLog.callStartTime || '',
// // // // // // //               callEndTime: callLog.callEndTime || '',
// // // // // // //             }
// // // // // // //           : defaultDialUpMethod
// // // // // // //       );
// // // // // // //     };

// // // // // // //     fetchCallLog();
// // // // // // //   }, [phoneNumber, isManual]);

// // // // // // //   useEffect(() => {
// // // // // // //     //('FeedbackScreen: Fetching lead statuses');
// // // // // // //     dispatch(fetchAllLeadStatuses())
// // // // // // //       .unwrap()
// // // // // // //       .catch((err) => console.error('FeedbackScreen: Error fetching lead statuses:', err));
// // // // // // //   }, [dispatch]);

// // // // // // //   useEffect(() => {
// // // // // // //     if (selectedStatusId) {
// // // // // // //       //('FeedbackScreen: Fetching status details for ID:', selectedStatusId);
// // // // // // //       dispatch(fetchLeadStatusById(selectedStatusId))
// // // // // // //         .unwrap()
// // // // // // //         .catch((err) => console.error('FeedbackScreen: Error fetching status details:', err));
// // // // // // //     }
// // // // // // //   }, [dispatch, selectedStatusId]);

// // // // // // //   useEffect(() => {
// // // // // // //     return () => {
// // // // // // //       //('FeedbackScreen: Cleaning up');
// // // // // // //       dispatch(resetLeadStatusById());
// // // // // // //       dispatch(resetFeedbackState());
// // // // // // //     };
// // // // // // //   }, [dispatch]);

// // // // // // //   const handleDynamicFieldsSubmit = (data) => {
// // // // // // //     //('FeedbackScreen: Received dynamic fields data', JSON.stringify(data, null, 2));
// // // // // // //     setFormData(data);
// // // // // // //   };

// // // // // // //   const handleFilePick = async () => {
// // // // // // //     try {
// // // // // // //       const permission = Platform.OS === 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
// // // // // // //       const permissionResult = await check(permission);
// // // // // // //       if (permissionResult !== RESULTS.GRANTED) {
// // // // // // //         const requestResult = await request(permission);
// // // // // // //         if (requestResult !== RESULTS.GRANTED) {
// // // // // // //           Toast.show({
// // // // // // //             type: 'error',
// // // // // // //             text1: 'Error',
// // // // // // //             text2: 'Permission to access storage denied.',
// // // // // // //           });
// // // // // // //           return;
// // // // // // //         }
// // // // // // //       }

// // // // // // //       const pickerResult = await DocumentPicker.pick({
// // // // // // //         type: [DocumentPicker.types.audio],
// // // // // // //       });
// // // // // // //       //('FeedbackScreen: File picked', pickerResult);
// // // // // // //       setRecordingFile(pickerResult[0]);
// // // // // // //     } catch (err) {
// // // // // // //       if (DocumentPicker.isCancel(err)) {
// // // // // // //         //('FeedbackScreen: File picking cancelled');
// // // // // // //       } else {
// // // // // // //         console.error('FeedbackScreen: Error picking file', err);
// // // // // // //         Toast.show({
// // // // // // //           type: 'error',
// // // // // // //           text1: 'Error',
// // // // // // //           text2: 'Failed to pick recording file.',
// // // // // // //         });
// // // // // // //       }
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleSubmit = async () => {
// // // // // // //     //('FeedbackScreen: Submitting feedback', {
// // // // // // //       selectedLeadStatus,
// // // // // // //       selectedStatusId,
// // // // // // //       formData,
// // // // // // //       dialUpMethod,
// // // // // // //       recordingFile,
// // // // // // //     });

// // // // // // //     if (!leadId || !/^[0-9a-fA-F]{24}$/.test(leadId)) {
// // // // // // //       Toast.show({
// // // // // // //         type: 'error',
// // // // // // //         text1: 'Error',
// // // // // // //         text2: 'Invalid or missing Lead ID.',
// // // // // // //       });
// // // // // // //       return;
// // // // // // //     }
// // // // // // //     if (!selectedLeadStatus || !selectedStatusId) {
// // // // // // //       Toast.show({
// // // // // // //         type: 'error',
// // // // // // //         text1: 'Error',
// // // // // // //         text2: 'Please select a status.',
// // // // // // //       });
// // // // // // //       return;
// // // // // // //     }
// // // // // // //     if (
// // // // // // //       statusDetail.isPriority &&
// // // // // // //       (!formData.priority || !['Important', 'High', 'Medium', 'Low'].includes(formData.priority))
// // // // // // //     ) {
// // // // // // //       Toast.show({
// // // // // // //         type: 'error',
// // // // // // //         text1: 'Error',
// // // // // // //         text2: 'Please select a valid priority.',
// // // // // // //       });
// // // // // // //       return;
// // // // // // //     }
// // // // // // //     if (
// // // // // // //       statusDetail.meeting?.required &&
// // // // // // //       (!formData.nextFollowUpDate || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.*Z$/.test(formData.nextFollowUpDate))
// // // // // // //     ) {
// // // // // // //       Toast.show({
// // // // // // //         type: 'error',
// // // // // // //         text1: 'Error',
// // // // // // //         text2: 'Please provide a valid meeting date and time.',
// // // // // // //       });
// // // // // // //       return;
// // // // // // //     }
// // // // // // //     if (
// // // // // // //       statusDetail.estimation?.required &&
// // // // // // //       (!formData.estimationBudget || isNaN(formData.estimationBudget) || Number(formData.estimationBudget) <= 0)
// // // // // // //     ) {
// // // // // // //       Toast.show({
// // // // // // //         type: 'error',
// // // // // // //         text1: 'Error',
// // // // // // //         text2: 'Please enter a valid estimation budget.',
// // // // // // //       });
// // // // // // //       return;
// // // // // // //     }
// // // // // // //     if (
// // // // // // //       statusDetail.estimation?.required &&
// // // // // // //       (!formData.estimationDate || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.*Z$/.test(formData.estimationDate))
// // // // // // //     ) {
// // // // // // //       Toast.show({
// // // // // // //         type: 'error',
// // // // // // //         text1: 'Error',
// // // // // // //         text2: 'Please provide a valid estimation date.',
// // // // // // //       });
// // // // // // //       return;
// // // // // // //     }
// // // // // // //     if (statusDetail.name === 'Active' && !formData.address?.trim()) {
// // // // // // //       Toast.show({
// // // // // // //         type: 'error',
// // // // // // //         text1: 'Error',
// // // // // // //         text2: 'Please provide an address.',
// // // // // // //       });
// // // // // // //       return;
// // // // // // //     }
// // // // // // //     if (statusDetail.name === 'Inactive' && !formData.reason?.trim()) {
// // // // // // //       Toast.show({
// // // // // // //         type: 'error',
// // // // // // //         text1: 'Error',
// // // // // // //         text2: 'Please provide a reason for inactivity.',
// // // // // // //       });
// // // // // // //       return;
// // // // // // //     }
// // // // // // //     if (!isManual && dialUpMethod?.recordedFile && !(await RNFS.exists(dialUpMethod.recordedFile))) {
// // // // // // //       Toast.show({
// // // // // // //         type: 'error',
// // // // // // //         text1: 'Error',
// // // // // // //         text2: 'Call recording file not found.',
// // // // // // //       });
// // // // // // //       return;
// // // // // // //     }
// // // // // // //     if (recordingFile && !(await RNFS.exists(recordingFile.uri))) {
// // // // // // //       Toast.show({
// // // // // // //         type: 'error',
// // // // // // //         text1: 'Error',
// // // // // // //         text2: 'Uploaded recording file not found.',
// // // // // // //       });
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     try {
// // // // // // //       const contactDateTime = new Date().toISOString();
// // // // // // //       let callStartDateTime = '';
// // // // // // //       let callEndDateTime = '';

// // // // // // //       if (dialUpMethod && !isManual) {
// // // // // // //         const isCallConnected =
// // // // // // //           dialUpMethod.callStatus === 'Connected' ||
// // // // // // //           (dialUpMethod.callDuration && parseFloat(dialUpMethod.callDuration) > 0);

// // // // // // //         if (isCallConnected && dialUpMethod.callStartTime) {
// // // // // // //           const startTime = new Date(dialUpMethod.callStartTime);
// // // // // // //           if (!isNaN(startTime)) callStartDateTime = startTime.toISOString();
// // // // // // //         }
// // // // // // //         if (isCallConnected && dialUpMethod.callEndTime) {
// // // // // // //           const endTime = new Date(dialUpMethod.callEndTime);
// // // // // // //           if (!isNaN(endTime)) callEndDateTime = endTime.toISOString();
// // // // // // //         }
// // // // // // //       }

// // // // // // //       const payload = {
// // // // // // //         leadId,
// // // // // // //         contactDateTime,
// // // // // // //         nextFollowUpDate: formData.nextFollowUpDate || '',
// // // // // // //         estimationDate: statusDetail.estimation?.required ? formData.estimationDate : '',
// // // // // // //         estimationBudget: statusDetail.estimation?.required ? Number(formData.estimationBudget) : 0,
// // // // // // //         priority: formData.priority || 'Medium',
// // // // // // //         method: isManual ? 'Manual' : 'Call',
// // // // // // //         status: selectedStatusId,
// // // // // // //         description: statusDetail.showDescription ? formData.meetingDescription : '',
// // // // // // //         address: statusDetail.name === 'Active' ? formData.address : '',
// // // // // // //         reason: statusDetail.name === 'Inactive' ? formData.reason : '',
// // // // // // //         recordingFile: recordingFile ? recordingFile.uri : '',
// // // // // // //         ...(dialUpMethod && !isManual
// // // // // // //           ? {
// // // // // // //               dialUpMethod: {
// // // // // // //                 phoneNumber: dialUpMethod.phoneNumber || '',
// // // // // // //                 callType: dialUpMethod.callType || 'Outgoing',
// // // // // // //                 callDuration: dialUpMethod.callDuration || '0.00',
// // // // // // //                 formattedDuration: dialUpMethod.formattedDuration || '00:00',
// // // // // // //                 callStatus: dialUpMethod.callStatus || 'Rejected',
// // // // // // //                 recordedFile: dialUpMethod.recordedFile || '',
// // // // // // //                 callSid: dialUpMethod.callSid || '',
// // // // // // //                 callStartDateTime,
// // // // // // //                 callEndDateTime,
// // // // // // //               },
// // // // // // //             }
// // // // // // //           : {}),
// // // // // // //       };

// // // // // // //       //('FeedbackScreen: Submitting payload', JSON.stringify(payload, null, 2));
// // // // // // //       await dispatch(postFeedback(payload)).unwrap();
// // // // // // //       Toast.show({
// // // // // // //         type: 'success',
// // // // // // //         text1: 'Success',
// // // // // // //         text2: 'Feedback submitted successfully!',
// // // // // // //       });

// // // // // // //       if (sourceScreen) {
// // // // // // //         //('FeedbackScreen: Navigating back to source screen:', sourceScreen);
// // // // // // //         navigation.navigate(sourceScreen, { queryType });
// // // // // // //       } else {
// // // // // // //         navigation.navigate('HomeScreen', {
// // // // // // //           screen: 'Main',
// // // // // // //           params: {
// // // // // // //             screen: 'LeadsScreen',
// // // // // // //           },
// // // // // // //         });
// // // // // // //       }
// // // // // // //     } catch (error) {
// // // // // // //       console.error('FeedbackScreen: Submit error', JSON.stringify(error, null, 2));
// // // // // // //       Toast.show({
// // // // // // //         type: 'error',
// // // // // // //         text1: 'Error',
// // // // // // //         text2: error.message || feedbackError || 'Failed to submit feedback.',
// // // // // // //       });
// // // // // // //       dispatch(resetFeedbackState());
// // // // // // //     }
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <View style={localStyles.container}>
// // // // // // //       <Header
// // // // // // //         title="Feedback"
// // // // // // //         showBackButton={true}
// // // // // // //         onBackPress={() => {
// // // // // // //           navigation.goBack();
// // // // // // //         }}
// // // // // // //       />
// // // // // // //       <View style={localStyles.contentContainer}>
// // // // // // //         <Text style={localStyles.callInfoText}>
// // // // // // //           {isManual ? 'Manual Feedback' : `Call to: ${phoneNumber} ${dialUpMethod?.formattedDuration ? `(${dialUpMethod.formattedDuration})` : ''}`}
// // // // // // //         </Text>
// // // // // // //         {dialUpMethod?.recordedFile ? (
// // // // // // //           <Text style={localStyles.callInfoText}>
// // // // // // //             Recording: {dialUpMethod.recordedFile.split('/').pop()}
// // // // // // //           </Text>
// // // // // // //         ) : (
// // // // // // //           !isManual && <Text style={localStyles.callInfoText}>No recording available (optional)</Text>
// // // // // // //         )}

// // // // // // //         {statusesLoading || statusLoading || feedbackLoading ? (
// // // // // // //           <ActivityIndicator size="large" color="#0000ff" />
// // // // // // //         ) : statusesError || statusError || feedbackError ? (
// // // // // // //           <View>
// // // // // // //             <Text style={localStyles.errorText}>
// // // // // // //               Error: {statusesError || statusError || feedbackError || 'Failed to load data'}
// // // // // // //             </Text>
// // // // // // //             <CustomButton
// // // // // // //               buttonName="Retry"
// // // // // // //               onPress={() => {
// // // // // // //                 dispatch(fetchAllLeadStatuses());
// // // // // // //                 if (selectedStatusId) dispatch(fetchLeadStatusById(selectedStatusId));
// // // // // // //               }}
// // // // // // //               gradientColors={['#8290EA', '#3F4CA0']}
// // // // // // //               height={56}
// // // // // // //               width="100%"
// // // // // // //               fontSize={RFPercentage(2)}
// // // // // // //               fontWeight="semibold"
// // // // // // //               accessibilityLabel="Retry loading data"
// // // // // // //             />
// // // // // // //           </View>
// // // // // // //         ) : (
// // // // // // //           <>
// // // // // // //             <Text className="text-gray-900 font-poppins text-sm">Select Status</Text>
// // // // // // //             <Dropdown
// // // // // // //               visible={leadStatusDropdownVisible}
// // // // // // //               setVisible={setLeadStatusDropdownVisible}
// // // // // // //               selectedValue={selectedLeadStatus}
// // // // // // //               setSelectedValue={setSelectedLeadStatus}
// // // // // // //               options={leadStatuses}
// // // // // // //               placeholder="Select Status"
// // // // // // //               setSelectedId={setSelectedStatusId}
// // // // // // //             />
// // // // // // //             <DynamicFields
// // // // // // //               statusDetail={statusDetail}
// // // // // // //               onSubmit={handleDynamicFieldsSubmit}
// // // // // // //               initialData={formData}
// // // // // // //             />
// // // // // // //             <View>
// // // // // // //               <Text className="text-gray-900 font-poppins text-sm">Upload Recording (Optional)</Text>
// // // // // // //               <TouchableOpacity style={localStyles.uploadButton} onPress={handleFilePick}>
// // // // // // //                 <Text style={localStyles.uploadButtonText}>
// // // // // // //                   {recordingFile ? 'Change Recording' : 'Pick Recording File'}
// // // // // // //                 </Text>
// // // // // // //               </TouchableOpacity>
// // // // // // //               {recordingFile && (
// // // // // // //                 <Text style={localStyles.uploadedFileText}>Selected: {recordingFile.name}</Text>
// // // // // // //               )}
// // // // // // //             </View>
// // // // // // //             <CustomButton
// // // // // // //               buttonName={feedbackLoading ? 'Submitting...' : 'Submit'}
// // // // // // //               onPress={handleSubmit}
// // // // // // //               height={56}
// // // // // // //               width="60%"
// // // // // // //               containerStyle={{
// // // // // // //                 marginTop: 16,
// // // // // // //                 borderRadius: 8,
// // // // // // //               }}
// // // // // // //               accessibilityLabel="Submit feedback"
// // // // // // //               disabled={feedbackLoading}
// // // // // // //             />
// // // // // // //           </>
// // // // // // //         )}
// // // // // // //       </View>
// // // // // // //       <Toast config={toastConfig} />
// // // // // // //     </View>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default FeedbackScreen;

// // // // // // import React, { useState, useEffect } from 'react';
// // // // // // import { View, Text, TouchableOpacity, Alert, ActivityIndicator, StyleSheet, Platform } from 'react-native';
// // // // // // import { useDispatch, useSelector } from 'react-redux';
// // // // // // import DocumentPicker from 'react-native-document-picker';
// // // // // // import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
// // // // // // import { fetchAllLeadStatuses } from '../../redux/slices/getAllLeadStatusSlice';
// // // // // // import { fetchLeadStatusById, resetLeadStatusById } from '../../redux/slices/getLeadStatusByIdSlice';
// // // // // // import { postFeedback, resetFeedbackState } from '../../redux/slices/postFeedbackSlice';
// // // // // // import { getLatestCallLog } from '../phone/CallLogs';
// // // // // // import Dropdown from './Dropdown';
// // // // // // import DynamicFields from './DynamicFields';
// // // // // // import Header from '../../component/Header';
// // // // // // import CustomButton from '../../component/CustomButton';
// // // // // // import Toast from 'react-native-toast-message';
// // // // // // import { toastConfig } from '../../component/toastConfig';
// // // // // // import { RFPercentage } from 'react-native-responsive-fontsize';
// // // // // // import RNFS from 'react-native-fs';

// // // // // // const localStyles = StyleSheet.create({
// // // // // //   container: { flex: 1, backgroundColor: '#FFFFFF' },
// // // // // //   contentContainer: { padding: 20 },
// // // // // //   callInfoText: { fontSize: 15, color: '#000000', marginBottom: 20 },
// // // // // //   errorText: { color: '#EF4444', fontSize: 15, marginBottom: 10 },
// // // // // //   uploadButton: {
// // // // // //     borderWidth: 1,
// // // // // //     borderColor: '#8290EA',
// // // // // //     borderRadius: 8,
// // // // // //     padding: 10,
// // // // // //     marginTop: 10,
// // // // // //     alignItems: 'center',
// // // // // //   },
// // // // // //   uploadButtonText: {
// // // // // //     color: '#3F4CA0',
// // // // // //     fontSize: RFPercentage(2),
// // // // // //   },
// // // // // //   uploadedFileText: {
// // // // // //     fontSize: RFPercentage(1.8),
// // // // // //     color: '#000000',
// // // // // //     marginTop: 5,
// // // // // //   },
// // // // // // });

// // // // // // const FeedbackScreen = ({ route, navigation }) => {
// // // // // //   const { phoneNumber = 'N/A', leadId, isManual = false, sourceScreen, queryType } = route.params || {};
// // // // // //   const dispatch = useDispatch();

// // // // // //   const [selectedLeadStatus, setSelectedLeadStatus] = useState('');
// // // // // //   const [selectedStatusId, setSelectedStatusId] = useState('');
// // // // // //   const [leadStatusDropdownVisible, setLeadStatusDropdownVisible] = useState(false);
// // // // // //   const [dialUpMethod, setDialUpMethod] = useState(null);
// // // // // //   const [formData, setFormData] = useState({});
// // // // // //   const [recordingFile, setRecordingFile] = useState(null);

// // // // // //   const { leadStatuses = [], loading: statusesLoading, error: statusesError } = useSelector(
// // // // // //     (state) => state.leadStatus || {}
// // // // // //   );
// // // // // //   const { data: leadStatusDetail = {}, loading: statusLoading, error: statusError } = useSelector(
// // // // // //     (state) => state.leadStatusById || {}
// // // // // //   );
// // // // // //   const { loading: feedbackLoading, error: feedbackError } = useSelector(
// // // // // //     (state) => state.postFeedback || {}
// // // // // //   );

// // // // // //   const statusDetail = {
// // // // // //     ...leadStatusDetail?.data,
// // // // // //     meeting: {
// // // // // //       required: leadStatusDetail?.data?.meeting?.required || false,
// // // // // //       dateLabel: leadStatusDetail?.data?.meeting?.dateLable || 'Meeting Date',
// // // // // //       timeLabel: leadStatusDetail?.data?.meeting?.timeLable || 'Meeting Time',
// // // // // //     },
// // // // // //     estimation: {
// // // // // //       required: leadStatusDetail?.data?.estimation?.required || false,
// // // // // //       dateLabel: leadStatusDetail?.data?.estimation?.dateLable || 'Estimation Date',
// // // // // //       budgetLabel: leadStatusDetail?.data?.estimation?.timeLable || 'Estimation Budget',
// // // // // //     },
// // // // // //     showDescription: leadStatusDetail?.data?.showDescription || false,
// // // // // //     isPriority: leadStatusDetail?.data?.isPriority ?? false,
// // // // // //     descriptionLabel: leadStatusDetail?.data?.descriptionLable || 'Description',
// // // // // //     name: leadStatusDetail?.data?.name || '',
// // // // // //   };

// // // // // //   useEffect(() => {
// // // // // //     const fetchCallLog = async () => {
// // // // // //       if (isManual || !phoneNumber || phoneNumber === 'N/A') {
// // // // // //         //('FeedbackScreen: Manual entry or invalid phoneNumber, skipping call log');
// // // // // //         setDialUpMethod(null);
// // // // // //         return;
// // // // // //       }

// // // // // //       //('FeedbackScreen: Fetching call log for phoneNumber', phoneNumber);
// // // // // //       const callLog = await getLatestCallLog(phoneNumber);
// // // // // //       //('FeedbackScreen: Call log retrieved', JSON.stringify(callLog, null, 2));

// // // // // //       const defaultDialUpMethod = {
// // // // // //         phoneNumber: phoneNumber || '',
// // // // // //         callType: 'Outgoing',
// // // // // //         callDuration: '0.00',
// // // // // //         formattedDuration: '00:00',
// // // // // //         callStatus: 'Rejected',
// // // // // //         recordedFile: '',
// // // // // //         callSid: '',
// // // // // //         callStartTime: '',
// // // // // //         callEndTime: '',
// // // // // //       };

// // // // // //       setDialUpMethod(
// // // // // //         callLog
// // // // // //           ? {
// // // // // //               phoneNumber: callLog.phoneNumber || phoneNumber,
// // // // // //               callType: 'Outgoing',
// // // // // //               callDuration: callLog.callDuration,
// // // // // //               formattedDuration: callLog.formattedDuration,
// // // // // //               callStatus: callLog.callStatus,
// // // // // //               recordedFile: callLog.recordedFile || '',
// // // // // //               callSid: '',
// // // // // //               callStartTime: callLog.callStartTime || '',
// // // // // //               callEndTime: callLog.callEndTime || '',
// // // // // //             }
// // // // // //           : defaultDialUpMethod
// // // // // //       );
// // // // // //     };

// // // // // //     fetchCallLog();
// // // // // //   }, [phoneNumber, isManual]);

// // // // // //   useEffect(() => {
// // // // // //     //('FeedbackScreen: Fetching lead statuses');
// // // // // //     dispatch(fetchAllLeadStatuses())
// // // // // //       .unwrap()
// // // // // //       .catch((err) => console.error('FeedbackScreen: Error fetching lead statuses:', err));
// // // // // //   }, [dispatch]);

// // // // // //   useEffect(() => {
// // // // // //     if (selectedStatusId) {
// // // // // //       //('FeedbackScreen: Fetching status details for ID:', selectedStatusId);
// // // // // //       dispatch(fetchLeadStatusById(selectedStatusId))
// // // // // //         .unwrap()
// // // // // //         .catch((err) => console.error('FeedbackScreen: Error fetching status details:', err));
// // // // // //     }
// // // // // //   }, [dispatch, selectedStatusId]);

// // // // // //   useEffect(() => {
// // // // // //     return () => {
// // // // // //       //('FeedbackScreen: Cleaning up');
// // // // // //       dispatch(resetLeadStatusById());
// // // // // //       dispatch(resetFeedbackState());
// // // // // //     };
// // // // // //   }, [dispatch]);

// // // // // //   const handleDynamicFieldsSubmit = (data) => {
// // // // // //     //('FeedbackScreen: Received dynamic fields data', JSON.stringify(data, null, 2));
// // // // // //     setFormData(data);
// // // // // //   };

// // // // // //   const handleFilePick = async () => {
// // // // // //     try {
// // // // // //       const permission =
// // // // // //         Platform.OS === 'ios'
// // // // // //           ? PERMISSIONS.IOS.PHOTO_LIBRARY
// // // // // //           : Platform.Version >= 33
// // // // // //           ? PERMISSIONS.ANDROID.READ_MEDIA_AUDIO
// // // // // //           : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
// // // // // //       const permissionResult = await check(permission);
// // // // // //       if (permissionResult !== RESULTS.GRANTED) {
// // // // // //         const requestResult = await request(permission);
// // // // // //         if (requestResult !== RESULTS.GRANTED) {
// // // // // //           Toast.show({
// // // // // //             type: 'error',
// // // // // //             text1: 'Error',
// // // // // //             text2: 'Permission to access audio files denied.',
// // // // // //           });
// // // // // //           return;
// // // // // //         }
// // // // // //       }

// // // // // //       const pickerResult = await DocumentPicker.pick({
// // // // // //         type: [DocumentPicker.types.audio],
// // // // // //       });
// // // // // //       //('FeedbackScreen: File picked', pickerResult);
// // // // // //       setRecordingFile(pickerResult[0]);
// // // // // //     } catch (err) {
// // // // // //       if (DocumentPicker.isCancel(err)) {
// // // // // //         //('FeedbackScreen: File picking cancelled');
// // // // // //       } else {
// // // // // //         console.error('FeedbackScreen: Error picking file', err);
// // // // // //         Toast.show({
// // // // // //           type: 'error',
// // // // // //           text1: 'Error',
// // // // // //           text2: 'Failed to pick recording file.',
// // // // // //         });
// // // // // //       }
// // // // // //     }
// // // // // //   };

// // // // // //   const handleSubmit = async () => {
// // // // // //     //('FeedbackScreen: Submitting feedback', {
// // // // // //       selectedLeadStatus,
// // // // // //       selectedStatusId,
// // // // // //       formData,
// // // // // //       dialUpMethod,
// // // // // //       recordingFile,
// // // // // //     });

// // // // // //     if (!leadId || !/^[0-9a-fA-F]{24}$/.test(leadId)) {
// // // // // //       Toast.show({
// // // // // //         type: 'error',
// // // // // //         text1: 'Error',
// // // // // //         text2: 'Invalid or missing Lead ID.',
// // // // // //       });
// // // // // //       return;
// // // // // //     }
// // // // // //     if (!selectedLeadStatus || !selectedStatusId) {
// // // // // //       Toast.show({
// // // // // //         type: 'error',
// // // // // //         text1: 'Error',
// // // // // //         text2: 'Please select a status.',
// // // // // //       });
// // // // // //       return;
// // // // // //     }
// // // // // //     if (
// // // // // //       statusDetail.isPriority &&
// // // // // //       (!formData.priority || !['Important', 'High', 'Medium', 'Low'].includes(formData.priority))
// // // // // //     ) {
// // // // // //       Toast.show({
// // // // // //         type: 'error',
// // // // // //         text1: 'Error',
// // // // // //         text2: 'Please select a valid priority.',
// // // // // //       });
// // // // // //       return;
// // // // // //     }
// // // // // //     if (
// // // // // //       statusDetail.meeting?.required &&
// // // // // //       (!formData.nextFollowUpDate || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.*Z$/.test(formData.nextFollowUpDate))
// // // // // //     ) {
// // // // // //       Toast.show({
// // // // // //         type: 'error',
// // // // // //         text1: 'Error',
// // // // // //         text2: 'Please provide a valid meeting date and time.',
// // // // // //       });
// // // // // //       return;
// // // // // //     }
// // // // // //     if (
// // // // // //       statusDetail.estimation?.required &&
// // // // // //       (!formData.estimationBudget || isNaN(formData.estimationBudget) || Number(formData.estimationBudget) <= 0)
// // // // // //     ) {
// // // // // //       Toast.show({
// // // // // //         type: 'error',
// // // // // //         text1: 'Error',
// // // // // //         text2: 'Please enter a valid estimation budget.',
// // // // // //       });
// // // // // //       return;
// // // // // //     }
// // // // // //     if (
// // // // // //       statusDetail.estimation?.required &&
// // // // // //       (!formData.estimationDate || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.*Z$/.test(formData.estimationDate))
// // // // // //     ) {
// // // // // //       Toast.show({
// // // // // //         type: 'error',
// // // // // //         text1: 'Error',
// // // // // //         text2: 'Please provide a valid estimation date.',
// // // // // //       });
// // // // // //       return;
// // // // // //     }
// // // // // //     if (statusDetail.name === 'Active' && !formData.address?.trim()) {
// // // // // //       Toast.show({
// // // // // //         type: 'error',
// // // // // //         text1: 'Error',
// // // // // //         text2: 'Please provide an address.',
// // // // // //       });
// // // // // //       return;
// // // // // //     }
// // // // // //     if (statusDetail.name === 'Inactive' && !formData.reason?.trim()) {
// // // // // //       Toast.show({
// // // // // //         type: 'error',
// // // // // //         text1: 'Error',
// // // // // //         text2: 'Please provide a reason for inactivity.',
// // // // // //       });
// // // // // //       return;
// // // // // //     }
// // // // // //     if (!isManual && dialUpMethod?.recordedFile && !(await RNFS.exists(dialUpMethod.recordedFile))) {
// // // // // //       Toast.show({
// // // // // //         type: 'error',
// // // // // //         text1: 'Error',
// // // // // //         text2: 'Call recording file not found.',
// // // // // //       });
// // // // // //       return;
// // // // // //     }
// // // // // //     if (recordingFile && !(await RNFS.exists(recordingFile.uri))) {
// // // // // //       Toast.show({
// // // // // //         type: 'error',
// // // // // //         text1: 'Error',
// // // // // //         text2: 'Uploaded recording file not found.',
// // // // // //       });
// // // // // //       return;
// // // // // //     }

// // // // // //     try {
// // // // // //       const contactDateTime = new Date().toISOString();
// // // // // //       let callStartDateTime = '';
// // // // // //       let callEndDateTime = '';

// // // // // //       if (dialUpMethod && !isManual) {
// // // // // //         const isCallConnected =
// // // // // //           dialUpMethod.callStatus === 'Connected' ||
// // // // // //           (dialUpMethod.callDuration && parseFloat(dialUpMethod.callDuration) > 0);

// // // // // //         if (isCallConnected && dialUpMethod.callStartTime) {
// // // // // //           const startTime = new Date(dialUpMethod.callStartTime);
// // // // // //           if (!isNaN(startTime)) callStartDateTime = startTime.toISOString();
// // // // // //         }
// // // // // //         if (isCallConnected && dialUpMethod.callEndTime) {
// // // // // //           const endTime = new Date(dialUpMethod.callEndTime);
// // // // // //           if (!isNaN(endTime)) callEndDateTime = endTime.toISOString();
// // // // // //         }
// // // // // //       }

// // // // // //       const payload = {
// // // // // //         leadId,
// // // // // //         contactDateTime,
// // // // // //         nextFollowUpDate: formData.nextFollowUpDate || '',
// // // // // //         estimationDate: statusDetail.estimation?.required ? formData.estimationDate : '',
// // // // // //         estimationBudget: statusDetail.estimation?.required ? Number(formData.estimationBudget) : 0,
// // // // // //         priority: formData.priority || 'Medium',
// // // // // //         method: isManual ? 'Manual' : 'Call',
// // // // // //         status: selectedStatusId,
// // // // // //         description: statusDetail.showDescription ? formData.meetingDescription : '',
// // // // // //         address: statusDetail.name === 'Active' ? formData.address : '',
// // // // // //         reason: statusDetail.name === 'Inactive' ? formData.reason : '',
// // // // // //         recordingFile: recordingFile ? recordingFile.uri : '',
// // // // // //         ...(dialUpMethod && !isManual
// // // // // //           ? {
// // // // // //               dialUpMethod: {
// // // // // //                 phoneNumber: dialUpMethod.phoneNumber || '',
// // // // // //                 callType: dialUpMethod.callType || 'Outgoing',
// // // // // //                 callDuration: dialUpMethod.callDuration || '0.00',
// // // // // //                 formattedDuration: dialUpMethod.formattedDuration || '00:00',
// // // // // //                 callStatus: dialUpMethod.callStatus || 'Rejected',
// // // // // //                 recordedFile: dialUpMethod.recordedFile || '',
// // // // // //                 callSid: dialUpMethod.callSid || '',
// // // // // //                 callStartDateTime,
// // // // // //                 callEndDateTime,
// // // // // //               },
// // // // // //             }
// // // // // //           : {}),
// // // // // //       };

// // // // // //       //('FeedbackScreen: Submitting payload', JSON.stringify(payload, null, 2));
// // // // // //       await dispatch(postFeedback(payload)).unwrap();
// // // // // //       Toast.show({
// // // // // //         type: 'success',
// // // // // //         text1: 'Success',
// // // // // //         text2: 'Feedback submitted successfully!',
// // // // // //       });

// // // // // //       if (sourceScreen) {
// // // // // //         //('FeedbackScreen: Navigating back to source screen:', sourceScreen);
// // // // // //         navigation.navigate(sourceScreen, { queryType });
// // // // // //       } else {
// // // // // //         navigation.navigate('HomeScreen', {
// // // // // //           screen: 'Main',
// // // // // //           params: {
// // // // // //             screen: 'LeadsScreen',
// // // // // //           },
// // // // // //         });
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       console.error('FeedbackScreen: Submit error', JSON.stringify(error, null, 2));
// // // // // //       Toast.show({
// // // // // //         type: 'error',
// // // // // //         text1: 'Error',
// // // // // //         text2: error.message || feedbackError || 'Failed to submit feedback.',
// // // // // //       });
// // // // // //       dispatch(resetFeedbackState());
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <View style={localStyles.container}>
// // // // // //       <Header
// // // // // //         title="Feedback"
// // // // // //         showBackButton={true}
// // // // // //         onBackPress={() => {
// // // // // //           navigation.goBack();
// // // // // //         }}
// // // // // //       />
// // // // // //       <View style={localStyles.contentContainer}>
// // // // // //         <Text style={localStyles.callInfoText}>
// // // // // //           {isManual ? 'Manual Feedback' : `Call to: ${phoneNumber} ${dialUpMethod?.formattedDuration ? `(${dialUpMethod.formattedDuration})` : ''}`}
// // // // // //         </Text>
// // // // // //         {dialUpMethod?.recordedFile && (
// // // // // //           <Text style={localStyles.callInfoText}>
// // // // // //             Recording: {dialUpMethod.recordedFile.split('/').pop()}
// // // // // //           </Text>
// // // // // //         )}

// // // // // //         {statusesLoading || statusLoading || feedbackLoading ? (
// // // // // //           <ActivityIndicator size="large" color="#0000ff" />
// // // // // //         ) : statusesError || statusError || feedbackError ? (
// // // // // //           <View>
// // // // // //             <Text style={localStyles.errorText}>
// // // // // //               Error: {statusesError || statusError || feedbackError || 'Failed to load data'}
// // // // // //             </Text>
// // // // // //             <CustomButton
// // // // // //               buttonName="Retry"
// // // // // //               onPress={() => {
// // // // // //                 dispatch(fetchAllLeadStatuses());
// // // // // //                 if (selectedStatusId) dispatch(fetchLeadStatusById(selectedStatusId));
// // // // // //               }}
// // // // // //               gradientColors={['#8290EA', '#3F4CA0']}
// // // // // //               height={56}
// // // // // //               width="100%"
// // // // // //               fontSize={RFPercentage(2)}
// // // // // //               fontWeight="semibold"
// // // // // //               accessibilityLabel="Retry loading data"
// // // // // //             />
// // // // // //           </View>
// // // // // //         ) : (
// // // // // //           <>
// // // // // //             <View>
// // // // // //               <Text className="text-gray-900 font-poppins text-sm">Upload Recording (Optional)</Text>
// // // // // //               <TouchableOpacity style={localStyles.uploadButton} onPress={handleFilePick}>
// // // // // //                 <Text style={localStyles.uploadButtonText}>
// // // // // //                   {recordingFile ? 'Change Recording' : 'Pick Recording File'}
// // // // // //                 </Text>
// // // // // //               </TouchableOpacity>
// // // // // //               {recordingFile && (
// // // // // //                 <Text style={localStyles.uploadedFileText}>Selected: {recordingFile.name}</Text>
// // // // // //               )}
// // // // // //             </View>
// // // // // //             <Text className="text-gray-900 font-poppins text-sm" style={{ marginTop: 20 }}>
// // // // // //               Select Status
// // // // // //             </Text>
// // // // // //             <Dropdown
// // // // // //               visible={leadStatusDropdownVisible}
// // // // // //               setVisible={setLeadStatusDropdownVisible}
// // // // // //               selectedValue={selectedLeadStatus}
// // // // // //               setSelectedValue={setSelectedLeadStatus}
// // // // // //               options={leadStatuses}
// // // // // //               placeholder="Select Status"
// // // // // //               setSelectedId={setSelectedStatusId}
// // // // // //             />
// // // // // //             <DynamicFields
// // // // // //               statusDetail={statusDetail}
// // // // // //               onSubmit={handleDynamicFieldsSubmit}
// // // // // //               initialData={formData}
// // // // // //             />
// // // // // //             <CustomButton
// // // // // //               buttonName={feedbackLoading ? 'Submitting...' : 'Submit'}
// // // // // //               onPress={handleSubmit}
// // // // // //               height={56}
// // // // // //               width="60%"
// // // // // //               containerStyle={{
// // // // // //                 marginTop: 16,
// // // // // //                 borderRadius: 8,
// // // // // //               }}
// // // // // //               accessibilityLabel="Submit feedback"
// // // // // //               disabled={feedbackLoading}
// // // // // //             />
// // // // // //           </>
// // // // // //         )}
// // // // // //       </View>
// // // // // //       <Toast config={toastConfig} />
// // // // // //     </View>
// // // // // //   );
// // // // // // };

// // // // // // export default FeedbackScreen;

// // // // // import React, { useState, useEffect } from 'react';
// // // // // import { View, Text, TouchableOpacity, Alert, ActivityIndicator, StyleSheet, Platform } from 'react-native';
// // // // // import { useDispatch, useSelector } from 'react-redux';
// // // // // import DocumentPicker from 'react-native-document-picker';
// // // // // import { check, request, PERMISSIONS, RESULTS, openSettings } from 'react-native-permissions';
// // // // // import { fetchAllLeadStatuses } from '../../redux/slices/getAllLeadStatusSlice';
// // // // // import { fetchLeadStatusById, resetLeadStatusById } from '../../redux/slices/getLeadStatusByIdSlice';
// // // // // import { postFeedback, resetFeedbackState } from '../../redux/slices/postFeedbackSlice';
// // // // // import { getLatestCallLog } from '../phone/CallLogs';
// // // // // import Dropdown from './Dropdown';
// // // // // import DynamicFields from './DynamicFields';
// // // // // import Header from '../../component/Header';
// // // // // import CustomButton from '../../component/CustomButton';
// // // // // import Toast from 'react-native-toast-message';
// // // // // import { toastConfig } from '../../component/toastConfig';
// // // // // import { RFPercentage } from 'react-native-responsive-fontsize';
// // // // // import RNFS from 'react-native-fs';

// // // // // const localStyles = StyleSheet.create({
// // // // //   container: { flex: 1, backgroundColor: '#FFFFFF', },
// // // // //   contentContainer: { padding: 20 },
// // // // //   callInfoText: { fontSize: 15, color: '#000000', marginBottom: 20 },
// // // // //   errorText: { color: '#EF4444', fontSize: 15, marginBottom: 10 },
// // // // //   uploadButton: {
// // // // //     borderWidth: 1,
// // // // //     borderColor: '#8290EA',
// // // // //     borderRadius: 8,
// // // // //     padding: 10,
// // // // //     marginTop: 10,
// // // // //     alignItems: 'center',
// // // // //   },
// // // // //   uploadButtonText: {
// // // // //     color: '#3F4CA0',
// // // // //     fontSize: RFPercentage(2),
// // // // //   },
// // // // //   uploadedFileText: {
// // // // //     fontSize: RFPercentage(1.8),
// // // // //     color: '#000000',
// // // // //     marginTop: 5,
// // // // //   },
// // // // // });

// // // // // const FeedbackScreen = ({ route, navigation }) => {
// // // // //   const { phoneNumber = 'N/A', leadId, isManual = false, sourceScreen, queryType } = route.params || {};
// // // // //   const dispatch = useDispatch();

// // // // //   const [selectedLeadStatus, setSelectedLeadStatus] = useState('');
// // // // //   const [selectedStatusId, setSelectedStatusId] = useState('');
// // // // //   const [leadStatusDropdownVisible, setLeadStatusDropdownVisible] = useState(false);
// // // // //   const [dialUpMethod, setDialUpMethod] = useState(null);
// // // // //   const [formData, setFormData] = useState({});
// // // // //   const [recordingFile, setRecordingFile] = useState(null);

// // // // //   const { leadStatuses = [], loading: statusesLoading, error: statusesError } = useSelector(
// // // // //     (state) => state.leadStatus || {}
// // // // //   );
// // // // //   const { data: leadStatusDetail = {}, loading: statusLoading, error: statusError } = useSelector(
// // // // //     (state) => state.leadStatusById || {}
// // // // //   );
// // // // //   const { loading: feedbackLoading, error: feedbackError } = useSelector(
// // // // //     (state) => state.postFeedback || {}
// // // // //   );

// // // // //   const statusDetail = {
// // // // //     ...leadStatusDetail?.data,
// // // // //     meeting: {
// // // // //       required: leadStatusDetail?.data?.meeting?.required || false,
// // // // //       dateLabel: leadStatusDetail?.data?.meeting?.dateLable || 'Meeting Date',
// // // // //       timeLabel: leadStatusDetail?.data?.meeting?.timeLable || 'Meeting Time',
// // // // //     },
// // // // //     estimation: {
// // // // //       required: leadStatusDetail?.data?.estimation?.required || false,
// // // // //       dateLabel: leadStatusDetail?.data?.estimation?.dateLable || 'Estimation Date',
// // // // //       budgetLabel: leadStatusDetail?.data?.estimation?.timeLable || 'Estimation Budget',
// // // // //     },
// // // // //     showDescription: leadStatusDetail?.data?.showDescription || false,
// // // // //     isPriority: leadStatusDetail?.data?.isPriority ?? false,
// // // // //     descriptionLabel: leadStatusDetail?.data?.descriptionLable || 'Description',
// // // // //     name: leadStatusDetail?.data?.name || '',
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     const fetchCallLog = async () => {
// // // // //       if (isManual || !phoneNumber || phoneNumber === 'N/A') {
// // // // //         //('FeedbackScreen: Manual entry or invalid phoneNumber, skipping call log');
// // // // //         setDialUpMethod(null);
// // // // //         return;
// // // // //       }

// // // // //       //('FeedbackScreen: Fetching call log for phoneNumber', phoneNumber);
// // // // //       const callLog = await getLatestCallLog(phoneNumber);
// // // // //       //('FeedbackScreen: Call log retrieved', JSON.stringify(callLog, null, 2));

// // // // //       const defaultDialUpMethod = {
// // // // //         phoneNumber: phoneNumber || '',
// // // // //         callType: 'Outgoing',
// // // // //         callDuration: '0.00',
// // // // //         formattedDuration: '00:00',
// // // // //         callStatus: 'Rejected',
// // // // //         recordedFile: '',
// // // // //         callSid: '',
// // // // //         callStartTime: '',
// // // // //         callEndTime: '',
// // // // //       };

// // // // //       setDialUpMethod(
// // // // //         callLog
// // // // //           ? {
// // // // //               phoneNumber: callLog.phoneNumber || phoneNumber,
// // // // //               callType: 'Outgoing',
// // // // //               callDuration: callLog.callDuration,
// // // // //               formattedDuration: callLog.formattedDuration,
// // // // //               callStatus: callLog.callStatus,
// // // // //               recordedFile: callLog.recordedFile || '',
// // // // //               callSid: '',
// // // // //               callStartTime: callLog.callStartTime || '',
// // // // //               callEndTime: callLog.callEndTime || '',
// // // // //             }
// // // // //           : defaultDialUpMethod
// // // // //       );
// // // // //     };

// // // // //     fetchCallLog();
// // // // //   }, [phoneNumber, isManual]);

// // // // //   useEffect(() => {
// // // // //     //('FeedbackScreen: Fetching lead statuses');
// // // // //     dispatch(fetchAllLeadStatuses())
// // // // //       .unwrap()
// // // // //       .catch((err) => console.error('FeedbackScreen: Error fetching lead statuses:', err));
// // // // //   }, [dispatch]);

// // // // //   useEffect(() => {
// // // // //     if (selectedStatusId) {
// // // // //       //('FeedbackScreen: Fetching status details for ID:', selectedStatusId);
// // // // //       dispatch(fetchLeadStatusById(selectedStatusId))
// // // // //         .unwrap()
// // // // //         .catch((err) => console.error('FeedbackScreen: Error fetching status details:', err));
// // // // //     }
// // // // //   }, [dispatch, selectedStatusId]);

// // // // //   useEffect(() => {
// // // // //     return () => {
// // // // //       //('FeedbackScreen: Cleaning up');
// // // // //       dispatch(resetLeadStatusById());
// // // // //       dispatch(resetFeedbackState());
// // // // //     };
// // // // //   }, [dispatch]);

// // // // //   const handleDynamicFieldsSubmit = (data) => {
// // // // //     //('FeedbackScreen: Received dynamic fields data', JSON.stringify(data, null, 2));
// // // // //     setFormData(data);
// // // // //   };

// // // // //   const handleFilePick = async () => {
// // // // //     try {
// // // // //       if (Platform.OS === 'android') {
// // // // //         const permission = Platform.Version >= 33 ? PERMISSIONS.ANDROID.READ_MEDIA_AUDIO : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
// // // // //         const permissionResult = await check(permission);
// // // // //         if (permissionResult !== RESULTS.GRANTED) {
// // // // //           const requestResult = await request(permission);
// // // // //           if (requestResult !== RESULTS.GRANTED) {
// // // // //             if (requestResult === RESULTS.DENIED) {
// // // // //               Toast.show({
// // // // //                 type: 'error',
// // // // //                 text1: 'Error',
// // // // //                 text2: 'Permission to access audio files denied. Please enable it in settings.',
// // // // //                 onPress: async () => {
// // // // //                   try {
// // // // //                     await openSettings();
// // // // //                   } catch (err) {
// // // // //                     console.error('FeedbackScreen: Error opening settings', err);
// // // // //                   }
// // // // //                 },
// // // // //               });
// // // // //             } else {
// // // // //               Toast.show({
// // // // //                 type: 'error',
// // // // //                 text1: 'Error',
// // // // //                 text2: 'Permission to access audio files blocked. Please enable it in settings.',
// // // // //                 onPress: async () => {
// // // // //                   try {
// // // // //                     await openSettings();
// // // // //                   } catch (err) {
// // // // //                     console.error('FeedbackScreen: Error opening settings', err);
// // // // //                   }
// // // // //                 },
// // // // //               });
// // // // //             }
// // // // //             return;
// // // // //           }
// // // // //         }
// // // // //       }

// // // // //       const pickerResult = await DocumentPicker.pick({
// // // // //         type: [DocumentPicker.types.audio],
// // // // //       });
// // // // //       //('FeedbackScreen: File picked', pickerResult);
// // // // //       setRecordingFile(pickerResult[0]);
// // // // //     } catch (err) {
// // // // //       if (DocumentPicker.isCancel(err)) {
// // // // //         //('FeedbackScreen: File picking cancelled');
// // // // //       } else {
// // // // //         console.error('FeedbackScreen: Error picking file', err);
// // // // //         Toast.show({
// // // // //           type: 'error',
// // // // //           text1: 'Error',
// // // // //           text2: 'Failed to pick recording file.',
// // // // //         });
// // // // //       }
// // // // //     }
// // // // //   };

// // // // //   const handleSubmit = async () => {
// // // // //     //('FeedbackScreen: Submitting feedback', {
// // // // //       selectedLeadStatus,
// // // // //       selectedStatusId,
// // // // //       formData,
// // // // //       dialUpMethod,
// // // // //       recordingFile,
// // // // //     });

// // // // //     if (!leadId || !/^[0-9a-fA-F]{24}$/.test(leadId)) {
// // // // //       Toast.show({
// // // // //         type: 'error',
// // // // //         text1: 'Error',
// // // // //         text2: 'Invalid or missing Lead ID.',
// // // // //       });
// // // // //       return;
// // // // //     }
// // // // //     if (!selectedLeadStatus || !selectedStatusId) {
// // // // //       Toast.show({
// // // // //         type: 'error',
// // // // //         text1: 'Error',
// // // // //         text2: 'Please select a status.',
// // // // //       });
// // // // //       return;
// // // // //     }
// // // // //     if (
// // // // //       statusDetail.isPriority &&
// // // // //       (!formData.priority || !['Important', 'High', 'Medium', 'Low'].includes(formData.priority))
// // // // //     ) {
// // // // //       Toast.show({
// // // // //         type: 'error',
// // // // //         text1: 'Error',
// // // // //         text2: 'Please select a valid priority.',
// // // // //       });
// // // // //       return;
// // // // //     }
// // // // //     if (
// // // // //       statusDetail.meeting?.required &&
// // // // //       (!formData.nextFollowUpDate || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.*Z$/.test(formData.nextFollowUpDate))
// // // // //     ) {
// // // // //       Toast.show({
// // // // //         type: 'error',
// // // // //         text1: 'Error',
// // // // //         text2: 'Please provide a valid meeting date and time.',
// // // // //       });
// // // // //       return;
// // // // //     }
// // // // //     if (
// // // // //       statusDetail.estimation?.required &&
// // // // //       (!formData.estimationBudget || isNaN(formData.estimationBudget) || Number(formData.estimationBudget) <= 0)
// // // // //     ) {
// // // // //       Toast.show({
// // // // //         type: 'error',
// // // // //         text1: 'Error',
// // // // //         text2: 'Please enter a valid estimation budget.',
// // // // //       });
// // // // //       return;
// // // // //     }
// // // // //     if (
// // // // //       statusDetail.estimation?.required &&
// // // // //       (!formData.estimationDate || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.*Z$/.test(formData.estimationDate))
// // // // //     ) {
// // // // //       Toast.show({
// // // // //         type: 'error',
// // // // //         text1: 'Error',
// // // // //         text2: 'Please provide a valid estimation date.',
// // // // //       });
// // // // //       return;
// // // // //     }
// // // // //     if (statusDetail.name === 'Active' && !formData.address?.trim()) {
// // // // //       Toast.show({
// // // // //         type: 'error',
// // // // //         text1: 'Error',
// // // // //         text2: 'Please provide an address.',
// // // // //       });
// // // // //       return;
// // // // //     }
// // // // //     if (statusDetail.name === 'Inactive' && !formData.reason?.trim()) {
// // // // //       Toast.show({
// // // // //         type: 'error',
// // // // //         text1: 'Error',
// // // // //         text2: 'Please provide a reason for inactivity.',
// // // // //       });
// // // // //       return;
// // // // //     }
// // // // //     if (!isManual && dialUpMethod?.recordedFile && !(await RNFS.exists(dialUpMethod.recordedFile))) {
// // // // //       Toast.show({
// // // // //         type: 'error',
// // // // //         text1: 'Error',
// // // // //         text2: 'Call recording file not found.',
// // // // //       });
// // // // //       return;
// // // // //     }
// // // // //     if (recordingFile && !(await RNFS.exists(recordingFile.uri))) {
// // // // //       Toast.show({
// // // // //         type: 'error',
// // // // //         text1: 'Error',
// // // // //         text2: 'Uploaded recording file not found.',
// // // // //       });
// // // // //       return;
// // // // //     }

// // // // //     try {
// // // // //       const contactDateTime = new Date().toISOString();
// // // // //       let callStartDateTime = '';
// // // // //       let callEndDateTime = '';

// // // // //       if (dialUpMethod && !isManual) {
// // // // //         const isCallConnected =
// // // // //           dialUpMethod.callStatus === 'Connected' ||
// // // // //           (dialUpMethod.callDuration && parseFloat(dialUpMethod.callDuration) > 0);

// // // // //         if (isCallConnected && dialUpMethod.callStartTime) {
// // // // //           const startTime = new Date(dialUpMethod.callStartTime);
// // // // //           if (!isNaN(startTime)) callStartDateTime = startTime.toISOString();
// // // // //         }
// // // // //         if (isCallConnected && dialUpMethod.callEndTime) {
// // // // //           const endTime = new Date(dialUpMethod.callEndTime);
// // // // //           if (!isNaN(endTime)) callEndDateTime = endTime.toISOString();
// // // // //         }
// // // // //       }

// // // // //       const payload = {
// // // // //         leadId,
// // // // //         contactDateTime,
// // // // //         nextFollowUpDate: formData.nextFollowUpDate || '',
// // // // //         estimationDate: statusDetail.estimation?.required ? formData.estimationDate : '',
// // // // //         estimationBudget: statusDetail.estimation?.required ? Number(formData.estimationBudget) : 0,
// // // // //         priority: formData.priority || 'Medium',
// // // // //         method: isManual ? 'Manual' : 'Call',
// // // // //         status: selectedStatusId,
// // // // //         description: statusDetail.showDescription ? formData.meetingDescription : '',
// // // // //         address: statusDetail.name === 'Active' ? formData.address : '',
// // // // //         reason: statusDetail.name === 'Inactive' ? formData.reason : '',
// // // // //         recordingFile: recordingFile ? recordingFile.uri : '',
// // // // //         ...(dialUpMethod && !isManual
// // // // //           ? {
// // // // //               dialUpMethod: {
// // // // //                 phoneNumber: dialUpMethod.phoneNumber || '',
// // // // //                 callType: dialUpMethod.callType || 'Outgoing',
// // // // //                 callDuration: dialUpMethod.callDuration || '0.00',
// // // // //                 formattedDuration: dialUpMethod.formattedDuration || '00:00',
// // // // //                 callStatus: dialUpMethod.callStatus || 'Rejected',
// // // // //                 recordedFile: dialUpMethod.recordedFile || '',
// // // // //                 callSid: dialUpMethod.callSid || '',
// // // // //                 callStartDateTime,
// // // // //                 callEndDateTime,
// // // // //               },
// // // // //             }
// // // // //           : {}),
// // // // //       };

// // // // //       //('FeedbackScreen: Submitting payload', JSON.stringify(payload, null, 2));
// // // // //       await dispatch(postFeedback(payload)).unwrap();
// // // // //       Toast.show({
// // // // //         type: 'success',
// // // // //         text1: 'Success',
// // // // //         text2: 'Feedback submitted successfully!',
// // // // //       });

// // // // //       if (sourceScreen) {
// // // // //         //('FeedbackScreen: Navigating back to source screen:', sourceScreen);
// // // // //         navigation.navigate(sourceScreen, { queryType });
// // // // //       } else {
// // // // //         navigation.navigate('HomeScreen', {
// // // // //           screen: 'Main',
// // // // //           params: {
// // // // //             screen: 'LeadsScreen',
// // // // //           },
// // // // //         });
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.error('FeedbackScreen: Submit error', JSON.stringify(error, null, 2));
// // // // //       Toast.show({
// // // // //         type: 'error',
// // // // //         text1: 'Error',
// // // // //         text2: error.message || feedbackError || 'Failed to submit feedback.',
// // // // //       });
// // // // //       dispatch(resetFeedbackState());
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <View style={localStyles.container}>
// // // // //       <Header
// // // // //         title="Feedback"
// // // // //         showBackButton={true}
// // // // //         onBackPress={() => {
// // // // //           navigation.goBack();
// // // // //         }}
// // // // //       />
// // // // //       <View style={localStyles.contentContainer}>
// // // // //         <Text style={localStyles.callInfoText}>
// // // // //           {isManual ? 'Manual Feedback' : `Call to: ${phoneNumber} ${dialUpMethod?.formattedDuration ? `(${dialUpMethod.formattedDuration})` : ''}`}
// // // // //         </Text>
// // // // //         {dialUpMethod?.recordedFile && (
// // // // //           <Text style={localStyles.callInfoText}>
// // // // //             Recording: {dialUpMethod.recordedFile.split('/').pop()}
// // // // //           </Text>
// // // // //         )}

// // // // //         {statusesLoading || statusLoading || feedbackLoading ? (
// // // // //           <ActivityIndicator size="large" color="#0000ff" />
// // // // //         ) : statusesError || statusError || feedbackError ? (
// // // // //           <View>
// // // // //             <Text style={localStyles.errorText}>
// // // // //               Error: {statusesError || statusError || feedbackError || 'Failed to load data'}
// // // // //             </Text>
// // // // //             <CustomButton
// // // // //               buttonName="Retry"
// // // // //               onPress={() => {
// // // // //                 dispatch(fetchAllLeadStatuses());
// // // // //                 if (selectedStatusId) dispatch(fetchLeadStatusById(selectedStatusId));
// // // // //               }}
// // // // //               gradientColors={['#8290EA', '#3F4CA0']}
// // // // //               height={56}
// // // // //               width="100%"
// // // // //               fontSize={RFPercentage(2)}
// // // // //               fontWeight="semibold"
// // // // //               accessibilityLabel="Retry loading data"
// // // // //             />
// // // // //           </View>
// // // // //         ) : (
// // // // //           <>
// // // // //             <View>
// // // // //               <Text className="text-gray-900 font-poppins text-sm">Upload Recording (Optional)</Text>
// // // // //               <TouchableOpacity style={localStyles.uploadButton} onPress={handleFilePick}>
// // // // //                 <Text style={localStyles.uploadButtonText}>
// // // // //                   {recordingFile ? 'Change Recording' : 'Pick Recording File'}
// // // // //                 </Text>
// // // // //               </TouchableOpacity>
// // // // //               {recordingFile && (
// // // // //                 <Text style={localStyles.uploadedFileText}>Selected: {recordingFile.name}</Text>
// // // // //               )}
// // // // //             </View>
// // // // //             <Text className="text-gray-900 font-poppins text-sm" style={{ marginTop: 20 }}>
// // // // //               Select Status
// // // // //             </Text>
// // // // //             <Dropdown
// // // // //               visible={leadStatusDropdownVisible}
// // // // //               setVisible={setLeadStatusDropdownVisible}
// // // // //               selectedValue={selectedLeadStatus}
// // // // //               setSelectedValue={setSelectedLeadStatus}
// // // // //               options={leadStatuses}
// // // // //               placeholder="Select Status"
// // // // //               setSelectedId={setSelectedStatusId}
// // // // //             />
// // // // //             <DynamicFields
// // // // //               statusDetail={statusDetail}
// // // // //               onSubmit={handleDynamicFieldsSubmit}
// // // // //               initialData={formData}
// // // // //             />
// // // // //             <CustomButton
// // // // //               buttonName={feedbackLoading ? 'Submitting...' : 'Submit'}
// // // // //               onPress={handleSubmit}
// // // // //               height={56}
// // // // //               width="60%"
// // // // //               containerStyle={{
// // // // //                 marginTop: 16,
// // // // //                 borderRadius: 8,
// // // // //                 // marginBottom:16
// // // // //               }}
// // // // //               accessibilityLabel="Submit feedback"
// // // // //               disabled={feedbackLoading}
// // // // //             />
// // // // //           </>
// // // // //         )}
// // // // //       </View>
// // // // //       <Toast config={toastConfig} />
// // // // //     </View>
// // // // //   );
// // // // // };

// // // // // export default FeedbackScreen;

// // // // import React, { useState, useEffect } from 'react';
// // // // import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, Platform, ScrollView } from 'react-native';
// // // // import { useDispatch, useSelector } from 'react-redux';
// // // // import DocumentPicker from 'react-native-document-picker';
// // // // import { check, request, PERMISSIONS, RESULTS, openSettings } from 'react-native-permissions';
// // // // import { fetchAllLeadStatuses } from '../../redux/slices/getAllLeadStatusSlice';
// // // // import { fetchLeadStatusById, resetLeadStatusById } from '../../redux/slices/getLeadStatusByIdSlice';
// // // // import { postFeedback, resetFeedbackState } from '../../redux/slices/postFeedbackSlice';
// // // // import { getLatestCallLog } from '../phone/CallLogs';
// // // // import Dropdown from './Dropdown';
// // // // import DynamicFields from './DynamicFields';
// // // // import Header from '../../component/Header';
// // // // import CustomButton from '../../component/CustomButton';
// // // // import Toast from 'react-native-toast-message';
// // // // import { toastConfig } from '../../component/toastConfig';
// // // // import { RFPercentage } from 'react-native-responsive-fontsize';

// // // // const localStyles = StyleSheet.create({
// // // //   container: { 
// // // //     flex: 1, 
// // // //     backgroundColor: '#FFFFFF',
// // // //   },
// // // //   scrollContentContainer: { 
// // // //     padding: 20,
// // // //     paddingBottom: 40, // Extra padding to ensure button is fully visible
// // // //   },
// // // //   callInfoText: { 
// // // //     fontSize: 15, 
// // // //     color: '#000000', 
// // // //     marginBottom: 20,
// // // //   },
// // // //   errorText: { 
// // // //     color: '#EF4444', 
// // // //     fontSize: 15, 
// // // //     marginBottom: 10,
// // // //   },
// // // //   uploadButton: {
// // // //     borderWidth: 1,
// // // //     borderColor: '#8290EA',
// // // //     borderRadius: 8,
// // // //     padding: 10,
// // // //     marginTop: 10,
// // // //     alignItems: 'center',
// // // //   },
// // // //   uploadButtonText: {
// // // //     color: '#3F4CA0',
// // // //     fontSize: RFPercentage(2),
// // // //   },
// // // //   uploadedFileText: {
// // // //     fontSize: RFPercentage(1.8),
// // // //     color: '#000000',
// // // //     marginTop: 5,
// // // //   },
// // // //   buttonContainer: {
// // // //     alignItems: 'center', // Center the button horizontally
// // // //     marginTop: 16,
// // // //   },
// // // // });

// // // // const FeedbackScreen = ({ route, navigation }) => {
// // // //   const { phoneNumber = 'N/A', leadId, isManual = false, sourceScreen, queryType } = route.params || {};
// // // //   const dispatch = useDispatch();

// // // //   const [selectedLeadStatus, setSelectedLeadStatus] = useState('');
// // // //   const [selectedStatusId, setSelectedStatusId] = useState('');
// // // //   const [leadStatusDropdownVisible, setLeadStatusDropdownVisible] = useState(false);
// // // //   const [dialUpMethod, setDialUpMethod] = useState(null);
// // // //   const [formData, setFormData] = useState({});
// // // //   const [recordingFile, setRecordingFile] = useState(null);

// // // //   const { leadStatuses = [], loading: statusesLoading, error: statusesError } = useSelector(
// // // //     (state) => state.leadStatus || {}
// // // //   );
// // // //   const { data: leadStatusDetail = {}, loading: statusLoading, error: statusError } = useSelector(
// // // //     (state) => state.leadStatusById || {}
// // // //   );
// // // //   const { loading: feedbackLoading, error: feedbackError } = useSelector(
// // // //     (state) => state.postFeedback || {}
// // // //   );

// // // //   const statusDetail = {
// // // //     ...leadStatusDetail?.data,
// // // //     meeting: {
// // // //       required: leadStatusDetail?.data?.meeting?.required || false,
// // // //       dateLabel: leadStatusDetail?.data?.meeting?.dateLable || 'Meeting Date',
// // // //       timeLabel: leadStatusDetail?.data?.meeting?.timeLable || 'Meeting Time',
// // // //     },
// // // //     estimation: {
// // // //       required: leadStatusDetail?.data?.estimation?.required || false,
// // // //       dateLabel: leadStatusDetail?.data?.estimation?.dateLable || 'Estimation Date',
// // // //       budgetLabel: leadStatusDetail?.data?.estimation?.timeLable || 'Estimation Budget',
// // // //     },
// // // //     showDescription: leadStatusDetail?.data?.showDescription || false,
// // // //     isPriority: leadStatusDetail?.data?.isPriority ?? false,
// // // //     descriptionLabel: leadStatusDetail?.data?.descriptionLable || 'Description',
// // // //     name: leadStatusDetail?.data?.name || '',
// // // //   };

// // // //   useEffect(() => {
// // // //     const fetchCallLog = async () => {
// // // //       if (isManual || !phoneNumber || phoneNumber === 'N/A') {
// // // //         //('FeedbackScreen: Manual entry or invalid phoneNumber, skipping call log');
// // // //         setDialUpMethod(null);
// // // //         return;
// // // //       }

// // // //       //('FeedbackScreen: Fetching call log for phoneNumber', phoneNumber);
// // // //       const callLog = await getLatestCallLog(phoneNumber);
// // // //       //('FeedbackScreen: Call log retrieved', JSON.stringify(callLog, null, 2));

// // // //       const defaultDialUpMethod = {
// // // //         phoneNumber: phoneNumber || '',
// // // //         callType: 'Outgoing',
// // // //         callDuration: '0.00',
// // // //         formattedDuration: '00:00',
// // // //         callStatus: 'Rejected',
// // // //         recordedFile: '',
// // // //         callSid: '',
// // // //         callStartTime: '',
// // // //         callEndTime: '',
// // // //       };

// // // //       setDialUpMethod(
// // // //         callLog
// // // //           ? {
// // // //               phoneNumber: callLog.phoneNumber || phoneNumber,
// // // //               callType: 'Outgoing',
// // // //               callDuration: callLog.callDuration,
// // // //               formattedDuration: callLog.formattedDuration,
// // // //               callStatus: callLog.callStatus,
// // // //               recordedFile: callLog.recordedFile || '',
// // // //               callSid: '',
// // // //               callStartTime: callLog.callStartTime || '',
// // // //               callEndTime: callLog.callEndTime || '',
// // // //             }
// // // //           : defaultDialUpMethod
// // // //       );
// // // //     };

// // // //     fetchCallLog();
// // // //   }, [phoneNumber, isManual]);

// // // //   useEffect(() => {
// // // //     //('FeedbackScreen: Fetching lead statuses');
// // // //     dispatch(fetchAllLeadStatuses())
// // // //       .unwrap()
// // // //       .catch((err) => console.error('FeedbackScreen: Error fetching lead statuses:', err));
// // // //   }, [dispatch]);

// // // //   useEffect(() => {
// // // //     if (selectedStatusId) {
// // // //       //('FeedbackScreen: Fetching status details for ID:', selectedStatusId);
// // // //       dispatch(fetchLeadStatusById(selectedStatusId))
// // // //         .unwrap()
// // // //         .catch((err) => console.error('FeedbackScreen: Error fetching status details:', err));
// // // //     }
// // // //   }, [dispatch, selectedStatusId]);

// // // //   useEffect(() => {
// // // //     return () => {
// // // //       //('FeedbackScreen: Cleaning up');
// // // //       dispatch(resetLeadStatusById());
// // // //       dispatch(resetFeedbackState());
// // // //     };
// // // //   }, [dispatch]);

// // // //   const handleDynamicFieldsSubmit = (data) => {
// // // //     //('FeedbackScreen: Received dynamic fields data', JSON.stringify(data, null, 2));
// // // //     setFormData(data);
// // // //   };

// // // //   const handleFilePick = async () => {
// // // //     try {
// // // //       if (Platform.OS === 'android') {
// // // //         const permission = Platform.Version >= 33 ? PERMISSIONS.ANDROID.READ_MEDIA_AUDIO : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
// // // //         const permissionResult = await check(permission);
// // // //         if (permissionResult !== RESULTS.GRANTED) {
// // // //           const requestResult = await request(permission);
// // // //           if (requestResult !== RESULTS.GRANTED) {
// // // //             if (requestResult === RESULTS.DENIED) {
// // // //               Toast.show({
// // // //                 type: 'error',
// // // //                 text1: 'Error',
// // // //                 text2: 'Permission to access audio files denied. Please enable it in settings.',
// // // //                 onPress: async () => {
// // // //                   try {
// // // //                     await openSettings();
// // // //                   } catch (err) {
// // // //                     console.error('FeedbackScreen: Error opening settings', err);
// // // //                   }
// // // //                 },
// // // //               });
// // // //             } else {
// // // //               Toast.show({
// // // //                 type: 'error',
// // // //                 text1: 'Error',
// // // //                 text2: 'Permission to access audio files blocked. Please enable it in settings.',
// // // //                 onPress: async () => {
// // // //                   try {
// // // //                     await openSettings();
// // // //                   } catch (err) {
// // // //                     console.error('FeedbackScreen: Error opening settings', err);
// // // //                   }
// // // //                 },
// // // //               });
// // // //             }
// // // //             return;
// // // //           }
// // // //         }
// // // //       }

// // // //       const pickerResult = await DocumentPicker.pick({
// // // //         type: [DocumentPicker.types.audio],
// // // //       });
// // // //       //('FeedbackScreen: File picked', pickerResult);
// // // //       setRecordingFile(pickerResult[0]);
// // // //     } catch (err) {
// // // //       if (DocumentPicker.isCancel(err)) {
// // // //         //('FeedbackScreen: File picking cancelled');
// // // //       } else {
// // // //         console.error('FeedbackScreen: Error picking file', err);
// // // //         Toast.show({
// // // //           type: 'error',
// // // //           text1: 'Error',
// // // //           text2: 'Failed to pick recording file.',
// // // //         });
// // // //       }
// // // //     }
// // // //   };

// // // //   const handleSubmit = async () => {
// // // //     //('FeedbackScreen: Submitting feedback', {
// // // //       selectedLeadStatus,
// // // //       selectedStatusId,
// // // //       formData,
// // // //       dialUpMethod,
// // // //       recordingFile,
// // // //     });

// // // //     if (!leadId || !/^[0-9a-fA-F]{24}$/.test(leadId)) {
// // // //       Toast.show({
// // // //         type: 'error',
// // // //         text1: 'Error',
// // // //         text2: 'Invalid or missing Lead ID.',
// // // //       });
// // // //       return;
// // // //     }
// // // //     if (!selectedLeadStatus || !selectedStatusId) {
// // // //       Toast.show({
// // // //         type: 'error',
// // // //         text1: 'Error',
// // // //         text2: 'Please select a status.',
// // // //       });
// // // //       return;
// // // //     }
// // // //     if (
// // // //       statusDetail.isPriority &&
// // // //       (!formData.priority || !['Important', 'High', 'Medium', 'Low'].includes(formData.priority))
// // // //     ) {
// // // //       Toast.show({
// // // //         type: 'error',
// // // //         text1: 'Error',
// // // //         text2: 'Please select a valid priority.',
// // // //       });
// // // //       return;
// // // //     }
// // // //     if (
// // // //       statusDetail.meeting?.required &&
// // // //       (!formData.nextFollowUpDate || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.*Z$/.test(formData.nextFollowUpDate))
// // // //     ) {
// // // //       Toast.show({
// // // //         type: 'error',
// // // //         text1: 'Error',
// // // //         text2: 'Please provide a valid meeting date and time.',
// // // //       });
// // // //       return;
// // // //     }
// // // //     if (
// // // //       statusDetail.estimation?.required &&
// // // //       (!formData.estimationBudget || isNaN(formData.estimationBudget) || Number(formData.estimationBudget) <= 0)
// // // //     ) {
// // // //       Toast.show({
// // // //         type: 'error',
// // // //         text1: 'Error',
// // // //         text2: 'Please enter a valid estimation budget.',
// // // //       });
// // // //       return;
// // // //     }
// // // //     if (
// // // //       statusDetail.estimation?.required &&
// // // //       (!formData.estimationDate || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.*Z$/.test(formData.estimationDate))
// // // //     ) {
// // // //       Toast.show({
// // // //         type: 'error',
// // // //         text1: 'Error',
// // // //         text2: 'Please provide a valid estimation date.',
// // // //       });
// // // //       return;
// // // //     }
// // // //     if (statusDetail.name === 'Active' && !formData.address?.trim()) {
// // // //       Toast.show({
// // // //         type: 'error',
// // // //         text1: 'Error',
// // // //         text2: 'Please provide an address.',
// // // //       });
// // // //       return;
// // // //     }
// // // //     if (statusDetail.name === 'Inactive' && !formData.reason?.trim()) {
// // // //       Toast.show({
// // // //         type: 'error',
// // // //         text1: 'Error',
// // // //         text2: 'Please provide a reason for inactivity.',
// // // //       });
// // // //       return;
// // // //     }
// // // //     if (!isManual && dialUpMethod?.recordedFile && !(await RNFS.exists(dialUpMethod.recordedFile))) {
// // // //       Toast.show({
// // // //         type: 'error',
// // // //         text1: 'Error',
// // // //         text2: 'Call recording file not found.',
// // // //       });
// // // //       return;
// // // //     }
// // // //     if (recordingFile && !(await RNFS.exists(recordingFile.uri))) {
// // // //       Toast.show({
// // // //         type: 'error',
// // // //         text1: 'Error',
// // // //         text2: 'Uploaded recording file not found.',
// // // //       });
// // // //       return;
// // // //     }

// // // //     try {
// // // //       const contactDateTime = new Date().toISOString();
// // // //       let callStartDateTime = '';
// // // //       let callEndDateTime = '';

// // // //       if (dialUpMethod && !isManual) {
// // // //         const isCallConnected =
// // // //           dialUpMethod.callStatus === 'Connected' ||
// // // //           (dialUpMethod.callDuration && parseFloat(dialUpMethod.callDuration) > 0);

// // // //         if (isCallConnected && dialUpMethod.callStartTime) {
// // // //           const startTime = new Date(dialUpMethod.callStartTime);
// // // //           if (!isNaN(startTime)) callStartDateTime = startTime.toISOString();
// // // //         }
// // // //         if (isCallConnected && dialUpMethod.callEndTime) {
// // // //           const endTime = new Date(dialUpMethod.callEndTime);
// // // //           if (!isNaN(endTime)) callEndDateTime = endTime.toISOString();
// // // //         }
// // // //       }

// // // //       const payload = {
// // // //         leadId,
// // // //         contactDateTime,
// // // //         nextFollowUpDate: formData.nextFollowUpDate || '',
// // // //         estimationDate: statusDetail.estimation?.required ? formData.estimationDate : '',
// // // //         estimationBudget: statusDetail.estimation?.required ? Number(formData.estimationBudget) : 0,
// // // //         priority: formData.priority || 'Medium',
// // // //         method: isManual ? 'Manual' : 'Call',
// // // //         status: selectedStatusId,
// // // //         description: statusDetail.showDescription ? formData.meetingDescription : '',
// // // //         address: statusDetail.name === 'Active' ? formData.address : '',
// // // //         reason: statusDetail.name === 'Inactive' ? formData.reason : '',
// // // //         recordingFile: recordingFile ? recordingFile.uri : '',
// // // //         ...(dialUpMethod && !isManual
// // // //           ? {
// // // //               dialUpMethod: {
// // // //                 phoneNumber: dialUpMethod.phoneNumber || '',
// // // //                 callType: dialUpMethod.callType || 'Outgoing',
// // // //                 callDuration: dialUpMethod.callDuration || '0.00',
// // // //                 formattedDuration: dialUpMethod.formattedDuration || '00:00',
// // // //                 callStatus: dialUpMethod.callStatus || 'Rejected',
// // // //                 recordedFile: dialUpMethod.recordedFile || '',
// // // //                 callSid: dialUpMethod.callSid || '',
// // // //                 callStartDateTime,
// // // //                 callEndDateTime,
// // // //               },
// // // //             }
// // // //           : {}),
// // // //       };

// // // //       //('FeedbackScreen: Submitting payload', JSON.stringify(payload, null, 2));
// // // //       await dispatch(postFeedback(payload)).unwrap();
// // // //       Toast.show({
// // // //         type: 'success',
// // // //         text1: 'Success',
// // // //         text2: 'Feedback submitted successfully!',
// // // //       });

// // // //       // Navigation logic to ensure bottom tab bar remains visible
// // // //       if (sourceScreen) {
// // // //         //('FeedbackScreen: Navigating back to source screen:', sourceScreen);
// // // //         const tabScreenMap = {
// // // //           LeadsScreen: 'Leads',
// // // //           Dashboard: 'Dashboard',
// // // //           ProfileScreen: 'Profile',
// // // //           LeadDetailsScreen: 'Leads', // Return to Leads tab after feedback
// // // //         };
// // // //         const targetScreen = tabScreenMap[sourceScreen] || sourceScreen;
// // // //         if (tabScreenMap[sourceScreen]) {
// // // //           navigation.navigate('HomeScreen', {
// // // //             screen: 'Main',
// // // //             params: {
// // // //               screen: targetScreen,
// // // //               params: { queryType },
// // // //             },
// // // //           });
// // // //         } else {
// // // //           navigation.navigate(targetScreen, { queryType });
// // // //         }
// // // //       } else {
// // // //         navigation.navigate('HomeScreen', {
// // // //           screen: 'Main',
// // // //           params: {
// // // //             screen: 'Leads',
// // // //           },
// // // //         });
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('FeedbackScreen: Submit error', JSON.stringify(error, null, 2));
// // // //       Toast.show({
// // // //         type: 'error',
// // // //         text1: 'Error',
// // // //         text2: error.message || feedbackError || 'Failed to submit feedback.',
// // // //       });
// // // //       dispatch(resetFeedbackState());
// // // //     }
// // // //   };

// // // //   return (
// // // //     <View style={localStyles.container}>
// // // //       <Header
// // // //         title="Feedback"
// // // //         showBackButton={true}
// // // //         onBackPress={() => {
// // // //           navigation.goBack();
// // // //         }}
// // // //       />
// // // //       <ScrollView
// // // //         contentContainerStyle={localStyles.scrollContentContainer}
// // // //         keyboardShouldPersistTaps="handled"
// // // //         showsVerticalScrollIndicator={false}
// // // //       >
// // // //         <Text style={localStyles.callInfoText}>
// // // //           {isManual ? 'Manual Feedback' : `Call to: ${phoneNumber} ${dialUpMethod?.formattedDuration ? `(${dialUpMethod.formattedDuration})` : ''}`}
// // // //         </Text>
// // // //         {dialUpMethod?.recordedFile && (
// // // //           <Text style={localStyles.callInfoText}>
// // // //             Recording: {dialUpMethod.recordedFile.split('/').pop()}
// // // //           </Text>
// // // //         )}

// // // //         {statusesLoading || statusLoading || feedbackLoading ? (
// // // //           <ActivityIndicator size="large" color="#0000ff" />
// // // //         ) : statusesError || statusError || feedbackError ? (
// // // //           <View>
// // // //             <Text style={localStyles.errorText}>
// // // //               Error: {statusesError || statusError || feedbackError || 'Failed to load data'}
// // // //             </Text>
// // // //             <CustomButton
// // // //               buttonName="Retry"
// // // //               onPress={() => {
// // // //                 dispatch(fetchAllLeadStatuses());
// // // //                 if (selectedStatusId) dispatch(fetchLeadStatusById(selectedStatusId));
// // // //               }}
// // // //               gradientColors={['#8290EA', '#3F4CA0']}
// // // //               height={56}
// // // //               width="100%"
// // // //               fontSize={RFPercentage(2)}
// // // //               fontWeight="semibold"
// // // //               accessibilityLabel="Retry loading data"
// // // //             />
// // // //           </View>
// // // //         ) : (
// // // //           <>
// // // //             <View>
// // // //               <Text className="text-gray-900 font-poppins text-sm">Upload Recording (Optional)</Text>
// // // //               <TouchableOpacity style={localStyles.uploadButton} onPress={handleFilePick}>
// // // //                 <Text style={localStyles.uploadButtonText}>
// // // //                   {recordingFile ? 'Change Recording' : 'Pick Recording File'}
// // // //                 </Text>
// // // //               </TouchableOpacity>
// // // //               {recordingFile && (
// // // //                 <Text style={localStyles.uploadedFileText}>Selected: {recordingFile.name}</Text>
// // // //               )}
// // // //             </View>
// // // //             <Text className="text-gray-900 font-poppins text-sm" style={{ marginTop: 20 }}>
// // // //               Select Status
// // // //             </Text>
// // // //             <Dropdown
// // // //               visible={leadStatusDropdownVisible}
// // // //               setVisible={setLeadStatusDropdownVisible}
// // // //               selectedValue={selectedLeadStatus}
// // // //               setSelectedValue={setSelectedLeadStatus}
// // // //               options={leadStatuses}
// // // //               placeholder="Select Status"
// // // //               setSelectedId={setSelectedStatusId}
// // // //             />
// // // //             <DynamicFields
// // // //               statusDetail={statusDetail}
// // // //               onSubmit={handleDynamicFieldsSubmit}
// // // //               initialData={formData}
// // // //             />
// // // //             <View style={localStyles.buttonContainer}>
// // // //               <CustomButton
// // // //                 buttonName={feedbackLoading ? 'Submitting...' : 'Submit'}
// // // //                 onPress={handleSubmit}
// // // //                 height={56}
// // // //                 width="60%"
// // // //                 containerStyle={{
// // // //                   borderRadius: 8,
// // // //                 }}
// // // //                 accessibilityLabel="Submit feedback"
// // // //                 disabled={feedbackLoading}
// // // //               />
// // // //             </View>
// // // //           </>
// // // //         )}
// // // //       </ScrollView>
// // // //       <Toast config={toastConfig} />
// // // //     </View>
// // // //   );
// // // // };

// // // // export default FeedbackScreen;

// // // import React, { useState, useEffect } from 'react';
// // // import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, Platform, ScrollView } from 'react-native';
// // // import { useDispatch, useSelector } from 'react-redux';
// // // import DocumentPicker from 'react-native-document-picker';
// // // import RNFS from 'react-native-fs';
// // // import { check, request, PERMISSIONS, RESULTS, openSettings } from 'react-native-permissions';
// // // import { fetchAllLeadStatuses } from '../../redux/slices/getAllLeadStatusSlice';
// // // import { fetchLeadStatusById, resetLeadStatusById } from '../../redux/slices/getLeadStatusByIdSlice';
// // // import { postFeedback, resetFeedbackState } from '../../redux/slices/postFeedbackSlice';
// // // import { getLatestCallLog } from '../phone/CallLogs';
// // // import Dropdown from './Dropdown';
// // // import DynamicFields from './DynamicFields';
// // // import Header from '../../component/Header';
// // // import CustomButton from '../../component/CustomButton';
// // // import Toast from 'react-native-toast-message';
// // // import { toastConfig } from '../../component/toastConfig';
// // // import { RFPercentage } from 'react-native-responsive-fontsize';

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     flex: 1,
// // //     backgroundColor: '#FFFFFF',
// // //   },
// // //   scrollContent: {
// // //     padding: 20,
// // //     paddingBottom: 40,
// // //   },
// // //   labelText: {
// // //     fontSize: RFPercentage(1.8),
// // //     color: '#333333',
// // //     marginBottom: 8,
// // //     fontWeight: '500',
// // //   },
// // //   infoText: {
// // //     fontSize: RFPercentage(1.8),
// // //     color: '#333333',
// // //     marginBottom: 16,
// // //   },
// // //   errorText: {
// // //     fontSize: RFPercentage(1.8),
// // //     color: '#EF4444',
// // //     marginBottom: 16,
// // //   },
// // //   uploadButton: {
// // //     borderWidth: 1,
// // //     borderColor: '#8290EA',
// // //     borderRadius: 8,
// // //     padding: 12,
// // //     marginTop: 8,
// // //     alignItems: 'center',
// // //   },
// // //   uploadButtonText: {
// // //     color: '#3F4CA0',
// // //     fontSize: RFPercentage(2),
// // //     fontWeight: '500',
// // //   },
// // //   uploadedFileText: {
// // //     fontSize: RFPercentage(1.6),
// // //     color: '#333333',
// // //     marginTop: 8,
// // //   },
// // //   buttonContainer: {
// // //     alignItems: 'center',
// // //     marginTop: 24,
// // //   },
// // // });

// // // const FeedbackScreen = ({ route, navigation }) => {
// // //   const { phoneNumber = 'N/A', leadId, isManual = false, sourceScreen, queryType } = route.params || {};
// // //   const dispatch = useDispatch();

// // //   const [selectedLeadStatus, setSelectedLeadStatus] = useState('');
// // //   const [selectedStatusId, setSelectedStatusId] = useState('');
// // //   const [leadStatusDropdownVisible, setLeadStatusDropdownVisible] = useState(false);
// // //   const [dialUpMethod, setDialUpMethod] = useState(null);
// // //   const [formData, setFormData] = useState({});
// // //   const [recordingFile, setRecordingFile] = useState(null);

// // //   const { leadStatuses = [], loading: statusesLoading, error: statusesError } = useSelector(
// // //     (state) => state.leadStatus || {}
// // //   );
// // //   const { data: leadStatusDetail = {}, loading: statusLoading, error: statusError } = useSelector(
// // //     (state) => state.leadStatusById || {}
// // //   );
// // //   const { loading: feedbackLoading, error: feedbackError } = useSelector(
// // //     (state) => state.postFeedback || {}
// // //   );

// // //   const statusDetail = {
// // //     ...leadStatusDetail?.data,
// // //     meeting: {
// // //       required: leadStatusDetail?.data?.meeting?.required || false,
// // //       dateLabel: leadStatusDetail?.data?.meeting?.dateLabel || 'Meeting Date',
// // //       timeLabel: leadStatusDetail?.data?.meeting?.timeLabel || 'Meeting Time',
// // //     },
// // //     estimation: {
// // //       required: leadStatusDetail?.data?.estimation?.required || false,
// // //       dateLabel: leadStatusDetail?.data?.estimation?.dateLabel || 'Estimation Date',
// // //       budgetLabel: leadStatusDetail?.data?.estimation?.budgetLabel || 'Estimation Budget',
// // //     },
// // //     showDescription: leadStatusDetail?.data?.showDescription || false,
// // //     isPriority: leadStatusDetail?.data?.isPriority || false,
// // //     descriptionLabel: leadStatusDetail?.data?.descriptionLabel || 'Description',
// // //     name: leadStatusDetail?.data?.name || '',
// // //   };

// // //   useEffect(() => {
// // //     const fetchCallLog = async () => {
// // //       if (isManual || !phoneNumber || phoneNumber === 'N/A') {
// // //         setDialUpMethod(null);
// // //         return;
// // //       }

// // //       try {
// // //         const callLog = await getLatestCallLog(phoneNumber);
// // //         setDialUpMethod(
// // //           callLog
// // //             ? {
// // //                 phoneNumber: callLog.phoneNumber || phoneNumber,
// // //                 callType: 'Outgoing',
// // //                 callDuration: callLog.callDuration || '0.00',
// // //                 formattedDuration: callLog.formattedDuration || '00:00',
// // //                 callStatus: callLog.callStatus || 'Rejected',
// // //                 recordedFile: callLog.recordedFile || '',
// // //                 callSid: '',
// // //                 callStartTime: callLog.callStartTime || '',
// // //                 callEndTime: callLog.callEndTime || '',
// // //               }
// // //             : {
// // //                 phoneNumber,
// // //                 callType: 'Outgoing',
// // //                 callDuration: '0.00',
// // //                 formattedDuration: '00:00',
// // //                 callStatus: 'Rejected',
// // //                 recordedFile: '',
// // //                 callSid: '',
// // //                 callStartTime: '',
// // //                 callEndTime: '',
// // //               }
// // //         );
// // //       } catch (error) {
// // //         console.error('FeedbackScreen: Error fetching call log', error);
// // //         Toast.show({
// // //           type: 'error',
// // //           text1: 'Error',
// // //           text2: 'Failed to fetch call log.',
// // //         });
// // //       }
// // //     };

// // //     fetchCallLog();
// // //   }, [phoneNumber, isManual]);

// // //   useEffect(() => {
// // //     dispatch(fetchAllLeadStatuses()).catch((error) =>
// // //       console.error('FeedbackScreen: Error fetching lead statuses', error)
// // //     );
// // //   }, [dispatch]);

// // //   useEffect(() => {
// // //     if (selectedStatusId) {
// // //       dispatch(fetchLeadStatusById(selectedStatusId)).catch((error) =>
// // //         console.error('FeedbackScreen: Error fetching status details', error)
// // //       );
// // //     }
// // //   }, [dispatch, selectedStatusId]);

// // //   useEffect(() => {
// // //     return () => {
// // //       dispatch(resetLeadStatusById());
// // //       dispatch(resetFeedbackState());
// // //     };
// // //   }, [dispatch]);

// // //   const handleDynamicFieldsSubmit = (data) => {
// // //     setFormData(data);
// // //   };

// // //   const handleFilePick = async () => {
// // //     try {
// // //       const permission =
// // //         Platform.OS === 'android' && Platform.Version >= 33
// // //           ? PERMISSIONS.ANDROID.READ_MEDIA_AUDIO
// // //           : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
// // //       const permissionResult = await check(permission);

// // //       if (permissionResult !== RESULTS.GRANTED) {
// // //         const requestResult = await request(permission);
// // //         if (requestResult !== RESULTS.GRANTED) {
// // //           Toast.show({
// // //             type: 'error',
// // //             text1: 'Permission Denied',
// // //             text2: `Please enable ${Platform.Version >= 33 ? 'audio' : 'storage'} access in settings.`,
// // //             onPress: () => openSettings().catch((err) => console.error('Error opening settings', err)),
// // //           });
// // //           return;
// // //         }
// // //       }

// // //       const pickerResult = await DocumentPicker.pick({
// // //         type: [DocumentPicker.types.audio],
// // //       });
// // //       setRecordingFile(pickerResult[0]);
// // //     } catch (error) {
// // //       if (DocumentPicker.isCancel(error)) {
// // //         //('FeedbackScreen: File picking cancelled');
// // //       } else {
// // //         console.error('FeedbackScreen: Error picking file', error);
// // //         Toast.show({
// // //           type: 'error',
// // //           text1: 'Error',
// // //           text2: 'Failed to pick audio file.',
// // //         });
// // //       }
// // //     }
// // //   };

// // //   const handleSubmit = async () => {
// // //     if (!leadId || !/^[0-9a-fA-F]{24}$/.test(leadId)) {
// // //       Toast.show({ type: 'error', text1: 'Error', text2: 'Invalid Lead ID.' });
// // //       return;
// // //     }
// // //     if (!selectedLeadStatus || !selectedStatusId) {
// // //       Toast.show({ type: 'error', text1: 'Error', text2: 'Please select a status.' });
// // //       return;
// // //     }
// // //     if (statusDetail.isPriority && !['Important', 'High', 'Medium', 'Low'].includes(formData.priority)) {
// // //       Toast.show({ type: 'error', text1: 'Error', text2: 'Please select a valid priority.' });
// // //       return;
// // //     }
// // //     if (
// // //       statusDetail.meeting?.required &&
// // //       (!formData.nextFollowUpDate || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.*Z$/.test(formData.nextFollowUpDate))
// // //     ) {
// // //       Toast.show({ type: 'error', text1: 'Error', text2: 'Please provide a valid meeting date and time.' });
// // //       return;
// // //     }
// // //     if (
// // //       statusDetail.estimation?.required &&
// // //       (!formData.estimationBudget || isNaN(formData.estimationBudget) || Number(formData.estimationBudget) <= 0)
// // //     ) {
// // //       Toast.show({ type: 'error', text1: 'Error', text2: 'Please enter a valid estimation budget.' });
// // //       return;
// // //     }
// // //     if (
// // //       statusDetail.estimation?.required &&
// // //       (!formData.estimationDate || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.*Z$/.test(formData.estimationDate))
// // //     ) {
// // //       Toast.show({ type: 'error', text1: 'Error', text2: 'Please provide a valid estimation date.' });
// // //       return;
// // //     }
// // //     if (statusDetail.name === 'Active' && !formData.address?.trim()) {
// // //       Toast.show({ type: 'error', text1: 'Error', text2: 'Please provide an address.' });
// // //       return;
// // //     }
// // //     if (statusDetail.name === 'Inactive' && !formData.reason?.trim()) {
// // //       Toast.show({ type: 'error', text1: 'Error', text2: 'Please provide a reason for inactivity.' });
// // //       return;
// // //     }
// // //     if (!isManual && dialUpMethod?.recordedFile) {
// // //       try {
// // //         const exists = await RNFS.exists(dialUpMethod.recordedFile);
// // //         if (!exists) {
// // //           Toast.show({ type: 'error', text1: 'Error', text2: 'Call recording file not found.' });
// // //           return;
// // //         }
// // //       } catch (error) {
// // //         console.error('FeedbackScreen: Error checking call recording', error);
// // //         Toast.show({ type: 'error', text1: 'Error', text2: 'Error accessing call recording.' });
// // //         return;
// // //       }
// // //     }
// // //     if (recordingFile) {
// // //       try {
// // //         const exists = await RNFS.exists(recordingFile.uri);
// // //         if (!exists) {
// // //           Toast.show({ type: 'error', text1: 'Error', text2: 'Uploaded audio file not found.' });
// // //           return;
// // //         }
// // //       } catch (error) {
// // //         console.error('FeedbackScreen: Error checking uploaded file', error);
// // //         Toast.show({ type: 'error', text1: 'Error', text2: 'Error accessing uploaded audio.' });
// // //         return;
// // //       }
// // //     }

// // //     try {
// // //       const contactDateTime = new Date().toISOString();
// // //       let callStartDateTime = '';
// // //       let callEndDateTime = '';

// // //       if (dialUpMethod && !isManual) {
// // //         const isCallConnected =
// // //           dialUpMethod.callStatus === 'Connected' || parseFloat(dialUpMethod.callDuration) > 0;
// // //         if (isCallConnected && dialUpMethod.callStartTime) {
// // //           const startTime = new Date(dialUpMethod.callStartTime);
// // //           if (!isNaN(startTime)) callStartDateTime = startTime.toISOString();
// // //         }
// // //         if (isCallConnected && dialUpMethod.callEndTime) {
// // //           const endTime = new Date(dialUpMethod.callEndTime);
// // //           if (!isNaN(endTime)) callEndDateTime = endTime.toISOString();
// // //         }
// // //       }

// // //       const payload = {
// // //         leadId,
// // //         contactDateTime,
// // //         nextFollowUpDate: formData.nextFollowUpDate || '',
// // //         estimationDate: statusDetail.estimation?.required ? formData.estimationDate : '',
// // //         estimationBudget: statusDetail.estimation?.required ? Number(formData.estimationBudget) : 0,
// // //         priority: formData.priority || 'Medium',
// // //         method: isManual ? 'Manual' : 'Call',
// // //         status: selectedStatusId,
// // //         description: statusDetail.showDescription ? formData.meetingDescription : '',
// // //         address: statusDetail.name === 'Active' ? formData.address : '',
// // //         reason: statusDetail.name === 'Inactive' ? formData.reason : '',
// // //         recordingFile: recordingFile ? recordingFile.uri : '',
// // //         ...(dialUpMethod && !isManual
// // //           ? {
// // //               dialUpMethod: {
// // //                 phoneNumber: dialUpMethod.phoneNumber || '',
// // //                 callType: dialUpMethod.callType || 'Outgoing',
// // //                 callDuration: dialUpMethod.callDuration || '0.00',
// // //                 formattedDuration: dialUpMethod.formattedDuration || '00:00',
// // //                 callStatus: dialUpMethod.callStatus || 'Rejected',
// // //                 recordedFile: dialUpMethod.recordedFile || '',
// // //                 callSid: dialUpMethod.callSid || '',
// // //                 callStartDateTime,
// // //                 callEndDateTime,
// // //               },
// // //             }
// // //           : {}),
// // //       };

// // //       await dispatch(postFeedback(payload)).unwrap();
// // //       Toast.show({
// // //         type: 'success',
// // //         text1: 'Success',
// // //         text2: 'Feedback submitted successfully!',
// // //       });

// // //       // Simplified navigation
// // //       const targetScreen = sourceScreen
// // //         ? {
// // //             LeadsScreen: 'Leads',
// // //             Dashboard: 'Dashboard',
// // //             ProfileScreen: 'Profile',
// // //             LeadDetailsScreen: 'Leads',
// // //           }[sourceScreen] || 'Leads'
// // //         : 'Leads';

// // //       navigation.navigate('HomeScreen', {
// // //         screen: 'Main',
// // //         params: { screen: targetScreen, params: { queryType } },
// // //       });
// // //     } catch (error) {
// // //       console.error('FeedbackScreen: Submit error', error);
// // //       Toast.show({
// // //         type: 'error',
// // //         text1: 'Error',
// // //         text2: error.message || feedbackError || 'Failed to submit feedback.',
// // //       });
// // //       dispatch(resetFeedbackState());
// // //     }
// // //   };

// // //   return (
// // //     <View style={styles.container}>
// // //       <Header
// // //         title="Feedback"
// // //         showBackButton
// // //         onBackPress={() => navigation.goBack()}
// // //       />
// // //       <ScrollView
// // //         contentContainerStyle={styles.scrollContent}
// // //         keyboardShouldPersistTaps="handled"
// // //         showsVerticalScrollIndicator={false}
// // //       >
// // //         <Text style={styles.infoText}>
// // //           {isManual ? 'Manual Feedback' : `Call to: ${phoneNumber} ${dialUpMethod?.formattedDuration ? `(${dialUpMethod.formattedDuration})` : ''}`}
// // //         </Text>
// // //         {dialUpMethod?.recordedFile && (
// // //           <Text style={styles.infoText}>Recording: {dialUpMethod.recordedFile.split('/').pop()}</Text>
// // //         )}

// // //         {statusesLoading || statusLoading || feedbackLoading ? (
// // //           <ActivityIndicator size="large" color="#3F4CA0" />
// // //         ) : statusesError || statusError || feedbackError ? (
// // //           <View>
// // //             <Text style={styles.errorText}>{statusesError || statusError || feedbackError}</Text>
// // //             <CustomButton
// // //               buttonName="Retry"
// // //               onPress={() => {
// // //                 dispatch(fetchAllLeadStatuses());
// // //                 if (selectedStatusId) dispatch(fetchLeadStatusById(selectedStatusId));
// // //               }}
// // //               gradientColors={['#8290EA', '#3F4CA0']}
// // //               height={56}
// // //               width="100%"
// // //               fontSize={RFPercentage(2)}
// // //               fontWeight="600"
// // //               accessibilityLabel="Retry loading data"
// // //             />
// // //           </View>
// // //         ) : (
// // //           <>
// // //             <Text style={styles.labelText}>Upload Recording (Optional)</Text>
// // //             <TouchableOpacity style={styles.uploadButton} onPress={handleFilePick}>
// // //               <Text style={styles.uploadButtonText}>
// // //                 {recordingFile ? 'Change Recording' : 'Pick Audio File'}
// // //               </Text>
// // //             </TouchableOpacity>
// // //             {recordingFile && (
// // //               <Text style={styles.uploadedFileText}>Selected: {recordingFile.name}</Text>
// // //             )}

// // //             <Text style={[styles.labelText, { marginTop: 20 }]}>Select Status</Text>
// // //             <Dropdown
// // //               visible={leadStatusDropdownVisible}
// // //               setVisible={setLeadStatusDropdownVisible}
// // //               selectedValue={selectedLeadStatus}
// // //               setSelectedValue={setSelectedLeadStatus}
// // //               options={leadStatuses}
// // //               placeholder="Select Status"
// // //               setSelectedId={setSelectedStatusId}
// // //             />
// // //             <DynamicFields
// // //               statusDetail={statusDetail}
// // //               onSubmit={handleDynamicFieldsSubmit}
// // //               initialData={formData}
// // //             />
// // //             <View style={styles.buttonContainer}>
// // //               <CustomButton
// // //                 buttonName={feedbackLoading ? 'Submitting...' : 'Submit'}
// // //                 onPress={handleSubmit}
// // //                 height={56}
// // //                 width="60%"
// // //                 containerStyle={{ borderRadius: 8 }}
// // //                 gradientColors={['#8290EA', '#3F4CA0']}
// // //                 fontSize={RFPercentage(2)}
// // //                 fontWeight="600"
// // //                 accessibilityLabel="Submit feedback"
// // //                 disabled={feedbackLoading}
// // //               />
// // //             </View>
// // //           </>
// // //         )}
// // //       </ScrollView>
// // //       <Toast config={toastConfig} />
// // //     </View>
// // //   );
// // // };

// // // export default FeedbackScreen;


// // import React, { useState, useEffect } from 'react';
// // import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, Platform, ScrollView } from 'react-native';
// // import { useDispatch, useSelector } from 'react-redux';
// // import FilePicker from 'react-native-file-picker';
// // import RNFS from 'react-native-fs';
// // import { check, request, PERMISSIONS, RESULTS, openSettings } from 'react-native-permissions';
// // import { fetchAllLeadStatuses } from '../../redux/slices/getAllLeadStatusSlice';
// // import { fetchLeadStatusById, resetLeadStatusById } from '../../redux/slices/getLeadStatusByIdSlice';
// // import { postFeedback, resetFeedbackState } from '../../redux/slices/postFeedbackSlice';
// // import { getLatestCallLog } from '../phone/CallLogs';
// // import Dropdown from './Dropdown';
// // import DynamicFields from './DynamicFields';
// // import Header from '../../component/Header';
// // import CustomButton from '../../component/CustomButton';
// // import Toast from 'react-native-toast-message';
// // import { toastConfig } from '../../component/toastConfig';
// // import { RFPercentage } from 'react-native-responsive-fontsize';

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#FFFFFF',
// //   },
// //   scrollContent: {
// //     padding: 20,
// //     paddingBottom: 40,
// //   },
// //   labelText: {
// //     fontSize: RFPercentage(1.8),
// //     color: '#333333',
// //     marginBottom: 8,
// //     fontWeight: '500',
// //   },
// //   infoText: {
// //     fontSize: RFPercentage(1.8),
// //     color: '#333333',
// //     marginBottom: 16,
// //   },
// //   errorText: {
// //     fontSize: RFPercentage(1.8),
// //     color: '#EF4444',
// //     marginBottom: 16,
// //   },
// //   uploadButton: {
// //     borderWidth: 1,
// //     borderColor: '#8290EA',
// //     borderRadius: 8,
// //     padding: 12,
// //     marginTop: 8,
// //     alignItems: 'center',
// //   },
// //   uploadButtonText: {
// //     color: '#3F4CA0',
// //     fontSize: RFPercentage(2),
// //     fontWeight: '500',
// //   },
// //   uploadedFileText: {
// //     fontSize: RFPercentage(1.6),
// //     color: '#333333',
// //     marginTop: 8,
// //   },
// //   buttonContainer: {
// //     alignItems: 'center',
// //     marginTop: 24,
// //   },
// // });

// // const FeedbackScreen = ({ route, navigation }) => {
// //   const { phoneNumber = 'N/A', leadId, isManual = false, sourceScreen, queryType } = route.params || {};
// //   const dispatch = useDispatch();

// //   const [selectedLeadStatus, setSelectedLeadStatus] = useState('');
// //   const [selectedStatusId, setSelectedStatusId] = useState('');
// //   const [leadStatusDropdownVisible, setLeadStatusDropdownVisible] = useState(false);
// //   const [dialUpMethod, setDialUpMethod] = useState(null);
// //   const [formData, setFormData] = useState({});
// //   const [recordingFile, setRecordingFile] = useState(null);

// //   const { leadStatuses = [], loading: statusesLoading, error: statusesError } = useSelector(
// //     (state) => state.leadStatus || {}
// //   );
// //   const { data: leadStatusDetail = {}, loading: statusLoading, error: statusError } = useSelector(
// //     (state) => state.leadStatusById || {}
// //   );
// //   const { loading: feedbackLoading, error: feedbackError } = useSelector(
// //     (state) => state.postFeedback || {}
// //   );

// //   const statusDetail = {
// //     ...leadStatusDetail?.data,
// //     meeting: {
// //       required: leadStatusDetail?.data?.meeting?.required || false,
// //       dateLabel: leadStatusDetail?.data?.meeting?.dateLabel || 'Meeting Date',
// //       timeLabel: leadStatusDetail?.data?.meeting?.timeLabel || 'Meeting Time',
// //     },
// //     estimation: {
// //       required: leadStatusDetail?.data?.estimation?.required || false,
// //       dateLabel: leadStatusDetail?.data?.estimation?.dateLabel || 'Estimation Date',
// //       budgetLabel: leadStatusDetail?.data?.estimation?.budgetLabel || 'Estimation Budget',
// //     },
// //     showDescription: leadStatusDetail?.data?.showDescription || false,
// //     isPriority: leadStatusDetail?.data?.isPriority || false,
// //     descriptionLabel: leadStatusDetail?.data?.descriptionLabel || 'Description',
// //     name: leadStatusDetail?.data?.name || '',
// //   };

// //   useEffect(() => {
// //     const fetchCallLog = async () => {
// //       if (isManual || !phoneNumber || phoneNumber === 'N/A') {
// //         setDialUpMethod(null);
// //         return;
// //       }

// //       try {
// //         const callLog = await getLatestCallLog(phoneNumber);
// //         setDialUpMethod(
// //           callLog
// //             ? {
// //                 phoneNumber: callLog.phoneNumber || phoneNumber,
// //                 callType: 'Outgoing',
// //                 callDuration: callLog.callDuration || '0.00',
// //                 formattedDuration: callLog.formattedDuration || '00:00',
// //                 callStatus: callLog.callStatus || 'Rejected',
// //                 recordedFile: callLog.recordedFile || '',
// //                 callSid: '',
// //                 callStartTime: callLog.callStartTime || '',
// //                 callEndTime: callLog.callEndTime || '',
// //               }
// //             : {
// //                 phoneNumber,
// //                 callType: 'Outgoing',
// //                 callDuration: '0.00',
// //                 formattedDuration: '00:00',
// //                 callStatus: 'Rejected',
// //                 recordedFile: '',
// //                 callSid: '',
// //                 callStartTime: '',
// //                 callEndTime: '',
// //               }
// //         );
// //       } catch (error) {
// //         console.error('FeedbackScreen: Error fetching call log', error);
// //         Toast.show({
// //           type: 'error',
// //           text1: 'Error',
// //           text2: 'Failed to fetch call log.',
// //         });
// //       }
// //     };

// //     fetchCallLog();
// //   }, [phoneNumber, isManual]);

// //   useEffect(() => {
// //     dispatch(fetchAllLeadStatuses()).catch((error) =>
// //       console.error('FeedbackScreen: Error fetching lead statuses', error)
// //     );
// //   }, [dispatch]);

// //   useEffect(() => {
// //     if (selectedStatusId) {
// //       dispatch(fetchLeadStatusById(selectedStatusId)).catch((error) =>
// //         console.error('FeedbackScreen: Error fetching status details', error)
// //       );
// //     }
// //   }, [dispatch, selectedStatusId]);

// //   useEffect(() => {
// //     return () => {
// //       dispatch(resetLeadStatusById());
// //       dispatch(resetFeedbackState());
// //     };
// //   }, [dispatch]);

// //   const handleDynamicFieldsSubmit = (data) => {
// //     setFormData(data);
// //   };

// //   const handleFilePick = async () => {
// //     try {
// //       const permission =
// //         Platform.OS === 'android' && Platform.Version >= 33
// //           ? PERMISSIONS.ANDROID.READ_MEDIA_AUDIO
// //           : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
// //       const permissionResult = await check(permission);

// //       if (permissionResult !== RESULTS.GRANTED) {
// //         const requestResult = await request(permission);
// //         if (requestResult !== RESULTS.GRANTED) {
// //           Toast.show({
// //             type: 'error',
// //             text1: 'Permission Denied',
// //             text2: `Please enable ${Platform.Version >= 33 ? 'audio' : 'storage'} access in settings.`,
// //             onPress: () => openSettings().catch((err) => console.error('Error opening settings', err)),
// //           });
// //           return;
// //         }
// //       }

// //       FilePicker.showFilePicker(
// //         {
// //           type: 'audio/*', // Restrict to audio files
// //         },
// //         (response) => {
// //           if (response.didCancel) {
// //             //('FeedbackScreen: File picking cancelled');
// //           } else if (response.error) {
// //             console.error('FeedbackScreen: Error picking file', response.error);
// //             Toast.show({
// //               type: 'error',
// //               text1: 'Error',
// //               text2: 'Failed to pick audio file.',
// //             });
// //           } else {
// //             setRecordingFile({
// //               uri: response.uri,
// //               name: response.fileName || 'audio_file',
// //               type: response.type || 'audio/mpeg',
// //             });
// //           }
// //         }
// //       );
// //     } catch (error) {
// //       console.error('FeedbackScreen: Error picking file', error);
// //       Toast.show({
// //         type: 'error',
// //         text1: 'Error',
// //         text2: 'Failed to pick audio file.',
// //       });
// //     }
// //   };

// //   const handleSubmit = async () => {
// //     if (!leadId || !/^[0-9a-fA-F]{24}$/.test(leadId)) {
// //       Toast.show({ type: 'error', text1: 'Error', text2: 'Invalid Lead ID.' });
// //       return;
// //     }
// //     if (!selectedLeadStatus || !selectedStatusId) {
// //       Toast.show({ type: 'error', text1: 'Error', text2: 'Please select a status.' });
// //       return;
// //     }
// //     if (statusDetail.isPriority && !['Important', 'High', 'Medium', 'Low'].includes(formData.priority)) {
// //       Toast.show({ type: 'error', text1: 'Error', text2: 'Please select a valid priority.' });
// //       return;
// //     }
// //     if (
// //       statusDetail.meeting?.required &&
// //       (!formData.nextFollowUpDate || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.*Z$/.test(formData.nextFollowUpDate))
// //     ) {
// //       Toast.show({ type: 'error', text1: 'Error', text2: 'Please provide a valid meeting date and time.' });
// //       return;
// //     }
// //     if (
// //       statusDetail.estimation?.required &&
// //       (!formData.estimationBudget || isNaN(formData.estimationBudget) || Number(formData.estimationBudget) <= 0)
// //     ) {
// //       Toast.show({ type: 'error', text1: 'Error', text2: 'Please enter a valid estimation budget.' });
// //       return;
// //     }
// //     if (
// //       statusDetail.estimation?.required &&
// //       (!formData.estimationDate || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.*Z$/.test(formData.estimationDate))
// //     ) {
// //       Toast.show({ type: 'error', text1: 'Error', text2: 'Please provide a valid estimation date.' });
// //       return;
// //     }
// //     if (statusDetail.name === 'Active' && !formData.address?.trim()) {
// //       Toast.show({ type: 'error', text1: 'Error', text2: 'Please provide an address.' });
// //       return;
// //     }
// //     if (statusDetail.name === 'Inactive' && !formData.reason?.trim()) {
// //       Toast.show({ type: 'error', text1: 'Error', text2: 'Please provide a reason for inactivity.' });
// //       return;
// //     }
// //     if (!isManual && dialUpMethod?.recordedFile) {
// //       try {
// //         const exists = await RNFS.exists(dialUpMethod.recordedFile);
// //         if (!exists) {
// //           Toast.show({ type: 'error', text1: 'Error', text2: 'Call recording file not found.' });
// //           return;
// //         }
// //       } catch (error) {
// //         console.error('FeedbackScreen: Error checking call recording', error);
// //         Toast.show({ type: 'error', text1: 'Error', text2: 'Error accessing call recording.' });
// //         return;
// //       }
// //     }
// //     if (recordingFile) {
// //       try {
// //         const exists = await RNFS.exists(recordingFile.uri);
// //         if (!exists) {
// //           Toast.show({ type: 'error', text1: 'Error', text2: 'Uploaded audio file not found.' });
// //           return;
// //         }
// //       } catch (error) {
// //         console.error('FeedbackScreen: Error checking uploaded file', error);
// //         Toast.show({ type: 'error', text1: 'Error', text2: 'Error accessing uploaded audio.' });
// //         return;
// //       }
// //     }

// //     try {
// //       const contactDateTime = new Date().toISOString();
// //       let callStartDateTime = '';
// //       let callEndDateTime = '';

// //       if (dialUpMethod && !isManual) {
// //         const isCallConnected =
// //           dialUpMethod.callStatus === 'Connected' || parseFloat(dialUpMethod.callDuration) > 0;
// //         if (isCallConnected && dialUpMethod.callStartTime) {
// //           const startTime = new Date(dialUpMethod.callStartTime);
// //           if (!isNaN(startTime)) callStartDateTime = startTime.toISOString();
// //         }
// //         if (isCallConnected && dialUpMethod.callEndTime) {
// //           const endTime = new Date(dialUpMethod.callEndTime);
// //           if (!isNaN(endTime)) callEndDateTime = endTime.toISOString();
// //         }
// //       }

// //       const payload = {
// //         leadId,
// //         contactDateTime,
// //         nextFollowUpDate: formData.nextFollowUpDate || '',
// //         estimationDate: statusDetail.estimation?.required ? formData.estimationDate : '',
// //         estimationBudget: statusDetail.estimation?.required ? Number(formData.estimationBudget) : 0,
// //         priority: formData.priority || 'Medium',
// //         method: isManual ? 'Manual' : 'Call',
// //         status: selectedStatusId,
// //         description: statusDetail.showDescription ? formData.meetingDescription : '',
// //         address: statusDetail.name === 'Active' ? formData.address : '',
// //         reason: statusDetail.name === 'Inactive' ? formData.reason : '',
// //         recordingFile: recordingFile ? recordingFile.uri : '',
// //         ...(dialUpMethod && !isManual
// //           ? {
// //               dialUpMethod: {
// //                 phoneNumber: dialUpMethod.phoneNumber || '',
// //                 callType: dialUpMethod.callType || 'Outgoing',
// //                 callDuration: dialUpMethod.callDuration || '0.00',
// //                 formattedDuration: dialUpMethod.formattedDuration || '00:00',
// //                 callStatus: dialUpMethod.callStatus || 'Rejected',
// //                 recordedFile: dialUpMethod.recordedFile || '',
// //                 callSid: dialUpMethod.callSid || '',
// //                 callStartDateTime,
// //                 callEndDateTime,
// //               },
// //             }
// //           : {}),
// //       };

// //       await dispatch(postFeedback(payload)).unwrap();
// //       Toast.show({
// //         type: 'success',
// //         text1: 'Success',
// //         text2: 'Feedback submitted successfully!',
// //       });

// //       const targetScreen = sourceScreen
// //         ? {
// //             LeadsScreen: 'Leads',
// //             Dashboard: 'Dashboard',
// //             ProfileScreen: 'Profile',
// //             LeadDetailsScreen: 'Leads',
// //           }[sourceScreen] || 'Leads'
// //         : 'Leads';

// //       navigation.navigate('HomeScreen', {
// //         screen: 'Main',
// //         params: { screen: targetScreen, params: { queryType } },
// //       });
// //     } catch (error) {
// //       console.error('FeedbackScreen: Submit error', error);
// //       Toast.show({
// //         type: 'error',
// //         text1: 'Error',
// //         text2: error.message || feedbackError || 'Failed to submit feedback.',
// //       });
// //       dispatch(resetFeedbackState());
// //     }
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <Header
// //         title="Feedback"
// //         showBackButton
// //         onBackPress={() => navigation.goBack()}
// //       />
// //       <ScrollView
// //         contentContainerStyle={styles.scrollContent}
// //         keyboardShouldPersistTaps="handled"
// //         showsVerticalScrollIndicator={false}
// //       >
// //         <Text style={styles.infoText}>
// //           {isManual ? 'Manual Feedback' : `Call to: ${phoneNumber} ${dialUpMethod?.formattedDuration ? `(${dialUpMethod.formattedDuration})` : ''}`}
// //         </Text>
// //         {dialUpMethod?.recordedFile && (
// //           <Text style={styles.infoText}>Recording: {dialUpMethod.recordedFile.split('/').pop()}</Text>
// //         )}

// //         {statusesLoading || statusLoading || feedbackLoading ? (
// //           <ActivityIndicator size="large" color="#3F4CA0" />
// //         ) : statusesError || statusError || feedbackError ? (
// //           <View>
// //             <Text style={styles.errorText}>{statusesError || statusError || feedbackError}</Text>
// //             <CustomButton
// //               buttonName="Retry"
// //               onPress={() => {
// //                 dispatch(fetchAllLeadStatuses());
// //                 if (selectedStatusId) dispatch(fetchLeadStatusById(selectedStatusId));
// //               }}
// //               gradientColors={['#8290EA', '#3F4CA0']}
// //               height={56}
// //               width="100%"
// //               fontSize={RFPercentage(2)}
// //               fontWeight="600"
// //               accessibilityLabel="Retry loading data"
// //             />
// //           </View>
// //         ) : (
// //           <>
// //             <Text style={styles.labelText}>Upload Recording (Optional)</Text>
// //             <TouchableOpacity style={styles.uploadButton} onPress={handleFilePick}>
// //               <Text style={styles.uploadButtonText}>
// //                 {recordingFile ? 'Change Recording' : 'Pick Audio File'}
// //               </Text>
// //             </TouchableOpacity>
// //             {recordingFile && (
// //               <Text style={styles.uploadedFileText}>Selected: {recordingFile.name}</Text>
// //             )}

// //             <Text style={[styles.labelText, { marginTop: 20 }]}>Select Status</Text>
// //             <Dropdown
// //               visible={leadStatusDropdownVisible}
// //               setVisible={setLeadStatusDropdownVisible}
// //               selectedValue={selectedLeadStatus}
// //               setSelectedValue={setSelectedLeadStatus}
// //               options={leadStatuses}
// //               placeholder="Select Status"
// //               setSelectedId={setSelectedStatusId}
// //             />
// //             <DynamicFields
// //               statusDetail={statusDetail}
// //               onSubmit={handleDynamicFieldsSubmit}
// //               initialData={formData}
// //             />
// //             <View style={styles.buttonContainer}>
// //               <CustomButton
// //                 buttonName={feedbackLoading ? 'Submitting...' : 'Submit'}
// //                 onPress={handleSubmit}
// //                 height={56}
// //                 width="60%"
// //                 containerStyle={{ borderRadius: 8 }}
// //                 gradientColors={['#8290EA', '#3F4CA0']}
// //                 fontSize={RFPercentage(2)}
// //                 fontWeight="600"
// //                 accessibilityLabel="Submit feedback"
// //                 disabled={feedbackLoading}
// //               />
// //             </View>
// //           </>
// //         )}
// //       </ScrollView>
// //       <Toast config={toastConfig} />
// //     </View>
// //   );
// // };

// // export default FeedbackScreen;

// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ActivityIndicator,
//   StyleSheet,
//   Platform,
//   ScrollView,
//   Modal,
//   FlatList,
// } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import RNFS from 'react-native-fs';
// import { check, request, PERMISSIONS, RESULTS, openSettings } from 'react-native-permissions';
// import { fetchAllLeadStatuses } from '../../redux/slices/getAllLeadStatusSlice';
// import { fetchLeadStatusById, resetLeadStatusById } from '../../redux/slices/getLeadStatusByIdSlice';
// import { postFeedback, resetFeedbackState } from '../../redux/slices/postFeedbackSlice';
// import { getLatestCallLog } from '../phone/CallLogs';
// import Dropdown from './Dropdown';
// import DynamicFields from './DynamicFields';
// import Header from '../../component/Header';
// import CustomButton from '../../component/CustomButton';
// import Toast from 'react-native-toast-message';
// import { toastConfig } from '../../component/toastConfig';
// import { RFPercentage } from 'react-native-responsive-fontsize';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// // Updated styles with modal and recording selection styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   scrollContent: {
//     padding: 20,
//     paddingBottom: 40,
//   },
//   labelText: {
//     fontSize: RFPercentage(1.8),
//     color: '#333333',
//     marginBottom: 8,
//     fontWeight: '500',
//   },
//   infoText: {
//     fontSize: RFPercentage(1.8),
//     color: '#333333',
//     marginBottom: 16,
//   },
//   errorText: {
//     fontSize: RFPercentage(1.8),
//     color: '#EF4444',
//     marginBottom: 16,
//   },
//   uploadButton: {
//     borderWidth: 1,
//     borderColor: '#8290EA',
//     borderRadius: 8,
//     padding: 12,
//     marginTop: 8,
//     alignItems: 'center',
//     flexDirection: 'row',
//     justifyContent: 'center',
//   },
//   uploadButtonText: {
//     color: '#3F4CA0',
//     fontSize: RFPercentage(2),
//     fontWeight: '500',
//     marginLeft: 8,
//   },
//   uploadedFileText: {
//     fontSize: RFPercentage(1.6),
//     color: '#333333',
//     marginTop: 8,
//   },
//   buttonContainer: {
//     alignItems: 'center',
//     marginTop: 24,
//   },
//   modalContainer: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//     padding: 20,
//   },
//   modalHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   modalTitle: {
//     fontSize: RFPercentage(2.5),
//     fontWeight: 'bold',
//     color: '#3F4CA0',
//   },
//   recordingItem: {
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E5E7EB',
//   },
//   recordingName: {
//     fontSize: RFPercentage(1.8),
//     color: '#333333',
//   },
//   recordingDate: {
//     fontSize: RFPercentage(1.5),
//     color: '#6B7280',
//     marginTop: 5,
//   },
//   noRecordingsText: {
//     fontSize: RFPercentage(1.8),
//     color: '#6B7280',
//     textAlign: 'center',
//     marginTop: 40,
//   },
//   closeButton: {
//     padding: 10,
//   },
// });

// const FeedbackScreen = ({ route, navigation }) => {
//   const { phoneNumber = 'N/A', leadId, isManual = false, sourceScreen, queryType } = route.params || {};
//   const dispatch = useDispatch();

//   const [selectedLeadStatus, setSelectedLeadStatus] = useState('');
//   const [selectedStatusId, setSelectedStatusId] = useState('');
//   const [leadStatusDropdownVisible, setLeadStatusDropdownVisible] = useState(false);
//   const [dialUpMethod, setDialUpMethod] = useState(null);
//   const [formData, setFormData] = useState({});
//   const [recordingFile, setRecordingFile] = useState(null);
//   const [showRecordingsModal, setShowRecordingsModal] = useState(false);
//   const [availableRecordings, setAvailableRecordings] = useState([]);
//   const [loadingRecordings, setLoadingRecordings] = useState(false);

//   const { leadStatuses = [], loading: statusesLoading, error: statusesError } = useSelector(
//     (state) => state.leadStatus || {}
//   );
//   const { data: leadStatusDetail = {}, loading: statusLoading, error: statusError } = useSelector(
//     (state) => state.leadStatusById || {}
//   );
//   const { loading: feedbackLoading, error: feedbackError } = useSelector(
//     (state) => state.postFeedback || {}
//   );

//   const statusDetail = {
//     ...leadStatusDetail?.data,
//     meeting: {
//       required: leadStatusDetail?.data?.meeting?.required || false,
//       dateLabel: leadStatusDetail?.data?.meeting?.dateLabel || 'Meeting Date',
//       timeLabel: leadStatusDetail?.data?.meeting?.timeLabel || 'Meeting Time',
//     },
//     estimation: {
//       required: leadStatusDetail?.data?.estimation?.required || false,
//       dateLabel: leadStatusDetail?.data?.estimation?.dateLabel || 'Estimation Date',
//       budgetLabel: leadStatusDetail?.data?.estimation?.budgetLabel || 'Estimation Budget',
//     },
//     showDescription: leadStatusDetail?.data?.showDescription || false,
//     isPriority: leadStatusDetail?.data?.isPriority || false,
//     descriptionLabel: leadStatusDetail?.data?.descriptionLabel || 'Description',
//     name: leadStatusDetail?.data?.name || '',
//   };

//   useEffect(() => {
//     const fetchCallLog = async () => {
//       if (isManual || !phoneNumber || phoneNumber === 'N/A') {
//         setDialUpMethod(null);
//         return;
//       }

//       try {
//         const callLog = await getLatestCallLog(phoneNumber);
//         setDialUpMethod(
//           callLog
//             ? {
//                 phoneNumber: callLog.phoneNumber || phoneNumber,
//                 callType: 'Outgoing',
//                 callDuration: callLog.callDuration || '0.00',
//                 formattedDuration: callLog.formattedDuration || '00:00',
//                 callStatus: callLog.callStatus || 'Rejected',
//                 recordedFile: callLog.recordedFile || '',
//                 callSid: '',
//                 callStartTime: callLog.callStartTime || '',
//                 callEndTime: callLog.callEndTime || '',
//               }
//             : {
//                 phoneNumber,
//                 callType: 'Outgoing',
//                 callDuration: '0.00',
//                 formattedDuration: '00:00',
//                 callStatus: 'Rejected',
//                 recordedFile: '',
//                 callSid: '',
//                 callStartTime: '',
//                 callEndTime: '',
//               }
//         );
//       } catch (error) {
//         console.error('FeedbackScreen: Error fetching call log', error);
//         Toast.show({
//           type: 'error',
//           text1: 'Error',
//           text2: 'Failed to fetch call log.',
//         });
//       }
//     };

//     fetchCallLog();
//   }, [phoneNumber, isManual]);

//   useEffect(() => {
//     dispatch(fetchAllLeadStatuses()).catch((error) =>
//       console.error('FeedbackScreen: Error fetching lead statuses', error)
//     );
//   }, [dispatch]);

//   useEffect(() => {
//     if (selectedStatusId) {
//       dispatch(fetchLeadStatusById(selectedStatusId)).catch((error) =>
//         console.error('FeedbackScreen: Error fetching status details', error)
//       );
//     }
//   }, [dispatch, selectedStatusId]);

//   useEffect(() => {
//     return () => {
//       dispatch(resetLeadStatusById());
//       dispatch(resetFeedbackState());
//     };
//   }, [dispatch]);

//   const handleDynamicFieldsSubmit = (data) => {
//     setFormData(data);
//   };

//   // New function to load available recordings
//   const loadRecordings = useCallback(async () => {
//     setLoadingRecordings(true);
//     try {
//       // Check storage permission
//       const permission =
//         Platform.OS === 'android' && Platform.Version >= 33
//           ? PERMISSIONS.ANDROID.READ_MEDIA_AUDIO
//           : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;

//       const permissionResult = await check(permission);
//       if (permissionResult !== RESULTS.GRANTED) {
//         const requestResult = await request(permission);
//         if (requestResult !== RESULTS.GRANTED) {
//           Toast.show({
//             type: 'error',
//             text1: 'Permission Denied',
//             text2: `Please enable ${Platform.Version >= 33 ? 'audio' : 'storage'} access in settings.`,
//             onPress: () => openSettings().catch((err) => console.error('Error opening settings', err)),
//           });
//           return [];
//         }
//       }

//       // Get recordings directory path
//       const recordingsDir = `${RNFS.ExternalDirectoryPath}/Recordings/`;
//       const dirExists = await RNFS.exists(recordingsDir);

//       if (!dirExists) {
//         return [];
//       }

//       // List all files in the recordings directory
//       const files = await RNFS.readDir(recordingsDir);

//       // Filter audio files and sort by modification date (newest first)
//       return files
//         .filter((file) => file.isFile() && file.name.match(/\.(mp3|wav|m4a)$/i))
//         .sort((a, b) => b.mtime.getTime() - a.mtime.getTime())
//         .map((file) => ({
//           uri: file.path,
//           name: file.name,
//           type: 'audio/mpeg',
//           date: file.mtime.toLocaleString(),
//         }));
//     } catch (error) {
//       console.error('Error loading recordings:', error);
//       Toast.show({
//         type: 'error',
//         text1: 'Error',
//         text2: 'Failed to load recordings',
//       });
//       return [];
//     } finally {
//       setLoadingRecordings(false);
//     }
//   }, []);

//   // New function to handle recording selection
//   const handleRecordingSelection = useCallback(async () => {
//     // Check for recent call recording
//     if (dialUpMethod?.recordedFile) {
//       try {
//         const exists = await RNFS.exists(dialUpMethod.recordedFile);
//         if (exists) {
//           setRecordingFile({
//             uri: dialUpMethod.recordedFile,
//             name: dialUpMethod.recordedFile.split('/').pop() || 'call_recording.mp3',
//             type: 'audio/mpeg',
//           });
//           return;
//         }
//       } catch (error) {
//         console.error('Error checking call recording:', error);
//       }
//     }

//     // Load and show available recordings
//     const recordings = await loadRecordings();
//     setAvailableRecordings(recordings);
//     setShowRecordingsModal(true);
//   }, [dialUpMethod, loadRecordings]);

//   // Modified file picker function
//   const handleFilePick = useCallback(async () => {
//     try {
//       // Check permission
//       const permission =
//         Platform.OS === 'android' && Platform.Version >= 33
//           ? PERMISSIONS.ANDROID.READ_MEDIA_AUDIO
//           : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
//       const permissionResult = await check(permission);

//       if (permissionResult !== RESULTS.GRANTED) {
//         const requestResult = await request(permission);
//         if (requestResult !== RESULTS.GRANTED) {
//           Toast.show({
//             type: 'error',
//             text1: 'Permission Denied',
//             text2: `Please enable ${Platform.Version >= 33 ? 'audio' : 'storage'} access in settings.`,
//             onPress: () => openSettings().catch((err) => console.error('Error opening settings', err)),
//           });
//           return;
//         }
//       }

//       // Use our recording selection flow
//       handleRecordingSelection();
//     } catch (error) {
//       console.error('FeedbackScreen: Error picking file', error);
//       Toast.show({
//         type: 'error',
//         text1: 'Error',
//         text2: 'Failed to access recordings',
//       });
//     }
//   }, [handleRecordingSelection]);

//   // Recording selection modal
//   const renderRecordingsModal = () => (
//     <Modal
//       visible={showRecordingsModal}
//       animationType="slide"
//       onRequestClose={() => setShowRecordingsModal(false)}
//     >
//       <View style={styles.modalContainer}>
//         <View style={styles.modalHeader}>
//           <Text style={styles.modalTitle}>Select Recording</Text>
//           <TouchableOpacity
//             style={styles.closeButton}
//             onPress={() => setShowRecordingsModal(false)}
//           >
//             <Icon name="close" size={24} color="#3F4CA0" />
//           </TouchableOpacity>
//         </View>

//         {loadingRecordings ? (
//           <ActivityIndicator size="large" color="#3F4CA0" />
//         ) : availableRecordings.length === 0 ? (
//           <Text style={styles.noRecordingsText}>No recordings found</Text>
//         ) : (
//           <FlatList
//             data={availableRecordings}
//             keyExtractor={(item) => item.uri}
//             renderItem={({ item }) => (
//               <TouchableOpacity
//                 style={styles.recordingItem}
//                 onPress={() => {
//                   setRecordingFile(item);
//                   setShowRecordingsModal(false);
//                 }}
//               >
//                 <Text style={styles.recordingName}>{item.name}</Text>
//                 <Text style={styles.recordingDate}>{item.date}</Text>
//               </TouchableOpacity>
//             )}
//           />
//         )}
//       </View>
//     </Modal>
//   );

//   const handleSubmit = async () => {
//     if (!leadId || !/^[0-9a-fA-F]{24}$/.test(leadId)) {
//       Toast.show({ type: 'error', text1: 'Error', text2: 'Invalid Lead ID.' });
//       return;
//     }
//     if (!selectedLeadStatus || !selectedStatusId) {
//       Toast.show({ type: 'error', text1: 'Error', text2: 'Please select a status.' });
//       return;
//     }
//     if (statusDetail.isPriority && !['Important', 'High', 'Medium', 'Low'].includes(formData.priority)) {
//       Toast.show({ type: 'error', text1: 'Error', text2: 'Please select a valid priority.' });
//       return;
//     }
//     if (
//       statusDetail.meeting?.required &&
//       (!formData.nextFollowUpDate || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.*Z$/.test(formData.nextFollowUpDate))
//     ) {
//       Toast.show({ type: 'error', text1: 'Error', text2: 'Please provide a valid meeting date and time.' });
//       return;
//     }
//     if (
//       statusDetail.estimation?.required &&
//       (!formData.estimationBudget || isNaN(formData.estimationBudget) || Number(formData.estimationBudget) <= 0)
//     ) {
//       Toast.show({ type: 'error', text1: 'Error', text2: 'Please enter a valid estimation budget.' });
//       return;
//     }
//     if (
//       statusDetail.estimation?.required &&
//       (!formData.estimationDate || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.*Z$/.test(formData.estimationDate))
//     ) {
//       Toast.show({ type: 'error', text1: 'Error', text2: 'Please provide a valid estimation date.' });
//       return;
//     }
//     if (statusDetail.name === 'Active' && !formData.address?.trim()) {
//       Toast.show({ type: 'error', text1: 'Error', text2: 'Please provide an address.' });
//       return;
//     }
//     if (statusDetail.name === 'Inactive' && !formData.reason?.trim()) {
//       Toast.show({ type: 'error', text1: 'Error', text2: 'Please provide a reason for inactivity.' });
//       return;
//     }
//     if (!isManual && dialUpMethod?.recordedFile) {
//       try {
//         const exists = await RNFS.exists(dialUpMethod.recordedFile);
//         if (!exists) {
//           Toast.show({ type: 'error', text1: 'Error', text2: 'Call recording file not found.' });
//           return;
//         }
//       } catch (error) {
//         console.error('FeedbackScreen: Error checking call recording', error);
//         Toast.show({ type: 'error', text1: 'Error', text2: 'Error accessing call recording.' });
//         return;
//       }
//     }
//     if (recordingFile) {
//       try {
//         const exists = await RNFS.exists(recordingFile.uri);
//         if (!exists) {
//           Toast.show({ type: 'error', text1: 'Error', text2: 'Uploaded audio file not found.' });
//           return;
//         }
//       } catch (error) {
//         console.error('FeedbackScreen: Error checking uploaded file', error);
//         Toast.show({ type: 'error', text1: 'Error', text2: 'Error accessing uploaded audio.' });
//         return;
//       }
//     }

//     try {
//       const contactDateTime = new Date().toISOString();
//       let callStartDateTime = '';
//       let callEndDateTime = '';

//       if (dialUpMethod && !isManual) {
//         const isCallConnected =
//           dialUpMethod.callStatus === 'Connected' || parseFloat(dialUpMethod.callDuration) > 0;
//         if (isCallConnected && dialUpMethod.callStartTime) {
//           const startTime = new Date(dialUpMethod.callStartTime);
//           if (!isNaN(startTime)) callStartDateTime = startTime.toISOString();
//         }
//         if (isCallConnected && dialUpMethod.callEndTime) {
//           const endTime = new Date(dialUpMethod.callEndTime);
//           if (!isNaN(endTime)) callEndDateTime = endTime.toISOString();
//         }
//       }

//       const payload = {
//         leadId,
//         contactDateTime,
//         nextFollowUpDate: formData.nextFollowUpDate || '',
//         estimationDate: statusDetail.estimation?.required ? formData.estimationDate : '',
//         estimationBudget: statusDetail.estimation?.required ? Number(formData.estimationBudget) : 0,
//         priority: formData.priority || 'Medium',
//         method: isManual ? 'Manual' : 'Call',
//         status: selectedStatusId,
//         description: statusDetail.showDescription ? formData.meetingDescription : '',
//         address: statusDetail.name === 'Active' ? formData.address : '',
//         reason: statusDetail.name === 'Inactive' ? formData.reason : '',
//         recordingFile: recordingFile ? recordingFile.uri : '',
//         ...(dialUpMethod && !isManual
//           ? {
//               dialUpMethod: {
//                 phoneNumber: dialUpMethod.phoneNumber || '',
//                 callType: dialUpMethod.callType || 'Outgoing',
//                 callDuration: dialUpMethod.callDuration || '0.00',
//                 formattedDuration: dialUpMethod.formattedDuration || '00:00',
//                 callStatus: dialUpMethod.callStatus || 'Rejected',
//                 recordedFile: dialUpMethod.recordedFile || '',
//                 callSid: dialUpMethod.callSid || '',
//                 callStartDateTime,
//                 callEndDateTime,
//               },
//             }
//           : {}),
//       };

//       await dispatch(postFeedback(payload)).unwrap();
//       Toast.show({
//         type: 'success',
//         text1: 'Success',
//         text2: 'Feedback submitted successfully!',
//       });

//       const targetScreen = sourceScreen
//         ? {
//             LeadsScreen: 'Leads',
//             Dashboard: 'Dashboard',
//             ProfileScreen: 'Profile',
//             LeadDetailsScreen: 'Leads',
//           }[sourceScreen] || 'Leads'
//         : 'Leads';

//       navigation.navigate('HomeScreen', {
//         screen: 'Main',
//         params: { screen: targetScreen, params: { queryType } },
//       });
//     } catch (error) {
//       console.error('FeedbackScreen: Submit error', error);
//       Toast.show({
//         type: 'error',
//         text1: 'Error',
//         text2: error.message || feedbackError || 'Failed to submit feedback.',
//       });
//       dispatch(resetFeedbackState());
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Header
//         title="Feedback"
//         showBackButton
//         onBackPress={() => navigation.goBack()}
//       />
//       <ScrollView
//         contentContainerStyle={styles.scrollContent}
//         keyboardShouldPersistTaps="handled"
//         showsVerticalScrollIndicator={false}
//       >
//         <Text style={styles.infoText}>
//           {isManual ? 'Manual Feedback' : `Call to: ${phoneNumber} ${dialUpMethod?.formattedDuration ? `(${dialUpMethod.formattedDuration})` : ''}`}
//         </Text>
//         {dialUpMethod?.recordedFile && (
//           <Text style={styles.infoText}>Recording: {dialUpMethod.recordedFile.split('/').pop()}</Text>
//         )}

//         {statusesLoading || statusLoading || feedbackLoading ? (
//           <ActivityIndicator size="large" color="#3F4CA0" />
//         ) : statusesError || statusError || feedbackError ? (
//           <View>
//             <Text style={styles.errorText}>{statusesError || statusError || feedbackError}</Text>
//             <CustomButton
//               buttonName="Retry"
//               onPress={() => {
//                 dispatch(fetchAllLeadStatuses());
//                 if (selectedStatusId) dispatch(fetchLeadStatusById(selectedStatusId));
//               }}
//               gradientColors={['#8290EA', '#3F4CA0']}
//               height={56}
//               width="100%"
//               fontSize={RFPercentage(2)}
//               fontWeight="600"
//               accessibilityLabel="Retry loading data"
//             />
//           </View>
//         ) : (
//           <>
//             <Text style={styles.labelText}>Upload Recording (Optional)</Text>
//             <TouchableOpacity style={styles.uploadButton} onPress={handleFilePick}>
//               <Icon name="file-upload" size={20} color="#3F4CA0" />
//               <Text style={styles.uploadButtonText}>
//                 {recordingFile ? 'Change Recording' : 'Select Recording'}
//               </Text>
//             </TouchableOpacity>
//             {recordingFile && (
//               <Text style={styles.uploadedFileText}>Selected: {recordingFile.name}</Text>
//             )}

//             <Text style={[styles.labelText, { marginTop: 20 }]}>Select Status</Text>
//             <Dropdown
//               visible={leadStatusDropdownVisible}
//               setVisible={setLeadStatusDropdownVisible}
//               selectedValue={selectedLeadStatus}
//               setSelectedValue={setSelectedLeadStatus}
//               options={leadStatuses}
//               placeholder="Select Status"
//               setSelectedId={setSelectedStatusId}
//             />
//             <DynamicFields
//               statusDetail={statusDetail}
//               onSubmit={handleDynamicFieldsSubmit}
//               initialData={formData}
//             />
//             <View style={styles.buttonContainer}>
//               <CustomButton
//                 buttonName={feedbackLoading ? 'Submitting...' : 'Submit'}
//                 onPress={handleSubmit}
//                 height={56}
//                 width="60%"
//                 containerStyle={{ borderRadius: 8 }}
//                 gradientColors={['#8290EA', '#3F4CA0']}
//                 fontSize={RFPercentage(2)}
//                 fontWeight="600"
//                 accessibilityLabel="Submit feedback"
//                 disabled={feedbackLoading}
//               />
//             </View>
//           </>
//         )}
//       </ScrollView>
//       <Toast config={toastConfig} />
//       {renderRecordingsModal()}
//     </View>
//   );
// };

// export default FeedbackScreen;

// // // // // import React, { useState, useEffect } from 'react';
// // // // // import {
// // // // //   View,
// // // // //   Text,
// // // // //   TouchableOpacity,
// // // // //   Alert,
// // // // //   ActivityIndicator,
// // // // // } from 'react-native';
// // // // // import { useDispatch, useSelector } from 'react-redux';
// // // // // import { Picker } from '@react-native-picker/picker';
// // // // // import {
// // // // //   fetchAllLeadStatuses,
// // // // // } from '../../redux/slices/getAllLeadStatusSlice';
// // // // // import {
// // // // //   fetchLeadStatusById,
// // // // //   resetLeadStatusById,
// // // // // } from '../../redux/slices/getLeadStatusByIdSlice';
// // // // // import Dropdown from './Dropdown';
// // // // // import DynamicFields from './DynamicFields';
// // // // // import styles from '../styles/styles';

// // // // // const FeedbackScreen = ({ route, navigation }) => {
// // // // //   const { phoneNumber = 'N/A' } = route.params || {};
// // // // //   const dispatch = useDispatch();

// // // // //   const [selectedLeadStatus, setSelectedLeadStatus] = useState('');
// // // // //   const [selectedStatusId, setSelectedStatusId] = useState('');
// // // // //   const [priority, setPriority] = useState('');
// // // // //   const [leadStatusDropdownVisible, setLeadStatusDropdownVisible] = useState(false);

// // // // //   const { leadStatuses = [], loading: statusesLoading, error: statusesError } = useSelector(
// // // // //     (state) => state.leadStatus || {}
// // // // //   );
// // // // //   const { data: leadStatusDetail = {}, loading: statusLoading, error: statusError } = useSelector(
// // // // //     (state) => state.leadStatusById || {}
// // // // //   );

// // // // //   const statusDetail = leadStatusDetail?.data || {};

// // // // //   useEffect(() => {
// // // // //     //('leadStatuses:', leadStatuses);
// // // // //     //('statusDetail:', statusDetail);
// // // // //     //('statusesLoading:', statusesLoading, 'statusLoading:', statusLoading);
// // // // //     //('statusesError:', statusesError, 'statusError:', statusError);
// // // // //   }, [leadStatuses, statusDetail, statusesLoading, statusLoading, statusesError, statusError]);

// // // // //   useEffect(() => {
// // // // //     let isMounted = true;
// // // // //     //('Fetching all lead statuses...');
// // // // //     dispatch(fetchAllLeadStatuses())
// // // // //       .then(() => {
// // // // //         if (isMounted) //('Lead statuses fetched successfully');
// // // // //       })
// // // // //       .catch((error) => {
// // // // //         console.error('Error fetching lead statuses:', error);
// // // // //       });
// // // // //     return () => {
// // // // //       isMounted = false;
// // // // //     };
// // // // //   }, [dispatch]);

// // // // //   useEffect(() => {
// // // // //     if (selectedStatusId) {
// // // // //       let isMounted = true;
// // // // //       //('Fetching status details for ID:', selectedStatusId);
// // // // //       dispatch(fetchLeadStatusById(selectedStatusId))
// // // // //         .then(() => {
// // // // //           if (isMounted) //('Status details fetched successfully');
// // // // //         })
// // // // //         .catch((error) => {
// // // // //           console.error('Error fetching status details:', error);
// // // // //         });
// // // // //       return () => {
// // // // //         isMounted = false;
// // // // //       };
// // // // //     }
// // // // //   }, [dispatch, selectedStatusId]);

// // // // //   useEffect(() => {
// // // // //     return () => {
// // // // //       //('Resetting lead status by ID');
// // // // //       dispatch(resetLeadStatusById());
// // // // //     };
// // // // //   }, [dispatch]);

// // // // //   const handleSubmit = async (formData) => {
// // // // //     //('Submitting form with values:', {
// // // // //       selectedLeadStatus,
// // // // //       selectedStatusId,
// // // // //       priority,
// // // // //       ...formData,
// // // // //     });

// // // // //     if (!selectedLeadStatus) {
// // // // //       Alert.alert('Error', 'Please select a status.');
// // // // //       return;
// // // // //     }
// // // // //     if (!priority) {
// // // // //       Alert.alert('Error', 'Please select a priority.');
// // // // //       return;
// // // // //     }
// // // // //     if (
// // // // //       statusDetail.meeting?.required &&
// // // // //       (!formData.meetingTime || !/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(formData.meetingTime))
// // // // //     ) {
// // // // //       Alert.alert('Error', 'Please enter a valid meeting time (HH:mm, e.g., 14:30).');
// // // // //       return;
// // // // //     }
// // // // //     if (
// // // // //       statusDetail.estimation?.required &&
// // // // //       (!formData.estimationBudget || isNaN(formData.estimationBudget) || Number(formData.estimationBudget) <= 0)
// // // // //     ) {
// // // // //       Alert.alert('Error', 'Please enter a valid estimation budget.');
// // // // //       return;
// // // // //     }

// // // // //     const payload = {
// // // // //       phoneNumber,
// // // // //       statusId: selectedStatusId,
// // // // //       priority,
// // // // //       meetingDate: statusDetail.meeting?.required ? formData.meetingDate.toISOString() : null,
// // // // //       meetingTime: statusDetail.meeting?.required ? formData.meetingTime : null,
// // // // //       estimationDate: statusDetail.estimation?.required ? formData.estimationDate.toISOString() : null,
// // // // //       estimationBudget: statusDetail.estimation?.required ? formData.estimationBudget : null,
// // // // //       meetingDescription: statusDetail.showDescription ? formData.meetingDescription : null,
// // // // //     };

// // // // //     try {
// // // // //       //('Submitting feedback payload:', payload);
// // // // //       Alert.alert('Success', 'Feedback submitted successfully!');
// // // // //       navigation.goBack();
// // // // //     } catch (error) {
// // // // //       console.error('Submit error:', error);
// // // // //       Alert.alert('Error', 'Failed to submit feedback.');
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <View style={styles.container}>
// // // // //       <Text style={styles.title}>Feedback</Text>
// // // // //       <Text style={styles.subtitle}>Call to: {phoneNumber}</Text>

// // // // //       {statusesLoading || statusLoading ? (
// // // // //         <ActivityIndicator size="large" color="#0000ff" />
// // // // //       ) : statusesError || entender statusError ? (
// // // // //         <Text style={styles.errorText}>
// // // // //           Error: {statusesError || statusError || 'Failed to load data'}
// // // // //         </Text>
// // // // //       ) : (
// // // // //         <>
// // // // //           <Text style={styles.label}>Select Status</Text>
// // // // //           <Dropdown
// // // // //             visible={leadStatusDropdownVisible}
// // // // //             setVisible={setLeadStatusDropdownVisible}
// // // // //             selectedValue={selectedLeadStatus}
// // // // //             setSelectedValue={setSelectedLeadStatus}
// // // // //             options={leadStatuses}
// // // // //             placeholder="Select Status"
// // // // //             setSelectedId={setSelectedStatusId}
// // // // //           />

// // // // //           <DynamicFields statusDetail={statusDetail} onSubmit={handleSubmit} />

// // // // //           <Text style={styles.label}>Select Priority</Text>
// // // // //           <View style={styles.pickerContainer}>
// // // // //             <Picker
// // // // //               selectedValue={priority}
// // // // //               onValueChange={(value) => {
// // // // //                 //('Priority selected:', value);
// // // // //                 setPriority(value);
// // // // //               }}
// // // // //               style={styles.picker}
// // // // //             >
// // // // //               <Picker.Item label="Select Priority" value="" />
// // // // //               <Picker.Item label="High" value="High" />
// // // // //               <Picker.Item label="Medium" value="Medium" />
// // // // //               <Picker.Item label="Low" value="Low" />
// // // // //             </Picker>
// // // // //           </View>
// // // // //         </>
// // // // //       )}
// // // // //     </View>
// // // // //   );
// // // // // };

// // // // // export default FeedbackScreen;
// // // // import React, { useState, useEffect } from 'react';
// // // // import {
// // // //   View,
// // // //   Text,
// // // //   TouchableOpacity,
// // // //   Alert,
// // // //   ActivityIndicator,
// // // // } from 'react-native';
// // // // import { useDispatch, useSelector } from 'react-redux';
// // // // import {
// // // //   fetchAllLeadStatuses,
// // // // } from '../../redux/slices/getAllLeadStatusSlice';
// // // // import {
// // // //   fetchLeadStatusById,
// // // //   resetLeadStatusById,
// // // // } from '../../redux/slices/getLeadStatusByIdSlice';
// // // // import Dropdown from './Dropdown';
// // // // import DynamicFields from './DynamicFields';
// // // // import styles from './styles';

// // // // const FeedbackScreen = ({ route, navigation }) => {
// // // //   const { phoneNumber = 'N/A' } = route.params || {};
// // // //   const dispatch = useDispatch();

// // // //   const [selectedLeadStatus, setSelectedLeadStatus] = useState('');
// // // //   const [selectedStatusId, setSelectedStatusId] = useState('');
// // // //   const [leadStatusDropdownVisible, setLeadStatusDropdownVisible] = useState(false);

// // // //   const { leadStatuses = [], loading: statusesLoading, error: statusesError } = useSelector(
// // // //     (state) => state.leadStatus || {}
// // // //   );
// // // //   const { data: leadStatusDetail = {}, loading: statusLoading, error: statusError } = useSelector(
// // // //     (state) => state.leadStatusById || {}
// // // //   );

// // // //   const statusDetail = leadStatusDetail?.data || {};

// // // //   useEffect(() => {
// // // //     //('leadStatuses:', leadStatuses);
// // // //     //('statusDetail:', statusDetail);
// // // //     //('statusDetail.isPriority:', statusDetail.isPriority);
// // // //     //('statusesLoading:', statusesLoading, 'statusLoading:', statusLoading);
// // // //     //('statusesError:', statusesError, 'statusError:', statusError);
// // // //   }, [leadStatuses, statusDetail, statusesLoading, statusLoading, statusesError, statusError]);

// // // //   useEffect(() => {
// // // //     let isMounted = true;
// // // //     //('Fetching all lead statuses...');
// // // //     dispatch(fetchAllLeadStatuses())
// // // //       .then(() => {
// // // //         if (isMounted) //('Lead statuses fetched successfully');
// // // //       })
// // // //       .catch((error) => {
// // // //         console.error('Error fetching lead statuses:', error);
// // // //       });
// // // //     return () => {
// // // //       isMounted = false;
// // // //     };
// // // //   }, [dispatch]);

// // // //   useEffect(() => {
// // // //     if (selectedStatusId) {
// // // //       let isMounted = true;
// // // //       //('Fetching status details for ID:', selectedStatusId);
// // // //       dispatch(fetchLeadStatusById(selectedStatusId))
// // // //         .then(() => {
// // // //           if (isMounted) //('Status details fetched successfully');
// // // //         })
// // // //         .catch((error) => {
// // // //           console.error('Error fetching status details:', error);
// // // //         });
// // // //       return () => {
// // // //         isMounted = false;
// // // //       };
// // // //     }
// // // //   }, [dispatch, selectedStatusId]);

// // // //   useEffect(() => {
// // // //     return () => {
// // // //       //('Resetting lead status by ID');
// // // //       dispatch(resetLeadStatusById());
// // // //     };
// // // //   }, [dispatch]);

// // // //   const handleSubmit = async (formData) => {
// // // //     //('Submitting form with values:', {
// // // //       selectedLeadStatus,
// // // //       selectedStatusId,
// // // //       ...formData,
// // // //     });

// // // //     if (!selectedLeadStatus) {
// // // //       Alert.alert('Error', 'Please select a status.');
// // // //       return;
// // // //     }
// // // //     if (
// // // //       statusDetail.isPriority &&
// // // //       (!formData.priority || !['High', 'Medium', 'Low'].includes(formData.priority))
// // // //     ) {
// // // //       Alert.alert('Error', 'Please select a valid priority.');
// // // //       return;
// // // //     }
// // // //     if (
// // // //       statusDetail.meeting?.required &&
// // // //       (!formData.meetingTime || !/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(formData.meetingTime))
// // // //     ) {
// // // //       Alert.alert('Error', 'Please enter a valid meeting time (HH:mm, e.g., 14:30).');
// // // //       return;
// // // //     }
// // // //     if (
// // // //       statusDetail.estimation?.required &&
// // // //       (!formData.estimationBudget || isNaN(formData.estimationBudget) || Number(formData.estimationBudget) <= 0)
// // // //     ) {
// // // //       Alert.alert('Error', 'Please enter a valid estimation budget.');
// // // //       return;
// // // //     }

// // // //     const payload = {
// // // //       phoneNumber,
// // // //       statusId: selectedStatusId,
// // // //       priority: formData.priority,
// // // //       meetingDate: statusDetail.meeting?.required ? formData.meetingDate.toISOString() : null,
// // // //       meetingTime: statusDetail.meeting?.required ? formData.meetingTime : null,
// // // //       estimationDate: statusDetail.estimation?.required ? formData.estimationDate.toISOString() : null,
// // // //       estimationBudget: statusDetail.estimation?.required ? formData.estimationBudget : null,
// // // //       meetingDescription: statusDetail.showDescription ? formData.meetingDescription : null,
// // // //     };

// // // //     try {
// // // //       //('Submitting feedback payload:', payload);
// // // //       Alert.alert('Success', 'Feedback submitted successfully!');
// // // //       navigation.goBack();
// // // //     } catch (error) {
// // // //       console.error('Submit error:', error);
// // // //       Alert.alert('Error', 'Failed to submit feedback.');
// // // //     }
// // // //   };

// // // //   return (
// // // //     <View style={styles.container}>
// // // //       <Text style={styles.title}>Feedback</Text>
// // // //       <Text style={styles.subtitle}>Call to: {phoneNumber}</Text>

// // // //       {statusesLoading || statusLoading ? (
// // // //         <ActivityIndicator size="large" color="#0000ff" />
// // // //       ) : statusesError || statusError ? (
// // // //         <Text style={styles.errorText}>
// // // //           Error: {statusesError || statusError || 'Failed to load data'}
// // // //         </Text>
// // // //       ) : (
// // // //         <>
// // // //           <Text style={styles.label}>Select Status</Text>
// // // //           <Dropdown
// // // //             visible={leadStatusDropdownVisible}
// // // //             setVisible={setLeadStatusDropdownVisible}
// // // //             selectedValue={selectedLeadStatus}
// // // //             setSelectedValue={setSelectedLeadStatus}
// // // //             options={leadStatuses}
// // // //             placeholder="Select Status"
// // // //             setSelectedId={setSelectedStatusId}
// // // //           />
// // // //           <DynamicFields statusDetail={statusDetail} onSubmit={handleSubmit} />
// // // //         </>
// // // //       )}
// // // //     </View>
// // // //   );
// // // // };

// // // // export default FeedbackScreen;
// // // import React, { useState, useEffect } from 'react';
// // // import {
// // //   View,
// // //   Text,
// // //   TouchableOpacity,
// // //   Alert,
// // //   ActivityIndicator,
// // //   StyleSheet,
// // // } from 'react-native';
// // // import { useDispatch, useSelector } from 'react-redux';
// // // import {
// // //   fetchAllLeadStatuses,
// // // } from '../../redux/slices/getAllLeadStatusSlice';
// // // import {
// // //   fetchLeadStatusById,
// // //   resetLeadStatusById,
// // // } from '../../redux/slices/getLeadStatusByIdSlice';
// // // import { postFeedback, resetFeedbackState } from '../../redux/slices/postFeedbackSlice';
// // // import Dropdown from './Dropdown';
// // // import DynamicFields from './DynamicFields';
// // // import { getLatestCallLog } from '../phone/CallLogs';
// // // import styles from './styles';

// // // const localStyles = StyleSheet.create({
// // //   retryButton: {
// // //     backgroundColor: '#007AFF',
// // //     padding: 10,
// // //     borderRadius: 5,
// // //     marginTop: 10,
// // //     alignItems: 'center',
// // //   },
// // //   retryButtonText: {
// // //     color: '#FFFFFF',
// // //     fontSize: 16,
// // //   },
// // // });

// // // const FeedbackScreen = ({ route, navigation }) => {
// // //   const { phoneNumber = 'N/A', leadId } = route.params || {};
// // //   const dispatch = useDispatch();

// // //   const [selectedLeadStatus, setSelectedLeadStatus] = useState('');
// // //   const [selectedStatusId, setSelectedStatusId] = useState('');
// // //   const [leadStatusDropdownVisible, setLeadStatusDropdownVisible] = useState(false);

// // //   const { leadStatuses = [], loading: statusesLoading, error: statusesError } = useSelector(
// // //     (state) => state.leadStatus || {}
// // //   );
// // //   const { data: leadStatusDetail = {}, loading: statusLoading, error: statusError } = useSelector(
// // //     (state) => state.leadStatusById || {}
// // //   );
// // //   const { loading: feedbackLoading, error: feedbackError } = useSelector(
// // //     (state) => state.postFeedback || {}
// // //   );

// // //   const statusDetail = {
// // //     ...leadStatusDetail?.data,
// // //     meeting: leadStatusDetail?.data?.meeting || { required: false },
// // //     estimation: leadStatusDetail?.data?.estimation || { required: false },
// // //     showDescription: leadStatusDetail?.data?.showDescription || false,
// // //     isPriority: leadStatusDetail?.data?.isPriority ?? false,
// // //   };

// // //   useEffect(() => {
// // //     //('FeedbackScreen: State snapshot', {
// // //       leadStatuses: leadStatuses.length,
// // //       statusDetail,
// // //       statusesLoading,
// // //       statusLoading,
// // //       feedbackLoading,
// // //       statusesError,
// // //       statusError,
// // //       feedbackError,
// // //     });
// // //   }, [leadStatuses, statusDetail, statusesLoading, statusLoading, feedbackLoading, statusesError, statusError, feedbackError]);

// // //   useEffect(() => {
// // //     //('FeedbackScreen: Fetching all lead statuses');
// // //     dispatch(fetchAllLeadStatuses())
// // //       .unwrap()
// // //       .catch((err) => console.error('FeedbackScreen: Error fetching lead statuses:', err));
// // //   }, [dispatch]);

// // //   useEffect(() => {
// // //     if (selectedStatusId) {
// // //       //('FeedbackScreen: Fetching status details for ID:', selectedStatusId);
// // //       dispatch(fetchLeadStatusById(selectedStatusId))
// // //         .unwrap()
// // //         .catch((err) => console.error('FeedbackScreen: Error fetching status details:', err));
// // //     }
// // //   }, [dispatch, selectedStatusId]);

// // //   useEffect(() => {
// // //     return () => {
// // //       //('FeedbackScreen: Cleaning up');
// // //       dispatch(resetLeadStatusById());
// // //       dispatch(resetFeedbackState());
// // //     };
// // //   }, [dispatch]);

// // //   const handleSubmit = async (formData) => {
// // //     //('FeedbackScreen: Submitting feedback', {
// // //       selectedLeadStatus,
// // //       selectedStatusId,
// // //       formData,
// // //     });

// // //     if (!leadId) {
// // //       Alert.alert('Error', 'Lead ID is missing.');
// // //       return;
// // //     }
// // //     if (!selectedLeadStatus || !selectedStatusId) {
// // //       Alert.alert('Error', 'Please select a status.');
// // //       return;
// // //     }
// // //     if (
// // //       statusDetail.isPriority &&
// // //       (!formData.priority || !['High', 'Medium', 'Low'].includes(formData.priority))
// // //     ) {
// // //       Alert.alert('Error', 'Please select a valid priority.');
// // //       return;
// // //     }
// // //     if (
// // //       statusDetail.meeting?.required &&
// // //       (!formData.contactDate)
// // //     ) {
// // //       Alert.alert('Error', 'Please provide a valid meeting date and time.');
// // //       return;
// // //     }
// // //     if (
// // //       statusDetail.estimation?.required &&
// // //       (!formData.estimationBudget || isNaN(formData.estimationBudget) || Number(formData.estimationBudget) <= 0)
// // //     ) {
// // //       Alert.alert('Error', 'Please enter a valid estimation budget.');
// // //       return;
// // //     }

// // //     try {
// // //       const callLog = await getLatestCallLog(phoneNumber);
// // //       //('FeedbackScreen: Call log retrieved', callLog);

// // //       const method = 'phone_call';

// // //       const dialUpMethod = {
// // //         phoneNumber: callLog?.phoneNumber || phoneNumber || '',
// // //         callType: callLog?.callType || '',
// // //         callDuration: callLog?.callDuration || 0,
// // //         callStatus: callLog?.callStatus || '',
// // //         recordedFile: callLog?.recordedFile || '',
// // //         callSid: callLog?.callSid || '',
// // //         callStartTime: callLog?.callStartTime || '',
// // //         callEndTime: callLog?.callEndTime || '',
// // //       };

// // //       const payload = {
// // //         leadId,
// // //         contactDate: formData.contactDate || '',
// // //         nextFollowUpDate: formData.contactDate || '',
// // //         estimationDate: statusDetail.estimation?.required ? formData.estimationDate.toISOString() : '',
// // //         estimationBudget: statusDetail.estimation?.required ? Number(formData.estimationBudget) : 0,
// // //         priority: formData.priority || '',
// // //         method,
// // //         status: selectedStatusId,
// // //         description: statusDetail.showDescription ? formData.meetingDescription : '',
// // //         dialUpMethod,
// // //       };

// // //       //('FeedbackScreen: Submitting payload', payload);

// // //       await dispatch(postFeedback(payload)).unwrap();
// // //       Alert.alert('Success', 'Feedback submitted successfully!');
// // //       navigation.navigate('LeadsScreen'); // Explicitly navigate to LeadsScreen
// // //     } catch (error) {
// // //       console.error('FeedbackScreen: Submit error:', error);
// // //       Alert.alert('Error', error.message || feedbackError || 'Failed to submit feedback.');
// // //       dispatch(resetFeedbackState());
// // //     }
// // //   };

// // //   return (
// // //     <View style={styles.container}>
// // //       <Text style={styles.title}>Feedback</Text>
// // //       <Text style={styles.subtitle}>Call to: {phoneNumber}</Text>

// // //       {statusesLoading || statusLoading || feedbackLoading ? (
// // //         <ActivityIndicator size="large" color="#0000ff" />
// // //       ) : statusesError || statusError || feedbackError ? (
// // //         <View>
// // //           <Text style={styles.errorText}>
// // //             Error: {statusesError || statusError || feedbackError || 'Failed to load data'}
// // //           </Text>
// // //           <TouchableOpacity
// // //             style={localStyles.retryButton}
// // //             onPress={() => {
// // //               dispatch(fetchAllLeadStatuses());
// // //               if (selectedStatusId) dispatch(fetchLeadStatusById(selectedStatusId));
// // //             }}
// // //           >
// // //             <Text style={localStyles.retryButtonText}>Retry</Text>
// // //           </TouchableOpacity>
// // //         </View>
// // //       ) : (
// // //         <>
// // //           <Text style={styles.label}>Select Status</Text>
// // //           <Dropdown
// // //             visible={leadStatusDropdownVisible}
// // //             setVisible={setLeadStatusDropdownVisible}
// // //             selectedValue={selectedLeadStatus}
// // //             setSelectedValue={setSelectedLeadStatus}
// // //             options={leadStatuses}
// // //             placeholder="Select Status"
// // //             setSelectedId={setSelectedStatusId}
// // //           />
// // //           <DynamicFields statusDetail={statusDetail} onSubmit={handleSubmit} />
// // //         </>
// // //       )}
// // //     </View>
// // //   );
// // // };

// // // export default FeedbackScreen;


// // // suceeswala 

// // // import React, { useState, useEffect } from 'react';
// // // import { View, Text, TouchableOpacity, Alert, ActivityIndicator, StyleSheet } from 'react-native';
// // // import { useDispatch, useSelector } from 'react-redux';
// // // import { fetchAllLeadStatuses } from '../../redux/slices/getAllLeadStatusSlice';
// // // import { fetchLeadStatusById, resetLeadStatusById } from '../../redux/slices/getLeadStatusByIdSlice';
// // // import { postFeedback, resetFeedbackState } from '../../redux/slices/postFeedbackSlice';
// // // import { getLatestCallLog } from '../phone/CallLogs';
// // // import Dropdown from './Dropdown';
// // // import DynamicFields from './DynamicFields';
// // // import styles from './styles';
// // // import AsyncStorage from '@react-native-async-storage/async-storage';

// // // const localStyles = StyleSheet.create({
// // //   retryButton: {
// // //     backgroundColor: '#007AFF',
// // //     padding: 10,
// // //     borderRadius: 5,
// // //     marginTop: 10,
// // //     alignItems: 'center',
// // //   },
// // //   retryButtonText: {
// // //     color: '#FFFFFF',
// // //     fontSize: 16,
// // //   },
// // // });

// // // const FeedbackScreen = ({ route, navigation }) => {
// // //   const { phoneNumber = 'N/A', leadId } = route.params || {};
// // //   const dispatch = useDispatch();

// // //   const [selectedLeadStatus, setSelectedLeadStatus] = useState('');
// // //   const [selectedStatusId, setSelectedStatusId] = useState('');
// // //   const [leadStatusDropdownVisible, setLeadStatusDropdownVisible] = useState(false);

// // //   const { leadStatuses = [], loading: statusesLoading, error: statusesError } = useSelector(
// // //     (state) => state.leadStatus || {}
// // //   );
// // //   const { data: leadStatusDetail = {}, loading: statusLoading, error: statusError } = useSelector(
// // //     (state) => state.leadStatusById || {}
// // //   );
// // //   const { loading: feedbackLoading, error: feedbackError } = useSelector(
// // //     (state) => state.postFeedback || {}
// // //   );

// // //   const statusDetail = {
// // //     ...leadStatusDetail?.data,
// // //     meeting: leadStatusDetail?.data?.meeting || { required: false },
// // //     estimation: leadStatusDetail?.data?.estimation || { required: false },
// // //     showDescription: leadStatusDetail?.data?.showDescription || false,
// // //     isPriority: leadStatusDetail?.data?.isPriority || false,
// // //   };
// // // //("shubham datat ramesh ",statusDetail)
// // //   useEffect(() => {
// // //     const checkOrgId = async () => {
// // //       const orgId = await AsyncStorage.getItem('orgId');
// // //       //('FeedbackScreen: Retrieved orgId:', orgId);
// // //     };
// // //     checkOrgId();

// // //     //('FeedbackScreen: State snapshot', {
// // //       phoneNumber,
// // //       leadId,
// // //       leadStatuses: leadStatuses.length,
// // //       statusDetail,
// // //       statusesLoading,
// // //       statusLoading,
// // //       feedbackLoading,
// // //       statusesError,
// // //       statusError,
// // //       feedbackError,
// // //     });
// // //     //('FeedbackScreen: Fetching all lead statuses');
// // //     dispatch(fetchAllLeadStatuses())
// // //       .unwrap()
// // //       .catch((err) => console.error('FeedbackScreen: Error fetching lead statuses:', err));
// // //   }, [dispatch]);

// // //   useEffect(() => {
// // //     if (selectedStatusId) {
// // //       //('FeedbackScreen: Fetching status details for ID:', selectedStatusId);
// // //       dispatch(fetchLeadStatusById(selectedStatusId))
// // //         .unwrap()
// // //         .catch((err) => console.error('FeedbackScreen: Error fetching status details:', err));
// // //     }
// // //   }, [dispatch, selectedStatusId]);

// // //   useEffect(() => {
// // //     return () => {
// // //       //('FeedbackScreen: Cleaning up');
// // //       dispatch(resetLeadStatusById());
// // //       dispatch(resetFeedbackState());
// // //     };
// // //   }, [dispatch]);

// // //   const handleSubmit = async (formData) => {
// // //     //('FeedbackScreen: Submitting feedback', {
// // //       selectedLeadStatus,
// // //       selectedStatusId,
// // //       formData,
// // //     });

// // //     if (!leadId || !/^[0-9a-fA-F]{24}$/.test(leadId)) {
// // //       console.error('FeedbackScreen: Invalid or missing leadId', leadId);
// // //       Alert.alert('Error', 'Invalid or missing Lead ID.');
// // //       return;
// // //     }
// // //     if (!selectedLeadStatus || !selectedStatusId) {
// // //       console.warn('FeedbackScreen: Status not selected');
// // //       Alert.alert('Error', 'Please select a status.');
// // //       return;
// // //     }
// // //     if (
// // //       statusDetail.isPriority &&
// // //       (!formData.priority || !['High', 'Medium', 'Low'].includes(formData.priority))
// // //     ) {
// // //       console.warn('FeedbackScreen: Invalid priority', formData.priority);
// // //       Alert.alert('Error', 'Please select a valid priority.');
// // //       return;
// // //     }
// // //     if (statusDetail.meeting?.required && !formData.contactDate) {
// // //       console.warn('FeedbackScreen: Missing contact date');
// // //       Alert.alert('Error', 'Please provide a valid meeting date and time.');
// // //       return;
// // //     }
// // //     if (
// // //       statusDetail.estimation?.required &&
// // //       (!formData.estimationBudget || isNaN(formData.estimationBudget) || Number(formData.estimationBudget) <= 0)
// // //     ) {
// // //       console.warn('FeedbackScreen: Invalid estimation budget', formData.estimationBudget);
// // //       Alert.alert('Error', 'Please enter a valid estimation budget.');
// // //       return;
// // //     }

// // //     try {
// // //       //('FeedbackScreen: Fetching call log for phoneNumber', phoneNumber);
// // //       const callLog = await getLatestCallLog(phoneNumber);
// // //       //('FeedbackScreen: Call log retrieved', JSON.stringify(callLog, null, 2));

// // //       const dialUpMethod = callLog
// // //         ? {
// // //             phoneNumber: callLog.phoneNumber || '',
// // //             callType: 'Outgoing', // Force to match enum ['Outgoing']
// // //             callDuration: callLog.callDuration || 0,
// // //             callStatus: callLog.callDuration > 0 && callLog.callType === 'Outgoing' ? 'Connected' : 'Rejected',
// // //             recordedFile: callLog.recordedFile || null,
// // //             callSid: '', // Blank as requested
// // //             callStartTime: callLog.callStartTime || '',
// // //             callEndTime: callLog.callEndTime || '',
// // //           }
// // //         : {
// // //             phoneNumber: phoneNumber || '',
// // //             callType: 'Outgoing', // Force to match enum ['Outgoing']
// // //             callDuration: 0,
// // //             callStatus: 'Rejected', // Default to Rejected if no call log
// // //             recordedFile: null,
// // //             callSid: '', // Blank
// // //             callStartTime: '',
// // //             callEndTime: '',
// // //           };

// // //       const payload = {
// // //         leadId,
// // //         contactDate: formData.contactDate || '',
// // //         nextFollowUpDate: formData.contactDate || '',
// // //         estimationDate: statusDetail.estimation?.required ? formData.estimationDate.toISOString() : '',
// // //         estimationBudget: statusDetail.estimation?.required ? Number(formData.estimationBudget) : 0,
// // //         priority: formData.priority || 'Medium',
// // //         method: 'Call',
// // //         status: selectedStatusId,
// // //         description: statusDetail.showDescription ? formData.meetingDescription : '',
// // //         dialUpMethod,
// // //       };

// // //       //('FeedbackScreen: Submitting payload', JSON.stringify(payload, null, 2));

// // //       await dispatch(postFeedback(payload)).unwrap();
// // //       //('FeedbackScreen: Feedback submitted successfully');
// // //       Alert.alert('Success', 'Feedback submitted successfully!');
// // //       navigation.navigate('LeadsScreen');
// // //     } catch (error) {
// // //       console.error('FeedbackScreen: Submit error', JSON.stringify(error, null, 2));
// // //       Alert.alert('Error', error.message || feedbackError || 'Failed to submit feedback.');
// // //       dispatch(resetFeedbackState());
// // //     }
// // //   };

// // //   return (
// // //     <View style={styles.container}>
// // //       <Text style={styles.title}>Feedback</Text>
// // //       <Text style={styles.subtitle}>Call to: {phoneNumber}</Text>

// // //       {statusesLoading || statusLoading || feedbackLoading ? (
// // //         <ActivityIndicator size="large" color="#0000ff" />
// // //       ) : statusesError || statusError || feedbackError ? (
// // //         <View>
// // //           <Text style={styles.errorText}>
// // //             Error: {statusesError || statusError || feedbackError || 'Failed to load data'}
// // //           </Text>
// // //           <TouchableOpacity
// // //             style={localStyles.retryButton}
// // //             onPress={() => {
// // //               //('FeedbackScreen: Retrying fetch operations');
// // //               dispatch(fetchAllLeadStatuses());
// // //               if (selectedStatusId) dispatch(fetchLeadStatusById(selectedStatusId));
// // //             }}
// // //           >
// // //             <Text style={localStyles.retryButtonText}>Retry</Text>
// // //           </TouchableOpacity>
// // //         </View>
// // //       ) : (
// // //         <>
// // //           <Text style={styles.label}>Select Status</Text>
// // //           <Dropdown
// // //             visible={leadStatusDropdownVisible}
// // //             setVisible={setLeadStatusDropdownVisible}
// // //             selectedValue={selectedLeadStatus}
// // //             setSelectedValue={setSelectedLeadStatus}
// // //             options={leadStatuses}
// // //             placeholder="Select Status"
// // //             setSelectedId={setSelectedStatusId}
// // //           />
// // //           <DynamicFields statusDetail={statusDetail} onSubmit={handleSubmit} />
// // //         </>
// // //       )}
// // //     </View>
// // //   );
// // // };

// // // export default FeedbackScreen;



// // // import React, { useState, useEffect } from 'react';
// // // import { View, Text, TouchableOpacity, Alert, ActivityIndicator, StyleSheet } from 'react-native';
// // // import { useDispatch, useSelector } from 'react-redux';
// // // import { fetchAllLeadStatuses } from '../../redux/slices/getAllLeadStatusSlice';
// // // import { fetchLeadStatusById, resetLeadStatusById } from '../../redux/slices/getLeadStatusByIdSlice';
// // // import { postFeedback, resetFeedbackState } from '../../redux/slices/postFeedbackSlice';
// // // import { getLatestCallLog } from '../phone/CallLogs';
// // // import Dropdown from './Dropdown';
// // // import DynamicFields from './DynamicFields';
// // // import AsyncStorage from '@react-native-async-storage/async-storage';

// // // const localStyles = StyleSheet.create({
// // //   retryButton: {
// // //     backgroundColor: '#007AFF',
// // //     padding: 10,
// // //     borderRadius: 5,
// // //     marginTop: 10,
// // //     alignItems: 'center',
// // //   },
// // //   retryButtonText: {
// // //     color: '#FFFFFF',
// // //     fontSize: 16,
// // //   },
// // // });

// // // const FeedbackScreen = ({ route, navigation }) => {
// // //   const { phoneNumber = 'N/A', leadId } = route.params || {};
// // //   const dispatch = useDispatch();

// // //   const [selectedLeadStatus, setSelectedLeadStatus] = useState('');
// // //   const [selectedStatusId, setSelectedStatusId] = useState('');
// // //   const [leadStatusDropdownVisible, setLeadStatusDropdownVisible] = useState(false);
// // //   const [dialUpMethod, setDialUpMethod] = useState(null);

// // //   const { leadStatuses = [], loading: statusesLoading, error: statusesError } = useSelector(
// // //     (state) => state.leadStatus || {}
// // //   );
// // //   const { data: leadStatusDetail = {}, loading: statusLoading, error: statusError } = useSelector(
// // //     (state) => state.leadStatusById || {}
// // //   );
// // //   const { loading: feedbackLoading, error: feedbackError } = useSelector(
// // //     (state) => state.postFeedback || {}
// // //   );

// // //   const statusDetail = {
// // //     ...leadStatusDetail?.data,
// // //     meeting: leadStatusDetail?.data?.meeting || { required: false, dateLabel: '', timeLabel: '' },
// // //     estimation: leadStatusDetail?.data?.estimation || { required: false },
// // //     showDescription: leadStatusDetail?.data?.showDescription || false,
// // //     isPriority: leadStatusDetail?.data?.isPriority ?? false,
// // //   };

// // //   useEffect(() => {
// // //     const fetchCallLog = async () => {
// // //       if (phoneNumber && phoneNumber !== 'N/A') {
// // //         //('FeedbackScreen: Fetching call log for phoneNumber', phoneNumber);
// // //         const callLog = await getLatestCallLog(phoneNumber);
// // //         //('FeedbackScreen: Call log retrieved', JSON.stringify(callLog, null, 2));

// // //         const defaultDialUpMethod = {
// // //           phoneNumber: phoneNumber || '',
// // //           callType: 'Outgoing',
// // //           callDuration: '0.00',
// // //           formattedDuration: '00:00',
// // //           callStatus: 'Rejected',
// // //           recordedFile: null,
// // //           callSid: '',
// // //           callStartTime: '',
// // //           callEndTime: '',
// // //         };

// // //         setDialUpMethod(
// // //           callLog
// // //             ? {
// // //                 phoneNumber: callLog.phoneNumber || phoneNumber,
// // //                 callType: 'Outgoing',
// // //                 callDuration: callLog.callDuration,
// // //                 formattedDuration: callLog.formattedDuration,
// // //                 callStatus: callLog.callStatus,
// // //                 recordedFile: callLog.recordedFile || null,
// // //                 callSid: '',
// // //                 callStartTime: callLog.callStartTime || '',
// // //                 callEndTime: callLog.callEndTime || '',
// // //               }
// // //             : defaultDialUpMethod
// // //         );
// // //       } else {
// // //         console.warn('FeedbackScreen: Invalid phoneNumber, skipping call log fetch');
// // //         setDialUpMethod({
// // //           phoneNumber: '',
// // //           callType: 'Outgoing',
// // //           callDuration: '0.00',
// // //           formattedDuration: '00:00',
// // //           callStatus: 'Rejected',
// // //           recordedFile: null,
// // //           callSid: '',
// // //           callStartTime: '',
// // //           callEndTime: '',
// // //         });
// // //       }
// // //     };

// // //     fetchCallLog();
// // //   }, [phoneNumber]);

// // //   useEffect(() => {
// // //     const checkOrgId = async () => {
// // //       const orgId = await AsyncStorage.getItem('orgId');
// // //       //('FeedbackScreen: Retrieved orgId:', orgId);
// // //     };
// // //     checkOrgId();

// // //     //('FeedbackScreen: State snapshot', {
// // //       phoneNumber,
// // //       leadId,
// // //       leadStatuses: leadStatuses.length,
// // //       statusDetail,
// // //       statusesLoading,
// // //       statusLoading,
// // //       feedbackLoading,
// // //       statusesError,
// // //       statusError,
// // //       feedbackError,
// // //     });
// // //     dispatch(fetchAllLeadStatuses())
// // //       .unwrap()
// // //       .catch((err) => console.error('FeedbackScreen: Error fetching lead statuses:', err));
// // //   }, [dispatch]);

// // //   useEffect(() => {
// // //     if (selectedStatusId) {
// // //       //('FeedbackScreen: Fetching status details for ID:', selectedStatusId);
// // //       dispatch(fetchLeadStatusById(selectedStatusId))
// // //         .unwrap()
// // //         .catch((err) => console.error('FeedbackScreen: Error fetching status details:', err));
// // //     }
// // //   }, [dispatch, selectedStatusId]);

// // //   useEffect(() => {
// // //     return () => {
// // //       //('FeedbackScreen: Cleaning up');
// // //       dispatch(resetLeadStatusById());
// // //       dispatch(resetFeedbackState());
// // //     };
// // //   }, [dispatch]);

// // //   const handleSubmit = async (formData) => {
// // //     //('FeedbackScreen: Submitting feedback', {
// // //       selectedLeadStatus,
// // //       selectedStatusId,
// // //       formData,
// // //       dialUpMethod,
// // //     });

// // //     if (!leadId || !/^[0-9a-fA-F]{24}$/.test(leadId)) {
// // //       console.error('FeedbackScreen: Invalid or missing leadId', leadId);
// // //       Alert.alert('Error', 'Invalid or missing Lead ID.');
// // //       return;
// // //     }
// // //     if (!selectedLeadStatus || !selectedStatusId) {
// // //       console.warn('FeedbackScreen: Status not selected');
// // //       Alert.alert('Error', 'Please select a status.');
// // //       return;
// // //     }
// // //     if (
// // //       statusDetail.isPriority &&
// // //       (!formData.priority || !['Important', 'High', 'Medium', 'Low'].includes(formData.priority))
// // //     ) {
// // //       console.warn('FeedbackScreen: Invalid priority', formData.priority);
// // //       Alert.alert('Error', 'Please select a valid priority.');
// // //       return;
// // //     }
// // //     if (
// // //       statusDetail.meeting?.required &&
// // //       (!formData.nextFollowUpDate || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.*Z$/.test(formData.nextFollowUpDate))
// // //     ) {
// // //       console.warn('FeedbackScreen: Invalid next follow-up date/time', formData.nextFollowUpDate);
// // //       Alert.alert('Error', 'Please provide a valid meeting date and 24-hour time (e.g., 14:14).');
// // //       return;
// // //     }
// // //     if (
// // //       statusDetail.estimation?.required &&
// // //       (!formData.estimationBudget || isNaN(formData.estimationBudget) || Number(formData.estimationBudget) <= 0)
// // //     ) {
// // //       console.warn('FeedbackScreen: Invalid estimation budget', formData.estimationBudget);
// // //       Alert.alert('Error', 'Please enter a valid estimation budget.');
// // //       return;
// // //     }

// // //     try {
// // //       // Handle contactDateTime and dialUpMethod
// // //       const contactDateTime = new Date().toISOString();
// // //       //('FeedbackScreen: Setting contactDateTime', {
// // //         contactDateTime,
// // //       });

// // //       let callStartDateTime = '';
// // //       let callEndDateTime = '';

// // //       if (dialUpMethod) {
// // //         const isCallConnected =
// // //           dialUpMethod.callStatus === 'Connected' ||
// // //           (dialUpMethod.callDuration && parseFloat(dialUpMethod.callDuration) > 0);

// // //         //('FeedbackScreen: Call connection check', {
// // //           callStatus: dialUpMethod.callStatus,
// // //           callDuration: dialUpMethod.callDuration,
// // //           isCallConnected,
// // //         });

// // //         if (isCallConnected && dialUpMethod.callStartTime) {
// // //           const startTime = new Date(dialUpMethod.callStartTime);
// // //           if (!isNaN(startTime)) {
// // //             callStartDateTime = startTime.toISOString();
// // //             //('FeedbackScreen: Using callStartDateTime', {
// // //               callStartDateTime,
// // //               utcDate: callStartDateTime,
// // //             });
// // //           } else {
// // //             console.warn('FeedbackScreen: Invalid callStartTime', dialUpMethod.callStartTime);
// // //           }
// // //         }

// // //         if (isCallConnected && dialUpMethod.callEndTime) {
// // //           const endTime = new Date(dialUpMethod.callEndTime);
// // //           if (!isNaN(endTime)) {
// // //             callEndDateTime = endTime.toISOString();
// // //             //('FeedbackScreen: Using callEndDateTime', {
// // //               callEndDateTime,
// // //               utcDate: callEndDateTime,
// // //             });
// // //           } else {
// // //             console.warn('FeedbackScreen: Invalid callEndTime', dialUpMethod.callEndTime);
// // //           }
// // //         }

// // //         if (!isCallConnected) {
// // //           //('FeedbackScreen: Call not received/connected, setting blank timestamps for callStartDateTime and callEndDateTime');
// // //           callStartDateTime = '';
// // //           callEndDateTime = '';
// // //         }
// // //       } else {
// // //         console.warn('FeedbackScreen: No dialUpMethod, setting blank timestamps for callStartDateTime and callEndDateTime');
// // //         callStartDateTime = '';
// // //         callEndDateTime = '';
// // //       }

// // //       const payload = {
// // //         leadId,
// // //         contactDateTime, // Current timestamp for call attempt
// // //         nextFollowUpDate: formData.nextFollowUpDate || '', // From DynamicFields (ISO string)
// // //         estimationDate: statusDetail.estimation?.required ? formData.estimationDate.toISOString() : '',
// // //         estimationBudget: statusDetail.estimation?.required ? Number(formData.estimationBudget) : 0,
// // //         priority: formData.priority || 'Medium',
// // //         method: 'Call',
// // //         status: selectedStatusId,
// // //         description: statusDetail.showDescription ? formData.meetingDescription : '',
// // //         dialUpMethod: dialUpMethod
// // //           ? {
// // //               phoneNumber: dialUpMethod.phoneNumber || '',
// // //               callType: dialUpMethod.callType || 'Outgoing',
// // //               callDuration: dialUpMethod.callDuration || '0.00',
// // //               formattedDuration: dialUpMethod.formattedDuration || '00:00',
// // //               callStatus: dialUpMethod.callStatus || 'Rejected',
// // //               recordedFile: dialUpMethod.recordedFile || null,
// // //               callSid: dialUpMethod.callSid || '',
// // //               callStartDateTime,
// // //               callEndDateTime,
// // //             }
// // //           : {
// // //               phoneNumber: phoneNumber || '',
// // //               callType: 'Outgoing',
// // //               callDuration: '0.00',
// // //               formattedDuration: '00:00',
// // //               callStatus: 'Rejected',
// // //               recordedFile: null,
// // //               callSid: '',
// // //               callStartDateTime: '',
// // //               callEndDateTime: '',
// // //             },
// // //       };

// // //       //('FeedbackScreen: Submitting payload', JSON.stringify(payload, null, 2));

// // //       await dispatch(postFeedback(payload)).unwrap();
// // //       //('FeedbackScreen: Feedback submitted successfully');
// // //       Alert.alert('Success', 'Feedback submitted successfully!');
// // //       navigation.navigate('LeadsScreen');
// // //     } catch (error) {
// // //       console.error('FeedbackScreen: Submit error', JSON.stringify(error, null, 2));
// // //       Alert.alert('Error', error.message || feedbackError || 'Failed to submit feedback.');
// // //       dispatch(resetFeedbackState());
// // //     }
// // //   };

// // //   return (
// // //     <View className="flex-1 p-5">
// // //       <Text className="text-[24px] text-black font-bold mb-5">Feedback</Text>
// // //       <Text className="text-[15px] text-black mb-5">
// // //         Call to: {phoneNumber} {dialUpMethod?.formattedDuration ? `(${dialUpMethod.formattedDuration})` : ''}
// // //       </Text>

// // //       {statusesLoading || statusLoading || feedbackLoading ? (
// // //         <ActivityIndicator size="large" color="#0000ff" />
// // //       ) : statusesError || statusError || feedbackError ? (
// // //         <View>
// // //           <Text className="text-red-500 text-[15px]">
// // //             Error: {statusesError || statusError || feedbackError || 'Failed to load data'}
// // //           </Text>
// // //           <TouchableOpacity
// // //             className="bg-[#007AFF] p-2.5 rounded-md mt-2.5 items-center"
// // //             onPress={() => {
// // //               //('FeedbackScreen: Retrying fetch operations');
// // //               dispatch(fetchAllLeadStatuses());
// // //               if (selectedStatusId) dispatch(fetchLeadStatusById(selectedStatusId));
// // //             }}
// // //           >
// // //             <Text className="text-white text-base">Retry</Text>
// // //           </TouchableOpacity>
// // //         </View>
// // //       ) : (
// // //         <>
// // //           <Text className="text-[15px] text-black font-semibold mb-1">Select Status</Text>
// // //           <Dropdown
// // //             visible={leadStatusDropdownVisible}
// // //             setVisible={setLeadStatusDropdownVisible}
// // //             selectedValue={selectedLeadStatus}
// // //             setSelectedValue={setSelectedLeadStatus}
// // //             options={leadStatuses}
// // //             placeholder="Select Status"
// // //             setSelectedId={setSelectedStatusId}
// // //           />
// // //           <DynamicFields statusDetail={statusDetail} onSubmit={handleSubmit} />
// // //         </>
// // //       )}
// // //     </View>
// // //   );
// // // };

// // // export default FeedbackScreen;


// //   import React, { useState, useEffect } from 'react';
// //   import { View, Text, TouchableOpacity, Alert, ActivityIndicator, StyleSheet } from 'react-native';
// //   import { useDispatch, useSelector } from 'react-redux';
// //   import { fetchAllLeadStatuses } from '../../redux/slices/getAllLeadStatusSlice';
// //   import { fetchLeadStatusById, resetLeadStatusById } from '../../redux/slices/getLeadStatusByIdSlice';
// //   import { postFeedback, resetFeedbackState } from '../../redux/slices/postFeedbackSlice';
// //   import { getLatestCallLog } from '../phone/CallLogs';
// //   import Dropdown from './Dropdown';
// //   import DynamicFields from './DynamicFields';
// // import LinearGradient from 'react-native-linear-gradient';
// // import { RFPercentage } from 'react-native-responsive-fontsize';

// //   const localStyles = StyleSheet.create({
// //     retryButton: { backgroundColor: '#007AFF', padding: 10, borderRadius: 5, marginTop: 10, alignItems: 'center' },
// //     retryButtonText: { color: '#FFFFFF', fontSize: 16 },
// //     submitButton: { backgroundColor: '#007AFF', padding: 10, borderRadius: 5, marginTop: 20, alignItems: 'center' },
// //     submitButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
// //   });

// //   const FeedbackScreen = ({ route, navigation }) => {
// //     const { phoneNumber = 'N/A', leadId, isManual = false } = route.params || {};
// //     const dispatch = useDispatch();

// //     const [selectedLeadStatus, setSelectedLeadStatus] = useState('');
// //     const [selectedStatusId, setSelectedStatusId] = useState('');
// //     const [leadStatusDropdownVisible, setLeadStatusDropdownVisible] = useState(false);
// //     const [dialUpMethod, setDialUpMethod] = useState(null);
// //     const [formData, setFormData] = useState({});

// //     const { leadStatuses = [], loading: statusesLoading, error: statusesError } = useSelector(
// //       (state) => state.leadStatus || {}
// //     );
// //     const { data: leadStatusDetail = {}, loading: statusLoading, error: statusError } = useSelector(
// //       (state) => state.leadStatusById || {}
// //     );
// //     const { loading: feedbackLoading, error: feedbackError } = useSelector(
// //       (state) => state.postFeedback || {}
// //     );

// //     // Normalized statusDetail with dynamic label fallbacks
// //     const statusDetail = {
// //       ...leadStatusDetail?.data,
// //       meeting: {
// //         required: leadStatusDetail?.data?.meeting?.required || false,
// //         dateLabel: leadStatusDetail?.data?.meeting?.dateLable || 'Meeting Date',
// //         timeLabel: leadStatusDetail?.data?.meeting?.timeLable || 'Meeting Time',
// //       },
// //       estimation: {
// //         required: leadStatusDetail?.data?.estimation?.required || false,
// //         dateLabel: leadStatusDetail?.data?.estimation?.dateLable || 'Estimation Date',
// //         budgetLabel: leadStatusDetail?.data?.estimation?.timeLable || 'Estimation Budget', // Note: Using timeLable as budgetLabel for consistency with JSON
// //       },
// //       showDescription: leadStatusDetail?.data?.showDescription || false,
// //       isPriority: leadStatusDetail?.data?.isPriority ?? false,
// //       descriptionLabel: leadStatusDetail?.data?.descriptionLable || 'Description',
// //       name: leadStatusDetail?.data?.name || '',
// //     };

// //     // Fetch call log only if not manual entry
// //     useEffect(() => {
// //       const fetchCallLog = async () => {
// //         if (isManual || !phoneNumber || phoneNumber === 'N/A') {
// //           //('FeedbackScreen: Manual entry or invalid phoneNumber, skipping call log');
// //           setDialUpMethod(null);
// //           return;
// //         }

// //         //('FeedbackScreen: Fetching call log for phoneNumber', phoneNumber);
// //         const callLog = await getLatestCallLog(phoneNumber);
// //         //('FeedbackScreen: Call log retrieved', JSON.stringify(callLog, null, 2));

// //         const defaultDialUpMethod = {
// //           phoneNumber: phoneNumber || '',
// //           callType: 'Outgoing',
// //           callDuration: '0.00',
// //           formattedDuration: '00:00',
// //           callStatus: 'Rejected',
// //           recordedFile: null,
// //           callSid: '',
// //           callStartTime: '',
// //           callEndTime: '',
// //         };

// //         setDialUpMethod(
// //           callLog
// //             ? {
// //                 phoneNumber: callLog.phoneNumber || phoneNumber,
// //                 callType: 'Outgoing',
// //                 callDuration: callLog.callDuration,
// //                 formattedDuration: callLog.formattedDuration,
// //                 callStatus: callLog.callStatus,
// //                 recordedFile: callLog.recordedFile || null,
// //                 callSid: '',
// //                 callStartTime: callLog.callStartTime || '',
// //                 callEndTime: callLog.callEndTime || '',
// //               }
// //             : defaultDialUpMethod
// //         );
// //       };

// //       fetchCallLog();
// //     }, [phoneNumber, isManual]);

// //     // Fetch lead statuses
// //     useEffect(() => {
// //       //('FeedbackScreen: Fetching lead statuses');
// //       dispatch(fetchAllLeadStatuses())
// //         .unwrap()
// //         .catch((err) => console.error('FeedbackScreen: Error fetching lead statuses:', err));
// //     }, [dispatch]);

// //     // Fetch status details when status ID changes
// //     useEffect(() => {
// //       if (selectedStatusId) {
// //         //('FeedbackScreen: Fetching status details for ID:', selectedStatusId);
// //         dispatch(fetchLeadStatusById(selectedStatusId))
// //           .unwrap()
// //           .catch((err) => console.error('FeedbackScreen: Error fetching status details:', err));
// //       }
// //     }, [dispatch, selectedStatusId]);

// //     // Cleanup on unmount
// //     useEffect(() => {
// //       return () => {
// //         //('FeedbackScreen: Cleaning up');
// //         dispatch(resetLeadStatusById());
// //         dispatch(resetFeedbackState());
// //       };
// //     }, [dispatch]);

// //     // Handle dynamic fields submission
// //     const handleDynamicFieldsSubmit = (data) => {
// //       //('FeedbackScreen: Received dynamic fields data', JSON.stringify(data, null, 2));
// //       setFormData(data);
// //     };

// //     // Handle form submission
// //     const handleSubmit = async () => {
// //       //('FeedbackScreen: Submitting feedback', { selectedLeadStatus, selectedStatusId, formData, dialUpMethod });

// //       // Validation
// //       if (!leadId || !/^[0-9a-fA-F]{24}$/.test(leadId)) {
// //         Alert.alert('Error', 'Invalid or missing Lead ID.');
// //         return;
// //       }
// //       if (!selectedLeadStatus || !selectedStatusId) {
// //         Alert.alert('Error', 'Please select a status.');
// //         return;
// //       }
// //       if (
// //         statusDetail.isPriority &&
// //         (!formData.priority || !['Important', 'High', 'Medium', 'Low'].includes(formData.priority))
// //       ) {
// //         Alert.alert('Error', 'Please select a valid priority.');
// //         return;
// //       }
// //       if (
// //         statusDetail.meeting?.required &&
// //         (!formData.nextFollowUpDate || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.*Z$/.test(formData.nextFollowUpDate))
// //       ) {
// //         Alert.alert('Error', 'Please provide a valid meeting date and time.');
// //         return;
// //       }
// //       if (
// //         statusDetail.estimation?.required &&
// //         (!formData.estimationBudget || isNaN(formData.estimationBudget) || Number(formData.estimationBudget) <= 0)
// //       ) {
// //         Alert.alert('Error', 'Please enter a valid estimation budget.');
// //         return;
// //       }
// //       if (
// //         statusDetail.estimation?.required &&
// //         (!formData.estimationDate || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.*Z$/.test(formData.estimationDate))
// //       ) {
// //         Alert.alert('Error', 'Please provide a valid estimation date.');
// //         return;
// //       }
// //       if (statusDetail.name === 'Active' && !formData.address?.trim()) {
// //         Alert.alert('Error', 'Please provide an address.');
// //         return;
// //       }
// //       if (statusDetail.name === 'Inactive' && !formData.reason?.trim()) {
// //         Alert.alert('Error', 'Please provide a reason for inactivity.');
// //         return;
// //       }

// //       try {
// //         const contactDateTime = new Date().toISOString();
// //         let callStartDateTime = '';
// //         let callEndDateTime = '';

// //         if (dialUpMethod && !isManual) {
// //           const isCallConnected =
// //             dialUpMethod.callStatus === 'Connected' ||
// //             (dialUpMethod.callDuration && parseFloat(dialUpMethod.callDuration) > 0);

// //           if (isCallConnected && dialUpMethod.callStartTime) {
// //             const startTime = new Date(dialUpMethod.callStartTime);
// //             if (!isNaN(startTime)) callStartDateTime = startTime.toISOString();
// //           }
// //           if (isCallConnected && dialUpMethod.callEndTime) {
// //             const endTime = new Date(dialUpMethod.callEndTime);
// //             if (!isNaN(endTime)) callEndDateTime = endTime.toISOString();
// //           }
// //         }

// //         const payload = {
// //           leadId,
// //           contactDateTime,
// //           nextFollowUpDate: formData.nextFollowUpDate || '',
// //           estimationDate: statusDetail.estimation?.required ? formData.estimationDate : '',
// //           estimationBudget: statusDetail.estimation?.required ? Number(formData.estimationBudget) : 0,
// //           priority: formData.priority || 'Medium',
// //           method: isManual ? 'Manual' : 'Call',
// //           status: selectedStatusId,
// //           description: statusDetail.showDescription ? formData.meetingDescription : '',
// //           address: statusDetail.name === 'Active' ? formData.address : '',
// //           reason: statusDetail.name === 'Inactive' ? formData.reason : '',
// //           ...(dialUpMethod && !isManual
// //             ? {
// //                 dialUpMethod: {
// //                   phoneNumber: dialUpMethod.phoneNumber || '',
// //                   callType: dialUpMethod.callType || 'Outgoing',
// //                   callDuration: dialUpMethod.callDuration || '0.00',
// //                   formattedDuration: dialUpMethod.formattedDuration || '00:00',
// //                   callStatus: dialUpMethod.callStatus || 'Rejected',
// //                   recordedFile: dialUpMethod.recordedFile || null,
// //                   callSid: dialUpMethod.callSid || '',
// //                   callStartDateTime,
// //                   callEndDateTime,
// //                 },
// //               }
// //             : {}),
// //         };

// //         //('FeedbackScreen: Submitting payload', JSON.stringify(payload, null, 2));
// //         await dispatch(postFeedback(payload)).unwrap();
// //         Alert.alert('Success', 'Feedback submitted successfully!');
// //         navigation.navigate('LeadsScreen');
// //       } catch (error) {
// //         console.error('FeedbackScreen: Submit error', JSON.stringify(error, null, 2));
// //         Alert.alert('Error', error.message || feedbackError || 'Failed to submit feedback.');
// //         dispatch(resetFeedbackState());
// //       }
// //     };

// //     return (
// //       <View className="flex-1 p-5">
// //   <View className="flex-row justify-between items-center h-[50px] px-4 py-3 border-b border-[#C5C5C5] mt-2">
// //         <Text
// //           className="text-[2.5] text-[#000000] font-semibold font-poppins"
// //           style={{ fontSize: RFPercentage(2.5) }}
// //         >
// // Feedback     
// //    </Text>
// //         <TouchableOpacity
// //           onPress={() => navigation.navigate('LeadsScreen')}
// //           className="flex-row items-center gap-1"
// //           accessibilityLabel="Go back to previous screen"
// //         >
// //           <LinearGradient
// //             colors={['#8290EA', '#3F4CA0']}
// //             start={{ x: 0, y: 0 }}
// //             end={{ x: 1, y: 0 }}
// //             className="rounded-lg px-4 p-1 w-16 flex-row items-center justify-center"
// //           >
// //             <Text
// //               className="text-white text-sm font-poppins font-medium"
// //               style={{ fontSize: RFPercentage(2) }}
// //             >
// //               Back
// //             </Text>
// //           </LinearGradient>
// //         </TouchableOpacity>
// //       </View>        <Text className="text-[15px] text-black mb-5">
// //           {isManual ? 'Manual Feedback' : `Call to: ${phoneNumber} ${dialUpMethod?.formattedDuration ? `(${dialUpMethod.formattedDuration})` : ''}`}
// //         </Text>

// //         {statusesLoading || statusLoading || feedbackLoading ? (
// //           <ActivityIndicator size="large" color="#0000ff" />
// //         ) : statusesError || statusError || feedbackError ? (
// //           <View>
// //             <Text className="text-red-500 text-[15px]">
// //               Error: {statusesError || statusError || feedbackError || 'Failed to load data'}
// //             </Text>
// //             <TouchableOpacity
// //               style={localStyles.retryButton}
// //               onPress={() => {
// //                 dispatch(fetchAllLeadStatuses());
// //                 if (selectedStatusId) dispatch(fetchLeadStatusById(selectedStatusId));
// //               }}
// //             >
// //               <Text style={localStyles.retryButtonText}>Retry</Text>
// //             </TouchableOpacity>
// //           </View>
// //         ) : (
// //           <>
// //             <Text className="text-[15px] text-black font-semibold mb-1">Select Status</Text>
// //             <Dropdown
// //               visible={leadStatusDropdownVisible}
// //               setVisible={setLeadStatusDropdownVisible}
// //               selectedValue={selectedLeadStatus}
// //               setSelectedValue={setSelectedLeadStatus}
// //               options={leadStatuses}
// //               placeholder="Select Status"
// //               setSelectedId={setSelectedStatusId}
// //             />
// //             <DynamicFields
// //               statusDetail={statusDetail}
// //               onSubmit={handleDynamicFieldsSubmit}
// //               initialData={formData}
// //             />
// //             <TouchableOpacity style={localStyles.submitButton} onPress={handleSubmit}>
// //               <Text style={localStyles.submitButtonText}>Submit</Text>
// //             </TouchableOpacity>
// //           </>
// //         )}
// //       </View>
// //     );
// //   };

// //   export default FeedbackScreen;


// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, Alert, ActivityIndicator, StyleSheet } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchAllLeadStatuses } from '../../redux/slices/getAllLeadStatusSlice';
// import { fetchLeadStatusById, resetLeadStatusById } from '../../redux/slices/getLeadStatusByIdSlice';
// import { postFeedback, resetFeedbackState } from '../../redux/slices/postFeedbackSlice';
// import { getLatestCallLog } from '../phone/CallLogs';
// import Dropdown from './Dropdown';
// import DynamicFields from './DynamicFields';
// import LinearGradient from 'react-native-linear-gradient';
// import { RFPercentage } from 'react-native-responsive-fontsize';

// const localStyles = StyleSheet.create({
//   retryButton: { backgroundColor: '#007AFF', padding: 10, borderRadius: 5, marginTop: 10, alignItems: 'center' },
//   retryButtonText: { color: '#FFFFFF', fontSize: 16 },
//   submitButton: { backgroundColor: '#007AFF', padding: 10, borderRadius: 5, marginTop: 20, alignItems: 'center' },
//   submitButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
// });

// const FeedbackScreen = ({ route, navigation }) => {
//   const { phoneNumber = 'N/A', leadId, isManual = false } = route.params || {};
//   const dispatch = useDispatch();

//   const [selectedLeadStatus, setSelectedLeadStatus] = useState('');
//   const [selectedStatusId, setSelectedStatusId] = useState('');
//   const [leadStatusDropdownVisible, setLeadStatusDropdownVisible] = useState(false);
//   const [dialUpMethod, setDialUpMethod] = useState(null);
//   const [formData, setFormData] = useState({});

//   const { leadStatuses = [], loading: statusesLoading, error: statusesError } = useSelector(
//     (state) => state.leadStatus || {}
//   );
//   const { data: leadStatusDetail = {}, loading: statusLoading, error: statusError } = useSelector(
//     (state) => state.leadStatusById || {}
//   );
//   const { loading: feedbackLoading, error: feedbackError } = useSelector(
//     (state) => state.postFeedback || {}
//   );

//   // Normalized statusDetail with dynamic label fallbacks
//   const statusDetail = {
//     ...leadStatusDetail?.data,
//     meeting: {
//       required: leadStatusDetail?.data?.meeting?.required || false,
//       dateLabel: leadStatusDetail?.data?.meeting?.dateLable || 'Meeting Date',
//       timeLabel: leadStatusDetail?.data?.meeting?.timeLable || 'Meeting Time',
//     },
//     estimation: {
//       required: leadStatusDetail?.data?.estimation?.required || false,
//       dateLabel: leadStatusDetail?.data?.estimation?.dateLable || 'Estimation Date',
//       budgetLabel: leadStatusDetail?.data?.estimation?.timeLable || 'Estimation Budget',
//     },
//     showDescription: leadStatusDetail?.data?.showDescription || false,
//     isPriority: leadStatusDetail?.data?.isPriority ?? false,
//     descriptionLabel: leadStatusDetail?.data?.descriptionLable || 'Description',
//     name: leadStatusDetail?.data?.name || '',
//   };

//   // Fetch call log only if not manual entry
//   useEffect(() => {
//     const fetchCallLog = async () => {
//       if (isManual || !phoneNumber || phoneNumber === 'N/A') {
//         //('FeedbackScreen: Manual entry or invalid phoneNumber, skipping call log');
//         setDialUpMethod(null);
//         return;
//       }

//       //('FeedbackScreen: Fetching call log for phoneNumber', phoneNumber);
//       const callLog = await getLatestCallLog(phoneNumber);
//       //('FeedbackScreen: Call log retrieved', JSON.stringify(callLog, null, 2));

//       const defaultDialUpMethod = {
//         phoneNumber: phoneNumber || '',
//         callType: 'Outgoing',
//         callDuration: '0.00',
//         formattedDuration: '00:00',
//         callStatus: 'Rejected',
//         recordedFile: null,
//         callSid: '',
//         callStartTime: '',
//         callEndTime: '',
//       };

//       setDialUpMethod(
//         callLog
//           ? {
//               phoneNumber: callLog.phoneNumber || phoneNumber,
//               callType: 'Outgoing',
//               callDuration: callLog.callDuration,
//               formattedDuration: callLog.formattedDuration,
//               callStatus: callLog.callStatus,
//               recordedFile: callLog.recordedFile || null,
//               callSid: '',
//               callStartTime: callLog.callStartTime || '',
//               callEndTime: callLog.callEndTime || '',
//             }
//           : defaultDialUpMethod
//       );
//     };

//     fetchCallLog();
//   }, [phoneNumber, isManual]);

//   // Fetch lead statuses
//   useEffect(() => {
//     //('FeedbackScreen: Fetching lead statuses');
//     dispatch(fetchAllLeadStatuses())
//       .unwrap()
//       .catch((err) => console.error('FeedbackScreen: Error fetching lead statuses:', err));
//   }, [dispatch]);

//   // Fetch status details when status ID changes
//   useEffect(() => {
//     if (selectedStatusId) {
//       //('FeedbackScreen: Fetching status details for ID:', selectedStatusId);
//       dispatch(fetchLeadStatusById(selectedStatusId))
//         .unwrap()
//         .catch((err) => console.error('FeedbackScreen: Error fetching status details:', err));
//     }
//   }, [dispatch, selectedStatusId]);

//   // Cleanup on unmount
//   useEffect(() => {
//     return () => {
//       //('FeedbackScreen: Cleaning up');
//       dispatch(resetLeadStatusById());
//       dispatch(resetFeedbackState());
//     };
//   }, [dispatch]);

//   // Handle dynamic fields submission
//   const handleDynamicFieldsSubmit = (data) => {
//     //('FeedbackScreen: Received dynamic fields data', JSON.stringify(data, null, 2));
//     setFormData(data);
//   };

//   // Handle form submission
//   const handleSubmit = async () => {
//     //('FeedbackScreen: Submitting feedback', { selectedLeadStatus, selectedStatusId, formData, dialUpMethod });

//     // Validation
//     if (!leadId || !/^[0-9a-fA-F]{24}$/.test(leadId)) {
//       Alert.alert('Error', 'Invalid or missing Lead ID.');
//       return;
//     }
//     if (!selectedLeadStatus || !selectedStatusId) {
//       Alert.alert('Error', 'Please select a status.');
//       return;
//     }
//     if (
//       statusDetail.isPriority &&
//       (!formData.priority || !['Important', 'High', 'Medium', 'Low'].includes(formData.priority))
//     ) {
//       Alert.alert('Error', 'Please select a valid priority.');
//       return;
//     }
//     if (
//       statusDetail.meeting?.required &&
//       (!formData.nextFollowUpDate || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.*Z$/.test(formData.nextFollowUpDate))
//     ) {
//       Alert.alert('Error', 'Please provide a valid meeting date and time.');
//       return;
//     }
//     if (
//       statusDetail.estimation?.required &&
//       (!formData.estimationBudget || isNaN(formData.estimationBudget) || Number(formData.estimationBudget) <= 0)
//     ) {
//       Alert.alert('Error', 'Please enter a valid estimation budget.');
//       return;
//     }
//     if (
//       statusDetail.estimation?.required &&
//       (!formData.estimationDate || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.*Z$/.test(formData.estimationDate))
//     ) {
//       Alert.alert('Error', 'Please provide a valid estimation date.');
//       return;
//     }
//     if (statusDetail.name === 'Active' && !formData.address?.trim()) {
//       Alert.alert('Error', 'Please provide an address.');
//       return;
//     }
//     if (statusDetail.name === 'Inactive' && !formData.reason?.trim()) {
//       Alert.alert('Error', 'Please provide a reason for inactivity.');
//       return;
//     }

//     try {
//       const contactDateTime = new Date().toISOString();
//       let callStartDateTime = '';
//       let callEndDateTime = '';

//       if (dialUpMethod && !isManual) {
//         const isCallConnected =
//           dialUpMethod.callStatus === 'Connected' ||
//           (dialUpMethod.callDuration && parseFloat(dialUpMethod.callDuration) > 0);

//         if (isCallConnected && dialUpMethod.callStartTime) {
//           const startTime = new Date(dialUpMethod.callStartTime);
//           if (!isNaN(startTime)) callStartDateTime = startTime.toISOString();
//         }
//         if (isCallConnected && dialUpMethod.callEndTime) {
//           const endTime = new Date(dialUpMethod.callEndTime);
//           if (!isNaN(endTime)) callEndDateTime = endTime.toISOString();
//         }
//       }

//       const payload = {
//         leadId,
//         contactDateTime,
//         nextFollowUpDate: formData.nextFollowUpDate || '',
//         estimationDate: statusDetail.estimation?.required ? formData.estimationDate : '',
//         estimationBudget: statusDetail.estimation?.required ? Number(formData.estimationBudget) : 0,
//         priority: formData.priority || 'Medium',
//         method: isManual ? 'Manual' : 'Call',
//         status: selectedStatusId,
//         description: statusDetail.showDescription ? formData.meetingDescription : '',
//         address: statusDetail.name === 'Active' ? formData.address : '',
//         reason: statusDetail.name === 'Inactive' ? formData.reason : '',
//         ...(dialUpMethod && !isManual
//           ? {
//               dialUpMethod: {
//                 phoneNumber: dialUpMethod.phoneNumber || '',
//                 callType: dialUpMethod.callType || 'Outgoing',
//                 callDuration: dialUpMethod.callDuration || '0.00',
//                 formattedDuration: dialUpMethod.formattedDuration || '00:00',
//                 callStatus: dialUpMethod.callStatus || 'Rejected',
//                 recordedFile: dialUpMethod.recordedFile || null,
//                 callSid: dialUpMethod.callSid || '',
//                 callStartDateTime,
//                 callEndDateTime,
//               },
//             }
//           : {}),
//       };

//       //('FeedbackScreen: Submitting payload', JSON.stringify(payload, null, 2));
//       await dispatch(postFeedback(payload)).unwrap();
//       Alert.alert('Success', 'Feedback submitted successfully!');
//       navigation.navigate('LeadsScreen');
//     } catch (error) {
//       console.error('FeedbackScreen: Submit error', JSON.stringify(error, null, 2));
//       Alert.alert('Error', error.message || feedbackError || 'Failed to submit feedback.');
//       dispatch(resetFeedbackState());
//     }
//   };

//   return (
//     <View className="flex-1 bg-white">
//       {/* Updated Header to match LeadDetailsScreen */}
//       <View className="flex-row justify-between items-center h-[60px] px-4 py-2 bg-white border-b border-[#E5E7EB] shadow-sm">
//       {/* Header Title */}
//       <Text
//         className="text-[#1F2937] font-bold font-poppins"
//         style={{ fontSize: RFPercentage(2.8) }}
//       >
//         Feedback
//       </Text>

//       {/* Back Button */}
//       <TouchableOpacity
//         onPress={() => navigation.navigate('LeadsScreen')}
//         className="flex-row items-center gap-2"
//         accessibilityLabel="Go back to Leads screen"
//       >
//         <LinearGradient
//             colors={['#8290EA', '#3F4CA0']}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 0 }}
//           className="rounded-lg px-4 py-1 flex-row items-center justify-center"
//         >
//           <Text
//             className="text-white font-poppins font-medium"
//             style={{ fontSize: RFPercentage(2) }}
//           >
//             Back
//           </Text>
//         </LinearGradient>
//       </TouchableOpacity>
//     </View>
// <View className='p-5'>
//       <Text className="text-[15px] text-black mb-5">
//         {isManual ? 'Manual Feedback' : `Call to: ${phoneNumber} ${dialUpMethod?.formattedDuration ? `(${dialUpMethod.formattedDuration})` : ''}`}
//       </Text>

//       {statusesLoading || statusLoading || feedbackLoading ? (
//         <ActivityIndicator size="large" color="#0000ff" />
//       ) : statusesError || statusError || feedbackError ? (
//         <View>
//           <Text className="text-red-500 text-[15px]">
//             Error: {statusesError || statusError || feedbackError || 'Failed to load data'}
//           </Text>
//           <TouchableOpacity
//             style={localStyles.retryButton}
//             onPress={() => {
//               dispatch(fetchAllLeadStatuses());
//               if (selectedStatusId) dispatch(fetchLeadStatusById(selectedStatusId));
//             }}
//           >
//             <Text style={localStyles.retryButtonText}>Retry</Text>
//           </TouchableOpacity>
//         </View>
//       ) : (
//         <>
//           <Text className="text-[15px] text-black font-semibold mb-1">Select Status</Text>
//           <Dropdown
//             visible={leadStatusDropdownVisible}
//             setVisible={setLeadStatusDropdownVisible}
//             selectedValue={selectedLeadStatus}
//             setSelectedValue={setSelectedLeadStatus}
//             options={leadStatuses}
//             placeholder="Select Status"
//             setSelectedId={setSelectedStatusId}
//           />
//           <DynamicFields
//             statusDetail={statusDetail}
//             onSubmit={handleDynamicFieldsSubmit}
//             initialData={formData}
//           />
//           {/* <TouchableOpacity onPress={handleSubmit} 
//               className="rounded-md p-3 w-32 justify-center items-center " // Added padding and width to LinearGradient

//           >
//               <LinearGradient
//                 colors={['#3B82F6', '#1D4ED8']} // Changed to green gradient
//                 className="rounded-md p-3 w-32 items-center" // Added padding and width to LinearGradient
//               >

//             <Text style={localStyles.submitButtonText}>Submit</Text>
//                           </LinearGradient>

//           </TouchableOpacity> */}
//             <  TouchableOpacity
//             className="p-3 rounded-md w-32 items-center mt-5 self-center"
//             // addLeadLoading || !selectedAssignToId ? 'opacity-60' : ''
//             onPress={handleSubmit}
//             // disabled={addLeadLoading || !selectedAssignToId}
//           >
//             <LinearGradient
//               colors={['#3B82F6', '#1D4ED8']} // Changed to green gradient
//               className="rounded-md p-3 w-32 items-center" // Added padding and width to LinearGradient
//             >
//               <Text className="text-white text-sm font-medium">
//                 {/* {addLeadLoading ? 'Submitting...' : 'Submit'} */}
//                 Submit
//               </Text>
//             </LinearGradient>
//           </TouchableOpacity>
//         </>
//       )}
//     </View>
//     </View>
//   );
// };

// export default FeedbackScreen;

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllLeadStatuses } from '../../redux/slices/getAllLeadStatusSlice';
import { fetchLeadStatusById, resetLeadStatusById } from '../../redux/slices/getLeadStatusByIdSlice';
import { postFeedback, resetFeedbackState } from '../../redux/slices/postFeedbackSlice';
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
        backScreenName="LeadsScreen"
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