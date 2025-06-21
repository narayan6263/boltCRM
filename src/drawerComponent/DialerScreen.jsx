
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Linking,
  Alert,
  Modal,
  Dimensions,
  Platform,
  PermissionsAndroid,
  AppState,
  ScrollView,
} from 'react-native';
import { Phone, Delete } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchContacts, clearSearchContacts } from '../redux/slices/getAllSearchContact';
import debounce from 'lodash.debounce';

const { height } = Dimensions.get('window');

const buttonLayout = [
  [['1', ''], ['2', 'ABC'], ['3', 'DEF']],
  [['4', 'GHI'], ['5', 'JKL'], ['6', 'MNO']],
  [['7', 'PQRS'], ['8', 'TUV'], ['9', 'WXYZ']],
  [['*', ''], ['0', '+'], ['#', '']],
];

const DialerScreen = ({ visible, onClose, navigation }) => {
  const [contactSearchQuery, setContactSearchQuery] = useState('');
  const [callInitiated, setCallInitiated] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const appState = useRef(AppState.currentState);
  const dispatch = useDispatch();

  // Redux selectors for contact search
  const { searchContacts = [], loading: contactsLoading, error: contactsError } = useSelector(
    (state) => state.searchContact || {}
  );

  // Debounced search for contacts
  const debouncedSearch = useRef(
    debounce((query) => {
      console.log('DialerScreen: Debounced search triggered with query:', query);
      if (query.trim()) {
        dispatch(fetchSearchContacts(query));
      } else {
        dispatch(clearSearchContacts());
      }
    }, 600)
  ).current;

  useEffect(() => {
    return () => {
      console.log('DialerScreen: Cleaning up debouncedSearch');
      debouncedSearch.cancel();
      dispatch(clearSearchContacts());
    };
  }, [debouncedSearch, dispatch]);

  // Handle AppState changes to detect call end
  useEffect(() => {
    console.log('DialerScreen: Initialized with contactSearchQuery:', contactSearchQuery);

    const handleAppStateChange = (nextAppState) => {
      console.log('DialerScreen: AppState changed to', nextAppState);
      if (
        callInitiated &&
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('DialerScreen: Call ended, navigating to ContactFeedbackForm with:', {
          phoneNumber: selectedContact?.phone || contactSearchQuery,
          contact: selectedContact || { phone: contactSearchQuery },
        });
        setCallInitiated(false);
        onClose();
        navigation.navigate('ContactFeedbackForm', {
          phoneNumber: selectedContact?.phone || contactSearchQuery,
          contact: selectedContact || { phone: contactSearchQuery },
        });
      }
      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => {
      console.log('DialerScreen: Cleaning up AppState listener');
      subscription.remove();
    };
  }, [callInitiated, navigation, onClose, contactSearchQuery, selectedContact]);

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
      console.log('DialerScreen: Call permission result', granted);
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (error) {
      console.error('DialerScreen: Permission error', error);
      Alert.alert('Error', 'Failed to request call permission.');
      return false;
    }
  };

  const handlePress = (digit) => {
    const newQuery = contactSearchQuery + digit;
    setContactSearchQuery(newQuery);
    debouncedSearch(newQuery);
    console.log('DialerScreen: Digit pressed', digit, 'New query:', newQuery);
  };

  const handleDelete = () => {
    const newQuery = contactSearchQuery.slice(0, -1);
    setContactSearchQuery(newQuery);
    debouncedSearch(newQuery);
    console.log('DialerScreen: Deleted last digit, New query:', newQuery);
  };

  const handleCall = async () => {
    const numberToCall = selectedContact?.phone || contactSearchQuery;
    if (!numberToCall.trim()) {
      console.warn('DialerScreen: No phone number provided');
      Alert.alert('Error', 'Please enter a phone number.');
      return;
    }

    const hasPermission = await requestCallPermission();
    if (!hasPermission) {
      console.warn('DialerScreen: Call permission denied');
      Alert.alert('Error', 'Call permission denied.');
      return;
    }

    const cleanedPhoneNumber = numberToCall.replace(/[\s()-]/g, '');
    const url = `tel:${cleanedPhoneNumber}`;
    console.log('DialerScreen: Attempting to open dialer with', url);

    try {
      setCallInitiated(true);
      onClose();
      await Linking.openURL(url);
      console.log('DialerScreen: Dialer opened successfully');
    } catch (err) {
      console.error('DialerScreen: Error opening dialer', err);
      setCallInitiated(false);
      Alert.alert(
        'Error',
        'Unable to open phone dialer. Please check if your device supports phone calls or try again.'
      );
    }
  };

  const handleCloseModal = () => {
    console.log('DialerScreen: onClose triggered');
    setContactSearchQuery('');
    setSelectedContact(null);
    dispatch(clearSearchContacts());
    onClose();
  };

  const renderContactSearch = () => (
    <View style={{ marginBottom: 12 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 8,
          backgroundColor: 'white',
          paddingHorizontal: 10,
        }}
      >
        <TextInput
          placeholder="Enter or search phone number"
          value={contactSearchQuery}
          onChangeText={(text) => {
            console.log('DialerScreen: Contact search query updated:', text);
            setContactSearchQuery(text);
            debouncedSearch(text);
            setSelectedContact(null);
          }}
          style={{
            flex: 1,
            padding: 10,
            fontSize: 16,
          }}
          keyboardType="phone-pad"
        />
        {contactSearchQuery && (
          <TouchableOpacity onPress={handleDelete}>
            <Delete color="#444" size={24} />
          </TouchableOpacity>
        )}
      </View>
      {contactsLoading ? (
        <Text style={{ padding: 8, fontSize: 14, color: '#666' }}>Loading contacts...</Text>
      ) : contactsError ? (
        <Text style={{ padding: 8, fontSize: 14, color: 'red' }}>
          Failed to load contacts: {contactsError}
        </Text>
      ) : searchContacts.length > 0 && contactSearchQuery ? (
        <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginTop: 4, maxHeight: 120 }}>
          <ScrollView>
            {searchContacts.map((item, index) => (
              <TouchableOpacity
                key={item._id || `contact-${index}`}
                onPress={() => {
                  console.log('DialerScreen: Selected contact:', item);
                  setSelectedContact({
                    name: item.name || '',
                    email: item.email || '',
                    phone: item.phone || contactSearchQuery,
                  });
                  setContactSearchQuery(item.phone || contactSearchQuery);
                  dispatch(clearSearchContacts());
                }}
                style={{ padding: 8 }}
              >
                <Text style={{ fontSize: 14, color: '#000' }}>
                  {item.name || 'Unknown'} ({item.phone})
                </Text>
                {item.email && <Text style={{ fontSize: 12, color: '#666' }}>{item.email}</Text>}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      ) : contactSearchQuery && !searchContacts.length ? (
        <Text style={{ padding: 8, fontSize: 14, color: '#666' }}>No matching contacts</Text>
      ) : null}
    </View>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleCloseModal}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={handleCloseModal}
        style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              height: height * 0.65,
              backgroundColor: '#f5f5f5',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              paddingHorizontal: 16,
              paddingVertical: 12,
            }}
          >
            <SafeAreaView style={{ flex: 1, justifyContent: 'space-between' }}>
              {renderContactSearch()}
              <View style={{ marginTop: 8 }}>
                {buttonLayout.map((row, i) => (
                  <View
                    key={i}
                    style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 12 }}
                  >
                    {row.map(([num, letters], j) => (
                      <TouchableOpacity
                        key={j}
                        onPress={() => handlePress(num)}
                        style={{
                          width: 64,
                          height: 64,
                          marginHorizontal: 8,
                          borderRadius: 32,
                          backgroundColor: '#444',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>{num}</Text>
                        {letters !== '' && (
                          <Text style={{ color: '#ccc', fontSize: 12 }}>{letters}</Text>
                        )}
                      </TouchableOpacity>
                    ))}
                  </View>
                ))}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 12,
                  paddingHorizontal: 16,
                }}
              >
                <TouchableOpacity
                  onPress={handleCloseModal}
                  style={{
                    backgroundColor: '#e0e0e0',
                    borderRadius: 8,
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                  }}
                >
                  <Text style={{ color: '#007aff', fontSize: 16, fontWeight: '600' }}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleCall}
                  style={{
                    backgroundColor: 'green',
                    borderRadius: 32,
                    padding: 14,
                  }}
                >
                  <Phone color="white" size={28} />
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default DialerScreen;