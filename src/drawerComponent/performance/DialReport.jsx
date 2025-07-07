// import React, { useEffect, useState } from 'react';
// import { StyleSheet, TextInput, FlatList, ActivityIndicator, View, Text, TouchableOpacity, ScrollView, Pressable } from 'react-native';
// import { styled } from 'nativewind';
// import { useDispatch, useSelector } from 'react-redux';
// import { Picker } from '@react-native-picker/picker';
// // import { fetchDialReport, resetDialReportState } from '../../redux/slices/getDialReportSlice';
// import { fetchDialReport, resetDialReportState,fetchAllEmployees } from '../../redux/slice/index';
// // import { fetchAllEmployees } from '../../redux/slices/getActiveEmployeesSlice';
// import LinearGradient from 'react-native-linear-gradient';
// import { RFPercentage } from 'react-native-responsive-fontsize';
// import Header from '../../component/Header';
// import CustomButton from '../../component/CustomButton';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// const StyledView = styled(View);
// const StyledText = styled(Text);
// const StyledTouchable = styled(TouchableOpacity);
// const StyledTextInput = styled(TextInput);

// const DialReport = ({ navigation }) => {
//   const dispatch = useDispatch();
//   const { cardData, tableData, loading, error, success, totalRecords = 0 } = useSelector((state) => state.dialReport);
//   const { activeEmployees, loading: employeesLoading, error: employeesError } = useSelector(
//     (state) => state.activeEmployees
//   );
//   const [selectedEmployee, setSelectedEmployee] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [dateFilter, setDateFilter] = useState('today');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [page, setPage] = useState(1);
//   const [limit] = useState(5); // Changed to 5 records per page as requested
//   const [showFilters, setShowFilters] = useState(false);
//   const [showEmployeeDropdown, setShowEmployeeDropdown] = useState(false);
//   const [showDateDropdown, setShowDateDropdown] = useState(false);

//   // Calculate total pages based on totalRecords and limit
//   const totalPages = Math.ceil(totalRecords / limit);

//   useEffect(() => {
//     dispatch(fetchAllEmployees());
//     const payload = {
//       search: '',
//       dateFilter: 'today',
//       startDate: '',
//       endDate: '',
//       page: 1,
//       limit: 5, // Updated to 5
//     };
//     dispatch(fetchDialReport(payload));
//   }, [dispatch]);

//   // Fetch data when page changes
//   useEffect(() => {
//     const payload = {
//       search: searchQuery || selectedEmployee || '',
//       dateFilter,
//       startDate: dateFilter === 'range' ? startDate : '',
//       endDate: dateFilter === 'range' ? endDate : '',
//       page,
//       limit: 5, // Updated to 5
//     };
//     dispatch(fetchDialReport(payload));
//   }, [page, dispatch, searchQuery, selectedEmployee, dateFilter, startDate, endDate]);

//   const handleSearch = () => {
//     setPage(1); // Reset to first page on new search
//     const payload = {
//       search: searchQuery || selectedEmployee || '',
//       dateFilter,
//       startDate: dateFilter === 'range' ? startDate : '',
//       endDate: dateFilter === 'range' ? endDate : '',
//       page: 1,
//       limit: 5, // Updated to 5
//     };
//     dispatch(fetchDialReport(payload));
//     setShowFilters(false);
//   };

//   const handleReset = () => {
//     setSelectedEmployee('');
//     setSearchQuery('');
//     setDateFilter('today');
//     setStartDate('');
//     setEndDate('');
//     setPage(1);
//     setShowFilters(false);
//     const payload = {
//       search: '',
//       dateFilter: 'today',
//       startDate: '',
//       endDate: '',
//       page: 1,
//       limit: 5, // Updated to 5
//     };
//     dispatch(fetchDialReport(payload));
//   };

//   useEffect(() => {
//     return () => {
//       dispatch(resetDialReportState());
//     };
//   }, [dispatch]);

//   const handleSearchPress = () => {
//     setShowFilters(!showFilters);
//     setShowEmployeeDropdown(false);
//     setShowDateDropdown(false);
//   };

//   const handleEmployeeSelect = (value, label) => {
//     setSelectedEmployee(value);
//     setSearchQuery(label);
//     setShowEmployeeDropdown(false);
//   };

//   const handleDateFilterChange = (value) => {
//     setDateFilter(value);
//     setShowDateDropdown(false);
//     if (value !== 'range') {
//       setStartDate('');
//       setEndDate('');
//     }
//   };

//   const employeesList = activeEmployees.map((employee) => ({
//     label: employee.name,
//     value: employee.empId,
//   }));

//   const renderTableItem = ({ item }) => (
//     <StyledView className="flex-row py-3 border-b border-gray-200">
//       <StyledText className="flex-1 text-center text-gray-700 text-[14px]">{item.userName}</StyledText>
//       <StyledText className="flex-1 text-center text-gray-700 text-[14px]">{item.totalCalls}</StyledText>
//       <StyledText className="flex-1 text-center text-gray-700 text-[14px]">{item.connectedCalls}</StyledText>
//       <StyledText className="flex-1 text-center text-gray-700 text-[14px]">{item.totalTalkTimeFormatted}</StyledText>
//     </StyledView>
//   );

//   return (
//     <StyledView className="flex-1 bg-gray-100">
//       <Header
//         title="Dial Report"
//         showBackButton={true}
//         showSearchButton={true}
//         onSearchPress={handleSearchPress}
//         titleFontSize={RFPercentage(3)}
//         onBackPress={() => {
//           navigation.navigate('Main', {
//             screen: 'Dashboard'
//           });
//         }}
//       />

//       {loading && (
//         <StyledView className="flex-1 justify-center items-center p-5">
//           <StyledText className="text-[16px] text-gray-600 font-poppins font-medium">
//             Loading dial report data...
//           </StyledText>
//         </StyledView>
//       )}

//       {error && (
//         <StyledView className="flex-1 justify-center items-center p-5">
//           <StyledText className="text-[16px] text-red-500 text-center mb-4">
//             Error: {error}
//           </StyledText>
//           <CustomButton
//             buttonName="Retry"
//             onPress={handleSearch}
//             gradientColors={['#8290EA', '#3F4CA0']}
//             height={40}
//             width="30%"
//           />
//         </StyledView>
//       )}

//       {!loading && !error && (
//         <View className="flex-1 p-3">
//           {showFilters && (
//             <>
//               {/* Search Field */}
//               <StyledView className="mb-4">
//                 <StyledText className="text-[16px] font-poppins font-semibold text-gray-800 mb-2">
//                   Select Employee
//                 </StyledText>
//                 {employeesLoading && (
//                   <StyledText className="text-[16px] text-gray-600 text-center">
//                     Loading employees...
//                   </StyledText>
//                 )}
//                 {employeesError && (
//                   <StyledText className="text-[16px] text-red-500 text-center">
//                     Error: {employeesError}
//                   </StyledText>
//                 )}
//                 {!employeesLoading && !employeesError && (
//                   <StyledView className="bg-gray-200 rounded-lg p-3 border border-gray-300">
//                     <Pressable
//                       className="h-10 bg-white border border-gray-300 rounded-lg px-3 flex-row items-center justify-between"
//                       onPress={() => {
//                         setShowEmployeeDropdown(!showEmployeeDropdown);
//                         setShowDateDropdown(false);
//                       }}
//                     >
//                       <StyledText className="text-[14px] text-gray-800 flex-1" numberOfLines={1}>
//                         {searchQuery || 'Select an employee'}
//                       </StyledText>
//                       <Icon
//                         name={showEmployeeDropdown ? 'arrow-drop-up' : 'arrow-drop-down'}
//                         size={20}
//                         color="#000"
//                       />
//                     </Pressable>
//                     {showEmployeeDropdown && (
//                       <ScrollView
//                         className="bg-white rounded-lg border border-gray-300 mt-2 max-h-36"
//                         nestedScrollEnabled
//                       >
//                         {employeesList.length > 0 ? (
//                           employeesList.map((item) => (
//                             <TouchableOpacity
//                               key={item.value}
//                               className="p-3 border-b border-gray-200"
//                               onPress={() => handleEmployeeSelect(item.value, item.label)}
//                             >
//                               <StyledText className="text-[14px] text-gray-800">{item.label}</StyledText>
//                             </TouchableOpacity>
//                           ))
//                         ) : (
//                           <StyledText className="text-[14px] text-gray-600 text-center p-3">
//                             No employees found
//                           </StyledText>
//                         )}
//                       </ScrollView>
//                     )}
//                   </StyledView>
//                 )}
//               </StyledView>

//               {/* Date Filter */}
//               <StyledView className="mb-4">
//                 <StyledText className="text-[16px] font-poppins font-semibold text-gray-800 mb-2">
//                   Date Filter
//                 </StyledText>
//                 <StyledView className="bg-gray-200 rounded-lg p-3 border border-gray-300">
//                   <Pressable
//                     className="h-10 bg-white border border-gray-300 rounded-lg px-3 flex-row items-center justify-between"
//                     onPress={() => {
//                       setShowDateDropdown(!showDateDropdown);
//                       setShowEmployeeDropdown(false);
//                     }}
//                   >
//                     <StyledText className="text-[14px] text-gray-800">
//                       {dateFilter === 'today'
//                         ? 'Today'
//                         : dateFilter === 'last7days'
//                           ? 'Last 7 Days'
//                           : dateFilter === 'last30days'
//                             ? 'Last 30 Days'
//                             : 'Custom Range'}
//                     </StyledText>
//                     <Icon
//                       name={showDateDropdown ? 'arrow-drop-up' : 'arrow-drop-down'}
//                       size={20}
//                       color="#000"
//                     />
//                   </Pressable>
//                   {showDateDropdown && (
//                     <ScrollView
//                       className="bg-white rounded-lg border border-gray-300 mt-2 max-h-36"
//                       nestedScrollEnabled
//                     >
//                       <TouchableOpacity
//                         className="p-3 border-b border-gray-200"
//                         onPress={() => handleDateFilterChange('today')}
//                       >
//                         <StyledText className="text-[14px] text-gray-800">Today</StyledText>
//                       </TouchableOpacity>
//                       <TouchableOpacity
//                         className="p-3 border-b border-gray-200"
//                         onPress={() => handleDateFilterChange('last7days')}
//                       >
//                         <StyledText className="text-[14px] text-gray-800">Last 7 Days</StyledText>
//                       </TouchableOpacity>
//                       <TouchableOpacity
//                         className="p-3 border-b border-gray-200"
//                         onPress={() => handleDateFilterChange('last30days')}
//                       >
//                         <StyledText className="text-[14px] text-gray-800">Last 30 Days</StyledText>
//                       </TouchableOpacity>
//                       <TouchableOpacity
//                         className="p-3"
//                         onPress={() => handleDateFilterChange('range')}
//                       >
//                         <StyledText className="text-[14px] text-gray-800">Custom Range</StyledText>
//                       </TouchableOpacity>
//                     </ScrollView>
//                   )}
//                   {dateFilter === 'range' && (
//                     <StyledView className="mt-3">
//                       <StyledText className="text-[14px] text-gray-800 mb-1">Start Date (YYYY-MM-DD)</StyledText>
//                       <StyledTextInput
//                         className="bg-white rounded-lg p-3 shadow-sm text-gray-700 text-[14px] border border-gray-200"
//                         placeholder="YYYY-MM-DD"
//                         value={startDate}
//                         onChangeText={setStartDate}
//                       />
//                       <StyledText className="text-[14px] text-gray-800 mb-1 mt-2">End Date (YYYY-MM-DD)</StyledText>
//                       <StyledTextInput
//                         className="bg-white rounded-lg p-3 shadow-sm text-gray-700 text-[14px] border border-gray-200"
//                         placeholder="YYYY-MM-DD"
//                         value={endDate}
//                         onChangeText={setEndDate}
//                       />
//                     </StyledView>
//                   )}
//                 </StyledView>
//               </StyledView>

//               {/* Go and Reset Buttons */}
//               <StyledView className="flex-row justify-between mb-5">
//                 <CustomButton
//                   buttonName="Go"
//                   onPress={handleSearch}
//                   gradientColors={['#8290EA', '#3F4CA0']}
//                   height={40}
//                   width="45%"
//                 />
//                 <CustomButton
//                   buttonName="Reset"
//                   onPress={handleReset}
//                   gradientColors={['#FF6347', '#D32F2F']}
//                   height={40}
//                   width="45%"
//                 />
//               </StyledView>
//             </>
//           )}

//           {/* Call Summary Blocks */}
//           {success && cardData && (
//             <StyledView className="bg-white rounded-lg p-5 mb-5 shadow-md">
//               <StyledText className="text-[22px] font-poppins font-bold text-gray-900 mb-4">
//                 Call Summary
//               </StyledText>
//               <StyledView className="flex-row flex-wrap justify-between">
//                 <StyledView className="w-[48%] bg-white rounded-lg p-4 mb-3 shadow-lg border border-gray-200">
//                   <StyledText className="text-[24px] mb-2">📞</StyledText>
//                   <StyledText className="text-gray-500 text-[14px] uppercase font-semibold">Total Calls</StyledText>
//                   <StyledText className="text-gray-900 text-[22px] font-bold">{cardData.totalCalls}</StyledText>
//                   <StyledView className="bg-blue-500 px-3 py-1 rounded-full mt-2">
//                     <StyledText className="text-white text-[12px] font-bold">All</StyledText>
//                   </StyledView>
//                 </StyledView>
//                 <StyledView className="w-[48%] bg-white rounded-lg p-4 mb-3 shadow-lg border border-gray-200">
//                   <StyledText className="text-[24px] mb-2">✅</StyledText>
//                   <StyledText className="text-gray-500 text-[14px] uppercase font-semibold">Answered</StyledText>
//                   <StyledText className="text-gray-900 text-[22px] font-bold">{cardData.answered}</StyledText>
//                   <StyledView className="bg-green-500 px-3 py-1 rounded-full mt-2">
//                     <StyledText className="text-white text-[12px] font-bold">Connected</StyledText>
//                   </StyledView>
//                 </StyledView>
//                 <StyledView className="w-[48%] bg-white rounded-lg p-4 mb-3 shadow-lg border border-gray-200">
//                   <StyledText className="text-[24px] mb-2">📤</StyledText>
//                   <StyledText className="text-gray-500 text-[14px] uppercase font-semibold">Outgoing</StyledText>
//                   <StyledText className="text-gray-900 text-[22px] font-bold">{cardData.outgoing}</StyledText>
//                   <StyledView className="bg-cyan-500 px-3 py-1 rounded-full mt-2">
//                     <StyledText className="text-white text-[12px] font-bold">Initiated</StyledText>
//                   </StyledView>
//                 </StyledView>
//                 <StyledView className="w-[48%] bg-white rounded-lg p-4 mb-3 shadow-lg border border-gray-200">
//                   <StyledText className="text-[24px] mb-2">❌</StyledText>
//                   <StyledText className="text-gray-500 text-[14px] uppercase font-semibold">Missed</StyledText>
//                   <StyledText className="text-gray-900 text-[22px] font-bold">{cardData.missed}</StyledText>
//                   <StyledView className="bg-red-500 px-3 py-1 rounded-full mt-2">
//                     <StyledText className="text-white text-[12px] font-bold">Lost</StyledText>
//                   </StyledView>
//                 </StyledView>
//                 <StyledView className="w-full bg-white rounded-lg p-4 mb-3 shadow-lg border border-gray-200">
//                   <StyledText className="text-[24px] mb-2">⏱️</StyledText>
//                   <StyledText className="text-gray-500 text-[14px] uppercase font-semibold">Avg Talk Time</StyledText>
//                   <StyledText className="text-gray-900 text-[22px] font-bold">{cardData.avgTalkTimeFormatted}</StyledText>
//                 </StyledView>
//                 <StyledView className="w-full bg-white rounded-lg p-4 mb-3 shadow-lg border border-gray-200">
//                   <StyledText className="text-[24px] mb-2">🕰️</StyledText>
//                   <StyledText className="text-gray-500 text-[14px] uppercase font-semibold">Total Talk Time</StyledText>
//                   <StyledText className="text-gray-900 text-[22px] font-bold">{cardData.totalTalkTimeFormatted}</StyledText>
//                 </StyledView>
//               </StyledView>
//             </StyledView>
//           )}

//           {/* Table Data */}
//           {success && tableData && tableData.length > 0 && (
//             <StyledView className="bg-white rounded-lg p-5 shadow-md mb-5">
//               <StyledText className="text-[20px] font-poppins font-bold text-gray-900 mb-4">
//                 User Call Details
//               </StyledText>
//               <StyledView className="flex-row bg-gray-100 py-3 rounded-t-lg">
//                 <StyledText className="flex-1 text-center text-gray-700 font-semibold text-[14px]">User</StyledText>
//                 <StyledText className="flex-1 text-center text-gray-700 font-semibold text-[14px]">Total Calls</StyledText>
//                 <StyledText className="flex-1 text-center text-gray-700 font-semibold text-[14px]">Connected</StyledText>
//                 <StyledText className="flex-1 text-center text-gray-700 font-semibold text-[14px]">Talk Time</StyledText>
//               </StyledView>
//               <FlatList
//                 data={tableData}
//                 renderItem={renderTableItem}
//                 keyExtractor={(item) => item.empId}
//                 style={{ maxHeight: 300 }}
//                 nestedScrollEnabled
//               />
//             </StyledView>
//           )}

//           {/* Pagination */}
//           {success && tableData && tableData.length > 0 && (
//             <StyledView className="flex-row justify-between items-center mt-5 mb-5">
//               <StyledTouchable
//                 className={`py-3 px-6 rounded-lg ${page === 1 ? 'bg-gray-300' : 'bg-blue-500'}`}
//                 onPress={() => page > 1 && setPage(page - 1)}
//                 disabled={page === 1}
//               >
//                 <StyledText className="text-white text-[16px] font-poppins font-semibold text-center">
//                   Previous
//                 </StyledText>
//               </StyledTouchable>
//               <StyledText className="text-[16px] text-gray-900 font-poppins">
//                 Page {page} of {totalPages || 1}
//               </StyledText>
//               <StyledTouchable
//                 className={`py-3 px-6 rounded-lg ${page >= totalPages ? 'bg-gray-300' : 'bg-blue-500'}`}
//                 onPress={() => {
//                   if (page < totalPages) {
//                     setPage(page + 1);
//                   }
//                 }}
//                 disabled={page >= totalPages}
//               >
//                 <StyledText className="text-white text-[16px] font-poppins font-semibold text-center">
//                   Next
//                 </StyledText>
//               </StyledTouchable>
//             </StyledView>
//           )}
//         </View>
//       )}
//     </StyledView>
//   );
// };

// const styles = StyleSheet.create({
//   tableContainer: {
//     maxHeight: 400,
//   },
//   flatList: {
//     maxHeight: 300,
//   },
// });

// export default DialReport;

import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, FlatList, ActivityIndicator, View, Text, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { styled } from 'nativewind';
import { useDispatch, useSelector } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
// import { fetchDialReport, resetDialReportState } from '../../redux/slices/getDialReportSlice';
import { fetchDialReport, resetDialReportState,fetchAllEmployees } from '../../redux/slice/index';
// import { fetchAllEmployees } from '../../redux/slices/getActiveEmployeesSlice';
import LinearGradient from 'react-native-linear-gradient';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Header from '../../component/Header';
import CustomButton from '../../component/CustomButton';
import Icon from 'react-native-vector-icons/MaterialIcons';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchable = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);

const DialReport = ({ navigation }) => {
  const dispatch = useDispatch();
  const { cardData, tableData, loading, error, success, totalRecords = 0 } = useSelector((state) => state.dialReport);
  const { activeEmployees, loading: employeesLoading, error: employeesError } = useSelector(
    (state) => state.activeEmployees
  );
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('today');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(5); // Changed to 5 records per page as requested
  const [showFilters, setShowFilters] = useState(false);
  const [showEmployeeDropdown, setShowEmployeeDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);

  // Calculate total pages based on totalRecords and limit
  const totalPages = Math.ceil(totalRecords / limit);

  useEffect(() => {
    dispatch(fetchAllEmployees());
    const payload = {
      search: '',
      dateFilter: 'today',
      startDate: '',
      endDate: '',
      page: 1,
      limit: 5, // Updated to 5
    };
    dispatch(fetchDialReport(payload));
  }, [dispatch]);

  // Fetch data when page changes
  useEffect(() => {
    const payload = {
      search: searchQuery || selectedEmployee || '',
      dateFilter,
      startDate: dateFilter === 'range' ? startDate : '',
      endDate: dateFilter === 'range' ? endDate : '',
      page,
      limit: 5, // Updated to 5
    };
    dispatch(fetchDialReport(payload));
  }, [page, dispatch, searchQuery, selectedEmployee, dateFilter, startDate, endDate]);

  const handleSearch = () => {
    setPage(1); // Reset to first page on new search
    const payload = {
      search: searchQuery || selectedEmployee || '',
      dateFilter,
      startDate: dateFilter === 'range' ? startDate : '',
      endDate: dateFilter === 'range' ? endDate : '',
      page: 1,
      limit: 5, // Updated to 5
    };
    dispatch(fetchDialReport(payload));
    setShowFilters(false);
  };

  const handleReset = () => {
    setSelectedEmployee('');
    setSearchQuery('');
    setDateFilter('today');
    setStartDate('');
    setEndDate('');
    setPage(1);
    setShowFilters(false);
    const payload = {
      search: '',
      dateFilter: 'today',
      startDate: '',
      endDate: '',
      page: 1,
      limit: 5, // Updated to 5
    };
    dispatch(fetchDialReport(payload));
  };

  useEffect(() => {
    return () => {
      dispatch(resetDialReportState());
    };
  }, [dispatch]);

  const handleSearchPress = () => {
    setShowFilters(!showFilters);
    setShowEmployeeDropdown(false);
    setShowDateDropdown(false);
  };

  const handleEmployeeSelect = (value, label) => {
    setSelectedEmployee(value);
    setSearchQuery(label);
    setShowEmployeeDropdown(false);
  };

  const handleDateFilterChange = (value) => {
    setDateFilter(value);
    setShowDateDropdown(false);
    if (value !== 'range') {
      setStartDate('');
      setEndDate('');
    }
  };

  const employeesList = activeEmployees.map((employee) => ({
    label: employee.name,
    value: employee.empId,
  }));

  const renderTableItem = ({ item }) => (
    <StyledView className="flex-row py-3 border-b border-gray-200">
      <StyledText className="flex-1 text-center text-gray-700 text-[14px]">{item.userName}</StyledText>
      <StyledText className="flex-1 text-center text-gray-700 text-[14px]">{item.totalCalls}</StyledText>
      <StyledText className="flex-1 text-center text-gray-700 text-[14px]">{item.connectedCalls}</StyledText>
      <StyledText className="flex-1 text-center text-gray-700 text-[14px]">{item.totalTalkTimeFormatted}</StyledText>
    </StyledView>
  );

  return (
    <StyledView className="flex-1 bg-gray-100">
      <Header
        title="Dial Report"
        showBackButton={true}
        showSearchButton={true}
        onSearchPress={handleSearchPress}
        titleFontSize={RFPercentage(3)}
        onBackPress={() => {
          navigation.navigate('Main', {
            screen: 'Dashboard'
          });
        }}
      />

      {loading && (
        <StyledView className="flex-1 justify-center items-center p-5">
          <StyledText className="text-[16px] text-gray-600 font-poppins font-medium">
            Loading dial report data...
          </StyledText>
        </StyledView>
      )}

      {error && (
        <StyledView className="flex-1 justify-center items-center p-5">
          <StyledText className="text-[16px] text-red-500 text-center mb-4">
            Error: {error}
          </StyledText>
          <CustomButton
            buttonName="Retry"
            onPress={handleSearch}
            gradientColors={['#8290EA', '#3F4CA0']}
            height={40}
            width="30%"
          />
        </StyledView>
      )}

      {!loading && !error && (
        <ScrollView className="flex-1 p-3">
          {showFilters && (
            <>
              {/* Search Field */}
              <StyledView className="mb-4">
                <StyledText className="text-[16px] font-poppins font-semibold text-gray-800 mb-2">
                  Select Employee
                </StyledText>
                {employeesLoading && (
                  <StyledText className="text-[16px] text-gray-600 text-center">
                    Loading employees...
                  </StyledText>
                )}
                {employeesError && (
                  <StyledText className="text-[16px] text-red-500 text-center">
                    Error: {employeesError}
                  </StyledText>
                )}
                {!employeesLoading && !employeesError && (
                  <StyledView className="bg-gray-200 rounded-lg p-3 border border-gray-300">
                    <Pressable
                      className="h-10 bg-white border border-gray-300 rounded-lg px-3 flex-row items-center justify-between"
                      onPress={() => {
                        setShowEmployeeDropdown(!showEmployeeDropdown);
                        setShowDateDropdown(false);
                      }}
                    >
                      <StyledText className="text-[14px] text-gray-800 flex-1" numberOfLines={1}>
                        {searchQuery || 'Select an employee'}
                      </StyledText>
                      <Icon
                        name={showEmployeeDropdown ? 'arrow-drop-up' : 'arrow-drop-down'}
                        size={20}
                        color="#000"
                      />
                    </Pressable>
                    {showEmployeeDropdown && (
                      <ScrollView
                        className="bg-white rounded-lg border border-gray-300 mt-2 max-h-36"
                        nestedScrollEnabled
                      >
                        {employeesList.length > 0 ? (
                          employeesList.map((item) => (
                            <TouchableOpacity
                              key={item.value}
                              className="p-3 border-b border-gray-200"
                              onPress={() => handleEmployeeSelect(item.value, item.label)}
                            >
                              <StyledText className="text-[14px] text-gray-800">{item.label}</StyledText>
                            </TouchableOpacity>
                          ))
                        ) : (
                          <StyledText className="text-[14px] text-gray-600 text-center p-3">
                            No employees found
                          </StyledText>
                        )}
                      </ScrollView>
                    )}
                  </StyledView>
                )}
              </StyledView>

              {/* Date Filter */}
              <StyledView className="mb-4">
                <StyledText className="text-[16px] font-poppins font-semibold text-gray-800 mb-2">
                  Date Filter
                </StyledText>
                <StyledView className="bg-gray-200 rounded-lg p-3 border border-gray-300">
                  <Pressable
                    className="h-10 bg-white border border-gray-300 rounded-lg px-3 flex-row items-center justify-between"
                    onPress={() => {
                      setShowDateDropdown(!showDateDropdown);
                      setShowEmployeeDropdown(false);
                    }}
                  >
                    <StyledText className="text-[14px] text-gray-800 flex-1">
                      {dateFilter === 'today'
                        ? 'Today'
                        : dateFilter === 'week'
                          ? 'This Week'
                          : dateFilter === 'month'
                            ? 'This Month'
                            : dateFilter === 'range'
                              ? `Range: ${startDate || 'N/A'} to ${endDate || 'N/A'}`
                              : 'Select a date filter'}
                    </StyledText>
                    <Icon
                      name={showDateDropdown ? 'arrow-drop-up' : 'arrow-drop-down'}
                      size={20}
                      color="#000"
                    />
                  </Pressable>
                  {showDateDropdown && (
                    <StyledView className="bg-white rounded-lg border border-gray-300 mt-2">
                      {['today', 'week', 'month', 'range'].map((filter) => (
                        <TouchableOpacity
                          key={filter}
                          className="p-3 border-b border-gray-200 last:border-b-0"
                          onPress={() => handleDateFilterChange(filter)}
                        >
                          <StyledText className="text-[14px] text-gray-800">
                            {filter === 'today'
                              ? 'Today'
                              : filter === 'week'
                                ? 'This Week'
                                : filter === 'month'
                                  ? 'This Month'
                                  : 'Custom Range'}
                          </StyledText>
                        </TouchableOpacity>
                      ))}
                    </StyledView>
                  )}
                </StyledView>
              </StyledView>

              {dateFilter === 'range' && (
                <StyledView className="mb-4 flex-row justify-between">
                  <StyledView className="w-[48%]">
                    <StyledText className="text-[16px] font-poppins font-semibold text-gray-800 mb-2">
                      Start Date
                    </StyledText>
                    <StyledTextInput
                      className="h-10 bg-white border border-gray-300 rounded-lg px-3 text-[14px] text-gray-800"
                      placeholder="YYYY-MM-DD"
                      value={startDate}
                      onChangeText={setStartDate}
                    />
                  </StyledView>
                  <StyledView className="w-[48%]">
                    <StyledText className="text-[16px] font-poppins font-semibold text-gray-800 mb-2">
                      End Date
                    </StyledText>
                    <StyledTextInput
                      className="h-10 bg-white border border-gray-300 rounded-lg px-3 text-[14px] text-gray-800"
                      placeholder="YYYY-MM-DD"
                      value={endDate}
                      onChangeText={setEndDate}
                    />
                  </StyledView>
                </StyledView>
              )}

              <StyledView className="flex-row justify-around mb-4">
                <CustomButton
                  buttonName="Search"
                  onPress={handleSearch}
                  gradientColors={['#22C55E', '#16A34A']}
                  height={40}
                  width="45%"
                />
                <CustomButton
                  buttonName="Reset"
                  onPress={handleReset}
                  gradientColors={['#EF4444', '#DC2626']}
                  height={40}
                  width="45%"
                />
              </StyledView>
            </>
          )}

          {/* Cards Display */}
          <StyledView className="flex-row flex-wrap justify-between mb-5">
            {Object.keys(cardData || {}).length > 0 ? (
              Object.entries(cardData).map(([key, value]) => (
                <LinearGradient
                  key={key}
                  colors={['#4CAF50', '#2E7D32']}
                  className="w-[48%] p-4 rounded-lg mb-4 shadow-md"
                >
                  <StyledText className="text-white text-[16px] font-poppins font-semibold mb-1 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </StyledText>
                  <StyledText className="text-white text-[24px] font-poppins font-bold">
                    {value}
                  </StyledText>
                </LinearGradient>
              ))
            ) : (
              <StyledView className="w-full bg-white p-4 rounded-lg shadow-md items-center justify-center">
                <StyledText className="text-[16px] text-gray-600 font-poppins font-medium">
                  No summary data available.
                </StyledText>
              </StyledView>
            )}
          </StyledView>
          {/* New Card for Incoming Block */}
          {cardData?.incomingBlock !== undefined && (
            <LinearGradient
              colors={['#FFC107', '#FFA000']} // Example colors, adjust as needed
              className="w-full p-4 rounded-lg mb-4 shadow-md"
            >
              <StyledText className="text-white text-[16px] font-poppins font-semibold mb-1 capitalize">
                Incoming Block
              </StyledText>
              <StyledText className="text-white text-[24px] font-poppins font-bold">
                {cardData.incomingBlock}
              </StyledText>
            </LinearGradient>
          )}

          {/* Table Display */}
          <StyledView className="bg-white rounded-lg shadow-md overflow-hidden">
            <StyledView className="flex-row bg-gray-200 py-3 border-b border-gray-300">
              <StyledText className="flex-1 text-center font-bold text-gray-700 text-[14px]">
                Employee
              </StyledText>
              <StyledText className="flex-1 text-center font-bold text-gray-700 text-[14px]">
                Total Calls
              </StyledText>
              <StyledText className="flex-1 text-center font-bold text-gray-700 text-[14px]">
                Connected Calls
              </StyledText>
              <StyledText className="flex-1 text-center font-bold text-gray-700 text-[14px]">
                Total Talk Time
              </StyledText>
              {/* New Header for Incoming Block */}
              <StyledText className="flex-1 text-center font-bold text-gray-700 text-[14px]">
                Incoming Block
              </StyledText>
            </StyledView>
            {tableData && tableData.length > 0 ? (
              <FlatList
                data={tableData}
                keyExtractor={(item, index) => item.userName + index}
                renderItem={({ item }) => (
                  <StyledView className="flex-row py-3 border-b border-gray-200">
                    <StyledText className="flex-1 text-center text-gray-700 text-[14px]">{item.userName}</StyledText>
                    <StyledText className="flex-1 text-center text-gray-700 text-[14px]">{item.totalCalls}</StyledText>
                    <StyledText className="flex-1 text-center text-gray-700 text-[14px]">{item.connectedCalls}</StyledText>
                    <StyledText className="flex-1 text-center text-gray-700 text-[14px]">{item.totalTalkTimeFormatted}</StyledText>
                    {/* New Data for Incoming Block */}
                    <StyledText className="flex-1 text-center text-gray-700 text-[14px]">{item.incomingBlockedCalls !== undefined ? item.incomingBlockedCalls : 'N/A'}</StyledText>
                  </StyledView>
                )}
                ListFooterComponent={() => (
                  <StyledView className="flex-row justify-center items-center py-4">
                    <TouchableOpacity
                      onPress={() => setPage(prev => Math.max(1, prev - 1))}
                      disabled={page === 1}
                      className="p-2 bg-gray-200 rounded-md mr-2"
                    >
                      <StyledText className="text-gray-700">Previous</StyledText>
                    </TouchableOpacity>
                    <StyledText className="text-gray-700 text-[14px]">
                      Page {page} of {totalPages}
                    </StyledText>
                    <TouchableOpacity
                      onPress={() => setPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={page === totalPages}
                      className="p-2 bg-gray-200 rounded-md ml-2"
                    >
                      <StyledText className="text-gray-700">Next</StyledText>
                    </TouchableOpacity>
                  </StyledView>
                )}
              />
            ) : (
              <StyledView className="p-5 items-center">
                <StyledText className="text-[16px] text-gray-600 font-poppins font-medium">
                  No table data available for the selected filters.
                </StyledText>
              </StyledView>
            )}
          </StyledView>
        </ScrollView>
      )}
    </StyledView>
  );
};

const styles = StyleSheet.create({
  tableContainer: {
    maxHeight: 400,
  },
  flatList: {
    maxHeight: 300,
  },
});

export default DialReport;