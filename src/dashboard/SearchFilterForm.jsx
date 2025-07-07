

// import React, { useState, useCallback, useMemo } from 'react';
// import { ScrollView, View, TextInput, TouchableOpacity, Text, Dimensions } from 'react-native';
// import DropDownPicker from 'react-native-dropdown-picker';
// import DatePicker from 'react-native-date-picker';
// import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
// import { fetchAllLeads,fetchActiveStatuses,fetchAllBranches,fetchAllEmployees,fetchAllSources } from '../redux/slice/index';
// import { Country, State, City } from 'country-state-city';
// import { format, addMinutes } from 'date-fns';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { styled } from 'nativewind';
// import Header from '../component/Header'; // Adjust the import path based on your project structure
// import LinearGradient from 'react-native-linear-gradient';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// const StyledView = styled(View);
// const StyledText = styled(Text);
// const StyledTextInput = styled(TextInput);
// const StyledTouchable = styled(TouchableOpacity);

// const SearchFilterForm = ({ navigation, onClose, onSearchSubmitted }) => {
//   const dispatch = useAppDispatch();
//   const { activeSource = [], loading: sourcesLoading, error: sourcesError } = useAppSelector((state) => state.activeSource || {});
//   const { activeEmployees = [], loading: employeesLoading, error: employeesError } = useAppSelector((state) => state.activeEmployees || {});
//   const { activeBranches = [], loading: branchesLoading, error: branchesError } = useAppSelector((state) => state.activeBranches || {});
//   const { statuses = [], loading: statusesLoading, error: statusesError } = useAppSelector((state) => state.activeStatuses || {});
//   const { loading: leadsLoading, error: leadsError } = useAppSelector((state) => state.leads || {});

//   const [filters, setFilters] = useState({
//     name: '',
//     reference: '',
//     user: '',
//     priority: null,
//     source: null,
//     status: null,
//     country: null,
//     state: null,
//     city: null,
//     count: null,
//     customer: null,
//     dateFrom: '',
//     dateTo: '',
//     modifiedLead: null,
//     branch: null,
//     assignTo: null,
//     dateOption: null,
//   });

//   const [dropdownOpen, setDropdownOpen] = useState(null);
//   const [openFromDate, setOpenFromDate] = useState(false);
//   const [openToDate, setOpenToDate] = useState(false);
//   const [dataFetched, setDataFetched] = useState({
//     source: false,
//     status: false,
//     branch: false,
//     assignTo: false,
//   });

//   const [countryItems, setCountryItems] = useState([]);
//   const [stateItems, setStateItems] = useState([]);
//   const [cityItems, setCityItems] = useState([]);

//   const priorities = ['Lower', 'Midium', 'Important', 'High'];
//   const dateOptions = useMemo(() => [
//     { label: 'Today', value: 'today', key: 'today' },
//     { label: 'Tomorrow', value: 'tomorrow', key: 'tomorrow' },
//     { label: 'Yesterday', value: 'yesterday', key: 'yesterday' },
//     { label: 'Last Week', value: 'lastWeek', key: 'lastWeek' },
//     { label: 'This Month', value: 'thisMonth', key: 'thisMonth' },
//     { label: 'Custom', value: 'custom', key: 'custom' },
//   ], []);

//   React.useEffect(() => {
//     const countries = Country.getAllCountries().map((country) => ({
//       label: country.name,
//       value: country.isoCode,
//       key: country.isoCode,
//     }));
//     setCountryItems(countries);
//   }, []);

//   React.useEffect(() => {
//     if (filters.country && countryItems.find((c) => c.value === filters.country)) {
//       const states = State.getStatesOfCountry(filters.country).map((state) => ({
//         label: state.name,
//         value: state.isoCode,
//         key: state.isoCode,
//       }));
//       setStateItems(states);
//       setFilters((prev) => ({ ...prev, state: null, city: null }));
//     } else {
//       setStateItems([]);
//       setCityItems([]);
//       setFilters((prev) => ({ ...prev, state: null, city: null }));
//     }
//   }, [filters.country, countryItems]);

//   React.useEffect(() => {
//     if (filters.country && filters.state) {
//       const cities = City.getCitiesOfState(filters.country, filters.state).map((city) => ({
//         label: city.name,
//         value: city.name,
//         key: city.name,
//       }));
//       setCityItems(cities);
//       setFilters((prev) => ({ ...prev, city: null }));
//     } else {
//       setCityItems([]);
//       setFilters((prev) => ({ ...prev, city: null }));
//     }
//   }, [filters.state]);

//   const handleDropdownToggle = useCallback((dropdownKey) => {
//     setDropdownOpen(dropdownOpen === dropdownKey ? null : dropdownKey);
//     if (!dataFetched[dropdownKey]) {
//       console.log(`SearchFilterForm: Fetching data for ${dropdownKey}`);
//       if (dropdownKey === 'source' && activeSource.length === 0) dispatch(fetchAllSources());
//       if (dropdownKey === 'status' && statuses.length === 0) dispatch(fetchActiveStatuses());
//       if (dropdownKey === 'branch' && activeBranches.length === 0) dispatch(fetchAllBranches());
//       if (dropdownKey === 'assignTo' && activeEmployees.length === 0) dispatch(fetchAllEmployees());
//       setDataFetched((prev) => ({ ...prev, [dropdownKey]: true }));
//     }
//   }, [dataFetched, dispatch, dropdownOpen, activeSource, statuses, activeBranches, activeEmployees]);

//   const { height } = Dimensions.get('window');
//   const scrollViewMinHeight = filters.dateOption === 'custom' ? height * 0.65 : height * 0.58;

//   const dropdownStyles = useMemo(() => ({
//     style: {
//       backgroundColor: '#F9FAFB',
//       borderRadius: 12,
//       borderColor: '#D1D5DB',
//       borderWidth: 1,
//       height: 45,
//       paddingHorizontal: 12,
//     },
//     dropDownContainerStyle: {
//       borderRadius: 12,
//       borderColor: '#D1D5DB',
//       borderWidth: 1,
//       backgroundColor: '#F9FAFB',
//       elevation: 6,
//       shadowColor: '#000',
//       shadowOffset: { width: 0, height: 3 },
//       shadowOpacity: 0.2,
//       shadowRadius: 4,
//       maxHeight: 220,
//       marginTop: 4,
//     },
//     textStyle: { fontSize: 14, color: '#000', fontFamily: 'Inter-VariableFont_opsz,wght' },
//     placeholderStyle: { color: '#9CA3AF', fontSize: 14, fontFamily: 'Inter-VariableFont_opsz,wght' },
//     itemStyle: {
//       paddingVertical: 8,
//       paddingHorizontal: 12,
//     },
//   }), []);

//   const convertUTCToIST = (utcDateString) => {
//     if (!utcDateString) return '';
//     const utcDate = new Date(utcDateString);
//     const istDate = addMinutes(utcDate, 330);
//     return format(istDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
//   };

//   const handleReset = useCallback(() => {
//     setFilters({
//       name: '',
//       reference: '',
//       user: '',
//       priority: null,
//       source: null,
//       status: null,
//       country: null,
//       state: null,
//       city: null,
//       count: null,
//       customer: null,
//       dateFrom: '',
//       dateTo: '',
//       modifiedLead: null,
//       branch: null,
//       assignTo: null,
//       dateOption: null,
//     });
//     setDropdownOpen(null);
//     setStateItems([]);
//     setCityItems([]);
//     setDataFetched({
//       source: false,
//       status: false,
//       branch: false,
//       assignTo: false,
//     });
//     dispatch(fetchAllLeads({ page: 1, refresh: true }));
//     onSearchSubmitted(null);
//     onClose();
//   }, [dispatch, onSearchSubmitted, onClose]);

//   const handleSearch = useCallback(() => {
//     const istFilters = {};
//     if (filters.name) istFilters.search = filters.name;
//     if (filters.assignTo) istFilters.assignedTo = filters.assignTo;
//     if (filters.branch) istFilters.organizationId = filters.branch;
//     if (filters.source) istFilters.source = filters.source;
//     if (filters.status) istFilters.status = filters.status;
//     if (filters.country) istFilters.country = filters.country;
//     if (filters.state) istFilters.state = filters.state;
//     if (filters.city) istFilters.city = filters.city;
//     if (filters.dateOption && filters.dateOption !== 'custom') {
//       istFilters.dateSearch = filters.dateOption;
//     } else if (filters.dateOption === 'custom' && filters.dateFrom && filters.dateTo) {
//       istFilters.dateSearch = `${convertUTCToIST(filters.dateFrom)},${convertUTCToIST(filters.dateTo)}`;
//     }

//     console.log('SearchFilterForm: Search Filters (IST):', istFilters);
//     dispatch(fetchAllLeads({ filters: istFilters, page: 1, refresh: true })).then((result) => {
//       if (result.meta.requestStatus === 'fulfilled') {
//         console.log('SearchFilterForm: Leads fetched successfully');
//         onSearchSubmitted(istFilters);
//         onClose();
//       } else {
//         console.error('SearchFilterForm: Failed to fetch leads:', result.payload);
//       }
//     });
//   }, [dispatch, filters, onSearchSubmitted, onClose]);

//   const formatEmployeeName = useCallback((employee) => {
//     if (!employee) return 'Unnamed Employee';
//     if (employee.name) return employee.name.replace(/([a-z])([A-Z])/g, '$1 $2').trim();
//     if (employee.firstName && employee.lastName) return `${employee.firstName} ${employee.lastName}`.trim();
//     if (employee.fullName) return employee.fullName.trim();
//     if (employee.employeeName) return employee.employeeName.trim();
//     console.warn('SearchFilterForm: Employee with no valid name fields:', employee);
//     return 'Unnamed Employee';
//   }, []);

//   const branchItems = useMemo(() => Array.isArray(activeBranches)
//     ? activeBranches
//         .map((b) => {
//           const id = b._id || b.branchId;
//           if (!id) {
//             console.warn('SearchFilterForm: Branch with undefined _id or branchId:', b);
//             return null;
//           }
//           return {
//             label: b.name || 'Unnamed Branch',
//             value: id.toString(),
//             key: id.toString(),
//           };
//         })
//         .filter((item) => item !== null)
//     : [], [activeBranches]);

//   const employeeItems = useMemo(() => Array.isArray(activeEmployees)
//     ? activeEmployees
//         .map((e) => {
//           const id = e._id || e.empId;
//           if (!id) {
//             console.warn('SearchFilterForm: Employee with undefined _id or empId:', e);
//             return null;
//           }
//           return {
//             label: formatEmployeeName(e),
//             value: id.toString(),
//             key: id.toString(),
//           };
//         })
//         .filter((item) => item !== null)
//     : [], [activeEmployees, formatEmployeeName]);

//   const statusItems = useMemo(() => Array.isArray(statuses)
//     ? statuses
//         .map((s) => {
//           if (!s._id) {
//             console.warn('SearchFilterForm: Status with undefined _id:', s);
//             return null;
//           }
//           return {
//             label: s.name || 'Unnamed Status',
//             value: s._id.toString(),
//             key: s._id.toString(),
//           };
//         })
//         .filter((item) => item !== null)
//     : [], [statuses]);

//   const sourceItems = useMemo(() => Array.isArray(activeSource)
//     ? activeSource
//         .map((s) => {
//           if (!s._id) {
//             console.warn('SearchFilterForm: Source with undefined _id:', s);
//             return null;
//           }
//           return {
//             label: s.name || 'Unnamed Source',
//             value: s._id.toString(),
//             key: s._id.toString(),
//           };
//         })
//         .filter((item) => item !== null)
//     : [], [activeSource]);

//   return (
//     <StyledView className="bg-white rounded-b-2xl shadow-lg">

//       <ScrollView
//         style={{ maxHeight: filters.dateOption === 'custom' ? height * 0.65 : height * 0.58 }}
//         contentContainerStyle={{ paddingBottom: 24 }}
//       >
//         <StyledView className="px-5 py-4">
//           {(sourcesError || employeesError || branchesError || statusesError || leadsError) && (
//             <StyledView className="mb-4 bg-red-50 p-3 rounded-xl">
//               {sourcesError && (
//                 <StyledView className="flex-row items-center mb-2">
//                   <StyledText className="text-red-600 text-sm flex-1">Error loading sources: {sourcesError}</StyledText>
//                   <StyledTouchable onPress={() => dispatch(fetchAllSources())}>
//                     <StyledText className="text-blue-600 text-sm font-medium">Retry</StyledText>
//                   </StyledTouchable>
//                 </StyledView>
//               )}
//               {employeesError && (
//                 <StyledView className="flex-row items-center mb-2">
//                   <StyledText className="text-red-600 text-sm flex-1">Error loading employees: {employeesError}</StyledText>
//                   <StyledTouchable onPress={() => dispatch(fetchAllEmployees())}>
//                     <StyledText className="text-blue-600 text-sm font-medium">Retry</StyledText>
//                   </StyledTouchable>
//                 </StyledView>
//               )}
//               {branchesError && (
//                 <StyledView className="flex-row items-center mb-2">
//                   <StyledText className="text-red-600 text-sm flex-1">Error loading branches: {branchesError}</StyledText>
//                   <StyledTouchable onPress={() => dispatch(fetchAllBranches())}>
//                     <StyledText className="text-blue-600 text-sm font-medium">Retry</StyledText>
//                   </StyledTouchable>
//                 </StyledView>
//               )}
//               {statusesError && (
//                 <StyledView className="flex-row items-center mb-2">
//                   <StyledText className="text-red-600 text-sm flex-1">Error loading statuses: {statusesError}</StyledText>
//                   <StyledTouchable onPress={() => dispatch(fetchActiveStatuses())}>
//                     <StyledText className="text-blue-600 text-sm font-medium">Retry</StyledText>
//                   </StyledTouchable>
//                 </StyledView>
//               )}
//               {leadsError && (
//                 <StyledView className="flex-row items-center mb-2">
//                   <StyledText className="text-red-600 text-sm flex-1">Error loading leads: {leadsError}</StyledText>
//                   <StyledTouchable
//                     onPress={() =>
//                       dispatch(fetchAllLeads({ filters: { search: filters.name }, page: 1, refresh: true }))
//                     }
//                   >
//                     <StyledText className="text-blue-600 text-sm font-medium">Retry</StyledText>
//                   </StyledTouchable>
//                 </StyledView>
//               )}
//             </StyledView>
//           )}

//           <StyledView className="mb-4">
//             <StyledTextInput
//               className="bg-gray-50 rounded-xl px-4 py-3 border border-gray-300 text-base text-gray-900 font-poppins"
//               placeholder="Search by name, number, or email"
//               placeholderTextColor="#9CA3AF"
//               value={filters.name}
//               onChangeText={(text) => setFilters({ ...filters, name: text })}
//               accessibilityLabel="Search by name, number, or email"
//             />
//           </StyledView>

//           <StyledView className="flex-row justify-between mb-4 gap-3">
//             <StyledView className="flex-1">
//               <DropDownPicker
//                 open={dropdownOpen === 'source'}
//                 value={filters.source}
//                 items={sourceItems}
//                 setOpen={() => handleDropdownToggle('source')}
//                 setValue={(callback) => setFilters((prev) => ({ ...prev, source: callback() }))}
//                 {...dropdownStyles}
//                 placeholder={sourcesLoading ? 'Loading...' : 'Select Source'}
//                 zIndex={dropdownOpen === 'source' ? 10000 : 1000}
//                 zIndexInverse={dropdownOpen === 'source' ? 1000 : 10000}
//                 dropDownDirection="BOTTOM"
//                 disabled={sourcesLoading}
//                 listMode="SCROLLVIEW"
//                 scrollViewProps={{
//                   nestedScrollEnabled: true,
//                   showsVerticalScrollIndicator: true,
//                 }}
//                 accessibilityLabel="Select source"
//               />
//             </StyledView>
//             <StyledView className="flex-1">
//               <DropDownPicker
//                 open={dropdownOpen === 'status'}
//                 value={filters.status}
//                 items={statusItems}
//                 setOpen={() => handleDropdownToggle('status')}
//                 setValue={(callback) => setFilters((prev) => ({ ...prev, status: callback() }))}
//                 {...dropdownStyles}
//                 placeholder={statusesLoading ? 'Loading...' : 'Select Status'}
//                 zIndex={dropdownOpen === 'status' ? 10000 : 1000}
//                 zIndexInverse={dropdownOpen === 'status' ? 1000 : 10000}
//                 dropDownDirection="BOTTOM"
//                 disabled={statusesLoading}
//                 listMode="SCROLLVIEW"
//                 scrollViewProps={{
//                   nestedScrollEnabled: true,
//                   showsVerticalScrollIndicator: true,
//                 }}
//                 accessibilityLabel="Select status"
//               />
//             </StyledView>
//           </StyledView>

//           <StyledView className="flex-row justify-between mb-4 gap-3">
//             <StyledView className="flex-1">
//               <DropDownPicker
//                 open={dropdownOpen === 'branch'}
//                 value={filters.branch}
//                 items={branchItems}
//                 setOpen={() => handleDropdownToggle('branch')}
//                 setValue={(callback) => setFilters((prev) => ({ ...prev, branch: callback() }))}
//                 {...dropdownStyles}
//                 placeholder={branchesLoading ? 'Loading...' : 'Select Branch'}
//                 zIndex={dropdownOpen === 'branch' ? 10000 : 1000}
//                 zIndexInverse={dropdownOpen === 'branch' ? 1000 : 10000}
//                 dropDownDirection="BOTTOM"
//                 disabled={branchesLoading}
//                 listMode="SCROLLVIEW"
//                 scrollViewProps={{
//                   nestedScrollEnabled: true,
//                   showsVerticalScrollIndicator: true,
//                 }}
//                 accessibilityLabel="Select branch"
//               />
//             </StyledView>
//             <StyledView className="flex-1">
//               <DropDownPicker
//                 open={dropdownOpen === 'assignTo'}
//                 value={filters.assignTo}
//                 items={employeeItems}
//                 setOpen={() => handleDropdownToggle('assignTo')}
//                 setValue={(callback) => setFilters((prev) => ({ ...prev, assignTo: callback() }))}
//                 {...dropdownStyles}
//                 placeholder={employeesLoading ? 'Loading...' : 'Select Assign To'}
//                 zIndex={dropdownOpen === 'assignTo' ? 10000 : 1000}
//                 zIndexInverse={dropdownOpen === 'assignTo' ? 1000 : 10000}
//                 dropDownDirection="BOTTOM"
//                 disabled={employeesLoading}
//                 listMode="SCROLLVIEW"
//                 scrollViewProps={{
//                   nestedScrollEnabled: true,
//                   showsVerticalScrollIndicator: true,
//                 }}
//                 accessibilityLabel="Select assign to"
//               />
//             </StyledView>
//           </StyledView>

//           <StyledView className="mb-4">
//             <DropDownPicker
//               open={dropdownOpen === 'dateOption'}
//               value={filters.dateOption}
//               items={dateOptions}
//               setOpen={() => handleDropdownToggle('dateOption')}
//               setValue={(callback) => setFilters((prev) => ({ ...prev, dateOption: callback() }))}
//               {...dropdownStyles}
//               placeholder="Select Date"
//               zIndex={dropdownOpen === 'dateOption' ? 10000 : 1000}
//               zIndexInverse={dropdownOpen === 'dateOption' ? 1000 : 10000}
//               dropDownDirection="BOTTOM"
//               listMode="SCROLLVIEW"
//               scrollViewProps={{
//                 nestedScrollEnabled: true,
//                 showsVerticalScrollIndicator: true,
//               }}
//               accessibilityLabel="Select date option"
//             />
//           </StyledView>

//           {filters.dateOption === 'custom' && (
//             <StyledView className="flex-row justify-between mb-4 gap-3">
//               <StyledView className="flex-1">
//                 <StyledTouchable
//                   className="bg-gray-50 rounded-xl px-4 py-3 border border-gray-300"
//                   onPress={() => setOpenFromDate(true)}
//                   accessibilityLabel="Select from date"
//                 >
//                   <StyledText className={`text-base font-poppins ${filters.dateFrom ? 'text-gray-900' : 'text-gray-400'}`}>
//                     {filters.dateFrom ? format(new Date(filters.dateFrom), 'dd-MM-yyyy') : 'From Date'}
//                   </StyledText>
//                 </StyledTouchable>
//                 <DatePicker
//                   modal
//                   open={openFromDate}
//                   date={filters.dateFrom ? new Date(filters.dateFrom) : new Date()}
//                   onConfirm={(date) => {
//                     setOpenFromDate(false);
//                     setFilters((prev) => ({ ...prev, dateFrom: date.toISOString() }));
//                   }}
//                   onCancel={() => setOpenFromDate(false)}
//                 />
//               </StyledView>
//               <StyledView className="flex-1">
//                 <StyledTouchable
//                   className="bg-gray-50 rounded-xl px-4 py-3 border border-gray-300"
//                   onPress={() => setOpenToDate(true)}
//                   accessibilityLabel="Select to date"
//                 >
//                   <StyledText className={`text-base font-poppins ${filters.dateTo ? 'text-gray-900' : 'text-gray-400'}`}>
//                     {filters.dateTo ? format(new Date(filters.dateTo), 'dd-MM-yyyy') : 'To Date'}
//                   </StyledText>
//                 </StyledTouchable>
//                 <DatePicker
//                   modal
//                   open={openToDate}
//                   date={filters.dateTo ? new Date(filters.dateTo) : new Date()}
//                   onConfirm={(date) => {
//                     setOpenToDate(false);
//                     setFilters((prev) => ({ ...prev, dateTo: date.toISOString() }));
//                   }}
//                   onCancel={() => setOpenToDate(false)}
//                 />
//               </StyledView>
//             </StyledView>
//           )}

//           <StyledView className="mb-4">
//             <DropDownPicker
//               open={dropdownOpen === 'country'}
//               value={filters.country}
//               items={countryItems}
//               setOpen={() => handleDropdownToggle('country')}
//               setValue={(callback) => setFilters((prev) => ({ ...prev, country: callback() }))}
//               {...dropdownStyles}
//               placeholder="Select Country"
//               zIndex={dropdownOpen === 'country' ? 10000 : 1000}
//               zIndexInverse={dropdownOpen === 'country' ? 1000 : 10000}
//               dropDownDirection="BOTTOM"
//               listMode="SCROLLVIEW"
//               scrollViewProps={{
//                 nestedScrollEnabled: true,
//                 showsVerticalScrollIndicator: true,
//               }}
//               accessibilityLabel="Select country"
//             />
//           </StyledView>

//           <StyledView className="flex-row justify-between mb-2 gap-3">
//             <StyledView className="flex-1">
//               <DropDownPicker
//                 open={dropdownOpen === 'state'}
//                 value={filters.state}
//                 items={stateItems}
//                 setOpen={() => handleDropdownToggle('state')}
//                 setValue={(callback) => setFilters((prev) => ({ ...prev, state: callback() }))}
//                 {...dropdownStyles}
//                 placeholder="Select State"
//                 disabled={!filters.country}
//                 zIndex={dropdownOpen === 'state' ? 10000 : 1000}
//                 zIndexInverse={dropdownOpen === 'state' ? 1000 : 10000}
//                 dropDownDirection="BOTTOM"
//                 listMode="SCROLLVIEW"
//                 scrollViewProps={{
//                   nestedScrollEnabled: true,
//                   showsVerticalScrollIndicator: true,
//                 }}
//                 accessibilityLabel="Select state"
//               />
//             </StyledView>
//             <StyledView className="flex-1">
//               <DropDownPicker
//                 open={dropdownOpen === 'city'}
//                 value={filters.city}
//                 items={cityItems}
//                 setOpen={() => handleDropdownToggle('city')}
//                 setValue={(callback) => setFilters((prev) => ({ ...prev, city: callback() }))}
//                 {...dropdownStyles}
//                 placeholder="Select City"
//                 disabled={!filters.state}
//                 zIndex={dropdownOpen === 'city' ? 10000 : 1000}
//                 zIndexInverse={dropdownOpen === 'city' ? 1000 : 10000}
//                 dropDownDirection="BOTTOM"
//                 listMode="SCROLLVIEW"
//                 scrollViewProps={{
//                   nestedScrollEnabled: true,
//                   showsVerticalScrollIndicator: true,
//                 }}
//                 accessibilityLabel="Select city"
//               />
//             </StyledView>
//           </StyledView>

//           <StyledView className="flex-row justify-center gap-4 mt-0">
//             <LinearGradient
//               colors={['#8290EA', '#3F4CA0']}
//               start={{ x: 0, y: 0 }}
//               end={{ x: 1, y: 0 }}
//               className="w-32 rounded-lg py-3 px-1.5 justify-center items-center"
//             >
//               <StyledTouchable
//                 onPress={handleSearch}
//                 disabled={leadsLoading}
//                 accessibilityLabel="Search leads"
//               >
//                 <StyledText className="text-white text-base font-semibold font-poppins">
//                   {leadsLoading ? 'Loading...' : 'Search'}
//                 </StyledText>
//               </StyledTouchable>
//             </LinearGradient>
//             <StyledTouchable
//               className="bg-gray-200 rounded-xl px-8 py-3"
//               onPress={handleReset}
//               accessibilityLabel="Reset filters"
//             >
//               <StyledText className="text-violet-500 text-base font-semibold font-poppins">Reset</StyledText>
//             </StyledTouchable>
//           </StyledView>
//         </StyledView>
//       </ScrollView>
//     </StyledView>
//   );
// };

// export default React.memo(SearchFilterForm);
import React, { useState, useCallback, useMemo } from 'react';
import { ScrollView, View, TextInput, TouchableOpacity, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-date-picker';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { fetchAllLeads, fetchActiveStatuses, fetchAllBranches, fetchAllEmployees, fetchAllSources } from '../redux/slice/index';
import { format } from 'date-fns';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styled } from 'nativewind';
import LinearGradient from 'react-native-linear-gradient';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchable = styled(TouchableOpacity);

const SearchFilterForm = ({ navigation, onClose, onSearchSubmitted }) => {
  const dispatch = useAppDispatch();
  const { activeSource = [] } = useAppSelector((state) => state.activeSource || {});
  const { activeEmployees = [] } = useAppSelector((state) => state.activeEmployees || {});
  const { activeBranches = [] } = useAppSelector((state) => state.activeBranches || {});
  const { statuses = [] } = useAppSelector((state) => state.activeStatuses || {});

  const [filters, setFilters] = useState({
    name: '',
    dateFrom: '',
    dateTo: '',
    source: null,
    status: null,
    branch: null,
    assignTo: null,
  });

  const [openFromDate, setOpenFromDate] = useState(false);
  const [openToDate, setOpenToDate] = useState(false);
  const [openFilterDropdown, setOpenFilterDropdown] = useState(false);
  const [selectedField, setSelectedField] = useState(null);

  const handleSearch = useCallback(() => {
    const istFilters = {};
    if (filters.name) istFilters.search = filters.name;
    if (filters.dateFrom && filters.dateTo) {
      istFilters.dateSearch = `${filters.dateFrom},${filters.dateTo}`;
    }
    if (filters.source) istFilters.source = filters.source;
    if (filters.status) istFilters.status = filters.status;
    if (filters.branch) istFilters.organizationId = filters.branch;
    if (filters.assignTo) istFilters.assignedTo = filters.assignTo;
    dispatch(fetchAllLeads({ filters: istFilters, page: 1, refresh: true }));
    onSearchSubmitted(istFilters);
    onClose();
  }, [dispatch, filters, onSearchSubmitted, onClose]);

  const dropdownStyles = {
    style: {
      backgroundColor: '#F9FAFB',
      borderRadius: 12,
      borderColor: '#D1D5DB',
      borderWidth: 1,
      height: 45,
      paddingHorizontal: 12,
    },
    dropDownContainerStyle: {
      borderRadius: 12,
      borderColor: '#D1D5DB',
      borderWidth: 1,
      backgroundColor: '#F9FAFB',
      elevation: 6,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      maxHeight: 220,
      marginTop: 4,
    },
    textStyle: { fontSize: 14, color: '#000' },
    placeholderStyle: { color: '#9CA3AF', fontSize: 14 },
    itemStyle: {
      paddingVertical: 8,
      paddingHorizontal: 12,
    },
  };

  const fieldOptions = [
    { label: 'Source', value: 'source' },
    { label: 'Status', value: 'status' },
    { label: 'Branch', value: 'branch' },
    { label: 'Assign To', value: 'assignTo' },
    { label: 'Date Range', value: 'date' },
  ];

  const sourceItems = useMemo(() => activeSource.map((s) => ({
    label: s.name || 'Unnamed Source',
    value: s._id?.toString() || '',
    key: s._id?.toString() || '',
  })), [activeSource]);

  const statusItems = useMemo(() => statuses.map((s) => ({
    label: s.name || 'Unnamed Status',
    value: s._id?.toString() || '',
    key: s._id?.toString() || '',
  })), [statuses]);

  const branchItems = useMemo(() => activeBranches.map((b) => ({
    label: b.name || 'Unnamed Branch',
    value: b._id?.toString() || '',
    key: b._id?.toString() || '',
  })), [activeBranches]);

  const employeeItems = useMemo(() => activeEmployees.map((e) => ({
    label: e.name || 'Unnamed Employee',
    value: e._id?.toString() || '',
    key: e._id?.toString() || '',
  })), [activeEmployees]);

  const getFieldComponent = () => {
    if (!selectedField) return null;
    if (selectedField === 'date') {
      return (
        <StyledView className="flex-row justify-between gap-3">
          <StyledView className="flex-1">
            <StyledTouchable
              className="bg-gray-50 rounded-xl px-4 py-3 border border-gray-300"
              onPress={() => setOpenFromDate(true)}
            >
              <StyledText className={`text-base ${filters.dateFrom ? 'text-gray-900' : 'text-gray-400'}`}>
                {filters.dateFrom ? format(new Date(filters.dateFrom), 'dd-MM-yyyy') : 'From Date'}
              </StyledText>
            </StyledTouchable>
            <DatePicker
              modal
              open={openFromDate}
              date={filters.dateFrom ? new Date(filters.dateFrom) : new Date()}
              onConfirm={(date) => {
                setOpenFromDate(false);
                setFilters((prev) => ({ ...prev, dateFrom: date.toISOString() }));
              }}
              onCancel={() => setOpenFromDate(false)}
            />
          </StyledView>
          <StyledView className="flex-1">
            <StyledTouchable
              className="bg-gray-50 rounded-xl px-4 py-3 border border-gray-300"
              onPress={() => setOpenToDate(true)}
            >
              <StyledText className={`text-base ${filters.dateTo ? 'text-gray-900' : 'text-gray-400'}`}>
                {filters.dateTo ? format(new Date(filters.dateTo), 'dd-MM-yyyy') : 'To Date'}
              </StyledText>
            </StyledTouchable>
            <DatePicker
              modal
              open={openToDate}
              date={filters.dateTo ? new Date(filters.dateTo) : new Date()}
              onConfirm={(date) => {
                setOpenToDate(false);
                setFilters((prev) => ({ ...prev, dateTo: date.toISOString() }));
              }}
              onCancel={() => setOpenToDate(false)}
            />
          </StyledView>
        </StyledView>
      );
    }

    const itemsMap = {
      source: sourceItems,
      status: statusItems,
      branch: branchItems,
      assignTo: employeeItems,
    };

    return (
      <DropDownPicker
        open={true}
        value={filters[selectedField]}
        items={itemsMap[selectedField]}
        setOpen={setOpenFilterDropdown}
        setValue={(callback) => setFilters((prev) => ({ ...prev, [selectedField]: callback() }))}
        {...dropdownStyles}
        placeholder={`Select ${selectedField.charAt(0).toUpperCase() + selectedField.slice(1)}`}
        listMode="SCROLLVIEW"
        style={{ marginBottom: 12 }}
      />
    );
  };

  return (
    <ScrollView className="bg-white rounded-b-2xl shadow-lg px-4 py-4">
      <StyledView className="flex-row items-center mb-4">
        <StyledTextInput
          className="w-3/5 bg-gray-50 rounded-xl px-3 py-2 border border-gray-300 text-base text-gray-900"
          placeholder="Search"
          value={filters.name}
          onChangeText={(text) => setFilters({ ...filters, name: text })}
        />
        <DropDownPicker
          open={openFilterDropdown}
          value={selectedField}
          items={fieldOptions}
          setOpen={setOpenFilterDropdown}
          setValue={(callback) => setSelectedField(callback())}
          placeholder={<Ionicons name="filter" size={20} color="#4B5563" />}
          containerStyle={{ width: '35%', marginLeft: 8 }}
          {...dropdownStyles}
          listMode="SCROLLVIEW"
        />
      </StyledView>

      {getFieldComponent()}

      <StyledView className="flex-row justify-center gap-4 mt-2">
        <LinearGradient
          colors={['#8290EA', '#3F4CA0']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="w-32 rounded-lg py-3 px-1.5 justify-center items-center"
        >
          <StyledTouchable onPress={handleSearch}>
            <StyledText className="text-white text-base font-semibold">Apply</StyledText>
          </StyledTouchable>
        </LinearGradient>
        <StyledTouchable
          className="bg-gray-200 rounded-xl px-6 py-3"
          onPress={() => {
            setFilters({
              name: '',
              dateFrom: '',
              dateTo: '',
              source: null,
              status: null,
              branch: null,
              assignTo: null,
            });
            setSelectedField(null);
          }}
        >
          <StyledText className="text-violet-500 text-base font-semibold">Reset</StyledText>
        </StyledTouchable>
      </StyledView>
    </ScrollView>
  );
};

export default React.memo(SearchFilterForm);
