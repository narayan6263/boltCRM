import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CallListButton = ({ onPress, employeeId, accessible = true, accessibilityLabel = 'View call list' }) => {
  return (
    <TouchableOpacity
      style={styles.callListButton}
      onPress={() => {
        console.log('🔵 CallListButton: Clicked with employeeId:', employeeId);
        onPress(employeeId);
      }}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
    >
      <Text style={styles.callListButtonText}>Call List</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  callListButton: {
    backgroundColor: '#4682B4',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  callListButtonText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CallListButton;