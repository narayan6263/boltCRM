// // // src/screens/MapScreen.js
// // import React, { useEffect, useState, useRef } from 'react';
// // import {
// //   StyleSheet,
// //   View,
// //   Text,
// //   TouchableOpacity,
// //   ScrollView,
// //   Dimensions,
// //   Alert,
// //   Platform,
// //   PermissionsAndroid,
// // } from 'react-native';
// // import MapView, { Marker, Circle, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
// // import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// // import { RFPercentage } from 'react-native-responsive-fontsize';
// // import { useNavigation } from '@react-navigation/native';
// // import Ionicons from 'react-native-vector-icons/Ionicons';
// // import Geolocation from '@react-native-community/geolocation';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import io from 'socket.io-client';

// // const { width } = Dimensions.get('window');

// // // Fixed socket URL - removed /Api/ from the URL
// // const SOCKET_URL = 'http://20.41.121.191:5151';

// // // Fallback location for testing (Mumbai, India)
// // const FALLBACK_LOCATION = {
// //   latitude: 19.0760,
// //   longitude: 72.8777,
// //   latitudeDelta: 0.01,
// //   longitudeDelta: 0.01,
// // };

// // const MapScreen = () => {
// //   const navigation = useNavigation();
// //   const socketRef = useRef(null);
// //   const mapRef = useRef(null);
// //   const [location, setLocation] = useState(null);
// //   const [coordinates, setCoordinates] = useState([]);
// //   const [isLocationEnabled, setIsLocationEnabled] = useState(false);
// //   const [locationAccuracy, setLocationAccuracy] = useState(null);
// //   const [socketConnected, setSocketConnected] = useState(false);
// //   const [socketError, setSocketError] = useState(null);
// //   const [socketAttempts, setSocketAttempts] = useState(0);
// //   const [orgUuid, setOrgUuid] = useState(null);
// //   const [employeeId, setEmployeeId] = useState(null);
// //   const [lastSentCoordinates, setLastSentCoordinates] = useState(null);
// //   const [socketMessages, setSocketMessages] = useState([]);
// //   const [locationTimeout, setLocationTimeout] = useState(false);
// //   const [usingFallbackLocation, setUsingFallbackLocation] = useState(false);
// //   const [locationRetryCount, setLocationRetryCount] = useState(0);
// //   const maxRetries = 3;

// //   // Fetch orgId and empId from AsyncStorage
// //   const fetchCredentials = async () => {
// //     try {
// //       const orgId = await AsyncStorage.getItem('orgId');
// //       const empId = await AsyncStorage.getItem('empId');
// //       console.log('🆔 Fetched from AsyncStorage:', { orgId, empId });

// //       if (!orgId || !empId) {
// //         setSocketError('Missing organization UUID or employee ID. Please log in.');
// //         navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
// //         return false;
// //       }

// //       setOrgUuid(orgId);
// //       setEmployeeId(empId);
// //       return true;
// //     } catch (err) {
// //       console.error('❌ Error fetching AsyncStorage:', err);
// //       setSocketError('Failed to retrieve credentials.');
// //       navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
// //       return false;
// //     }
// //   };

// //   // Request location permission
// //   const requestLocationPermission = async () => {
// //     if (Platform.OS === 'android') {
// //       try {
// //         const granted = await PermissionsAndroid.request(
// //           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
// //           {
// //             title: 'Location Permission',
// //             message: 'This app needs access to your location for tracking.',
// //             buttonNeutral: 'Ask Me Later',
// //             buttonNegative: 'Cancel',
// //             buttonPositive: 'OK',
// //           }
// //         );
// //         if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
// //           Alert.alert('Permission Denied', 'Location permission is required.');
// //           return false;
// //         }
// //         return true;
// //       } catch (err) {
// //         console.warn(err);
// //         return false;
// //       }
// //     }
// //     return true; // iOS handles permission via Info.plist
// //   };

// //   // Initialize Socket.IO connection
// //   const initializeSocket = () => {
// //     if (!orgUuid || !employeeId) {
// //       setSocketError('Cannot initialize socket: Missing credentials.');
// //       return;
// //     }

// //     try {
// //       console.log('🔌 Attempting to connect to socket:', SOCKET_URL);
// //       console.log('📋 Using credentials:', { orgUuid, employeeId });

// //       socketRef.current = io(SOCKET_URL, {
// //         timeout: 15000, // Increased timeout
// //         reconnection: true,
// //         reconnectionAttempts: 10, // Increased attempts
// //         reconnectionDelay: 2000, // Increased delay
// //         transports: ['websocket', 'polling'],
// //         forceNew: true, // Force new connection
// //       });

// //       socketRef.current.on('connect', () => {
// //         console.log('✅ Socket connected successfully');
// //         console.log('🆔 Socket ID:', socketRef.current.id);
// //         setSocketConnected(true);
// //         setSocketError(null);
// //         setSocketAttempts(0);

// //         // Join room with credentials
// //         const joinData = { org_uuid: orgUuid, employeeId };
// //         socketRef.current.emit('joinRoom', joinData);
// //         console.log('🏠 Joined room with:', joinData);
        
// //         // Add to socket messages
// //         setSocketMessages(prev => [...prev, `Connected to socket: ${socketRef.current.id}`]);
// //       });

// //       socketRef.current.on('disconnect', (reason) => {
// //         console.log('❌ Socket disconnected:', reason);
// //         setSocketConnected(false);
// //         setSocketError(`Disconnected: ${reason}`);
// //         setSocketMessages(prev => [...prev, `Disconnected: ${reason}`]);
// //       });

// //       socketRef.current.on('connect_error', (error) => {
// //         console.log('❌ Socket connection error:', error);
// //         setSocketConnected(false);
// //         setSocketError(`Connection failed: ${error.message}`);
// //         setSocketAttempts(prev => prev + 1);
// //         setSocketMessages(prev => [...prev, `Connection error: ${error.message}`]);
// //       });

// //       socketRef.current.on('reconnect', (attemptNumber) => {
// //         console.log('🔄 Socket reconnected after', attemptNumber, 'attempts');
// //         setSocketConnected(true);
// //         setSocketError(null);
// //         setSocketMessages(prev => [...prev, `Reconnected after ${attemptNumber} attempts`]);
// //       });

// //       socketRef.current.on('reconnect_error', (error) => {
// //         console.log('❌ Socket reconnection error:', error);
// //         setSocketConnected(false);
// //         setSocketError(`Reconnection failed: ${error.message}`);
// //         setSocketMessages(prev => [...prev, `Reconnection error: ${error.message}`]);
// //       });

// //       socketRef.current.on('coordinateSaved', (data) => {
// //         console.log('📍 Coordinate saved via socket:', data);
// //         setCoordinates((prev) => [...prev, data]);
// //         setSocketMessages(prev => [...prev, `Coordinate saved: ${JSON.stringify(data)}`]);
// //       });

// //       socketRef.current.on('locationUpdate', (data) => {
// //         console.log('📍 Location update received:', data);
// //         setSocketMessages(prev => [...prev, `Location update: ${JSON.stringify(data)}`]);
// //       });

// //       socketRef.current.on('message', (data) => {
// //         console.log('📨 Socket message received:', data);
// //         setSocketMessages(prev => [...prev, `Message: ${JSON.stringify(data)}`]);
// //       });

// //       socketRef.current.on('error', (error) => {
// //         console.log('❌ Socket error event:', error);
// //         setSocketMessages(prev => [...prev, `Error: ${JSON.stringify(error)}`]);
// //       });

// //     } catch (error) {
// //       console.error('❌ Socket initialization error:', error);
// //       setSocketConnected(false);
// //       setSocketError(`Initialization error: ${error.message}`);
// //       setSocketMessages(prev => [...prev, `Init error: ${error.message}`]);
// //     }
// //   };

// //   // Send coordinates to socket with enhanced logging
// //   const sendCoordinatesToSocket = (latitude, longitude) => {
// //     if (socketRef.current && socketConnected && orgUuid && employeeId) {
// //       const coordinateData = {
// //         lat: latitude,
// //         lng: longitude,
// //         org_uuid: orgUuid,
// //         employeeId,
// //         timestamp: new Date().toISOString(),
// //         accuracy: locationAccuracy,
// //         speed: null, // Will be added if available
// //         heading: null, // Will be added if available
// //         isFallback: usingFallbackLocation, // Flag to indicate if this is fallback location
// //       };

// //       console.log('📤 Sending coordinates to socket:');
// //       console.log('📍 Latitude:', latitude);
// //       console.log('📍 Longitude:', longitude);
// //       console.log('🆔 Org UUID:', orgUuid);
// //       console.log('👤 Employee ID:', employeeId);
// //       console.log('⏰ Timestamp:', coordinateData.timestamp);
// //       console.log('🎯 Accuracy:', locationAccuracy);
// //       console.log('🔄 Is Fallback:', usingFallbackLocation);
// //       console.log('📊 Full data:', coordinateData);

// //       socketRef.current.emit('sendCoordinates', coordinateData);
      
// //       // Also try alternative event names
// //       socketRef.current.emit('locationUpdate', coordinateData);
// //       socketRef.current.emit('updateLocation', coordinateData);
      
// //       setLastSentCoordinates(coordinateData);
// //       setSocketMessages(prev => [...prev, `Sent coordinates: ${latitude}, ${longitude}${usingFallbackLocation ? ' (FALLBACK)' : ''}`]);
      
// //       console.log('✅ Coordinates sent successfully via socket');
// //     } else {
// //       console.log('⚠️ Cannot send coordinates:');
// //       console.log('🔌 Socket ref exists:', !!socketRef.current);
// //       console.log('🔗 Socket connected:', socketConnected);
// //       console.log('🆔 Org UUID exists:', !!orgUuid);
// //       console.log('👤 Employee ID exists:', !!employeeId);
// //       setSocketMessages(prev => [...prev, 'Failed to send coordinates - socket not ready']);
// //     }
// //   };

// //   // Use fallback location for testing
// //   const useFallbackLocation = () => {
// //     console.log('🔄 Using fallback location for testing');
// //     setLocation(FALLBACK_LOCATION);
// //     setLocationAccuracy(100); // Set a default accuracy
// //     setIsLocationEnabled(true);
// //     setLocationTimeout(false);
// //     setUsingFallbackLocation(true);
    
// //     // Send fallback coordinates to socket
// //     sendCoordinatesToSocket(FALLBACK_LOCATION.latitude, FALLBACK_LOCATION.longitude);
    
// //     setSocketMessages(prev => [...prev, 'Using fallback location (Mumbai, India)']);
// //   };

// //   // Check if location services are enabled with better error handling
// //   const checkLocationServices = () => {
// //     console.log('🔍 Checking location services...');
// //     setLocationTimeout(false);
    
// //     Geolocation.getCurrentPosition(
// //       (position) => {
// //         setIsLocationEnabled(true);
// //         setLocationTimeout(false);
// //         setUsingFallbackLocation(false);
// //         console.log('✅ Location services are enabled');
// //         setSocketMessages(prev => [...prev, 'Location services enabled']);
// //       },
// //       (error) => {
// //         console.log('❌ Location services error:', error);
// //         setSocketMessages(prev => [...prev, `Location error: ${error.message}`]);
        
// //         if (error.code === 3) { // TIMEOUT
// //           setLocationTimeout(true);
// //           if (locationRetryCount < maxRetries) {
// //             Alert.alert(
// //               'Location Timeout',
// //               `GPS signal is weak or unavailable. Attempt ${locationRetryCount + 1}/${maxRetries}\n\nPlease:\n1. Move to an open area\n2. Enable GPS in settings\n3. Wait a few seconds and try again\n\nOr use fallback location for testing.`,
// //               [
// //                 { text: 'Use Fallback', onPress: useFallbackLocation },
// //                 { text: 'Retry', onPress: () => {
// //                   setLocationRetryCount(prev => prev + 1);
// //                   checkLocationServices();
// //                 }},
// //                 { text: 'Cancel', style: 'cancel' }
// //               ]
// //             );
// //           } else {
// //             Alert.alert(
// //               'Location Unavailable',
// //               'GPS signal could not be obtained after multiple attempts.\n\nWould you like to use a fallback location for testing?',
// //               [
// //                 { text: 'Use Fallback', onPress: useFallbackLocation },
// //                 { text: 'Cancel', style: 'cancel' }
// //               ]
// //             );
// //           }
// //         } else if (error.code === 1) { // PERMISSION_DENIED
// //           Alert.alert(
// //             'Location Permission Required',
// //             'Please enable location permissions in your device settings.',
// //             [{ text: 'OK' }]
// //           );
// //         } else if (error.code === 2) { // POSITION_UNAVAILABLE
// //           Alert.alert(
// //             'Location Unavailable',
// //             'GPS signal is not available. Please check your GPS settings.',
// //             [{ text: 'OK' }]
// //           );
// //         }
// //       },
// //       { 
// //         enableHighAccuracy: true, 
// //         timeout: 30000, // Increased timeout to 30 seconds
// //         maximumAge: 60000 // Increased maximum age to 1 minute
// //       }
// //     );
// //   };

// //   // Center map on user location
// //   const centerOnUserLocation = () => {
// //     if (location && mapRef.current) {
// //       mapRef.current.animateToRegion({
// //         latitude: location.latitude,
// //         longitude: location.longitude,
// //         latitudeDelta: 0.01,
// //         longitudeDelta: 0.01,
// //       }, 1000);
// //       console.log('🗺️ Centered map on user location:', location);
// //     }
// //   };

// //   // Reconnect socket manually
// //   const reconnectSocket = () => {
// //     if (socketRef.current) {
// //       socketRef.current.disconnect();
// //     }
// //     setSocketError(null);
// //     setSocketAttempts(0);
// //     setSocketMessages(prev => [...prev, 'Manual reconnection initiated']);
// //     initializeSocket();
// //   };

// //   // Clear socket messages
// //   const clearSocketMessages = () => {
// //     setSocketMessages([]);
// //   };

// //   // Retry location with different settings
// //   const retryLocation = () => {
// //     console.log('🔄 Retrying location with different settings...');
// //     setLocationTimeout(false);
// //     setLocationRetryCount(prev => prev + 1);
    
// //     Geolocation.getCurrentPosition(
// //       (position) => {
// //         const { latitude, longitude, accuracy, speed, heading } = position.coords;
// //         setLocation({ latitude, longitude });
// //         setLocationAccuracy(accuracy);
// //         setIsLocationEnabled(true);
// //         setLocationTimeout(false);
// //         setUsingFallbackLocation(false);
// //         setLocationRetryCount(0); // Reset retry count on success
// //         console.log('📍 Location obtained on retry:', { 
// //           latitude, 
// //           longitude, 
// //           accuracy,
// //           speed,
// //           heading 
// //         });
// //         sendCoordinatesToSocket(latitude, longitude);
// //       },
// //       (error) => {
// //         console.error('❌ Retry location error:', error);
// //         setSocketMessages(prev => [...prev, `Retry error: ${error.message}`]);
// //         setLocationTimeout(true);
        
// //         if (locationRetryCount >= maxRetries) {
// //           Alert.alert(
// //             'Location Failed',
// //             'Unable to get location after multiple attempts. Use fallback location?',
// //             [
// //               { text: 'Use Fallback', onPress: useFallbackLocation },
// //               { text: 'Cancel', style: 'cancel' }
// //             ]
// //           );
// //         }
// //       },
// //       { 
// //         enableHighAccuracy: false, // Try with lower accuracy
// //         timeout: 60000, // 1 minute timeout
// //         maximumAge: 300000 // 5 minutes maximum age
// //       }
// //     );
// //   };

// //   // Initialize everything
// //   useEffect(() => {
// //     let watchId;

// //     const initialize = async () => {
// //       console.log('🚀 Initializing MapScreen...');
      
// //       // Fetch credentials first
// //       const hasCredentials = await fetchCredentials();
// //       if (!hasCredentials) return;

// //       // Request location permission
// //       const hasPermission = await requestLocationPermission();
// //       if (!hasPermission) {
// //         setIsLocationEnabled(false);
// //         return;
// //       }

// //       // Check location services
// //       checkLocationServices();

// //       // Initialize Socket.IO
// //       initializeSocket();

// //       // Get current location with better error handling
// //       Geolocation.getCurrentPosition(
// //         (position) => {
// //           const { latitude, longitude, accuracy, speed, heading } = position.coords;
// //           setLocation({ latitude, longitude });
// //           setLocationAccuracy(accuracy);
// //           setIsLocationEnabled(true);
// //           setLocationTimeout(false);
// //           setUsingFallbackLocation(false);
// //           setLocationRetryCount(0);
// //           console.log('📍 Initial location obtained:', { 
// //             latitude, 
// //             longitude, 
// //             accuracy,
// //             speed,
// //             heading 
// //           });

// //           sendCoordinatesToSocket(latitude, longitude);
// //         },
// //         (error) => {
// //           console.error('❌ Geolocation error:', error);
// //           console.log('❌ Geolocation error code:', error.code);
// //           console.log('❌ Geolocation error message:', error.message);
// //           setSocketMessages(prev => [...prev, `Geolocation error: ${error.message}`]);
          
// //           if (error.code === 3) { // TIMEOUT
// //             setLocationTimeout(true);
// //             setLocationRetryCount(prev => prev + 1);
// //             Alert.alert(
// //               'Location Timeout',
// //               'Unable to get your location. This might be due to:\n\n• Weak GPS signal\n• Being indoors\n• GPS being disabled\n\nWould you like to use a fallback location for testing?',
// //               [
// //                 { text: 'Use Fallback', onPress: useFallbackLocation },
// //                 { text: 'Retry', onPress: retryLocation },
// //                 { text: 'Cancel', style: 'cancel' }
// //               ]
// //             );
// //           }
// //         },
// //         { 
// //           enableHighAccuracy: true, 
// //           timeout: 30000, // 30 seconds timeout
// //           maximumAge: 60000 // 1 minute maximum age
// //         }
// //       );

// //       // Watch position with enhanced options
// //       watchId = Geolocation.watchPosition(
// //         (position) => {
// //           const { latitude, longitude, accuracy, speed, heading } = position.coords;
// //           setLocation({ latitude, longitude });
// //           setLocationAccuracy(accuracy);
// //           setIsLocationEnabled(true);
// //           setLocationTimeout(false);
// //           setUsingFallbackLocation(false);
// //           setLocationRetryCount(0);
// //           console.log('📍 Location updated:', { 
// //             latitude, 
// //             longitude, 
// //             accuracy,
// //             speed,
// //             heading 
// //           });

// //           sendCoordinatesToSocket(latitude, longitude);
// //         },
// //         (error) => {
// //           console.error('❌ Watch position error:', error);
// //           console.log('❌ Watch position error code:', error.code);
// //           console.log('❌ Watch position error message:', error.message);
// //           setSocketMessages(prev => [...prev, `Watch error: ${error.message}`]);

// //           if (error.code === 1 || error.code === 2) {
// //             setIsLocationEnabled(false);
// //           } else if (error.code === 3) {
// //             setLocationTimeout(true);
// //           }
// //         },
// //         { 
// //           enableHighAccuracy: true, 
// //           distanceFilter: 10, // Increased distance filter
// //           interval: 10000, // Increased interval to 10 seconds
// //           fastestInterval: 5000, // Increased fastest interval
// //           maxWaitTime: 20000 // Increased max wait time
// //         }
// //       );
// //     };

// //     initialize();

// //     // Cleanup
// //     return () => {
// //       if (watchId) Geolocation.clearWatch(watchId);
// //       if (socketRef.current) {
// //         socketRef.current.disconnect();
// //         console.log('🔌 Socket disconnected on cleanup');
// //       }
// //     };
// //   }, [orgUuid, employeeId]); // Re-run if credentials change

// //   // Sample track history
// //   const trackHistory = [
// //     {
// //       time: '02/06 5:30 pm',
// //       user: 'euresh malke',
// //       status: 'mrefest',
// //       description: 'Svet - aiuresh mvelt itto/SU25.',
// //       nextSchedule: '1#',
// //       details: 'Decder tpahss',
// //     },
// //   ];

// //   return (
// //     <View style={styles.container}>
// //       {/* Header */}
// //       <View style={styles.header}>
// //         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
// //           <Ionicons name="arrow-back" size={24} color="#333" />
// //         </TouchableOpacity>
// //         <Text style={styles.headerTitle}>Live Location Map</Text>
// //         <TouchableOpacity onPress={centerOnUserLocation} style={styles.centerButton}>
// //           <Ionicons name="locate" size={24} color="#007AFF" />
// //         </TouchableOpacity>
// //       </View>

// //       {/* Location Status */}
// //       <View style={styles.locationStatus}>
// //         <View style={styles.statusRow}>
// //           <Ionicons 
// //             name={isLocationEnabled ? "location" : "location-outline"} 
// //             size={20} 
// //             color={isLocationEnabled ? "#4CAF50" : "#FF5722"} 
// //           />
// //           <Text style={[styles.statusText, { color: isLocationEnabled ? "#4CAF50" : "#FF5722" }]}>
// //             {isLocationEnabled ? (usingFallbackLocation ? "Fallback Location Active" : "Live Location Active") : "Location Disabled"}
// //           </Text>
// //           <TouchableOpacity onPress={checkLocationServices} style={styles.refreshButton}>
// //             <Ionicons name="refresh" size={16} color="#007AFF" />
// //           </TouchableOpacity>
// //         </View>

// //         <View style={styles.statusRow}>
// //           <Ionicons 
// //             name={socketConnected ? "wifi" : "wifi-outline"} 
// //             size={20} 
// //             color={socketConnected ? "#4CAF50" : "#FF5722"} 
// //           />
// //           <Text style={[styles.statusText, { color: socketConnected ? "#4CAF50" : "#FF5722" }]}>
// //             {socketConnected ? "Socket Connected" : "Socket Disconnected"}
// //           </Text>
// //           <TouchableOpacity onPress={reconnectSocket} style={styles.refreshButton}>
// //             <Ionicons name="refresh" size={16} color="#007AFF" />
// //           </TouchableOpacity>
// //         </View>

// //         {locationTimeout && (
// //           <View style={styles.statusRow}>
// //             <Ionicons name="warning" size={20} color="#FF9800" />
// //             <Text style={[styles.statusText, { color: "#FF9800" }]}>
// //               GPS Timeout - Try moving to open area
// //             </Text>
// //             <TouchableOpacity onPress={retryLocation} style={styles.refreshButton}>
// //               <Ionicons name="refresh" size={16} color="#FF9800" />
// //             </TouchableOpacity>
// //           </View>
// //         )}

// //         {usingFallbackLocation && (
// //           <View style={styles.statusRow}>
// //             <Ionicons name="information-circle" size={20} color="#2196F3" />
// //             <Text style={[styles.statusText, { color: "#2196F3" }]}>
// //               Using Fallback Location (Mumbai, India)
// //             </Text>
// //             <TouchableOpacity onPress={retryLocation} style={styles.refreshButton}>
// //               <Ionicons name="refresh" size={16} color="#2196F3" />
// //             </TouchableOpacity>
// //           </View>
// //         )}

// //         {socketError && (
// //           <Text style={styles.errorText}>
// //             Socket Error: {socketError}
// //           </Text>
// //         )}

// //         {locationAccuracy && (
// //           <Text style={styles.accuracyText}>
// //             Accuracy: {Math.round(locationAccuracy)}m {usingFallbackLocation ? '(Fallback)' : ''}
// //           </Text>
// //         )}
// //         {location && (
// //           <Text style={styles.coordinatesText}>
// //             Lat: {location.latitude.toFixed(6)}, Lng: {location.longitude.toFixed(6)}
// //             {usingFallbackLocation ? ' (Fallback)' : ''}
// //           </Text>
// //         )}
        
// //         {lastSentCoordinates && (
// //           <Text style={styles.lastSentText}>
// //             Last Sent: {lastSentCoordinates.lat.toFixed(6)}, {lastSentCoordinates.lng.toFixed(6)}
// //             {lastSentCoordinates.isFallback ? ' (Fallback)' : ''}
// //           </Text>
// //         )}
// //       </View>

// //       {/* Map View */}
// //       <View style={styles.mapContainer}>
// //         {location ? (
// //           <MapView
// //             ref={mapRef}
// //             style={styles.map}
// //             provider={PROVIDER_GOOGLE}
// //             initialRegion={{
// //               latitude: location.latitude,
// //               longitude: location.longitude,
// //               latitudeDelta: 0.01,
// //               longitudeDelta: 0.01,
// //             }}
// //             showsUserLocation={true}
// //             showsMyLocationButton={false}
// //             showsCompass={true}
// //             showsScale={true}
// //             showsTraffic={false}
// //             showsBuildings={true}
// //             mapType="standard"
// //             followsUserLocation={true}
// //           >
// //             <Marker
// //               coordinate={{ latitude: location.latitude, longitude: location.longitude }}
// //               title={usingFallbackLocation ? "Fallback Location (Mumbai)" : "Your Current Location"}
// //               description={usingFallbackLocation ? "Testing location - Mumbai, India" : "Live tracking active"}
// //               anchor={{ x: 0.5, y: 0.5 }}
// //             >
// //               <View style={styles.currentLocationMarker}>
// //                 <View style={[styles.pulseCircle, usingFallbackLocation && styles.fallbackPulse]} />
// //                 <View style={[styles.locationDot, usingFallbackLocation && styles.fallbackDot]} />
// //               </View>
// //             </Marker>

// //             {locationAccuracy && (
// //               <Circle
// //                 center={{ latitude: location.latitude, longitude: location.longitude }}
// //                 radius={locationAccuracy}
// //                 fillColor={usingFallbackLocation ? "rgba(255, 152, 0, 0.1)" : "rgba(0, 122, 255, 0.1)"}
// //                 strokeColor={usingFallbackLocation ? "rgba(255, 152, 0, 0.3)" : "rgba(0, 122, 255, 0.3)"}
// //                 strokeWidth={1}
// //               />
// //             )}

// //             {coordinates.length > 1 && (
// //               <Polyline
// //                 coordinates={coordinates.map(coord => ({
// //                   latitude: coord.lat,
// //                   longitude: coord.lng
// //                 }))}
// //                 strokeColor="#007AFF"
// //                 strokeWidth={3}
// //                 lineDashPattern={[1]}
// //               />
// //             )}

// //             {coordinates.map((coord, index) => (
// //               <Marker
// //                 key={index}
// //                 coordinate={{ latitude: coord.lat, longitude: coord.lng }}
// //                 title={`Tracked at ${new Date(coord.timestamp || coord.time).toLocaleTimeString()}`}
// //                 pinColor="blue"
// //               />
// //             ))}
// //           </MapView>
// //         ) : (
// //           <View style={styles.loadingContainer}>
// //             <Ionicons name="map-outline" size={50} color="#666" />
// //             <Text style={styles.loadingText}>
// //               {locationTimeout ? 'GPS Timeout - Retrying...' : 'Loading map...'}
// //             </Text>
// //             <Text style={styles.loadingSubtext}>
// //               {locationTimeout ? 'Move to open area or enable GPS' : 'Getting your location'}
// //             </Text>
// //             {locationTimeout && (
// //               <View style={styles.buttonContainer}>
// //                 <TouchableOpacity onPress={retryLocation} style={styles.retryButton}>
// //                   <Text style={styles.retryButtonText}>Retry Location</Text>
// //                 </TouchableOpacity>
// //                 <TouchableOpacity onPress={useFallbackLocation} style={styles.fallbackButton}>
// //                   <Text style={styles.fallbackButtonText}>Use Fallback</Text>
// //                 </TouchableOpacity>
// //               </View>
// //             )}
// //           </View>
// //         )}
// //       </View>

// //       {/* Socket Messages Debug */}
// //       <ScrollView style={styles.debugContainer}>
// //         <View style={styles.debugHeader}>
// //           <Text style={styles.debugTitle}>Socket Debug Log</Text>
// //           <TouchableOpacity onPress={clearSocketMessages} style={styles.clearButton}>
// //             <Ionicons name="trash-outline" size={16} color="#FF5722" />
// //           </TouchableOpacity>
// //         </View>
// //         {socketMessages.slice(-10).map((message, index) => (
// //           <Text key={index} style={styles.debugMessage}>
// //             {message}
// //           </Text>
// //         ))}
// //       </ScrollView>

// //       {/* Track History */}
// //       <ScrollView style={styles.historyContainer}>
// //         <Text style={styles.historyTitle}>Location History</Text>
// //         {trackHistory.map((entry, index) => (
// //           <View key={index} style={styles.historyItem}>
// //             <Text style={styles.historyTime}>{entry.time}</Text>
// //             <Text style={styles.historyText}>User: {entry.user}</Text>
// //             <Text style={styles.historyText}>Status: {entry.status}</Text>
// //             {entry.nextSchedule && (
// //               <Text style={styles.historyText}>Next Schedule: {entry.nextSchedule}</Text>
// //             )}
// //             {entry.details && (
// //               <Text style={styles.historyText}>Details: {entry.details}</Text>
// //             )}
// //             <Text style={styles.historyText}>{entry.description}</Text>
// //           </View>
// //         ))}
// //       </ScrollView>
// //     </View>
// //   );
// // };

// // export default MapScreen;

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#FFFFFF',
// //   },
// //   header: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'space-between',
// //     padding: 15,
// //     backgroundColor: '#F5F5F5',
// //     borderBottomWidth: 1,
// //     borderBottomColor: '#E0E0E0',
// //   },
// //   backButton: {
// //     padding: 5,
// //   },
// //   headerTitle: {
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //     color: '#333',
// //     flex: 1,
// //     textAlign: 'center',
// //   },
// //   centerButton: {
// //     padding: 5,
// //   },
// //   locationStatus: {
// //     padding: 10,
// //     backgroundColor: '#F8F9FA',
// //     borderBottomWidth: 1,
// //     borderBottomColor: '#E0E0E0',
// //   },
// //   statusRow: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'space-between',
// //     marginBottom: 5,
// //   },
// //   statusText: {
// //     fontSize: 14,
// //     fontWeight: '600',
// //     marginLeft: 8,
// //     flex: 1,
// //   },
// //   accuracyText: {
// //     fontSize: 12,
// //     color: '#666',
// //     marginLeft: 28,
// //   },
// //   coordinatesText: {
// //     fontSize: 12,
// //     color: '#666',
// //     marginLeft: 28,
// //     marginTop: 2,
// //   },
// //   lastSentText: {
// //     fontSize: 12,
// //     color: '#007AFF',
// //     marginLeft: 28,
// //     marginTop: 2,
// //     fontWeight: 'bold',
// //   },
// //   mapContainer: {
// //     flex: 0.5,
// //     width: wp(100),
// //   },
// //   map: {
// //     width: wp(100),
// //     height: '100%',
// //   },
// //   loadingContainer: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     backgroundColor: '#F5F5F5',
// //   },
// //   loadingText: {
// //     fontSize: 16,
// //     color: '#666',
// //     marginTop: 10,
// //   },
// //   loadingSubtext: {
// //     fontSize: 14,
// //     color: '#999',
// //     marginTop: 5,
// //   },
// //   buttonContainer: {
// //     flexDirection: 'row',
// //     marginTop: 15,
// //     gap: 10,
// //   },
// //   retryButton: {
// //     paddingHorizontal: 20,
// //     paddingVertical: 10,
// //     backgroundColor: '#007AFF',
// //     borderRadius: 8,
// //   },
// //   retryButtonText: {
// //     color: '#FFFFFF',
// //     fontSize: 14,
// //     fontWeight: '600',
// //   },
// //   fallbackButton: {
// //     paddingHorizontal: 20,
// //     paddingVertical: 10,
// //     backgroundColor: '#FF9800',
// //     borderRadius: 8,
// //   },
// //   fallbackButtonText: {
// //     color: '#FFFFFF',
// //     fontSize: 14,
// //     fontWeight: '600',
// //   },
// //   currentLocationMarker: {
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// //   pulseCircle: {
// //     width: 20,
// //     height: 20,
// //     borderRadius: 10,
// //     backgroundColor: 'rgba(0, 122, 255, 0.3)',
// //     position: 'absolute',
// //     animation: 'pulse 2s infinite',
// //   },
// //   fallbackPulse: {
// //     backgroundColor: 'rgba(255, 152, 0, 0.3)',
// //   },
// //   locationDot: {
// //     width: 12,
// //     height: 12,
// //     borderRadius: 6,
// //     backgroundColor: '#007AFF',
// //     borderWidth: 2,
// //     borderColor: '#FFFFFF',
// //   },
// //   fallbackDot: {
// //     backgroundColor: '#FF9800',
// //   },
// //   debugContainer: {
// //     flex: 0.2,
// //     width: wp(100),
// //     padding: 10,
// //     backgroundColor: '#F0F0F0',
// //   },
// //   debugHeader: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     marginBottom: 5,
// //   },
// //   debugTitle: {
// //     fontSize: 14,
// //     fontWeight: 'bold',
// //     color: '#333',
// //   },
// //   clearButton: {
// //     padding: 5,
// //   },
// //   debugMessage: {
// //     fontSize: 10,
// //     color: '#666',
// //     marginBottom: 2,
// //   },
// //   historyContainer: {
// //     flex: 0.3,
// //     width: wp(100),
// //     padding: 10,
// //   },
// //   historyTitle: {
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //     color: '#333',
// //     marginBottom: 10,
// //   },
// //   historyItem: {
// //     marginBottom: 15,
// //     padding: 10,
// //     backgroundColor: '#F5F5F5',
// //     borderRadius: 5,
// //   },
// //   historyTime: {
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //     color: '#333',
// //     marginBottom: 5,
// //   },
// //   historyText: {
// //     fontSize: 14,
// //     color: '#666',
// //   },
// //   refreshButton: {
// //     padding: 5,
// //     marginLeft: 10,
// //   },
// //   errorText: {
// //     fontSize: 12,
// //     color: '#FF5722',
// //     marginLeft: 28,
// //     marginTop: 2,
// //   },
// // });


// import React, { useEffect, useState, useRef } from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   Dimensions,
//   Alert,
//   Platform,
//   PermissionsAndroid,
//   TextInput,
// } from 'react-native';
// import MapView, { Marker, Circle, Polyline } from 'react-native-maps';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { RFPercentage } from 'react-native-responsive-fontsize';
// import { useNavigation } from '@react-navigation/native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Geolocation from '@react-native-community/geolocation';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import io from 'socket.io-client';
// import axios from 'axios';

// const { width } = Dimensions.get('window');

// const SOCKET_URL = 'http://20.41.121.191:5151';
// const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org';
// const FALLBACK_LOCATION = {
//   latitude: 19.0760, // Mumbai, India
//   longitude: 72.8777,
//   latitudeDelta: 0.01,
//   longitudeDelta: 0.01,
// };

// const MapScreen = () => {
//   const navigation = useNavigation();
//   const socketRef = useRef(null);
//   const mapRef = useRef(null);
//   const [location, setLocation] = useState(null);
//   const [coordinates, setCoordinates] = useState([]);
//   const [isLocationEnabled, setIsLocationEnabled] = useState(false);
//   const [locationAccuracy, setLocationAccuracy] = useState(null);
//   const [socketConnected, setSocketConnected] = useState(false);
//   const [socketError, setSocketError] = useState(null);
//   const [socketAttempts, setSocketAttempts] = useState(0);
//   const [orgUuid, setOrgUuid] = useState(null);
//   const [employeeId, setEmployeeId] = useState(null);
//   const [lastSentCoordinates, setLastSentCoordinates] = useState(null);
//   const [socketMessages, setSocketMessages] = useState([]);
//   const [locationTimeout, setLocationTimeout] = useState(false);
//   const [usingFallbackLocation, setUsingFallbackLocation] = useState(false);
//   const [locationRetryCount, setLocationRetryCount] = useState(0);
//   const [addressInput, setAddressInput] = useState('');
//   const [currentAddress, setCurrentAddress] = useState('');
//   const maxRetries = 3;

//   // Fetch credentials from AsyncStorage
//   const fetchCredentials = async () => {
//     try {
//       const orgId = await AsyncStorage.getItem('orgId');
//       const empId = await AsyncStorage.getItem('empId');
//       console.log('🆔 Fetched from AsyncStorage:', { orgId, empId });

//       if (!orgId || !empId) {
//         setSocketError('Missing organization UUID or employee ID. Please log in.');
//         navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
//         return false;
//       }

//       setOrgUuid(orgId);
//       setEmployeeId(empId);
//       return true;
//     } catch (err) {
//       console.error('❌ Error fetching AsyncStorage:', err);
//       setSocketError('Failed to retrieve credentials.');
//       navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
//       return false;
//     }
//   };

//   // Request location permission
//   const requestLocationPermission = async () => {
//     if (Platform.OS === 'android') {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//           {
//             title: 'Location Permission',
//             message: 'This app needs access to your location for tracking.',
//             buttonNeutral: 'Ask Me Later',
//             buttonNegative: 'Cancel',
//             buttonPositive: 'OK',
//           }
//         );
//         if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
//           Alert.alert('Permission Denied', 'Location permission is required.');
//           return false;
//         }
//         return true;
//       } catch (err) {
//         console.warn(err);
//         return false;
//       }
//     }
//     return true; // iOS handles permission via Info.plist
//   };

//   // Initialize Socket.IO connection
//   const initializeSocket = () => {
//     if (!orgUuid || !employeeId) {
//       setSocketError('Cannot initialize socket: Missing credentials.');
//       return;
//     }

//     try {
//       console.log('🔌 Attempting to connect to socket:', SOCKET_URL);
//       socketRef.current = io(SOCKET_URL, {
//         timeout: 15000,
//         reconnection: true,
//         reconnectionAttempts: 10,
//         reconnectionDelay: 2000,
//         transports: ['websocket', 'polling'],
//         forceNew: true,
//       });

//       socketRef.current.on('connect', () => {
//         console.log('✅ Socket connected successfully');
//         setSocketConnected(true);
//         setSocketError(null);
//         setSocketAttempts(0);

//         socketRef.current.emit('joinRoom', { org_uuid: orgUuid, employeeId });
//         setSocketMessages(prev => [...prev, `Connected to socket: ${socketRef.current.id}`]);

//         // Start heartbeat
//         const heartbeatInterval = setInterval(() => {
//           if (socketRef.current.connected) {
//             socketRef.current.emit('heartbeat', { org_uuid: orgUuid, employeeId });
//           }
//         }, 30000);
//       });

//       socketRef.current.on('heartbeat_response', () => {
//         console.log('❤️ Heartbeat response received');
//       });

//       socketRef.current.on('disconnect', (reason) => {
//         console.log('❌ Socket disconnected:', reason);
//         setSocketConnected(false);
//         setSocketError(`Disconnected: ${reason}`);
//         setSocketMessages(prev => [...prev, `Disconnected: ${reason}`]);
//       });

//       socketRef.current.on('connect_error', (error) => {
//         console.log('❌ Socket connection error:', error);
//         setSocketConnected(false);
//         setSocketError(`Connection failed: ${error.message}`);
//         setSocketAttempts(prev => prev + 1);
//         setSocketMessages(prev => [...prev, `Connection error: ${error.message}`]);
//       });

//       socketRef.current.on('coordinateSaved', (data) => {
//         console.log('📍 Coordinate saved:', data);
//         setCoordinates((prev) => [...prev, data]);
//         setSocketMessages(prev => [...prev, `Coordinate saved: ${JSON.stringify(data)}`]);
//       });

//       socketRef.current.on('error', (error) => {
//         console.log('❌ Socket error:', error);
//         setSocketMessages(prev => [...prev, `Error: ${JSON.stringify(error)}`]);
//       });

//     } catch (error) {
//       console.error('❌ Socket initialization error:', error);
//       setSocketConnected(false);
//       setSocketError(`Initialization error: ${error.message}`);
//       setSocketMessages(prev => [...prev, `Init error: ${error.message}`]);
//     }
//   };

//   // Geocode address to coordinates using Nominatim
//   const geocodeAddress = async () => {
//     if (!addressInput) {
//       Alert.alert('Error', 'Please enter an address.');
//       return;
//     }

//     try {
//       const response = await axios.get(`${NOMINATIM_BASE_URL}/search`, {
//         params: {
//           q: addressInput,
//           format: 'json',
//           limit: 1,
//         },
//         headers: {
//           'User-Agent': 'YourAppName/1.0 (your.email@example.com)', // Required by Nominatim
//         },
//       });

//       if (response.data.length > 0) {
//         const { lat, lon } = response.data[0];
//         const newLocation = {
//           latitude: parseFloat(lat),
//           longitude: parseFloat(lon),
//           latitudeDelta: 0.01,
//           longitudeDelta: 0.01,
//         };
//         setLocation(newLocation);
//         setUsingFallbackLocation(false);
//         setLocationAccuracy(10); // Approximate accuracy
//         sendCoordinatesToSocket(parseFloat(lat), parseFloat(lon));
//         mapRef.current.animateToRegion(newLocation, 1000);
//         setSocketMessages(prev => [...prev, `Geocoded: ${addressInput} -> ${lat}, ${lon}`]);
//       } else {
//         Alert.alert('Geocoding Failed', 'No results found for the address.');
//       }
//     } catch (error) {
//       console.error('❌ Geocoding error:', error);
//       Alert.alert('Error', 'Failed to geocode address. Please try again.');
//     }
//   };

//   // Reverse geocode coordinates to address using Nominatim
//   const reverseGeocode = async (latitude, longitude) => {
//     try {
//       const response = await axios.get(`${NOMINATIM_BASE_URL}/reverse`, {
//         params: {
//           lat: latitude,
//           lon: longitude,
//           format: 'json',
//         },
//         headers: {
//           'User-Agent': 'YourAppName/1.0 (your.email@example.com)',
//         },
//       });

//       if (response.data.display_name) {
//         setCurrentAddress(response.data.display_name);
//         setSocketMessages(prev => [...prev, `Reverse geocoded: ${latitude}, ${longitude} -> ${response.data.display_name}`]);
//       }
//     } catch (error) {
//       console.error('❌ Reverse geocoding error:', error);
//     }
//   };

//   // Send coordinates to socket
//   const sendCoordinatesToSocket = (latitude, longitude) => {
//     if (socketRef.current && socketConnected && orgUuid && employeeId) {
//       const coordinateData = {
//         lat: latitude,
//         lng: longitude,
//         org_uuid: orgUuid,
//         employeeId,
//         timestamp: new Date().toISOString(),
//         accuracy: locationAccuracy,
//         isFallback: usingFallbackLocation,
//       };

//       console.log('📤 Sending coordinates:', coordinateData);
//       socketRef.current.emit('sendCoordinates', coordinateData);
//       setLastSentCoordinates(coordinateData);
//       setSocketMessages(prev => [...prev, `Sent coordinates: ${latitude}, ${longitude}${usingFallbackLocation ? ' (FALLBACK)' : ''}`]);

//       // Reverse geocode for display
//       reverseGeocode(latitude, longitude);
//     } else {
//       console.log('⚠️ Cannot send coordinates:', {
//         socketExists: !!socketRef.current,
//         socketConnected,
//         orgUuidExists: !!orgUuid,
//         employeeIdExists: !!employeeId,
//       });
//     }
//   };

//   // Use fallback location
//   const useFallbackLocation = () => {
//     setLocation(FALLBACK_LOCATION);
//     setLocationAccuracy(100);
//     setIsLocationEnabled(true);
//     setLocationTimeout(false);
//     setUsingFallbackLocation(true);
//     sendCoordinatesToSocket(FALLBACK_LOCATION.latitude, FALLBACK_LOCATION.longitude);
//     setSocketMessages(prev => [...prev, 'Using fallback location (Mumbai, India)']);
//   };

//   // Check location services
//   const checkLocationServices = () => {
//     Geolocation.getCurrentPosition(
//       () => {
//         setIsLocationEnabled(true);
//         setLocationTimeout(false);
//         setSocketMessages(prev => [...prev, 'Location services enabled']);
//       },
//       (error) => {
//         setSocketMessages(prev => [...prev, `Location error: ${error.message}`]);
//         if (error.code === 3) {
//           setLocationTimeout(true);
//           if (locationRetryCount < maxRetries) {
//             Alert.alert(
//               'Location Timeout',
//               `GPS signal weak. Attempt ${locationRetryCount + 1}/${maxRetries}`,
//               [
//                 { text: 'Use Fallback', onPress: useFallbackLocation },
//                 {
//                   text: 'Retry',
//                   onPress: () => {
//                     setLocationRetryCount(prev => prev + 1);
//                     checkLocationServices();
//                   },
//                 },
//                 { text: 'Cancel', style: 'cancel' },
//               ]
//             );
//           } else {
//             Alert.alert(
//               'Location Unavailable',
//               'Use fallback location?',
//               [
//                 { text: 'Use Fallback', onPress: useFallbackLocation },
//                 { text: 'Cancel', style: 'cancel' },
//               ]
//             );
//           }
//         }
//       },
//       { enableHighAccuracy: true, timeout: 30000, maximumAge: 60000 }
//     );
//   };

//   // Center map on user location
//   const centerOnUserLocation = () => {
//     if (location && mapRef.current) {
//       mapRef.current.animateToRegion({
//         latitude: location.latitude,
//         longitude: location.longitude,
//         latitudeDelta: 0.01,
//         longitudeDelta: 0.01,
//       }, 1000);
//     }
//   };

//   // Reconnect socket
//   const reconnectSocket = () => {
//     if (socketRef.current) {
//       socketRef.current.disconnect();
//     }
//     setSocketError(null);
//     setSocketAttempts(0);
//     setSocketMessages(prev => [...prev, 'Manual reconnection initiated']);
//     initializeSocket();
//   };

//   // Clear socket messages
//   const clearSocketMessages = () => {
//     setSocketMessages([]);
//   };

//   // Initialize
//   useEffect(() => {
//     let watchId;

//     const initialize = async () => {
//       const hasCredentials = await fetchCredentials();
//       if (!hasCredentials) return;

//       const hasPermission = await requestLocationPermission();
//       if (!hasPermission) {
//         setIsLocationEnabled(false);
//         return;
//       }

//       checkLocationServices();
//       initializeSocket();

//       Geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude, accuracy } = position.coords;
//           setLocation({ latitude, longitude });
//           setLocationAccuracy(accuracy);
//           setIsLocationEnabled(true);
//           setLocationTimeout(false);
//           setUsingFallbackLocation(false);
//           setLocationRetryCount(0);
//           sendCoordinatesToSocket(latitude, longitude);
//         },
//         (error) => {
//           setSocketMessages(prev => [...prev, `Geolocation error: ${error.message}`]);
//           if (error.code === 3) {
//             setLocationTimeout(true);
//             setLocationRetryCount(prev => prev + 1);
//             Alert.alert(
//               'Location Timeout',
//               'Use fallback location?',
//               [
//                 { text: 'Use Fallback', onPress: useFallbackLocation },
//                 { text: 'Cancel', style: 'cancel' },
//               ]
//             );
//           }
//         },
//         { enableHighAccuracy: true, timeout: 30000, maximumAge: 60000 }
//       );

//       watchId = Geolocation.watchPosition(
//         (position) => {
//           const { latitude, longitude, accuracy } = position.coords;
//           setLocation({ latitude, longitude });
//           setLocationAccuracy(accuracy);
//           setIsLocationEnabled(true);
//           setLocationTimeout(false);
//           setUsingFallbackLocation(false);
//           sendCoordinatesToSocket(latitude, longitude);
//         },
//         (error) => {
//           setSocketMessages(prev => [...prev, `Watch error: ${error.message}`]);
//           if (error.code === 1 || error.code === 2) {
//             setIsLocationEnabled(false);
//           } else if (error.code === 3) {
//             setLocationTimeout(true);
//           }
//         },
//         {
//           enableHighAccuracy: true,
//           distanceFilter: 20,
//           interval: 15000,
//           fastestInterval: 10000,
//           maxWaitTime: 30000,
//         }
//       );
//     };

//     initialize();

//     return () => {
//       if (watchId) Geolocation.clearWatch(watchId);
//       if (socketRef.current) {
//         socketRef.current.disconnect();
//       }
//     };
//   }, [orgUuid, employeeId]);

//   // Sample track history
//   const trackHistory = [
//     {
//       time: '02/06 5:30 pm',
//       user: 'euresh malke',
//       status: 'mrefest',
//       description: 'Svet - aiuresh mvelt itto/SU25.',
//       nextSchedule: '1#',
//       details: 'Decder tpahss',
//     },
//   ];

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//           <Ionicons name="arrow-back" size={24} color="#333" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Live Location Map</Text>
//         <TouchableOpacity onPress={centerOnUserLocation} style={styles.centerButton}>
//           <Ionicons name="locate" size={24} color="#007AFF" />
//         </TouchableOpacity>
//       </View>

//       {/* Location Status */}
//       <View style={styles.locationStatus}>
//         <View style={styles.statusRow}>
//           <TextInput
//             style={styles.addressInput}
//             placeholder="Enter address to track"
//             value={addressInput}
//             onChangeText={setAddressInput}
//           />
//           <TouchableOpacity onPress={geocodeAddress} style={styles.geocodeButton}>
//             <Ionicons name="search" size={20} color="#007AFF" />
//           </TouchableOpacity>
//         </View>
//         {currentAddress && (
//           <Text style={styles.addressText}>Current: {currentAddress}</Text>
//         )}
//         <View style={styles.statusRow}>
//           <Ionicons
//             name={isLocationEnabled ? "location" : "location-outline"}
//             size={20}
//             color={isLocationEnabled ? "#4CAF50" : "#FF5722"}
//           />
//           <Text style={[styles.statusText, { color: isLocationEnabled ? "#4CAF50" : "#FF5722" }]}>
//             {isLocationEnabled ? (usingFallbackLocation ? "Fallback Location Active" : "Live Location Active") : "Location Disabled"}
//           </Text>
//           <TouchableOpacity onPress={checkLocationServices} style={styles.refreshButton}>
//             <Ionicons name="refresh" size={16} color="#007AFF" />
//           </TouchableOpacity>
//         </View>
//         <View style={styles.statusRow}>
//           <Ionicons
//             name={socketConnected ? "wifi" : "wifi-outline"}
//             size={20}
//             color={socketConnected ? "#4CAF50" : "#FF5722"}
//           />
//           <Text style={[styles.statusText, { color: socketConnected ? "#4CAF50" : "#FF5722" }]}>
//             {socketConnected ? "Socket Connected" : "Socket Disconnected"}
//           </Text>
//           <TouchableOpacity onPress={reconnectSocket} style={styles.refreshButton}>
//             <Ionicons name="refresh" size={16} color="#007AFF" />
//           </TouchableOpacity>
//         </View>
//         {socketError && <Text style={styles.errorText}>Socket Error: {socketError}</Text>}
//         {locationAccuracy && (
//           <Text style={styles.accuracyText}>
//             Accuracy: {Math.round(locationAccuracy)}m {usingFallbackLocation ? '(Fallback)' : ''}
//           </Text>
//         )}
//         {location && (
//           <Text style={styles.coordinatesText}>
//             Lat: {location.latitude.toFixed(6)}, Lng: {location.longitude.toFixed(6)}
//             {usingFallbackLocation ? ' (Fallback)' : ''}
//           </Text>
//         )}
//       </View>

//       {/* Map View */}
//       <View style={styles.mapContainer}>
//         {location ? (
//           <MapView
//             ref={mapRef}
//             style={styles.map}
//             initialRegion={{
//               latitude: location.latitude,
//               longitude: location.longitude,
//               latitudeDelta: 0.01,
//               longitudeDelta: 0.01,
//             }}
//             showsUserLocation={true}
//             showsMyLocationButton={false}
//             showsCompass={true}
//             showsScale={true}
//             showsTraffic={false}
//             showsBuildings={true}
//             mapType="standard"
//             followsUserLocation={true}
//           >
//             <Marker
//               coordinate={{ latitude: location.latitude, longitude: location.longitude }}
//               title={usingFallbackLocation ? "Fallback Location (Mumbai)" : "Your Current Location"}
//               description={usingFallbackLocation ? "Testing location - Mumbai, India" : "Live tracking active"}
//             >
//               <View style={styles.currentLocationMarker}>
//                 <View style={[styles.pulseCircle, usingFallbackLocation && styles.fallbackPulse]} />
//                 <View style={[styles.locationDot, usingFallbackLocation && styles.fallbackDot]} />
//               </View>
//             </Marker>
//             {locationAccuracy && (
//               <Circle
//                 center={{ latitude: location.latitude, longitude: location.longitude }}
//                 radius={locationAccuracy}
//                 fillColor={usingFallbackLocation ? "rgba(255, 152, 0, 0.1)" : "rgba(0, 122, 255, 0.1)"}
//                 strokeColor={usingFallbackLocation ? "rgba(255, 152, 0, 0.3)" : "rgba(0, 122, 255, 0.3)"}
//                 strokeWidth={1}
//               />
//             )}
//             {coordinates.length > 1 && (
//               <Polyline
//                 coordinates={coordinates.map(coord => ({
//                   latitude: coord.lat,
//                   longitude: coord.lng,
//                 }))}
//                 strokeColor="#007AFF"
//                 strokeWidth={3}
//                 lineDashPattern={[1]}
//               />
//             )}
//           </MapView>
//         ) : (
//           <View style={styles.loadingContainer}>
//             <Ionicons name="map-outline" size={50} color="#666" />
//             <Text style={styles.loadingText}>
//               {locationTimeout ? 'GPS Timeout - Retrying...' : 'Loading map...'}
//             </Text>
//             <Text style={styles.loadingSubtext}>
//               {locationTimeout ? 'Move to open area or enable GPS' : 'Getting your location'}
//             </Text>
//           </View>
//         )}
//       </View>

//       {/* Debug and History */}
//       <ScrollView style={styles.debugContainer}>
//         <View style={styles.debugHeader}>
//           <Text style={styles.debugTitle}>Socket Debug Log</Text>
//           <TouchableOpacity onPress={clearSocketMessages} style={styles.clearButton}>
//             <Ionicons name="trash-outline" size={16} color="#FF5722" />
//           </TouchableOpacity>
//         </View>
//         {socketMessages.slice(-10).map((message, index) => (
//           <Text key={index} style={styles.debugMessage}>{message}</Text>
//         ))}
//       </ScrollView>

//       <ScrollView style={styles.historyContainer}>
//         <Text style={styles.historyTitle}>Location History</Text>
//         {trackHistory.map((entry, index) => (
//           <View key={index} style={styles.historyItem}>
//             <Text style={styles.historyTime}>{entry.time}</Text>
//             <Text style={styles.historyText}>User: {entry.user}</Text>
//             <Text style={styles.historyText}>Status: {entry.status}</Text>
//             <Text style={styles.historyText}>{entry.description}</Text>
//           </View>
//         ))}
//       </ScrollView>
//     </View>
//   );
// };

// export default MapScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding: 15,
//     backgroundColor: '#F5F5F5',
//     borderBottomWidth: 1,
//     borderBottomColor: '#E0E0E0',
//   },
//   backButton: {
//     padding: 5,
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//     flex: 1,
//     textAlign: 'center',
//   },
//   centerButton: {
//     padding: 5,
//   },
//   locationStatus: {
//     padding: 10,
//     backgroundColor: '#F8F9FA',
//     borderBottomWidth: 1,
//     borderBottomColor: '#E0E0E0',
//   },
//   statusRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 5,
//   },
//   statusText: {
//     fontSize: 14,
//     fontWeight: '600',
//     marginLeft: 8,
//     flex: 1,
//   },
//   accuracyText: {
//     fontSize: 12,
//     color: '#666',
//     marginLeft: 28,
//   },
//   coordinatesText: {
//     fontSize: 12,
//     color: '#666',
//     marginLeft: 28,
//     marginTop: 2,
//   },
//   addressInput: {
//     flex: 1,
//     height: 40,
//     borderColor: '#E0E0E0',
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     marginRight: 10,
//     backgroundColor: '#FFFFFF',
//   },
//   geocodeButton: {
//     padding: 10,
//     backgroundColor: '#F5F5F5',
//     borderRadius: 8,
//   },
//   addressText: {
//     fontSize: 12,
//     color: '#333',
//     marginLeft: 28,
//     marginTop: 2,
//     marginBottom: 5,
//   },
//   mapContainer: {
//     flex: 0.5,
//     width: wp(100),
//   },
//   map: {
//     width: wp(100),
//     height: '100%',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5F5F5',
//   },
//   loadingText: {
//     fontSize: 16,
//     color: '#666',
//     marginTop: 10,
//   },
//   loadingSubtext: {
//     fontSize: 14,
//     color: '#999',
//     marginTop: 5,
//   },
//   currentLocationMarker: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   pulseCircle: {
//     width: 20,
//     height: 20,
//     borderRadius: 10,
//     backgroundColor: 'rgba(0, 122, 255, 0.3)',
//     position: 'absolute',
//   },
//   fallbackPulse: {
//     backgroundColor: 'rgba(255, 152, 0, 0.3)',
//   },
//   locationDot: {
//     width: 12,
//     height: 12,
//     borderRadius: 6,
//     backgroundColor: '#007AFF',
//     borderWidth: 2,
//     borderColor: '#FFFFFF',
//   },
//   fallbackDot: {
//     backgroundColor: '#FF9800',
//   },
//   debugContainer: {
//     flex: 0.2,
//     width: wp(100),
//     padding: 10,
//     backgroundColor: '#F0F0F0',
//   },
//   debugHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 5,
//   },
//   debugTitle: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   clearButton: {
//     padding: 5,
//   },
//   debugMessage: {
//     fontSize: 10,
//     color: '#666',
//     marginBottom: 2,
//   },
//   historyContainer: {
//     flex: 0.3,
//     width: wp(100),
//     padding: 10,
//   },
//   historyTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 10,
//   },
//   historyItem: {
//     marginBottom: 15,
//     padding: 10,
//     backgroundColor: '#F5F5F5',
//     borderRadius: 5,
//   },
//   historyTime: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 5,
//   },
//   historyText: {
//     fontSize: 14,
//     color: '#666',
//   },
//   refreshButton: {
//     padding: 5,
//     marginLeft: 10,
//   },
//   errorText: {
//     fontSize: 12,
//     color: '#FF5722',
//     marginLeft: 28,
//     marginTop: 2,
//   },
// })rnfes


import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const MapScreen = () => {
  return (
    <View>
      <Text>MapScreen</Text>
    </View>
  )
}

export default MapScreen

const styles = StyleSheet.create({})