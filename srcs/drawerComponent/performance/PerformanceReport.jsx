


import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TextInput,
  Pressable,
  StatusBar,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LineChart } from 'react-native-chart-kit';
import { BarChart as SVGBarChart, XAxis, YAxis } from 'react-native-svg-charts';
import { G, Text as SVGText, Rect } from 'react-native-svg';
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
// import { fetchPerformanceReport } from '../../redux/slices/getPerformanceReportSlice';
import { fetchCallHistory, resetCallHistory,fetchPerformanceReport,fetchAllEmployees } from '../../redux/slice/index';
// import { fetchCallHistory, resetCallHistory } from '../../redux/slices/getCallHistorySlice';
// import { fetchAllEmployees } from '../../redux/slices/getActiveEmployeesSlice';
import CallHistoryTable from '../CallHistoryTable';
import CallHistoryDetailTable from '../CallHistoryDetailTable';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Header from '../../component/Header';
import CustomButton from '../../component/CustomButton';
import { PanResponder } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const chartWidth = screenWidth * 1.5;

const PerformanceReport = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const performanceState = useSelector((state) => state.performanceReport || {
    performanceReport: [],
    loading: false,
    error: null,
  });

  const callHistoryState = useSelector((state) => state.callHistory || {
    callHistory: [],
    currentPage: 1,
    totalPages: 1,
    totalRecords: 0,
    loading: false,
    error: null,
  });

  const activeEmployeesState = useSelector((state) => state.activeEmployees || {
    activeEmployees: [],
    loading: false,
    error: null,
  });

  const { performanceReport, loading: perfLoading, error: perfError } = performanceState;
  const {
    callHistory,
    currentPage,
    totalPages,
    totalRecords,
    loading: callLoading,
    error: callError,
  } = callHistoryState;
  const { activeEmployees, loading: empLoading, error: empError } = activeEmployeesState;

  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [dateFilter, setDateFilter] = useState('today');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showCallHistoryModal, setShowCallHistoryModal] = useState(false);
  const [page, setPage] = useState(1);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [initialFetchDone, setInitialFetchDone] = useState(false);
  const limit = 10;

  // Tooltip states for LineChart
  const [callTimeTooltip, setCallTimeTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    value: '',
    label: '',
    user: '',
    color: '#000000',
  });
  const [talkTimeTooltip, setTalkTimeTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    value: '',
    label: '',
    user: '',
    color: '#000000',
  });

  // Tooltip state for SVGBarChart
  const [barTooltip, setBarTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    value: null,
    label: '',
    employee: '',
    color: '#000000',
  });

  // Fetch employees on component mount
  useEffect(() => {
    dispatch(fetchAllEmployees());
  }, [dispatch]);

  // Fetch call history when employeeId or page changes
  useEffect(() => {
    if (selectedEmployeeId) {
      dispatch(fetchCallHistory({ employeeId: selectedEmployeeId, page, limit }));
    }
  }, [dispatch, selectedEmployeeId, page]);

  // Initial fetch of performance data
  useEffect(() => {
    if (!initialFetchDone) {
      fetchPerformanceData();
    }
  }, [dispatch, initialFetchDone]);

  const filteredPerformanceReport = useMemo(() => {
    if (selectedEmployeeId) {
      return performanceReport.filter((item) => item.empId === selectedEmployeeId);
    }
    return performanceReport;
  }, [performanceReport, selectedEmployeeId]);

  const employeesList = useMemo(() => {
    return activeEmployees
      .filter((employee) => employee.empId)
      .map((employee) => ({
        label: employee.name?.split('(')[0].trim() || 'Unknown',
        value: employee.empId,
      }));
  }, [activeEmployees]);

  const users = useMemo(
    () =>
      filteredPerformanceReport.map((item) =>
        item.employeeName
          ?.split(' ')
          .map((word) => word?.charAt(0).toUpperCase() + (word?.slice(1) || ''))
          .join(' ') || 'Unknown'
      ),
    [filteredPerformanceReport]
  );

  const callTimeData = useMemo(
    () => ({
      labels: users.length > 0 ? users : ['No Data'],
      datasets: [
        {
          data: filteredPerformanceReport.length > 0
            ? filteredPerformanceReport.map((item) => {
                const date = item.firstCall && !isNaN(new Date(item.firstCall).getTime())
                  ? new Date(item.firstCall)
                  : new Date();
                const hours = date.getHours();
                const minutes = date.getMinutes();
                return hours + minutes / 60;
              })
            : [0],
          color: () => '#4682B4',
          strokeWidth: 2,
          label: 'First Call',
        },
        {
          data: filteredPerformanceReport.length > 0
            ? filteredPerformanceReport.map((item) => {
                const date = item.lastCall && !isNaN(new Date(item.lastCall).getTime())
                  ? new Date(item.lastCall)
                  : new Date();
                const hours = date.getHours();
                const minutes = date.getMinutes();
                return hours + minutes / 60;
              })
            : [0],
          color: () => '#FF6347',
          strokeWidth: 2,
          label: 'Last Call',
        },
      ],
      legend: ['First Call', 'Last Call'],
    }),
    [users, filteredPerformanceReport]
  );

  const talkTimeData = useMemo(
    () => ({
      labels: users.length > 0 ? users : ['No Data'],
      datasets: [
        {
          data: filteredPerformanceReport.length > 0
            ? filteredPerformanceReport.map((item) => {
                const time = item.totalTalkTime || '00:00:00';
                const [hours, minutes, seconds] = time.split(':').map(Number);
                return (hours || 0) * 60 + (minutes || 0) + (seconds || 0) / 60;
              })
            : [0],
          color: () => '#87CEEB',
          strokeWidth: 2,
          label: 'Total Talk Time (in minutes)',
        },
      ],
      legend: ['Total Talk Time (in minutes)'],
    }),
    [users, filteredPerformanceReport]
  );

  const callsHistoryData = useMemo(
    () =>
      filteredPerformanceReport.length > 0
        ? filteredPerformanceReport.map((item) => {
            const nameParts = item.employeeName?.split(' ') || ['Unknown'];
            const firstName = nameParts[0]?.charAt(0).toUpperCase() + (nameParts[0]?.slice(1) || '');
            // Use full first name for the group label
            return {
              group: firstName || 'Unknown',
              values: [
                parseInt(item.totalCalls, 10) || 0,
                parseInt(item.connectedCalls, 10) || 0,
                parseInt(item.notConnectedCalls, 10) || 0,
              ],
              employeeId: item.empId || '',
              firstCall: item.firstCall || null,
              lastCall: item.lastCall || null,
            };
          })
        : [],
    [filteredPerformanceReport]
  );

  const barColors = ['#4e5bff', '#ffc24b', '#f5535d'];
  const barLabels = ['Total Calls', 'Connected Calls', 'Not Connected Calls'];

  const darkenColor = (hex, percent = 20) => {
    if (!hex) return '#000000';
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);

    r = Math.max(0, Math.round(r * (1 - percent / 100)));
    g = Math.max(0, Math.round(g * (1 - percent / 100)));
    b = Math.max(0, Math.round(b * (1 - percent / 100)));

    return `#${r.toString(16).padStart(2, '0')}${g
      .toString(16)
      .padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  const barData = useMemo(
    () =>
      callsHistoryData.flatMap((group, groupIndex) =>
        group.values.map((value, seriesIndex) => ({
          value: Number(value) || 0,
          svg: {
            fill: barColors[seriesIndex],
          },
          key: `${groupIndex}-${seriesIndex}`,
          group: group.group || 'No Data',
          xOffset: seriesIndex * 8,
          type: seriesIndex,
          employee: group.group || 'No Data',
        }))
      ),
    [callsHistoryData]
  );

  const barChartYLabels = useMemo(() => {
    const maxValue = Math.max(...barData.map((item) => item.value), 1);
    const step = Math.ceil(maxValue / 4);
    return Array.from({ length: 5 }, (_, i) => i * step);
  }, [barData]);

  const formatTime = (hours) => {
    if (!hours || isNaN(hours) || !isFinite(hours)) return '00:00';
    const h = Math.floor(Math.abs(hours));
    const m = Math.round(Math.abs(hours - h) * 60);
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  };

  const formatMinutes = (minutes) => {
    if (!minutes || isNaN(minutes) || !isFinite(minutes)) return '0 min';
    return `${Math.round(minutes)} min`;
  };

  // LineChart tooltip handler
  const handleLineChartClick = (data, chartType) => {
    if (!data || data.index == null || data.datasetIndex == null) return;

    const { value, index, datasetIndex, x, y } = data;
    const labels = chartType === 'callTime' ? callTimeData.labels : talkTimeData.labels;
    const datasets = chartType === 'callTime' ? callTimeData.datasets : talkTimeData.datasets;

    if (!labels || !datasets || index < 0 || index >= labels.length || datasetIndex < 0 || datasetIndex >= datasets.length) {
      return;
    }

    const user = labels[index] || 'No Data';
    const dataset = datasets[datasetIndex];

    if (!dataset) return;

    const label = dataset.label || 'Unknown';
    const displayValue = chartType === 'callTime' ? formatTime(value) : formatMinutes(value);
    const color = dataset.color ? dataset.color() : '#000000';

    const tooltipData = {
      visible: true,
      x: x - 50,
      y: y - 45,
      value: displayValue,
      label,
      user,
      color,
    };

    if (chartType === 'callTime') {
      setCallTimeTooltip(tooltipData);
      setTalkTimeTooltip({ visible: false, x: 0, y: 0, value: '', label: '', user: '', color: '#000000' });
    } else {
      setTalkTimeTooltip(tooltipData);
      setCallTimeTooltip({ visible: false, x: 0, y: 0, value: '', label: '', user: '', color: '#000000' });
    }
    setBarTooltip({ visible: false, x: 0, y: 0, value: null, label: '', employee: '', color: '#000000' });
  };

  // SVGBarChart PanResponder
  const barChartWidth = callsHistoryData.length ? callsHistoryData.length * 30 : 100;
  const barWidth = callsHistoryData.length ? barChartWidth / (callsHistoryData.length * 3) : 100;
  const barPercentage = 0.7;
  const effectiveBarWidth = barWidth * barPercentage;
  const spacing = (barWidth - effectiveBarWidth) / 2;
  const maxValue = barData.length ? Math.max(...barData.map((item) => item.value), 1) : 1;
  const yAxisOffset = 40;

  const barPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        if (!barData.length) {
          setBarTooltip({ visible: false, x: 0, y: 0, value: null, label: '', employee: '', color: '#000000' });
          return;
        }

        const touchX = gestureState.moveX - 20 - yAxisOffset;

        if (touchX < 0 || touchX > barChartWidth) {
          setBarTooltip({ visible: false, x: 0, y: 0, value: null, label: '', employee: '', color: '#000000' });
          return;
        }

        const index = Math.floor(touchX / barWidth);
        const barStart = (index * barWidth) + (index % 3) * 8 + spacing;
        const barEnd = barStart + effectiveBarWidth;

        if (touchX >= barStart && touchX <= barEnd && index < barData.length) {
          const item = barData[index];
          const barHeight = (item.value / maxValue) * (200 - 20);
          const x = 20 + yAxisOffset + (index / 3) * (barWidth * 3) + (index % 3) * 8 + barWidth / 2 - 50;
          const y = 200 - barHeight - 45;

          setBarTooltip({
            visible: true,
            x,
            y,
            value: item.value,
            label: barLabels[item.type],
            employee: item.employee,
            color: item.svg.fill,
          });
          setCallTimeTooltip({ visible: false, x: 0, y: 0, value: '', label: '', user: '', color: '#000000' });
          setTalkTimeTooltip({ visible: false, x: 0, y: 0, value: '', label: '', user: '', color: '#000000' });
        } else {
          setBarTooltip({ visible: false, x: 0, y: 0, value: null, label: '', employee: '', color: '#000000' });
        }
      },
      onPanResponderRelease: () => {
        setBarTooltip({ visible: false, x: 0, y: 0, value: null, label: '', employee: '', color: '#000000' });
      },
    })
  ).current;

  const handleViewCallList = (employeeId) => {
    if (!employeeId) return;
    setSelectedEmployeeId(employeeId);
    setPage(1);
    setShowCallHistoryModal(true);
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleEmployeeSelect = (employee) => {
    setSelectedUser(employee.label);
    setSelectedEmployeeId(employee.value);
    setShowUserDropdown(false);
    setShowDateDropdown(false);
  };

  const handleDateFilterChange = (value) => {
    setDateFilter(value);
    setShowDateDropdown(false);
    setShowUserDropdown(false);
    if (value !== 'range') {
      setStartDate(null);
      setEndDate(null);
    }
  };

  const handleDateChange = (event, date, type) => {
    if (type === 'start') {
      setShowStartDatePicker(false);
      if (date) setStartDate(date);
    } else {
      setShowEndDatePicker(false);
      if (date) setEndDate(date);
    }
  };

  const fetchPerformanceData = () => {
    const params = {
      employeeId: selectedEmployeeId,
      dateFilter: dateFilter !== 'range' ? dateFilter : null,
      startDate: dateFilter === 'range' && startDate ? startDate.toISOString().split('T')[0] : null,
      endDate: dateFilter === 'range' && endDate ? endDate.toISOString().split('T')[0] : null,
    };
    dispatch(fetchPerformanceReport(params)).then((result) => {
      if (!initialFetchDone) {
        setInitialFetchDone(true);
        if (!result.payload?.length && dateFilter === 'today') {
          Alert.alert(
            'No Data',
            'No performance data available for today. Please select a different date range.',
            [{ text: 'OK' }]
          );
        }
      } else if (!result.payload?.length && dateFilter === 'today') {
        Alert.alert(
          'No Data',
          'No performance data available for today. Please select a different date range.',
          [{ text: 'OK' }]
        );
      }
    });
  };

  const handleGo = () => {
    if (dateFilter === 'range' && (!startDate || !endDate)) {
      Alert.alert('Invalid Range', 'Please select both start and end dates for range filter.');
      return;
    }
    setShowFilters(false);
    fetchPerformanceData();
  };

  const handleReset = () => {
    setSelectedUser(null);
    setSelectedEmployeeId(null);
    setDateFilter('today');
    setStartDate(null);
    setEndDate(null);
    setInitialFetchDone(false);
    setShowFilters(false);
    fetchPerformanceData();
  };

  const handleRetry = () => {
    dispatch(fetchAllEmployees());
    fetchPerformanceData();
  };

  const handleSearchPress = () => {
    setShowFilters(!showFilters);
  };

  const chartConfig = {
    backgroundColor: '#fff',
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#ffa726',
      fill: '#ffa726',
    },
  };

  const callTimeAxisConfig = {
    ...chartConfig,
    formatYLabel: (value) => formatTime(parseFloat(value) || 0),
  };

  const talkTimeAxisConfig = {
    ...chartConfig,
    formatYLabel: (value) => formatMinutes(parseFloat(value) || 0),
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f3f4f6' }}>
      <Header
        title="Performance Report"
        showBackButton={true}
        showSearchButton={true}
        onSearchPress={handleSearchPress}
        titleFontSize={RFPercentage(3)}
      />

      {(perfLoading || empLoading) && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <Text style={{ fontSize: RFPercentage(2.2), color: '#4b5563', fontWeight: '500' }}>
            Loading performance data...
          </Text>
        </View>
      )}

      {(perfError || empError) && !perfLoading && !empLoading && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <Text style={{ fontSize: RFPercentage(2.2), color: '#ef4444', fontWeight: '500' }}>
            Error: {perfError || empError}
          </Text>
          <Text style={{ fontSize: RFPercentage(1.8), color: '#6b7280', fontWeight: '500', textAlign: 'center', marginVertical: 8 }}>
            Failed to fetch data. Please try again or contact support.
          </Text>
          <CustomButton
            buttonName="Retry"
            onPress={handleRetry}
            gradientColors={['#8290EA', '#3F4CA0']}
            height={40}
            width="30%"
          />
        </View>
      )}

      {!perfLoading && !empLoading && !perfError && !empError && (
        <ScrollView style={{ flex: 1, padding: 20 }}>
          {showFilters && (
            <>
              <View style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: RFPercentage(2.2), fontWeight: '500', color: '#000', marginBottom: 8 }}>
                  Select User
                </Text>
                <View style={{ backgroundColor: '#e5e7eb', borderRadius: 8, padding: 12, borderWidth: 1, borderColor: '#d1d5db' }}>
                  <Pressable
                    style={{
                      height: 40,
                      backgroundColor: '#fff',
                      borderWidth: 1,
                      borderColor: '#d1d5db',
                      borderRadius: 8,
                      paddingHorizontal: 12,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                    onPress={() => {
                      setShowUserDropdown(!showUserDropdown);
                      setShowDateDropdown(false);
                    }}
                  >
                    <Text style={{ fontSize: RFPercentage(1.8), color: '#000', flex: 1 }} numberOfLines={1}>
                      {selectedUser || 'Select Users'}
                    </Text>
                    <Icon
                      name={showUserDropdown ? 'arrow-drop-up' : 'arrow-drop-down'}
                      size={20}
                      color="#000"
                    />
                  </Pressable>
                  {showUserDropdown && (
                    <ScrollView
                      style={{
                        backgroundColor: '#fff',
                        borderRadius: 8,
                        borderWidth: 1,
                        borderColor: '#d1d5db',
                        marginTop: 8,
                        maxHeight: 144,
                      }}
                      nestedScrollEnabled
                    >
                      {employeesList.length > 0 ? (
                        employeesList.map((item) => (
                          <TouchableOpacity
                            key={item.value}
                            style={{ padding: 12, borderBottomWidth: 1, borderBottomColor: '#d1d5db' }}
                            onPress={() => handleEmployeeSelect(item)}
                          >
                            <Text style={{ fontSize: RFPercentage(1.8), color: '#000' }}>{item.label}</Text>
                          </TouchableOpacity>
                        ))
                      ) : (
                        <Text style={{ fontSize: RFPercentage(1.8), color: '#6b7280', fontWeight: '500', textAlign: 'center', padding: 12 }}>
                          No employees found
                        </Text>
                      )}
                    </ScrollView>
                  )}
                </View>
              </View>

              <View style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: RFPercentage(2.2), fontWeight: '500', color: '#000', marginBottom: 8 }}>
                  Select Date Filter
                </Text>
                <View style={{ backgroundColor: '#e5e7eb', borderRadius: 8, padding: 12, borderWidth: 1, borderColor: '#d1d5db' }}>
                  <Pressable
                    style={{
                      height: 40,
                      backgroundColor: '#fff',
                      borderWidth: 1,
                      borderColor: '#d1d5db',
                      borderRadius: 8,
                      paddingHorizontal: 12,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                    onPress={() => {
                      setShowDateDropdown(!showDateDropdown);
                      setShowUserDropdown(false);
                    }}
                  >
                    <Text style={{ fontSize: RFPercentage(1.8), color: '#000' }}>
                      {dateFilter === 'today'
                        ? 'Today'
                        : dateFilter === 'last7days'
                          ? 'Last 7 Days'
                          : dateFilter === 'last30days'
                            ? 'Last 30 Days'
                            : 'Range'}
                    </Text>
                    <Icon
                      name={showDateDropdown ? 'arrow-drop-up' : 'arrow-drop-down'}
                      size={20}
                      color="#000"
                    />
                  </Pressable>
                  {showDateDropdown && (
                    <ScrollView
                      style={{
                        backgroundColor: '#fff',
                        borderRadius: 8,
                        borderWidth: 1,
                        borderColor: '#d1d5db',
                        marginTop: 8,
                        maxHeight: 144,
                      }}
                      nestedScrollEnabled
                    >
                      <TouchableOpacity
                        style={{ padding: 12, borderBottomWidth: 1, borderBottomColor: '#d1d5db' }}
                        onPress={() => handleDateFilterChange('today')}
                      >
                        <Text style={{ fontSize: RFPercentage(1.8), fontWeight: '400' }}>Today</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{ padding: 12, borderBottomWidth: 1, borderBottomColor: '#d1d5db' }}
                        onPress={() => handleDateFilterChange('last7days')}
                      >
                        <Text style={{ fontSize: RFPercentage(1.8), fontWeight: '400' }}>Last 7 Days</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{ padding: 12, borderBottomWidth: 1, borderBottomColor: '#d1d5db' }}
                        onPress={() => handleDateFilterChange('last30days')}
                      >
                        <Text style={{ fontSize: RFPercentage(1.8), fontWeight: '400' }}>Last 30 Days</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{ padding: 12 }}
                        onPress={() => handleDateFilterChange('range')}
                      >
                        <Text style={{ fontSize: RFPercentage(1.8), fontWeight: '400' }}>Range</Text>
                      </TouchableOpacity>
                    </ScrollView>
                  )}
                  {dateFilter === 'range' && (
                    <View style={{ marginTop: 12 }}>
                      <Text style={{ fontSize: RFPercentage(1.8), fontWeight: '400', color: '#000' }}>Start Date</Text>
                      <Pressable onPress={() => setShowStartDatePicker(true)}>
                        <TextInput
                          style={{
                            height: 40,
                            backgroundColor: '#fff',
                            borderWidth: 1,
                            borderColor: '#d1d5db',
                            borderRadius: 8,
                            paddingHorizontal: 12,
                            marginTop: 4,
                            fontSize: RFPercentage(1.8),
                            color: '#000',
                          }}
                          value={startDate ? startDate.toISOString().split('T')[0] : ''}
                          placeholder="Select Start Date"
                          placeholderTextColor="#6b7280"
                          editable={false}
                        />
                      </Pressable>
                      {showStartDatePicker && (
                        <DateTimePicker
                          value={startDate || new Date()}
                          mode="date"
                          display="default"
                          onChange={(event, date) => handleDateChange(event, date, 'start')}
                          maximumDate={endDate || new Date()}
                        />
                      )}

                      <Text style={{ fontSize: RFPercentage(1.8), fontWeight: '400', color: '#000', marginTop: 8 }}>
                        End Date
                      </Text>
                      <Pressable onPress={() => setShowEndDatePicker(true)}>
                        <TextInput
                          style={{
                            height: 40,
                            backgroundColor: '#fff',
                            borderWidth: 1,
                            borderColor: '#d1d5db',
                            borderRadius: 8,
                            paddingHorizontal: 12,
                            marginTop: 4,
                            fontSize: RFPercentage(1.8),
                            color: '#000',
                          }}
                          value={endDate ? endDate.toISOString().split('T')[0] : ''}
                          placeholder="Select End Date"
                          placeholderTextColor="#6b7280"
                          editable={false}
                        />
                      </Pressable>
                      {showEndDatePicker && (
                        <DateTimePicker
                          value={endDate || new Date()}
                          mode="date"
                          display="default"
                          onChange={(event, date) => handleDateChange(event, date, 'end')}
                          minimumDate={startDate}
                          maximumDate={new Date()}
                        />
                      )}
                    </View>
                  )}
                </View>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
                <CustomButton
                  buttonName="Go"
                  onPress={handleGo}
                  gradientColors={['#8290EA', '#3F4CA0']}
                  height={40}
                  width="45%"
                />
                <CustomButton
                  buttonName="Reset"
                  onPress={handleReset}
                  gradientColors={['#FF6347', '#D32F2F']}
                  height={40}
                  width="45%"
                />
              </View>
            </>
          )}

          <Modal
            isVisible={showCallHistoryModal}
            onBackdropPress={() => {
              setShowCallHistoryModal(false);
              setSelectedEmployeeId(null);
              setPage(1);
              dispatch(resetCallHistory());
              StatusBar.setHidden(false);
            }}
            onModalShow={() => StatusBar.setHidden(true)}
            style={{ margin: 0 }}
            backdropColor="#000"
            backdropOpacity={0.5}
            avoidKeyboard={false}
          >
            <View style={{ flex: 1, width: '100%', height: '100%', backgroundColor: '#fff' }}>
              <CallHistoryDetailTable
                callHistory={callHistory}
                loading={callLoading}
                error={callError}
                currentPage={currentPage}
                totalPages={totalPages}
                totalRecords={totalRecords}
                onClose={() => {
                  setShowCallHistoryModal(false);
                  setSelectedEmployeeId(null);
                  setPage(1);
                  dispatch(resetCallHistory());
                  StatusBar.setHidden(false);
                }}
                onNextPage={handleNextPage}
                onPreviousPage={handlePreviousPage}
              />
            </View>
          </Modal>

          <View style={{ backgroundColor: '#fff', borderRadius: 8, padding: 12, marginVertical: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <Text style={{ fontSize: RFPercentage(2.2), fontWeight: '500', color: '#000' }}>
                USER FIRST & LAST CALLING TIME
              </Text>
              <Icon name="menu" size={20} color="#000" />
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{ position: 'relative' }}>
                <LineChart
                  data={callTimeData}
                  width={chartWidth}
                  height={220}
                  chartConfig={callTimeAxisConfig}
                  bezier
                  style={{ borderRadius: 16 }}
                  onDataPointClick={(data) => handleLineChartClick(data, 'callTime')}
                  withDots={true}
                  withInnerLines={true}
                  withOuterLines={true}
                  yAxisLabel=""
                  yAxisSuffix=""
                  segments={4}
                />
                {callTimeTooltip.visible && (
                  <View
                    style={[
                      styles.tooltipContainer,
                      {
                        top: callTimeTooltip.y,
                        left: callTimeTooltip.x,
                      },
                    ]}
                  >
                    <View style={styles.tooltip}>
                      <Text style={{ color: '#000', fontSize: RFPercentage(1.8) }}>
                        {callTimeTooltip.user}: {callTimeTooltip.label} - {callTimeTooltip.value}
                      </Text>
                    </View>
                    <View style={styles.tooltipPointer} />
                  </View>
                )}
              </View>
            </ScrollView>
          </View>

          <View style={{ backgroundColor: '#fff', borderRadius: 8, padding: 12, marginVertical: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <Text style={{ fontSize: RFPercentage(2.2), fontWeight: '500', color: '#000' }}>
                TOTAL TALK TIME DETAIL (In Minutes)
              </Text>
              <Icon name="menu" size={20} color="#000" />
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{ position: 'relative' }}>
                <LineChart
                  data={talkTimeData}
                  width={chartWidth}
                  height={220}
                  chartConfig={talkTimeAxisConfig}
                  bezier
                  style={{ borderRadius: 16 }}
                  onDataPointClick={(data) => handleLineChartClick(data, 'talkTime')}
                  withDots={true}
                  withInnerLines={true}
                  withOuterLines={true}
                  yAxisLabel=""
                  yAxisSuffix=""
                  segments={4}
                />
                {talkTimeTooltip.visible && (
                  <View
                    style={[
                      styles.tooltipContainer,
                      {
                        top: talkTimeTooltip.y,
                        left: talkTimeTooltip.x,
                      },
                    ]}
                  >
                    <View style={styles.tooltip}>
                      <Text style={{ color: '#000', fontSize: RFPercentage(1.8) }}>
                        {talkTimeTooltip.user}: {talkTimeTooltip.label} - {talkTimeTooltip.value}
                      </Text>
                    </View>
                    <View style={styles.tooltipPointer} />
                  </View>
                )}
              </View>
            </ScrollView>
          </View>

          <View style={{ backgroundColor: '#fff', borderRadius: 8, padding: 12, marginVertical: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <Text style={{ fontSize: RFPercentage(2.2), fontWeight: '500', color: '#000' }}>
                USER CALLS HISTORY DETAIL
              </Text>
              <Icon name="menu" size={20} color="#000" />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 12 }}>
              {barLabels.map((label, index) => (
                <TouchableOpacity key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View
                    style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: barColors[index], marginRight: 8 }}
                  />
                  <Text style={{ fontSize: RFPercentage(1.6), color: '#000' }}>{label}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{ flexDirection: 'row', width: chartWidth, position: 'relative' }}>
                <YAxis
                  data={barChartYLabels}
                  contentInset={{ top: 20, bottom: 20 }}
                  svg={{ fontSize: 10, fill: 'black', rotation: 0 }}
                  formatLabel={(value) => `${value}`}
                  style={{ marginRight: 10, height: 200 }}
                />
                <View style={{ flex: 1 }} {...barPanResponder.panHandlers}>
                  <SVGBarChart
                    style={{ height: 200 }}
                    data={barData}
                    yAccessor={({ item }) => item.value}
                    spacingInner={0.8}
                    spacingOuter={0.9}
                    contentInset={{ top: 20, bottom: 20 }}
                    gridMin={0}
                  >
                    {({ x, y, bandwidth, data }) =>
                      data.map((item, index) => (
                        <G key={item.key}>
                          <Rect
                            x={x(index / 3) + item.xOffset}
                            y={y(item.value)}
                            width={bandwidth / 6}
                            height={Math.max(0, 200 - y(item.value))}
                            fill={item.svg.fill}
                          />
                          <SVGText
                            x={x(index / 3) + item.xOffset + bandwidth / 12}
                            y={y(item.value) - 10}
                            fontSize={10}
                            fill="black"
                            textAnchor="middle"
                          >
                            {item.value}
                          </SVGText>
                        </G>
                      ))
                    }
                  </SVGBarChart>
                  {barTooltip.visible && (
                    <View
                      style={[
                        styles.tooltipContainer,
                        {
                          top: barTooltip.y,
                          left: barTooltip.x,
                        },
                      ]}
                    >
                      <View style={styles.tooltip}>
                        <Text style={{ color: '#000', fontSize: RFPercentage(1.8) }}>
                          {barTooltip.employee}: {barTooltip.label} - {barTooltip.value}
                        </Text>
                      </View>
                      <View style={styles.tooltipPointer} />
                    </View>
                  )}
                </View>
                <XAxis
                  style={{ marginTop: 10, height: 60 }} // Increased height for better label spacing
                  data={callsHistoryData}
                  formatLabel={(value, index) => {
                    const label = callsHistoryData[index]?.group || 'No Data';
                    // Truncate long names to prevent overlap
                    return label.length > 10 ? `${label.slice(0, 10)}...` : label;
                  }}
                  contentInset={{ left: 50, right: 50 }} // Increased inset for better edge spacing
                  svg={{
                    fontSize: 9, // Reduced font size for better fit
                    fill: 'black',
                    rotation: 45, // Rotate labels to prevent overlap
                    translateX: 10, // Adjusted for centering
                    translateY: 20, // Adjusted for vertical positioning
                    originX: 0,
                    originY: 0,
                  }}
                />
              </View>
            </ScrollView>

            <CallHistoryTable
              filteredCallsHistoryData={callsHistoryData}
              callTimeData={callTimeData}
              talkTimeData={talkTimeData}
              formatTime={formatTime}
              formatMinutes={formatMinutes}
              onViewCallList={handleViewCallList}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

// Tooltip styles
const styles = StyleSheet.create({
  tooltipContainer: {
    position: 'absolute',
    alignItems: 'center',
    zIndex: 999,
  },
  tooltip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  tooltipPointer: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#000',
    marginTop: -1,
  },
});

export default PerformanceReport;