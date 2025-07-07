
// // // import React, { useState } from 'react';
// // // import { View, Text, TouchableOpacity } from 'react-native';
// // // import { styled } from 'nativewind';
// // // import Icon from 'react-native-vector-icons/MaterialIcons';
// // // import CallListButton from './performance/CallListButton';

// // // // Styled components using NativeWind
// // // const StyledView = styled(View);
// // // const StyledText = styled(Text);
// // // const StyledTouchableOpacity = styled(TouchableOpacity);

// // // const CallHistoryTable = ({
// // //   filteredCallsHistoryData = [],
// // //   callTimeData,
// // //   talkTimeData,
// // //   formatTime,
// // //   formatMinutes,
// // //   onViewCallList,
// // // }) => {
// // //   const [expandedRows, setExpandedRows] = useState({});

// // //   const toggleRow = (index) => {
// // //     //.log('🟢 CallHistoryTable: Toggling row:', index, 'Current expandedRows:', expandedRows);
// // //     setExpandedRows((prev) => ({
// // //       ...prev,
// // //       [index]: !prev[index],
// // //     }));
// // //   };

// // //   // Function to format ISO date string to "YYYY-MM-DD HH:mm"
// // //   const formatDateTime = (dateString) => {
// // //     if (!dateString || isNaN(new Date(dateString))) {
// // //       return 'N/A';
// // //     }
// // //     const date = new Date(dateString);
// // //     const year = date.getFullYear();
// // //     const month = String(date.getMonth() + 1).padStart(2, '0');
// // //     const day = String(date.getDate()).padStart(2, '0');
// // //     const hours = String(date.getHours()).padStart(2, '0');
// // //     const minutes = String(date.getMinutes()).padStart(2, '0');
// // //     return `${year}-${month}-${day} ${hours}:${minutes}`;
// // //   };

// // //   if (!filteredCallsHistoryData || filteredCallsHistoryData.length === 0) {
// // //     //.log('🟡 CallHistoryTable: No data in filteredCallsHistoryData');
// // //     return (
// // //       <StyledView className="mt-2.5 rounded-lg bg-white shadow-md p-2">
// // //         <StyledText className="text-center text-sm font-bold text-gray-900">
// // //           No call history data available
// // //         </StyledText>
// // //       </StyledView>
// // //     );
// // //   }

// // //   //.log('🔍 CallHistoryTable: Rendering with filteredCallsHistoryData:', filteredCallsHistoryData);

// // //   return (
// // //     <StyledView className="mt-2.5 rounded-lg bg-white shadow-md overflow-hidden mb-5">
// // //       <StyledView className="flex-row border-b border-gray-200 py-2.5 items-center">
// // //         <StyledText className="flex-1 text-center text-sm font-bold text-gray-900 px-1.5">
// // //           Username
// // //         </StyledText>
// // //         <StyledText className="flex-1 text-center text-sm font-bold text-gray-900 px-1.5">
// // //           Total Calls
// // //         </StyledText>
// // //         <StyledText className="flex-1 text-center text-sm font-bold text-gray-900 px-1.5">
// // //           Actions
// // //         </StyledText>
// // //       </StyledView>
// // //       {filteredCallsHistoryData.map((item, index) => {
// // //         // More precise matching: Normalize group and label for comparison
// // //         const normalizedGroup = (item.group || '').toLowerCase().replace(/\./g, '').trim();
// // //         const userIndex = callTimeData?.labels && Array.isArray(callTimeData.labels)
// // //           ? callTimeData.labels.findIndex((label) =>
// // //               (label || '').toLowerCase().replace(/\s+/g, '') === normalizedGroup
// // //             )
// // //           : -1;

// // //         const totalTalkTime = userIndex !== -1 &&
// // //           talkTimeData?.datasets &&
// // //           Array.isArray(talkTimeData.datasets) &&
// // //           talkTimeData.datasets[0]?.data &&
// // //           talkTimeData.datasets[0].data[userIndex] !== undefined
// // //           ? talkTimeData.datasets[0].data[userIndex]
// // //           : 0;

// // //         // Use raw firstCall and lastCall from item
// // //         const firstCall = item.firstCall;
// // //         const lastCall = item.lastCall;

// // //         return (
// // //           <StyledView key={index}>
// // //             {!expandedRows[index] ? (
// // //               // Main row (shown when not expanded)
// // //               <StyledView
// // //                 className={`flex-row border-b border-gray-200 py-2.5 items-center ${
// // //                   index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
// // //                 }`}
// // //               >
// // //                 <StyledText className="flex-1 text-center text-sm text-gray-900 px-1.5">
// // //                   {item.group || 'N/A'}
// // //                 </StyledText>
// // //                 <StyledText className="flex-1 text-center text-sm text-gray-900 px-1.5">
// // //                   {item.values?.[0] ?? '0'}
// // //                 </StyledText>
// // //                 <StyledTouchableOpacity
// // //                   onPress={() => toggleRow(index)}
// // //                   className="flex-1 items-center"
// // //                   accessible={true}
// // //                   accessibilityLabel="Expand row"
// // //                 >
// // //                   <Icon name="add" size={20} color="#4682B4" />
// // //                 </StyledTouchableOpacity>
// // //               </StyledView>
// // //             ) : (
// // //               // Expanded row (shown when expanded)
// // //               <StyledView className="p-2.5 bg-gray-100 border-b border-gray-200">
// // //                 <StyledView className="flex-row justify-between py-1.5 px-2.5">
// // //                   <StyledText className="text-sm font-bold text-gray-600">Username:</StyledText>
// // //                   <StyledText className="text-sm text-gray-900">{item.group || 'N/A'}</StyledText>
// // //                 </StyledView>
// // //                 <StyledView className="flex-row justify-between py-1.5 px-2.5">
// // //                   <StyledText className="text-sm font-bold text-gray-600">Total Calls:</StyledText>
// // //                   <StyledText className="text-sm text-gray-900">{item.values?.[0] ?? '0'}</StyledText>
// // //                 </StyledView>
// // //                 <StyledView className="flex-row justify-between py-1.5 px-2.5">
// // //                   <StyledText className="text-sm font-bold text-gray-600">Connected Calls:</StyledText>
// // //                   <StyledText className="text-sm text-gray-900">{item.values?.[1] ?? '0'}</StyledText>
// // //                 </StyledView>
// // //                 <StyledView className="flex-row justify-between py-1.5 px-2.5">
// // //                   <StyledText className="text-sm font-bold text-gray-600">Not Connected Calls:</StyledText>
// // //                   <StyledText className="text-sm text-gray-900">{item.values?.[2] ?? '0'}</StyledText>
// // //                 </StyledView>
// // //                 <StyledView className="flex-row justify-between py-1.5 px-2.5">
// // //                   <StyledText className="text-sm font-bold text-gray-600">Total Talk Time:</StyledText>
// // //                   <StyledText className="text-sm text-gray-900">{formatMinutes(totalTalkTime)}</StyledText>
// // //                 </StyledView>
// // //                 <StyledView className="flex-row justify-between py-1.5 px-2.5">
// // //                   <StyledText className="text-sm font-bold text-gray-600">First Call:</StyledText>
// // //                   <StyledText className="text-sm text-gray-900">{formatDateTime(firstCall)}</StyledText>
// // //                 </StyledView>
// // //                 <StyledView className="flex-row justify-between py-1.5 px-2.5">
// // //                   <StyledText className="text-sm font-bold text-gray-600">Last Call:</StyledText>
// // //                   <StyledText className="text-sm text-gray-900">{formatDateTime(lastCall)}</StyledText>
// // //                 </StyledView>
// // //                 <StyledView className="flex-row justify-between py-1.5 px-2.5">
// // //                   <StyledText className="text-sm font-bold text-gray-600">Action:</StyledText>
// // //                   <StyledView className="flex-row items-center">
// // //                     <StyledTouchableOpacity
// // //                       onPress={() => toggleRow(index)}
// // //                       className="mr-2.5"
// // //                       accessible={true}
// // //                       accessibilityLabel="Collapse row"
// // //                     >
// // //                       <Icon name="remove" size={20} color="#4682B4" />
// // //                     </StyledTouchableOpacity>
// // //                     <CallListButton
// // //                       onPress={(employeeId) => {
// // //                         //.log('🟣 CallHistoryTable: CallListButton clicked, employeeId:', employeeId);
// // //                         onViewCallList(employeeId);
// // //                       }}
// // //                       employeeId={item.employeeId}
// // //                       accessible={true}
// // //                       accessibilityLabel="View call list"
// // //                     />
// // //                   </StyledView>
// // //                 </StyledView>
// // //               </StyledView>
// // //             )}
// // //           </StyledView>
// // //         );
// // //       })}
// // //     </StyledView>
// // //   );
// // // };

// // // export default CallHistoryTable;

// // import React, { useState } from 'react';
// // import { View, Text, TouchableOpacity } from 'react-native';
// // import { styled } from 'nativewind';
// // import Icon from 'react-native-vector-icons/MaterialIcons';
// // import CallListButton from './performance/CallListButton';

// // // Styled components using NativeWind
// // const StyledView = styled(View);
// // const StyledText = styled(Text);
// // const StyledTouchableOpacity = styled(TouchableOpacity);

// // const CallHistoryTable = ({
// //   filteredCallsHistoryData = [],
// //   callTimeData,
// //   talkTimeData,
// //   formatTime,
// //   formatMinutes,
// //   onViewCallList,
// //   totalRecords,
// // }) => {
// //   const [expandedRows, setExpandedRows] = useState({});

// //   const toggleRow = (index) => {
// //     console.log('🟢 CallHistoryTable: Toggling row:', index, 'Current expandedRows:', expandedRows);
// //     setExpandedRows((prev) => ({
// //       ...prev,
// //       [index]: !prev[index],
// //     }));
// //   };

// //   // Function to format ISO date string to "YYYY-MM-DD HH:mm"
// //   const formatDateTime = (dateString) => {
// //     if (!dateString || isNaN(new Date(dateString))) {
// //       return 'N/A';
// //     }
// //     const date = new Date(dateString);
// //     const year = date.getFullYear();
// //     const month = String(date.getMonth() + 1).padStart(2, '0');
// //     const day = String(date.getDate()).padStart(2, '0');
// //     const hours = String(date.getHours()).padStart(2, '0');
// //     const minutes = String(date.getMinutes()).padStart(2, '0');
// //     return `${year}-${month}-${day} ${hours}:${minutes}`;
// //   };

// //   if (!filteredCallsHistoryData || filteredCallsHistoryData.length === 0) {
// //     console.log('🟡 CallHistoryTable: No data in filteredCallsHistoryData');
// //     return (
// //       <StyledView className="mt-2.5 rounded-lg bg-white shadow-md p-2">
// //         <StyledText className="text-center text-sm font-bold text-gray-900">
// //           No call history data available
// //         </StyledText>
// //       </StyledView>
// //     );
// //   }

// //   console.log('🔍 CallHistoryTable: Rendering with filteredCallsHistoryData:', filteredCallsHistoryData);

// //   return (
// //     <StyledView className="mt-2.5 rounded-lg bg-white shadow-md overflow-hidden mb-5">
// //       <StyledView className="flex-row border-b border-gray-200 py-2.5 items-center">
// //         <StyledText className="flex-1 text-center text-sm font-bold text-gray-900 px-1.5">
// //           Username
// //         </StyledText>
// //         <StyledText className="flex-1 text-center text-sm font-bold text-gray-900 px-1.5">
// //           TotalCall
// //         </StyledText>
// //         <StyledText className="flex-1 text-center text-sm font-bold text-gray-900 px-1.5">
// //           Actions
// //         </StyledText>
// //       </StyledView>
// //       {filteredCallsHistoryData.map((item, index) => {
// //         // More precise matching: Normalize group and label for comparison
// //         const normalizedGroup = (item.group || '').toLowerCase().replace(/\./g, '').trim();
// //         const userIndex = callTimeData?.labels && Array.isArray(callTimeData.labels)
// //           ? callTimeData.labels.findIndex((label) =>
// //               (label || '').toLowerCase().replace(/\s+/g, '') === normalizedGroup
// //             )
// //           : -1;

// //         const totalTalkTime = userIndex !== -1 &&
// //           talkTimeData?.datasets && Array.isArray(talkTimeData.datasets) &&
// //           talkTimeData.datasets[0]?.data && talkTimeData.datasets[0].data[userIndex] !== undefined
// //           ? talkTimeData.datasets[0].data[userIndex]
// //           : 0;

// //         // Use raw firstCall and lastCall from item
// //         const firstCall = item.firstCall;
// //         const lastCall = item.lastCall;

// //         return (
// //           <StyledView key={index}>
// //             {!expandedRows[index] ? (
// //               // Main row (shown when not expanded)
// //               <StyledView
// //                 className={`flex-row border-b border-gray-200 py-2.5 items-center ${
// //                   index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
// //                 }`}
// //               >
// //                 <StyledText className="flex-1 text-center text-sm text-gray-900 px-1.5">
// //                   {item.group || 'N/A'}
// //                 </StyledText>
// //                 <StyledText className="flex-1 text-center text-sm text-gray-900 px-1.5">
// //                   {totalRecords || '0'}
// //                 </StyledText>
// //                 <StyledTouchableOpacity
// //                   onPress={() => toggleRow(index)}
// //                   className="flex-1 items-center"
// //                   accessible={true}
// //                   accessibilityLabel="Expand row"
// //                 >
// //                   <Icon name="add" size={20} color="#4682B4" />
// //                 </StyledTouchableOpacity>
// //               </StyledView>
// //             ) : (
// //               // Expanded row (shown when expanded)
// //               <StyledView className="p-2.5 bg-gray-100 border-b border-gray-200">
// //                 <StyledView className="flex-row justify-between py-1.5 px-2.5">
// //                   <StyledText className="text-sm font-bold text-gray-600">Username:</StyledText>
// //                   <StyledText className="text-sm text-gray-900">{item.group || 'N/A'}</StyledText>
// //                 </StyledView>
// //                 <StyledView className="flex-row justify-between py-1.5 px-2.5">
// //                   <StyledText className="text-sm font-bold text-gray-600">TotalCall:</StyledText>
// //                   <StyledText className="text-sm text-gray-900">{totalRecords || '0'}</StyledText>
// //                 </StyledView>
// //                 <StyledView className="flex-row justify-between py-1.5 px-2.5">
// //                   <StyledText className="text-sm font-bold text-gray-600">Connected Calls:</StyledText>
// //                   <StyledText className="text-sm text-gray-900">{item.values?.[1] ?? '0'}</StyledText>
// //                 </StyledView>
// //                 <StyledView className="flex-row justify-between py-1.5 px-2.5">
// //                   <StyledText className="text-sm font-bold text-gray-600">Not Connected Calls:</StyledText>
// //                   <StyledText className="text-sm text-gray-900">{item.values?.[2] ?? '0'}</StyledText>
// //                 </StyledView>
// //                 <StyledView className="flex-row justify-between py-1.5 px-2.5">
// //                   <StyledText className="text-sm font-bold text-gray-600">Total Talk Time:</StyledText>
// //                   <StyledText className="text-sm text-gray-900">{formatMinutes(totalTalkTime)}</StyledText>
// //                 </StyledView>
// //                 <StyledView className="flex-row justify-between py-1.5 px-2.5">
// //                   <StyledText className="text-sm font-bold text-gray-600">First Call:</StyledText>
// //                   <StyledText className="text-sm text-gray-900">{formatDateTime(firstCall)}</StyledText>
// //                 </StyledView>
// //                 <StyledView className="flex-row justify-between py-1.5 px-2.5">
// //                   <StyledText className="text-sm font-bold text-gray-600">Last Call:</StyledText>
// //                   <StyledText className="text-sm text-gray-900">{formatDateTime(lastCall)}</StyledText>
// //                 </StyledView>
// //                 <StyledView className="flex-row justify-between py-1.5 px-2.5">
// //                   <StyledText className="text-sm font-bold text-gray-600">Action:</StyledText>
// //                   <StyledView className="flex-row items-center">
// //                     <StyledTouchableOpacity
// //                       onPress={() => toggleRow(index)}
// //                       className="mr-2.5"
// //                       accessible={true}
// //                       accessibilityLabel="Collapse row"
// //                     >
// //                       <Icon name="remove" size={20} color="#4682B4" />
// //                     </StyledTouchableOpacity>
// //                     <CallListButton
// //                       onPress={(employeeId) => {
// //                         console.log('🟣 CallHistoryTable: CallListButton clicked, employeeId:', employeeId);
// //                         onViewCallList(employeeId);
// //                       }}
// //                       employeeId={item.employeeId}
// //                       accessible={true}
// //                       accessibilityLabel="View call list"
// //                     />
// //                   </StyledView>
// //                 </StyledView>
// //               </StyledView>
// //             )}
// //           </StyledView>
// //         );
// //       })}
// //     </StyledView>
// //   );
// // };

// // export default CallHistoryTable;

// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import { styled } from 'nativewind';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import CallListButton from './performance/CallListButton';

// // Styled components using NativeWind
// const StyledView = styled(View);
// const StyledText = styled(Text);
// const StyledTouchableOpacity = styled(TouchableOpacity);

// const CallHistoryTable = ({
//   filteredCallsHistoryData = [],
//   callTimeData,
//   talkTimeData,
//   formatTime,
//   formatMinutes,
//   onViewCallList,
//   totalRecords,
// }) => {
//   const [expandedRows, setExpandedRows] = useState({});

//   const toggleRow = (index) => {
//     console.log('🟢 CallHistoryTable: Toggling row:', index, 'Current expandedRows:', expandedRows);
//     setExpandedRows((prev) => ({
//       ...prev,
//       [index]: !prev[index],
//     }));
//   };

//   // Function to format ISO date string to "YYYY-MM-DD HH:mm"
//   const formatDateTime = (dateString) => {
//     if (!dateString || isNaN(new Date(dateString))) {
//       return 'N/A';
//     }
//     const date = new Date(dateString);
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     const hours = String(date.getHours()).padStart(2, '0');
//     const minutes = String(date.getMinutes()).padStart(2, '0');
//     return `${year}-${month}-${day} ${hours}:${minutes}`;
//   };

//   if (!filteredCallsHistoryData || filteredCallsHistoryData.length === 0) {
//     console.log('🟡 CallHistoryTable: No data in filteredCallsHistoryData');
//     return (
//       <StyledView className="mt-2.5 rounded-lg bg-white shadow-md p-2">
//         <StyledText className="text-center text-sm font-bold text-gray-900">
//           No call history data available
//         </StyledText>
//       </StyledView>
//     );
//   }

//   console.log('🔍 CallHistoryTable: Rendering with filteredCallsHistoryData:', filteredCallsHistoryData);

//   return (
//     <StyledView className="mt-2.5 rounded-lg bg-white shadow-md overflow-hidden mb-5">
//       <StyledView className="flex-row border-b border-gray-200 py-2.5 items-center">
//         <StyledText className="flex-1 text-center text-sm font-bold text-gray-900 px-1.5">
//           Username
//         </StyledText>
//         <StyledText className="flex-1 text-center text-sm font-bold text-gray-900 px-1.5">
//           TotalCall
//         </StyledText>
//         <StyledText className="flex-1 text-center text-sm font-bold text-gray-900 px-1.5">
//           Actions
//         </StyledText>
//       </StyledView>
//       {filteredCallsHistoryData.map((item, index) => {
//         // More precise matching: Normalize group and label for comparison
//         const normalizedGroup = (item.group || '').toLowerCase().replace(/\./g, '').trim();
//         const userIndex = callTimeData?.labels && Array.isArray(callTimeData.labels)
//           ? callTimeData.labels.findIndex((label) =>
//               (label || '').toLowerCase().replace(/\s+/g, '') === normalizedGroup
//             )
//           : -1;

//         const totalTalkTime = userIndex !== -1 &&
//           talkTimeData?.datasets && Array.isArray(talkTimeData.datasets) &&
//           talkTimeData.datasets[0]?.data && talkTimeData.datasets[0].data[userIndex] !== undefined
//           ? talkTimeData.datasets[0].data[userIndex]
//           : 0;

//         // Use raw firstCall and lastCall from item
//         const firstCall = item.firstCall;
//         const lastCall = item.lastCall;

//         return (
//           <StyledView key={index}>
//             {!expandedRows[index] ? (
//               // Main row (shown when not expanded)
//               <StyledView
//                 className={`flex-row border-b border-gray-200 py-2.5 items-center ${
//                   index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
//                 }`}
//               >
//                 <StyledText className="flex-1 text-center text-sm text-gray-900 px-1.5">
//                   {item.group || 'N/A'}
//                 </StyledText>
//                 <StyledText className="flex-1 text-center text-sm text-gray-900 px-1.5">
//                   {totalRecords || '0'}
//                 </StyledText>
//                 <StyledTouchableOpacity
//                   onPress={() => toggleRow(index)}
//                   className="flex-1 items-center"
//                   accessible={true}
//                   accessibilityLabel="Expand row"
//                 >
//                   <Icon name="add" size={20} color="#4682B4" />
//                 </StyledTouchableOpacity>
//               </StyledView>
//             ) : (
//               // Expanded row (shown when expanded)
//               <StyledView className="p-2.5 bg-gray-100 border-b border-gray-200">
//                 <StyledView className="flex-row justify-between py-1.5 px-2.5">
//                   <StyledText className="text-sm font-bold text-gray-600">Username:</StyledText>
//                   <StyledText className="text-sm text-gray-900">{item.group || 'N/A'}</StyledText>
//                 </StyledView>
//                 <StyledView className="flex-row justify-between py-1.5 px-2.5">
//                   <StyledText className="text-sm font-bold text-gray-600">TotalCall:</StyledText>
//                   <StyledText className="text-sm text-gray-900">{totalRecords || '0'}</StyledText>
//                 </StyledView>
//                 <StyledView className="flex-row justify-between py-1.5 px-2.5">
//                   <StyledText className="text-sm font-bold text-gray-600">Connected Calls:</StyledText>
//                   <StyledText className="text-sm text-gray-900">{item.values?.[1] ?? '0'}</StyledText>
//                 </StyledView>
//                 <StyledView className="flex-row justify-between py-1.5 px-2.5">
//                   <StyledText className="text-sm font-bold text-gray-600">Not Connected Calls:</StyledText>
//                   <StyledText className="text-sm text-gray-900">{item.values?.[2] ?? '0'}</StyledText>
//                 </StyledView>
//                 <StyledView className="flex-row justify-between py-1.5 px-2.5">
//                   <StyledText className="text-sm font-bold text-gray-600">Total Talk Time:</StyledText>
//                   <StyledText className="text-sm text-gray-900">{formatMinutes(totalTalkTime)}</StyledText>
//                 </StyledView>
//                 <StyledView className="flex-row justify-between py-1.5 px-2.5">
//                   <StyledText className="text-sm font-bold text-gray-600">First Call:</StyledText>
//                   <StyledText className="text-sm text-gray-900">{formatDateTime(firstCall)}</StyledText>
//                 </StyledView>
//                 <StyledView className="flex-row justify-between py-1.5 px-2.5">
//                   <StyledText className="text-sm font-bold text-gray-600">Last Call:</StyledText>
//                   <StyledText className="text-sm text-gray-900">{formatDateTime(lastCall)}</StyledText>
//                 </StyledView>
//                 <StyledView className="flex-row justify-between py-1.5 px-2.5">
//                   <StyledText className="text-sm font-bold text-gray-600">Action:</StyledText>
//                   <StyledView className="flex-row items-center">
//                     <StyledTouchableOpacity
//                       onPress={() => toggleRow(index)}
//                       className="mr-2.5"
//                       accessible={true}
//                       accessibilityLabel="Collapse row"
//                     >
//                       <Icon name="remove" size={20} color="#4682B4" />
//                     </StyledTouchableOpacity>
//                     <CallListButton
//                       onPress={(employeeId) => {
//                         console.log('🟣 CallHistoryTable: CallListButton clicked, employeeId:', employeeId);
//                         onViewCallList(employeeId);
//                       }}
//                       employeeId={item.employeeId}
//                       accessible={true}
//                       accessibilityLabel="View call list"
//                     />
//                   </StyledView>
//                 </StyledView>
//               </StyledView>
//             )}
//           </StyledView>
//         );
//       })}
//     </StyledView>
//   );
// };

// export default CallHistoryTable;

import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CallListButton from './performance/CallListButton';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const CallHistoryTable = ({
  filteredCallsHistoryData = [],
  callTimeData,
  talkTimeData,
  formatTime,
  formatMinutes,
  onViewCallList,
  totalRecords,
}) => {
  const [expandedRows, setExpandedRows] = useState({});

  const toggleRow = (index) => {
    console.log('🟢 CallHistoryTable: Toggling row:', index, 'Current expandedRows:', expandedRows);
    setExpandedRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const formatDateTime = (dateString) => {
    if (!dateString || isNaN(new Date(dateString))) {
      return 'N/A';
    }
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  if (!filteredCallsHistoryData || filteredCallsHistoryData.length === 0) {
    console.log('🟡 CallHistoryTable: No data in filteredCallsHistoryData');
    return (
      <StyledView className="mt-2.5 rounded-lg bg-white shadow-md p-2">
        <StyledText className="text-center text-sm font-bold text-gray-900">
          No call history data available
        </StyledText>
      </StyledView>
    );
  }

  console.log('🔍 CallHistoryTable: Rendering with filteredCallsHistoryData:', filteredCallsHistoryData);

  return (
    <StyledView className="mt-2.5 rounded-lg bg-white shadow-md overflow-hidden mb-5">
      <StyledView className="flex-row border-b border-gray-200 py-2.5 items-center">
        <StyledText className="flex-1 text-center text-sm font-bold text-gray-900 px-1.5">
          Username
        </StyledText>
        <StyledText className="flex-1 text-center text-sm font-bold text-gray-900 px-1.5">
          TotalCall
        </StyledText>
        <StyledText className="flex-1 text-center text-sm font-bold text-gray-900 px-1.5">
          Actions
        </StyledText>
      </StyledView>
      {filteredCallsHistoryData.map((item, index) => {
        const normalizedGroup = (item.group || '').toLowerCase().replace(/\./g, '').trim();
        const userIndex = callTimeData?.labels && Array.isArray(callTimeData.labels)
          ? callTimeData.labels.findIndex((label) =>
              (label || '').toLowerCase().replace(/\s+/g, '') === normalizedGroup
            )
          : -1;

        const totalTalkTime = userIndex !== -1 &&
          talkTimeData?.datasets && Array.isArray(talkTimeData.datasets) &&
          talkTimeData.datasets[0]?.data && talkTimeData.datasets[0].data[userIndex] !== undefined
          ? talkTimeData.datasets[0].data[userIndex]
          : 0;

        const firstCall = item.firstCall;
        const lastCall = item.lastCall;

        return (
          <StyledView key={index}>
            {!expandedRows[index] ? (
              <StyledView
                className={`flex-row border-b border-gray-200 py-2.5 items-center ${
                  index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                }`}
              >
                <StyledText className="flex-1 text-center text-sm text-gray-900 px-1.5">
                  {item.group || 'N/A'}
                </StyledText>
                <StyledText className="flex-1 text-center text-sm text-gray-900 px-1.5">
                  {totalRecords || '0'}
                </StyledText>
                <StyledTouchableOpacity
                  onPress={() => toggleRow(index)}
                  className="flex-1 items-center"
                  accessible={true}
                  accessibilityLabel="Expand row"
                >
                  <Icon name="add" size={20} color="#4682B4" />
                </StyledTouchableOpacity>
              </StyledView>
            ) : (
              <StyledView className="p-2.5 bg-gray-100 border-b border-gray-200">
                <StyledView className="flex-row justify-between py-1.5 px-2.5">
                  <StyledText className="text-sm font-bold text-gray-600">Username:</StyledText>
                  <StyledText className="text-sm text-gray-900">{item.group || 'N/A'}</StyledText>
                </StyledView>
                <StyledView className="flex-row justify-between py-1.5 px-2.5">
                  <StyledText className="text-sm font-bold text-gray-600">TotalCall:</StyledText>
                  <StyledText className="text-sm text-gray-900">{totalRecords || '0'}</StyledText>
                </StyledView>
                <StyledView className="flex-row justify-between py-1.5 px-2.5">
                  <StyledText className="text-sm font-bold text-gray-600">Connected Calls:</StyledText>
                  <StyledText className="text-sm text-gray-900">{item.values?.[1] ?? '0'}</StyledText>
                </StyledView>
                <StyledView className="flex-row justify-between py-1.5 px-2.5">
                  <StyledText className="text-sm font-bold text-gray-600">Not Connected Calls:</StyledText>
                  <StyledText className="text-sm text-gray-900">{item.values?.[2] ?? '0'}</StyledText>
                </StyledView>
                <StyledView className="flex-row justify-between py-1.5 px-2.5">
                  <StyledText className="text-sm font-bold text-gray-600">Total Talk Time:</StyledText>
                  <StyledText className="text-sm text-gray-900">{formatMinutes(totalTalkTime)}</StyledText>
                </StyledView>
                <StyledView className="flex-row justify-between py-1.5 px-2.5">
                  <StyledText className="text-sm font-bold text-gray-600">First Call:</StyledText>
                  <StyledText className="text-sm text-gray-900">{formatDateTime(firstCall)}</StyledText>
                </StyledView>
                <StyledView className="flex-row justify-between py-1.5 px-2.5">
                  <StyledText className="text-sm font-bold text-gray-600">Last Call:</StyledText>
                  <StyledText className="text-sm text-gray-900">{formatDateTime(lastCall)}</StyledText>
                </StyledView>
                <StyledView className="flex-row justify-between py-1.5 px-2.5">
                  <StyledText className="text-sm font-bold text-gray-600">Action:</StyledText>
                  <StyledView className="flex-row items-center">
                    <StyledTouchableOpacity
                      onPress={() => toggleRow(index)}
                      className="mr-2.5"
                      accessible={true}
                      accessibilityLabel="Collapse row"
                    >
                      <Icon name="remove" size={20} color="#4682B4" />
                    </StyledTouchableOpacity>
                    <CallListButton
                      onPress={(employeeId) => {
                        console.log('🟣 CallHistoryTable: CallListButton clicked, employeeId:', employeeId);
                        onViewCallList(employeeId);
                      }}
                      employeeId={item.employeeId}
                      accessible={true}
                      accessibilityLabel="View call list"
                    />
                  </StyledView>
                </StyledView>
              </StyledView>
            )}
          </StyledView>
        );
      })}
    </StyledView>
  );
};

export default CallHistoryTable;