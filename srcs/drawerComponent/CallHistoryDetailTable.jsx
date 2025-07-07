import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../component/Header'; // Assuming Header is in the same directory

const CallHistoryDetailTable = ({
  callHistory,
  loading,
  error,
  currentPage,
  totalPages,
  totalRecords,
  onClose,
  onNextPage,
  onPreviousPage,
}) => {
  // console.log('📋 CallHistoryDetailTable: Props received:', {
  //   callHistory,
  //   loading,
  //   error,
  //   currentPage,
  //   totalPages,
  //   totalRecords,
  // });

  if (loading) {
    // console.log('⏳ CallHistoryDetailTable: Rendering loading state');
    return (
      <SafeAreaView style={styles.container}>
        <Header
          title="Call History Details"
          showBackButton={true}
          onBackPress={onClose}
        />
        <View style={styles.centeredContent}>
          <Text style={styles.statusText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    // console.log('❌ CallHistoryDetailTable: Rendering error state:', error);
    return (
      <SafeAreaView style={styles.container}>
        <Header
          title="Call History Details"
          showBackButton={true}
          onBackPress={onClose}
        />
        <View style={styles.centeredContent}>
          <Text style={styles.statusText}>Error: {error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!callHistory || callHistory.length === 0) {
    console.log('⚠️ CallHistoryDetailTable: No call history data');
    return (
      <SafeAreaView style={styles.container}>
        <Header
          title="Call History Details"
          showBackButton={true}
          onBackPress={onClose}
        />
        <View style={styles.centeredContent}>
          <Text style={styles.statusText}>No call history available</Text>
        </View>
      </SafeAreaView>
    );
  }

  // console.log('✅ CallHistoryDetailTable: Rendering call history data');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Back Button */}
      <Header
        title="Call History Details"
        showBackButton={true}
        onBackPress={onClose}
      />

      {/* Table Content */}
      <ScrollView horizontal style={styles.scrollView}>
        <View style={styles.tableContainer}>
          {/* Table Header */}
          <View style={styles.tableHeaderRow}>
            <Text style={[styles.tableHeaderCell, { width: 120 }]}>NAME</Text>
            <Text style={[styles.tableHeaderCell, { width: 120 }]}>LEAD NAME</Text>
            <Text style={[styles.tableHeaderCell, { width: 100 }]}>LEAD ID</Text>
            <Text style={[styles.tableHeaderCell, { width: 120 }]}>CALL NUMBER</Text>
            <Text style={[styles.tableHeaderCell, { width: 100 }]}>DURATION</Text>
            <Text style={[styles.tableHeaderCell, { width: 100 }]}>CALL TYPE</Text>
          </View>

          {/* Table Rows */}
          {callHistory.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.tableRow,
                index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd,
              ]}
              activeOpacity={0.7}
            >
              <Text style={[styles.tableCell, { width: 120 }]} numberOfLines={1}>
                {item.name || 'N/A'}
              </Text>
              <Text style={[styles.tableCell, { width: 120 }]} numberOfLines={1}>
                {item.leadName || 'N/A'}
              </Text>
              <Text style={[styles.tableCell, { width: 100 }]} numberOfLines={1}>
                {item.leadId || 'N/A'}
              </Text>
              <Text style={[styles.tableCell, { width: 120 }]} numberOfLines={1}>
                {item.callNumber || 'N/A'}
              </Text>
              <Text style={[styles.tableCell, { width: 100 }]} numberOfLines={1}>
                {item.callDurationFormatted || '00:00:00'}
              </Text>
              <Text style={[styles.tableCell, { width: 100 }]} numberOfLines={1}>
                {item.callType || 'N/A'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Pagination */}
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          style={[styles.paginationButton, currentPage === 1 && styles.disabledButton]}
          onPress={() => {
            // console.log('⬅️ CallHistoryDetailTable: Previous page clicked');
            onPreviousPage();
          }}
          disabled={currentPage === 1}
        >
          <Text style={styles.paginationButtonText}>Previous</Text>
        </TouchableOpacity>
        <Text style={styles.paginationInfo}>
          Page {currentPage} of {totalPages} ({totalRecords} records)
        </Text>
        <TouchableOpacity
          style={[styles.paginationButton, currentPage === totalPages && styles.disabledButton]}
          onPress={() => {
            // console.log('➡️ CallHistoryDetailTable: Next page clicked');
            onNextPage();
          }}
          disabled={currentPage === totalPages}
        >
          <Text style={styles.paginationButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 0,
    padding: 0,
    width: '100%',
    height: '100%',
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    paddingHorizontal: 16,
    paddingTop: 16,
    marginBottom: 12,
  },
  scrollView: {
    flex: 1,
    marginHorizontal: 16,
  },
  tableContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#1e3a8a',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingVertical: 12,
  },
  tableHeaderCell: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    textTransform: 'uppercase',
    paddingHorizontal: 8,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingVertical: 10,
    alignItems: 'center',
  },
  tableRowEven: {
    backgroundColor: '#f8fafc',
  },
  tableRowOdd: {
    backgroundColor: '#ffffff',
  },
  tableCell: {
    fontSize: 14,
    color: '#374151',
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  paginationButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    minWidth: 80,
  },
  disabledButton: {
    backgroundColor: '#d1d5db',
  },
  paginationButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  paginationInfo: {
    fontSize: 14,
    color: '#4b5563',
    fontWeight: '500',
  },
  statusText: {
    fontSize: 18,
    color: '#4b5563',
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default CallHistoryDetailTable;