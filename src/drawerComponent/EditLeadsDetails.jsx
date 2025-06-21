
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { styled } from 'nativewind';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllSources } from '../redux/slices/getActiveSourceSlice';
import { fetchAllBranches } from '../redux/slices/getActiveBranchesSlice';
import { updateContact } from '../redux/slices/updateContactSlice';
import { updateLeadAsync } from '../redux/slices/updateLeadSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { fetchLeadById } from '../redux/slices/getLeadByIdSlice';
import Header from '../component/Header';
import CustomButton from '../component/CustomButton';
import { getDecryptInfo, resetDecryptInfo } from '../redux/slices/getDecryptInfoSlice';

const StyledView = styled(View);
const StyledTextInput = styled(TextInput);
const StyledTouchable = styled(TouchableOpacity);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledUneditableText = styled(Text);

const EditLeadsDetails = ({ route, navigation }) => {
  const { lead } = route.params || {};
  const leadId = lead?.leadId;

  const dispatch = useDispatch();
  const scrollViewRef = useRef(null);
  const renderCount = useRef(0);

  // Form state - Initialize with empty values to avoid using encrypted data
  const [name, setName] = useState(lead?.name || '');
  const [mobileNo, setMobileNo] = useState(''); // Don't initialize with encrypted phone
  const [email, setEmail] = useState(''); // Don't initialize with encrypted email
  const [reference, setReference] = useState(lead?.reference || '');
  const [description, setDescription] = useState(lead?.description || '');
  const [comment, setComment] = useState(lead?.comment || '');
  const [model, setModel] = useState(lead?.model || '');
  const [source, setSource] = useState(lead?.source || '');
  const [sourceId, setSourceId] = useState(lead?.sourceId || '');
  const [branch, setBranch] = useState(lead?.branchName || lead?.branch || '');
  const [branchId, setBranchId] = useState(lead?.branchId || '');
  const [priority, setPriority] = useState(lead?.priority || 'Medium');
  const [assignedTo, setAssignedTo] = useState(lead?.assignedTo || 'N/A');
  const [address, setAddress] = useState({
    street: typeof lead?.address === 'string' ? lead.address : lead?.address?.street || '',
    city: lead?.address?.city || lead?.city || '',
    state: lead?.address?.state || lead?.state || '',
    country: lead?.address?.country || lead?.country || '',
  });
  const [sourceDropdownVisible, setSourceDropdownVisible] = useState(false);
  const [priorityDropdownVisible, setPriorityDropdownVisible] = useState(false);

  // Validation error states
  const [referenceError, setReferenceError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [commentError, setCommentError] = useState('');
  const [modelError, setModelError] = useState('');
  const [emailError, setEmailError] = useState('');

  // Redux state
  const { activeSource: sources = [], loading: sourcesLoading, error: sourcesError } = useSelector(
    (state) => state.activeSource || {}
  );
  const { activeBranches: branches = [], loading: branchesLoading, error: branchesError } = useSelector(
    (state) => state.activeBranches || {}
  );
  const { loading: contactLoading, error: contactError } = useSelector(
    (state) => state.updateContact || {}
  );
  const { loading: leadUpdateLoading, error: leadUpdateError } = useSelector(
    (state) => state.lead || {}
  );
  const { data: decryptedData, status: decryptStatus, error: decryptError } = useSelector(
    (state) => state.decryptInfo || {}
  );

  // Log renders for debugging
  useEffect(() => {
    renderCount.current += 1;
    console.log(`EditLeadsDetails render count: ${renderCount.current}`);
    console.log('EditLeadsDetails: route.params.lead', JSON.stringify(lead, null, 2));
    console.log('EditLeadsDetails: address state', JSON.stringify(address, null, 2));
  }, [lead, address]);

  // Fetch decrypted contact information when component loads
  useEffect(() => {
    const fetchDecryptedContactInfo = async () => {
      if (lead?.contactId) {
        try {
          console.log('EditLeadsDetails: Fetching decrypted contact info for contactId:', lead.contactId);
          await dispatch(getDecryptInfo(lead.contactId)).unwrap();
        } catch (error) {
          console.error('EditLeadsDetails: Error fetching decrypted contact info:', error);
          console.warn('EditLeadsDetails: Falling back to encrypted values due to decryption failure');
          setMobileNo(lead?.phone || '');
          setEmail(lead?.email || '');
        }
      } else {
        setMobileNo(lead?.phone || '');
        setEmail(lead?.email || '');
      }
    };

    fetchDecryptedContactInfo();

    return () => {
      dispatch(resetDecryptInfo());
    };
  }, [dispatch, lead?.contactId, lead?.phone, lead?.email]);

  // Update form with decrypted values when they become available
  useEffect(() => {
    if (decryptedData && decryptStatus === 'succeeded') {
      console.log('EditLeadsDetails: Updating form with decrypted data:', decryptedData);
      
      const decryptedPhone = decryptedData?.data?.phone || decryptedData?.phone;
      const decryptedEmail = decryptedData?.data?.email || decryptedData?.email;
      
      if (decryptedPhone) {
        setMobileNo(decryptedPhone);
        console.log('EditLeadsDetails: Updated mobile number with decrypted value:', decryptedPhone);
      }
      
      if (decryptedEmail) {
        setEmail(decryptedEmail);
        console.log('EditLeadsDetails: Updated email with decrypted value:', decryptedEmail);
      }
    }
  }, [decryptedData, decryptStatus]);

  // Fetch sources
  useEffect(() => {
    const fetchData = async () => {
      try {
        const orgId = await AsyncStorage.getItem('orgId');
        if (!orgId) {
          Alert.alert('Error', 'Organization ID not found. Please log in again.');
          return;
        }
        await dispatch(fetchAllSources()).unwrap();
        await dispatch(fetchAllBranches()).unwrap();
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch sources or branches.');
      }
    };
    fetchData();
  }, [dispatch]);

  // Match source with sources list
  useEffect(() => {
    if (lead?.sourceId || lead?.source) {
      if (sources.length > 0) {
        const matchedSource = sources.find(
          (s) =>
            s._id === lead.sourceId ||
            s.sourceName === lead.source ||
            s.name === lead.source ||
            s.title === lead.source
        );
        if (matchedSource) {
          const displayText = matchedSource.sourceName || matchedSource.name || matchedSource.title || lead.source;
          setSource(displayText);
          setSourceId(matchedSource._id);
        } else {
          setSource(lead.source || '');
          setSourceId(lead.sourceId || '');
        }
      }
    }
  }, [lead?.source, lead?.sourceId, sources]);

  // Match branch with branches list
  useEffect(() => {
    if (lead?.branchId && branches.length > 0) {
      const matchedBranch = branches.find((b) => b._id === lead.branchId);
      if (matchedBranch) {
        const displayText = matchedBranch.organizationName || matchedBranch.name || matchedBranch.branchName || matchedBranch.title || lead.branchName || lead.branch;
        setBranch(displayText);
        setBranchId(matchedBranch._id);
      }
    }
  }, [lead?.branchId, lead?.branchName, lead?.branch, branches]);

  // Validation functions
  const validateReference = (text) => {
    if (text.length > 100) {
      setReferenceError('Reference cannot exceed 100 characters.');
      return false;
    }
    setReferenceError('');
    return true;
  };

  const validateDescription = (text) => {
    if (text.length > 500) {
      setDescriptionError('Description cannot exceed 500 characters.');
      return false;
    }
    setDescriptionError('');
    return true;
  };

  const validateComment = (text) => {
    if (text.length > 500) {
      setCommentError('Comment cannot exceed 500 characters.');
      return false;
    }
    setCommentError('');
    return true;
  };

  const validateModel = (text) => {
    if (text.length > 100) {
      setModelError('Model cannot exceed 100 characters.');
      return false;
    }
    setModelError('');
    return true;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
      return false;
    }
    setEmailError('');
    return true;
  };

  // Validate ObjectID
  const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

  // Dropdown rendering
  const renderDropdown = useCallback(
    (
      visible,
      setVisible,
      selectedValue,
      setSelectedValue,
      options = [],
      placeholder,
      setSelectedId = null,
      isSourceDropdown = false
    ) => {
      return (
        <StyledView className="mb-4">
          <StyledTouchable
            className="flex-row justify-between items-center border border-gray-300 rounded-lg p-3 bg-gray-50"
            onPress={() => setVisible((prev) => !prev)}
          >
            <StyledText className={`text-sm font-poppins ${selectedValue ? 'text-gray-900' : 'text-gray-500'}`}>
              {selectedValue || placeholder}
            </StyledText>
            <Ionicons name={visible ? 'chevron-up' : 'chevron-down'} size={16} color="#4B5563" />
          </StyledTouchable>
          {visible && (
            <StyledView className="border border-gray-300 rounded-lg mt-1 bg-white max-h-48 shadow-md">
              <ScrollView nestedScrollEnabled>
                {options.length ? (
                  options.map((option, index) => {
                    const displayText = isSourceDropdown
                      ? option?.sourceName || option?.name || option?.title || `Source ${index + 1}`
                      : typeof option === 'string'
                      ? option
                      : option?.name || option?.branchName || option?.title || `Item ${index + 1}`;
                    const id = typeof option === 'string' ? option : option?._id || `temp-id-${index}`;
                    return (
                      <StyledTouchable
                        key={id}
                        onPress={() => {
                          setSelectedValue(displayText);
                          if (setSelectedId) setSelectedId(id);
                          setVisible(false);
                        }}
                        className="p-3 hover:bg-gray-100"
                      >
                        <StyledText className="text-sm text-gray-900 font-poppins">{displayText}</StyledText>
                      </StyledTouchable>
                    );
                  })
                ) : (
                  <StyledText className="p-3 text-sm text-gray-600 font-poppins">
                    No {placeholder.toLowerCase()} available
                  </StyledText>
                )}
              </ScrollView>
            </StyledView>
          )}
        </StyledView>
      );
    },
    []
  );

  // Handle submit
  const handleSubmit = async () => {
    if (!lead?.leadId || !lead?.contactId) {
      console.error('EditLeadsDetails: Invalid Lead or Contact ID', { leadId: lead?.leadId, contactId: lead?.contactId });
      Alert.alert('Error', 'Invalid Lead or Contact ID.');
      return;
    }
    if (!source || !sourceId || !isValidObjectId(sourceId)) {
      console.error('EditLeadsDetails: Invalid source', { source, sourceId });
      Alert.alert('Error', 'Please select a valid source.');
      return;
    }
    if (branchId && !isValidObjectId(branchId)) {
      console.error('EditLeadsDetails: Invalid branchId', { branchId });
      Alert.alert('Error', 'Invalid branch ID.');
      return;
    }
    if (!validateReference(reference) || !validateDescription(description) || !validateComment(comment) || !validateModel(model)) {
      console.error('EditLeadsDetails: Validation failed', { referenceError, descriptionError, commentError, modelError });
      Alert.alert('Error', 'Please fix the validation errors before submitting.');
      return;
    }
    if (!validateEmail(email)) {
      console.error('EditLeadsDetails: Invalid email', { email });
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }
    try {
      // Combine address fields into a single string
      const addressString = [
        address.street,
        address.city,
        address.state,
        address.country
      ].filter(Boolean).join(', ');

      const contactPayload = {
        contactId: lead.contactId,
        contactData: { 
          name, 
          email, 
          phone: mobileNo, 
          address: addressString
        },
      };
      const leadPayload = {
        leadId: lead.leadId,
        leadData: {
          source: sourceId,
          description,
          comment,
          reference,
          model,
          priority: priority.toLowerCase(),
        },
        postUpdatedLead: true,
      };

      // Update contact and lead
      await Promise.all([
        dispatch(updateContact(contactPayload)).unwrap(),
        dispatch(updateLeadAsync(leadPayload)).unwrap(),
      ]);

      // Fetch updated lead data
      const fetchResult = await dispatch(fetchLeadById(leadId)).unwrap();
      console.log('EditLeadsDetails: fetchResult.data', JSON.stringify(fetchResult.data, null, 2));

      // Construct updated lead object, ensuring address is an object
      const updatedLead = {
        ...fetchResult.data,
        name,
        phone: mobileNo,
        email,
        source,
        sourceId,
        branch,
        branchId: branchId || null,
        description,
        comment,
        reference,
        model,
        priority: priority.toLowerCase(),
        address: {
          street: address.street || fetchResult.data.address?.street || '',
          city: address.city || fetchResult.data.address?.city || '',
          state: address.state || fetchResult.data.address?.state || '',
          country: address.country || fetchResult.data.address?.country || '',
        },
        leadId: lead.leadId,
        _id: lead._id || lead.leadId,
      };

      console.log('EditLeadsDetails: Navigating with updatedLead', JSON.stringify(updatedLead, null, 2));
      Alert.alert('Success', 'Lead updated successfully!', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('LeadDetailsScreen', { lead: updatedLead }),
        },
      ]);
    } catch (error) {
      console.error('EditLeadsDetails: Error updating lead', error);
      let errorMessage = 'Failed to update lead. Please try again.';
      // Handle specific error cases based on backend response
      if (error?.message || error?.response?.data?.message) {
        const message = error.response?.data?.message || error.message;
        if (message.includes('already exists')) {
          errorMessage = 'Cannot update contact because the email or phone number is already in use by another contact. Please use a different email or phone number.';
        } else if (message.includes('invalid email')) {
          errorMessage = 'Please enter a valid email address.';
        } else {
          errorMessage = message;
        }
      }
      Alert.alert('Error', errorMessage);
    }
  };

  // Scroll to field
  const scrollToField = (fieldKey) => {
    const staticOffsets = {
      mobileNo: 100,
      email: 200,
      reference: 300,
      description: 400,
      comment: 450,
      model: 500,
      street: 600,
      city: 700,
      state: 800,
      country: 900,
    };
    const y = staticOffsets[fieldKey] || 100;
    scrollViewRef.current?.scrollTo({ y, animated: true });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 120 : 50}
      className="flex-1 bg-white"
    >
      <StyledView className="flex-1">
        {/* Header */}
        <Header
          title="Edit Lead Details"
          showBackButton={true}
          onBackPress={() => navigation.goBack()}
          containerStyle={{ borderBottomWidth: 1, borderBottomColor: '#C5C5C5' }}
          customRightComponent={(
            <CustomButton
              buttonName="Back"
              onPress={() => navigation.goBack()}
              gradientColors={['#8290EA', '#3F4CA0']}
              height={56}
              width="100%"
              fontSize={RFPercentage(2)}
              fontFamily="poppins"
              fontWeight="semibold"
              accessibilityLabel="Go back to previous screen"
              containerStyle={{ marginRight: 8, alignSelf: 'center' }}
            />
          )}
        />

        <StyledScrollView
          ref={scrollViewRef}
          contentContainerStyle={{ paddingBottom: 1, paddingHorizontal: 16, paddingTop: 16 }}
          keyboardShouldPersistTaps="always"
        >
          {(sourcesLoading || branchesLoading || decryptStatus === 'loading') ? (
            <StyledView className="flex-1 justify-center items-center">
              <ActivityIndicator size="large" color="#3F4CA0" />
              <StyledText className="text-gray-600 font-poppins mt-2">
                {decryptStatus === 'loading' ? 'Loading contact information...' : 'Loading...'}
              </StyledText>
            </StyledView>
          ) : (sourcesError || branchesError) ? (
            <StyledView className="mb-4">
              <StyledText className="text-red-500 text-[12px] font-poppins">
                Error: {sourcesError || branchesError || 'Failed to load data'}
              </StyledText>
              <CustomButton
                buttonName="Retry"
                onPress={() => {
                  dispatch(fetchAllSources());
                  dispatch(fetchAllBranches());
                  if (lead?.contactId) {
                    dispatch(getDecryptInfo(lead.contactId));
                  }
                }}
                gradientColors={['#8290EA', '#3F4CA0']}
                height={56}
                width="100%"
                fontSize={RFPercentage(2)}
                fontFamily="poppins"
                fontWeight="semibold"
                accessibilityLabel="Retry fetching data"
                containerStyle={{ marginTop: 8, alignSelf: 'center' }}
              />
            </StyledView>
          ) : (
            <>
              {/* Contact Details Section */}
              <StyledView className="mb-4">
                <StyledText className="text-[10px] text-gray-600 font-poppins mb-1">Contact Name</StyledText>
                <StyledUneditableText className="bg-gray-100 border border-gray-300 p-3 rounded-lg text-gray-900 font-poppins text-sm">
                  {name || 'N/A'}
                </StyledUneditableText>
              </StyledView>
              <StyledView className="mb-4">
                <StyledText className="text-[10px] text-gray-600 font-poppins mb-1">Assigned To</StyledText>
                <StyledUneditableText className="bg-gray-100 border border-gray-300 p-3 rounded-lg text-gray-900 font-poppins text-sm">
                  {assignedTo || 'N/A'}
                </StyledUneditableText>
              </StyledView>
              <StyledView className="flex-row space-x-3 mb-4">
                <StyledView className="flex-1">
                  <StyledText className="text-[10px] text-gray-600 font-poppins mb-1">Mobile No</StyledText>
                  {decryptStatus === 'loading' ? (
                    <StyledView className="bg-gray-100 border border-gray-300 p-3 rounded-lg flex-row items-center">
                      <ActivityIndicator size="small" color="#3F4CA0" />
                      <StyledText className="text-gray-500 font-poppins text-sm ml-2">Loading...</StyledText>
                    </StyledView>
                  ) : (
                    <StyledTextInput
                      className="bg-gray-100 border border-gray-300 p-3 rounded-lg text-gray-900 font-poppins text-sm"
                      placeholder="Enter Mobile No"
                      placeholderTextColor="#4B5563"
                      value={mobileNo}
                      onChangeText={setMobileNo}
                      keyboardType="phone-pad"
                      onFocus={() => scrollToField('mobileNo')}
                    />
                  )}
                </StyledView>
                <StyledView className="flex-1">
                  <StyledText className="text-[10px] text-gray-600 font-poppins mb-1">Email</StyledText>
                  {decryptStatus === 'loading' ? (
                    <StyledView className="bg-gray-100 border border-gray-300 p-3 rounded-lg flex-row items-center">
                      <ActivityIndicator size="small" color="#3F4CA0" />
                      <StyledText className="text-gray-500 font-poppins text-sm ml-2">Loading...</StyledText>
                    </StyledView>
                  ) : (
                    <StyledTextInput
                      className="bg-gray-100 border border-gray-300 p-3 rounded-lg text-gray-900 font-poppins text-sm"
                      placeholder="Enter Email"
                      placeholderTextColor="#4B5563"
                      value={email}
                      onChangeText={(text) => {
                        setEmail(text);
                        validateEmail(text);
                      }}
                      keyboardType="email-address"
                      onFocus={() => scrollToField('email')}
                    />
                  )}
                  {emailError && (
                    <StyledText className="text-red-500 text-[10px] font-poppins mt-1">{emailError}</StyledText>
                  )}
                </StyledView>
              </StyledView>

              {/* Additional Details Section */}
              <StyledText
                className="text-gray-700 font-poppins font-semibold mb-4"
                style={{ fontSize: RFPercentage(2.2) }}
              >
                Additional Details
              </StyledText>
              <StyledView className="mb-4">
                <StyledText className="text-[10px] text-gray-600 font-poppins mb-1">Source</StyledText>
                {sourcesLoading ? (
                  <StyledText className="text-sm text-gray-600 font-poppins">Loading sources...</StyledText>
                ) : sourcesError ? (
                  <StyledText className="text-sm text-red-500 font-poppins">Failed to load sources: {sourcesError}</StyledText>
                ) : !sources || sources.length === 0 ? (
                  <StyledText className="text-sm text-gray-600 font-poppins">No sources available</StyledText>
                ) : (
                  renderDropdown(
                    sourceDropdownVisible,
                    setSourceDropdownVisible,
                    source,
                    setSource,
                    sources,
                    'Select Source',
                    setSourceId,
                    true
                  )
                )}
              </StyledView>
              <StyledView className="mb-4">
                <StyledText className="text-[10px] text-gray-600 font-poppins mb-1">Branch</StyledText>
                <StyledUneditableText className="bg-gray-100 border border-gray-300 p-3 rounded-lg text-gray-900 font-poppins text-sm">
                  {branch || 'N/A'}
                </StyledUneditableText>
              </StyledView>
              <StyledView className="mb-4">
                <StyledText className="text-[10px] text-gray-600 font-poppins mb-1">Lead Priority</StyledText>
                {renderDropdown(
                  priorityDropdownVisible,
                  setPriorityDropdownVisible,
                  priority,
                  setPriority,
                  ['Important', 'High', 'Medium', 'Low'],
                  'Select Priority'
                )}
              </StyledView>
              <StyledView className="mb-4">
                <StyledText className="text-[10px] text-gray-600 font-poppins mb-1">Reference</StyledText>
                <StyledTextInput
                  placeholder="Enter Reference"
                  placeholderTextColor="#4B5563"
                  value={reference}
                  onChangeText={(text) => {
                    setReference(text);
                    validateReference(text);
                  }}
                  className="bg-gray-100 border border-gray-300 p-3 rounded-lg text-gray-900 font-poppins text-sm"
                  onFocus={() => scrollToField('reference')}
                />
                {referenceError && (
                  <StyledText className="text-red-500 text-[10px] font-poppins mt-1">{referenceError}</StyledText>
                )}
              </StyledView>
              <StyledView className="mb-4">
                <StyledText className="text-[10px] text-gray-600 font-poppins mb-1">Description</StyledText>
                <StyledTextInput
                  placeholder="Enter Description"
                  placeholderTextColor="#4B5563"
                  value={description}
                  onChangeText={(text) => {
                    setDescription(text);
                    validateDescription(text);
                  }}
                  className="bg-gray-100 border border-gray-300 p-3 rounded-lg text-gray-900 font-poppins text-sm h-24"
                  multiline
                  onFocus={() => scrollToField('description')}
                />
                {descriptionError && (
                  <StyledText className="text-red-500 text-[10px] font-poppins mt-1">{descriptionError}</StyledText>
                )}
              </StyledView>
              <StyledView className="mb-4">
                <StyledText className="text-[10px] text-gray-600 font-poppins mb-1">Comment</StyledText>
                <StyledTextInput
                  placeholder="Enter Comment"
                  placeholderTextColor="#4B5563"
                  value={comment}
                  onChangeText={(text) => {
                    setComment(text);
                    validateComment(text);
                  }}
                  className="bg-gray-100 border border-gray-300 p-3 rounded-lg text-gray-900 font-poppins text-sm h-24"
                  multiline
                  onFocus={() => scrollToField('comment')}
                />
                {commentError && (
                  <StyledText className="text-red-500 text-[10px] font-poppins mt-1">{commentError}</StyledText>
                )}
              </StyledView>
              <StyledView className="mb-6">
                <StyledText className="text-[10px] text-gray-600 font-poppins mb-1">Model</StyledText>
                <StyledTextInput
                  placeholder="Enter Model"
                  placeholderTextColor="#4B5563"
                  value={model}
                  onChangeText={(text) => {
                    setModel(text);
                    validateModel(text);
                  }}
                  className="bg-gray-100 border border-gray-300 p-3 rounded-lg text-gray-900 font-poppins text-sm"
                  onFocus={() => scrollToField('model')}
                />
                {modelError && (
                  <StyledText className="text-red-500 text-[10px] font-poppins mt-1">{modelError}</StyledText>
                )}
              </StyledView>

              {/* Address Section */}
              <StyledText
                className="text-gray-700 font-poppins font-semibold mb-4"
                style={{ fontSize: RFPercentage(2.2) }}
              >
                Address
              </StyledText>
              <StyledView className="mb-4">
                <StyledText className="text-[10px] text-gray-600 font-poppins mb-1">Street</StyledText>
                <StyledTextInput
                  className="bg-gray-100 border border-gray-300 p-3 rounded-lg text-gray-900 font-poppins text-sm"
                  placeholder="Enter Street"
                  placeholderTextColor="#4B5563"
                  value={address.street}
                  onChangeText={(text) => setAddress({ ...address, street: text })}
                  onFocus={() => scrollToField('street')}
                />
              </StyledView>
              <StyledView className="mb-4">
                <StyledText className="text-[10px] text-gray-600 font-poppins mb-1">City</StyledText>
                <StyledTextInput
                  className="bg-gray-100 border border-gray-300 p-3 rounded-lg text-gray-900 font-poppins text-sm mt-1"
                  placeholder="Enter City"
                  placeholderTextColor="#4B5563"
                  value={address.city}
                  onChangeText={(text) => setAddress({ ...address, city: text })}
                  onFocus={() => scrollToField('city')}
                />
              </StyledView>
              <StyledView className="mb-4">
                <StyledText className="text-[10px] text-gray-600 font-poppins mb-1">State</StyledText>
                <StyledTextInput
                  className="bg-gray-100 border border-gray-300 p-3 rounded-lg text-gray-900 font-poppins text-sm"
                  placeholder="Enter State"
                  placeholderTextColor="#4B5563"
                  value={address.state}
                  onChangeText={(text) => setAddress({ ...address, state: text })}
                  onFocus={() => scrollToField('state')}
                />
              </StyledView>
              <StyledView className="mb-6">
                <StyledText className="text-[10px] text-gray-600 font-poppins mb-1">Country</StyledText>
                <StyledTextInput
                  className="bg-gray-100 border border-gray-300 p-3 rounded-lg text-gray-900 font-poppins text-sm"
                  placeholder="Enter Country"
                  placeholderTextColor="#4B5563"
                  value={address.country}
                  onChangeText={(text) => setAddress({ ...address, country: text })}
                  onFocus={() => scrollToField('country')}
                />
              </StyledView>

              {/* Save Button */}
              <CustomButton
                buttonName={leadUpdateLoading || contactLoading ? 'Saving...' : 'Save'}
                onPress={handleSubmit}
                accessibilityLabel="Save lead details"
                containerStyle={{ marginTop: 16, marginBottom: 16, alignSelf: 'center' }}
                disabled={sourcesLoading || branchesLoading || contactLoading || leadUpdateLoading}
              />
            </>
          )}
        </StyledScrollView>
      </StyledView>
    </KeyboardAvoidingView>
  );
};

export default EditLeadsDetails;