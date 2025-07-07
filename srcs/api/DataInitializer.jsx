// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   fetchAllBranches,
//   fetchAllSources,
//   fetchActiveStatuses,
//   fetchAllEmployees,
//   fetchAllLeadStatuses,
// } from '../redux/slice/index';

// const DataInitializer = ({ children }) => {
//   const dispatch = useDispatch();

//   // Redux selectors to check if data is already loaded
  
//   const { activeBranches = [], loading: branchesLoading } = useSelector((state) => state.activeBranches || {});
//   const { activeSource = [], loading: sourcesLoading } = useSelector((state) => state.activeSource || {});
//   const { statuses = [], loading: statusesLoading } = useSelector((state) => state.activeStatuses || {});
//   const { activeEmployees = [], loading: employeesLoading } = useSelector((state) => state.activeEmployees || {});
//   const { leadStatuses = [], loading: leadStatusesLoading } = useSelector((state) => state.leadStatus || {});

//   useEffect(() => {
//     // Function to fetch data if not already present
//     const fetchInitialData = async () => {
//       try {
//         // Check if data is empty or not loaded, and not currently loading
//         if (!activeBranches.length && !branchesLoading) {
//           console.log('DataInitializer: Fetching branches');
//           await dispatch(fetchAllBranches()).unwrap();
//         } else {
//           console.log('DataInitializer: Branches already loaded, skipping fetch');
//         }

//         if (!activeSource.length && !sourcesLoading) {
//           console.log('DataInitializer: Fetching sources');
//           await dispatch(fetchAllSources()).unwrap();
//         } else {
//           console.log('DataInitializer: Sources already loaded, skipping fetch');
//         }

//         if (!statuses.length && !statusesLoading) {
//           console.log('DataInitializer: Fetching active statuses');
//           await dispatch(fetchActiveStatuses()).unwrap();
//         } else {
//           console.log('DataInitializer: Active statuses already loaded, skipping fetch');
//         }

//         if (!activeEmployees.length && !employeesLoading) {
//           console.log('DataInitializer: Fetching employees');
//           await dispatch(fetchAllEmployees()).unwrap();
//         } else {
//           console.log('DataInitializer: Employees already loaded, skipping fetch');
//         }

//         if (!leadStatuses.length && !leadStatusesLoading) {
//           console.log('DataInitializer: Fetching lead statuses');
//           await dispatch(fetchAllLeadStatuses()).unwrap();
//         } else {
//           console.log('DataInitializer: Lead statuses already loaded, skipping fetch');
//         }
//       } catch (error) {
//         console.error('DataInitializer: Error fetching initial data:', error);
//       }
//     };

//     fetchInitialData();
//   }, [
//     dispatch,
//     activeBranches.length,
//     branchesLoading,
//     activeSource.length,
//     sourcesLoading,
//     statuses.length,
//     statusesLoading,
//     activeEmployees.length,
//     employeesLoading,
//     leadStatuses.length,
//     leadStatusesLoading,
//   ]);

//   // Render children (the rest of the app)
//   return <>{children}</>;
// };

// export default DataInitializer;