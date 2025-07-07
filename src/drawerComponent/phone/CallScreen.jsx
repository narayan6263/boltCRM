import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
  PermissionsAndroid,
  Linking,
  AppState,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import styles from './styles';

const CallScreen = ({ route, navigation }) => {
  const { phoneNumber: initialPhoneNumber = '', leadId, sourceScreen } = route.params || {};
  const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber);
  const [callInitiated, setCallInitiated] = useState(false); // Track if call was initiated
  const [isActionLoading, setIsActionLoading] = useState(false); // Add loading state for actions
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    console.log('CallScreen: Initialized with params', { phoneNumber: initialPhoneNumber, leadId });

    const handleAppStateChange = (nextAppState) => {
      console.log('CallScreen: AppState changed to', nextAppState);
      if (
        callInitiated && // Only navigate if a call was initiated
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active' &&
        navigation.isFocused()
      ) {
        console.log('CallScreen: Navigating to FeedbackScreen', { phoneNumber, leadId });
        setCallInitiated(false); // Reset call state
        navigation.navigate('FeedbackScreen', { phoneNumber, leadId, sourceScreen });
      }
      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => {
      console.log('CallScreen: Cleaning up AppState listener');
      subscription.remove();
    };
  }, [navigation, phoneNumber, leadId, callInitiated, sourceScreen]);

  const requestCallPermission = async () => {
    if (Platform.OS !== 'android') return true;
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CALL_PHONE,
        {
          title: 'Call Permission',
          message: 'This app needs permission to make calls.',
          buttonPositive: 'OK',
        }
      );
      console.log('CallScreen: Call permission result', granted);
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (error) {
      console.error('CallScreen: Permission error', error);
      Alert.alert('Error', 'Failed to request call permission.');
      return false;
    }
  };

  const handleCall = async () => {
    // Prevent multiple rapid clicks
    if (isActionLoading) {
      console.log('CallScreen: Action already in progress, ignoring click');
      return;
    }

    if (!phoneNumber.trim()) {
      console.warn('CallScreen: No phone number provided');
      Alert.alert('Error', 'Please enter a phone number.');
      return;
    }

    const phoneRegex = /^[0-9+\-\s()]{7,15}$/;
    if (!phoneRegex.test(phoneNumber)) {
      console.warn('CallScreen: Invalid phone number', phoneNumber);
      Alert.alert('Error', 'Please enter a valid phone number.');
      return;
    }

    setIsActionLoading(true);
    try {
      const cleanedPhoneNumber = phoneNumber.replace(/\s/g, '');
      const telUrl = `tel:${cleanedPhoneNumber}`;
      const hasPermission = await requestCallPermission();
      if (!hasPermission) {
        console.warn('CallScreen: Call permission denied');
        Alert.alert('Error', 'Call permission denied.');
        return;
      }

      console.log('CallScreen: Initiating call to', telUrl);
      setCallInitiated(true); // Mark call as initiated
      await Linking.openURL(telUrl);
    } catch (error) {
      console.error('CallScreen: Error initiating call', error);
      setCallInitiated(false); // Reset if call fails
      Alert.alert('Error', 'Failed to make call.');
    } finally {
      setTimeout(() => {
        setIsActionLoading(false);
      }, 500);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Make a Call</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Phone Number"
        value={phoneNumber}
        onChangeText={(text) => {
          console.log('CallScreen: Phone number updated', text);
          setPhoneNumber(text);
        }}
        keyboardType="phone-pad"
        autoCapitalize="none"
        maxLength={15}
      />
      <TouchableOpacity 
        style={[
          styles.callButton, 
          { opacity: isActionLoading ? 0.5 : 1 }
        ]} 
        onPress={handleCall}
        disabled={isActionLoading}
      >
        <Ionicons name="call" size={20} color="white" style={styles.icon} />
        <Text style={styles.buttonText}>Call</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CallScreen;