import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  fetchAllBranches,
  fetchAllSources,
  fetchActiveStatuses,
  fetchAllEmployees,
  fetchSearchContacts,
  clearSearchContacts,
  fetchLeadStatusById,
  resetLeadStatusById,
  fetchAllLeads,
  resetLeadsState,
  addLead,
  resetAddLeadState,
} from '../redux/slice/index';
import debounce from 'lodash.debounce';
import LinearGradient from 'react-native-linear-gradient';

// Memoized ContactSearchInput component
const ContactSearchInput = React.memo(
  ({ contactSearchQuery, setContactSearchQuery, selectedContact, setSelectedContact, selectedContactId, setSelectedContactId, newContactPhone, setNewContactPhone, newContactEmail, setNewContactEmail, scrollViewRef }) => {
    const dispatch = useDispatch();
    const { searchContacts = [], loading: contactsLoading, error: contactsError } = useSelector(
      (state) => state.searchContact || {}
    );

    const debouncedSearch = useMemo(
      () =>
        debounce((query) => {
          if (query.trim()) {
            dispatch(fetchSearchContacts(query));
          } else {
            dispatch(clearSearchContacts());
          }
        }, 600),
      [dispatch]
    );

    useEffect(() => {
      debouncedSearch(contactSearchQuery);
      return () => debouncedSearch.cancel();
    }, [contactSearchQuery, debouncedSearch]);

    const handleContactSelect = useCallback(
      (item) => {
        setSelectedContact(item.name);
        setContactSearchQuery(item.name);
        setSelectedContactId(item._id);
        setNewContactPhone('');
        setNewContactEmail('');
        dispatch(clearSearchContacts());
      },
      [setSelectedContact, setContactSearchQuery, setSelectedContactId, setNewContactPhone, setNewContactEmail, dispatch]
    );

    return (
      <View>
        <TextInput
          placeholder="Search or Enter Contact"
          placeholderTextColor="#000000"
          value={contactSearchQuery}
          onChangeText={(text) => {
            setContactSearchQuery(text);
            setSelectedContact(text);
            if (text !== selectedContact) {
              setSelectedContactId(null);
            }
          }}
          onFocus={() => {
            scrollViewRef.current?.scrollTo({ y: 0, animated: true });
          }}
          className="border border-gray-400 rounded-md p-3 text-sm text-black bg-white"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {contactsLoading ? (
          <Text className="p-2 text-sm text-gray-600 mt-2">Loading contacts...</Text>
        ) : contactsError ? (
          <Text className="p-2 text-sm text-red-600 mt-2">Failed to load contacts: {contactsError}</Text>
        ) : searchContacts.length > 0 && contactSearchQuery ? (
          <View className="mt-2 bg-white border border-gray-400 rounded-md max-h-24">
            <ScrollView nestedScrollEnabled>
              {searchContacts.map((item, index) => (
                <TouchableOpacity
                  key={item._id || `contact-${index}`}
                  onPress={() => handleContactSelect(item)}
                  className="p-2"
                >
                  <Text className="text-sm text-black">{item.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        ) : contactSearchQuery && !searchContacts.length ? (
          <Text className="p-2 text-sm text-gray-600 mt-2">No matching contacts</Text>
        ) : null}
        {!selectedContactId && contactSearchQuery && (
          <View className="mt-4 flex-row justify-between gap-4 w-full">
            <View className="flex-1">
              <Text className="text-sm font-semibold mb-1 text-black">Phone Number</Text>
              <TextInput
                placeholder="Enter Phone (10 digits)"
                value={newContactPhone}
                onChangeText={setNewContactPhone}
                onFocus={() => {
                  scrollViewRef.current?.scrollTo({ y: 100, animated: true });
                }}
                className="border border-gray-400 rounded-md p-3 text-sm text-black bg-white"
                keyboardType="numeric"
                maxLength={10}
              />
            </View>
            <View className="flex-1">
              <Text className="text-sm font-semibold mb-1 text-black">Email Address</Text>
              <TextInput
                placeholder="Enter Email"
                value={newContactEmail}
                onChangeText={setNewContactEmail}
                onFocus={() => {
                  scrollViewRef.current?.scrollTo({ y: 150, animated: true });
                }}
                className="border border-gray-400 rounded-md p-3 text-sm text-black bg-white"
                keyboardType="email-address"
                autoCapitalize="none"
                maxLength={50}
              />
            </View>
          </View>
        )}
      </View>
    );
  }
);

const { width, height } = Dimensions.get('window');

const AddLeadForm = ({ modalVisible, setModalVisible, totalHeight = 600, onLeadAdded }) => {
  const dispatch = useDispatch();
  const scrollViewRef = useRef(null);

  // Form states
  const [assignToDropdownVisible, setAssignToDropdownVisible] = useState(false);
  const [branchDropdownVisible, setBranchDropdownVisible] = useState(false);
  const [sourceDropdownVisible, setSourceDropdownVisible] = useState(false);
  const [priorityDropdownVisible, setPriorityDropdownVisible] = useState(false);
  const [leadStatusDropdownVisible, setLeadStatusDropdownVisible] = useState(false);
  const [selectedAssignTo, setSelectedAssignTo] = useState('');
  const [selectedAssignToId, setSelectedAssignToId] = useState('');
  const [selectedContact, setSelectedContact] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedSource, setSelectedSource] = useState('');
  const [selectedSourceId, setSelectedSourceId] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [selectedLeadStatus, setSelectedLeadStatus] = useState('');
  const [selectedStatusId, setSelectedStatusId] = useState('');
  const [contactSearchQuery, setContactSearchQuery] = useState('');
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [newContactPhone, setNewContactPhone] = useState('');
  const [newContactEmail, setNewContactEmail] = useState('');
  const [reference, setReference] = useState('');
  const [description, setDescription] = useState('');
  const [meetingDescription, setMeetingDescription] = useState('');
  const [model, setModel] = useState('');
  const [meetingDate, setMeetingDate] = useState(new Date());
  const [meetingTime, setMeetingTime] = useState(new Date());
  const [estimationDate, setEstimationDate] = useState(new Date());
  const [estimationBudget, setEstimationBudget] = useState('');

  // Unified picker state
  const [pickerState, setPickerState] = useState({
    show: false,
    mode: 'date', // 'date' or 'time'
    type: null, // 'meetingDate', 'meetingTime', 'estimationDate'
    value: new Date(),
  });

  // Redux selectors
  const { activeBranches: branches = [], loading: branchesLoading, error: branchesError } = useSelector(
    (state) => state.activeBranches || {}
  );
  const { activeSource: sources = [], loading: sourcesLoading, error: sourcesError } = useSelector(
    (state) => state.activeSource || {}
  );
  const { statuses: leadStatuses = [], loading: statusesLoading, error: statusesError } = useSelector(
    (state) => state.activeStatuses || {}
  );
  const { activeEmployees: employees = [], loading: employeesLoading, error: employeesError } = useSelector(
    (state) => state.activeEmployees || {}
  );
  const { data: leadStatusDetail = {}, loading: statusLoading, error: statusError } = useSelector(
    (state) => state.leadStatusById || {}
  );
  const { loading: addLeadLoading, success: addLeadSuccess, error: addLeadError } = useSelector(
    (state) => state.addLead || {}
  );
  const { loading: leadsLoading, error: leadsError } = useSelector((state) => state.leads || {});

  const statusDetail = leadStatusDetail?.data || {};

  // Transform employee data
  const transformedEmployees = useMemo(() => {
    return employees
      .map((emp) => {
        const nameMatch = emp.name.match(/^(.+?)(?:\s*\(.+\))?$/);
        return {
          _id: emp.empId,
          name: nameMatch ? nameMatch[1].trim() : emp.name,
        };
      })
      .filter((emp) => emp._id && /^[0-9a-fA-F]{24}$/.test(emp._id));
  }, [employees]);

  // Reset form on modal close
  useEffect(() => {
    if (!modalVisible) {
      setSelectedAssignTo('');
      setSelectedAssignToId('');
      setSelectedContact('');
      setSelectedBranch('');
      setSelectedSource('');
      setSelectedSourceId('');
      setSelectedPriority('');
      setSelectedLeadStatus('');
      setSelectedStatusId('');
      setContactSearchQuery('');
      setSelectedContactId(null);
      setNewContactPhone('');
      setNewContactEmail('');
      setReference('');
      setDescription('');
      setMeetingDescription('');
      setModel('');
      setMeetingDate(new Date());
      setMeetingTime(new Date());
      setEstimationDate(new Date());
      setEstimationBudget('');
      setAssignToDropdownVisible(false);
      setBranchDropdownVisible(false);
      setSourceDropdownVisible(false);
      setPriorityDropdownVisible(false);
      setLeadStatusDropdownVisible(false);
      setPickerState({ show: false, mode: 'date', type: null, value: new Date() });
      dispatch(clearSearchContacts());
      dispatch(resetLeadStatusById());
    }
  }, [modalVisible, dispatch]);

  // Fetch initial data when modal opens
  useEffect(() => {
    if (modalVisible) {
      const fetchData = async () => {
        try {
          await Promise.allSettled([
            dispatch(fetchAllLeads({ page: 1, refresh: true })),
            dispatch(fetchAllEmployees()),
            dispatch(fetchAllBranches()),
            dispatch(fetchAllSources()),
            dispatch(fetchActiveStatuses()),
          ]);
        } catch (error) {
          alert('Failed to load some data. Please try again.');
        }
      };
      fetchData();
    }
  }, [dispatch, modalVisible]);

  // Fetch lead status details when status ID changes
  useEffect(() => {
    if (selectedStatusId && modalVisible) {
      dispatch(fetchLeadStatusById(selectedStatusId));
    }
  }, [dispatch, selectedStatusId, modalVisible]);

  // Handle successful or failed lead submission
  useEffect(() => {
    if (addLeadSuccess) {
      alert('Lead added successfully!');
      dispatch(resetLeadsState());
      dispatch(fetchAllLeads({ page: 1, refresh: true })).catch(() => {
        alert('Failed to update lead list. Please try again.');
      });
      dispatch(resetAddLeadState());
      dispatch(resetLeadStatusById());
      setModalVisible(false);
      if (onLeadAdded) onLeadAdded();
    }
    if (addLeadError) {
      alert(`Error adding lead: ${addLeadError}`);
      dispatch(resetAddLeadState());
    }
  }, [addLeadSuccess, addLeadError, dispatch, setModalVisible, onLeadAdded]);

  const priorityOptions = ['High', 'Medium', 'Low', 'Important'];

  const closeAllDropdowns = useCallback(() => {
    setAssignToDropdownVisible(false);
    setBranchDropdownVisible(false);
    setSourceDropdownVisible(false);
    setPriorityDropdownVisible(false);
    setLeadStatusDropdownVisible(false);
  }, []);

  const toggleDropdown = useCallback(
    (setVisible) => {
      setVisible((prev) => {
        if (!prev) closeAllDropdowns();
        return !prev;
      });
    },
    [closeAllDropdowns]
  );

  const isValidEmail = useCallback((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), []);
  const isValidPhone = useCallback((phone) => /^\d{10}$/.test(phone), []);
  const isValidObjectId = useCallback((id) => /^[0-9a-fA-F]{24}$/.test(id), []);

  const handlePickerChange = useCallback(
    (event, selectedValue) => {
      const { type } = pickerState;

      if (event.type === 'dismissed') {
        setPickerState({ show: false, mode: 'date', type: null, value: new Date() });
        return;
      }

      if (selectedValue) {
        if (type === 'meetingDate') {
          setMeetingDate(selectedValue);
        } else if (type === 'meetingTime') {
          setMeetingTime(selectedValue);
        } else if (type === 'estimationDate') {
          setEstimationDate(selectedValue);
        }
      }

      if (Platform.OS === 'ios' || event.type === 'set') {
        setPickerState({ show: false, mode: 'date', type: null, value: new Date() });
      }
    },
    [pickerState]
  );

  const showPicker = useCallback(
    (type, mode, value) => {
      setPickerState({
        show: true,
        mode,
        type,
        value,
      });
    },
    []
  );

  const renderDropdown = useCallback(
    (
      visible,
      setVisible,
      selectedValue,
      setSelectedValue,
      options = [],
      placeholder,
      setSelectedId = null,
      isEmployeeDropdown = false,
      isSourceDropdown = false
    ) => {
      return (
        <View className="mb-2">
          <TouchableOpacity
            className="flex-row justify-between items-center border border-gray-400 rounded-md p-3"
            onPress={() => toggleDropdown(setVisible)}
          >
            <Text className={`text-sm ${selectedValue ? 'text-black' : 'text-gray-500'}`}>
              {selectedValue || placeholder}
            </Text>
            <Ionicons name={visible ? 'chevron-up' : 'chevron-down'} size={16} color="#ccc" />
          </TouchableOpacity>
          {visible && (
            <View className="border border-gray-400 rounded-md mt-1 bg-white max-h-48">
              <ScrollView nestedScrollEnabled>
                {options?.length ? (
                  options.map((option, index) => {
                    const displayText = isEmployeeDropdown
                      ? option?.name || `Employee ${index + 1}`
                      : isSourceDropdown
                      ? option?.sourceName || option?.name || option?.title || `Source ${index + 1}`
                      : typeof option === 'string'
                      ? option
                      : option?.name || option?.organizationName || option?.branchName || option?.title || `Item ${index + 1}`;
                    const id = isEmployeeDropdown
                      ? option?._id
                      : typeof option === 'string'
                      ? option
                      : option?._id || `temp-id-${index}`;
                    if (isEmployeeDropdown && !isValidObjectId(id)) {
                      return null;
                    }
                    return (
                      <TouchableOpacity
                        key={id}
                        onPress={() => {
                          setSelectedValue(displayText);
                          if (setSelectedId) setSelectedId(id);
                          if (placeholder === 'Select Status') setSelectedStatusId(id);
                          if (isSourceDropdown) setSelectedSourceId(id);
                          setVisible(false);
                        }}
                        className="p-2"
                      >
                        <Text className="text-sm text-black">{displayText}</Text>
                      </TouchableOpacity>
                    );
                  })
                ) : (
                  <Text className="p-2 text-sm text-gray-600">No {placeholder.toLowerCase()} available</Text>
                )}
              </ScrollView>
            </View>
          )}
        </View>
      );
    },
    [toggleDropdown, setSelectedStatusId, setSelectedSourceId, isValidObjectId]
  );

  const renderDynamicFields = useCallback(() => {
    if (!statusDetail || !selectedStatusId) return null;
    const { meeting = {}, estimation = {}, showDescription = true, descriptionLabel = 'Description' } = statusDetail;
    return (
      <View className="mt-4 gap-3">
        {meeting.required && (
          <View className="flex-row gap-4">
            <View className="flex-1">
              <Text className="text-sm font-semibold mb-1 text-black">{meeting.dateLabel || 'Meeting Date'}</Text>
              <TouchableOpacity
                className="border border-gray-400 rounded-md p-3"
                onPress={() => showPicker('meetingDate', 'date', meetingDate)}
              >
                <Text className="text-sm text-black">{format(meetingDate, 'dd/MM/yyyy')}</Text>
              </TouchableOpacity>
            </View>
            <View className="flex-1">
              <Text className="text-sm font-semibold mb-1 text-black">{meeting.timeLabel || 'Meeting Time'}</Text>
              <TouchableOpacity
                className="border border-gray-400 rounded-md p-3"
                onPress={() => showPicker('meetingTime', 'time', meetingTime)}
              >
                <Text className="text-sm text-black">{format(meetingTime, 'HH:mm')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {estimation.required && (
          <View className="flex-row gap-4">
            <View className="flex-1">
              <Text className="text-sm font-semibold mb-1 text-black">{estimation.dateLabel || 'Estimated Date'}</Text>
              <TouchableOpacity
                className="border border-gray-400 rounded-md p-3"
                onPress={() => showPicker('estimationDate', 'date', estimationDate)}
              >
                <Text className="text-sm text-black">{format(estimationDate, 'dd/MM/yyyy')}</Text>
              </TouchableOpacity>
            </View>
            <View className="flex-1">
              <Text className="text-sm font-semibold mb-1 text-black">{estimation.timeLabel || 'Estimated Budget'}</Text>
              <TextInput
                placeholder="Enter Budget"
                value={estimationBudget}
                onChangeText={setEstimationBudget}
                onFocus={() => {
                  scrollViewRef.current?.scrollTo({ y: 300, animated: true });
                }}
                className="border border-gray-400 rounded-md p-3 text-sm text-black bg-white"
                keyboardType="numeric"
              />
            </View>
          </View>
        )}
        {showDescription && (
          <View>
            <Text className="text-sm font-semibold mb-1 text-black">{descriptionLabel}</Text>
            <TextInput
              placeholder={`Enter ${descriptionLabel}`}
              placeholderTextColor="#000000"
              value={meetingDescription}
              onChangeText={setMeetingDescription}
              onFocus={() => {
                scrollViewRef.current?.scrollTo({ y: 350, animated: true });
              }}
              className="border border-gray-400 rounded-md p-3 text-sm text-black bg-white min-h-[40px]"
              multiline
              maxLength={500}
            />
          </View>
        )}
      </View>
    );
  }, [statusDetail, selectedStatusId, meetingDate, meetingTime, estimationDate, estimationBudget, meetingDescription, showPicker]);

  const handleSubmit = useCallback(async () => {
    try {
      if (!selectedContactId && contactSearchQuery.trim()) {
        alert('Please enter a contact name');
        return;
      }
      if (!selectedContactId && newContactPhone && !isValidPhone(newContactPhone)) {
        alert('Please enter a valid 10-digit phone number');
        return;
      }
      if (!selectedContactId && newContactEmail && !isValidEmail(newContactEmail)) {
        alert('Please enter a valid email address');
        return;
      }
      if (!selectedAssignToId) {
        alert('Please select an employee to assign to');
        return;
      }
      if (!isValidObjectId(selectedAssignToId)) {
        alert('Selected employee ID is invalid. Please select a valid employee.');
        return;
      }
      if (!selectedBranch) {
        alert('Please select a branch');
        return;
      }
      if (!selectedSourceId) {
        alert('Please select a source');
        return;
      }
      if (statusDetail?.isPriority && !selectedPriority) {
        alert('Please select a priority');
        return;
      }
      if (!selectedStatusId) {
        alert('Please select a lead status');
        return;
      }
      if (statusDetail?.meeting?.required && !meetingTime) {
        alert('Please select a meeting time');
        return;
      }
      if (
        statusDetail?.estimation?.required &&
        (!estimationBudget || isNaN(estimationBudget) || Number(estimationBudget) <= 0)
      ) {
        alert('Please enter a valid estimation budget');
        return;
      }

      let orgId;
      try {
        orgId = await AsyncStorage.getItem('orgId');
        if (!orgId) {
          alert('Organization ID not found');
          return;
        }
      } catch (error) {
        alert('Error accessing organization data');
        return;
      }

      const formData = {
        contactId: selectedContactId || '',
        name: selectedContactId ? '' : contactSearchQuery.trim(),
        email: selectedContactId ? '' : newContactEmail.trim(),
        phone: selectedContactId ? '' : newContactPhone.trim(),
        assignedTo: selectedAssignToId,
        branch: selectedBranch,
        source: selectedSourceId,
        priority: statusDetail?.isPriority ? selectedPriority : undefined,
        status: selectedStatusId,
        reference: reference.trim(),
        description: description.trim(),
        model: model.trim(),
        organizationId: orgId,
        statusData: {},
      };

      if (statusDetail?.meeting?.required) {
        formData.statusData.contactDate = format(meetingDate, 'yyyy-MM-dd') + 'T00:00:00.000Z';
        formData.statusData.nextFollowUpTime = format(meetingTime, 'HHmm');
        const nextFollowUp = new Date(meetingDate);
        nextFollowUp.setDate(meetingDate.getDate() + 1);
        formData.statusData.nextFollowUpDate = format(nextFollowUp, 'yyyy-MM-dd') + 'T00:00:00.000Z';
      }
      if (statusDetail?.estimation?.required) {
        formData.statusData.estimationDate = format(estimationDate, 'yyyy-MM-dd') + 'T00:00:00.000Z';
        formData.statusData.estimationBudget = Number(estimationBudget);
      }
      if (statusDetail?.showDescription) {
        formData.statusData.description = meetingDescription.trim();
      }

      console.log('AddLeadForm: Submitting form with data:', formData);
      await dispatch(addLead(formData)).unwrap();
    } catch (error) {
      alert(`Error submitting form: ${error.message || 'Please check your input and try again'}`);
    }
  }, [
    selectedContactId,
    contactSearchQuery,
    newContactPhone,
    newContactEmail,
    selectedAssignToId,
    selectedBranch,
    selectedSourceId,
    selectedPriority,
    selectedStatusId,
    statusDetail,
    meetingTime,
    estimationBudget,
    meetingDate,
    reference,
    description,
    model,
    meetingDescription,
    dispatch,
    isValidPhone,
    isValidEmail,
    isValidObjectId,
  ]);

  return (
    <Modal
      animationType="fade"
      transparent
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
        dispatch(clearSearchContacts());
        dispatch(resetLeadStatusById());
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 40}
        className="flex-1 justify-center items-center bg-black/50"
      >
        <View
          className="bg-white rounded-lg relative"
          style={{
            width: width * 0.9,
            maxHeight: height * 0.8,
            minHeight: totalHeight,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          <View className="bg-gray-100 p-4 border-b border-gray-300 flex-row justify-between items-center">
            <Text className="text-xl font-bold text-black">Add Lead</Text>
            <TouchableOpacity
              className="z-10"
              onPress={() => {
                setModalVisible(false);
                dispatch(clearSearchContacts());
                dispatch(resetLeadStatusById());
              }}
            >
              <Text className="text-base font-semibold text-blue-600">Close</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={{ padding: 16, paddingBottom: 20 }}
            keyboardShouldPersistTaps="always"
          >
            {(statusLoading || leadsLoading || branchesLoading || sourcesLoading || statusesLoading || employeesLoading) ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (statusError || leadsError || branchesError || sourcesError || statusesError || employeesError) ? (
              <Text className="p-2 text-sm text-red-600">Error loading data: Please try again</Text>
            ) : (
              <>
                <Text className="text-sm font-semibold mb-1 mt-4 text-black">Contact Name</Text>
                <ContactSearchInput
                  contactSearchQuery={contactSearchQuery}
                  setContactSearchQuery={setContactSearchQuery}
                  selectedContact={selectedContact}
                  setSelectedContact={setSelectedContact}
                  selectedContactId={selectedContactId}
                  setSelectedContactId={setSelectedContactId}
                  newContactPhone={newContactPhone}
                  setNewContactPhone={setNewContactPhone}
                  newContactEmail={newContactEmail}
                  setNewContactEmail={setNewContactEmail}
                  scrollViewRef={scrollViewRef}
                />

                <Text className="text-sm font-semibold mb-1 mt-4 text-black">Assign To</Text>
                {employeesLoading ? (
                  <Text className="text-sm text-gray-600">Loading employees...</Text>
                ) : employeesError ? (
                  <Text className="text-sm text-red-600">Failed to load employees: {employeesError}</Text>
                ) : !transformedEmployees?.length ? (
                  <Text className="text-sm text-red-600">No valid employees available. Please contact support.</Text>
                ) : (
                  renderDropdown(
                    assignToDropdownVisible,
                    setAssignToDropdownVisible,
                    selectedAssignTo,
                    setSelectedAssignTo,
                    transformedEmployees,
                    'Select Employee',
                    setSelectedAssignToId,
                    true
                  )
                )}

                <Text className="text-sm font-semibold mb-1 mt-4 text-black">Branch</Text>
                {branchesLoading ? (
                  <Text className="text-sm text-gray-600">Loading branches...</Text>
                ) : branchesError ? (
                  <Text className="text-sm text-red-600">Failed to load branches: {branchesError}</Text>
                ) : !branches?.length ? (
                  <Text className="text-sm text-gray-600">No branches available</Text>
                ) : (
                  renderDropdown(
                    branchDropdownVisible,
                    setBranchDropdownVisible,
                    selectedBranch,
                    setSelectedBranch,
                    branches.map((b, index) => ({
                      name: b.organizationName || b.name || b.title || `Branch ${index + 1}`,
                      _id: b._id || `branch-${index}`,
                    })),
                    'Select Branch'
                  )
                )}

                <Text className="text-sm font-semibold mb-1 mt-4 text-black">Source</Text>
                {sourcesLoading ? (
                  <Text className="text-sm text-gray-600">Loading sources...</Text>
                ) : sourcesError ? (
                  <Text className="text-sm text-red-600">Failed to load sources: {sourcesError}</Text>
                ) : !sources?.length ? (
                  <Text className="text-sm text-gray-600">No sources available</Text>
                ) : (
                  renderDropdown(
                    sourceDropdownVisible,
                    setSourceDropdownVisible,
                    selectedSource,
                    setSelectedSource,
                    sources,
                    'Select Source',
                    setSelectedSourceId,
                    false,
                    true
                  )
                )}

                <Text className="text-sm font-semibold mb-1 mt-4 text-black">Select Status</Text>
                {statusesLoading ? (
                  <Text className="text-sm text-gray-600">Loading statuses...</Text>
                ) : statusesError ? (
                  <Text className="text-sm text-red-600">Failed to load statuses: {statusesError}</Text>
                ) : !leadStatuses?.length ? (
                  <Text className="text-sm text-gray-600">No statuses available</Text>
                ) : (
                  renderDropdown(
                    leadStatusDropdownVisible,
                    setLeadStatusDropdownVisible,
                    selectedLeadStatus,
                    setSelectedLeadStatus,
                    leadStatuses,
                    'Select Status',
                    setSelectedStatusId
                  )
                )}

                {statusDetail?.isPriority && (
                  <>
                    <Text className="text-sm font-semibold mb-1 mt-4 text-black">Lead Priority</Text>
                    {renderDropdown(
                      priorityDropdownVisible,
                      setPriorityDropdownVisible,
                      selectedPriority,
                      setSelectedPriority,
                      priorityOptions,
                      'Select Priority'
                    )}
                  </>
                )}

                {renderDynamicFields()}

                <View className="mt-4 gap-1">
                  <Text className="text-sm font-semibold mb-1 text-black">Reference</Text>
                  <TextInput
                    placeholder="Enter Reference"
                    placeholderTextColor="#000000"
                    value={reference}
                    onChangeText={setReference}
                    className="border border-gray-400 rounded-md p-3 text-sm text-black bg-white"
                  />
                </View>

                <View className="mt-4 gap-1">
                  <Text className="text-sm font-semibold mb-1 text-black">Description</Text>
                  <TextInput
                    placeholder="Enter Description"
                    placeholderTextColor="#000000"
                    value={description}
                    onChangeText={setDescription}
                    className="border border-gray-400 rounded-md p-3 text-sm text-black bg-white"
                    multiline
                    numberOfLines={3}
                  />
                </View>

                <View className="mt-4 gap-1">
                  <Text className="text-sm font-semibold mb-1 text-black">Model</Text>
                  <TextInput
                    placeholder="Enter Model"
                    placeholderTextColor="#000000"
                    value={model}
                    onChangeText={setModel}
                    className="border border-gray-400 rounded-md p-3 text-sm text-black bg-white"
                  />
                </View>

                <TouchableOpacity
                  className="p-3 rounded-md w-32 items-center mt-5 self-center"
                  onPress={handleSubmit}
                >
                  <LinearGradient
                    colors={['#3B82F6', '#1D4ED8']}
                    className="rounded-md p-3 w-32 items-center"
                  >
                    <Text className="text-white text-sm font-medium">
                      {addLeadLoading ? 'Submitting...' : 'Add Lead'}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </>
            )}
          </ScrollView>

          {pickerState.show && (
            <DateTimePicker
              testID={pickerState.type || 'datetime-picker'}
              value={pickerState.value}
              mode={pickerState.mode}
              is24Hour
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handlePickerChange}
            />
          )}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default AddLeadForm;