
import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { styled } from 'nativewind';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { fetchAllBranches } from '../redux/slices/getActiveBranchesSlice';
// import { fetchAllSources } from '../redux/slices/getActiveSourceSlice';
// import { fetchAllLeadStatuses } from '../redux/slices/getAllLeadStatusSlice';
// import { fetchAllBranches } from '../redux/slices/getActiveBranchesSlice';
import { fetchLeadStatusById, resetLeadStatusById,createDialLead, resetDialLeadState,fetchAllEmployees,fetchAllLeadStatuses,fetchAllSources, } from '../redux/slice/index';
// import { fetchLeadStatusById, resetLeadStatusById } from '../redux/slices/getLeadStatusByIdSlice';
// import { createDialLead, resetDialLeadState } from '../redux/slices/addLeadDialSlice';
// import { fetchAllEmployees } from '../redux/slices/getActiveEmployeesSlice';
import Header from '../component/Header';
import CustomButton from '../component/CustomButton';
import Toast from 'react-native-toast-message';
import { toastConfig } from '../component/toastConfig';
import { RFPercentage } from 'react-native-responsive-fontsize';
import DynamicFields from './phone/DynamicFields';

// Styled components
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);

const ContactFeedbackForm = ({ route, navigation }) => {
  const { phoneNumber = 'N/A', leadId, isManual = false, contact } = route.params || {};
  const dispatch = useDispatch();
  const isMounted = useRef(true);

  // Log route params for debugging
  useEffect(() => {
    console.log('ContactFeedbackForm: Received route params:', {
      phoneNumber,
      leadId,
      isManual,
      contact,
    });
  }, [route.params]);

  // Form state with ensured prefilled values from contact
  const [formData, setFormData] = useState({
    name: contact?.name || '',
    email: contact?.email || '',
    phone: contact?.phone || phoneNumber,
    source: '',
    sourceId: '',
    branch: '',
    branchId: '',
    leadStatus: '',
    leadStatusId: null,
    assignedTo: '',
    assignedToName: '',
    dynamicFields: {},
  });
  const [formErrors, setFormErrors] = useState({});
  const [sourceDropdownVisible, setSourceDropdownVisible] = useState(false);
  const [branchDropdownVisible, setBranchDropdownVisible] = useState(false);
  const [leadStatusDropdownVisible, setLeadStatusDropdownVisible] = useState(false);
  const [assignedToDropdownVisible, setAssignedToDropdownVisible] = useState(false);

  // Redux selectors
  const { activeBranches: branches = [], loading: branchesLoading } = useSelector(
    (state) => state.activeBranches || {}
  );
  const { activeSource: sources = [], loading: sourcesLoading } = useSelector(
    (state) => state.activeSource || {}
  );
  const { leadStatuses = [], loading: statusesLoading } = useSelector(
    (state) => state.leadStatus || {}
  );
  const { data: leadStatusDetail = {}, loading: statusLoading } = useSelector(
    (state) => state.leadStatusById || {}
  );
  const { loading: dialLeadLoading, error: dialLeadError, success: dialLeadSuccess } = useSelector(
    (state) => state.dialLead || {}
  );
  const { activeEmployees: rawEmployees = [], loading: employeesLoading } = useSelector(
    (state) => state.activeEmployees || {}
  );

  // Normalize employee data
  const employees = rawEmployees.map((emp) => ({
    ...emp,
    _id: emp.empId || emp.id,
  }));

  // Normalized statusDetail
  const statusDetail = {
    meeting: {
      required: leadStatusDetail?.data?.meeting?.required || false,
      dateLabel: leadStatusDetail?.data?.meeting?.dateLabel || 'Meeting Date',
      timeLabel: leadStatusDetail?.data?.meeting?.timeLabel || 'Meeting Time',
    },
    estimation: {
      required: leadStatusDetail?.data?.estimation?.required || false,
      dateLabel: leadStatusDetail?.data?.estimation?.dateLabel || 'Estimation Date',
      budgetLabel: leadStatusDetail?.data?.estimation?.budgetLabel || 'Estimation Budget',
    },
    showDescription: leadStatusDetail?.data?.showDescription || false,
    isPriority: leadStatusDetail?.data?.isPriority ?? false,
    descriptionLabel: leadStatusDetail?.data?.descriptionLabel || 'Description',
    name: leadStatusDetail?.data?.name || '',
  };

  // Fetch initial data
  useEffect(() => {
    dispatch(fetchAllBranches());
    dispatch(fetchAllSources());
    dispatch(fetchAllLeadStatuses());
    dispatch(fetchAllEmployees());
  }, [dispatch]);

  // Fetch status details
  useEffect(() => {
    if (formData.leadStatusId) {
      dispatch(fetchLeadStatusById(formData.leadStatusId));
    }
  }, [dispatch, formData.leadStatusId]);

  // Cleanup
  useEffect(() => {
    return () => {
      isMounted.current = false;
      dispatch(resetLeadStatusById());
      dispatch(resetDialLeadState());
    };
  }, [dispatch]);

  // Handle submission status
  useEffect(() => {
    if (dialLeadSuccess) {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Dial lead added successfully!',
      });
      navigation.navigate('LeadsScreen');
      dispatch(resetDialLeadState());
    }
    if (dialLeadError) {
      let errorMessage = 'Failed to submit dial lead.';
      if (typeof dialLeadError === 'string' && dialLeadError.includes('Cast to ObjectId failed for value')) {
        errorMessage = 'Please select a valid source.';
      } else if (dialLeadError?.response?.data?.error?.includes('Cast to ObjectId failed')) {
        errorMessage = 'Please select a valid source.';
      } else if (
        (typeof dialLeadError === 'string' && dialLeadError.includes('already exists')) ||
        (dialLeadError?.response?.data?.error?.includes('already exists'))
      ) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Dial lead added successfully!',
        });
        navigation.navigate('LeadsScreen');
        dispatch(resetDialLeadState());
        return;
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: errorMessage,
        });
      }
      dispatch(resetDialLeadState());
    }
  }, [dialLeadSuccess, dialLeadError, navigation, dispatch]);

  // Dropdown toggle
  const toggleDropdown = useCallback((setVisible) => {
    setVisible((prev) => !prev);
  }, []);

  // Dropdown renderer with safeguards
  const renderDropdown = useCallback(
    (
      visible,
      setVisible,
      selectedValue,
      setSelectedValue,
      options,
      placeholder,
      isSourceDropdown = false,
      setSelectedId = () => null
    ) => (
      <StyledView className="mb-4">
        <StyledTouchableOpacity
          className="bg-gray-100 border border-gray-300 rounded-lg p-3 flex-row items-center justify-between"
          onPress={() => toggleDropdown(setVisible)}
          disabled={visible}
        >
          <StyledText
            className={`text-sm font-medium text-gray-900 ${selectedValue ? '' : 'text-gray-400'}`}
          >
            {selectedValue || `Select ${placeholder}`}
          </StyledText>
          <Ionicons name={visible ? 'chevron-up' : 'chevron-down'} size={16} color="#666666" />
        </StyledTouchableOpacity>
        {visible && (
          <StyledView className="border border-gray-300 rounded-lg mt-1 bg-gray-100 max-h-36 shadow-sm">
            <StyledScrollView>
              {options.length ? (
                options
                  .map((option, index) => {
                    if (!option || typeof option !== 'object') return null;
                    const displayText = isSourceDropdown
                      ? option.sourceName || option.name || `Source ${index + 1}`
                      : option.name || option.organizationName || option.branchName || option._id || `Item ${index + 1}`;
                    const value = option._id || `item-${index}`;
                    return (
                      <StyledTouchableOpacity
                        key={value}
                        onPress={() => {
                          setSelectedValue(displayText);
                          setSelectedId(value);
                          setVisible(false);
                        }}
                        className="p-3"
                      >
                        <StyledText className="text-sm font-medium text-gray-900">{displayText}</StyledText>
                      </StyledTouchableOpacity>
                    );
                  })
                  .filter(Boolean)
              ) : (
                <StyledText className="text-sm font-medium text-gray-600 p-3">
                  No {placeholder.toLowerCase()} available
                </StyledText>
              )}
            </StyledScrollView>
          </StyledView>
        )}
      </StyledView>
    ),
    [toggleDropdown]
  );

  // Handle dynamic fields submission
  const handleDynamicFieldsSubmit = useCallback((data) => {
    const formattedData = {
      ...data,
      nextFollowUpDate: data.nextFollowUpDate ? new Date(data.nextFollowUpDate).toISOString() : null,
      estimationDate: data.estimationDate ? new Date(data.estimationDate).toISOString() : null,
    };
    setFormData((prev) => ({ ...prev, dynamicFields: formattedData }));
  }, []);

  // Validate form
  const validateForm = useCallback(() => {
    const errors = {};
    if (!formData.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData]);

  // Handle form submission
  const handleSubmit = async () => {
    console.log('ContactFeedbackForm: Submitting form with data:', formData);
    const isValid = validateForm();
    if (!isValid) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: formErrors.email || 'Please provide a valid email.',
      });
      return;
    }

    try {
      const orgId = await AsyncStorage.getItem('orgId');
      if (!orgId) {
        throw new Error('Organization ID is missing.');
      }

      const payload = {
        ...(leadId ? { leadId } : {}),
        name: formData.name || '',
        email: formData.email || '',
        phone: formData.phone || '',
        source: formData.sourceId || null,
        branch: formData.branchId || null,
        priority: formData.dynamicFields?.priority || 'Medium',
        description: statusDetail.showDescription ? formData.dynamicFields?.meetingDescription || '' : null,
        assignedTo: formData.assignedTo || null,
        organizationId: orgId,
        status: formData.leadStatusId || null,
        statusData: {
          contactDate: new Date().toISOString(),
          nextFollowUpDate: formData.dynamicFields?.nextFollowUpDate || null,
          nextFollowUpTime: formData.dynamicFields?.nextFollowUpTime || null,
          estimationDate: statusDetail.estimation?.required ? formData.dynamicFields?.estimationDate || null : null,
          estimationBudget: statusDetail.estimation?.required ? Number(formData.dynamicFields?.estimationBudget) || 0 : null,
          description: statusDetail.showDescription ? formData.dynamicFields?.meetingDescription || '' : null,
          priority: formData.dynamicFields?.priority || 'Medium',
          status: formData.leadStatusId || null,
          ...(statusDetail.name === 'Active' ? { address: formData.dynamicFields?.address || '' } : {}),
          ...(statusDetail.name === 'Inactive' ? { reason: formData.dynamicFields?.reason || '' } : {}),
        },
      };

      await dispatch(createDialLead(payload)).unwrap();
    } catch (error) {
      console.error('ContactFeedbackForm: Submission error:', error);
      let errorMessage = 'Failed to submit the dial lead.';
      if (error.message?.includes('Cast to ObjectId')) {
        errorMessage = 'Invalid form data. Please check selections.';
      } else if (error.message?.includes('already exists')) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Dial lead added successfully!',
        });
        navigation.navigate('LeadsScreen');
        dispatch(resetDialLeadState());
        return;
      } else if (error.message) {
        errorMessage = error.message;
      }
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: errorMessage,
      });
    dispatch(resetDialLeadState());
    }
  };

  return (
    <StyledView className="flex-1">
      <Header
        title="Contact Feedback"
        showBackButton={true}
        onBackPress={() => navigation.navigate('HomeScreen', {
          screen: 'Main',
        params: { screen: 'Leads' }
        })}
      />
      <StyledScrollView className="flex-1 pb-5">
        <StyledView className="p-4 bg-white rounded-xl m-4 shadow-md">
          <StyledText className="text-base mb-4 text-gray-600 font-poppins">
            {isManual ? 'Manual Contact Entry' : `Dial to: ${phoneNumber}`}
          </StyledText>

          {branchesLoading || sourcesLoading || statusesLoading || statusLoading || employeesLoading ? (
            <ActivityIndicator size="large" color="#007AFF" />
          ) : (
            <>
              {/* Name */}
              <StyledText className="text-sm font-poppins text-gray-900 font-semibold mb-1">Name</StyledText>
              <StyledView className="flex-row items-center bg-gray-100 border border-gray-300 rounded-lg p-3 mb-3">
                <Icon name="user" size={18} color="#4B5563" className="mr-2.5" />
                <StyledTextInput
                  placeholder="Enter name (optional)"
                  placeholderTextColor="#4B5563"
                  value={formData.name}
                  onChangeText={(text) => setFormData((prev) => ({ ...prev, name: text }))}
                  className="flex-1 text-sm font-poppins text-gray-900"
                  autoCapitalize="words"
                />
              </StyledView>

              {/* Email */}
              <StyledText className="text-sm font-poppins text-gray-900 font-semibold mb-1">Email *</StyledText>
              <StyledView
                className={`flex-row items-center bg-gray-100 border rounded-lg p-3 mb-3 ${
                  formErrors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <Icon name="envelope" size={18} color="#4B5563" className="mr-2.5" />
                <StyledTextInput
                  placeholder="Enter email"
                  placeholderTextColor="#4B5563"
                  value={formData.email}
                  onChangeText={(text) => setFormData((prev) => ({ ...prev, email: text }))}
                  className="flex-1 text-sm font-poppins text-gray-900"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </StyledView>
              {formErrors.email && (
                <StyledText className="text-red-500 text-sm font-poppins mb-3">{formErrors.email}</StyledText>
              )}

              {/* Phone */}
              <StyledText className="text-sm font-poppins text-gray-900 font-semibold mb-1">Phone Number</StyledText>
              <StyledView className="flex-row items-center bg-gray-100 border border-gray-300 rounded-lg p-3 mb-3">
                <Icon name="phone" size={18} color="#4B5563" className="mr-2.5" />
                <StyledTextInput
                  placeholder="Enter phone number (optional)"
                  placeholderTextColor="#4B5563"
                  value={formData.phone}
                  onChangeText={(text) => setFormData((prev) => ({ ...prev, phone: text }))}
                  className="flex-1 text-sm font-poppins text-gray-900"
                  keyboardType="phone-pad"
                />
              </StyledView>

              {/* Source Dropdown */}
              <StyledText className="text-sm font-poppins text-gray-900 font-semibold mb-1">Source</StyledText>
              {sourcesLoading ? (
                <ActivityIndicator size="small" color="#007AFF" />
              ) : (
                renderDropdown(
                  sourceDropdownVisible,
                  setSourceDropdownVisible,
                  formData.source,
                  (value) => setFormData((prev) => ({ ...prev, source: value })),
                  sources,
                  'Source',
                  true,
                  (id) => setFormData((prev) => ({ ...prev, sourceId: id }))
                )
              )}

              {/* Branch Dropdown */}
              <StyledText className="text-sm font-poppins text-gray-900 font-semibold mb-1">Branch</StyledText>
              {branchesLoading ? (
                <ActivityIndicator size="small" color="#007AFF" />
              ) : (
                renderDropdown(
                  branchDropdownVisible,
                  setBranchDropdownVisible,
                  formData.branch,
                  (value) => setFormData((prev) => ({ ...prev, branch: value })),
                  branches,
                  'Branch',
                  false,
                  (id) => setFormData((prev) => ({ ...prev, branchId: id }))
                )
              )}

              {/* Assigned To Dropdown */}
              <StyledText className="text-sm font-poppins text-gray-900 font-semibold mb-1">Assigned To</StyledText>
              {employeesLoading ? (
                <ActivityIndicator size="small" color="#007AFF" />
              ) : (
                renderDropdown(
                  assignedToDropdownVisible,
                  setAssignedToDropdownVisible,
                  formData.assignedToName,
                  (value) => setFormData((prev) => ({ ...prev, assignedToName: value })),
                  employees,
                  'Employee',
                  false,
                  (id) => setFormData((prev) => ({ ...prev, assignedTo: id, assignedToName: employees.find((emp) => emp._id === id)?.name || '' }))
                )
              )}

              {/* Lead Status Dropdown */}
              <StyledText className="text-sm font-poppins text-gray-900 font-semibold mb-1">Lead Status</StyledText>
              {statusesLoading ? (
                <ActivityIndicator size="small" color="#007AFF" />
              ) : (
                renderDropdown(
                  leadStatusDropdownVisible,
                  setLeadStatusDropdownVisible,
                  formData.leadStatus,
                  (value) => setFormData((prev) => ({ ...prev, leadStatus: value })),
                  leadStatuses,
                  'Lead Status',
                  false,
                  (id) => setFormData((prev) => ({ ...prev, leadStatusId: id }))
                )
              )}

              {/* Dynamic Fields */}
              {statusLoading ? (
                <ActivityIndicator size="small" color="#007AFF" />
              ) : (
                <DynamicFields
                  statusDetail={statusDetail}
                  onSubmit={handleDynamicFieldsSubmit}
                  initialData={formData.dynamicFields}
                />
              )}

              {/* Submit Button */}
              <CustomButton
                buttonName={dialLeadLoading ? 'Submitting...' : 'Submit'}
                onPress={handleSubmit}
                height={52}
                width="100%"
                containerStyle={{ marginTop: 16 }}
                fontSize={RFPercentage(2)}
                fontWeight="semibold"
                accessibilityLabel="Submit feedback"
                disabled={dialLeadLoading}
                component={dialLeadLoading ? <ActivityIndicator size="small" color="#ffffff" /> : null}
              />
            </>
          )}
        </StyledView>
      </StyledScrollView>
      <Toast config={toastConfig} />
    </StyledView>
  );
};

export default ContactFeedbackForm;