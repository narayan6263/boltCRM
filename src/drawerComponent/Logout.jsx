import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../redux/slices/logoutSlice';
import { useNavigation } from '@react-navigation/native';

const Logout = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { loading, error } = useSelector((state) => state.auth);
  const [hasAttemptedLogout, setHasAttemptedLogout] = useState(false);

  useEffect(() => {
    if (hasAttemptedLogout) return; // Prevent multiple logout attempts

    const performLogout = async () => {
      setHasAttemptedLogout(true);
      try {
        await dispatch(userLogout()).unwrap();
        console.log('✅ Logout successful');
        navigation.reset({
          index: 0,
          routes: [{ name: 'LoginScreen' }],
        });
      } catch (err) {
        console.error('❌ Logout error:', err);
        Alert.alert('Logout Failed', String(err) || 'An error occurred during logout.');
      }
    };

    performLogout();
  }, [dispatch, navigation]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#707FDD" />
        <Text style={styles.text}>Logging out...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity
          style={[styles.retryButton, loading && styles.disabledButton]}
          onPress={() => {
            if (!loading) {
              setHasAttemptedLogout(false); // Allow retry
              dispatch(userLogout());
            }
          }}
          disabled={loading}
        >
          <Text style={styles.retryButtonText}>{loading ? 'Retrying...' : 'Retry'}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Logging out...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#707FDD',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#a0a0a0',
  },
});

export default Logout;