import CallLogs from 'react-native-call-log';
import { format } from 'date-fns';
import { PermissionsAndroid, Platform } from 'react-native';

export const getLatestCallLog = async (phoneNumber) => {
  console.log('getLatestCallLog: Fetching call log for phoneNumber:', phoneNumber);

  if (!phoneNumber || phoneNumber === 'N/A') {
    console.warn('getLatestCallLog: Invalid or missing phoneNumber');
    return null;
  }

  // Check and request READ_CALL_LOG permission
  if (Platform.OS === 'android') {
    const permission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
      {
        title: 'Call Log Permission',
        message: 'This app needs access to your call logs to fetch call details.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );

    if (permission !== PermissionsAndroid.RESULTS.GRANTED) {
      console.warn('getLatestCallLog: READ_CALL_LOG permission denied');
      return null;
    }
  }

  // Helper function to normalize phone numbers for comparison
  const normalizePhoneNumber = (phone) => {
    if (!phone) return '';
    // Remove all non-digit characters except +
    let normalized = phone.replace(/[^\d+]/g, '');
    
    // Handle Indian numbers: if it starts with +91, remove it for comparison
    if (normalized.startsWith('+91')) {
      normalized = normalized.substring(3);
    }
    // If it starts with 91 and has 10+ digits, remove the 91
    else if (normalized.startsWith('91') && normalized.length >= 12) {
      normalized = normalized.substring(2);
    }
    
    // If it's a 10-digit number starting with 6-9, it's likely Indian
    if (normalized.length === 10 && /^[6-9]/.test(normalized)) {
      return normalized;
    }
    
    return normalized;
  };

  try {
    const logs = await CallLogs.loadAll();
    console.log('getLatestCallLog: Retrieved logs count:', logs.length);

    const cleanedPhoneNumber = normalizePhoneNumber(phoneNumber);
    console.log('getLatestCallLog: Normalized phoneNumber:', cleanedPhoneNumber);

    // Get the most recent logs first (last 20 calls)
    const recentLogs = logs
      .sort((a, b) => parseInt(b.timestamp) - parseInt(a.timestamp))
      .slice(0, 20);

    console.log('getLatestCallLog: Checking recent logs for matches...');
    
    const matchingLog = recentLogs.find((log) => {
      const logPhoneNumber = normalizePhoneNumber(log.phoneNumber);
      const isMatch = logPhoneNumber === cleanedPhoneNumber;
      
      // Validate timestamp before creating Date object
      let timestamp;
      try {
        timestamp = parseInt(log.timestamp);
        if (isNaN(timestamp) || timestamp <= 0) {
          console.warn('Invalid timestamp:', log.timestamp);
          return isMatch;
        }
      } catch (error) {
        console.warn('Error parsing timestamp:', error);
        return isMatch;
      }
      
      console.log('getLatestCallLog: Checking log', {
        originalLogPhone: log.phoneNumber,
        normalizedLogPhone: logPhoneNumber,
        normalizedSearchPhone: cleanedPhoneNumber,
        isMatch,
        timestamp: new Date(timestamp).toLocaleString(),
      });
      
      return isMatch;
    });

    if (!matchingLog) {
      console.warn('getLatestCallLog: No matching call log found for', phoneNumber);
      return null;
    }

    const durationInSeconds = matchingLog.duration ? parseInt(matchingLog.duration) : 0;
    const durationInMinutes = (durationInSeconds / 60).toFixed(2);
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    const formattedDuration = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    const callType = matchingLog.type?.toUpperCase() || 'UNKNOWN';
    const callStatus = callType === 'OUTGOING' && durationInSeconds > 0 ? 'Connected' : 'Rejected';

    // Safe date handling
    let startDate, endDate;
    try {
      const timestamp = parseInt(matchingLog.timestamp);
      if (!isNaN(timestamp) && timestamp > 0) {
        startDate = new Date(timestamp);
        // Ensure endDate is calculated correctly from duration
        endDate = new Date(timestamp + (durationInSeconds * 1000));
        
        // Validate dates
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
          throw new Error('Invalid date range');
        }
      } else {
        throw new Error('Invalid timestamp');
      }
    } catch (error) {
      console.warn('Error processing dates:', error);
      // Use current date as fallback
      startDate = new Date();
      endDate = new Date();
    }

    const callLog = {
      phoneNumber: matchingLog.phoneNumber || phoneNumber,
      callType: callType === 'OUTGOING' ? 'Outgoing' : 'Unknown',
      callDuration: durationInMinutes,
      formattedDuration,
      callStatus,
      callSid: '',
      callStartTime: startDate.toISOString(), // Ensure ISO string
      callEndTime: endDate.toISOString(), // Ensure ISO string
    };

    console.log('getLatestCallLog: Returning call log:', JSON.stringify(callLog, null, 2));
    return callLog;
  } catch (error) {
    console.error('getLatestCallLog: Error fetching call logs:', error);
    return null;
  }
};