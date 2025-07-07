// // import React, { useState, useEffect, useMemo } from 'react';
// // import {
// //   View,
// //   Text,
// //   ScrollView,
// //   StyleSheet,
// //   PermissionsAndroid,
// //   StatusBar,
// //   Dimensions,
// //   TouchableOpacity,
// // } from 'react-native';
// // import { useDispatch, useSelector } from 'react-redux';
// // import Modal from 'react-native-modal';
// // import { RFPercentage } from 'react-native-responsive-fontsize';
// // import CallLogs from 'react-native-call-log';
// // import CallHistoryTable from './CallHistoryTable';
// // import CallHistoryDetailTable from './CallHistoryDetailTable';
// // import { fetchCallHistory, resetCallHistory } from '../redux/slice/index';
// // import Header from '../component/Header'; // Import the Header component

// // const screenWidth = Dimensions.get('window').width;

// // const CallLog = () => {
// //   const dispatch = useDispatch();

// //   const callHistoryState = useSelector((state) => state.callHistory || {
// //     callHistory: [],
// //     currentPage: 1,
// //     totalPages: 1,
// //     totalRecords: 0,
// //     loading: false,
// //     error: null,
// //   });

// //   const { callHistory, currentPage, totalPages, totalRecords, loading, error } = callHistoryState;

// //   const [showCallHistoryModal, setShowCallHistoryModal] = useState(false);
// //   const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
// //   const [page, setPage] = useState(1);
// //   const limit = 10;

// //   // Normalize callHistory data to match expected structure
// //   const normalizedCallHistory = useMemo(() => {
// //     return callHistory.map((item) => ({
// //       phoneNumber: item.callNumber || 'Unknown',
// //       type: item.callType || 'Unknown',
// //       timestamp: item.callStart || item.callEnd || 0,
// //       name: item.name || item.leadName || 'Unknown',
// //       callDurationFormatted: item.callDurationFormatted || '00:00:00',
// //       employeeId: item.employeeId || 'N/A',
// //       leadId: item.leadId || null,
// //       recording: item.recording || null,
// //     }));
// //   }, [callHistory]);

// //   // Request permissions on component mount
// //   useEffect(() => {
// //     requestPermissions();
// //   }, []);

// //   // Fetch call history when page or selectedEmployeeId changes
// //   useEffect(() => {
// //     fetchLogs();
// //   }, [page, selectedEmployeeId]);

// //   // Request permissions
// //   const requestPermissions = async () => {
// //     try {
// //       const callLogPermission = await PermissionsAndroid.request(
// //         PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
// //       );
// //       if (callLogPermission === PermissionsAndroid.RESULTS.GRANTED) {
// //         fetchLogs();
// //       } else {
// //         console.warn('Call log permission denied');
// //       }
// //     } catch (err) {
// //       console.warn('Permission request error:', err);
// //     }
// //   };

// //   // Fetch call logs
// //   const fetchLogs = async () => {
// //     try {
// //       const logs = await CallLogs.loadAll();
// //       console.log('Raw device call logs:', logs);
// //       const params = {
// //         employeeId: selectedEmployeeId || '6847e21860047e14510bcdcb',
// //         page,
// //         limit,
// //         dateFilter: 'today',
// //       };
// //       dispatch(fetchCallHistory(params));
// //     } catch (err) {
// //       console.error('Error fetching call logs:', err);
// //     }
// //   };

// //   // Format date for display
// //   const formatDateTime = (timestamp) => {
// //     if (!timestamp || timestamp === 0 || isNaN(new Date(timestamp))) return 'N/A';
// //     const date = new Date(timestamp);
// //     const year = date.getFullYear();
// //     const month = String(date.getMonth() + 1).padStart(2, '0');
// //     const day = String(date.getDate()).padStart(2, '0');
// //     const hours = String(date.getHours()).padStart(2, '0');
// //     const minutes = String(date.getMinutes()).padStart(2, '0');
// //     return `${year}-${month}-${day} ${hours}:${minutes}`;
// //   };

// //   // Format duration in seconds to HH:mm:ss
// //   const formatDuration = (seconds) => {
// //     if (!seconds || isNaN(seconds)) return '00:00:00';
// //     const h = Math.floor(seconds / 3600);
// //     const m = Math.floor((seconds % 3600) / 60);
// //     const s = seconds % 60;
// //     return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
// //   };

// //   // Prepare data for CallHistoryTable
// //   const callsHistoryData = useMemo(() => {
// //     if (!normalizedCallHistory || normalizedCallHistory.length === 0) return [];

// //     return normalizedCallHistory.reduce((acc, item) => {
// //       if (!item.employeeId || !item.type) {
// //         console.warn('Invalid data in callsHistoryData:', item);
// //         return acc;
// //       }

// //       const group = item.name
// //         ? `${item.name.split(' ')[0]?.charAt(0).toUpperCase()}${item.name.split(' ')[0]?.slice(1) || ''} ${
// //             item.name.split(' ')[1]?.charAt(0).toUpperCase() || ''
// //           }.`
// //         : 'Unknown';
// //       const existingGroup = acc.find((g) => g.group === group);
// //       const values = [
// //         1,
// //         item.type.toLowerCase().includes('connected') ? 1 : 0,
// //         item.type.toLowerCase().includes('missed') ? 1 : 0,
// //       ];

// //       if (existingGroup) {
// //         existingGroup.values[0] += values[0];
// //         existingGroup.values[1] += values[1];
// //         existingGroup.values[2] += values[2];
// //         existingGroup.firstCall = existingGroup.firstCall
// //           ? existingGroup.firstCall < item.timestamp
// //             ? existingGroup.firstCall
// //             : item.timestamp
// //           : item.timestamp;
// //         existingGroup.lastCall = existingGroup.lastCall
// //           ? existingGroup.lastCall > item.timestamp
// //             ? existingGroup.lastCall
// //             : item.timestamp
// //           : item.timestamp;
// //       } else {
// //         acc.push({
// //           group,
// //           values,
// //           employeeId: item.employeeId || 'N/A',
// //           firstCall: item.timestamp,
// //           lastCall: item.timestamp,
// //         });
// //       }
// //       return acc;
// //     }, []);
// //   }, [normalizedCallHistory]);

// //   // Dummy data for CallHistoryTable charts
// //   const callTimeData = useMemo(
// //     () => ({
// //       labels: callsHistoryData.map((item) => item.group || 'No Data'),
// //       datasets: [
// //         {
// //           data: callsHistoryData.map((item) => {
// //             const date = item.firstCall && item.firstCall !== 0 && !isNaN(new Date(item.firstCall).getTime())
// //               ? new Date(item.firstCall)
// //               : new Date();
// //             return date.getHours() + date.getMinutes() / 60;
// //           }),
// //           color: () => '#4682B4',
// //           strokeWidth: 2,
// //           label: 'First Call',
// //         },
// //         {
// //           data: callsHistoryData.map((item) => {
// //             const date = item.lastCall && item.lastCall !== 0 && !isNaN(new Date(item.lastCall).getTime())
// //               ? new Date(item.lastCall)
// //               : new Date();
// //             return date.getHours() + date.getMinutes() / 60;
// //           }),
// //           color: () => '#FF6347',
// //           strokeWidth: 2,
// //           label: 'Last Call',
// //         },
// //       ],
// //       legend: ['First Call', 'Last Call'],
// //     }),
// //     [callsHistoryData]
// //   );

// //   const talkTimeData = useMemo(
// //     () => ({
// //       labels: callsHistoryData.map((item) => item.group || 'No Data'),
// //       datasets: [
// //         {
// //           data: normalizedCallHistory.map((item) => {
// //             const duration = item.callDurationFormatted
// //               ? item.callDurationFormatted.split(':').reduce((acc, val, index) => {
// //                   return acc + (index === 0 ? parseInt(val) * 60 : index === 1 ? parseInt(val) : parseInt(val) / 60);
// //                 }, 0)
// //               : 0;
// //             return duration;
// //           }),
// //           color: () => '#87CEEB',
// //           strokeWidth: 2,
// //           label: 'Total Talk Time (in minutes)',
// //         },
// //       ],
// //       legend: ['Total Talk Time (in minutes)'],
// //     }),
// //     [normalizedCallHistory]
// //   );

// //   const handleViewCallList = (employeeId) => {
// //     if (!employeeId || employeeId === 'N/A') {
// //       console.log('Invalid employeeId:', employeeId);
// //       return;
// //     }
// //     console.log('Opening modal for employeeId:', employeeId);
// //     setSelectedEmployeeId(employeeId);
// //     setPage(1);
// //     setShowCallHistoryModal(true);
// //   };

// //   const handleNextPage = () => {
// //     if (page < totalPages) {
// //       setPage(page + 1);
// //     }
// //   };

// //   const handlePreviousPage = () => {
// //     if (page > 1) {
// //       setPage(page - 1);
// //     }
// //   };

// //   return (
// //     <View style={styles.container}>
// //       {/* Add Header Component */}
// //       <Header
// //         title="Call Log"
// //         showMenuButton={false} // Enable menu button to open drawer
// //         showBackButton={true}
// //         showSearchButton={false}
// //         showNotificationButton={false}
// //         showSettingsButton={false}
// //         showCloseButton={false}
// //       />

// //       {loading && (
// //         <View style={styles.centeredContent}>
// //           <Text style={styles.statusText}>Loading call history...</Text>
// //         </View>
// //       )}

// //       {error && !loading && (
// //         <View style={styles.centeredContent}>
// //           <Text style={styles.statusText}>Error: {error}</Text>
// //         </View>
// //       )}

// //       {!loading && !error && (
// //         <View style={styles.mainContainer}>
// //           <ScrollView style={styles.scrollView}>
// //             <View style={styles.tableContainer}>
// //               <CallHistoryTable
// //                 filteredCallsHistoryData={callsHistoryData}
// //                 callTimeData={callTimeData}
// //                 talkTimeData={talkTimeData}
// //                 formatTime={formatDateTime}
// //                 formatMinutes={formatDuration}
// //                 onViewCallList={handleViewCallList}
// //               />
// //             </View>
// //           </ScrollView>

// //           {/* Pagination Controls */}
// //           <View style={styles.paginationContainer}>
// //             <TouchableOpacity
// //               onPress={handlePreviousPage}
// //               disabled={page === 1}
// //               style={[styles.paginationButton, page === 1 && styles.disabledButton]}
// //             >
// //               <Text style={styles.paginationText}>Previous</Text>
// //             </TouchableOpacity>
// //             <Text style={styles.paginationInfo}>
// //               Page {currentPage} of {totalPages} ({totalRecords} records)
// //             </Text>
// //             <TouchableOpacity
// //               onPress={handleNextPage}
// //               disabled={page === totalPages}
// //               style={[styles.paginationButton, page === totalPages && styles.disabledButton]}
// //             >
// //               <Text style={styles.paginationText}>Next</Text>
// //             </TouchableOpacity>
// //           </View>

// //           <Modal
// //             isVisible={showCallHistoryModal}
// //             onBackdropPress={() => {
// //               setShowCallHistoryModal(false);
// //               setSelectedEmployeeId(null);
// //               setPage(1);
// //               dispatch(resetCallHistory());
// //               StatusBar.setHidden(false);
// //             }}
// //             onModalShow={() => StatusBar.setHidden(true)}
// //             style={{ margin: 0 }}
// //             backdropColor="#000"
// //             backdropOpacity={0.5}
// //             avoidKeyboard={false}
// //           >
// //             <View style={styles.modalContainer}>
// //               <CallHistoryDetailTable
// //                 callHistory={normalizedCallHistory}
// //                 loading={loading}
// //                 error={error}
// //                 currentPage={currentPage}
// //                 totalPages={totalPages}
// //                 totalRecords={totalRecords}
// //                 onClose={() => {
// //                   setShowCallHistoryModal(false);
// //                   setSelectedEmployeeId(null);
// //                   setPage(1);
// //                   dispatch(resetCallHistory());
// //                   StatusBar.setHidden(false);
// //                 }}
// //                 onNextPage={handleNextPage}
// //                 onPreviousPage={handlePreviousPage}
// //               />
// //             </View>
// //           </Modal>
// //         </View>
// //       )}
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#f3f4f6',
// //   },
// //   mainContainer: {
// //     flex: 1,
// //     position: 'relative',
// //   },
// //   scrollView: {
// //     flex: 1,
// //     padding: 20,
// //     paddingBottom: 80, // Add padding to account for pagination
// //   },
// //   centeredContent: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     padding: 20,
// //   },
// //   statusText: {
// //     fontSize: RFPercentage(2.2),
// //     color: '#4b5563',
// //     fontWeight: '500',
// //     textAlign: 'center',
// //   },
// //   tableContainer: {
// //     backgroundColor: '#fff',
// //     borderRadius: 8,
// //     padding: 12,
// //     marginVertical: 20,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 4,
// //     elevation: 2,
// //   },
// //   modalContainer: {
// //     flex: 1,
// //     width: '100%',
// //     height: '100%',
// //     backgroundColor: '#fff',
// //   },
// //   paginationContainer: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     paddingHorizontal: 20,
// //     position: 'absolute',
// //     bottom: 0,
// //     left: 0,
// //     right: 0,
// //     backgroundColor: '#fff',
// //     paddingVertical: 12,
// //     borderTopWidth: 1,
// //     borderTopColor: '#e5e7eb',
// //     elevation: 4,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: -2 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 2,
// //   },
// //   paginationButton: {
// //     backgroundColor: '#4682B4',
// //     paddingVertical: 8,
// //     paddingHorizontal: 16,
// //     borderRadius: 5,
// //   },
// //   disabledButton: {
// //     backgroundColor: '#A9A9A9',
// //   },
// //   paginationText: {
// //     color: '#fff',
// //     fontSize: RFPercentage(2),
// //     fontWeight: '500',
// //   },
// //   paginationInfo: {
// //     fontSize: RFPercentage(2),
// //     color: '#4b5563',
// //     fontWeight: '500',
// //   },
// // });

// // export default CallLog;


// import React, { useState, useEffect, useMemo } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   StyleSheet,
//   PermissionsAndroid,
//   StatusBar,
//   Dimensions,
//   TouchableOpacity,
// } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import Modal from 'react-native-modal';
// import { RFPercentage } from 'react-native-responsive-fontsize';
// import CallLogs from 'react-native-call-log';
// import CallHistoryTable from './CallHistoryTable';
// import CallHistoryDetailTable from './CallHistoryDetailTable';
// import { fetchCallHistory, resetCallHistory } from '../redux/slice/index';
// import Header from '../component/Header';

// const screenWidth = Dimensions.get('window').width;

// const CallLog = () => {
//   const dispatch = useDispatch();

//   const callHistoryState = useSelector((state) => state.callHistory || {
//     callHistory: [],
//     currentPage: 1,
//     totalPages: 1,
//     totalRecords: 0,
//     loading: false,
//     error: null,
//   });

//   const { callHistory, currentPage, totalPages, totalRecords, loading, error } = callHistoryState;

//   const [showCallHistoryModal, setShowCallHistoryModal] = useState(false);
//   const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

//   // Normalize callHistory data to match expected structure
//   const normalizedCallHistory = useMemo(() => {
//     return callHistory.map((item) => ({
//       phoneNumber: item.callNumber || 'Unknown',
//       type: item.callType || 'Unknown',
//       timestamp: item.callStart || item.callEnd || 0,
//       name: item.name || item.leadName || 'Unknown',
//       callDurationFormatted: item.callDurationFormatted || '00:00:00',
//       employeeId: item.employeeId || 'N/A',
//       leadId: item.leadId || null,
//       recording: item.recording || null,
//     }));
//   }, [callHistory]);

//   // Request permissions on component mount
//   useEffect(() => {
//     requestPermissions();
//   }, []);

//   // Fetch call history when selectedEmployeeId or currentPage changes
//   useEffect(() => {
//     fetchLogs();
//   }, [selectedEmployeeId, currentPage]);

//   // Request permissions
//   const requestPermissions = async () => {
//     try {
//       const callLogPermission = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
//       );
//       if (callLogPermission === PermissionsAndroid.RESULTS.GRANTED) {
//         fetchLogs();
//       } else {
//         console.warn('Call log permission denied');
//       }
//     } catch (err) {
//       console.warn('Permission request error:', err);
//     }
//   };

//   // Fetch call logs
//   const fetchLogs = async () => {
//     try {
//       const logs = await CallLogs.loadAll();
//       console.log('Raw device call logs:', logs);
//       const params = {
//         employeeId: selectedEmployeeId || '6847e21860047e14510bcdcb',
//         dateFilter: 'today',
//         page: currentPage,
//       };
//       dispatch(fetchCallHistory(params));
//     } catch (err) {
//       console.error('Error fetching call logs:', err);
//     }
//   };

//   // Format date for display
//   const formatDateTime = (timestamp) => {
//     if (!timestamp || timestamp === 0 || isNaN(new Date(timestamp))) return 'N/A';
//     const date = new Date(timestamp);
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     const hours = String(date.getHours()).padStart(2, '0');
//     const minutes = String(date.getMinutes()).padStart(2, '0');
//     return `${year}-${month}-${day} ${hours}:${minutes}`;
//   };

//   // Format duration in seconds to HH:mm:ss
//   const formatDuration = (seconds) => {
//     if (!seconds || isNaN(seconds)) return '00:00:00';
//     const h = Math.floor(seconds / 3600);
//     const m = Math.floor((seconds % 3600) / 60);
//     const s = seconds % 60;
//     return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
//   };

//   // Prepare data for CallHistoryTable
//   const callsHistoryData = useMemo(() => {
//     if (!normalizedCallHistory || normalizedCallHistory.length === 0) return [];

//     return normalizedCallHistory.reduce((acc, item) => {
//       if (!item.employeeId || !item.type) {
//         console.warn('Invalid data in callsHistoryData:', item);
//         return acc;
//       }

//       const group = item.name
//         ? `${item.name.split(' ')[0]?.charAt(0).toUpperCase()}${item.name.split(' ')[0]?.slice(1) || ''} ${
//             item.name.split(' ')[1]?.charAt(0).toUpperCase() || ''
//           }.`
//         : 'Unknown';
//       const existingGroup = acc.find((g) => g.group === group);
//       const values = [
//         totalRecords, // Use totalRecords from Redux state
//         item.type.toLowerCase().includes('connected') ? 1 : 0,
//         item.type.toLowerCase().includes('missed') ? 1 : 0,
//       ];

//       if (existingGroup) {
//         existingGroup.values[0] = totalRecords; // Update to totalRecords
//         existingGroup.values[1] += values[1];
//         existingGroup.values[2] += values[2];
//         existingGroup.firstCall = existingGroup.firstCall
//           ? existingGroup.firstCall < item.timestamp
//             ? existingGroup.firstCall
//             : item.timestamp
//           : item.timestamp;
//         existingGroup.lastCall = existingGroup.lastCall
//           ? existingGroup.lastCall > item.timestamp
//             ? existingGroup.lastCall
//             : item.timestamp
//           : item.timestamp;
//       } else {
//         acc.push({
//           group,
//           values,
//           employeeId: item.employeeId || 'N/A',
//           firstCall: item.timestamp,
//           lastCall: item.timestamp,
//         });
//       }
//       return acc;
//     }, []);
//   }, [normalizedCallHistory, totalRecords]);

//   // Dummy data for CallHistoryTable charts
//   const callTimeData = useMemo(
//     () => ({
//       labels: callsHistoryData.map((item) => item.group || 'No Data'),
//       datasets: [
//         {
//           data: callsHistoryData.map((item) => {
//             const date = item.firstCall && item.firstCall !== 0 && !isNaN(new Date(item.firstCall).getTime())
//               ? new Date(item.firstCall)
//               : new Date();
//             return date.getHours() + date.getMinutes() / 60;
//           }),
//           color: () => '#4682B4',
//           strokeWidth: 2,
//           label: 'First Call',
//         },
//         {
//           data: callsHistoryData.map((item) => {
//             const date = item.lastCall && item.lastCall !== 0 && !isNaN(new Date(item.lastCall).getTime())
//               ? new Date(item.lastCall)
//               : new Date();
//             return date.getHours() + date.getMinutes() / 60;
//           }),
//           color: () => '#FF6347',
//           strokeWidth: 2,
//           label: 'Last Call',
//         },
//       ],
//       legend: ['First Call', 'Last Call'],
//     }),
//     [callsHistoryData]
//   );

//   const talkTimeData = useMemo(
//     () => ({
//       labels: callsHistoryData.map((item) => item.group || 'No Data'),
//       datasets: [
//         {
//           data: normalizedCallHistory.map((item) => {
//             const duration = item.callDurationFormatted
//               ? item.callDurationFormatted.split(':').reduce((acc, val, index) => {
//                   return acc + (index === 0 ? parseInt(val) * 60 : index === 1 ? parseInt(val) : parseInt(val) / 60);
//                 }, 0)
//               : 0;
//             return duration;
//           }),
//           color: () => '#87CEEB',
//           strokeWidth: 2,
//           label: 'Total Talk Time (in minutes)',
//         },
//       ],
//       legend: ['Total Talk Time (in minutes)'],
//     }),
//     [normalizedCallHistory]
//   );

//   const handleViewCallList = (employeeId) => {
//     if (!employeeId || employeeId === 'N/A') {
//       console.log('Invalid employeeId:', employeeId);
//       return;
//     }
//     console.log('Opening modal for employeeId:', employeeId);
//     setSelectedEmployeeId(employeeId);
//     setShowCallHistoryModal(true);
//   };

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       dispatch(fetchCallHistory({
//         employeeId: selectedEmployeeId || '6847e21860047e14510bcdcb',
//         dateFilter: 'today',
//         page: currentPage + 1,
//       }));
//     }
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       dispatch(fetchCallHistory({
//         employeeId: selectedEmployeeId || '6847e21860047e14510bcdcb',
//         dateFilter: 'today',
//         page: currentPage - 1,
//       }));
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Header
//         title="Call Log"
//         showMenuButton={false}
//         showBackButton={true}
//         showSearchButton={false}
//         showNotificationButton={false}
//         showSettingsButton={false}
//         showCloseButton={false}
//       />

//       {loading && (
//         <View style={styles.centeredContent}>
//           <Text style={styles.statusText}>Loading call history...</Text>
//         </View>
//       )}

//       {error && !loading && (
//         <View style={styles.centeredContent}>
//           <Text style={styles.statusText}>Error: {error}</Text>
//         </View>
//       )}

//       {!loading && !error && (
//         <View style={styles.mainContainer}>
//           <ScrollView style={styles.scrollView}>
//             <View style={styles.tableContainer}>
//               <CallHistoryTable
//                 filteredCallsHistoryData={callsHistoryData}
//                 callTimeData={callTimeData}
//                 talkTimeData={talkTimeData}
//                 formatTime={formatDateTime}
//                 formatMinutes={formatDuration}
//                 onViewCallList={handleViewCallList}
//                 totalRecords={totalRecords}
//               />
//             </View>
//           </ScrollView>

//           <Modal
//             isVisible={showCallHistoryModal}
//             onBackdropPress={() => {
//               setShowCallHistoryModal(false);
//               setSelectedEmployeeId(null);
//               dispatch(resetCallHistory());
//               StatusBar.setHidden(false);
//             }}
//             onModalShow={() => StatusBar.setHidden(true)}
//             style={{ margin: 0 }}
//             backdropColor="#000"
//             backdropOpacity={0.5}
//             avoidKeyboard={false}
//           >
//             <View style={styles.modalContainer}>
//               <CallHistoryDetailTable
//                 callHistory={normalizedCallHistory}
//                 loading={loading}
//                 error={error}
//                 currentPage={currentPage}
//                 totalPages={totalPages}
//                 totalRecords={totalRecords}
//                 onClose={() => {
//                   setShowCallHistoryModal(false);
//                   setSelectedEmployeeId(null);
//                   dispatch(resetCallHistory());
//                   StatusBar.setHidden(false);
//                 }}
//                 onNextPage={handleNextPage}
//                 onPreviousPage={handlePreviousPage}
//               />
//             </View>
//           </Modal>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f3f4f6',
//   },
//   mainContainer: {
//     flex: 1,
//     position: 'relative',
//   },
//   scrollView: {
//     flex: 1,
//     padding: 20,
//   },
//   centeredContent: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   statusText: {
//     fontSize: RFPercentage(2.2),
//     color: '#4b5563',
//     fontWeight: '500',
//     textAlign: 'center',
//   },
//   tableContainer: {
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     padding: 12,
//     marginVertical: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   modalContainer: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//     backgroundColor: '#fff',
//   },
// });

// export default CallLog;

import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  PermissionsAndroid,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-native-modal';
import { RFPercentage } from 'react-native-responsive-fontsize';
import CallLogs from 'react-native-call-log';
import CallHistoryTable from './CallHistoryTable';
import CallHistoryDetailTable from './CallHistoryDetailTable';
import { fetchCallHistory, resetCallHistory } from '../redux/slice/index';
import Header from '../component/Header';

const screenWidth = Dimensions.get('window').width;

const CallLog = () => {
  const dispatch = useDispatch();

  const callHistoryState = useSelector((state) => state.callHistory || {
    callHistory: [],
    currentPage: 1,
    totalPages: 1,
    totalRecords: 0,
    loading: false,
    error: null,
  });

  const { callHistory, currentPage, totalPages, totalRecords, loading, error } = callHistoryState;

  const [showCallHistoryModal, setShowCallHistoryModal] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  // Normalize callHistory data to match expected structure
  const normalizedCallHistory = useMemo(() => {
    return callHistory.map((item) => ({
      phoneNumber: item.callNumber || 'Unknown',
      type: item.callType || 'Unknown',
      timestamp: item.callStart || item.callEnd || 0,
      name: item.name || item.leadName || 'Unknown',
      callDurationFormatted: item.callDurationFormatted || '00:00:00',
      employeeId: item.employeeId || 'N/A',
      leadId: item.leadId || null,
      recording: item.recording || null,
    }));
  }, [callHistory]);

  // Filter call history for the selected employee
  const filteredCallHistory = useMemo(() => {
    if (!selectedEmployeeId) return normalizedCallHistory;
    return normalizedCallHistory.filter((item) => item.employeeId === selectedEmployeeId);
  }, [normalizedCallHistory, selectedEmployeeId]);

  // Request permissions on component mount
  useEffect(() => {
    requestPermissions();
  }, []);

  // Fetch call history when selectedEmployeeId or currentPage changes
  useEffect(() => {
    if (selectedEmployeeId) {
      fetchLogs();
    }
  }, [selectedEmployeeId, currentPage]);

  // Request permissions
  const requestPermissions = async () => {
    try {
      const callLogPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
      );
      if (callLogPermission === PermissionsAndroid.RESULTS.GRANTED) {
        fetchLogs();
      } else {
        console.warn('Call log permission denied');
      }
    } catch (err) {
      console.warn('Permission request error:', err);
    }
  };

  // Fetch call logs
  const fetchLogs = async () => {
    try {
      const logs = await CallLogs.loadAll();
      console.log('Raw device call logs:', logs);
      const params = {
        employeeId: selectedEmployeeId || '6847e21860047e14510bcdcb',
        dateFilter: 'today',
        page: currentPage,
      };
      dispatch(fetchCallHistory(params));
    } catch (err) {
      console.error('Error fetching call logs:', err);
    }
  };

  // Format date for display
  const formatDateTime = (timestamp) => {
    if (!timestamp || timestamp === 0 || isNaN(new Date(timestamp))) return 'N/A';
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  // Format duration in seconds to HH:mm:ss
  const formatDuration = (seconds) => {
    if (!seconds || isNaN(seconds)) return '00:00:00';
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Prepare data for CallHistoryTable
  const callsHistoryData = useMemo(() => {
    if (!normalizedCallHistory || normalizedCallHistory.length === 0) return [];

    return normalizedCallHistory.reduce((acc, item) => {
      if (!item.employeeId || !item.type) {
        console.warn('Invalid data in callsHistoryData:', item);
        return acc;
      }

      const group = item.name
        ? `${item.name.split(' ')[0]?.charAt(0).toUpperCase()}${item.name.split(' ')[0]?.slice(1) || ''} ${
            item.name.split(' ')[1]?.charAt(0).toUpperCase() || ''
          }.`
        : 'Unknown';
      const existingGroup = acc.find((g) => g.group === group);
      const values = [
        totalRecords, // Use totalRecords from Redux state
        item.type.toLowerCase().includes('connected') ? 1 : 0,
        item.type.toLowerCase().includes('missed') ? 1 : 0,
      ];

      if (existingGroup) {
        existingGroup.values[0] = totalRecords; // Update to totalRecords
        existingGroup.values[1] += values[1];
        existingGroup.values[2] += values[2];
        existingGroup.firstCall = existingGroup.firstCall
          ? existingGroup.firstCall < item.timestamp
            ? existingGroup.firstCall
            : item.timestamp
          : item.timestamp;
        existingGroup.lastCall = existingGroup.lastCall
          ? existingGroup.lastCall > item.timestamp
            ? existingGroup.lastCall
            : item.timestamp
          : item.timestamp;
      } else {
        acc.push({
          group,
          values,
          employeeId: item.employeeId || 'N/A',
          firstCall: item.timestamp,
          lastCall: item.timestamp,
        });
      }
      return acc;
    }, []);
  }, [normalizedCallHistory, totalRecords]);

  // Dummy data for CallHistoryTable charts
  const callTimeData = useMemo(
    () => ({
      labels: callsHistoryData.map((item) => item.group || 'No Data'),
      datasets: [
        {
          data: callsHistoryData.map((item) => {
            const date = item.firstCall && item.firstCall !== 0 && !isNaN(new Date(item.firstCall).getTime())
              ? new Date(item.firstCall)
              : new Date();
            return date.getHours() + date.getMinutes() / 60;
          }),
          color: () => '#4682B4',
          strokeWidth: 2,
          label: 'First Call',
        },
        {
          data: callsHistoryData.map((item) => {
            const date = item.lastCall && item.lastCall !== 0 && !isNaN(new Date(item.lastCall).getTime())
              ? new Date(item.lastCall)
              : new Date();
            return date.getHours() + date.getMinutes() / 60;
          }),
          color: () => '#FF6347',
          strokeWidth: 2,
          label: 'Last Call',
        },
      ],
      legend: ['First Call', 'Last Call'],
    }),
    [callsHistoryData]
  );

  const talkTimeData = useMemo(
    () => ({
      labels: callsHistoryData.map((item) => item.group || 'No Data'),
      datasets: [
        {
          data: normalizedCallHistory.map((item) => {
            const duration = item.callDurationFormatted
              ? item.callDurationFormatted.split(':').reduce((acc, val, index) => {
                  return acc + (index === 0 ? parseInt(val) * 60 : index === 1 ? parseInt(val) : parseInt(val) / 60);
                }, 0)
              : 0;
            return duration;
          }),
          color: () => '#87CEEB',
          strokeWidth: 2,
          label: 'Total Talk Time (in minutes)',
        },
      ],
      legend: ['Total Talk Time (in minutes)'],
    }),
    [normalizedCallHistory]
  );

  const handleViewCallList = (employeeId) => {
    if (!employeeId || employeeId === 'N/A') {
      console.log('Invalid employeeId:', employeeId);
      return;
    }
    console.log('Opening modal for employeeId:', employeeId);
    setSelectedEmployeeId(employeeId);
    setShowCallHistoryModal(true);
    // Fetch call history for the selected employee
    dispatch(fetchCallHistory({
      employeeId,
      dateFilter: 'today',
      page: 1,
    }));
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(fetchCallHistory({
        employeeId: selectedEmployeeId || '6847e21860047e14510bcdcb',
        dateFilter: 'today',
        page: currentPage + 1,
      }));
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(fetchCallHistory({
        employeeId: selectedEmployeeId || '6847e21860047e14510bcdcb',
        dateFilter: 'today',
        page: currentPage - 1,
      }));
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Call Log"
        showMenuButton={false}
        showBackButton={true}
        showSearchButton={false}
        showNotificationButton={false}
        showSettingsButton={false}
        showCloseButton={false}
      />

      {loading && (
        <View style={styles.centeredContent}>
          <Text style={styles.statusText}>Loading call history...</Text>
        </View>
      )}

      {error && !loading && (
        <View style={styles.centeredContent}>
          <Text style={styles.statusText}>Error: {error}</Text>
        </View>
      )}

      {!loading && !error && (
        <View style={styles.mainContainer}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.tableContainer}>
              <CallHistoryTable
                filteredCallsHistoryData={callsHistoryData}
                callTimeData={callTimeData}
                talkTimeData={talkTimeData}
                formatTime={formatDateTime}
                formatMinutes={formatDuration}
                onViewCallList={handleViewCallList}
                totalRecords={totalRecords}
              />
            </View>
          </ScrollView>

          <Modal
            isVisible={showCallHistoryModal}
            onBackdropPress={() => {
              setShowCallHistoryModal(false);
              setSelectedEmployeeId(null);
              dispatch(resetCallHistory());
              StatusBar.setHidden(false);
            }}
            onModalShow={() => StatusBar.setHidden(true)}
            style={{ margin: 0 }}
            backdropColor="#000"
            backdropOpacity={0.5}
            avoidKeyboard={false}
          >
            <View style={styles.modalContainer}>
              <CallHistoryDetailTable
                callHistory={filteredCallHistory}
                loading={loading}
                error={error}
                currentPage={currentPage}
                totalPages={totalPages}
                totalRecords={totalRecords}
                onClose={() => {
                  setShowCallHistoryModal(false);
                  setSelectedEmployeeId(null);
                  dispatch(resetCallHistory());
                  StatusBar.setHidden(false);
                }}
                onNextPage={handleNextPage}
                onPreviousPage={handlePreviousPage}
              />
            </View>
          </Modal>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  mainContainer: {
    flex: 1,
    position: 'relative',
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  statusText: {
    fontSize: RFPercentage(2.2),
    color: '#4b5563',
    fontWeight: '500',
    textAlign: 'center',
  },
  tableContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  modalContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
});

export default CallLog;