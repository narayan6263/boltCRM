

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, addMinutes } from 'date-fns';
import { styled } from 'nativewind';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomPoppinsFonts from '../../font/CustomPoppinsFonts'; // Adjust import path as needed

const StyledView = styled(View);
const StyledText = styled(CustomPoppinsFonts);
const StyledTextInput = styled(TextInput);
const StyledTouchable = styled(TouchableOpacity);

const DynamicFields = ({ statusDetail, onSubmit, initialData }) => {
  // Initialize state with initialData or defaults
  const [meetingDate, setMeetingDate] = useState(
    initialData?.nextFollowUpDate ? new Date(initialData.nextFollowUpDate) : new Date()
  );
  const [showMeetingDatePicker, setShowMeetingDatePicker] = useState(false);
  const [meetingTime, setMeetingTime] = useState(
    initialData?.nextFollowUpDate ? new Date(initialData.nextFollowUpDate) : new Date()
  );
  const [showMeetingTimePicker, setShowMeetingTimePicker] = useState(false);
  const [timeError, setTimeError] = useState('');
  const [estimationDate, setEstimationDate] = useState(
    initialData?.estimationDate ? new Date(initialData.estimationDate) : new Date()
  );
  const [showEstimationDatePicker, setShowEstimationDatePicker] = useState(false);
  const [estimationBudget, setEstimationBudget] = useState(
    initialData?.estimationBudget ? String(initialData.estimationBudget) : ''
  );
  const [meetingDescription, setMeetingDescription] = useState(initialData?.meetingDescription || '');
  const [priority, setPriority] = useState(initialData?.priority || 'Medium');
  const [priorityVisible, setPriorityVisible] = useState(false);
  const [address, setAddress] = useState(initialData?.address || '');
  const [reason, setReason] = useState(initialData?.reason || '');

  // Destructure statusDetail with default values
  const {
    meeting = { required: false, dateLabel: 'Meeting Date', timeLabel: 'Meeting Time' },
    estimation = { required: false, dateLabel: 'Estimation Date', budgetLabel: 'Estimation Budget' },
    showDescription = false,
    isPriority = false,
    descriptionLabel = 'Description',
    name = '',
  } = statusDetail || {};

  // Store previous form data to prevent redundant submissions
  const prevFormDataRef = useRef(null);

  // Convert time to IST (UTC+5:30)
  const convertToIST = useCallback((date) => {
    const istDate = new Date(date);
    return addMinutes(istDate, 330);
  }, []);

  // Format time for display (HH:mm)
  const formatTimeForDisplay = useCallback((date) => {
    return format(date, 'HH:mm');
  }, []);

  // Collect form data for submission
  const collectFormData = useCallback(() => {
    let nextFollowUpDateStr = '';
    if (meeting.required && meetingDate && meetingTime) {
      const date = new Date(meetingDate);
      const time = new Date(meetingTime);
      date.setHours(time.getHours(), time.getMinutes(), 0, 0);
      const istDate = convertToIST(date);
      nextFollowUpDateStr = istDate.toISOString();
    }

    const estimationDateWithTime = estimationDate ? new Date(estimationDate) : null;
    if (estimationDateWithTime) {
      estimationDateWithTime.setHours(0, 0, 0, 0);
    }

    return {
      nextFollowUpDate: nextFollowUpDateStr,
      estimationDate: estimationDateWithTime ? estimationDateWithTime.toISOString() : '',
      estimationBudget,
      meetingDescription,
      priority: isPriority ? priority : 'Medium',
      address: name === 'Active' ? address : '',
      reason: name === 'Inactive' ? reason : '',
    };
  }, [
    meeting.required,
    meetingDate,
    meetingTime,
    estimationDate,
    estimationBudget,
    meetingDescription,
    priority,
    address,
    reason,
    isPriority,
    name,
    convertToIST,
  ]);

  // Memoize form data to prevent unnecessary recomputations
  const formData = useMemo(() => collectFormData(), [collectFormData]);

  // Compare form data to prevent redundant submissions
  const isFormDataEqual = useCallback((newData, prevData) => {
    if (!prevData) return false;
    return (
      newData.nextFollowUpDate === prevData.nextFollowUpDate &&
      newData.estimationDate === prevData.estimationDate &&
      newData.estimationBudget === prevData.estimationBudget &&
      newData.meetingDescription === prevData.meetingDescription &&
      newData.priority === prevData.priority &&
      newData.address === prevData.address &&
      newData.reason === prevData.reason
    );
  }, []);

  // Handle field changes and submit to parent
  const handleFieldChange = useCallback(() => {
    if (!isFormDataEqual(formData, prevFormDataRef.current)) {
      prevFormDataRef.current = formData;
      onSubmit(formData);
    }
  }, [formData, onSubmit, isFormDataEqual]);

  // Submit initial data on mount
  useEffect(() => {
    if (!isFormDataEqual(formData, prevFormDataRef.current)) {
      prevFormDataRef.current = formData;
      onSubmit(formData);
    }
  }, []); // Empty dependency array to run only on mount

  // Update form data when specific fields change
  useEffect(() => {
    handleFieldChange();
  }, [
    meetingDate,
    meetingTime,
    estimationDate,
    estimationBudget,
    meetingDescription,
    priority,
    address,
    reason,
    handleFieldChange,
  ]);

  // Render priority dropdown
  const renderPriorityDropdown = useCallback(() => {
    const options = ['Important', 'High', 'Medium', 'Low'];
    return (
      <>
        <StyledTouchable
          className="bg-gray-100 border border-gray-300 p-3 rounded-lg flex-row justify-between items-center"
          onPress={() => setPriorityVisible(!priorityVisible)}
        >
          <StyledText className="text-gray-900 font-poppins text-sm flex-1">
            {priority || 'Select Priority'}
          </StyledText>
          <Ionicons name={priorityVisible ? 'chevron-up' : 'chevron-down'} size={16} color="#4B5563" />
        </StyledTouchable>
        {priorityVisible && (
          <StyledView className="border border-gray-300 rounded-lg mt-1 bg-gray-100 max-h-48">
            <ScrollView nestedScrollEnabled>
              {options.map((option, index) => (
                <StyledTouchable
                  key={index}
                  onPress={() => {
                    setPriority(option);
                    setPriorityVisible(false);
                    handleFieldChange();
                  }}
                  className="p-3"
                >
                  <StyledText className="text-gray-900 font-poppins text-sm">{option}</StyledText>
                </StyledTouchable>
              ))}
            </ScrollView>
          </StyledView>
        )}
      </>
    );
  }, [priority, priorityVisible, handleFieldChange]);

  // Render only if there are dynamic fields to display
  if (
    !meeting.required &&
    !estimation.required &&
    !showDescription &&
    !isPriority &&
    name !== 'Active' &&
    name !== 'Inactive'
  ) {
    return null;
  }

  return (
    <StyledView className="mt-4">
     

      {/* Priority */}
      {isPriority && (
        <>
          <StyledText className="text-gray-900 font-poppins text-sm font-semibold mb-1">
            Priority
          </StyledText>
          {renderPriorityDropdown()}
        </>
      )}

      {/* Meeting Description */}
      {showDescription && (
        <>
          <StyledText className="text-gray-900 font-poppins text-sm font-semibold mb-1">
            {descriptionLabel || 'Description'}
          </StyledText>
          <StyledTextInput
            className="bg-gray-100 border border-gray-300 p-3 rounded-lg text-gray-900 font-poppins text-sm"
            placeholder="Enter meeting notes or details"
            placeholderTextColor="#4B5563"
            value={meetingDescription}
            onChangeText={setMeetingDescription}
            onBlur={handleFieldChange}
            multiline
          />
        </>
      )}

      {/* Meeting Date */}
      {meeting.required && (
        <>
          <StyledText className="text-gray-900 font-poppins text-sm font-semibold mb-1">
            {meeting.dateLabel || 'Meeting Date'}
          </StyledText>
          <StyledTouchable
            className="bg-gray-100 border border-gray-300 p-3 rounded-lg"
            onPress={() => setShowMeetingDatePicker(true)}
          >
            <StyledText className="text-gray-900 font-poppins text-sm">
              {format(meetingDate, 'dd/MM/yyyy')}
            </StyledText>
          </StyledTouchable>
          {showMeetingDatePicker && (
            <DateTimePicker
              value={meetingDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              minimumDate={new Date()}
              onChange={(event, selectedDate) => {
                setShowMeetingDatePicker(Platform.OS === 'ios');
                if (selectedDate) {
                  setMeetingDate(selectedDate);
                  handleFieldChange();
                }
              }}
            />
          )}
        </>
      )}

      {/* Meeting Time */}
      {meeting.required && (
        <>
          <StyledText className="text-gray-900 font-poppins text-sm font-semibold mb-1">
            {meeting.timeLabel || 'Meeting Time'}
          </StyledText>
          <StyledTouchable
            className="bg-gray-100 border border-gray-300 p-3 rounded-lg"
            onPress={() => setShowMeetingTimePicker(true)}
          >
            <StyledText className="text-gray-900 font-poppins text-sm">
              {formatTimeForDisplay(meetingTime)}
            </StyledText>
          </StyledTouchable>
          {showMeetingTimePicker && (
            <DateTimePicker
              value={meetingTime}
              mode="time"
              display={Platform.OS === 'ios' ? 'spinner' : 'clock'}
              is24Hour={true}
              onChange={(event, selectedTime) => {
                setShowMeetingTimePicker(Platform.OS === 'ios');
                if (selectedTime) {
                  setMeetingTime(selectedTime);
                  setTimeError('');
                  handleFieldChange();
                }
              }}
            />
          )}
          {timeError && (
            <StyledText className="text-red-500 font-poppins text-sm mt-1">{timeError}</StyledText>
          )}
        </>
      )}

      {/* Estimation Date */}
      {estimation.required && (
        <>
          <StyledText className="text-gray-900 font-poppins text-sm font-semibold mb-1">
            {estimation.dateLabel || 'Estimation Date'}
          </StyledText>
          <StyledTouchable
            className="bg-gray-100 border border-gray-300 p-3 rounded-lg"
            onPress={() => setShowEstimationDatePicker(true)}
          >
            <StyledText className="text-gray-900 font-poppins text-sm">
              {format(estimationDate, 'dd/MM/yyyy')}
            </StyledText>
          </StyledTouchable>
          {showEstimationDatePicker && (
            <DateTimePicker
              value={estimationDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              minimumDate={new Date()}
              onChange={(event, selectedDate) => {
                setShowEstimationDatePicker(Platform.OS === 'ios');
                if (selectedDate) {
                  const newDate = new Date(selectedDate);
                  newDate.setHours(0, 0, 0, 0);
                  setEstimationDate(newDate);
                  handleFieldChange();
                }
              }}
            />
          )}
        </>
      )}

      {/* Estimation Budget */}
      {estimation.required && (
        <>
          <StyledText className="text-gray-900 font-poppins text-sm font-semibold mb-1">
            {estimation.budgetLabel || 'Estimation Budget'}
          </StyledText>
          <StyledTextInput
            className="bg-gray-100 border border-gray-300 p-3 rounded-lg text-gray-900 font-poppins text-sm"
            placeholder="Enter budget amount"
            placeholderTextColor="#4B5563"
            value={estimationBudget}
            onChangeText={setEstimationBudget}
            onBlur={handleFieldChange}
            keyboardType="numeric"
          />
        </>
      )}

      {/* Address for Active Status */}
      {name === 'Active' && (
        <>
          <StyledText className="text-gray-900 font-poppins text-sm font-semibold mb-1">
            Address
          </StyledText>
          <StyledTextInput
            className="bg-gray-100 border border-gray-300 p-3 rounded-lg text-gray-900 font-poppins text-sm"
            placeholder="Enter location or address"
            placeholderTextColor="#4B5563"
            value={address}
            onChangeText={setAddress}
            onBlur={handleFieldChange}
          />
        </>
      )}

      {/* Reason for Inactive Status */}
      {name === 'Inactive' && (
        <>
          <StyledText className="text-gray-900 font-poppins text-sm font-semibold mb-1">
            Reason
          </StyledText>
          <StyledTextInput
            className="bg-gray-100 border border-gray-300 p-3 rounded-lg text-gray-900 font-poppins text-sm"
            placeholder="Enter reason for inactivity"
            placeholderTextColor="#4B5563"
            value={reason}
            onChangeText={setReason}
            onBlur={handleFieldChange}
          />
        </>
      )}
    </StyledView>
  );
};

export default DynamicFields;