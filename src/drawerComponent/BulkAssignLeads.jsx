


import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, ActivityIndicator, ScrollView, Dimensions } from 'react-native';
import { styled } from 'nativewind';
import { useSelector, useDispatch } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import { fetchAllEmployees } from '../redux/slices/getActiveEmployeesSlice';
import { fetchAllLeads } from '../redux/slices/getAllLeadSlice';
import { assignLeads, resetAssignState } from '../redux/slices/bulkAssignLeadsSlice';
import CustomPoppinsFonts from '../font/CustomPoppinsFonts';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { useIsFocused } from '@react-navigation/native';

const StyledView = styled(View);
const StyledTouchable = styled(TouchableOpacity);
const StyledText = styled(CustomPoppinsFonts);

const BulkAssignLeads = ({ route, navigation, onClose }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { activeEmployees, loading: employeesLoading, error: employeesError } = useSelector(
    (state) => state.activeEmployees
  );
  const { loading: assignLoading, error: assignError, success } = useSelector(
    (state) => state.bulkAssignLeads
  );

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const { leadIds } = route.params || { leadIds: [] };
  const [alertState, setAlertState] = useState({
    visible: false,
    type: '', // 'error' or 'success'
    message: '',
  });

  // Get screen width for dropdown
  const screenWidth = Dimensions.get('window').width;
  const dropdownWidth = screenWidth * 0.9; // 90% of screen width

  // Fetch employees on mount
  useEffect(() => {
    console.log('BulkAssignLeads: Component mounted', { leadIds });
    dispatch(fetchAllEmployees());
  }, [dispatch]);

  // Handle success or error feedback
  useEffect(() => {
    console.log('BulkAssignLeads: Redux state', { success, assignError, assignLoading });
    if (success && isFocused) {
      console.log('BulkAssignLeads: Assignment successful');
      setAlertState({
        visible: true,
        type: 'success',
        message: 'Leads assigned successfully!',
      });
      // Reset state after 2 seconds
      setTimeout(() => {
        dispatch(resetAssignState());
        setSelectedEmployee(null);
        dispatch(fetchAllLeads({ page: 1, refresh: true }));
        setAlertState({ visible: false, type: '', message: '' });
        if (onClose) onClose();
      }, 2000);
    }
    if (assignError && isFocused) {
      console.log('BulkAssignLeads: Assignment error', assignError);
      setAlertState({
        visible: true,
        type: 'error',
        message: assignError || 'Failed to assign leads',
      });
      // Clear error after 2 seconds
      setTimeout(() => {
        setAlertState({ visible: false, type: '', message: '' });
      }, 2000);
    }
  }, [success, assignError, dispatch, isFocused, onClose]);

  // Handle employee selection
  const handleEmployeeSelect = (value) => {
    console.log('BulkAssignLeads: Employee selected', { value });
    setSelectedEmployee(value);
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log('BulkAssignLeads: handleSubmit called', { selectedEmployee, leadIds });
    if (!selectedEmployee) {
      console.log('BulkAssignLeads: No employee selected');
      setAlertState({
        visible: true,
        type: 'error',
        message: 'Please select an employee.',
      });
      setTimeout(() => {
        setAlertState({ visible: false, type: '', message: '' });
      }, 2000);
      return;
    }
    if (!leadIds || !Array.isArray(leadIds) || leadIds.length === 0) {
      console.log('BulkAssignLeads: No leads selected');
      setAlertState({
        visible: true,
        type: 'error',
        message: 'No leads selected.',
      });
      setTimeout(() => {
        setAlertState({ visible: false, type: '', message: '' });
      }, 2000);
      return;
    }
    console.log('BulkAssignLeads: Dispatching assignLeads', { leadIds, assignedTo: selectedEmployee });
    dispatch(assignLeads({ leadIds, assignedTo: selectedEmployee }));
  };

  // Render alert
  const renderAlert = () => {
    if (!alertState.visible) return null;
    const isError = alertState.type === 'error';

    return (
      <StyledView
        className={`rounded-md p-3 mb-3 ${
          isError ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'
        } border`}
      >
        <StyledText
          className={`text-sm font-semibold ${isError ? 'text-red-600' : 'text-green-600'}`}
        >
          {isError ? 'Error' : 'Success'}
        </StyledText>
        <StyledText className="text-sm text-gray-700">{alertState.message}</StyledText>
      </StyledView>
    );
  };

  return (
    <StyledView className="bg-gray-50 p-3 rounded-lg ">
      {/* Close Button */}
      <StyledTouchable onPress={onClose} className="self-end mb-3">
        <Feather name="x" size={20} color="#1F2937" />
      </StyledTouchable>

      {/* Header */}
      <StyledView className="mb-3">
        <StyledText className="text-lg font-bold text-gray-900">Assign Leads</StyledText>
      </StyledView>

      {/* Alert */}
      {renderAlert()}

      {/* Employee Picker */}
      <StyledView className="mb-3">
        {employeesLoading && (
          <StyledView className="flex-row items-center justify-center p-2 bg-white rounded-md shadow-sm">
            <ActivityIndicator size="small" color="#3B82F6" />
            <StyledText className="ml-2 text-sm text-gray-600">Loading employees...</StyledText>
          </StyledView>
        )}
        {employeesError && (
          <StyledView className="bg-red-50 rounded-md p-2 mb-2 border border-red-200">
            <StyledText className="text-sm text-red-600">Error: {employeesError}</StyledText>
            <StyledTouchable
              onPress={() => dispatch(fetchAllEmployees())}
              className="mt-2 bg-red-500 py-1 px-3 rounded-md flex-row items-center justify-center"
            >
              <Feather name="refresh-cw" size={14} color="#FFFFFF" />
              <StyledText className="ml-1 text-white text-sm">Retry</StyledText>
            </StyledTouchable>
          </StyledView>
        )}
        {!employeesLoading && !employeesError && (
          <StyledView className="bg-white rounded-md shadow-sm border border-gray-200">
            <ScrollView style={{ maxHeight: 40 }} nestedScrollEnabled>
              <Picker
                selectedValue={selectedEmployee}
                onValueChange={(itemValue) => handleEmployeeSelect(itemValue)}
                style={{
                  height: 56,
                  width: dropdownWidth,
                  paddingBottom:2
                }}
                enabled={!employeesLoading && !assignLoading}
              >
                <Picker.Item label="Select an employee" value={null} color="#6B7280" />
                {activeEmployees.map((employee) => (
                  <Picker.Item
                    key={employee.empId}
                    label={employee.name}
                    value={employee.empId}
                    color="#1F2937"
                  />
                ))}
              </Picker>
            </ScrollView>
          </StyledView>
        )}
      </StyledView>

      {/* Submit Button */}
      <LinearGradient colors={['#3B82F6', '#1D4ED8']} className="rounded-md">
        <StyledTouchable
          onPress={handleSubmit}
          className={`py-2 px-4 flex-row items-center justify-center rounded-md ${
            assignLoading || employeesLoading || !selectedEmployee ? 'opacity-50' : 'opacity-100'
          }`}
          disabled={assignLoading || employeesLoading || !selectedEmployee}
        >
          {assignLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Feather name="check-circle" size={16} color="#FFFFFF" />
          )}
          <StyledText className="ml-2 text-white text-sm font-semibold">
            {assignLoading ? 'Assigning...' : 'Assign Leads'}
          </StyledText>
        </StyledTouchable>
      </LinearGradient>
    </StyledView>
  );
};

export default BulkAssignLeads;